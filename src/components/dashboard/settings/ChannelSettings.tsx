'use client';

import { CHANNEL_CONFIGS } from '@/lib/constants';
import ChannelConnectionCard from './ChannelConnectionCard';

export default function ChannelSettings() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-surface p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Canales de comunicación</h3>
        <p className="text-xs text-white/40 mb-4">Conecta y gestiona tus canales de mensajería</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHANNEL_CONFIGS.map((channel) => (
            <ChannelConnectionCard key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    </div>
  );
}
