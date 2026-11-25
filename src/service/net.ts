// moyu http2 直搬（简化）：linux.do 的 Cloudflare 拦 HTTP/1.1，放行 HTTP/2。
// service 常驻进程，proxy settings 缓存一次；Linux 只读 env（mac/win 读系统部分省略，直连为主）。
import { connect } from 'node:http2';
import type { ClientHttp2Session, IncomingHttpHeaders } from 'node:http2';
import type { Socket } from 'node:net';
import { connect as connectTcp } from 'node:net';
import { connect as connectTls } from 'node:tls';

export type HttpResponse = { status: number; headers: Record<string, string>; body: Buffer };

const TIMEOUT_MS = 15_000;
const MAX_BYTES = 4 * 1024 * 1024;
const UA = 'openchamber-moyu/0.1.0 (+https://github.com/flyhero/antumi-moyu)';

// ---- proxy（env 优先） ----
const proxyAddress = (v: string | undefined): string | null => {
  const t = v?.trim();
  if (!t) return null;
  const addr = /^[a-z][a-z0-9+.-]*:\/\//i.test(t) ? t : `http://${t}`;
  try {
    const u = new URL(addr);
    return (u.protocol === 'http:' || u.protocol === 'https:') && u.hostname ? u.href : null;
  } catch { return null; }
};
const envProxy = (): { https: string | null; bypass: string[] } | null => {
  const e = process.env;
  const named = e.HTTPS_PROXY ?? e.https_proxy ?? e.ALL_PROXY ?? e.all_proxy ?? e.HTTP_PROXY ?? e.http_proxy;
  if (!named) return null;
  const bypass = (e.NO_PROXY ?? e.no_proxy ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  return { https: proxyAddress(named), bypass };
};
const bypassed = (host: string, bypass: string[]): boolean => {
  const n = host.toLowerCase();
  if (n === 'localhost' || n.endsWith('.localhost') || /^127\./.test(n)) return true;
  return bypass.some((p) => {
    const pat = p.toLowerCase();
    if (pat === '*') return true;
    const bare = pat.replace(/^\./, '');
    return n === bare || n.endsWith(`.${bare}`);
  });
};
const proxyFor = (url: URL): string | null => {
  if (url.protocol !== 'https:') return null;
  const s = envProxy();
  if (!s) return null;
  return bypassed(url.hostname, s.bypass) ? null : s.https;
};

// ---- tunnel ----
const tunnel = (proxy: URL, host: string, port: number, signal: AbortSignal): Promise<Socket> =>
  new Promise<Socket>((resolve, reject) => {
    const socket = proxy.protocol === 'https:'
      ? connectTls({ host: proxy.hostname, port: Number(proxy.port || 443), servername: proxy.hostname })
      : connectTcp({ host: proxy.hostname, port: Number(proxy.port || 80) });
    let reply = Buffer.alloc(0);
    let settled = false;
    const end = (err: Error | null): void => {
      if (settled) return;
      settled = true;
      signal.removeEventListener('abort', onAbort);
      socket.off('data', onData); socket.off('error', onError); socket.off('close', onClose);
      if (err) { socket.destroy(); reject(err); } else resolve(socket);
    };
    const onAbort = (): void => end(new Error('已取消'));
    const onError = (): void => end(new Error('连不上代理'));
    const onClose = (): void => end(new Error('代理断开了连接'));
    const onData = (chunk: Buffer): void => {
      reply = Buffer.concat([reply, chunk]);
      const head = reply.indexOf('\r\n\r\n');
      if (head < 0) { if (reply.length > 16 * 1024) end(new Error('代理的回应读不懂')); return; }
      const status = /^HTTP\/1\.[01] (\d{3})/.exec(reply.subarray(0, head).toString('latin1'))?.[1];
      if (status !== '200') { end(new Error(status === '407' ? '代理需要登录' : status ? `代理拒绝了连接（${status}）` : '代理的回应读不懂')); return; }
      const rest = reply.subarray(head + 4);
      socket.pause();
      if (rest.length > 0) socket.unshift(rest);
      end(null);
    };
    if (signal.aborted) { end(new Error('已取消')); return; }
    signal.addEventListener('abort', onAbort);
    socket.on('error', () => {});
    socket.on('error', onError);
    socket.on('close', onClose);
    socket.on('data', onData);
    socket.once(proxy.protocol === 'https:' ? 'secureConnect' : 'connect', () => {
      const authority = `${host}:${port}`;
      const login = proxy.username ? `Proxy-Authorization: Basic ${Buffer.from(`${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`).toString('base64')}\r\n` : '';
      socket.write(`CONNECT ${authority} HTTP/1.1\r\nHost: ${authority}\r\n${login}\r\n`);
    });
  });

const secured = (socket: Socket, host: string, signal: AbortSignal, alpn: string[] = ['h2'], requireH2 = true): Promise<Socket> =>
  new Promise<Socket>((resolve, reject) => {
    const tls = connectTls({ socket, servername: host, ALPNProtocols: alpn });
    let settled = false;
    const end = (err: Error | null): void => {
      if (settled) return;
      settled = true;
      signal.removeEventListener('abort', onAbort);
      tls.off('error', onError);
      if (err) { tls.destroy(); reject(err); } else resolve(tls);
    };
    const onAbort = (): void => end(new Error('已取消'));
    const onError = (): void => end(new Error('网络错误'));
    if (signal.aborted) { end(new Error('已取消')); return; }
    signal.addEventListener('abort', onAbort);
    tls.on('error', onError);
    tls.once('secureConnect', () => end(requireH2 && tls.alpnProtocol !== 'h2' ? new Error('对方不支持 HTTP/2') : null));
  });

const plainHeaders = (headers: IncomingHttpHeaders): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [name, value] of Object.entries(headers)) {
    if (name.startsWith(':') || value === undefined) continue;
    out[name] = Array.isArray(value) ? value.join(', ') : value;
  }
  return out;
};

