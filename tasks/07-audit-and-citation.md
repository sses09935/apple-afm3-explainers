# Task 07 — 稽核與引用查核
> Phase 7 · 對應 PLAN §11 · 交給 Claude Code

## 目標
逐條查核引用與邊界,產出稽核報告,使三份文件達 v1.0 釋出門檻。

## 待產出
- `qa-report.md`
- 修正後的 `drafts` / `dist`（如查核發現問題）

## 步驟
1. 跑 `node build/check-sources.mjs`,記錄結果。
2. 抽樣逐條 claim → source 對照:於 `qa-report.md` 列「claim 摘要 · KB-id · [S0X] · 抽查通過/問題」。**重點抽查所有 `official-beta` 數字與所有 T2 事實**。
3. 邊界檢查:
   - `reported-excluded` 未出現於 ai-user / general 正文（僅 dev 附錄且標非官方）。
   - `official-beta` 全帶「beta 快照 / 將更新」標記。
   - 無 KB 外事實;無未公開規格臆測。
   - 每個 active S-code 在 `sources/primary/` 有存檔。
4. 三份皆含「非官方科普」聲明與商標聲明（#10）。
5. CJK / 排版 / 連結校對;修正後重跑 build。

## 驗收（v1.0 就緒）
- `check-sources.mjs` 全綠;`qa-report.md` 抽查通過。
- 邊界與聲明檢查全通過。
- 三份 PDF 可重現產出。

## 釋出後（里程碑 M6,待 S15）
- 夏季 technical report 落地後:更新 `official-beta` 條目、解除 beta 標記、記於 `docs/CHANGELOG.md`,bump 版本。

## 給 Claude Code 的一句話
> 跑 check-sources.mjs;在 qa-report.md 抽查每條 claim→來源（重點 official-beta 與 T2）;檢查報導隔離/beta 標記/聲明/存檔齊備;校對後重跑 build;依驗收自檢。
