'use client';

import { agents } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';
import StatusBadge from '../shared/StatusBadge';
import Avatar from '../shared/Avatar';

export default function AgentPerformanceTable() {
  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Rendimiento de agentes</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[11px] text-white/30 uppercase tracking-wider border-b border-white/5">
              <th className="text-left pb-3 font-medium">Agente</th>
              <th className="text-center pb-3 font-medium">Estado</th>
              <th className="text-right pb-3 font-medium">Conv. hoy</th>
              <th className="text-right pb-3 font-medium">Conv. total</th>
              <th className="text-right pb-3 font-medium">Tiempo resp.</th>
              <th className="text-right pb-3 font-medium">Satisfacción</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={agent.name} emoji={agent.avatar} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-white">{agent.name}</p>
                      <p className="text-[10px] text-white/30">{agent.type}</p>
                    </div>
                  </div>
                </td>
                <td className="text-center py-3">
                  <StatusBadge status={agent.status} />
                </td>
                <td className="text-right py-3 text-sm text-white/70">{agent.conversationsToday}</td>
                <td className="text-right py-3 text-sm text-white/70">{formatNumber(agent.conversationsTotal)}</td>
                <td className="text-right py-3 text-sm text-white/70">{agent.responseTime}</td>
                <td className="text-right py-3">
                  <span className="text-sm font-medium text-cyan">{agent.satisfactionRate}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
