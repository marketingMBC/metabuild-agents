// ============================================================
// MBC Agent HQ — Zustand Store (v3 — emotes, sparkles, speed)
// ============================================================

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { HQAgent, HQActivity, HQRoomId } from '@/lib/hq/types';
import {
  createInitialAgents, ROOMS, TILE_SIZE,
  CHAT_BUBBLES, randomDelay, getRoomCenter,
} from '@/lib/hq/constants';
import { moveTowards, randomPositionInRoom } from '@/lib/hq/engine/pathfinding';

// Emote sets per context
const EMOTES_WORK = ['💻', '📊', '✏️', '🔧', '📋', '⚡'];
const EMOTES_COMPLETE = ['✅', '🎉', '🚀', '💪', '⭐'];
const EMOTES_MEETING = ['🤝', '💬', '📢', '🗣️'];
const EMOTES_BREAK = ['☕', '🍕', '🎮', '😴', '🎵'];

interface HQStoreState {
  agents: HQAgent[];
  activities: HQActivity[];
  selectedAgentId: string | null;
  hoveredAgentId: string | null;
  speed: number; // 1, 2, or 4
  kpis: {
    agentsActive: number;
    tasksToday: number;
    pipelineValue: string;
    mrr: string;
  };
  lastAPIUpdate: number | null;
  sparkleQueue: Array<{ x: number; y: number; color: string }>;

  // Actions
  selectAgent: (id: string | null) => void;
  setHoveredAgent: (id: string | null) => void;
  setSpeed: (speed: number) => void;
  tick: (dt: number) => void;
  addActivity: (agentId: string, action: string) => void;
  consumeSparkles: () => Array<{ x: number; y: number; color: string }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateFromAPI: (data: any) => void;
}

