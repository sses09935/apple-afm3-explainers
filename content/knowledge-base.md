# knowledge-base.md — 唯一事實庫

> **這是本專案唯一的事實定義處。** 三份文件只是不同視角的再框架(不變式 1)。
> 每條附 `[S0X]`(來源,見 `sources/source-index.md`)與 `status`。
>
> **status**:`official`(官方已公開、定版)/ `official-beta`(官方公開但屬 beta 階段、夏季 technical report 將更新)/ `forthcoming`(官方已預告、尚未發布)/ `reported-excluded`(報導,非官方,不入大眾/使用者版正文)。
> **audiences**:每條標 `dev` / `ai-user` / `general` 的處理層級:`detail`(完整)/ `concept`(概念)/ `faq`(一句或 FAQ)/ `omit`(略)/ `appendix-only`(僅開發者版附錄)。
> **基準日期**:2026-06-23。

---

## 1. 模型陣容與官方定義

### KB-001 五模型總覽
- claim: 第三代 Apple Foundation Models(AFM)是一個由五個基礎模型組成的家族,與 Google 合作打造,橫跨端側與 Private Cloud Compute(PCC)。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=detail · general=concept

### KB-002 AFM 3 Core
- claim: 端側模型;前代 3-billion-parameter dense 模型的下一代,品質再提升。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=concept

### KB-003 AFM 3 Core Advanced
- claim: Apple 最強端側模型;natively multimodal,支援 expressive voices 與 higher-accuracy dictation;20-billion-parameter,採 sparse architecture,依 request 每次啟用 1–4 billion parameters;由 most capable Apple silicon systems 解鎖並最佳化。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=concept

### KB-004 AFM 3 Cloud
- claim: PCC 上的 server-side workhorse,針對 speed、efficiency、performance 最佳化。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=concept

### KB-005 ADM 3 Cloud (Image)
- claim: PCC 上的影像生成與編輯模型,驅動進階照片編輯工具、全新 Image Playground 等。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=concept

### KB-006 AFM 3 Cloud Pro
- claim: Apple 最強 server-based model,驅動最 demanding 的情境,如 agentic tool use 與 complex reasoning。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=faq

### KB-007 硬體目標
- claim: AFM 3 Core、AFM 3 Core Advanced、AFM 3 Cloud、ADM 3 Cloud 皆 purpose-built for Apple silicon;AFM 3 Cloud Pro 由 Apple 與 Google、NVIDIA 合作擴展到 Google Cloud 的 NVIDIA GPUs。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-008 PCC 隱私邊界（總綱）
- claim: 三個 server 模型執行於 PCC;Apple 強調此確保使用者資料不會被儲存或分享給任何人,包括 Apple。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=detail · general=faq

---

## 2. Apple × Google / Gemini（官方措辭）

### KB-009 ML Research 措辭
- claim: 五個模型「custom-built in collaboration with Google」。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=faq

### KB-010 Developer Newsroom 措辭
- claim: 開發者透過框架可用的新一代 AFM「custom-built in collaboration with Google and its Gemini models」。
- source: [S05]
- status: official
- audiences: dev=detail · ai-user=concept · general=faq

### KB-011 Security 措辭
- claim: 今年 Apple 與 Google 合作,「leverage the technologies behind its Gemini family of models」來建構新一代 AFM。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=concept · general=faq

### KB-012 「金額/參數」報導
- claim: 「約 10 億美元/年、約 1.2 兆參數客製 Gemini」為 Bloomberg/Gurman 報導,Apple 未證實。
- source: (報導,非官方)
- status: reported-excluded
- audiences: dev=appendix-only · ai-user=omit · general=omit

### KB-013 Gemini 介入形式未公開
- claim: Gemini 技術介入各模型的具體形式、比例與商務條款,官方未進一步說明。
- source: [S01], [S02], [S05]
- status: official
- note: 對應「不臆測」原則。
- audiences: dev=detail · ai-user=concept · general=omit

---

## 3. 端側架構：AFM 3 Core Advanced

### KB-014 記憶體問題
- claim: 傳統 LLM(無論 dense 或 sparsely activated)都要求所有權重常駐 DRAM,形成龐大 footprint,限制消費級硬體的可擴展性。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-015 IFP 架構
- claim: AFM 3 Core Advanced 採用建立於 Instruction-Following Pruning(IFP)的新型 sparsely activated 架構(Apple 研究員開發)。
- source: [S01], [S11]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-016 權重存於 NAND
- claim: 不把整個模型放進 DRAM,而是把 full model 存於 flash memory(NAND)。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=faq

