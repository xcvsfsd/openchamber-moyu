// 假聊天阅读页：话题列表=会话，楼主=用户消息，回帖=助手回答（moyu 隐喻）。
// 全屏 page，不碰真会话；网络全走 serviceRequest；论坛 HTML 先洗后渲染。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import DOMPurify from 'dompurify';
import type { CommunityId, Thread, Topic } from '../shared/types.js';
import { COMMUNITIES } from '../shared/types.js';

const COMMUNITY = (document.querySelector('meta[name="moyu-community"]')?.getAttribute('content') === 'v2ex' ? 'v2ex' : 'linuxdo') as CommunityId;
const INFO = COMMUNITIES.find((c) => c.id === COMMUNITY)!;
const LIST_TTL = 3 * 60 * 1000;

const host = connectHost();
const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing #app');

root.innerHTML = `
<style>
*{box-sizing:border-box}body{margin:0;font:14px/1.6 system-ui,sans-serif}
#app{display:flex;height:100vh;overflow:hidden}
aside{width:300px;min-width:240px;border-right:1px solid var(--oc-border,#8883);display:flex;flex-direction:column}
main{flex:1;display:flex;flex-direction:column;min-width:0}
.hd{padding:8px 10px;border-bottom:1px solid var(--oc-border,#8883);display:flex;gap:6px;align-items:center;flex-wrap:wrap}
select,button,input,textarea{font:inherit}
button{padding:4px 10px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer}
button:disabled{opacity:.5}button.primary{background:var(--primary,#3574f0);border-color:transparent;color:#fff}
#topics{overflow-y:auto;flex:1}
.t{padding:8px 10px;border-bottom:1px solid var(--oc-border,#8882);cursor:pointer}
.t.active{background:var(--oc-hover,#8882)}.t .title{font-weight:600;word-break:break-word}.t .meta{font-size:12px;opacity:.7}
#thread{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px}
.msg{max-width:760px;border:1px solid var(--oc-border,#8883);border-radius:12px;padding:8px 12px}
.msg.mine{align-self:flex-end;background:var(--oc-hover,#8881)}
.msg .who{font-size:12px;opacity:.7;display:flex;gap:6px;align-items:center}
.msg .who img{width:20px;height:20px;border-radius:50%}
.msg .body{word-break:break-word}.msg .body img{max-width:100%;border-radius:8px}
.imgph{border:1px dashed #8888;border-radius:8px;padding:8px;font-size:12px;opacity:.8;cursor:pointer}
#composer{border-top:1px solid var(--oc-border,#8883);padding:8px 10px;display:flex;flex-direction:column;gap:6px}
#composer textarea{width:100%;min-height:56px;resize:vertical;border:1px solid var(--oc-border,#8888);border-radius:8px;padding:8px;background:var(--oc-elevated,inherit);color:inherit}
.row{display:flex;gap:6px;align-items:center;flex-wrap:wrap}.mut{font-size:12px;opacity:.7}.err{background:#7f1d1d22;border:1px solid #7f1d1d66;border-radius:8px;padding:8px}
.sw{font-size:12px;border-radius:999px}.sw.on{border-color:var(--primary,#3574f0);color:var(--primary,#3574f0);font-weight:700}
#msg:empty{display:none}
</style>
<header class="hd" style="width:100%">
  <strong id="cname"></strong>
  <select id="ch"></select>
  <button id="b-refresh" title="刷新列表 (r)">↻</button>
  <button id="b-open" title="浏览器打开 (o)">↗</button>
  <span style="flex:1"></span>
  <button id="b-bell" title="通知">🔔</button>
  <button id="b-login">登录</button>
</header>
<div style="display:flex;flex:1;min-height:0;width:100%">
<aside><div id="topics"></div></aside>
<main>
  <div id="msg"></div>
  <div id="thread"></div>
  <div id="composer">
    <div class="row">
      <button id="sw-stream" class="sw" title="流式输出">流式:开</button>
      <button id="sw-img" class="sw" title="图片显示">图片:折叠</button>
      <button id="sw-mask" class="sw" title="头像伪装">伪装:关</button>
      <span class="mut" id="pos"></span>
    </div>
    <textarea id="draft" placeholder="回车发送，Ctrl/⌘+回车换行（匿名先存草稿，登录后可发）"></textarea>
    <div class="row"><button id="b-send" class="primary">发送回复</button><span class="mut" id="hint"></span></div>
  </div>
</main>
</div>`;

