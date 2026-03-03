'use client';

import { Undo, Redo, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

export default function FlowToolbar() {
  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
      <button className="p-1.5 text-white/40 hover:text-white rounded hover:bg-white/10 transition-colors" title="Deshacer">
        <Undo size={14} />
      </button>
      <button className="p-1.5 text-white/40 hover:text-white rounded hover:bg-white/10 transition-colors" title="Rehacer">
        <Redo size={14} />
      </button>
      <div className="w-px h-4 bg-white/10 mx-0.5" />
      <button className="p-1.5 text-white/40 hover:text-white rounded hover:bg-white/10 transition-colors" title="Acercar">
        <ZoomIn size={14} />
      </button>
      <button className="p-1.5 text-white/40 hover:text-white rounded hover:bg-white/10 transition-colors" title="Alejar">
        <ZoomOut size={14} />
      </button>
      <button className="p-1.5 text-white/40 hover:text-white rounded hover:bg-white/10 transition-colors" title="Ajustar">
        <Maximize size={14} />
      </button>
    </div>
  );
}
