// 构建：单个可安装扩展 extensions/moyu（双社区一体，面板内切换）。
// service 按 ?community= 区分论坛；面板 community 存 storage，默认 v2ex。
// OpenChamber 装扩展不构建，所以 extensions/moyu/panel/main.js、service/main.js 必须提交。
import { mkdir, copyFile, writeFile, readFile, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url)) + '/..';
const R = (p: string): string => resolve(root, p);

const dir = 'extensions/moyu';
const id = 'moyu-reader';

await mkdir(R(`${dir}/panel`), { recursive: true });
await mkdir(R(`${dir}/service`), { recursive: true });
await mkdir(R(`${dir}/assets`), { recursive: true });
try { await copyFile(R('assets/v.svg'), R(`${dir}/assets/icon.svg`)); } catch { /* 图标缺失先占位 */ }

const panelHtml = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>阅读</title>
<link rel="stylesheet" href="app.css">
<script src="main.js" defer></script>
</head><body><div id="app"></div></body></html>`;
await writeFile(R(`${dir}/panel/index.html`), panelHtml);

const manifest = {
  name: 'openchamber-moyu',
  version: JSON.parse(await readFile(R('package.json'), 'utf8')).version,
  description: '摸鱼阅读：linux.do + V2EX，话题=会话的假聊天页（匿名可读）',
  private: true, type: 'module', license: 'Apache-2.0',
  openchamber: {
    apiVersion: 1, engines: { openchamber: '>=2.7.2' },
    contributes: {
      panel: { id, name: '阅读', icon: 'assets/icon.svg', entry: 'panel/index.html' },
      // 无 page：只在右侧 rail 用，左侧边栏不再建入口
      // 远程头像/表情直连需要宿主放行（service 代理优先，直连兜底）
      origins: ['https://linux.do', 'https://cdn.ldstatic.com', 'https://www.v2ex.com', 'https://cdn.v2ex.com'],
      // sessions：在会话中打开话题（左侧原生聊天）
      capabilities: ['sessions'],
      service: { entry: 'service/main.js', runtime: 'host' },
    },
  },
};
await writeFile(R(`${dir}/package.json`), JSON.stringify(manifest, null, 2) + '\n');

const panel = await Bun.build({
  entrypoints: [R('src/panel/main.ts')], format: 'iife', target: 'browser', minify: true,
});
if (!panel.success) { console.error(panel.logs.map((l) => l.message).join('\n')); process.exit(1); }
await writeFile(R(`${dir}/panel/main.js`), await panel.outputs[0]!.text());
await writeFile(R(`${dir}/panel/app.css`), '/* host theme via applyHostReady; no hardcoded colors */\n');

const service = await Bun.build({ entrypoints: [R('src/service/main.ts')], format: 'esm', target: 'node', minify: false });
if (!service.success) { console.error(service.logs.map((l) => l.message).join('\n')); process.exit(1); }
await writeFile(R(`${dir}/service/main.js`), await service.outputs[0]!.text());
console.log(`${dir} ok`);

// 旧的分包产物不再构建（删掉，避免装错）
await rm(R('extensions/linuxdo'), { recursive: true, force: true });
await rm(R('extensions/v2ex'), { recursive: true, force: true });
