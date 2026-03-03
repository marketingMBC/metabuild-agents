'use client';

import { FileText, Trash2, Bot, ExternalLink } from 'lucide-react';
import { agents } from '@/lib/mock-data';
import type { KnowledgeDocument } from '@/lib/types';

interface DocumentsListProps {
  documents: KnowledgeDocument[];
}

export default function DocumentsList({ documents }: DocumentsListProps) {
  if (documents.length === 0) {
    return (
      <div className="py-12 text-center">
        <FileText size={32} className="mx-auto text-white/20 mb-2" />
        <p className="text-sm text-white/50">No hay documentos todavía</p>
        <p className="text-xs text-white/30 mt-1">Sube documentos para entrenar tus agentes</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {documents.map((doc) => {
        const assignedAgents = agents.filter((a) => doc.agentIds.includes(a.id));
        return (
          <div key={doc.id} className="rounded-xl border border-white/10 bg-surface p-4 hover:border-white/20 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
                  {doc.type === 'url' ? <ExternalLink size={18} className="text-cyan" /> : <FileText size={18} className="text-cyan" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{doc.title}</p>
                  <p className="text-[11px] text-white/40 mt-0.5">
                    {doc.type.toUpperCase()} {doc.size ? `• ${doc.size}` : ''}
                  </p>
                </div>
              </div>
              <button className="p-1 text-white/20 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                doc.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                doc.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {doc.status === 'ready' ? 'Listo' : doc.status === 'processing' ? 'Procesando...' : 'Error'}
              </span>
              <div className="flex items-center gap-1">
                <Bot size={12} className="text-white/30" />
                <span className="text-[10px] text-white/40">{assignedAgents.length} agente{assignedAgents.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
