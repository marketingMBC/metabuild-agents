// ============================================================
// MBC Agent HQ — Types (Enhanced)
// ============================================================

export type HQAgentStatus = 'working' | 'idle' | 'meeting' | 'break';

export type HQRoomId =
  | 'dev-room'
  | 'meeting-room'
  | 'research-lab'
  | 'finance-corner'
  | 'creative-lab'
  | 'central'
  | 'sales-room'
  | 'reception'
  | 'break-room';

export interface HQPosition {
  x: number;
  y: number;
}

export interface HQRoom {
  id: HQRoomId;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface HQFurniture {
  type: 'desk' | 'chair' | 'plant' | 'screen' | 'table' | 'coffee';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface HQAgent {
  id: string;
  name: string;
  role: string;
  shortRole: string;
  color: string;
  initial: string;
  status: HQAgentStatus;
  room: HQRoomId;
  position: HQPosition;
  targetPosition: HQPosition;
  deskPosition: HQPosition;
  bubble: string | null;
  bubbleTimer: number;
  animFrame: number;
  animTimer: number;
  nextActionTimer: number;
  tasksActive: number;
  tasksCompleted: number;
  currentTask: string;
  emote: string | null;
  emoteTimer: number;
}

export interface HQSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface HQActivity {
  id: string;
  agentId: string;
  agentName: string;
  agentColor: string;
  action: string;
  timestamp: number;
}

export interface HQNotification {
  id: string;
  agentId: string;
  agentName: string;
  agentColor: string;
  message: string;
  timestamp: number;
}

export interface HQState {
  agents: HQAgent[];
  activities: HQActivity[];
  selectedAgentId: string | null;
  hoveredAgentId: string | null;
  kpis: {
    agentsActive: number;
    tasksToday: number;
    pipelineValue: string;
    mrr: string;
  };
}
