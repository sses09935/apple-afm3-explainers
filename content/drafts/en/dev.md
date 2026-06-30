# Apple's Third-Generation Foundation Models & PCC on Google Cloud — Developer Edition

> **Unofficial, educational explainer.** This document is independently maintained and is **not** an Apple, Google, or NVIDIA publication, nor affiliated with any of them. "Apple," "Private Cloud Compute," "Apple Intelligence," "Gemini," "Google," "NVIDIA," and "Blackwell" are trademarks of their respective owners, used here for reference only.
>
> **Source tiers.** Facts cite only `sources/source-index.md`: **T1 (Apple official)** and **T2 (partner official: Google Cloud / NVIDIA)**. Third-party reporting is never used as a fact source. Each fact carries a source code `[S0X]` (map: `sources/source-map.md`).
>
> **Status legend.** `official` (finalized) / `official-beta` (beta-stage; to be updated by the summer technical report) / `forthcoming` (pre-announced, not yet published). Every `official-beta` figure is marked "**beta snapshot**."
>
> **Baseline date:** 2026-06-23.

---

## 0. Preface and boundaries

This document targets readers fluent in LLM architecture, TEEs/attestation, and confidential computing. It distills Apple's June 2026 dual announcement — the **third generation of Apple Foundation Models (AFM 3, five models)** and the **first extension of Private Cloud Compute (PCC) to a third-party data center (Google Cloud + NVIDIA GPUs)** — into a single traceable reference.

Four boundaries hold throughout:

1. **Official vs. reported.** Figures circulating in the press (deal value, custom-Gemini parameter counts, distillation ratios) are unconfirmed by Apple; they appear only in **Appendix A**, marked "reported, unofficial."
2. **Apple vs. partner (T2).** Some confidential-computing claims come from Google Cloud / NVIDIA; we attribute each, never presenting them as Apple's own.
3. **No speculation.** The specific form, proportion, and commercial terms of Gemini's technical involvement are **not disclosed** `[S01][S02][S05]`; we do not fill that gap.
4. **Beta currency.** All evaluations are beta-stage snapshots; Apple has pre-announced a technical report **later this summer** with updated evaluations and benchmarks `[S01]` (`forthcoming`).

| Mark | Meaning | Handling |
| --- | --- | --- |
| **T1** | Apple official | Used directly as fact |
| **T2** | Partner official (Google Cloud / NVIDIA) | Used as fact, **attributed in text** |
| excluded | Third-party reporting | **Not** in body; Appendix A only |
| `official-beta` | Official but beta-stage | Figures marked "beta snapshot" |

---

# Line 1 — What it is (five models)

## 1.1 The five-model lineup and hardware targets

The third generation of Apple Foundation Models is a family of **five** models, custom-built in collaboration with Google, spanning on-device and PCC `[S01]`:

- **AFM 3 Core** — on-device; the next generation of the prior 3-billion-parameter dense model, a step up in quality `[S01]`.
- **AFM 3 Core Advanced** — the most powerful on-device model; natively multimodal, enabling expressive voices and higher-accuracy dictation; a **20-billion-parameter model using a sparse architecture, activating just 1 to 4 billion parameters at a time depending on the request**, unlocked by and optimized for the most capable Apple silicon `[S01]`.
- **AFM 3 Cloud** — the server-side workhorse on PCC, optimized for speed, efficiency, and performance `[S01]`.
- **ADM 3 Cloud (Image)** — image generation and editing on PCC, powering advanced photo editing, the all-new Image Playground, and more `[S01]`.
- **AFM 3 Cloud Pro** — the most capable server-based model, for the most demanding use cases such as agentic tool use and complex reasoning `[S01]`.

**Hardware targets:** AFM 3 Core, Core Advanced, Cloud, and ADM 3 Cloud are all purpose-built for Apple silicon; **AFM 3 Cloud Pro is extended, with Google and NVIDIA, to NVIDIA GPUs in Google Cloud** `[S01]`.

| Model | Location | Positioning | Disclosed specs | Hardware |
| --- | --- | --- | --- | --- |
| **AFM 3 Core** | on-device | base model; next gen of 3B dense | (params undisclosed) | Apple silicon |
| **AFM 3 Core Advanced** | on-device | strongest on-device; multimodal, voice, dictation | 20B sparse, 1–4B active | best Apple silicon |
| **AFM 3 Cloud** | PCC | server workhorse | dev-visible: 32K context + reasoning | Apple silicon |
| **ADM 3 Cloud** | PCC | image gen/edit; controllability + efficiency | (undisclosed) | Apple silicon |
| **AFM 3 Cloud Pro** | PCC (GCP) | strongest; agentic, complex reasoning | (undisclosed) | Google Cloud NVIDIA GPU |

