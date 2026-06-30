# Claim Index

## Purpose

This file is a navigation layer for maintainers and AI agents.

It does not introduce new facts.

Authoritative factual sources remain:

- `content/knowledge-base.md`
- `sources/source-index.md`
- `sources/source-map.md`

## How to Use This File

- Start from a claim group below to find the backing KB IDs, source codes, status, diagrams,
  and which audiences/languages carry it.
- Then open `content/knowledge-base.md` for the exact wording and `status:` — that is
  authoritative; this index is only a map.
- "Source IDs" and "Status" here echo the KB / source-map; if they ever disagree, the KB and
  source-map win. Where a precise mapping cannot be confirmed from repo files, it is marked
  `TODO: verify` rather than guessed.
- Language coverage is given at the file level: Traditional Chinese drafts under
  `content/drafts/`, English drafts under `content/drafts/en/`. Exact in-draft section anchors
  are not tracked here (marked `TODO: verify` where precision matters).

## Claim Groups

### AFM3-CLAIM-001: AFM 3 project scope (five-model family)

- Claim summary: AFM 3 is a family of five foundation models, custom-built in collaboration
  with Google, spanning on-device and Private Cloud Compute.
- Source IDs: S01
- Status: official
- Knowledge base location: `content/knowledge-base.md` §1 → KB-001
- Source map location: `sources/source-map.md` → KB-001
- Audience usage:
  - Developer: detail
  - AI User: detail
  - General: concept
- Language coverage:
  - Traditional Chinese: `content/drafts/{dev,ai-user,general}.md`
  - English: `content/drafts/en/{dev,ai-user,general}.md`
- Related diagrams: D1 (model routing), M1 (five helpers)
- Accuracy risk: do not present AFM 3 as Gemini or as a Google model; "built with Google" is
  the model layer, not the deployment layer.
- Notes: —

### AFM3-CLAIM-002: Five-model lineup and roles

- Claim summary: AFM 3 Core, AFM 3 Core Advanced (on-device); AFM 3 Cloud, ADM 3 Cloud (Image),
  AFM 3 Cloud Pro (PCC) — each with a defined role; hardware targets per KB-007.
- Source IDs: S01
- Status: official
- Knowledge base location: `content/knowledge-base.md` §1 → KB-002–007
- Source map location: `sources/source-map.md` → KB-002–007
- Audience usage:
  - Developer: detail
  - AI User: concept (Cloud Pro general=faq)
  - General: concept / faq
- Language coverage:
  - Traditional Chinese: `content/drafts/{dev,ai-user,general}.md`
  - English: `content/drafts/en/{dev,ai-user,general}.md`
- Related diagrams: D1 (model routing), M1 (five helpers)
- Accuracy risk: only AFM 3 Cloud Pro is extended to Google Cloud NVIDIA GPUs; the other four
  are purpose-built for Apple silicon. Do not fill undisclosed specs (KB-084).
- Notes: model names stay in English in both languages (see `bilingual-term-map.md`).

### AFM3-CLAIM-003: On-device vs cloud model split

- Claim summary: two on-device models vs three server models on PCC; PCC used when on-device is
  insufficient; server models do not store or share user data (KB-008).
- Source IDs: S01
- Status: official
- Knowledge base location: `content/knowledge-base.md` §1 → KB-001, KB-007, KB-008
- Source map location: `sources/source-map.md` → KB-001, KB-007, KB-008
- Audience usage:
  - Developer: detail
  - AI User: detail (privacy boundary)
  - General: concept / faq
- Language coverage:
  - Traditional Chinese: `content/drafts/{dev,ai-user,general}.md`
  - English: `content/drafts/en/{dev,ai-user,general}.md`
- Related diagrams: D1, M1, M2 (device vs cloud)
- Accuracy risk: do not overstate the privacy boundary into "no cloud processing happens";
  state the KB-008 wording (not stored or shared, including with Apple).
- Notes: PCC mechanism detail lives in CLAIM-007 / CLAIM-008.

### AFM3-CLAIM-004: On-device sparse architecture (IFP)

- Claim summary: AFM 3 Core Advanced uses an IFP-based sparsely activated architecture; full
  weights stored in NAND, selective DRAM loading; shared + routed experts; inference-time
  elasticity.
- Source IDs: S01, S11
- Status: official
- Knowledge base location: `content/knowledge-base.md` §3 → KB-014–021 (architecture: KB-003)
- Source map location: `sources/source-map.md` → KB-014–021
- Audience usage:
  - Developer: detail
  - AI User: concept (most items general=omit)
  - General: omit / faq (KB-016 general=faq)
- Language coverage:
  - Traditional Chinese: `content/drafts/{dev,ai-user,general}.md`
  - English: `content/drafts/en/{dev,ai-user,general}.md`
- Related diagrams: D2 (IFP NAND→DRAM)
- Accuracy risk: KB-021 is a paper result; do not reverse-engineer AFM 3 Core Advanced's
  internal config from it. Undisclosed config stays undisclosed (KB-084).
- Notes: —

### AFM3-CLAIM-005: Per-prompt routing

