# Apple's Third-Generation Foundation Models & PCC on Google Cloud — AI-User Edition

> **Unofficial, educational explainer.** Not an Apple / Google / NVIDIA publication; not affiliated. "Apple," "Private Cloud Compute," "Apple Intelligence," "Gemini," "Google," "NVIDIA" are trademarks of their owners, used for reference only.
>
> Cites official sources only (Apple; plus partner officials Google / NVIDIA, attributed). Each fact carries `[S0X]`. Benchmarks are an official **beta snapshot**, to be updated by the summer technical report. Baseline date: 2026-06-23.

---

## Intro

If you use ChatGPT, Claude, or Gemini, here's what Apple shipped in June 2026: **the third generation of Apple Foundation Models — a family of five models, custom-built with Google, spanning your device and a privacy cloud called Private Cloud Compute (PCC)** `[S01]`.

We follow three lines: **what it is (five models) → how it works → what it means for you**, then a "where does my data go / what can I trust" checklist.

---

# 1. What it is (five models)

## 1.1 What each model does

Think of five specialized helpers `[S01]`:

- **AFM 3 Core** — the everyday on-device base model `[S01]`.
- **AFM 3 Core Advanced** — the strongest on-device model: sees images, speaks, dictates more accurately, and is frugal — activating only a small slice of itself at a time `[S01]`.
- **AFM 3 Cloud** — the cloud workhorse, fast and efficient `[S01]`.
- **ADM 3 Cloud (Image)** — the cloud "artist" for generating and editing images and Image Playground `[S01]`.
- **AFM 3 Cloud Pro** — the strongest, for the hardest tasks like calling tools and complex reasoning `[S01]`.

| Model | Where | What |
| --- | --- | --- |
| AFM 3 Core | your device | everyday base |
| AFM 3 Core Advanced | your device | strongest on-device; vision, voice, dictation |
| AFM 3 Cloud | secure cloud (PCC) | cloud workhorse |
| ADM 3 Cloud | secure cloud (PCC) | image generation/editing |
| AFM 3 Cloud Pro | Google Cloud (still PCC) | strongest; hardest tasks |

> Source: KB-001–007 `[S01]`. The first four are for Apple silicon; only Cloud Pro runs on NVIDIA GPUs in Google Cloud `[S01]`.

## 1.2 On-device vs. cloud, and what PCC is

Simple requests run **on your device**; heavier ones go to the **cloud**. Apple's cloud is **PCC**, whose key promise is: **your data is never stored or shared with anyone, including Apple** `[S01]`. Why not keep everything on the phone? Traditionally a model's weights must stay in memory the whole time — too big for a phone — hence the device + cloud split `[S01]`.

## 1.3 The Google / Gemini collaboration, in Apple's words

This is the most misread point, so here's the official wording only:

- The five models are "custom-built in collaboration with Google" `[S01]`.
- The developer note: "custom-built in collaboration with Google and its Gemini models" `[S05]`.
- Security: Apple collaborated with Google to "leverage the technologies behind its Gemini family of models" `[S02]`.

**The boundary:** Apple does **not** disclose the form, proportion, or terms of Gemini's involvement `[S01][S02][S05]`. So this is **not** "running Gemini on your phone," and the press's dollar/parameter figures are not official.

> **Common misconceptions, cleared up:**
>
> - "Am I really using Gemini?" — The wording is "built with Google" / "leverage the technologies behind Gemini" `[S01][S02]`; the models carry Apple's names (AFM 3 / ADM 3) and run on Apple-controlled device and PCC `[S01]`. It borrowed technology to build its own.
> - "Is my data sent to train Gemini?" — No: training does **not** use your private data or interactions `[S01]` (§2.6).

> In short: "built with Google" is about how the models were made; "where your data goes / who can see it" is a separate question, answered by PCC's mechanisms (Part 2).

---

# 2. How it works (concepts)

## 2.1 How the models get stronger

- **On device:** the strongest on-device model keeps the whole model in storage and pulls in only the parts it needs, instead of occupying memory `[S01]`; it picks the "experts" each prompt needs `[S01]` — big yet frugal.
- **In the cloud:** the cloud workhorse upgrades last year's architecture for better reasoning and recall over long context `[S01]`; the developer-accessible cloud model has a **32,000-token context window and reasoning** `[S08]`.

