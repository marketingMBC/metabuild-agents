'use client';

import type { Automation } from '@/lib/types';
import { AUTOMATION_CATEGORIES } from '@/lib/constants';

interface AutomationFlowPreviewProps {
  automation: Automation;
}

const nodeColors: Record<string, string> = {
  trigger: '#FBBF24',
  condition: '#60A5FA',
  action: '#29F8D4',
};

export default function AutomationFlowPreview({ automation }: AutomationFlowPreviewProps) {
  const category = AUTOMATION_CATEGORIES[automation.category];

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold text-white">{automation.name}</h3>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${category.color}15`, color: category.color }}
        >
          {category.label}
        </span>
      </div>

      <p className="text-xs text-white/40 mb-5">{automation.description}</p>

      {/* Flow nodes */}
      <div className="flex items-center gap-0 overflow-x-auto pb-2">
        {automation.nodes.map((node, i) => {
          const color = nodeColors[node.type];
          return (
            <div key={node.id} className="flex items-center">
              <div
                className="flex-shrink-0 rounded-lg p-3 min-w-[140px]"
                style={{
                  backgroundColor: `${color}10`,
                  border: `1px solid ${color}30`,
                }}
              >
                <span
                  className="text-[9px] uppercase font-bold tracking-wider"
                  style={{ color }}
                >
                  {node.type === 'trigger' ? 'Trigger' : node.type === 'condition' ? 'Condición' : 'Acción'}
                </span>
                <p className="text-xs font-medium text-white mt-1">{node.label}</p>
                <p className="text-[10px] text-white/40 mt-0.5">{node.description}</p>
              </div>
              {i < automation.nodes.length - 1 && (
                <div className="flex-shrink-0 w-6 flex items-center justify-center">
                  <svg width="24" height="12" viewBox="0 0 24 12">
                    <path d="M0 6 L18 6 L14 2 M18 6 L14 10" fill="none" stroke="rgba(41,248,212,0.3)" strokeWidth="1.5" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5 text-[11px] text-white/30">
        <span>{automation.executionsToday} ejecuciones hoy</span>
        <span>·</span>
        <span>{automation.executionsTotal} total</span>
        <span>·</span>
        <span>{automation.successRate}% éxito</span>
      </div>
    </div>
  );
}
