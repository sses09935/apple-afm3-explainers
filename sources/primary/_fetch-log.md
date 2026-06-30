# _fetch-log.md — 來源頁面存檔紀錄（Phase 0）

> 每筆：`S-code · URL · 擷取日期 · HTTP · 大小 · 取得方式 · 備註`。
> 取得方式：`curl -s -L`（含 redirect），User-Agent 模擬桌面 Safari/WebKit，逾時 30s。存檔為靜態 HTML 快照（JS 渲染前的伺服器回應）。
> 擷取日期：**2026-06-24**（專案基準日 2026-06-23 之次日）。

## 已存檔（active）

| S-code | 層 | URL | HTTP | 大小 | 檔案 | 備註 |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | T1 | `https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models` | 200 | 114 KB | `S01.html` | 主來源（五模型／IFP／評測／訓練／Responsible AI） |
| S02 | T1 | `https://security.apple.com/blog/expanding-pcc/` | 200 | 32 KB | `S02.html` | PCC on Google Cloud（五要求／堆疊／ledger／雙信任根） |
| S03 | T1 | `https://www.apple.com/newsroom/2026/06/apple-unveils-next-generation-of-apple-intelligence-siri-ai-and-more/` | 200 | 302 KB | `S03.html` | 主稿：裝置／語言／地區／用量 |
| S04 | T1 | `https://www.apple.com/newsroom/2026/06/apple-intelligence-brings-powerful-ai-capabilities-into-everyday-experiences/` | 200 | 300 KB | `S04.html` | 功能稿：SynthID／Image Playground |
| S05 | T1 | `https://www.apple.com/newsroom/2026/06/apple-aids-app-development-with-new-intelligence-frameworks-and-advanced-tools/` | 200 | 207 KB | `S05.html` | 開發者稿：Gemini／Core AI／Xcode 27 |
| S06 | T1 | `https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/` | 200 | 260 KB | `S06.html` | Siri AI |
| S07 | T1 | `https://www.apple.com/newsroom/2026/06/due-to-dma-siri-ai-delayed-in-eu-for-ios-27-and-ipados-27/` | 200 | 156 KB | `S07.html` | EU/DMA 延後 |
| S08 | T1 | `https://developer.apple.com/videos/play/wwdc2026/241/` | 200 | 171 KB | `S08.html` | WWDC26 session 241（32K context + reasoning） |
| S09 | T1 | `https://developer.apple.com/wwdc26/guides/apple-intelligence/` | 200 | 113 KB | `S09.html` | WWDC26 Apple Intelligence guide |
| S10 | T1 | `https://developer.apple.com/documentation/FoundationModels` | 200 | 17 KB | `S10.html` | Foundation Models 文件（**目前未被任何 KB 引用**，見 source-map §B） |
| S11 | T1 | `https://machinelearning.apple.com/research/pruning-large-language` | 200 | 33 KB | `S11.html` | Instruction-Following Pruning（arXiv 2501.02086） |
| S12 | T1 | `https://machinelearning.apple.com/research/apple-foundation-models-tech-report-2025` | 200 | 26 KB | `S12.html` | AFM Tech Report 2025（PT-MoE 基礎） |
| S13 | T2 | `https://cloud.google.com/blog/products/identity-security/powering-the-next-era-of-confidential-ai` | 200 | 226 KB | `S13.html` | Google Cloud（Titanium/Titan/TDX/CC/Blackwell/CPU→GPU path） |
| S-PCC1 | T1（PCC 基礎） | `https://security.apple.com/blog/private-cloud-compute/` | 200 | 101 KB | `S-PCC1.html` | 2024 PCC 原文（五要求／attestation／VRE／transparency log） |
| S-PCC2 | T1（PCC 基礎） | `https://security.apple.com/` | 200 | 27 KB | `S-PCC2.html` | Apple Security Research 入口（PCC Security Guide 連結頁）；指向 guide 主文 |

## 未存檔

| S-code | 狀態 | 原因 |
| --- | --- | --- |
| ~~S14~~ | ~~active，URL 待補~~ | **已於 2026-06-24 補存檔**（見下方補充）。 |
| S-PCC3 | active（連結） | Apple PCC 開源碼（受限授權、禁止再散布）。依**不變式 9** 僅連結、**不存檔**：`https://github.com/apple/security-pcc` |
| S15 | forthcoming | 第三代 AFM technical report，官方預告今夏稍晚發布，**尚未發布** → pending |
| S16 | forthcoming | 更新版 PCC Security Guide，官方預告今年稍晚，**尚未發布** → pending |
| S17 | forthcoming | Confidential Computing Summit talk，官方預告本月稍晚，**尚未發布** → pending |

## 2026-06-24 補充（S14 URL 補上 + S18 新增 + Chrome 查核）

| S-code | 層 | URL | HTTP | 大小 | 檔案 | 備註 |
| --- | --- | --- | --- | --- | --- | --- |
| S14 | T2 | `https://blogs.nvidia.com/blog/nvidia-confidential-computing-apple-private-cloud-compute/` | 200 | 108 KB | `S14.html` | URL 由 source-index 補上後存檔；title 相符 |
| S18 | T2 | `https://deepmind.google/models/synthid/` | 200 | 137 KB | `S18.html` | Google DeepMind SynthID 官方頁（SPA，快照為 HTML 殼；標題/meta 已以 Chrome 確認）；佐證 KB-034 歸屬 |

> 同日以 Claude for Chrome 逐頁查核 S01/S02/S03/S04/S05/S13/S14 之官方正文,結果見 `sources/verification-2026-06-24.md`(KB 事實全部準確;2 處歸屬/措辭補正已套用)。

## 完備性結語

- 16 個 active 來源中，14 個已成功存為 HTML 快照（HTTP 200，title 與來源描述相符）。
- **缺口 1（S14）**：source-index 缺具體 URL，待補。
- **缺口 2（S-PCC3）**：依不變式 9 刻意不存檔（僅連結）。
- forthcoming（S15/S16/S17）依設計 pending，待官方發布後於 M6 補存並更新 KB。
- 快照為伺服器靜態 HTML；Apple/Google 頁面多為 JS 漸進渲染，快照含完整 metadata 與主體文字，足供事實回溯查核。
