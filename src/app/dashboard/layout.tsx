'use client';

import { useEffect } from 'react';
import Sidebar from '@/components/dashboard/layout/Sidebar';
import TopBar from '@/components/dashboard/layout/TopBar';
import Breadcrumbs from '@/components/dashboard/layout/Breadcrumbs';
import CommandPalette from '@/components/dashboard/layout/CommandPalette';
import { useAppStore } from '@/stores/app-store';
import { notifications as mockNotifications } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);
  const sidebarMobileOpen = useAppStore((s) => s.sidebarMobileOpen);
  const setSidebarCollapsed = useAppStore((s) => s.setSidebarCollapsed);
  const setSidebarMobileOpen = useAppStore((s) => s.setSidebarMobileOpen);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const addNotification = useAppStore((s) => s.addNotification);

  // Register keyboard shortcuts
  useKeyboardShortcuts();

  // Load mock notifications on mount
  useEffect(() => {
    mockNotifications.forEach((n) => addNotification(n));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mobile detection
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      if (mobile) setSidebarCollapsed(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [setSidebarCollapsed]);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <div className="min-h-screen bg-navy">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        mobileOpen={sidebarMobileOpen}
        onMobileClose={() => setSidebarMobileOpen(false)}
      />

      <div
        className={cn(
          'transition-all duration-300',
          isMobile ? 'ml-0' : (sidebarCollapsed ? 'ml-16' : 'ml-64')
        )}
      >
        <TopBar onMenuClick={() => setSidebarMobileOpen(true)} />
        <main className="p-4 md:p-6">
          <Breadcrumbs />
          {children}
        </main>
      </div>

      <CommandPalette />
    </div>
  );
}
