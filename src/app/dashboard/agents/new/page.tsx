'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AgentCreateForm from '@/components/dashboard/agents/AgentCreateForm';

export default function NewAgentPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/agents"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> Volver a agentes
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-white">Crear nuevo agente</h1>
        <p className="text-sm text-white/50 mt-1">Configura un nuevo agente IA paso a paso</p>
      </div>
      <AgentCreateForm />
    </div>
  );
}
