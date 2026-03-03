import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Agent, AgentStatus } from '@/lib/types';

interface AgentsState {
  agents: Agent[];
  selectedAgentId: string | null;
  filterType: string | 'all';
  filterStatus: AgentStatus | 'all';
  loading: boolean;
  error: string | null;

  // Studio state
  studioAgentId: string | null;
  studioActiveTab: string;

  // Actions
  setAgents: (agents: Agent[]) => void;
  selectAgent: (id: string | null) => void;
  setFilterType: (type: string | 'all') => void;
  setFilterStatus: (status: AgentStatus | 'all') => void;
  updateAgentStatus: (id: string, status: AgentStatus) => void;
  setStudioAgentId: (id: string | null) => void;
  setStudioActiveTab: (tab: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAgentsStore = create<AgentsState>()(
  immer((set) => ({
    agents: [],
    selectedAgentId: null,
    filterType: 'all',
    filterStatus: 'all',
    loading: false,
    error: null,

    studioAgentId: null,
    studioActiveTab: 'general',

    setAgents: (agents) => set((state) => { state.agents = agents; }),
    selectAgent: (id) => set((state) => { state.selectedAgentId = id; }),
    setFilterType: (type) => set((state) => { state.filterType = type; }),
    setFilterStatus: (status) => set((state) => { state.filterStatus = status; }),
    updateAgentStatus: (id, status) =>
      set((state) => {
        const agent = state.agents.find((a) => a.id === id);
        if (agent) agent.status = status;
      }),
    setStudioAgentId: (id) => set((state) => { state.studioAgentId = id; }),
    setStudioActiveTab: (tab) => set((state) => { state.studioActiveTab = tab; }),
    setLoading: (loading) => set((state) => { state.loading = loading; }),
    setError: (error) => set((state) => { state.error = error; }),
  }))
);
