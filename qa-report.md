# qa-report.md — 稽核與引用查核（Phase 7）

> 對應 `docs/PLAN.md` §11、`tasks/07-audit-and-citation.md`。逐條查核引用與邊界,評估 v1.0 釋出門檻。
> 稽核基準日期:2026-06-24（專案內容基準 2026-06-23）。對應產出版本:v0.9 build。

## 1. 自動化反漂移檢查（`node build/check-sources.mjs`）

```
KB 條目：96　已登錄來源：20　active：14
WARN（1）：active 來源 S10 未被任何 KB 引用
✓ 反漂移檢查全綠（不變式 2/3/5/6/8 機器可檢部分通過）。
退出碼：0
```

| 檢查（不變式） | 結果 |
| --- | --- |
| #2 每條 KB 有 `[S0X]` + 合法 `status` | ✅ 96/96 |
| #3 KB/草稿引用之 S-code 皆登錄於 source-index | ✅ 無未登錄引用 |
| #3 報導不得作來源（reported-excluded 不帶 S-code） | ✅ KB-012 無 S-code |
| #5 `reported-excluded` 不入 ai-user / general 正文 | ✅ 0 命中 |
| #6 `official-beta` 數字於草稿帶 beta 標記（區塊級） | ✅ 無違規區塊 |
| #8 受眾規格選材涵蓋 KB `audiences` 欄位 | ✅ dev 95 / ai-user 75 / general 39 全覆蓋 |

> **WARN 說明**:S10(Foundation Models 文件)已登錄且已存檔,但目前無 KB 條目引用,屬可接受的保留來源(供未來開發者章節深掘)。非失敗。

## 2. 來源存檔完備性（`sources/primary/`）

14/16 active 來源已存為 HTML 快照(HTTP 200,title 與描述相符,擷取日 2026-06-24)。

| 狀態 | S-code |
| --- | --- |
| ✅ 已存檔 | S01 S02 S03 S04 S05 S06 S07 S08 S09 S10 S11 S12 S13 S-PCC1 S-PCC2 |
| ⚠ 缺口（URL 待補） | **S14**(NVIDIA 官方頁:source-index 未填具體 URL,依不變式 3 不臆造) |
| 🔒 刻意不存檔 | **S-PCC3**(Apple PCC 受限碼,依不變式 9 僅連結) |
| ⏳ pending | S15 / S16 / S17（`forthcoming`,官方尚未發布） |

## 3. 引用抽查：所有 `official-beta` 數字（重點）

逐條核對草稿中的 beta 數字 → KB → 來源,並確認帶 beta 標記。

| KB-id | claim 摘要 | 來源 | beta 標記 | 抽查 |
| --- | --- | --- | --- | --- |
| KB-022 | Core general text 偏好 45.6%（vs 23.3%） | S01 | ✓ | 通過 |
| KB-023 | Core image understanding 偏好 >61% | S01 | ✓ | 通過 |
| KB-026 | Cloud general text 偏好 64.7%（vs 8.7%） | S01 | ✓ | 通過 |
| KB-027 | Cloud single-sided 滿意度 +36% / IF +21% | S01 | ✓ | 通過 |
| KB-028 | Cloud image understanding 37.8%（vs 9.6%） | S01 | ✓ | 通過 |
| KB-041 | Cloud Pro vs Cloud +10%/+14%/+14% | S01 | ✓ | 通過 |
| KB-063 | 評測哲學（反映當前開發階段） | S01 | ✓ | 通過 |
| KB-064 | TTS MOS 4.15/4.24（prod 3.87/3.82） | S01 | ✓ | 通過 |
| KB-065 | Dictation Overall 44.7%（vs 17.6%） | S01 | ✓ | 通過 |

- dev 版另設「評測數字速查表」集中呈現,每列標 `beta 快照`。
- ai-user 版僅取重點數字並標 beta;general 版依設計**略去**評測數字。

## 4. 引用抽查：所有 T2（合作方官方）事實（重點）

