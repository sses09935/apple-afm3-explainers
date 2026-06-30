# Task 02 — 受眾規格
> Phase 2 · 對應 PLAN §4、附錄 A · 交給 Claude Code

## 目標
為三種受眾各定一份規格:選材（哪些 KB-id）、章節骨架（對齊三主線）、語氣手法、頁數、theme。

## 待產出
- `content/audiences/dev.md`
- `content/audiences/ai-user.md`
- `content/audiences/general.md`

## 三主線（每份骨架都對齊）
**是什麼（五個模型）→ 如何運作（架構與部署）→ 代表什麼（隱私、能力與取得）**

## 步驟（每個受眾各做一次）
1. 由 `knowledge-base.md` 篩出本受眾 KB-id 集合:取 `audiences.<aud> ≠ omit` 的條目;記下各條層級（`detail` / `concept` / `faq`）。
2. 寫章節骨架:把選入的 KB-id 歸到三主線下;標每節目標頁數,總和落在該版區間（dev 28–40 / ai-user 14–22 / general 12–18）。
3. 定義語氣與手法:
   - **dev**:技術參考 + 架構圖引用（D 系列）+ 驗證實戰（attestation / VRE 步驟）。
   - **ai-user**:概念 + 類比 + 「我的資料去哪」評估清單;重點為 Gemini 官方定位、每日用量、隱私邊界。
   - **general**:大圖（M 系列）+ 比喻 + FAQ;重點為端側 vs 雲端、SynthID、能不能用／在哪用。
4. 標 theme:`theme-dev` / `theme-ai-user` / `theme-general`。

## 必守不變式（摘要）
- 受眾差異唯一所在（#8):差異只在本檔 + theme CSS,不得回頭改 KB。
- 官方/報導隔離（#5):ai-user / general 不得納入 `reported-excluded`;dev 僅附錄可提。

## 驗收
- 每份 spec 的 KB-id 集合與 KB `audiences` 欄位一致。
- 三主線骨架完整;頁數加總落在區間。

## 給 Claude Code 的一句話
> 依 KB 的 audiences 欄位,為 dev / ai-user / general 各產一份 content/audiences/*.md（選材 + 三主線骨架 + 語氣 + 頁數 + theme）;依驗收自檢。
