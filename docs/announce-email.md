# 给 OpenChamber 官方的介绍邮件（草稿）

> 用途：告知官方有这样一个第三方扩展。OpenChamber 没有公开的插件收录邮箱，收件地址请按你手上的渠道填写；如果在 GitHub 上联系，把这封正文直接贴进 Discussion / Issue 也可以。

**To:** （填 OpenChamber 官方联系邮箱）
**Subject:** New third-party extension: 阅读 / moyu-reader — 18-source feed reader with AI summaries

---

Hi OpenChamber team,

I built a third-party OpenChamber extension and wanted to share it with you.

**阅读 (moyu-reader) — https://github.com/xcvsfsd/openchamber-moyu**

It turns OpenChamber's right rail into a single tech/news feed: 18 sources (V2EX, linux.do, Juejin, IT Home, Toutiao, OSChina, Solidot, InfoQ, domestic news, Weibo, Douyin and more) are merged into one list, deduplicated across sources, and organized by a small model into 15 categories.

Highlights:

- Unified feed instead of per-community browsing; unread-first ordering, read state persisted
- AI categorization in batches through the host Small Model (`model` capability)
- On-demand per-article summaries (`✦`): full-text for sources we can read, web-search grounded summaries for sources whose article pages are JS-only
- Send a summary to the current session (`➤`, `prompt` capability) to keep discussing it with the agent
- Everything cached locally: entering the panel makes no network requests; refresh is manual; AI results and read state survive restarts with a 7-day TTL
- Proxy configurable in-panel, because the host strips env vars when starting the service

Screenshots are at the top of the README: https://github.com/xcvsfsd/openchamber-moyu

Install (Settings → Extensions):

```
https://github.com/xcvsfsd/openchamber-moyu
```

It is a single-package extension: `panel/` and `service/` at the repository root, `runtime: "host"` for the service, capabilities `service`, `model`, `prompt`. MIT/Apache-2.0-style licensing is in the repository.

No action needed — just letting you know it exists in case it is useful to list or reference. Happy to adjust anything (manifest, naming, docs) if you have extension guidelines.

Thanks for OpenChamber.

Best regards,
（你的署名 / 邮箱）

---

## 中文版（如需）

**主题：** 第三方扩展：阅读 / moyu-reader —— 聚合 18 个信息源并带 AI 总结

你好，

我做了一个 OpenChamber 第三方扩展，想同步给你们。

**阅读（moyu-reader）— https://github.com/xcvsfsd/openchamber-moyu**

它把右侧 rail 变成一个信息流：V2EX、linux.do、掘金、IT 之家、今日头条、开源中国、Solidot、InfoQ、国内新闻、微博、抖音等 18 个来源合并成一个列表，跨源去重，并用小模型分成 15 类。

主要功能：

- 未读优先、已读状态持久化
- 通过宿主小模型批量分类（`model` 能力）
- 按需单篇总结（`✦`）：能读正文的抓正文，正文是 JS 空壳的用联网搜索兜底
- 总结可一键发送到当前会话（`➤`，`prompt` 能力）继续讨论
- 全部本地缓存：进面板不联网、刷新手动、AI 结果与已读状态重启保留（7 天 TTL）
- 面板内可配代理（宿主启动 service 会清掉环境变量）

安装：设置 → 扩展，填 `https://github.com/xcvsfsd/openchamber-moyu`

无需你们做什么，只是告知一下；如果有扩展规范需要调整（manifest、命名、文档），我很乐意改。

谢谢。
