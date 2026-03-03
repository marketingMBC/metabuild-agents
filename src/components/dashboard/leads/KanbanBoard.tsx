'use client';

import type { Lead, LeadStage } from '@/lib/types';
import { LEAD_STAGES } from '@/lib/constants';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export default function KanbanBoard({ leads, onLeadClick }: KanbanBoardProps) {
  const stages = Object.keys(LEAD_STAGES) as LeadStage[];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 kanban-scroll h-[calc(100vh-14rem)]">
      {stages.map((stage) => (
        <KanbanColumn
          key={stage}
          stage={stage}
          leads={leads.filter((l) => l.stage === stage)}
          onLeadClick={onLeadClick}
        />
      ))}
    </div>
  );
}
