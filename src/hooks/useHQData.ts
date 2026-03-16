// ============================================================
// MBC Agent HQ — Data Fetching Hook (Fase 2)
// Polls /api/hq/status and updates the store with real data
// ============================================================

'use client';

import { useEffect, useRef } from 'react';
import { useHQStore } from '@/stores/hq-store';

const POLL_INTERVAL = 30_000; // 30 seconds

interface HQStatusResponse {
  agents: Record<string, {
    tasksActive: number;
    tasksCompleted: number;
    currentTask: string | null;
  }>;
  kpis: {
    totalTasks: number;
    activeTasks: number;
    pipelineValue: number;
    pipelineDeals: number;
    customersCount: number;
    recentMeetings: number;
  };
  lastUpdated: string;
}

export function useHQData() {
  const updateFromAPI = useHQStore(s => s.updateFromAPI);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/hq/status');
        if (!res.ok) return;
        const data: HQStatusResponse = await res.json();
        updateFromAPI(data);
      } catch {
        // Silently fail — mock data is fine
      }
    }

    // Initial fetch
    fetchStatus();

    // Poll
    intervalRef.current = setInterval(fetchStatus, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [updateFromAPI]);
}
