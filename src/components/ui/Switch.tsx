'use client';

import { cn } from '@/lib/utils';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export default function Switch({ checked, onChange, label, description, disabled = false, size = 'md' }: SwitchProps) {
  const sizes = {
    sm: { track: 'w-8 h-[18px]', thumb: 'w-3.5 h-3.5', translate: 'translate-x-[14px]' },
    md: { track: 'w-10 h-[22px]', thumb: 'w-[18px] h-[18px]', translate: 'translate-x-[18px]' },
  };

  const s = sizes[size];

  return (
    <label className={cn('flex items-center gap-3', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex items-center rounded-full transition-colors duration-200',
          s.track,
          checked ? 'bg-cyan' : 'bg-white/20'
        )}
      >
        <span
          className={cn(
            'inline-block rounded-full bg-white shadow transition-transform duration-200',
            s.thumb,
            checked ? s.translate : 'translate-x-0.5'
          )}
        />
      </button>
      {(label || description) && (
        <div>
          {label && <span className="text-sm font-medium text-white">{label}</span>}
          {description && <p className="text-xs text-white/50">{description}</p>}
        </div>
      )}
    </label>
  );
}
