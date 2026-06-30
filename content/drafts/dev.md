# 第三代 Apple Foundation Models 與 PCC on Google Cloud — 開發者版

> **非官方科普／教育用途。** 本文件由獨立維護者整理,**非** Apple／Google／NVIDIA 官方出版品,與各該公司無隸屬關係。"Apple"、"Private Cloud Compute"、"Apple Intelligence"、"Gemini"、"Google"、"NVIDIA"、"Blackwell" 等為各自所有人之商標,僅作指稱與說明之用。
>
> **來源分層**:本文事實僅引 `sources/source-index.md` 之 **T1（Apple 官方）** 與 **T2（合作方官方:Google Cloud / NVIDIA）**;第三方報導不作為事實來源。每段事實後標來源代碼 `[S0X]`(對照見 `sources/source-map.md`)。
>
> **status 圖例**:`official`(已定版)/ `official-beta`(beta 階段、夏季 technical report 將更新)/ `forthcoming`(官方已預告、尚未發布)。凡 `official-beta` 數字皆標「**beta 快照**」。
>
> **基準日期**:2026-06-23。

---

## 0. 前言與邊界宣告

本文針對懂 LLM 架構、TEE / attestation、機密運算的讀者,把 2026-06 Apple 一次釋出的兩件事——**第三代 Apple Foundation Models(AFM 3,五個模型)**與 **Private Cloud Compute(PCC)首次擴展到第三方資料中心(Google Cloud + NVIDIA GPU)**——收斂為單一可回溯的技術說明。

寫作上特別維持四條邊界,請讀者一併以此檢視全文:

1. **官方 vs 報導**:坊間關於金額、客製 Gemini 參數量、distillation 比例等說法多為報導,Apple 未證實;本文正文一律不採,僅於**附錄 A** 標記為「報導,非官方」。
2. **Apple vs 合作方(T2)**:confidential computing 堆疊的部分聲明出自 Google Cloud / NVIDIA,本文逐處標明來源方,不冒充 Apple 官方說法。
3. **不臆測**:Gemini 技術介入各模型的**具體形式、比例與商務條款,官方未說明**,本文不填補 `[S01][S02][S05]`。
4. **beta 時效**:目前所有評測為 beta 階段快照;Apple 已預告**今夏稍晚**發布 technical report,含更新後的 evaluations 與 benchmarks `[S01]`(`forthcoming`)。屆時依 `docs/CHANGELOG.md` 逐條校正。

### 如何閱讀本文:來源分層與狀態圖例

| 標記 | 意義 | 在本文中的處理 |
| --- | --- | --- |
| **T1** | Apple 官方(ML Research、Security、Newsroom、Developer) | 直接作為事實 |
| **T2** | 合作方官方(Google Cloud / NVIDIA) | 作為事實,但**文中標明來源方** |
| 排除 | 第三方報導/詮釋 | **不**入正文;僅附錄 A 標「報導,非官方」 |
| `official` | 官方已公開、定版 | 一般陳述 |
| `official-beta` | 官方公開但屬 beta 階段 | 數字後標「beta 快照」 |
| `forthcoming` | 官方已預告、尚未發布 | 標明待發布,不臆測內容 |

每段事實後的 `[S0X]` 為來源代碼,完整對照見 `sources/source-map.md`,頁面存檔見 `sources/primary/_fetch-log.md`。術語見 `docs/GLOSSARY.md`。

---

# 主線一 — 這是什麼（五個模型）

## 1.1 五模型總覽與硬體目標

第三代 Apple Foundation Models 是一個由**五個基礎模型**組成的家族,與 Google 合作打造,橫跨端側與 PCC `[S01]`。各模型定位:

- **AFM 3 Core** — 端側模型;前代 3-billion-parameter dense 模型的下一代,品質再提升 `[S01]`。
- **AFM 3 Core Advanced** — Apple 最強端側模型;natively multimodal,支援 expressive voices 與 higher-accuracy dictation;**20-billion-parameter,採 sparse architecture,依 request 每次啟用 1–4 billion parameters**,由最強的 Apple silicon systems 解鎖並最佳化 `[S01]`。
- **AFM 3 Cloud** — PCC 上的 server-side workhorse,針對 speed、efficiency、performance 最佳化 `[S01]`。
- **ADM 3 Cloud(Image)** — PCC 上的影像生成與編輯模型,驅動進階照片編輯工具、全新 Image Playground 等 `[S01]`。
- **AFM 3 Cloud Pro** — Apple 最強 server-based model,驅動最 demanding 的情境,如 agentic tool use 與 complex reasoning `[S01]`。

**硬體目標**:AFM 3 Core、Core Advanced、Cloud、ADM 3 Cloud 皆 purpose-built for Apple silicon;**AFM 3 Cloud Pro 由 Apple 與 Google、NVIDIA 合作擴展到 Google Cloud 的 NVIDIA GPUs** `[S01]`。

下表彙整五模型的官方定位(規格細節僅列官方已公開者;未公開項目見〈收尾〉,不臆測):

| 模型 | 位置 | 官方定位 | 已公開規格 | 硬體 |
| --- | --- | --- | --- | --- |
| **AFM 3 Core** | 端側 | 端側基本款,前代 3B dense 的下一代 | (參數量等未公開) | Apple silicon |
| **AFM 3 Core Advanced** | 端側 | 最強端側,natively multimodal、expressive voice、higher-accuracy dictation | 20B sparse,每次啟用 1–4B | 最強 Apple silicon |
| **AFM 3 Cloud** | PCC | server-side workhorse(speed/efficiency/performance) | 開發者可見:32K context + reasoning | Apple silicon |
| **ADM 3 Cloud** | PCC | 影像生成/編輯;controllability + parameter efficiency | (架構/解析度未公開) | Apple silicon |
| **AFM 3 Cloud Pro** | PCC(GCP) | 最強 server model;agentic tool use、complex reasoning | (參數量等未公開) | Google Cloud NVIDIA GPU |

