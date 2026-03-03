import { apiGet, apiPut } from './api';
import { leads as mockLeads } from '@/lib/mock-data';
import type { Lead, LeadStage } from '@/lib/types';

export const leadsService = {
  getAll: () => apiGet(mockLeads),
  getById: (id: string) => apiGet(mockLeads.find((l) => l.id === id) || null),
  updateStage: (id: string, stage: LeadStage) => {
    const lead = mockLeads.find((l) => l.id === id);
    return apiPut(lead ? { ...lead, stage } : null);
  },
  update: (id: string, updates: Partial<Lead>) => {
    const lead = mockLeads.find((l) => l.id === id);
    return apiPut(lead ? { ...lead, ...updates } : null);
  },
};
