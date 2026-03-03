'use client';

import FilterBar from '../shared/FilterBar';

interface ConversationFiltersProps {
  channelFilter: string;
  statusFilter: string;
  onChannelChange: (v: string) => void;
  onStatusChange: (v: string) => void;
}

const channelOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Email', value: 'email' },
  { label: 'Web', value: 'web' },
];

const statusOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Activas', value: 'active' },
  { label: 'En espera', value: 'waiting' },
  { label: 'Resueltas', value: 'resolved' },
];

export default function ConversationFilters({ channelFilter, statusFilter, onChannelChange, onStatusChange }: ConversationFiltersProps) {
  return (
    <div className="flex flex-col gap-2 p-3 border-b border-white/10">
      <FilterBar filters={channelOptions} active={channelFilter} onChange={onChannelChange} />
      <FilterBar filters={statusOptions} active={statusFilter} onChange={onStatusChange} />
    </div>
  );
}
