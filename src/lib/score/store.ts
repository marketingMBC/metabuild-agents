import { create } from 'zustand';
import type {
  ScanResult,
  EvalAnswer,
  ScoreResult,
  CategoryScore,
  WizardStep,
} from './types';
import {
  EVAL_CATEGORIES,
  calculateCategoryScore,
  calculateDetectionScore,
  calculateOverallScore,
  getGrade,
  getTier,
  generateRecommendations,
  generateInsights,
  getBenchmarkComparison,
} from './categories';

interface ScoreState {
  // Wizard
  step: WizardStep;
  setStep: (step: WizardStep) => void;

  // URL
  url: string;
  setUrl: (url: string) => void;

  // Scan
  scanResult: ScanResult | null;
  setScanResult: (result: ScanResult) => void;
  isScanning: boolean;
  setIsScanning: (v: boolean) => void;
  scanError: string | null;
  setScanError: (e: string | null) => void;

  // Evaluation
  currentCategoryIndex: number;
  setCurrentCategoryIndex: (i: number) => void;
  answers: EvalAnswer[];
  setAnswer: (questionId: string, value: number) => void;

  // Results
  scoreResult: ScoreResult | null;
  calculateResults: () => void;

  // Reset
  reset: () => void;
}

export const useScoreStore = create<ScoreState>((set, get) => ({
  step: 'input',
  setStep: (step) => set({ step }),

  url: '',
  setUrl: (url) => set({ url }),

  scanResult: null,
  setScanResult: (result) => set({ scanResult: result }),
  isScanning: false,
  setIsScanning: (v) => set({ isScanning: v }),
  scanError: null,
  setScanError: (e) => set({ scanError: e }),

  currentCategoryIndex: 0,
  setCurrentCategoryIndex: (i) => set({ currentCategoryIndex: i }),
  answers: [],
  setAnswer: (questionId, value) =>
    set((state) => {
      const existing = state.answers.findIndex((a) => a.questionId === questionId);
      const newAnswers = [...state.answers];
      if (existing >= 0) {
        newAnswers[existing] = { questionId, value };
      } else {
        newAnswers.push({ questionId, value });
      }
      return { answers: newAnswers };
    }),

  scoreResult: null,
  calculateResults: () => {
    const { scanResult, answers } = get();
    if (!scanResult) return;

    const categoryScores: CategoryScore[] = EVAL_CATEGORIES.map((cat) => {
      let score: number;

      if (cat.id === 'detection') {
        score = calculateDetectionScore(scanResult);
      } else {
        score = calculateCategoryScore(cat, answers);
      }

      const benchmark = getBenchmarkComparison(cat.id, score);

      return {
        categoryId: cat.id,
        score,
        maxScore: 100,
        answers: answers.filter((a) =>
          cat.questions.some((q) => q.id === a.questionId)
        ),
        grade: getGrade(score),
        benchmark,
      };
    });

    const overallScore = calculateOverallScore(categoryScores);
    const recommendations = generateRecommendations(categoryScores);
    const insights = generateInsights(categoryScores, scanResult);

    set({
      scoreResult: {
        overallScore,
        overallGrade: getGrade(overallScore),
        overallTier: getTier(overallScore),
        categories: categoryScores,
        scan: scanResult,
        recommendations,
        insights,
        timestamp: new Date().toISOString(),
      },
    });
  },

  reset: () =>
    set({
      step: 'input',
      url: '',
      scanResult: null,
      isScanning: false,
      scanError: null,
      currentCategoryIndex: 0,
      answers: [],
      scoreResult: null,
    }),
}));