> 來源:KB-001–007 `[S01]`;開發者可見 32K+reasoning 為 `[S08]`。

**設計觀察(本文框架,非官方新事實)**:這套陣容呈現清楚的關注點分離——端側兩個模型負責低延遲、隱私敏感、隨時可用的請求;PCC 三個模型則分別承擔通用 server 工作(AFM 3 Cloud)、影像生成/編輯(ADM 3 Cloud)、以及最吃重的推理與代理(AFM 3 Cloud Pro)。有一處特別容易被混淆,值得先釐清:五個模型**皆**與 Google 合作打造 `[S01]`,但**只有**最強的 AFM 3 Cloud Pro 被擴展到 Google Cloud 的 NVIDIA GPU `[S01]`,其餘四者仍 purpose-built for Apple silicon `[S01]`。也就是說,「**與 Google 合作**」(模型層)與「**跑在 Google Cloud**」(部署層)是兩件不同的事:前者涵蓋全部五個模型,後者只涉及一個模型;讀者不應把兩者混為一談(合作的具體形式見 §1.3,部署的機密運算堆疊見 §2.5–2.7)。

![圖 D1 — 五模型路由圖](assets/diagrams/D1-model-routing.svg)

## 1.2 PCC 隱私邊界（總綱）

三個 server 模型(AFM 3 Cloud、ADM 3 Cloud、AFM 3 Cloud Pro)執行於 PCC;Apple 強調此確保**使用者資料不會被儲存或分享給任何人,包括 Apple** `[S01]`。完整的 PCC 機制見主線二 §2.6–2.8。

## 1.3 Apple × Google / Gemini：官方措辭與邊界

關於與 Google 的合作,三個官方面各自的措辭如下(本文僅並陳官方原意,不外推):

- **ML Research**:五個模型「custom-built in collaboration with Google」`[S01]`。
- **開發者稿(Newsroom)**:開發者可用的新一代 AFM「custom-built in collaboration with Google and its Gemini models」`[S05]`。
- **Security**:今年 Apple 與 Google 合作,「leverage the technologies behind its Gemini family of models」來建構新一代 AFM `[S02]`。

**如何讀這三句官方措辭**:三者用詞並不相同,值得逐一辨析(以下為對官方文字的閱讀,不外推):

- ML Research 的「custom-built in collaboration with Google」與開發者稿的「…and its Gemini models」,陳述的是**合作關係與客製事實**,並點名 Gemini 模型 `[S01][S05]`。
- Security 的「leverage the technologies behind its Gemini family of models」措辭較精確:它說的是運用 Gemini 家族**背後的技術**,而非直接部署 Gemini 模型本身 `[S02]`。
- 三者**一致**之處:這是「合作 + 客製」而非「轉售他方模型」;且全部冠以 Apple 的模型命名(AFM 3 / ADM 3),執行於 Apple 控制的端側與 PCC。

**邊界(不臆測)**:Gemini 技術介入各模型的**具體形式、比例與商務條款,官方未進一步說明** `[S01][S02][S05]`。因此本文**不**推斷「distillation / teacher signal / runtime Gemini」「介入比例」等任何機制——這些屬報導或詮釋,僅見附錄 A,且明確標為非官方。對開發者而言,實務上會接觸到的是 Apple 的 Foundation Models framework 與多 provider API(§3.4),而非直接面對 Gemini。

> **常見誤解(先釐清五條邊界)**:
>
> - **AFM 3 不是單一模型**,而是五個模型的家族(端側兩個 + PCC 三個)`[S01]`。
> - **「與 Google 合作打造」(模型層,涵蓋五個模型)≠「跑在 Google Cloud」(部署層,僅 AFM 3 Cloud Pro)** `[S01]`;不要把兩者混為一談,也不要簡化成「Siri AI 底層就是 Gemini」。
> - **Cloud Pro、Google Cloud、Gemini、PCC 是四個不同層**:Cloud Pro 是模型名、Google Cloud 是部署地點、Gemini 是被「運用其背後技術」的對象、PCC 是隱私架構 `[S01][S02]`。
> - **`official-beta` ≠ 最終版;`forthcoming` ≠ 已可用;`reported-excluded` ≠ 官方確認**(見〈如何閱讀本文〉狀態圖例)。
> - **端側 / 伺服器 / Cloud Pro 三條路徑不可互換**,硬體與部署邊界各異 `[S01][S02]`。
>
> 以上皆為既有事實的歸納,未新增主張;未公開的夏季 technical report 內容在發布前不寫成定論。

---

# 主線二 — 如何運作（架構與部署）

## 2.1 端側：AFM 3 Core Advanced 的 IFP sparse 架構

**記憶體問題**:傳統 LLM(無論 dense 或 sparsely activated)都要求所有權重常駐 DRAM,形成龐大 footprint,限制消費級硬體的可擴展性 `[S01]`。

**IFP 架構**:AFM 3 Core Advanced 採用建立於 **Instruction-Following Pruning(IFP)** 的新型 sparsely activated 架構(由 Apple 研究員開發)`[S01][S11]`。其關鍵設計:

- **權重存於 NAND**:不把整個模型放進 DRAM,而是把 full model 存於 flash memory(NAND)`[S01]`。
- **per-prompt routing**:因 NAND-to-DRAM 頻寬太慢、無法像標準 MoE 那樣 token-by-token 換權重,改為 **per-prompt** 做 routing——lightweight dense block 在初始處理選定固定 experts,生成過程中週期性重新選擇 `[S01]`。
- **shared / routed experts**:依賴高比例 always-active 的「shared experts」,搭配 input-dependent 的「routed experts」;後者僅在需要時才換入 DRAM `[S01]`。
- **機制(對照官方圖 1)**:模型絕大多數參數是 stacked transformer 中 FFN blocks 的 expert weights;對 query 選擇性載入少量 experts,與 shared/static weights patch 成可在 DRAM 執行的 dense model,並在生成過程週期性重選與更新 `[S01]`。
- **inference-time elasticity**:針對各使用情境採「預先決定的 active 參數量」;權重可跨不同難度請求增量載入,將模型規模推升至遠超傳統 DRAM 限制,同時壓低延遲 `[S01]`。

