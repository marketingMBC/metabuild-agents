'use client';

import { agents } from '@/lib/mock-data';

export default function AgentComparison() {
  const sortedAgents = [...agents].sort((a, b) => b.satisfactionRate - a.satisfactionRate);
  const maxConversations = Math.max(...agents.map((a) => a.conversationsTotal));

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Comparación de Agentes</h3>
      <div className="space-y-4">
        {sortedAgents.map((agent) => {
          const barWidth = (agent.conversationsTotal / maxConversations) * 100;
          return (
            <div key={agent.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{agent.avatar}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{agent.name}</p>
                    <p className="text-[10px] text-white/40">{agent.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-cyan">{agent.satisfactionRate}%</p>
                  <p className="text-[10px] text-white/40">{agent.conversationsTotal.toLocaleString('es-CL')} conv.</p>
                </div>
              </div>
              <div className="flex gap-1 h-2">
                <div
                  className="rounded-full bg-cyan/60 transition-all duration-700"
                  style={{ width: `${barWidth}%` }}
                  title="Conversaciones"
                />
                <div
                  className="rounded-full bg-purple/60 transition-all duration-700"
                  style={{ width: `${agent.satisfactionRate}%` }}
                  title="Satisfacción"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-1.5 rounded-full bg-cyan/60" />
          <span className="text-[10px] text-white/40">Conversaciones</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-1.5 rounded-full bg-purple/60" />
          <span className="text-[10px] text-white/40">Satisfacción</span>
        </div>
      </div>
    </div>
  );
}