確認每條 T2 事實在草稿中**標明來源方**、未冒充 Apple 官方(不變式 4)。

| KB-id | claim 摘要 | 來源 | 文中來源方標示 | 抽查 |
| --- | --- | --- | --- | --- |
| KB-038 | NVIDIA GPU(Blackwell)承擔 server 推論 + CC | S02, S13, S14 | 「來源方:Apple / Google Cloud / NVIDIA」 | 通過 |
| KB-039 | Intel CPU with TDX 角色（非主要運算） | S02, S13 | dev 明述「官方未表示模型主要在 CPU 執行」 | 通過 |
| KB-040 | Google Titan 硬體 root of trust | S02, S13 | 「來源方:Apple / Google Cloud」 | 通過 |
| KB-055 | Google Cloud serving platform | S13 | 「合作方官方…Google Cloud 說」 | 通過 |
| KB-056 | Google Cloud TDX/CC/Blackwell/path | S13 | 同上區塊標 Google Cloud | 通過 |
| KB-057 | NVIDIA Blackwell + CC 支援 server 推論 | S14 | 「NVIDIA 說」 | 通過 |

- SynthID(KB-032/034,來源 S04 Apple)為「Google 技術」之事實:三版皆標明 **Google / Google DeepMind**(dev/ai-user/general 各 5/3/3 處)。

## 5. 邊界與聲明檢查

| 項目 | 結果 |
| --- | --- |
| `reported-excluded`(KB-012)僅在 dev 附錄 A 且標「報導,非官方」 | ✅(dev 1 處;ai-user/general 0) |
| 無 KB 外事實(草稿引用之 S-code 全部來自 KB/source-index) | ✅ |
| 無未公開規格臆測(KB-084 列為「官方尚未公開」,不填補) | ✅ 三版皆未臆測參數量/拓撲 |
| `forthcoming` 僅標明待發布(S15/S16/S17、KB-054/085) | ✅ |
| 「非官方科普」聲明 | ✅ 三版封面 + 開頭皆含 |
| 商標聲明(Apple/PCC/Gemini/Google/NVIDIA/Blackwell) | ✅ 三版皆含 |

## 6. CJK / 排版 / 連結

- **CJK 渲染**:`build/smoke/cjk-test.html` 涵蓋常用字、全形標點、易缺字;PDF 以 `pdftotext` 擷取可得「繁體中文」「隱私」「雲端」等**可選取真實文字**(非點陣),確認字型嵌入正常、無豆腐字。macOS 用 PingFang TC;Linux/CI 需 Noto Sans/Serif CJK TC。
- **圖**:D1–D4(dev)、M1–M4(general)SVG 於 build 時 inline 進 HTML,PDF 內為向量圖,無外部相依、無破圖。
- **連結**:內部相對路徑(`sources/`、`docs/`)指向實際檔案;外部 URL 僅出現於來源清單與 `_fetch-log.md`。

## 7. 產出與頁數

`node build/build.mjs` 一鍵產出三份 PDF(可重現):

| PDF | 頁數 | 目標區間 | 狀態 |
| --- | --- | --- | --- |
| AFM3-開發者版.pdf | 36 | 28–40 | ✅ 區間內 |
| AFM3-AI使用者版.pdf | 20 | 14–22 | ✅ 區間內 |
| AFM3-普羅大眾版.pdf | 15 | 12–18 | ✅ 區間內 |

