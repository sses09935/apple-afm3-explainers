# AFM3 Explainers Design System

> Visual governance for the AFM3 explainers (PDF + Web + diagrams + bilingual layout).
> This file defines **how things look and are presented**. It does **not** define what is true.

## 1. Purpose

`DESIGN.md` is the single reference for visual and presentation rules across the AFM3
explainers: PDF styling, Web (`@media screen`) presentation, diagrams, source labels, status
labels, bilingual layout, and the three audience density modes.

It exists so that any CSS, diagram, Web UI, PDF layout, or bilingual-layout change can be made
consistently and safely, without weakening the project's source-aware, status-aware,
anti-drift architecture.

It complements — and never overrides — the existing CSS (`design/base.css` + the three
`theme-*.css` files) and the diagram spec (`design/diagrams.md`, `design/diagram-style.md`).

## 2. Authority Boundary

`DESIGN.md` is **not** a source of technical facts.

Technical facts remain authoritative in:

- `content/knowledge-base.md`
- `sources/source-index.md`
- `sources/source-map.md`

If `DESIGN.md` conflicts with the KB or source files, the KB and source files win.

This file may define presentation rules, design tokens, audience density, bilingual layout,
source labels, status labels, and visual constraints. It must never introduce a new AFM3,
Apple Intelligence, PCC, Google Cloud, NVIDIA, Intel TDX, Google Titan, Gemini, or Siri
technical claim, nor strengthen an existing one.

## 3. Visual Positioning

AFM3 Explainers is an auditable bilingual AI-infrastructure explainer project.

Its visual tone should resemble a technical briefing, a model-architecture explainer, and an
educational white paper. It should be clear, restrained, source-aware, bilingual-friendly,
and readable.

It must **not** look like:

- an Apple official webpage
- a Google official webpage
- an NVIDIA official webpage
- a marketing landing page
- an AI hype deck
- a model leaderboard
- a rumor summary
- a cyberpunk / glow-heavy technology poster
- an unsupported Apple Intelligence capability claim

The restraint is itself a safety property: a page that looks like an official Apple/Google/NVIDIA
publication invites readers to over-trust it. The project is explicitly an **unofficial,
educational** explainer (see the trademark/non-official disclaimer carried in every draft).

## 4. Design Principles

1. **Source-visible.** A reader can always see which source backs an important claim. Visual
   cleanliness never justifies hiding a `[S0X]` reference.
2. **Status-honest.** Beta, forthcoming, and reported-excluded material is visually
   distinguishable from finalized fact; emphasis never makes provisional material look settled.
3. **One factual base, many frames.** The same KB fact is reframed for three audiences and two
   languages. Presentation density may change; meaning may not.
4. **Bilingual parity.** Traditional Chinese and English share structure, source IDs, status
   labels, and claim strength. Layout differences must have a documented reason.
5. **Restraint over spectacle.** Prefer plain, legible typography and quiet color to visual
   drama. Do not let a visual effect imply a capability the sources do not support.
6. **Print and screen from one source.** The same HTML serves PDF (print) and Web (screen);
   rules live in `base.css` with `@media screen` / `@media print` separation, not in forks.

## 5. Design Tokens

Tokens are defined in `design/base.css` (`:root`) and overridden per audience in the
`theme-*.css` files. Only tokens that actually exist in the CSS are listed. `--accent`,
`--accent-soft`, `--cover-bg`, and `--cover-fg` are intentionally overridden by each theme.

