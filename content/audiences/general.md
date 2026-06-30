# 受眾規格 — 普羅大眾版（`AFM3-普羅大眾版.pdf`）

> 對應 `docs/PLAN.md` §4、附錄 A。選材 + 骨架 + 語氣 + 頁數 + theme;事實取自 `content/knowledge-base.md`。
> **theme**:`theme-general`。**目標頁數**:12–18(規劃 ~15)。
> **選材規則**:只取 `audiences.general ∈ {faq, concept}`(共 **39** 條:concept 17 + faq 22)。**零術語門檻、零 `reported-excluded`、零深規格臆測**(不變式 5、7)。

## 受眾畫像
零技術背景。只想知道:**這對我有什麼影響、我的隱私安不安全、能不能用、在哪用**。看圖、看比喻、看 FAQ。

## 語氣與手法
- 大圖(M 系列插圖)+ 生活化比喻 + FAQ;**數字與深規格一律略**,改用比喻。
- 比喻**不得扭曲官方事實**(不變式:比喻僅輔助,事實以 KB 為準)。
- 每個 FAQ 答案對應一個 `KB-id`。
- SynthID 等 T2 仍標明「Google 的技術」。

## 章節骨架（對齊三主線；頁數加總 ~15）

### 封面 + 一句話（~1 頁）
- 非官方科普 + 商標聲明;一句話:Apple 的新 AI 有五個「大腦」,有的在你手機裡、有的在很安全的雲端。KB-001。

### 主線一 — 這是什麼（五個模型）（~4 頁）
- **比喻:五個分工的幫手**:KB-002、KB-003、KB-004、KB-005(concept)、KB-006(faq)。圖 **M1 五個幫手**。
- **手機裡 vs 雲端**:KB-008(faq)、KB-016(faq,「模型放在手機儲存空間,要用才叫出來」)。
- **跟 Google 合作?**:KB-009、KB-010、KB-011(faq,一句話官方定位)。

### 主線二 — 如何運作（用比喻）（~4 頁）
- **為什麼有些要上雲**:KB-036(faq)、KB-043(concept,「Apple 把它的安全雲房間,搬一部分到 Google 的機房」)、KB-046(concept,安全承諾五件事的白話)。圖 **M2 端側 vs 雲端**。
- **別人的機房怎麼還安全**:KB-051(faq,Apple 仍掌控)、KB-053(concept,可被公開檢查)、KB-101(concept)、KB-102(concept)、KB-105(faq,沒人能偷看)、KB-107(concept,公開登錄)、KB-103(faq,用完就丟)。圖 **M3 上鎖的雲端房間**。
- **怎麼教出來的**:KB-058(concept,不用你的資料訓練)、KB-061、KB-062(concept,負責任地做)。

### 主線三 — 對你代表什麼（隱私、能力與取得）（~5 頁）
- **SynthID 是什麼**:KB-030、KB-031、KB-032、KB-033、KB-034(faq,AI 生成/編輯的圖會被打上看不見的「Google 浮水印」)。圖 **M4 隱形浮水印**。
- **每天能用多少**:KB-035(faq)。
- **新功能**:KB-067(concept,新 Siri)、KB-068、KB-069(faq)。
- **能不能用 / 在哪用**:KB-078、KB-080(concept,哪些裝置)、KB-079(concept,語言)、KB-081、KB-082、KB-083(faq,EU/中國/英文 beta)。
- **Apple 有多有把握(FAQ)**:KB-121(faq,Apple 重金懸賞外界找漏洞——對自家安全的信心)。

### ★ FAQ（~1 頁，逐題對應 KB）
- Apple 會看我的內容嗎?→ KB-008、KB-103、KB-105
- 資料會給 Google 嗎?(機房是 Google 的)→ KB-043、KB-051
- AI 生成的圖看得出來嗎?→ KB-032、KB-034
- 哪些裝置能用?→ KB-080
- 為什麼我這裡(EU/中國)還沒有?→ KB-082、KB-083
- 為什麼有用量上限?→ KB-035
- 跟 Google/Gemini 合作代表什麼?→ KB-009、KB-011

## 自檢對應
- KB-id 集合 = `audiences.general ∈ {faq, concept}`(39 條),已納入。
- **零 `reported-excluded`、零術語門檻、無深規格數字**。
- 每個 FAQ 對應實際 KB-id;SynthID 標明 Google。
