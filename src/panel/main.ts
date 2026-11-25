// 假聊天阅读页：话题列表=会话，楼主=用户消息，回帖=助手回答（moyu 隐喻）。
// 全屏 page，不碰真会话；网络全走 serviceRequest；论坛 HTML 先洗后渲染。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import DOMPurify from 'dompurify';
import type { CommunityId, Thread, Topic } from '../shared/types.js';
import { COMMUNITIES } from '../shared/types.js';

// 全局报错浮层：宿主里出任何异常都写进 #msg，空白页时也能定位
const bootErrors: string[] = [];
const showBootErrors = (): void => {
  const msg = document.querySelector('#msg');
  if (msg && bootErrors.length > 0) msg.innerHTML = `<div class="err">${bootErrors.map((e) => e).join('<br>')}</div>`;
};
window.addEventListener('error', (e) => { bootErrors.push('页面错误：' + String((e as ErrorEvent).message ?? e)); showBootErrors(); });
window.addEventListener('unhandledrejection', (e) => {
  const r = (e as PromiseRejectionEvent).reason;
  const code = (r as { code?: string })?.code;
  bootErrors.push('未处理异常' + (code ? ` [${code}]` : '') + '：' + String((r as Error)?.message ?? r));
  showBootErrors();
});

const COMMUNITY = (document.querySelector('meta[name="moyu-community"]')?.getAttribute('content') === 'v2ex' ? 'v2ex' : 'linuxdo') as CommunityId;
const INFO = COMMUNITIES.find((c) => c.id === COMMUNITY)!;
const LIST_TTL = 3 * 60 * 1000;

const host = connectHost();
const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing #app');

