// Service：常驻 host 进程（Antumi 是一次一进程，这里是常驻 + 无状态 handler）。
// 只做匿名读：linux.do 走 RSS 列表 + Discourse JSON 正文；V2EX 走公开 JSON API。
// 登录/回复/点赞/通知先按契约返回 need-login，UI 照 moyu 文案提示，不静默失败。
// 代理：env 优先（HTTPS_PROXY/ALL_PROXY/HTTP_PROXY），直连为主；Cloudflare 场景 service 日志写 stderr。
import http from 'node:http';
import { readFile, writeFile, rename } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { COMMUNITIES, type CommunityId, type Post, type Thread, type Topic } from '../shared/types.js';
import { parseRss } from '../shared/rss.js';

const port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
const token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? '';
if (!port || !token) { console.error('OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required'); process.exit(1); }

// 宿主的小模型配置就在这个文件里，宿主每次生成都会重读，所以改完立即生效
const DATA_DIR = process.env.OPENCHAMBER_DATA_DIR
  ? path.resolve(process.env.OPENCHAMBER_DATA_DIR)
  : path.join(os.homedir(), '.config', 'openchamber');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

type ModelRef = { providerID: string; modelID: string };
const readHostSettings = async (): Promise<Record<string, unknown>> => {
  try {
    const raw = await readFile(SETTINGS_FILE, 'utf8');
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
  } catch { return {}; }
};
const modelRefsOf = (value: unknown): ModelRef[] => {
  if (!Array.isArray(value)) return [];
  const out: ModelRef[] = [];
  for (const it of value) {
    const o = it as { providerID?: unknown; modelID?: unknown };
    if (typeof o?.providerID === 'string' && typeof o.modelID === 'string' && o.providerID && o.modelID) {
      out.push({ providerID: o.providerID, modelID: o.modelID });
    }
  }
  return out;
};
const modelCatalog = (s: Record<string, unknown>): ModelRef[] => {
  const seen = new Map<string, ModelRef>();
  for (const list of [s.favoriteModels, s.recentModels, s.hiddenModels]) {
    for (const m of modelRefsOf(list)) seen.set(`${m.providerID}/${m.modelID}`, m);
  }
  const ov = typeof s.smallModelOverride === 'string' ? s.smallModelOverride.trim() : '';
  const slash = ov.indexOf('/');
  if (slash > 0) seen.set(ov, { providerID: ov.slice(0, slash), modelID: ov.slice(slash + 1) });
  return [...seen.values()].sort((a, b) =>
    a.providerID === b.providerID ? a.modelID.localeCompare(b.modelID) : a.providerID.localeCompare(b.providerID));
};
const writeHostSettings = async (mutate: (s: Record<string, unknown>) => void): Promise<void> => {
  const s = await readHostSettings();
  mutate(s);
  const tmp = `${SETTINGS_FILE}.moyu-tmp`;
  await writeFile(tmp, `${JSON.stringify(s, null, 2)}\n`, 'utf8');
  await rename(tmp, SETTINGS_FILE);
};

const FETCH_TIMEOUT_MS = 15_000;
const LIST_CACHE_TTL_MS = 30 * 60 * 1000; // 列表/正文缓存 30 分钟；面板点 ↻ 用 force=1 绕过
const BODY_MAX = 256 * 1024;

// 请求排队：按站点分队列，真正串行（原来的 1 秒间隔在并发下会同时穿过去，触发 429）
// 面板会一次性并发 20 个榜单，所以这里必须按 host 排队，不能只靠单点时间戳。
const lastStartByHost = new Map<string, number>();
const gateByHost = new Map<string, Promise<void>>();
const PACE_BY_HOST: Record<string, number> = {
  'linux.do': 1600,
  'www.v2ex.com': 1000,
};
const PACE_DEFAULT = 250;
const pace = async (target?: string): Promise<void> => {
  let host = 'default';
  if (target) {
    try { host = new URL(target).hostname; } catch { /* 保持 default */ }
  }
  const prev = gateByHost.get(host) ?? Promise.resolve();
  let release!: () => void;
  const gate = new Promise<void>((r) => { release = r; });
  gateByHost.set(host, prev.then(() => gate));
  await prev;
  const gapMs = PACE_BY_HOST[host] ?? PACE_DEFAULT;
  const gap = gapMs - (Date.now() - (lastStartByHost.get(host) ?? 0));
  if (gap > 0) await new Promise((r) => setTimeout(r, gap));
  lastStartByHost.set(host, Date.now());
  release();
};

