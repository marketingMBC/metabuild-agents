'use client';

import type { ChannelConfig } from '@/lib/types';

interface ChannelConnectionCardProps {
  channel: ChannelConfig;
}

export default function ChannelConnectionCard({ channel }: ChannelConnectionCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
          style={{ backgroundColor: `${channel.color}15` }}
        >
          {channel.id === 'whatsapp' && '💬'}
          {channel.id === 'instagram' && '📸'}
          {channel.id === 'facebook' && '👤'}
          {channel.id === 'email' && '📧'}
          {channel.id === 'web' && '🌐'}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{channel.label}</p>
          {channel.connected ? (
            <p className="text-xs text-white/40">{channel.accountName}</p>
          ) : (
            <p className="text-xs text-white/30">No conectado</p>
          )}
        </div>
      </div>

      <button
        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
          channel.connected
            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
            : 'bg-white/5 text-white/50 border border-white/10 hover:border-cyan/30 hover:text-cyan'
        }`}
      >
        {channel.connected ? 'Conectado' : 'Conectar'}
      </button>
    </div>
  );
}
