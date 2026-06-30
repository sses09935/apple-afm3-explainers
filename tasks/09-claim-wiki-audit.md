# Task 09 — Claim Wiki Audit

## Goal

Verify that `docs/wiki/` remains navigational and does not introduce new facts.

## Required Reads

- `docs/wiki/README.md`
- `docs/wiki/claim-index.md`
- `docs/wiki/source-authority-map.md`
- `docs/wiki/status-dashboard.md`
- `docs/wiki/bilingual-term-map.md`
- `docs/wiki/audience-route-map.md`
- `content/knowledge-base.md`
- `sources/source-index.md`
- `sources/source-map.md`
- `AGENTS.md`
- `CONTRIBUTING.md`

## Checklist

- [ ] Every major wiki claim maps back to `content/knowledge-base.md`.
- [ ] Every source reference maps back to `sources/source-index.md`.
- [ ] Every claim group is compatible with `sources/source-map.md`.
- [ ] Every status-sensitive claim preserves status meaning.
- [ ] Audience routes do not change technical meaning.
- [ ] Trust-boundary warnings match project accuracy red lines.
- [ ] No unsupported Apple, AFM3, PCC, Google Cloud, NVIDIA, Gemini, or privacy claim was added.
- [ ] Ambiguity is marked as `TODO: verify` instead of resolved by guessing.
- [ ] Wiki files are clearly marked as navigational, not authoritative.

## Output

Update `qa-report.md` or the relevant release note with claim wiki audit findings.
