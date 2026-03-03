'use client';

import { useState } from 'react';
import { Plus, Edit3, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { FAQ } from '@/lib/types';
import { agents } from '@/lib/mock-data';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface FAQEditorProps {
  faqs: FAQ[];
}

export default function FAQEditor({ faqs }: FAQEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...new Set(faqs.map((f) => f.category))];
  const filtered = filterCategory === 'all' ? faqs : faqs.filter((f) => f.category === filterCategory);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                filterCategory === cat ? 'bg-cyan/20 text-cyan' : 'bg-white/5 text-white/50 hover:text-white'
              )}
            >
              {cat === 'all' ? 'Todas' : cat}
            </button>
          ))}
        </div>
        <Button variant="secondary" size="sm" icon={<Plus size={14} />}>
          Nueva FAQ
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-white/40">No hay FAQs en esta categoría</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((faq) => {
            const expanded = expandedId === faq.id;
            const assignedAgents = agents.filter((a) => faq.agentIds.includes(a.id));
            return (
              <div key={faq.id} className="rounded-xl border border-white/10 bg-surface overflow-hidden">
                <button
                  onClick={() => setExpandedId(expanded ? null : faq.id)}
                  className="flex items-center justify-between w-full px-4 py-3 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{faq.question}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">{faq.category}</span>
                      <span className="text-[10px] text-white/30">{assignedAgents.length} agente{assignedAgents.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  {expanded ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
                </button>

                {expanded && (
                  <div className="px-4 pb-4 border-t border-white/5">
                    <p className="text-sm text-white/70 mt-3">{faq.answer}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-colors">
                        <Edit3 size={12} /> Editar
                      </button>
                      <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-red-400/70 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors">
                        <Trash2 size={12} /> Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
