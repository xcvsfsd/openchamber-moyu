// src/service/main.ts
import http from "node:http";

// src/shared/types.ts
var COMMUNITIES = [
  {
    id: "linuxdo",
    name: "linux.do",
    channels: [
      { id: "latest", name: "最新" },
      { id: "top", name: "热门" },
      { id: "develop", name: "开发调优" },
      { id: "gossip", name: "搞七捻三" },
      { id: "resource", name: "资源荟萃" },
      { id: "welfare", name: "福利羊毛" },
      { id: "news", name: "前沿快讯" }
    ]
  },
  {
    id: "v2ex",
    name: "V2EX",
    channels: [
      { id: "hot", name: "最热" },
      { id: "latest", name: "最新" },
      { id: "programmer", name: "程序员" },
      { id: "share", name: "分享发现" },
      { id: "create", name: "分享创造" },
      { id: "qna", name: "问与答" },
      { id: "jobs", name: "酷工作" }
    ]
  },
  { id: "zhihu", name: "知乎", channels: [{ id: "hot", name: "热榜" }] },
  { id: "toutiao", name: "今日头条", channels: [{ id: "hot", name: "热榜" }] },
  { id: "csdn", name: "CSDN", channels: [{ id: "hot", name: "热点" }] },
  { id: "oschina", name: "开源中国", channels: [{ id: "hot", name: "资讯" }] },
  { id: "infoq", name: "InfoQ", channels: [{ id: "hot", name: "推荐" }] }
];

// src/shared/rss.ts
var tag = (xml, name) => {
  const m = new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i").exec(xml);
  if (!m)
    return;
  let s = m[1] ?? "";
  s = s.replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1");
  return s.trim().replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
};
var parseRss = (body) => {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while (m = re.exec(body)) {
    const xml = m[1] ?? "";
    items.push({
      title: tag(xml, "title"),
      link: tag(xml, "link") ?? tag(xml, "guid"),
      pubDate: tag(xml, "pubDate"),
      creator: tag(xml, "dc:creator") ?? tag(xml, "creator") ?? tag(xml, "author"),
      category: tag(xml, "category"),
      description: tag(xml, "description")
    });
  }
  return items;
};

