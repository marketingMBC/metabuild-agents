'use client';

import { dashboardKPIs } from '@/lib/mock-data';
import StatCard from '../shared/StatCard';

export default function KPIGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {dashboardKPIs.map((kpi, i) => (
        <StatCard
          key={kpi.label}
          label={kpi.label}
          value={kpi.value}
          change={kpi.change}
          changeLabel={kpi.changeLabel}
          icon={kpi.icon}
          delay={i * 80}
        />
      ))}
    </div>
  );
}
