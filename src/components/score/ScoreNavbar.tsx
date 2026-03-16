'use client';

import Link from 'next/link';
import { RotateCcw, BarChart3 } from 'lucide-react';
import { useScoreStore } from '@/lib/score/store';

export default function ScoreNavbar() {
  const { step, reset } = useScoreStore();
  const showReset = step !== 'input';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/score" className="flex items-center gap-2" onClick={reset}>
            <div className="w-7 h-7 rounded-lg bg-cyan/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-cyan" />
            </div>
            <span className="text-lg font-bold text-[var(--theme-text)]">Agent</span>
            <span className="text-lg font-bold text-cyan">Score</span>
            <span className="text-[10px] text-[var(--theme-text-tertiary)] ml-1 hidden sm:inline border border-[var(--theme-border)] px-1.5 py-0.5 rounded">
              v2.0
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {showReset && (
              <button
                onClick={reset}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-cyan hover:bg-surface-light/30 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Nuevo analisis</span>
              </button>
            )}
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-cyan transition-colors"
            >
              MetaBuild Agents
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
