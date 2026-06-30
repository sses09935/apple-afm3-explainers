# Design and Knowledge References — AFM 3 Explainers

> External projects referenced for **design, information architecture, knowledge governance, and
> agent-workflow** inspiration. None of this is an endorsement, and none of it is a source of copied
> code. AFM 3 keeps its own content model, source boundaries, bilingual structure, status labels, and
> PDF/Web implementation. See `DESIGN.md` §16 for the short list.

## Attribution and limits

Each reference below has an explicit **Use** (what we take as inspiration) and **Limit** (what we do
not do). The blanket rules:

- We do **not** copy UI/theme/component code from any of these projects.
- We do **not** import GPL- or AGPL-covered implementations.
- We do **not** claim any of these projects endorses this repo.
- We do **not** imitate Apple's official visual identity (independent, educational explainer).

| # | Reference | Use (inspiration only) | Limit |
|---|---|---|---|
| 1 | **`google-labs-code/design.md`** | `DESIGN.md` as a single, human-readable *and* AI-readable design source of truth that an agent can follow | Do not copy its example visuals; do not claim Google endorsement |
| 2 | **OpenKnowledge / OKB** | Agent-native knowledge base, LLM wiki, source/status navigation, claim traceability (mirrored by `docs/wiki/*` + `docs/KNOWLEDGE_GOVERNANCE.md`) | Do not copy OKB code; do not import any GPL-covered implementation |
| 3 | **Material for MkDocs** | Long-form documentation reading: TOC, admonition/callout patterns, Markdown-first authoring | Do not migrate to MkDocs; do not copy its theme code |
| 4 | **GOV.UK Design System** | Plain language, short paragraphs, low-distraction public-information design | Do not imitate the GOV.UK brand look |
| 5 | **GitHub Primer** | Badge / label / alert / metadata patterns; neutral open-source UI vocabulary (status pills, source-ref labels) | Do not copy Primer component code |
| 6 | **U.S. Web Design System (USWDS)** | Accessibility, mobile-friendly public-information design, typography discipline | Do not imitate the USWDS visual brand |

## How these map into this repo

- **Design source of truth (1)** → `DESIGN.md`, `design/readability.md`,
  `design/component-contract.md`.
- **Knowledge governance / traceability (2)** → `content/knowledge-base.md` (facts),
  `sources/source-map.md` (claim → source), `docs/wiki/*` (navigation),
  `docs/KNOWLEDGE_GOVERNANCE.md` (governance posture).
- **Long-form reading (3)** → the reader TOC + on-page search + Reading/Audit Mode in
  `build/md2html.mjs` and `design/base.css`; callout vocabulary in `design/component-contract.md`.
- **Plain language (4)** → `design/readability.md` (short paragraphs, conclusion-first).
- **Neutral labels/metadata (5)** → `.source-ref`, `.status-pill`, `.status-legend`, footer metadata.
- **Accessibility / mobile / typography (6)** → `@media screen` reader layout, focus-visible styles,
  mobile breakpoints, and the CJK-first type stack in `design/base.css`.

## License posture

This repo is Apache-2.0 (`LICENSE`). Referencing a project's *ideas* for layout, information
architecture, or governance does not import its license. No third-party code is vendored; no
GPL/AGPL dependency is introduced. The project dependencies are limited to `markdown-it`,
`markdown-it-attrs`, `playwright`, and `firebase-tools` (see `package.json`).