### KB-017 per-prompt routing
- claim: 因 NAND-to-DRAM 頻寬太慢、無法像標準 MoE 那樣 token-by-token 換權重,改為 per-prompt 做 routing:lightweight dense block 在初始處理選定固定 experts,生成過程中週期性重新選擇。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-018 shared / routed experts
- claim: 依賴高比例 always-active 的「shared experts」,搭配 input-dependent 的「routed experts」;後者僅在需要時才換入 DRAM。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-019 圖 1 機制
- claim: 模型絕大多數參數是 stacked transformer 中 FFN blocks 的 expert weights;對 query 選擇性載入少量 experts,與 shared/static weights patch 成可在 DRAM 執行的 dense model,並在生成過程週期性重選與更新。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-020 inference-time elasticity
- claim: 針對各使用情境採「預先決定的 active 參數量」;權重可跨不同難度請求增量載入,將模型規模推升至遠超傳統 DRAM 限制,同時壓低延遲。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-021 IFP 論文結果
- claim: IFP 為 input-dependent structured pruning,由 sparse mask predictor 依 user instruction 選最相關參數;論文回報 9B→3B activated 版本可接近 9B dense 效果,且 TTFT 接近 3B dense。
- source: [S11]
- status: official
- note: 屬論文實驗結果;AFM 3 Core Advanced 完整內部配置未公開。
- audiences: dev=detail · ai-user=omit · general=omit

---

## 4. AFM 3 Core 評測

### KB-022 Core — general text
- claim: General text 被偏好 45.6%,2025 baseline 為 23.3%。
- source: [S01]
- status: official-beta
- audiences: dev=detail · ai-user=concept · general=omit

### KB-023 Core — image understanding
- claim: Image understanding 在使用者有明確偏好時,被偏好超過 61%。
- source: [S01]
- status: official-beta
- audiences: dev=detail · ai-user=concept · general=omit

---

## 5. 伺服器架構：AFM 3 Cloud

### KB-024 PT-MoE 升級
- claim: AFM 3 Cloud 在去年的 Parallel-Track Mixture-of-Experts(PT-MoE)基礎上做 key upgrades;架構精煉穩定了訓練,並提升在 context window 內推理與精確 recall 複雜 server-side queries 的能力。
- source: [S01], [S12]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-025 開發者 PCC 模型 = 32K + reasoning
- claim: 開發者可用的 PCC 語言模型(即驅動許多 Apple Intelligence 功能的同一模型)具 32,000 token context window 與 reasoning 能力。
- source: [S08]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-026 Cloud — general text
- claim: General text(side-by-side)被偏好 64.7%,2025 AFM Server 為 8.7%,跨所有 locale 一致。
- source: [S01]
- status: official-beta
- audiences: dev=detail · ai-user=concept · general=omit

### KB-027 Cloud — single-sided
- claim: Single-sided 評測中 overall response satisfaction 相對提升約 36%,instruction following 相對提升約 21%。
- source: [S01]
- status: official-beta
- audiences: dev=detail · ai-user=concept · general=omit

### KB-028 Cloud — image understanding
- claim: Image understanding 被偏好 37.8%,2025 baseline 為 9.6%。
- source: [S01]
- status: official-beta
- audiences: dev=detail · ai-user=concept · general=omit

---

## 6. ADM 3 Cloud (Image)

### KB-029 ADM 3 Cloud 設計
- claim: 主打 strong controllability 與 parameter efficiency;可泛化到不同 aspect ratios 與 resolutions;汲取更廣的 AFM 家族引導 creation 與 editing。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-030 base model + adapters
- claim: base model 原生處理 image creation、editing、Genmoji;另以 specialized adapters 驅動 Spatial Reframing(Photos)、touch-based modifications、Image Playground personalization。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=faq

### KB-031 圖 2 photorealism
- claim: 官方圖 2 展示 ADM 3 Cloud 跨多元主體與複雜光照的 photorealism。
- source: [S01]
- status: official
- audiences: dev=concept · ai-user=concept · general=faq

### KB-032 Photos 編輯 → SynthID
- claim: 使用 Apple Intelligence 調整過的影像會自動加入隱藏 SynthID watermark,標示其經 AI 編輯。
- source: [S04]
- status: official
- audiences: dev=detail · ai-user=detail · general=faq

### KB-033 Image Playground + SynthID
- claim: Image Playground 可生成幾乎任意風格(含 photorealistic)的高品質圖片,由 PCC 上的新生成模型驅動;生成圖片自動加入隱藏 SynthID watermark;可用描述或 tap/circle/brush 修改;可選 aspect ratio;可用於 Messages、Lock Screen wallpapers、Contact Posters。
- source: [S04]
- status: official
- audiences: dev=detail · ai-user=detail · general=faq

### KB-034 SynthID 是 Google 的
- claim: SynthID 為 Google DeepMind 的 AI 內容浮水印與辨識技術;Apple Intelligence 生成或編輯影像所嵌入的隱藏浮水印即採用 SynthID。
- source: [S04], [S18]
- status: official
- note: T2 屬性事實,文中應點明來源方(Google DeepMind)。S04(Apple)以「SynthID watermark」之名使用該技術但未於頁面說明其歸屬;「SynthID 為 Google DeepMind 技術」之歸屬以 S18(Google DeepMind 官方)佐證。〔2026-06-24 Chrome 查核補正:原僅引 S04,該頁未述歸屬。〕
- audiences: dev=detail · ai-user=detail · general=faq