import { h2get, h1get } from './net.js';
type FetchLike = { status: number; headers: { get(n: string): string | null }; text(): Promise<string>; json(): Promise<unknown>; ok: boolean };
const timedFetch = async (url: string, proxy?: string | null): Promise<FetchLike> => {
  await pace(url);
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
  if (r.status === 429) throw new Error('linux.do 限流中（请求过密），过几分钟点 ↻ 再试');
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
    throw new Error('V2EX 限流中，过几分钟点 ↻ 再试');
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

// ---- 热榜聚合（各站官方口，均为服务端直出；掘金走 JSON API） ----
// 条目只有标题/链接/热度：Topic.author 借放热度文案，channel 放子榜名，excerpt 放摘要。
const stripTags = (s: string): string =>
  s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n))).trim();

// 掘金热门：公开推荐 API（POST，需带 client_type）
const h2post = async (url: string, payload: unknown, proxy?: string | null): Promise<unknown> => {
  await pace(url);
  const ctrl = new AbortController();
  const h = await h2get(url, ctrl.signal, { timeoutMs: FETCH_TIMEOUT_MS, proxy, method: 'POST', body: JSON.stringify(payload) });
  if (h.status !== 200) throw new Error(`掘金返回了 ${h.status}`);
  try { return JSON.parse(h.body.toString('utf8')); } catch { throw new Error('掘金返回的内容读不懂'); }
};
type JuejinItem = { item_info?: { article_id?: unknown; article_info?: { article_id?: unknown; title?: unknown; brief_content?: unknown; ctime?: unknown; comment_count?: unknown }; author_user_info?: { user_name?: unknown } } };
const juejinList = async (proxy?: string | null): Promise<Topic[]> => {
  let data: unknown;
  try {
    data = await h2post('https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed', { id_type: 2, client_type: 2608, sort_type: 3, limit: 30 }, proxy);
  } catch {
    throw new Error('掘金暂时连不上过一会儿再试');
  }
  const items = (data as { err_no?: unknown; data?: unknown }).data;
  if (!Array.isArray(items) || items.length === 0) throw new Error('掘金返回的内容读不懂');
  return (items as JuejinItem[]).slice(0, 30).map((it): Topic | null => {
    const ai = it.item_info?.article_info ?? {};
    const id = String(ai.article_id ?? it.item_info?.article_id ?? '');
    if (!id || typeof ai.title !== 'string') return null;
    const ctime = typeof ai.ctime === 'string' || typeof ai.ctime === 'number' ? Number(ai.ctime) : NaN;
    return {
      community: 'juejin' as const, id, title: ai.title.slice(0, 200),
      author: typeof it.item_info?.author_user_info?.user_name === 'string' ? it.item_info.author_user_info.user_name : '',
      avatar: null, channel: '热门',
      replies: typeof ai.comment_count === 'number' ? ai.comment_count : null,
      time: Number.isFinite(ctime) && ctime > 0 ? ctime * (ctime < 1e12 ? 1000 : 1) : null,
      url: `https://juejin.cn/post/${id}`,
      excerpt: typeof ai.brief_content === 'string' ? ai.brief_content.slice(0, 220) : '',
    };
  }).filter((t): t is Topic => !!t && !!t.title);
};