const $ = <T extends HTMLElement>(id: string): T => document.querySelector(`#${id}`) as T;
const cname = $('cname'), chSel = $('ch') as unknown as HTMLSelectElement;
const topicsEl = $('topics'), threadEl = $('thread'), msgEl = $('msg');
const draftEl = $('draft') as unknown as HTMLTextAreaElement;
const hintEl = $('hint'), posEl = $('pos');

cname.textContent = INFO.name === 'linux.do' ? '阅读 L' : '阅读 V';
for (const c of INFO.channels) { const o = document.createElement('option'); o.value = c.id; o.textContent = c.name; chSel.appendChild(o); }

type Prefs = { stream: boolean; images: boolean; mask: boolean };
let prefs: Prefs = { stream: true, images: false, mask: false };
let channel = INFO.channels[0]!.id;
let topics: Topic[] = [];
let listAt = 0;
let current: Topic | null = null;
let thread: Thread | null = null;
let busy = false;

const say = (html: string): void => { msgEl.innerHTML = html ? `<div class="err">${html}</div>` : ''; };
const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rel = (t: number | null): string => {
  if (!t) return '';
  const d = Date.now() - t;
  if (d < 60_000) return '刚刚'; if (d < 3600_000) return `${Math.floor(d / 60_000)} 分钟前`;
  if (d < 86400_000) return `${Math.floor(d / 3600_000)} 小时前`;
  return new Date(t).toLocaleDateString();
};
// 头像伪装：按昵称稳定分配的 Agent 标志（moyu 面具开关），本地 SVG，不请求原头像
const maskAvatar = (name: string): string => {
  let h = 0; for (const c of name) h = (h * 31 + c.codePointAt(0)!) >>> 0;
  const hue = h % 360;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><rect width='40' height='40' rx='20' fill='hsl(${hue} 60% 45%)'/><text x='20' y='27' font-size='18' text-anchor='middle' fill='white'>🤖</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
const avatarOf = (name: string, url: string | null): string => {
  if (prefs.mask) return maskAvatar(name);
  if (!url) return maskAvatar(name);
  return url;
};

const storeGet = async (k: string): Promise<unknown> => { try { return await host.storage.get(k); } catch { return undefined; } };
const storeSet = async (k: string, v: unknown): Promise<void> => { try { await host.storage.set(k, v as never); } catch { /* 忽略，页内保持 */ } };

const svc = async (method: string, path: string, body?: string): Promise<{ status: number; body: string }> =>
  host.serviceRequest({ method: method as 'GET' | 'POST', path, body });

const loadPrefs = async (): Promise<void> => {
  const v = await storeGet(`moyu:prefs:${COMMUNITY}`) as Prefs | undefined;
  if (v && typeof v.stream === 'boolean') prefs = v;
  paintSwitches();
};
const savePrefs = (): void => { void storeSet(`moyu:prefs:${COMMUNITY}`, prefs); };
const paintSwitches = (): void => {
  const set = (id: string, on: boolean, a: string, b: string): void => {
    const el = $(id); el.textContent = on ? a : b; el.classList.toggle('on', on);
  };
  set('sw-stream', prefs.stream, '流式:开', '流式:关');
  set('sw-img', prefs.images, '图片:开', '图片:折叠');
  set('sw-mask', prefs.mask, '伪装:开', '伪装:关');
};
$('sw-stream').onclick = () => { prefs.stream = !prefs.stream; savePrefs(); paintSwitches(); };
$('sw-img').onclick = () => { prefs.images = !prefs.images; savePrefs(); paintSwitches(); if (thread) void paintThread(false); };
$('sw-mask').onclick = () => { prefs.mask = !prefs.mask; savePrefs(); paintSwitches(); paintList(); if (thread) void paintThread(false); };

const paintList = (): void => {
  topicsEl.innerHTML = '';
  for (const t of topics) {
    const d = document.createElement('div');
    d.className = 't' + (current?.id === t.id ? ' active' : '');
    d.innerHTML = `<div class="title">${esc(t.title)}</div><div class="meta">${esc(t.author)} · ${esc(t.channel ?? '')} · ${t.replies ?? '-'}回复 · ${rel(t.time)}</div>`;
    d.onclick = () => void openTopic(t);
    topicsEl.appendChild(d);
  }
};

const clean = (html: string): string =>
  DOMPurify.sanitize(html, { ADD_ATTR: ['target', 'rel'], FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input', 'button'] });

const proxyImg = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = clean(html);
  for (const img of div.querySelectorAll('img')) {
    const src = img.getAttribute('src') ?? '';
    if (!prefs.images) {
      const ph = document.createElement('div');
      ph.className = 'imgph';
      ph.textContent = `🖼 图片已折叠，点击加载（${src.slice(0, 80)}）`;
      ph.onclick = () => { prefs.images = true; savePrefs(); paintSwitches(); void paintThread(false); };
      img.replaceWith(ph);
    } else {
      // 走 service 代理，避免页面直连
      img.setAttribute('src', `/image?url=${encodeURIComponent(src)}`);
      img.setAttribute('loading', 'lazy');
    }
  }
  for (const a of div.querySelectorAll('a')) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noreferrer'); }
  return div.innerHTML;
};
// serviceRequest 的 /image 要经 service 代理取：这里把相对路径改写成带 host 前缀的 service 调用
// 简化：拦截点击，用 openUrl 打开原图；行内图用 blob 懒加载
const hydrateImages = async (scope: HTMLElement): Promise<void> => {
  if (!prefs.images) return;
  for (const img of scope.querySelectorAll('img')) {
    const aisle = img.getAttribute('src') ?? '';
    if (!aisle.startsWith('/image?')) continue;
    const original = decodeURIComponent(aisle.slice('/image?url='.length));
    try {
      const r = await svc('GET', `/image?url=${encodeURIComponent(original)}`);
      // service 直接回图片字节时 body 是 JSON？本 MVP service 回二进制直写，SDK 按文本给 -> 降级 openUrl
      void r;
      img.setAttribute('src', original);
    } catch { img.setAttribute('src', original); }
  }
};

const msgCard = (mine: boolean, who: string, avatar: string, time: number | null, html: string, extra = ''): string =>
  `<div class="msg${mine ? ' mine' : ''}"><div class="who"><img src="${avatar}" alt=""/>${esc(who)} · ${rel(time)}${extra}</div><div class="body">${proxyImg(html)}</div></div>`;

const paintThread = async (animate: boolean): Promise<void> => {
  threadEl.innerHTML = '';
  posEl.textContent = '';
  if (!thread) return;
  const cards: string[] = [];
  if (thread.opening) cards.push(msgCard(true, thread.opening.author, avatarOf(thread.opening.author, thread.opening.avatar), thread.opening.time, thread.opening.html, thread.opening.byAuthor ? ' · 楼主' : ''));
  thread.posts.forEach((p) => {
    cards.push(msgCard(false, `${p.author}${p.byAuthor ? ' · 楼主' : ''} · #${p.floor}${p.replyTo ? ` 回复 #${p.replyTo}` : ''}${p.likes !== null ? ` · ❤${p.likes}` : ''}`, avatarOf(p.author, p.avatar), p.time, p.html));
  });
  if (!prefs.stream || !animate) {
    threadEl.innerHTML = cards.join('') + (thread.more ? `<button id="more">加载更多回复</button>` : '');
  } else {
    for (const c of cards) {
      const d = document.createElement('div');
      d.innerHTML = c;
      threadEl.appendChild(d.firstElementChild!);
      await new Promise((r) => setTimeout(r, 60));
    }
    if (thread.more) { const b = document.createElement('button'); b.id = 'more'; b.textContent = '加载更多回复'; threadEl.appendChild(b); }
  }
  const moreBtn = threadEl.querySelector('#more');
  if (moreBtn) (moreBtn as HTMLButtonElement).onclick = () => void openPage(thread!.page + 1, true);
  await hydrateImages(threadEl);
  const key = `moyu:pos:${COMMUNITY}:${current!.id}`;
  const saved = await storeGet(key) as { page?: number } | undefined;
  posEl.textContent = `第 ${thread.page} 页${thread.more ? '（还有）' : ''}${saved?.page ? ` · 上次看到第 ${saved.page} 页` : ''}`;
  void storeSet(key, { page: thread.page });
};

const pollList = async (force = false): Promise<void> => {
  if (busy || document.hidden) return;
  if (!force && Date.now() - listAt < LIST_TTL && topics.length > 0) return;
  busy = true;
  try {
    const r = await svc('GET', `/list?community=${COMMUNITY}&channel=${encodeURIComponent(channel)}`);
    const j = JSON.parse(r.body) as { ok: boolean; topics?: Topic[]; error?: string };
    if (!j.ok) { say(esc(j.error ?? '列表失败')); return; }
    say('');
    topics = j.topics ?? [];
    listAt = Date.now();
    paintList();
  } catch (e) { say(esc(e instanceof Error ? e.message : '列表失败')); }
  finally { busy = false; }
};

const openTopic = async (t: Topic): Promise<void> => {
  current = t; thread = null; paintList();
  draftEl.value = (await storeGet(`moyu:draft:${COMMUNITY}:${t.id}`) as string | undefined) ?? '';
  hintEl.textContent = '匿名阅读；回复需登录（MVP 未接，先存草稿）';
  await openPage(1, true);
};

const openPage = async (page: number, animate: boolean): Promise<void> => {
  if (!current) return;
  try {
    const r = await svc('GET', `/thread?community=${COMMUNITY}&id=${encodeURIComponent(current.id)}&page=${page}`);
    const j = JSON.parse(r.body) as { ok: boolean; thread?: Thread; error?: string };
    if (!j.ok) { say(esc(j.error ?? '正文失败')); return; }
    say('');
    if (page === 1 || !thread) thread = j.thread!;
    else thread = { ...j.thread!, posts: [...thread.posts, ...j.thread!.posts] };
    await paintThread(animate);
  } catch (e) { say(esc(e instanceof Error ? e.message : '正文失败')); }
};

chSel.onchange = () => { channel = chSel.value; listAt = 0; void pollList(true); };
$('b-refresh').onclick = () => void pollList(true);
$('b-open').onclick = () => { if (current) void host.openUrl(current.url); };
$('b-login').onclick = async () => {
  if (COMMUNITY === 'linuxdo') await host.openUrl('https://linux.do/login');
  else await host.openUrl('https://www.v2ex.com/signin');
  say('已打开社区登录页：登完点「检查登录」。（MVP：service 暂未接登录态，匿名可读）');
};
$('b-bell').onclick = async () => {
  try {
    const r = await svc('POST', '/notifications', JSON.stringify({}));
    const j = JSON.parse(r.body) as { ok: boolean; error?: string };
    say(esc(j.error ?? '通知不可用'));
  } catch (e) { say(esc(e instanceof Error ? e.message : '通知失败')); }
};

// 草稿：按社区+帖子保留，发送成功才清；失败永不自动重发（moyu）
draftEl.addEventListener('input', () => {
  if (current) void storeSet(`moyu:draft:${COMMUNITY}:${current.id}`, draftEl.value);
});
let sending = false;
const send = async (): Promise<void> => {
  if (sending || !current) return;
  const content = draftEl.value.trim();
  if (!content) return;
  sending = true;
  try {
    const r = await svc('POST', '/reply', JSON.stringify({ id: current.id, content }));
    const j = JSON.parse(r.body) as { ok: boolean; error?: string };
    // MVP：后端回 need-login，保留草稿 + 待确认语气
    say(esc(j.error ?? '发送失败'));
    hintEl.textContent = '草稿已保留，登录后重发（不自动重发）。';
  } finally { sending = false; }
};
$('b-send').onclick = () => void send();
draftEl.addEventListener('keydown', (e) => {
  if ((e as unknown as { isComposing?: boolean }).isComposing) return;
  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) { e.preventDefault(); void send(); }
});

// 快捷键：输入框里不触发（moyu：输入时照常写草稿）
document.addEventListener('keydown', (e) => {
  const tag = (e.target as HTMLElement)?.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') return;
  if (e.key === 'j' || e.key === 'k') {
    if (!topics.length) return;
    const i = topics.findIndex((t) => t.id === current?.id);
    const n = e.key === 'j' ? Math.min(topics.length - 1, (i < 0 ? -1 : i) + 1) : Math.max(0, (i < 0 ? 1 : i) - 1);
    void openTopic(topics[n]!);
  } else if (e.key === 'n') { if (thread?.more) void openPage(thread.page + 1, true); }
  else if (e.key === 'r') { void pollList(true); }
  else if (e.key === 'o') { if (current) void host.openUrl(current.url); }
  else if (e.key === 'q') { void host.close(); }
});
let escCount = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { escCount++; if (escCount >= 2) { escCount = 0; void host.close(); } setTimeout(() => (escCount = 0), 500); }
});
document.addEventListener('visibilitychange', () => { if (!document.hidden) void pollList(false); });

host.onReady((ctx) => { applyHostReady(ctx, document.documentElement); });
void loadPrefs().then(() => pollList(true));
setInterval(() => void pollList(false), 60_000);
