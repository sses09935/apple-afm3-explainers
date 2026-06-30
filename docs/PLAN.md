# 開源專案計劃書 — `apple-afm3-explainers`

> **專案全名**:第三代 Apple Foundation Models（AFM 3）與 PCC on Google Cloud — 受眾分眾說明白皮書
> **定位**:`apple-pcc-privacy-explainers` 的 **2026 續章**。前作講「PCC（Apple silicon,2024 世代）的 AI 隱私」;本作講「AFM 3 五模型架構 + PCC 擴展到 Google Cloud（confidential computing）+ 與 Google/Gemini 的合作」。
> **語言 / 授權 / 性質**:繁體中文;Apache-2.0;**非官方科普／教育用途**,與 Apple、Google、NVIDIA 無隸屬關係。
> **維護模式**:單一維護者 + AI agent 作為執行層(Architect / Tech Lead / Executioner 三層)。
> **基準日期**:2026-06-23

---

## 1. 動機與問題

2026-06-08 起,Apple 一次釋出兩件事:第三代 AFM(五個模型)與 **PCC 首次擴展到第三方資料中心(Google Cloud + NVIDIA GPU)**。但官方資訊**高度分散**——散落於 Apple ML Research、Apple Security、Apple Newsroom(主稿／功能稿／開發者稿/Siri AI/DMA)、Apple Developer(WWDC 議程),再加上 Google Cloud 與 NVIDIA 官方;且坊間報導(金額、參數、distillation 等)與官方說法混雜,易誤讀。

本專案延續前作方法:把這套散落的官方事實,收斂成**單一真實來源**,再產出**三份受眾不同**的繁體中文 PDF,每份沿同一三條主線**介紹 AFM 3**:**這是什麼（五個模型）/ 如何運作（架構與部署）/ 對你代表什麼（隱私與取得）**。

與前作的關鍵差異與新增挑戰:

1. **多方官方來源**:PCC-on-GCP 的 confidential computing 堆疊,有些聲明出自 Google Cloud / NVIDIA(非 Apple),來源治理需擴充為「分層官方」。
2. **官方 vs 報導邊界**:本主題的報導噪音極高(如「10 億美元/年」「1.2 兆參數客製 Gemini」「teacher signal / distilled」),必須以不變式硬性隔離。
3. **beta 快照 + 將更新**:Apple 已預告**今夏稍晚**發布 technical report(更新評測與 benchmarks)。所有評測數字須標記為 beta 快照,並內建更新觸發。

---

## 2. 與既有 PCC 專案的關係 + 範圍界定

### 2.1 倉庫策略(建議:新獨立 repo)

前作 `apple-pcc-privacy-explainers` 已於 **v1.0.0(2026-06-22)code-freeze**。建議**開新獨立 repo** `apple-afm3-explainers`,而非改動前作:

- 主題已從「PCC 本身」擴大到「AFM 3 全貌 + PCC 的 GCP 擴展」,受眾與內容量都不同。
- 前作維持乾淨的 1.0 釋出;本作可自由演進(尤其要等夏季 technical report)。
- 本作將**沿用**前作的 PCC 基礎事實與可重用資產(見 §9 內容遷移)。

> 備選:把本作做成前作的 `v2`/新 content track(monorepo)。不建議,因會破壞前作的凍結狀態與較窄的「Apple-only」來源政策。

### 2.2 範圍(In scope)

- 五模型:AFM 3 Core、AFM 3 Core Advanced、AFM 3 Cloud、ADM 3 Cloud(Image)、AFM 3 Cloud Pro。
- 端側架構:IFP、NAND 全權重 + DRAM 選擇性載入、per-prompt routing、shared/routed experts。
- 伺服器架構:PT-MoE 升級;AFM 3 Cloud 的 32K context + reasoning(開發者可見)。
- 影像:ADM 3 Cloud、Spatial Reframing/adapters、SynthID(Google)。
- **PCC on Google Cloud**:五項核心要求、NVIDIA CC / Intel TDX / Google Titan 堆疊、append-only ledger、雙獨立信任根、推論堆疊隔離、summer preview 漸進上線、後續官方文件。
- 訓練:資料混合、cloud TPU、SFT + multi-stage RL、QAT、Responsible AI。
- Apple × Google/Gemini:**只收官方措辭**。
- 開發者存取:Foundation Models framework、Core AI、多 provider、Small Business 免費 PCC、Xcode 27。
- 可用性:裝置/語言(16 種)/地區(EU/DMA、China)/每日用量。

