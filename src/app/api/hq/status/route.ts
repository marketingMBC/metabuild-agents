// ============================================================
// MBC Agent HQ — API Route: /api/hq/status
// Fetches agent data from Notion databases (Fase 2)
// ============================================================

import { NextResponse } from 'next/server';

// Notion Database IDs (from MBC system)
const NOTION_DBS = {
  projects: '2a6a6b94-34ae-81c8-8bc0-f2acf1dca9a4',
  pipeline: 'd965d6db-84d7-4107-a87b-9b979e418d43',
  meetings: '2a6a6b94-34ae-8197-8075-c061df545a79',
  customers: '2a6a6b94-34ae-81df-9158-d1c0791d4603',
};

// In-memory cache (server-side)
let cache: { data: HQStatusResponse | null; timestamp: number } = {
  data: null,
  timestamp: 0,
};
const CACHE_TTL = 30_000; // 30 seconds

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

export async function GET() {
  const now = Date.now();

  // Return cached data if fresh
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  // If no Notion API key, return mock data
  const notionKey = process.env.NOTION_API_KEY;
  if (!notionKey) {
    const mockResponse: HQStatusResponse = {
      agents: {
        director: { tasksActive: 3, tasksCompleted: 8, currentTask: 'Sprint planning Q2' },
        vendedor: { tasksActive: 5, tasksCompleted: 12, currentTask: 'Propuesta FinteChile' },
        creador: { tasksActive: 2, tasksCompleted: 6, currentTask: 'Case study Neurocupa' },
        investigador: { tasksActive: 1, tasksCompleted: 4, currentTask: 'Market analysis LATAM' },
        soporte: { tasksActive: 4, tasksCompleted: 15, currentTask: 'Onboarding nuevo cliente' },
        arquitecto: { tasksActive: 3, tasksCompleted: 9, currentTask: 'API v2 deploy' },
        estratega: { tasksActive: 2, tasksCompleted: 5, currentTask: 'Pricing tier review' },
        contador: { tasksActive: 1, tasksCompleted: 7, currentTask: 'Balance mensual' },
      },
      kpis: {
        totalTasks: 24,
        activeTasks: 21,
        pipelineValue: 32500000,
        pipelineDeals: 8,
        customersCount: 12,
        recentMeetings: 5,
      },
      lastUpdated: new Date().toISOString(),
    };
    cache = { data: mockResponse, timestamp: now };
    return NextResponse.json(mockResponse);
  }

  // Real Notion fetching (Fase 2 — when NOTION_API_KEY is set)
  try {
    const headers = {
      'Authorization': `Bearer ${notionKey}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    };

    // Parallel fetch from all databases
    const [projectsRes, pipelineRes, meetingsRes, customersRes] = await Promise.allSettled([
      fetch(`https://api.notion.com/v1/databases/${NOTION_DBS.projects}/query`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ page_size: 100 }),
      }),
      fetch(`https://api.notion.com/v1/databases/${NOTION_DBS.pipeline}/query`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ page_size: 100 }),
      }),
      fetch(`https://api.notion.com/v1/databases/${NOTION_DBS.meetings}/query`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ page_size: 20 }),
      }),
      fetch(`https://api.notion.com/v1/databases/${NOTION_DBS.customers}/query`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ page_size: 100 }),
      }),
    ]);

    const response: HQStatusResponse = {
      agents: {
        director: { tasksActive: 0, tasksCompleted: 0, currentTask: null },
        vendedor: { tasksActive: 0, tasksCompleted: 0, currentTask: null },
        creador: { tasksActive: 0, tasksCompleted: 0, currentTask: null },
        investigador: { tasksActive: 0, tasksCompleted: 0, currentTask: null },
        soporte: { tasksActive: 0, tasksCompleted: 0, currentTask: null },
        arquitecto: { tasksActive: 0, tasksCompleted: 0, currentTask: null },
        estratega: { tasksActive: 0, tasksCompleted: 0, currentTask: null },
        contador: { tasksActive: 0, tasksCompleted: 0, currentTask: null },
      },
      kpis: {
        totalTasks: 0,
        activeTasks: 0,
        pipelineValue: 0,
        pipelineDeals: 0,
        customersCount: 0,
        recentMeetings: 0,
      },
      lastUpdated: new Date().toISOString(),
    };

    // Process projects
    if (projectsRes.status === 'fulfilled' && projectsRes.value.ok) {
      const data = await projectsRes.value.json();
      response.kpis.totalTasks = data.results?.length || 0;
      response.kpis.activeTasks = data.results?.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r: any) => r.properties?.Estado?.status?.name !== 'Completada'
      ).length || 0;
    }

    // Process pipeline
    if (pipelineRes.status === 'fulfilled' && pipelineRes.value.ok) {
      const data = await pipelineRes.value.json();
      response.kpis.pipelineDeals = data.results?.length || 0;
    }

    // Process customers
    if (customersRes.status === 'fulfilled' && customersRes.value.ok) {
      const data = await customersRes.value.json();
      response.kpis.customersCount = data.results?.length || 0;
    }

    // Process meetings
    if (meetingsRes.status === 'fulfilled' && meetingsRes.value.ok) {
      const data = await meetingsRes.value.json();
      response.kpis.recentMeetings = data.results?.length || 0;
    }

    cache = { data: response, timestamp: now };
    return NextResponse.json(response);
  } catch (error) {
    console.error('HQ Status API error:', error);
    // Return cache even if stale, or empty response
    if (cache.data) {
      return NextResponse.json(cache.data);
    }
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}
