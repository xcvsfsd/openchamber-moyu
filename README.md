# openchamber-moyu

一个 OpenChamber 扩展：在 OpenChamber 里看 linux.do / V2EX（面板内切换社区），界面和 AI 聊天页一样。 port 自 [flyhero/antumi-moyu](https://github.com/flyhero/antumi-moyu)，设计思路照抄 moyu，**不套禅道面板那套**。

- 话题列表是「会话」，楼主是用户消息，回帖是助手回答——全是假聊天，画在全屏 page 里，不碰真会话。
- 单包双社区：`extensions/moyu`（侧栏“阅读”），面板内 社区 区切换 linux.do / V2EX，偏好按社区分别记住（默认 V2EX）。
- 匿名可读；登录/回复/点赞/通知先占位（service 按 moyu 语气回 need-login），正文链路已通。

## 安装

OpenChamber → 设置 → 扩展 → 粘贴本地路径安装（改完 `bun run build` 即生效）：

```text
/home/liaoz/code/openchamber-moyu/extensions/moyu
```

批准 `service` 能力，点 rail 图标或 Extension pages 进全屏。

## 用法（对齐 moyu）

- 顶部选频道，列表 3 分钟缓存，到期回页自动刷，`r` 手动刷。
- 点话题看帖（楼主=用户消息，回帖=助手消息），底部「加载更多」翻页。
- 输入框只存草稿（按社区+帖子保留），匿名点发送提示登录不发出，不自动重发。
- 三开关：流式输出 / 图片折叠（点开经 service 代理加载） / 头像伪装（本地 Agent 标志）。
- 快捷键（输入框里不触发）：`j/k` 上下帖，`n` 下一页，`r` 刷新，`o` 浏览器打开，`q` 离开，双 Esc 离开。
- 帖子右上 ↗ 在系统浏览器打开，🔔 通知 MVP 提示登录。

## 设计对照（moyu → 本仓库）

| moyu | 这里 |
|---|---|
| `contributes.pages[].entry` | `panel.entry + page:true`（Extension pages 全屏） |
| 每次调用起 Node 进程 | service 常驻 host 进程，`POST/GET /list /thread /image` 无状态 handler，内存只留列表缓存 |
| `browserSites/context.browser` 隔离登录 | 无对等物：MVP 只做匿名，登录改 `openUrl(登录页)+service 轮询 /session`（待接），Cookie 永不进 page/storage |
| HTTP/2（Cloudflare 放行）+ CONNECT 隧道 + env 优先代理 + 1 秒队列 | `src/service/net.ts` 原样搬（Linux 只读 env），失败不自动重试，文案照 moyu |
| page state 32KiB 单 writer | `host.storage` instance（草稿/位置）+ device（偏好），淘汰只丢旧阅读记录 |
| DOMPurify 洗论坛 HTML，链接走 host | 同样，图片走 `/image` 代理转，CDN 头像做 `cdn.ldstatic.com` 改写 |

## 开发

```bash
bun install
bun run build      # tsc 隐含在 typecheck；输出 extensions/*/panel/main.js + service/main.js（必须提交）
bunx tsc --noEmit  # 只检查
```

service 烟测：

```bash
OPENCHAMBER_SERVICE_PORT=18731 OPENCHAMBER_SERVICE_TOKEN=t bun run extensions/v2ex/service/main.js &
curl -H "Authorization: Bearer t" "http://127.0.0.1:18731/list?community=v2ex&channel=hot" | head -c 300
```

## 限制（和 moyu 一致）

- linux.do 限流/验证时按 moyu 文案提示，去浏览器完成验证再刷；V2EX 额度 600/小时用完按 `x-rate-limit-reset` 提示分钟数。
- 图片默认折叠，论坛能看到 service 的 IP，和浏览器看帖一样。
- 写操作（回复/点赞/通知）MVP 未接登录，一律回「登录后可用」，草稿保留。

## License

Apache-2.0（moyu 同协议）
