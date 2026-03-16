// ============================================================
// MBC Agent HQ — Constants & Layout (Enhanced)
// ============================================================

import type { HQRoom, HQFurniture, HQAgent, HQRoomId } from './types';

export const TILE_SIZE = 32;
export const MAP_COLS = 30;
export const MAP_ROWS = 20;
export const CANVAS_WIDTH = MAP_COLS * TILE_SIZE;  // 960
export const CANVAS_HEIGHT = MAP_ROWS * TILE_SIZE; // 640
export const FPS = 30;
export const FRAME_TIME = 1000 / FPS;
export const AGENT_SIZE = 28;
export const MOVE_SPEED = 1.5; // pixels per frame

// ── Rooms ────────────────────────────────────────────────────

export const ROOMS: HQRoom[] = [
  // Top row
  { id: 'dev-room',       label: 'Dev Room',       x: 0,  y: 0, width: 8,  height: 7, color: '#14142a' },
  { id: 'meeting-room',   label: 'Meeting Room',   x: 8,  y: 0, width: 8,  height: 7, color: '#161630' },
  { id: 'research-lab',   label: 'Research Lab',   x: 16, y: 0, width: 7,  height: 7, color: '#14142a' },
  { id: 'finance-corner', label: 'Finance',        x: 23, y: 0, width: 7,  height: 7, color: '#1a1428' },
  // Middle row
  { id: 'creative-lab',   label: 'Creative Lab',   x: 0,  y: 7, width: 10, height: 6, color: '#1a1430' },
  { id: 'central',        label: 'Central',        x: 10, y: 7, width: 20, height: 6, color: '#101028' },
  // Bottom row
  { id: 'sales-room',     label: 'Sales Room',     x: 0,  y: 13, width: 10, height: 7, color: '#14201a' },
  { id: 'reception',      label: 'Recepción',      x: 10, y: 13, width: 12, height: 7, color: '#181828' },
  { id: 'break-room',     label: 'Break Room',     x: 22, y: 13, width: 8,  height: 7, color: '#1a1a20' },
];

// ── Furniture (in tile coordinates) ──────────────────────────

export const FURNITURE: HQFurniture[] = [
  // Dev Room
  { type: 'desk', x: 1.5, y: 2, width: 3, height: 1, color: '#252540' },
  { type: 'screen', x: 2.5, y: 1.5, width: 1, height: 0.5, color: '#8B5CF6' },
  { type: 'desk', x: 1.5, y: 4.5, width: 3, height: 1, color: '#252540' },
  { type: 'plant', x: 6.5, y: 5.5, width: 1, height: 1, color: '#22C55E' },

  // Meeting Room
  { type: 'table', x: 10, y: 2, width: 4, height: 3, color: '#252540' },
  { type: 'plant', x: 14.5, y: 1, width: 1, height: 1, color: '#22C55E' },

  // Research Lab
  { type: 'desk', x: 17.5, y: 2, width: 3, height: 1, color: '#252540' },
  { type: 'screen', x: 18.5, y: 1.5, width: 1, height: 0.5, color: '#60A5FA' },
  { type: 'desk', x: 17.5, y: 4.5, width: 3, height: 1, color: '#252540' },

  // Finance Corner
  { type: 'desk', x: 24.5, y: 2, width: 3, height: 1, color: '#252540' },
  { type: 'screen', x: 25.5, y: 1.5, width: 1, height: 0.5, color: '#EF4444' },
  { type: 'plant', x: 28, y: 5.5, width: 1, height: 1, color: '#22C55E' },

  // Creative Lab
  { type: 'desk', x: 1.5, y: 9, width: 3, height: 1, color: '#252540' },
  { type: 'screen', x: 2.5, y: 8.5, width: 1, height: 0.5, color: '#F472B6' },
  { type: 'desk', x: 6, y: 9, width: 2.5, height: 1, color: '#252540' },

  // Central — Director desk + display
  { type: 'desk', x: 17.5, y: 9, width: 3.5, height: 1.2, color: '#252545' },
  { type: 'screen', x: 18.5, y: 8.3, width: 1.5, height: 0.6, color: '#29F8D4' },
  { type: 'screen', x: 12, y: 8, width: 3, height: 0.5, color: '#29F8D4' },  // Big display

  // Sales Room
  { type: 'desk', x: 1.5, y: 15, width: 3, height: 1, color: '#252540' },
  { type: 'screen', x: 2.5, y: 14.5, width: 1, height: 0.5, color: '#22C55E' },
  { type: 'desk', x: 6, y: 15, width: 2.5, height: 1, color: '#252540' },
  { type: 'plant', x: 1, y: 18, width: 1, height: 1, color: '#22C55E' },

  // Reception
  { type: 'desk', x: 13, y: 15, width: 5, height: 1.2, color: '#252545' },
  { type: 'screen', x: 14.5, y: 14.5, width: 1.5, height: 0.5, color: '#FBBF24' },
  { type: 'plant', x: 20, y: 14, width: 1, height: 1, color: '#22C55E' },

  // Break Room
  { type: 'coffee', x: 24.5, y: 15, width: 2.5, height: 2, color: '#2a1f14' },
  { type: 'plant', x: 28.5, y: 14, width: 1, height: 1, color: '#22C55E' },
  { type: 'plant', x: 23, y: 18, width: 1, height: 1, color: '#22C55E' },
  { type: 'table', x: 25, y: 18, width: 2, height: 1.5, color: '#252540' },
];