## 2.2 How good is it (key figures, beta snapshot)

> Official **beta snapshot**, to be updated this summer.

- On-device general text preferred **45.6%** (prior baseline 23.3%) `[S01]` (beta snapshot).
- Cloud general text preferred **64.7%** (prior 8.7%) `[S01]` (beta snapshot); overall satisfaction up ~**36%** `[S01]` (beta snapshot).
- Cloud Pro improves further over the cloud model (text satisfaction ~+10%, Math ~+14%) `[S01]` (beta snapshot).
- Dictation and voice quality also improved over the prior generation (beta snapshot) `[S01]`.

## 2.3 The image model

The cloud "artist," ADM 3 Cloud, emphasizes control and efficiency and adapts to different ratios/resolutions `[S01]`; it natively generates and edits images and Genmoji and uses small specialized modules for features like Photos' reframing `[S01]`. The images are photorealistic `[S01]`.

## 2.4 Where does my data go? PCC on Google Cloud

The headline: **PCC extended beyond Apple's own data centers for the first time** — with Google and NVIDIA, Apple runs the heaviest Apple Intelligence tasks on Google Cloud while maintaining its privacy protections `[S02]`. The hardest tasks (e.g., letting AI call tools, complex reasoning) go to PCC extended to Google Cloud on NVIDIA GPUs `[S02]`; this is the first time the industry's confidential-computing pieces were combined into one end-to-end private pipeline at global scale `[S02]`. The hardware includes **NVIDIA's confidential-computing GPUs (NVIDIA: Blackwell GPUs support this server-side inference)** `[S02][S14]`, Intel CPUs, and Google's own Titan security chip `[S02]`.

A way to picture the flow: **simple things** finish on your device and never leave it; **harder things** are sent encrypted to PCC. Even when that's a server in a Google data center, Apple says it keeps the **same privacy guarantees** as its own PCC `[S01][S02]`. "Different location" ≠ "weaker protection": what matters is who signs the software and whether it can be verified (next).

## 2.5 Why "someone else's data center" can still be safe

Apple says the **five core requirements are unchanged** `[S02]` — data discarded after use, enforced technically, no one can peek at runtime, no targeting a specific person, and everything publicly verifiable `[S-PCC1]`. The mechanisms (in concept):

- To prevent supply-chain tampering, all hardware is logged in an "append-only, verifiable" ledger `[S02]`.
- Parts that could leak data require **two roots of trust from independent vendors** `[S02]`.
- Full protection ramps up during the summer preview `[S02]`.
- All software is public for inspection and open to research `[S02]`, continuing PCC's "publicly logged, externally verifiable" approach since 2024 `[S-PCC1]`.
- **Erased after use** — since 2024, PCC enforces "discard after use" by randomizing the data volume's keys on every boot so prior data can't be read again (Ephemeral Data Mode) `[S-PCC2]`.
- **Holds up even under attack** — Apple's design goal is that the five requirements are never violated even if attacked, with defense-in-depth across accidental disclosure, external compromise, and physical/internal access `[S-PCC2]`.

Partner officials (attributed): **Google Cloud** says it built a platform meeting Apple's PCC goals, centered on its confidential computing and Titanium/Titan architecture, and co-engineered an open-source host stack to aid external verification `[S13]`; **NVIDIA** says its Blackwell confidential-computing GPUs support this server-side inference, and that "no one, not even the system's builders, can look at your data, chats or conversations" `[S14]`.

A metaphor: PCC is like a **vault room**. There's now also one built inside Google's building — but the **keys, rules, and monitoring are still Apple's**; the landlord (Google) only provides the space and can't open your vault, because your device only trusts software Apple signed `[S02]`.

## 2.6 How it was trained

- **Not trained on your data:** training uses public, licensed/purchased, open-source, dedicated-study, and synthetic data; it does **not** use users' private data or interactions, and respects web-publisher opt-outs `[S01]`.
- A common foundation first, then specialization into voice, vision, long-context reasoning, and image generation; then supervised fine-tuning and multi-stage reinforcement learning `[S01]`.
- Quantization Aware Training shrinks models while keeping accuracy `[S01]`.

---

# 3. What it means for you (privacy, capability, access)

## 3.1 Done responsibly

