'use client';

import { cn } from '@/lib/utils';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  filters: FilterOption[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterBar({ filters, active, onChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all',
            active === filter.value
              ? 'bg-cyan/15 text-cyan border border-cyan/30'
              : 'text-white/50 hover:text-white/80 border border-transparent hover:border-white/10'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