export type H2Options = { timeoutMs?: number; proxy?: string | null; maxBytes?: number };
export const h2get = async (url: string, signal: AbortSignal, options: H2Options = {}): Promise<HttpResponse> => {
  const target = new URL(url);
  const stop = AbortSignal.any([signal, AbortSignal.timeout(options.timeoutMs ?? TIMEOUT_MS)]);
  const abortError = (): Error => new Error(signal.aborted ? '已取消' : '超时');
  if (stop.aborted) throw abortError();
  const proxy = options.proxy === undefined ? proxyFor(target) : options.proxy;
  const maxBytes = options.maxBytes ?? MAX_BYTES;
  let carrier: Socket | undefined;
  if (proxy) {
    try {
      const sock = await tunnel(new URL(proxy), target.hostname, Number(target.port || 443), stop);
      carrier = await secured(sock, target.hostname, stop);
    } catch (e) { throw stop.aborted ? abortError() : e; }
  }
  return new Promise<HttpResponse>((resolve, reject) => {
    if (stop.aborted) { carrier?.destroy(); reject(abortError()); return; }
    let session: ClientHttp2Session | undefined;
    let settled = false;
    const onAbort = (): void => end(abortError());
    const end = (err: Error | null, response?: HttpResponse): void => {
      if (settled) return;
      settled = true;
      stop.removeEventListener('abort', onAbort);
      session?.destroy();
      if (response) resolve(response);
      else reject(err ?? new Error('网络错误'));
    };
    stop.addEventListener('abort', onAbort);
    session = carrier ? connect(target.origin, { createConnection: () => carrier }) : connect(target.origin);
    session.on('error', () => end(new Error('网络错误')));
    const stream = session.request({ ':method': 'GET', ':path': target.pathname + target.search, 'user-agent': UA, accept: '*/*' }, { endStream: true });
    let status = 0;
    let headers: Record<string, string> = {};
    const chunks: Buffer[] = [];
    let size = 0;
    stream.on('response', (received) => {
      status = Number(received[':status']);
      headers = plainHeaders(received);
      if (Number(headers['content-length']) > maxBytes) end(new Error('响应太大'));
    });
    stream.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > maxBytes) end(new Error('响应太大'));
      else chunks.push(chunk);
    });
    stream.on('end', () => end(null, { status, headers, body: Buffer.concat(chunks) }));
    stream.on('error', () => end(new Error('网络错误')));
    stream.on('close', () => end(new Error('网络错误')));
  });
};

