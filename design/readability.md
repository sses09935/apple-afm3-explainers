# AFM 3 Explainers — Readability Rules

> Long-form, bilingual, source-bounded readability for the AFM 3 explainers (PDF + Web).
> This file defines **how the prose is structured for reading**. It does **not** define what is true
> and it does **not** authorize new claims. Facts remain authoritative in
> `content/knowledge-base.md`; `DESIGN.md` governs visuals; this file governs reading flow.

## 1. Purpose

AFM 3 is a long, technical, two-language subject. Readability work makes the same facts easier to
read (Reading Mode) and easier to check (Audit Mode) **without** changing any claim, status, or
source boundary. Aligned in spirit with the GOV.UK "plain language / short paragraphs" and Material
for MkDocs "long-form docs" references (see `docs/DESIGN_REFERENCES.md`), adapted to a source-aware,
status-aware explainer.

## 2. Principles

1. **Conclusion first.** Where a section is long, lead with a short "what to take away" before the
   detail. The conclusion restates existing claims; it never adds one.
2. **Short paragraphs.** Prefer several short paragraphs to one dense block. Splitting a paragraph is
   a readability change, not a content change.
3. **Confirmed vs. not directly inferable.** Where readers commonly over-read a claim, separate
   "what can be confirmed (with `[S0X]`)" from "what cannot be directly inferred." Use the existing
   boundary wording already in the drafts.
4. **Name the misconception.** High-risk misreadings get a labeled "common misconception" callout
   that uses only claims already present and sourced.
5. **Tables get a reading aid.** A dense table may be preceded by a one-line "how to read this table."
6. **Status stays visible.** Readability never hides a `[S0X]`, a status pill, or a limitation
   clause. Quieting in Reading Mode is a visual treatment, not a removal.
7. **Bilingual parity.** A readability addition on one language is mirrored in the other with the same
   meaning and the same claim strength (see `docs/BILINGUAL_GOVERNANCE.md`).

## 3. Allowed readability edits

- Split long paragraphs.
- Add a short "先講結論 / In short" lead.
- Add "What can be confirmed" / "What cannot be directly inferred".
- Add a "常見誤解 / Common misconception" callout (using existing, sourced claims only).
- Add "How to read this table".
- Add "What to take away" / section summaries / takeaway lists.
- Reorder a sentence for natural English word order (without changing the claim).
- Consolidate existing content into a summary card.

## 4. Disallowed (readability must never do these)

- Add a claim not supported by the source map.
- Re-define `official-beta` / `forthcoming` / `reported-excluded`.
- State an inference as a fact.
- Write Apple × Google Cloud as "Siri AI is Gemini."
- Write AFM 3 as a single model.
- Collapse Cloud Pro / Google Cloud / Gemini / PCC into one layer.
- Present an unpublished technical report's contents as already published.
- Delete a limitation clause or a source reference.

## 5. Callout vocabulary for readability

Readability callouts use the callout component (see `design/component-contract.md`). The renderer
classifies a callout by its leading marker; readability adds these in both languages:

| Marker (zh / en) | Callout variant | Reading Mode | Audit Mode |
|---|---|---|---|
| `**常見誤解：**` / `**Common misconception:**` | `callout-misconception` | quiet, distinct | prominent (scan target) |
| `**先講結論：**` / `**In short:**` | `callout-summary` | quiet lead | quiet lead |
| boundary / accuracy wording (`界線`, `boundary`, `accuracy red line`) | `callout-boundary` | distinct | prominent |
| `注意` / `Note:` | `callout-warning` | distinct | prominent |
| anything else | `callout-note` | quiet | slightly stronger |

## 6. Per-audience reading targets (density unchanged)

- **Developer** — densest; conclusion-first leads, table reading-aids, and explicit boundary callouts
  are most useful here. May carry the `reported-excluded` appendix.
- **AI User** — medium; misconception callouts and "what it means for you" framings, no
  `reported-excluded` in body.
- **General** — lightest; short paragraphs, analogies (no new facts), FAQ, no `reported-excluded`.

Density is an audience property (`DESIGN.md` §8). Readability work changes reading *flow*, not the
audience's information density and not the KB.