> **頁數達標方式(誠實揭露)**:三份皆落入 PLAN §4 目標區間。達標**並非以放大留白灌水**,而是兩個正當手段並用:
> 1. **忠實擴充內容**(不新增 KB 外事實):dev 增列「設計觀察」「IFP 取捨深掘」「Gemini 措辭辨析」「五要求對照表」「2024 vs GCP 對照表」「評測速查表」「驗證實戰」;ai-user 增列「常見誤解」「保管箱比喻」「對你的意義」段;general 增列比喻、FAQ。
> 2. **受眾別版式**:dev 為技術參考、ai-user 為指南、general 為手冊,三者皆採「每個 `##` 小節自新頁起」(`theme-*.css` 的 `main h2 { break-before: page }`)。此為各該文體常見的可翻閱版式,屬視覺軸(`design/`)的設計選擇,非內容灌水;`#` 主線分隔不單獨佔頁。
>
> 短篇小節因此每節獨立成頁;若日後偏好更密集排版,移除該則 CSS 即可回到連續流(dev≈22 / ai-user≈11 / general≈10),內容不受影響。

## 8. v1.0 釋出門檻評估

| 門檻(PLAN §3.2「必達」) | 結果 |
| --- | --- |
| 三份 PDF 可由 `build` 一鍵產出 | ✅ |
| 每條 claim 對應 source-map 的 S-code | ✅(source-map 96 條;草稿引用零未登錄) |
| 無未標記的非官方陳述 | ✅(報導僅 dev 附錄並標記) |
| CJK 正常渲染 | ✅ |
| `check-sources.mjs` 全綠 | ✅(退出碼 0,僅 1 WARN) |

**結論:達 v1.0「必達」門檻,三份頁數亦落入目標區間,可作 v0.9 候選釋出。** 待處理(非門檻):

1. **頁數**(§7):dev 36 / ai-user 20 / general 15,**皆在目標區間內** ✅。
2. **S14 URL**(§2):source-index 補上 NVIDIA 官方頁網址後存檔(唯一存檔缺口)。
3. **「應達」項**:受眾差異僅由 `audiences/*` + theme 驅動 ✅;事實零重複 ✅;beta 標記齊 ✅。
4. **「加分」項**(✅ 已做):
   - **雙語 EN**:6 份 PDF（繁中 3 + EN 3，34/20/14 頁皆在區間）;EN 草稿共用同一 KB 與 `[S0X]`;`check-sources` 已擴及 EN（報導隔離繁中/EN 皆檢）。
   - **Web 版**:`dist/web/*.html` + `index.html`（自包含,inline CSS/SVG;`@media screen` 版式）。
   - **CI**:`.github/workflows/ci.yml`（Noto CJK + Chromium → check-sources → check-links → build → artifacts）。
   - **連結檢查**:`check-links.mjs`;20 個外部來源 URL 實測全 200。
   - **EN 版圖(已完成)**:`assets/{diagrams,illustrations}/en/` 之 D1–D4、M1–M4 英文標籤圖,EN 草稿已內嵌(已視覺確認)。
   - **內容深化(已完成)**:自前作深掘 PCC Security Guide 級細節 → KB-112–124 + 2026 補充 KB-125/126;KB 96→111;dev 版新增「PCC 深層機制」與「可驗證界線(無 reproducible builds)」段。

## 9. 釋出後（里程碑 M6，待 S15）

夏季 technical report(S15)發布後:更新 §3 所列 `official-beta` 條目為正式數字、解除 beta 標記、記於 `docs/CHANGELOG.md` 並 bump 版本;更新版 PCC Security Guide(S16)、Confidential Computing Summit(S17)落地後補 PCC-on-GCP 細節與存檔。

---

## PDF/Web Design Implementation Audit

### Date

2026-06-28

### Scope

- PDF visual system
- Web reader UI
- Source reference visibility
- Status-sensitive wording visibility
- Diagram container presentation
- Bilingual layout consistency

### Files Changed

