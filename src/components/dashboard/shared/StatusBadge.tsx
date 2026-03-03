'use client';

import { getStatusColor } from '@/lib/utils';
import type { ConversationStatus, AgentStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: ConversationStatus | AgentStatus;
  label?: string;
}

const statusLabels: Record<string, string> = {
  active: 'Activo',
  waiting: 'En espera',
  resolved: 'Resuelto',
  archived: 'Archivado',
  paused: 'Pausado',
  error: 'Error',
  training: 'Entrenando',
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const color = getStatusColor(status);
  const displayLabel = label || statusLabels[status] || status;

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `${color}15`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
      {displayLabel}
    </span>
  );
}
