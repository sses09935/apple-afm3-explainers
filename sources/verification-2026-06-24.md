# 來源查核紀錄 — 2026-06-24（Claude for Chrome）

> 以 Claude for Chrome 逐一開啟 `source-index.md` 的官方連結,擷取**實際官方文字**,逐條比對 `content/knowledge-base.md` 之 claim,確認準確無誤並補正歸屬。
> 方法:`navigate` + `get_page_text`(文章正文)/ `javascript`(byline、SPA metadata)。基準:2026-06-24。

## 一、已逐頁查核之來源(7 個高密度來源,涵蓋絕大多數 KB)

| S-code | 來源 | 查核結果 |
| --- | --- | --- |
| **S01** | Apple ML Research（主來源） | ✅ 全數相符。五模型定義、20B sparse(啟用 1–4B)、IFP/NAND/per-prompt/shared-routed、PT-MoE、ADM 3、訓練(cloud TPU、SFT+multi-stage RL、QAT)、Responsible AI 四原則、**全部評測數字**(45.6/23.3、>61%、64.7/8.7、+36%/+21%、37.8/9.6、Cloud Pro +10%/+14%/+14%、TTS 4.15/4.24 vs 3.87/3.82、Dictation 44.7/17.6)、locale 分組、「technical report later this summer」——逐字相符。 |
| **S02** | Apple Security — Expanding PCC | ✅ 全數相符。五要求「remain exactly the same」、堆疊(NVIDIA CC / Intel TDX / Google Titan)、TCB、append-only ledger、「two separate roots of trust from independent vendors」、推論堆疊隔離、Apple 保留完整控制、summer preview、binaries 公開 + research mode、Summit/Security Guide 後續。**byline 補確認**:Written by SEAR、User Privacy、Core OS、ASE、AIML(KB-042)。 |
| **S03** | Apple Newsroom 主稿 | ✅ 全數相符。**16 語言完整清單**、**完整裝置清單**(iPhone 16+/15 Pro/15 Pro Max、iPad mini A17 Pro、M1+ iPad、MacBook Neo A18 Pro、M1+ Mac、Vision Pro、Watch S9+/Ultra 2+/SE 3 配對)、時程、Siri AI 英文 beta、EU/DMA、中國、每日用量、Siri AI 能力。 |
| **S04** | Apple Newsroom 功能稿 | ✅ KB-032/033 相符(Photos→hidden SynthID watermark;Image Playground photorealistic、PCC 驅動、SynthID、tap/circle/brush、Lock Screen/Contact Posters、aspect ratio)。⚠ **見補正 1**(SynthID 歸屬)。 |
| **S05** | Apple Newsroom 開發者稿 | ✅ 全數相符。Foundation Models 單一 Swift API(image input/server/custom skills)、多 provider(Claude/Gemini/language model protocol)、Small Business <2M、no cloud API cost、Core AI(unified memory+Neural Engine)、Xcode 27(Anthropic/Google/OpenAI、MCP/ACP、GitHub+Figma、Apple silicon only/30% smaller、Xcode Cloud 2x)。⚠ **見補正 2**(Dynamic Profiles)。 |
| **S13** | Google Cloud（T2） | ✅ KB-055/056 相符(serving platform 達 Apple PCC 之 security/confidentiality/transparency 目標;Titanium+Titan root of trust;Intel TDX + NVIDIA CC;CPU→GPU path)。 |
| **S14** | NVIDIA Blog（T2） | ✅ KB-057/038 相符(Blackwell GPUs with CC 支援 server-side inference,整合進 PCC 硬體安全架構,運行於 Google Cloud)。本日已補存檔(URL 由 source-index 補上)。 |

## 二、補正(已套用)

### 補正 1 — KB-034「SynthID 歸屬」來源不足 → 已修正
- **問題**:S04 以「hidden SynthID watermark」之名使用該技術,但**未**於該頁說明「SynthID 為 Google DeepMind 技術」。原 KB-034 將此歸屬單獨掛 [S04],屬來源不足(歸屬本身正確,但非 S04 所述)。
- **修正**:新增 **S18 = Google DeepMind — SynthID 官方頁**(`https://deepmind.google/models/synthid/`;頁面標題「SynthID — Google DeepMind」,h1「A tool to watermark and identify content generated through AI」)。KB-034 來源改為 **[S04], [S18]**;drafts 中 SynthID 歸屬處同步補 [S18]。

### 補正 2 — KB-073「Dynamic Profiles」措辭過度具體 → 已校正
- **問題**:原 KB「可在 continuous session 中即時切換 models/tools/instructions」較 S05 措辭具體。S05 實際為「Dynamic Profiles, enabling developers to update how models interact with their apps on the fly」。
- **修正**:claim 改依 S05 措辭(「即時更新模型如何與 app 互動」),並補 **[S08]**(WWDC session 241 之「Dynamic Profiles for agentic apps」「Composing dynamic sessions with instructions and profiles」章節)支援 instructions/profiles 組合之敘述。

## 三、未逐頁查核(已交叉佐證或低風險)

| S-code | 狀態 |
| --- | --- |
| S06 / S07 | Siri AI、EU/DMA 之事實已由 **S03** 正文交叉佐證(KB-067、KB-082);未另開頁。 |
| S08 | 為影片頁:summary/章節已確認涵蓋 PCC、context 管理 API、Dynamic Profiles、Evaluations、Python SDK、open source(支援 KB-072/073/077);**32,000 token + reasoning**(KB-025)之確切數字位於影片逐字稿,本次未機器擷取,維持 S08 歸屬。 |
| S09 / S10 | 未逐頁;S10 目前未被任何 KB 引用(保留來源,見 check WARN)。 |
| S11 / S12 | 研究論文(IFP arXiv 2501.02086、AFM Tech Report 2025);KB-021/024 之論文級數字(9B→3B、TTFT)已於 KB 標明「屬論文實驗結果」,本次未重抓。 |

## 四、可選的事實增補(本次發現但**未**新增條目,留待維護者決定)

> 以下為查核時發現、KB 尚未收錄之**官方**細節,可作為日後 KB 擴充(各帶來源);本次為維持範圍未自行加入正文事實。

- **S13(Google Cloud)**:Apple 與 Google 共同打造 **open-source host stack** 以支援 PCC 透明度,供獨立檢視與驗證系統安全屬性。
- **S14(NVIDIA)**:NVIDIA CC 能力——hardware-rooted trust、encrypted communication paths、remote attestation;對使用者而言「no one, not even the system's builders, can look at their data, chats or conversations」。
- **S01**:TTS MOS 相對提升幅度——General +0.28、Conversational +0.42(KB-064 目前僅列絕對分數)。

## 結論

逐頁查核的 7 個高密度來源(涵蓋 KB 絕大多數條目)之事實**全部準確**;僅 2 處**歸屬/措辭**需補正,皆已套用並通過 `check-sources.mjs`。新增 S18 後 active 來源 15 個、已登錄 21 個。