root.innerHTML = `
<style>
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;font:14px/1.6 var(--oc-font,system-ui,sans-serif);background:var(--oc-bg,#1b1e22);color:var(--oc-fg,inherit)}
#app{display:flex;height:100vh;overflow:hidden;background:var(--oc-bg,#1b1e22);color:var(--oc-fg,inherit);position:relative}
/* 左：原生侧栏 */
aside{width:300px;min-width:250px;max-width:340px;display:flex;flex-direction:column;padding:10px 8px;gap:2px;overflow-y:auto}
.sec{font-size:12px;color:var(--oc-muted,#999);padding:8px 10px 4px}
.nrow{display:flex;gap:8px;align-items:baseline;width:100%;text-align:left;padding:7px 10px;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--oc-fg,inherit);cursor:pointer;font:inherit}
button.nrow:hover{background:var(--oc-hover,#8881)}
.nrow.active{background:var(--oc-hover,#8882)}
.nrow .tt{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:13.5px}
.nrow .mm{font-size:12px;color:var(--oc-muted,#999);white-space:nowrap}
.nrow .go{flex:0 0 auto;border:1px solid var(--oc-border,#8888);border-radius:999px;background:transparent;color:var(--oc-muted,#999);cursor:pointer;font-size:12px;padding:2px 8px;white-space:nowrap}
.nrow .go:hover{color:var(--oc-fg,inherit);border-color:var(--oc-primary,#3574f0)}
.nrow.chan .tt{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-line-clamp:1}
.nrow.chan .dot{color:var(--oc-muted,#999)}
/* 中：原生聊天列 */
main{flex:1;display:flex;flex-direction:column;min-width:0}
.hd .crumb{font-weight:700}
button,select,input,textarea{font:inherit}
.btn{padding:4px 10px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button:disabled{opacity:.5}
.btn.primary{background:var(--oc-primary,#3574f0);border-color:transparent;color:var(--oc-primary-fg,#fff)}
#msg:empty{display:none}
#msg{padding:0 12px}#msg .err{margin-top:8px}
.err{background:#7f1d1d22;border:1px solid #7f1d1d66;border-radius:8px;padding:8px}
#thread{flex:1;overflow-y:auto;padding:18px 20px 48px;display:flex;flex-direction:column;gap:20px;max-width:1120px;width:100%;margin:0 auto}
.act{display:flex;gap:8px;align-items:center;font-size:12.5px;color:var(--oc-muted,#999)}
.act .sep{opacity:.6}
.msg{display:flex;flex-direction:column;gap:2px;max-width:100%}
.msg .bubble{border-radius:12px;padding:10px 16px;word-break:break-word;line-height:1.7;font-size:14px}
.msg.mine{align-items:flex-end}
.msg.mine .bubble{background:var(--oc-elevated,#26292e);border:1px solid var(--oc-border,#8883);max-width:80%}
.msg.theirs .bubble{padding:2px;max-width:100%}
.msg .meta{display:flex;gap:8px;align-items:center;font-size:12px;color:var(--oc-muted,#999);margin-top:5px}
.msg .meta .sep{opacity:.6}
.msg .meta .op{font-size:11px;border:1px solid var(--oc-border,#8888);border-radius:999px;padding:0 7px}
.msg .body{word-break:break-word;line-height:1.7;font-size:14px}
.msg .body p{margin:0 0 10px}.msg .body p:last-child{margin-bottom:0}
.msg .body pre{background:var(--oc-elevated,#26292e);border:1px solid var(--oc-border,#8883);border-radius:10px;padding:10px 12px;overflow-x:auto;font-family:var(--oc-mono,monospace);font-size:12.5px;line-height:1.6}
.msg .body pre code{background:none;border:none;padding:0;font-size:inherit}
.msg .body code{font-family:var(--oc-mono,monospace);font-size:12.5px;background:var(--oc-hover,#8882);border-radius:6px;padding:1px 6px}
.msg .body blockquote{margin:8px 0;padding:2px 0 2px 12px;border-left:2px solid var(--oc-border,#8888);color:var(--oc-muted,#999)}
.msg .body ul,.msg .body ol{margin:6px 0;padding-left:22px}
.msg .body li{margin:3px 0}
.msg .body table{border-collapse:collapse;margin:8px 0;font-size:13px}
.msg .body th,.msg .body td{border:1px solid var(--oc-border,#8883);padding:5px 10px;text-align:left}
.msg .body th{background:var(--oc-hover,#8881)}
.msg .body img{max-width:100%;border-radius:8px}
.msg .body a{color:inherit}
.msg .body h1,.msg .body h2,.msg .body h3{font-size:1.05em;margin:12px 0 6px}
.imgph{border:1px dashed var(--oc-border,#8888);border-radius:8px;padding:8px;font-size:12px;color:var(--oc-muted,#999);cursor:pointer}
.mut{font-size:12px;color:var(--oc-muted,#999)}.row{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
/* 窄 rail：目录在上、正文在下堆叠，看正文时切 thread 视图 */
body[data-narrow="1"] #app{flex-direction:column}
body[data-narrow="1"] aside{width:100%;max-width:none;max-height:42%;border-bottom:1px solid var(--oc-border,#8883);padding:6px;flex-shrink:0}
body[data-narrow="1"] #chanrow{display:flex;overflow-x:auto;scrollbar-width:none}
body[data-narrow="1"] #chanrow::-webkit-scrollbar{display:none}
body[data-narrow="1"] .nrow.chan{flex:0 0 auto}
body[data-narrow="1"] main{border-left:none;min-height:0}
body[data-narrow="1"][data-view="thread"] aside{display:none}
body[data-narrow="1"] #b-back{display:inline-block}
#b-back{display:none}
#threadbar{display:none;padding:8px 12px;border-bottom:1px solid var(--oc-border,#8883);align-items:center;gap:8px}
body[data-narrow="1"][data-view="thread"] #threadbar{display:flex}
#threadbar .tt{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--oc-muted,#999);font-size:12px}

#cfgside{border-top:1px solid var(--oc-border,#8883);margin-top:6px;padding:8px 6px 4px;display:flex;flex-direction:column;gap:6px}
#cfgside input{width:100%;padding:6px 8px;font-size:12.5px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:inherit}
#cfgver{padding:2px 10px 6px;font-size:11px}
</style>
<div style="display:flex;flex:1;min-height:0;width:100%" id="cols">
<aside>
  <div class="sec">频道</div><div id="chanrow"><div id="channels"></div></div>
  <div class="sec">话题 <span id="tcount" class="mut"></span></div><div id="topics"></div>
  <div class="sec">配置</div>
  <div id="cfgside">
    <div class="mut">HTTP 代理（宿主不透传系统代理，直连失败时填）。只存本机。</div>
    <input id="cfg-proxy" type="text" placeholder="http://127.0.0.1:7897（留空=直连）" />
    <button class="btn primary" id="b-save">保存并测试</button>
    <div class="mut" id="cfg-out"></div>
  </div>
  <div class="mut" id="cfgver"><span id="cname"></span> · <span id="build"></span></div>
</aside>
<main>
  <div id="threadbar"><button class="btn" id="b-back" title="返回列表">‹</button><span class="tt" id="topic-crumb"></span></div>
  <div id="msg"></div>
  <div id="thread"></div>
</main>
</div>`;