### KB-035 影像每日用量
- claim: 部分功能(含 image generation)因依賴 powerful server models 而有 daily usage limits;多數 iCloud+ 方案提供 increased access。
- source: [S03]
- status: official
- audiences: dev=concept · ai-user=detail · general=faq

---

## 7. AFM 3 Cloud Pro 與硬體角色

### KB-036 Cloud Pro 部署
- claim: 為 AFM 3 Cloud Pro,Apple 與 Google、NVIDIA 合作,將 PCC 擴展到 Google Cloud 的 NVIDIA GPUs,同時維持相同隱私保護保證。
- source: [S01], [S02]
- status: official
- audiences: dev=detail · ai-user=concept · general=faq

### KB-037 硬體堆疊
- claim: PCC on Google Cloud 的 confidential inference 硬體基礎為 NVIDIA Confidential Computing with NVIDIA GPUs、Intel CPUs with TDX、Google's Titan chip。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-038 NVIDIA GPU 角色
- claim: NVIDIA GPUs(Blackwell)承擔 server-side inference;NVIDIA Confidential Computing 提供 GPU 端 confidential inference 與 data-in-use 保護。
- source: [S02], [S13], [S14]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-039 Intel CPU 角色（精準理解）
- claim: Intel CPUs with TDX 提供 CPU 端 confidential VM / trusted execution(VM isolation、memory protection)。官方並未表示模型主要在 Intel CPU 上執行;Intel TDX 與 NVIDIA CC 共同保護從 CPU 到 GPU 整條 compute path 的 data-in-use。
- source: [S02], [S13]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-040 Google Titan 角色
- claim: Google Titan chip(Titanium architecture)提供硬體 root of trust,確保 boot 流程與硬體平台本身的完整性。
- source: [S02], [S13]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-041 Cloud Pro 評測
- claim: 相對 AFM 3 Cloud,text overall response satisfaction 約 +10%,image understanding overall 約 +14%,Math 約 +14%。
- source: [S01]
- status: official-beta
- audiences: dev=detail · ai-user=concept · general=omit

---

## 8. PCC on Google Cloud（Apple Security 官方）

### KB-042 撰寫團隊
- claim: 文章由 Apple SEAR、User Privacy、Core OS、Services Engineering(ASE)、Machine Learning and AI(AIML)共同撰寫。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-043 擴展範圍
- claim: Apple 將 PCC 擴展到自有資料中心之外;與 Google、NVIDIA 在 Google Cloud 上執行新 Apple Intelligence 工作負載;這是 PCC 首次延伸到第三方資料中心。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=detail · general=concept

### KB-044 用途
- claim: 最 demanding 的任務(含 agentic tool-use 與 complex reasoning)交由擴展到 Google Cloud、使用 NVIDIA GPUs 的 PCC 處理,同時維持 Apple 的安全與隱私保護。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-045 產業脈絡
- claim: PCC 最初僅建於 Apple silicon;業界一直在提供可組合到 PCC 安全水準的 confidential inference primitives,但在此之前從未被整合成一條可在全球規模運作的端到端 confidential inference pipeline——這正是 PCC on Google Cloud 所達成。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-046 五項核心要求
- claim: 核心要求維持不變:stateless computation、enforceable guarantees、no privileged runtime access、non-targetability、verifiable transparency。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=concept · general=concept

### KB-047 trusted computing base
- claim: 不僅依賴 confidential computing 緩解 confidential VM 之外的特權存取(含 side-channel);將 firmware、host 與 guest OS stacks、application code 全納入 trusted computing base,受 verifiable transparency 與 no-privileged-access 保障。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-048 append-only ledger
- claim: 為防供應鏈攻擊,維護 Google Cloud PCC fleet 中所有硬體的 cryptographically verifiable、append-only ledger。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-049 雙獨立信任根
- claim: 對可能被濫用以外洩使用者資料的元件,software attestation rooted in at least two separate roots of trust from independent vendors。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-050 推論堆疊隔離
- claim: 沿用 PCC on Apple silicon 的架構模式:每個請求的初始網路資料解析在獨立 namespace 的專屬 process 進行;共用推論軟體以短 time-to-live 回收;attested keys 存於與外部輸入隔離的專屬 confidential VM。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-051 Apple 控制權
- claim: 不論基礎設施位於何處,Apple 保留對 PCC software 的完整控制;Apple devices 只信任 Apple cryptographically approved 的 PCC software。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=detail · general=faq

### KB-052 summer preview 漸進上線
- claim: PCC on Google Cloud 將在 summer preview 期間逐步補齊完整防護。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-053 透明度
- claim: 一如 PCC on Apple silicon,所有 binaries 公開供 public inspection;提供 public research tooling;透過 Apple Security Bounty Program 提供 live PCC nodes in research mode。
- source: [S02]
- status: official
- audiences: dev=detail · ai-user=concept · general=concept

