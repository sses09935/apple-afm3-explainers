// md2html.mjs — Markdown → 自包含 HTML（inline CSS + inline SVG）。
// 供 Playwright 列印成 PDF（mode 'pdf'）與 Firebase Hosting web 版（mode 'web'，含導覽列與跨版超連結）。
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import attrs from 'markdown-it-attrs';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(__dirname, '..');

const md = new MarkdownIt({ html: true, linkify: false, typographer: false }).use(attrs);

let registeredSources;

function sourceCodes() {
  if (!registeredSources) {
    const idx = readFileSync(join(repoRoot, 'sources/source-index.md'), 'utf8');
    registeredSources = new Set([...idx.matchAll(/\*\*(S[\w-]+)\*\*/g)].map(m => m[1]));
  }
  return registeredSources;
}

function renderMarkdown(source, { linkSources = false, sourceHrefPrefix = 'sources.html' } = {}) {
  const toc = [];
  const seen = new Map();
  const tokens = md.parse(source, {});

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type !== 'heading_open') continue;
    const next = tokens[i + 1];
    if (!next || next.type !== 'inline') continue;
    const level = Number(t.tag.slice(1));
    const title = next.content.trim().replace(/\s+/g, ' ');
    if (!title) continue;
    const id = uniqueId(slug(title, toc.length + 1), seen);
    t.attrSet('id', id);
    t.attrJoin('class', 'section-heading');
    t.attrSet('tabindex', '-1');
    toc.push({ level, title, id });
  }

  let html = md.renderer.render(tokens, md.options, {});
  html = taskLists(html);
  html = wrapTables(html);
  if (linkSources) html = linkSourceRefs(html, sourceHrefPrefix);
  else html = markSourceRefs(html);
  html = markStatusLabels(html);
  html = classifyCallouts(html);
  html = inlineSvgs(html);
  return { html, toc };
}

