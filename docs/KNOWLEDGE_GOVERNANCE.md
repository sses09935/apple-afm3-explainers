# Knowledge Governance — AFM 3 Explainers

> Agent-safe, source-bounded, status-aware knowledge governance for the AFM 3 explainers.
> This file is a **navigation and governance** aid. It is not a new factual source and it never
> overrides `content/knowledge-base.md`, `sources/source-index.md`, or `sources/source-map.md`.

## 1. Authority layers (highest wins)

| Layer | Location | Role |
|---|---|---|
| Facts | `content/knowledge-base.md` | Single source of record for every claim (each `KB-###` carries `[S0X]` + `status:`) |
| Sources | `sources/source-index.md` (tiered) + `sources/source-map.md` (claim → S-code) | Source authority and tiering (T1 Apple / T2 partner) |
| Audience framing | `content/audiences/*` + `content/drafts/*` + theme CSS | Re-frames the same facts for three audiences and two languages |
| Visual presentation | `DESIGN.md` + `design/*` + `assets/*` | How facts are presented; introduces no facts |
| Navigation | `docs/wiki/*` | Claim/source/status navigation; introduces no facts |

If any lower layer conflicts with a higher one, the higher layer wins. The 10 binding invariants live
in `AGENTS.md`; this file restates the governance posture for human and AI-agent workflows.

## 2. Status governance

The status axis (`official` / `official-beta` / `forthcoming` / `reported-excluded`) is authoritative
in the KB's `status:` field. Presentation rules are in `DESIGN.md` §17. Governance rules:

- `official` — official-source-backed; **not** automatically independently verified.
- `official-beta` — must keep beta/provisional wording in both languages; never shown as final.
- `forthcoming` — pre-announced, not yet published; never shown as available.
- `reported-excluded` — quarantined third-party reporting; dev-edition appendix only, never an
  official fact, never in AI-User/General body text.

`docs/wiki/status-dashboard.md` tracks *update risk* for these labels but is not authoritative.

## 3. Source governance

- Facts cite only registered sources in `sources/source-index.md`: **T1** (Apple official) and **T2**
  (partner official: Google Cloud / NVIDIA). Third-party reporting is never a fact source.
- T2 facts must name the party (Google Cloud / NVIDIA) and must not be presented as Apple's own.
- Source references (`[S0X]` / `[S-PCCX]`) must stay visible where they back an important claim and
  must map back to the index in both languages.

## 4. Misconception boundaries (high-risk)

These boundaries must never be blurred (they are already established in the drafts and KB):

- **AFM 3 is a five-model system, not a single model.**
- **Apple building models "with Google" (model layer) ≠ "Siri AI is Gemini" (a wrong identity claim).**
- **Cloud Pro / Google Cloud / Gemini / PCC are distinct layers**, not one thing:
  - *Gemini* — the technologies Apple's models were custom-built with; not a relabeling of Siri/AFM.
  - *Google Cloud* — where one model (AFM 3 Cloud Pro) is deployed on NVIDIA GPUs.
  - *Cloud Pro* — Apple's most capable server model name.
  - *PCC (Private Cloud Compute)* — the privacy architecture extended to Google Cloud.
- **`official-beta` ≠ final release; `forthcoming` ≠ already available; `reported-excluded` ≠ official
  confirmation.**
- **On-device / server / Cloud Pro paths are not interchangeable.**
- **An unpublished technical report's contents are not yet established fact.**

## 5. Agent rules

```md
- Do not invent claims or strengthen existing ones.
- Do not modify the factual source layer (KB, source-index, source-map) for presentation reasons.
- Do not weaken or re-define status labels.
- English editions must not introduce claims absent from the Traditional Chinese source text.
- Keep the Google Cloud / Gemini / Cloud Pro / PCC boundaries distinct.
- Keep PCC and AFM 3 as separate repositories.
- Presentation/readability changes go in design/build layers, not the factual layer.
- If a claim needs to change, change it in the KB first, with a source and status, then propagate.
```

## 6. Cross-references

- Invariants: `AGENTS.md`
- Visual system: `DESIGN.md`, `design/readability.md`, `design/component-contract.md`
- Bilingual: `docs/BILINGUAL_GOVERNANCE.md`, `docs/BILINGUAL_TERMS.md`
- References: `docs/DESIGN_REFERENCES.md`
- Navigation: `docs/wiki/*`