**為什麼是 per-prompt,而非 token 級 routing?** 標準 MoE 在**每個 token** 都可能路由到不同 experts;但 AFM 3 Core Advanced 的 experts 多數時間存於 NAND,若逐 token 從 NAND 換入 DRAM,延遲不可接受 `[S01]`。IFP 的折衷是:在每個 prompt 的初始處理階段,以一個 lightweight dense block **一次選定**該 prompt 要用的 experts,生成過程中只**週期性重選** `[S01]`。這把「換權重」的頻率從 per-token 降到 per-prompt 等級,使 NAND→DRAM 的搬移成本得以攤銷。

**shared 與 routed experts 的取捨**:高比例 always-active 的 shared experts 確保基本能力恆駐 DRAM、不需搬移;少量 input-dependent 的 routed experts 才按需換入 `[S01]`。兩者最終 patch 成一個可在 DRAM 上以 dense model 形式高效執行的網路,而模型絕大多數參數其實是 FFN blocks 的 expert weights `[S01]`。

**彈性(elasticity)的意義**:由於 active 參數量可依請求難度**預先決定**、權重可**增量載入** `[S01]`,同一模型能在「簡單請求少啟用、困難請求多啟用」之間滑動,於是可把總規模(20B)推升至遠超傳統 DRAM 限制,同時對多數請求維持低延遲 `[S01]`。這也是為何官方以「依 request 每次啟用 1–4B」描述其端側行為 `[S01]`。

**IFP 論文結果**:IFP 為 input-dependent structured pruning,由 sparse mask predictor 依 user instruction 選最相關參數;論文回報 **9B→3B activated 版本可接近 9B dense 效果,且 TTFT 接近 3B dense** `[S11]`。此數據佐證了「少啟用、近全量效果」的可行性;但須注意這是**論文實驗結果**,AFM 3 Core Advanced 的完整內部配置(expert 數、mask 粒度、shared 比例等)**未公開**,本文不據此反推產品規格(見〈收尾〉)`[S11]`。

![圖 D2 — IFP 的 NAND/DRAM 選擇性載入](assets/diagrams/D2-ifp-nand-dram.svg)

## 2.2 AFM 3 Core 評測（beta 快照）

> 以下為 **beta 階段快照**,夏季 technical report 將更新 `[S01]`。

- General text 被偏好 **45.6%**,2025 baseline 為 23.3% `[S01]`(beta 快照)。
- Image understanding 在使用者有明確偏好時,被偏好**超過 61%** `[S01]`(beta 快照)。

## 2.3 伺服器：AFM 3 Cloud 與 PT-MoE

**PT-MoE 升級**:AFM 3 Cloud 在去年的 **Parallel-Track Mixture-of-Experts(PT-MoE)** 基礎上做 key upgrades;架構精煉穩定了訓練,並提升在 context window 內推理與精確 recall 複雜 server-side queries 的能力 `[S01][S12]`。

**開發者可見規格**:開發者可用的 PCC 語言模型(即驅動許多 Apple Intelligence 功能的同一模型)具 **32,000 token context window 與 reasoning 能力** `[S08]`。

**評測(beta 快照)** `[S01]`:

- General text(side-by-side)被偏好 **64.7%**,2025 AFM Server 為 8.7%,跨所有 locale 一致(beta 快照)。
- Single-sided 評測中 overall response satisfaction 相對提升約 **36%**,instruction following 相對提升約 **21%**(beta 快照)。
- Image understanding 被偏好 **37.8%**,2025 baseline 為 9.6%(beta 快照)。

## 2.4 影像：ADM 3 Cloud 架構

ADM 3 Cloud 主打 **strong controllability 與 parameter efficiency**;可泛化到不同 aspect ratios 與 resolutions;汲取更廣的 AFM 家族引導 creation 與 editing `[S01]`。

- **base model + adapters**:base model 原生處理 image creation、editing、Genmoji;另以 specialized adapters 驅動 **Spatial Reframing(Photos)、touch-based modifications、Image Playground personalization** `[S01]`。
- 官方圖 2 展示 ADM 3 Cloud 跨多元主體與複雜光照的 photorealism `[S01]`。

## 2.5 AFM 3 Cloud Pro 與機密運算硬體堆疊

**部署**:為 AFM 3 Cloud Pro,Apple 與 Google、NVIDIA 合作,將 PCC 擴展到 Google Cloud 的 NVIDIA GPUs,**同時維持相同的隱私保護保證** `[S01][S02]`。

**硬體堆疊**:PCC on Google Cloud 的 confidential inference 硬體基礎為 **NVIDIA Confidential Computing with NVIDIA GPUs、Intel CPUs with TDX、Google's Titan chip** `[S02]`。各元件角色:

- **NVIDIA GPU(來源方:Apple Security / Google Cloud / NVIDIA)**:NVIDIA GPUs(Blackwell)承擔 server-side inference;NVIDIA Confidential Computing 提供 GPU 端 confidential inference 與 data-in-use 保護 `[S02][S13][S14]`。
- **Intel CPU(精準角色)**:Intel CPUs with TDX 提供 CPU 端 confidential VM / trusted execution(VM isolation、memory protection)。**官方並未表示模型主要在 Intel CPU 上執行**;Intel TDX 與 NVIDIA CC 共同保護從 CPU 到 GPU 整條 compute path 的 data-in-use `[S02][S13]`。
- **Google Titan(來源方:Apple Security / Google Cloud)**:Google Titan chip(Titanium architecture)提供硬體 root of trust,確保 boot 流程與硬體平台本身的完整性 `[S02][S13]`。