export const useHQStore = create<HQStoreState>()(
  immer((set, get) => ({
    agents: createInitialAgents(),
    activities: generateInitialActivities(),
    selectedAgentId: null,
    hoveredAgentId: null,
    speed: 1,
    lastAPIUpdate: null,
    sparkleQueue: [],
    kpis: {
      agentsActive: 8,
      tasksToday: 24,
      pipelineValue: '$32.5M',
      mrr: '$1,200',
    },

    selectAgent: (id) => set((state) => { state.selectedAgentId = id; }),
    setHoveredAgent: (id) => set((state) => { state.hoveredAgentId = id; }),
    setSpeed: (speed) => set((state) => { state.speed = speed; }),

    consumeSparkles: () => {
      const sparkles = get().sparkleQueue;
      if (sparkles.length === 0) return [];
      set((state) => { state.sparkleQueue = []; });
      return sparkles;
    },

    addActivity: (agentId, action) =>
      set((state) => {
        const agent = state.agents.find(a => a.id === agentId);
        if (!agent) return;
        pushActivity(state, agentId, agent.name, agent.color, action);
      }),

    updateFromAPI: (data) =>
      set((state) => {
        if (!data?.agents) return;
        for (const agent of state.agents) {
          const apiAgent = data.agents[agent.id];
          if (apiAgent) {
            agent.tasksActive = apiAgent.tasksActive;
            agent.tasksCompleted = apiAgent.tasksCompleted;
            if (apiAgent.currentTask) agent.currentTask = apiAgent.currentTask;
          }
        }
        if (data.kpis) {
          state.kpis.tasksToday = data.kpis.totalTasks || state.kpis.tasksToday;
          if (data.kpis.pipelineDeals) state.kpis.pipelineValue = `${data.kpis.pipelineDeals} deals`;
          if (data.kpis.customersCount) state.kpis.mrr = `${data.kpis.customersCount} clientes`;
        }
        if (data.activities?.length > 0) {
          for (const act of data.activities) {
            const ag = state.agents.find(a => a.id === act.agent);
            if (!ag) continue;
            const exists = state.activities.some(a => a.action === act.action && a.agentId === act.agent);
            if (!exists) {
              state.activities.unshift({
                id: `api-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
                agentId: act.agent, agentName: ag.name, agentColor: ag.color,
                action: act.action, timestamp: new Date(act.timestamp).getTime(),
              });
            }
          }
          if (state.activities.length > 60) state.activities = state.activities.slice(0, 60);
        }
        state.lastAPIUpdate = Date.now();
      }),

    tick: (dt) =>
      set((state) => {
        const spd = state.speed;
        const adt = dt * spd;

        for (const agent of state.agents) {
          // Move (speed-adjusted)
          for (let s = 0; s < spd; s++) {
            const result = moveTowards(agent.position, agent.targetPosition);
            agent.position.x = result.x;
            agent.position.y = result.y;
            if (result.arrived) break;
          }

          // Animate
          agent.animTimer += adt;
          if (agent.animTimer > 150) {
            agent.animFrame++;
            agent.animTimer = 0;
          }

          // Bubble timer
          if (agent.bubble) {
            agent.bubbleTimer -= adt;
            if (agent.bubbleTimer <= 0) agent.bubble = null;
          }

          // Emote timer
          if (agent.emote) {
            agent.emoteTimer -= adt;
            if (agent.emoteTimer <= 0) { agent.emote = null; agent.emoteTimer = 0; }
          }

          // Next action
          agent.nextActionTimer -= adt;
          const arrived = Math.hypot(agent.targetPosition.x - agent.position.x, agent.targetPosition.y - agent.position.y) < 5;
          if (agent.nextActionTimer <= 0 && arrived) {
            performNextAction(agent, state);
            agent.nextActionTimer = randomDelay();
          }
        }

        state.kpis.agentsActive = state.agents.filter(a => a.status === 'working').length;
      }),
  })),
);

// ── Action Logic ─────────────────────────────────────────────

function performNextAction(agent: HQAgent, state: HQStoreState) {
  const roll = Math.random();

  // Director special behavior
  if (agent.id === 'director') {
    if (roll < 0.60) {
      goToDesk(agent);
      showEmote(agent, EMOTES_WORK);
    } else if (roll < 0.80) {
      goToRoom(agent, state, 'meeting-room', 'meeting', 'Standup con equipo');
      showEmote(agent, EMOTES_MEETING);
    } else {
      goToRoom(agent, state, 'break-room', 'break', 'Café ☕');
      showEmote(agent, EMOTES_BREAK);
    }
    return;
  }

  if (roll < 0.45) {
    goToDesk(agent);
    showEmote(agent, EMOTES_WORK);
    // Task completion
    if (Math.random() < 0.35) {
      agent.tasksCompleted++;
      if (agent.tasksActive > 0) agent.tasksActive--;
      const taskName = agent.currentTask;
      pushActivity(state, agent.id, agent.name, agent.color, `Completó: ${taskName}`);
      showEmote(agent, EMOTES_COMPLETE);
      // Queue sparkle
      state.sparkleQueue.push({ x: agent.position.x, y: agent.position.y, color: agent.color });
      // Assign new task
      if (agent.tasksActive <= 0) {
        agent.tasksActive = Math.floor(Math.random() * 3) + 1;
        pushActivity(state, agent.id, agent.name, agent.color, 'Nuevas tareas asignadas');
      }
    }
  } else if (roll < 0.60) {
    goToRoom(agent, state, 'meeting-room', 'meeting', 'Reunión de equipo');
    showEmote(agent, EMOTES_MEETING);
  } else if (roll < 0.72) {
    goToRoom(agent, state, 'break-room', 'break', 'Café ☕');
    showEmote(agent, EMOTES_BREAK);
  } else if (roll < 0.84) {
    const center = getRoomCenter('central');
    agent.status = 'meeting';
    agent.targetPosition = {
      x: center.x + (Math.random() - 0.5) * 80,
      y: center.y + (Math.random() - 0.5) * 40,
    };
    agent.room = 'central';
    showBubble(agent, 'Sync con Director');
    pushActivity(state, agent.id, agent.name, agent.color, 'Sync con Director');
    showEmote(agent, EMOTES_MEETING);
  } else if (roll < 0.93) {
    // Visit another room
    const otherRooms: HQRoomId[] = ['research-lab', 'creative-lab', 'dev-room', 'sales-room', 'reception', 'finance-corner'];
    const filtered = otherRooms.filter(r => r !== getAgentHomeRoom(agent.id));
    const targetRoom = filtered[Math.floor(Math.random() * filtered.length)];
    goToRoom(agent, state, targetRoom, 'idle');
  } else {
    // Wander in own room
    const homeRoom = getAgentHomeRoom(agent.id);
    const room = ROOMS.find(r => r.id === homeRoom)!;
    agent.status = 'working';
    agent.targetPosition = randomPositionInRoom(room.x, room.y, room.width, room.height, TILE_SIZE);
    agent.room = homeRoom;
    showBubble(agent);
    showEmote(agent, EMOTES_WORK);
  }
}

function goToDesk(agent: HQAgent) {
  agent.status = 'working';
  agent.targetPosition = { ...agent.deskPosition };
  agent.room = getAgentHomeRoom(agent.id);
  showBubble(agent);
}

function goToRoom(agent: HQAgent, state: HQStoreState, roomId: HQRoomId, status: HQAgent['status'], bubbleText?: string) {
  const room = ROOMS.find(r => r.id === roomId)!;
  agent.status = status;
  agent.targetPosition = randomPositionInRoom(room.x, room.y, room.width, room.height, TILE_SIZE);
  agent.room = roomId;
  if (bubbleText) {
    showBubble(agent, bubbleText);
    pushActivity(state, agent.id, agent.name, agent.color, bubbleText);
  } else {
    showBubble(agent);
  }
}

function showBubble(agent: HQAgent, text?: string) {
  const bubbles = CHAT_BUBBLES[agent.id] || ['Trabajando...'];
  agent.bubble = text || bubbles[Math.floor(Math.random() * bubbles.length)];
  agent.bubbleTimer = 3500;
  agent.currentTask = agent.bubble;
}

function showEmote(agent: HQAgent, emotes: string[]) {
  if (Math.random() > 0.5) return; // 50% chance to show emote
  agent.emote = emotes[Math.floor(Math.random() * emotes.length)];
  agent.emoteTimer = 2000;
}

function getAgentHomeRoom(agentId: string): HQRoomId {
  const map: Record<string, HQRoomId> = {
    director: 'central', vendedor: 'sales-room', creador: 'creative-lab',
    investigador: 'research-lab', soporte: 'reception', arquitecto: 'dev-room',
    estratega: 'meeting-room', contador: 'finance-corner',
  };
  return map[agentId] || 'central';
}

function pushActivity(state: HQStoreState, agentId: string, name: string, color: string, action: string) {
  state.activities.unshift({
    id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    agentId, agentName: name, agentColor: color, action, timestamp: Date.now(),
  });
  if (state.activities.length > 50) state.activities = state.activities.slice(0, 50);
}

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function generateInitialActivities(): HQActivity[] {
  const agents = createInitialAgents();
  const actions = [
    'Inició sesión', 'Completó tarea', 'Revisando dashboard',
    'Actualizó pipeline', 'Envió reporte', 'Respondió ticket',
    'Code review aprobado', 'Meeting agendada', 'Propuesta enviada',
    'Nuevo lead capturado', 'FAQ actualizada', 'Deploy exitoso',
  ];
  const activities: HQActivity[] = [];
  const now = Date.now();
  for (let i = 0; i < 15; i++) {
    const agent = agents[Math.floor(Math.random() * agents.length)];
    activities.push({
      id: `act-init-${i}`, agentId: agent.id, agentName: agent.name,
      agentColor: agent.color, action: actions[Math.floor(Math.random() * actions.length)],
      timestamp: now - i * 60000 * (1 + Math.random() * 4),
    });
  }
  return activities;
}
