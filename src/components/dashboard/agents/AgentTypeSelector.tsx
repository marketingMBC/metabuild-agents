'use client';

import { TrendingUp, Headphones, Share2, Building, Cog } from 'lucide-react';
import type { AgentType } from '@/lib/types';
import { AGENT_TYPES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  TrendingUp, HeadphonesIcon: Headphones, Share2, Building, Cog,
};

interface AgentTypeSelectorProps {
  selected: AgentType | null;
  onSelect: (type: AgentType) => void;
}

export default function AgentTypeSelector({ selected, onSelect }: AgentTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {(Object.entries(AGENT_TYPES) as [AgentType, typeof AGENT_TYPES[AgentType]][]).map(([key, config]) => {
        const Icon = iconMap[config.icon] || Cog;
        const isSelected = selected === key;

        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={cn(
              'flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
              isSelected
                ? 'border-cyan bg-cyan/5'
                : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
            )}
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${config.color}15` }}
            >
              <Icon size={20} className="text-white" style={{ color: config.color }} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{config.label}</p>
              <p className="text-[11px] text-white/40 mt-0.5">
                {key === 'ventas' && 'Captación y conversión'}
                {key === 'soporte' && 'Atención al cliente'}
                {key === 'rrss' && 'Gestión de redes'}
                {key === 'admin' && 'Administración'}
                {key === 'operaciones' && 'Procesos internos'}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
