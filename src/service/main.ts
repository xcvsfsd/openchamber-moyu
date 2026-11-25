// Service：常驻 host 进程（Antumi 是一次一进程，这里是常驻 + 无状态 handler）。
// 只做匿名读：linux.do 走 RSS 列表 + Discourse JSON 正文；V2EX 走公开 JSON API。
// 登录/回复/点赞/通知先按契约返回 need-login，UI 照 moyu 文案提示，不静默失败。
// 代理：env 优先（HTTPS_PROXY/ALL_PROXY/HTTP_PROXY），直连为主；Cloudflare 场景 service 日志写 stderr。
import http from 'node:http';
import { COMMUNITIES, type CommunityId, type Post, type Thread, type Topic } from '../shared/types.js';
import { parseRss } from '../shared/rss.js';

const port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
const token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? '';
if (!port || !token) { console.error('OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required'); process.exit(1); }

const FETCH_TIMEOUT_MS = 15_000;
const LIST_CACHE_TTL_MS = 3 * 60 * 1000; // moyu：列表缓存 3 分钟
const BODY_MAX = 256 * 1024;

// 匿名读队列：开始时间至少相隔 1 秒（moyu 降压），失败不自动重试
let lastStart = 0;
const pace = async (): Promise<void> => {
  const gap = 1000 - (Date.now() - lastStart);
  if (gap > 0) await new Promise((r) => setTimeout(r, gap));
  lastStart = Date.now();
};

import { h2get } from './net.js';
type FetchLike = { status: number; headers: { get(n: string): string | null }; text(): Promise<string>; json(): Promise<unknown>; ok: boolean };
const timedFetch = async (url: string, proxy?: string | null): Promise<FetchLike> => {
  await pace();
  const ctrl = new AbortController();
  const h = await h2get(url, ctrl.signal, { timeoutMs: FETCH_TIMEOUT_MS, proxy });
  const headers = new Headers(h.headers as Record<string, string>);
  const body = h.body.toString('utf8');
  return {
    status: h.status, ok: h.status >= 200 && h.status < 300, headers: { get: (n: string) => headers.get(n) },
    text: async () => body, json: async () => JSON.parse(body),
  };
};
const netError = (e: unknown): Error => {
  const msg = e instanceof Error ? e.message : String(e);
  if (msg === '网络错误' || msg === '超时' || msg === '连不上代理' || msg === '代理拒绝了连接（407）' || msg.startsWith('代理')) {
    return new Error(`${msg}（直连不出公网时，点面板右上⚙填 HTTP 代理，和系统代理一致）`);
  }
  return e instanceof Error ? e : new Error(msg);
};

const abs = (maybe: string | null | undefined, origin: string): string | null => {
  if (!maybe) return null;
  try { return new URL(maybe, origin).toString(); } catch { return null; }
};
const absLinks = (html: string, origin: string): string =>
  html.replace(/(href|src)="([^"]+)"/g, (_m, attr: string, u: string) => {
    if (/^(https?:|data:|blob:|#)/i.test(u)) return `${attr}="${u}"`;
    try { return `${attr}="${new URL(u, origin).toString()}"`; } catch { return `${attr}="${u}"`; }
  });
const millis = (v: string | null | undefined): number | null => {
  const t = v ? Date.parse(v) : NaN;
  return Number.isNaN(t) ? null : t;
};

// ---- linux.do ----
const LD = 'https://linux.do';
const LD_PATHS: Record<string, string> = {
  latest: '/latest.rss', top: '/top.rss?period=daily',
  develop: '/c/develop/4.rss', gossip: '/c/gossip/11.rss',
  resource: '/c/resource/14.rss', welfare: '/c/welfare/36.rss', news: '/c/news/34.rss',
};
const cdnFix = (s: string): string => s.replace(/https:\/\/linux\.do\/(?=(?:user_avatar|letter_avatar|images\/emoji)\/)/g, 'https://cdn.ldstatic.com/');

