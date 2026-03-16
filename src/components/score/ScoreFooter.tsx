'use client';

import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

export default function ScoreFooter() {
  return (
    <footer className="border-t border-[var(--theme-border)] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan" />
            <span className="text-sm text-[var(--theme-text-secondary)]">
              AgentScore v2.0 by{' '}
              <Link href="/" className="text-cyan hover:underline">
                MetaBuild Agents
              </Link>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-[var(--theme-text-tertiary)]">
            <span>Metodologia basada en</span>
            <span className="text-purple-light">RAGAS</span>
            <span>&middot;</span>
            <span className="text-purple-light">DeepEval</span>
            <span>&middot;</span>
            <span className="text-purple-light">IEEE 3128</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/platform"
              className="text-xs text-[var(--theme-text-tertiary)] hover:text-cyan transition-colors"
            >
              Plataforma
            </Link>
            <Link
              href="/pricing"
              className="text-xs text-[var(--theme-text-tertiary)] hover:text-cyan transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-xs text-[var(--theme-text-tertiary)] hover:text-cyan transition-colors"
            >
              Contacto
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[var(--theme-border)] text-center">
          <p className="text-[10px] text-[var(--theme-text-tertiary)]">
            Herramienta gratuita y de libre acceso. Los benchmarks estan basados en datos publicos de la industria 2025-2026.
          </p>
        </div>
      </div>
    </footer>
  );
}
