# 受眾規格 — 開發者版（`AFM3-開發者版.pdf`）

> 對應 `docs/PLAN.md` §4、附錄 A。本檔為**選材 + 骨架 + 語氣 + 頁數 + theme**;事實一律取自 `content/knowledge-base.md`(不變式 1)。
> **theme**:`theme-dev`。**目標頁數**:28–40(規劃 ~34)。
> **選材規則**:取 `audiences.dev ≠ omit` 的條目(共 **95** 條:detail 90 + concept 4 + appendix-only 1)。`KB-012`(reported-excluded)**僅**進附錄並標「報導,非官方」(不變式 5)。

## 受眾畫像
懂 LLM 架構、TEE / attestation、機密運算的工程師與安全研究者。要的是**可驗證的技術細節**與**邊界誠實度**:哪些是 Apple 官方、哪些是 Google/NVIDIA(T2)、哪些只是報導、哪些官方未公開。

## 語氣與手法
- 技術參考語氣;精確用詞,保留必要英文術語(首見附 GLOSSARY 連結)。
- **架構圖引用**(D 系列):IFP 的 NAND/DRAM 載入、PCC-on-GCP 信任堆疊、attestation/ledger 鏈、五模型路由。
- **驗證實戰**:attestation 驗證流程、transparency log / VRE 如何查核(KB-107/108/110/053)。
- 每段事實後標 `[S0X]`;T2 事實標來源方;`official-beta` 數字一律加 beta 標記。

## 章節骨架（對齊三主線；頁數加總 ~34）

### 0. 前言與邊界宣告（~2 頁）
- 非官方科普聲明、商標聲明、來源分層(T1/T2/排除)、status 圖例、beta 快照說明。
- KB:KB-013(Gemini 介入形式未公開)、KB-085(即將更新) — 設定誠實邊界。

### 主線一 — 這是什麼（五個模型）（~6 頁）
- **1.1 五模型總覽與硬體目標**:KB-001、KB-002、KB-003、KB-004、KB-005、KB-006、KB-007。圖 **D1 五模型路由圖**。
- **1.2 PCC 隱私邊界總綱**:KB-008。
- **1.3 Apple × Google / Gemini 官方措辭與邊界**:KB-009、KB-010、KB-011、KB-013(三處官方措辭並陳 + 「介入形式未公開」)。

### 主線二 — 如何運作（架構與部署）（~16 頁）
- **2.1 端側:IFP sparse 架構**:KB-014、KB-015、KB-016、KB-017、KB-018、KB-019、KB-020、KB-021。圖 **D2 IFP NAND/DRAM 載入**。
- **2.2 AFM 3 Core 評測**:KB-022、KB-023(`official-beta`)。
- **2.3 伺服器:AFM 3 Cloud / PT-MoE**:KB-024、KB-025;評測 KB-026、KB-027、KB-028(`official-beta`)。
- **2.4 影像:ADM 3 Cloud 架構**:KB-029、KB-030、KB-031(concept)。
- **2.5 AFM 3 Cloud Pro 與硬體堆疊**:KB-036、KB-037、KB-038、KB-039(Intel CPU 精準角色)、KB-040;評測 KB-041(`official-beta`)。
- **2.6 PCC on Google Cloud（完整）**:KB-042、KB-043、KB-044、KB-045、KB-046、KB-047、KB-048、KB-049、KB-050、KB-051、KB-052、KB-053、KB-054(forthcoming)。圖 **D3 PCC-on-GCP 信任堆疊**、**D4 attestation/ledger 鏈**。
- **2.7 合作方官方（T2）**:KB-055、KB-056(Google Cloud)、KB-057(NVIDIA) — 文中標來源方。2026 Chrome 查核補充:KB-125(Google open-source host stack)、KB-126(NVIDIA CC 能力) — 標來源方。
- **2.8 PCC 基礎（2024 世代，地基）**:KB-101、KB-102、KB-103、KB-104、KB-105、KB-106、KB-107、KB-108、KB-109、KB-110、KB-111。對照 §2.6 標明 GCP 如何延伸。
- **2.8b PCC 深層機制（自前作深化）**:KB-112(Ephemeral Data Mode)、KB-113(移除動態碼途徑)、KB-114(匿名權杖 TGT/OTT)、KB-115(OHTTP 中繼)、KB-116(目標擴散 k-子集)、KB-117(信任根/SEP 細節)、KB-118(Cryptex/TXM/REM/SSR)、KB-119(透明性日誌 90 天/不可移除)、KB-120(VRE 細節)、KB-121(Security Bounty 金額)、KB-122(威脅模型三情境)、KB-123(準確性紅線:無 reproducible builds)、KB-124(TIE/AFM-server 推論引擎)。
- **2.9 訓練與評測方法**:KB-058、KB-059、KB-060;方法 KB-063、KB-064、KB-065、KB-066(`official-beta`)。

### 主線三 — 對你代表什麼（隱私、能力與取得）（~8 頁）
- **3.1 Responsible AI**:KB-061、KB-062。
- **3.2 影像來源標記 SynthID（T2/Google）**:KB-032、KB-034、KB-033;用量 KB-035(concept)。
- **3.3 模型驅動功能（概念）**:KB-067、KB-068(concept)。
- **3.4 開發者存取**:KB-070、KB-071、KB-072、KB-073、KB-074、KB-075、KB-076、KB-077。
- **3.5 可用性**:KB-078、KB-079、KB-080、KB-081、KB-082、KB-083。

### 收尾（~2 頁）
- **官方尚未公開（不臆測）**:KB-084。
- **即將更新**:KB-085。
- **附錄 A:曾被報導但未經官方證實**:KB-012(`reported-excluded`,標非官方;不變式 5 — 僅此版可出現)。
- **附錄 B:來源清單與存檔**:連 `sources/source-index.md` + `source-map.md`。

## 自檢對應
- KB-id 集合 = `audiences.dev ≠ omit`(95 條),已全數納入上列。
- `official-beta`:KB-022/023/026/027/028/041/063/064/065 → 必帶 beta 標記。
- T2:KB-034/038/055/056/057 → 標來源方(Google / NVIDIA)。
- `reported-excluded`:KB-012 → 僅附錄 A。