### KB-054 後續官方文件
- claim: 更多技術細節將於本月稍晚的 Confidential Computing Summit 公布;並於今年稍晚更新 PCC Security Guide 與研究計畫文件。
- source: [S02]
- status: forthcoming
- audiences: dev=detail · ai-user=omit · general=omit

---

## 9. Google Cloud / NVIDIA（合作方官方）

### KB-055 Google Cloud serving platform
- claim: Google Cloud 與 Apple 打造符合 Apple 對 PCC 之 security/confidentiality/transparency 目標的 serving platform;核心為 Confidential Computing portfolio 與 Titanium security architecture(以自研 Titan chip 為特色,提供硬體 root of trust)。
- source: [S13]
- status: official
- note: T2;文中標明 Google Cloud 為來源方。
- audiences: dev=detail · ai-user=concept · general=omit

### KB-056 Google Cloud — TDX/CC/Blackwell/path
- claim: Google Cloud 以 Intel TDX 與 NVIDIA Confidential Computing 提供 VM 硬體層隔離;Titan 部署於整個 fleet 建立硬體 root of trust;利用 Intel CPU 與 NVIDIA Blackwell GPUs 的安全功能保護 data-in-use,確保 CPU 到 GPU 整條 compute path 受保護。
- source: [S13]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-057 NVIDIA 官方
- claim: NVIDIA Blackwell GPUs with Confidential Computing 支援 Apple Intelligence 的 server-side inference,整合進 PCC 的硬體安全架構,運行於 Google Cloud。
- source: [S14]
- status: official
- note: T2;文中標明 NVIDIA 為來源方。
- audiences: dev=detail · ai-user=concept · general=omit

---

## 10. 訓練資料與流程

### KB-058 訓練資料
- claim: 資料混合包括 publicly available information、licensed/purchased、open-sourced、dedicated studies、synthetic data。不使用使用者 private personal data 或 user interactions 訓練;尊重 web publishers opt out 的權利。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=detail · general=concept

### KB-059 訓練流程
- claim: 顯著擴大在最新世代 cloud TPU accelerators 上的 pre-training;所有模型先共享 common initial foundation 再分化,加入 audio、image understanding、long-context reasoning、high-quality visual generation;post-training 結合 supervised fine-tuning 與 multi-stage reinforcement learning。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-060 硬體最佳化 + QAT
- claim: 為各自目標硬體最佳化(四模型 → Apple silicon;Cloud Pro → NVIDIA GPUs);以 Quantization Aware Training 大幅壓縮模型同時維持高準確度。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

---

## 11. Responsible AI

### KB-061 四原則
- claim: 四項 Responsible AI 原則:Empower users with intelligent tools、Represent our users、Design with care、Protect privacy。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=detail · general=concept

### KB-062 安全做法
- claim: 以 safety taxonomy 辨識敏感內容;進行 multilingual post-training alignment、使用 language-specific guardrail models、進行由 native speakers refined 的 human red teaming(涵蓋所支援的各 locale)。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=concept · general=concept

---

## 12. 評測（方法與功能）

### KB-063 評測哲學
- claim: 在 model 與 feature 兩個層級評測;model-level 維度包括 Instruction Following、Truthfulness、Presentation,含影像時另評 Image Understanding;官方註明數據反映模型當前開發階段。
- source: [S01]
- status: official-beta
- audiences: dev=detail · ai-user=concept · general=omit

### KB-064 TTS MOS
- claim: 以 5 分 MOS 評比;AFM 3 Core Advanced 在 1B 啟用規模下,General Voice 4.15(production 3.87,+0.28)、Conversational Voice 4.24(production 3.82,+0.42);官方稱 MOS 每升 0.1 即為高度可察覺改善。
- source: [S01]
- status: official-beta
- audiences: dev=detail · ai-user=concept · general=omit

### KB-065 Dictation
- claim: 沿七維度(Overall Quality、Punctuation、Casing、Layout、Meaning Capture、Disfluency Handling、Style)對前代做偏好判斷;1B 規模下 Overall Quality 偏好 44.7% 對 17.6%,其餘六維一致勝出。
- source: [S01]
- status: official-beta
- audiences: dev=detail · ai-user=concept · general=omit

### KB-066 評測語系分組
- claim: 評測語系分組:English(US/GB/AU/IN 等方言);PFIGSCJK;DDNSTV;AFIHHMPRTU。
- source: [S01]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

---

## 13. 模型驅動的功能

### KB-067 Siri AI
- claim: 全新 Siri,深度整合於 iPhone/iPad/Mac/Apple Watch/Apple Vision Pro;可用 personal context understanding 跨 messages/emails/photos 搜尋、以 systemwide app actions 跨 app 完成任務、回答螢幕內容相關問題或上網以 broad world knowledge 生成回答;有專屬 Siri app,透過 iCloud 私密同步對話歷史。
- source: [S03], [S06]
- status: official
- audiences: dev=concept · ai-user=detail · general=concept