function inlineSvgs(html) {
  html = html.replace(/<img\b([^>]*?)\/?>/g, (m, attrsText) => {
    const src = attr(attrsText, 'src');
    if (!src || !src.endsWith('.svg')) return m;
    const alt = attr(attrsText, 'alt') || '';
    const p = join(repoRoot, src);
    if (!existsSync(p)) {
      return `<figure class="diagram-figure missing"><div class="missing-fig">［缺圖：${esc(src)}］</div><figcaption>${esc(alt)}</figcaption></figure>`;
    }
    const prefix = `svg-${src.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    let svg = readFileSync(p, 'utf8').replace(/<\?xml[^>]*\?>\s*/i, '').trim();
    svg = prefixSvgIds(svg, prefix);
    svg = svg.replace(/<svg\b([^>]*)>/, (tag, svgAttrs) => {
      let out = svgAttrs;
      if (/\sclass=/.test(out)) out = out.replace(/\sclass="([^"]*)"/, ' class="$1 inline-diagram"');
      else out += ' class="inline-diagram"';
      if (!/\srole=/.test(out)) out += ' role="img"';
      if (!/\saria-label=/.test(out) && alt) out += ` aria-label="${escAttr(alt)}"`;
      return `<svg${out}>`;
    });
    return `<figure class="diagram-figure" data-diagram="${escAttr(src)}">${svg}<figcaption>${esc(alt)}</figcaption></figure>`;
  });
  return html.replace(/<p>\s*(<figure\b[\s\S]*?<\/figure>)\s*<\/p>/g, '$1');
}

function taskLists(html) {
  return html
    .replace(/<li>\[ \]\s*/g, '<li class="task"><input type="checkbox" disabled> ')
    .replace(/<li>\[[xX]\]\s*/g, '<li class="task"><input type="checkbox" checked disabled> ');
}

function wrapTables(html) {
  return html
    .replace(/<table>/g, '<div class="table-wrap" tabindex="0">\n<table>')
    .replace(/<\/table>/g, '</table>\n</div>');
}

// web 版：把正文中以 **粗體** 提及的「其他受眾版本名稱」轉成連結（不變更目前頁自身名稱）。
function linkEditions(html, siblings) {
  for (const s of siblings) {
    const needle = `<strong>${s.name}</strong>`;
    html = html.split(needle).join(`<strong><a class="xref" href="${s.file}">${s.name}</a></strong>`);
  }
  return html;
}

// web 版（資料來源頁）：把 <code>https://…</code> 變成可點連結。
function linkifyUrlCodes(html) {
  return html.replace(/<code>(https?:\/\/[^<]+)<\/code>/g,
    '<code><a href="$1" target="_blank" rel="noopener">$1</a></code>');
}

function linkSourceRefs(html, prefix) {
  const codes = sourceCodes();
  const href = code => `${prefix}#source-${encodeURIComponent(code)}`;
  const held = [];
  html = html.replace(/<code>\[(S[\w-]+)\]<\/code>/g, (m, code) => {
    if (!codes.has(code)) return m;
    const key = `@@SOURCE_REF_${held.length}@@`;
    held.push(`<a class="source-ref source-ref-code" href="${href(code)}">[${code}]</a>`);
    return key;
  });
  html = html.replace(/\[(S[\w-]+)\]/g, (m, code) =>
    codes.has(code) ? `<a class="source-ref" href="${href(code)}">[${code}]</a>` : m);
  return html.replace(/@@SOURCE_REF_(\d+)@@/g, (m, i) => held[Number(i)] || m);
}

// PDF 模式：把來源代碼標成可辨識的引用 pill（與 web 的 .source-ref 同樣式，但非連結）。
// 鏡像 linkSourceRefs 的兩段式比對；不改文字內容，只在已登錄來源代碼外加 <span class="source-ref">。
function markSourceRefs(html) {
  const codes = sourceCodes();
  const held = [];
  html = html.replace(/<code>\[(S[\w-]+)\]<\/code>/g, (m, code) => {
    if (!codes.has(code)) return m;
    const key = `@@SREF_${held.length}@@`;
    held.push(`<span class="source-ref source-ref-code">[${code}]</span>`);
    return key;
  });
  html = html.replace(/\[(S[\w-]+)\]/g, (m, code) =>
    codes.has(code) ? `<span class="source-ref">[${code}]</span>` : m);
  return html.replace(/@@SREF_(\d+)@@/g, (m, i) => held[Number(i)] || m);
}

// 狀態敏感標籤可見性：把整段內容剛好是 official-beta / forthcoming / reported-excluded 的
// inline <code> 加上 status-pill class。不改文字、不翻譯、不碰 URL / source code / pre 區塊外的內容。
function markStatusLabels(html) {
  const cls = { 'official-beta': 'status-beta', forthcoming: 'status-forthcoming', 'reported-excluded': 'status-excluded' };
  return html.replace(/<code>(official-beta|forthcoming|reported-excluded)<\/code>/g,
    (m, s) => `<code class="status-pill ${cls[s]}">${s}</code>`);
}

// Classify each blockquote into a callout variant by its leading marker (no text change).
// Reading Mode keeps callouts quiet; Audit Mode emphasizes boundary/misconception/warning callouts.
// Purely visual: misclassification has no factual effect. See design/component-contract.md §Callouts.
function classifyCallouts(html) {
  return html.replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, (m, inner) => {
    const lead = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 110);
    let variant = 'callout-note';
    if (/常見誤解|常見迷思|Common misconception|^Misconception/i.test(lead)) variant = 'callout-misconception';
    else if (/先講結論|本節重點|重點摘要|一句話|In short[,:：]|Key takeaways?|At a glance|TL;DR/i.test(lead)) variant = 'callout-summary';
    else if (/準確性紅線|可驗證的界線|可驗證界線|界線|accuracy red line|the limit of verifiab|^Boundary/i.test(lead)) variant = 'callout-boundary';
    else if (/^注意|^警告|注意[:：]|警告[:：]|^Note[:：]|^Caution|^Warning/i.test(lead)) variant = 'callout-warning';
    return `<blockquote class="callout ${variant}">${inner}</blockquote>`;
  });
}

function annotateSourceIndex(html) {
  for (const code of sourceCodes()) {
    html = html.replace(`<strong>${code}</strong>`, `<strong id="source-${code}" class="source-anchor">${code}</strong>`);
  }
  return html;
}

const COVER_STRINGS = {
  'zh-Hant': {
    kicker: '第三代 Apple Foundation Models · PCC on Google Cloud',
    meta: [
      '繁體中文 · 只引 Apple 官方與合作方官方來源 · 非官方科普／教育用途',
      '與 Apple／Google／NVIDIA 無隸屬關係',
      '評測為官方 beta 階段快照 · 基準日期 2026-06-23',
    ],
  },
  en: {
    kicker: 'Third-Generation Apple Foundation Models · PCC on Google Cloud',
    meta: [
      'English · Apple and partner official sources only · Independent / educational (unofficial)',
      'Not affiliated with Apple, Google, or NVIDIA',
      'Benchmarks are an official beta snapshot · Baseline date 2026-06-23',
    ],
  },
};

