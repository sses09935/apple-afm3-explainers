# Task 11 — Status Update Audit

## Goal

Verify that status-sensitive claims are handled correctly after source updates, especially when
Apple releases new technical reports or partner documentation changes.

## Required Reads

- `content/knowledge-base.md`
- `sources/source-index.md`
- `sources/source-map.md`
- `docs/wiki/status-dashboard.md`
- `docs/wiki/source-authority-map.md`
- `docs/CHANGELOG.md`
- `qa-report.md`

## Checklist

- [ ] New official sources are added to `sources/source-index.md`.
- [ ] New or changed claims are mapped in `sources/source-map.md`.
- [ ] KB entries are updated before audience drafts.
- [ ] `official-beta` labels are retained unless source evidence supports removal.
- [ ] `forthcoming` labels are retained until the source actually lands.
- [ ] `reported-excluded` items remain blocked from AI User and General body content.
- [ ] All affected Traditional Chinese outputs are checked.
- [ ] All affected English outputs are checked.
- [ ] Affected diagrams are checked.
- [ ] `docs/wiki/status-dashboard.md` is updated as a navigation aid.
- [ ] `docs/CHANGELOG.md` records the change.

## Output

Update `qa-report.md`, `docs/CHANGELOG.md`, or the relevant release note with status update
findings.