### 2.3 非目標(Out of scope / Non-goals)

- 不收第三方報導的金額、參數量、distillation 比例等未經官方證實之數字(至多於附錄標記為「報導,非官方」,預設不納入正文)。
- 不臆測官方未公開的模型內部規格(layer count、expert 數、Cloud 參數量等)。
- 不重製、不再散布 Apple/Google 受限授權之原始碼或原文長段落。
- 不做 iOS 27 其他消費功能(家長控管、AirPods EQ、Maps 等)的全面說明,只涵蓋「由 AFM 3 驅動」的部分。

---

## 3. 目標與成功標準

### 3.1 目標

- 產出三份分眾 PDF(見 §4),內容**只引 Apple 官方與合作方官方來源**、每條事實可回溯到來源代碼。
- 維持單一真實來源 + 反漂移:任一事實/來源/受眾差異/視覺改動只碰一個檔。
- 把「官方 vs 報導」「beta 快照 vs 定版」做成可機器檢查的不變式。

### 3.2 成功標準(沿用「通過門檻即可」哲學)

| 等級 | 判準 |
|------|------|
| **必達(門檻)** | 三份 PDF 可由 `build` 一鍵產出;`qa-report.md` 中每條 claim 對應到 `source-map.md` 的 S-code;無未標記的非官方陳述;CJK 正常渲染 |
| **應達** | 受眾差異僅由 `content/audiences/*` + theme CSS 驅動;事實庫零重複定義;評測數字皆帶 beta 標記 |
| **加分(非必要)** | 雙語(繁中 + EN)、HTML web 版、CI 自動 build/連結檢查 |

> 與前作一致:在「失敗有後果」處(來源正確性、官方/報導邊界、引用可回溯)投入;PoC 性質的潤飾(動畫、互動)刻意略過。

---

## 4. 受眾與產出

沿用前作三層(已驗證、適合單一維護者);內容主題改為 AFM 3 + PCC-on-GCP。

| 版本 | 受眾 | 目標頁數 | 風格 | 重點落點 |
|------|------|----------|------|----------|
| `AFM3-開發者版.pdf` | 懂 LLM 架構／TEE／attestation | 28–40 | 技術參考 + 架構圖 + 驗證實戰 | 五模型架構、IFP/PT-MoE、PCC-on-GCP confidential stack、attestation/ledger、評測方法、Foundation Models framework/Core AI |
| `AFM3-AI使用者版.pdf` | 常用 ChatGPT/Claude/Gemini 的人 | 14–22 | 概念 + 類比 + 評估清單 | 五模型各做什麼、資料去哪、Gemini 合作的「官方定位」、每日用量、隱私邊界 |
| `AFM3-普羅大眾版.pdf` | 零技術背景 | 12–18 | 大圖 + 比喻 + FAQ | 端側 vs 雲端、隱私承諾、SynthID 是什麼、能不能用/在哪用 |

> 維持與前作一致的**三種受眾**(不另設第四版),以維持單一維護者可承受的範圍。

每份沿同一三條主線**介紹 AFM 3**:**這是什麼（五個模型）/ 如何運作（架構與部署）/ 對你代表什麼（隱私與取得）**。

---

## 5. 設計原則:單一真實來源 + 反漂移(延伸前作四軸)

事實只定義一次(`content/knowledge-base.md`,每條附 `[S0X]`),三份文件只是不同視角的再框架。前作四軸 + 本作新增第五軸:

| 軸 | 唯一所在 | 本作變更 |
|----|----------|----------|
| 事實 | `content/knowledge-base.md`(每條附 `[S0X]`) | 新增 AFM 3 事實;PCC 基礎沿用 |
| 來源 | `sources/source-index.md` | **擴為分層官方**(Apple / 合作方官方);見 §7 |
| 受眾差異 | `content/audiences/*` + theme CSS | 三種受眾(同前作) |
| 視覺／圖 | `design/*` + `assets/` | 新增 AFM 3 架構圖、五模型路由圖、PCC-on-GCP 信任堆疊圖 |
| **狀態/時效(新增)** | 事實條目的 `status:` 欄位 | `official` / `official-beta` / `forthcoming` / `reported-excluded`;反「過時漂移」 |