| Token | Current Source | Current Value (base) | Purpose | Notes |
|---|---|---|---|---|
| `--font-sans` | `design/base.css` | PingFang TC / Noto Sans CJK TC stack | Body + headings | CJK-first; macOS PingFang, Linux/CI Noto |
| `--font-mono` | `design/base.css` | SF Mono / Menlo / Consolas stack | Code, `[S0X]` codes | Used for source citations |
| `--ink` | `design/base.css` | `#1d1d1f` | Primary text | Overridden per theme |
| `--ink-soft` | `design/base.css` | `#4a4a4f` | Secondary text, captions | Overridden per theme |
| `--rule` | `design/base.css` | `#d8d8dd` | Borders, table/figure rules | Overridden per theme |
| `--accent` | `design/base.css` → theme | base `#0a6cff`; dev `#0b5fd4`, ai-user `#0a8f7a`, general `#e8730c` | Headings, links, source labels | Theme-driven |
| `--accent-soft` | `design/base.css` → theme | base `#eaf2ff` (theme variants) | Callout/blockquote/table-head fill | Theme-driven |
| `--code-bg` | `design/base.css` | `#f5f5f7` (theme variants) | Code + inline-code background | Overridden per theme |
| `--cite` | `design/base.css` | `#6a6a70` | Citation/caption text color | Overridden per theme |
| `--page-margin` | `design/base.css` | `18mm` (general `20mm`) | Print margin token | `@page` uses literal mm (Chromium limitation) |
| `--paper` | `design/base.css` | `#ffffff` | Page background | — |
| `--paper-soft` | `design/base.css` | `#f7f9fc` | Reader-tools / soft panels | — |
| `--shadow-soft` | `design/base.css` | `0 12px 32px rgba(20,28,45,.08)` | Soft elevation | Screen only |
| `--cover-bg` | `theme-*.css` | per-theme gradient | Cover background | Theme-only |
| `--cover-fg` | `theme-*.css` | `#ffffff` | Cover foreground | Theme-only |
| `--accent-strong` | `base.css` → theme | base `var(--accent)`; dev `#08418f`, ai-user `#06695a`, general `#a8400a` | Darker accent: heading rails, source-ref text, table-head text | Theme-overridden |
| `--source-bg` | `base.css` | `var(--accent-soft)` | `.source-ref` citation-pill background | — |
| `--source-border` | `base.css` | `var(--accent)` | `.source-ref` citation-pill border | — |
| `--status-beta-bg` / `-fg` / `-border` | `base.css` | `#fff7db` / `#7a4a00` / `#e6c25c` | `code.status-beta` (`official-beta`) pill | Fixed hex for predictable print |
| `--status-forthcoming-bg` / `-fg` / `-border` | `base.css` | `#eaf0ff` / `#324bb0` / `#b6c6f0` | `code.status-forthcoming` (`forthcoming`) pill | Fixed hex |
| `--status-boundary-bg` / `-fg` / `-border` | `base.css` | `#fff1f1` / `#8a1f1f` / `#efbcbc` | `code.status-excluded` (`reported-excluded`) pill + missing-figure | Fixed hex |

Rules:

- Only use tokens that exist in the CSS. Do not invent new tokens without updating this table
  and `design/base.css` together.
- When adding a token, add it to `base.css` first, give it a clear purpose here, and confirm it
  does not break the three themes or the `@page` literal-margin constraint.

## 6. Typography

- One CJK-first sans stack (`--font-sans`) for body and headings; one mono stack
  (`--font-mono`) for code and `[S0X]` source codes. Do not introduce decorative or display
  fonts.
- Heading scale lives in `base.css` (`h1`–`h4`); audience themes adjust base `font-size`
  (general is larger) but keep the same hierarchy.
- Keep line-height generous for readability (base 1.72; general 1.9). CJK and English share the
  same stack so bilingual pages stay visually aligned.
- `[S0X]` / `[S-PCCX]` codes are rendered in mono and tinted (`--cite` / `.source-ref`) so they
  read as citations, not prose. Never restyle them into invisibility.

## 7. Layout and Density

- Print: A4, literal `18mm` margin (`20mm` general). `#` main-line breaks start a new page;
  `##` sub-sections flow or page-break per theme (`main h2 { break-before: page }` in each
  theme).
- Screen: a centered reader column with an optional sticky TOC + on-page search sidebar
  (`reader-layout` / `reader-tools`). Page breaks apply to print only.
