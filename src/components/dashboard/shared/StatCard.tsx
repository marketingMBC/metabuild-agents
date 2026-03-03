'use client';

import {
  MessageSquare, Users, Zap, Clock, Star, TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MessageSquare, Users, Zap, Clock, Star, TrendingUp,
};

interface StatCardProps {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  delay?: number;
}

export default function StatCard({ label, value, change, changeLabel, icon, delay = 0 }: StatCardProps) {
  const Icon = iconMap[icon] || MessageSquare;
  const isPositive = change >= 0;

  return (
    <div
      className="rounded-xl border border-white/10 bg-surface p-4 hover:border-cyan/20 transition-all duration-300 animate-count-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-cyan/10">
          <Icon size={18} className="text-cyan" />
        </div>
        <div className={cn(
          'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
          isPositive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
        )}>
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/50 mt-1">{label}</p>
      <p className="text-[11px] text-white/30 mt-0.5">{changeLabel}</p>
    </div>
  );
}
