'use client';

import { CHANNEL_CONFIGS } from '@/lib/constants';
import Switch from '@/components/ui/Switch';
import type { Channel } from '@/lib/types';
import { MessageSquare, Instagram, Facebook, Mail, Globe } from 'lucide-react';

interface ChannelsTabProps {
  data: { channels: Channel[] };
  onChange: (updates: Record<string, unknown>) => void;
}

const channelIcons: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  whatsapp: MessageSquare,
  instagram: Instagram,
  facebook: Facebook,
  email: Mail,
  web: Globe,
};

export default function ChannelsTab({ data, onChange }: ChannelsTabProps) {
  const toggleChannel = (channelId: Channel) => {
    const current = data.channels;
    const updated = current.includes(channelId)
      ? current.filter((c) => c !== channelId)
      : [...current, channelId];
    onChange({ channels: updated });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
        <h3 className="text-base font-semibold text-white">Canales Habilitados</h3>
        <p className="text-sm text-white/50">Selecciona los canales donde este agente respondera.</p>

        <div className="space-y-3">
          {CHANNEL_CONFIGS.map((ch) => {
            const Icon = channelIcons[ch.id] || Globe;
            const enabled = data.channels.includes(ch.id);
            return (
              <div key={ch.id} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: ch.color + '20' }}>
                    <Icon size={20} style={{ color: ch.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{ch.label}</p>
                    <p className="text-xs text-white/40">
                      {ch.connected ? `Conectado: ${ch.accountName}` : 'No conectado'}
                    </p>
                  </div>
                </div>
                <Switch checked={enabled} onChange={() => toggleChannel(ch.id)} size="sm" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Channel preview */}
      <div className="rounded-xl border border-white/10 bg-surface p-6">
        <h3 className="text-base font-semibold text-white mb-3">Canales activos</h3>
        <div className="flex flex-wrap gap-2">
          {data.channels.length === 0 ? (
            <p className="text-sm text-white/40">Ningun canal seleccionado</p>
          ) : (
            data.channels.map((ch) => {
              const config = CHANNEL_CONFIGS.find((c) => c.id === ch);
              return (
                <span key={ch} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: (config?.color || '#666') + '20', color: config?.color }}>
                  {config?.label || ch}
                </span>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
