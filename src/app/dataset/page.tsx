"use client";
import { useState } from "react";
import { medicalDataset, categories, MedicalQuestion } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { Search, Filter, CheckSquare, Square, ArrowRight, BookOpen, Tag, Zap } from "lucide-react";
import Link from "next/link";

const difficultyColor = {
  easy: "text-accent3 border-accent3/20 bg-accent3/5",
  medium: "text-warn border-warn/20 bg-warn/5",
  hard: "text-danger border-danger/20 bg-danger/5",
};

export default function DatasetPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const { selectedQuestions, setSelectedQuestions } = useAppStore();

  const filtered = medicalDataset.filter((q) => {
    const matchSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || q.category === selectedCategory;
    const matchDiff = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    return matchSearch && matchCat && matchDiff;
  });

  const toggleSelect = (q: MedicalQuestion) => {
    const exists = selectedQuestions.find((s) => s.id === q.id);
    if (exists) {
      setSelectedQuestions(selectedQuestions.filter((s) => s.id !== q.id));
    } else {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  const selectAll = () => setSelectedQuestions([...filtered]);
  const clearAll = () => setSelectedQuestions([]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-accent text-xs font-mono mb-2">
          <BookOpen size={12} /> dataset explorer
        </div>
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Medical QA Dataset
        </h1>
        <p className="text-dim text-sm max-w-xl">
          Browse {medicalDataset.length} curated medical questions with ground truth
          answers. Select samples to include in your experiment.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total", value: medicalDataset.length, color: "text-text" },
          { label: "Easy", value: medicalDataset.filter((q) => q.difficulty === "easy").length, color: "text-accent3" },
          { label: "Medium", value: medicalDataset.filter((q) => q.difficulty === "medium").length, color: "text-warn" },
          { label: "Hard", value: medicalDataset.filter((q) => q.difficulty === "hard").length, color: "text-danger" },
          { label: "Categories", value: categories.length, color: "text-accent2" },
          { label: "Selected", value: selectedQuestions.length, color: "text-accent" },
        ].map((s, i) => (
          <div key={i} className="p-3 rounded-lg border border-border bg-surface/50 text-center">
            <div className={`font-display text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-muted text-[10px] font-mono">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface flex-1 min-w-[200px]">
          <Search size={13} className="text-muted" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-text placeholder:text-muted outline-none w-full font-mono"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={13} className="text-muted" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-surface border border-border text-dim text-xs font-mono rounded-lg px-3 py-2 outline-none"
          >
            <option>All</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-surface border border-border text-dim text-xs font-mono rounded-lg px-3 py-2 outline-none"
          >
            <option>All</option>
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={selectAll}
            className="text-xs font-mono text-accent hover:text-accent/80 transition-colors px-3 py-2 border border-accent/20 rounded-lg"
          >
            Select All ({filtered.length})
          </button>
          <button
            onClick={clearAll}
            className="text-xs font-mono text-dim hover:text-text transition-colors px-3 py-2 border border-border rounded-lg"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Question list */}
      <div className="space-y-3 mb-8">
        {filtered.map((q) => {
          const isSelected = !!selectedQuestions.find((s) => s.id === q.id);
          const isExpanded = expanded === q.id;

          return (
            <div
              key={q.id}
              className={`rounded-xl border transition-all ${
                isSelected
                  ? "border-accent/30 bg-accent/5"
                  : "border-border bg-surface/50 hover:border-border/80"
              }`}
            >
              <div className="p-4 flex items-start gap-3">
                <button
                  onClick={() => toggleSelect(q)}
                  className={`mt-0.5 shrink-0 transition-colors ${
                    isSelected ? "text-accent" : "text-muted hover:text-dim"
                  }`}
                >
                  {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-muted text-[10px] font-mono">#{String(q.id).padStart(2, "0")}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${difficultyColor[q.difficulty]}`}>
                      {q.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-muted">
                      <Tag size={9} /> {q.category}
                    </span>
                  </div>

                  <p className="text-text text-sm font-medium leading-snug mb-2">
                    {q.question}
                  </p>

                  <button
                    onClick={() => setExpanded(isExpanded ? null : q.id)}
                    className="text-accent text-xs font-mono hover:text-accent/80 transition-colors"
                  >
                    {isExpanded ? "Hide answer ↑" : "View answer ↓"}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 space-y-2">
                      <div className="p-3 rounded-lg border border-accent3/20 bg-accent3/5">
                        <div className="text-[10px] font-mono text-accent3 mb-1">GROUND TRUTH</div>
                        <p className="text-sm text-text">{q.answer}</p>
                      </div>
                      <div className="p-3 rounded-lg border border-border bg-surface">
                        <div className="text-[10px] font-mono text-muted mb-1">EXPLANATION</div>
                        <p className="text-xs text-dim leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action bar */}
      {selectedQuestions.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-xl border border-accent/30 bg-bg/95 backdrop-blur shadow-2xl shadow-accent/10">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-accent" />
            <span className="text-sm font-mono text-text">
              <span className="text-accent font-bold">{selectedQuestions.length}</span> questions selected
            </span>
          </div>
          <Link
            href="/configure"
            className="flex items-center gap-2 px-4 py-1.5 bg-accent text-bg rounded-lg text-xs font-mono font-bold hover:bg-accent/90 transition-all"
          >
            Configure Experiment <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  );
}