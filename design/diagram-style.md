# AFM3 Diagram Style Guide

> Maintenance rules for the AFM3 diagrams. Companion to `design/diagrams.md` (which lists the
> concrete D/M files and their KB mappings) and `DESIGN.md` (the overall visual system).

## 1. Purpose

This guide defines how the AFM3 diagrams are built and maintained so that every diagram stays
accurate, traceable, status-honest, and bilingually consistent. It governs both the technical
diagrams (D-series) and the metaphorical illustrations (M-series).

## 2. Authority Boundary

This file defines diagram maintenance rules.

It does **not** introduce new AFM3, PCC, Apple, Google Cloud, NVIDIA, Intel, or Google Titan
facts. Every diagram's content is grounded in `content/knowledge-base.md` and traced through
`sources/source-map.md`. If this guide ever conflicts with the KB or source files, the KB and
source files win.

## 3. Diagram Families

| Family | Role | Edition | Files | Theme color |
|---|---|---|---|---|
| **D-series** | Technical diagrams | Developer | `assets/diagrams/D1–D4.svg` (+ `en/`) | `theme-dev` blue |
| **M-series** | Metaphorical illustrations | General | `assets/illustrations/M1–M4.svg` (+ `en/`) | `theme-general` orange |

Diagrams are defined in `design/` and drawn in `assets/`. At build time `md2html.mjs` inlines
the SVG into the HTML (no external file dependency, so PDFs stay self-contained). Keep the two
families distinct: a technical diagram is not a metaphor, and a metaphor is not a spec.

Current inventory (see `design/diagrams.md` for the authoritative table):

- **D1** model routing — KB-001–007
- **D2** IFP NAND→DRAM selective loading — KB-016–020
- **D3** PCC-on-GCP trust stack — KB-037–040, KB-047, KB-051
- **D4** attestation + append-only ledger chain — KB-048, KB-049, KB-107, KB-108
- **M1** five helpers (2 on-device, 3 in cloud) — KB-001–006
- **M2** device vs cloud — KB-001, KB-008, KB-016
- **M3** locked cloud room — KB-046, KB-051, KB-103, KB-105
- **M4** SynthID watermark (Google tech) — KB-032, KB-034

## 4. D-Series Technical Diagrams

D-series diagrams are technical diagrams.

They may explain:

- five-model architecture
- on-device vs cloud model split
- model routing
- sparse architecture
- PCC extension
- PCC on Google Cloud
- confidential computing stack
- deployment boundaries
- source and status boundaries

Rules:

- Each D-series diagram must map back to KB claims or source-map entries.
- Technical diagrams must not introduce new architecture details.
- Technical diagrams must not show unverified trust relationships as verified facts.
- Technical diagrams must preserve status labels when relevant.
- Technical diagrams must use source labels when appropriate.

## 5. M-Series Metaphorical Illustrations

M-series illustrations are metaphorical diagrams.

They may explain:

- user-facing mental models
- simplified five-model explanation
- simplified on-device vs cloud split
- simplified model routing
- simplified PCC boundary

Rules:

- Metaphors can simplify, but cannot redefine AFM 3 or PCC.
- Metaphors must not add technical properties.
- Each M-series illustration should map back to at least one KB claim, D-series diagram, or
  source-map entry.
- If a metaphor risks overclaiming, add a caution note or avoid the metaphor.
- M-series diagrams must not imply AFM 3 is Gemini.
- M-series diagrams must not imply Google can freely process user data.

## 6. Shared Visual Vocabulary

- One on-device color region and one cloud/PCC color region, used consistently across diagrams.
- Trust boundaries drawn as explicit enclosures, not implied by proximity.
- Arrows show direction of data or control flow, with a clear start and end (see Section 10).
- Source labels (`[S0X]`) and status markers reuse the prose conventions, not new glyphs.
- Type uses the `base.css` CJK stack so diagram labels match body text in both languages.

## 7. Model Architecture Rules

- The five models are **AFM 3 Core, AFM 3 Core Advanced, AFM 3 Cloud, ADM 3 Cloud (Image),
  AFM 3 Cloud Pro**. Two are on-device; three run on PCC. Keep this split exact.
- "Built with Google" (model layer, all five models) and "running in Google Cloud" (deployment
  layer, only AFM 3 Cloud Pro) are distinct — a diagram must not blur them (KB-007, KB-036).
- Do not depict undisclosed internals (parameter counts, expert counts, topology, context
  sizes) — KB-084 lists these as undisclosed; leave them out rather than inventing them.
- Sparse / IFP diagrams (D2) show selective NAND→DRAM loading and per-prompt routing as
  described in KB-016–020 — no token-level routing claims.

