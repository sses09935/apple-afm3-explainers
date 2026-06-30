// build.mjs — Markdown → HTML → PDF（Playwright）+ web 版（含導覽列、跨版連結、資料來源頁、首頁 commit/更新時間）。
// 用法：
//   node build/build.mjs            全部（PDF + web HTML + sources + index）
//   node build/build.mjs dev        只產指定 id（PDF + 其 web）
//   node build/build.mjs web        只產 web（不啟動 Playwright，快）
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { renderDocument, renderSimplePage, repoRoot } from './md2html.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(readFileSync(join(__dirname, 'render.config.json'), 'utf8'));
const BASE_CSS = 'design/base.css';
const SOURCES_THEME = 'design/theme-dev.css';
const cacheDir = join(__dirname, '.cache');
const webDir = join(repoRoot, 'dist', 'web');
mkdirSync(cacheDir, { recursive: true });
mkdirSync(webDir, { recursive: true });

// Footer metadata shared by every web page (version + commit + build time). gitInfo() is hoisted.
const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'));
const gitMeta = gitInfo();
const builtAt = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false });
const footerMeta = { version: pkg.version, commit: gitMeta.hash, commitDate: gitMeta.date, built: builtAt };

const args = process.argv.slice(2);
const webOnly = args.includes('web');
const onlyId = args.find(a => a !== 'web' && a !== 'pdf');
const docs = onlyId ? cfg.documents.filter(d => d.id === onlyId) : cfg.documents;
if (docs.length === 0) {
  console.error(`找不到文件 id：${onlyId}（可用：${cfg.documents.map(d => d.id).join(', ')}）`);
  process.exit(1);
}

// ---- 導覽列 ----
function navFor(doc) {
  const lang = doc.lang || 'zh-Hant';
  const isEn = lang === 'en';
  const sameLang = cfg.documents.filter(d => (d.lang || 'zh-Hant') === lang);
  const links = sameLang.map(d =>
    `<a href="${d.webFile}"${d.id === doc.id ? ' aria-current="page"' : ''}>${d.audience}</a>`).join('');
  const srcLabel = isEn ? 'Sources' : '資料來源';
  const homeLabel = isEn ? 'Home' : '首頁';
  const cpId = isEn ? doc.id.replace(/-en$/, '') : `${doc.id}-en`;
  const cp = cfg.documents.find(d => d.id === cpId);
  const langToggle = cp ? `<a class="lang" href="${cp.webFile}">${isEn ? '中文' : 'EN'}</a>` : '';
  return `<nav class="topnav"><a class="home" href="index.html">← ${homeLabel}</a>`
    + `<span class="navlinks">${links}<a href="sources.html"${doc.id === 'sources' ? ' aria-current="page"' : ''}>${srcLabel}</a></span>`
    + langToggle + '</nav>';
}

// ---- 1) render web HTML（含 nav + 跨版連結）----
for (const d of docs) {
  const siblings = cfg.documents
    .filter(x => (x.lang || 'zh-Hant') === (d.lang || 'zh-Hant') && x.id !== d.id)
    .map(x => ({ name: x.audience, file: x.webFile }));
  const webHtml = renderDocument({
    draftPath: d.draft, title: d.title, audience: d.audience,
    baseCss: BASE_CSS, themeCss: d.theme, lang: d.lang || 'zh-Hant',
    web: true, nav: navFor(d), siblings, footerMeta,
  });
  writeFileSync(join(cacheDir, `${d.id}.html`), webHtml);
  writeFileSync(join(webDir, d.webFile || `${d.id}.html`), webHtml);
  console.log(`✓ dist/web/${d.webFile || d.id + '.html'}`);
}

// ---- 2) 資料來源頁（render 全部時才產）----
if (!onlyId) {
  const sourcesHtml = renderSimplePage({
    title: '資料來源與來源索引',
    lead: '本專案事實僅引用以下官方來源（T1 Apple／T2 合作方），每條 KB 事實對應一組來源代碼。以下為來源索引與 claim→來源對照（皆由 repo 自動產生）。',
    mdPaths: ['sources/source-index.md', 'sources/source-map.md'],
    baseCss: BASE_CSS, themeCss: SOURCES_THEME,
    nav: navFor({ id: 'sources', lang: 'zh-Hant' }),
    footerMeta,
  });
  writeFileSync(join(webDir, 'sources.html'), sourcesHtml);
  console.log('✓ dist/web/sources.html');
}

// ---- 3) 複製既有 PDF 進 dist/web/pdf（供網站下載）----
const pdfDir = join(webDir, 'pdf');
mkdirSync(pdfDir, { recursive: true });
const distDir = join(repoRoot, 'dist');
for (const f of readdirSync(distDir).filter(f => f.endsWith('.pdf'))) {
  copyFileSync(join(distDir, f), join(pdfDir, f));
}

// ---- 4) 首頁（含 commit 與最後更新時間）----
if (!onlyId) writeIndex();

// ---- 5) PDF（除非 web-only）----
if (!webOnly) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch();
  try {
    for (const d of docs) {
      const pdfHtml = renderDocument({
        draftPath: d.draft, title: d.title, audience: d.audience,
        baseCss: BASE_CSS, themeCss: d.theme, lang: d.lang || 'zh-Hant', web: false,
      });
      const page = await browser.newPage();
      await page.setContent(pdfHtml, { waitUntil: 'networkidle' });
      await page.emulateMedia({ media: 'print' });
      const outPath = join(repoRoot, d.out);
      mkdirSync(dirname(outPath), { recursive: true });
      await page.pdf({ path: outPath, ...cfg.pdf });
      await page.close();
      copyFileSync(outPath, join(pdfDir, basename(outPath))); // keep web pdf fresh
      console.log(`✓ ${d.out}`);
    }
  } finally { await browser.close(); }
}

