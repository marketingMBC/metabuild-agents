'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, LayoutDashboard, MessageSquare, Bot, Users, BarChart3, Zap, Settings,
  BookOpen, UserCog, Plus, ArrowRight,
} from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export default function CommandPalette() {
  const open = useAppStore((s) => s.commandPaletteOpen);
  const setOpen = useAppStore((s) => s.setCommandPaletteOpen);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commands: CommandItem[] = [
    { id: 'nav-home', label: 'Ir a Inicio', icon: <LayoutDashboard size={16} />, action: () => router.push('/dashboard'), category: 'Navegación' },
    { id: 'nav-conv', label: 'Ir a Conversaciones', icon: <MessageSquare size={16} />, action: () => router.push('/dashboard/conversations'), category: 'Navegación' },
    { id: 'nav-agents', label: 'Ir a Agentes', icon: <Bot size={16} />, action: () => router.push('/dashboard/agents'), category: 'Navegación' },
    { id: 'nav-leads', label: 'Ir a Leads', icon: <Users size={16} />, action: () => router.push('/dashboard/leads'), category: 'Navegación' },
    { id: 'nav-knowledge', label: 'Ir a Conocimiento', icon: <BookOpen size={16} />, action: () => router.push('/dashboard/knowledge'), category: 'Navegación' },
    { id: 'nav-automations', label: 'Ir a Automatizaciones', icon: <Zap size={16} />, action: () => router.push('/dashboard/automations'), category: 'Navegación' },
    { id: 'nav-reports', label: 'Ir a Reportes', icon: <BarChart3 size={16} />, action: () => router.push('/dashboard/reports'), category: 'Navegación' },
    { id: 'nav-team', label: 'Ir a Equipo', icon: <UserCog size={16} />, action: () => router.push('/dashboard/team'), category: 'Navegación' },
    { id: 'nav-settings', label: 'Ir a Configuración', icon: <Settings size={16} />, action: () => router.push('/dashboard/settings'), category: 'Navegación' },
    { id: 'action-new-agent', label: 'Crear nuevo agente', icon: <Plus size={16} />, action: () => router.push('/dashboard/agents/studio'), category: 'Acciones' },
    { id: 'action-new-auto', label: 'Crear automatización', icon: <Plus size={16} />, action: () => router.push('/dashboard/automations'), category: 'Acciones' },
  ];

  const filtered = query
    ? commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(query.toLowerCase()))
      )
    : commands;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  const handleSelect = useCallback((cmd: CommandItem) => {
    cmd.action();
    setOpen(false);
    setQuery('');
  }, [setOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setOpen(false); setQuery(''); }} />
      <div className="relative w-full max-w-lg rounded-xl border border-white/10 bg-surface shadow-2xl animate-slide-up overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search size={18} className="text-white/40 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar páginas, acciones..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
          />
          <kbd className="text-[10px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p className="px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white/30">
                {category}
              </p>
              {items.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd)}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-white/5 transition-colors group"
                >
                  <span className="text-white/40 group-hover:text-cyan transition-colors">{cmd.icon}</span>
                  <span className="text-sm text-white/80 group-hover:text-white flex-1">{cmd.label}</span>
                  <ArrowRight size={12} className="text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-white/40">Sin resultados para &quot;{query}&quot;</p>
          )}
        </div>
      </div>
    </div>
  );
}
