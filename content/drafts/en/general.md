# Apple's New AI: What It Means for You — General Edition

> **Unofficial, educational explainer.** Not an Apple / Google / NVIDIA publication; not affiliated. "Apple," "Private Cloud Compute," "Gemini," "Google," "NVIDIA" are trademarks of their owners, used for reference only.
>
> Every statement comes from official material (source codes `[S0X]`; see the repo's `sources/`). Baseline date: 2026-06-23.

---

## In one line

In June 2026, Apple introduced a new generation of AI: **five "brains" — some living on your device, some in a very secure cloud — built in collaboration with Google** `[S01]`.

This explainer uses plain language to answer three things: **what it is → how it works → what it means for you.**

---

# 1. What it is (five models)

## Five specialized helpers

Think of this AI as five helpers, each with a specialty `[S01]`:

- **Two live on your device** — one a base model, one stronger that also sees images and speaks `[S01]`.
- **Three are in the cloud** — a cloud workhorse, an image maker, and the strongest one for the hardest tasks `[S01]`.

The strongest cloud helper is built by Apple with Google and NVIDIA and runs in Google's cloud `[S01][S02]`.

![Figure M1 — five specialized helpers](assets/illustrations/en/M1-five-helpers.svg)

## On your phone vs. in the cloud

Simple things your phone does itself; harder, heavier things go to the cloud `[S01]`. The model usually sits "in your phone's storage" and is pulled in only when needed, so it doesn't fill up your phone `[S01]`. When something goes to the cloud, Apple's promise is: **your content is not saved and not shared with anyone — not even Apple** `[S01]`.

![Figure M2 — on your phone vs. in the cloud](assets/illustrations/en/M2-device-vs-cloud.svg)

## What's the Google collaboration?

Apple says the five models are "custom-built in collaboration with Google" `[S01]`, using Google's Gemini technology `[S02]`. But that does **not** mean you're using Gemini — Apple hasn't published the details, so the dollar figures and specs floating around aren't official and aren't used here.

Think of it this way: Apple borrowed some of Google's "manufacturing technology" to build its own brand of car; you're still driving Apple's car, with Apple's name (AFM 3), under Apple's control `[S01]`. And **your content isn't used to train it** `[S01]` — "built with Google" is about how the car was made, separate from where your data goes (next section).

> **Common misconception:**
>
> - Apple's new AI is **not one model** but **five**, each with a job (two on your device, three in the cloud) `[S01]`.
> - "Built with Google" does **not** mean "you're using Gemini," nor that "all five run in Google's data center" — only the strongest one runs in Google's cloud `[S01][S02]`.
> - Details Apple hasn't published (like exact specs) aren't settled until officially released; the figures circulating in the press aren't official.

---

# 2. How it works (with metaphors)

## Why do some things go to the cloud?

The hardest tasks (like letting AI complete a complex job step by step) need lots of computing power a phone can't provide, so they go to the cloud `[S02]`. The key point: Apple took its "very secure cloud room" and, **for the first time, built part of it inside Google's building** `[S02]`, but the protection standard is unchanged `[S02]`.

A metaphor: it's like storing valuables in a vault. The vault used to sit in Apple's own building; now one sits in Google's — but **the keys, the rules, and the monitoring are still Apple's**. The landlord (Google) only provides the space and can't open your vault. So "a different location" doesn't mean "less safe."

## Why can someone else's data center still be safe?

![Figure M3 — a locked cloud room no one can peek into](assets/illustrations/en/M3-locked-cloud-room.svg)

Even though the building is Google's, Apple's guarantees are roughly these `[S02]`:

- **Discarded after use** — your data is used only to answer this one request, then not kept `[S-PCC1]`.
- **No one can peek** — not even operators can see your content while it runs `[S-PCC1]`.
- **Apple is still in charge** — wherever the building is, the software is controlled by Apple, and your device only trusts software Apple approves `[S02]`.
- **Out in the open** — the software is published for outside inspection `[S02]`, and since 2024 Apple has publicly logged every version so it can be verified `[S-PCC1]`.
- **"Discarded after use" isn't new in 2026** — PCC has extended device-grade privacy to the cloud since 2024 `[S-PCC1]`.
- **Rules aren't just slogans** — Apple builds these protections into the technology, not just policy `[S-PCC1]`.

## How did it learn?

Apple says training uses public, licensed, and open-source data, and **does not use your private content** `[S01]`; the whole process follows Responsible-AI principles `[S01]` with careful safety work `[S01]`.

---

# 3. What it means for you

## Can you tell an AI image? SynthID (Google's technology)

![Figure M4 — the invisible watermark](assets/illustrations/en/M4-synthid-watermark.svg)

Any image **generated or edited** with Apple Intelligence is automatically given an **invisible watermark** called **SynthID**, marking it "made/changed by AI" `[S04]`. SynthID is **Google DeepMind's** technology `[S04][S18]`. Images you make in the new Image Playground carry it too `[S04]`. The image features can produce many styles, very realistic `[S01]`.

**How many a day?** Server-heavy features like image generation have daily limits; iCloud+ subscribers usually get more `[S03]`.

## What's new?

- **A brand-new Siri** — understands you better, finds things across messages, emails, and photos, and completes tasks across apps `[S03][S06]`.
- **Photos** — improve composition after the shot, remove clutter, and more `[S03][S04]`.
- Safari, Messages, Mail, and image creation all get smarter `[S03][S04]`.

## Can I use it? Where?

- **When?** New features arrive this fall as a **free update** `[S03]`.
- **Does it support my language?** Yes — including **Traditional Chinese** (16 languages total) `[S03]`.
- **Which devices?** Newer iPhone, iPad, and Mac, plus Apple Vision Pro and newer Apple Watch `[S03]`.
- **When's the new Siri?** An **English beta** later this year, then more languages `[S03]`.
- **Why not here yet?** In the EU, the new Siri isn't initially on iPhone/iPad/Watch (due to the DMA) `[S03]`; in China it waits on local regulatory work `[S03]`.

---

## FAQ

**Q: Can Apple see my content?**
A: No. What can be done on device is done on device; in the cloud, PCC keeps content unsaved and unshared, invisible even to Apple `[S01]`, discarded after use `[S-PCC1]`, with no one able to peek `[S-PCC1]`.

**Q: Does my data go to Google? (Isn't it Google's data center?)**
A: The building is Google's, but the software is controlled by Apple, and your device trusts only Apple-approved software `[S02]`; it's Apple's secure cloud extended into Google's building `[S02]`.

**Q: Can you tell if an image is AI-generated?**
A: Yes — it carries an invisible SynthID watermark (Google DeepMind's technology) `[S04][S18]`.

**Q: Which devices work?**
A: Newer iPhone/iPad/Mac, Apple Vision Pro, and newer Apple Watch `[S03]`.

**Q: Why are there usage limits?**
A: Some features are server-heavy; iCloud+ plans usually allow more `[S03]`.

**Q: What does the Google / Gemini collaboration mean?**
A: Officially "custom-built in collaboration with Google" `[S01]` using the technology behind Gemini `[S02]`; details aren't public, and the press figures aren't official.

**Q: Is my data used to train the AI?**
A: No. Training uses public, licensed, and open-source data, **not your private content or interactions** `[S01]`.

**Q: Can my phone even hold an AI this big?**
A: Yes — the model sits in your phone's storage and is pulled in only when needed, so it doesn't constantly use memory `[S01]`.

**Q: How confident is Apple in its own security?**
A: It publicly offers **bounties** for outside researchers to find flaws — up to about **US$1,000,000** for the most serious (remote arbitrary code execution) `[S-PCC1]`. Paying handsomely to invite scrutiny usually signals confidence in the protections.

---

> Want more? The **AI-User Edition** has a "where does my data go" checklist; the **Developer Edition** has full technical detail.
