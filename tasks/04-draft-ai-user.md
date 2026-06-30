# Task 04 — AI 使用者版草稿
> Phase 4 · 可與 03、05 並行 · 交給 Claude Code

## 目標
產出 AI 使用者版草稿（概念 + 類比 + 評估清單,14–22 頁）。

## 輸入
- `content/audiences/ai-user.md`
- `content/knowledge-base.md`（取 `ai-user ≠ omit`）
- `sources/source-map.md`

## 待產出
- `content/drafts/ai-user.md`

## 步驟
1. 依骨架成文,概念 + 類比 + 評估清單風格,對齊三主線。
2. 深技術點（per-prompt routing、ledger 內部機制）改概念帶過或略。
3. 重點落點:五個模型各做什麼、資料去哪（端側 / PCC / PCC-on-GCP）、**Gemini 的官方定位**（不是 runtime Gemini;只引官方措辭）、每日用量、隱私邊界、能不能用。
4. 每事實標 `[S0X]`;`official-beta` 帶 beta 標記;T2 標來源方。
5. 收一份「我的資料去哪 / 我能信什麼」評估清單,逐項對應 KB:PCC 五要求、append-only ledger、雙獨立信任根、Apple 控制權、不以使用者資料訓練。

## 必守不變式（摘要）
- **嚴禁任何 `reported-excluded` 內容**（#5）。
- 不臆測（#7）;Gemini 只用官方措辭（#4 對 T2、本段對 Gemini 同理）。

## 驗收
- 無 `reported-excluded`;Gemini 段僅官方措辭。
- 每條事實可回溯;beta 標記齊;清單項目皆對應 KB。

## 給 Claude Code 的一句話
> 依 audiences/ai-user.md + KB 寫 content/drafts/ai-user.md;概念/類比為主;Gemini 只用官方措辭;收一份「資料去哪」清單對應 KB;零報導內容;依驗收自檢。
