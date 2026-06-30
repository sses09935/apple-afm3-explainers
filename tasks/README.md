# tasks/ — 各階段執行提示（交給 Claude Code）

每支對應 `docs/PLAN.md` 的一個 Phase。Architect（決策）已固化於 `AGENTS.md` / `docs/PLAN.md` / `content/knowledge-base.md`;這些提示是給 **Tech Lead + Executioner（Claude Code）** 的可執行 brief。

## 執行順序

```
00 → 01 → 02 → (03 ∥ 04 ∥ 05) → 06 → 07
```

- **03 / 04 / 05** 三份草稿共用同一 KB,可並行。
- **00、01 部分已完成**（事實庫與來源清單已建),各檔「已完成（勿重做）」段會標明只需補的殘餘。

## 如何用 Claude Code 執行

在 repo 根目錄,對每個階段給 Claude Code:

> 「先閱讀 `AGENTS.md` 與 `docs/PLAN.md`,再執行 `tasks/NN-xxx.md`。完成後依該檔『驗收』自檢,並回報差異與未解項。」

## 全程必守

- **不變式見 `AGENTS.md`（10 條）**。任一違反 = build / QA 失敗。
- **事實只在 `content/knowledge-base.md`**;文件只做再框架,不得新增 KB 外事實。
- **通過門檻即可**:在來源正確性、官方/報導邊界、引用可回溯上投入;PoC 性質的潤飾從簡。

## 階段一覽

| # | 檔 | Phase | 產出 | 狀態 |
| --- | --- | --- | --- | --- |
| 00 | `00-research-and-archive.md` | 研究擷取與來源存檔 | `sources/primary/*`、`source-map.md` | 來源清單已建,補存檔/對照 |
| 01 | `01-knowledge-base-and-glossary.md` | 事實庫補完與術語表 | `docs/GLOSSARY.md`、KB PCC 基礎遷移 | KB 主體已建,補術語/遷移 |
| 02 | `02-audiences.md` | 受眾規格 | `content/audiences/*` | 待做 |
| 03 | `03-draft-developer.md` | 開發者版草稿 | `content/drafts/dev.md` | 待做（可並行） |
| 04 | `04-draft-ai-user.md` | AI 使用者版草稿 | `content/drafts/ai-user.md` | 待做（可並行） |
| 05 | `05-draft-general.md` | 普羅大眾版草稿 | `content/drafts/general.md` | 待做（可並行） |
| 06 | `06-design-and-render.md` | 設計與渲染 | `design/*`、`assets/*`、`build/*`、`dist/*.pdf` | 待做 |
| 07 | `07-audit-and-citation.md` | 稽核與引用查核 | `qa-report.md` | 待做 |
