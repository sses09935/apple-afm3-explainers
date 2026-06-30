# Component Contract — AFM 3 Explainers

> The contract for each presentation component: purpose, when to use, when to avoid, PDF/Web support,
> bilingual sharing, PCC-series naming alignment, and whether it is AFM 3-specific. This file governs
> *presentation contracts only*. It introduces no facts and never overrides `content/knowledge-base.md`.
> Visual rules live in `DESIGN.md`; reading-flow rules in `design/readability.md`.

If you add a component, add it here. If you add tokens, update `DESIGN.md`. If you change
source/status/callout rendering, update `qa-report.md`.

## Legend

- **PDF / Web** — which output the component must support.
- **Bilingual** — whether Traditional Chinese and English share the component (they should, unless
  noted).
- **PCC alignment** — naming/semantics to keep consistent with the PCC title for series alignment.
- **AFM 3-specific** — components unique to this title (the five-model system, status axis, etc.).

---

## Source and status

### `.source-ref`
- **Purpose:** the inline `[S0X]` / `[S-PCCX]` citation pill backing a claim.
- **Use:** inline after the claim it supports; on the sources page.
- **Avoid:** removing it for cleanliness; pointing to anything not in `sources/source-index.md`.
- **PDF / Web:** both (Web links to `sources.html#source-*`; PDF is a non-linked pill).
- **Bilingual:** shared. **PCC alignment:** keep the `.source-ref` name/semantics. **AFM 3-specific:** no.
- **Mode behavior:** Reading = quiet pill; Audit = highlighted (filled/bolder) — must stay visible in both.

### `.status-pill`
- **Purpose:** base class for a status-sensitive label rendered from inline `<code>`.
- **Use:** wrapping `official-beta` / `forthcoming` / `reported-excluded` tokens.
- **Avoid:** styling a provisional status so it looks finalized.
- **PDF / Web:** both. **Bilingual:** shared (status code stays English). **PCC alignment:** keep the
  name. **AFM 3-specific:** the status *set* is shared series vocabulary; AFM 3 uses all three.
- **Mode behavior:** Audit = thicker border / easier to scan.

### `.status-official-beta` (rendered as `code.status-beta`)
- **Purpose:** mark an official **beta-stage** figure (amber pill).
- **Use:** next to any beta figure, in every audience that shows it; body keeps "beta 快照 / beta
  snapshot".
- **Avoid:** presenting as a final release number.
- **PDF / Web:** both. **Bilingual:** shared. **AFM 3-specific:** yes (beta evaluation numbers).

### `.status-forthcoming` (rendered as `code.status-forthcoming`)
- **Purpose:** mark pre-announced, not-yet-published material (light-blue pill).
- **Use:** wherever a forthcoming item (report/guide/talk) is named.
- **Avoid:** wording it as already available.
- **PDF / Web:** both. **Bilingual:** shared. **AFM 3-specific:** yes.

### `.status-reported-excluded` (rendered as `code.status-excluded`)
- **Purpose:** mark quarantined third-party reporting (red boundary pill).
- **Use:** developer-edition appendix only, with an explicit "reported, unofficial" label.
- **Avoid:** AI-User / General body content; presenting as official fact.
- **PDF / Web:** both. **Bilingual:** shared. **AFM 3-specific:** yes.

### `.status-legend`
- **Purpose:** a compact legend showing the three status pills and their meaning.
- **Use:** reader-tools panel and/or sources page; a scan key for Audit Mode.
- **Avoid:** restating it as a factual claim; it is a key, not a source.
- **PDF / Web:** Web primarily (the drafts already carry an inline status legend table for PDF).
- **Bilingual:** shared. **AFM 3-specific:** yes (the AFM 3 status set).
- **Mode behavior:** Reading = quiet; Audit = prominent.

---

## Callouts

The callout family renders from Markdown `blockquote`. The renderer adds `.callout` to every
blockquote and a variant class from the leading marker (see `design/readability.md` §5). In Reading
Mode callouts are quiet; in Audit Mode boundary / misconception / warning callouts are prominent.

### `.callout`
- **Purpose:** base note/disclaimer/caption block.
- **Use:** inline within sections. **Avoid:** smuggling in a fact absent from the KB.
- **PDF / Web:** both. **Bilingual:** shared. **PCC alignment:** keep the `.callout*` vocabulary.

### `.callout-note`
- **Purpose:** neutral note (default variant). **Use:** captions, asides, attributions.
- **Avoid:** using for an accuracy red line (use `.callout-boundary`). **PDF / Web:** both.

### `.callout-boundary`
- **Purpose:** an accuracy / source boundary (e.g. "Apple states vs. independently verifiable",
  "not disclosed").
- **Use:** near the relevant claim. **Avoid:** softening it until the boundary disappears.
- **PDF / Web:** both. **AFM 3-specific:** the Gemini / Cloud / verifiability boundaries are AFM 3's.
- **Mode behavior:** Audit = prominent.

### `.callout-warning`
- **Purpose:** a caution / "Note:" the reader must not miss.
- **Use:** time-sensitive or easily-missed conditions (e.g. "summer preview, ramping").
- **Avoid:** over-using so everything looks urgent. **PDF / Web:** both. **Mode:** Audit = prominent.

### `.callout-misconception`
- **Purpose:** name a common misreading and correct it using existing, sourced claims.
- **Use:** at the high-risk boundaries (single-model, Gemini, Cloud Pro/Google Cloud/PCC layers,
  status meanings, path mixing, unpublished report).
