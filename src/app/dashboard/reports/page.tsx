'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { activityData } from '@/lib/mock-data';
import ReportKPISummary from '@/components/dashboard/reports/ReportKPISummary';
import BarChart from '@/components/dashboard/reports/BarChart';
import LineChart from '@/components/dashboard/reports/LineChart';
import ConversionFunnel from '@/components/dashboard/reports/ConversionFunnel';
import PeakHoursGrid from '@/components/dashboard/reports/PeakHoursGrid';
import AgentPerformanceTable from '@/components/dashboard/reports/AgentPerformanceTable';
import ChannelAnalytics from '@/components/dashboard/reports/ChannelAnalytics';
import AgentComparison from '@/components/dashboard/reports/AgentComparison';
import DateRangePicker from '@/components/dashboard/shared/DateRangePicker';
import Button from '@/components/ui/Button';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    // Simulate export
    await new Promise((r) => setTimeout(r, 1500));
    setExporting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reportes</h1>
          <p className="text-sm text-white/50 mt-1">Métricas y análisis de rendimiento</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleExport} loading={exporting} icon={<Download size={14} />}>
            Exportar
          </Button>
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>
      </div>

      <ReportKPISummary />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          title="Conversaciones por día"
          labels={activityData.labels}
          values={activityData.conversations}
          color="#29F8D4"
        />
        <LineChart
          title="Leads capturados"
          labels={activityData.labels}
          values={activityData.leads}
          color="#A78BFA"
        />
      </div>

      <ChannelAnalytics />

      <ConversionFunnel />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PeakHoursGrid />
        <AgentComparison />
      </div>

      <AgentPerformanceTable />
    </div>
  );
}
