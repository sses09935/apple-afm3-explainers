# Source Authority Map

## Purpose

This file explains how source authority is interpreted in this repository.

It is a maintenance aid, not a new source of facts.

## Authority Boundary

Authoritative source definitions remain in:

- `sources/source-index.md`
- `sources/source-map.md`

If this file conflicts with them, the source files win.

## Authority Layers

### Apple Official Sources

- Meaning: T1 — Apple's own publications (ML Research, Security, Newsroom, Developer). The
  primary factual authority for AFM 3 and PCC claims.
- Can support: Apple's stated architecture, model lineup, PCC design and guarantees,
  availability, developer frameworks, and Apple's own characterization of the Google/NVIDIA
  collaboration.
- Cannot support: claims of *independent verification* of Apple's statements; undisclosed
  internals Apple has not published (KB-084); partner-internal details Apple does not state.
- Examples from `sources/source-index.md`: S01 (ML Research, primary), S02 (Security —
  Expanding PCC), S03–S07 (Newsroom), S08–S10 (Developer), S11–S12 (ML Research papers),
  S-PCC1/S-PCC2 (2024 PCC foundations).
- Notes: "official" status means official-source-backed, not independently verified. The
  no-reproducible-builds red line (KB-123) is the canonical reminder that Apple-claimed ≠
  independently provable.

### Partner Official Sources

- Meaning: T2 — official publications from collaborators (Google Cloud, NVIDIA, and Google
  DeepMind for SynthID attribution). Used only for the partner's own statements about the
  confidential-computing stack or attributed technology.
- Can support: partner-stated hardware/security roles (NVIDIA CC, Intel TDX via Google Cloud,
  Google Titan), the open-source host stack, NVIDIA CC capabilities, SynthID provenance.
- Cannot support: presenting partner statements as Apple's official position; any claim that
  Google can freely process user data; stronger trust relationships than the partner states.
- Examples from `sources/source-index.md`: S13 (Google Cloud — Confidential AI), S14 (NVIDIA —
  Confidential Computing for PCC), S18 (Google DeepMind — SynthID).
- Notes: every T2 fact must name the source party in text (Invariant 4). See KB-038–040,
  KB-055–057, KB-125–126, KB-034.

### Forthcoming Sources

- Meaning: officially pre-announced sources that are not yet published; reserved S-codes held
  for them.
- Can support: the *existence and expectation* of a future document — nothing in its content
  yet.
- Cannot support: any specific technical detail "from" the document before it lands; do not
  cite forthcoming content as established.
- Required wording: present as pending / expected / pre-announced; never as already published.
- Examples from `sources/source-index.md`: S15 (third-gen AFM technical report — summer),
  S16 (updated PCC Security Guide — later this year), S17 (Confidential Computing Summit talk).
- Notes: when one lands, follow `tasks/11-status-update-audit.md` and update the KB before the
  drafts. See KB-054, KB-085 (status `forthcoming`).

### Reported-Excluded Items

- Meaning: third-party reporting / interpretation that Apple has not confirmed; explicitly not
  a factual source (Invariant 3).
- Where allowed: developer-edition appendix only, labeled "reported, unofficial".
- Where not allowed: AI User and General body content; any diagram in those editions; never
  presented as fact in any edition.
- Required caution: mark clearly as reported and unconfirmed; do not attach an S-code.
- Notes: KB-012 (deal value / ~1.2T-parameter custom Gemini); the exclusion list at the bottom
  of `sources/source-index.md`. Enforced by `check-sources.mjs`.

## Common Misreadings

| Misreading | Safer Interpretation | Source / KB Reference |
|---|---|---|
| AFM 3 is Gemini | AFM 3 is Apple's own five-model family, custom-built *in collaboration with* Google; the specific form, ratio, and terms of Gemini's involvement are undisclosed. | KB-001, KB-009–011, KB-013; S01/S02/S05 |
| Google can freely process PCC user data | PCC on Google Cloud maintains the same privacy guarantees; Apple retains full control of PCC software, and the five core requirements (incl. no-privileged-runtime-access) are unchanged. | KB-043, KB-046, KB-051; S02 |
| official-beta means final | Evaluation figures are beta-stage snapshots to be updated by the forthcoming summer technical report; not finalized. | KB-085, KB-022–028/041/063–065; status legend in KB header; S01 (→ S15) |
| forthcoming technical report already confirms details | The report is pre-announced and not yet published; no specific detail can be cited from it yet. | KB-085, KB-054; S15/S16/S17 (status `forthcoming`) |
