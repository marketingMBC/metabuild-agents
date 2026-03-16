// ============================================================
// MBC Agent HQ — Data Fetching Hook (v2 — Real Notion data)
// ============================================================

'use client';

import { useEffect, useRef } from 'react';
import { useHQStore } from '@/stores/hq-store';

const POLL_INTERVAL = 20_000; // 20 seconds

export function useHQData() {
  const updateFromAPI = useHQStore(s => s.updateFromAPI);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/hq/status');
        if (!res.ok) return;
        const data = await res.json();
        updateFromAPI(data);
      } catch {
        // Silently fail — mock/simulation data continues
      }
    }

    fetchStatus();
    intervalRef.current = setInterval(fetchStatus, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [updateFromAPI]);
}
