# 🧪 LLM Reliability Lab

**A systematic AI safety research platform for evaluating large language model reliability on medical question answering benchmarks.**

[![Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20TypeScript%20%7C%20Tailwind%20CSS-1b2e2b?style=flat-square)](https://nextjs.org/)
[![Models](https://img.shields.io/badge/Models-LLaMA3%20%7C%20Mixtral%20%7C%20Gemma2-d9c5b2?style=flat-square)](https://groq.com/)
[![API](https://img.shields.io/badge/API-Groq%20Cloud-f55036?style=flat-square)](https://console.groq.com/)
[![State](https://img.shields.io/badge/State-Zustand-7ecb84?style=flat-square)](https://zustand-demo.pmnd.rs/)
[![Charts](https://img.shields.io/badge/Charts-Recharts-61dafb?style=flat-square)](https://recharts.org/)
[![Status](https://img.shields.io/badge/Status-Active-7ecb84?style=flat-square)]()

<br/>

[🌐 Live Demo](https://llm-reliability-lab.vercel.app) · [📄 Project Write-up](./paper/main.pdf) · [🚀 Quick Start](#1️⃣1️⃣-how-to-run) · [📊 Results](#7️⃣-results)

</div>

---

## 📌 Overview

LLM Reliability Lab is a full-stack AI safety research platform that systematically benchmarks large language model reliability on medical question answering tasks. It measures accuracy, detects and categorises hallucination types, and compares prompt strategy effectiveness across multiple open-source models via live Groq Cloud API inference.

Built with **Next.js 15** (TypeScript), **Groq Cloud API** for live inference across LLaMA 3, Mixtral, and Gemma 2, and **Zustand** for global experiment state management.

---

## 1️⃣ Problem Statement

Large language models are increasingly adopted in high-stakes domains like healthcare, clinical decision support, and medical education. Yet their tendency to hallucinate — generating confident but factually incorrect responses — poses serious risks when deployed without systematic evaluation.

This platform addresses three specific gaps:

- Most LLM benchmarks report aggregate accuracy only, without classifying **how** or **why** models fail
- Cross-model and cross-prompt comparisons are rarely conducted on **identical question sets under identical conditions**
- Existing evaluation tools require specialised infrastructure and are inaccessible to non-specialist researchers

LLM Reliability Lab provides a browser-accessible, reproducible evaluation environment that exposes the full pipeline — from configuration to hallucination inspection — without requiring any local compute.

---

## 2️⃣ Why It Matters

| Domain | Value |
|---|---|
| **Healthcare AI** | Validates model safety before clinical deployment |
| **AI Safety Research** | Quantifies hallucination rates across model families |
| **Prompt Engineering** | Measures strategy effectiveness on domain-specific tasks |
| **Model Selection** | Evidence-based comparison for production decisions |

---

## 3️⃣ Dataset

**Primary Evaluation Benchmark**

| Property | Detail |
|---|---|
| Size | 20 curated medical QA pairs |
| Task | Supervised accuracy evaluation against verified ground truth |
| Format | Natural language question → short factual answer |
| Difficulty | 8 easy · 8 medium · 4 hard |

**Domain Coverage**

- Clinical pharmacology and drug mechanisms
- Anatomical and physiological concepts
- Disease pathophysiology and diagnosis
- Treatment protocols and clinical guidelines
- Biochemistry and genetics

**Scoring Pipeline**

```
Ground Truth Answer
        │
        ▼
Keyword Extraction (content words > 3 chars)
        │
        ▼
Token-Level Match Ratio  →  ρ = |{w ∈ K : w ∈ R}| / |K|
        │
        ├── ρ ≥ 0.40  →  CORRECT
        │
        └── ρ < 0.40  →  INCORRECT → Hallucination Classification
                                ├── Overconfident  (certainty markers + long response)
                                ├── Fabricated     (zero keyword overlap + long response)
                                └── Factual Error  (all other incorrect responses)
```

---

## 4️⃣ Methodology

**Evaluation Pipeline**

```
User Configuration  (Model + Prompt Strategy + Sample Count)
        │
        ▼
Question Dispatch ──► Groq Cloud API  (LLaMA3 / Mixtral / Gemma2)
        │
        ▼
Response Scoring ──► Keyword Match Ratio ──► Correct / Incorrect
        │
        ├──► Hallucination Classification  (Fabricated / Overconfident / Factual Error)
        │
        ▼
Zustand Global State ──► Results Dashboard ──► Charts + Report Export
```

**Prompt Strategies Compared**

| Strategy | Description |
|---|---|
| Zero-Shot | Direct question with no additional context — tests raw model knowledge |
| Structured | Explicit medical expert role framing with conciseness instruction |
| Chain-of-Thought | Step-by-step reasoning elicitation before the final answer |

**Hallucination Classification Logic**

| Type | Detection Criteria | Clinical Risk |
|---|---|---|
| Overconfident | Response > 200 chars AND contains certainty markers (*therefore*, *thus*, *clearly*) | 🔴 Highest |
| Fabricated | Response > 150 chars AND zero keyword overlap with ground truth | 🟠 High |
| Factual Error | Incorrect response not matching other patterns | 🟡 Medium |

---

## 5️⃣ Platform Architecture

**Pages and Capabilities**

| Page | Function |
|---|---|
| **Landing** | Hero section, platform overview, live terminal animation |
| **Dataset Explorer** | Browse all 20 QA samples with category/difficulty filters, select subsets |
| **Configure** | Select model, prompt strategy, sample count, custom prompt override |
| **Experiment Runner** | Live Groq API calls, real-time per-question response streaming |
| **Results Dashboard** | Accuracy bar charts, hallucination pie charts, radar performance view |
| **Hallucination Analysis** | Side-by-side ground truth vs model output with type categorisation |
| **Insights & Report** | Research-style summary, one-click TXT report export |
| **Ethics & About** | Risk analysis, responsible AI principles, deployment disclaimer |

**Tech Stack**

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| LLM Inference | Groq Cloud API |
| State Management | Zustand |
| Charts | Recharts |
| Animations | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 6️⃣ Models Supported

| Display Name | Groq Model ID | Characteristics |
|---|---|---|
| LLaMA 3 8B | `llama3-8b-8192` | Fast inference, good for high-volume evaluation runs |
| LLaMA 3 70B | `llama3-70b-8192` | Higher accuracy, stronger multi-step reasoning |
| Mixtral 8x7B | `mixtral-8x7b-32768` | Mixture-of-experts architecture, strong on reasoning tasks |
| Gemma 2 9B | `gemma2-9b-it` | Google instruction-tuned, efficient on factual QA |

---

## 7️⃣ Results

Metrics below are from the project write-up included in [`/paper`](./paper/main.pdf). Exact values vary per run depending on model temperature and question selection. All results are logged in the Zustand experiment store and exportable via the Insights page.

**Accuracy and Hallucination Rate**

| Model | Strategy | Accuracy | Hallucination Rate |
|---|---|---|---|
| LLaMA 3 70B | Zero-Shot | 70% | 20% |
| LLaMA 3 70B | Structured | 80% | 15% |
| **LLaMA 3 70B** | **Chain-of-Thought** | **85%** | **10%** |
| Mixtral 8x7B | Zero-Shot | 65% | 25% |
| Mixtral 8x7B | Structured | 75% | 20% |
| Mixtral 8x7B | Chain-of-Thought | 80% | 15% |
| LLaMA 3 8B | Zero-Shot | 55% | 30% |
| LLaMA 3 8B | Structured | 65% | 25% |
| LLaMA 3 8B | Chain-of-Thought | 70% | 20% |

**Hallucination Type Breakdown — LLaMA 3 70B**

| Prompt Strategy | Factual Error | Fabricated | Overconfident | Total |
|---|---|---|---|---|
| Zero-Shot | 2 | 1 | 1 | 4 |
| Structured | 2 | 1 | 0 | 3 |
| Chain-of-Thought | 2 | 0 | 0 | 2 |

**Key Takeaways**

- Chain-of-thought prompting eliminates fabricated and overconfident failures entirely at this benchmark scale
- Structured prompting removes overconfident responses but does not improve factual recall on its own
- Hard-difficulty items (multi-hop clinical reasoning) show ~50% accuracy — the primary failure mode across all models
- Consistency Score (1 − hallucination rate) ranges from 0.70 to 0.90 across all tested conditions

---

## 8️⃣ Project Write-up

A structured write-up is included with this project documenting the full methodology, experimental design, results tables, and ethical analysis in academic paper format.

📥 [Read the write-up (PDF)](./paper/main.pdf) · [LaTeX source](./paper/main.tex)

**Contents:**
- System architecture and evaluation pipeline design
- Three-category hallucination taxonomy with classification logic
- Controlled comparison across 9 model × prompt strategy conditions
- Full results tables with accuracy, hallucination rate, and consistency scores
- Analysis, limitations, and future work

---

## 9️⃣ Limitations

- **Scoring Heuristic:** Keyword match ratio is an approximation — semantically correct responses in different wording may be penalised
- **Small Benchmark:** 20 QA samples limit statistical significance; results are directionally informative, not definitive
- **No Persistence:** Experiment results are session-scoped and not saved across browser sessions
- **Client-Side API Key:** Groq key is exposed via `NEXT_PUBLIC_` — not suitable for production without a server-side proxy
- **No Fine-Tuning:** Models are evaluated without any domain-specific medical fine-tuning
- **Single Pass:** Stochastic decoding means results vary across runs; multiple passes are needed for confidence intervals

---

## 🔟 Future Work

- [ ] Server-side API proxy to secure the Groq API key
- [ ] Expand benchmark to 100+ QA pairs with source citations
- [ ] Semantic similarity scoring via sentence embeddings alongside keyword match
- [ ] Cross-run persistence using PostgreSQL or Supabase
- [ ] Support for fine-tuned medical LLMs (BioMedLM, Med-PaLM)
- [ ] JSON / CSV export for downstream statistical analysis
- [ ] Confidence calibration metrics and reliability diagrams
- [ ] Docker containerisation for reproducible local deployment

---

## 1️⃣1️⃣ How to Run

**1. Clone the Repository**

```bash
git clone https://github.com/yamireddy04/llm-reliability-lab.git
cd llm-reliability-lab
```

**2. Install Dependencies**

```bash
npm install
```

**3. Get a Groq API Key**

Go to [console.groq.com](https://console.groq.com) → API Keys → Create API Key.

**4. Create Environment File**

Create `.env.local` in the project root:

```
NEXT_PUBLIC_GROQ_API_KEY=gsk_your_key_here
```

**5. Run the Development Server**

```bash
npm run dev
```

Visit `http://localhost:3000`

**6. Run an Experiment**

1. Go to **Dataset** → browse and optionally select specific questions
2. Go to **Configure** → choose model, prompt strategy, and sample count
3. Go to **Experiment** → click **Start Experiment** and watch results stream live
4. Navigate to **Results**, **Hallucination**, and **Insights** pages for full analysis

---

## 1️⃣2️⃣ Conclusion

LLM Reliability Lab demonstrates how open-source language models can be systematically benchmarked on domain-specific tasks using a modular, reproducible evaluation pipeline. By combining live Groq Cloud inference with structured hallucination detection and interactive visualisation, the platform provides actionable insight into where LLMs succeed and fail on medical question answering.

The central finding: prompt strategy is not cosmetic. Chain-of-thought prompting halves the hallucination rate on this benchmark compared to zero-shot — and the gap between a 10% and 20% hallucination rate in a clinical tool is the difference between a research aid and a patient risk.

---

<div align="center">

**Built by [Yamini G](https://www.linkedin.com/in/yamini-gabu/) · [GitHub](https://github.com/yamireddy04) · [Live Demo](https://llm-reliability-lab.vercel.app)**

</div>
