'use client';

import type { Lead } from '@/lib/types';
import { formatRelativeTime, formatCurrency } from '@/lib/utils';
import ChannelBadge from '../shared/ChannelBadge';
import Avatar from '../shared/Avatar';

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

export default function LeadCard({ lead, onClick }: LeadCardProps) {
  const scoreColor = lead.score >= 80 ? '#22C55E' : lead.score >= 50 ? '#FBBF24' : '#6B7280';

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-lg border border-white/10 bg-white/[0.02] p-3 hover:border-cyan/20 transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Avatar name={lead.contactName} size="sm" />
          <div>
            <p className="text-sm font-medium text-white group-hover:text-cyan transition-colors">
              {lead.contactName}
            </p>
            {lead.company && (
              <p className="text-[11px] text-white/40">{lead.company}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <ChannelBadge channel={lead.channel} />
        <span className="text-[10px] text-white/30">{lead.agentName}</span>
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: `${scoreColor}20`, color: scoreColor }}>
            {lead.score}
          </div>
          <span className="text-[10px] text-white/30">score</span>
        </div>
        <span className="text-xs font-medium text-white/60">
          {lead.value > 1000 ? `${(lead.value / 1000).toFixed(1)}K UF` : `$${lead.value}/mo`}
        </span>
      </div>

      <p className="text-[10px] text-white/25 mt-2">{formatRelativeTime(lead.lastActivity)}</p>
    </button>
  );
}
