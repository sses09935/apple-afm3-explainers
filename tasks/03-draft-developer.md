# Task 03 — 開發者版草稿
> Phase 3 · 可與 04、05 並行 · 交給 Claude Code

## 目標
產出開發者版草稿（技術參考風格,28–40 頁等量內容）。

## 輸入
- `content/audiences/dev.md`（骨架與選材）
- `content/knowledge-base.md`（事實,取 `dev=detail` 為主、`concept` 次之）
- `sources/source-map.md`（引用對照）

## 待產出
- `content/drafts/dev.md`

## 步驟
1. 依 `audiences/dev.md` 的三主線骨架成文。
2. 每段事實後標來源 `[S0X]`（#2）;多源以逗號分隔。
3. `official-beta` 數字（評測 / MOS / dictation）一律加註「beta 快照,夏季 technical report 將更新」（#6）。
4. T2 事實（Google Cloud / NVIDIA）文中標明來源方（#4）。
5. `reported-excluded`（金額/參數報導）只放「附錄:曾被報導但未經官方證實」,並標非官方（#5）。
6. 圖以佔位引用（D1…Dn,定義待 Task 06）;在技術點標明需要哪張圖:IFP 的 NAND/DRAM 載入、PCC-on-GCP 信任堆疊、attestation / ledger 鏈、五模型路由。
7. 收錄「官方未公開」（KB-084）與「即將更新」（KB-085）兩段。

## 必守不變式（摘要）
- 不得出現 KB 沒有的事實（#1）。
- 不臆測未公開規格（#7）。

## 驗收
- 每條事實可回溯到 `KB-id` / `[S0X]`。
- 所有 `official-beta` 帶標記;`reported-excluded` 僅在附錄;T2 標來源方。

## 給 Claude Code 的一句話
> 依 audiences/dev.md + KB 寫 content/drafts/dev.md;逐事實標 [S0X];beta 數字加標記;T2 標來源方;報導只進附錄;圖以 D 系列佔位;依驗收自檢。
