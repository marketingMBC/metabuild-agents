'use client';

import type { Lead, LeadStage } from '@/lib/types';
import { LEAD_STAGES } from '@/lib/constants';
import LeadCard from './LeadCard';

interface KanbanColumnProps {
  stage: LeadStage;
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export default function KanbanColumn({ stage, leads, onLeadClick }: KanbanColumnProps) {
  const config = LEAD_STAGES[stage];

  return (
    <div className="flex-shrink-0 w-72 flex flex-col max-h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.color }} />
          <h3 className="text-sm font-semibold text-white">{config.label}</h3>
          <span className="text-[11px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded-full">
            {leads.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} onClick={() => onLeadClick(lead)} />
        ))}
        {leads.length === 0 && (
          <div className="rounded-lg border border-dashed border-white/10 p-6 text-center">
            <p className="text-xs text-white/30">Sin leads en esta etapa</p>
          </div>
        )}
      </div>
    </div>
  );
}