function coverHtml({ title, audience, lang }) {
  const s = COVER_STRINGS[lang] || COVER_STRINGS['zh-Hant'];
  return `<section class="cover">
    <div class="kicker">${s.kicker}</div>
    <h1>${title}</h1>
    <div class="audience">${audience}</div>
    <div class="meta">${s.meta.join('<br/>')}</div>
    <div class="badge">Apache-2.0 · github.com/sses09935</div>
  </section>`;
}

function shell({ htmlLang, title, base, theme, nav, body, scripts = '', htmlAttr = '', headExtra = '' }) {
  return `<!doctype html>
<html lang="${htmlLang}"${htmlAttr ? ' ' + htmlAttr : ''}>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${title}</title>
<style>${base}\n${theme}</style>
${headExtra}</head>
<body>
${nav || ''}
${body}
${scripts}
</body>
</html>`;
}

export function renderDocument({ draftPath, title, audience, baseCss, themeCss, lang = 'zh-Hant', web = false, nav = '', siblings = [], footerMeta = {} }) {
  const source = readFileSync(join(repoRoot, draftPath), 'utf8');
  const rendered = renderMarkdown(source, { linkSources: web });
  let body = rendered.html;
  if (web && siblings.length) body = linkEditions(body, siblings);

  const base = readFileSync(join(repoRoot, baseCss), 'utf8');
  const theme = readFileSync(join(repoRoot, themeCss), 'utf8');
  const htmlLang = lang === 'en' ? 'en' : 'zh-Hant';

  const content = `${coverHtml({ title, audience, lang })}\n<main id="content">\n${body}\n</main>`;
  const inner = web
    ? `<div class="reader-layout">${readerTools({ toc: rendered.toc, lang })}<div class="document-body">${content}${docFooter({ lang, meta: footerMeta })}</div></div>`
    : content;
  return shell({
    htmlLang,
    title: `${title} — ${audience}`,
    base,
    theme,
    nav: web ? nav : '',
    body: inner,
    // PDF (web:false) gets no reader-mode attribute, no toggle script, no early script —
    // so PDFs always render the Reading-equivalent base style and never carry a Web-only toggle.
    scripts: web ? readerScript(lang) + readerModeScript() : '',
    htmlAttr: web ? 'data-reader-mode="reading"' : '',
    headExtra: web ? readerModeEarlyScript() : '',
  });
}

// 通用 web 頁（如資料來源頁）：合併多個 markdown，無封面、有導覽列。
export function renderSimplePage({ title, lead = '', mdPaths = [], baseCss, themeCss, nav = '', htmlLang = 'zh-Hant', footerMeta = {} }) {
  const base = readFileSync(join(repoRoot, baseCss), 'utf8');
  const theme = readFileSync(join(repoRoot, themeCss), 'utf8');
  const source = mdPaths.map(p => readFileSync(join(repoRoot, p), 'utf8')).join('\n\n---\n\n');
  const rendered = renderMarkdown(source, { linkSources: false });
  let body = rendered.html;
  body = linkifyUrlCodes(body);
  body = annotateSourceIndex(body);
  const toc = [{ level: 1, title, id: 'page-title' }, ...rendered.toc];
  const inner = `<div class="reader-layout">${readerTools({ toc, lang: htmlLang })}<div class="document-body"><main id="content"><h1 id="page-title" class="page-title" tabindex="-1">${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}\n${body}\n</main>${docFooter({ lang: htmlLang, meta: footerMeta })}</div></div>`;
  return shell({ htmlLang, title, base, theme, nav, body: inner, scripts: readerScript(htmlLang) + readerModeScript(), htmlAttr: 'data-reader-mode="reading"', headExtra: readerModeEarlyScript() });
}