const linuxdoList = async (channel: string, proxy?: string | null): Promise<Topic[]> => {
  const path = LD_PATHS[channel];
  if (!path) throw new Error(`linux.do 没有这个板块：${channel}`);
  const r = await timedFetch(LD + path, proxy);
  if (r.status === 403) throw new Error('linux.do 暂时拦住了请求（403），过一会儿再试');
  if (r.status !== 200) throw new Error(`linux.do 返回了 ${r.status}`);
  const body = await r.text();
  if (!body.includes('<rss')) throw new Error('linux.do 返回的内容读不懂');
  const out: Topic[] = [];
  for (const item of parseRss(body)) {
    const id = /\/t\/(?:[^/]+\/)?(\d+)(?:[/?#]|$)/.exec(item.link ?? '')?.[1];
    if (!id || !item.link) continue;
    const count = /(\d+) 个帖子/.exec(item.description ?? '')?.[1];
    out.push({
      community: 'linuxdo', id, title: item.title ?? '', author: item.creator ?? '',
      avatar: null, channel: item.category ?? null,
      replies: count ? Math.max(Number(count) - 1, 0) : null,
      time: millis(item.pubDate), url: item.link,
    });
  }
  return out.slice(0, 100);
};

const linuxdoThread = async (id: string, page: number, proxy?: string | null): Promise<Thread> => {
  if (!/^\d{1,12}$/.test(id)) throw new Error('请求的参数不对（id）');
  const q = page > 1 ? `?page=${page}` : '';
  const r = await timedFetch(`${LD}/t/topic/${id}.json${q}`, proxy);
  if (r.status === 404) throw new Error('帖子不存在，或者需要登录才能看');
  if (r.status === 403) throw new Error('linux.do 暂时拦住了请求（403），出现验证时去浏览器完成验证再试');
  if (r.status !== 200) throw new Error(`linux.do 返回了 ${r.status}`);
  const raw = await r.json() as {
    id: number; title: string; posts_count?: number; created_at?: string; last_posted_at?: string;
    user_id?: number; details?: { created_by?: { id: number; username?: string } };
    post_stream?: { posts: Array<{ id: number; post_number: number; username?: string; name?: string; avatar_template?: string; created_at?: string; cooked?: string; post_type?: number; reply_to_post_number?: number; reaction_users_count?: number; hidden?: boolean; deleted_at?: string; user_deleted?: boolean; user_id?: number }>; stream?: number[] };
  };
  const posts = raw.post_stream?.posts ?? [];
  const stream = raw.post_stream?.stream ?? [];
  const visible = posts.filter((p) => (p.post_type ?? 1) === 1 && !p.hidden && !p.deleted_at && !p.user_deleted);
  const authorId = raw.user_id ?? raw.details?.created_by?.id ?? null;
  const toPost = (p: (typeof visible)[number]): Post => ({
    id: String(p.id), floor: p.post_number,
    author: p.username || p.name || '',
    avatar: cdnFix(abs(p.avatar_template?.replace('{size}', '96'), LD) ?? '') || null,
    html: cdnFix(absLinks(p.cooked ?? '', LD)),
    time: millis(p.created_at), replyTo: p.reply_to_post_number ?? null,
    likes: typeof p.reaction_users_count === 'number' ? p.reaction_users_count : null,
    byAuthor: authorId !== null && p.user_id === authorId,
  });
  const first = page === 1 ? visible.find((p) => p.post_number === 1) : undefined;
  const opening = first ? { ...toPost(first), byAuthor: true } : null;
  const rest = visible.filter((p) => p !== first).map(toPost);
  const lastLoaded = posts.at(-1);
  const pos = lastLoaded ? stream.indexOf(lastLoaded.id) + 1 : 0;
  const more = pos > 0 && pos < stream.length;
  return {
    topic: {
      community: 'linuxdo', id: String(raw.id), title: raw.title,
      author: opening?.author || raw.details?.created_by?.username || '',
      avatar: opening?.avatar ?? null, channel: null,
      replies: typeof raw.posts_count === 'number' ? Math.max(raw.posts_count - 1, 0) : null,
      time: millis(raw.last_posted_at) ?? millis(raw.created_at), url: `${LD}/t/topic/${raw.id}`,
    },
    opening, posts: rest, page, more,
  };
};

// ---- V2EX ----
const V2 = 'https://www.v2ex.com';
const v2checked = async (url: string, proxy?: string | null, missing?: string): Promise<unknown> => {
  const r = await timedFetch(url, proxy);
  if (r.status === 403 || r.status === 429) {
    const reset = Number(r.headers.get('x-rate-limit-reset'));
    if (Number.isFinite(reset) && reset > 0) {
      const mins = Math.max(1, Math.ceil((reset * 1000 - Date.now()) / 60000));
      throw new Error(`V2EX 的请求额度用完了，${mins} 分钟后恢复`);
    }
    throw new Error('V2EX 暂时拒绝了请求，过一会儿再试');
  }
  if (r.status === 404 && missing) throw new Error(missing);
  if (r.status !== 200) throw new Error(`V2EX 返回了 ${r.status}`);
  try { return await r.json(); } catch { throw new Error('V2EX 返回的内容读不懂'); }
};

const v2exList = async (channel: string, proxy?: string | null): Promise<Topic[]> => {
  const path = channel === 'hot' ? '/api/topics/hot.json'
    : channel === 'latest' ? '/api/topics/latest.json'
    : ['programmer', 'share', 'create', 'qna', 'jobs'].includes(channel) ? `/api/topics/show.json?node_name=${channel}` : null;
  if (!path) throw new Error(`V2EX 没有这个板块：${channel}`);
  const data = await v2checked(V2 + path, proxy);
  if (!Array.isArray(data)) throw new Error('V2EX 返回的内容读不懂');
  return (data as Array<{ id: number; title: string; url?: string; replies?: number; created?: number; last_touched?: number; member?: { username: string; avatar_large?: string; avatar_normal?: string }; node?: { title: string }; }>)
    .filter((t) => typeof t.id === 'number' && typeof t.title === 'string')
    .map((t) => ({
      community: 'v2ex' as const, id: String(t.id), title: t.title,
      author: t.member?.username ?? '', avatar: abs(t.member?.avatar_large ?? t.member?.avatar_normal, V2),
      channel: t.node?.title ?? null, replies: t.replies ?? null,
      time: typeof (t.last_touched ?? t.created) === 'number' ? (t.last_touched ?? t.created ?? 0)! * 1000 : null,
      url: t.url || `${V2}/t/${t.id}`,
    })).slice(0, 100);
};

const v2exThread = async (id: string, page: number, proxy?: string | null): Promise<Thread> => {
  if (!/^\d{1,12}$/.test(id)) throw new Error('请求的参数不对（id）');
  const shown = await v2checked(`${V2}/api/topics/show.json?id=${id}`, proxy, '帖子不存在') as Array<{
    id: number; title: string; member?: { username: string; avatar_large?: string }; node?: { title: string };
    replies?: number; created?: number; content_rendered?: string;
  }>;
  if (!Array.isArray(shown) || shown.length === 0) throw new Error('帖子不存在');
  const raw = shown[0]!;
  const topic: Topic = {
    community: 'v2ex', id: String(raw.id), title: raw.title, author: raw.member?.username ?? '',
    avatar: abs(raw.member?.avatar_large, V2), channel: raw.node?.title ?? null,
    replies: raw.replies ?? null, time: typeof raw.created === 'number' ? raw.created * 1000 : null,
    url: `${V2}/t/${raw.id}`,
  };
  if (page > 1) return { topic, opening: null, posts: [], page, more: false };
  const opening: Post = {
    floor: 0, author: topic.author, avatar: topic.avatar,
    html: absLinks(raw.content_rendered ?? '', V2), time: topic.time, replyTo: null, likes: null, byAuthor: true,
  };
  const replies = await v2checked(`${V2}/api/replies/show.json?topic_id=${id}`, proxy) as Array<{
    member?: { username: string; avatar_large?: string }; content_rendered?: string; created?: number;
  }>;
  const posts: Post[] = (Array.isArray(replies) ? replies : []).map((rp, i) => ({
    floor: i + 1, author: rp.member?.username ?? '', avatar: abs(rp.member?.avatar_large, V2),
    html: absLinks(rp.content_rendered ?? '', V2),
    time: typeof rp.created === 'number' ? rp.created * 1000 : null,
    replyTo: null, likes: null, byAuthor: rp.member?.username === topic.author,
  }));
  return { topic, opening, posts, page, more: false };
};

// ---- 热榜聚合（tophub.today 榜页 + InfoQ 官网，均为服务端直出 HTML） ----
// 条目只有标题/链接/热度：Topic.author 借放热度文案，channel 放子榜名。
const TOPHUB_BOARDS: Record<string, { hash: string; sub: string }> = {
  zhihu: { hash: 'mproPpoq6O', sub: '热榜' },
  toutiao: { hash: 'x9ozB4KoXb', sub: '头条热榜' },
  csdn: { hash: 'n3moBVoN5O', sub: '热点' },
  oschina: { hash: 'rYqoXZzdOD', sub: '热门资讯' },
};
const HOT_IDS = ['zhihu', 'toutiao', 'csdn', 'oschina', 'infoq'] as const;

const stripTags = (s: string): string =>
  s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();

const tophubList = async (community: CommunityId, proxy?: string | null): Promise<Topic[]> => {
  const board = TOPHUB_BOARDS[community];
  if (!board) throw new Error('没有这个热榜');
  let r;
  try {
    r = await timedFetch(`https://tophub.today/n/${board.hash}`, proxy);
  } catch {
    throw new Error('tophub 暂时连不上（对侧限流/拦截），过几分钟按 R 再试；V2EX / linux.do / InfoQ 可用');
  }
  if (r.status !== 200) throw new Error(`热榜返回了 ${r.status}（对侧限流时过几分钟按 R 再试）`);
  const body = await r.text();
  const rows = body.match(/<tr>[\s\S]*?<\/tr>/g) ?? [];
  const out: Topic[] = [];
  for (const row of rows) {
    const link = /<a\s+href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/i.exec(row);
    if (!link) continue;
    const href = link[1]!;
    if (/^https?:\/\/(www\.)?tophub\.today\//i.test(href)) continue;
    const title = stripTags(link[2] ?? '').slice(0, 200);
    if (!title) continue;
    const heat = stripTags(
      /<td class="ws">(.*?)<\/td>/i.exec(row)?.[1]
      ?? /<span class="e">(.*?)<\/span>/.exec(row)?.[1]
      ?? '',
    );
    out.push({
      community, id: String(out.length + 1), title, author: heat, avatar: null,
      channel: board.sub, replies: null, time: null, url: href,
    });
    if (out.length >= 100) break;
  }
  if (out.length === 0) throw new Error('热榜返回的内容读不懂');
  return out;
};

const infoqList = async (proxy?: string | null): Promise<Topic[]> => {
  const r = await timedFetch('https://www.infoq.cn/', proxy);
  if (r.status !== 200) throw new Error(`InfoQ 返回了 ${r.status}`);
  const body = await r.text();
  const re = /<a[^>]*com-article-title[^>]*href="(https:\/\/www\.infoq\.cn\/article\/[^"]+)"[^>]*>[\s\S]*?<span[^>]*>([^<]{5,150})<\/span>/g;
  const out: Topic[] = [];
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    const href = m[1]!;
    if (seen.has(href)) continue;
    seen.add(href);
    const title = stripTags(m[2] ?? '').slice(0, 200);
    if (!title) continue;
    out.push({
      community: 'infoq', id: String(out.length + 1), title, author: '', avatar: null,
      channel: '推荐', replies: null, time: null, url: href,
    });
    if (out.length >= 50) break;
  }
  if (out.length === 0) throw new Error('InfoQ 返回的内容读不懂');
  return out;
};