// src/service/net.ts
import { connect } from "node:http2";
import { connect as connectTcp } from "node:net";
import { connect as connectTls } from "node:tls";
var TIMEOUT_MS = 15000;
var MAX_BYTES = 4 * 1024 * 1024;
var UA = "openchamber-moyu/0.1.0 (+https://github.com/flyhero/antumi-moyu)";
var proxyAddress = (v) => {
  const t = v?.trim();
  if (!t)
    return null;
  const addr = /^[a-z][a-z0-9+.-]*:\/\//i.test(t) ? t : `http://${t}`;
  try {
    const u = new URL(addr);
    return (u.protocol === "http:" || u.protocol === "https:") && u.hostname ? u.href : null;
  } catch {
    return null;
  }
};
var envProxy = () => {
  const e = process.env;
  const named = e.HTTPS_PROXY ?? e.https_proxy ?? e.ALL_PROXY ?? e.all_proxy ?? e.HTTP_PROXY ?? e.http_proxy;
  if (!named)
    return null;
  const bypass = (e.NO_PROXY ?? e.no_proxy ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  return { https: proxyAddress(named), bypass };
};
var bypassed = (host, bypass) => {
  const n = host.toLowerCase();
  if (n === "localhost" || n.endsWith(".localhost") || /^127\./.test(n))
    return true;
  return bypass.some((p) => {
    const pat = p.toLowerCase();
    if (pat === "*")
      return true;
    const bare = pat.replace(/^\./, "");
    return n === bare || n.endsWith(`.${bare}`);
  });
};
var proxyFor = (url) => {
  if (url.protocol !== "https:")
    return null;
  const s = envProxy();
  if (!s)
    return null;
  return bypassed(url.hostname, s.bypass) ? null : s.https;
};
var tunnel = (proxy, host, port, signal) => new Promise((resolve, reject) => {
  const socket = proxy.protocol === "https:" ? connectTls({ host: proxy.hostname, port: Number(proxy.port || 443), servername: proxy.hostname }) : connectTcp({ host: proxy.hostname, port: Number(proxy.port || 80) });
  let reply = Buffer.alloc(0);
  let settled = false;
  const end = (err) => {
    if (settled)
      return;
    settled = true;
    signal.removeEventListener("abort", onAbort);
    socket.off("data", onData);
    socket.off("error", onError);
    socket.off("close", onClose);
    if (err) {
      socket.destroy();
      reject(err);
    } else
      resolve(socket);
  };
  const onAbort = () => end(new Error("已取消"));
  const onError = () => end(new Error("连不上代理"));
  const onClose = () => end(new Error("代理断开了连接"));
  const onData = (chunk) => {
    reply = Buffer.concat([reply, chunk]);
    const head = reply.indexOf(`\r
\r
`);
    if (head < 0) {
      if (reply.length > 16 * 1024)
        end(new Error("代理的回应读不懂"));
      return;
    }
    const status = /^HTTP\/1\.[01] (\d{3})/.exec(reply.subarray(0, head).toString("latin1"))?.[1];
    if (status !== "200") {
      end(new Error(status === "407" ? "代理需要登录" : status ? `代理拒绝了连接（${status}）` : "代理的回应读不懂"));
      return;
    }
    const rest = reply.subarray(head + 4);
    socket.pause();
    if (rest.length > 0)
      socket.unshift(rest);
    end(null);
  };
  if (signal.aborted) {
    end(new Error("已取消"));
    return;
  }
  signal.addEventListener("abort", onAbort);
  socket.on("error", () => {});
  socket.on("error", onError);
  socket.on("close", onClose);
  socket.on("data", onData);
  socket.once(proxy.protocol === "https:" ? "secureConnect" : "connect", () => {
    const authority = `${host}:${port}`;
    const login = proxy.username ? `Proxy-Authorization: Basic ${Buffer.from(`${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`).toString("base64")}\r
` : "";
    socket.write(`CONNECT ${authority} HTTP/1.1\r
Host: ${authority}\r
${login}\r
`);
  });
});
var secured = (socket, host, signal, alpn = ["h2"], requireH2 = true) => new Promise((resolve, reject) => {
  const tls = connectTls({ socket, servername: host, ALPNProtocols: alpn });
  let settled = false;
  const end = (err) => {
    if (settled)
      return;
    settled = true;
    signal.removeEventListener("abort", onAbort);
    tls.off("error", onError);
    if (err) {
      tls.destroy();
      reject(err);
    } else
      resolve(tls);
  };
  const onAbort = () => end(new Error("已取消"));
  const onError = () => end(new Error("网络错误"));
  if (signal.aborted) {
    end(new Error("已取消"));
    return;
  }
  signal.addEventListener("abort", onAbort);
  tls.on("error", onError);
  tls.once("secureConnect", () => end(requireH2 && tls.alpnProtocol !== "h2" ? new Error("对方不支持 HTTP/2") : null));
});
var plainHeaders = (headers) => {
  const out = {};
  for (const [name, value] of Object.entries(headers)) {
    if (name.startsWith(":") || value === undefined)
      continue;
    out[name] = Array.isArray(value) ? value.join(", ") : value;
  }
  return out;
};
var h2get = async (url, signal, options = {}) => {
  const target = new URL(url);
  const stop = AbortSignal.any([signal, AbortSignal.timeout(options.timeoutMs ?? TIMEOUT_MS)]);
  const abortError = () => new Error(signal.aborted ? "已取消" : "超时");
  if (stop.aborted)
    throw abortError();
  const proxy = options.proxy === undefined ? proxyFor(target) : options.proxy;
  const maxBytes = options.maxBytes ?? MAX_BYTES;
  let carrier;
  if (proxy) {
    try {
      const sock = await tunnel(new URL(proxy), target.hostname, Number(target.port || 443), stop);
      carrier = await secured(sock, target.hostname, stop);
    } catch (e) {
      throw stop.aborted ? abortError() : e;
    }
  }
  return new Promise((resolve, reject) => {
    if (stop.aborted) {
      carrier?.destroy();
      reject(abortError());
      return;
    }
    let session;
    let settled = false;
    const onAbort = () => end(abortError());
    const end = (err, response) => {
      if (settled)
        return;
      settled = true;
      stop.removeEventListener("abort", onAbort);
      session?.destroy();
      if (response)
        resolve(response);
      else
        reject(err ?? new Error("网络错误"));
    };
    stop.addEventListener("abort", onAbort);
    session = carrier ? connect(target.origin, { createConnection: () => carrier }) : connect(target.origin);
    session.on("error", () => end(new Error("网络错误")));
    const stream = session.request({ ":method": "GET", ":path": target.pathname + target.search, "user-agent": UA, accept: "*/*" }, { endStream: true });
    let status = 0;
    let headers = {};
    const chunks = [];
    let size = 0;
    stream.on("response", (received) => {
      status = Number(received[":status"]);
      headers = plainHeaders(received);
      if (Number(headers["content-length"]) > maxBytes)
        end(new Error("响应太大"));
    });
    stream.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBytes)
        end(new Error("响应太大"));
      else
        chunks.push(chunk);
    });
    stream.on("end", () => end(null, { status, headers, body: Buffer.concat(chunks) }));
    stream.on("error", () => end(new Error("网络错误")));
    stream.on("close", () => end(new Error("网络错误")));
  });
};
var h1get = async (url, signal, options = {}) => {
  const target = new URL(url);
  if (target.protocol !== "https:")
    throw new Error("只支持 https");
  const stop = AbortSignal.any([signal, AbortSignal.timeout(options.timeoutMs ?? TIMEOUT_MS)]);
  const abortError = () => new Error(signal.aborted ? "已取消" : "超时");
  if (stop.aborted)
    throw abortError();
  const proxy = options.proxy === undefined ? proxyFor(target) : options.proxy;
  const maxBytes = options.maxBytes ?? MAX_BYTES;
  const port = Number(target.port || 443);
  let sock;
  try {
    const carrier = proxy ? await tunnel(new URL(proxy), target.hostname, port, stop) : await new Promise((res, rej) => {
      const s = connectTcp({ host: target.hostname, port });
      s.once("connect", () => res(s));
      s.once("error", rej);
    });
    sock = await secured(carrier, target.hostname, stop, ["http/1.1"], false);
  } catch (e) {
    throw stop.aborted ? abortError() : e;
  }
  return new Promise((resolve, reject) => {
    let settled = false;
    const end = (err, response) => {
      if (settled)
        return;
      settled = true;
      stop.removeEventListener("abort", onAbort);
      sock.destroy();
      if (response)
        resolve(response);
      else
        reject(err ?? new Error("网络错误"));
    };
    const onAbort = () => end(abortError());
    if (stop.aborted) {
      end(abortError());
      return;
    }
    stop.addEventListener("abort", onAbort);
    const path = target.pathname + target.search || "/";
    sock.on("error", () => end(new Error("网络错误")));
    const chunks = [];
    let size = 0;
    let headerEnd = -1;
    let status = 0;
    let headers = {};
    let bodyMode = "close";
    let need = 0;
    let chunkLeft = -1;
    let done = false;
    const parseHeaders = (head) => {
      const lines = head.split(`\r
`);
      status = Number(/^HTTP\/1\.[01] (\d{3})/.exec(lines[0] ?? "")?.[1] ?? 0);
      headers = {};
      for (const ln of lines.slice(1)) {
        const i = ln.indexOf(":");
        if (i > 0)
          headers[ln.slice(0, i).trim().toLowerCase()] = ln.slice(i + 1).trim();
      }
      if (/chunked/i.test(headers["transfer-encoding"] ?? ""))
        bodyMode = "chunked";
      else if (headers["content-length"] !== undefined) {
        bodyMode = "length";
        need = Number(headers["content-length"]);
      } else
        bodyMode = "close";
      if (Number(headers["content-length"]) > maxBytes)
        end(new Error("响应太大"));
    };
    const feedBody = (buf) => {
      if (bodyMode === "length" || bodyMode === "close") {
        size += buf.length;
        if (size > maxBytes) {
          end(new Error("响应太大"));
          return Buffer.alloc(0);
        }
        chunks.push(buf);
        if (bodyMode === "length" && size >= need)
          finish();
        return Buffer.alloc(0);
      }
      let rest = buf;
      while (rest.length > 0 && !done) {
        if (chunkLeft < 0) {
          const eol = rest.indexOf(`\r
`);
          if (eol < 0)
            break;
          const line = rest.subarray(0, eol).toString("latin1");
          rest = rest.subarray(eol + 2);
          chunkLeft = parseInt(line.split(";")[0].trim(), 16);
          if (Number.isNaN(chunkLeft)) {
            end(new Error("代理的回应读不懂"));
            return Buffer.alloc(0);
          }
          if (chunkLeft === 0) {
            done = true;
            finish();
            return Buffer.alloc(0);
          }
        }
        if (rest.length < chunkLeft + 2)
          break;
        const piece = rest.subarray(0, chunkLeft);
        size += piece.length;
        if (size > maxBytes) {
          end(new Error("响应太大"));
          return Buffer.alloc(0);
        }
        chunks.push(piece);
        rest = rest.subarray(chunkLeft + 2);
        chunkLeft = -1;
      }
      return rest;
    };
    let stash = Buffer.alloc(0);
    const finish = () => {
      if (settled)
        return;
      end(null, { status, headers, body: Buffer.concat(chunks) });
    };
    sock.on("data", (c) => {
      if (settled || done)
        return;
      let buf = Buffer.concat([stash, c]);
      stash = Buffer.alloc(0);
      if (headerEnd < 0) {
        const i = buf.indexOf(`\r
\r
`);
        if (i < 0) {
          if (buf.length > 64 * 1024)
            end(new Error("响应头太大"));
          else
            stash = buf;
          return;
        }
        headerEnd = i;
        parseHeaders(buf.subarray(0, i).toString("latin1"));
        if (settled)
          return;
        buf = buf.subarray(i + 4);
      }
      const leftover = feedBody(buf);
      if (leftover.length > 0)
        stash = leftover;
    });
    sock.on("end", () => {
      if (bodyMode === "close" && !settled)
        finish();
      else if (!settled)
        end(new Error("网络错误"));
    });
    sock.on("close", () => {
      if (bodyMode === "close" && !settled && headerEnd >= 0)
        finish();
    });
    sock.write(`GET ${path} HTTP/1.1\r
Host: ${target.hostname}\r
User-Agent: ${UA}\r
Accept: */*\r
Connection: close\r
\r
`);
  });
};

