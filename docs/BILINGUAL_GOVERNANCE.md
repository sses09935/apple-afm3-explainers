# Bilingual Governance — AFM 3 Explainers

> How Traditional Chinese and English editions stay aligned. This file governs *translation
> discipline*. It introduces no facts and never overrides `content/knowledge-base.md`.
> See also `docs/BILINGUAL_TERMS.md` (term map) and `docs/wiki/bilingual-term-map.md`.

## 1. Source-of-record

Traditional Chinese (`content/drafts/*`) is the **source-of-record**. English
(`content/drafts/en/*`) is a **source-aligned translation**, unless the repo explicitly adopts equal
bilingual maintenance for a given document (it has not, as of this writing).

```md
The English edition is a source-aligned translation. It must not introduce technical claims that
are absent from the Traditional Chinese source text or unsupported by the existing source map.
```

## 2. Rules

1. Traditional Chinese is source-of-record; English is a source-aligned translation (unless equal
   maintenance is explicitly adopted).
2. The English edition must not add a technical claim absent from the Traditional Chinese source text.
3. The English edition must not weaken any limitation / uncertainty / source boundary.
4. The English edition must not state an inference as a fact.
5. Source references (`[S0X]` / `[S-PCCX]`) must align across languages.
6. Status labels (`official` / `official-beta` / `forthcoming` / `reported-excluded`) must align
   across languages.
7. Section structure should align as closely as practical.
8. English may reorder a sentence for natural word order, but must not change the claim.
9. A technical term's first appearance should keep the English original and its abbreviation.
10. If the Traditional Chinese content changes, the English edition must be re-checked (and vice
    versa). If no counterpart can be found, mark `TODO: verify`.

## 3. What "source-aligned" forbids

- New English-only claims (numbers, mechanisms, capabilities, attributions).
- Softer hedging in English than in Traditional Chinese (e.g., dropping "beta snapshot", "not
  disclosed", "reported, unofficial").
- Stronger English wording that turns "Apple states" into "proven", or "indicates" into "proves".
- Mis-translating the Google Cloud / Gemini / Cloud Pro / PCC boundaries (see
  `docs/BILINGUAL_TERMS.md` and `docs/KNOWLEDGE_GOVERNANCE.md` §4).

## 4. Checking parity

The anti-drift check (`build/check-sources.mjs`) already enforces, across both languages:
`[S0X]` registration, the `reported-excluded` body-text isolation for AI-User/General, and a
"beta marker present" rule for any block carrying a beta figure. Manual parity review covers claim
equality, status wording, source alignment, and section structure — recorded in the "Bilingual QA"
section of `qa-report.md`.
