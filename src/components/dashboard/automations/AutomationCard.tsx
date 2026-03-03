'use client';

import Link from 'next/link';
import { Workflow } from 'lucide-react';
import type { Automation } from '@/lib/types';
import { AUTOMATION_CATEGORIES } from '@/lib/constants';
import { formatRelativeTime, formatNumber } from '@/lib/utils';

interface AutomationCardProps {
  automation: Automation;
  onToggle: (id: string) => void;
  onSelect: (automation: Automation) => void;
}

export default function AutomationCard({ automation, onToggle, onSelect }: AutomationCardProps) {
  const category = AUTOMATION_CATEGORIES[automation.category];

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5 hover:border-cyan/15 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelect(automation)}>
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}15` }}>
            <span className="text-sm" style={{ color: category.color }}>
              {automation.category === 'bienvenida' && '👋'}
              {automation.category === 'seguimiento' && '🔄'}
              {automation.category === 'escalacion' && '⚠️'}
              {automation.category === 'scoring' && '⭐'}
              {automation.category === 'notificacion' && '🔔'}
              {automation.category === 'recordatorio' && '📅'}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{automation.name}</h3>
            <span className="text-[10px] font-medium" style={{ color: category.color }}>
              {category.label}
            </span>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(automation.id); }}
          className={`relative w-10 h-5 rounded-full transition-colors ${
            automation.enabled ? 'bg-cyan/30' : 'bg-white/10'
          }`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
              automation.enabled ? 'left-5.5 bg-cyan' : 'left-0.5 bg-white/40'
            }`}
            style={{ left: automation.enabled ? '22px' : '2px' }}
          />
        </button>
      </div>

      <p className="text-xs text-white/40 line-clamp-2 mb-3">{automation.description}</p>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-3 text-[11px] text-white/30">
          <span>{formatNumber(automation.executionsTotal)} ejecuciones</span>
          <span>·</span>
          <span>{automation.successRate}% éxito</span>
        </div>
        <Link
          href={`/dashboard/automations/${automation.id}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-[10px] text-cyan/60 hover:text-cyan transition-colors"
        >
          <Workflow size={12} />
          Flow Builder
        </Link>
      </div>
    </div>
  );
}