- Density is an audience property (Section 8), expressed through theme CSS and content
  selection — never by forking facts in the KB.

## 8. Audience Modes

The three modes map to `content/audiences/{dev,ai-user,general}.md`, the drafts
`content/drafts/{,en/}{dev,ai-user,general}.md`, and `theme-{dev,ai-user,general}.css`.

### Developer

- Highest information density.
- Suitable for model architecture, routing, deployment, PCC, confidential computing,
  attestation, TEE, and source-status boundaries.
- May use technical tables, dense diagrams (D-series), and precise terminology.
- Must not strengthen claims beyond the KB, source-map, or `status:` field.

### AI User

- Medium information density.
- Suitable for practical interpretation, feature expectations, privacy expectations, and
  capability boundaries.
- May use checklists, interpretation boxes, and simplified data-flow explanations.
- Must explain technical terms without changing their meaning.
- Must not include `reported-excluded` content in body text.

### General Public

- Lowest information density.
- Suitable for metaphorical explanations (M-series), short paragraphs, FAQ, and simplified
  diagrams.
- May use analogies.
- Analogies must not create new technical facts.
- Must not include `reported-excluded` content in body text.

## 9. Bilingual Layout Rules

- Traditional Chinese and English outputs must share the same factual base.
- Translation may improve readability, but must not change claim strength.
- Source IDs (`[S0X]` / `[S-PCCX]`) must remain aligned across languages.
- Status labels must remain aligned across languages.
- Diagram structure should remain identical across languages unless a documented reason exists
  (English diagrams live in `assets/diagrams/en/` and `assets/illustrations/en/` and are
  structurally identical, with translated labels only).
- English diagram labels may be translated, but diagram logic must not change.
- If a Traditional Chinese claim is updated, the English counterpart must be checked.
- If an English claim is updated, the Traditional Chinese counterpart must be checked.
- If no counterpart can be found, mark `TODO: verify`.

## 10. Components

Each component is a rule set, not a UI implementation. Locations refer to the existing CSS
classes / Markdown conventions already in the repo.

### Source reference label (`[S0X]`, `.source-ref`)
- **Purpose:** show which registered source backs a claim.
- **Allowed locations:** inline after the claim it supports; sources page.
- **Must not:** be removed for visual cleanliness, or point to anything not in
  `sources/source-index.md`.

### Status label (`official` / `official-beta` / `forthcoming` / `reported-excluded`)
- **Purpose:** signal claim maturity.
- **Allowed locations:** KB (authoritative); draft status legends; dev tables.
- **Must not:** be visually removed, weakened, or made to look finalized when it is not.

### `official-beta` label ("beta snapshot" / "beta 快照")
- **Purpose:** mark provisional evaluation numbers.
- **Allowed locations:** next to any beta figure, in all audiences that show the figure.
- **Must not:** be dropped when a beta number is shown in either language.

### Forthcoming note ("pending" / "待發布")
- **Purpose:** mark pre-announced, not-yet-published material.
- **Allowed locations:** anywhere the item is mentioned.
- **Must not:** be styled or worded as already-published.

### Reported-excluded boundary note ("reported, unofficial" / "報導，非官方")
- **Purpose:** quarantine unconfirmed reporting.
- **Allowed locations:** developer-edition appendix only, with an explicit non-official label.
- **Must not:** appear in AI User or General body content.

### Callout / note block (`blockquote`)
- **Purpose:** disclaimers, captions, interpretation boxes.
- **Allowed locations:** inline within sections.
- **Must not:** be used to smuggle in a fact that is absent from the KB.

### Warning / accuracy-boundary block (`blockquote`, emphasized)
- **Purpose:** flag accuracy red lines (e.g. "Apple claim vs independently verifiable").
- **Allowed locations:** developer edition, near the relevant claim.
- **Must not:** be softened so the boundary disappears.

