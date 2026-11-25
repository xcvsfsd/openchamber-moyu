// 阅读：七源话题列表 + 按需 AI 总结。
// 列表只读；点 ✦ 拉正文（走 service），本机小模型总结后行内展开；无详情页。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import type { CommunityId, CommunityInfo, Thread, Topic } from '../shared/types.js';
import { COMMUNITIES } from '../shared/types.js';

// 全局报错浮层：宿主里出任何异常都写进 #msg2，空白页时也能定位
const bootErrors: string[] = [];
const showBootErrors = (): void => {
  const msg = document.querySelector('#msg2');
  if (msg && bootErrors.length > 0) msg.innerHTML = `<div class="err">${bootErrors.map((e) => e).join('<br>')}</div>`;
};
window.addEventListener('error', (e) => { bootErrors.push('页面错误：' + String((e as ErrorEvent).message ?? e)); showBootErrors(); });
window.addEventListener('unhandledrejection', (e) => {
  const r = (e as PromiseRejectionEvent).reason;
  const code = (r as { code?: string })?.code;
  bootErrors.push('未处理异常' + (code ? ` [${code}]` : '') + '：' + String((r as Error)?.message ?? r));
  showBootErrors();
});

let community: CommunityId = 'v2ex';
// 无可抓正文的源（反爬墙）：✦ 退化为标题版总结，标题后挂 ↗ 示意
const TITLE_ONLY: readonly string[] = ['zhihu', 'toutiao', 'csdn'];
const info = (): CommunityInfo => COMMUNITIES.find((c) => c.id === community)!;
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
aside{width:100%;display:flex;flex-direction:column;padding:10px 8px;gap:2px;overflow-y:auto}
.sec{font-size:12px;color:var(--oc-muted,#999);padding:8px 10px 4px}
.nrow{display:flex;gap:8px;align-items:flex-start;flex-wrap:wrap;width:100%;text-align:left;padding:7px 10px;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--oc-fg,inherit);font:inherit}
.nrow .tt{flex:1;min-width:0;font-size:13.5px;overflow-wrap:anywhere}
.nrow .mm{font-size:12px;color:var(--oc-muted,#999);white-space:nowrap}
.nrow .ext{color:var(--oc-muted,#999);font-size:12px;white-space:nowrap;margin-left:4px}
.nrow .aibtn{flex:0 0 auto;align-self:center;border:1px solid var(--oc-border,#8888);border-radius:999px;background:transparent;color:var(--oc-muted,#999);cursor:pointer;font-size:12px;padding:2px 9px;white-space:nowrap}
.nrow .aibtn:hover{color:var(--oc-fg,inherit);border-color:var(--oc-primary,#3574f0)}
.nrow .aisum{flex:1 1 100%;font-size:12.5px;line-height:1.7;opacity:.92;border-left:2px solid var(--oc-border,#8888);padding-left:8px;margin:2px 0 2px 2px}
.nrow .xp{display:block;font-size:12.5px;opacity:.8;margin-top:1px}
.nrow.chan .tt{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.nrow.chan .dot{color:var(--oc-muted,#999)}
#chanrow > div,#chanrow2 > div{display:flex;gap:4px;flex-wrap:wrap}
button.nrow:hover{background:var(--oc-hover,#8881)}
.nrow.active{background:var(--oc-hover,#8882)}
div.nrow:hover{background:var(--oc-hover,#8881)}
button,select,input,textarea{font:inherit}
.btn{padding:4px 10px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button:disabled{opacity:.5}
.btn.primary{background:var(--oc-primary,#3574f0);border-color:transparent;color:var(--oc-primary-fg,#fff)}
#msg2:empty{display:none}
#msg2{padding:4px 10px}#msg2 .err{margin-top:4px}
.err{background:#7f1d1d22;border:1px solid #7f1d1d66;border-radius:8px;padding:8px}
.mut{font-size:12px;color:var(--oc-muted,#999)}
#cfgside{border-top:1px solid var(--oc-border,#8883);margin-top:6px;padding:8px 6px 4px;display:flex;flex-direction:column;gap:6px}
#cfgside input{width:100%;padding:6px 8px;font-size:12.5px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:inherit}
#cfgver{padding:2px 10px 6px;font-size:11px}
</style>
<div style="display:flex;flex:1;min-height:0;width:100%" id="cols">
<aside>
  <div class="sec">社区</div><div id="chanrow"><div id="communities"></div></div>
  <div class="sec" id="sec-channels">频道</div><div id="chanrow2"><div id="channels"></div></div>
  <div class="sec">话题 <span id="tcount" class="mut"></span></div><div id="msg2"></div><div id="topics"></div>
  <div class="sec">配置</div>
  <div id="cfgside">
    <div class="mut">HTTP 代理（宿主不透传系统代理，直连失败时填）。只存本机。</div>
    <input id="cfg-proxy" type="text" placeholder="http://127.0.0.1:7897（留空=直连）" />
    <button class="btn primary" id="b-save">保存并测试</button>
    <div class="mut" id="cfg-out"></div>
  </div>
  <div class="mut" id="cfgver"><span id="cname"></span> · <span id="build"></span><br>R 刷新</div>
</aside>
</div>`;

const $ = <T extends HTMLElement>(id: string): T => document.querySelector(`#${id}`) as T;
const cname = $('cname');
const topicsEl = $('topics');

const BUILD = 'v0.8.1-cstatus';
cname.textContent = '阅读';
(document.querySelector('#build') as HTMLElement).textContent = BUILD;

let proxy = '';
let channel = info().channels[0]!.id;
let topics: Topic[] = [];
let listAt = 0;
let busy = false;
// 社区可用性：列表拉失败就标 ⚠（tooltip 见错因），成功即摘掉；只记访问过的
const commErr = new Map<CommunityId, string>();

const say = (html: string): void => {
  const m2 = document.querySelector('#msg2');
  if (m2) m2.innerHTML = html ? `<div class="err">${html}</div>` : '';
};
const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rel = (t: number | null): string => {
  if (!t) return '';
  const d = Date.now() - t;
  if (d < 60_000) return '刚刚'; if (d < 3600_000) return `${Math.floor(d / 60_000)} 分钟前`;
  if (d < 86400_000) return `${Math.floor(d / 3600_000)} 小时前`;
  return new Date(t).toLocaleDateString();
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
  const savedC = (await storeGet('moyu:community') as CommunityId | undefined) ?? 'v2ex';
  if (COMMUNITIES.some((c) => c.id === savedC)) community = savedC;
  proxy = (await storeGet('moyu:proxy') as string | undefined) ?? '';
  (document.querySelector('#cfg-proxy') as HTMLInputElement).value = proxy;
  const ch = (await storeGet(`moyu:channel:${community}`) as string | undefined) ?? '';
  channel = info().channels[0]!.id;
  if (ch && info().channels.some((c) => c.id === ch)) channel = ch;
};

const paintCommunities = (): void => {
  const box = $('communities');
  box.innerHTML = '';
  for (const c of COMMUNITIES) {
    const b = document.createElement('button');
    b.className = 'nrow chan' + (community === c.id ? ' active' : '');
    const bad = commErr.get(c.id);
    const mark = bad ? ` <span class="ext" title="${esc(bad)}">⚠</span>` : '';
    b.innerHTML = `<span class="dot">●</span><span class="tt">${esc(c.name)}${mark}</span>`;
    b.onclick = () => { if (community !== c.id) void switchCommunity(c.id); };
    box.appendChild(b);
  }
};

const switchCommunity = async (id: CommunityId): Promise<void> => {
  community = id;
  await storeSet('moyu:community', community);
  channel = info().channels[0]!.id;
  topics = []; listAt = 0;
  (document.querySelector('#cfg-out') as HTMLElement).textContent = '';
  const ch = (await storeGet(`moyu:channel:${community}`) as string | undefined) ?? '';
  if (ch && info().channels.some((c) => c.id === ch)) channel = ch;
  paintCommunities();
  paintList();
  void pollList(true);
};

const paintChannels = (): void => {
  // 单频道的源（榜单类）藏起整行，只剩一个选项没有意义
  const single = info().channels.length <= 1;
  ($('sec-channels') as HTMLElement).style.display = single ? 'none' : '';
  ($('chanrow2') as HTMLElement).style.display = single ? 'none' : '';
  if (single) return;
  const box = $('channels');
  box.innerHTML = '';
  for (const c of info().channels) {
    const b = document.createElement('button');
    b.className = 'nrow chan' + (channel === c.id ? ' active' : '');
    b.innerHTML = `<span class="dot">#</span><span class="tt">${esc(c.name)}</span>`;
    b.onclick = () => { if (channel !== c.id) { channel = c.id; listAt = 0; void storeSet(`moyu:channel:${community}`, channel); paintChannels(); void pollList(true); } };
    box.appendChild(b);
  }
};

const paintList = (): void => {
  paintCommunities();
  paintChannels();
  ($('tcount') as HTMLElement).textContent = topics.length > 0 ? `${topics.length}` : '';
  topicsEl.innerHTML = '';
  for (const t of topics) {
    const d = document.createElement('div');
    d.className = 'nrow';
    const parts: string[] = [];
    if (t.author) parts.push(esc(t.author));
    if (t.channel) parts.push(esc(t.channel));
    if (t.replies !== null) parts.push(`${t.replies}回复`);
    if (t.time) parts.push(rel(t.time));
    // 无可抓正文的源标题后挂 ↗（✦ 为标题版总结）
    const ext = (TITLE_ONLY as readonly string[]).includes(t.community)
      ? ' <span class="ext" title="该源无可抓正文，✦ 为标题版总结">↗</span>' : '';
    const xcp = t.excerpt ? `<br><span class="xp">${esc(t.excerpt)}</span>` : '';
    d.innerHTML = `<span class="tt">${esc(t.title)}${ext}${xcp}${parts.length > 0 ? `<br><span class="mm" style="font-size:12px;color:var(--oc-muted,#999)">${parts.join(' · ')}</span>` : ''}</span>`;
    const b = document.createElement('button');
    b.className = 'aibtn';
    b.title = 'AI 总结这篇';
    b.textContent = '✦';
    b.onclick = () => void summarize(t, d, b);
    d.appendChild(b);
    topicsEl.appendChild(d);
  }
};

// 按需 AI 总结：点 ✦ 拉正文（走 service），用小模型总结后展开在行内；结果按话题缓存。
// 无可抓正文的源退化为标题版总结（明确标注）。
const htmlText = (html: string): string =>
  html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi, '\n').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
const summarize = async (t: Topic, row: HTMLElement, btn: HTMLButtonElement): Promise<void> => {
  const old = row.querySelector('.aisum');
  if (old) { old.remove(); return; } // 再点收起
  const key = `moyu:csum:${community}:${t.id}`;
  btn.disabled = true;
  const label = btn.textContent;
  btn.textContent = '…';
  try {
    const hit = await storeGet(key);
    let s = typeof hit === 'string' && hit ? hit : '';
    if (!s) {
      const r = await svc('GET', `/thread?community=${community}&id=${encodeURIComponent(t.id)}&page=1`);
      const j = JSON.parse(r.body) as { ok: boolean; thread?: Thread; error?: string };
      if (!j.ok || !j.thread) throw new Error(j.error ?? '正文失败');
      const th = j.thread;
      const text = [th.opening ? htmlText(th.opening.html) : '', ...th.posts.map((p) => htmlText(p.html))]
        .filter(Boolean).join('\n').slice(0, 3500);
      if (!text) {
        // 无可抓正文：退化为标题版总结
        if (!(TITLE_ONLY as readonly string[]).includes(t.community)) throw new Error('这篇没有可总结的正文');
        const g = await host.generate({
          system: '你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。',
          prompt: `【${info().name}/${t.channel ?? ''}】${t.title}`,
          maxOutputTokens: 64,
        });
        s = g.text.trim().slice(0, 80);
        if (!s) throw new Error('小模型没有返回总结');
        s += '（标题版）';
      } else {
        const g = await host.generate({
          system: '你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。',
          prompt: `【${t.title}】\n${text}`,
          maxOutputTokens: 256,
        });
        s = g.text.trim().slice(0, 500);
        if (!s) throw new Error('小模型没有返回总结');
      }
      await storeSet(key, s);
    }
    const d = document.createElement('div');
    d.className = 'aisum';
    d.textContent = `✦ ${s}`;
    row.appendChild(d);
  } catch (e) {
    const code = (e as { code?: string })?.code;
    const msg = code === 'NO_MODEL' ? '无可用小模型'
      : code === 'MODEL_FAILED' ? '小模型出错'
      : e instanceof Error ? e.message : '未知错误';
    const d = document.createElement('div');
    d.className = 'aisum';
    d.textContent = `总结失败：${msg}`;
    row.appendChild(d);
  } finally {
    btn.disabled = false;
    btn.textContent = label;
  }
};

const pollList = async (force = false): Promise<void> => {
  if (busy || document.hidden) return;
  // 频道以最后一次切换为准（两边共用 storage）
  const storedCh = (await storeGet(`moyu:channel:${community}`) as string | undefined) ?? '';
  if (storedCh && storedCh !== channel && info().channels.some((c) => c.id === storedCh)) {
    channel = storedCh; listAt = 0;
  }
  if (!force && Date.now() - listAt < LIST_TTL && topics.length > 0) return;
  busy = true;
  try {
    const r = await svc('GET', `/list?community=${community}&channel=${encodeURIComponent(channel)}`);
    const j = JSON.parse(r.body) as { ok: boolean; topics?: Topic[]; error?: string };
    if (!j.ok) {
      const msg = j.error ?? '列表失败';
      commErr.set(community, msg);
      paintCommunities();
      say(esc(msg));
      return;
    }
    say('');
    commErr.delete(community);
    topics = j.topics ?? [];
    listAt = Date.now();
    paintList();
  } catch (e) {
    const code = (e as { code?: string })?.code;
    const hint = code === 'NO_SERVICE' ? '（service 没起来：去 设置→扩展 看阅读卡片上的 service 错误）'
      : code === 'NOT_GRANTED' ? '（service 能力没批准：重装时勾上）' : '';
    const msg = `列表失败${code ? ` [${code}]` : ''}：${e instanceof Error ? e.message : '未知错误'}${hint}`;
    commErr.set(community, msg);
    paintCommunities();
    say(esc(msg));
    return;
  } finally { busy = false; }
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

// 快捷键（输入框聚焦时不触发）
document.addEventListener('keydown', (e) => {
  const tag = (e.target as HTMLElement)?.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') return;
  // 带 Ctrl/Cmd/Alt 的组合键一律不碰，留给宿主和浏览器
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'r') { void pollList(true); }
  else if (e.key === 'q') { void host.close(); }
});
let escCount = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { escCount++; if (escCount >= 2) { escCount = 0; void host.close(); } setTimeout(() => (escCount = 0), 500); }
});
document.addEventListener('visibilitychange', () => { if (!document.hidden) void pollList(false); });

host.onReady((ctx) => { applyHostReady(ctx, document.documentElement); });
// 窄 rail 自适应（单列列表，无详情列）
const fitNarrow = (): void => {
  const w = document.documentElement.clientWidth;
  document.body.dataset.narrow = w > 0 && w < 700 ? '1' : '';
};
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => fitNarrow()).observe(document.documentElement);
else window.addEventListener('resize', () => fitNarrow());
fitNarrow();
void loadPrefs().then(() => { paintCommunities(); paintChannels(); void pollList(true); });
setInterval(() => void pollList(false), 60_000);
