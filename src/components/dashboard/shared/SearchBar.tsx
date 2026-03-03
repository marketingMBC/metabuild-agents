'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchBar({ placeholder = 'Buscar...', value, onChange, className }: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn(
      'flex items-center gap-2 px-3 py-2 rounded-lg border transition-all',
      focused ? 'border-cyan/40 bg-white/5' : 'border-white/10 bg-white/[0.03]',
      className
    )}>
      <Search size={14} className="text-white/40 flex-shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent text-sm text-white placeholder-white/40 outline-none w-full"
      />
    </div>
  );
}