### Table (`.table-wrap` + `table`)
- **Purpose:** structured comparison.
- **Allowed locations:** all audiences (density-appropriate).
- **Must not:** drop source or status columns when the rows carry status-sensitive claims.

### Model comparison table
- **Purpose:** compare the five models / deployment.
- **Allowed locations:** dev (full), ai-user (reduced).
- **Must not:** fill undisclosed specs (parameter counts, topology) — leave "undisclosed".

### Code block (`pre` / `code`)
- **Purpose:** code, commands, identifiers.
- **Allowed locations:** dev primarily.
- **Must not:** reproduce restricted Apple/Google source (Invariant 9).

### Diagram figure (`.diagram-figure`, inlined SVG)
- **Purpose:** D-series technical / M-series metaphorical visuals.
- **Allowed locations:** dev (D-series), general (M-series); see `design/diagram-style.md`.
- **Must not:** introduce architecture or trust relationships absent from the KB.

### Cover / title section (`.cover`)
- **Purpose:** title, audience, non-official badge.
- **Allowed locations:** first page of each edition.
- **Must not:** mimic an official Apple/Google cover; must keep the non-official disclaimer.

### Bilingual navigation / language switch (`.topnav`, `.lang`)
- **Purpose:** move between editions and languages.
- **Allowed locations:** Web top nav.
- **Must not:** desync the factual base between languages.

### Audience-specific emphasis block
- **Purpose:** highlight what matters for one audience.
- **Allowed locations:** that audience's draft.
- **Must not:** raise or lower claim strength relative to the KB or the other audiences.

## 11. Diagram Rules

Diagrams have their own detailed spec in `design/diagram-style.md` and `design/diagrams.md`.
Summary of the binding rules:

- **D-series** = technical diagrams (developer edition); **M-series** = metaphorical
  illustrations (general edition). Keep the families distinct.
- Every diagram maps back to KB claims or source-map entries; diagrams introduce no new facts.
- Status-sensitive diagrams preserve status meaning.
- Source labels appear on diagrams where they support a specific claim.
- Traditional Chinese and English diagrams stay structurally identical (labels translated only).
- Audience themes may adjust color and density, but not the factual structure of a diagram.

See `design/diagram-style.md` for the full D/M rules, trust-boundary rules, and maintenance
checklist.

## 12. Source and Status Presentation

### Source IDs

- Source IDs must remain visible when they support important claims.
- Source IDs must not be removed for visual cleanliness.
- Source labels must map back to `sources/source-index.md`.

### Status Labels

- `official`: can be presented as official-source-backed, but **not** automatically
  independently verified.
- `official-beta`: must retain beta / provisional wording.
- `forthcoming`: must be presented as pending or expected, **never** as already published.
- `reported-excluded`: must stay out of AI User and General body content unless project rules
  explicitly allow a boundary note (developer appendix only).

### Status Safety

- Visual emphasis must not make a beta or forthcoming claim look finalized.
- Tables and cards must preserve status labels.
- Translation must preserve status meaning.

## 13. Do / Don't

**Do**

- Keep `[S0X]` codes visible and mapped to `sources/source-index.md`.
- Keep beta / forthcoming / reported-excluded wording intact in both languages.
- Keep D-series technical and M-series metaphorical.
- Keep Traditional Chinese and English layouts structurally aligned.
- Use existing tokens and themes; extend them deliberately and document changes here.

**Don't**

- Don't make the project look like an official Apple/Google/NVIDIA publication.
- Don't hide source or status labels for aesthetics.
- Don't let a visual effect imply a capability the sources do not support.
- Don't introduce a technical fact in CSS, a diagram, or a caption.
- Don't fill undisclosed specifications to make a table look complete.
- Don't let translation strengthen or weaken a claim.

## 14. Agent Rules

For AI agents and contributors making visual changes:

1. Read this file before any CSS, diagram, Web UI, PDF-layout, or bilingual-layout change.
2. Treat `content/knowledge-base.md`, `sources/source-index.md`, and `sources/source-map.md`
   as authoritative; this file never overrides them.
