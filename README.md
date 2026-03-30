# 🧪 LLM Reliability Lab

![Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20TypeScript%20%7C%20Tailwind%20CSS-1b2e2b?style=flat-square)
![Model](https://img.shields.io/badge/Models-LLaMA3%20%7C%20Mixtral%20%7C%20Gemma2-d9c5b2?style=flat-square)
![API](https://img.shields.io/badge/API-Groq%20Cloud-f55036?style=flat-square)
![State](https://img.shields.io/badge/State-Zustand-7ecb84?style=flat-square)
![Charts](https://img.shields.io/badge/Charts-Recharts-61dafb?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-7ecb84?style=flat-square)

A systematic AI safety research platform for evaluating large language model reliability on medical question answering benchmarks — measuring accuracy, hallucination behavior, and prompt strategy effectiveness across multiple models.

Built with **Next.js** (TypeScript) for the full-stack frontend, **Groq Cloud API** for live LLM inference, and **Zustand** for global experiment state management.

🌐 **Live Demo**: https://llm-reliability-lab.vercel.app/

---

## 1️⃣ Problem Statement

Large language models are increasingly used in high-stakes domains like healthcare, clinical decision support, and medical education. Yet their tendency to hallucinate — generating confident but factually incorrect responses — poses serious risks when deployed without systematic evaluation.

This project builds a platform that:

- Evaluates LLM accuracy on curated medical QA benchmarks
- Detects and categorizes hallucination types (fabricated, overconfident, factual error)
- Compares prompt strategies (zero-shot, structured, chain-of-thought) on identical question sets
- Provides interactive dashboards with exportable research-grade reports

---

## 2️⃣ Why It Matters

Systematic LLM evaluation has measurable value across multiple domains:

- **Healthcare AI** validating model safety before clinical deployment
- **AI safety research** quantifying hallucination rates across model families
- **Prompt engineering** measuring strategy effectiveness on domain-specific tasks
- **Model selection** providing evidence-based comparison for production decisions

This platform provides a reproducible, rigorous methodology for measuring how reliably LLMs answer medical questions — and where they fail — establishing a foundation for responsible AI deployment in high-stakes domains.

---

## 3️⃣ Dataset

**Primary Evaluation Dataset**

| Dataset | Format | Task |
|---|---|---|
| Medical QA Benchmark | 20 curated question-answer pairs | Supervised accuracy evaluation against ground truth |

**Dataset Coverage**

- Clinical pharmacology and drug mechanisms
- Anatomical and physiological concepts
- Disease diagnosis and symptom classification
- Treatment protocols and clinical guidelines

**Preprocessing & Scoring Pipeline**

- Keyword extraction from ground truth answers
- Token-level match ratio computation
- Threshold-based correctness classification (≥ 40% keyword match = correct)
- Automatic hallucination type assignment for incorrect responses

---

## 4️⃣ Methodology

The system consists of a unified evaluation pipeline with configurable model and prompt strategy inputs.

**Evaluation Pipeline**

1. User selects model, prompt strategy, and sample count via the configurator.
2. Questions are dispatched to the Groq Cloud API with the selected model.
3. Model responses are scored against ground truth using keyword match ratio.
4. Hallucination type is assigned to incorrect responses based on response patterns.
5. Results are aggregated and rendered across dashboard, hallucination analysis, and insights pages.

**Hallucination Classification Logic**

| Type | Detection Criteria |
|---|---|
| Overconfident | Long response (>200 chars) containing hedge words (therefore, thus, clearly) |
| Fabricated | Long response with zero keyword overlap with ground truth |
| Factual Error | Incorrect response not matching other hallucination patterns |

```
User Configuration (Model + Prompt Strategy + Sample Count)
        │
        ▼
Question Dispatch → Groq Cloud API (LLaMA3 / Mixtral / Gemma2)
        │
        ▼
Response Scoring → Keyword Match → Correct / Incorrect
        │
        ├─► Hallucination Classification (Fabricated / Overconfident / Factual Error)
        │
        ▼
Zustand Global State → Results Dashboard → Charts + Report Export
```

---

## 5️⃣ Platform Architecture

**Pages & Capabilities**

| Page | Function |
|---|---|
| Landing | Hero section, platform overview, live terminal animation |
| Dataset Explorer | Browse all 20 QA samples with filters, select subsets for experiments |
| Configure | Select model, prompt strategy, sample count, custom prompt override |
| Experiment Runner | Live Groq API calls, real-time response streaming, per-question status |
| Results Dashboard | Accuracy bar charts, hallucination pie charts, radar comparison (Recharts) |
| Hallucination Analysis | Side-by-side ground truth vs model output with type categorization |
| Insights & Report | Research-paper style summary, one-click TXT report download |
| Ethics & About | Risk analysis, responsible AI principles, deployment disclaimer |

**Prompt Strategies**

| Strategy | Description |
|---|---|
| Zero-Shot | Direct question with no additional context or instruction |
| Structured | Explicit medical expert role assignment with conciseness instruction |
| Chain-of-Thought | Step-by-step reasoning elicitation before final answer |

---

## 6️⃣ Models Supported

| Display Name | Groq Model ID | Characteristics |
|---|---|---|
| LLaMA 3 8B | `llama3-8b-8192` | Fast inference, good for high-volume evaluation |
| LLaMA 3 70B | `llama3-70b-8192` | Higher accuracy, stronger reasoning capability |
| Mixtral 8x7B | `mixtral-8x7b-32768` | Mixture-of-experts, strong on reasoning tasks |
| Gemma 2 9B | `gemma2-9b-it` | Google's instruction-tuned model |

---

## 7️⃣ Results

The platform produces structured evaluation outputs across all configured model and prompt strategy combinations.

**System Outputs**

- Per-question correctness labels with ground truth comparison
- Hallucination rate and type breakdown per experiment run
- Accuracy and hallucination rate summary cards
- Exportable plain-text research report

**Baseline Metrics (LLaMA 3 8B · Structured Prompting)**

| Metric | Value |
|---|---|
| Accuracy | ~82% |
| Hallucination Rate | ~11% |
| Consistency Score | 0.91 |

> Exact metrics vary per run depending on model temperature and question selection. All results are logged in the Zustand experiment store and available for export via the Insights page.

---

## 8️⃣ Limitations

- **Scoring Heuristic:** Keyword match ratio is an approximation; semantic equivalence is not captured.
- **Small Benchmark:** 20 QA samples limit statistical significance of cross-model comparisons.
- **No Authentication:** Experiment results are session-scoped and not persisted across browser sessions.
- **Client-Side API Calls:** Groq API key is exposed via `NEXT_PUBLIC_` prefix; not suitable for production without a server-side proxy.
- **Mock Models Only:** GPT-4 and LLaMA mock options simulate responses; only Groq-hosted models perform live inference.
- **No Fine-Tuning:** Models are evaluated zero-shot without domain-specific fine-tuning on medical data.

---

## 9️⃣ Future Work

- Add server-side API route proxy to secure the Groq API key in production
- Expand benchmark to 100+ curated medical QA pairs with source citations
- Integrate semantic similarity scoring (cosine similarity via embeddings) alongside keyword match
- Add cross-run experiment persistence using a database (PostgreSQL / Supabase)
- Support fine-tuned medical LLMs (Med-PaLM, BioMedLM) via API integration
- Export results as structured JSON / CSV for downstream analysis
- Add confidence calibration metrics and reliability diagrams
- Containerize with Docker for reproducible local deployment

---

## 🔟 How to Run

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

Visit: `http://localhost:3000`

**6. Run an Experiment**

1. Go to **Configure** → select model, prompt strategy, sample count
2. Go to **Experiment** → click **Start Experiment**
3. Watch live results stream in real time
4. Navigate to **Results**, **Hallucination**, and **Insights** pages

---

## 1️⃣1️⃣ Conclusion

LLM Reliability Lab demonstrates how frontier language models can be systematically benchmarked on domain-specific tasks using a modular, reproducible evaluation pipeline. By combining live Groq Cloud inference with structured hallucination detection and interactive visualization, the platform provides actionable insight into where LLMs succeed and fail on medical question answering — establishing a rigorous foundation for responsible AI deployment in high-stakes domains.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| LLM Inference | Groq Cloud API (LLaMA3, Mixtral, Gemma2) |
| State Management | Zustand |
| Charts & Visualization | Recharts |
| Animations | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel / Render |
