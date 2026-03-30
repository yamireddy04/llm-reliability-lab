"use client";
import { useAppStore } from "@/lib/store";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Brain, XCircle } from "lucide-react";

const typeExplanations: Record<string, { label: string; desc: string; color: string; border: string; bg: string }> = {
  factual_error: {
    label: "Factual Error",
    desc: "The model provided a plausible-sounding but incorrect fact. This is the most common type and occurs when training data contains conflicting information.",
    color: "text-warn",
    border: "border-warn/20",
    bg: "bg-warn/5",
  },
  fabricated: {
    label: "Fabricated Information",
    desc: "The model generated content that does not exist in reality — invented drug names, fictional studies, or non-existent medical procedures.",
    color: "text-danger",
    border: "border-danger/20",
    bg: "bg-danger/5",
  },
  overconfident: {
    label: "Overconfident Wrong Answer",
    desc: "The model expressed certainty (words like 'clearly', 'therefore', 'definitively') while providing an incorrect answer. Particularly dangerous in clinical settings.",
    color: "text-accent2",
    border: "border-accent2/20",
    bg: "bg-accent2/5",
  },
};

export default function HallucinationPage() {
  const { results } = useAppStore();
  const hallucinations = results.filter((r) => r.isHallucination);

  if (results.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <Brain size={40} className="text-muted mx-auto mb-4" />
        <h2 className="font-display text-xl font-bold text-white mb-2">No Data Available</h2>
        <p className="text-dim text-sm mb-6">Run an experiment first to analyze hallucinations.</p>
        <Link href="/configure" className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-bg rounded-lg font-mono text-sm font-bold">
          Start <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-danger text-xs font-mono mb-2">
          <AlertTriangle size={12} /> hallucination analysis
        </div>
        <h1 className="font-display text-3xl font-bold text-white mb-2">Hallucination Analysis</h1>
        <p className="text-dim text-sm">
          Deep dive into model failures. {hallucinations.length} hallucinations detected out of {results.length} responses.
        </p>
      </div>

      {/* Type distribution */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {Object.entries(typeExplanations).map(([key, meta]) => {
          const count = hallucinations.filter((h) => h.hallucinationType === key).length;
          return (
            <div key={key} className={`p-4 rounded-xl border ${meta.border} ${meta.bg}`}>
              <div className={`text-sm font-display font-semibold ${meta.color} mb-1`}>{meta.label}</div>
              <div className={`font-display text-3xl font-bold ${meta.color} mb-2`}>{count}</div>
              <p className="text-xs text-dim leading-relaxed">{meta.desc}</p>
            </div>
          );
        })}
      </div>

      {/* No hallucinations */}
      {hallucinations.length === 0 && (
        <div className="p-8 rounded-xl border border-accent3/20 bg-accent3/5 text-center">
          <XCircle size={32} className="text-accent3 mx-auto mb-3" />
          <h3 className="font-display font-semibold text-white mb-2">No Hallucinations Detected</h3>
          <p className="text-dim text-sm">All model responses matched ground truth. Excellent reliability!</p>
        </div>
      )}

      {/* Hallucination cases */}
      <div className="space-y-4">
        {hallucinations.map((h, i) => {
          const meta = h.hallucinationType ? typeExplanations[h.hallucinationType] : null;
          return (
            <div key={i} className={`rounded-xl border ${meta?.border ?? "border-border"} ${meta?.bg ?? "bg-surface/50"} overflow-hidden`}>
              <div className="px-5 py-3 border-b border-border flex items-center gap-3">
                <AlertTriangle size={14} className={meta?.color ?? "text-danger"} />
                <span className={`text-xs font-mono font-bold ${meta?.color ?? "text-danger"}`}>
                  {meta?.label ?? "Error"} · Q#{String(h.questionId).padStart(2, "0")}
                </span>
              </div>

              <div className="p-5">
                <p className="text-sm text-white font-medium mb-4">{h.question}</p>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-accent3/20 bg-accent3/5">
                    <div className="text-[10px] font-mono text-accent3 mb-1.5">✓ GROUND TRUTH</div>
                    <p className="text-sm text-text">{h.groundTruth}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-danger/20 bg-danger/5">
                    <div className="text-[10px] font-mono text-danger mb-1.5">✗ MODEL RESPONSE</div>
                    <p className="text-sm text-dim leading-relaxed">
                      {h.modelResponse.substring(0, 300)}{h.modelResponse.length > 300 ? "..." : ""}
                    </p>
                  </div>
                </div>

                {meta && (
                  <div className="mt-3 p-3 rounded-lg border border-border bg-surface">
                    <div className="text-[10px] font-mono text-muted mb-1">WHY THIS OCCURRED</div>
                    <p className="text-xs text-dim leading-relaxed">{meta.desc}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Correct answers */}
      {results.filter((r) => r.isCorrect).length > 0 && (
        <div className="mt-8">
          <h3 className="font-display font-semibold text-white text-sm mb-4 flex items-center gap-2">
            <span className="text-accent3">✓</span> Correct Responses ({results.filter((r) => r.isCorrect).length})
          </h3>
          <div className="space-y-2">
            {results.filter((r) => r.isCorrect).map((r, i) => (
              <div key={i} className="p-4 rounded-xl border border-accent3/10 bg-accent3/5 flex items-start gap-3">
                <span className="text-[10px] font-mono text-muted mt-0.5">#{String(r.questionId).padStart(2, "0")}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-dim truncate">{r.question}</p>
                  <p className="text-xs text-accent3 font-mono mt-0.5">→ {r.groundTruth.substring(0, 80)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link href="/insights" className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg rounded-lg font-mono text-sm font-bold hover:bg-accent/90 transition-all">
          View Full Insights <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}