'use client';

import { useHQStore } from '@/stores/hq-store';

const STATUS_TEXT: Record<string, string> = {
  working: 'ON', idle: 'IDLE', meeting: 'MTG', break: 'BRK',
};

const STATUS_COLOR: Record<string, string> = {
  working: '#22C55E', idle: '#9CA3AF', meeting: '#F59E0B', break: '#3B82F6',
};

export default function AgentStatusBar() {
  const agents = useHQStore(s => s.agents);
  const selectedAgentId = useHQStore(s => s.selectedAgentId);
  const selectAgent = useHQStore(s => s.selectAgent);

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {agents.map((agent, idx) => {
        const isSel = agent.id === selectedAgentId;
        return (
          <button
            key={agent.id}
            onClick={() => selectAgent(agent.id)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all shrink-0 group hover:shadow-md"
            style={{
              backgroundColor: isSel ? `${agent.color}15` : 'rgba(255,255,255,0.03)',
              borderColor: isSel ? `${agent.color}40` : 'rgba(255,255,255,0.08)',
            }}
          >
            <span className="text-[9px] text-white/30 font-mono w-3 shrink-0">{idx + 1}</span>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold transition-transform group-hover:scale-110 shadow-sm"
              style={{ backgroundColor: `${agent.color}25`, color: agent.color }}
            >
              {agent.initial}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-white/80">{agent.name}</span>
                <span className="text-[8px] font-bold px-1 py-0.5 rounded" style={{ color: STATUS_COLOR[agent.status], backgroundColor: `${STATUS_COLOR[agent.status]}20` }}>
                  {STATUS_TEXT[agent.status]}
                </span>
              </div>
              <p className="text-[9px] text-white/40 font-mono truncate max-w-[100px]">{agent.currentTask}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
