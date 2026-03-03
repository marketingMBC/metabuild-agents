import { MessageSquare, Instagram, Facebook, Mail, Globe } from 'lucide-react';
import { CHANNEL_CONFIGS } from '@/lib/constants';
import type { Channel } from '@/lib/types';

const channelIcons: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  whatsapp: MessageSquare,
  instagram: Instagram,
  facebook: Facebook,
  email: Mail,
  web: Globe,
};

interface OmnichannelIndicatorProps {
  channel: Channel;
  showLabel?: boolean;
}

export default function OmnichannelIndicator({ channel, showLabel = false }: OmnichannelIndicatorProps) {
  const config = CHANNEL_CONFIGS.find((c) => c.id === channel);
  const Icon = channelIcons[channel] || Globe;

  return (
    <div className="flex items-center gap-1.5">
      <Icon size={14} style={{ color: config?.color }} />
      {showLabel && <span className="text-xs" style={{ color: config?.color }}>{config?.label}</span>}
    </div>
  );
}
