// 阅读：融合信息流 + AI 分类 + 按需 AI 总结（无详情页）。
// 一次拉全社区全频道，标题列表按 AI 分类成组；点 ✦ 拉正文总结。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import type { CommunityId, Thread, Topic } from '../shared/types.js';
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

// 无可抓正文的源：✦ 先联网搜索再总结（标题版兜底）
const TITLE_ONLY: readonly string[] = ['toutiao'];
// AI 分类候选（固定集合，避免碎片化）
const CATS = ['AI科技', '数码', '互联网', '财经', '时政', '社会', '娱乐', '体育', '汽车', '房产', '教育', '健康', '科学', '游戏', '其他'];
const LIST_TTL = 3 * 60 * 1000;
const PER_PAIR = 12; // 每个社区频道最多取几条（19 个榜单，控制总量）
const CAT_BATCH = 25; // 一次分类几条标题

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
.nrow .src{display:block;font-size:11.5px;color:var(--oc-muted,#999);margin-top:1px}
.nrow .aibtn{flex:0 0 auto;align-self:center;border:1px solid var(--oc-border,#8888);border-radius:999px;background:transparent;color:var(--oc-muted,#999);cursor:pointer;font-size:12px;padding:2px 9px;white-space:nowrap}
.nrow .aibtn:hover{color:var(--oc-fg,inherit);border-color:var(--oc-primary,#3574f0)}
.nrow .aisum{flex:1 1 100%;font-size:12.5px;line-height:1.7;opacity:.92;border-left:2px solid var(--oc-border,#8888);padding-left:8px;margin:2px 0 2px 2px}
.nrow .xp{display:block;font-size:12.5px;opacity:.8;margin-top:1px}
.cathead{font-size:12px;color:var(--oc-muted,#999);padding:10px 10px 2px;font-weight:700}
#catchips{display:flex;gap:6px;flex-wrap:wrap;padding:2px 10px 4px}
#catchips button{border:1px solid var(--oc-border,#8888);border-radius:999px;background:transparent;color:var(--oc-muted,#999);cursor:pointer;font-size:12px;padding:2px 10px;white-space:nowrap}
#catchips button.on{color:var(--oc-fg,inherit);border-color:var(--oc-primary,#3574f0)}
button,select,input,textarea{font:inherit}
.btn{padding:4px 10px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button:disabled{opacity:.5}
.btn.primary{background:var(--oc-primary,#3574f0);border-color:transparent;color:var(--oc-primary-fg,#fff)}
#msg2:empty{display:none}
#msg2{padding:4px 10px}#msg2 .err{margin-top:4px}
.err{background:#7f1d1d22;border:1px solid #7f1d1d66;border-radius:8px;padding:8px}
.mut{font-size:12px;color:var(--oc-muted,#999)}
div.nrow:hover{background:var(--oc-hover,#8881)}
#cfgside{border-top:1px solid var(--oc-border,#8883);margin-top:6px;padding:8px 6px 4px;display:flex;flex-direction:column;gap:6px}
#cfgside input{width:100%;padding:6px 8px;font-size:12.5px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:inherit}
#cfgver{padding:2px 10px 6px;font-size:11px}
</style>
<div style="display:flex;flex:1;min-height:0;width:100%" id="cols">
<aside>
  <div class="sec">话题 <span id="tcount" class="mut"></span> <button class="btn" id="b-refresh" title="手动刷新">↻</button></div><div id="msg2"></div><div id="catchips"></div><div id="topics"></div>
  <div class="sec">配置</div>
  <div id="cfgside">
    <div class="mut">HTTP 代理（宿主不透传系统代理，直连失败时填）。只存本机。</div>
    <input id="cfg-proxy" type="text" placeholder="http://127.0.0.1:7897（留空=直连）" />
    <button class="btn primary" id="b-save">保存并测试</button>
    <div class="mut" id="cfg-out"></div>
  </div>
  <div class="mut" id="cfgver"><span id="cname"></span> · <span id="build"></span></div>
</aside>
</div>`;

const $ = <T extends HTMLElement>(id: string): T => document.querySelector(`#${id}`) as T;
const cname = $('cname');
const topicsEl = $('topics');
const chipsEl = $('catchips');

const BUILD = 'v0.10.1-catprog';
cname.textContent = '阅读';
(document.querySelector('#build') as HTMLElement).textContent = BUILD;

let proxy = '';
let topics: Topic[] = [];
let failed: string[] = [];
let listAt = 0;
let busy = false;
let feedRun = 0;
// 分类：内存 + storage 双缓存（标题键），失败的源不阻塞
const catMem = new Map<string, string>();
let catsOff = false;
let selCat = '';
let catDone = 0;
let catTotal = 0;
let catRunning = false;

const say = (html: string): void => {
  const m2 = document.querySelector('#msg2');
  if (m2) m2.innerHTML = html ? `<div class="err">${html}</div>` : '';
};
const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const storeGet = async (k: string): Promise<unknown> => { try { return await host.storage.get(k); } catch { return undefined; } };
const storeSet = async (k: string, v: unknown): Promise<void> => { try { await host.storage.set(k, v as never); } catch { /* 忽略，页内保持 */ } };

const svc = async (method: string, path: string, body?: string): Promise<{ status: number; body: string }> => {
  // 代理跟每个请求走（service 读不到宿主 env），?proxy= 与 x-proxy 等价这里统一拼 query
  let p = path;
  if (proxy && method === 'GET' && p.startsWith('/')) p += (p.includes('?') ? '&' : '?') + `proxy=${encodeURIComponent(proxy)}`;
  return host.serviceRequest({ method: method as 'GET' | 'POST', path: p, body });
};

const srcName = (_c: { name: string }, _ch: { name: string }, _multi: boolean): string => '';

const paintChips = (cats: string[]): void => {
  chipsEl.innerHTML = '';
  if (cats.length === 0) return;
  const all = document.createElement('button');
  all.textContent = '全部';
  all.className = selCat === '' ? 'on' : '';
  all.onclick = () => { selCat = ''; paintList(); };
  chipsEl.appendChild(all);
  for (const c of cats) {
    const b = document.createElement('button');
    const n = topics.filter((t) => catMem.get(ckey(t)) === c).length;
    b.textContent = `${c} ${n}`;
    b.className = selCat === c ? 'on' : '';
    b.onclick = () => { selCat = selCat === c ? '' : c; paintList(); };
    chipsEl.appendChild(b);
  }
};

const ckey = (t: Topic): string => `moyu:cat:${t.community}:${t.id}:${t.title.slice(0, 30)}`;

const paintList = (): void => {
  const present = [...new Set(topics.map((t) => catMem.get(ckey(t))).filter((c): c is string => !!c))];
  const ordered = CATS.filter((c) => present.includes(c));
  paintChips(ordered);
  const tstr = listAt > 0 ? (() => { const d = new Date(listAt); return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`; })() : '';
  const fail = failed.length > 0 ? ` · ${failed.join('、')}暂不可用` : '';
  const cprog = catRunning ? ` · 分类 ${catDone}/${catTotal}` : '';
  ($('tcount') as HTMLElement).textContent = topics.length > 0 ? `${topics.length}${tstr ? ` · 更新 ${tstr}` : ''}${cprog}${fail}` : fail.replace(/^ · /, '');
  topicsEl.innerHTML = '';
  const groups = selCat ? [selCat] : ordered.length > 0 ? ordered : [''];
  for (const g of groups) {
    if (!selCat && g) {
      const h = document.createElement('div');
      h.className = 'cathead';
      h.textContent = g;
      topicsEl.appendChild(h);
    }
    for (const t of topics) {
      if (g && catMem.get(ckey(t)) !== g) continue;
      const d = document.createElement('div');
      d.className = 'nrow';
      const xcp = t.excerpt ? `<br><span class="xp">${esc(t.excerpt)}</span>` : '';
      d.innerHTML = `<span class="tt">${esc(t.title)}${xcp}</span>`;
      const b = document.createElement('button');
      b.className = 'aibtn';
      b.title = 'AI 总结这篇';
      b.textContent = '✦';
      b.onclick = () => void summarize(t, d, b);
      d.appendChild(b);
      topicsEl.appendChild(d);
    }
  }
};

// AI 分类：25 条一批调小模型，按标题归类；结果按标题缓存，失败静默（保持无分组列表）
const classifyAll = async (run: number): Promise<void> => {
  if (catsOff) return;
  const pending = topics.filter((t) => !catMem.has(ckey(t)));
  catTotal = pending.length;
  catDone = 0;
  catRunning = pending.length > 0;
  paintList();
  if (pending.length === 0) return;
  for (let i = 0; i < pending.length; i += CAT_BATCH) {
    if (run !== feedRun) return;
    const batch = pending.slice(i, i + CAT_BATCH);
    const hits = await Promise.all(batch.map(async (t) => {
      const h = await storeGet(ckey(t));
      return typeof h === 'string' && h ? h : '';
    }));
    const uncached = batch.filter((_, j) => !hits[j]);
    if (uncached.length > 0) {
      try {
        const lines = uncached.map((t, j) => `${j}. ${t.title}`).join('\n').slice(0, 3000);
        const g = await host.generate({
          system: `你是中文新闻分类器。把每条标题归入以下恰好一个分类：${CATS.join('、')}。只输出每行“序号:分类”，无多余文字。`,
          prompt: lines,
          maxOutputTokens: 256,
        });
        const got: string[] = [];
        for (const ln of g.text.split('\n')) {
          const m = /^\s*(\d+)\s*[:：]\s*(\S+)/.exec(ln);
          if (!m) continue;
          const cat = CATS.includes(m[2]!) ? m[2]! : '其他';
          got[Number(m[1])] = cat;
        }
        await Promise.all(uncached.map(async (t, j) => {
          const cat = got[j] ?? '其他';
          catMem.set(ckey(t), cat);
          await storeSet(ckey(t), cat);
        }));
      } catch (e) {
        const code = (e as { code?: string })?.code;
        if (code === 'NO_MODEL' || code === 'MODEL_FAILED') {
          catsOff = true;
          catRunning = false;
          say(esc(code === 'NO_MODEL' ? '无可用小模型，AI 分类关闭（列表照常）' : '小模型出错，AI 分类暂停（列表照常）'));
          paintList();
          return;
        }
        // 单批失败：全标其他，不重试
        for (const t of uncached) catMem.set(ckey(t), '其他');
      }
    } else {
      batch.forEach((t, j) => catMem.set(ckey(t), hits[j]!));
    }
    if (run !== feedRun) return;
    catDone = Math.min(pending.length, i + CAT_BATCH);
    paintList();
  }
  if (run === feedRun) { catRunning = false; paintList(); }
};

// 按需 AI 总结：点 ✦ 拉正文（走 service），用小模型总结后展开在行内；结果按话题缓存。
// 无可抓正文的源先联网搜索再总结，搜不到才退化为标题版。
const htmlText = (html: string): string =>
  html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi, '\n').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
const summarize = async (t: Topic, row: HTMLElement, btn: HTMLButtonElement): Promise<void> => {
  const old = row.querySelector('.aisum');
  if (old) { old.remove(); return; } // 再点收起
  const key = `moyu:csum:${t.community}:${t.id}`;
  btn.disabled = true;
  const label = btn.textContent;
  btn.textContent = '…';
  try {
    const hit = await storeGet(key);
    let s = typeof hit === 'string' && hit ? hit : '';
    if (!s) {
      const r = await svc('GET', `/thread?community=${t.community}&id=${encodeURIComponent(t.id)}&page=1`);
      const j = JSON.parse(r.body) as { ok: boolean; thread?: Thread; error?: string };
      if (!j.ok || !j.thread) throw new Error(j.error ?? '正文失败');
      const th = j.thread;
      const text = [th.opening ? htmlText(th.opening.html) : '', ...th.posts.map((p) => htmlText(p.html))]
        .filter(Boolean).join('\n').slice(0, 3500);
      if (!text) {
        // 无可抓正文：先联网搜这条标题，用搜索摘要总结；搜不到才退化为标题版
        if (!(TITLE_ONLY as readonly string[]).includes(t.community)) throw new Error('这篇没有可总结的正文');
        let web = '';
        try {
          const sr = await svc('GET', `/search?q=${encodeURIComponent(t.title)}`);
          const sj = JSON.parse(sr.body) as { ok: boolean; results?: Array<{ title: string; snippet: string; site: string }>; error?: string };
          if (sj.ok && sj.results && sj.results.length > 0) {
            const ctx = sj.results.slice(0, 5)
              .map((x, i) => `${i + 1}. 「${x.title}」${x.snippet}${x.site ? `（${x.site}）` : ''}`)
              .join('\n').slice(0, 2500);
            const g = await host.generate({
              system: '你是中文热点总结助手。根据多条搜索结果（标题+摘要），用2-4句话概括这件事的核心信息；只写多数来源一致的内容，不确定的加“据报道”；严禁编造；只输出总结。',
              prompt: `【${t.title}】\n${ctx}`,
              maxOutputTokens: 256,
            });
            web = g.text.trim().slice(0, 500);
          }
        } catch { /* 搜索失败就退回标题版 */ }
        if (web) {
          s = web + '（联网版）';
        } else {
          const g = await host.generate({
            system: '你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。',
            prompt: `【${t.title}】`,
            maxOutputTokens: 64,
          });
          s = g.text.trim().slice(0, 80);
          if (!s) throw new Error('小模型没有返回总结');
          s += '（标题版）';
        }
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

const pollAll = async (force = false): Promise<void> => {
  if (busy || document.hidden) return;
  if (!force && Date.now() - listAt < LIST_TTL && topics.length > 0) return;
  busy = true;
  const run = ++feedRun;
  try {
    const pairs = COMMUNITIES.flatMap((c) => c.channels.map((ch) => ({ c, ch })));
    topics = []; failed = [];
    ($('tcount') as HTMLElement).textContent = `加载中 0/${pairs.length}`;
    topicsEl.innerHTML = '';
    chipsEl.innerHTML = '';
    await Promise.all(pairs.map(async ({ c, ch }) => {
      try {
        const r = await svc('GET', `/list?community=${c.id}&channel=${encodeURIComponent(ch.id)}`);
        const j = JSON.parse(r.body) as { ok: boolean; topics?: Topic[]; error?: string };
        if (!j.ok) throw new Error(j.error ?? '列表失败');
        if (run !== feedRun) return;
        const items: Topic[] = (j.topics ?? []).slice(0, PER_PAIR);
        topics.push(...items);
        if (run !== feedRun) return;
        ($('tcount') as HTMLElement).textContent = `加载中 ${topics.length} · 已回 ${pairs.length - failed.length}/${pairs.length}`;
        paintList();
      } catch {
        if (run !== feedRun) return;
        if (!failed.includes(c.name)) failed.push(c.name);
      }
    }));
    if (run !== feedRun) return;
    listAt = Date.now();
    // 按标题去重（跨源同一事件只留一条）
    const seen = new Set<string>();
    topics = topics.filter((t) => {
      const k = t.title.replace(/[\s\p{P}]+/gu, '').toLowerCase();
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    say(failed.length > 0 ? esc(`${failed.join('、')}暂不可用（多为对侧限流过一会儿点↻再试）`) : '');
    paintList();
    void classifyAll(run);
  } finally { busy = false; }
};

$('b-refresh').onclick = () => { listAt = 0; void pollAll(true); };
$('b-save').onclick = async () => {
  const v = (document.querySelector('#cfg-proxy') as HTMLInputElement).value.trim();
  if (v && !/^https?:\/\/.+/.test(v)) { $('cfg-out').textContent = '格式不对，要 http(s)://host:port'; return; }
  proxy = v;
  await storeSet('moyu:proxy', proxy);
  $('cfg-out').textContent = '已保存，正在测试…';
  listAt = 0;
  await pollAll(true);
  $('cfg-out').textContent = topics.length > 0 ? `连通（${topics.length} 条）` : '仍失败，看列表上方红字（可能是代理地址不对或要认证）';
};

// 快捷键（输入框聚焦时不触发）
document.addEventListener('keydown', (e) => {
  const tag = (e.target as HTMLElement)?.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') return;
  // 带 Ctrl/Cmd/Alt 的组合键一律不碰，留给宿主和浏览器
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'r') { void pollAll(true); }
  else if (e.key === 'q') { void host.close(); }
});
let escCount = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { escCount++; if (escCount >= 2) { escCount = 0; void host.close(); } setTimeout(() => (escCount = 0), 500); }
});
const loadPrefs = async (): Promise<void> => {
  proxy = (await storeGet('moyu:proxy') as string | undefined) ?? '';
  (document.querySelector('#cfg-proxy') as HTMLInputElement).value = proxy;
};

host.onReady((ctx) => { applyHostReady(ctx, document.documentElement); });
void loadPrefs().then(() => void pollAll(true));
