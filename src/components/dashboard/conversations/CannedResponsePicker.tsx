'use client';

import { useState } from 'react';
import { X, Search, MessageSquare } from 'lucide-react';
import { cannedResponses } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface CannedResponsePickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (content: string) => void;
}

export default function CannedResponsePicker({ open, onClose, onSelect }: CannedResponsePickerProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!open) return null;

  const categories = ['all', ...new Set(cannedResponses.map((r) => r.category))];
  const filtered = cannedResponses.filter((r) => {
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.shortcut.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl border border-white/10 bg-surface shadow-2xl z-20 animate-slide-up overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white">Respuestas rápidas</h3>
        <button onClick={onClose} className="p-1 text-white/40 hover:text-white">
          <X size={14} />
        </button>
      </div>

      <div className="px-4 py-2 border-b border-white/5">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <Search size={14} className="text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar o escribir /atajo..."
            className="flex-1 bg-transparent text-xs text-white placeholder-white/40 outline-none"
          />
        </div>
      </div>

      <div className="flex gap-1 px-4 py-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap',
              selectedCategory === cat ? 'bg-cyan/20 text-cyan' : 'bg-white/5 text-white/50 hover:text-white'
            )}
          >
            {cat === 'all' ? 'Todas' : cat}
          </button>
        ))}
      </div>

      <div className="max-h-48 overflow-y-auto">
        {filtered.map((response) => (
          <button
            key={response.id}
            onClick={() => { onSelect(response.content); onClose(); }}
            className="flex items-start gap-3 w-full px-4 py-2.5 hover:bg-white/5 transition-colors text-left"
          >
            <MessageSquare size={14} className="text-white/30 mt-0.5 flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white">{response.title}</span>
                <span className="text-[10px] text-cyan/60">{response.shortcut}</span>
              </div>
              <p className="text-[11px] text-white/40 line-clamp-1 mt-0.5">{response.content}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
