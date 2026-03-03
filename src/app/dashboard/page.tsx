'use client';

import { useState } from 'react';
import { Keyboard } from 'lucide-react';
import KPIGrid from '@/components/dashboard/home/KPIGrid';
import ActivityChart from '@/components/dashboard/home/ActivityChart';
import RecentConversations from '@/components/dashboard/home/RecentConversations';
import AgentStatusCards from '@/components/dashboard/home/AgentStatusCards';
import QuickActions from '@/components/dashboard/home/QuickActions';
import ActivityFeed from '@/components/dashboard/home/ActivityFeed';
import ChannelBreakdown from '@/components/dashboard/home/ChannelBreakdown';
import ShortcutsModal from '@/components/dashboard/layout/ShortcutsModal';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function DashboardPage() {
  const shortcuts = useKeyboardShortcuts();
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-white/50 mt-1">Resumen de tu plataforma de agentes IA</p>
        </div>
        <button
          onClick={() => setShowShortcuts(true)}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/60 border border-white/10 hover:border-white/20 transition-colors"
        >
          <Keyboard size={14} />
          Atajos
        </button>
      </div>

      {/* KPIs */}
      <KPIGrid />

      {/* Charts + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <QuickActions />
      </div>

      {/* Channel Breakdown + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChannelBreakdown />
        <ActivityFeed />
      </div>

      {/* Conversations + Agents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentConversations />
        <AgentStatusCards />
      </div>

      {/* Shortcuts Modal */}
      <ShortcutsModal
        open={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        shortcuts={shortcuts}
      />
    </div>
  );
}
