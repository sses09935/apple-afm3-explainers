# Status Dashboard

## Purpose

This file tracks source maturity and update risk.

It does not introduce new facts.

Authoritative status labels remain in `content/knowledge-base.md`. If this dashboard conflicts
with the KB, the KB wins. Counts below reflect the KB as audited on 2026-06-28 (111 KB
entries); re-derive from the KB after any change.

## Status Summary

| Status | Meaning | Handling Rule | Count | Notes |
|---|---|---|---|---|
| `official` | Officially published and finalized | Present as official-source-backed, not independently verified | 99 | T2 items still need source-party attribution |
| `official-beta` | Officially public but beta-stage; summer technical report will update | Always mark "beta snapshot" / "beta 快照"; never present as finalized | 9 | All from S01 |
| `forthcoming` | Pre-announced, not yet published | Present as pending/expected; never as published | 2 | Reserved codes S15/S16/S17 |
| `reported-excluded` | Reporting, not official | Dev appendix only; out of AI User / General body | 1 | Carries no S-code |

## Official-Beta Items

| KB ID | Claim Area | Source IDs | Audience Impact | English Impact | Required Label | Notes |
|---|---|---|---|---|---|---|
| KB-022 | AFM 3 Core — general text preference | S01 | dev=detail, ai-user=concept, general=omit | en dev/ai-user | "beta snapshot" | 45.6% vs 23.3% |
| KB-023 | AFM 3 Core — image understanding | S01 | dev=detail, ai-user=concept, general=omit | en dev/ai-user | "beta snapshot" | >61% |
| KB-026 | AFM 3 Cloud — general text | S01 | dev=detail, ai-user=concept, general=omit | en dev/ai-user | "beta snapshot" | 64.7% vs 8.7% |
| KB-027 | AFM 3 Cloud — single-sided | S01 | dev=detail, ai-user=concept, general=omit | en dev/ai-user | "beta snapshot" | +36% / +21% |
| KB-028 | AFM 3 Cloud — image understanding | S01 | dev=detail, ai-user=concept, general=omit | en dev/ai-user | "beta snapshot" | 37.8% vs 9.6% |
| KB-041 | AFM 3 Cloud Pro — evaluation | S01 | dev=detail, ai-user=concept, general=omit | en dev/ai-user | "beta snapshot" | +10% / +14% / +14% |
| KB-063 | Evaluation philosophy | S01 | dev=detail, ai-user=concept, general=omit | en dev/ai-user | "beta snapshot" | reflects current dev stage |
| KB-064 | TTS MOS | S01 | dev=detail, ai-user=concept, general=omit | en dev/ai-user | "beta snapshot" | 4.15 / 4.24 (+0.28/+0.42) |
| KB-065 | Dictation preference | S01 | dev=detail, ai-user=concept, general=omit | en dev/ai-user | "beta snapshot" | 44.7% vs 17.6% |

## Forthcoming Items

| KB ID | Claim Area | Expected Source | What Must Not Be Claimed Yet | Update Trigger | Notes |
|---|---|---|---|---|---|
| KB-085 | Updated evaluations / benchmarks | S15 (summer technical report) | Specific updated numbers; any "final" evaluation figure | S15 publication (M6) | Triggers re-calibration of all official-beta items |
| KB-054 | Further PCC-on-GCP technical detail / updated PCC Security Guide | S16, S17 | Specific PCC-on-GCP protection details before they land | S16 / S17 publication | Summer-preview protections roll out over time (KB-052) |

## Reported-Excluded Items

| KB ID | Claim Area | Where Allowed | Where Blocked | Reason | Notes |
|---|---|---|---|---|---|
| KB-012 | Deal value (~US$1B/yr), ~1.2T-parameter custom Gemini | Dev appendix only, labeled "reported, unofficial" | AI User + General body; all AI User / General diagrams | Bloomberg/Gurman reporting, unconfirmed by Apple (Invariant 3/5) | No S-code; Gemini's specific role is undisclosed (KB-013) |

## Technical Report Update Queue

| Future Update Area | Affected KB IDs | Affected Audience Drafts | Affected English Files | Affected Diagrams | Action After Source Lands |
|---|---|---|---|---|---|
| Summer technical report (S15) | KB-022, KB-023, KB-026, KB-027, KB-028, KB-041, KB-063, KB-064, KB-065, KB-085 | `content/drafts/{dev,ai-user}.md` | `content/drafts/en/{dev,ai-user}.md` | none (figures in tables/prose) | Replace beta snapshots with final numbers, change `official-beta`→`official`, drop "beta snapshot" labels, log in `docs/CHANGELOG.md`, bump version |
| Updated PCC Security Guide (S16) | KB-052, KB-054 | `content/drafts/dev.md` | `content/drafts/en/dev.md` | D3, D4 (verify still accurate) | Add PCC-on-GCP protection detail, clear `forthcoming` where landed, log change |
| Confidential Computing Summit talk (S17) | KB-054 | `content/drafts/dev.md` | `content/drafts/en/dev.md` | D3 (verify) | Add cited technical detail, clear `forthcoming` where landed, log change |

> Cross-reference: `docs/CHANGELOG.md` "事實更新追蹤（M6，待 S15）" holds the same triggers as
> the authoritative changelog. This dashboard is a navigation aid only.