### KB-068 Photos 編輯功能
- claim: Spatial Reframing 可於拍攝後改善構圖;另有 Extend、Clean Up 等;AI 編輯影像帶 SynthID(見 KB-032)。
- source: [S03], [S04]
- status: official
- audiences: dev=concept · ai-user=concept · general=faq

### KB-069 其他模型驅動功能
- claim: 新一代 Apple Intelligence 亦驅動 Safari(多分頁、Notify Me)、Messages 與 Mail 溝通輔助、Image Playground 創作等。
- source: [S03], [S04]
- status: official
- audiences: dev=omit · ai-user=concept · general=faq

---

## 14. 開發者存取

### KB-070 Foundation Models framework
- claim: 單一 native Swift API;支援更強的 on-device 模型(含 image input)、server 模型、custom skills。
- source: [S05]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-071 多 provider
- claim: 可透過同一 API 使用 Claude、Gemini,或任何實作新 language model protocol 的 provider。
- source: [S05]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-072 on-device context 檢查
- claim: 提供 API 檢查模型 context 大小、計算 instructions/prompts/transcripts 的 token 數,以適配執行硬體。
- source: [S08]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-073 Dynamic Profiles
- claim: Dynamic Profiles 讓開發者在執行中即時更新「模型如何與其 app 互動」;WWDC session 另涵蓋以 dynamic sessions 組合 instructions 與 profiles 打造 agentic 體驗。
- source: [S05], [S08]
- status: official
- note: 〔2026-06-24 Chrome 查核補正:S05 措辭為「update how models interact with their apps on the fly」;原 KB「切換 models/tools/instructions」改依 S05 措辭並補 S08(session 之 Composing models/Dynamic Profiles 章節)。〕
- audiences: dev=detail · ai-user=omit · general=omit

### KB-074 Small Business 免費 PCC
- claim: App Store Small Business Program 且少於 2 million total first-time downloads 的開發者,可無 cloud API cost 使用 PCC 上的 AFM。
- source: [S05]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-075 Core AI
- claim: 全新框架,為在 device 上執行自帶模型的最佳途徑;架構針對 Apple silicon 的 unified memory 與 Neural Engine 最佳化,讓開發者在本機部署 full-scale LLMs。
- source: [S05]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-076 Xcode 27
- claim: 將 Anthropic、Google、OpenAI 的模型與 agents 帶入開發流程;對話具 interactive planning、multiturn Q&A、canvas;agents 可驗證自身工作(測試、Playgrounds、previews、Device Hub);以 plug-ins 透過 Model Context Protocol 與 Agent Client Protocol 擴充,GitHub 與 Figma 首批支援;Apple silicon only、體積縮小 30%;Xcode Cloud 速度最高 2x。
- source: [S05]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

### KB-077 框架 roadmap
- claim: Foundation Models framework 預計今夏稍晚 open source 並支援 Linux;提供 Python SDK;透過 PCC 自 watchOS 27 起可用;另有 Evaluations framework。
- source: [S08], [S09]
- status: official
- audiences: dev=detail · ai-user=omit · general=omit

---

## 15. 可用性

### KB-078 時程
- claim: 新功能自發表當日起透過 Developer Program 測試;下月起 public beta;新功能今秋以免費更新推出。
- source: [S03]
- status: official
- audiences: dev=detail · ai-user=detail · general=faq

### KB-079 支援語言（16 種）
- claim: English、Danish、Dutch、French、German、Italian、Norwegian、Portuguese、Spanish、Swedish、Turkish、Vietnamese、Chinese(simplified)、Chinese(traditional)、Japanese、Korean。
- source: [S03]
- status: official
- audiences: dev=detail · ai-user=detail · general=concept

### KB-080 支援裝置
- claim: iPhone 16 以上、iPhone 15 Pro、iPhone 15 Pro Max、iPad mini(A17 Pro)、M1 以上 iPad、MacBook Neo(A18 Pro)、M1 以上 Mac、Apple Vision Pro、Apple Watch Series 9 以上、Ultra 2 以上、SE 3(需與已啟用 Apple Intelligence 的 iPhone 在附近配對)。
- source: [S03]
- status: official
- audiences: dev=detail · ai-user=detail · general=concept

### KB-081 Siri AI 英文 beta
- claim: Siri AI 今年稍晚以 beta 形式提供給設定為英文的支援裝置使用者,Apple 將迅速擴增更多語言;開發者測試自發表日起於 iOS/iPadOS/macOS/visionOS 27,watchOS 27 於後續 beta。
- source: [S03]
- status: official
- audiences: dev=detail · ai-user=detail · general=faq

### KB-082 EU / DMA
- claim: Mac 與 Apple Vision Pro 使用者在 EU 可於設定支援語言時使用 Siri AI;Siri AI 於 iOS、iPadOS、watchOS 初期不在 EU 提供(Apple 另有專稿說明因 DMA 延後)。
- source: [S03], [S07]
- status: official
- audiences: dev=detail · ai-user=detail · general=faq

### KB-083 中國
- claim: Siri AI 與其他新 Apple Intelligence 功能在 Apple 處理法規要求前不在中國提供。
- source: [S03]
- status: official
- audiences: dev=detail · ai-user=detail · general=faq