**評測(beta 快照)**:相對 AFM 3 Cloud,text overall response satisfaction 約 **+10%**,image understanding overall 約 **+14%**,Math 約 **+14%** `[S01]`(beta 快照)。

## 2.6 PCC on Google Cloud（完整）

> 本節主來源為 Apple Security `[S02]`;文章由 Apple SEAR、User Privacy、Core OS、Services Engineering(ASE)、Machine Learning and AI(AIML)共同撰寫 `[S02]`。

**擴展範圍**:Apple 將 PCC 擴展到自有資料中心之外;與 Google、NVIDIA 在 Google Cloud 上執行新 Apple Intelligence 工作負載;**這是 PCC 首次延伸到第三方資料中心** `[S02]`。最 demanding 的任務(含 agentic tool-use 與 complex reasoning)交由擴展到 Google Cloud、使用 NVIDIA GPUs 的 PCC 處理,同時維持 Apple 的安全與隱私保護 `[S02]`。

**產業脈絡**:PCC 最初僅建於 Apple silicon;業界一直在提供可組合到 PCC 安全水準的 confidential inference primitives,但**在此之前從未被整合成一條可在全球規模運作的端到端 confidential inference pipeline——這正是 PCC on Google Cloud 所達成的** `[S02]`。

**五項核心要求(維持不變)**:stateless computation、enforceable guarantees、no privileged runtime access、non-targetability、verifiable transparency `[S02]`(原始定義見 §2.8 KB 基礎)。逐項對照與其在 GCP 的落地機制:

| 要求 | 一句話 | 對應 KB / GCP 機制 |
| --- | --- | --- |
| stateless computation | 資料只用於當次請求,用後不留、不記錄 | KB-103 `[S-PCC1]` |
| enforceable guarantees | 以技術(code signing、sealed software)強制,非僅政策 | KB-104 `[S-PCC1]` |
| no privileged runtime access | 無執行期可取得使用者資料的特權通道 | KB-105 `[S-PCC1]` |
| non-targetability | 即使危害基礎設施也無法鎖定特定使用者 | KB-106 `[S-PCC1]` |
| verifiable transparency | 軟體公開、可稽核 | append-only ledger / binaries 公開 `[S02]` |

**信任邊界與機制**:

- **trusted computing base**:不僅依賴 confidential computing 緩解 confidential VM 之外的特權存取(含 side-channel);將 firmware、host 與 guest OS stacks、application code 全納入 trusted computing base,受 verifiable transparency 與 no-privileged-access 保障 `[S02]`。
- **append-only ledger**:為防供應鏈攻擊,維護 Google Cloud PCC fleet 中所有硬體的 cryptographically verifiable、append-only ledger `[S02]`。
- **雙獨立信任根**:對可能被濫用以外洩使用者資料的元件,software attestation rooted in **at least two separate roots of trust from independent vendors** `[S02]`。
- **推論堆疊隔離**:沿用 PCC on Apple silicon 的架構模式——每個請求的初始網路資料解析在獨立 namespace 的專屬 process 進行;共用推論軟體以短 time-to-live 回收;attested keys 存於與外部輸入隔離的專屬 confidential VM `[S02]`。
- **Apple 控制權**:不論基礎設施位於何處,Apple 保留對 PCC software 的完整控制;Apple devices 只信任 Apple cryptographically approved 的 PCC software `[S02]`。
- **summer preview 漸進上線**:PCC on Google Cloud 將在 summer preview 期間逐步補齊完整防護 `[S02]`。
- **透明度**:一如 PCC on Apple silicon,所有 binaries 公開供 public inspection;提供 public research tooling;透過 Apple Security Bounty Program 提供 live PCC nodes in research mode `[S02]`。
- **後續官方文件(`forthcoming`)**:更多技術細節將於本月稍晚的 Confidential Computing Summit 公布;並於今年稍晚更新 PCC Security Guide 與研究計畫文件 `[S02]`。

![圖 D3 — PCC on Google Cloud 信任堆疊](assets/diagrams/D3-pcc-gcp-stack.svg)

![圖 D4 — attestation / append-only ledger 鏈](assets/diagrams/D4-attestation-ledger.svg)

## 2.7 合作方官方（T2）

> 以下出自 **Google Cloud / NVIDIA 官方**,非 Apple 官方說法;文中已標來源方。

- **Google Cloud**:與 Apple 打造符合 Apple 對 PCC 之 security / confidentiality / transparency 目標的 serving platform;核心為 Confidential Computing portfolio 與 Titanium security architecture(以自研 Titan chip 為特色,提供硬體 root of trust)`[S13]`。Google Cloud 以 Intel TDX 與 NVIDIA Confidential Computing 提供 VM 硬體層隔離;Titan 部署於整個 fleet 建立硬體 root of trust;利用 Intel CPU 與 NVIDIA Blackwell GPUs 的安全功能保護 data-in-use,確保 CPU 到 GPU 整條 compute path 受保護 `[S13]`。
- **NVIDIA**:NVIDIA Blackwell GPUs with Confidential Computing 支援 Apple Intelligence 的 server-side inference,整合進 PCC 的硬體安全架構,運行於 Google Cloud `[S14]`。
- **NVIDIA CC 能力(NVIDIA 官方)**:其 Confidential Computing 提供 hardware-rooted trust、encrypted communication paths、remote attestation;以 TEE 隔離工作負載,並在送出敏感資料前可密碼學驗證基礎設施未被竄改——對終端使用者意指「連系統的建造者也無法看到其資料與對話」`[S14]`。
- **Google open-source host stack(Google Cloud 官方)**:Apple 與 Google 共同打造 open-source host stack 以支援 PCC on Google Cloud 的透明度,使外界得以獨立檢視與驗證系統的安全屬性 `[S13]`。