> Source: KB-001–007 `[S01]`; dev-visible 32K + reasoning `[S08]`.

![Figure D1 — five-model routing](assets/diagrams/en/D1-model-routing.svg)

A note on a common conflation: **all five** models are custom-built with Google `[S01]`, but **only** AFM 3 Cloud Pro runs in Google Cloud `[S01]`. "Built with Google" (model layer) and "running in Google Cloud" (deployment layer) are distinct.

## 1.2 The PCC privacy boundary (overview)

The three server models run on PCC, which ensures **user data is never stored or shared with anyone, including Apple** `[S01]`. Full mechanics in §2.6–2.8.

## 1.3 Apple × Google / Gemini: official wording and boundary

Three official surfaces phrase the collaboration differently:

- **ML Research:** the five models are "custom-built in collaboration with Google" `[S01]`.
- **Developer Newsroom:** the new AFM are "custom-built in collaboration with Google and its Gemini models" `[S05]`.
- **Security:** Apple collaborated with Google to "leverage the technologies behind its Gemini family of models" `[S02]`.

The Security wording is the most precise: it describes leveraging the **technologies behind** the Gemini family, not deploying Gemini itself. **Boundary:** the form, proportion, and commercial terms of Gemini's involvement are **not disclosed** `[S01][S02][S05]`; we infer no mechanism (distillation / teacher signal / runtime Gemini) — see Appendix A.

> **Common misconception (five boundaries to keep straight):**
>
> - **AFM 3 is not a single model** — it is a family of five (two on-device + three on PCC) `[S01]`.
> - **"Built with Google" (model layer, all five) ≠ "runs in Google Cloud" (deployment layer, only AFM 3 Cloud Pro)** `[S01]`; do not conflate them, and do not reduce it to "Siri AI is Gemini."
> - **Cloud Pro, Google Cloud, Gemini, and PCC are four distinct layers:** Cloud Pro is a model name, Google Cloud is a deployment location, Gemini is what the models "leverage the technologies behind," and PCC is the privacy architecture `[S01][S02]`.
> - **`official-beta` ≠ final release; `forthcoming` ≠ already available; `reported-excluded` ≠ official confirmation** (see the status legend in §0).
> - **On-device / server / Cloud Pro paths are not interchangeable** — different hardware and deployment boundaries `[S01][S02]`.
>
> These only restate existing facts; no new claim is added, and the unpublished summer technical report is not treated as settled before release.

---

# Line 2 — How it works (architecture and deployment)

## 2.1 On-device: the IFP sparse architecture of AFM 3 Core Advanced

**The memory problem:** traditional LLMs — dense or sparsely activated — require all weights to reside in DRAM, a footprint that limits scalability on consumer hardware `[S01]`.

**IFP:** AFM 3 Core Advanced uses a novel sparsely activated architecture built on **Instruction-Following Pruning (IFP)**, developed by Apple researchers `[S01][S11]`:

- **Weights live in NAND.** Rather than forcing the whole model into DRAM, the full model is stored in flash (NAND) `[S01]`.
- **Per-prompt routing.** Because NAND-to-DRAM bandwidth is too slow to swap weights token-by-token as standard MoE requires, routing decisions are made **per prompt**: a lightweight dense block selects a fixed set of experts during initial processing and periodically reselects them during generation `[S01]`.
- **Shared / routed experts.** A high percentage of always-active "shared experts" is paired with input-dependent "routed experts" swapped into DRAM only when needed `[S01]`.
- **Mechanism (Figure 1).** Most parameters are expert weights in the FFN blocks of a stacked transformer; for a query the model selectively loads a small subset of experts, patches them with shared static weights into a dense model in DRAM, and periodically reselects and updates the active experts during generation `[S01]`.
- **Inference-time elasticity.** A predetermined number of active parameters is tailored per use case; weights load incrementally across requests of varying difficulty, scaling model size far beyond DRAM limits while minimizing latency `[S01]`.

