# Task 06 — 設計與渲染
> Phase 6 · 對應 PLAN §6、§10 · 交給 Claude Code

## 目標
建立設計系統、圖、build 管線與反漂移腳本,產出三份 PDF。

## 待產出
- `design/base.css`、`theme-dev.css`、`theme-ai-user.css`、`theme-general.css`、`diagrams.md`
- `assets/diagrams/`（D 系列 SVG）、`assets/illustrations/`（M 系列）
- `build/build.mjs`、`md2html.mjs`、`render.config.json`、`check-sources.mjs`、`smoke/cjk-test.html`
- `dist/AFM3-開發者版.pdf`、`AFM3-AI使用者版.pdf`、`AFM3-普羅大眾版.pdf`

## 步驟
1. **盡量沿用前作** `apple-pcc-privacy-explainers` 的 `base.css` / `build.mjs` / `md2html.mjs` / `render.config.json` / CJK smoke test,改色票與封面。
2. 依 drafts 的佔位需求,在 `diagrams.md` 定義並繪製 D 系列 SVG,至少:五模型路由圖、PCC-on-GCP 信任堆疊、IFP 的 NAND/DRAM 載入、attestation / ledger 鏈;及 general 版 M 系列插圖。
3. 管線 `Markdown → HTML → PDF`（Playwright Chromium 列印),三份共用 `base.css` 各掛 theme。
4. 實作 `build/check-sources.mjs`,掃 KB 與 drafts:每 claim 有 `[S0X]`;無未標 `status`;`reported-excluded` 不在 ai-user / general 正文;`official-beta` 帶 beta 標記。
5. CJK 字型:macOS PingFang TC;Linux/CI 安裝 Noto Sans/Serif CJK TC。跑 `smoke/cjk-test.html` 確認無豆腐字。

## 必守不變式（摘要）
- 視覺/圖唯一所在 `design/` + `assets/`（軸）。
- 具體版本號放 `package.json`,不寫入 README / AGENTS（#10 末）。

## 驗收
- `node build/build.mjs` 產出三份 PDF;頁數落在各版區間。
- `node build/check-sources.mjs` 全綠;CJK 正常。

## 給 Claude Code 的一句話
> 沿用前作 build/base.css 改色票;依 drafts 佔位畫 D/M 系列 SVG;實作 check-sources.mjs;Markdown→HTML→PDF 產出三份;跑 CJK smoke test;依驗收自檢。