## 2.8 PCC 基礎（2024 世代，地基）

GCP 擴展(§2.6)沿用 2024 世代(Apple silicon)PCC 的同一套要求與機制 `[S-PCC1][S-PCC2]`:

- **PCC 定位**:Apple 為「需動用雲端運算的 AI 請求」打造的隱私架構,把裝置級安全與隱私延伸到雲端;僅在端側不足時動用 `[S-PCC1]`。
- **五項核心要求(原始定義)**:stateless computation、enforceable guarantees、no privileged runtime access、non-targetability、verifiable transparency `[S-PCC1]`。
- **stateless computation**:使用者資料只用於滿足當次請求,運算後不保留、不記錄,不得他用 `[S-PCC1]`。
- **enforceable guarantees**:隱私保證以技術手段(code signing、sealed software 等)在架構上可被強制,不依賴對營運者的信任 `[S-PCC1]`。
- **no privileged runtime access**:無可在執行期取得使用者資料的特權介面;移除遠端 shell 等通道 `[S-PCC1]`。
- **non-targetability**:即使危害基礎設施也無法鎖定特定使用者(metadata 最小化、獨立第三方 relay 隱藏來源 IP、target diffusion、節點隨機分派)`[S-PCC1]`。
- **verifiable transparency / transparency log**:正式 PCC software image 皆發佈到可公開稽核、append-only 的 transparency log;device 只連向軟體已登錄的節點 `[S-PCC1]`。(此為 §2.6 之 append-only ledger 的 2024 前身。)
- **attestation(2024)**:device 在送資料前驗證節點的開機鏈、OS image、軟體量測值與已登錄版本相符、金鑰受硬體 root of trust 保護;不符即拒絕 `[S-PCC1]`。(此為 §2.6 雙獨立信任根 attestation 的地基。)
- **硬體 root of trust(Apple silicon)**:節點建於 Apple silicon,以 Secure Enclave、Secure Boot 提供硬體信任根 `[S-PCC1]`。(GCP 改以 Google Titan + 雙獨立信任根達成等效保證。)
- **VRE(Virtual Research Environment)**:Apple 提供 PCC software image 與 VRE 等研究工具供安全研究者檢視驗證;並透過 Apple Security Bounty 提供獎勵 `[S-PCC1][S-PCC2]`。
- **PCC Security Guide**:詳述威脅模型、架構與外部驗證方式 `[S-PCC2]`(更新版預告今年稍晚,見 §收尾 / S16)。

> Apple PCC 受限授權之原始碼(`S-PCC3`)依不再散布原則**不**納入本 repo;如需請逕至官方 `github.com/apple/security-pcc` 取得。

**2024 世代 vs PCC on Google Cloud 對照**:GCP 擴展沿用同一套要求,僅把信任根與堆疊延伸到第三方資料中心:

| 機制 | 2024（Apple silicon） | PCC on Google Cloud（2026） |
| --- | --- | --- |
| 部署位置 | Apple 自有資料中心 `[S-PCC1]` | 首次延伸到第三方資料中心(Google Cloud)`[S02]` |
| 硬體信任根 | Secure Enclave / Secure Boot `[S-PCC1]` | Google Titan(Titanium)`[S02]` |
| attestation | device 驗證單一節點軟硬體 `[S-PCC1]` | rooted in ≥2 獨立 vendor 信任根 `[S02]` |
| 透明度紀錄 | append-only transparency log `[S-PCC1]` | fleet-wide append-only ledger `[S02]` |
| 五項核心要求 | 原始定義 `[S-PCC1]` | 維持不變 `[S02]` |
| 公開檢視 | binaries 公開 + VRE + bounty `[S-PCC1][S-PCC2]` | binaries 公開 + research tooling + research-mode 節點 `[S02]` |
| 機密運算硬體 | Apple silicon | NVIDIA CC(GPU)+ Intel TDX(CPU)`[S02]` |

## 2.8b PCC 深層機制（2024 世代，供深掘）

§2.8 是要求層;以下是 PCC Security Guide 級的**機制層**,說明那些要求**如何**被技術強制(均為 2024 世代,GCP 擴展沿用同一套設計模式)。

**無狀態如何強制——Ephemeral Data Mode**:可變資料寫於與唯讀 Signed System Volume 分離的專屬 data volume;SEP 於**每次開機隨機化**該卷金鑰階層,使前一 session 寫入的資料無法被後續開機讀取;開機任務丟棄前次加密卷並重建乾淨卷 `[S-PCC2]`。這是 KB「stateless / 用完即丟」在硬體層的落地。

**無特權存取如何強制**:節點**移除/停用**系統 shell、直譯器、除錯器與 JIT 編譯,執行期亦無載入額外軟體以擴權的途徑 `[S-PCC2]`。

**不可鎖定如何達成**(三道機制疊加):

- **匿名權杖**:以密碼學上不可連結的 Token Granting Token / One-Time Tokens(RSA Blind Signatures,Privacy Pass)施加用量限制,而非帳號/裝置憑證;簽發身分服務與請求路由/處理**完全分離** `[S-PCC2]`。
- **第三方中繼**:請求經 Oblivious HTTP,用戶端以 HPKE 對 Apple Oblivious Gateway 加密,隨機選用**由不同第三方營運**的 Oblivious Relay(2024 世代為 Cloudflare 與 Fastly)隱藏來源 IP `[S-PCC2]`。
- **目標擴散**:每個請求只加密給大小為 **k** 的節點子集,單一節點被攻陷僅能解密少量請求;鎖定特定使用者需大範圍、易被偵測的攻擊 `[S-PCC2]`。

