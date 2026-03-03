'use client';

import { useState } from 'react';
import { automations as allAutomations } from '@/lib/mock-data';
import type { Automation, AutomationCategory } from '@/lib/types';
import AutomationCard from '@/components/dashboard/automations/AutomationCard';
import AutomationFlowPreview from '@/components/dashboard/automations/AutomationFlowPreview';
import AutomationCategoryFilter from '@/components/dashboard/automations/AutomationCategoryFilter';

export default function AutomationsPage() {
  const [automations, setAutomations] = useState(allAutomations);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selected, setSelected] = useState<Automation | null>(null);

  const filtered = automations.filter(
    (a) => categoryFilter === 'all' || a.category === categoryFilter
  );

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Automatizaciones</h1>
        <p className="text-sm text-white/50 mt-1">
          {automations.filter((a) => a.enabled).length} de {automations.length} activas
        </p>
      </div>

      <AutomationCategoryFilter active={categoryFilter} onChange={setCategoryFilter} />

      {selected && (
        <AutomationFlowPreview automation={selected} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((auto) => (
          <AutomationCard
            key={auto.id}
            automation={auto}
            onToggle={toggleAutomation}
            onSelect={setSelected}
          />
        ))}
      </div>
    </div>
  );
}