---

## 6. 倉庫結構(沿用前作 + 必要新增)

```
docs/
  PLAN.md            # 本計劃書
  GLOSSARY.md        # 術語表(IFP、PT-MoE、TDX、attestation、SynthID…)
  CHANGELOG.md       # 版本與「事實更新」紀錄(tech report 落地後追蹤)
sources/
  source-index.md    # 唯一來源清單(分層:Apple / 合作方官方)
  source-map.md      # claim → S-code 對應
  primary/           # 官方頁面存檔(HTML/PDF 快照 + 擷取日期)
content/
  knowledge-base.md  # 唯一事實庫(每條 [S0X] + status:)
  audiences/         # 受眾規格(dev / ai-user / general[/ policy])
  drafts/            # 三(四)份草稿(共用同一 KB,可並行)
design/
  base.css
  theme-dev.css / theme-ai-user.css / theme-general.css
  diagrams.md        # 圖規格(D 系列)
assets/
  diagrams/          # D1–Dn SVG(五模型、路由、PCC-on-GCP 堆疊…)
  illustrations/     # 大眾版插圖(M 系列)
build/
  build.mjs          # md → html → pdf 驅動
  md2html.mjs
  render.config.json
  smoke/cjk-test.html
  check-sources.mjs  # 反漂移:檢查每條 claim 都有 S-code、無未標記非官方
dist/
  AFM3-*.pdf
tasks/
  00–07 各階段提示
AGENTS.md            # 不變式(見 §12)
README.md
qa-report.md         # 稽核 + 引用查核
LICENSE              # Apache-2.0
.gitignore
```

管線與前作相同:`Markdown → HTML → PDF`(Playwright Chromium 列印),三份共用 `base.css`,各掛 theme CSS。

---

## 7. 來源治理(本作的關鍵升級)

前作政策為「僅 Apple 官方(`security.apple.com` 與 `github.com/apple/*`)」。AFM 3 / PCC-on-GCP 的故事**必然**涉及 Apple 多個官方面與 Google/NVIDIA 官方,故改為**分層官方**:

| 層級 | 收錄範圍 | 用途 |
|------|----------|------|
| **T1 — Apple 官方** | machinelearning.apple.com、security.apple.com、apple.com/newsroom、developer.apple.com、arXiv(Apple 論文) | 模型、訓練、評測、PCC、開發者、可用性 |
| **T2 — 合作方官方** | Google Cloud blog、NVIDIA 官方 | **僅限**其官方對 confidential computing 堆疊所做的聲明 |
| **排除 — 報導/詮釋** | Bloomberg/Gurman、各家解讀(金額、參數、distillation、「no drop of Gemini」等) | **不入正文**;至多於附錄標記「reported,非官方」 |

每條事實標 `status:`;凡 T2 來源的條目須在文中標示來源方(避免讓讀者誤以為是 Apple 官方說法)。

### 7.1 來源索引種子(`sources/source-index.md` 起始)

