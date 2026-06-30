# Bilingual Term Map — AFM 3 Explainers

> Canonical Traditional Chinese ↔ English terminology with usage rules. A navigation/maintenance aid,
> not a new factual source. This complements the longer table in `docs/wiki/bilingual-term-map.md`
> and the glossary in `docs/GLOSSARY.md`; governance rules are in `docs/BILINGUAL_GOVERNANCE.md`.

| 繁中 | English | 使用規則 / Usage rule |
|---|---|---|
| Apple Foundation Models 3 | Apple Foundation Models 3 | 不要翻成自創名稱 / do not invent a translated name |
| AFM 3 | AFM 3 | 縮寫保持一致 / keep the abbreviation consistent |
| 五模型 | five-model system / five AFM 3 models | 視上下文使用 / context-dependent; never "a model" singular |
| 端側模型 | on-device model | 不要與 local-only capability 混用 / do not conflate with a local-only capability claim |
| 伺服器模型 | server model | 依來源邊界使用 / use within the stated source boundary |
| Cloud Pro | Cloud Pro | 保留名稱 / keep the name (AFM 3 Cloud Pro) |
| Google Cloud | Google Cloud | 不等於 Gemini / not equal to Gemini; it is a deployment location |
| Gemini | Gemini | 不可寫成 Siri AI 底層總稱 / not a blanket label for what powers Siri AI |
| Private Cloud Compute | Private Cloud Compute | 第一次可寫 PCC / spell out once, then "PCC" |
| official-beta | official beta | 不可寫成 final release / not a final release |
| forthcoming | forthcoming | 不可寫成 released / not "released" or "available" |
| reported-excluded | reported-excluded | 不可寫成 official fact / not an official fact |
| 不能直接推論 | cannot directly infer | 不要寫成 impossible，除非來源明確說 impossible / not "impossible" unless a source says so |
| 官方文件顯示 | official documentation indicates | 不要寫成 Apple proves / not "Apple proves" |

## Boundary reminders

- **"與 Google 合作" (built with Google) ≠ "跑在 Google Cloud" (runs in Google Cloud).** The first
  covers all five models; the second covers only AFM 3 Cloud Pro.
- **Cloud Pro / Google Cloud / Gemini / PCC are four distinct things** — keep them distinct in both
  languages (see `docs/KNOWLEDGE_GOVERNANCE.md` §4).
- Status codes stay in English in both languages; only the in-body marker is translated
  (`beta 快照` ↔ "beta snapshot", `報導，非官方` ↔ "reported, unofficial").

If the repo has not settled on a stable Traditional Chinese rendering for a term, mark it
`TODO: verify` rather than inventing one.
