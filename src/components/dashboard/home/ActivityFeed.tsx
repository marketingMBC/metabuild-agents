'use client';

import { MessageSquare, UserPlus, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

const FEED_ITEMS = [
  { id: 1, type: 'conversation', icon: MessageSquare, color: '#29F8D4', text: 'Sofía respondió a Roberto Silva', time: '2026-02-27T10:30:00' },
  { id: 2, type: 'lead', icon: UserPlus, color: '#A78BFA', text: 'Nuevo lead: Matías Ríos (WhatsApp)', time: '2026-02-27T10:05:00' },
  { id: 3, type: 'automation', icon: Zap, color: '#FBBF24', text: 'Automatización "Bienvenida WhatsApp" ejecutada', time: '2026-02-27T10:00:00' },
  { id: 4, type: 'resolved', icon: CheckCircle, color: '#22C55E', text: 'Conversación con Claudia Reyes resuelta', time: '2026-02-27T09:50:00' },
  { id: 5, type: 'escalation', icon: AlertTriangle, color: '#EF4444', text: 'Escalación: María González requiere atención', time: '2026-02-27T09:15:00' },
  { id: 6, type: 'conversation', icon: MessageSquare, color: '#29F8D4', text: 'Carlos agendó cita para Valentina Pizarro', time: '2026-02-27T09:00:00' },
  { id: 7, type: 'automation', icon: Zap, color: '#FBBF24', text: 'Follow-up 24h enviado a 5 contactos', time: '2026-02-27T08:00:00' },
  { id: 8, type: 'lead', icon: UserPlus, color: '#A78BFA', text: 'Diego Fernández alcanzó score 92', time: '2026-02-27T07:30:00' },
];

export default function ActivityFeed() {
  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Actividad Reciente</h3>
      <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
        {FEED_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
              <div className="p-1 rounded-md flex-shrink-0 mt-0.5" style={{ backgroundColor: item.color + '15' }}>
                <Icon size={12} style={{ color: item.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-white/70 leading-snug">{item.text}</p>
                <p className="text-[10px] text-white/30 mt-0.5">{formatRelativeTime(item.time)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
