'use client';

import {
  Bot,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Globe,
  Shield,
  Clock,
  ArrowRight,
  ExternalLink,
  Zap,
  Search,
} from 'lucide-react';
import { useScoreStore } from '@/lib/score/store';

export default function ScanResults() {
  const { scanResult, setStep } = useScoreStore();

  if (!scanResult) return null;

  const checks = [
    {
      label: 'Chatbot o agente de IA detectado',
      passed: scanResult.chatbotDetected,
      detail: scanResult.technology || 'No detectado',
      icon: Bot,
    },
    {
      label: 'Tecnologia identificada',
      passed: !!scanResult.technology,
      detail: scanResult.technology
        ? `${scanResult.technology} (${scanResult.technologies[0]?.type || 'unknown'})`
        : 'Sin identificar',
      icon: Search,
    },
    {
      label: 'Widget visible y accesible',
      passed: scanResult.widgetVisible,
      detail: scanResult.widgetVisible ? 'Widget detectado' : 'No visible',
      icon: Globe,
    },
    {
      label: 'Conexion segura (HTTPS)',
      passed: scanResult.https,
      detail: scanResult.https ? 'HTTPS activo' : 'Sin HTTPS',
      icon: Shield,
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const detectionScore = Math.round((passedCount / checks.length) * 100);

  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-16">
      <div className="max-w-2xl w-full mx-auto px-4">
        {/* Site info */}
        <div className="flex items-center gap-3 mb-8">
          {scanResult.metadata.favicon && (
            <img
              src={scanResult.metadata.favicon}
              alt=""
              className="w-12 h-12 rounded-xl border border-[var(--theme-border)]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div>
            <h2 className="text-xl font-bold text-[var(--theme-text)]">{scanResult.metadata.title}</h2>
            <a
              href={scanResult.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cyan hover:underline inline-flex items-center gap-1"
            >
              {scanResult.metadata.domain}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Scan checks */}
        <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 mb-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-[var(--theme-text)] flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan" />
              Scan Automatico
            </h3>
            <span className="text-xs text-[var(--theme-text-secondary)] flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-light/30">
              <Clock className="w-3 h-3" />
              {scanResult.loadTime}ms
            </span>
          </div>

          <div className="space-y-2.5">
            {checks.map((check, i) => {
              const CheckIcon = check.icon;
              return (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-surface-light/15 hover:bg-surface-light/25 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {check.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-cyan shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                    <span className="text-sm text-[var(--theme-text)]">{check.label}</span>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      check.passed ? 'text-cyan' : 'text-red-400'
                    }`}
                  >
                    {check.detail}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between">
            <span className="text-sm text-[var(--theme-text-secondary)]">
              Score de deteccion
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-surface-light rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan rounded-full transition-all duration-1000"
                  style={{ width: `${detectionScore}%` }}
                />
              </div>
              <span className="text-lg font-bold text-cyan">{detectionScore}</span>
              <span className="text-xs text-[var(--theme-text-tertiary)]">/100</span>
            </div>
          </div>
        </div>

        {/* Technologies found */}
        {scanResult.technologies.length > 0 && (
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 mb-5">
            <h3 className="text-base font-semibold text-[var(--theme-text)] mb-3 flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan" />
              Tecnologias Encontradas ({scanResult.technologies.length})
            </h3>
            <div className="space-y-2">
              {scanResult.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-surface-light/15"
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
                      <span className="text-[10px] text-[var(--theme-text-tertiary)] ml-2 uppercase">{tech.type.replace('-', ' ')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-surface-light rounded-full overflow-hidden">
                      <div className="h-full bg-cyan rounded-full" style={{ width: `${tech.confidence}%` }} />
                    </div>
                    <span className="text-[10px] text-[var(--theme-text-tertiary)] w-8 text-right font-mono">{tech.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No chatbot message */}
        {!scanResult.chatbotDetected && (
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-6 mb-5 text-center">
            <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[var(--theme-text)] mb-2">
              No detectamos un chatbot en tu sitio
            </h3>
            <p className="text-sm text-[var(--theme-text-secondary)] mb-2">
              Puedes continuar con la evaluacion manual si tienes un chatbot no detectado,
              o ver directamente los resultados del scan.
            </p>
            <p className="text-xs text-amber-400/70">
              El 78% de consumidores prefieren empresas con chat en vivo
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setStep('evaluation')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan text-navy font-bold hover:bg-cyan-light transition-all glow-cyan group"
          >
            {scanResult.chatbotDetected
              ? 'Evaluar Chatbot'
              : 'Evaluar Manualmente'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => {
              const { calculateResults } = useScoreStore.getState();
              calculateResults();
              setStep('results');
            }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] hover:border-cyan/20 transition-all"
          >
            Ver solo resultados del scan
          </button>
        </div>
      </div>
    </div>
  );
}
