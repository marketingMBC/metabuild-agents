'use client';

import { useHQStore } from '@/stores/hq-store';

const STATUS_EMOJI: Record<string, string> = {
  working: '⚡', idle: '💤', meeting: '🤝', break: '☕',
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
              backgroundColor: isSel ? `${agent.color}12` : 'var(--theme-surface)',
              borderColor: isSel ? `${agent.color}40` : 'var(--theme-border)',
            }}
          >
            <span className="text-[9px] text-[var(--theme-text-muted)] font-mono w-3 shrink-0">{idx + 1}</span>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold transition-transform group-hover:scale-110 shadow-sm"
              style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
            >
              {agent.initial}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[var(--theme-text-secondary)]">{agent.name}</span>
                <span className="text-[10px]">{STATUS_EMOJI[agent.status]}</span>
              </div>
              <p className="text-[9px] text-[var(--theme-text-muted)] font-mono truncate max-w-[100px]">{agent.currentTask}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
