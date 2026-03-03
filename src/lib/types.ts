// ============================================================
// Metabuild Smart — Dashboard Types
// ============================================================

export type Channel = 'whatsapp' | 'instagram' | 'facebook' | 'email' | 'web';
export type ConversationStatus = 'active' | 'waiting' | 'resolved' | 'archived';
export type AgentType = 'ventas' | 'soporte' | 'rrss' | 'admin' | 'operaciones';
export type AgentStatus = 'active' | 'paused' | 'error' | 'training';
export type LeadStage = 'nuevo' | 'contactado' | 'calificado' | 'propuesta' | 'cerrado';
export type MessageSender = 'user' | 'agent' | 'system';
export type AutomationTrigger = 'message_received' | 'lead_created' | 'time_based' | 'tag_added' | 'conversation_idle' | 'form_submitted';
export type AutomationCategory = 'bienvenida' | 'seguimiento' | 'escalacion' | 'scoring' | 'notificacion' | 'recordatorio';
export type TeamRole = 'admin' | 'manager' | 'agent' | 'viewer';
export type PlanTier = 'starter' | 'growth' | 'enterprise';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  avatar: string;
  channels: Channel[];
  description: string;
  conversationsTotal: number;
  conversationsToday: number;
  responseTime: string;
  satisfactionRate: number;
  createdAt: string;
  lastActive: string;
  personality: string;
  language: string;
  tags: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
  channel: Channel;
}

export interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  instagram?: string;
  avatar?: string;
  tags: string[];
  notes: string;
  createdAt: string;
  lastInteraction: string;
}

export interface Conversation {
  id: string;
  contact: Contact;
  agentId: string;
  agentName: string;
  channel: Channel;
  status: ConversationStatus;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface Lead {
  id: string;
  contactName: string;
  company?: string;
  email: string;
  phone: string;
  channel: Channel;
  stage: LeadStage;
  value: number;
  agentId: string;
  agentName: string;
  tags: string[];
  notes: string;
  createdAt: string;
  lastActivity: string;
  score: number;
}

export interface AutomationNode {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  label: string;
  description: string;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  category: AutomationCategory;
  trigger: AutomationTrigger;
  enabled: boolean;
  executionsTotal: number;
  executionsToday: number;
  successRate: number;
  lastExecuted: string;
  createdAt: string;
  nodes: AutomationNode[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  avatar?: string;
  lastActive: string;
  assignedAgents: string[];
}

export interface KPI {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface ChannelConfig {
  id: Channel;
  label: string;
  connected: boolean;
  accountName?: string;
  color: string;
}

export interface PlanInfo {
  tier: PlanTier;
  name: string;
  price: number;
  agentsLimit: number;
  conversationsLimit: number;
  features: string[];
}

// ── New Types for Agents Platform ──────────────────────────

export type Theme = 'dark' | 'light';
export type ConversationChannel = Channel; // alias for clarity

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface Toast {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'txt' | 'url';
  size?: string;
  url?: string;
  status: 'processing' | 'ready' | 'error';
  agentIds: string[];
  uploadedAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  agentIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FlowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay';
  label: string;
  description: string;
  config: Record<string, unknown>;
  position: { x: number; y: number };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface AgentConfig {
  id: string;
  agentId: string;
  greeting: string;
  fallbackMessage: string;
  personalityTemplate: 'profesional' | 'cercano' | 'formal' | 'juvenil';
  maxResponseTime: number;
  enabledChannels: Channel[];
  knowledgeDocIds: string[];
  faqIds: string[];
  escalationRules: EscalationRule[];
}

export interface EscalationRule {
  id: string;
  type: 'sentiment' | 'keyword' | 'timeout' | 'manual';
  condition: string;
  action: 'notify' | 'transfer' | 'pause';
  targetTeamMemberId?: string;
}

export interface CannedResponse {
  id: string;
  shortcut: string;
  title: string;
  content: string;
  category: string;
  agentIds: string[];
}

export interface InternalNote {
  id: string;
  conversationId: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
}
