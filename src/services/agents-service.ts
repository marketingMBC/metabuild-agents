import { apiGet, apiPost, apiPut } from './api';
import { agents as mockAgents } from '@/lib/mock-data';
import type { Agent, AgentStatus } from '@/lib/types';

export const agentsService = {
  getAll: () => apiGet(mockAgents),
  getById: (id: string) => apiGet(mockAgents.find((a) => a.id === id) || null),
  create: (agent: Agent) => apiPost(agent),
  update: (id: string, updates: Partial<Agent>) => {
    const agent = mockAgents.find((a) => a.id === id);
    return apiPut(agent ? { ...agent, ...updates } : null);
  },
  updateStatus: (id: string, status: AgentStatus) => {
    const agent = mockAgents.find((a) => a.id === id);
    return apiPut(agent ? { ...agent, status } : null);
  },
};
