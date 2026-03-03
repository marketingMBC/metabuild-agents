'use client';

import { Zap, GitBranch, Play, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AutomationNode } from '@/lib/types';

interface FlowNodeProps {
  node: AutomationNode;
  selected: boolean;
  onClick: () => void;
}

const nodeStyles = {
  trigger: { bg: 'bg-green-500/10', border: 'border-green-500/30', icon: Zap, iconColor: 'text-green-400', label: 'Trigger' },
  condition: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: GitBranch, iconColor: 'text-amber-400', label: 'Condición' },
  action: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: Play, iconColor: 'text-blue-400', label: 'Acción' },
  delay: { bg: 'bg-purple/10', border: 'border-purple/30', icon: Clock, iconColor: 'text-purple-light', label: 'Espera' },
};

export default function FlowNode({ node, selected, onClick }: FlowNodeProps) {
  const style = nodeStyles[node.type as keyof typeof nodeStyles] || nodeStyles.action;
  const Icon = style.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-64 p-4 rounded-xl border-2 transition-all duration-200 text-left',
        style.bg,
        selected ? 'border-cyan ring-2 ring-cyan/20 scale-[1.02]' : style.border,
        'hover:scale-[1.01]'
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', style.bg)}>
          <Icon size={16} className={style.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn('text-[10px] uppercase font-bold tracking-wider', style.iconColor)}>{style.label}</span>
          </div>
          <p className="text-sm font-medium text-white truncate">{node.label}</p>
        </div>
      </div>
      <p className="text-xs text-white/50 mt-2 line-clamp-2">{node.description}</p>
    </button>
  );
}
