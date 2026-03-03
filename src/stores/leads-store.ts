import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Lead, LeadStage } from '@/lib/types';

interface LeadsState {
  leads: Lead[];
  selectedLeadId: string | null;
  filterStage: LeadStage | 'all';
  filterAgentId: string | 'all';
  searchQuery: string;
  loading: boolean;
  error: string | null;

  setLeads: (leads: Lead[]) => void;
  selectLead: (id: string | null) => void;
  setFilterStage: (stage: LeadStage | 'all') => void;
  setFilterAgentId: (agentId: string | 'all') => void;
  setSearchQuery: (query: string) => void;
  updateLeadStage: (id: string, stage: LeadStage) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLeadsStore = create<LeadsState>()(
  immer((set) => ({
    leads: [],
    selectedLeadId: null,
    filterStage: 'all',
    filterAgentId: 'all',
    searchQuery: '',
    loading: false,
    error: null,

    setLeads: (leads) => set((state) => { state.leads = leads; }),
    selectLead: (id) => set((state) => { state.selectedLeadId = id; }),
    setFilterStage: (stage) => set((state) => { state.filterStage = stage; }),
    setFilterAgentId: (agentId) => set((state) => { state.filterAgentId = agentId; }),
    setSearchQuery: (query) => set((state) => { state.searchQuery = query; }),
    updateLeadStage: (id, stage) =>
      set((state) => {
        const lead = state.leads.find((l) => l.id === id);
        if (lead) lead.stage = stage;
      }),
    setLoading: (loading) => set((state) => { state.loading = loading; }),
    setError: (error) => set((state) => { state.error = error; }),
  }))
);
