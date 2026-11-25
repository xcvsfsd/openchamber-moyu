// moyu http2 直搬（简化）：linux.do 的 Cloudflare 拦 HTTP/1.1，放行 HTTP/2。
// service 常驻进程，proxy settings 缓存一次；Linux 只读 env（mac/win 读系统部分省略，直连为主）。
import { connect } from 'node:http2';
import type { ClientHttp2Session, IncomingHttpHeaders } from 'node:http2';
import type { Socket } from 'node:net';
import { connect as connectTcp } from 'node:net';
import { connect as connectTls } from 'node:tls';

export type HttpResponse = { status: number; headers: Record<string, string>; body: string };

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

const secured = (socket: Socket, host: string, signal: AbortSignal): Promise<Socket> =>
  new Promise<Socket>((resolve, reject) => {
    const tls = connectTls({ socket, servername: host, ALPNProtocols: ['h2'] });
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
    tls.once('secureConnect', () => end(tls.alpnProtocol === 'h2' ? null : new Error('对方不支持 HTTP/2')));
  });

const plainHeaders = (headers: IncomingHttpHeaders): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [name, value] of Object.entries(headers)) {
    if (name.startsWith(':') || value === undefined) continue;
    out[name] = Array.isArray(value) ? value.join(', ') : value;
  }
  return out;
};

export const h2get = async (url: string, signal: AbortSignal, timeoutMs = TIMEOUT_MS): Promise<HttpResponse> => {
  const target = new URL(url);
  const stop = AbortSignal.any([signal, AbortSignal.timeout(timeoutMs)]);
  const abortError = (): Error => new Error(signal.aborted ? '已取消' : '超时');
  if (stop.aborted) throw abortError();
  const proxy = proxyFor(target);
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
      if (Number(headers['content-length']) > MAX_BYTES) end(new Error('响应太大'));
    });
    stream.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BYTES) end(new Error('响应太大'));
      else chunks.push(chunk);
    });
    stream.on('end', () => end(null, { status, headers, body: Buffer.concat(chunks).toString('utf8') }));
    stream.on('error', () => end(new Error('网络错误')));
    stream.on('close', () => end(new Error('网络错误')));
  });
};
