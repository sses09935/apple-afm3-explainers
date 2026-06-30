// check-sources.mjs — 反漂移檢查（不變式 1–6 的機器可檢部分）。
// 失敗（FAIL）→ 退出碼 1；警告（WARN）不致命。
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(join(repoRoot, p), 'utf8');

const fails = [];
const warns = [];
const FAIL = m => fails.push(m);
const WARN = m => warns.push(m);

// ---- 載入來源清單 ----
const idx = read('sources/source-index.md');
const registered = new Set([...idx.matchAll(/\*\*(S[\w-]+)\*\*/g)].map(m => m[1]));
const activeSet = new Set();
for (const row of idx.split('\n')) {
  const m = row.match(/\*\*(S[\w-]+)\*\*/);
  if (m && /\|\s*active\s*\|/.test(row)) activeSet.add(m[1]);
}
const LEGEND = new Set(['S0X']); // 文件圖例中的格式範例，非真實引用

// ---- 解析 KB ----
const kbText = read('content/knowledge-base.md');
const kbLines = kbText.split('\n');
const KB = [];
let cur = null;
for (const l of kbLines) {
  const h = l.match(/^###\s+(KB-\d+)\b/);
  if (h) { cur = { id: h[1], source: '', status: '', codes: [], aud: {} }; KB.push(cur); continue; }
  if (!cur) continue;
  let m;
  if ((m = l.match(/^-\s*source:\s*(.*)$/))) { cur.source = m[1].trim(); cur.codes = [...m[1].matchAll(/\[(S[\w-]+)\]/g)].map(x => x[1]); }
  else if ((m = l.match(/^-\s*status:\s*(\S+)/))) cur.status = m[1];
  else if ((m = l.match(/^-\s*audiences:\s*(.*)$/))) for (const a of m[1].matchAll(/(dev|ai-user|general)=([a-z-]+)/g)) cur.aud[a[1]] = a[2];
}

const VALID_STATUS = new Set(['official', 'official-beta', 'forthcoming', 'reported-excluded']);
const usedCodes = new Set();

// 不變式 2：每條 KB 須有 source（[SXX] 或 reported-excluded）與合法 status
for (const e of KB) {
  if (!e.status) FAIL(`[不變式2] ${e.id} 缺 status`);
  else if (!VALID_STATUS.has(e.status)) FAIL(`[不變式2] ${e.id} status 非法：${e.status}`);

  if (e.status === 'reported-excluded') {
    if (e.codes.length) FAIL(`[不變式3] ${e.id} 為 reported-excluded 卻帶 S-code（報導不得作來源）`);
  } else {
    if (!e.codes.length) FAIL(`[不變式2] ${e.id} 缺來源 [S0X]`);
  }
  // 不變式3：KB 引用的 S-code 須登錄於 source-index
  for (const c of e.codes) {
    usedCodes.add(c);
    if (!registered.has(c)) FAIL(`[不變式3] ${e.id} 引用未登錄來源 ${c}`);
  }
}

// 來源使用率（warn）
for (const c of activeSet) if (!usedCodes.has(c)) WARN(`active 來源 ${c} 未被任何 KB 引用`);

// ---- 草稿檢查 ----
const drafts = {
  dev: read('content/drafts/dev.md'),
  'ai-user': read('content/drafts/ai-user.md'),
  general: read('content/drafts/general.md'),
  'dev-en': read('content/drafts/en/dev.md'),
  'ai-user-en': read('content/drafts/en/ai-user.md'),
  'general-en': read('content/drafts/en/general.md'),
};

// 草稿引用合法性
for (const [name, txt] of Object.entries(drafts)) {
  for (const m of txt.matchAll(/\[(S[\w-]+)\]/g)) {
    const c = m[1];
    if (LEGEND.has(c)) continue;
    if (!registered.has(c)) FAIL(`[不變式3] drafts/${name}.md 引用未登錄來源 ${c}`);
  }
}

// 不變式5：reported-excluded 內容不得進入 ai-user / general 正文（dev 附錄可）
const REPORTED_PHRASES = [
  '10 億美元', '1.2 兆', '兆參數', 'distill', 'teacher signal', 'no drop of Gemini',
  '$1 billion', '1.2-trillion', '1.2 trillion',
];
for (const name of ['ai-user', 'general', 'ai-user-en', 'general-en']) {
  for (const p of REPORTED_PHRASES) {
    if (drafts[name].includes(p)) FAIL(`[不變式5] drafts/${name} 出現報導內容「${p}」（reported-excluded 不得入此版正文）`);
  }
}

// 不變式6：official-beta 數字於草稿中須帶 beta 標記（區塊級檢查）
const BETA_TOKENS = ['45.6%', '61%', '64.7%', '37.8%', '44.7%', '17.6%', '4.15', '4.24', '3.87', '3.82', '+10%', '+14%', '約 36%', '約 21%'];
for (const [name, txt] of Object.entries(drafts)) {
  const blocks = txt.split(/\n\s*\n/);
  for (const b of blocks) {
    const hit = BETA_TOKENS.find(t => b.includes(t));
    if (hit && !/beta/i.test(b)) {
      FAIL(`[不變式6] drafts/${name}.md 含評測數字「${hit}」的區塊缺 beta 標記`);
    }
  }
}

// 不變式8（輔助）：受眾規格的 KB 選材須涵蓋 KB audiences 欄位（缺漏即失敗；額外提及允許）
const specFiles = { dev: 'content/audiences/dev.md', 'ai-user': 'content/audiences/ai-user.md', general: 'content/audiences/general.md' };
for (const [aud, f] of Object.entries(specFiles)) {
  const expected = KB.filter(e => e.aud[aud] && e.aud[aud] !== 'omit').map(e => e.id);
  const spec = read(f);
  const present = new Set([...spec.matchAll(/KB-\d+/g)].map(m => m[0]));
  const missing = expected.filter(id => !present.has(id));
  if (missing.length) FAIL(`[不變式8] audiences/${aud}.md 漏選 KB：${missing.join(', ')}`);
}

// ---- 報告 ----
console.log(`KB 條目：${KB.length}　已登錄來源：${registered.size}　active：${activeSet.size}`);
if (warns.length) { console.log(`\nWARN（${warns.length}）：`); warns.forEach(w => console.log('  ⚠ ' + w)); }
if (fails.length) {
  console.log(`\nFAIL（${fails.length}）：`); fails.forEach(f => console.log('  ✗ ' + f));
  console.log('\n反漂移檢查未通過。');
  process.exit(1);
}
console.log('\n✓ 反漂移檢查全綠（不變式 2/3/5/6/8 機器可檢部分通過）。');