// IT之家资讯：m 站公开列表 API（description 即摘要）
const ithomeList = async (proxy?: string | null): Promise<Topic[]> => {
  let data: unknown;
  try {
    const r = await timedFetch('https://m.ithome.com/api/news/newslistpageget?TagIds=0&page=1', proxy);
    if (r.status !== 200) throw new Error(`IT之家返回了 ${r.status}`);
    data = await r.json();
  } catch (e) {
    if (e instanceof Error && /IT之家返回/.test(e.message)) throw e;
    throw new Error('IT之家暂时连不上过一会儿再试');
  }
  const items = (data as { Result?: unknown }).Result;
  if (!Array.isArray(items) || items.length === 0) throw new Error('IT之家返回的内容读不懂');
  return items.slice(0, 30).map((it): Topic | null => {
    const o = it as Record<string, unknown>;
    if (typeof o.title !== 'string') return null;
    const u = typeof o.url === 'string' ? o.url : '';
    const t = typeof o.postdate === 'string' ? Date.parse(o.postdate) : NaN;
    return {
      community: 'ithome' as const, id: String(typeof o.newsid === 'number' ? o.newsid : o.newsid ?? ''),
      title: (o.title as string).slice(0, 200), author: '', avatar: null, channel: '资讯',
      replies: null, time: Number.isNaN(t) ? null : t,
      url: u.startsWith('http') ? u : `https://www.ithome.com${u}`,
      excerpt: typeof o.description === 'string' ? o.description.slice(0, 220) : '',
    };
  }).filter((t): t is Topic => !!t && !!t.title && !!t.url);
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

// 今日头条：官方 hot-board 直出 JSON（Title/HotValue/Url），比 tophub 稳
const formatHot = (v: number): string =>
  v >= 10000 ? `${(v / 10000).toFixed(1)}万` : String(v);
const toutiaoList = async (proxy?: string | null): Promise<Topic[]> => {
  let r;
  try {
    r = await timedFetch('https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc', proxy);
  } catch {
    throw new Error('头条榜单暂时连不上，过几分钟按 R 再试');
  }
  if (r.status !== 200) throw new Error(`头条榜单返回了 ${r.status}`);
  let data: unknown;
  try { data = await r.json(); } catch { throw new Error('头条榜单读不懂'); }
  const items = (data as { data?: Array<{ Title?: unknown; Url?: unknown; HotValue?: unknown; ClusterIdStr?: unknown }> }).data;
  if (!Array.isArray(items) || items.length === 0) throw new Error('头条榜单读不懂');
  return items.slice(0, 50).map((it, i) => {
    const url = typeof it.Url === 'string' && it.Url.startsWith('http') ? it.Url
      : `https://www.toutiao.com/trending/${typeof it.ClusterIdStr === 'string' ? it.ClusterIdStr : ''}/`;
    return {
      community: 'toutiao' as const, id: String(i + 1),
      title: typeof it.Title === 'string' && it.Title ? it.Title.slice(0, 200) : `热榜 ${i + 1}`,
      author: typeof it.HotValue === 'number' ? `热度 ${formatHot(it.HotValue)}` : '',
      avatar: null, channel: '热榜', replies: null, time: null, url,
    };
  });
};

// 开源中国：官方新闻 RSS（服务端直出，带摘要），走 HTTP/1.1（对方不支持 h2）
const oscExcerpt = (html: string): string =>
  html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 220);
const oschinaList = async (proxy?: string | null): Promise<Topic[]> => {
  await pace('https://www.oschina.net/news/rss');
  const ctrl = new AbortController();
  let raw: string;
  try {
    const h = await h1get('https://www.oschina.net/news/rss', ctrl.signal, { timeoutMs: FETCH_TIMEOUT_MS, proxy });
    if (h.status !== 200) throw new Error(`开源中国返回了 ${h.status}`);
    raw = h.body.toString('utf8');
  } catch (e) {
    if (e instanceof Error && /开源中国返回/.test(e.message)) throw e;
    throw new Error('开源中国暂时连不上，过几分钟按 R 再试');
  }
  const items = parseRss(raw);
  if (items.length === 0) throw new Error('开源中国返回的内容读不懂');
  return items.slice(0, 50).map((item, i) => {
    const link = typeof item.link === 'string' ? item.link.replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
    const m = /\/news\/(\d+)/.exec(link);
    return {
      community: 'oschina' as const, id: m?.[1] ?? String(i + 1),
      title: (item.title ?? '').slice(0, 200),
      author: typeof item.creator === 'string' ? item.creator : '',
      avatar: null, channel: '资讯', replies: null,
      time: millis(typeof item.pubDate === 'string' ? item.pubDate : null),
      url: link || 'https://www.oschina.net/news',
      excerpt: oscExcerpt(typeof item.description === 'string' ? item.description : ''),
    };
  }).filter((t) => t.title);
};