function readerTools({ toc, lang }) {
  const isEn = lang === 'en';
  const strings = isEn
    ? { search: 'Search this page', placeholder: 'Search headings and text', toc: 'Table of contents' }
    : { search: '搜尋本頁', placeholder: '搜尋標題與內文', toc: '目錄' };
  const items = toc
    .filter(i => i.level <= 3)
    .map(i => `<li class="toc-l${i.level}"><a href="#${escAttr(i.id)}">${esc(i.title)}</a></li>`)
    .join('');
  return `<aside class="reader-tools" aria-label="${escAttr(strings.toc)}">
  <div class="reader-tools-inner">
    ${readerModeControls(lang)}
    <label class="search-label" for="page-search">${strings.search}</label>
    <input id="page-search" class="page-search" type="search" placeholder="${escAttr(strings.placeholder)}" autocomplete="off"/>
    <div id="search-status" class="search-status" aria-live="polite"></div>
    <div id="search-results" class="search-results"></div>
    <nav class="toc" aria-label="${escAttr(strings.toc)}">
      <div class="toc-title">${strings.toc}</div>
      <ol class="toc-list">${items}</ol>
    </nav>
  </div>
</aside>`;
}

function readerScript(lang) {
  const isEn = lang === 'en';
  const resultLabel = isEn ? 'result' : '筆結果';
  const noResults = isEn ? 'No matches' : '找不到符合項目';
  return `<script>
(() => {
  const input = document.getElementById('page-search');
  const results = document.getElementById('search-results');
  const status = document.getElementById('search-status');
  if (!input || !results || !status) return;

  const blocks = [];
  let current = { id: '', title: '' };
  document.querySelectorAll('main h1, main h2, main h3, main h4, main p, main li, main th, main td, main figcaption, main blockquote').forEach((el) => {
    const text = el.textContent.replace(/\\s+/g, ' ').trim();
    if (!text) return;
    if (/^H[1-4]$/.test(el.tagName)) current = { id: el.id, title: text };
    blocks.push({ id: current.id || el.id, title: current.title || text, text });
  });

  function snippet(text, query) {
    const hay = text.toLowerCase();
    const i = hay.indexOf(query.toLowerCase());
    if (i < 0) return text.slice(0, 110);
    const start = Math.max(0, i - 36);
    const end = Math.min(text.length, i + query.length + 70);
    return (start ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
  }

  input.addEventListener('input', () => {
    const q = input.value.trim();
    results.innerHTML = '';
    status.textContent = '';
    if (!q) return;

    const seen = new Set();
    const hits = [];
    const needle = q.toLowerCase();
    for (const b of blocks) {
      if (!b.text.toLowerCase().includes(needle)) continue;
      const key = (b.id || '') + '|' + b.text.slice(0, 80);
      if (seen.has(key)) continue;
      seen.add(key);
      hits.push(b);
      if (hits.length >= 8) break;
    }

    if (!hits.length) {
      status.textContent = '${noResults}';
      return;
    }
    status.textContent = hits.length + ' ${resultLabel}';
    results.innerHTML = hits.map((h) => {
      const href = h.id ? '#' + h.id : '#content';
      return '<a class="search-hit" href="' + href + '"><span>' + escapeHtml(h.title) + '</span><small>' + escapeHtml(snippet(h.text, q)) + '</small></a>';
    }).join('');
  });

  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
})();
</script>`;
}

// Reading / Audit mode controls + status legend (web reader-tools). The status legend doubles as a
// scan key for Audit Mode. Status labels are named, not asserted as reported content.
function readerModeControls(lang) {
  const isEn = lang === 'en';
  const s = isEn
    ? { group: 'Reader mode', reading: 'Reading', audit: 'Audit', readingHint: 'easier to read', auditHint: 'easier to check',
        legend: 'Status key', beta: 'official beta', betaNote: 'beta snapshot — not final',
        forth: 'forthcoming', forthNote: 'pre-announced — not yet available',
        rep: 'reported-excluded', repNote: 'reporting — not official' }
    : { group: '閱讀模式', reading: '閱讀', audit: '稽核', readingHint: '比較好讀', auditHint: '比較好查',
        legend: '狀態圖例', beta: 'official beta', betaNote: 'beta 快照,非最終',
        forth: 'forthcoming', forthNote: '已預告,尚未可用',
        rep: 'reported-excluded', repNote: '報導,非官方' };
  return `<div class="reader-mode" role="group" aria-label="${escAttr(s.group)}">
      <span class="reader-mode-title">${s.group}</span>
      <div class="reader-mode-toggle">
        <button type="button" class="rm-btn rm-reading" data-reader-mode-set="reading" aria-pressed="true"><span class="rm-name">${s.reading}</span><span class="rm-hint">${s.readingHint}</span></button>
        <button type="button" class="rm-btn rm-audit" data-reader-mode-set="audit" aria-pressed="false"><span class="rm-name">${s.audit}</span><span class="rm-hint">${s.auditHint}</span></button>
      </div>
    </div>
    <div class="status-legend" aria-label="${escAttr(s.legend)}">
      <span class="status-legend-title">${s.legend}</span>
      <ul class="status-legend-list">
        <li><code class="status-pill status-beta">${s.beta}</code><span class="status-legend-note">${s.betaNote}</span></li>
        <li><code class="status-pill status-forthcoming">${s.forth}</code><span class="status-legend-note">${s.forthNote}</span></li>
        <li><code class="status-pill status-excluded">${s.rep}</code><span class="status-legend-note">${s.repNote}</span></li>
      </ul>
    </div>`;
}