// 热榜正文=原文链接卡（无评论）：从 3 分钟列表缓存里按序号取，缓存未命中就现拉
// tophub 四榜（知乎/头条/CSDN/开源中国）原文页均有反爬（验证/403/纯 JS 壳），只给转跳卡。
const hotThread = async (community: CommunityId, id: string, proxy?: string | null): Promise<Thread> => {
  if (!/^\d{1,12}$/.test(id)) throw new Error('请求的参数不对（id）');
  const topics = (await cachedList(community, 'hot', proxy)).topics;
  const t = topics[Number(id) - 1];
  if (!t) throw new Error('帖子不存在');
  const safeUrl = t.url.replace(/&/g, '&amp;');
  const opening: Post = {
    floor: 0, author: '', avatar: null,
    html: `<p>榜单只收录标题，<a href="${safeUrl}">在浏览器中查看原文</a></p>`,
    time: null, replyTo: null, likes: null, byAuthor: true,
  };
  return { topic: t, opening, posts: [], page: 1, more: false };
};

// InfoQ 正文直抽：文章页 Nuxt SSR，<div class="ProseMirror"> 即正文体
const infoqThread = async (id: string, proxy?: string | null): Promise<Thread> => {
  if (!/^\d{1,12}$/.test(id)) throw new Error('请求的参数不对（id）');
  const topics = (await cachedList('infoq', 'hot', proxy)).topics;
  const t = topics[Number(id) - 1];
  if (!t) throw new Error('帖子不存在');
  const safeUrl = t.url.replace(/&/g, '&amp;');
  const linkCard = `<p><a href="${safeUrl}">在浏览器中查看原文</a></p>`;
  let r;
  try {
    r = await timedFetch(t.url, proxy);
  } catch {
    throw new Error('InfoQ 正文连不上，按 R 重试，或点下方链接去浏览器看');
  }
  if (r.status !== 200) throw new Error(`InfoQ 返回了 ${r.status}`);
  const body = await r.text();
  const start = body.indexOf('<div class="ProseMirror">');
  if (start < 0) {
    const opening: Post = {
      floor: 0, author: '', avatar: null, html: linkCard,
      time: null, replyTo: null, likes: null, byAuthor: true,
    };
    return { topic: t, opening, posts: [], page: 1, more: false };
  }
  let k = start, depth = 0;
  while (k < body.length) {
    if (body.startsWith('<div', k)) { depth++; k = body.indexOf('>', k) + 1; if (k === 0) break; }
    else if (body.startsWith('</div>', k)) { depth--; k += 6; if (depth === 0) break; }
    else k++;
  }
  const inner = absLinks(body.slice(start, k), 'https://www.infoq.cn');
  const opening: Post = {
    floor: 0, author: '', avatar: null,
    html: `${inner}${linkCard}`,
    time: null, replyTo: null, likes: null, byAuthor: true,
  };
  return { topic: t, opening, posts: [], page: 1, more: false };
};

