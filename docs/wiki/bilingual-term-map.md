# Bilingual Term Map

## Purpose

This file keeps Traditional Chinese and English terminology aligned.

It is a navigation and maintenance aid, not a new factual source. Renderings below reflect how
the repo already uses each term (see `docs/GLOSSARY.md` and `content/drafts/`); they are not
newly invented translations. Where the repo has not settled on a stable Traditional Chinese
rendering, the cell is marked `TODO: verify`.

## Rules

- Model names should usually remain in English unless the repo already uses a stable
  Traditional Chinese rendering.
- Technical terms may be translated, but translation must not change claim strength.
- Source IDs and status labels must remain aligned across languages.
- If a term appears in both languages, update both sides together.
- If unsure, mark `TODO: verify`.

## Term Table

| Canonical Term | Traditional Chinese Rendering | English Rendering | Translate? | Notes |
|---|---|---|---|---|
| AFM 3 | AFM 3 | AFM 3 | Usually keep | Project subject; kept in English in both drafts |
| AFM 3 Core | AFM 3 Core | AFM 3 Core | Usually keep | On-device dense model |
| AFM 3 Core Advanced | AFM 3 Core Advanced | AFM 3 Core Advanced | Usually keep | On-device sparse/IFP model |
| AFM 3 Cloud | AFM 3 Cloud | AFM 3 Cloud | Usually keep | Server workhorse on PCC |
| AFM 3 Cloud Pro | AFM 3 Cloud Pro | AFM 3 Cloud Pro | Usually keep | Strongest server model; only one on Google Cloud |
| ADM 3 Cloud (Image) | ADM 3 Cloud（Image） | ADM 3 Cloud (Image) | Usually keep | Image model — note "ADM", not "AFM" |
| PCC | Private Cloud Compute（PCC） | Private Cloud Compute (PCC) | Define once | Spell out once per document, then "PCC" |
| PCC on Google Cloud | PCC on Google Cloud（PCC 擴展到 Google Cloud） | PCC on Google Cloud | Usually keep | Deployment-layer phrase; keep distinct from "built with Google" |
| confidential computing | 機密運算 | confidential computing | Translate with caution | Established zh rendering in glossary/drafts; "support ≠ unrestricted processing" |
| Intel TDX | Intel TDX | Intel TDX | Keep | Glossary: "TDX（Intel Trust Domain Extensions）" |
| NVIDIA CC | NVIDIA Confidential Computing（NVIDIA CC） | NVIDIA Confidential Computing (NVIDIA CC) | Keep | T2 — attribute to NVIDIA |
| Google Titan | Google Titan | Google Titan | Keep | Titanium architecture; hardware root of trust; T2 — attribute to Google Cloud |
| SynthID | SynthID | SynthID | Keep | Google DeepMind tech; attribute the party (KB-034) |
| official-beta | official-beta（標「beta 快照」） | official-beta ("beta snapshot") | Keep status label | Status code stays in English; body marker translated |
| forthcoming | forthcoming（官方已預告、尚未發布） | forthcoming (pre-announced, not yet published) | Keep status label | Status code stays in English; never render as "published" |
| reported-excluded | reported-excluded（報導，非官方） | reported-excluded ("reported, unofficial") | Keep status label | Status code stays in English; dev appendix only |
