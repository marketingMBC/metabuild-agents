'use client';

import Link from 'next/link';
import { Pencil } from 'lucide-react';
import type { Agent } from '@/lib/types';
import { AGENT_TYPES } from '@/lib/constants';
import StatusBadge from '../shared/StatusBadge';
import ChannelBadge from '../shared/ChannelBadge';
import Avatar from '../shared/Avatar';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const typeConfig = AGENT_TYPES[agent.type];

  return (
    <Link
      href={`/dashboard/agents/${agent.id}`}
      className="block rounded-xl border border-white/10 bg-surface p-5 hover:border-cyan/20 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar name={agent.name} emoji={agent.avatar} size="md" />
          <div>
            <h3 className="text-sm font-semibold text-white group-hover:text-cyan transition-colors">
              {agent.name}
            </h3>
            <span className="text-[11px] font-medium" style={{ color: typeConfig.color }}>
              {typeConfig.label}
            </span>
          </div>
        </div>
        <StatusBadge status={agent.status} />
      </div>

      <p className="text-xs text-white/40 line-clamp-2 mb-4">{agent.description}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {agent.channels.map((ch) => (
          <ChannelBadge key={ch} channel={ch} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5">
        <div>
          <p className="text-base font-bold text-white">{agent.conversationsToday}</p>
          <p className="text-[10px] text-white/30">hoy</p>
        </div>
        <div>
          <p className="text-base font-bold text-white">{agent.responseTime}</p>
          <p className="text-[10px] text-white/30">respuesta</p>
        </div>
        <div>
          <p className="text-base font-bold text-cyan">{agent.satisfactionRate}%</p>
          <p className="text-[10px] text-white/30">satisfacción</p>
        </div>
      </div>

      <div className="pt-3 border-t border-white/5 mt-3">
        <Link
          href={`/dashboard/agents/studio/${agent.id}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg text-xs font-medium text-cyan bg-cyan/10 hover:bg-cyan/20 transition-colors"
        >
          <Pencil size={12} />
          Editar en Studio
        </Link>
      </div>
    </Link>
  );
}
