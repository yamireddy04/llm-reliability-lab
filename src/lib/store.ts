import { create } from "zustand";
import { ExperimentConfig, ExperimentResult, MedicalQuestion } from "./data";

interface AppStore {
  // Experiment config
  config: ExperimentConfig;
  setConfig: (config: Partial<ExperimentConfig>) => void;

  // Selected questions
  selectedQuestions: MedicalQuestion[];
  setSelectedQuestions: (questions: MedicalQuestion[]) => void;

  // Results
  results: ExperimentResult[];
  setResults: (results: ExperimentResult[]) => void;
  addResult: (result: ExperimentResult) => void;
  clearResults: () => void;

  // Experiment state
  isRunning: boolean;
  setIsRunning: (v: boolean) => void;
  progress: number;
  setProgress: (v: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  config: {
    model: "claude-sonnet",
    promptStrategy: "zero-shot",
    sampleCount: 5,
    customPrompt: "",
  },
  setConfig: (config) =>
    set((state) => ({ config: { ...state.config, ...config } })),

  selectedQuestions: [],
  setSelectedQuestions: (questions) => set({ selectedQuestions: questions }),

  results: [],
  setResults: (results) => set({ results }),
  addResult: (result) =>
    set((state) => ({ results: [...state.results, result] })),
  clearResults: () => set({ results: [] }),

  isRunning: false,
  setIsRunning: (isRunning) => set({ isRunning }),
  progress: 0,
  setProgress: (progress) => set({ progress }),
}));