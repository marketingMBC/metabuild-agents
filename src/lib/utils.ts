// ============================================================
// Metabuild Agents — Utility Functions
// ============================================================

import type { Channel, ConversationStatus, AgentStatus, LeadStage } from './types';

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
}

export function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'ahora';
  if (diffMin < 60) return `hace ${diffMin}m`;
  if (diffHrs < 24) return `hace ${diffHrs}h`;
  if (diffDays < 7) return `hace ${diffDays}d`;
  return formatDate(dateStr);
}

export function getChannelColor(channel: Channel): string {
  const colors: Record<Channel, string> = {
    whatsapp: '#25D366',
    instagram: '#E1306C',
    facebook: '#1877F2',
    email: '#60A5FA',
    web: '#8B5CF6',
  };
  return colors[channel];
}

export function getChannelLabel(channel: Channel): string {
  const labels: Record<Channel, string> = {
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
    email: 'Email',
    web: 'Web',
  };
  return labels[channel];
}

export function getStatusColor(status: ConversationStatus | AgentStatus): string {
  const colors: Record<string, string> = {
    active: '#22C55E',
    waiting: '#FBBF24',
    resolved: '#60A5FA',
    archived: '#6B7280',
    paused: '#FBBF24',
    error: '#EF4444',
    training: '#A78BFA',
  };
  return colors[status] || '#6B7280';
}

export function getLeadStageColor(stage: LeadStage): string {
  const colors: Record<LeadStage, string> = {
    nuevo: '#60A5FA',
    contactado: '#FBBF24',
    calificado: '#29F8D4',
    propuesta: '#A78BFA',
    cerrado: '#22C55E',
  };
  return colors[stage];
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-CL').format(value);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
