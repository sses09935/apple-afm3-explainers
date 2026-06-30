# AFM 3 Explainers

[![CI](https://github.com/sses09935/apple-afm3-explainers/actions/workflows/ci.yml/badge.svg)](https://github.com/sses09935/apple-afm3-explainers/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Release](https://img.shields.io/badge/release-v2.0.0-blue.svg)](https://github.com/sses09935/apple-afm3-explainers/releases/latest)

把 Apple **第三代 Foundation Models（AFM 3）** 與 **PCC on Google Cloud**,
做成 **三份受眾不同、繁中＋英文雙語的 PDF**。每份以同一三條主線**介紹 AFM 3**:
**是什麼（五個模型）→ 如何運作（架構與部署）→ 代表什麼（隱私、能力與取得）**。

| 版本 | 受眾 | 目標頁數 | 風格 |
| --- | --- | --- | --- |
| `AFM3-開發者版.pdf` | 懂 LLM 架構／TEE／attestation | 28–40 | 技術參考 + 架構圖 + 驗證實戰 |
| `AFM3-AI使用者版.pdf` | 常用 ChatGPT／Claude／Gemini 的人 | 14–22 | 概念 + 類比 + 評估清單 |
| `AFM3-普羅大眾版.pdf` | 零技術背景 | 12–18 | 大圖 + 比喻 + FAQ |

> 本作為 [`apple-pcc-privacy-explainers`](https://github.com/sses09935/apple-pcc-privacy-explainers) 的 **2026 續章**:前作講 PCC（Apple silicon,2024 世代）的 AI 隱私;本作講 AFM 3 五模型 + PCC 擴展到 Google Cloud,並沿用前作的 PCC 基礎事實。

## 三條主線（每份都回答）

- **是什麼**:五個模型——AFM 3 Core、AFM 3 Core Advanced、AFM 3 Cloud、ADM 3 Cloud（Image）、AFM 3 Cloud Pro——各自的定位與分工。
- **如何運作**:端側 sparse 架構（IFP、NAND 全權重 + DRAM 選擇性載入、per-prompt routing）、PCC 的 PT-MoE 升級、PCC on Google Cloud 的 confidential computing 堆疊（NVIDIA CC / Intel TDX / Google Titan）。
- **代表什麼**:資料去哪、PCC 隱私邊界、能力提升、能不能用／在哪用。

## 設計原則：單一真實來源 + 反漂移

事實只定義一次（`content/knowledge-base.md`），三份文件只是不同視角的再框架。四正交軸 + 一條時效軸,任一改動只碰一個檔:

| 軸 | 唯一所在 |
| --- | --- |
| 事實 | `content/knowledge-base.md`（每條附 `[S0X]` + `status:`） |
| 來源 | `sources/source-index.md`（分層官方:T1 Apple／T2 合作方）+ `source-map.md`（claim→S0X） |
| 受眾差異 | `content/audiences/*` + theme CSS |
| 視覺／圖 | `design/*` + `assets/` |
| 狀態／時效 | KB 條目的 `status:`（`official` / `official-beta` / `forthcoming` / `reported-excluded`） |

規則由 [`AGENTS.md`](AGENTS.md) 的 10 條不變式強制執行。完整計畫見 [`docs/PLAN.md`](docs/PLAN.md)。

## 目錄結構

```
docs/        PLAN.md（完整計畫）、GLOSSARY.md（術語表）、CHANGELOG.md（含事實更新追蹤）
sources/     source-index.md（唯一來源清單,S01–S18 分層官方）、source-map.md（claim→S0X）、primary/（頁面存檔）
content/     knowledge-base.md（唯一事實庫,KB-001…）、audiences/（受眾規格）、drafts/（三份草稿）
design/      base.css + theme-*.css + diagrams.md
assets/      diagrams/（D 系列 SVG）、illustrations/（M 系列大眾版插圖）
build/       build.mjs、md2html.mjs、render.config.json、check-sources.mjs、smoke/cjk-test.html
dist/        產出的三份 PDF
tasks/       每階段一支提示（00–07）
```

## 如何 build

> 管線：`Markdown → HTML → PDF`（Playwright Chromium 列印），三份共用 `base.css`,各掛 theme CSS。
> 詳見 `docs/PLAN.md` §10（技術架構）。

```
npm install                  # 安裝 Playwright 等相依
# CJK 字型：macOS 可用系統內建 PingFang TC；Linux/CI 需安裝 Noto Sans/Serif CJK TC
npm run build                # md → html → dist/*.pdf（六份，含雙語）+ dist/web/*.html
npm run build:web            # 只產 web HTML + index（不啟動 Playwright，快）
npm run check                # 反漂移檢查（見下）
npm run check:links          # 內部連結/圖檔存在性
npm run check:links:external # 另抽查外部 URL 可達性（需網路）
npm run verify               # check + check:links + build 一次跑完
npm run debug:web            # 生成 HTML 除錯（mode toggle / source-ref / status pill / callout / footer）
```

## 雙語與 Web 版

- **雙語**:每份文件有繁中與英文版（共 **6 份 PDF**）。語言由 `build/render.config.json` 的 `lang` 欄位驅動,封面字串自動切換;事實與 `[S0X]` 引用兩語共用同一 KB。
  - 繁中:`dist/AFM3-{開發者,AI使用者,普羅大眾}版.pdf`
  - English:`dist/AFM3-{Developer,AI-User,General}.pdf`
- **Web 版**:同一渲染器另輸出 `dist/web/*.html`（自包含,inline CSS/SVG）與 `dist/web/index.html` 索引頁;`base.css` 內含 `@media screen` 版式（分頁僅作用於列印）。
- **品質檢查**:本 repo **無 GitHub Actions workflow**;反漂移、連結與除錯檢查改為本地手動執行(`npm run check`、`npm run check:links`、`npm run debug:web`、`npm run build`)。
- **Firebase Hosting**:web 版部署於 Firebase Hosting(專案 `apple-afm3-explainers`)。
  - **線上網址**:<https://apple-afm3-explainers.web.app>
  - 設定:`firebase.json`(`public: dist/web`、`cleanUrls`、predeploy 自動 `npm run build:web`)、`.firebaserc`(預設專案)。
  - 部署:`npm run deploy`(= `firebase deploy --only hosting --project apple-afm3-explainers`;**明示 `--project` 以免誤發到其他專案**)。需先 `firebase login`。

## 反漂移檢查

`check-sources.mjs` 會驗證:每條 claim 都有 `[S0X]`;無未標 `status` 的陳述;`reported-excluded` 未出現於 AI 使用者版／普羅大眾版正文（繁中與 EN 皆檢）;`official-beta` 數字皆帶 beta 標記。`check-links.mjs` 驗證內部連結/圖檔存在(離線)與外部 URL 可達(`--external`)。逐條引用查核記於 `qa-report.md`（Phase 7）;官方原文查核記於 `sources/verification-2026-06-24.md`。

## 設計系統（Design system）

本 repo 內含 [`DESIGN.md`](DESIGN.md),定義 AFM3 explainers 的視覺與版式規則:PDF 樣式、Web 呈現、圖表、source 標籤、status 標籤、雙語版式與三受眾密度(圖表細則另見 [`design/diagram-style.md`](design/diagram-style.md))。

`DESIGN.md` **不**定義技術事實;技術事實仍以 `content/knowledge-base.md` 為準,來源權威仍以 `sources/source-index.md` 與 `sources/source-map.md` 為準。

延伸文件:[`design/readability.md`](design/readability.md)(可讀性規則)、[`design/component-contract.md`](design/component-contract.md)(component 契約)、[`docs/KNOWLEDGE_GOVERNANCE.md`](docs/KNOWLEDGE_GOVERNANCE.md)、[`docs/BILINGUAL_GOVERNANCE.md`](docs/BILINGUAL_GOVERNANCE.md)、[`docs/BILINGUAL_TERMS.md`](docs/BILINGUAL_TERMS.md)、[`docs/DESIGN_REFERENCES.md`](docs/DESIGN_REFERENCES.md)。本系列為 Apple AI Explainers Series 之 AFM3 專題(與 PCC 對齊但獨立)。

**Reading Mode / Audit Mode**:web 版提供單一 DOM 狀態 `data-reader-mode`(`reading` 預設、`audit`)的閱讀／稽核切換,`localStorage` 記憶,停用 JS 時預設 Reading;PDF 不含此 web-only 切換。詳見 `DESIGN.md` §18。

## Wiki 導航層（Wiki layer）

[`docs/wiki/`](docs/wiki/) 提供給維護者與 AI agent 的導航檔案,將 claim 對應到 source、status、KB 位置、受眾草稿、語言版本與圖表:

- `claim-index.md` — claim → source → status → KB → audience → language → diagram 索引。
- `source-authority-map.md` — 來源權威層級與邊界。
- `status-dashboard.md` — `official-beta` / `forthcoming` / `reported-excluded` 更新風險追蹤。
- `bilingual-term-map.md` — 繁中／英文術語對照。
- `audience-route-map.md` — 同一事實基礎如何分眾與雙語重述。

wiki 層**僅作導航**,不得新增事實;與 KB / 來源檔衝突時以後者為準。

## 雙語與 status 維護（Bilingual and status maintenance）

AFM3 產出橫跨繁體中文與英文素材;兩語版本須保有相同的事實意義、來源引用與 status 標籤。`docs/wiki/status-dashboard.md` 追蹤 `official-beta`、`forthcoming`、`reported-excluded` 的更新風險,但權威 status 標籤仍在 `content/knowledge-base.md`。後續可由 `tasks/08–11`(設計／wiki／雙語漂移／status 更新稽核)執行對應稽核。

## 執行階段（Phase 0 → 7）

0. 研究擷取 → `sources/source-map.md` + `primary/` 存檔（起點已具備:官方事實彙整可作 Phase 0 產物）
1. 建事實庫 → `content/knowledge-base.md` + `docs/GLOSSARY.md`
2. 定義受眾 → `content/audiences/*`
3–5. 三份草稿（共用同一 KB,可並行）
6. 設計與渲染 → `design/*` + `assets/*` + `build/*` + `dist/*.pdf`
7. 稽核與引用查核 → `qa-report.md`

## 來源與授權

- 內容**僅**引用 `sources/source-index.md` 之來源,分兩層:
  - **T1 — Apple 官方**（`machinelearning.apple.com`、`security.apple.com`、`apple.com/newsroom`、`developer.apple.com`）。
  - **T2 — 合作方官方**（Google Cloud、NVIDIA),**僅限**其官方對 confidential computing 堆疊所做的聲明,且文中標明來源方。
  - 第三方報導／詮釋(如金額、參數量、distillation 等)**不**作為事實來源。
- 本 repo 為**獨立的科普／教育用途**說明文件,**非** Apple／Google／NVIDIA 官方出版品,與各該公司無隸屬關係。
- "Apple"、"Private Cloud Compute"、"Apple Intelligence"、"Gemini"、"Google"、"NVIDIA"、"Blackwell" 等為各自所有人之商標,僅作指稱與說明之用。
- Apple／Google 受限用授權、禁止再散布之原始碼**不包含**於本 repo;如需請逕至官方取得。
- 評測數字為官方 beta 階段快照;Apple 已預告今夏稍晚發布 technical report,屆時依 `CHANGELOG.md` 逐條校正。

### 授權（License）

本專案（文字、圖表、build 腳本）以 **Apache License 2.0** 釋出,全文見 [`LICENSE`](LICENSE)。

```
Copyright 2026 Nick Lian (github.com/sses09935)
Licensed under the Apache License, Version 2.0.
```