// Solidot：官方 RSS（服务端直出，摘要即正文），走 HTTP/1.1
const solidotList = async (proxy?: string | null): Promise<Topic[]> => {
  await pace('https://www.solidot.org/index.rss');
  const ctrl = new AbortController();
  let raw: string;
  try {
    const h = await h1get('https://www.solidot.org/index.rss', ctrl.signal, { timeoutMs: 30000, proxy });
    if (h.status !== 200) throw new Error(`Solidot 返回了 ${h.status}`);
    raw = h.body.toString('utf8');
  } catch (e) {
    if (e instanceof Error && /Solidot 返回/.test(e.message)) throw e;
    throw new Error('Solidot 暂时连不上，过一会儿再试');
  }
  const items = parseRss(raw);
  if (items.length === 0) throw new Error('Solidot 返回的内容读不懂');
  return items.slice(0, 30).map((item, i) => {
    const link = (item.link ?? '').trim();
    const m = /[?&]sid=(\d+)/.exec(link);
    return {
      community: 'solidot' as const, id: m?.[1] ?? String(i + 1),
      title: (item.title ?? '').slice(0, 200), author: '', avatar: null, channel: '资讯',
      replies: null, time: millis(typeof item.pubDate === 'string' ? item.pubDate : null),
      url: link || 'https://www.solidot.org/',
      excerpt: oscExcerpt(typeof item.description === 'string' ? item.description : ''),
    };
  }).filter((t) => t.title);
};

// ---- 热榜聚合站 rebang.today（Next.js RSC 直出，一块数据带多个平台） ----
// 首页/分类页/`?tab=` 都能取到 items[]：标题、直链、摘要、热度、平台名。
const REBANG: Record<string, { url: string; name: string }> = {
  news: { url: 'https://rebang.today/news', name: '国内新闻' },
  tech: { url: 'https://rebang.today/tech', name: '科技' },
  fin: { url: 'https://rebang.today/fin', name: '财经' },
  ent: { url: 'https://rebang.today/ent', name: '娱乐' },
  community: { url: 'https://rebang.today/community', name: '社区' },
  dev: { url: 'https://rebang.today/dev', name: '开发' },
  shopping: { url: 'https://rebang.today/shopping', name: '购物' },
  weibo: { url: 'https://rebang.today/?tab=weibo', name: '微博' },
  douyin: { url: 'https://rebang.today/?tab=douyin', name: '抖音' },
};
// Next.js Flight：数据在 self.__next_f.push([1,"..."]) 的 JSON 字符串里
const decodeFlight = (body: string): string => {
  const re = /self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)/g;
  let out = '';
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    try { out += JSON.parse(`"${m[1]}"`) as string; } catch { /* 跳过坏分片 */ }
  }
  return out;
};
// 从 needle 后第一个 [ 起做括号匹配，取出完整 JSON 数组（避开字符串里的括号）
const grabArray = (s: string, needle: string): string | null => {
  const at = s.indexOf(needle);
  if (at < 0) return null;
  const start = s.indexOf('[', at);
  if (start < 0) return null;
  let depth = 0, inStr = false, esc = false;
  for (let k = start; k < s.length; k++) {
    const c = s[k]!;
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) return s.slice(start, k + 1); }
  }
  return null;
};
const rebangList = async (community: CommunityId, proxy?: string | null): Promise<Topic[]> => {
  const cfg = REBANG[community];
  if (!cfg) throw new Error('没有这个信息源');
  let r;
  try {
    r = await timedFetch(cfg.url, proxy);
  } catch {
    throw new Error('热榜聚合站暂时连不上，过一会儿点 ↻ 再试');
  }
  if (r.status !== 200) throw new Error(`热榜聚合站返回了 ${r.status}`);
  const raw = decodeFlight(await r.text());
  const seg = grabArray(raw, '"items"');
  if (!seg) throw new Error('热榜聚合站返回的内容读不懂');
  let items: unknown;
  try { items = JSON.parse(seg); } catch { throw new Error('热榜聚合站返回的内容读不懂'); }
  if (!Array.isArray(items) || items.length === 0) throw new Error('热榜聚合站返回的内容读不懂');
  const tabs = new Map<string, string>();
  for (const m of raw.matchAll(/"tabKey":"([^"]+)","name":"([^"]+)"/g)) tabs.set(m[1]!, m[2]!);
  return items.slice(0, 15).map((it, i): Topic | null => {
    const o = it as {
      itemKey?: unknown; title?: unknown; href?: unknown; mobileHref?: unknown; desc?: unknown;
      extraInfo?: { tab_key?: unknown; display_text_items?: Array<{ text?: unknown }> };
    };
    const title = typeof o.title === 'string' ? o.title.trim() : '';
    const url = typeof o.href === 'string' && /^https?:/i.test(o.href) ? o.href
      : typeof o.mobileHref === 'string' && /^https?:/i.test(o.mobileHref) ? o.mobileHref : '';
    if (!title || !url) return null;
    const tk = o.extraInfo?.tab_key;
    const platform = (typeof tk === 'string' && tabs.get(tk)) || cfg.name;
    return {
      community, id: typeof o.itemKey === 'string' && o.itemKey ? o.itemKey : `${cfg.url}#${i}`,
      title: title.slice(0, 200), author: platform, avatar: null, channel: cfg.name,
      replies: null, time: null, url,
      excerpt: typeof o.desc === 'string' && o.desc.trim() ? o.desc.replace(/\s+/g, ' ').trim().slice(0, 300) : null,
    };
  }).filter((t): t is Topic => !!t && !!t.title && !!t.url);
};