---

## 16. 官方尚未公開

### KB-084 各模型未公開規格
- claim: 未公開項目——AFM 3 Core:layer count、hidden size、heads、確切 context、quantization bits、RAM、tokens/sec;Core Advanced:expert 數、routing/mask granularity、shared expert 比例、載入延遲、支援裝置完整清單;AFM 3 Cloud:參數量、active params、PT-MoE 拓撲、SKU、latency/throughput;ADM 3 Cloud:參數量、diffusion/AR 架構、latent size、sampling steps、最高解析度、adapter 尺寸;Cloud Pro:參數量、是否 MoE、active params、context、GPU/CPU 具體 SKU、instance type、GPU topology、inference cost。
- source: [S01]
- status: official
- note: 對應「不臆測」原則;不得填補。
- audiences: dev=detail · ai-user=concept · general=omit

### KB-085 即將更新
- claim: Apple 已預告今夏稍晚發布 technical report,內含更新的 evaluations 與 benchmarks。
- source: [S01]
- status: forthcoming
- note: 觸發 KB 之 official-beta 條目於 S15 落地後重新校正(里程碑 M6)。
- audiences: dev=detail · ai-user=concept · general=omit

---

## 17. PCC 基礎（2024 世代，自前作遷移）

> 自 `apple-pcc-privacy-explainers` 遷移之 2024 世代（Apple silicon）PCC 基礎條目,來源重新對應到 `S-PCC1`（2024 PCC 原文）/ `S-PCC2`（PCC Security Guide）。
> 這些是 **KB-042～KB-057（PCC on Google Cloud 擴展）的地基**:GCP 擴展沿用同一套要求與機制,只是把信任根與 confidential computing 堆疊延伸到第三方資料中心。凡 GCP 擴展條目對應到此處之基礎者,於 `note:` 標明。
> 僅遷移**事實層敘述**;Apple PCC 受限授權原始碼（`S-PCC3`）依不變式 9 **不**搬入。

### KB-101 PCC 的定位（2024）
- claim: Private Cloud Compute(PCC)是 Apple 為「需動用雲端運算的 AI 請求」打造的隱私架構,把 Apple device 的安全與隱私保證延伸到雲端;僅在端側模型不足以處理請求時才動用。
- source: [S-PCC1]
- status: official
- note: 2024 世代基礎;2026 之 PCC on Google Cloud（KB-043）為其首次延伸到第三方資料中心。
- audiences: dev=detail · ai-user=detail · general=concept

### KB-102 五項核心要求（2024 原始定義）
- claim: PCC 自始即以五項核心要求為設計準則:stateless computation、enforceable guarantees、no privileged runtime access、non-targetability、verifiable transparency。
- source: [S-PCC1]
- status: official
- note: KB-046 述「核心要求於 GCP 擴展維持不變」即指此五項。
- audiences: dev=detail · ai-user=concept · general=concept

### KB-103 Stateless computation
- claim: 使用者資料只用於滿足當次請求,運算完成後不被保留、不被記錄,Apple 不得將其用於其他用途;PCC 在請求之間不保留任何使用者狀態。
- source: [S-PCC1]
- status: official
- audiences: dev=detail · ai-user=detail · general=faq

### KB-104 Enforceable guarantees
- claim: PCC 的隱私保證並非僅靠政策承諾,而是以技術手段使其在架構上可被強制(透過硬體與軟體機制,如 code signing 與 sealed software),不依賴對營運者的信任。
- source: [S-PCC1]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-105 No privileged runtime access
- claim: PCC 不提供可在執行期取得使用者資料的特權介面;移除了遠端 shell 等除錯通道,使站點可靠人員(含 SRE)無法在執行期存取使用者資料。
- source: [S-PCC1]
- status: official
- audiences: dev=detail · ai-user=concept · general=faq

### KB-106 Non-targetability
- claim: 即使攻擊者能危害部分基礎設施,也無法鎖定特定使用者的請求;以 metadata 最小化、由獨立第三方營運的 relay 隱藏來源 IP、請求無法被導向特定節點(target diffusion)、節點隨機分派等手段達成。
- source: [S-PCC1]
- status: official
- audiences: dev=detail · ai-user=concept · general=omit

### KB-107 Verifiable transparency（transparency log）
- claim: Apple 承諾將每個正式的 PCC software image 發佈到可公開稽核、append-only 的 transparency log;Apple device 只會把資料送往其軟體版本已登錄於該 log 的 PCC 節點。
- source: [S-PCC1]
- status: official
- note: 為 KB-048（GCP 之 append-only ledger）之 2024 世代前身。
- audiences: dev=detail · ai-user=concept · general=concept

### KB-108 Attestation（2024 世代）
- claim: device 在送出資料前先驗證 PCC 節點的 attestation:確認其開機鏈、OS image 與軟體量測值與已公開登錄之版本相符、且金鑰受硬體 root of trust 保護;不符即拒絕連線。
- source: [S-PCC1]
- status: official
- note: 為 KB-049（GCP 之雙獨立信任根 attestation）之地基。
- audiences: dev=detail · ai-user=concept · general=omit

