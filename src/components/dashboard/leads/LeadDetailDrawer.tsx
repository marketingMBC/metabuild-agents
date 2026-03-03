'use client';

import type { Lead } from '@/lib/types';
import { formatDate, getLeadStageColor, getChannelLabel } from '@/lib/utils';
import { LEAD_STAGES } from '@/lib/constants';
import Drawer from '../shared/Drawer';
import ChannelBadge from '../shared/ChannelBadge';
import Avatar from '../shared/Avatar';

interface LeadDetailDrawerProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

export default function LeadDetailDrawer({ lead, open, onClose }: LeadDetailDrawerProps) {
  if (!lead) return null;

  const stageColor = getLeadStageColor(lead.stage);
  const stageConfig = LEAD_STAGES[lead.stage];

  return (
    <Drawer open={open} onClose={onClose} title="Detalle del lead">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Avatar name={lead.contactName} size="lg" />
          <div>
            <h3 className="text-lg font-semibold text-white">{lead.contactName}</h3>
            {lead.company && <p className="text-sm text-white/40">{lead.company}</p>}
          </div>
        </div>

        {/* Stage + Score */}
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: `${stageColor}20`, color: stageColor }}
          >
            {stageConfig.label}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-white">{lead.score}</span>
            <span className="text-[11px] text-white/30">/ 100 score</span>
          </div>
        </div>

        {/* Score bar */}
        <div className="w-full h-2 bg-white/10 rounded-full">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${lead.score}%`, backgroundColor: stageColor }}
          />
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-white/40">Email</span>
            <span className="text-sm text-white/70">{lead.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-white/40">Teléfono</span>
            <span className="text-sm text-white/70">{lead.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-white/40">Canal</span>
            <ChannelBadge channel={lead.channel} />
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-white/40">Agente</span>
            <span className="text-sm text-white/70">{lead.agentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-white/40">Valor</span>
            <span className="text-sm font-medium text-cyan">
              {lead.value > 1000 ? `${lead.value.toLocaleString()} UF` : `$${lead.value}/mo`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-white/40">Creado</span>
            <span className="text-sm text-white/70">{formatDate(lead.createdAt)}</span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="text-[11px] uppercase tracking-wider text-white/30 font-medium mb-2">Etiquetas</p>
          <div className="flex flex-wrap gap-1.5">
            {lead.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-cyan/10 text-cyan/70">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <p className="text-[11px] uppercase tracking-wider text-white/30 font-medium mb-2">Notas</p>
          <p className="text-sm text-white/50 leading-relaxed">{lead.notes}</p>
        </div>
      </div>
    </Drawer>
  );
}
