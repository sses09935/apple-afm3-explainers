# GLOSSARY.md — 術語表

> 每條以繁體中文 1–3 句定義,並標註**首次出現的 `KB-id`** 與來源 `[S0X]`。
> 本表為**再框架**:只解釋術語,**不**新增 `content/knowledge-base.md` 沒有的事實(不變式 1、8)。定義中的專案事實一律以 KB 條目為準。
> 排列：先架構/模型，後 PCC/機密運算，再開發者/可用性。

## 模型與端側架構

**Apple Foundation Models（AFM）** — Apple 的基礎模型家族;第三代(AFM 3)由五個模型組成,橫跨端側與 PCC。見 KB-001 [S01]。

**AFM 3 Core / Core Advanced / Cloud / Cloud Pro、ADM 3 Cloud** — 第三代的五個模型;前四者 purpose-built for Apple silicon,Cloud Pro 擴展到 Google Cloud 的 NVIDIA GPUs。見 KB-002–006、KB-007 [S01]。

**dense 模型** — 每次推論都啟用全部參數的模型(相對於 sparse);AFM 3 Core 為 dense。見 KB-002 [S01]。

**sparse / sparsely activated 架構** — 每次推論只啟用部分參數的架構,可在不等比放大運算量的前提下擴大模型規模;AFM 3 Core Advanced 為此類,依 request 啟用 1–4B 參數。見 KB-003 [S01]。

**MoE（Mixture-of-Experts，專家混合）** — 把網路分成多組「expert」子網路、每次只路由啟用其中少數的架構,屬 sparse 一類。本專案中 server 端為 PT-MoE(KB-024),端側則以 per-prompt routing 的變體實作(KB-017)。[S01]

**PT-MoE（Parallel-Track Mixture-of-Experts）** — Apple 2025 提出、AFM 3 Cloud 沿用並升級的 server 端 MoE 架構;升級後穩定訓練並提升 context 內推理與精確 recall。見 KB-024 [S01], [S12]。

**IFP（Instruction-Following Pruning，指令導向剪枝）** — Apple 研究員開發的 input-dependent structured pruning:由 sparse mask predictor 依 user instruction 選出最相關的參數子集;AFM 3 Core Advanced 的 sparse 架構即建於 IFP 之上。見 KB-015、KB-021 [S01], [S11]。

**shared experts / routed experts（共用／路由專家）** — IFP 架構中,高比例 always-active 的「shared experts」搭配 input-dependent 的「routed experts」;後者僅在需要時才換入 DRAM。見 KB-018 [S01]。

**per-prompt routing（逐提示路由）** — 因 NAND→DRAM 頻寬不足以像標準 MoE 逐 token 換權重,改為在每個 prompt 開始時選定固定 experts、生成過程週期性重選。見 KB-017 [S01]。

**NAND（flash memory）／ DRAM** — NAND 為裝置的非揮發儲存(容量大、頻寬較低);DRAM 為執行記憶體(快、容量小)。AFM 3 Core Advanced 把 full model 權重存於 NAND,僅選擇性把需要的 experts 載入 DRAM。見 KB-016 [S01]。

**inference-time elasticity（推論期彈性）** — 依請求難度預先決定 active 參數量、跨請求增量載入權重,使模型規模可超越傳統 DRAM 限制同時壓低延遲。見 KB-020 [S01]。

**QAT（Quantization Aware Training，量化感知訓練）** — 在訓練過程中即納入量化,使模型大幅壓縮同時維持高準確度。見 KB-060 [S01]。

**Neural Engine** — Apple silicon 上專責神經網路運算的加速器;Core AI 針對其最佳化。見 KB-075 [S05]。

**unified memory（統一記憶體）** — Apple silicon 上 CPU/GPU/Neural Engine 共用的記憶體架構;Core AI 針對其最佳化以在本機跑 full-scale LLM。見 KB-075 [S05]。

**reasoning（推理能力）／ reasoning level** — 模型在回答前進行多步推理的能力;開發者可用的 PCC 語言模型具 32K context 與 reasoning。見 KB-025 [S08]。

**MOS（Mean Opinion Score）** — 1–5 分的主觀品質評分,本專案用於 TTS 語音評測;官方稱每升 0.1 即為高度可察覺改善。見 KB-064 [S01]。

**TTFT（time to first token，首字延遲）** — 從收到請求到產出第一個 token 的延遲;IFP 論文回報 9B→3B activated 版 TTFT 接近 3B dense。見 KB-021 [S11]。

## 影像

**ADM 3 Cloud** — PCC 上的影像生成／編輯模型,主打 controllability 與 parameter efficiency。見 KB-005、KB-029 [S01]。

**Genmoji** — 由文字描述生成的客製化表情貼圖;由 ADM 3 Cloud base model 原生處理。見 KB-030 [S01]。

**Image Playground** — Apple 的影像生成 app/功能,可生成多種風格(含 photorealistic),由 PCC 上的生成模型驅動。見 KB-033 [S04]。

**Spatial Reframing** — Photos 中於拍攝後改善構圖的工具,由 ADM 3 Cloud 的 specialized adapter 驅動。見 KB-030、KB-068 [S01], [S03]。

**SynthID** — **Google DeepMind** 的內容來源標記(隱形浮水印)技術;經 Apple Intelligence 生成或編輯的影像會自動嵌入。屬合作方(T2)屬性,文中須標明來源方。見 KB-034 [S04]。

