'use client';

import { cn } from '@/lib/utils';

interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (value: string) => void;
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex border-b border-white/10 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'px-4 py-3 text-sm font-medium whitespace-nowrap transition-all relative',
            active === tab.value
              ? 'text-cyan'
              : 'text-white/50 hover:text-white/80'
          )}
        >
          {tab.label}
          {active === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan rounded-t" />
          )}
        </button>
      ))}
    </div>
  );
}
