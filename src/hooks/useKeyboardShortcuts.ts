'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/app-store';

export interface Shortcut {
  key: string;
  meta?: boolean;
  shift?: boolean;
  label: string;
  action: () => void;
  category: string;
}

export function useKeyboardShortcuts() {
  const router = useRouter();
  const setCommandPaletteOpen = useAppStore((s) => s.setCommandPaletteOpen);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  const shortcuts: Shortcut[] = [
    { key: 'k', meta: true, label: 'Buscar', action: () => setCommandPaletteOpen(true), category: 'General' },
    { key: 'b', meta: true, label: 'Toggle sidebar', action: toggleSidebar, category: 'General' },
    { key: 'd', meta: true, shift: true, label: 'Toggle tema', action: toggleTheme, category: 'General' },
    { key: '1', meta: true, label: 'Ir a Dashboard', action: () => router.push('/dashboard'), category: 'Navegación' },
    { key: '2', meta: true, label: 'Ir a Conversaciones', action: () => router.push('/dashboard/conversations'), category: 'Navegación' },
    { key: '3', meta: true, label: 'Ir a Agentes', action: () => router.push('/dashboard/agents'), category: 'Navegación' },
    { key: '4', meta: true, label: 'Ir a Leads', action: () => router.push('/dashboard/leads'), category: 'Navegación' },
    { key: '5', meta: true, label: 'Ir a Automatizaciones', action: () => router.push('/dashboard/automations'), category: 'Navegación' },
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger in input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

      for (const shortcut of shortcuts) {
        const metaMatch = shortcut.meta ? (e.metaKey || e.ctrlKey) : true;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        if (e.key.toLowerCase() === shortcut.key && metaMatch && shiftMatch) {
          e.preventDefault();
          shortcut.action();
          return;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return shortcuts;
}