// ── Room center positions (for pathfinding) ──────────────────

export function getRoomCenter(roomId: HQRoomId): { x: number; y: number } {
  const room = ROOMS.find(r => r.id === roomId)!;
  return {
    x: (room.x + room.width / 2) * TILE_SIZE,
    y: (room.y + room.height / 2) * TILE_SIZE,
  };
}

// ── Chat Bubbles ─────────────────────────────────────────────

export const CHAT_BUBBLES: Record<string, string[]> = {
  director: [
    'Revisando KPIs...', 'Asignando tareas', 'Daily standup',
    'Coordinando equipo', 'Reportando al board', 'Sprint planning',
    'Review semanal', 'OKRs on track', 'Pipeline check',
  ],
  vendedor: [
    'Enviando propuesta...', 'Call con lead', 'Actualizando CRM',
    'Follow-up cliente', 'Pipeline review', 'Demo programada',
    'Cotización lista', 'Cerrando deal', 'Prospecting',
  ],
  creador: [
    'Diseñando post...', 'Case study listo', 'Editando video',
    'Social calendar', 'Analytics review', 'Shooting content',
    'Brief aprobado', 'Newsletter draft', 'Brand guidelines',
  ],
  investigador: [
    'Analizando mercado...', 'Research report', 'Benchmark listo',
    'Datos actualizados', 'Competencia mapeada', 'Trend analysis',
    'User interviews', 'Data mining', 'Insights deck',
  ],
  soporte: [
    'Ticket resuelto ✓', 'Atendiendo cliente', 'FAQ actualizada',
    'Escalando caso', 'Chat en vivo', 'NPS survey',
    'Bug reportado', 'Feedback logged', 'SLA on track',
  ],
  arquitecto: [
    'Push a main...', 'Code review', 'Deploy exitoso',
    'Fixing bug', 'API v2 ready', 'CI/CD green',
    'Refactoring', 'Tests passing', 'Infra update',
  ],
  estratega: [
    'Pricing update', 'Plan Q2 listo', 'Market analysis',
    'ROI calculado', 'Roadmap actualizado', 'Board deck',
    'Metrics review', 'Forecast ready', 'GTM strategy',
  ],
  contador: [
    'Factura emitida', 'MRR actualizado', 'Cash flow OK',
    'Cobro enviado', 'Balance cerrado', 'Tax filing',
    'Budget review', 'P&L updated', 'Invoice paid ✓',
  ],
};

// ── Agent Skill Tags ─────────────────────────────────────────

