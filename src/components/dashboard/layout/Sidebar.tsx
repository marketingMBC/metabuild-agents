'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import SidebarItem from './SidebarItem';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-cyan-dark flex items-center justify-center flex-shrink-0">
            <span className="text-navy font-bold text-sm">m</span>
          </div>
          {!collapsed && (
            <div className="flex items-baseline gap-0.5 truncate">
              <span className="font-bold text-white text-sm">metabuild</span>
              <span className="font-bold text-cyan text-sm">Agents</span>
            </div>
          )}
        </Link>
        {isMobile && mobileOpen ? (
          <button onClick={onMobileClose} className="p-1 text-white/60 hover:text-white">
            <X size={20} />
          </button>
        ) : !isMobile && (
          <button onClick={onToggle} className="p-1 text-white/60 hover:text-white rounded-md hover:bg-white/5">
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <div key={item.href} onClick={isMobile ? onMobileClose : undefined}>
            <SidebarItem
              label={item.label}
              href={item.href}
              icon={item.icon}
              badge={item.badge}
              collapsed={collapsed && !isMobile}
            />
          </div>
        ))}
      </nav>

      {/* Plan info */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-white/10">
          <div className="rounded-lg bg-white/5 p-3">
            <p className="text-[11px] text-white/40 uppercase tracking-wider">Plan actual</p>
            <p className="text-sm font-semibold text-cyan mt-0.5">Growth</p>
            <p className="text-[11px] text-white/50 mt-1">3 de 5 agentes activos</p>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
              <div className="h-full bg-cyan rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40" onClick={onMobileClose} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-surface border-r border-white/10 z-50 transition-all duration-300 flex flex-col',
          isMobile
            ? cn('w-64', mobileOpen ? 'translate-x-0' : '-translate-x-full')
            : cn(collapsed ? 'w-16' : 'w-64')
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