### KB-109 硬體 root of trust（Apple silicon）
- claim: 2024 世代 PCC 節點建於 Apple silicon 伺服器,以 Secure Enclave 與 Secure Boot 等提供硬體信任根,確保節點只執行 Apple 簽署且已登錄的軟體。
- source: [S-PCC1]
- status: official
- note: GCP 擴展改以 Google Titan（KB-040）+ 雙獨立信任根（KB-049）達成等效保證。
- audiences: dev=detail · ai-user=omit · general=omit

### KB-110 VRE（Virtual Research Environment）
- claim: Apple 提供 PCC software image 與 Virtual Research Environment 等研究工具,讓安全研究者得以檢視並驗證 PCC 的軟體聲明;並透過 Apple Security Bounty 提供獎勵。
- source: [S-PCC1], [S-PCC2]
- status: official
- note: 對應 KB-053（GCP 擴展之公開檢視與 research mode 節點）。
- audiences: dev=detail · ai-user=concept · general=omit

### KB-111 PCC Security Guide
- claim: Apple 發布 PCC Security Guide,詳述 PCC 的威脅模型、架構與外部驗證方式,供公眾審視。
- source: [S-PCC2]
- status: official
- note: 更新版預告於今年稍晚發布(KB-054 / S16, forthcoming)。
- audiences: dev=detail · ai-user=omit · general=omit

---

## 18. PCC 深層機制（2024 世代，自前作深化遷移）

> 自前作 `apple-pcc-privacy-explainers` 進一步遷移之 PCC Security Guide 級細節,深化 §17 之基礎條目;來源對應 `S-PCC2`（PCC Security Guide）/ `S-PCC1`（2024 blog）。僅事實層繁中轉述,不搬入受限碼(不變式 9)。多數為 dev 專用深度。

### KB-112 Ephemeral Data Mode（無狀態之機制）
- claim: PCC 以 Ephemeral Data Mode 落實無狀態:可變資料寫於與唯讀 Signed System Volume 分離的專屬 data volume;SEP 於每次開機隨機化該卷金鑰階層,使前一 session 寫入的資料無法被後續開機讀取;開機任務丟棄前次加密卷並重建乾淨卷。
- source: [S-PCC2]
- status: official
- note: 深化 KB-103(stateless computation)。
- audiences: dev=detail · ai-user=concept · general=omit

### KB-113 移除執行期動態碼途徑
- claim: 為 no-privileged-runtime-access,節點移除/停用系統 shell、直譯器、除錯器與 JIT 編譯;執行期亦無載入額外軟體以擴大特權的機制。
- source: [S-PCC2]
- status: official
- note: 深化 KB-105。
- audiences: dev=detail · ai-user=omit · general=omit

### KB-114 匿名權杖（TGT/OTT，盲簽章）
- claim: PCC 以密碼學上不可連結的權杖施加用量限制,而非帳號/裝置憑證:Token Granting Token 與 One-Time Tokens 以 RSA Blind Signatures(Privacy Pass)建構,使權杖與其請求不可連結;簽發身分服務與請求路由/處理完全分離。
- source: [S-PCC2]
- status: official
- note: 深化 KB-106(non-targetability)。
- audiences: dev=detail · ai-user=omit · general=omit

### KB-115 第三方中繼隱藏來源 IP（OHTTP）
- claim: 所有請求經第三方中繼隱藏來源 IP,採 Oblivious HTTP;用戶端以 HPKE 對 Apple Oblivious Gateway 加密,並隨機選用由不同第三方營運的 Oblivious Relay(2024 世代為 Cloudflare 與 Fastly)。
- source: [S-PCC2]
- status: official
- note: 深化 KB-106。
- audiences: dev=detail · ai-user=omit · general=omit

### KB-116 目標擴散（k-子集）
- claim: 每個請求只加密給大小為 k 的節點子集,使單一節點被攻陷僅能解密少量請求;鎖定特定使用者需大範圍、易被偵測的攻擊。
- source: [S-PCC2]
- status: official
- note: 支撐 non-targetability(KB-106)。
- audiences: dev=detail · ai-user=omit · general=omit

### KB-117 硬體信任根細節（Apple silicon / SEP）
- claim: 2024 PCC 信任根為自研 Apple silicon,安全特性熔入矽晶、製造後不可變;Secure Enclave(UID 熔入、私鑰永不暴露給軟體)、Secure & Measured Boot、硬體式 attestation(以 Data Center Identity Key 簽署開機量測值)。
- source: [S-PCC2]
- status: official
- note: 深化 KB-108/109。
- audiences: dev=detail · ai-user=omit · general=omit

