import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'line' | 'circle' | 'card';
}

export default function Skeleton({ className, variant = 'line' }: SkeletonProps) {
  const base = 'animate-pulse bg-white/10 rounded';

  const variants = {
    line: 'h-4 w-full rounded-md',
    circle: 'w-10 h-10 rounded-full',
    card: 'h-32 w-full rounded-xl',
  };

  return <div className={cn(base, variants[variant], className)} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-surface p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" className="w-8 h-8" />
        <Skeleton variant="line" className="w-32 h-4" />
      </div>
      <Skeleton variant="line" className="w-full h-3" />
      <Skeleton variant="line" className="w-3/4 h-3" />
      <div className="flex gap-2 pt-2">
        <Skeleton variant="line" className="w-16 h-6 rounded-full" />
        <Skeleton variant="line" className="w-16 h-6 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonList({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton variant="circle" className="w-8 h-8 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="line" className="h-3 w-1/3" />
            <Skeleton variant="line" className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
