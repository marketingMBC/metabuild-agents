'use client';

import { useState } from 'react';
import Tabs from '@/components/dashboard/shared/Tabs';
import GeneralSettings from '@/components/dashboard/settings/GeneralSettings';
import ChannelSettings from '@/components/dashboard/settings/ChannelSettings';
import AgentSettings from '@/components/dashboard/settings/AgentSettings';
import NotificationSettings from '@/components/dashboard/settings/NotificationSettings';
import TeamSettings from '@/components/dashboard/settings/TeamSettings';
import BillingSettings from '@/components/dashboard/settings/BillingSettings';

const tabs = [
  { label: 'General', value: 'general' },
  { label: 'Canales', value: 'channels' },
  { label: 'Agentes', value: 'agents' },
  { label: 'Notificaciones', value: 'notifications' },
  { label: 'Equipo', value: 'team' },
  { label: 'Facturación', value: 'billing' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-sm text-white/50 mt-1">Gestiona tu cuenta y preferencias</p>
      </div>

      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <div>
        {activeTab === 'general' && <GeneralSettings />}
        {activeTab === 'channels' && <ChannelSettings />}
        {activeTab === 'agents' && <AgentSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'team' && <TeamSettings />}
        {activeTab === 'billing' && <BillingSettings />}
      </div>
    </div>
  );
}
