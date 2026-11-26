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

// rebang 聚合源：详情页拿不到正文，只有列表里那份摘要（可能为空）
const PLATFORM_SRC: readonly string[] = ['news', 'tech', 'fin', 'ent', 'community', 'dev', 'shopping', 'weibo', 'douyin'];
// 无可抓正文的源：有摘要用摘要，没摘要联网搜索；头条同样走联网
const TITLE_ONLY: readonly string[] = ['toutiao', ...PLATFORM_SRC];
// AI 分类候选（固定集合，避免碎片化）
const CATS = ['AI科技', '数码', '互联网', '财经', '时政', '社会', '娱乐', '体育', '汽车', '房产', '教育', '健康', '科学', '游戏', '其他'];
const LIST_TTL = 3 * 60 * 1000;
const PER_PAIR = 12; // 每个社区频道最多取几条（20 个榜单，控制总量）
const CAT_BATCH = 30; // 一次分类几条标题
const CAT_WORKERS = 3; // 分类并发路数（串行太慢，并发跑小模型）

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
.nrow .tt{flex:1;min-width:0;font-size:13.5px;overflow-wrap:anywhere;opacity:.8}
.nrow .xp{display:block;font-size:12.5px;opacity:.6;margin-top:1px}
.nrow .src{display:block;font-size:11.5px;color:var(--oc-muted,#999);margin-top:1px}
.nrow .aibtn{flex:0 0 auto;align-self:center;border:1px solid var(--oc-border,#8888);border-radius:999px;background:transparent;color:var(--oc-muted,#999);cursor:pointer;font-size:12px;padding:2px 9px;white-space:nowrap}
.nrow .aibtn:hover{color:var(--oc-fg,inherit);border-color:var(--oc-primary,#3574f0)}
.nrow .aisum{flex:1 1 100%;font-size:12.5px;line-height:1.7;opacity:.8;border-left:2px solid var(--oc-border,#8888);padding-left:8px;margin:2px 0 2px 2px}
.cathead{display:flex;justify-content:space-between;align-items:baseline;gap:8px;padding:16px 10px 6px;font-weight:700;font-size:13px;color:var(--oc-fg,inherit);border-bottom:1px solid var(--oc-border,#8883);margin-bottom:2px}
.cathead .cu{font-weight:400;font-size:11px;color:var(--oc-muted,#999)}
.nrow .tag{font-size:11px;color:var(--oc-muted,#999);opacity:.75;margin-left:6px;white-space:nowrap}
#catchips{display:flex;gap:6px;flex-wrap:wrap;padding:2px 10px 4px}
#catchips button{display:inline-flex;align-items:baseline;gap:4px;border:1px solid var(--oc-border,#8888);border-radius:999px;background:transparent;color:var(--oc-muted,#999);cursor:pointer;font-size:12px;padding:2px 10px;white-space:nowrap;font-variant-numeric:tabular-nums}
#catchips .cv{min-width:2.4ch;text-align:right;font-variant-numeric:tabular-nums}
#catchips button.zero{opacity:.45}
#catchips button.on{color:var(--oc-fg,inherit);border-color:var(--oc-primary,#3574f0)}
button,select,input,textarea{font:inherit}
.btn{padding:4px 10px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button:disabled{opacity:.5}
.btn.primary{background:var(--oc-primary,#3574f0);border-color:transparent;color:var(--oc-primary-fg,#fff)}
#msg2:empty{display:none}
#msg2{padding:4px 10px}#msg2 .err{margin-top:4px}
.err{background:#7f1d1d22;border:1px solid #7f1d1d66;border-radius:8px;padding:8px}
.mut{font-size:12px;color:var(--oc-muted,#999)}
.srclist{display:flex;flex-wrap:wrap;gap:2px 8px;padding:2px 10px 8px;font-size:11.5px;color:var(--oc-muted,#999);opacity:.9}
.srclist span{white-space:nowrap}
.srclist .bad{opacity:.55;text-decoration:line-through}
div.nrow:hover{background:var(--oc-hover,#8881)}
.nrow.read .tt{opacity:.45}
.nrow.read .xp{opacity:.3}
.nrow.read .aisum{opacity:.45}
#cfgside{border-top:1px solid var(--oc-border,#8883);margin-top:6px;padding:8px 6px 4px;display:flex;flex-direction:column;gap:6px}
#cfgside input,#cfgside select{width:100%;padding:6px 8px;font-size:12.5px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:inherit}
#cfgver{padding:2px 10px 6px;font-size:11px}
</style>
<div style="display:flex;flex:1;min-height:0;width:100%" id="cols">
<aside>
  <div class="sec">话题 <span id="tcount" class="mut"></span> <button class="btn" id="b-refresh" title="手动刷新">↻</button></div><div id="catchips"></div><div id="topics"></div><div id="msg2"></div><div class="mut" id="srcerr" style="padding:2px 10px"></div>
  <div class="sec">配置</div>
  <div id="cfgside">
    <div class="mut">HTTP 代理（宿主不透传系统代理，直连失败时填）。只存本机。</div>
    <input id="cfg-proxy" type="text" placeholder="http://127.0.0.1:7897（留空=直连）" />
    <button class="btn primary" id="b-save">保存并测试</button>
    <div class="mut">AI 模型（分类与总结用；与设置里的小模型是同一份配置，改完立即生效）</div>
    <select id="cfg-model"><option value="__default">读取中…</option></select>
    <div class="mut" id="model-out"></div>
    <button class="btn" id="b-clearcache" title="删掉分类与总结缓存，用当前模型重算">清空 AI 缓存</button>
    <div class="mut" id="cfg-out"></div>
  </div>
  <div class="sec">信息来源 <span id="srccount" class="mut"></span></div>
  <div id="srclist" class="srclist"></div>
  <div class="mut" id="cfgver"><span id="cname"></span> · <span id="build"></span></div>
</aside>
</div>`;

const $ = <T extends HTMLElement>(id: string): T => document.querySelector(`#${id}`) as T;
const cname = $('cname');
const topicsEl = $('topics');
const chipsEl = $('catchips');

const BUILD = 'v0.15.1-srclist';
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

// 信息流缓存：单条 value 上限 64KB，话题多时必须分片（meta 记分片数）
const FEED_META = 'moyu:feed';
const FEED_VER = 2;
// 12000 字符：中文按 3 字节/字约 36KB，稳在宿主单条 64KB 以下
const FEED_CHUNK = 12000;
// 写入串行 + 先分片后 meta（meta 是提交点）：避免两次刷新交错，读出一半新一半旧
let feedChain: Promise<void> = Promise.resolve();
const writeFeed = async (): Promise<void> => {
  const snap = { at: listAt, failed: [...failed], topics: [...topics] };
  try {
    const rows = snap.topics.map((t) => [t.community, t.id, t.title, t.author, t.channel, t.replies, t.time, t.url, t.excerpt ?? '']);
    const s = JSON.stringify({ at: snap.at, failed: snap.failed, rows });
    const n = Math.max(1, Math.ceil(s.length / FEED_CHUNK));
    const parts: string[] = [];
    for (let i = 0; i < n; i++) parts.push(s.slice(i * FEED_CHUNK, (i + 1) * FEED_CHUNK));
    for (let i = 0; i < n; i++) await host.storage.set(`moyu:feed:p${i}`, parts[i] as never);
    await host.storage.set(FEED_META, { v: FEED_VER, at: snap.at, failed: snap.failed, parts: n } as never);
    for (let i = n; i < n + 6; i++) { try { await host.storage.delete(`moyu:feed:p${i}`); } catch { /* 无旧分片 */ } }
  } catch { /* 缓存失败不影响列表 */ }
};
const saveFeed = (): void => { feedChain = feedChain.then(writeFeed, writeFeed); };
const loadFeed = async (): Promise<boolean> => {
  try {
    const meta = await storeGet(FEED_META) as { v?: unknown; at?: unknown; failed?: unknown; parts?: unknown } | undefined;
    if (!meta || typeof meta.at !== 'number' || typeof meta.parts !== 'number') return false;
    const n = meta.parts as number;
    if (n < 1 || n > 40) return false;
    const bufs: string[] = [];
    for (let i = 0; i < n; i++) {
      const p = await storeGet(`moyu:feed:p${i}`);
      if (typeof p !== 'string') return false;
      bufs.push(p);
    }
    const d = JSON.parse(bufs.join('')) as { at?: unknown; failed?: unknown; rows?: unknown };
    // 一致性校验：meta 和内容必须是同一次快照（防交错写导致一半新一半旧）
    if (typeof d.at !== 'number' || d.at !== meta.at || !Array.isArray(d.rows) || d.rows.length === 0) return false;
    listAt = d.at;
    failed = Array.isArray(d.failed) ? (d.failed as string[]) : [];
    topics = (d.rows as unknown[][]).map((r) => ({
      community: r[0] as Topic['community'], id: String(r[1] ?? ''), title: String(r[2] ?? ''),
      author: String(r[3] ?? ''), avatar: null, channel: typeof r[4] === 'string' ? r[4] : null,
      replies: typeof r[5] === 'number' ? r[5] : null, time: typeof r[6] === 'number' ? r[6] : null,
      url: String(r[7] ?? ''), excerpt: typeof r[8] === 'string' && r[8] ? (r[8] as string) : null,
    } as Topic)).filter((t) => t.title && t.id);
    return topics.length > 0;
  } catch { return false; }
};

const svc = async (method: string, path: string, body?: string): Promise<{ status: number; body: string }> => {
  // 代理跟每个请求走（service 读不到宿主 env），?proxy= 与 x-proxy 等价这里统一拼 query
  let p = path;
  if (proxy && method === 'GET' && p.startsWith('/')) p += (p.includes('?') ? '&' : '?') + `proxy=${encodeURIComponent(proxy)}`;
  return host.serviceRequest({ method: method as 'GET' | 'POST', path: p, body });
};

const srcName = (_c: { name: string }, _ch: { name: string }, _multi: boolean): string => '';

// chips：固定 16 个（全部 + CATS），只更新数字和选中态，绝不重建——避免换行位置跳动
function updateChipCounts(): void {
  const counts = new Map<string, number>();
  let all = 0;
  for (const t of topics) {
    if (readSet.has(rkey(t))) continue;
    all++;
    const c = catMem.get(ckey(t));
    if (c) counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  for (const b of chipsEl.querySelectorAll<HTMLButtonElement>('[data-cat]')) {
    const cat = b.dataset.cat ?? '';
    const n = cat === '__all' ? all : (counts.get(cat) ?? 0);
    const num = b.querySelector('.cv');
    if (num) num.textContent = String(n);
    b.classList.toggle('on', cat === '__all' ? selCat === '' : selCat === cat);
    b.classList.toggle('zero', cat !== '__all' && n === 0);
  }
}

const paintChips = (): void => {
  if (chipsEl.childElementCount === 0) {
    const mk = (cat: string, label: string): HTMLButtonElement => {
      const b = document.createElement('button');
      b.dataset.cat = cat;
      b.innerHTML = `<span class="cn">${esc(label)}</span><span class="cv">0</span>`;
      b.onclick = () => {
        if (cat === '__all') selCat = '';
        else selCat = selCat === cat ? '' : cat;
        takeReadSnap();
        paintList();
      };
      return b;
    };
    chipsEl.appendChild(mk('__all', '全部'));
    for (const c of CATS) chipsEl.appendChild(mk(c, c));
  }
  updateChipCounts();
};

// 标题指纹：分类/总结/已读都按它记（序号型榜单刷新后 id 会变，标题不变）
const tid = (s: string): string => {
  let h = 0;
  for (const c of s) h = (h * 31 + c.codePointAt(0)!) >>> 0;
  return h.toString(36);
};
const tkey = (t: Topic): string => tid(t.title.slice(0, 30));

const ckey = (t: Topic): string => `moyu:cat:${tkey(t)}`;

// 总结缓存：整表存（上限 120 条），启动预载，列表直接铺出来，不用再点 ✦
const sumKey = (t: Topic): string => `moyu:csum:${tkey(t)}`;
// 早期按 源+id 存的总结：读时兜底并迁到新 key（旧 key 里没有标题，只能这样接）
const legacySumKey = (t: Topic): string => `moyu:csum:${t.community}:${t.id}`;
const sumMem = new Map<string, string>();
const sumTime = new Map<string, number>();
const SUM_TABLE = 'moyu:csums';
const SUM_MAX = 100;
// 分类/总结/已读的保留期：7 天没再出现过就清掉（另有容量上限兜底）
const AI_TTL_MS = 7 * 24 * 3600 * 1000;
const saveSums = (): void => {
  const obj: Record<string, [string, number]> = {};
  for (const [k, v] of sumMem) obj[k] = [v, sumTime.get(k) ?? Date.now()];
  const keys = Object.keys(obj);
  const keep = keys.length > SUM_MAX ? keys.slice(-SUM_MAX) : keys;
  const out: Record<string, [string, number]> = {};
  for (const k of keep) out[k] = obj[k]!;
  void storeSet(SUM_TABLE, out);
};
const sumOf = (t: Topic): string => {
  const k = sumKey(t);
  const hit = sumMem.get(k);
  if (hit) return hit;
  const old = sumMem.get(legacySumKey(t));
  if (old) { sumMem.set(k, old); sumTime.set(k, Date.now()); saveSums(); return old; }
  return '';
};

// 已读：移入标题即标记，字体变淡；按“源+标题指纹”记，序号型榜单刷新后也能对上
const READ_KEY = 'moyu:read';
const READ_MAX = 800;
const readSet = new Set<string>();
const readList: string[] = [];
let readTimer: ReturnType<typeof setTimeout> | null = null;
// 只看标题：同一条新闻换了来源（去重后保留的那条可能来自别的站）也算已读
const rkey = (t: Topic): string => tid(t.title);
const readTime = new Map<string, number>();
const flushRead = (): void => {
  if (readTimer) { clearTimeout(readTimer); readTimer = null; }
  void storeSet(READ_KEY, readList.map((k) => [k, readTime.get(k) ?? Date.now()]));
};
const markRead = (t: Topic): void => {
  const k = rkey(t);
  if (readSet.has(k)) return;
  readSet.add(k);
  readList.push(k);
  readTime.set(k, Date.now());
  if (readList.length > READ_MAX) {
    const drop = readList.splice(0, readList.length - READ_MAX);
    for (const d of drop) { readSet.delete(d); readTime.delete(d); }
  }
  // 300ms 合并写；页面隐藏/关闭时立即落盘，避免刚划过就关面板丢状态
  if (!readTimer) readTimer = setTimeout(() => { readTimer = null; void storeSet(READ_KEY, readList); }, 300);
  updateChipCounts();
};
window.addEventListener('pagehide', flushRead);
document.addEventListener('visibilitychange', () => { if (document.hidden) flushRead(); });

// 跨源去重：同一事件在不同站标题措辞不同，只靠完全相等不够
const normTitle = (s: string): string =>
  s.toLowerCase()
    .replace(/^[\s\d]+[.、)）]/, '')
    .replace(/[#【】\[\]()（）《》「」…·。，,!！?？:：;；'"“”‘’\-—_/\\|~`\s]+/g, '');
const bigrams = (s: string): Set<string> => {
  const out = new Set<string>();
  for (let i = 0; i + 1 < s.length; i++) out.add(s.slice(i, i + 2));
  return out;
};
const jaccard = (a: Set<string>, b: Set<string>): number => {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
};
const feedScore = (t: Topic): number =>
  (t.excerpt?.length ?? 0) + (t.replies ?? 0) * 2 + (t.time ? 1 : 0);
const dedupeTopics = (items: Topic[]): Topic[] => {
  const nrm = items.map((t) => normTitle(t.title));
  const gs = nrm.map((n) => bigrams(n));
  const out: Topic[] = [];
  const idx: number[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < items.length; i++) {
    const n = nrm[i]!;
    if (n.length < 4 || seen.has(n)) continue;
    const cur = items[i]!;
    let dup = -1;
    for (let j = 0; j < out.length; j++) {
      const k = out[j]!;
      if (cur.url && k.url === cur.url) { dup = j; break; }
      const kn = nrm[idx[j]!]!;
      // 包含关系：短标题够长、长度接近
      if (n.length >= 8 && Math.abs(kn.length - n.length) <= 12 && (kn.includes(n) || n.includes(kn))) { dup = j; break; }
      // 高重叠：同一事件换了说法
      if (jaccard(gs[i]!, gs[idx[j]!]!) >= 0.78) { dup = j; break; }
    }
    if (dup >= 0) {
      if (feedScore(cur) > feedScore(out[dup]!)) { out[dup] = cur; idx[dup] = i; }
      continue;
    }
    seen.add(n); out.push(cur); idx.push(i);
  }
  return out;
};

// 已读排序快照：只在“重新进入列表”（打开面板/刷新/切分类）时取一次，hover 不重排
let readSnap: Set<string> | null = null;
const takeReadSnap = (): void => { readSnap = new Set(readSet); };

// 消息标签：日期 + 来源（无则不显示）
const COMM_NAME = new Map(COMMUNITIES.map((c) => [c.id as string, c.name]));
const srcLabel = (t: Topic): string =>
  (PLATFORM_SRC as readonly string[]).includes(t.community) && t.author ? t.author : (COMM_NAME.get(t.community) ?? '');
const fmtDay = (ts: number | null): string => {
  if (!ts) return '';
  const d = new Date(ts);
  return `${d.getMonth() + 1}-${String(d.getDate()).padStart(2, '0')}`;
};
const tagOf = (t: Topic): string => {
  const out: string[] = [];
  const day = fmtDay(t.time);
  if (day) out.push(`【${day}】`);
  const src = srcLabel(t);
  if (src) out.push(`【${src}】`);
  return out.join('');
};

const paintSources = (): void => {
  const box = document.querySelector('#srclist');
  const cnt = document.querySelector('#srccount');
  if (!box) return;
  box.innerHTML = '';
  for (const c of COMMUNITIES) {
    const sp = document.createElement('span');
    if (failed.includes(c.name)) { sp.className = 'bad'; sp.title = '本次刷新没取到'; }
    sp.textContent = c.name;
    box.appendChild(sp);
  }
  if (cnt) cnt.textContent = `(${COMMUNITIES.length} 个${failed.length > 0 ? `，${failed.length} 个未取到` : ''})`;
};

const paintList = (): void => {
  paintSources();
  const present = [...new Set(topics.map((t) => catMem.get(ckey(t))).filter((c): c is string => !!c))];
  const ordered = CATS.filter((c) => present.includes(c));
  paintChips();
  const tstr = listAt > 0 ? (() => { const d = new Date(listAt); return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`; })() : '';
  const cprog = catRunning ? ` · 分类 ${catDone}/${catTotal}` : '';
  ($('tcount') as HTMLElement).textContent = topics.length > 0 ? `${topics.length}${tstr ? ` · 更新 ${tstr}` : ''}${cprog}` : (tstr ? `更新 ${tstr}` : '');
  const se = document.querySelector('#srcerr');
  if (se) se.textContent = failed.length > 0 ? `暂不可用：${failed.join('、')}（多为对侧限流，过一会儿点↻再试）` : '';
  topicsEl.innerHTML = '';
  // 未读在前、已读在后（按进入时的快照，hover 不重排）
  const sorted = readSnap
    ? [...topics].sort((a, b) => Number(readSnap!.has(rkey(a))) - Number(readSnap!.has(rkey(b))))
    : topics;
  const groups = selCat ? [selCat] : ordered.length > 0 ? ordered : [''];
  for (const g of groups) {
    const rows = sorted.filter((t) => !g || catMem.get(ckey(t)) === g);
    if (!selCat && g) {
      const unread = rows.filter((t) => !readSet.has(rkey(t))).length;
      const h = document.createElement('div');
      h.className = 'cathead';
      h.innerHTML = `<span class="cn">${esc(g)}</span><span class="cu">${unread > 0 ? `未读 ${unread}` : '已读完'}</span>`;
      topicsEl.appendChild(h);
    }
    for (const t of rows) {
      const d = document.createElement('div');
      d.className = 'nrow' + (readSet.has(rkey(t)) ? ' read' : '');
      const tag = tagOf(t);
      const tagEl = tag ? `<span class="tag">${esc(tag)}</span>` : '';
      const xcp = t.excerpt ? `<br><span class="xp">${esc(t.excerpt)}</span>` : '';
      d.innerHTML = `<span class="tt">${esc(t.title)}${tagEl}${xcp}</span>`;
      d.onmouseenter = (): void => { markRead(t); d.classList.add('read'); };
      const b = document.createElement('button');
      b.className = 'aibtn';
      b.title = 'AI 总结这篇';
      b.textContent = '✦';
      b.onclick = () => void summarize(t, d, b);
      d.appendChild(b);
      // 之前总结过的，直接铺出来
      const cachedSum = sumOf(t);
      if (cachedSum) {
        const se = document.createElement('div');
        se.className = 'aisum';
        se.textContent = `✦ ${cachedSum}`;
        d.appendChild(se);
      }
      topicsEl.appendChild(d);
    }
  }
};

// AI 分类：多路并发，30 条一批调小模型，按标题归类；结果进内存 map + 整表持久化
const catTime = new Map<string, number>();
const setCat = (k: string, v: string): void => { catMem.set(k, v); catTime.set(k, Date.now()); };
const saveCats = (): void => {
  const obj: Record<string, [string, number]> = {};
  for (const [k, v] of catMem) obj[k] = [v, catTime.get(k) ?? Date.now()];
  const keys = Object.keys(obj);
  const keep = keys.length > 1000 ? keys.slice(-1000) : keys;
  const out: Record<string, [string, number]> = {};
  for (const k of keep) out[k] = obj[k]!;
  void storeSet('moyu:cats', out);
};
const pruneAiCache = (): void => {
  const now = Date.now();
  const cut = now - AI_TTL_MS;
  // 当前列表里还在的续期，避免"每天都在用的条目"被当成旧数据清掉
  for (const t of topics) {
    const ck = ckey(t);
    if (catMem.has(ck)) catTime.set(ck, now);
    const sk = sumKey(t);
    if (sumMem.has(sk)) sumTime.set(sk, now);
    const rk = rkey(t);
    if (readSet.has(rk)) readTime.set(rk, now);
  }
  let catDirty = false;
  for (const [k, ts] of catTime) if (ts < cut) { catMem.delete(k); catTime.delete(k); catDirty = true; }
  if (catDirty) saveCats();
  let sumDirty = false;
  for (const [k, ts] of sumTime) if (ts < cut) { sumMem.delete(k); sumTime.delete(k); sumDirty = true; }
  if (sumDirty) saveSums();
  let readDirty = false;
  for (let i = readList.length - 1; i >= 0; i--) {
    const k = readList[i]!;
    if ((readTime.get(k) ?? 0) < cut) { readList.splice(i, 1); readSet.delete(k); readTime.delete(k); readDirty = true; }
  }
  if (readDirty) flushRead();
};

const classifyAll = async (run: number): Promise<void> => {
  if (catsOff) return;
  const pending = topics.filter((t) => !catMem.has(ckey(t)));
  catTotal = pending.length;
  catDone = 0;
  catRunning = pending.length > 0;
  paintList();
  if (pending.length === 0) return;
  let bi = 0;
  const worker = async (): Promise<void> => {
    while (true) {
      if (run !== feedRun || catsOff) return;
      const idx = bi;
      bi += CAT_BATCH;
      if (idx >= pending.length) return;
      const batch = pending.slice(idx, idx + CAT_BATCH);
      try {
        const lines = batch.map((t, j) => `${j}. ${t.title}`).join('\n').slice(0, 3500);
        const g = await host.generate({
          system: `你是中文新闻分类器。把每条标题归入以下恰好一个分类：${CATS.join('、')}。只输出每行“序号:分类”，无多余文字。`,
          prompt: lines,
          maxOutputTokens: 320,
        });
        if (run !== feedRun || catsOff) return;
        // 宽容解析：模型可能输出 "1: AI科技" / "1. AI科技" / "1、AI科技" / "**1.** AI科技"
        const got: string[] = [];
        for (const ln of g.text.split('\n')) {
          const m = /^\s*(?:[-*•]\s*)?(?:\*\*|__)?\s*(\d+)\s*(?:\*\*|__)?\s*[.、:：)）]\s*(.+?)\s*$/.exec(ln);
          if (!m) continue;
          const raw = m[2]!.replace(/[*`]/g, '').trim();
          const hit = CATS.find((c) => raw.startsWith(c)) ?? CATS.find((c) => raw.includes(c));
          got[Number(m[1])] = hit ?? '其他';
        }
        // 模型跑偏（漏行/重编号）时整批标“其他”，避免错位串行
        const parsed = got.filter(Boolean).length;
        if (parsed < Math.ceil(batch.length * 0.6)) {
          for (const t of batch) setCat(ckey(t), '其他');
        } else {
          batch.forEach((t, j) => setCat(ckey(t), got[j] ?? '其他'));
        }
        saveCats();
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
        for (const t of batch) setCat(ckey(t), '其他');
      }
      catDone = Math.min(pending.length, catDone + batch.length);
      if (run !== feedRun) return;
      paintList();
    }
  };
  await Promise.all(Array.from({ length: Math.min(CAT_WORKERS, pending.length) }, () => worker()));
  if (run === feedRun) { catRunning = false; saveCats(); paintList(); }
};

// 按需 AI 总结：点 ✦ 拉正文（走 service），用小模型总结后展开在行内；结果按话题缓存。
// 无可抓正文的源先联网搜索再总结，搜不到才退化为标题版。
const htmlText = (html: string): string =>
  html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi, '\n').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/在浏览器中查看原文/g, '')
    .split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
const summarize = async (t: Topic, row: HTMLElement, btn: HTMLButtonElement): Promise<void> => {
  const old = row.querySelector('.aisum');
  if (old) { old.remove(); return; } // 再点收起
  const key = sumKey(t);
  btn.disabled = true;
  const label = btn.textContent;
  btn.textContent = '…';
  try {
    let s = sumOf(t);
    if (!s) {
      // rebang 源只有摘要：直接用，不请求 /thread；没摘要就交给下面的联网兜底
      let text = '';
      if ((PLATFORM_SRC as readonly string[]).includes(t.community)) {
        text = t.excerpt && t.excerpt.length >= 30 ? t.excerpt.slice(0, 2500) : '';
      } else {
        const r = await svc('GET', `/thread?community=${t.community}&id=${encodeURIComponent(t.id)}&page=1`);
        const j = JSON.parse(r.body) as { ok: boolean; thread?: Thread; error?: string };
        if (!j.ok || !j.thread) throw new Error(j.error ?? '正文失败');
        const th = j.thread;
        text = [th.opening ? htmlText(th.opening.html) : '', ...th.posts.map((p) => htmlText(p.html))]
          .filter(Boolean).join('\n').slice(0, 3500);
      }
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
      sumMem.set(key, s);
      sumTime.set(key, Date.now());
      saveSums();
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
        const f = force ? '&force=1' : '';
        const r = await svc('GET', `/list?community=${c.id}&channel=${encodeURIComponent(ch.id)}${f}`);
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
    // 跨源去重（完全同题 / 包含关系 / 高重叠都算同一事件）
    topics = dedupeTopics(topics);
    takeReadSnap();
    void saveFeed();
    say('');
    paintList();
    void classifyAll(run);
  } finally { busy = false; }
};

$('b-refresh').onclick = () => { listAt = 0; void pollAll(true); };
// 清空 AI 缓存（分类 + 总结）：换模型后点一下，再用当前模型重算
$('b-clearcache').onclick = async (): Promise<void> => {
  const out = $('cfg-out');
  out.textContent = '正在清空 AI 缓存…';
  try {
    const keys = await host.storage.keys();
    const drop = keys.filter((k) => /^moyu:(cat|csums|csum|cats)(:|$)/.test(k));
    await Promise.all(drop.map((k) => host.storage.delete(k).catch(() => undefined)));
    catMem.clear();
    catTime.clear();
    sumMem.clear();
    sumTime.clear();
    catsOff = false;
    catDone = 0; catTotal = 0; catRunning = false;
    out.textContent = `已清 ${drop.length} 条，正在用当前模型重算分类…`;
    void classifyAll(++feedRun);
    paintList();
    await host.toast({ kind: 'success', message: `已清空 AI 缓存（${drop.length} 条）` });
  } catch (e) {
    out.textContent = `清空失败：${e instanceof Error ? e.message : '未知错误'}`;
  }
};

// AI 模型选择：直接改宿主 settings.json 里的小模型（宿主每次生成都重读，立即生效）
const loadModelSel = async (): Promise<void> => {
  const sel = document.querySelector('#cfg-model') as HTMLSelectElement | null;
  if (!sel) return;
  try {
    const r = await svc('GET', '/settings/model');
    const j = JSON.parse(r.body) as {
      ok: boolean; useDefault?: boolean; override?: string; error?: string;
      models?: Array<{ providerID: string; modelID: string }>;
    };
    if (!j.ok) { sel.innerHTML = '<option value="__default">读取失败</option>'; return; }
    sel.innerHTML = '';
    const def = document.createElement('option');
    def.value = '__default';
    def.textContent = '跟随默认模型';
    def.selected = j.useDefault !== false;
    sel.appendChild(def);
    const groups = new Map<string, HTMLOptGroupElement>();
    for (const m of j.models ?? []) {
      let g = groups.get(m.providerID);
      if (!g) {
        g = document.createElement('optgroup');
        g.label = m.providerID;
        groups.set(m.providerID, g);
        sel.appendChild(g);
      }
      const o = document.createElement('option');
      o.value = `${m.providerID}/${m.modelID}`;
      o.textContent = m.modelID;
      if (j.useDefault === false && o.value === j.override) o.selected = true;
      g.appendChild(o);
    }
  } catch {
    sel.innerHTML = '<option value="__default">service 未就绪</option>';
  }
};

const onModelChange = async (): Promise<void> => {
  const sel = document.querySelector('#cfg-model') as HTMLSelectElement | null;
  const out = document.querySelector('#model-out');
  if (!sel || !out) return;
  const v = sel.value;
  const slash = v.indexOf('/');
  const body = v === '__default'
    ? { useDefault: true }
    : { useDefault: false, providerID: v.slice(0, slash), modelID: v.slice(slash + 1) };
  out.textContent = '正在切换…';
  try {
    const r = await svc('POST', '/settings/model', JSON.stringify(body));
    const j = JSON.parse(r.body) as { ok: boolean; error?: string };
    out.textContent = j.ok ? '已切换，下次总结/分类就用它（想重算旧结果点「清空 AI 缓存」）' : `切换失败：${j.error ?? '未知错误'}`;
  } catch (e) {
    out.textContent = `切换失败：${e instanceof Error ? e.message : '未知错误'}`;
  }
};

$('cfg-model').onchange = () => void onModelChange();

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
// 进面板只读缓存不拉网（提速+省流）：刷新只能点 ↻
void (async () => {
  await loadPrefs();
  void loadModelSel();
  try {
    // 总结缓存：整表 + 迁移早期逐条 key（只搬一次，之后不再有逐条 key）
    const ss = await storeGet(SUM_TABLE);
    if (ss && typeof ss === 'object') {
      for (const [k, v] of Object.entries(ss as Record<string, unknown>)) {
        if (Array.isArray(v) && typeof v[0] === 'string' && v[0]) {
          sumMem.set(k, v[0]);
          sumTime.set(k, Number(v[1]) || Date.now());
        } else if (typeof v === 'string' && v) {
          sumMem.set(k, v);
          sumTime.set(k, Date.now());
        }
      }
    }
    try {
      const keys = await host.storage.keys();
      const legacy = keys.filter((k) => k.startsWith('moyu:csum:')).slice(0, 300);
      if (legacy.length > 0) {
        for (const k of legacy) {
          if (sumMem.has(k)) { await host.storage.delete(k).catch(() => undefined); continue; }
          const v = await host.storage.get(k);
          if (typeof v === 'string' && v) { sumMem.set(k, v); sumTime.set(k, Date.now()); }
          await host.storage.delete(k).catch(() => undefined);
        }
        saveSums();
      }
    } catch { /* 迁移失败不影响使用 */ }
    const rr = await storeGet(READ_KEY);
    if (Array.isArray(rr)) {
      // 旧格式是“源:指纹”，迁成纯标题指纹（跨源也保持已读）
      let migrated = false;
      for (const item of rr) {
        let k = '';
        let ts = Date.now();
        if (typeof item === 'string') { k = item; migrated = true; }
        else if (Array.isArray(item) && typeof item[0] === 'string') { k = item[0]; ts = Number(item[1]) || Date.now(); }
        if (!k) continue;
        const kk = k.includes(':') ? k.split(':').pop()! : k;
        if (k !== kk) migrated = true;
        if (!kk || readSet.has(kk)) continue;
        readSet.add(kk); readList.push(kk); readTime.set(kk, ts);
      }
      if (migrated) flushRead();
    }
    const cm = await storeGet('moyu:cats');
    if (cm && typeof cm === 'object') {
      // 迁移旧分类 key（moyu:cat:源:id:标题 → moyu:cat:标题指纹），刷新/换源都能复用
      let migrated = false;
      for (const [k, rawV] of Object.entries(cm as Record<string, unknown>)) {
        const cat = Array.isArray(rawV) ? (typeof rawV[0] === 'string' ? rawV[0] : '') : typeof rawV === 'string' ? rawV : '';
        if (!cat) continue;
        const ts = Array.isArray(rawV) ? (Number(rawV[1]) || Date.now()) : Date.now();
        const parts = k.split(':');
        if (parts.length === 3) { catMem.set(k, cat); catTime.set(k, ts); continue; }
        if (parts.length >= 5 && parts[0] === 'moyu' && parts[1] === 'cat') {
          const title30 = parts.slice(4).join(':').slice(0, 30);
          if (!title30) continue;
          catMem.set(`moyu:cat:${tid(title30)}`, cat);
          catTime.set(`moyu:cat:${tid(title30)}`, ts);
          migrated = true;
        }
      }
      if (migrated) saveCats();
    }
    const fd = await loadFeed();
    if (fd) {
      pruneAiCache();
      takeReadSnap();
      paintList();
      void classifyAll(++feedRun);
      return;
    }
  } catch { /* 缓存坏了就走正常拉取 */ }
  pruneAiCache();
  // 首次没有本地列表：用 service 侧缓存（可能刚有人刷过），不强制打网络
  void pollAll(false);
})();
