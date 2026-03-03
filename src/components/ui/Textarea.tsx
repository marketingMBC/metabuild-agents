'use client';

import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-white/70">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'w-full rounded-lg border bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition-all duration-200 resize-y min-h-[80px]',
          'focus:border-cyan/40 focus:bg-white/5 focus:ring-1 focus:ring-cyan/20',
          error ? 'border-red-500/50' : 'border-white/10',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
