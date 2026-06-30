# Task 10 — Bilingual Drift Audit

## Goal

Verify that Traditional Chinese and English AFM3 outputs preserve the same factual meaning,
source IDs, and status labels.

## Required Reads

- `docs/wiki/bilingual-term-map.md`
- `docs/wiki/audience-route-map.md`
- `content/knowledge-base.md`
- `content/drafts/` (incl. `content/drafts/en/`)
- `build/render.config.json`
- `sources/source-index.md`
- `sources/source-map.md`
- `qa-report.md`

## Checklist

- [ ] Model names are consistent across languages.
- [ ] Source IDs are preserved across languages.
- [ ] Status labels are preserved across languages.
- [ ] `official-beta` remains visibly beta / provisional in both languages.
- [ ] `forthcoming` remains pending / future-facing in both languages.
- [ ] `reported-excluded` content does not appear in AI User or General body content.
- [ ] English text does not strengthen Traditional Chinese claims.
- [ ] Traditional Chinese text does not strengthen English claims.
- [ ] Diagrams are structurally aligned across languages.
- [ ] Translation choices match `docs/wiki/bilingual-term-map.md`.
- [ ] Unclear counterparts are marked as `TODO: verify`.

## Output

Update `qa-report.md` or the relevant release note with bilingual drift findings.
