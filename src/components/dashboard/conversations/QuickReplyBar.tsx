'use client';

import { Zap } from 'lucide-react';

const QUICK_REPLIES = [
  '¡Gracias por contactarnos!',
  'Un momento, por favor.',
  '¿Puedo ayudarle en algo más?',
  'Le enviaré la información por correo.',
];

interface QuickReplyBarProps {
  onSelect: (text: string) => void;
}

export default function QuickReplyBar({ onSelect }: QuickReplyBarProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto border-b border-white/5">
      <Zap size={14} className="text-cyan flex-shrink-0" />
      {QUICK_REPLIES.map((reply, i) => (
        <button
          key={i}
          onClick={() => onSelect(reply)}
          className="flex-shrink-0 px-3 py-1 rounded-full text-xs text-white/60 bg-white/5 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
