# 受眾規格 — AI 使用者版（`AFM3-AI使用者版.pdf`）

> 對應 `docs/PLAN.md` §4、附錄 A。選材 + 骨架 + 語氣 + 頁數 + theme;事實取自 `content/knowledge-base.md`。
> **theme**:`theme-ai-user`。**目標頁數**:14–22(規劃 ~18)。
> **選材規則**:取 `audiences.ai-user ≠ omit`(共 **75** 條:detail 19 + concept 56)。**嚴禁任何 `reported-excluded`**(不變式 5);深技術點(per-prompt routing、ledger 內部機制)改概念帶過或略。

## 受眾畫像
常用 ChatGPT / Claude / Gemini 的人。懂「模型、prompt、隱私」概念,但不需要架構內部細節。最關心:**這五個模型各做什麼、我的資料去哪、Gemini 合作到底是什麼、每天能用多少、能不能信**。

## 語氣與手法
- 概念 + 類比;少數關鍵數字(帶 beta 標記),其餘略。
- **核心交付物:一份「我的資料去哪 / 我能信什麼」評估清單**(見主線三)。
- Gemini 段**只引官方措辭**,明說「不是在你的裝置或 PCC 上跑 Gemini」這層官方定位、不臆測介入比例(KB-013)。
- T2 事實(SynthID/NVIDIA/Google)標來源方;`official-beta` 帶 beta 標記。

## 章節骨架（對齊三主線；頁數加總 ~18）

### 0. 開場（~1 頁）
- 非官方科普 + 商標聲明;一句話：五個模型、端側與雲端、隱私承諾。KB-001。

### 主線一 — 這是什麼（五個模型）（~5 頁）
- **1.1 五個模型各做什麼**:KB-002、KB-003、KB-004、KB-005、KB-006、KB-007(concept)。
- **1.2 端側 vs 雲端、PCC 是什麼**:KB-008(detail)、KB-014(為何不能全放裝置,concept)。
- **1.3 Gemini 合作的官方定位**:KB-009、KB-010、KB-011(官方措辭)、KB-013(介入形式未公開 → 不臆測)。

### 主線二 — 如何運作（架構與部署，概念層）（~6 頁）
- **2.1 端側模型怎麼變強(概念)**:KB-015、KB-016、KB-020(IFP/NAND 的白話版);KB-024、KB-025(server 升級,concept)。
- **2.2 評測重點(帶 beta)**:KB-022、KB-023、KB-026、KB-027、KB-028、KB-041、KB-063、KB-064、KB-065(concept,只取重點數字 + beta 標記)。
- **2.3 影像模型(概念)**:KB-029、KB-030、KB-031。
- **2.4 資料去哪:PCC on Google Cloud(概念)**:KB-036、KB-037、KB-038(NVIDIA 標來源方)、KB-043(detail)、KB-044、KB-045。
- **2.5 為什麼別人的機房也安全(概念)**:KB-046、KB-048、KB-049、KB-052、KB-053;基礎 KB-102、KB-104、KB-105、KB-106、KB-107、KB-108、KB-110;深化(概念)KB-112(用完即抹除)、KB-122(即使被攻擊也不破防)。Google Cloud T2:KB-055、KB-057;NVIDIA 能力 KB-126(連建造者也看不到,標來源方)。
- **2.6 怎麼訓練的**:KB-058(detail,不用你的資料訓練)、KB-059、KB-060、KB-062。

### 主線三 — 對你代表什麼（隱私、能力與取得）（~5 頁）
- **3.1 Responsible AI(概念)**:KB-061。
- **3.2 影像來源標記 SynthID(Google)**:KB-032、KB-033、KB-034(detail,標來源方)、KB-035(每日用量,detail)。
- **3.3 新功能(概念)**:KB-067(Siri AI,detail)、KB-068、KB-069。
- **3.4 開發者層(概念帶過)**:KB-071(多 provider)、KB-074(Small Business)。
- **3.5 能不能用 / 在哪用**:KB-078、KB-079、KB-080、KB-081、KB-082、KB-083(detail)。
- **3.6 收尾**:KB-084(官方未公開,concept)、KB-085(即將更新)、KB-101(PCC 定位,detail)、KB-103(stateless,detail)。

### ★ 評估清單「我的資料去哪 / 我能信什麼」（~1 頁，主線三嵌入）
逐項對應 KB,讓讀者自核:
- 端側請求不離開裝置?→ KB-008
- 上雲時用 PCC、且不被儲存/分享(含 Apple)?→ KB-008、KB-103
- 五項核心要求?→ KB-046（+ 基礎 KB-102）
- append-only ledger / 防供應鏈?→ KB-048
- 雙獨立信任根?→ KB-049
- Apple 是否保留軟體控制權?→ KB-051
- 不以我的資料訓練?→ KB-058
- 可公開查核?→ KB-053、KB-107、KB-110
- Apple 是否以重金懸賞外部找漏洞(展現信心)?→ KB-121

## 自檢對應
- KB-id 集合 = `audiences.ai-user ≠ omit`(75 條),已納入。
- **零 `reported-excluded`**(KB-012 不得出現)。
- Gemini 段僅官方措辭(KB-009/010/011)+ 不臆測(KB-013)。
- `official-beta` 帶 beta 標記;T2(KB-034/038/055/057)標來源方。
- 清單每項對應實際 KB-id。