// 热榜正文=原文链接卡（无评论）：从 3 分钟列表缓存里按序号取，缓存未命中就现拉
// 头条原文页是纯 JS 壳，只给转跳卡。
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

// 掘金正文=全文 markdown（转纯文本块）+ 原文链接
const juejinThread = async (id: string, proxy?: string | null): Promise<Thread> => {
  if (!/^\d{1,20}$/.test(id)) throw new Error('请求的参数不对（id）');
  const topics = (await cachedList('juejin', 'hot', proxy)).topics;
  const t = topics.find((x) => x.id === id);
  if (!t) throw new Error('帖子不存在');
  const safeUrl = t.url.replace(/&/g, '&amp;');
  let data: unknown;
  try {
    data = await h2post('https://api.juejin.cn/content_api/v1/article/detail', { article_id: id, client_type: 2608 }, proxy);
  } catch {
    throw new Error('掘金正文连不上，稍后按 R 重试，或点下方链接去浏览器看');
  }
  const mc = (data as { data?: { article_info?: { mark_content?: unknown } } }).data?.article_info?.mark_content;
  const body = typeof mc === 'string' && mc.trim()
    ? `<pre>${escHtml(mc.slice(0, 20000))}</pre><p><a href="${safeUrl}">在浏览器中查看原文</a></p>`
    : (t.excerpt ? `<p>${escHtml(t.excerpt)}</p>` : '') + `<p><a href="${safeUrl}">在浏览器中查看原文</a></p>`;
  const opening: Post = {
    floor: 0, author: t.author, avatar: null, html: body,
    time: t.time, replyTo: null, likes: null, byAuthor: true,
  };
  return { topic: t, opening, posts: [], page: 1, more: false };
};

