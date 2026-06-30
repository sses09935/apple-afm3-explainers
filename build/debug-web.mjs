// debug-web.mjs — generated-HTML debug for the AFM3 web output (Reading/Audit Mode + bilingual).
// Reads dist/web/*.html and reports presence of mode toggle, source refs, status pills, callouts,
// language switcher, audience links, footer metadata, and CSS mode selectors. Read-only; never deploys.
// Usage: node build/debug-web.mjs   (run `npm run build:web` first so dist/web is fresh).
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const webDir = join(repoRoot, 'dist', 'web');

if (!existsSync(webDir)) {
  console.error('dist/web not found — run `npm run build:web` first.');
  process.exit(1);
}

// Reader pages carry the full reader UI; index.html is the landing page (different contract).
const readerPages = ['dev.html', 'ai-user.html', 'general.html', 'dev-en.html', 'ai-user-en.html', 'general-en.html', 'sources.html']
  .filter(f => existsSync(join(webDir, f)));
const allPages = readdirSync(webDir).filter(f => f.endsWith('.html'));

const count = (s, re) => (s.match(re) || []).length;
const has = (s, sub) => s.includes(sub);

const totals = { srcRefs: 0, statusPills: 0, callouts: 0 };
const missing = [];
const rows = [];

for (const f of readerPages) {
  const html = readFileSync(join(webDir, f), 'utf8');
  const r = {
    page: f,
    srcRefs: count(html, /class="source-ref(?:\s|")/g),
    statusPills: count(html, /class="status-pill /g),
    statusBeta: count(html, /class="status-pill status-beta"/g),
    statusForthcoming: count(html, /class="status-pill status-forthcoming"/g),
    statusExcluded: count(html, /class="status-pill status-excluded"/g),
    callouts: count(html, /<blockquote class="callout /g),
    misconception: count(html, /callout callout-misconception/g),
    boundary: count(html, /callout callout-boundary/g),
    warning: count(html, /callout callout-warning/g),
    modeToggle: has(html, 'data-reader-mode-set="audit"') && has(html, 'data-reader-mode-set="reading"'),
    modeLabels: /Reading|閱讀/.test(html) && /Audit|稽核/.test(html),
    modeState: has(html, 'data-reader-mode="reading"'),
    earlyScript: has(html, "localStorage.getItem('afm-reader-mode')"),
    langSwitcher: has(html, 'class="lang"'),
    audienceLinks: count(html, /class="navlinks"/g) > 0,
    footerMeta: has(html, 'class="doc-footer"') && has(html, 'data-footer-meta'),
    versionMeta: /version|版本/i.test(html) && has(html, 'doc-footer'),
    cssAuditSel: has(html, '[data-reader-mode="audit"]'),
    statusLegend: has(html, 'class="status-legend"'),
  };
  totals.srcRefs += r.srcRefs;
  totals.statusPills += r.statusPills;
  totals.callouts += r.callouts;

  // Per-page required-element checks. The sources page is a listing/navigation page: it carries the
  // full reader UI, but renders source codes as anchors (not [S0X] pills) and has no language
  // counterpart, so source-refs and the language switcher are not required there.
  const isEdition = f !== 'sources.html';
  const need = [
    ['mode toggle', r.modeToggle], ['mode labels', r.modeLabels], ['mode DOM state', r.modeState],
    ['early persistence script', r.earlyScript],
    ['status pills', r.statusPills > 0], ['status legend', r.statusLegend],
    ['audience links', r.audienceLinks],
    ['footer metadata', r.footerMeta], ['version/commit/updated', r.versionMeta],
    ['CSS audit selectors', r.cssAuditSel],
    ...(isEdition ? [['source refs', r.srcRefs > 0], ['language switcher', r.langSwitcher], ['misconception callout', r.misconception > 0]] : []),
  ];
  for (const [label, ok] of need) if (!ok) missing.push(`${f}: ${label}`);
  rows.push(r);
}

// ---- report ----
console.log('Web debug report');
console.log(`- pages checked: ${readerPages.length} reader pages (+ ${allPages.length - readerPages.length} other: index/landing)`);
console.log(`- source refs found: ${totals.srcRefs}`);
console.log(`- status pills found: ${totals.statusPills}`);
console.log(`- callouts found: ${totals.callouts}`);
console.log(`- mode toggle found: ${rows.every(r => r.modeToggle) ? 'all reader pages' : rows.filter(r => r.modeToggle).length + '/' + rows.length}`);
console.log(`- language switcher found: ${rows.every(r => r.langSwitcher) ? 'all reader pages' : rows.filter(r => r.langSwitcher).length + '/' + rows.length}`);
console.log(`- audience links found: ${rows.every(r => r.audienceLinks) ? 'all reader pages' : rows.filter(r => r.audienceLinks).length + '/' + rows.length}`);
console.log(`- footer metadata found: ${rows.every(r => r.footerMeta) ? 'all reader pages' : rows.filter(r => r.footerMeta).length + '/' + rows.length}`);
console.log(`- CSS mode selectors found: ${rows.every(r => r.cssAuditSel) ? 'all reader pages' : rows.filter(r => r.cssAuditSel).length + '/' + rows.length}`);

console.log('\nPer-page detail:');
const pad = (s, n) => String(s).padEnd(n);
console.log(`  ${pad('page', 16)} ${pad('srcRef', 7)} ${pad('pills', 6)} ${pad('callout', 8)} ${pad('misc', 5)} ${pad('bound', 6)} ${pad('warn', 5)} toggle legend lang footer`);
for (const r of rows) {
  console.log(`  ${pad(r.page, 16)} ${pad(r.srcRefs, 7)} ${pad(r.statusPills, 6)} ${pad(r.callouts, 8)} ${pad(r.misconception, 5)} ${pad(r.boundary, 6)} ${pad(r.warning, 5)} ${pad(r.modeToggle ? 'yes' : 'NO', 6)} ${pad(r.statusLegend ? 'yes' : 'NO', 6)} ${pad(r.langSwitcher ? 'yes' : 'NO', 4)} ${r.footerMeta ? 'yes' : 'NO'}`);
}

console.log('\n- missing items: ' + (missing.length ? '\n  ✗ ' + missing.join('\n  ✗ ') : 'none'));
if (missing.length) process.exit(1);
console.log('\n✓ Web debug checks passed (all reader pages carry mode toggle, source/status/callout, language switcher, audience links, footer metadata, and CSS mode selectors).');