**信任根與軟體完整性**:信任根為自研 Apple silicon,特性熔入矽晶、製造後不可變;Secure Enclave(UID 熔入、私鑰不暴露給軟體)、Secure & Measured Boot、以 Data Center Identity Key 簽署開機量測值 `[S-PCC2]`。節點 OS 為 iOS 之最小化強化子集;功能以 **Cryptex** 載入;碼執行政策由獨立於 kernel 的 **Trusted Execution Monitor(TXM)** 強制——**單純攻陷 kernel 不足以執行任意碼**;**Software Sealed Registers** 以棘輪累積量測並納入 attestation;**Restricted Execution Mode(REM)** 為單向轉換,進入後拒絕載入新 trust cache `[S-PCC2]`。

**透明性日誌(可驗證鏈的核心)**:每個生產 build 的軟體量測值發布到 **append-only、密碼學防竄改**的透明性日誌;裝置只把資料送給能 attest 自己執行「已公開登錄軟體」的節點;每個生產映像於**納入日誌後 90 天內**(或相關軟體更新可得時,以較早者)公開 binary 供檢視;發布一旦簽入,**移除即可被偵測**(log-backed map)`[S-PCC1][S-PCC2]`。

**威脅模型**:設計目標是**即使遭攻擊,五大要求亦永不被違反**;考量三大情境——意外資料揭露、來自使用者請求的外部入侵、實體或內部存取——採縱深防禦(預防→偵測→圍堵→時間限界→目標擴散)`[S-PCC2]`。

**2024 世代 server 推論**:以自研 The Inference Engine(TIE)+ MetalLM 執行 AFM-server;每請求 process 隔離,共用推論軟體**定期回收**以防殘留;輸出串流**加 padding** 以防 token 長度側通道 `[S-PCC2]`。(與 2026 之 AFM 3 Cloud / PT-MoE(KB-024)屬不同層次。)

**漏洞獎勵(以技術強制 + 歡迎外部檢驗的信號)**:遠端任意碼執行(具 entitlements)**US$1,000,000**;取得信任邊界外之請求資料 US$250,000;特權網路位置存取 US$150,000;未經 attest 之碼執行 US$100,000;意外資料揭露 US$50,000;另對重大影響者仍評估給獎 `[S-PCC1]`。

## 2.9 訓練與評測方法

**訓練資料**:資料混合包括 publicly available information、licensed / purchased、open-sourced、dedicated studies、synthetic data;**不使用使用者 private personal data 或 user interactions 訓練**;尊重 web publishers opt out 的權利 `[S01]`。

**訓練流程**:顯著擴大在最新世代 **cloud TPU accelerators** 上的 pre-training;所有模型**先共享 common initial foundation 再分化**,逐步加入 audio、image understanding、long-context reasoning、high-quality visual generation 等能力;post-training 結合 **supervised fine-tuning 與 multi-stage reinforcement learning** `[S01]`。

> 值得注意的硬體分工:**訓練**用的是 Google 的 cloud TPU `[S01]`,而 server **推論**(Cloud Pro)用的是 Google Cloud 上的 NVIDIA GPU `[S01][S02]`——「用 TPU 訓練」與「用 GPU 推論」分屬不同階段,亦不應混淆。「先共享基礎再分化」也解釋了為何五個模型能力相關卻各有專長(對照 §1.1 的關注點分離)。

**硬體最佳化 + QAT**:模型為各自目標硬體最佳化(四模型 → Apple silicon;Cloud Pro → NVIDIA GPUs);並以 **Quantization Aware Training(QAT)** 在壓縮模型的同時維持高準確度 `[S01]`。QAT 在訓練階段即納入量化誤差,對端側模型(受 DRAM/NAND 與能耗限制)尤其關鍵。

**評測方法(beta 快照)**:在 model 與 feature 兩個層級評測;model-level 維度包括 Instruction Following、Truthfulness、Presentation,含影像時另評 Image Understanding;官方註明數據反映模型當前開發階段 `[S01]`(beta 快照)。

- **TTS MOS(beta 快照)**:以 5 分 MOS 評比;AFM 3 Core Advanced 在 1B 啟用規模下,General Voice 4.15(production 3.87)、Conversational Voice 4.24(production 3.82);官方稱 MOS 每升 0.1 即為高度可察覺改善 `[S01]`(beta 快照)。
- **Dictation(beta 快照)**:沿七維度(Overall Quality、Punctuation、Casing、Layout、Meaning Capture、Disfluency Handling、Style)對前代做偏好判斷;1B 規模下 Overall Quality 偏好 **44.7% 對 17.6%**,其餘六維一致勝出 `[S01]`(beta 快照)。
- **評測語系分組**:English(US/GB/AU/IN 等方言);PFIGSCJK;DDNSTV;AFIHHMPRTU `[S01]`。

### 評測數字速查表

> 下表彙整全文 `official-beta` 數字,供速查;每筆皆為 **beta 快照**,夏季 technical report 將更新(對照 §收尾 / S15)。

| 模型 | 項目 | 指標 | 對照 baseline | 狀態 |
| --- | --- | --- | --- | --- |
| AFM 3 Core | general text | 偏好 45.6% | 2025:23.3% | beta 快照 |
| AFM 3 Core | image understanding | 偏好 >61%(有明確偏好時) | — | beta 快照 |
| AFM 3 Cloud | general text(side-by-side) | 偏好 64.7%(跨 locale 一致) | 2025 Server:8.7% | beta 快照 |
| AFM 3 Cloud | single-sided 滿意度 | 相對 +36% | — | beta 快照 |
| AFM 3 Cloud | single-sided instruction following | 相對 +21% | — | beta 快照 |
| AFM 3 Cloud | image understanding | 偏好 37.8% | 2025:9.6% | beta 快照 |
| AFM 3 Cloud Pro | text 滿意度 / image / Math | 約 +10% / +14% / +14% | vs AFM 3 Cloud | beta 快照 |
| Core Advanced(1B) | TTS MOS General / Conversational | 4.15 / 4.24 | production 3.87 / 3.82 | beta 快照 |
| Core Advanced(1B) | Dictation Overall Quality | 偏好 44.7% | 前代:17.6% | beta 快照 |

