# diagrams.md — 圖規格

> 圖只在 `design/` 定義、於 `assets/` 繪製(視覺軸)。**D 系列**(技術圖)用於開發者版;**M 系列**(插圖)用於普羅大眾版。
> 圖中事實一律對應 `content/knowledge-base.md`,不得引入 KB 外資訊。build 時由 `md2html.mjs` 將 SVG **inline** 進 HTML(無外部檔相依,利於 PDF)。
> 配色:D 系列用 `theme-dev` 藍;M 系列用 `theme-general` 橙。文字字型沿用 base.css 的 CJK stack。

## D 系列（開發者版）

| 圖 | 檔 | 內容 | 對應 KB |
| --- | --- | --- | --- |
| **D1** | `assets/diagrams/D1-model-routing.svg` | 五模型路由:端側(AFM 3 Core / Core Advanced,Apple silicon)vs PCC(AFM 3 Cloud / ADM 3 Cloud / AFM 3 Cloud Pro);Cloud Pro 於 Google Cloud NVIDIA GPU | KB-001–007 |
| **D2** | `assets/diagrams/D2-ifp-nand-dram.svg` | IFP 的 NAND→DRAM 選擇性載入:full model 存於 NAND;per-prompt 選 experts;shared + routed experts patch 成 DRAM 可執行的 dense model | KB-016–020 |
| **D3** | `assets/diagrams/D3-pcc-gcp-stack.svg` | PCC-on-GCP 信任堆疊:Google Titan(root of trust)/ Intel TDX(CPU confidential VM)/ NVIDIA CC(GPU)/ CPU→GPU path / Apple 控制 PCC software | KB-037–040、KB-047、KB-051 |
| **D4** | `assets/diagrams/D4-attestation-ledger.svg` | attestation + append-only ledger 鏈:device 驗證 → 雙獨立信任根 → 比對 ledger → 僅連向已登錄節點 | KB-048、KB-049、KB-107、KB-108 |

## M 系列（普羅大眾版）

| 圖 | 檔 | 內容 | 對應 KB |
| --- | --- | --- | --- |
| **M1** | `assets/illustrations/M1-five-helpers.svg` | 五個分工的幫手:2 個在裝置、3 個在雲端 | KB-001–006 |
| **M2** | `assets/illustrations/M2-device-vs-cloud.svg` | 手機處理簡單事 vs 雲端處理難事 | KB-001、KB-008、KB-016 |
| **M3** | `assets/illustrations/M3-locked-cloud-room.svg` | 上鎖的雲端房間:用完即丟、沒人偷看、Apple 持鑰 | KB-046、KB-051、KB-103、KB-105 |
| **M4** | `assets/illustrations/M4-synthid-watermark.svg` | AI 生成/編輯的圖帶看不見的 SynthID 浮水印(Google 技術) | KB-032、KB-034 |

## 英文版圖（English editions）

英文版用同構但**英文標籤**的圖,置於 `assets/diagrams/en/` 與 `assets/illustrations/en/`(檔名與繁中版相同):D1–D4、M1–M4。EN 草稿以 `assets/{diagrams,illustrations}/en/…svg` 引用;build 時同樣 inline。繁中版引用無 `en/` 的路徑,兩語視覺一致、僅標籤語言不同。

## 維護規則（補強）

> 完整的圖表維護規格見 [`design/diagram-style.md`](diagram-style.md)（含 D/M 系列規則、模型架構圖規則、信任邊界規則、雙語圖表規則與維護檢查表）;整體視覺系統見根目錄 [`DESIGN.md`](../DESIGN.md)。本節為要點補強,不取代上述兩份文件。

- **D 系列 vs M 系列**:D 系列為**技術圖**(開發者版),呈現架構/部署/信任邊界;M 系列為**比喻插圖**(普羅大眾版),呈現使用者心智模型。兩者分工不可混用——技術圖不是比喻,比喻不是規格。
- **不得新增技術 claim**:圖中所有事實一律對應 `content/knowledge-base.md`;圖不得引入 KB 外的架構細節、未公開規格(KB-084)或未經來源支持的信任關係。
- **修改須查 source-map**:新增或修改圖時,須回查 `sources/source-map.md`,確認圖中元素對應的 `[S0X]` 與 KB-id 仍成立;T2(Google Cloud / NVIDIA)內容須標明來源方(不變式 4)。
- **保留 status 語意**:status-sensitive 圖(如 beta 評測、forthcoming 細節)須沿用正文的 status 措辭,不得把 `official-beta` 呈現為定版、把 `forthcoming` 呈現為已發布;`reported-excluded` 內容不得進入任何 ai-user / general 用圖。
- **繁中／英文同構**:`assets/.../en/` 之英文圖與繁中圖須結構一致(相同方塊、箭頭、信任邊界與來源/狀態語意),僅標籤翻譯;一語更新須同步另一語(否則標 `TODO: verify`)。
- **audience theme 邊界**:受眾 theme 可調整**色彩與密度**(D 系列藍、M 系列橙,大眾版圖較大較簡),但**不得改變圖的事實結構**——同一組信任邊界與資料流不因配色而變。
