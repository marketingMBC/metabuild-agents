'use client';

import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const presets = [
  { label: 'Hoy', value: 'today' },
  { label: 'Últimos 7 días', value: '7d' },
  { label: 'Últimos 30 días', value: '30d' },
  { label: 'Este mes', value: 'month' },
];

interface DateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const activeLabel = presets.find((p) => p.value === value)?.label || 'Últimos 7 días';

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors text-sm text-white/70"
      >
        <Calendar size={14} />
        <span>{activeLabel}</span>
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-48 rounded-lg border border-white/10 bg-surface p-1 shadow-xl">
            {presets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => { onChange(preset.value); setOpen(false); }}
                className={cn(
                  'w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
                  value === preset.value
                    ? 'bg-cyan/10 text-cyan'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
