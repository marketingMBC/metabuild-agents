import { apiGet, apiPut } from './api';
import { automations as mockAutomations } from '@/lib/mock-data';
import type { Automation } from '@/lib/types';

export const automationsService = {
  getAll: () => apiGet(mockAutomations),
  getById: (id: string) => apiGet(mockAutomations.find((a) => a.id === id) || null),
  toggle: (id: string) => {
    const auto = mockAutomations.find((a) => a.id === id);
    return apiPut(auto ? { ...auto, enabled: !auto.enabled } : null);
  },
  update: (id: string, updates: Partial<Automation>) => {
    const auto = mockAutomations.find((a) => a.id === id);
    return apiPut(auto ? { ...auto, ...updates } : null);
  },
};
