'use client';

import { useState } from 'react';
import { UserCog, Plus, Shield, Mail, X } from 'lucide-react';
import { teamMembers, agents as allAgents } from '@/lib/mock-data';
import { formatRelativeTime, getInitials, cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-cyan/20 text-cyan',
  manager: 'bg-purple/20 text-purple-light',
  agent: 'bg-blue-500/20 text-blue-400',
  viewer: 'bg-white/10 text-white/60',
};

const ROLE_LABELS: Record<string, string> = {
  admin: 'Admin',
  manager: 'Manager',
  agent: 'Agente',
  viewer: 'Viewer',
};

const PERMISSIONS = [
  { action: 'Ver conversaciones', admin: true, manager: true, agent: true, viewer: true },
  { action: 'Responder conversaciones', admin: true, manager: true, agent: true, viewer: false },
  { action: 'Crear agentes', admin: true, manager: true, agent: false, viewer: false },
  { action: 'Editar agentes', admin: true, manager: true, agent: false, viewer: false },
  { action: 'Ver reportes', admin: true, manager: true, agent: true, viewer: true },
  { action: 'Gestionar equipo', admin: true, manager: false, agent: false, viewer: false },
  { action: 'Configurar canales', admin: true, manager: true, agent: false, viewer: false },
  { action: 'Gestionar automatizaciones', admin: true, manager: true, agent: false, viewer: false },
  { action: 'Facturación', admin: true, manager: false, agent: false, viewer: false },
  { action: 'Base de conocimiento', admin: true, manager: true, agent: true, viewer: false },
];

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center">
            <UserCog size={20} className="text-cyan" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Equipo</h1>
            <p className="text-sm text-white/50">{teamMembers.length} miembros</p>
          </div>
        </div>
        <Button onClick={() => setShowInvite(true)} icon={<Plus size={16} />}>
          Invitar Miembro
        </Button>
      </div>

      {/* Members List */}
      <div className="rounded-xl border border-white/10 bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase">Miembro</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase">Rol</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase hidden md:table-cell">Agentes</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase hidden md:table-cell">Última actividad</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => {
                const memberAgents = allAgents.filter((a) => member.assignedAgents.includes(a.id));
                return (
                  <tr key={member.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-navy">{getInitials(member.name)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{member.name}</p>
                          <p className="text-xs text-white/40">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('px-2.5 py-1 rounded-full text-[11px] font-medium', ROLE_COLORS[member.role])}>
                        {ROLE_LABELS[member.role]}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        {memberAgents.slice(0, 3).map((a) => (
                          <span key={a.id} className="text-sm" title={a.name}>{a.avatar}</span>
                        ))}
                        {memberAgents.length > 3 && (
                          <span className="text-[10px] text-white/40">+{memberAgents.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs text-white/40">{formatRelativeTime(member.lastActive)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="rounded-xl border border-white/10 bg-surface overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-cyan" />
            <h3 className="text-sm font-semibold text-white">Matriz de Permisos</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-white/40">Acción</th>
                <th className="px-4 py-2.5 text-center text-xs font-medium text-cyan">Admin</th>
                <th className="px-4 py-2.5 text-center text-xs font-medium text-purple-light">Manager</th>
                <th className="px-4 py-2.5 text-center text-xs font-medium text-blue-400">Agente</th>
                <th className="px-4 py-2.5 text-center text-xs font-medium text-white/50">Viewer</th>
              </tr>
            </thead>
            <tbody>
              {PERMISSIONS.map((perm, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="px-4 py-2.5 text-sm text-white/70">{perm.action}</td>
                  {(['admin', 'manager', 'agent', 'viewer'] as const).map((role) => (
                    <td key={role} className="px-4 py-2.5 text-center">
                      {perm[role] ? (
                        <span className="text-green-400">&#10003;</span>
                      ) : (
                        <span className="text-white/15">&mdash;</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-surface p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Invitar Miembro</h3>
              <button onClick={() => setShowInvite(false)} className="p-1 text-white/40 hover:text-white rounded">
                <X size={16} />
              </button>
            </div>
            <Input label="Email" placeholder="correo@empresa.cl" icon={<Mail size={14} />} />
            <Input label="Nombre" placeholder="Nombre completo" />
            <Select
              label="Rol"
              options={[
                { value: 'manager', label: 'Manager' },
                { value: 'agent', label: 'Agente' },
                { value: 'viewer', label: 'Viewer' },
              ]}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setShowInvite(false)}>Cancelar</Button>
              <Button onClick={() => setShowInvite(false)}>Enviar Invitación</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
