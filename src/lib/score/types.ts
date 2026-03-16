// ── AgentScore Types ──────────────────────────────────────
// Aligned with industry standards: RAGAS, DeepEval, IEEE 3128-2025

export interface ScanResult {
  url: string;
  chatbotDetected: boolean;
  technology: string | null;
  technologies: DetectedTechnology[];
  widgetVisible: boolean;
  https: boolean;
  loadTime: number | null;
  screenshot?: string;
  metadata: SiteMetadata;
}

export interface DetectedTechnology {
  name: string;
  confidence: number; // 0-100
  type: 'chatbot' | 'livechat' | 'ai-agent' | 'form-bot' | 'voice-bot' | 'unknown';
  description: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  favicon: string | null;
  domain: string;
}

// ── Evaluation Categories ──────────────────────────────────

export type CategoryId =
  | 'detection'
  | 'speed'
  | 'quality'
  | 'ux'
  | 'effectiveness'
  | 'trust';

export interface EvalCategory {
  id: CategoryId;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  weight: number; // percentage weight for overall score
  questions: EvalQuestion[];
  benchmark: CategoryBenchmark;
}

export interface EvalQuestion {
  id: string;
  text: string;
  description?: string;
  type: 'scale' | 'boolean' | 'auto';
  testPrompt?: string; // prompt to test against the chatbot
  metric?: string; // industry metric this maps to
}

export interface EvalAnswer {
  questionId: string;
  value: number; // 0-5 for scale, 0 or 1 for boolean
}

// ── Industry Benchmarks ──────────────────────────────────

export type BenchmarkTier = 'elite' | 'good' | 'acceptable' | 'needs-work';

export interface CategoryBenchmark {
  elite: number;    // 90+
  good: number;     // 70-89
  acceptable: number; // 50-69
  description: string; // What this benchmark means
}

export interface BenchmarkComparison {
  categoryId: CategoryId;
  score: number;
  tier: BenchmarkTier;
  industryAverage: number;
  percentile: number; // estimated percentile vs industry
}

// ── Score Results ──────────────────────────────────────────

export interface CategoryScore {
  categoryId: CategoryId;
  score: number; // 0-100
  maxScore: number;
  answers: EvalAnswer[];
  grade: Grade;
  benchmark: BenchmarkComparison;
}

export type Grade = 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';

export interface ScoreResult {
  overallScore: number; // 0-100
  overallGrade: Grade;
  overallTier: BenchmarkTier;
  categories: CategoryScore[];
  scan: ScanResult;
  recommendations: Recommendation[];
  insights: ScoreInsight[];
  timestamp: string;
  shareId?: string;
}

export interface Recommendation {
  category: CategoryId;
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string; // Expected impact of fixing this
  effort: 'low' | 'medium' | 'high'; // Effort to implement
}

export interface ScoreInsight {
  type: 'strength' | 'weakness' | 'opportunity';
  title: string;
  description: string;
  metric?: string;
}

// ── Wizard State ──────────────────────────────────────────

export type WizardStep = 'input' | 'scanning' | 'scan-results' | 'evaluation' | 'results';
