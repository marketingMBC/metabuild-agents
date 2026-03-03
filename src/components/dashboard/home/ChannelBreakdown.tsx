'use client';

import { CHANNEL_CONFIGS } from '@/lib/constants';

const CHANNEL_DATA = [
  { id: 'whatsapp', conversations: 42, percentage: 48 },
  { id: 'instagram', conversations: 18, percentage: 21 },
  { id: 'email', conversations: 14, percentage: 16 },
  { id: 'web', conversations: 9, percentage: 10 },
  { id: 'facebook', conversations: 4, percentage: 5 },
];

export default function ChannelBreakdown() {
  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Conversaciones por Canal</h3>
      <div className="space-y-3">
        {CHANNEL_DATA.map((ch) => {
          const config = CHANNEL_CONFIGS.find((c) => c.id === ch.id);
          return (
            <div key={ch.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">{config?.label || ch.id}</span>
                <span className="text-xs font-medium text-white/70">{ch.conversations} <span className="text-white/30">({ch.percentage}%)</span></span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 animate-funnel"
                  style={{ width: `${ch.percentage}%`, backgroundColor: config?.color || '#666' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