// IT之家正文直抽：文章页服务端直出，<div id="paragraph"> 即正文体
const ithomeThread = async (id: string, proxy?: string | null): Promise<Thread> => {
  const topics = (await cachedList('ithome', 'hot', proxy)).topics;
  const t = topics.find((x) => x.id === id);
  if (!t) throw new Error('帖子不存在');
  const safeUrl = t.url.replace(/&/g, '&amp;');
  const linkCard = `<p><a href="${safeUrl}">在浏览器中查看原文</a></p>`;
  await pace(t.url);
  const ctrl = new AbortController();
  let raw: string;
  try {
    const h = await h1get(t.url, ctrl.signal, { timeoutMs: FETCH_TIMEOUT_MS, proxy });
    if (h.status !== 200) throw new Error(`IT之家返回了 ${h.status}`);
    raw = h.body.toString('utf8');
  } catch (e) {
    if (e instanceof Error && /IT之家返回/.test(e.message)) throw e;
    throw new Error('IT之家正文连不上，稍后点↻重试或去浏览器看');
  }
  const body = raw;
  const anchor = body.indexOf('id="paragraph"');
  if (anchor < 0) {
    const opening: Post = {
      floor: 0, author: '', avatar: null,
      html: (t.excerpt ? `<p>${escHtml(t.excerpt)}</p>` : '') + linkCard,
      time: t.time, replyTo: null, likes: null, byAuthor: true,
    };
    return { topic: t, opening, posts: [], page: 1, more: false };
  }
  const start = Math.max(0, body.lastIndexOf('<div', anchor));
  let k = start, depth = 0;
  while (k < body.length && k >= 0) {
    if (body.startsWith('<div', k)) { depth++; k = body.indexOf('>', k) + 1; if (k === 0) break; }
    else if (body.startsWith('</div>', k)) { depth--; k += 6; if (depth === 0) break; }
    else k++;
  }
  const inner = absLinks(body.slice(start, k), 'https://www.ithome.com');
  const opening: Post = {
    floor: 0, author: '', avatar: null, html: `${inner}${linkCard}`,
    time: t.time, replyTo: null, likes: null, byAuthor: true,
  };
  return { topic: t, opening, posts: [], page: 1, more: false };
};
// 开源中国正文=RSS 摘要 + 原文链接（详情页是 JS 壳，摘要即正文）
const escHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const oschinaThread = async (id: string, proxy?: string | null): Promise<Thread> => {
  const topics = (await cachedList('oschina', 'hot', proxy)).topics;
  const t = topics.find((x) => x.id === id) ?? (/^\d{1,12}$/.test(id) ? topics[Number(id) - 1] : undefined);
  if (!t) throw new Error('帖子不存在');
  const safeUrl = t.url.replace(/&/g, '&amp;');
  const body = t.excerpt
    ? `<p>${escHtml(t.excerpt)}</p><p><a href="${safeUrl}">在浏览器中查看原文</a></p>`
    : `<p>榜单只收录标题，<a href="${safeUrl}">在浏览器中查看原文</a></p>`;
  const opening: Post = {
    floor: 0, author: t.author, avatar: null, html: body,
    time: t.time, replyTo: null, likes: null, byAuthor: true,
  };
  return { topic: t, opening, posts: [], page: 1, more: false };
};

// rebang 源：只有摘要 + 原文链接（原文多为各站详情页，反爬不一，不抓正文）
const rebangThread = async (community: CommunityId, id: string, proxy?: string | null): Promise<Thread> => {
  const topics = (await cachedList(community, 'hot', proxy)).topics;
  const t = topics.find((x) => x.id === id);
  if (!t) throw new Error('帖子不存在');
  const safeUrl = t.url.replace(/&/g, '&amp;');
  const body = t.excerpt
    ? `<p>${escHtml(t.excerpt)}</p><p><a href="${safeUrl}">在浏览器中查看原文</a></p>`
    : `<p><a href="${safeUrl}">在浏览器中查看原文</a></p>`;
  const opening: Post = {
    floor: 0, author: t.author, avatar: null, html: body,
    time: t.time, replyTo: null, likes: null, byAuthor: true,
  };
  return { topic: t, opening, posts: [], page: 1, more: false };
};

