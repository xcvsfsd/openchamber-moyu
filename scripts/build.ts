// 构建：两个可安装扩展（extensions/linuxdo、extensions/v2ex），共用 service + panel 源码。
// 面板按 meta moyu-community 烘焙社区；service 同一份，按 ?community= 区分。
// OpenChamber 装扩展不构建，所以 extensions/*/panel/main.js、service/main.js 必须提交。
import { mkdir, copyFile, writeFile, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url)) + '/..';
const R = (p: string): string => resolve(root, p);

const targets = [
  { community: 'linuxdo', dir: 'extensions/linuxdo', name: '阅读 L', icon: 'assets/l.svg', id: 'moyu-linuxdo' },
  { community: 'v2ex', dir: 'extensions/v2ex', name: '阅读 V', icon: 'assets/v.svg', id: 'moyu-v2ex' },
] as const;

for (const t of targets) {
  await mkdir(R(`${t.dir}/panel`), { recursive: true });
  await mkdir(R(`${t.dir}/service`), { recursive: true });
  await mkdir(R(`${t.dir}/assets`), { recursive: true });
  try { await copyFile(R(t.icon), R(`${t.dir}/${t.icon}`)); } catch { /* 图标缺失先占位 */ }

  const panelHtml = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="moyu-community" content="${t.community}">
<title>${t.name}</title>
<link rel="stylesheet" href="app.css">
<script src="main.js" defer></script>
</head><body><div id="app"></div></body></html>`;
  await writeFile(R(`${t.dir}/panel/index.html`), panelHtml);

  const manifest = {
    name: `openchamber-${t.id}`,
    version: JSON.parse(await readFile(R('package.json'), 'utf8')).version,
    description: t.community === 'linuxdo' ? 'linux.do 摸鱼阅读：话题=会话的假聊天页（匿名可读）' : 'V2EX 摸鱼阅读：话题=会话的假聊天页（匿名可读）',
    private: true, type: 'module', license: 'Apache-2.0',
    openchamber: {
      apiVersion: 1, engines: { openchamber: '>=2.7.2' },
      contributes: {
        panel: { id: t.id, name: t.name, icon: t.icon, entry: 'panel/index.html' },
        page: true,
        // 远程头像/表情直连需要宿主放行（service 代理优先，直连兜底）
        origins: ['https://linux.do', 'https://cdn.ldstatic.com', 'https://www.v2ex.com', 'https://cdn.v2ex.com'],
        // sessions：在会话中打开话题（左侧原生聊天）
        capabilities: ['sessions'],
        service: { entry: 'service/main.js', runtime: 'host' },
      },
    },
  };
  await writeFile(R(`${t.dir}/package.json`), JSON.stringify(manifest, null, 2) + '\n');

  const panel = await Bun.build({
    entrypoints: [R('src/panel/main.ts')], format: 'iife', target: 'browser', minify: true,
    define: { 'process.env.MOYU_COMMUNITY': JSON.stringify(t.community) },
  });
  if (!panel.success) { console.error(panel.logs.map((l) => l.message).join('\n')); process.exit(1); }
  await writeFile(R(`${t.dir}/panel/main.js`), await panel.outputs[0]!.text());
  await writeFile(R(`${t.dir}/panel/app.css`), '/* host theme via applyHostReady; no hardcoded colors */\n');

  const service = await Bun.build({ entrypoints: [R('src/service/main.ts')], format: 'esm', target: 'node', minify: false });
  if (!service.success) { console.error(service.logs.map((l) => l.message).join('\n')); process.exit(1); }
  await writeFile(R(`${t.dir}/service/main.js`), await service.outputs[0]!.text());
  console.log(`${t.dir} ok`);
}