| S-code | 來源 | 層 |
|--------|------|----|
| S01 | Apple ML Research — Introducing the Third Generation of Apple's Foundation Models | T1 |
| S02 | Apple Security — Expanding Private Cloud Compute | T1 |
| S03 | Apple Newsroom — Apple unveils next generation of Apple Intelligence, Siri AI, and more(主稿) | T1 |
| S04 | Apple Newsroom — Apple Intelligence brings powerful AI capabilities into everyday experiences(功能稿) | T1 |
| S05 | Apple Newsroom — Apple accelerates app development with new intelligence frameworks and advanced tools(開發者稿) | T1 |
| S06 | Apple Newsroom — Apple introduces Siri AI… | T1 |
| S07 | Apple Newsroom — Due to DMA, Siri AI delayed in EU for iOS 27 and iPadOS 27 | T1 |
| S08 | Apple Developer — WWDC26 session 241「What's new in the Foundation Models framework」 | T1 |
| S09 | Apple Developer — WWDC26 Apple Intelligence guide | T1 |
| S10 | Apple Developer — Foundation Models 文件 | T1 |
| S11 | Apple ML Research — Instruction-Following Pruning(arXiv 2501.02086) | T1 |
| S12 | Apple ML Research — Apple Foundation Models Tech Report 2025（PT-MoE 基礎） | T1 |
| S13 | Google Cloud — Powering the next era of Confidential AI | T2 |
| S14 | NVIDIA — Blackwell + Confidential Computing 支援 PCC(官方說明) | T2 |
| S15（保留） | Apple — 第三代 AFM technical report（今夏稍晚） | T1, `forthcoming` |
| S16（保留） | Apple Security — 更新版 PCC Security Guide | T1, `forthcoming` |
| S17（保留） | Confidential Computing Summit talk | T1/T2, `forthcoming` |
| （沿用前作） | Apple 2024 PCC blog、`github.com/apple/security-pcc`、PCC Security Guide(舊版) | T1（PCC 基礎） |

---

## 8. 內容結構(事實庫主幹)

`content/knowledge-base.md` 章節骨架(每條附 `[S0X]` + `status:`):

1. 模型陣容與官方定義 `[S01]`
2. Apple × Google/Gemini 官方措辭 `[S01,S02,S05]`
3. 端側架構:AFM 3 Core Advanced / IFP `[S01,S11]`
4. AFM 3 Core 規格與評測 `[S01]`
5. AFM 3 Cloud / PT-MoE / 32K+reasoning `[S01,S08,S12]`
6. ADM 3 Cloud / 影像 / SynthID `[S01,S04]`
7. AFM 3 Cloud Pro 與硬體角色 `[S01,S02,S13,S14]`
8. PCC on Google Cloud(完整)`[S02,S13,S14]`
9. 訓練資料與流程 `[S01]`
10. Responsible AI(四原則)`[S01]`
11. 評測(beta 快照)`[S01]` ← 全標 `official-beta`
12. 模型驅動的功能 `[S03,S04,S06]`
13. 開發者存取 `[S05,S08,S09,S10]`
14. 可用性(裝置/語言/地區/用量)`[S03,S07]`
15. 官方尚未公開項目(明列)

### 8.1 事實條目 schema(範例)

```md
### KB-027 ADM 3 Cloud 影像浮水印
- claim: 由 Apple Intelligence 生成或編輯的影像,會自動嵌入隱藏 SynthID watermark。
- source: [S04]
- status: official
- note: SynthID 為 Google DeepMind 之內容來源標記技術。
- audiences: { dev: detail, ai-user: concept, general: faq }
```

```md
### KB-041 AFM 3 Cloud Pro 硬體角色（Intel CPU 精準理解）
- claim: 推理由 NVIDIA GPU 承擔;Intel CPUs with TDX 提供 CPU 端 confidential VM/隔離,
  與 NVIDIA CC 共同保護 CPU→GPU 整條 compute path。官方未表示模型主要於 Intel CPU 執行。
- source: [S02], [S13]
- status: official
- audiences: { dev: detail, ai-user: omit, general: omit }
```

```md
### KB-099 「約 10 億美元/年・1.2 兆參數」
- claim: 此為 Bloomberg/Gurman 報導,Apple 未證實。
- source: (報導,非官方)
- status: reported-excluded
- audiences: { dev: appendix-only, ai-user: omit, general: omit }
```

---

## 9. 內容來源／遷移(從前作拉資料)

前作的 PCC 基礎(2024、Apple silicon)是本作的地基,**沿用**而非重寫:

1. **事實**:從前作 `content/knowledge-base.md` 取「PCC 核心五要求、attestation、VRE、transparency」等基礎條目,搬入本作 KB 的「§8 之 PCC 基礎」段,並把來源由前作 S-code 重新對應到本作 `source-index.md`(沿用前作 PCC 來源,新增 S02/S13/S14 的 GCP 擴展)。
2. **視覺**:複用前作 D 系列中與 PCC 信任鏈/attestation 相關的 SVG 作底,延伸出「PCC-on-GCP 信任堆疊圖」「五模型路由圖」。
3. **設計系統**:直接沿用 `base.css` 與 theme 結構,僅改色票與封面。
4. **流程資產**:沿用 `build.mjs`/`md2html.mjs`/`render.config.json` 與 CJK smoke test。