// Solidot 正文=RSS 全文/摘要 + 原文链接
const solidotThread = async (id: string, proxy?: string | null): Promise<Thread> => {
  const topics = (await cachedList('solidot', 'hot', proxy)).topics;
  const t = topics.find((x) => x.id === id);
  if (!t) throw new Error('帖子不存在');
  const safeUrl = t.url.replace(/&/g, '&amp;');
  const sbody = t.excerpt
    ? `<p>${escHtml(t.excerpt)}</p><p><a href="${safeUrl}">在浏览器中查看原文</a></p>`
    : `<p><a href="${safeUrl}">在浏览器中查看原文</a></p>`;
  const sopening: Post = {
    floor: 0, author: '', avatar: null, html: sbody,
    time: t.time, replyTo: null, likes: null, byAuthor: true,
  };
  return { topic: t, opening: sopening, posts: [], page: 1, more: false };
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

// ---- 联网搜索（Bing 直出页 via h1，供无正文源的 ✦ 总结用；只取标题+摘要，不进原文） ----
export type SearchHit = { title: string; snippet: string; url: string; site: string };
const searchCache = new Map<string, { at: number; results: SearchHit[] }>();
const SEARCH_CACHE_TTL_MS = 6 * 3600 * 1000;
const bingSearch = async (q: string, proxy?: string | null): Promise<SearchHit[]> => {
  const key = q.slice(0, 120);
  const hit = searchCache.get(key);
  if (hit && Date.now() - hit.at < SEARCH_CACHE_TTL_MS) return hit.results;
  await pace('https://www.bing.com/search');
  const ctrl = new AbortController();
  let body: string;
  try {
    const h = await h1get(`https://www.bing.com/search?q=${encodeURIComponent(q)}&setlang=zh-CN`, ctrl.signal, { timeoutMs: FETCH_TIMEOUT_MS, proxy });
    if (h.status !== 200) throw new Error(`搜索返回了 ${h.status}`);
    body = h.body.toString('utf8');
  } catch (e) {
    if (e instanceof Error && /搜索返回/.test(e.message)) throw e;
    throw new Error('搜索暂时连不上过一会儿再试');
  }
  const blocks = body.match(/<li class="b_algo"[\s\S]*?<\/li>/g) ?? [];
  // 相关性门：Bing 偶尔给机器人掺假结果，标题+摘要里凑不够 query 的二字片段就丢掉
  const qchars = q.replace(/[^\p{Script=Han}A-Za-z0-9]+/gu, '');
  const grams = new Set<string>();
  for (let i = 0; i + 1 < qchars.length; i++) grams.add(qchars.slice(i, i + 2));
  const need = Math.min(2, grams.size);
  const out: SearchHit[] = [];
  for (const b of blocks) {
    const raw = b.replace(/&amp;/g, '&');
    const href = /<h2><a[^>]+href="([^"]+)"/.exec(raw)?.[1] ?? '';
    let url = '';
    const m = /[?&]u=a1([^&]+)/.exec(href);
    if (m) {
      try {
        const pad = m[1]!.replace(/-/g, '+').replace(/_/g, '/');
        url = Buffer.from(pad, 'base64').toString('utf8');
      } catch { /* 忽略，用展示链接 */ }
    }
    if (!url && /^https?:\/\//.test(href) && !/bing\.com/i.test(href)) url = href;
    const title = stripTags(/<h2><a[^>]*>([\s\S]*?)<\/a><\/h2>/.exec(raw)?.[1] ?? '').slice(0, 120);
    if (!title) continue;
    const site = /<cite>([^<]*)<\/cite>/.exec(raw)?.[1]?.trim() ?? '';
    const snippet = stripTags(/<div class="b_caption">[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/.exec(raw)?.[1] ?? '').slice(0, 200);
    if (need > 0) {
      const hay = title + snippet;
      let hits = 0;
      for (const g of grams) if (hay.includes(g)) hits++;
      if (hits < need) continue; // 疑似假结果/文不对题
    }
    out.push({ title, snippet, url, site });
    if (out.length >= 8) break;
  }
  if (out.length === 0) throw new Error('搜索没有返回可用结果');
  searchCache.set(key, { at: Date.now(), results: out });
  return out;
};
// ---- 缓存：列表 30 分钟；正文 30 分钟 ----
// 面板进入只读自己的 feed 缓存，点 ↻ 时带 force=1 强制绕过这里，避免"点了刷新还是旧数据"。
const listCache = new Map<string, { at: number; topics: Topic[] }>();
const cachedList = async (community: CommunityId, channel: string, proxy?: string | null, force = false): Promise<{ topics: Topic[]; cached: boolean; at: number }> => {
  const key = `${community}/${channel}/${proxy ?? ''}`;
  const hit = listCache.get(key);
  if (!force && hit && Date.now() - hit.at < LIST_CACHE_TTL_MS) return { topics: hit.topics, cached: true, at: hit.at };
  try {
    const topics = await fetchList(community, channel, proxy);
    const at = Date.now();
    listCache.set(key, { at, topics });
    return { topics, cached: false, at };
  } catch (e) {
    // 失败不断档：有旧缓存就先顶着（标 cached），页面照样可读，报错由调用方展示
    if (hit && hit.topics.length > 0) return { topics: hit.topics, cached: true, at: hit.at };
    throw e;
  }
};

// 正文缓存：✦ 总结要点开正文，同一篇反复点不该反复抓网
const threadCache = new Map<string, { at: number; thread: Thread }>();
const cachedThread = async (
  key: string, proxy: string | undefined, force: boolean,
  load: () => Promise<Thread>,
): Promise<{ thread: Thread; cached: boolean }> => {
  const k = `${key}/${proxy ?? ''}`;
  const hit = threadCache.get(k);
  if (!force && hit && Date.now() - hit.at < LIST_CACHE_TTL_MS) return { thread: hit.thread, cached: true };
  try {
    const thread = await load();
    threadCache.set(k, { at: Date.now(), thread });
    return { thread, cached: false };
  } catch (e) {
    if (hit) return { thread: hit.thread, cached: true };
    throw e;
  }
};

const fetchList = async (community: CommunityId, channel: string, proxy?: string | null): Promise<Topic[]> => {
  if (community === 'toutiao') return toutiaoList(proxy);
  if (REBANG[community]) return rebangList(community, proxy);
  if (community === 'juejin') return juejinList(proxy);
  if (community === 'ithome') return ithomeList(proxy);
  if (community === 'oschina') return oschinaList(proxy);
  if (community === 'solidot') return solidotList(proxy);
  if (community === 'infoq') return infoqList(proxy);
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
    const force = url.searchParams.get('force') === '1';
    cachedList(community, channel, px, force).then(
      ({ topics, cached, at }) => json(res, 200, { ok: true, topics, cached, cachedAt: at }),
      (e) => json(res, 200, { ok: false, error: netError(e).message }),
    );
    return;
  }
  if (req.method === 'GET' && url.pathname === '/thread') {
    const community = url.searchParams.get('community') as CommunityId;
    const id = url.searchParams.get('id') ?? '';
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1') || 1);
    const px = proxyOf(req, url) ?? undefined;
    const force = url.searchParams.get('force') === '1';
    cachedThread(`${community}:${id}:${page}`, px, force, async () => {
      if (community === 'infoq') return infoqThread(id, px);
      if (community === 'oschina') return oschinaThread(id, px);
      if (community === 'solidot') return solidotThread(id, px);
      if (community === 'juejin') return juejinThread(id, px);
      if (community === 'ithome') return ithomeThread(id, px);
      if (community === 'toutiao') return hotThread(community, id, px);
      if (REBANG[community]) return rebangThread(community, id, px);
      return community === 'linuxdo' ? linuxdoThread(id, page, px) : v2exThread(id, page, px);
    }).then(
      ({ thread }) => json(res, 200, { ok: true, thread }),
      (e) => json(res, 200, { ok: false, error: netError(e).message }),
    );
    return;
  }
  // 小模型设置：读当前配置 + 可选模型（来自宿主 settings 的收藏/最近/隐藏），并允许切换
  if (req.method === 'GET' && url.pathname === '/settings/model') {
    readHostSettings().then((s) => json(res, 200, {
      ok: true,
      useDefault: s.smallModelUseDefault !== false,
      override: typeof s.smallModelOverride === 'string' ? s.smallModelOverride : '',
      models: modelCatalog(s),
    }));
    return;
  }
  if (req.method === 'POST' && url.pathname === '/settings/model') {
    readBody(req).then(async (body) => {
      const b = (body ?? {}) as { useDefault?: unknown; providerID?: unknown; modelID?: unknown };
      const useDefault = b.useDefault !== false;
      const providerID = typeof b.providerID === 'string' ? b.providerID.trim() : '';
      const modelID = typeof b.modelID === 'string' ? b.modelID.trim() : '';
      if (!useDefault && (!providerID || !modelID)) {
        return json(res, 400, { ok: false, error: 'bad-model' });
      }
      try {
        await writeHostSettings((s) => {
          s.smallModelUseDefault = useDefault;
          if (useDefault) return;
          s.smallModelOverride = `${providerID}/${modelID}`;
          delete s.smallModelVariant;
        });
        return json(res, 200, { ok: true, useDefault, override: useDefault ? '' : `${providerID}/${modelID}` });
      } catch (e) {
        return json(res, 200, { ok: false, error: e instanceof Error ? e.message : '写入宿主设置失败' });
      }
    });
    return;
  }
  // 联网搜索：无正文源的 ✦ 用（只回标题+摘要，不进原文）
  if (req.method === 'GET' && url.pathname === '/search') {
    const q = url.searchParams.get('q') ?? '';
    if (!q.trim()) return json(res, 400, { ok: false, error: 'bad-query' });
    const px = proxyOf(req, url) ?? undefined;
    bingSearch(q.slice(0, 120), px).then(
      (results) => json(res, 200, { ok: true, results }),
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
      await pace(u.toString());
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