**IFP paper result:** an input-dependent structured pruning where a sparse mask predictor selects the most relevant parameters per instruction; the paper reports a 9B→3B-activated variant approaching 9B-dense quality with TTFT close to 3B-dense `[S11]`. (Paper result; AFM 3 Core Advanced's full internal configuration is undisclosed — see Wrap-up.)

![Figure D2 — IFP's NAND/DRAM selective loading](assets/diagrams/en/D2-ifp-nand-dram.svg)

## 2.2 AFM 3 Core evaluation (beta snapshot)

> Beta-stage snapshot; to be updated by the summer technical report `[S01]`.

- General text preferred on **45.6%** of prompts vs. 23.3% for the 2025 baseline `[S01]` (beta snapshot).
- Image understanding preferred **over 61%** of the time (where users had a preference) `[S01]` (beta snapshot).

## 2.3 Server: AFM 3 Cloud and PT-MoE

AFM 3 Cloud applies key upgrades to the **Parallel-Track Mixture-of-Experts (PT-MoE)** foundation introduced last year; these refinements stabilize training and improve reasoning and accurate recall within the context window for complex server-side queries `[S01][S12]`. The developer-accessible PCC language model (the same one powering many Apple Intelligence features) has a **32,000-token context window and reasoning** `[S08]`.

**Evaluation (beta snapshot)** `[S01]`:

- General text (side-by-side) preferred on **64.7%** of prompts vs. 8.7% for the 2025 AFM Server, consistent across all locales (beta snapshot).
- Single-sided: roughly **36%** relative improvement in overall response satisfaction and **21%** in instruction following (beta snapshot).
- Image understanding preferred on **37.8%** vs. 9.6% for the 2025 baseline (beta snapshot).

## 2.4 Image: ADM 3 Cloud

ADM 3 Cloud delivers strong controllability and parameter efficiency, generalizes across aspect ratios and resolutions, and draws on the broader AFM family to guide creation and editing `[S01]`. The base model natively handles creation, editing, and Genmoji; specialized adapters power **Spatial Reframing (Photos)**, touch-based modifications, and Image Playground personalization `[S01]`. Figure 2 shows photorealism across diverse subjects and lighting `[S01]`.

## 2.5 AFM 3 Cloud Pro and the confidential-computing hardware stack

**Deployment:** for AFM 3 Cloud Pro, Apple worked with Google and NVIDIA to extend PCC to NVIDIA GPUs in Google Cloud, **maintaining the same privacy guarantees** `[S01][S02]`.

**Stack:** the confidential-inference foundation is **NVIDIA Confidential Computing with NVIDIA GPUs, Intel CPUs with TDX, and Google's Titan chip** `[S02]`:

- **NVIDIA GPUs (attributed: Apple Security / Google Cloud / NVIDIA).** Blackwell GPUs carry server-side inference; NVIDIA Confidential Computing provides GPU-side confidential inference and data-in-use protection `[S02][S13][S14]`.
- **Intel CPUs (precise role).** Intel CPUs with TDX provide CPU-side confidential VM / trusted execution (VM isolation, memory protection). **Apple does not state the model runs primarily on Intel CPUs**; Intel TDX and NVIDIA CC together protect data-in-use along the entire CPU-to-GPU compute path `[S02][S13]`.
- **Google Titan (attributed: Apple Security / Google Cloud).** The Titan chip (Titanium architecture) provides a hardware root of trust ensuring boot-process and platform integrity `[S02][S13]`.

**Evaluation (beta snapshot):** vs. AFM 3 Cloud, ~**+10%** text overall satisfaction, ~**+14%** image understanding, ~**+14%** Math `[S01]` (beta snapshot).

## 2.6 PCC on Google Cloud (full)

> Primary source: Apple Security `[S02]`, written by Apple SEAR, User Privacy, Core OS, Services Engineering (ASE), and Machine Learning and AI (AIML) `[S02]`.

**Scope:** Apple extends PCC beyond its own data centers; with Google and NVIDIA it runs new Apple Intelligence workloads on Google Cloud — **the first extension of PCC to a third-party data center** `[S02]`. The most demanding tasks (agentic tool-use, complex reasoning) are handled by PCC extended to Google Cloud on NVIDIA GPUs, while maintaining Apple's security and privacy protections `[S02]`.

**Industry context:** PCC was originally built exclusively on Apple silicon; the industry has offered confidential-inference primitives that could theoretically be combined to PCC's level, but **until now they had never been integrated into a comprehensive, end-to-end confidential inference pipeline at global scale — which is what PCC on Google Cloud achieves** `[S02]`.

**Five core requirements (unchanged):** stateless computation, enforceable guarantees, no privileged runtime access, non-targetability, verifiable transparency `[S02]` (original definitions in §2.8).

| Requirement | One line |
| --- | --- |
| stateless computation | data used only for the request, then not retained |
| enforceable guarantees | enforced technically (code signing, sealed software), not by policy |
| no privileged runtime access | no privileged path to user data at runtime |
| non-targetability | a compromised infra cannot target a specific user |
| verifiable transparency | software public and auditable |

**Trust boundary and mechanisms:**

- **Trusted computing base.** Beyond confidential computing's mitigation of privileged access outside the confidential VM (including side-channels), Apple treats every component — firmware, host and guest OS stacks, application code — as part of the TCB, subject to verifiable transparency and no-privileged-access guarantees `[S02]`.
- **Append-only ledger.** To mitigate supply-chain attacks, Apple maintains a cryptographically verifiable, append-only ledger of all Google Cloud hardware in the PCC fleet `[S02]`.
- **Two independent roots of trust.** For components that could be abused to exfiltrate user data, software attestation is **rooted in at least two separate roots of trust from independent vendors** `[S02]`.
- **Inference-stack isolation.** As on Apple silicon: initial network-data parsing per request runs in a dedicated process in its own namespace; shared inference software is recycled with a short time-to-live; attested keys sit in a separate, dedicated confidential VM isolated from external inputs `[S02]`.
- **Apple's control.** Regardless of where infrastructure is hosted, Apple retains complete control over PCC software; Apple devices only trust PCC software cryptographically approved by Apple `[S02]`.
- **Summer preview ramp.** PCC on Google Cloud ramps to the complete set of protections throughout the summer preview `[S02]`.
- **Transparency.** As on Apple silicon, all binaries are published for public inspection; public research tooling and live PCC nodes in research mode are available via the Apple Security Bounty Program `[S02]`.
- **Forthcoming.** More detail at the Confidential Computing Summit later this month, and in an updated PCC Security Guide and research-program details later this year `[S02]`.

![Figure D3 — PCC on Google Cloud trust stack](assets/diagrams/en/D3-pcc-gcp-stack.svg)

![Figure D4 — attestation / append-only ledger chain](assets/diagrams/en/D4-attestation-ledger.svg)

## 2.7 Partner official (T2)

> From **Google Cloud / NVIDIA**, not Apple; attributed in text.

- **Google Cloud.** Built a serving platform on Google Cloud meeting Apple's rigorous security, confidentiality, and transparency goals for PCC; core is its Confidential Computing portfolio and Titanium security architecture (featuring the custom Titan chip as hardware root of trust) `[S13]`. It uses Intel TDX and NVIDIA Confidential Computing for hardware-based VM isolation; Titan is deployed fleet-wide as a hardware root of trust; Intel CPU and NVIDIA Blackwell GPU security features protect data-in-use so the entire CPU-to-GPU path is protected `[S13]`.
- **NVIDIA.** NVIDIA Blackwell GPUs with Confidential Computing support server-side inference for Apple Foundation Models, integrated into PCC's hardware security architecture running on Google Cloud `[S14]`.
- **NVIDIA CC capabilities (NVIDIA official).** Its Confidential Computing provides hardware-rooted trust, encrypted communication paths, and remote attestation; it isolates workloads in TEEs and lets systems cryptographically verify the infrastructure hasn't been tampered with before sensitive data is sent — meaning, for end users, "no one, not even the system's builders, can look at their data, chats or conversations" `[S14]`.
- **Google open-source host stack (Google Cloud official).** Apple and Google co-engineered an open-source host stack to support PCC-on-Google-Cloud transparency, enabling independent inspection and verification of the system's security properties `[S13]`.

## 2.8 PCC foundations (2024 generation)

The GCP extension reuses the 2024 (Apple silicon) requirements and mechanisms `[S-PCC1][S-PCC2]`:

- **Positioning.** PCC extends the security and privacy of Apple devices into the cloud for AI workloads beyond on-device capacity `[S-PCC1]`.
- **Five requirements (original).** stateless computation, enforceable guarantees, no privileged runtime access, non-targetability, verifiable transparency `[S-PCC1]`.
- **Stateless computation.** User data is used only to fulfill the request and is not retained afterward `[S-PCC1]`.
- **Enforceable guarantees.** Privacy is enforced technically (code signing, sealed software), not by trust in operators `[S-PCC1]`.
- **No privileged runtime access.** No privileged interface can access user data at runtime; remote shells and similar channels are removed `[S-PCC1]`.
- **Non-targetability.** Even a compromised infrastructure cannot target a specific user (metadata minimization, an independent third-party relay hiding source IP, target diffusion, random node assignment) `[S-PCC1]`.
- **Verifiable transparency / transparency log.** Production PCC software images are published to a publicly auditable, append-only transparency log; devices connect only to nodes whose software is logged `[S-PCC1]`. (The 2024 forerunner of §2.6's append-only ledger.)
- **Attestation (2024).** Before sending data, the device verifies a node's boot chain, OS image, and software measurements against logged versions, with keys protected by a hardware root of trust; otherwise it refuses `[S-PCC1]`.
- **Hardware root of trust (Apple silicon).** Nodes built on Apple silicon use the Secure Enclave and Secure Boot `[S-PCC1]`. (GCP achieves equivalent guarantees via Google Titan + two independent roots of trust.)
- **VRE.** Apple provides PCC software images and a Virtual Research Environment for researchers to inspect and verify claims, with rewards via the Apple Security Bounty `[S-PCC1][S-PCC2]`.
- **PCC Security Guide.** Documents the threat model, architecture, and external verification `[S-PCC2]` (an update is forthcoming — see Wrap-up / S16).

> Apple's restricted-license PCC source code (`S-PCC3`) is **not** redistributed here (non-redistribution principle); obtain it from `github.com/apple/security-pcc`.

**2024 vs. PCC on Google Cloud:**

| Mechanism | 2024 (Apple silicon) | PCC on Google Cloud (2026) |
| --- | --- | --- |
| Deployment | Apple's own data centers `[S-PCC1]` | first extension to a third-party data center (Google Cloud) `[S02]` |
| Hardware root of trust | Secure Enclave / Secure Boot `[S-PCC1]` | Google Titan (Titanium) `[S02]` |
| Attestation | device verifies a single node `[S-PCC1]` | rooted in ≥2 independent-vendor roots of trust `[S02]` |
| Transparency record | append-only transparency log `[S-PCC1]` | fleet-wide append-only ledger `[S02]` |
| Five requirements | original `[S-PCC1]` | unchanged `[S02]` |
| Public inspection | binaries + VRE + bounty `[S-PCC1][S-PCC2]` | binaries + research tooling + research-mode nodes `[S02]` |
| Confidential-compute HW | Apple silicon | NVIDIA CC (GPU) + Intel TDX (CPU) `[S02]` |

## 2.8b PCC deep mechanisms (2024 generation)

§2.8 is the requirements layer; below is the PCC-Security-Guide-level **mechanism layer** — how those requirements are technically enforced (2024 generation; the GCP extension reuses the same design patterns).

**How statelessness is enforced — Ephemeral Data Mode.** Mutable data is written to a dedicated data volume separate from the read-only Signed System Volume; the SEP **randomizes that volume's key hierarchy on every boot**, so data written in one session cannot be read after a subsequent boot; a boot task discards the prior encrypted volume and rebuilds a clean one `[S-PCC2]`.

**How no-privileged-access is enforced.** Nodes **remove/disable** system shells, interpreters, debuggers, and JIT compilation, with no runtime path to load additional software for privilege escalation `[S-PCC2]`.

**How non-targetability is achieved** (three layered mechanisms):

- **Anonymous tokens** — usage limits via cryptographically unlinkable Token Granting Tokens / One-Time Tokens (RSA Blind Signatures, Privacy Pass), not account/device credentials; the identity service is fully separated from request routing/processing `[S-PCC2]`.
- **Third-party relay** — requests use Oblivious HTTP; the client encrypts to Apple's Oblivious Gateway via HPKE and randomly selects an Oblivious Relay **operated by a different third party** (Cloudflare and Fastly in the 2024 generation) to hide the source IP `[S-PCC2]`.
- **Target diffusion** — each request is encrypted only to a node subset of size **k**, so a compromised node decrypts few requests; targeting a specific user requires a broad, detectable attack `[S-PCC2]`.

**Root of trust and software integrity.** The root of trust is custom Apple silicon, with properties fused into silicon and immutable post-manufacture; Secure Enclave (fused UID, private key never exposed to software), Secure & Measured Boot, boot measurements signed with a Data Center Identity Key `[S-PCC2]`. The node OS is a minimized, hardened subset of iOS; functionality loads via **Cryptex**; code-execution policy is enforced by a **Trusted Execution Monitor (TXM)** independent of the kernel — **compromising the kernel alone is insufficient to run arbitrary code**; **Software Sealed Registers** accumulate measurements via a ratchet and feed attestation; **Restricted Execution Mode (REM)** is a one-way transition after which new trust caches are refused `[S-PCC2]`.

**Transparency log (the core of the verifiable chain).** Every production build's software measurements are published to an **append-only, tamper-evident** transparency log; devices send data only to nodes that can attest they run **publicly logged** software; each production image's binary is published for inspection **within 90 days of being logged** (or when the related software update is available, whichever is earlier); once entered, **removal is detectable** (log-backed map) `[S-PCC1][S-PCC2]`.

**Threat model.** The design goal is that **even under attack the five requirements are never violated**; it considers three scenarios — accidental disclosure, external compromise via a user request, and physical/internal access — with defense-in-depth (prevention → detection → containment → time-bounding → target diffusion) `[S-PCC2]`.

**2024-generation server inference.** A custom The Inference Engine (TIE) + MetalLM runs the AFM-server; per-request processes are isolated and shared inference software is **recycled periodically** to prevent residue; output is streamed with **padding** against token-length side channels `[S-PCC2]`. (A different layer from the 2026 AFM 3 Cloud / PT-MoE, KB-024.)

**Security bounty (a signal of technical enforcement + welcoming scrutiny).** Remote arbitrary code execution with entitlements **US$1,000,000**; user request data outside the trust boundary US$250,000; privileged network position US$150,000; unattested code execution US$100,000; accidental disclosure US$50,000; significant issues are still evaluated for awards `[S-PCC1]`.

## 2.9 Training and evaluation methodology

**Training data:** a mixture of publicly available information, licensed/purchased data, open-sourced data, dedicated studies, and synthetic data; **no user private personal data or user interactions are used**; web-publisher opt-outs are respected `[S01]`.

**Training recipe:** significantly scaled pre-training on the latest cloud TPU accelerators; all models share a common initial foundation before specializing, adding audio, image understanding, long-context reasoning, and high-quality visual generation; post-training combines supervised fine-tuning with multi-stage reinforcement learning `[S01]`. (Note: TPUs for **training**, NVIDIA GPUs for Cloud Pro **inference** — distinct stages.)

**Hardware optimization + QAT:** each model optimized for its target hardware (four → Apple silicon; Cloud Pro → NVIDIA GPUs); Quantization Aware Training compresses models substantially while maintaining accuracy `[S01]`.

**Evaluation methodology (beta snapshot):** evaluated at model and feature levels; model-level dimensions include Instruction Following, Truthfulness, and Presentation, plus Image Understanding for visual prompts; results reflect the current development stage `[S01]` (beta snapshot).

- **TTS MOS (beta snapshot):** 5-point MOS; at 1B activation, AFM 3 Core Advanced scores General Voice 4.15 (production 3.87) and Conversational 4.24 (production 3.82); a 0.1 MOS increase is a highly noticeable improvement `[S01]` (beta snapshot).
- **Dictation (beta snapshot):** preference vs. the prior system across seven dimensions; at 1B, Overall Quality preferred **44.7% to 17.6%**, with consistent wins across the other six `[S01]` (beta snapshot).
- **Locale groups:** English (US/GB/AU/IN dialects); PFIGSCJK; DDNSTV; AFIHHMPRTU `[S01]`.

### Benchmark quick-reference

> All figures are **beta snapshots**, to be updated by the summer technical report (S15).

| Model | Item | Metric | Baseline | Status |
| --- | --- | --- | --- | --- |
| AFM 3 Core | general text | 45.6% preferred | 2025: 23.3% | beta snapshot |
| AFM 3 Core | image understanding | >61% (when a preference exists) | — | beta snapshot |
| AFM 3 Cloud | general text (side-by-side) | 64.7% preferred | 2025 Server: 8.7% | beta snapshot |
| AFM 3 Cloud | single-sided satisfaction | +36% relative | — | beta snapshot |
| AFM 3 Cloud | instruction following | +21% relative | — | beta snapshot |
| AFM 3 Cloud | image understanding | 37.8% preferred | 2025: 9.6% | beta snapshot |
| AFM 3 Cloud Pro | text / image / Math | ~+10% / +14% / +14% | vs AFM 3 Cloud | beta snapshot |
| Core Advanced (1B) | TTS MOS General / Conversational | 4.15 / 4.24 | prod 3.87 / 3.82 | beta snapshot |
| Core Advanced (1B) | Dictation Overall | 44.7% preferred | prior: 17.6% | beta snapshot |

> Source: KB-022/023/026/027/028/041/064/065 `[S01]`.

## 2.10 Verification in practice: how to check PCC's claims

PCC is designed to be **externally verifiable** rather than trusted on assertion:

1. **Inspect binaries** — all PCC binaries are published for public inspection `[S02]`.
2. **Compare the transparency log / ledger** — production images are logged in a publicly auditable, append-only log (2024) `[S-PCC1]`; on Google Cloud, all fleet hardware is in a cryptographically verifiable append-only ledger `[S02]`; devices connect only to logged nodes `[S-PCC1]`.
3. **Check attestation and roots of trust** — devices verify node attestation `[S-PCC1]`; on GCP, attestation is rooted in **at least two independent-vendor roots of trust** `[S02]` (Figure D4).
4. **Use research tooling (VRE)** `[S-PCC1][S-PCC2]`.
5. **Obtain research-mode nodes** via the Apple Security Bounty Program `[S02]`.
6. **Confirm who controls the software** — Apple retains complete control; devices trust only Apple-approved software `[S02]`. The verification point is the software's signer, not the data center's owner.

> **The limit of verifiability (accuracy red line).** PCC's verifiable chain is "**attestation ↔ transparency log**," **not** "source ↔ binary." Apple does **not** provide reproducible builds; published source is an analysis aid only and cannot prove the released binary was compiled from it `[S-PCC2]`. So a rigorous claim distinguishes "**Apple states**" from "**independently verifiable**": what's independently verifiable is "a device connects only to nodes whose software measurements are in the public log," not "that software matches the public source bit-for-bit."

> Note: PCC on Google Cloud is in **summer preview**, ramping to full protection `[S02]`; further detail awaits the Confidential Computing Summit (S17) and updated PCC Security Guide (S16), both `forthcoming`.

---

# Line 3 — What it means for you (privacy, capability, access)

## 3.1 Responsible AI

Four principles: **Empower users with intelligent tools, Represent our users, Design with care, Protect privacy** `[S01]`. Safety practices: a safety taxonomy for sensitive content; multilingual post-training alignment; language-specific guardrail models; human red teaming refined by native speakers across supported locales `[S01]`.

## 3.2 Image provenance: SynthID (attributed: Google)

> **SynthID is Google DeepMind's AI content watermarking and identification technology** `[S04][S18]` (Apple uses it by name in S04; attribution per Google DeepMind's official page S18).

- **Photos.** Images adjusted with Apple Intelligence automatically include a hidden SynthID watermark identifying AI-edited content `[S04]`.
- **Image Playground.** Generates high-quality images in virtually any style, now including photorealistic, via a new model on PCC; generated images automatically include a hidden SynthID watermark; modify by description or tap/circle/brush; choose aspect ratio; usable in Messages, Lock Screen wallpapers, and Contact Posters `[S04]`.
- **Daily limits.** Some features (including image generation) have daily usage limits because they rely on powerful server models; most iCloud+ plans offer increased access `[S03]`.

## 3.3 Model-powered features (overview)

- **Siri AI.** A new Siri deeply integrated into iPhone, iPad, Mac, Apple Watch, and Apple Vision Pro; uses personal context understanding to search across messages/emails/photos, takes systemwide app actions, answers questions about on-screen content or from the web, and has a dedicated Siri app that privately syncs conversation history via iCloud `[S03][S06]`.
- **Photos.** Spatial Reframing improves composition after capture; also Extend and Clean Up; AI-edited images carry SynthID (§3.2) `[S03][S04]`.

## 3.4 Developer access

For developers, the value is the framework/API path, not raw model weights:

- **Foundation Models framework** — a single native Swift API for stronger on-device models (with image input), server models, and custom skills `[S05]`.
- **Multiple providers** — use Claude, Gemini, or any provider implementing the new language model protocol via one API `[S05]`.
- **On-device context APIs** — inspect context size and count tokens of instructions/prompts/transcripts to fit the running hardware `[S08]`.
- **Dynamic Profiles** — update how models interact with your app on the fly `[S05]`; the WWDC session also covers composing dynamic sessions with instructions and profiles for agentic apps `[S08]`.
- **Free PCC for small business** — App Store Small Business Program developers with fewer than 2 million total first-time downloads can use AFM on PCC at no cloud API cost `[S05]`.
- **Core AI** — a new framework, the best way to run your own models on device; architecture optimized for Apple silicon's unified memory and Neural Engine to deploy full-scale LLMs locally `[S05]`.
- **Xcode 27** — brings Anthropic, Google, and OpenAI models/agents into the workflow; interactive planning, multiturn Q&A, canvas; agents validate their own work (tests, Playgrounds, previews, Device Hub); plug-ins via Model Context Protocol and Agent Client Protocol, with GitHub and Figma first; Apple silicon only, 30% smaller; Xcode Cloud up to 2x faster `[S05]`.
- **Roadmap** — the Foundation Models framework is planned to be open-sourced with Linux support later this summer; a Python SDK; available via PCC from watchOS 27; plus an Evaluations framework `[S08][S09]`.

## 3.5 Availability

| Stage | Time | Audience |
| --- | --- | --- |
| Developer testing | from announcement day | Apple Developer Program |
| Public beta | next month | Beta Software Program |
| Release | this fall | free software update |

**Languages (16)** `[S03]`: English, Danish, Dutch, French, German, Italian, Norwegian, Portuguese, Spanish, Swedish, Turkish, Vietnamese, Chinese (simplified), **Chinese (traditional)**, Japanese, Korean.

**Devices** `[S03]`: iPhone 16 or later, iPhone 15 Pro / 15 Pro Max, iPad mini (A17 Pro), M1-or-later iPad, MacBook Neo (A18 Pro), M1-or-later Mac, Apple Vision Pro, Apple Watch Series 9+ / Ultra 2+ / SE 3 (when paired with a nearby Apple Intelligence-enabled iPhone).

**Siri AI and regional limits:** Siri AI ships as a **beta** later this year for users with a supported device set to English, expanding to more languages; developer testing from day one on iOS/iPadOS/macOS/visionOS 27, watchOS 27 in a later beta `[S03]`. In the **EU**, Mac and Apple Vision Pro users can access Siri AI in a supported language; Siri AI is not initially available in the EU on iOS, iPadOS, and watchOS (Apple's separate note cites the DMA) `[S03][S07]`. In **China**, Siri AI and other new features are unavailable while Apple works through regulatory requirements `[S03]`.

---

# Wrap-up

## Not yet disclosed (no speculation)

Officially **undisclosed**, not filled in here `[S01]`: per-model layer counts, hidden sizes, head counts, exact context, quantization bits, RAM, throughput; Core Advanced expert count, routing/mask granularity, shared-expert ratio, load latency, full device list; AFM 3 Cloud parameter/active counts, PT-MoE topology, SKUs, latency/throughput; ADM 3 Cloud parameters, diffusion/AR architecture, latent size, sampling steps, max resolution, adapter sizes; AFM 3 Cloud Pro parameters, MoE or not, active params, context, GPU/CPU SKUs, instance type, GPU topology, inference cost.

## Forthcoming

Apple has pre-announced a technical report **later this summer** with updated evaluations and benchmarks `[S01]`; all `official-beta` figures will be reconciled in `docs/CHANGELOG.md` (milestone M6). The updated PCC Security Guide (S16) and Confidential Computing Summit talk (S17) are also `forthcoming`.

---

## Appendix A: Reported but unconfirmed (reported, unofficial)

> **Third-party reporting, unconfirmed by Apple, for background only — not fact.** Per invariant 5, this appears only in the developer edition.

- **~$1 billion/year, ~1.2-trillion-parameter custom Gemini:** Bloomberg / Mark Gurman reporting, unconfirmed by Apple `(reported, unofficial)`.
- Other interpretations ("Gemini as teacher signal / distilled," "no drop of Gemini," "Apple turned to GCP after its own PCC proved too slow") are likewise reporting/interpretation, not used here.

## Appendix B: Sources and archives

- Tiered source list: `sources/source-index.md` (T1 / T2 / excluded).
- Claim → source map: `sources/source-map.md`.
- Page archives and fetch dates: `sources/primary/_fetch-log.md`.
- Official-text verification (2026-06-24, Claude for Chrome): `sources/verification-2026-06-24.md`.
