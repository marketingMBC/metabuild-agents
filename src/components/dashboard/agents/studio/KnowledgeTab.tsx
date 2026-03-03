'use client';

import { Upload, FileText, Link as LinkIcon, Trash2 } from 'lucide-react';
import { knowledgeDocuments, faqs } from '@/lib/mock-data';
import Button from '@/components/ui/Button';

interface KnowledgeTabProps {
  agentId: string | null;
}

export default function KnowledgeTab({ agentId }: KnowledgeTabProps) {
  const assignedDocs = agentId ? knowledgeDocuments.filter((d) => d.agentIds.includes(agentId)) : [];
  const assignedFaqs = agentId ? faqs.filter((f) => f.agentIds.includes(agentId)) : [];

  return (
    <div className="space-y-6">
      {/* Documents */}
      <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">Documentos</h3>
          <Button variant="secondary" size="sm" icon={<Upload size={14} />}>Subir</Button>
        </div>

        {assignedDocs.length === 0 ? (
          <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center">
            <Upload size={32} className="mx-auto text-white/20 mb-2" />
            <p className="text-sm text-white/50">Arrastra documentos aqui o haz click en Subir</p>
            <p className="text-xs text-white/30 mt-1">PDF, DOC, TXT — Max 10MB</p>
          </div>
        ) : (
          <div className="space-y-2">
            {assignedDocs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-cyan" />
                  <div>
                    <p className="text-sm text-white">{doc.title}</p>
                    <p className="text-[11px] text-white/40">{doc.type.toUpperCase()} {doc.size && `\u2022 ${doc.size}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${doc.status === 'ready' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {doc.status === 'ready' ? 'Listo' : 'Procesando'}
                  </span>
                  <button className="p-1 text-white/30 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAQs */}
      <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">FAQs Asignadas</h3>
          <Button variant="secondary" size="sm" icon={<LinkIcon size={14} />}>Vincular</Button>
        </div>

        {assignedFaqs.length === 0 ? (
          <p className="text-sm text-white/40 py-4 text-center">No hay FAQs asignadas a este agente.</p>
        ) : (
          <div className="space-y-2">
            {assignedFaqs.map((faq) => (
              <div key={faq.id} className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <p className="text-sm font-medium text-white">{faq.question}</p>
                <p className="text-xs text-white/50 mt-1 line-clamp-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