3. Do not add or strengthen a technical claim through visual means.
4. Preserve source labels, status labels, and claim traceability.
5. Keep the two languages semantically aligned; if a counterpart cannot be found, mark
   `TODO: verify`.
6. Run the audit task `tasks/08-design-system-audit.md` for any non-trivial visual change.

The binding agent rule list is consolidated in Section 19 below.

## 15. Apple AI Explainers Series Alignment

### Project identity

- This repo is the **AFM 3** title in the **Apple AI Explainers Series**. The companion title is
  the PCC privacy explainer (`apple-pcc-privacy-explainers`).
- This repo stays **independent**. It is **not** merged with PCC: separate content model, separate
  source boundaries, separate build, separate version history. "Series alignment" means a shared
  *reading system* (PDF + Web), not a shared repository.
- AFM 3's subject positioning is:
  - a **model system** (five models, not one),
  - a **deployment boundary** (on-device / server / Cloud Pro on Google Cloud / PCC),
  - a **source-status** layer (`official` / `official-beta` / `forthcoming` / `reported-excluded`),
  - a **bilingual technical explanation** (Traditional Chinese source-of-record + source-aligned English).
- This repo does **not** copy Apple's official visual identity (see Section 3).

### What "aligned with PCC" means in practice

- Same reading-system vocabulary: source references, status labels, callouts, TOC, reader tools,
  Reading Mode / Audit Mode, language switch.
- Same restraint and non-official tone.
- Same source-bounded, status-honest discipline.
- AFM 3 keeps its own distinctive elements: the five-model system, three audiences, six PDF/Web
  outputs, and the Google Cloud / Gemini / Cloud Pro / PCC misconception boundaries.

### Design goals (this title)

- Unified PDF + Web from one source.
- Bilingual publishing (zh-Hant source-of-record, source-aligned EN).
- Long-form technical readability.
- Source-bounded explanation (every important claim shows its `[S0X]`).
- Status-aware explanation (`official-beta` / `forthcoming` / `reported-excluded` stay visible).
- Claim traceability back to the KB and source map.
- Reading Mode (easier to read) and Audit Mode (easier to check) — see Section 18.
- Agent-safe maintenance (an AI agent can extend the design without weakening the safety layer).
- Aligns with the PCC title's direction without merging repos.
- Not marketed; does not overstate official documentation.

## 16. Design and Knowledge References

The following are referenced for **design, information architecture, knowledge governance, and
agent-workflow** inspiration only. They are **not** endorsements, and they are **not** a source of
copied code. None of their UI/theme code is copied; no GPL/AGPL-covered implementation is imported.
Full attribution and the "use vs. limit" detail live in [`docs/DESIGN_REFERENCES.md`](docs/DESIGN_REFERENCES.md).

1. **`google-labs-code/design.md`** — `DESIGN.md` as a human-readable *and* AI-readable design
   source of truth. *Limit:* do not copy its example visuals; do not claim Google endorsement.
2. **OpenKnowledge / OKB** — agent-native knowledge base, LLM wiki, source/status navigation, claim
   traceability. *Limit:* do not copy OKB code; do not import GPL-covered implementation.
3. **Material for MkDocs** — long-form docs reading, TOC, admonition/callout patterns, Markdown-first
   docs. *Limit:* do not migrate to MkDocs; do not copy theme code.
4. **GOV.UK Design System** — plain language, short paragraphs, low-distraction public-information
   design. *Limit:* do not imitate the GOV.UK brand look.
5. **GitHub Primer** — badge/label/alert/metadata patterns, neutral open-source UI. *Limit:* do not
   copy Primer component code.
6. **U.S. Web Design System (USWDS)** — accessibility, mobile-friendly public-information design,
   typography discipline. *Limit:* do not imitate the USWDS visual brand.

## 17. Status Design Rules