// ---- HTTP/1.1（给不支持 h2 的站：oschina 等。复用 CONNECT 隧道 + TLS，只是不协商 h2） ----
export const h1get = async (url: string, signal: AbortSignal, options: H2Options = {}): Promise<HttpResponse> => {
  const target = new URL(url);
  if (target.protocol !== 'https:') throw new Error('只支持 https');
  const stop = AbortSignal.any([signal, AbortSignal.timeout(options.timeoutMs ?? TIMEOUT_MS)]);
  const abortError = (): Error => new Error(signal.aborted ? '已取消' : '超时');
  if (stop.aborted) throw abortError();
  const proxy = options.proxy === undefined ? proxyFor(target) : options.proxy;
  const maxBytes = options.maxBytes ?? MAX_BYTES;
  const port = Number(target.port || 443);
  let sock: Socket;
  try {
    const carrier = proxy ? await tunnel(new URL(proxy), target.hostname, port, stop) : await new Promise<Socket>((res, rej) => {
      const s = connectTcp({ host: target.hostname, port });
      s.once('connect', () => res(s));
      s.once('error', rej);
    });
    sock = await secured(carrier, target.hostname, stop, ['http/1.1'], false);
  } catch (e) { throw stop.aborted ? abortError() : e; }
  return new Promise<HttpResponse>((resolve, reject) => {
    let settled = false;
    const end = (err: Error | null, response?: HttpResponse): void => {
      if (settled) return;
      settled = true;
      stop.removeEventListener('abort', onAbort);
      sock.destroy();
      if (response) resolve(response);
      else reject(err ?? new Error('网络错误'));
    };
    const onAbort = (): void => end(abortError());
    if (stop.aborted) { end(abortError()); return; }
    stop.addEventListener('abort', onAbort);
    const path = (target.pathname + target.search) || '/';
    sock.on('error', () => end(new Error('网络错误')));
    const chunks: Buffer[] = [];
    let size = 0;
    let headerEnd = -1;
    let status = 0;
    let headers: Record<string, string> = {};
    let bodyMode: 'length' | 'chunked' | 'close' = 'close';
    let need = 0;
    // chunked 解析状态
    let chunkLeft = -1;
    let done = false;
    const parseHeaders = (head: string): void => {
      const lines = head.split('\r\n');
      status = Number(/^HTTP\/1\.[01] (\d{3})/.exec(lines[0] ?? '')?.[1] ?? 0);
      headers = {};
      for (const ln of lines.slice(1)) {
        const i = ln.indexOf(':');
        if (i > 0) headers[ln.slice(0, i).trim().toLowerCase()] = ln.slice(i + 1).trim();
      }
      if (/chunked/i.test(headers['transfer-encoding'] ?? '')) bodyMode = 'chunked';
      else if (headers['content-length'] !== undefined) { bodyMode = 'length'; need = Number(headers['content-length']); }
      else bodyMode = 'close';
      if (Number(headers['content-length']) > maxBytes) end(new Error('响应太大'));
    };
    const feedBody = (buf: Buffer): Buffer => {
      // 返回消费后剩余（chunked 行尾），length/close 模式直接全收
      if (bodyMode === 'length' || bodyMode === 'close') {
        size += buf.length;
        if (size > maxBytes) { end(new Error('响应太大')); return Buffer.alloc(0); }
        chunks.push(buf);
        if (bodyMode === 'length' && size >= need) finish();
        return Buffer.alloc(0);
      }
      // chunked
      let rest = buf;
      while (rest.length > 0 && !done) {
        if (chunkLeft < 0) {
          const eol = rest.indexOf('\r\n');
          if (eol < 0) break; // 等更多数据（行不全；极简处理：缓存等下次）
          const line = rest.subarray(0, eol).toString('latin1');
          rest = rest.subarray(eol + 2);
          chunkLeft = parseInt(line.split(';')[0]!.trim(), 16);
          if (Number.isNaN(chunkLeft)) { end(new Error('代理的回应读不懂')); return Buffer.alloc(0); }
          if (chunkLeft === 0) { done = true; finish(); return Buffer.alloc(0); }
        }
        if (rest.length < chunkLeft + 2) break; // 等更多数据
        const piece = rest.subarray(0, chunkLeft);
        size += piece.length;
        if (size > maxBytes) { end(new Error('响应太大')); return Buffer.alloc(0); }
        chunks.push(piece);
        rest = rest.subarray(chunkLeft + 2);
        chunkLeft = -1;
      }
      return rest;
    };
    let stash: Buffer<ArrayBufferLike> = Buffer.alloc(0);
    const finish = (): void => {
      if (settled) return;
      end(null, { status, headers, body: Buffer.concat(chunks) });
    };
    sock.on('data', (c: Buffer) => {
      if (settled || done) return;
      let buf = Buffer.concat([stash, c]);
      stash = Buffer.alloc(0);
      if (headerEnd < 0) {
        const i = buf.indexOf('\r\n\r\n');
        if (i < 0) {
          if (buf.length > 64 * 1024) end(new Error('响应头太大'));
          else stash = buf;
          return;
        }
        headerEnd = i;
        parseHeaders(buf.subarray(0, i).toString('latin1'));
        if (settled) return;
        buf = buf.subarray(i + 4);
      }
      const leftover = feedBody(buf);
      if (leftover.length > 0) stash = leftover;
    });
    sock.on('end', () => { if (bodyMode === 'close' && !settled) finish(); else if (!settled) end(new Error('网络错误')); });
    sock.on('close', () => { if (bodyMode === 'close' && !settled && (headerEnd >= 0)) finish(); });
    sock.write(
      `GET ${path} HTTP/1.1\r\nHost: ${target.hostname}\r\nUser-Agent: ${UA}\r\nAccept: */*\r\nConnection: close\r\n\r\n`,
    );
  });
};