> 你可自行把前作資料夾相關檔案複製進新 repo 對應路徑;或我可以依此計劃,把「PCC 基礎條目 → 本作 KB」「S-code 重新對應表」直接產出成檔。
> **注意**:Apple/Google 受限授權之原始碼與官方原文長段落**不**搬入(維持前作的不再散布原則)。

---

## 10. 技術架構與 build

- **管線**:`Markdown → HTML → PDF`,Playwright Chromium 列印;三份共用 `base.css` + 各 theme。
- **字型**:macOS 用系統 PingFang TC;Linux/CI 安裝 Noto Sans/Serif CJK TC。
- **指令(沿用)**:
  ```
  npm install
  node build/build.mjs        # md → html → dist/*.pdf
  node build/check-sources.mjs # 反漂移檢查(見 §11)
  ```
- 具體版本號一律放 `package.json`,不寫進 `AGENTS.md`/`README`(沿用你的慣例)。

---

## 11. 反漂移與品質機制

延伸前作的「從產出重算、防文件漂移」精神,新增三項對 AFM 3 主題特別重要的檢查:

1. **來源完備性**:`check-sources.mjs` 掃描 KB,任何 claim 缺 `[S0X]`、或出現未標 `status` 的陳述 → 失敗。
2. **官方/報導邊界**:凡 `status: reported-excluded` 的條目若出現在 `general`/`ai-user` 草稿正文 → 失敗(只允許 dev 版附錄)。
3. **beta 時效**:凡 `status: official-beta` 的數字,於文中必須帶「beta 快照、將由夏季 technical report 更新」標記;`CHANGELOG.md` 追蹤 tech report 落地後的逐條更新。
4. **引用查核**:`qa-report.md` 記錄每條 claim 的 source 對應與抽查結果(沿用前作 Phase 7)。

---

## 12. `AGENTS.md` 不變式草案(本作,保持精簡)

只放「永遠載入、本專案專屬」的不變式(版本號等委派 `package.json`):

1. 事實只在 `content/knowledge-base.md` 定義一次;文件為再框架,不得新增未入 KB 的事實。
2. 每條 KB 事實必須有 `[S0X]` 與 `status:`。
3. 來源僅限 `source-index.md` 之 T1（Apple 官方）與 T2（合作方官方);**禁止**以報導作為事實來源。
4. T2 來源的事實,文中須標示來源方(Google Cloud / NVIDIA),不得呈現為 Apple 官方說法。
5. `status: reported-excluded` 不得進入 `general`/`ai-user` 正文。
6. `status: official-beta` 的數字必帶 beta/將更新標記。
7. 官方未公開項目只能列於「未公開」段,不得臆測填補。
8. 受眾差異只能由 `content/audiences/*` + theme CSS 表達,不得在 KB 內分叉事實。
9. 不重製、不再散布 Apple/Google 受限授權碼或原文長段落。
10. 商標(Apple、Private Cloud Compute、Gemini、Google、NVIDIA…)僅作指稱;每份文件含「非官方」聲明。

---

## 13. 執行階段(Phase 0 → 7,對應前作)

0. **研究擷取**:把本對話已彙整的官方事實 + 官方頁面快照 → `sources/primary/` + `source-map.md`。(起點已具備:可用既有「官方完整版」彙整作為 Phase 0 產物。)
1. **建事實庫**:`knowledge-base.md`(含 PCC 基礎遷移)+ `GLOSSARY.md`。
2. **定義受眾**:`content/audiences/*`(dev / ai-user / general)。
3–5. **三份草稿**:共用同一 KB,可並行。
6. **設計與渲染**:`design/*` + `assets/*`(新圖)+ `build/*` → `dist/*.pdf`。
7. **稽核與引用查核**:`qa-report.md` + `check-sources.mjs` 全綠。

---

## 14. 里程碑與時程

