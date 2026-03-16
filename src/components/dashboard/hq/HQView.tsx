'use client';

import { useEffect, useCallback } from 'react';
import KPIBar from './KPIBar';
import OfficeCanvas from './OfficeCanvas';
import AgentSidebar from './AgentSidebar';
import ActivityLog from './ActivityLog';
import AgentStatusBar from './AgentStatusBar';
import { useHQStore } from '@/stores/hq-store';
import { useHQData } from '@/hooks/useHQData';

const AGENT_KEYS = ['director', 'vendedor', 'creador', 'investigador', 'soporte', 'arquitecto', 'estratega', 'contador'];

export default function HQView() {
  const selectAgent = useHQStore(s => s.selectAgent);
  const agents = useHQStore(s => s.agents);
  const workingCount = agents.filter(a => a.status === 'working').length;

  useHQData();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.key === 'Escape') { selectAgent(null); return; }
    const num = parseInt(e.key);
    if (num >= 1 && num <= 8) selectAgent(AGENT_KEYS[num - 1]);
  }, [selectAgent]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col gap-5 h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[var(--theme-text)] tracking-tight">
            Agent HQ
            <span className="ml-2 text-[10px] font-medium text-[var(--theme-text-muted)] font-mono bg-[var(--theme-hover)] px-2 py-0.5 rounded-full">LIVE</span>
          </h1>
          <p className="text-sm text-[var(--theme-text-tertiary)] mt-1">Oficina virtual del equipo MBC</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-[10px] text-[var(--theme-text-muted)] font-mono">
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--theme-hover)] border border-[var(--theme-border)]">1</kbd>
            <span>-</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--theme-hover)] border border-[var(--theme-border)]">8</kbd>
            <span className="ml-1">seleccionar agente</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs text-emerald-700 font-semibold">{workingCount}/8 activos</span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="shrink-0"><KPIBar /></div>

      {/* Agent Status Bar */}
      <div className="shrink-0"><AgentStatusBar /></div>

      {/* Main area */}
      <div className="flex gap-5 flex-1 min-h-0">
        <div className="flex flex-col flex-1 min-w-0 gap-5">
          <OfficeCanvas />
          <div className="h-56 shrink-0 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm overflow-hidden">
            <ActivityLog />
          </div>
        </div>
        <div className="w-80 shrink-0 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm overflow-hidden">
          <AgentSidebar />
        </div>
      </div>
    </div>
  );
}