Four principles: empower users, represent users, design with care, protect privacy `[S01]`. In practice: a sensitive-content taxonomy, multilingual safety alignment, language-specific guardrail models, and native-speaker human red teaming across supported locales `[S01]` — so safety isn't English-only.

## 3.2 AI-generated/edited images are marked: SynthID (attributed: Google)

Any image **generated or edited** with Apple Intelligence automatically gets a hidden watermark, **SynthID**, marking it as AI-touched `[S04]`. **SynthID is Google DeepMind's AI content watermarking and identification technology** `[S04][S18]`. Image Playground creations carry it too `[S04]`.

This matters for spotting AI imagery: a compatible tool can detect SynthID, signaling "AI was involved" `[S04]`. Note it's an **invisible** mark, not a visible watermark `[S04]`.

**Daily limits:** image generation and other server-heavy features have daily caps; most iCloud+ plans raise them `[S03]`.

## 3.3 New features (overview)

- **A new Siri** — understands your context, finds things across messages/emails/photos, completes tasks across apps, answers about your screen; a dedicated app privately syncs history via iCloud `[S03][S06]`.
- **Photos** — reframe composition after the shot, extend, clean up; AI-edited images carry SynthID `[S03][S04]`.
- Smarter Safari, Messages, Mail, and Image Playground `[S03][S04]`.

## 3.4 The developer layer (briefly)

Even if you don't code: developers can use one API to reach Claude, Gemini, or others `[S05]`; eligible small developers can even use PCC models at no cloud cost `[S05]`. For you, that means more apps with built-in AI whose on-device or PCC parts share the same privacy boundary (Part 2).

## 3.5 Can I use it, and where?

- **Timing:** developer testing today, public beta next month, free update this fall `[S03]`.
- **Languages (16):** including Traditional Chinese, Simplified Chinese, Japanese, Korean, English, French, German, Italian, Spanish, Portuguese, Dutch, Danish, Norwegian, Swedish, Turkish, Vietnamese `[S03]`.
- **Devices:** newer iPhone/iPad/Mac, Apple Vision Pro, newer Apple Watch (paired with an Apple Intelligence-enabled iPhone), etc. `[S03]`.
- **New Siri:** an English beta later this year, expanding to more languages `[S03]`.
- **Regions:** in the EU, Siri AI isn't initially on iPhone/iPad/Watch (the DMA), though Mac and Vision Pro can `[S03][S07]`; in China it waits on regulatory work `[S03]`.

## 3.6 Wrap-up

Some things are **undisclosed** (exact parameter counts, internal structure) — we don't guess `[S01]`. Apple has pre-announced a **summer technical report** updating the figures `[S01]`, so the beta numbers here will be revised. And PCC isn't new in 2026 — it extended device-grade privacy to the cloud back in 2024 `[S-PCC1]`, with "data discarded after use" as a core idea `[S-PCC1]`.

---

## ★ Checklist: where does my data go / what can I trust

Self-check against the official statements (references in brackets):

- [ ] **On-device requests stay on device** — simple requests run locally `[S01]`.
- [ ] **Cloud requests use PCC, not stored or shared (incl. Apple)** — `[S01]`; discarded after use `[S-PCC1]`.
- [ ] **Five core requirements** — discard-after-use, technically enforced, no peeking, not targetable, verifiable `[S02]` (definitions `[S-PCC1]`).
- [ ] **Supply chain: append-only ledger** `[S02]`.
- [ ] **Two independent roots of trust** `[S02]`.
- [ ] **Apple still controls the software** — devices trust only Apple-approved software `[S02]`.
- [ ] **Not trained on my data** `[S01]`.
- [ ] **Publicly verifiable** — software public, research open `[S02]`; continuing 2024's public logging and research environment `[S-PCC1]`.
- [ ] **Apple pays big bounties for outside scrutiny** — PCC bounties go up to US$1,000,000 (remote arbitrary code execution) `[S-PCC1]`, a signal of "enforced by technology, open to scrutiny."

> Accuracy note: what's independently verifiable is "your device connects only to nodes whose software is publicly logged." Apple does **not** provide reproducible builds; published source is an analysis aid only `[S-PCC2]`. So rigorously it's "Apple states + verifiable connection to logged software," not a "bit-for-bit source comparison."

---

> For full technical detail (IFP, PT-MoE, confidential-computing stack, attestation/ledger) see the **Developer Edition**; for the lightest illustrated FAQ, see the **General Edition**.
