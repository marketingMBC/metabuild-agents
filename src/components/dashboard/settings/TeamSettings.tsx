'use client';

import { teamMembers } from '@/lib/mock-data';
import { formatRelativeTime } from '@/lib/utils';
import Avatar from '../shared/Avatar';

const roleLabels: Record<string, { label: string; color: string }> = {
  admin: { label: 'Admin', color: '#29F8D4' },
  manager: { label: 'Manager', color: '#A78BFA' },
  agent: { label: 'Agente', color: '#60A5FA' },
  viewer: { label: 'Viewer', color: '#6B7280' },
};

export default function TeamSettings() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-surface p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Miembros del equipo</h3>
            <p className="text-xs text-white/40">{teamMembers.length} miembros</p>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan text-navy hover:bg-cyan-light transition-colors">
            Invitar miembro
          </button>
        </div>

        <div className="space-y-2">
          {teamMembers.map((member) => {
            const role = roleLabels[member.role];
            return (
              <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <Avatar name={member.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-white">{member.name}</p>
                    <p className="text-[11px] text-white/40">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${role.color}15`, color: role.color }}
                  >
                    {role.label}
                  </span>
                  <span className="text-[10px] text-white/25 hidden sm:block">
                    {formatRelativeTime(member.lastActive)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
