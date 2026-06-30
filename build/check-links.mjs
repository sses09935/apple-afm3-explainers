// check-links.mjs — 連結檢查。
//   node build/check-links.mjs              內部連結/圖檔存在性（離線，硬性）
//   node build/check-links.mjs --external   另抽查外部 URL 可達性（需網路；非 2xx/3xx → WARN）
//   加 --strict 讓外部失敗也視為 FAIL。
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXTERNAL = process.argv.includes('--external');
const STRICT = process.argv.includes('--strict');
const fails = [], warns = [];

// 收集所有 .md（排除 node_modules、build/.cache、dist/web）
function mdFiles(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    if (['node_modules', '.git'].includes(e)) continue;
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (p.includes(join('build', '.cache')) || p.includes(join('dist', 'web'))) continue;
      mdFiles(p, acc);
    } else if (e.endsWith('.md')) acc.push(p);
  }
  return acc;
}

const files = mdFiles(repoRoot);
const externalUrls = new Set();
let internalChecked = 0;

const LINK_RE = /(!?)\[[^\]]*\]\(([^)]+)\)/g;        // [text](href) / ![alt](href)
const URL_RE = /https?:\/\/[^\s`)>\]]+/g;            // bare URLs (含 backtick 內)

for (const f of files) {
  const txt = readFileSync(f, 'utf8');
  const fileDir = dirname(f);

  // markdown links / images
  for (const m of txt.matchAll(LINK_RE)) {
    let href = m[2].trim();
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) continue;
    if (/^https?:\/\//.test(href)) { externalUrls.add(href.replace(/[).,]+$/, '')); continue; }
    // 內部：去掉 #fragment 與 :line
    const path = href.split('#')[0].replace(/:\d+$/, '');
    if (!path) continue;
    internalChecked++;
    const tryFile = resolve(fileDir, path);     // 相對檔案
    const tryRoot = join(repoRoot, path);        // 相對 repo 根（圖檔慣例）
    if (!existsSync(tryFile) && !existsSync(tryRoot)) {
      fails.push(`${rel(f)} → 內部連結不存在：${href}`);
    }
  }

  // bare external URLs（含 source-index 的 backtick URL）
  for (const m of txt.matchAll(URL_RE)) externalUrls.add(m[0].replace(/[).,]+$/, ''));
}

console.log(`掃描 ${files.length} 個 .md；內部連結 ${internalChecked} 個；外部 URL ${externalUrls.size} 個。`);

if (EXTERNAL) {
  console.log('\n抽查外部 URL 可達性…');
  for (const url of [...externalUrls].sort()) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 15000);
      let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal,
        headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.status === 405 || res.status === 403) // 某些站 HEAD 不支援 → 改 GET
        res = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': 'Mozilla/5.0' } });
      clearTimeout(t);
      const ok = res.status >= 200 && res.status < 400;
      console.log(`  ${ok ? '✓' : '✗'} ${res.status}  ${url}`);
      if (!ok) (STRICT ? fails : warns).push(`外部 URL ${res.status}：${url}`);
    } catch (e) {
      console.log(`  ✗ ERR  ${url}  (${e.name})`);
      (STRICT ? fails : warns).push(`外部 URL 無法連線：${url}`);
    }
  }
} else {
  console.log('（外部 URL 未抽查；加 --external 啟用。）');
}

if (warns.length) { console.log(`\nWARN（${warns.length}）：`); warns.forEach(w => console.log('  ⚠ ' + w)); }
if (fails.length) {
  console.log(`\nFAIL（${fails.length}）：`); fails.forEach(f => console.log('  ✗ ' + f));
  process.exit(1);
}
console.log('\n✓ 連結檢查通過。');

function rel(p) { return p.replace(repoRoot + '/', ''); }
