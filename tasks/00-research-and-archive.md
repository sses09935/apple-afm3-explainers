# Task 00 — 研究擷取與來源存檔
> Phase 0 · 對應 PLAN §13、§7 · 交給 Claude Code
> 角色:Tech Lead + Executioner（決策已固化於 AGENTS.md / source-index.md / knowledge-base.md）

## 目標
為 `source-index.md` 的 active 來源建立可驗證存檔,並由 KB 反向生成 claim→來源對照。

## 已完成（勿重做）
- `sources/source-index.md`（S01–S18 分層 + PCC 基礎沿用 + 排除清單）已建。
- `content/knowledge-base.md`（KB-001–085）已建,每條已帶 `[S0X]`。

## 待產出
- `sources/primary/SXX.{html,pdf}`:每個 active S-code 的頁面快照。
- `sources/primary/_fetch-log.md`:每筆「S-code · URL · 擷取日期 · 取得方式」。
- `sources/source-map.md`:claim→S0X 對照（由 KB 反向生成）。

## 步驟
1. 逐一抓取 `source-index.md` 中 `status=active` 的 T1 / T2 URL,存為 `sources/primary/SXX.html`（長文可另存列印 PDF）。於 `_fetch-log.md` 記錄擷取日期。
2. `forthcoming`（S15 / S16 / S17）尚未發布 → 在 `_fetch-log.md` 標 `pending`,不存檔。
3. 解析 `content/knowledge-base.md`,擷取每個 `KB-id` 與其 `source:` 行的 `[S0X]`,輸出 `sources/source-map.md`（表格:`KB-id · sources · status`）。
4. 交叉檢查:KB 中出現的每個 S-code 都存在於 `source-index.md`;`source-index.md` 每個 active S-code 至少被一條 KB 引用,否則於 `source-map.md` 標「未被引用」。

## 必守不變式（摘要,完整見 AGENTS.md）
- 僅 `source-index.md` 之來源（#3）;不得引入未登錄之來源。
- 不下載／再散布 Apple/Google 受限碼（S-PCC3 僅連結,不存檔)（#9）。

## 驗收（Definition of Done）
- 每個 active S-code 有 `primary/` 存檔 + 擷取日期。
- `source-map.md` 涵蓋所有 `KB-id`。
- 無「KB 引用了 `source-index.md` 不存在的 S-code」。

## 給 Claude Code 的一句話
> 讀 AGENTS.md 與 source-index.md;抓取所有 active 來源存到 sources/primary/ 並記 fetch-log;由 knowledge-base.md 反向產生 sources/source-map.md;依驗收自檢。