- `design/base.css` — 新增 citation/status tokens；強化 `.source-ref`、`code.status-pill`、`th/td`、`blockquote`、`.diagram-figure`/`figcaption`、`.cover`；新增 `code:has(>.source-ref)` 清理巢狀來源碼；強化 screen 層 `.topnav`、`.topnav .lang`、`.search-hit`、`.reader-tools-inner`；補 `break-inside: avoid` / `break-before: avoid`。
- `design/theme-dev.css` — `--accent-strong`；h2 左側技術導軌；`pre` 左 rail；圖表/figcaption 工程化；`.source-ref` 方正化。
- `design/theme-ai-user.css` — `--accent-strong`；h2 圓角導引標記（`::before`）；callout 圓角；評估清單去項目符號 + 放大勾選框。
- `design/theme-general.css` — `--accent-strong`；圖表容器更柔和圓潤；h2 較粗圓底線；FAQ 粗體 lead 加大；`.source-ref` 邊框柔化（仍可見）。
- `build/md2html.mjs` — 兩個保守 transformation：(1) `markSourceRefs()` 於 PDF 模式把 `[S0X]` 標為 `<span class="source-ref">`（鏡像 web 的 `linkSourceRefs`，但非連結）；(2) `markStatusLabels()` 把整段內容為 `official-beta`/`forthcoming`/`reported-excluded` 的 inline `<code>` 加 `status-pill` class。兩者皆不改文字內容、不翻譯。

### Checks Run

- `npm run check`（check-sources）→ ✅ 全綠（唯一 WARN：S10 未被引用，為既有、非本次造成）。
- `npm run check:links` → ✅ 通過（43 .md，24 內部連結，21 外部 URL）。
- `npm run build:web` → ✅ 6 web HTML + sources + index。
- `npm run build` → ✅ 六份 PDF 全部產出（dev/ai-user/general × 繁中/EN）。
- `pdftotext` 抽查：dev PDF 內 `[S01]`、`official-beta`、`forthcoming`、CJK（繁體中文／機密運算）皆為**可選取真實文字**。
- Playwright 截圖（`artifacts/screenshots/`）：web-index/dev/ai-user/general/dev-en + pdf-dev-section。
- `npm run check:links:external` → 未跑（避免非必要外部網路抽查；非本次範圍）。

### PDF Findings

- 來源碼 `[S0X]` 由原本的普通 inline code 變為**藍/主題色 citation pill**（PDF 模式經 `markSourceRefs` 標記），與 Web 視覺一致；文字仍為 `[S01]`，可選取。
- `official-beta` / `forthcoming` 變為**狀態 pill**（米黃 beta／淡藍 forthcoming），與一般 inline code 區隔；`official` 維持普通 code（刻意不弱化、也不誇大）。
- 表格標題列對比更強（主題色字 + accent 底線）；`blockquote`、`.diagram-figure` 加 `break-inside: avoid`，caption `break-before: avoid`，降低跨頁斷裂。
- 封面 kicker 加分隔線、audience 改為帶框標籤，層級更清楚但仍非官方品牌風。

### Web Findings

- sticky `.topnav` 加陰影/分隔更明顯；語言切換 `.topnav .lang` 變為**主題色外框按鈕**（hover 反白），更像切換鍵。
- `.search-hit` 加 hover/focus 背景與 focus-visible；`.reader-tools-inner` 加頂部 accent 與柔和陰影（桌面 sidebar 仍維持無陰影）。
- `.source-ref` hover/focus 反白，更像可點引用；巢狀多來源碼（如 `[S01][S02]`）去除 code 外框、只留 pill。
- 三受眾 theme 在 Web 與 PDF 皆採同一邏輯，僅色彩/密度不同。

### Source Reference Findings

- 來源可見性**提升**，未弱化、未移除。Web 182 個 `.source-ref` 連結；PDF 182 個 `.source-ref` span（與 web 對齊）。
- 未註冊代碼 `[S0X]`（圖例佔位）不被標記（`sourceCodes()` 不含），行為正確。

### Status-sensitive Wording Findings

- `official-beta`（dev 5 處）、`forthcoming`（dev 7 處）轉為 pill，語意更顯眼；EN 版同樣（beta 4／forthcoming 4）。
- `beta 快照` / `beta snapshot` 為純文字、未改動（未弱化）。
- `reported-excluded` 不出現於草稿正文（與既有反漂移一致），故無 pill；其 CSS class 已備妥供來源頁等處。
- 視覺上未把 beta/forthcoming 呈現為 final 或 already published。