### KB-118 軟體基礎（Cryptex / TXM / REM / SSR）
- claim: 節點 OS 為 iOS 之最小化強化子集,可量測、執行期不可變;功能以 Cryptex(完整簽署之分發包)載入;碼執行政策由獨立於 kernel 的 Trusted Execution Monitor(TXM)強制,單純攻陷 kernel 不足以執行任意碼;Software Sealed Registers 以棘輪累積量測並納入 attestation;Restricted Execution Mode(REM)為單向轉換,進入後拒絕載入新 trust cache。
- source: [S-PCC2]
- status: official
- note: 深化 KB-104/108。
- audiences: dev=detail · ai-user=omit · general=omit

### KB-119 透明性日誌細節（append-only / 90 天 / 不可移除）
- claim: Apple 把每個生產 build 的軟體量測值發布到 append-only、密碼學防竄改的透明性日誌;裝置只把資料送給能 attest 自己執行「已公開登錄軟體」的節點;每個生產映像於納入日誌後 90 天內(或相關軟體更新可得時,以較早者為準)公開 binary 供檢視;發布一旦簽入,移除即可被偵測(log-backed map 結構)。
- source: [S-PCC1], [S-PCC2]
- status: official
- note: 深化 KB-107;為 KB-048(GCP append-only ledger)之前身。
- audiences: dev=detail · ai-user=omit · general=omit

### KB-120 VRE 細節
- claim: Virtual Research Environment 於 Apple silicon Mac 上模擬 PCC 節點(含虛擬 SEP,首次可對該元件做安全研究),可列出/檢視軟體發布、驗證透明性日誌一致性、下載發布 binary、對 demo 模型推論、修改與除錯;以 pccvre 工具操作。
- source: [S-PCC2]
- status: official
- note: 深化 KB-110。
- audiences: dev=detail · ai-user=omit · general=omit

### KB-121 Apple Security Bounty 金額
- claim: PCC 安全獎勵金額:具 entitlements 之遠端任意碼執行 US$1,000,000;取得信任邊界外之使用者請求資料 US$250,000;具特權網路位置存取請求資料 US$150,000;未經 attest 之碼執行 US$100,000;意外資料揭露 US$50,000;另對 PCC 有重大影響之安全問題仍會評估給獎。
- source: [S-PCC1]
- status: official
- note: 深化 KB-110/053;為「以技術強制、歡迎外部檢驗」之具體信號。
- audiences: dev=detail · ai-user=concept · general=faq

### KB-122 威脅模型（三情境 + 縱深防禦）
- claim: PCC 的設計目標為即使遭攻擊,五大要求亦永不被違反;考量三大威脅情境——意外資料揭露、來自使用者請求的外部入侵、實體或內部存取——採縱深防禦(預防→偵測→圍堵→時間限界→目標擴散)。
- source: [S-PCC2]
- status: official
- note: 深化 KB-101。
- audiences: dev=detail · ai-user=concept · general=omit

### KB-123 準確性紅線：無 reproducible builds
- claim: PCC 的可驗證鏈為「attestation ↔ 透明性日誌」,而非「源碼 ↔ binary」:Apple 未提供 reproducible builds,公開源碼僅作分析輔助,無法證明發布之 binary 確由該源碼編譯。
- source: [S-PCC2]
- status: official
- note: 準確性紅線;開發者版須區分「Apple 宣稱」與「可獨立驗證」。對應前作 QA 紅線。
- audiences: dev=detail · ai-user=omit · general=omit

### KB-124 推論引擎（TIE / AFM-server，2024 世代）
- claim: 2024 世代 PCC 以自研 The Inference Engine(TIE)+ MetalLM 執行 AFM-server;每請求 process 隔離,共用推論軟體定期回收以防殘留使用者資料;輸出串流加 padding 以防 token 長度側通道。
- source: [S-PCC2]
- status: official
- note: 2024 世代 server 推論;與 2026 之 PT-MoE(KB-024)屬不同層次,不混為一談。
- audiences: dev=detail · ai-user=omit · general=omit

---

## 19. 合作方官方補充（2026，Chrome 查核新增）

> 2026-06-24 以 Claude for Chrome 查核時,於 T2 官方頁發現、原 KB 未收錄之事實。見 `sources/verification-2026-06-24.md`。

### KB-125 Google open-source host stack（T2）
- claim: Apple 與 Google 共同打造 open-source host stack,以支援 PCC on Google Cloud 的透明度,使外界得以獨立檢視與驗證系統的安全屬性。
- source: [S13]
- status: official
- note: T2,文中標明來源方 Google Cloud;與 KB-047/053 透明度一致。
- audiences: dev=detail · ai-user=omit · general=omit

### KB-126 NVIDIA Confidential Computing 能力（T2）
- claim: NVIDIA 官方說明其 Confidential Computing 提供 hardware-rooted trust、encrypted communication paths、remote attestation;以 TEE 隔離工作負載,並在送出敏感資料前可密碼學驗證基礎設施未被竄改;對終端使用者而言意指「連系統的建造者也無法看到其資料與對話」。
- source: [S14]
- status: official
- note: T2,文中標明來源方 NVIDIA。
- audiences: dev=detail · ai-user=concept · general=omit