// Early head script: restore the saved mode before first paint (no flash of the wrong mode).
function readerModeEarlyScript() {
  return `<script>(function(){try{var m=localStorage.getItem('afm-reader-mode');if(m==='audit'||m==='reading'){document.documentElement.setAttribute('data-reader-mode',m);}}catch(e){}})();</script>\n`;
}

// Body script: bind the toggle, persist the choice, keep aria-pressed in sync. No-JS → Reading Mode.
function readerModeScript() {
  return `<script>
(() => {
  const root = document.documentElement;
  const KEY = 'afm-reader-mode';
  const mode = () => (root.getAttribute('data-reader-mode') === 'audit' ? 'audit' : 'reading');
  function apply(next) {
    root.setAttribute('data-reader-mode', next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
    document.querySelectorAll('[data-reader-mode-set]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-reader-mode-set') === next));
    });
  }
  apply(mode());
  document.querySelectorAll('[data-reader-mode-set]').forEach((b) => {
    b.addEventListener('click', () => apply(b.getAttribute('data-reader-mode-set')));
  });
})();
</script>`;
}

// Per-page footer metadata (web only): version, commit, updated date, sources link, non-official note.
function docFooter({ lang, meta = {} }) {
  const isEn = lang === 'en';
  const s = isEn
    ? { updated: 'Last updated', version: 'Version', commit: 'Commit', sources: 'Sources',
        disclaimer: 'Independent, educational explainer — not affiliated with Apple, Google, or NVIDIA. Benchmarks are an official beta-stage snapshot.' }
    : { updated: '最後更新', version: '版本', commit: 'Commit', sources: '資料來源',
        disclaimer: '非官方科普／教育用途,與 Apple／Google／NVIDIA 無隸屬關係。評測為官方 beta 階段快照。' };
  const item = (label, value) => `<span class="doc-footer-item"><b>${label}</b> ${value}</span>`;
  const parts = [];
  if (meta.version) parts.push(item(s.version, `v${esc(String(meta.version))}`));
  if (meta.commit) parts.push(item(s.commit, `<code>${esc(meta.commit)}</code>${meta.commitDate ? ` <span class="muted">(${esc(meta.commitDate)})</span>` : ''}`));
  if (meta.built) parts.push(item(s.updated, esc(meta.built)));
  parts.push(`<span class="doc-footer-item"><a href="sources.html">${s.sources}</a></span>`);
  return `<footer class="doc-footer" data-footer-meta>
    <div class="doc-footer-meta">${parts.join('')}</div>
    <div class="doc-footer-note">${s.disclaimer}</div>
  </footer>`;
}

function slug(s, index) {
  const plain = s
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return plain || `section-${index}`;
}

function uniqueId(base, seen) {
  const count = seen.get(base) || 0;
  seen.set(base, count + 1);
  return count ? `${base}-${count + 1}` : base;
}

function attr(attrsText, name) {
  const m = attrsText.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'));
  return m ? m[1] : '';
}

function prefixSvgIds(svg, prefix) {
  const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  for (const id of ids) {
    const next = `${prefix}-${id}`;
    const re = escRe(id);
    svg = svg
      .replace(new RegExp(`id="${re}"`, 'g'), `id="${next}"`)
      .replace(new RegExp(`url\\(#${re}\\)`, 'g'), `url(#${next})`)
      .replace(new RegExp(`="#${re}"`, 'g'), `="#${next}"`)
      .replace(new RegExp(`begin="${re}\\.`, 'g'), `begin="${next}.`);
  }
  return svg;
}

function esc(s) { return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function escAttr(s) { return esc(s).replace(/'/g, '&#39;'); }
function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