- Claim summary: because NAND→DRAM bandwidth is too slow for token-by-token MoE swapping,
  routing is done per-prompt (fixed experts chosen at start, periodically re-selected).
- Source IDs: S01
- Status: official
- Knowledge base location: `content/knowledge-base.md` §3 → KB-017
- Source map location: `sources/source-map.md` → KB-017
- Audience usage:
  - Developer: detail
  - AI User: omit
  - General: omit
- Language coverage:
  - Traditional Chinese: `content/drafts/dev.md`
  - English: `content/drafts/en/dev.md`
- Related diagrams: D2 (IFP NAND→DRAM)
- Accuracy risk: do not describe it as standard token-level MoE routing.
- Notes: developer-only depth.

### AFM3-CLAIM-006: PCC upgrade (PT-MoE, AFM 3 Cloud)

- Claim summary: AFM 3 Cloud builds key upgrades on the 2025 PT-MoE architecture; developer PCC
  model has 32K context + reasoning (KB-025).
- Source IDs: S01, S12, S08
- Status: official
- Knowledge base location: `content/knowledge-base.md` §5 → KB-024, KB-025
- Source map location: `sources/source-map.md` → KB-024, KB-025
- Audience usage:
  - Developer: detail
  - AI User: concept
  - General: omit
- Language coverage:
  - Traditional Chinese: `content/drafts/{dev,ai-user}.md`
  - English: `content/drafts/en/{dev,ai-user}.md`
- Related diagrams: TODO: verify (no dedicated D-series figure listed in `design/diagrams.md`)
- Accuracy risk: 2026 PT-MoE is distinct from the 2024-generation TIE/AFM-server (KB-124) — do
  not conflate.
- Notes: —

### AFM3-CLAIM-007: PCC on Google Cloud (extension)

- Claim summary: for AFM 3 Cloud Pro, Apple extended PCC to NVIDIA GPUs in Google Cloud with
  Google and NVIDIA, maintaining the same privacy guarantees; first extension beyond Apple's
  own data centers (KB-043).
- Source IDs: S01, S02
- Status: official
- Knowledge base location: `content/knowledge-base.md` §7–8 → KB-036, KB-043–046, KB-051
- Source map location: `sources/source-map.md` → KB-036, KB-043–046, KB-051
- Audience usage:
  - Developer: detail
  - AI User: detail / concept
  - General: concept / faq
- Language coverage:
  - Traditional Chinese: `content/drafts/{dev,ai-user,general}.md`
  - English: `content/drafts/en/{dev,ai-user,general}.md`
- Related diagrams: D3 (PCC-on-GCP stack), M3 (locked cloud room)
- Accuracy risk: do not imply Google can freely process PCC user data; Apple retains full
  control of PCC software (KB-051), and the five PCC requirements still hold (KB-046).
- Notes: 2024-generation PCC foundations are in `content/knowledge-base.md` §17–18 (KB-101+).

### AFM3-CLAIM-008: Confidential computing stack

- Claim summary: PCC-on-Google-Cloud confidential inference rests on NVIDIA Confidential
  Computing (NVIDIA GPUs), Intel CPUs with TDX, and Google's Titan chip; trusted computing
  base, append-only ledger, dual independent roots of trust.
- Source IDs: S02, S13, S14
- Status: official
- Knowledge base location: `content/knowledge-base.md` §7–9 → KB-037–040, KB-047–050, KB-055–057
- Source map location: `sources/source-map.md` → KB-037–040, KB-047–050, KB-055–057
- Audience usage:
  - Developer: detail
  - AI User: concept (several items general=omit)
  - General: omit
- Language coverage:
  - Traditional Chinese: `content/drafts/{dev,ai-user}.md`
  - English: `content/drafts/en/{dev,ai-user}.md`
- Related diagrams: D3 (PCC-on-GCP stack), D4 (attestation ledger)
- Accuracy risk: attribute T2 facts to Google Cloud / NVIDIA (Invariant 4); confidential
  computing support ≠ unrestricted third-party processing.
- Notes: —

### AFM3-CLAIM-009: NVIDIA confidential computing

- Claim summary: NVIDIA Blackwell GPUs with Confidential Computing carry server-side inference
  and data-in-use protection, integrated into PCC, running on Google Cloud; NVIDIA-stated
  capabilities (KB-126).
- Source IDs: S02, S13, S14
- Status: official
- Knowledge base location: `content/knowledge-base.md` §7, §9, §19 → KB-038, KB-057, KB-126
- Source map location: `sources/source-map.md` → KB-038, KB-057, KB-126
- Audience usage:
  - Developer: detail
  - AI User: concept
  - General: omit
- Language coverage:
  - Traditional Chinese: `content/drafts/{dev,ai-user}.md`
  - English: `content/drafts/en/{dev,ai-user}.md`
- Related diagrams: D3 (PCC-on-GCP stack)
- Accuracy risk: T2 fact — must be attributed to NVIDIA, not presented as Apple's statement.
- Notes: —

### AFM3-CLAIM-010: Intel TDX role

