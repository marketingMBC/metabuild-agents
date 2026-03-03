'use client';

import { AlertTriangle, Plus, UserCircle, Clock, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_RULES = [
  { id: 'r1', type: 'sentiment', condition: 'Sentimiento negativo detectado', action: 'Transferir a humano', icon: AlertTriangle, color: 'text-red-400 bg-red-500/20' },
  { id: 'r2', type: 'keyword', condition: 'Palabras clave: "hablar con persona", "humano"', action: 'Notificar equipo', icon: Hash, color: 'text-yellow-400 bg-yellow-500/20' },
  { id: 'r3', type: 'timeout', condition: 'Sin respuesta del agente > 60 segundos', action: 'Escalar a manager', icon: Clock, color: 'text-blue-400 bg-blue-500/20' },
];

export default function EscalationTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">Reglas de Escalacion</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan bg-cyan/10 hover:bg-cyan/20 transition-colors">
            <Plus size={14} />
            Nueva regla
          </button>
        </div>
        <p className="text-sm text-white/50">Define cuando y como el agente debe escalar una conversacion a un humano.</p>

        <div className="space-y-3">
          {MOCK_RULES.map((rule) => {
            const Icon = rule.icon;
            return (
              <div key={rule.id} className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', rule.color)}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{rule.condition}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <UserCircle size={12} className="text-white/40" />
                    <p className="text-xs text-white/50">Accion: {rule.action}</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Activa</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
