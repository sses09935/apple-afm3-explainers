# Task 05 — 普羅大眾版草稿
> Phase 5 · 可與 03、04 並行 · 交給 Claude Code

## 目標
產出普羅大眾版草稿（大圖 + 比喻 + FAQ,零術語門檻,12–18 頁）。

## 輸入
- `content/audiences/general.md`
- `content/knowledge-base.md`（只取 `general ∈ {faq, concept}`）
- `sources/source-map.md`

## 待產出
- `content/drafts/general.md`

## 步驟
1. 依骨架成文,大圖 + 比喻 + FAQ,零術語門檻,對齊三主線。
2. 數字與深規格大多略,改用比喻。
3. 重點:端側 vs 雲端是什麼、為什麼更隱私（PCC 一句話比喻）、SynthID 是什麼（AI 生成/編輯的浮水印,Google 技術）、能不能用／在哪用（裝置 / 語言 / 地區 / 每日用量）。
4. 圖以 M 系列佔位引用（定義待 Task 06）。
5. 收 FAQ,逐題對應 KB,例如:Apple 會看我的內容嗎?資料會給 Google 嗎?哪些裝置能用?為什麼我這裡還沒有?

## 必守不變式（摘要）
- 無任何 `reported-excluded`、無深規格臆測（#5、#7）。
- 比喻不得扭曲官方事實;每個 FAQ 答案對應 `KB-id`。

## 驗收
- 零術語門檻;每個 FAQ 對應 KB;無報導內容。

## 給 Claude Code 的一句話
> 依 audiences/general.md + KB 寫 content/drafts/general.md;大圖/比喻/FAQ;每個 FAQ 對應 KB-id;比喻不得扭曲事實;零報導;依驗收自檢。
