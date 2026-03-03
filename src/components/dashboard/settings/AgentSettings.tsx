'use client';

import { agents } from '@/lib/mock-data';
import { AGENT_TYPES } from '@/lib/constants';
import StatusBadge from '../shared/StatusBadge';
import Avatar from '../shared/Avatar';

export default function AgentSettings() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-surface p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Agentes configurados</h3>
        <p className="text-xs text-white/40 mb-4">Gestiona la configuración global de tus agentes</p>

        <div className="space-y-3">
          {agents.map((agent) => {
            const typeConfig = AGENT_TYPES[agent.type];
            return (
              <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar name={agent.name} emoji={agent.avatar} size="sm" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{agent.name}</span>
                      <StatusBadge status={agent.status} />
                    </div>
                    <span className="text-[11px]" style={{ color: typeConfig.color }}>
                      {typeConfig.label}
                    </span>
                  </div>
                </div>
                <button className="text-xs text-white/40 hover:text-cyan px-3 py-1.5 rounded-lg border border-white/10 hover:border-cyan/30 transition-colors">
                  Configurar
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-surface p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Configuración global de IA</h3>
        <p className="text-xs text-white/40 mb-4">Ajustes que aplican a todos los agentes</p>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Idioma predeterminado</label>
            <select className="w-full max-w-xs px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white outline-none">
              <option>Español</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Tiempo máximo de respuesta</label>
            <select className="w-full max-w-xs px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white outline-none">
              <option>30 segundos</option>
              <option>1 minuto</option>
              <option>2 minutos</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
