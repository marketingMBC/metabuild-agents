'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  dashboard: 'Inicio',
  conversations: 'Conversaciones',
  agents: 'Agentes',
  leads: 'Leads',
  knowledge: 'Conocimiento',
  automations: 'Automatizaciones',
  reports: 'Reportes',
  team: 'Equipo',
  settings: 'Configuración',
  studio: 'Agent Studio',
  new: 'Nuevo',
  onboarding: 'Onboarding',
  preview: 'Preview',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on dashboard home
  if (segments.length <= 1) return null;

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = routeLabels[segment] || segment;
    const isLast = index === segments.length - 1;
    // Skip dynamic segments like [id]
    const isDynamic = segment.startsWith('[') || /^[a-f0-9-]+$/.test(segment);

    return { href, label: isDynamic ? '...' : label, isLast, isDynamic };
  });

  return (
    <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-4">
      <Link href="/dashboard" className="hover:text-white/60 transition-colors">
        <Home size={12} />
      </Link>
      {crumbs.slice(1).map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={10} />
          {crumb.isLast ? (
            <span className="text-white/70 font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-white/60 transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
