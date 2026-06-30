# source-index.md — 唯一來源清單（分層官方）

> 規則:本專案事實**僅**得引用本清單之來源。  
> **T1 = Apple 官方**;**T2 = 合作方官方(Google Cloud / NVIDIA)**;報導/詮釋**不**列入(不變式 3)。  
> `status`:`active`(已發布、可引用)/ `forthcoming`(官方已預告、尚未發布,保留代碼)。  
> 擷取基準:2026-06-23。每個來源於 `sources/primary/` 保留頁面快照與擷取日期。

## T1 — Apple 官方

| S-code | 來源 | URL | status |
| --- | --- | --- | --- |
| **S01** | Apple ML Research — Introducing the Third Generation of Apple's Foundation Models（主來源） | `https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models` | active |
| **S02** | Apple Security — Expanding Private Cloud Compute | `https://security.apple.com/blog/expanding-pcc/` | active |
| **S03** | Apple Newsroom — WWDC26: Apple unveils next generation of Apple Intelligence, Siri AI, and more（主稿:裝置/語言/地區/用量） | `https://www.apple.com/newsroom/2026/06/apple-unveils-next-generation-of-apple-intelligence-siri-ai-and-more/` | active |
| **S04** | Apple Newsroom — Apple Intelligence brings powerful AI capabilities into everyday experiences（功能稿:SynthID、Image Playground） | `https://www.apple.com/newsroom/2026/06/apple-intelligence-brings-powerful-ai-capabilities-into-everyday-experiences/` | active |
| **S05** | Apple Newsroom — Apple accelerates app development with new intelligence frameworks and advanced tools（開發者稿:Gemini、Core AI、Xcode 27） | `https://www.apple.com/newsroom/2026/06/apple-aids-app-development-with-new-intelligence-frameworks-and-advanced-tools/` | active |
| **S06** | Apple Newsroom — Apple introduces Siri AI, a profoundly more capable and personal assistant | `https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/` | active |
| **S07** | Apple Newsroom — Due to DMA, Siri AI delayed in EU for iOS 27 and iPadOS 27 | `https://www.apple.com/newsroom/2026/06/due-to-dma-siri-ai-delayed-in-eu-for-ios-27-and-ipados-27/` | active |
| **S08** | Apple Developer — WWDC26 session 241「What's new in the Foundation Models framework」（32K context + reasoning 來源） | `https://developer.apple.com/videos/play/wwdc2026/241/` | active |
| **S09** | Apple Developer — WWDC26 Apple Intelligence guide | `https://developer.apple.com/wwdc26/guides/apple-intelligence/` | active |
| **S10** | Apple Developer — Foundation Models 文件 | `https://developer.apple.com/documentation/FoundationModels` | active |
| **S11** | Apple ML Research — Instruction-Following Pruning for Large Language Models（arXiv 2501.02086） | `https://machinelearning.apple.com/research/pruning-large-language` | active |
| **S12** | Apple ML Research — Apple Foundation Models Tech Report 2025（PT-MoE 基礎） | `https://machinelearning.apple.com/research/apple-foundation-models-tech-report-2025` | active |
| **S15** | Apple — 第三代 AFM technical report（官方預告:今夏稍晚,含更新評測與 benchmarks） | （未發布） | forthcoming |
| **S16** | Apple Security — 更新版 PCC Security Guide（官方預告:今年稍晚） | （未發布） | forthcoming |

## T2 — 合作方官方

| S-code | 來源 | URL | status |
| --- | --- | --- | --- |
| **S13** | Google Cloud — Powering the next era of Confidential AI（Titanium / Titan / Intel TDX / NVIDIA CC / Blackwell / CPU-to-GPU path） | `https://cloud.google.com/blog/products/identity-security/powering-the-next-era-of-confidential-ai` | active |
| **S14** | NVIDIA Blog — NVIDIA Confidential Computing to Help Expand Apple's Private Cloud Compute（Blackwell GPUs with Confidential Computing 支援 AFM server-side inference,運行於 Google Cloud） | `https://blogs.nvidia.com/blog/nvidia-confidential-computing-apple-private-cloud-compute/` | active |
| **S18** | Google DeepMind — SynthID（AI 內容浮水印與辨識技術之官方說明；用於佐證「SynthID 為 Google DeepMind 技術」之歸屬） | `https://deepmind.google/models/synthid/` | active |
| **S17** | Confidential Computing Summit talk（官方預告:本月稍晚,PCC on Google Cloud 技術細節） | （未發布） | forthcoming |

## 沿用前作（PCC 基礎,2024 世代）

> 來自 `apple-pcc-privacy-explainers`;用於 KB 之「PCC 基礎」段。沿用其 Apple 官方來源,並重新對應到本清單。

| S-code | 來源 | URL |
| --- | --- | --- |
| **S-PCC1** | Apple Security — Private Cloud Compute（2024 原文） | `https://security.apple.com/blog/private-cloud-compute/` |
| **S-PCC2** | Apple — PCC Security Guide（舊版） | `https://security.apple.com/` |
| **S-PCC3** | Apple — PCC 開源碼（受限授權,禁止再散布,**不**納入本 repo;僅供讀者逕至官方取得） | `https://github.com/apple/security-pcc` |

## 排除（報導/詮釋,不得作為事實來源）

僅作為「曾被報導但未經官方證實」之背景,至多於開發者版附錄標記為 `reported-excluded`:

- Bloomberg / Mark Gurman:約 10 億美元/年、約 1.2 兆參數客製 Gemini。
- 各家獨立解讀:「Gemini 是 teacher signal / distilled」「no drop of Gemini」「Apple 先試自家 PCC 太慢才轉 GCP」等。
