# Task 08 — Design System Audit

## Goal

Verify that AFM3 visual changes follow `DESIGN.md` and do not alter technical meaning.

## Required Reads

- `DESIGN.md`
- `design/base.css`
- `design/theme-dev.css`
- `design/theme-ai-user.css`
- `design/theme-general.css`
- `design/diagram-style.md`
- `design/diagrams.md`
- `build/render.config.json`

## Checklist

- [ ] `DESIGN.md` exists and matches the current CSS / diagram system.
- [ ] CSS changes follow the declared design tokens and audience modes.
- [ ] PDF layout changes preserve source labels, status labels, and claim traceability.
- [ ] Web UI changes do not imitate Apple, Google, or NVIDIA official pages.
- [ ] D-series diagrams remain technical.
- [ ] M-series illustrations remain metaphorical.
- [ ] Visual emphasis does not strengthen technical claims.
- [ ] Source references remain visible and readable.
- [ ] Status labels remain visible where claim maturity matters.
- [ ] Traditional Chinese and English layouts remain semantically aligned.
- [ ] Accessibility and readability remain acceptable.

## Output

Update `qa-report.md` or the relevant release note with design audit findings.