- **Avoid:** introducing a *new* rebuttal claim; English must not add one absent from the zh source.
- **PDF / Web:** both. **Bilingual:** shared, semantically aligned. **AFM 3-specific:** yes.
- **Mode behavior:** Audit = prominent (a primary scan target).

### `.callout-summary`
- **Purpose:** a "先講結論 / In short" or section takeaway lead.
- **Use:** at the head of a long section. **Avoid:** adding a claim not already in the section.
- **PDF / Web:** both. **Bilingual:** shared. **AFM 3-specific:** no.

---

## Reader navigation (Web)

### `.reader-route-card`
- **Purpose:** an audience/route entry card guiding a reader to the right edition (Developer /
  AI-User / General) and language.
- **Use:** index / landing context. **Avoid:** desyncing the factual base between routes.
- **PDF / Web:** Web only. **Bilingual:** per-language card set. **PCC alignment:** keep the
  route-card idea. **AFM 3-specific:** the three AFM 3 audiences.

### `.reader-tools`
- **Purpose:** the reader sidebar — mode toggle, status legend, on-page search, TOC.
- **Use:** every Web reader page. **Avoid:** rendering it into a PDF.
- **PDF / Web:** Web only. **Bilingual:** shared (strings localized). **AFM 3-specific:** no.
- **Mode behavior:** Audit = distinct panel treatment.

### `.reader-mode-toggle`
- **Purpose:** the Reading ⇄ Audit control (two-state, segmented).
- **Use:** in `.reader-tools`, all Web reader pages, mobile included.
- **Avoid:** appearing in PDF; using class-based DOM state (use `data-reader-mode`).
- **PDF / Web:** Web only. **Bilingual:** shared (labels localized). **AFM 3-specific:** no
  (series-shared reading system).

### `.language-switcher` (rendered as `.topnav .lang`)
- **Purpose:** switch between the Traditional Chinese and English edition of the same page.
- **Use:** Web top nav. **Avoid:** linking to a different audience or desyncing facts.
- **PDF / Web:** Web only. **Bilingual:** by definition. **AFM 3-specific:** no.

### `.toc` / `.toc-group`
- **Purpose:** on-page table of contents (`.toc`); `.toc-group` groups TOC entries by main line.
- **Use:** reader sidebar. **Avoid:** crowding the body; TOC must not pressure reading.
- **PDF / Web:** Web only (PDF relies on heading hierarchy / page breaks). **Bilingual:** shared.
- **Mode behavior:** Reading = unobtrusive; Audit = slightly emphasized.

---

## Content blocks

### `.table-wrap`
- **Purpose:** responsive wrapper around a `table` (horizontal scroll, sticky first column on Web).
- **Use:** all audiences. **Avoid:** dropping source/status columns when rows carry status-sensitive
  claims.
- **PDF / Web:** both (PDF prints the table; Web adds scroll). **Bilingual:** shared.

### `.diagram-figure`
- **Purpose:** the inlined SVG figure container (D-series technical / M-series metaphorical).
- **Use:** dev (D-series), general (M-series); see `design/diagram-style.md`.
- **Avoid:** introducing architecture/trust relationships absent from the KB.
- **PDF / Web:** both. **Bilingual:** structurally identical, labels translated (`assets/.../en/`).

### `.section-summary`
- **Purpose:** a short per-section summary ("what to take away").
- **Use:** end or head of a long section. **Avoid:** adding a claim. **PDF / Web:** both.
- **AFM 3-specific:** no (readability scaffold).

### `.takeaway-list`
- **Purpose:** a compact list of section takeaways.
- **Use:** after a dense section. **Avoid:** new claims; restate existing sourced points.
- **PDF / Web:** both. **AFM 3-specific:** no.

### `.audience-card`
- **Purpose:** present one audience edition (title, audience, density, PDF link).
- **Use:** index / route context. **Avoid:** raising/lowering claim strength per audience.
- **PDF / Web:** Web (the index renders the live cards). **AFM 3-specific:** the three AFM 3 audiences.

### `.model-card`
- **Purpose:** present one of the five models (name, location, positioning, disclosed specs, hardware).
- **Use:** the five-model overview. **Avoid:** filling undisclosed specs (params, topology) — keep
  "undisclosed"; never imply AFM 3 is a single model.
- **PDF / Web:** both (today rendered as a comparison table; `.model-card` is the card form of the
  same data). **Bilingual:** shared. **AFM 3-specific:** **yes — the defining AFM 3 component.**

---

## Cover and navigation

### `.cover`
- **Purpose:** title/audience/non-official badge + source metadata (`meta`).
- **Use:** first page of each edition. **Avoid:** mimicking an Apple/Google cover; dropping the
  non-official disclaimer. **PDF / Web:** both. **Mode behavior:** Audit = source `meta` easier to spot.

### `.topnav`
- **Purpose:** Web navigation (home, audience editions, sources, language switch).
- **Use:** Web reader pages. **Avoid:** PDF. **PDF / Web:** Web only. **Bilingual:** shared.

### `.doc-footer`
- **Purpose:** per-page footer metadata: version, commit, updated date, license, non-official
  disclaimer, sources link.
- **Use:** every Web reader page and the sources page. **Avoid:** PDF (PDF carries version/commit via
  its own metadata path, not a Web footer button).
- **PDF / Web:** Web. **Bilingual:** shared (strings localized). **Mode behavior:** Audit = metadata
  more legible.