const $ = <T extends HTMLElement>(id: string): T => document.querySelector(`#${id}`) as T;
const cname = $('cname');
const topicsEl = $('topics'), threadEl = $('thread'), msgEl = $('msg');

const BUILD = 'v0.3.6-railall';
cname.textContent = INFO.name === 'linux.do' ? '阅读 L' : '阅读 V';
(document.querySelector('#build') as HTMLElement).textContent = BUILD;

type Prefs = { stream: boolean; images: boolean; mask: boolean };
let prefs: Prefs = { stream: true, images: false, mask: false };
let proxy = '';
let channel = INFO.channels[0]!.id;
let topics: Topic[] = [];
let listAt = 0;
let current: Topic | null = null;
let thread: Thread | null = null;
let busy = false;
let threadLoading = false;

const paintThreadPlaceholder = (): void => {
  if (thread || threadLoading) return;
  threadEl.innerHTML = `<div style="margin:auto;text-align:center;color:var(--oc-muted,#999);font-size:13px;padding:40px 0">从左侧选一个话题开始阅读</div>`;
};

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

const svc = async (method: string, path: string, body?: string): Promise<{ status: number; body: string }> => {
  // 代理跟每个请求走（service 读不到宿主 env），?proxy= 与 x-proxy 等价，这里统一拼 query
  let p = path;
  if (proxy && method === 'GET' && p.startsWith('/')) p += (p.includes('?') ? '&' : '?') + `proxy=${encodeURIComponent(proxy)}`;
  return host.serviceRequest({ method: method as 'GET' | 'POST', path: p, body });
};

const loadPrefs = async (): Promise<void> => {
  const v = await storeGet(`moyu:prefs:${COMMUNITY}`) as Prefs | undefined;
  if (v && typeof v.stream === 'boolean') prefs = v;
  proxy = (await storeGet('moyu:proxy') as string | undefined) ?? '';
  (document.querySelector('#cfg-proxy') as HTMLInputElement).value = proxy;
  const ch = (await storeGet(`moyu:channel:${COMMUNITY}`) as string | undefined) ?? '';
  if (ch && INFO.channels.some((c) => c.id === ch)) channel = ch;
  paintSwitches();
};
const isNarrow = (): boolean => document.body.dataset.narrow === '1';
const savePrefs = (): void => { void storeSet(`moyu:prefs:${COMMUNITY}`, prefs); };
const paintSwitches = (): void => {
  // 开关已随回复框移除，这里只做空保护（图片占位点击会调到）
  for (const id of ['sw-stream', 'sw-img']) {
    const el = document.querySelector(`#${id}`);
    if (!el) continue;
  }
};

const paintChannels = (): void => {
  const box = $('channels');
  box.innerHTML = '';
  for (const c of INFO.channels) {
    const b = document.createElement('button');
    b.className = 'nrow chan' + (channel === c.id ? ' active' : '');
    b.innerHTML = `<span class="dot">#</span><span class="tt">${esc(c.name)}</span>`;
    b.onclick = () => { if (channel !== c.id) { channel = c.id; listAt = 0; void storeSet(`moyu:channel:${COMMUNITY}`, channel); paintChannels(); void pollList(true); } };
    box.appendChild(b);
  }
};

const paintList = (): void => {
  paintChannels();
  ($('tcount') as HTMLElement).textContent = topics.length > 0 ? `${topics.length}` : '';
  topicsEl.innerHTML = '';
  for (const t of topics) {    const d = document.createElement('div');
    d.className = 'nrow' + (current?.id === t.id ? ' active' : '');
    d.innerHTML = `<span class="tt">${esc(t.title)}<br><span class="mm" style="font-size:12px;color:var(--oc-muted,#999)">${esc(t.author)}${t.channel ? ` · ${esc(t.channel)}` : ''} · ${t.replies ?? '-'}回复 · ${rel(t.time)}</span></span>`;
    const go = document.createElement('button');
    go.className = 'go';
    go.title = '在会话中打开（进左侧聊天）';
    go.textContent = '💬';
    go.onclick = (e) => { e.stopPropagation(); void openInSession(t, go); };
    d.appendChild(go);
    d.onclick = () => void openTopic(t);
    topicsEl.appendChild(d);
  }
  const crumb = $('topic-crumb');
  crumb.textContent = current ? `/ ${current.title.slice(0, 24)}` : '';
};

