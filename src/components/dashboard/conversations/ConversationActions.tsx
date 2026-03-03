'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, UserPlus, Flag, Tag, GitMerge, CheckCircle } from 'lucide-react';

interface ConversationActionsProps {
  onAction: (action: string) => void;
}

const ACTIONS = [
  { id: 'assign', label: 'Asignar agente', icon: UserPlus },
  { id: 'priority', label: 'Cambiar prioridad', icon: Flag },
  { id: 'tag', label: 'Agregar etiqueta', icon: Tag },
  { id: 'merge', label: 'Fusionar conversación', icon: GitMerge },
  { id: 'resolve', label: 'Resolver conversación', icon: CheckCircle },
];

export default function ConversationActions({ onAction }: ConversationActionsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-white/10 bg-surface shadow-2xl z-30 overflow-hidden animate-slide-up">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => { onAction(action.id); setOpen(false); }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Icon size={14} />
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
