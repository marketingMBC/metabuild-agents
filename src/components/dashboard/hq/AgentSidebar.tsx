'use client';

import { useHQStore } from '@/stores/hq-store';
import { AGENT_SKILLS } from '@/lib/hq/constants';
import { X, MapPin, Briefcase, Zap, Clock } from 'lucide-react';

const STATUS_LABELS: Record<string, string> = { working: 'Trabajando', idle: 'Idle', meeting: 'En reunión', break: 'En break' };
const STATUS_COLORS: Record<string, string> = { working: '#22C55E', idle: '#9CA3AF', meeting: '#F59E0B', break: '#3B82F6' };
const STATUS_BG: Record<string, string> = { working: '#F0FDF4', idle: '#F9FAFB', meeting: '#FFFBEB', break: '#EFF6FF' };
const ROOM_LABELS: Record<string, string> = {
  'dev-room': 'Dev Room', 'meeting-room': 'Meeting Room', 'research-lab': 'Research Lab',
  'finance-corner': 'Finance', 'creative-lab': 'Creative Lab', 'central': 'Central',
  'sales-room': 'Sales Room', 'reception': 'Recepción', 'break-room': 'Break Room',
};

export default function AgentSidebar() {
  const selectedAgentId = useHQStore(s => s.selectedAgentId);
  const agents = useHQStore(s => s.agents);
  const activities = useHQStore(s => s.activities);
  const selectAgent = useHQStore(s => s.selectAgent);

  const agent = agents.find(a => a.id === selectedAgentId);

  if (!agent) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 border-b border-[var(--theme-border)]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-tertiary)]">Team Overview</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {agents.map(a => (
            <button key={a.id} onClick={() => selectAgent(a.id)}
              className="flex items-center gap-3 w-full text-left px-3 py-3 rounded-xl hover:bg-[var(--theme-hover)] transition-all group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-transform group-hover:scale-110 shadow-sm"
                style={{ backgroundColor: `${a.color}15`, color: a.color }}>
                {a.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--theme-text)]">{a.name}</span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[a.status] }} />
                </div>
                <p className="text-[10px] text-[var(--theme-text-muted)] font-mono truncate">{a.currentTask}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const skills = AGENT_SKILLS[agent.id] || [];
  const agentActivities = activities.filter(a => a.agentId === agent.id).slice(0, 5);
  const completionRate = agent.tasksCompleted > 0
    ? Math.round((agent.tasksCompleted / (agent.tasksCompleted + agent.tasksActive)) * 100)
    : 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[var(--theme-border)]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold relative shadow-md"
              style={{ backgroundColor: agent.color, color: '#FFF' }}>
              {agent.initial}
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: STATUS_COLORS[agent.status] }} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--theme-text)]">{agent.name}</h3>
              <p className="text-xs text-[var(--theme-text-tertiary)] font-medium">{agent.shortRole}</p>
            </div>
          </div>
          <button onClick={() => selectAgent(null)}
            className="p-1.5 rounded-lg hover:bg-[var(--theme-hover)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: STATUS_BG[agent.status] }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[agent.status] }} />
          <span className="text-sm font-medium" style={{ color: STATUS_COLORS[agent.status] }}>{STATUS_LABELS[agent.status]}</span>
          <span className="ml-auto flex items-center gap-1 text-xs text-[var(--theme-text-muted)]">
            <MapPin size={10} />{ROOM_LABELS[agent.room]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5"><Briefcase size={11} className="text-[var(--theme-text-muted)]" />
            <p className="text-[10px] text-[var(--theme-text-muted)] font-semibold uppercase tracking-wider">Rol</p></div>
          <p className="text-sm text-[var(--theme-text-secondary)]">{agent.role}</p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-1.5"><Zap size={11} className="text-[var(--theme-text-muted)]" />
            <p className="text-[10px] text-[var(--theme-text-muted)] font-semibold uppercase tracking-wider">Tarea actual</p></div>
          <div className="px-3 py-2.5 rounded-xl bg-[var(--theme-hover)] border-l-3" style={{ borderLeftColor: agent.color, borderLeftWidth: 3 }}>
            <p className="text-sm text-[var(--theme-text)]">{agent.currentTask || 'Sin tarea'}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Activas', value: agent.tasksActive, color: '#3B82F6' },
            { label: 'Hechas', value: agent.tasksCompleted, color: '#22C55E' },
            { label: 'Rate', value: `${completionRate}%`, color: agent.color },
          ].map(s => (
            <div key={s.label} className="px-3 py-3 rounded-xl bg-[var(--theme-hover)] text-center">
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[9px] text-[var(--theme-text-muted)] font-semibold uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between mb-1.5">
            <p className="text-[10px] text-[var(--theme-text-muted)] font-semibold uppercase">Progreso</p>
            <p className="text-[10px] font-bold" style={{ color: agent.color }}>{completionRate}%</p>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${completionRate}%`, backgroundColor: agent.color }} />
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-[10px] text-[var(--theme-text-muted)] font-semibold uppercase tracking-wider mb-2">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map(skill => (
              <span key={skill} className="px-2.5 py-1 rounded-lg text-[10px] font-semibold shadow-sm"
                style={{ backgroundColor: `${agent.color}10`, color: agent.color }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <div className="flex items-center gap-1.5 mb-2"><Clock size={11} className="text-[var(--theme-text-muted)]" />
            <p className="text-[10px] text-[var(--theme-text-muted)] font-semibold uppercase tracking-wider">Reciente</p></div>
          <div className="space-y-1.5">
            {agentActivities.length > 0 ? agentActivities.map(act => (
              <div key={act.id} className="flex items-center gap-2 text-xs text-[var(--theme-text-tertiary)]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${agent.color}40` }} />
                <span className="truncate">{act.action}</span>
              </div>
            )) : <p className="text-xs text-[var(--theme-text-muted)] italic">Sin actividad</p>}
          </div>
        </div>
      </div>

      {/* Team selector */}
      <div className="p-3 border-t border-[var(--theme-border)]">
        <div className="flex flex-wrap gap-1.5">
          {agents.map(a => (
            <button key={a.id} onClick={() => selectAgent(a.id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all hover:scale-110 shadow-sm"
              style={{
                backgroundColor: a.id === selectedAgentId ? a.color : `${a.color}12`,
                color: a.id === selectedAgentId ? '#FFF' : a.color,
                border: a.id === selectedAgentId ? `2px solid ${a.color}` : '2px solid transparent',
              }}
              title={a.name}>
              {a.initial}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