// 在会话中打开：话题变成左侧原生聊天，正文进上下文，可直接跟模型聊（moyu 隐喻落地）
const textOf = (html: string): string =>
  (html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi, '\n').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .split('\n').map((l) => l.trim()).filter(Boolean).join('\n')).slice(0, 1200);

const openInSession = async (t: Topic, btn: HTMLButtonElement): Promise<void> => {
  btn.disabled = true;
  const old = btn.textContent;
  btn.textContent = '…';
  try {
    let th: Thread | null = current?.id === t.id ? thread : null;
    if (!th) {
      const r = await svc('GET', `/thread?community=${COMMUNITY}&id=${encodeURIComponent(t.id)}&page=1`);
      const j = JSON.parse(r.body) as { ok: boolean; thread?: Thread; error?: string };
      if (!j.ok || !j.thread) { say(esc(j.error ?? '正文失败')); return; }
      th = j.thread;
    }
    const lines = [`# ${t.title}`, '', `原文：${t.url}`, ''];
    if (th.opening) { lines.push(`楼主 ${th.opening.author}：`, textOf(th.opening.html), ''); }
    const posts = th.posts.slice(-12);
    for (const p of posts) lines.push(`#${p.floor} ${p.author}：`, textOf(p.html), '');
    const digest = lines.join('\n').slice(0, 15000);
    await host.startSession({
      providerId: `moyu-${COMMUNITY}`, id: t.id, title: t.title, url: t.url, text: digest,
      navigation: 'open',
    });
    await host.toast({ kind: 'success', message: '已在左侧会话中打开' });
  } catch (e) {
    const code = (e as { code?: string })?.code;
    const hint = code === 'NOT_GRANTED' ? '（sessions 能力没批准：重装/更新时勾上）' : '';
    say(esc(`打开会话失败${code ? ` [${code}]` : ''}：${e instanceof Error ? e.message : '未知错误'}${hint}`));
  } finally {
    btn.disabled = false;
    btn.textContent = old;
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

const msgCard = (mine: boolean, author: string, time: number | null, html: string, tags: string[]): string =>
  mine ? `<div class="msg mine"><div class="bubble"><div class="body">${proxyImg(html)}</div></div></div>`
    : `<div class="msg theirs"><div class="bubble"><div class="body">${proxyImg(html)}</div></div><div class="meta">${[esc(author), rel(time), ...tags].filter(Boolean).join('<span class="sep">·</span>')}</div></div>`;

const paintThread = async (animate: boolean): Promise<void> => {
  threadEl.innerHTML = '';
  if (!thread) { paintThreadPlaceholder(); return; }
  // 原生“活动行”：帖子上下文（作者·频道·回复数·时间）
  const t = thread.topic;
  const act = `<div class="act"><span>帖子</span><span class="sep">›</span><span>${esc(t.author)}${t.channel ? ` · ${esc(t.channel)}` : ''} · ${t.replies ?? '-'}回复 · ${rel(t.time)}</span></div>`;
  const cards: string[] = [act];
  if (thread.opening) cards.push(msgCard(true, thread.opening.author, thread.opening.time, thread.opening.html, []));
  thread.posts.forEach((p) => {
    const tags = [`<span class="op">楼主</span>`, `#${p.floor}`, p.replyTo ? `回复 #${p.replyTo}` : '', p.likes !== null ? `❤${p.likes}` : ''].filter((s, i) => i === 0 ? p.byAuthor : Boolean(s));
    cards.push(msgCard(false, p.author, p.time, p.html, tags));
  });
  if (!prefs.stream || !animate) {
    threadEl.innerHTML = cards.join('') + (thread.more ? `<button class="btn" id="more">继续加载第 ${thread.page + 1} 页</button>` : '');
  } else {
    for (const c of cards) {
      const d = document.createElement('div');
      d.innerHTML = c;
      threadEl.appendChild(d.firstElementChild!);
      await new Promise((r) => setTimeout(r, 60));
    }
    if (thread.more) { const b = document.createElement('button'); b.className = 'btn'; b.id = 'more'; b.textContent = `继续加载第 ${thread.page + 1} 页`; threadEl.appendChild(b); }
  }
  const moreBtn = threadEl.querySelector('#more');
  if (moreBtn) (moreBtn as HTMLButtonElement).onclick = () => void openPage(thread!.page + 1, true);
  await hydrateImages(threadEl);
  const key = `moyu:pos:${COMMUNITY}:${current!.id}`;
  void storeSet(key, { page: thread.page });
};

const pollList = async (force = false): Promise<void> => {
  if (busy || document.hidden) return;
  // 频道以 rail 那边最后一次切换为准（两边共用 storage）
  const storedCh = (await storeGet(`moyu:channel:${COMMUNITY}`) as string | undefined) ?? '';
  if (storedCh && storedCh !== channel && INFO.channels.some((c) => c.id === storedCh)) {
    channel = storedCh; listAt = 0;
  }
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
    // 进来即有内容：首次加载自动打开第一帖
    if (!current && topics.length > 0) { void openTopic(topics[0]!); return; }
  } catch (e) {
    const code = (e as { code?: string })?.code;
    const hint = code === 'NO_SERVICE' ? '（service 没起来：去 设置→扩展 看阅读卡片上的 service 错误）'
      : code === 'NOT_GRANTED' ? '（service 能力没批准：重装时勾上）' : '';
    say(esc(`列表失败${code ? ` [${code}]` : ''}：${e instanceof Error ? e.message : '未知错误'}${hint}`));
    return;
  } finally { busy = false; }
};

const openTopic = async (t: Topic): Promise<void> => {
  current = t; thread = null; paintList();
  if (isNarrow()) document.body.dataset.view = 'thread';
  await openPage(1, true);
};

const openPage = async (page: number, animate: boolean): Promise<void> => {
  if (!current) return;
  threadLoading = true;
  threadEl.innerHTML = `<div style="margin:auto;color:var(--oc-muted,#999);font-size:13px;padding:40px 0">加载中…</div>`;
  try {
    const r = await svc('GET', `/thread?community=${COMMUNITY}&id=${encodeURIComponent(current.id)}&page=${page}`);
    const j = JSON.parse(r.body) as { ok: boolean; thread?: Thread; error?: string };
    if (!j.ok) { say(esc(j.error ?? '正文失败')); return; }
    say('');
    if (page === 1 || !thread) thread = j.thread!;
    else thread = { ...j.thread!, posts: [...thread.posts, ...j.thread!.posts] };
    threadLoading = false;
    await paintThread(animate);
  } catch (e) {
    threadLoading = false;
    const code = (e as { code?: string })?.code;
    say(esc(`正文失败${code ? ` [${code}]` : ''}：${e instanceof Error ? e.message : '未知错误'}`));
  }
};

$('b-save').onclick = async () => {
  const v = (document.querySelector('#cfg-proxy') as HTMLInputElement).value.trim();
  if (v && !/^https?:\/\/.+/.test(v)) { $('cfg-out').textContent = '格式不对，要 http(s)://host:port'; return; }
  proxy = v;
  await storeSet('moyu:proxy', proxy);
  $('cfg-out').textContent = '已保存，正在测试…';
  listAt = 0;
  await pollList(true);
  $('cfg-out').textContent = topics.length > 0 ? `连通（${topics.length} 条）` : '仍失败，看列表上方红字（可能是代理地址不对或要认证）';
};

// 快捷键 R 刷新 / O 浏览器打开（只读页，无输入框）
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
paintThreadPlaceholder();
$('b-back').onclick = () => { document.body.dataset.view = 'list'; };
// 窄 rail 只做导航器（main 隐藏），宽页只做阅读器（aside 隐藏）
const fitNarrow = (): void => {
  const w = document.documentElement.clientWidth;
  document.body.dataset.narrow = w > 0 && w < 700 ? '1' : '';
  if (!document.body.dataset.view) document.body.dataset.view = 'list';
};
new ResizeObserver(() => fitNarrow()).observe(document.documentElement);
fitNarrow();
void loadPrefs().then(() => { paintChannels(); void pollList(true); });
setInterval(() => void pollList(false), 60_000);
