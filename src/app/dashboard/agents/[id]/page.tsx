'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { agents } from '@/lib/mock-data';
import AgentDetailPanel from '@/components/dashboard/agents/AgentDetailPanel';
import EmptyState from '@/components/dashboard/shared/EmptyState';

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    return (
      <EmptyState
        title="Agente no encontrado"
        description="El agente que buscas no existe o fue eliminado."
        action={{ label: 'Volver a agentes', onClick: () => {} }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/agents"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> Volver a agentes
      </Link>
      <AgentDetailPanel agent={agent} />
    </div>
  );
}