// ---- 缓存（列表 3 分钟，到期页面可见时再刷） ----
const listCache = new Map<string, { at: number; topics: Topic[] }>();
const cachedList = async (community: CommunityId, channel: string, proxy?: string | null): Promise<{ topics: Topic[]; cached: boolean }> => {
  const key = `${community}/${channel}/${proxy ?? ''}`;
  const hit = listCache.get(key);
  if (hit && Date.now() - hit.at < LIST_CACHE_TTL_MS) return { topics: hit.topics, cached: true };
  try {
    const topics = await fetchList(community, channel, proxy);
    listCache.set(key, { at: Date.now(), topics });
    return { topics, cached: false };
  } catch (e) {
    // 失败不断档：有旧缓存就先顶着（标 cached），页面照样可读，报错由调用方展示
    if (hit && hit.topics.length > 0) return { topics: hit.topics, cached: true };
    throw e;
  }
};

const fetchList = async (community: CommunityId, channel: string, proxy?: string | null): Promise<Topic[]> => {
  if ((HOT_IDS as readonly string[]).includes(community)) {
    if (community === 'infoq') return infoqList(proxy);
    return tophubList(community, proxy);
  }
  if (community === 'linuxdo') return linuxdoList(channel, proxy);
  if (community === 'v2ex') return v2exList(channel, proxy);
  throw new Error('bad-community');
};

