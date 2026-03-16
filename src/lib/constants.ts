// ============================================================
// Metabuild Smart — Constants
// ============================================================

import type { NavItem, ChannelConfig, PlanInfo } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'HQ', href: '/dashboard/hq', icon: 'Building2' },
  { label: 'Conversaciones', href: '/dashboard/conversations', icon: 'MessageSquare', badge: 5 },
  { label: 'Agentes', href: '/dashboard/agents', icon: 'Bot' },
  { label: 'Leads', href: '/dashboard/leads', icon: 'Users' },
  { label: 'Conocimiento', href: '/dashboard/knowledge', icon: 'BookOpen' },
  { label: 'Automatizaciones', href: '/dashboard/automations', icon: 'Zap' },
  { label: 'Reportes', href: '/dashboard/reports', icon: 'BarChart3' },
  { label: 'Equipo', href: '/dashboard/team', icon: 'UserCog' },
  { label: 'Configuración', href: '/dashboard/settings', icon: 'Settings' },
];

export const AGENT_TYPES = {
  ventas: { label: 'Ventas', color: '#29F8D4', icon: 'TrendingUp' },
  soporte: { label: 'Soporte', color: '#60A5FA', icon: 'HeadphonesIcon' },
  rrss: { label: 'Redes Sociales', color: '#F472B6', icon: 'Share2' },
  admin: { label: 'Administración', color: '#FBBF24', icon: 'Building' },
  operaciones: { label: 'Operaciones', color: '#A78BFA', icon: 'Cog' },
} as const;

export const CHANNEL_CONFIGS: ChannelConfig[] = [
  { id: 'whatsapp', label: 'WhatsApp', connected: true, accountName: '+56 9 8765 4321', color: '#25D366' },
  { id: 'instagram', label: 'Instagram', connected: true, accountName: '@metabuild.agents', color: '#E1306C' },
  { id: 'facebook', label: 'Facebook', connected: false, color: '#1877F2' },
  { id: 'email', label: 'Email', connected: true, accountName: 'agents@metabuildcity.com', color: '#60A5FA' },
  { id: 'web', label: 'Web Chat', connected: true, accountName: 'metabuild.cl', color: '#8B5CF6' },
];

export const CONVERSATION_STATUSES = {
  active: { label: 'Activa', color: '#22C55E' },
  waiting: { label: 'En espera', color: '#FBBF24' },
  resolved: { label: 'Resuelta', color: '#60A5FA' },
  archived: { label: 'Archivada', color: '#6B7280' },
} as const;

export const LEAD_STAGES = {
  nuevo: { label: 'Nuevo', color: '#60A5FA', order: 0 },
  contactado: { label: 'Contactado', color: '#FBBF24', order: 1 },
  calificado: { label: 'Calificado', color: '#29F8D4', order: 2 },
  propuesta: { label: 'Propuesta', color: '#A78BFA', order: 3 },
  cerrado: { label: 'Cerrado', color: '#22C55E', order: 4 },
} as const;

export const AUTOMATION_CATEGORIES = {
  bienvenida: { label: 'Bienvenida', icon: 'HandMetal', color: '#29F8D4' },
  seguimiento: { label: 'Seguimiento', icon: 'Clock', color: '#FBBF24' },
  escalacion: { label: 'Escalación', icon: 'AlertTriangle', color: '#EF4444' },
  scoring: { label: 'Lead Scoring', icon: 'Star', color: '#A78BFA' },
  notificacion: { label: 'Notificación', icon: 'Bell', color: '#60A5FA' },
  recordatorio: { label: 'Recordatorio', icon: 'CalendarClock', color: '#F472B6' },
} as const;

export const PLANS: PlanInfo[] = [
  {
    tier: 'starter',
    name: 'Starter',
    price: 49,
    agentsLimit: 2,
    conversationsLimit: 500,
    features: ['2 agentes IA', '500 conversaciones/mes', 'WhatsApp + Email', 'Dashboard integrado'],
  },
  {
    tier: 'growth',
    name: 'Growth',
    price: 149,
    agentsLimit: 5,
    conversationsLimit: 2000,
    features: ['5 agentes IA', '2.000 conversaciones/mes', 'Todos los canales', 'Dashboard integrado', 'Agent Studio', 'Automatizaciones', 'API access'],
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    price: 399,
    agentsLimit: -1,
    conversationsLimit: -1,
    features: ['Agentes ilimitados', 'Conversaciones ilimitadas', 'Todos los canales', 'Dashboard integrado', 'Agent Studio', 'Automatizaciones avanzadas', 'API + Webhooks', 'Soporte dedicado', 'SLA garantizado'],
  },
];

export const DAYS_OF_WEEK = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
export const HOURS_OF_DAY = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
