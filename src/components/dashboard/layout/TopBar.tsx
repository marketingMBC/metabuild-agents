'use client';

import { Search, Menu } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import NotificationCenter from './NotificationCenter';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const setCommandPaletteOpen = useAppStore((s) => s.setCommandPaletteOpen);

  return (
    <header className="h-16 border-b border-white/10 bg-surface/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      {/* Left: Menu + Search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:border-cyan/40 hover:bg-white/5 transition-all duration-200 max-w-md w-full text-left group"
        >
          <Search size={16} className="text-white/40 flex-shrink-0" />
          <span className="text-sm text-white/40 flex-1">Buscar conversaciones, leads, agentes...</span>
          <kbd className="hidden md:flex items-center gap-0.5 text-[10px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Theme + Notifications + Avatar */}
      <div className="flex items-center gap-1 ml-4">
        <ThemeToggle />
        <NotificationCenter />

        <div className="w-px h-6 bg-white/10 mx-1" />

        <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center">
            <span className="text-xs font-bold text-navy">RR</span>
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white leading-tight">Rodrigo</p>
            <p className="text-[11px] text-white/40 leading-tight">Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
}