> 來源:KB-022/023/026/027/028/041/064/065 `[S01]`。MOS 每升 0.1 即為高度可察覺改善 `[S01]`(beta 快照)。

## 2.10 驗證實戰：如何查核 PCC 的聲明

PCC 的設計目標之一是讓**外部得以驗證**,而非要求使用者信任 Apple 的口頭承諾。下列為官方公開的查核途徑,對應 §2.6–2.8 的機制:

1. **檢視 binaries**:一如 PCC on Apple silicon,所有 PCC binaries 公開供 public inspection `[S02]`。可比對裝置實際連線節點所執行的軟體量測值,是否與公開版本一致。
2. **比對 transparency log / ledger**:正式 PCC software image 皆登錄於可公開稽核、append-only 的 log(2024 世代)`[S-PCC1]`;在 Google Cloud 上,fleet 內所有硬體另維護 cryptographically verifiable、append-only 的 ledger `[S02]`。device 只會連向其軟體版本**已登錄**的節點 `[S-PCC1]`——驗證者可確認某 image 是否在 log 中、且不可被事後竄改(只能追加)。
3. **檢查 attestation 與信任根**:device 送出資料前驗證節點 attestation(開機鏈、OS image、軟體量測、金鑰受硬體 root of trust 保護)`[S-PCC1]`;在 GCP,對可能外洩資料的元件要求 attestation **rooted in 至少兩個來自獨立 vendor 的信任根** `[S02]`。驗證流程見〈圖 D4〉。
4. **使用研究工具(VRE)**:Apple 提供 PCC software image 與 Virtual Research Environment 等研究工具,供安全研究者檢視、驗證軟體聲明 `[S-PCC1][S-PCC2]`。
5. **取得 research-mode 節點**:透過 Apple Security Bounty Program 可取得 live PCC nodes in research mode `[S02]`,在真實節點上進行研究與獎勵申報。
6. **確認控制權歸屬**:不論基礎設施位於 Apple 或 Google 資料中心,Apple 保留對 PCC software 的完整控制,且 Apple devices 只信任 Apple cryptographically approved 的軟體 `[S02]`——驗證點在於「節點所執行軟體的簽署者」而非「機房擁有者」。

> **可驗證的界線(準確性紅線)**:PCC 的可驗證鏈是「**attestation ↔ 透明性日誌**」,**不是**「源碼 ↔ binary」。Apple **未提供 reproducible builds**,公開源碼僅作分析輔助,無法證明發布之 binary 確由該源碼編譯 `[S-PCC2]`。因此嚴謹的陳述應區分「**Apple 宣稱**」與「**可獨立驗證**」:可獨立驗證的是「裝置只連向其軟體量測值已登錄於公開日誌的節點」,而非「該軟體與公開源碼逐位元相符」。

> 注意:PCC on Google Cloud 仍在 **summer preview**,完整防護將逐步補齊 `[S02]`;更完整的驗證細節待 Confidential Computing Summit(S17)與更新版 PCC Security Guide(S16)發布(皆 `forthcoming`)。

---

# 主線三 — 對你代表什麼（隱私、能力與取得）

## 3.1 Responsible AI

四項 Responsible AI 原則:**Empower users with intelligent tools、Represent our users、Design with care、Protect privacy** `[S01]`。

安全做法:以 safety taxonomy 辨識敏感內容;進行 multilingual post-training alignment、使用 language-specific guardrail models、進行由 native speakers refined 的 human red teaming(涵蓋所支援的各 locale)`[S01]`。

## 3.2 影像來源標記：SynthID（來源方：Google）

> **SynthID 為 Google DeepMind 的 AI 內容浮水印與辨識技術** `[S04][S18]`(T2 屬性,來源方為 Google DeepMind;Apple 於 S04 以「SynthID watermark」之名使用,歸屬以 Google DeepMind 官方 S18 佐證)。

- **Photos 編輯**:使用 Apple Intelligence 調整過的影像會自動加入隱藏 SynthID watermark,標示其經 AI 編輯 `[S04]`。
- **Image Playground**:可生成幾乎任意風格(含 photorealistic)的高品質圖片,由 PCC 上的新生成模型驅動;生成圖片自動加入隱藏 SynthID watermark;可用描述或 tap/circle/brush 修改;可選 aspect ratio;可用於 Messages、Lock Screen wallpapers、Contact Posters `[S04]`。
- **每日用量(概念)**:部分功能(含 image generation)因依賴 powerful server models 而有 daily usage limits;多數 iCloud+ 方案提供 increased access `[S03]`。

## 3.3 模型驅動功能（概念）

- **Siri AI**:全新 Siri,深度整合於 iPhone/iPad/Mac/Apple Watch/Apple Vision Pro;可用 personal context understanding 跨 messages/emails/photos 搜尋、以 systemwide app actions 跨 app 完成任務、回答螢幕內容相關問題或上網生成回答;有專屬 Siri app,透過 iCloud 私密同步對話歷史 `[S03][S06]`。
- **Photos 編輯**:Spatial Reframing 可於拍攝後改善構圖;另有 Extend、Clean Up 等;AI 編輯影像帶 SynthID(見 §3.2)`[S03][S04]`。

## 3.4 開發者存取

對開發者而言,AFM 3 的價值落點是**框架與 API**,而非直接接觸底層模型權重。重點是一條「同一 API、多種執行目標(端側 / PCC / 多 provider)」的路徑:

