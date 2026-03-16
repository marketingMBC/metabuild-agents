'use client';

import { useHQStore } from '@/stores/hq-store';
import { Users, CheckCircle, TrendingUp, DollarSign, Activity } from 'lucide-react';

const KPIS = [
  { key: 'agentsActive' as const, label: 'Agentes Activos', icon: Users, color: '#10B981', suffix: '/8' },
  { key: 'tasksToday' as const, label: 'Tareas Hoy', icon: CheckCircle, color: '#3B82F6', suffix: '' },
  { key: 'pipelineValue' as const, label: 'Pipeline', icon: TrendingUp, color: '#8B5CF6', suffix: '' },
  { key: 'mrr' as const, label: 'MRR', icon: DollarSign, color: '#F59E0B', suffix: '' },
];

export default function KPIBar() {
  const kpis = useHQStore(s => s.kpis);
  const agents = useHQStore(s => s.agents);

  const statusCounts = agents.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
      {KPIS.map(kpi => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.key} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-sm shrink-0 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${kpi.color}20` }}>
              <Icon size={18} style={{ color: kpi.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-white truncate">
                {kpis[kpi.key]}
                {kpi.suffix && <span className="text-xs text-white/40 font-normal">{kpi.suffix}</span>}
              </p>
              <p className="text-[10px] text-white/50 font-medium uppercase tracking-wider truncate">{kpi.label}</p>
            </div>
          </div>
        );
      })}

      {/* Status distribution */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-sm shrink-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.06]">
          <Activity size={18} className="text-white/50" />
        </div>
        <div className="flex items-center gap-3">
          {[
            { key: 'working', color: '#22C55E', label: 'W' },
            { key: 'meeting', color: '#F59E0B', label: 'M' },
            { key: 'break', color: '#3B82F6', label: 'B' },
            { key: 'idle', color: '#9CA3AF', label: 'I' },
          ].map(s => (
            <div key={s.key} className="text-center">
              <p className="text-sm font-bold" style={{ color: s.color }}>{statusCounts[s.key] || 0}</p>
              <p className="text-[8px] text-white/40 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
