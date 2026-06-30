# AGENTS.md — `apple-afm3-explainers`

本檔只放**永遠載入、本專案專屬**的不變式。版本號等委派 `package.json`;完整計畫見 `docs/PLAN.md`;術語見 `docs/GLOSSARY.md`。

## 專案一句話

把第三代 Apple Foundation Models（AFM 3）與 PCC on Google Cloud 的**官方事實**,收斂成單一真實來源,產出三份受眾不同的繁體中文 PDF。每份沿同一三主線**介紹 AFM 3**:**這是什麼（五個模型）/ 如何運作（架構與部署）/ 對你代表什麼（隱私與取得）**。

## 不變式（10 條，違反即 build/QA 失敗）

1. **單一真實來源**:事實只在 `content/knowledge-base.md` 定義一次;三份文件為再框架,**不得**新增未入 KB 的事實。
2. **可回溯**:每條 KB 事實必須有 `[S0X]` 來源代碼與 `status:` 欄位。
3. **分層官方來源**:來源僅限 `sources/source-index.md` 之 **T1（Apple 官方）** 與 **T2（合作方官方:Google Cloud / NVIDIA）**;**禁止**以第三方報導作為事實來源。
4. **標示來源方**:凡 T2 來源的事實,文中須標示來源方（Google Cloud / NVIDIA），**不得**呈現為 Apple 官方說法。
5. **官方/報導隔離**:`status: reported-excluded` 的條目**不得**進入 `AFM3-AI使用者版` 與 `AFM3-普羅大眾版` 正文（至多於開發者版附錄,並標記「報導,非官方」）。
6. **beta 時效**:`status: official-beta` 的數字,文中必帶「beta 快照、將由夏季 technical report 更新」標記。
7. **不臆測**:官方未公開項目只能列於「未公開」段,**不得**臆測填補（含模型參數量、內部拓撲、Gemini 介入比例等）。
8. **受眾差異唯一所在**:受眾差異只能由 `content/audiences/*` + theme CSS 表達,**不得**在 KB 內分叉事實。
9. **不再散布**:**不**重製、**不**再散布 Apple/Google 受限授權之原始碼或官方原文長段落;只做繁中轉述 + 必要短引述。
10. **非官方聲明 + 商標**:每份文件含「非官方科普」聲明;Apple、Private Cloud Compute、Apple Intelligence、Gemini、Google、NVIDIA、Blackwell 等商標僅作指稱與說明之用。

## 四（+1）正交軸（任一改動只碰一個檔）

| 軸 | 唯一所在 |
| --- | --- |
| 事實 | `content/knowledge-base.md`（每條附 `[S0X]` + `status:`） |
| 來源 | `sources/source-index.md`（分層官方）+ `sources/source-map.md`（claim→S0X） |
| 受眾差異 | `content/audiences/*` + theme CSS |
| 視覺／圖 | `design/*` + `assets/` |
| 狀態/時效 | KB 條目的 `status:`（`official` / `official-beta` / `forthcoming` / `reported-excluded`） |

## 反漂移檢查（CI/本地）

- `node build/check-sources.mjs`:每條 claim 須有 `[S0X]`;無未標 `status` 之陳述;`reported-excluded` 未出現於大眾/使用者版正文;`official-beta` 帶 beta 標記。
- `qa-report.md`:逐條 claim → source 對應與抽查（Phase 7）。

## 維護層權威邊界（補充治理規則）

> 以下為治理導向的補充規則,釐清視覺系統與 wiki 導航層的權威邊界;不取代上方 10 條不變式,且一律以 KB / 來源檔為準。

**Visual single source:**
任何 CSS、diagram、Web UI、PDF layout、bilingual layout 或視覺系統變更,皆須遵循 `DESIGN.md`(圖表另見 `design/diagram-style.md`)。`DESIGN.md` 可定義呈現規則、design tokens、受眾密度、雙語版式、source/status 標籤與視覺約束;**不得**新增技術事實——技術事實仍屬 `content/knowledge-base.md`,來源權威仍屬 `sources/source-index.md` 與 `sources/source-map.md`。

**Wiki layer is navigational:**
`docs/wiki/` 下的檔案為導航與維護輔助,**不得**新增事實、新的來源詮釋或強於 KB 的宣稱。若 wiki 條目與 `content/knowledge-base.md`、`sources/source-index.md` 或 `sources/source-map.md` 衝突,以 KB 與來源檔為準。

**Status dashboard is not authoritative:**
`docs/wiki/status-dashboard.md` 追蹤更新風險與維護狀態;權威 status 標籤仍在 `content/knowledge-base.md`。dashboard 與 KB 衝突時以 KB 為準。

**Bilingual consistency:**
繁中與英文產出須保有相同的事實意義、source IDs 與 status 標籤。翻譯可改善可讀性,但**不得**改變 claim 強度。一語的 claim 更新時,須同步檢查另一語的對應(找不到對應則標 `TODO: verify`)。
