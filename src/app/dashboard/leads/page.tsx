'use client';

import { useState } from 'react';
import { leads } from '@/lib/mock-data';
import type { Lead } from '@/lib/types';
import KanbanBoard from '@/components/dashboard/leads/KanbanBoard';
import LeadDetailDrawer from '@/components/dashboard/leads/LeadDetailDrawer';

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="text-sm text-white/50 mt-1">Pipeline de ventas — {leads.length} leads totales</p>
      </div>

      <KanbanBoard leads={leads} onLeadClick={setSelectedLead} />

      <LeadDetailDrawer
        lead={selectedLead}
        open={selectedLead !== null}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}