| 里程碑 | 內容 | 觸發/相依 |
|--------|------|-----------|
| M0 repo bootstrap | 結構 + AGENTS.md + source-index 種子 + PCC 基礎遷移 | 即可 |
| M1 KB 完成 | 全 15 章事實入庫、皆帶 S-code + status | M0 |
| M2 草稿三份 | dev / ai-user / general drafts | M1 |
| M3 設計與圖 | 五模型/路由/PCC-on-GCP 堆疊圖 + theme | M1 |
| M4 v0.9 build | 三份 PDF 可產出、qa-report 全綠 | M2,M3 |
| M5 v1.0 釋出 | Release + README + 雙語 README(可選) | M4 |
| **M6 事實刷新** | **夏季 technical report(S15)落地後**逐條更新評測、解除 beta 標記 | 待 Apple 發布 |

---

## 15. 風險與緩解

| 風險 | 緩解 |
|------|------|
| 夏季 technical report 改寫數字 → 文件過時 | 評測全標 `official-beta`;M6 專責刷新;CHANGELOG 逐條追蹤 |
| 官方/報導混淆,削弱可信度 | 不變式 3/5 + `check-sources.mjs` 硬性隔離;報導僅附錄標記 |
| T2(Google/NVIDIA)來源被誤當 Apple 官方 | 不變式 4:文中標示來源方 |
| 著作權(Apple/Google 原文、受限碼) | 只做中文轉述 + 短引述;不搬原文長段/受限碼(不變式 9) |
| EU/DMA、China 可用性後續變動 | 可用性段標日期 + 來源 S07;變動時單檔更新 |
| PCC-on-GCP 仍在 summer preview,規格可能調整 | 標 `forthcoming`/preview;以 S02/S16 更新 |
| 範圍蔓延(想做第四版/雙語/web) | 列為加分項,不影響門檻;先交三份 PDF |

---

## 16. 授權與聲明

- **授權**:文字、圖表、build 腳本以 **Apache License 2.0** 釋出。
  ```
  Copyright 2026 Nick Lian (github.com/sses09935)
  Licensed under the Apache License, Version 2.0.
  ```
- **性質**:獨立科普／教育用途,**非** Apple/Google/NVIDIA 官方出版品,與各該公司無隸屬關係。
- **商標**:Apple、Private Cloud Compute、Apple Intelligence、Gemini、Google、NVIDIA、Blackwell 等為各自所有人之商標,僅作指稱與說明之用。
- **受限碼**:Apple/Google 受 限用授權、禁止再散布之原始碼**不包含**於本 repo;如需請逕至官方取得。

---

## 17. 建議 repo metadata

- **repo 名**:`apple-afm3-explainers`
- **描述**:第三代 Apple Foundation Models（AFM 3）+ PCC on Google Cloud 受眾分眾白皮書（繁中＋英文雙語,只引 Apple 官方與合作方官方來源;非官方科普）
- **Topics**:`apple` `apple-intelligence` `apple-foundation-models` `afm` `private-cloud-compute` `confidential-computing` `ai-privacy` `attestation` `traditional-chinese` `whitepaper`

---

### 附錄 A:受眾差異矩陣(節錄)

| 主題 | 開發者版 | AI 使用者版 | 普羅大眾版 |
|------|----------------|-------------|------------|
| 五模型架構 | 完整(含 IFP/PT-MoE) | 概念(各做什麼) | 端側 vs 雲端比喻 |
| PCC-on-GCP 堆疊 | 完整(CC/TDX/Titan/ledger/雙信任根) | 「資料在別人機房也受保護」概念 | 比喻 + FAQ |
| Gemini 合作 | 官方措辭 + 邊界 | 官方定位(不是 runtime Gemini) | 一句話 + FAQ |
| 評測數字 | 完整表(標 beta) | 重點數字(標 beta) | 省略或一句 |
| Intel CPU 角色 | 詳述(非主要運算) | 省略 | 省略 |
| 可用性 | 完整(裝置/語言/地區) | 摘要 | 「能不能用/在哪」 |

### 附錄 B:本計劃的 Phase 0 產物已就緒

本對話已完成的「AFM 3 官方完整版」事實彙整(逐條附官方來源)可直接作為 Phase 0 → 1 的輸入種子:把其中各節轉為 KB 條目並補上 `[S0X]` + `status:` 即可。
