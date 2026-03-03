import { FileText, HelpCircle, Globe, Bot } from 'lucide-react';
import type { KnowledgeDocument, FAQ } from '@/lib/types';

interface KnowledgeStatsProps {
  documents: KnowledgeDocument[];
  faqs: FAQ[];
}

export default function KnowledgeStats({ documents, faqs }: KnowledgeStatsProps) {
  const readyDocs = documents.filter((d) => d.status === 'ready').length;
  const urlDocs = documents.filter((d) => d.type === 'url').length;
  const agentCount = new Set(documents.flatMap((d) => d.agentIds).concat(faqs.flatMap((f) => f.agentIds))).size;

  const stats = [
    { label: 'Documentos', value: documents.length, sub: `${readyDocs} listos`, icon: FileText, color: 'bg-cyan/20 text-cyan' },
    { label: 'FAQs', value: faqs.length, sub: `${new Set(faqs.map((f) => f.category)).size} categorías`, icon: HelpCircle, color: 'bg-purple/20 text-purple-light' },
    { label: 'URLs', value: urlDocs, sub: 'páginas indexadas', icon: Globe, color: 'bg-blue-500/20 text-blue-400' },
    { label: 'Agentes', value: agentCount, sub: 'usando conocimiento', icon: Bot, color: 'bg-green-500/20 text-green-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-xl border border-white/10 bg-surface p-4">
            <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
              <Icon size={16} />
            </div>
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/50">{stat.label}</p>
            <p className="text-[10px] text-white/30 mt-0.5">{stat.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
