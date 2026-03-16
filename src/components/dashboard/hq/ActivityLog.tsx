'use client';

import { useState } from 'react';
import { useHQStore } from '@/stores/hq-store';

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const secs = Math.floor(diff / 1000);
  if (secs < 10) return 'ahora';
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h`;
}

export default function ActivityLog() {
  const activities = useHQStore(s => s.activities);
  const agents = useHQStore(s => s.agents);
  const selectAgent = useHQStore(s => s.selectAgent);
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? activities.filter(a => a.agentId === filter) : activities;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">Actividad</h3>
          {filter && (
            <button onClick={() => setFilter(null)} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.08] text-white/50 hover:bg-white/[0.12]">
              x limpiar
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {agents.map(a => (
            <button
              key={a.id}
              onClick={() => setFilter(filter === a.id ? null : a.id)}
              className="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-bold transition-all hover:scale-125 shadow-sm"
              style={{
                backgroundColor: filter === a.id ? a.color : `${a.color}20`,
                color: filter === a.id ? '#FFF' : a.color,
                border: filter === a.id ? `1px solid ${a.color}` : '1px solid transparent',
              }}
              title={a.name}
            >
              {a.initial}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {filtered.slice(0, 25).map((activity, idx) => (
          <button
            key={activity.id}
            onClick={() => selectAgent(activity.agentId)}
            className="flex items-center gap-2.5 w-full text-left py-2 px-2.5 rounded-lg hover:bg-white/[0.06] transition-colors group"
          >
            <div className="flex flex-col items-center gap-0.5 shrink-0">
              <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: activity.agentColor }} />
              {idx < filtered.length - 1 && <span className="w-px h-4 bg-white/[0.08]" />}
            </div>
            <span
              className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold shrink-0 transition-transform group-hover:scale-110 shadow-sm"
              style={{ backgroundColor: `${activity.agentColor}20`, color: activity.agentColor }}
            >
              {activity.agentName[0]}
            </span>
            <div className="flex-1 min-w-0">
              <span className="text-xs text-white/60 truncate block">
                <span className="font-semibold text-white/90">{activity.agentName}</span>
                <span className="text-white/55"> · {activity.action}</span>
              </span>
            </div>
            <span className="text-[9px] text-white/35 font-mono shrink-0">{timeAgo(activity.timestamp)}</span>
          </button>
        ))}
        {filtered.length === 0 && <p className="text-xs text-white/30 text-center py-6">Sin actividad</p>}
      </div>
    </div>
  );
}
