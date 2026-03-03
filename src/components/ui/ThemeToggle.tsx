'use client';

import { Moon, Sun } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';

interface ThemeToggleProps {
  size?: 'sm' | 'md';
}

export default function ThemeToggle({ size = 'sm' }: ThemeToggleProps) {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  const iconSize = size === 'sm' ? 14 : 18;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
      title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
    </button>
  );
}
