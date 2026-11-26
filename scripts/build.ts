// 构建：本目录即为可安装扩展（panel + service 直出，无需打包）。
// OpenChamber 装扩展不构建，所以 panel/main.js、service/main.js 必须提交。
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url)) + '/..';
const R = (p: string): string => resolve(root, p);

await mkdir(R('panel'), { recursive: true });
await mkdir(R('service'), { recursive: true });

const panelHtml = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>阅读</title>
<link rel="stylesheet" href="app.css">
<script src="main.js" defer></script>
</head><body><div id="app"></div></body></html>`;
await writeFile(R('panel/index.html'), panelHtml);

const panel = await Bun.build({
  entrypoints: [R('src/panel/main.ts')], format: 'iife', target: 'browser', minify: true,
});
if (!panel.success) { console.error(panel.logs.map((l) => l.message).join('\n')); process.exit(1); }
await writeFile(R('panel/main.js'), await panel.outputs[0]!.text());
await writeFile(R('panel/app.css'), '/* host theme via applyHostReady; no hardcoded colors */\n');

const service = await Bun.build({ entrypoints: [R('src/service/main.ts')], format: 'esm', target: 'node', minify: false });
if (!service.success) { console.error(service.logs.map((l) => l.message).join('\n')); process.exit(1); }
await writeFile(R('service/main.js'), await service.outputs[0]!.text());
console.log('build ok');
