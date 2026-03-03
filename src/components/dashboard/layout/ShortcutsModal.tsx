'use client';

import { X, Keyboard } from 'lucide-react';
import type { Shortcut } from '@/hooks/useKeyboardShortcuts';

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
  shortcuts: Shortcut[];
}

export default function ShortcutsModal({ open, onClose, shortcuts }: ShortcutsModalProps) {
  if (!open) return null;

  const categories = [...new Set(shortcuts.map((s) => s.category))];

  const formatKey = (s: Shortcut) => {
    const parts: string[] = [];
    if (s.meta) parts.push('⌘');
    if (s.shift) parts.push('⇧');
    parts.push(s.key.toUpperCase());
    return parts;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-surface p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Keyboard size={18} className="text-cyan" />
            <h3 className="text-lg font-semibold text-white">Atajos de Teclado</h3>
          </div>
          <button onClick={onClose} className="p-1 text-white/40 hover:text-white rounded">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-5">
          {categories.map((category) => (
            <div key={category}>
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/30 mb-2">{category}</p>
              <div className="space-y-1.5">
                {shortcuts
                  .filter((s) => s.category === category)
                  .map((s) => (
                    <div key={s.key + (s.shift ? '-shift' : '')} className="flex items-center justify-between py-1.5">
                      <span className="text-sm text-white/70">{s.label}</span>
                      <div className="flex items-center gap-1">
                        {formatKey(s).map((k, i) => (
                          <kbd key={i} className="px-2 py-0.5 text-xs rounded bg-white/10 text-white/60 border border-white/10 font-mono">
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
