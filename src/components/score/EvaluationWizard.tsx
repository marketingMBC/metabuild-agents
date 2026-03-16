'use client';

import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CheckCircle2,
  Search,
  Zap,
  Brain,
  Sparkles,
  Shield,
  MessageSquare,
  Bot,
  Globe,
  ArrowRight,
  Target,
  Info,
} from 'lucide-react';
import { useScoreStore } from '@/lib/score/store';
import { EVAL_CATEGORIES } from '@/lib/score/categories';
import type { EvalQuestion } from '@/lib/score/types';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Search,
  Zap,
  Brain,
  Sparkles,
  Target,
  Shield,
};

const SCALE_OPTIONS = [
  { value: 1, label: 'Muy mal', emoji: '😞' },
  { value: 2, label: 'Mal', emoji: '😕' },
  { value: 3, label: 'Regular', emoji: '😐' },
  { value: 4, label: 'Bueno', emoji: '😊' },
  { value: 5, label: 'Excelente', emoji: '🤩' },
];

export default function EvaluationWizard() {
  const {
    scanResult,
    currentCategoryIndex,
    setCurrentCategoryIndex,
    answers,
    setAnswer,
    setStep,
    calculateResults,
  } = useScoreStore();

  // Skip detection category (index 0) — it's auto-scored
  const evalCategories = EVAL_CATEGORIES.filter((c) => c.id !== 'detection');
  const category = evalCategories[currentCategoryIndex];
  const Icon = CATEGORY_ICONS[category.icon] || Bot;

  const isLast = currentCategoryIndex === evalCategories.length - 1;
  const isFirst = currentCategoryIndex === 0;

  const manualQuestions = category.questions.filter((q) => q.type !== 'auto');
  const categoryAnswered = manualQuestions.filter((q) =>
    answers.some((a) => a.questionId === q.id)
  ).length;

  const handleFinish = () => {
    calculateResults();
    setStep('results');
  };

  const handleNext = () => {
    if (isLast) {
      handleFinish();
    } else {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const handleSkipAll = () => {
    handleFinish();
  };

  return (
    <div className="min-h-[80vh] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--theme-text)] mb-2">Evalua tu Agente de IA</h2>
          <p className="text-[var(--theme-text-secondary)] text-sm max-w-xl mx-auto">
            Interactua con el chatbot en{' '}
            <a
              href={scanResult?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              {scanResult?.metadata.domain}
            </a>{' '}
            y responde las preguntas. Usa los prompts de prueba para facilitar la evaluacion.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-[var(--theme-text-tertiary)] mb-2">
            <span>
              Dimension {currentCategoryIndex + 1} de {evalCategories.length}
            </span>
            <button
              onClick={handleSkipAll}
              className="text-gray-500 hover:text-cyan transition-colors"
            >
              Saltar y ver resultados
            </button>
          </div>
          <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan to-purple rounded-full transition-all duration-500"
              style={{
                width: `${((currentCategoryIndex + 1) / evalCategories.length) * 100}%`,
              }}
            />
          </div>
          {/* Category tabs */}
          <div className="flex gap-1.5 mt-3 overflow-x-auto pb-2">
            {evalCategories.map((cat, i) => {
              const CatIcon = CATEGORY_ICONS[cat.icon] || Bot;
              const answered = cat.questions.filter((q) => q.type !== 'auto').filter((q) =>
                answers.some((a) => a.questionId === q.id)
              ).length;
              const isActive = i === currentCategoryIndex;

              return (
                <button
                  key={cat.id}
                  onClick={() => setCurrentCategoryIndex(i)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-cyan/10 text-cyan border border-cyan/20'
                      : answered > 0
                      ? 'bg-surface-light/50 text-[var(--theme-text-secondary)] border border-transparent'
                      : 'text-[var(--theme-text-tertiary)] hover:bg-surface-light/30 border border-transparent'
                  }`}
                >
                  <CatIcon className="w-3.5 h-3.5" />
                  {cat.name}
                  {answered > 0 && !isActive && (
                    <CheckCircle2 className="w-3 h-3 text-cyan" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category card */}
        <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8">
          {/* Category header */}
          <div className="flex items-start gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-cyan/8 border border-cyan/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-cyan" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-[var(--theme-text)]">{category.name}</h3>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-[var(--theme-text-tertiary)]">
                  Peso: {category.weight}%
                </span>
              </div>
              <p className="text-xs text-[var(--theme-text-tertiary)] mt-0.5">
                {category.description}
              </p>
            </div>
          </div>

          {/* Benchmark hint */}
          <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-purple/5 border border-purple/10 mb-6">
            <Info className="w-4 h-4 text-purple-light shrink-0 mt-0.5" />
            <p className="text-[11px] text-purple-light/80 leading-relaxed">
              {category.benchmark.description}
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {manualQuestions.map((question, qi) => (
              <QuestionCard
                key={question.id}
                question={question}
                value={answers.find((a) => a.questionId === question.id)?.value}
                onChange={(v) => setAnswer(question.id, v)}
                index={qi + 1}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--theme-border)]">
            <button
              onClick={() => setCurrentCategoryIndex(currentCategoryIndex - 1)}
              disabled={isFirst}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] hover:bg-surface-light/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            <span className="text-xs text-[var(--theme-text-tertiary)]">
              {categoryAnswered}/{manualQuestions.length} respondidas
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-cyan text-navy hover:bg-cyan-light transition-all glow-cyan-sm group"
            >
              {isLast ? 'Ver Resultados' : 'Siguiente'}
              {isLast ? <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Chatbot link reminder */}
        <div className="mt-6 text-center">
          <a
            href={scanResult?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-light/20 border border-[var(--theme-border)] text-sm text-[var(--theme-text-secondary)] hover:text-cyan hover:border-cyan/20 transition-all"
          >
            <Globe className="w-4 h-4" />
            Abrir {scanResult?.metadata.domain} para probar el chatbot
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Question Card ──────────────────────────────────────

function QuestionCard({
  question,
  value,
  onChange,
  index,
}: {
  question: EvalQuestion;
  value?: number;
  onChange: (v: number) => void;
  index: number;
}) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    if (question.testPrompt) {
      await navigator.clipboard.writeText(question.testPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-start gap-2">
          <span className="text-[10px] font-bold text-[var(--theme-text-tertiary)] mt-0.5 shrink-0 w-5">
            {index}.
          </span>
          <div>
            <p className="text-sm font-medium text-[var(--theme-text)]">{question.text}</p>
            {question.description && (
              <p className="text-xs text-[var(--theme-text-tertiary)] mt-1 leading-relaxed">
                {question.description}
              </p>
            )}
            {question.metric && (
              <span className="inline-block text-[10px] font-medium text-purple-light/60 mt-1">
                Metrica: {question.metric}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Test prompt */}
      {question.testPrompt && (
        <button
          onClick={copyPrompt}
          className="flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl bg-purple/6 border border-purple/12 hover:border-purple/25 transition-all group ml-5"
          style={{ maxWidth: 'calc(100% - 20px)' }}
        >
          <MessageSquare className="w-4 h-4 text-purple-light/60 shrink-0" />
          <span className="text-xs text-purple-light/70 font-mono flex-1 truncate">
            {question.testPrompt}
          </span>
          {copied ? (
            <CheckCircle2 className="w-4 h-4 text-cyan shrink-0" />
          ) : (
            <Copy className="w-4 h-4 text-purple-light/30 group-hover:text-purple-light/60 shrink-0" />
          )}
        </button>
      )}

      {/* Answer input */}
      <div className="ml-5">
        {question.type === 'scale' ? (
          <div>
            <div className="flex items-center gap-1.5">
              {SCALE_OPTIONS.map(({ value: n, label, emoji }) => (
                <button
                  key={n}
                  onClick={() => onChange(n)}
                  title={label}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    value === n
                      ? 'bg-cyan text-white glow-cyan-sm scale-105'
                      : 'bg-surface-light/50 text-[var(--theme-text-secondary)] hover:bg-surface-light hover:text-[var(--theme-text)]'
                  }`}
                >
                  <span className="text-base leading-none">{emoji}</span>
                  <span className="text-[9px] leading-none">{n}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between px-1 mt-1.5">
              <span className="text-[10px] text-[var(--theme-text-tertiary)]">Muy mal</span>
              <span className="text-[10px] text-[var(--theme-text-tertiary)]">Regular</span>
              <span className="text-[10px] text-[var(--theme-text-tertiary)]">Excelente</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onChange(1)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                value === 1
                  ? 'bg-cyan text-navy glow-cyan-sm'
                  : 'bg-surface-light/30 text-[var(--theme-text-secondary)] hover:bg-surface-light/50 hover:text-[var(--theme-text)]'
              }`}
            >
              Si
            </button>
            <button
              onClick={() => onChange(0)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                value === 0
                  ? 'bg-red-500/80 text-white'
                  : 'bg-surface-light/30 text-[var(--theme-text-secondary)] hover:bg-surface-light/50 hover:text-[var(--theme-text)]'
              }`}
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
