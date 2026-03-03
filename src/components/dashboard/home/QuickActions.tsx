'use client';

import Link from 'next/link';
import { Plus, MessageSquare, Users, Zap, BookOpen, Smartphone } from 'lucide-react';

const actions = [
  { label: 'Nuevo agente', href: '/dashboard/agents/studio', icon: Plus, color: '#29F8D4' },
  { label: 'Conversaciones', href: '/dashboard/conversations', icon: MessageSquare, color: '#60A5FA' },
  { label: 'Gestionar leads', href: '/dashboard/leads', icon: Users, color: '#A78BFA' },
  { label: 'Automatizaciones', href: '/dashboard/automations', icon: Zap, color: '#FBBF24' },
  { label: 'Conocimiento', href: '/dashboard/knowledge', icon: BookOpen, color: '#F472B6' },
  { label: 'Preview widget', href: '/dashboard/preview', icon: Smartphone, color: '#8B5CF6' },
];

export default function QuickActions() {
  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Acciones rápidas</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-2.5 p-3 rounded-lg border border-white/5 hover:border-white/15 transition-all hover:bg-white/5 group"
            >
              <div
                className="p-1.5 rounded-md transition-colors"
                style={{ backgroundColor: `${action.color}15` }}
              >
                <Icon size={16} style={{ color: action.color }} />
              </div>
              <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