## PCC 與機密運算

**PCC（Private Cloud Compute）** — Apple 把裝置級隱私延伸到雲端的架構;僅在端側不足時動用。2024 世代建於 Apple silicon(KB-101 [S-PCC1]);2026 首次擴展到 Google Cloud(KB-043 [S02])。

**五項核心要求** — stateless computation、enforceable guarantees、no privileged runtime access、non-targetability、verifiable transparency;PCC 自 2024 即以此為設計準則,GCP 擴展維持不變。見 KB-102 [S-PCC1]、KB-046 [S02]。

**stateless computation（無狀態運算）** — 使用者資料只用於當次請求、運算後不保留。見 KB-103 [S-PCC1]。

**non-targetability（不可鎖定性）** — 即使危害基礎設施也無法鎖定特定使用者請求(metadata 最小化、第三方 relay、target diffusion)。見 KB-106 [S-PCC1]。

**verifiable transparency（可驗證透明度）** — 正式 PCC 軟體皆公開登錄、可稽核;device 只連向軟體已登錄的節點。見 KB-107 [S-PCC1]。

**TEE（Trusted Execution Environment，可信執行環境）** — 以硬體隔離保護執行中程式與資料(data-in-use)的環境;confidential VM / confidential computing 為其實作。見 KB-039 [S02]。

**confidential VM（機密虛擬機）** — 在 TEE 中執行、連 host 也無法窺視其記憶體的虛擬機;PCC on Google Cloud 以 Intel TDX 提供 CPU 端 confidential VM。見 KB-039 [S02]。

**TDX（Intel Trust Domain Extensions）** — Intel CPU 的機密運算技術,提供 CPU 端 confidential VM / VM 隔離與記憶體保護。見 KB-037、KB-039 [S02]。

**NVIDIA Confidential Computing（NVIDIA CC）** — NVIDIA GPU 的機密運算技術,提供 GPU 端 confidential inference 與 data-in-use 保護;PCC on Google Cloud 以 NVIDIA Blackwell GPUs + CC 承擔 server 端推論。見 KB-038 [S02], [S13], [S14]。

**Blackwell** — NVIDIA GPU 架構;運行於 Google Cloud、承擔 PCC 的 server-side inference。見 KB-038、KB-057 [S02], [S14]。

**attestation（證明／證實）** — device 在送資料前驗證節點軟硬體量測值與已登錄版本相符的機制;2024 世代見 KB-108 [S-PCC1];GCP 擴展要求 attestation rooted in 兩個獨立 vendor 的信任根,見 KB-049 [S02]。

**root of trust（信任根）** — 信任鏈的硬體起點,確保 boot 流程與平台完整性;Apple silicon 以 Secure Enclave(KB-109 [S-PCC1]),GCP 擴展以 **Google Titan**(KB-040 [S02])。

**Google Titan / Titanium architecture** — Google Cloud 自研、提供硬體 root of trust 的安全晶片與架構;PCC on Google Cloud 的信任根之一。見 KB-040 [S02]、KB-055 [S13]。

**append-only ledger（僅可追加的帳本）** — 記錄 fleet 中所有硬體、cryptographically verifiable 且只能追加的帳本,用於防供應鏈攻擊;為 2024 transparency log(KB-107)在 GCP 的延伸。見 KB-048 [S02]。

**雙獨立信任根（two separate roots of trust）** — 對可能外洩資料的元件,要求 attestation 同時 rooted in 兩家獨立 vendor 的信任根。見 KB-049 [S02]。

**trusted computing base（TCB,可信運算基底）** — 被納入信任邊界、其完整性決定整體安全的軟硬體集合;PCC on Google Cloud 將 firmware、host/guest OS、application code 全納入。見 KB-047 [S02]。

**VRE（Virtual Research Environment,虛擬研究環境）** — Apple 提供給安全研究者檢視、驗證 PCC 軟體聲明的研究工具。見 KB-110 [S-PCC1], [S-PCC2]。

## 開發者與框架

**Foundation Models framework** — 單一 native Swift API,讓開發者使用端側模型(含 image input)、server 模型與 custom skills。見 KB-070 [S05]。

**Language Model protocol（語言模型協定）** — 新協定,讓開發者透過同一 API 使用 Claude、Gemini 或任何實作該協定的 provider。見 KB-071 [S05]。

**Core AI** — 全新框架,為在 device 上跑自帶模型的最佳途徑;針對 Apple silicon 的 unified memory 與 Neural Engine 最佳化。見 KB-075 [S05]。

**Dynamic Profiles** — 可在 continuous session 中即時切換 models/tools/instructions 的能力。見 KB-073 [S05]。

**agentic tool use（代理式工具使用）** — 模型自主呼叫工具以完成多步任務;為 AFM 3 Cloud Pro 的主力情境之一。見 KB-006 [S01]。

**MCP / ACP（Model Context Protocol / Agent Client Protocol）** — Xcode 27 以 plug-in 形式透過這兩個協定擴充 agents,GitHub 與 Figma 首批支援。見 KB-076 [S05]。

**PFIGSCJK / DDNSTV / AFIHHMPRTU** — 官方評測的語系分組代號(各以語言英文首字母組成),用於分組呈現偏好評測。見 KB-066 [S01]。
