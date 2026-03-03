'use client';

import type { Agent } from '@/lib/types';
import { AGENT_TYPES } from '@/lib/constants';
import { formatDate, formatNumber } from '@/lib/utils';
import StatusBadge from '../shared/StatusBadge';
import ChannelBadge from '../shared/ChannelBadge';
import Avatar from '../shared/Avatar';

interface AgentDetailPanelProps {
  agent: Agent;
}

export default function AgentDetailPanel({ agent }: AgentDetailPanelProps) {
  const typeConfig = AGENT_TYPES[agent.type];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Avatar name={agent.name} emoji={agent.avatar} size="lg" />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">{agent.name}</h2>
            <StatusBadge status={agent.status} />
          </div>
          <p className="text-sm mt-1" style={{ color: typeConfig.color }}>{typeConfig.label}</p>
          <p className="text-sm text-white/50 mt-2">{agent.description}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Conversaciones totales', value: formatNumber(agent.conversationsTotal) },
          { label: 'Hoy', value: agent.conversationsToday.toString() },
          { label: 'Tiempo respuesta', value: agent.responseTime },
          { label: 'Satisfacción', value: `${agent.satisfactionRate}%` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-[11px] text-white/40">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Channels */}
      <div>
        <h3 className="text-sm font-medium text-white/70 mb-2">Canales conectados</h3>
        <div className="flex gap-2">
          {agent.channels.map((ch) => (
            <ChannelBadge key={ch} channel={ch} size="md" />
          ))}
        </div>
      </div>

      {/* Config */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium text-white/70 mb-2">Personalidad</h3>
          <p className="text-sm text-white/50">{agent.personality}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium text-white/70 mb-2">Detalles</h3>
          <div className="space-y-1 text-sm text-white/50">
            <p>Idioma: {agent.language === 'es' ? 'Español' : agent.language}</p>
            <p>Creado: {formatDate(agent.createdAt)}</p>
            <p>Última actividad: {formatDate(agent.lastActive)}</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-sm font-medium text-white/70 mb-2">Etiquetas</h3>
        <div className="flex flex-wrap gap-1.5">
          {agent.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
