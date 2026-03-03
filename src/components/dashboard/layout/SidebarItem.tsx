'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, MessageSquare, Bot, Users, BarChart3, Zap, Settings,
  BookOpen, UserCog,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  LayoutDashboard, MessageSquare, Bot, Users, BarChart3, Zap, Settings,
  BookOpen, UserCog,
};

interface SidebarItemProps {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  collapsed: boolean;
}

export default function SidebarItem({ label, href, icon, badge, collapsed }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);
  const Icon = iconMap[icon] || LayoutDashboard;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
        isActive
          ? 'bg-cyan/10 text-cyan'
          : 'text-white/60 hover:text-white hover:bg-white/5'
      )}
    >
      <div className={cn(
        'flex items-center justify-center w-8 h-8 rounded-md transition-colors',
        isActive ? 'bg-cyan/20' : 'group-hover:bg-white/10'
      )}>
        <Icon size={18} />
      </div>
      {!collapsed && (
        <>
          <span className="text-sm font-medium truncate">{label}</span>
          {badge !== undefined && badge > 0 && (
            <span className="ml-auto flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full bg-cyan text-navy">
              {badge}
            </span>
          )}
        </>
      )}
      {collapsed && badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold rounded-full bg-cyan text-navy">
          {badge}
        </span>
      )}
    </Link>
  );
}
