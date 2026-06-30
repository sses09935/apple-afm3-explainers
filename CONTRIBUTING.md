# Contributing to apple-afm3-explainers

Thanks for helping maintain the AFM3 explainers. This project is an **unofficial, educational**
bilingual explainer with a deliberately strict separation between facts, sources, status, and
presentation.

Before contributing, read:

- `AGENTS.md` — the 10 invariants (violation = build/QA failure) plus the maintenance-layer
  governance rules.
- `DESIGN.md` — the visual system (for any visual change).
- `docs/PLAN.md` — the overall plan.

Authoritative facts always live in `content/knowledge-base.md`; source authority lives in
`sources/source-index.md` and `sources/source-map.md`. Nothing in `DESIGN.md`, `docs/wiki/`, or
the drafts may override them.

## Design and diagram changes

Before changing CSS, diagrams, PDF layout, Web UI, or bilingual layout:

1. Read `DESIGN.md`.
2. Read `design/diagram-style.md` if the change touches diagrams.
3. Confirm that visual changes do not alter technical meaning.
4. Confirm that D-series diagrams remain technical and M-series illustrations remain metaphorical.
5. Confirm that source labels, status labels, and claim traceability remain intact.
6. Confirm that Traditional Chinese and English outputs remain semantically aligned.

## Wiki layer changes

Files under `docs/wiki/` are navigation aids.

When editing them:

1. Do not introduce new technical facts.
2. Link claims back to `content/knowledge-base.md`.
3. Link source authority back to `sources/source-index.md` and `sources/source-map.md`.
4. Preserve `status:` meaning.
5. Mark uncertainty as `TODO: verify` rather than guessing.

## Bilingual changes

When editing Traditional Chinese or English content:

1. Identify the counterpart language section or file.
2. Preserve source IDs.
3. Preserve status labels.
4. Preserve claim strength.
5. Do not make the English version more speculative or more definitive than the Traditional Chinese version.
6. Do not make the Traditional Chinese version more speculative or more definitive than the English version.
7. If the counterpart cannot be found, mark `TODO: verify`.

## Status-sensitive changes

When editing claims marked `official-beta`, `forthcoming`, or `reported-excluded`:

1. Do not remove status qualifiers.
2. Do not present beta information as final.
3. Do not present forthcoming information as already published.
4. Do not move `reported-excluded` content into AI User or General body content.
5. Update `docs/wiki/status-dashboard.md` only as a navigation aid.

## Before opening a PR

Run the checks that exist in this repo (see `package.json`):

```
npm run check         # anti-drift source check
npm run check:links   # internal link / asset existence
```

For substantial visual, wiki, bilingual, or status changes, also run the relevant audit task in
`tasks/` (08 design, 09 claim-wiki, 10 bilingual-drift, 11 status-update) and record findings in
`qa-report.md`.