The status axis is authoritative in `content/knowledge-base.md` (the `status:` field). This section
defines only how each status is *presented*. The three provisional/boundary statuses each have a
fixed-hex pill (Section 5) so print stays predictable.

| Status | Meaning | Visual style | Use when | Do NOT use when | 繁中說法 | English | Usable for inference? |
|---|---|---|---|---|---|---|---|
| `official-beta` | Officially published **but** beta-stage; numbers will be revised by the summer technical report | Amber pill (`--status-beta-*`); body text marked "beta 快照 / beta snapshot" | A figure is an official beta-stage evaluation | Treating a beta figure as a final/settled number | `official-beta`（標「beta 快照」） | official beta ("beta snapshot") | Only as a *current beta snapshot*, never as a final result |
| `forthcoming` | Pre-announced by Apple, **not yet published** | Light-blue pill (`--status-forthcoming-*`); worded as pending/expected | Referring to an announced-but-unreleased report or update | Wording it as already available/published | `forthcoming`（官方已預告、尚未發布） | forthcoming (pre-announced, not yet published) | Only as *expected/pending*, never as confirmed availability |
| `reported-excluded` | Third-party reporting Apple has **not** confirmed | Red boundary pill (`--status-boundary-*`); dev-edition appendix only, marked "報導，非官方 / reported, unofficial" | Quarantining unconfirmed reporting in the dev appendix | Anywhere in AI-User/General body; as an official fact | `reported-excluded`（報導，非官方） | reported-excluded ("reported, unofficial") | No — not an Apple-confirmed fact |

Binding boundaries:

```md
`official-beta` must not be treated as final release.
`forthcoming` must not be treated as already available.
`reported-excluded` must not be treated as official Apple confirmation.
```

## 18. Reading Mode / Audit Mode

The Web edition supports two reader modes on a single DOM state. Print/PDF is unaffected and always
renders the Reading-equivalent (base) style — the toggle is a Web-only control and must never appear
in a PDF.

- **DOM state:** a single attribute on the root element — `data-reader-mode="reading"` (default) or
  `data-reader-mode="audit"`. Do not mix class-based and attribute-based state.
- **Reading Mode** — *easier to read.* Highest body contrast; source references kept but quiet;
  status pills kept but not shouting; callouts not all styled like warnings; TOC unobtrusive.
- **Audit Mode** — *easier to check.* Source references and status pills clearly highlighted;
  boundary / misconception / warning callouts more prominent; `official-beta` / `forthcoming` /
  `reported-excluded` easy to scan; footer/source metadata easier to spot. Distinct to the eye but
  not harsh.
- **Persistence:** the choice is stored in `localStorage` (`afm-reader-mode`) and restored on load by
  an early inline script, so the mode survives refresh and avoids a flash of the wrong mode.
- **No-JS default:** Reading Mode (the root ships with `data-reader-mode="reading"`).
- Changing audit-mode rules must keep Reading Mode legible and must not hide any source/status label.

## 19. Agent Rules (binding)

For AI agents and contributors:

```md
- Do not invent claims.
- Do not remove source boundaries.
- Do not weaken status labels.
- Do not imitate Apple's official visual identity.
- Do not copy UI code from referenced projects.
- Do not import GPL-covered code.
- Keep PCC and AFM3 as separate repos.
- English pages must not introduce claims absent from the Traditional Chinese source text.
- Do not simplify Apple × Google Cloud into "Siri AI is Gemini."
- Do not convert `forthcoming` into confirmed availability.
- Do not convert `reported-excluded` into official fact.
- If adding a component, update `design/component-contract.md`.
- If adding tokens, update `DESIGN.md`.
- If changing source/status/callout rendering, update `qa-report.md`.
```

See also `design/readability.md` (readability rules), `design/component-contract.md` (component
contracts), `docs/KNOWLEDGE_GOVERNANCE.md`, `docs/BILINGUAL_GOVERNANCE.md`,
`docs/BILINGUAL_TERMS.md`, and `docs/DESIGN_REFERENCES.md`.
