# Task 01 — 事實庫補完與術語表
> Phase 1 · 對應 PLAN §8、§9 · 交給 Claude Code

## 目標
補完事實層的兩個殘餘:術語表,以及自前作遷移的 PCC 基礎條目。

## 已完成（勿重做）
- `content/knowledge-base.md` KB-001–085（AFM 3 全主題）已建,並標 `status` / `audiences`。

## 待產出
- `docs/GLOSSARY.md`:術語表。
- `content/knowledge-base.md` 末段「PCC 基礎」KB-101 起:自前作遷移。

## 步驟
1. 掃描 `knowledge-base.md`,列出所有技術術語,至少:IFP、PT-MoE、MoE、TDX、TEE、attestation、root of trust、append-only ledger、confidential VM、PCC、QAT、Neural Engine、unified memory、Genmoji、SynthID、Image Playground、reasoning level、Language Model protocol、Core AI、NAND/DRAM、shared/routed experts。
2. 每條術語在 `GLOSSARY.md` 以繁中 1–3 句定義,標註首次出現的 `KB-id` 與來源 `[S0X]`;**不**在 GLOSSARY 新增 KB 沒有的事實。
3. 自 `apple-pcc-privacy-explainers` 的 `content/knowledge-base.md`,遷移「PCC 核心五要求、attestation、VRE、verifiable transparency」等 2024 世代基礎條目為 **KB-101 起**,來源改對應 `S-PCC1` / `S-PCC2`,作為 GCP 擴展（KB-042–054）之地基。

## 必守不變式（摘要）
- 事實單一來源（#1、#8):術語表與 PCC 基礎不得分叉或新增 KB 外事實。
- 可回溯（#2):遷移條目須帶 `[S-PCCx]` + `status`。
- 不再散布（#9):不搬入 Apple PCC 受限原始碼;只取事實層敘述。

## 驗收
- 草稿會用到的每個術語都有 GLOSSARY 條目且連回 KB。
- PCC 基礎條目遷移完成,來源正確,編號自 KB-101 起不與既有衝突。

## 給 Claude Code 的一句話
> 讀 knowledge-base.md;產生 docs/GLOSSARY.md（每術語連回 KB-id + [S0X]）;自前作遷移 PCC 基礎條目為 KB-101 起並重對應 S-PCC 來源;依驗收自檢。