const proxyOf = (req: http.IncomingMessage, url: URL): string | null | undefined => {
  // 面板⚙里配的优先（x-proxy 头或 ?proxy=）；都没有则沿用 service 自己的 env（宿主下为空=直连）
  const header = req.headers['x-proxy'];
  const q = url.searchParams.get('proxy');
  const v = (Array.isArray(header) ? header[0] : header ?? q)?.trim();
  if (v) return v;
  return undefined; // undefined = h2get 按 env 决定；显式 '' = 直连
};

const json = (res: http.ServerResponse, status: number, body: unknown): void => {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
};
const readBody = (req: http.IncomingMessage): Promise<unknown> =>
  new Promise((resolve) => {
    let text = '';
    req.on('data', (c: Buffer) => { text += c.toString('utf8'); if (text.length > BODY_MAX) req.destroy(); });
    req.on('end', () => {
      if (!text) return resolve({});
      try { resolve(JSON.parse(text)); } catch { resolve(null); }
    });
  });

const server = http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) return json(res, 401, { ok: false, error: 'unauthorized' });
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');
  if (url.pathname === '/health') return json(res, 200, { ok: true });
  if (req.method === 'GET' && url.pathname === '/communities') return json(res, 200, { ok: true, communities: COMMUNITIES });

  if (req.method === 'GET' && url.pathname === '/list') {
    const community = url.searchParams.get('community') as CommunityId;
    const channel = url.searchParams.get('channel') ?? '';
    if (!COMMUNITIES.some((c) => c.id === community)) return json(res, 400, { ok: false, error: 'bad-community' });
    const px = proxyOf(req, url) ?? undefined;
    cachedList(community, channel, px).then(
      ({ topics, cached }) => json(res, 200, { ok: true, topics, cached }),
      (e) => json(res, 200, { ok: false, error: netError(e).message }),
    );
    return;
  }
  if (req.method === 'GET' && url.pathname === '/thread') {
    const community = url.searchParams.get('community') as CommunityId;
    const id = url.searchParams.get('id') ?? '';
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1') || 1);
    const px = proxyOf(req, url) ?? undefined;
    (async () => {
      if (community === 'infoq') return infoqThread(id, px);
      if ((HOT_IDS as readonly string[]).includes(community)) return hotThread(community, id, px);
      return community === 'linuxdo' ? linuxdoThread(id, page, px) : v2exThread(id, page, px);
    })().then(
      (thread) => json(res, 200, { ok: true, thread }),
      (e) => json(res, 200, { ok: false, error: netError(e).message }),
    );
    return;
  }
  // 图片代理：页面不直连论坛，点开才加载；论坛看到的是 service 的 IP（和用浏览器看帖一样）。
  // 二进制走 h2get（原生 fetch 读不到宿主的代理），论坛 JSON/RSS 同走 HTTP/2。
  if (req.method === 'GET' && url.pathname === '/image') {
    const src = url.searchParams.get('url') ?? '';
    let u: URL;
    try { u = new URL(src); } catch { return json(res, 400, { ok: false, error: 'bad-url' }); }
    const allowed = /^(linux\.do|cdn\.ldstatic\.com|.*\.v2ex\.com|v2ex\.com|.*\.infoq\.cn|static001\.geekbang\.org)$/.test(u.hostname);
    if (u.protocol !== 'https:' || !allowed) return json(res, 400, { ok: false, error: 'bad-host' });
    (async () => {
      await pace();
      const ctrl = new AbortController();
      const px = proxyOf(req, url) ?? undefined;
      try {
        const h = await h2get(u.toString(), ctrl.signal, { timeoutMs: FETCH_TIMEOUT_MS, proxy: px, maxBytes: 4 * 1024 * 1024 });
        const ct = h.headers['content-type'] ?? 'image/*';
        if (!ct.startsWith('image/')) return json(res, 200, { ok: false, error: 'not-image' });
        res.writeHead(200, { 'Content-Type': ct, 'Cache-Control': 'public, max-age=3600' });
        res.end(h.body);
      } catch (e) { json(res, 200, { ok: false, error: netError(e).message }); }
    })();
    return;
  }
  // 写操作 MVP：匿名不可写，按 moyu 语气返回，由页面提示登录
  if (req.method === 'POST' && ['/session', '/reply', '/like', '/upload', '/notifications'].includes(url.pathname)) {
    readBody(req).then(() => {
      if (url.pathname === '/session') return json(res, 200, { ok: true, account: null });
      if (url.pathname === '/notifications') return json(res, 200, { ok: false, error: '登录后可看通知（MVP 未接登录）' });
      return json(res, 200, { ok: false, error: '匿名不能操作，登录后可用（MVP 未接登录）' });
    });
    return;
  }
  return json(res, 404, { ok: false, error: 'not-found' });
});

server.listen(port, '127.0.0.1');
