'use client';

import { StickyNote } from 'lucide-react';

interface InternalNoteInputProps {
  active: boolean;
  onToggle: () => void;
}

export default function InternalNoteInput({ active, onToggle }: InternalNoteInputProps) {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg transition-colors ${active ? 'bg-amber-500/20 text-amber-400' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
      title={active ? 'Cambiar a mensaje' : 'Escribir nota interna'}
    >
      <StickyNote size={16} />
    </button>
  );
}
