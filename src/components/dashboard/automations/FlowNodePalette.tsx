'use client';

import { Zap, GitBranch, Play, Clock, MessageSquare, Mail, Bell, UserPlus } from 'lucide-react';

const PALETTE_ITEMS = [
  { type: 'trigger', label: 'Triggers', items: [
    { icon: MessageSquare, label: 'Mensaje recibido', color: 'text-green-400' },
    { icon: Clock, label: 'Programado', color: 'text-green-400' },
    { icon: Zap, label: 'Evento webhook', color: 'text-green-400' },
  ]},
  { type: 'condition', label: 'Condiciones', items: [
    { icon: GitBranch, label: 'Si/Entonces', color: 'text-amber-400' },
    { icon: GitBranch, label: 'Contiene texto', color: 'text-amber-400' },
  ]},
  { type: 'action', label: 'Acciones', items: [
    { icon: MessageSquare, label: 'Enviar mensaje', color: 'text-blue-400' },
    { icon: Mail, label: 'Enviar email', color: 'text-blue-400' },
    { icon: Bell, label: 'Notificar equipo', color: 'text-blue-400' },
    { icon: UserPlus, label: 'Asignar agente', color: 'text-blue-400' },
    { icon: Clock, label: 'Esperar', color: 'text-purple-light' },
  ]},
];

export default function FlowNodePalette() {
  return (
    <div className="rounded-xl border border-white/10 bg-surface overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-sm font-semibold text-white">Nodos</p>
        <p className="text-[10px] text-white/40">Arrastra al canvas</p>
      </div>

      <div className="p-3 space-y-4">
        {PALETTE_ITEMS.map((group) => (
          <div key={group.type}>
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/30 mb-2 px-1">{group.label}</p>
            <div className="space-y-1">
              {group.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/5 cursor-grab transition-colors"
                    draggable
                  >
                    <Icon size={14} className={item.color} />
                    <span className="text-xs">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