// src/service/main.ts
var port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
var token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? "";
if (!port || !token) {
  console.error("OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required");
  process.exit(1);
}
var FETCH_TIMEOUT_MS = 15000;
var LIST_CACHE_TTL_MS = 3 * 60 * 1000;
var BODY_MAX = 256 * 1024;
var lastStart = 0;
var pace = async () => {
  const gap = 1000 - (Date.now() - lastStart);
  if (gap > 0)
    await new Promise((r) => setTimeout(r, gap));
  lastStart = Date.now();
};
var timedFetch = async (url, proxy) => {
  await pace();
  const ctrl = new AbortController;
  const h = await h2get(url, ctrl.signal, { timeoutMs: FETCH_TIMEOUT_MS, proxy });
  const headers = new Headers(h.headers);
  const body = h.body.toString("utf8");
  return {
    status: h.status,
    ok: h.status >= 200 && h.status < 300,
    headers: { get: (n) => headers.get(n) },
    text: async () => body,
    json: async () => JSON.parse(body)
  };
};
var netError = (e) => {
  const msg = e instanceof Error ? e.message : String(e);
  if (msg === "网络错误" || msg === "超时" || msg === "连不上代理" || msg === "代理拒绝了连接（407）" || msg.startsWith("代理")) {
    return new Error(`${msg}（直连不出公网时，点面板右上⚙填 HTTP 代理，和系统代理一致）`);
  }
  return e instanceof Error ? e : new Error(msg);
};
var abs = (maybe, origin) => {
  if (!maybe)
    return null;
  try {
    return new URL(maybe, origin).toString();
  } catch {
    return null;
  }
};
var absLinks = (html, origin) => html.replace(/(href|src)="([^"]+)"/g, (_m, attr, u) => {
  if (/^(https?:|data:|blob:|#)/i.test(u))
    return `${attr}="${u}"`;
  try {
    return `${attr}="${new URL(u, origin).toString()}"`;
  } catch {
    return `${attr}="${u}"`;
  }
});
var millis = (v) => {
  const t = v ? Date.parse(v) : NaN;
  return Number.isNaN(t) ? null : t;
};
var LD = "https://linux.do";
var LD_PATHS = {
  latest: "/latest.rss",
  top: "/top.rss?period=daily",
  develop: "/c/develop/4.rss",
  gossip: "/c/gossip/11.rss",
  resource: "/c/resource/14.rss",
  welfare: "/c/welfare/36.rss",
  news: "/c/news/34.rss"
};
var cdnFix = (s) => s.replace(/https:\/\/linux\.do\/(?=(?:user_avatar|letter_avatar|images\/emoji)\/)/g, "https://cdn.ldstatic.com/");
var linuxdoList = async (channel, proxy) => {
  const path = LD_PATHS[channel];
  if (!path)
    throw new Error(`linux.do 没有这个板块：${channel}`);
  const r = await timedFetch(LD + path, proxy);
  if (r.status === 403)
    throw new Error("linux.do 暂时拦住了请求（403），过一会儿再试");
  if (r.status !== 200)
    throw new Error(`linux.do 返回了 ${r.status}`);
  const body = await r.text();
  if (!body.includes("<rss"))
    throw new Error("linux.do 返回的内容读不懂");
  const out = [];
  for (const item of parseRss(body)) {
    const id = /\/t\/(?:[^/]+\/)?(\d+)(?:[/?#]|$)/.exec(item.link ?? "")?.[1];
    if (!id || !item.link)
      continue;
    const count = /(\d+) 个帖子/.exec(item.description ?? "")?.[1];
    out.push({
      community: "linuxdo",
      id,
      title: item.title ?? "",
      author: item.creator ?? "",
      avatar: null,
      channel: item.category ?? null,
      replies: count ? Math.max(Number(count) - 1, 0) : null,
      time: millis(item.pubDate),
      url: item.link
    });
  }
  return out.slice(0, 100);
};
var linuxdoThread = async (id, page, proxy) => {
  if (!/^\d{1,12}$/.test(id))
    throw new Error("请求的参数不对（id）");
  const q = page > 1 ? `?page=${page}` : "";
  const r = await timedFetch(`${LD}/t/topic/${id}.json${q}`, proxy);
  if (r.status === 404)
    throw new Error("帖子不存在，或者需要登录才能看");
  if (r.status === 403)
    throw new Error("linux.do 暂时拦住了请求（403），出现验证时去浏览器完成验证再试");
  if (r.status !== 200)
    throw new Error(`linux.do 返回了 ${r.status}`);
  const raw = await r.json();
  const posts = raw.post_stream?.posts ?? [];
  const stream = raw.post_stream?.stream ?? [];
  const visible = posts.filter((p) => (p.post_type ?? 1) === 1 && !p.hidden && !p.deleted_at && !p.user_deleted);
  const authorId = raw.user_id ?? raw.details?.created_by?.id ?? null;
  const toPost = (p) => ({
    id: String(p.id),
    floor: p.post_number,
    author: p.username || p.name || "",
    avatar: cdnFix(abs(p.avatar_template?.replace("{size}", "96"), LD) ?? "") || null,
    html: cdnFix(absLinks(p.cooked ?? "", LD)),
    time: millis(p.created_at),
    replyTo: p.reply_to_post_number ?? null,
    likes: typeof p.reaction_users_count === "number" ? p.reaction_users_count : null,
    byAuthor: authorId !== null && p.user_id === authorId
  });
  const first = page === 1 ? visible.find((p) => p.post_number === 1) : undefined;
  const opening = first ? { ...toPost(first), byAuthor: true } : null;
  const rest = visible.filter((p) => p !== first).map(toPost);
  const lastLoaded = posts.at(-1);
  const pos = lastLoaded ? stream.indexOf(lastLoaded.id) + 1 : 0;
  const more = pos > 0 && pos < stream.length;
  return {
    topic: {
      community: "linuxdo",
      id: String(raw.id),
      title: raw.title,
      author: opening?.author || raw.details?.created_by?.username || "",
      avatar: opening?.avatar ?? null,
      channel: null,
      replies: typeof raw.posts_count === "number" ? Math.max(raw.posts_count - 1, 0) : null,
      time: millis(raw.last_posted_at) ?? millis(raw.created_at),
      url: `${LD}/t/topic/${raw.id}`
    },
    opening,
    posts: rest,
    page,
    more
  };
};
var V2 = "https://www.v2ex.com";
var v2checked = async (url, proxy, missing) => {
  const r = await timedFetch(url, proxy);
  if (r.status === 403 || r.status === 429) {
    const reset = Number(r.headers.get("x-rate-limit-reset"));
    if (Number.isFinite(reset) && reset > 0) {
      const mins = Math.max(1, Math.ceil((reset * 1000 - Date.now()) / 60000));
      throw new Error(`V2EX 的请求额度用完了，${mins} 分钟后恢复`);
    }
    throw new Error("V2EX 暂时拒绝了请求，过一会儿再试");
  }
  if (r.status === 404 && missing)
    throw new Error(missing);
  if (r.status !== 200)
    throw new Error(`V2EX 返回了 ${r.status}`);
  try {
    return await r.json();
  } catch {
    throw new Error("V2EX 返回的内容读不懂");
  }
};
var v2exList = async (channel, proxy) => {
  const path = channel === "hot" ? "/api/topics/hot.json" : channel === "latest" ? "/api/topics/latest.json" : ["programmer", "share", "create", "qna", "jobs"].includes(channel) ? `/api/topics/show.json?node_name=${channel}` : null;
  if (!path)
    throw new Error(`V2EX 没有这个板块：${channel}`);
  const data = await v2checked(V2 + path, proxy);
  if (!Array.isArray(data))
    throw new Error("V2EX 返回的内容读不懂");
  return data.filter((t) => typeof t.id === "number" && typeof t.title === "string").map((t) => ({
    community: "v2ex",
    id: String(t.id),
    title: t.title,
    author: t.member?.username ?? "",
    avatar: abs(t.member?.avatar_large ?? t.member?.avatar_normal, V2),
    channel: t.node?.title ?? null,
    replies: t.replies ?? null,
    time: typeof (t.last_touched ?? t.created) === "number" ? (t.last_touched ?? t.created ?? 0) * 1000 : null,
    url: t.url || `${V2}/t/${t.id}`
  })).slice(0, 100);
};
var v2exThread = async (id, page, proxy) => {
  if (!/^\d{1,12}$/.test(id))
    throw new Error("请求的参数不对（id）");
  const shown = await v2checked(`${V2}/api/topics/show.json?id=${id}`, proxy, "帖子不存在");
  if (!Array.isArray(shown) || shown.length === 0)
    throw new Error("帖子不存在");
  const raw = shown[0];
  const topic = {
    community: "v2ex",
    id: String(raw.id),
    title: raw.title,
    author: raw.member?.username ?? "",
    avatar: abs(raw.member?.avatar_large, V2),
    channel: raw.node?.title ?? null,
    replies: raw.replies ?? null,
    time: typeof raw.created === "number" ? raw.created * 1000 : null,
    url: `${V2}/t/${raw.id}`
  };
  if (page > 1)
    return { topic, opening: null, posts: [], page, more: false };
  const opening = {
    floor: 0,
    author: topic.author,
    avatar: topic.avatar,
    html: absLinks(raw.content_rendered ?? "", V2),
    time: topic.time,
    replyTo: null,
    likes: null,
    byAuthor: true
  };
  const replies = await v2checked(`${V2}/api/replies/show.json?topic_id=${id}`, proxy);
  const posts = (Array.isArray(replies) ? replies : []).map((rp, i) => ({
    floor: i + 1,
    author: rp.member?.username ?? "",
    avatar: abs(rp.member?.avatar_large, V2),
    html: absLinks(rp.content_rendered ?? "", V2),
    time: typeof rp.created === "number" ? rp.created * 1000 : null,
    replyTo: null,
    likes: null,
    byAuthor: rp.member?.username === topic.author
  }));
  return { topic, opening, posts, page, more: false };
};
var TOPHUB_BOARDS = {
  zhihu: { hash: "mproPpoq6O", sub: "热榜" },
  csdn: { hash: "n3moBVoN5O", sub: "热点" }
};
var HOT_IDS = ["zhihu", "toutiao", "csdn", "oschina", "infoq"];
var stripTags = (s) => s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
var tophubList = async (community, proxy) => {
  const board = TOPHUB_BOARDS[community];
  if (!board)
    throw new Error("没有这个热榜");
  let r;
  try {
    r = await timedFetch(`https://tophub.today/n/${board.hash}`, proxy);
  } catch {
    throw new Error("tophub 暂时连不上（对侧限流/拦截），过几分钟按 R 再试；V2EX / linux.do / InfoQ / 头条 / 开源中国可用");
  }
  if (r.status !== 200)
    throw new Error(`热榜返回了 ${r.status}（对侧限流时过几分钟按 R 再试）`);
  const body = await r.text();
  const rows = body.match(/<tr>[\s\S]*?<\/tr>/g) ?? [];
  const out = [];
  for (const row of rows) {
    const link = /<a\s+href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/i.exec(row);
    if (!link)
      continue;
    const href = link[1];
    if (/^https?:\/\/(www\.)?tophub\.today\//i.test(href))
      continue;
    const title = stripTags(link[2] ?? "").slice(0, 200);
    if (!title)
      continue;
    const heat = stripTags(/<td class="ws">(.*?)<\/td>/i.exec(row)?.[1] ?? /<span class="e">(.*?)<\/span>/.exec(row)?.[1] ?? "");
    out.push({
      community,
      id: String(out.length + 1),
      title,
      author: heat,
      avatar: null,
      channel: board.sub,
      replies: null,
      time: null,
      url: href
    });
    if (out.length >= 100)
      break;
  }
  if (out.length === 0)
    throw new Error("热榜返回的内容读不懂");
  return out;
};
var infoqList = async (proxy) => {
  const r = await timedFetch("https://www.infoq.cn/", proxy);
  if (r.status !== 200)
    throw new Error(`InfoQ 返回了 ${r.status}`);
  const body = await r.text();
  const re = /<a[^>]*com-article-title[^>]*href="(https:\/\/www\.infoq\.cn\/article\/[^"]+)"[^>]*>[\s\S]*?<span[^>]*>([^<]{5,150})<\/span>/g;
  const out = [];
  const seen = new Set;
  let m;
  while (m = re.exec(body)) {
    const href = m[1];
    if (seen.has(href))
      continue;
    seen.add(href);
    const title = stripTags(m[2] ?? "").slice(0, 200);
    if (!title)
      continue;
    out.push({
      community: "infoq",
      id: String(out.length + 1),
      title,
      author: "",
      avatar: null,
      channel: "推荐",
      replies: null,
      time: null,
      url: href
    });
    if (out.length >= 50)
      break;
  }
  if (out.length === 0)
    throw new Error("InfoQ 返回的内容读不懂");
  return out;
};
var formatHot = (v) => v >= 1e4 ? `${(v / 1e4).toFixed(1)}万` : String(v);
var toutiaoList = async (proxy) => {
  let r;
  try {
    r = await timedFetch("https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc", proxy);
  } catch {
    throw new Error("头条榜单暂时连不上，过几分钟按 R 再试");
  }
  if (r.status !== 200)
    throw new Error(`头条榜单返回了 ${r.status}`);
  let data;
  try {
    data = await r.json();
  } catch {
    throw new Error("头条榜单读不懂");
  }
  const items = data.data;
  if (!Array.isArray(items) || items.length === 0)
    throw new Error("头条榜单读不懂");
  return items.slice(0, 50).map((it, i) => {
    const url = typeof it.Url === "string" && it.Url.startsWith("http") ? it.Url : `https://www.toutiao.com/trending/${typeof it.ClusterIdStr === "string" ? it.ClusterIdStr : ""}/`;
    return {
      community: "toutiao",
      id: String(i + 1),
      title: typeof it.Title === "string" && it.Title ? it.Title.slice(0, 200) : `热榜 ${i + 1}`,
      author: typeof it.HotValue === "number" ? `热度 ${formatHot(it.HotValue)}` : "",
      avatar: null,
      channel: "热榜",
      replies: null,
      time: null,
      url
    };
  });
};
var oscExcerpt = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 220);
var oschinaList = async (proxy) => {
  await pace();
  const ctrl = new AbortController;
  let raw;
  try {
    const h = await h1get("https://www.oschina.net/news/rss", ctrl.signal, { timeoutMs: FETCH_TIMEOUT_MS, proxy });
    if (h.status !== 200)
      throw new Error(`开源中国返回了 ${h.status}`);
    raw = h.body.toString("utf8");
  } catch (e) {
    if (e instanceof Error && /开源中国返回/.test(e.message))
      throw e;
    throw new Error("开源中国暂时连不上，过几分钟按 R 再试");
  }
  const items = parseRss(raw);
  if (items.length === 0)
    throw new Error("开源中国返回的内容读不懂");
  return items.slice(0, 50).map((item, i) => {
    const link = typeof item.link === "string" ? item.link.replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
    const m = /\/news\/(\d+)/.exec(link);
    return {
      community: "oschina",
      id: m?.[1] ?? String(i + 1),
      title: (item.title ?? "").slice(0, 200),
      author: typeof item.creator === "string" ? item.creator : "",
      avatar: null,
      channel: "资讯",
      replies: null,
      time: millis(typeof item.pubDate === "string" ? item.pubDate : null),
      url: link || "https://www.oschina.net/news",
      excerpt: oscExcerpt(typeof item.description === "string" ? item.description : "")
    };
  }).filter((t) => t.title);
};
var hotThread = async (community, id, proxy) => {
  if (!/^\d{1,12}$/.test(id))
    throw new Error("请求的参数不对（id）");
  const topics = (await cachedList(community, "hot", proxy)).topics;
  const t = topics[Number(id) - 1];
  if (!t)
    throw new Error("帖子不存在");
  const safeUrl = t.url.replace(/&/g, "&amp;");
  const opening = {
    floor: 0,
    author: "",
    avatar: null,
    html: `<p>榜单只收录标题，<a href="${safeUrl}">在浏览器中查看原文</a></p>`,
    time: null,
    replyTo: null,
    likes: null,
    byAuthor: true
  };
  return { topic: t, opening, posts: [], page: 1, more: false };
};
var escHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var oschinaThread = async (id, proxy) => {
  const topics = (await cachedList("oschina", "hot", proxy)).topics;
  const t = topics.find((x) => x.id === id) ?? (/^\d{1,12}$/.test(id) ? topics[Number(id) - 1] : undefined);
  if (!t)
    throw new Error("帖子不存在");
  const safeUrl = t.url.replace(/&/g, "&amp;");
  const body = t.excerpt ? `<p>${escHtml(t.excerpt)}</p><p><a href="${safeUrl}">在浏览器中查看原文</a></p>` : `<p>榜单只收录标题，<a href="${safeUrl}">在浏览器中查看原文</a></p>`;
  const opening = {
    floor: 0,
    author: t.author,
    avatar: null,
    html: body,
    time: t.time,
    replyTo: null,
    likes: null,
    byAuthor: true
  };
  return { topic: t, opening, posts: [], page: 1, more: false };
};
var infoqThread = async (id, proxy) => {
  if (!/^\d{1,12}$/.test(id))
    throw new Error("请求的参数不对（id）");
  const topics = (await cachedList("infoq", "hot", proxy)).topics;
  const t = topics[Number(id) - 1];
  if (!t)
    throw new Error("帖子不存在");
  const safeUrl = t.url.replace(/&/g, "&amp;");
  const linkCard = `<p><a href="${safeUrl}">在浏览器中查看原文</a></p>`;
  let r;
  try {
    r = await timedFetch(t.url, proxy);
  } catch {
    throw new Error("InfoQ 正文连不上，按 R 重试，或点下方链接去浏览器看");
  }
  if (r.status !== 200)
    throw new Error(`InfoQ 返回了 ${r.status}`);
  const body = await r.text();
  const start = body.indexOf('<div class="ProseMirror">');
  if (start < 0) {
    const opening2 = {
      floor: 0,
      author: "",
      avatar: null,
      html: linkCard,
      time: null,
      replyTo: null,
      likes: null,
      byAuthor: true
    };
    return { topic: t, opening: opening2, posts: [], page: 1, more: false };
  }
  let k = start, depth = 0;
  while (k < body.length) {
    if (body.startsWith("<div", k)) {
      depth++;
      k = body.indexOf(">", k) + 1;
      if (k === 0)
        break;
    } else if (body.startsWith("</div>", k)) {
      depth--;
      k += 6;
      if (depth === 0)
        break;
    } else
      k++;
  }
  const inner = absLinks(body.slice(start, k), "https://www.infoq.cn");
  const opening = {
    floor: 0,
    author: "",
    avatar: null,
    html: `${inner}${linkCard}`,
    time: null,
    replyTo: null,
    likes: null,
    byAuthor: true
  };
  return { topic: t, opening, posts: [], page: 1, more: false };
};
var listCache = new Map;
var cachedList = async (community, channel, proxy) => {
  const key = `${community}/${channel}/${proxy ?? ""}`;
  const hit = listCache.get(key);
  if (hit && Date.now() - hit.at < LIST_CACHE_TTL_MS)
    return { topics: hit.topics, cached: true };
  try {
    const topics = await fetchList(community, channel, proxy);
    listCache.set(key, { at: Date.now(), topics });
    return { topics, cached: false };
  } catch (e) {
    if (hit && hit.topics.length > 0)
      return { topics: hit.topics, cached: true };
    throw e;
  }
};
var fetchList = async (community, channel, proxy) => {
  if (community === "toutiao")
    return toutiaoList(proxy);
  if (community === "oschina")
    return oschinaList(proxy);
  if (community === "infoq")
    return infoqList(proxy);
  if (community === "zhihu" || community === "csdn")
    return tophubList(community, proxy);
  if (community === "linuxdo")
    return linuxdoList(channel, proxy);
  if (community === "v2ex")
    return v2exList(channel, proxy);
  throw new Error("bad-community");
};
var proxyOf = (req, url) => {
  const header = req.headers["x-proxy"];
  const q = url.searchParams.get("proxy");
  const v = (Array.isArray(header) ? header[0] : header ?? q)?.trim();
  if (v)
    return v;
  return;
};
var json = (res, status, body) => {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
};
var readBody = (req) => new Promise((resolve) => {
  let text = "";
  req.on("data", (c) => {
    text += c.toString("utf8");
    if (text.length > BODY_MAX)
      req.destroy();
  });
  req.on("end", () => {
    if (!text)
      return resolve({});
    try {
      resolve(JSON.parse(text));
    } catch {
      resolve(null);
    }
  });
});
var server = http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`)
    return json(res, 401, { ok: false, error: "unauthorized" });
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (url.pathname === "/health")
    return json(res, 200, { ok: true });
  if (req.method === "GET" && url.pathname === "/communities")
    return json(res, 200, { ok: true, communities: COMMUNITIES });
  if (req.method === "GET" && url.pathname === "/list") {
    const community = url.searchParams.get("community");
    const channel = url.searchParams.get("channel") ?? "";
    if (!COMMUNITIES.some((c) => c.id === community))
      return json(res, 400, { ok: false, error: "bad-community" });
    const px = proxyOf(req, url) ?? undefined;
    cachedList(community, channel, px).then(({ topics, cached }) => json(res, 200, { ok: true, topics, cached }), (e) => json(res, 200, { ok: false, error: netError(e).message }));
    return;
  }
  if (req.method === "GET" && url.pathname === "/thread") {
    const community = url.searchParams.get("community");
    const id = url.searchParams.get("id") ?? "";
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1") || 1);
    const px = proxyOf(req, url) ?? undefined;
    (async () => {
      if (community === "infoq")
        return infoqThread(id, px);
      if (community === "oschina")
        return oschinaThread(id, px);
      if (HOT_IDS.includes(community))
        return hotThread(community, id, px);
      return community === "linuxdo" ? linuxdoThread(id, page, px) : v2exThread(id, page, px);
    })().then((thread) => json(res, 200, { ok: true, thread }), (e) => json(res, 200, { ok: false, error: netError(e).message }));
    return;
  }
  if (req.method === "GET" && url.pathname === "/image") {
    const src = url.searchParams.get("url") ?? "";
    let u;
    try {
      u = new URL(src);
    } catch {
      return json(res, 400, { ok: false, error: "bad-url" });
    }
    const allowed = /^(linux\.do|cdn\.ldstatic\.com|.*\.v2ex\.com|v2ex\.com|.*\.infoq\.cn|static001\.geekbang\.org)$/.test(u.hostname);
    if (u.protocol !== "https:" || !allowed)
      return json(res, 400, { ok: false, error: "bad-host" });
    (async () => {
      await pace();
      const ctrl = new AbortController;
      const px = proxyOf(req, url) ?? undefined;
      try {
        const h = await h2get(u.toString(), ctrl.signal, { timeoutMs: FETCH_TIMEOUT_MS, proxy: px, maxBytes: 4 * 1024 * 1024 });
        const ct = h.headers["content-type"] ?? "image/*";
        if (!ct.startsWith("image/"))
          return json(res, 200, { ok: false, error: "not-image" });
        res.writeHead(200, { "Content-Type": ct, "Cache-Control": "public, max-age=3600" });
        res.end(h.body);
      } catch (e) {
        json(res, 200, { ok: false, error: netError(e).message });
      }
    })();
    return;
  }
  if (req.method === "POST" && ["/session", "/reply", "/like", "/upload", "/notifications"].includes(url.pathname)) {
    readBody(req).then(() => {
      if (url.pathname === "/session")
        return json(res, 200, { ok: true, account: null });
      if (url.pathname === "/notifications")
        return json(res, 200, { ok: false, error: "登录后可看通知（MVP 未接登录）" });
      return json(res, 200, { ok: false, error: "匿名不能操作，登录后可用（MVP 未接登录）" });
    });
    return;
  }
  return json(res, 404, { ok: false, error: "not-found" });
});
server.listen(port, "127.0.0.1");