## 8. Deployment and Confidential Computing Rules

- The PCC-on-Google-Cloud hardware stack is **NVIDIA Confidential Computing (NVIDIA GPUs),
  Intel CPUs with TDX, and Google's Titan chip** (KB-037). Attribute each correctly.
- Do not show the model as primarily executing on the Intel CPU; Intel TDX provides CPU-side
  confidential VM / trusted execution, and TDX + NVIDIA CC together protect the CPU-to-GPU
  path (KB-039).
- NVIDIA CC provides GPU-side confidential inference and data-in-use protection (KB-038);
  Google Titan provides the hardware root of trust (KB-040). Keep these roles distinct.
- T2 (partner) facts in a diagram must be attributed to Google Cloud / NVIDIA, not presented
  as Apple's own statement (Invariant 4).

## 9. Trust Boundary Rules

Diagrams must keep these boundaries distinct and must not collapse one into another:

- Apple claim vs independently verifiable property
- Apple model vs Google / Gemini model
- AFM 3 model family vs Apple Intelligence product feature
- on-device model vs cloud model
- PCC on Apple infrastructure vs PCC on Google Cloud
- confidential computing support vs unrestricted third-party processing
- official-beta vs finalized capability
- forthcoming technical report vs already published technical detail
- reported-excluded content vs user-facing body content

A diagram must never use visual weight, color, or adjacency to imply a stronger trust
relationship than the sources support. The "no reproducible builds" accuracy red line
(KB-123) means a verification diagram should show the attestation ↔ transparency-log chain,
not a "source ↔ binary" guarantee.

## 10. Arrow and Flow Rules

- Every arrow has a defined meaning (data flow, control, attestation, verification) — keep the
  meaning consistent within a diagram and note it if ambiguous.
- Do not imply data flows that the KB does not describe (e.g. user data flowing to a party that
  the sources say cannot access it).
- Flow direction must match the prose: device → PCC for cloud requests; attestation/verification
  flows device → node before data is sent (KB-108).

## 11. Source and Status Label Rules

- Where a diagram asserts a specific claim, label it with the backing `[S0X]` code(s) consistent
  with `sources/source-map.md`.
- Status-sensitive content (beta evaluation numbers, forthcoming details) must carry or inherit
  the same status wording used in prose; a diagram must not present a beta or forthcoming item
  as finalized.
- Do not place `reported-excluded` content in any diagram used by the AI User or General edition.

## 12. Bilingual Diagram Rules

- English diagrams live in `assets/diagrams/en/` and `assets/illustrations/en/`, with the same
  filenames as the Traditional Chinese versions.
- The two language versions must be structurally identical: same boxes, same arrows, same trust
  boundaries, same source/status meaning. Only the text labels are translated.
- If a structural difference is unavoidable, document the reason; otherwise treat divergence as
  a drift bug.
- When a diagram is updated in one language, update the counterpart in the other (or mark
  `TODO: verify`).

## 13. Audience Theme Mapping

- D-series uses the developer theme palette (`theme-dev`, blue); M-series uses the general theme
  palette (`theme-general`, orange).
- Themes may adjust color and density to suit the audience, but must not change a diagram's
  factual structure — the same trust boundaries and flows hold regardless of palette.
- General-edition illustrations may be larger and simpler; developer-edition diagrams may be
  denser. Density is a presentation choice, not a license to add or drop facts.

## 14. Maintenance Checklist

When adding or changing a diagram:

- [ ] It maps back to specific KB IDs / source-map entries (update `design/diagrams.md`).
- [ ] It introduces no architecture detail or trust relationship absent from the KB.
- [ ] It does not depict undisclosed specs (KB-084).
- [ ] T2 (Google Cloud / NVIDIA) content is attributed to the partner.
- [ ] Status-sensitive content keeps its status meaning.
- [ ] Source labels match `sources/source-map.md`.
- [ ] Traditional Chinese and English versions are structurally identical.
- [ ] D-series stayed technical; M-series stayed metaphorical.
- [ ] SVG still inlines cleanly (no external dependency, no broken PDF render).

## 15. Do / Don't

**Do**

- Keep D-series technical and M-series metaphorical.
- Trace every diagram element back to the KB.
- Attribute partner (T2) facts to Google Cloud / NVIDIA.
- Keep both language versions structurally identical.
- Preserve status meaning for beta / forthcoming / reported-excluded content.

**Don't**

- Don't invent architecture details, parameter counts, or trust relationships.
- Don't imply AFM 3 is Gemini.
- Don't imply Google can freely process user data.
- Don't present official-beta as finalized or forthcoming as published.
- Don't place reported-excluded content in AI User or General diagrams.
- Don't let a metaphor add a technical property the sources do not support.