### Bilingual Findings

- 繁中與 EN 共用 base + 同一 theme CSS（`render.config.json` 對應），視覺邏輯一致。
- source IDs 與 status pill 在雙語版本皆可見、皆未弱化；樣式/版面未使任一語言 claim 更強或更弱。

### Diagram Findings

- `.diagram-figure` 成為更明確的圖卡（頂部 accent、`break-inside: avoid`、caption 與圖同頁、左對齊或置中依受眾）。
- 未改任何 SVG；未新增節點/箭頭/事實結構；D 系列仍技術、M 系列仍比喻。

### Known Limitations

- `code:has()` 依賴 Chromium `:has()`（Playwright 1.49 之 Chromium 支援）；若未來改用不支援的渲染器，巢狀來源碼會退回「pill 外仍有 code 外框」，仍可讀，非破版。
- `--paper-soft` zebra 底色為全域淡色，未針對 general 暖色另調（影響極小）。
- 首頁 `index.html` 由 `build.mjs` 自有 inline style 產生，本次未調整（非 reader UI 範圍）。

### Needs Human Review

- 無。本次未修改任何核心技術內容（KB／sources／drafts）。

### Visual Evidence

- 本地產生、未納入版本控管（`artifacts/` 已列入 `.gitignore`），可由 build 輸出 + Playwright 重現：
  `artifacts/screenshots/web-index.png`、`web-dev.png`、`web-ai-user.png`、`web-general.png`、`web-dev-en.png`、`pdf-dev-section.png`。

---

## AFM3 v1.3 — Conservative Bilingual Readability + Audit Mode + Global Debug Pass

### Date

2026-06-30

### Scope

呈現層 + 治理層。新增 Reading/Audit Mode、status legend、per-page footer metadata、callout 變體分類、設計／治理文件、`debug-web.mjs`;`content/drafts/*` 僅做保守可讀性整理。**未變更**事實來源層（`sources/*`、`content/knowledge-base.md`、`content/audiences/*` 零 diff）。

### Reading/Audit Mode Debug

- Mode toggle present: Yes（reader-tools 內,7 個 reader page 皆有;PDF 無）
- DOM mode state changes: Yes（`<html data-reader-mode="reading|audit">`,Playwright 實測點擊後切換）
- localStorage persistence: Yes（`afm-reader-mode`;reload 後保留 audit;early head script 防 FOUC）
- Source refs visibly change: Yes（reading soft pill → audit 主題色填滿,Playwright 實測 bg 由 `rgb(233,241,253)` → `rgb(11,95,212)`）
- Status labels visibly change: Yes（pill border 1px→2px、font 12→12.6px）
- Boundary callouts visibly change: Yes（bg accent-soft → 邊界紅,border-left 5px→7px;misconception 同步）
- TOC/reader tools visibly change: Yes（reader-tools 頂部 accent → 邊界紅;status-legend 加框）
- Mobile mode toggle checked: Yes（375px viewport 下切換器可見、可用）
- English pages checked: Yes（dev-en / ai-user-en / general-en 皆驗證）
- PDF excludes Web-only toggle: Yes（`pdftotext` 抽查:`data-reader-mode` / `閱讀模式` / `稽核模式` / `Reading` / `Audit` / `搜尋本頁` / `最後更新` 皆 0 命中）

> 機制：PDF 由 `renderDocument(web:false)` 產生,不含 reader-tools、mode 屬性、toggle script;`@media screen` + `[data-reader-mode="audit"]` 雙重保證 audit 規則不入 PDF。未使用 `!important`。

### Bilingual QA

