import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'cyan' | 'purple';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export default function Badge({ children, variant = 'default', size = 'sm', dot = false, className }: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-white/70',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    error: 'bg-red-500/20 text-red-400',
    info: 'bg-blue-500/20 text-blue-400',
    cyan: 'bg-cyan/20 text-cyan',
    purple: 'bg-purple/20 text-purple-light',
  };

  const dotColors = {
    default: 'bg-white/50',
    success: 'bg-green-400',
    warning: 'bg-yellow-400',
    error: 'bg-red-400',
    info: 'bg-blue-400',
    cyan: 'bg-cyan',
    purple: 'bg-purple-light',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full font-medium', variants[variant], sizes[size], className)}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
