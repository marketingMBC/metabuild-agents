'use client';

import type { Channel } from '@/lib/types';
import { getChannelColor, getChannelLabel } from '@/lib/utils';

interface ChannelBadgeProps {
  channel: Channel;
  size?: 'sm' | 'md';
}

export default function ChannelBadge({ channel, size = 'sm' }: ChannelBadgeProps) {
  const color = getChannelColor(channel);
  const label = getChannelLabel(channel);
  const isSmall = size === 'sm';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${
        isSmall ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      style={{ backgroundColor: `${color}15`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