- Claim summary: Intel CPUs with TDX provide CPU-side confidential VM / trusted execution; the
  model is not stated to run primarily on the CPU; TDX + NVIDIA CC together protect the
  CPU-to-GPU path.
- Source IDs: S02, S13
- Status: official
- Knowledge base location: `content/knowledge-base.md` §7 → KB-039
- Source map location: `sources/source-map.md` → KB-039
- Audience usage:
  - Developer: detail
  - AI User: omit
  - General: omit
- Language coverage:
  - Traditional Chinese: `content/drafts/dev.md`
  - English: `content/drafts/en/dev.md`
- Related diagrams: D3 (PCC-on-GCP stack)
- Accuracy risk: do not overstate Intel TDX's role beyond the source (KB-039 explicitly limits
  it).
- Notes: —

### AFM3-CLAIM-011: Google Titan role

- Claim summary: Google Titan chip (Titanium architecture) provides a hardware root of trust
  ensuring boot-flow and platform integrity.
- Source IDs: S02, S13
- Status: official
- Knowledge base location: `content/knowledge-base.md` §7, §9 → KB-040, KB-055
- Source map location: `sources/source-map.md` → KB-040, KB-055
- Audience usage:
  - Developer: detail
  - AI User: omit / concept
  - General: omit
- Language coverage:
  - Traditional Chinese: `content/drafts/dev.md`
  - English: `content/drafts/en/dev.md`
- Related diagrams: D3 (PCC-on-GCP stack)
- Accuracy risk: Titan is one root of trust; the GCP extension uses dual independent roots
  (KB-049). Attribute to Google Cloud where T2.
- Notes: —

### AFM3-CLAIM-012: official-beta evaluation items

- Claim summary: beta-stage evaluation figures (Core, Cloud, Cloud Pro, TTS MOS, dictation,
  evaluation philosophy) — to be updated by the summer technical report.
- Source IDs: S01
- Status: official-beta
- Knowledge base location: `content/knowledge-base.md` §4, §5, §7, §12 → KB-022, KB-023,
  KB-026, KB-027, KB-028, KB-041, KB-063, KB-064, KB-065
- Source map location: `sources/source-map.md` → same IDs (status `official-beta`)
- Audience usage:
  - Developer: detail (full numbers, "beta snapshot")
  - AI User: concept (selected numbers, marked beta)
  - General: omit (numbers omitted by design)
- Language coverage:
  - Traditional Chinese: `content/drafts/{dev,ai-user}.md`
  - English: `content/drafts/en/{dev,ai-user}.md`
- Related diagrams: TODO: verify (no dedicated diagram; numbers presented in tables/prose)
- Accuracy risk: every beta figure must carry "beta snapshot" / "beta 快照"; never present as
  finalized. See `status-dashboard.md`.
- Notes: M6 milestone updates these when S15 lands (`docs/CHANGELOG.md`).

### AFM3-CLAIM-013: forthcoming technical report and PCC documents

- Claim summary: Apple pre-announced a technical report later this summer (updated evals);
  PCC-on-GCP full protections roll out during summer preview; further PCC technical detail
  forthcoming.
- Source IDs: S01 (forward-references S15); S02 (forward-references S16/S17)
- Status: forthcoming
- Knowledge base location: `content/knowledge-base.md` §8, §16 → KB-052, KB-054, KB-085
- Source map location: `sources/source-map.md` → KB-052 (official), KB-054 (forthcoming),
  KB-085 (forthcoming)
- Audience usage:
  - Developer: detail
  - AI User: concept / omit
  - General: omit
- Language coverage:
  - Traditional Chinese: `content/drafts/{dev,ai-user}.md`
  - English: `content/drafts/en/{dev,ai-user}.md`
- Related diagrams: none
- Accuracy risk: present as pending/expected, never as already published. S15/S16/S17 are
  reserved codes in `sources/source-index.md` (status `forthcoming`).
- Notes: M6 trigger; see `status-dashboard.md` Technical Report Update Queue.

### AFM3-CLAIM-014: reported-excluded boundary

- Claim summary: deal value (~US$1B/yr) and ~1.2T-parameter custom-Gemini figures are
  Bloomberg/Gurman reporting, unconfirmed by Apple.
- Source IDs: none (reported, not official — carries no S-code by design)
- Status: reported-excluded
- Knowledge base location: `content/knowledge-base.md` §2 → KB-012
- Source map location: `sources/source-map.md` → KB-012 ("（報導，非官方）")
- Audience usage:
  - Developer: appendix-only (labeled "reported, unofficial")
  - AI User: omit
  - General: omit
- Language coverage:
  - Traditional Chinese: `content/drafts/dev.md` (Appendix A)
  - English: `content/drafts/en/dev.md` (Appendix A)
- Related diagrams: none (must not appear in any AI User / General diagram)
- Accuracy risk: must not enter AI User or General body content; must not be presented as
  fact. Gemini's specific role/ratio is undisclosed (KB-013).
- Notes: the `check-sources.mjs` anti-drift check enforces reported-excluded exclusion from
  ai-user/general body (both languages).
