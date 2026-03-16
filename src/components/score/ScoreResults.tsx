'use client';

import {
  Search,
  Zap,
  Brain,
  Sparkles,
  Shield,
  Bot,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Globe,
  Clock,
  Share2,
  Download,
  ExternalLink,
  Target,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Award,
} from 'lucide-react';
import ScoreGauge from './ScoreGauge';
import RadarChart from './RadarChart';
import { useScoreStore } from '@/lib/score/store';
import { EVAL_CATEGORIES, getGradeColor, getTierLabel, getTierColor, INDUSTRY_AVERAGES } from '@/lib/score/categories';
import type { CategoryId, Recommendation, ScoreInsight } from '@/lib/score/types';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Search,
  Zap,
  Brain,
  Sparkles,
  Target,
  Shield,
};

const PRIORITY_STYLES: Record<string, { bg: string; text: string; label: string; icon: React.ElementType }> = {
  critical: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'Critico', icon: AlertTriangle },
  high: { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'Alta', icon: TrendingUp },
  medium: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Media', icon: Lightbulb },
  low: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Baja', icon: CheckCircle2 },
};

export default function ScoreResults() {
  const { scoreResult, reset } = useScoreStore();

  if (!scoreResult) return null;

  const { overallScore, overallGrade, overallTier, categories, scan, recommendations, insights } = scoreResult;
  const tierColor = getTierColor(overallTier);

  const handleShare = async () => {
    const text = `Mi agente de IA en ${scan.metadata.domain} obtuvo ${overallScore}/100 (${getTierLabel(overallTier)}) en AgentScore. Evalua el tuyo gratis en`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'AgentScore', text, url: window.location.href });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* ── Header ──────────────────────────── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-light/50 text-xs text-[var(--theme-text-tertiary)] mb-6">
            <Clock className="w-3 h-3" />
            {new Date(scoreResult.timestamp).toLocaleDateString('es-CL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>

          {/* Site info */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {scan.metadata.favicon && (
              <img
                src={scan.metadata.favicon}
                alt=""
                className="w-10 h-10 rounded-xl border border-[var(--theme-border)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-[var(--theme-text)]">{scan.metadata.title}</h1>
              <a
                href={scan.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan hover:underline inline-flex items-center gap-1"
              >
                {scan.metadata.domain}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Main score + Tier */}
          <ScoreGauge score={overallScore} grade={overallGrade} size="lg" />

          <div
            className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ color: tierColor, backgroundColor: `${tierColor}15`, border: `1px solid ${tierColor}20` }}
          >
            <Award className="w-4 h-4" />
            {getTierLabel(overallTier)}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-light/30 text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] hover:bg-surface-light/50 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Compartir
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-light/30 text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] hover:bg-surface-light/50 transition-all"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-light/30 text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] hover:bg-surface-light/50 transition-all"
            >
              <Search className="w-4 h-4" />
              Nuevo Analisis
            </button>
          </div>
        </div>

        {/* ── Insights ──────────────────────────── */}
        {insights.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {insights.map((insight, i) => (
              <InsightCard key={i} insight={insight} />
            ))}
          </div>
        )}

        {/* ── Radar + Technology ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Radar Chart */}
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 flex flex-col items-center">
            <h2 className="text-base font-semibold text-[var(--theme-text)] mb-2 self-start flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan" />
              Mapa de Rendimiento
            </h2>
            <p className="text-xs text-[var(--theme-text-tertiary)] mb-4 self-start">
              Tu agente vs promedio de la industria
            </p>
            <RadarChart categories={categories} size={300} />
          </div>

          {/* Technology + Scan info */}
          <div className="space-y-4">
            {/* Technology detected */}
            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
              <h2 className="text-base font-semibold text-[var(--theme-text)] mb-4 flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan" />
                Tecnologia Detectada
              </h2>

              {scan.chatbotDetected ? (
                <div className="space-y-2.5">
                  {scan.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-surface-light/20"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            tech.type === 'ai-agent'
                              ? 'bg-cyan'
                              : tech.type === 'chatbot'
                              ? 'bg-purple'
                              : tech.type === 'voice-bot'
                              ? 'bg-amber-400'
                              : 'bg-blue-400'
                          }`}
                        />
                        <div>
                          <span className="text-sm font-medium text-[var(--theme-text)]">{tech.name}</span>
                          <span className="text-[10px] text-[var(--theme-text-tertiary)] ml-2 uppercase">
                            {tech.type.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-surface-light rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan rounded-full transition-all duration-1000"
                            style={{ width: `${tech.confidence}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[var(--theme-text-tertiary)] w-8 text-right font-mono">
                          {tech.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <p className="text-sm text-[var(--theme-text)] font-medium mb-1">Sin chatbot detectado</p>
                  <p className="text-xs text-[var(--theme-text-secondary)]">
                    El 78% de consumidores prefieren empresas con chat
                  </p>
                </div>
              )}
            </div>

            {/* Scan meta */}
            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--theme-text)]">{scan.loadTime}<span className="text-sm text-[var(--theme-text-tertiary)]">ms</span></div>
                  <div className="text-[10px] text-[var(--theme-text-tertiary)] mt-0.5">Tiempo carga</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--theme-text)]">{scan.technologies.length}</div>
                  <div className="text-[10px] text-[var(--theme-text-tertiary)] mt-0.5">Tech detectadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: scan.https ? '#29F8D4' : '#EF4444' }}>
                    {scan.https ? 'Si' : 'No'}
                  </div>
                  <div className="text-[10px] text-[var(--theme-text-tertiary)] mt-0.5">HTTPS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Category Breakdown ──────────────── */}
        <h2 className="text-lg font-semibold text-[var(--theme-text)] mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan" />
          Desglose por Categoria
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {categories.map((cat) => {
            const evalCat = EVAL_CATEGORIES.find((c) => c.id === cat.categoryId);
            if (!evalCat) return null;
            const Icon = CATEGORY_ICONS[evalCat.icon] || Bot;
            const color = getGradeColor(cat.grade);
            const industryAvg = INDUSTRY_AVERAGES[cat.categoryId];
            const diff = cat.score - industryAvg;
            const tierColor = getTierColor(cat.benchmark.tier);

            return (
              <div
                key={cat.categoryId}
                className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 hover:border-cyan/15 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-[var(--theme-text)]">{evalCat.name}</span>
                      <div className="text-[10px] text-[var(--theme-text-tertiary)]">Peso: {evalCat.weight}%</div>
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ color, backgroundColor: `${color}15` }}
                  >
                    {cat.grade}
                  </span>
                </div>

                {/* Score bar with industry comparison */}
                <div className="relative h-2 bg-surface-light rounded-full overflow-hidden mb-2">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${cat.score}%`, backgroundColor: color }}
                  />
                  {/* Industry average marker */}
                  <div
                    className="absolute top-0 h-full w-0.5 bg-white/30"
                    style={{ left: `${industryAvg}%` }}
                    title={`Promedio industria: ${industryAvg}`}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                      style={{ color: tierColor, backgroundColor: `${tierColor}12` }}
                    >
                      {getTierLabel(cat.benchmark.tier)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold" style={{ color }}>
                      {cat.score}
                    </span>
                    <span className="text-[10px] text-[var(--theme-text-tertiary)]">/100</span>
                    {diff !== 0 && (
                      <span className={`text-[10px] font-medium flex items-center gap-0.5 ${diff > 0 ? 'text-cyan' : 'text-red-400'}`}>
                        {diff > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {diff > 0 ? '+' : ''}{diff}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Recommendations ──────────────── */}
        {recommendations.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-[var(--theme-text)] mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              Recomendaciones Priorizadas
            </h2>
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <RecommendationCard key={i} recommendation={rec} index={i + 1} />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ──────────────────────────── */}
        <div className="rounded-3xl border border-cyan/15 bg-gradient-to-br from-cyan/[0.03] to-purple/[0.03] p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan/8 border border-cyan/10 flex items-center justify-center mx-auto mb-5">
            <Bot className="w-8 h-8 text-cyan" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--theme-text)] mb-3">
            {overallScore >= 80
              ? '¡Tu agente esta en buen camino!'
              : overallScore >= 50
              ? 'Tu agente tiene potencial real de mejora'
              : scan.chatbotDetected
              ? 'Tu agente necesita atencion urgente'
              : '¿Aun sin chatbot? Es momento de implementar uno'}
          </h3>
          <p className="text-sm text-[var(--theme-text-secondary)] max-w-lg mx-auto mb-8 leading-relaxed">
            {scan.chatbotDetected
              ? 'En MetaBuild Agents creamos agentes de IA multicanal de alta calidad. Podemos ayudarte a optimizar tu agente actual o crear uno desde cero que impresione a tus clientes.'
              : 'En MetaBuild Agents diseñamos y desplegamos agentes de IA multicanal en WhatsApp, Instagram, Web y mas. Convierte visitantes en clientes con IA conversacional de primer nivel.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan text-navy font-bold hover:bg-cyan-light transition-all glow-cyan group"
            >
              Hablar con un experto
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="/platform"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] hover:border-cyan/20 transition-all"
            >
              <Globe className="w-4 h-4" />
              Ver plataforma
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Insight Card ──────────────────────────────────────

function InsightCard({ insight }: { insight: ScoreInsight }) {
  const config = {
    strength: { icon: TrendingUp, color: '#29F8D4', bg: 'bg-cyan/8', border: 'border-cyan/15' },
    weakness: { icon: TrendingDown, color: '#EF4444', bg: 'bg-red-500/8', border: 'border-red-500/15' },
    opportunity: { icon: Lightbulb, color: '#F59E0B', bg: 'bg-amber-500/8', border: 'border-amber-500/15' },
  }[insight.type];

  const Icon = config.icon;

  return (
    <div className={`rounded-xl border ${config.border} ${config.bg} p-4`}>
      <div className="flex items-start gap-3">
        <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: config.color }} />
        <div>
          <h4 className="text-sm font-medium text-[var(--theme-text)] mb-1">{insight.title}</h4>
          <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">{insight.description}</p>
        </div>
      </div>
    </div>
  );
}

// ── Recommendation Card ──────────────────────────────

function RecommendationCard({ recommendation, index }: { recommendation: Recommendation; index: number }) {
  const style = PRIORITY_STYLES[recommendation.priority];
  const evalCat = EVAL_CATEGORIES.find((c) => c.id === recommendation.category);
  const Icon = evalCat ? CATEGORY_ICONS[evalCat.icon] || Bot : Bot;
  const PriorityIcon = style.icon;

  return (
    <div className="flex items-start gap-4 px-5 py-5 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-cyan/10 transition-all group">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-bold text-[var(--theme-text-tertiary)]">#{index}</span>
        <div className="w-10 h-10 rounded-xl bg-surface-light/30 flex items-center justify-center">
          <Icon className="w-5 h-5 text-cyan" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <h4 className="text-sm font-semibold text-[var(--theme-text)]">{recommendation.title}</h4>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text} flex items-center gap-1`}>
            <PriorityIcon className="w-3 h-3" />
            {style.label}
          </span>
        </div>
        <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed mb-2">
          {recommendation.description}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-cyan font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Impacto: {recommendation.impact}
          </span>
          <span className="text-[10px] text-[var(--theme-text-tertiary)]">
            Esfuerzo: {recommendation.effort === 'low' ? 'Bajo' : recommendation.effort === 'medium' ? 'Medio' : 'Alto'}
          </span>
        </div>
      </div>
    </div>
  );
}
