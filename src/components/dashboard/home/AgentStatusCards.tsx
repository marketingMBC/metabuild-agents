'use client';

import Link from 'next/link';
import { agents } from '@/lib/mock-data';
import StatusBadge from '../shared/StatusBadge';
import Avatar from '../shared/Avatar';

export default function AgentStatusCards() {
  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Estado de agentes</h3>
        <Link href="/dashboard/agents" className="text-xs text-cyan hover:text-cyan-light transition-colors">
          Ver todos
        </Link>
      </div>

      <div className="space-y-2">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
          >
            <Avatar name={agent.name} emoji={agent.avatar} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{agent.name}</span>
                <StatusBadge status={agent.status} />
              </div>
              <p className="text-xs text-white/40 mt-0.5">
                {agent.conversationsToday} conversaciones hoy · {agent.responseTime}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-cyan">{agent.satisfactionRate}%</p>
              <p className="text-[10px] text-white/30">satisfacción</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
