'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { agents } from '@/lib/mock-data';
import AgentCard from '@/components/dashboard/agents/AgentCard';

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Agentes</h1>
          <p className="text-sm text-white/50 mt-1">Gestiona tus agentes de IA</p>
        </div>
        <Link
          href="/dashboard/agents/studio"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-cyan text-navy hover:bg-cyan-light transition-colors"
        >
          <Plus size={16} /> Nuevo agente
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