- Traditional Chinese pages present: Yes（dev / ai-user / general）
- English pages present: Yes（dev-en / ai-user-en / general-en）
- Language switcher present: Yes（6 個 edition 頁;sources 頁無對應語言版本,按設計不含）
- English pages are source-aligned: Yes（誤解 callout 與繁中語意對齊,未新增反駁 claim）
- English-only claims added: No
- Source references preserved across languages: Yes（drafts diff 僅新增 `[S01]`/`[S02]`/`[S-PCC2]`,皆既有且登錄;無移除）
- Status labels preserved across languages: Yes（`official-beta` / `forthcoming` / `reported-excluded` 語意未變,未弱化）
- Limitation / uncertainty wording preserved across languages: Yes（「未提供 reproducible builds」「官方未說明」等限制語完整保留;boundary 段僅段落→callout 之非事實格式化）
- Bilingual term map added or updated: Yes（新增 `docs/BILINGUAL_TERMS.md`;既有 `docs/wiki/bilingual-term-map.md` 維持）

### Design / knowledge reference attribution

- google-labs-code/design.md referenced: Yes（`DESIGN.md` §16 / `docs/DESIGN_REFERENCES.md`）
- OpenKnowledge / OKB referenced: Yes（同上;標明不複製程式碼、不引入 GPL）
- Material for MkDocs referenced: Yes
- GOV.UK Design System referenced: Yes
- GitHub Primer referenced: Yes
- U.S. Web Design System referenced: Yes

### License / copying safety

- Copied third-party UI code: No
- Imported OpenKnowledge code: No
- Imported GPL-covered code: No（dependencies 仍為 markdown-it / markdown-it-attrs / playwright / firebase-tools）
- Claimed third-party endorsement: No
- Claimed Apple affiliation or Apple visual identity: No

### Files Changed

- 修改：`DESIGN.md`、`design/base.css`、`build/md2html.mjs`、`build/build.mjs`、`package.json`、`content/drafts/{dev,ai-user,general}.md`、`content/drafts/en/{dev,ai-user,general}.md`、`docs/CHANGELOG.md`、`qa-report.md`。
- 新增：`design/readability.md`、`design/component-contract.md`、`docs/KNOWLEDGE_GOVERNANCE.md`、`docs/BILINGUAL_GOVERNANCE.md`、`docs/BILINGUAL_TERMS.md`、`docs/DESIGN_REFERENCES.md`、`build/debug-web.mjs`。
- factual source layer（`sources/*`、`content/knowledge-base.md`、`content/audiences/*`）：**零 diff**。

### CSS Cascade Debug

- `.source-ref` / `code.status-pill`：audit 覆寫以屬性+類別選擇器（specificity > base 與 theme 的 `.source-ref`），實測生效。
- `@media print` 未誤套 web；audit 規則全置於 `@media screen` 且依賴 `[data-reader-mode]`（PDF 無此屬性）。
- 三受眾 theme 差異維持（token 覆寫未動）；mobile breakpoint 未吃掉 mode 差異（audit 規則於獨立 `@media screen` 區塊,各寬度皆套用）。
- 未使用 `!important`。

### Generated HTML / PDF / Checks

- `npm run check` → ✅ 全綠（唯一 S10 WARN,既有）。
- `npm run check:links` → ✅（49 .md,25 內部連結,21 外部 URL）。
- `npm run build:web` / `npm run build` → ✅ 6 web HTML + sources + index + 六份 PDF。
- `npm run debug:web` → ✅ pages 7,source-refs 684,status pills 51,callouts 51,mode toggle/legend/footer/CSS selector 全部齊備,missing items: none。
- `pdftotext` 抽查：CJK（繁體中文／隱私／常見誤解／可驗證的界線）可選取;`official-beta`、`[S01]`、`Common misconception` 皆在;web-only UI 0 命中。
- PDF 頁數：dev 39/38、ai-user 20/20、general 15/15（皆在 PLAN §4 目標區間）。

### Needs Human Review

- 無核心事實層改動。建議人工複閱新增之誤解 callout 文字（繁中/英文各 1 段 dev、1 段 general;ai-user 為既有清單轉 callout）以確認語氣,但內容均為既有 `[S01]`/`[S02]` 事實之歸納。