export const AGENT_SKILLS: Record<string, string[]> = {
  director: ['Gestión', 'OKRs', 'Notion', 'Coordinación', 'Reporting'],
  vendedor: ['CRM', 'Propuestas', 'Negociación', 'Pipeline', 'Outbound'],
  creador: ['RRSS', 'Copywriting', 'Video', 'Diseño', 'Analytics'],
  investigador: ['Data Analysis', 'Market Research', 'Benchmarks', 'SQL', 'Scraping'],
  soporte: ['Zendesk', 'Chat', 'Tickets', 'NPS', 'Onboarding'],
  arquitecto: ['TypeScript', 'Next.js', 'AWS', 'APIs', 'DevOps'],
  estratega: ['Pricing', 'GTM', 'Roadmap', 'Competitive Intel', 'Forecast'],
  contador: ['Facturación', 'MRR/ARR', 'Cash Flow', 'Tax', 'Budgets'],
};

// ── Agent Definitions ────────────────────────────────────────

export function createInitialAgents(): HQAgent[] {
  const defs: Array<{
    id: string; name: string; role: string; shortRole: string;
    color: string; initial: string; room: HQRoomId;
    deskX: number; deskY: number;
  }> = [
    { id: 'director',     name: 'Director',     role: 'Ops Manager — orquesta y coordina', shortRole: 'Ops Manager', color: '#29F8D4', initial: 'D', room: 'central',        deskX: 19, deskY: 10 },
    { id: 'vendedor',     name: 'Vendedor',     role: 'Sales — leads, propuestas, CRM',   shortRole: 'Sales',       color: '#22C55E', initial: 'V', room: 'sales-room',     deskX: 3,  deskY: 16 },
    { id: 'creador',      name: 'Creador',      role: 'Content — RRSS, case studies',      shortRole: 'Content',     color: '#F472B6', initial: 'C', room: 'creative-lab',   deskX: 3,  deskY: 10 },
    { id: 'investigador', name: 'Investigador', role: 'Research — mercado, competencia',   shortRole: 'Research',    color: '#60A5FA', initial: 'I', room: 'research-lab',   deskX: 19, deskY: 3  },
    { id: 'soporte',      name: 'Soporte',      role: 'Support — tickets, clientes',       shortRole: 'Support',     color: '#FBBF24', initial: 'S', room: 'reception',      deskX: 15, deskY: 16 },
    { id: 'arquitecto',   name: 'Arquitecto',   role: 'Tech — specs, código, infra',       shortRole: 'Tech',        color: '#8B5CF6', initial: 'A', room: 'dev-room',       deskX: 3,  deskY: 3  },
    { id: 'estratega',    name: 'Estratega',     role: 'Strategy — mercado, pricing',       shortRole: 'Strategy',    color: '#F97316', initial: 'E', room: 'meeting-room',   deskX: 11, deskY: 3  },
    { id: 'contador',     name: 'Contador',      role: 'Finance — facturas, MRR, cash',     shortRole: 'Finance',     color: '#EF4444', initial: '$', room: 'finance-corner', deskX: 26, deskY: 3  },
  ];

  return defs.map(d => ({
    id: d.id,
    name: d.name,
    role: d.role,
    shortRole: d.shortRole,
    color: d.color,
    initial: d.initial,
    status: 'working' as const,
    room: d.room,
    position: { x: d.deskX * TILE_SIZE, y: d.deskY * TILE_SIZE },
    targetPosition: { x: d.deskX * TILE_SIZE, y: d.deskY * TILE_SIZE },
    deskPosition: { x: d.deskX * TILE_SIZE, y: d.deskY * TILE_SIZE },
    bubble: null,
    bubbleTimer: 0,
    animFrame: 0,
    animTimer: 0,
    nextActionTimer: randomDelay(),
    tasksActive: Math.floor(Math.random() * 5) + 1,
    tasksCompleted: Math.floor(Math.random() * 12) + 3,
    currentTask: CHAT_BUBBLES[d.id][0],
    emote: null,
    emoteTimer: 0,
  }));
}

function randomDelay(): number {
  return 5000 + Math.random() * 10000; // 5-15 seconds
}

export { randomDelay };