- **Foundation Models framework**:單一 native Swift API;支援更強的 on-device 模型(含 image input)、server 模型、custom skills `[S05]`。
- **多 provider**:可透過同一 API 使用 Claude、Gemini,或任何實作新 **language model protocol** 的 provider `[S05]`。
- **on-device context 檢查**:提供 API 檢查模型 context 大小、計算 instructions/prompts/transcripts 的 token 數,以適配執行硬體 `[S08]`。
- **Dynamic Profiles**:讓開發者在執行中即時更新「模型如何與其 app 互動」`[S05]`;WWDC session 241 另涵蓋以 dynamic sessions 組合 instructions 與 profiles 打造 agentic 體驗 `[S08]`。
- **Small Business 免費 PCC**:App Store Small Business Program 且少於 2 million total first-time downloads 的開發者,可**無 cloud API cost** 使用 PCC 上的 AFM `[S05]`。
- **Core AI**:全新框架,為在 device 上執行自帶模型的最佳途徑;架構針對 Apple silicon 的 unified memory 與 Neural Engine 最佳化,讓開發者在本機部署 full-scale LLMs `[S05]`。
- **Xcode 27**:將 Anthropic、Google、OpenAI 的模型與 agents 帶入開發流程;對話具 interactive planning、multiturn Q&A、canvas;agents 可驗證自身工作(測試、Playgrounds、previews、Device Hub);以 plug-ins 透過 **Model Context Protocol 與 Agent Client Protocol** 擴充,GitHub 與 Figma 首批支援;Apple silicon only、體積縮小 30%;Xcode Cloud 速度最高 2x `[S05]`。
- **框架 roadmap**:Foundation Models framework 預計**今夏稍晚 open source 並支援 Linux**;提供 Python SDK;透過 PCC 自 watchOS 27 起可用;另有 Evaluations framework `[S08][S09]`。

## 3.5 可用性

**時程** `[S03]`:

| 階段 | 時間 | 對象 |
| --- | --- | --- |
| 開發者測試 | 發表當日起 | Developer Program |
| public beta | 下月起 | 一般測試者 |
| 正式推出 | 今秋 | 免費更新 |

**支援語言(16 種)** `[S03]`:English、Danish、Dutch、French、German、Italian、Norwegian、Portuguese、Spanish、Swedish、Turkish、Vietnamese、Chinese(simplified)、**Chinese(traditional)**、Japanese、Korean。

**支援裝置** `[S03]`:

| 類別 | 機型 |
| --- | --- |
| iPhone | iPhone 16 以上、iPhone 15 Pro、iPhone 15 Pro Max |
| iPad | iPad mini(A17 Pro)、M1 以上 iPad |
| Mac | MacBook Neo(A18 Pro)、M1 以上 Mac |
| 其他 | Apple Vision Pro;Apple Watch Series 9 以上 / Ultra 2 以上 / SE 3(需與已啟用 Apple Intelligence 的 iPhone 在附近配對) |

**Siri AI 與地區限制**:

- Siri AI 今年稍晚以 **beta** 形式提供給設定為英文的支援裝置使用者,Apple 將迅速擴增更多語言;開發者測試自發表日起於 iOS/iPadOS/macOS/visionOS 27,watchOS 27 於後續 beta `[S03]`。
- **EU / DMA**:Mac 與 Apple Vision Pro 使用者在 EU 可於設定支援語言時使用 Siri AI;Siri AI 於 iOS、iPadOS、watchOS 初期不在 EU 提供(Apple 另有專稿說明因 DMA 延後)`[S03][S07]`。
- **中國**:Siri AI 與其他新 Apple Intelligence 功能在 Apple 處理法規要求前不在中國提供 `[S03]`。

---

# 收尾

## 官方尚未公開（不臆測）

下列項目官方**未公開**,本文不臆測填補 `[S01]`:

- **AFM 3 Core**:layer count、hidden size、heads、確切 context、quantization bits、RAM、tokens/sec。
- **Core Advanced**:expert 數、routing/mask granularity、shared expert 比例、載入延遲、支援裝置完整清單。
- **AFM 3 Cloud**:參數量、active params、PT-MoE 拓撲、SKU、latency/throughput。
- **ADM 3 Cloud**:參數量、diffusion/AR 架構、latent size、sampling steps、最高解析度、adapter 尺寸。
- **AFM 3 Cloud Pro**:參數量、是否 MoE、active params、context、GPU/CPU 具體 SKU、instance type、GPU topology、inference cost。

## 即將更新（`forthcoming`）

Apple 已預告**今夏稍晚**發布 technical report,內含更新的 evaluations 與 benchmarks `[S01]`。本文所有 `official-beta` 數字屆時於 `docs/CHANGELOG.md` 逐條校正並解除 beta 標記(里程碑 M6)。更新版 PCC Security Guide(S16)與 Confidential Computing Summit talk(S17)亦為 `forthcoming`。

---

## 附錄 A：曾被報導但未經官方證實（報導，非官方）

> **以下為第三方報導,Apple 未證實,僅供背景參考,不作為事實。** 依不變式 5,此段僅出現於開發者版。

- **約 10 億美元/年、約 1.2 兆參數客製 Gemini**:為 Bloomberg / Mark Gurman 報導,Apple 未證實 `(報導,非官方)`。
- 其他獨立解讀(如「Gemini 是 teacher signal / distilled」「no drop of Gemini」「Apple 先試自家 PCC 太慢才轉 GCP」等)同屬報導/詮釋,本文不採。

## 附錄 B：來源與存檔

- 來源分層清單:見 `sources/source-index.md`(T1 Apple 官方 / T2 合作方官方 / 排除)。
- claim → 來源對照:見 `sources/source-map.md`。
- 頁面存檔與擷取日期:見 `sources/primary/_fetch-log.md`。
