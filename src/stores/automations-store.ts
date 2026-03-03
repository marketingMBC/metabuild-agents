import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Automation, AutomationCategory } from '@/lib/types';

interface AutomationsState {
  automations: Automation[];
  selectedAutomationId: string | null;
  filterCategory: AutomationCategory | 'all';
  loading: boolean;
  error: string | null;

  setAutomations: (automations: Automation[]) => void;
  selectAutomation: (id: string | null) => void;
  setFilterCategory: (category: AutomationCategory | 'all') => void;
  toggleAutomation: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAutomationsStore = create<AutomationsState>()(
  immer((set) => ({
    automations: [],
    selectedAutomationId: null,
    filterCategory: 'all',
    loading: false,
    error: null,

    setAutomations: (automations) => set((state) => { state.automations = automations; }),
    selectAutomation: (id) => set((state) => { state.selectedAutomationId = id; }),
    setFilterCategory: (category) => set((state) => { state.filterCategory = category; }),
    toggleAutomation: (id) =>
      set((state) => {
        const auto = state.automations.find((a) => a.id === id);
        if (auto) auto.enabled = !auto.enabled;
      }),
    setLoading: (loading) => set((state) => { state.loading = loading; }),
    setError: (error) => set((state) => { state.error = error; }),
  }))
);
