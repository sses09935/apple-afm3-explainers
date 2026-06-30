# Audience Route Map

## Purpose

This file explains how one shared factual base is reframed for three audiences and two
languages.

It does not introduce new facts. The "route" columns describe presentation density (from each
KB entry's `audiences:` field), not new claims. Authoritative facts and status remain in
`content/knowledge-base.md`.

## Audience Route Table

| KB Claim Area | Developer Route | AI User Route | General Route | Related Source IDs | Status | Related Diagrams | Bilingual Notes |
|---|---|---|---|---|---|---|---|
| Five-model architecture (KB-001–007) | detail — full lineup, roles, hardware targets, tables | concept/detail — what each model is for | concept — "five helpers", 2 on-device + 3 cloud | S01 | official | D1, M1 | Model names kept in English in both languages |
| On-device sparse architecture (KB-003, KB-014–021) | detail — IFP, NAND→DRAM, experts, elasticity | concept — "loads only what it needs" | omit (KB-016 faq) | S01, S11 | official | D2 | KB-021 is a paper result; do not infer product specs in either language |
| Per-prompt routing (KB-017) | detail — why per-prompt, not per-token | omit | omit | S01 | official | D2 | Developer-only depth; keep dev zh/en aligned |
| PCC upgrade (KB-024, KB-025) | detail — PT-MoE upgrades, 32K + reasoning | concept — bigger/better server brain | omit | S01, S12, S08 | official | TODO: verify | Distinguish 2026 PT-MoE from 2024 TIE (KB-124) in both languages |
| PCC on Google Cloud (KB-036, KB-043–046, KB-051) | detail — extension, requirements, Apple control | detail/concept — where data goes, same guarantees | concept/faq — "locked cloud room" | S01, S02 | official | D3, M3 | "Built with Google" ≠ "running in Google Cloud"; keep distinction in both languages |
| Confidential computing stack (KB-037–040, KB-047–050, KB-055–057) | detail — NVIDIA CC / Intel TDX / Google Titan roles, ledger, attestation | concept — hardware-protected, attested | omit | S02, S13, S14 | official | D3, D4 | Attribute T2 facts to Google Cloud / NVIDIA in both languages |
| Model capability boundaries (KB-013, KB-084, KB-123) | detail/concept — undisclosed specs, Gemini role undisclosed, no reproducible builds | concept — "Apple hasn't published X" | omit | S01, S02, S-PCC2 | official | none | Do not fill undisclosed specs; do not strengthen via translation |
| Availability / access (KB-078–083) | detail — timeline, devices, languages, EU/DMA, China | detail — what you can use, where | faq/concept — short answers | S03, S07 | official | none | Keep region/timeline wording equally precise in both languages |

> Each row's density comes from the KB `audiences:` field. Changing density is allowed; changing
> the underlying claim or its status is not. When a row is updated, check both the Traditional
> Chinese and English drafts (`content/drafts/` and `content/drafts/en/`).