console.log(`\n完成：${docs.length} 份${webOnly ? '（web only）' : '（PDF + web）'}。`);

// ---------- helpers ----------
function gitInfo() {
  const run = c => { try { return execSync(c, { cwd: repoRoot, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return ''; } };
  return { hash: run('git rev-parse --short HEAD'), subject: run('git log -1 --pretty=%s'), date: run('git log -1 --date=format:%Y-%m-%d %H:%M --pretty=%cd') };
}

function writeIndex() {
  const zh = cfg.documents.filter(d => (d.lang || 'zh-Hant') !== 'en');
  const en = cfg.documents.filter(d => d.lang === 'en');
  const g = gitInfo();
  const built = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false });
  const commitLine = g.hash
    ? `<code>${g.hash}</code>${g.subject ? ` — ${esc(g.subject)}` : ''}${g.date ? `（${g.date}）` : ''}`
    : '<span class="muted">（尚未 commit；建置自工作目錄）</span>';

  const card = d => {
    const pdf = `pdf/${basename(d.out)}`;
    const hasPdf = existsSync(join(webDir, pdf));
    return `
      <a class="card" href="${d.webFile}">
        <span class="aud">${d.audience}</span>
        <span class="ttl">${d.title}</span>
        ${hasPdf ? `<span class="pdf">下載 PDF</span>` : ''}
      </a>`;
  };

  const html = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>AFM 3 Explainers — 受眾分眾白皮書</title>
<style>
  :root{--accent:#0b5fd4}
  *{box-sizing:border-box}
  body{font-family:"PingFang TC","Noto Sans CJK TC","Noto Sans TC",-apple-system,Arial,sans-serif;
    max-width:1040px;margin:0 auto;padding:56px 28px 88px;color:#1d1d1f;line-height:1.72}
  h1{font-size:2rem;margin:0 0 .2em}
  .sub{color:#555;margin:0 0 1.4em}
  .meta{display:flex;flex-wrap:wrap;gap:8px 22px;font-size:.85rem;color:#555;
    background:#f5f7fb;border:1px solid #e2e8f4;border-radius:8px;padding:12px 16px;margin:0 0 2em}
  .meta b{color:#1d1d1f;font-weight:600}
  .meta code{background:#fff;border:1px solid #d8d8dd;border-radius:5px;padding:.05em .4em;font-size:.92em}
  .muted{color:#999}
  h2{font-size:1.1rem;border-bottom:2px solid var(--accent);padding-bottom:.2em;margin-top:1.8em}
  .grid{display:grid;grid-template-columns:1fr;gap:14px}
  @media(min-width:640px){.grid{grid-template-columns:repeat(3,1fr)}}
  .card{display:flex;flex-direction:column;gap:6px;padding:18px;border:1px solid #d8d8dd;border-radius:8px;
    text-decoration:none;color:inherit;transition:.15s;background:#fff}
  .card:hover{border-color:var(--accent);box-shadow:0 4px 16px rgba(11,95,212,.12)}
  .aud{font-weight:700;color:var(--accent)}
  .ttl{font-size:.92rem}
  .pdf{font-size:.78rem;color:#0b5fd4;margin-top:auto;font-weight:600}
  .reflink{display:inline-block;margin:.4em 0;font-weight:600;color:var(--accent);text-decoration:none}
  .reflink:hover{text-decoration:underline}
  footer{margin-top:3em;font-size:.82rem;color:#888;border-top:1px solid #eee;padding-top:1em}
  @media(max-width:640px){body{padding:36px 18px 64px}.meta{padding:11px 12px}.card{padding:15px}}
</style>
</head>
<body>
  <h1>AFM 3 Explainers</h1>
  <p class="sub">第三代 Apple Foundation Models（AFM 3）+ PCC on Google Cloud — 受眾分眾白皮書。繁體中文＋英文雙語，只引 Apple 官方與合作方官方來源；非官方科普／教育用途。</p>

  <div class="meta">
    <span><b>最後更新：</b>${built}（Asia/Taipei，建置時間）</span>
    <span><b>Commit：</b>${commitLine}</span>
  </div>

  <h2>繁體中文版</h2>
  <div class="grid">${zh.map(card).join('')}</div>
  ${en.length ? `<h2>English editions</h2>\n  <div class="grid">${en.map(card).join('')}</div>` : ''}

  <h2>資料來源</h2>
  <p><a class="reflink" href="sources.html">→ 來源索引與 claim→來源對照（資料來源頁）</a></p>

  <footer>
    Apache-2.0 · <a href="https://github.com/sses09935">github.com/sses09935</a> ·
    內容僅引 Apple 官方與合作方官方來源（見<a href="sources.html">資料來源</a>）；評測為官方 beta 階段快照。
    商標屬各自所有人，僅作指稱。
  </footer>
</body>
</html>`;
  writeFileSync(join(webDir, 'index.html'), html);
  console.log('✓ dist/web/index.html');
}

function esc(s) { return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
