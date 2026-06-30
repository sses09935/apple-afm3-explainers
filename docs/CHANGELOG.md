# CHANGELOG

> 版本與「事實更新」紀錄。評測數字皆為官方 **beta 階段快照**；Apple 已預告今夏稍晚發布 technical report（來源 `[S15]`，`status: forthcoming`）。該報告落地後（里程碑 **M6**），於此逐條校正 `official-beta` 條目並解除 beta 標記。
>
> 格式參考 [Keep a Changelog](https://keepachangelog.com/)。日期基準：2026-06-23。
>
> 本 repo 之 git 歷史已整併為**單一乾淨 commit**；版本線為兩點（`v1.0.0` 初版里程碑 + `v2.0.0` canonical）。本檔保留專案里程碑沿革；事實層（`sources/*`、`content/knowledge-base.md`）未因版本作業而改動。

## [2.0.0] — 2026-06-30（canonical · 雙語可讀性 + Audit Mode 系統）

> **Canonical release.** 對外可引用的 canonical 版本：雙語（繁中＋英文）、三受眾（Developer／AI-User／General）的 source-bounded PDF/Web 知識產品，具統一可讀性設計系統與 audit 導向查核層。

### Added / Changed
- **Reading Mode / Audit Mode**：web 單一 DOM 狀態 `data-reader-mode`（`reading` 預設 / `audit`），`localStorage` 記憶、無 JS 時預設 Reading；PDF 不含此 web-only 切換。
- **設計系統**：`DESIGN.md`（human + AI-agent 可讀的設計 source of truth）、`design/component-contract.md`、`design/readability.md`、`design/diagram-style.md`；design tokens、status pill、callout 變體、每頁 footer metadata、語言/受眾導覽。
- **狀態可讀性**：`official-beta` / `forthcoming` / `reported-excluded` pill 與不可混用規則（`DESIGN.md` §17）。
- **知識治理**：`docs/KNOWLEDGE_GOVERNANCE.md` + wiki 導航層 `docs/wiki/*`（claim-index、source-authority-map、status-dashboard、bilingual-term-map、audience-route-map）；AI-agent 維護規則防 factual drift。
- **雙語治理**：`docs/BILINGUAL_GOVERNANCE.md`、`docs/BILINGUAL_TERMS.md`（繁中 source-of-record、英文 source-aligned）；英文不新增繁中沒有的 claim。
- **設計參考**：`docs/DESIGN_REFERENCES.md`（google-labs-code/design.md、OpenKnowledge／OKB、Material for MkDocs、GOV.UK、GitHub Primer、USWDS —— 僅靈感參考，不複製程式碼、不引 GPL/AGPL、不仿 Apple 視覺）。
- **除錯／QA**：`build/debug-web.mjs`（`npm run debug:web`）；`qa-report.md` 擴充 Reading/Audit、雙語、參考署名、授權安全檢查。
- **Repo / release line**：git 歷史整併為單一 commit；移除 GitHub Actions workflow；版本線兩點（`v1.0.0` + `v2.0.0`）立於同一 baseline；`v2.0.0` 掛 6 份 PDF（繁中以 `-zh-Hant` ASCII 名）。

### Notes
- 英文版維持 source-aligned，不得新增繁中沒有的 technical claim。
- 外部系統僅作設計／文件／知識治理靈感參考；不仿 Apple 官方視覺；不複製第三方 UI code；不引入 GPL/AGPL。
- 事實層（`content/knowledge-base.md`、`sources/*`）維持不變，未新增 technical claim。
- `check-sources` / `check-links` / `debug:web` 全綠（唯一 S10 WARN 為既有、非阻斷）。

## [1.0.0] — 2026-06-24（initial public release · 初版基線）

> 初版：source-bounded、雙語、三受眾的 AFM 3 + PCC on Google Cloud 科普說明；非官方／教育用途。

### Added
- 三受眾（Developer／AI-User／General）× 雙語（繁中＋英文）白皮書 → 6 份 PDF + web。
- 事實單一真實來源：`content/knowledge-base.md`（每條附 `[S0X]` + `status`）；`sources/source-index.md`（分層官方 T1/T2）+ `sources/source-map.md`（claim→來源）。
- PDF/Web 發佈基礎（Markdown → HTML → PDF；自包含 web + 導覽 + 資料來源頁 + 首頁）。
- 反漂移檢查 `build/check-sources.mjs`、`build/check-links.mjs`；`README`、`docs/PLAN.md`、`docs/GLOSSARY.md`、`AGENTS.md` 治理。

## 事實更新追蹤（M6，待 S15）

| 觸發 | 待更新條目 | 動作 | 狀態 |
| --- | --- | --- | --- |
| 夏季 technical report（S15）發布 | KB-022、KB-023、KB-026、KB-027、KB-028、KB-041、KB-063、KB-064、KB-065 | 以正式數字取代 beta 快照、解除 `official-beta`、改標 `official` | 待觸發 |
| 更新版 PCC Security Guide（S16）發布 | KB-052、KB-054 | 補 PCC-on-GCP 完整防護細節，解除 `forthcoming` | 待觸發 |
| Confidential Computing Summit talk（S17）發布 | KB-054 | 補技術細節來源 | 待觸發 |
