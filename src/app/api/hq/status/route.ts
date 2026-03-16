// ============================================================
// MBC Agent HQ — API Route: /api/hq/status
// Reads real agent tasks and activity from Notion
// ============================================================

import { NextResponse } from 'next/server';

// ── Notion Database IDs ──────────────────────────────────────
const NOTION_DBS = {
  agentTasks: 'c90ddf21-1523-47df-8926-b171f4dcc724',   // Agent Tasks — MBC HQ
  agentLog: '8394903c-8109-48a9-857d-f87cb883dceb',      // Agent Activity Log
  projects: '2a6a6b94-34ae-81c8-8bc0-f2acf1dca9a4',
  pipeline: 'd965d6db-84d7-4107-a87b-9b979e418d43',
  customers: '2a6a6b94-34ae-81df-9158-d1c0791d4603',
};

const AGENT_IDS = ['Director', 'Vendedor', 'Creador', 'Investigador', 'Soporte', 'Arquitecto', 'Estratega', 'Contador'];
const AGENT_MAP: Record<string, string> = {
  'Director': 'director', 'Vendedor': 'vendedor', 'Creador': 'creador',
  'Investigador': 'investigador', 'Soporte': 'soporte', 'Arquitecto': 'arquitecto',
  'Estratega': 'estratega', 'Contador': 'contador',
};

// Cache
let cache: { data: HQStatusResponse | null; timestamp: number } = { data: null, timestamp: 0 };
const CACHE_TTL = 20_000; // 20 seconds

interface AgentData {
  tasksActive: number;
  tasksCompleted: number;
  currentTask: string | null;
  tasks: Array<{ title: string; priority: string; type: string; status: string }>;
}

interface HQStatusResponse {
  agents: Record<string, AgentData>;
  activities: Array<{ agent: string; action: string; type: string; timestamp: string }>;
  kpis: {
    totalTasks: number;
    activeTasks: number;
    completedTasks: number;
    pipelineDeals: number;
    customersCount: number;
  };
  lastUpdated: string;
  source: 'notion' | 'mock';
}

export async function GET() {
  const now = Date.now();

  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  const notionKey = process.env.NOTION_API_KEY;

  // ── Mock data if no API key ──
  if (!notionKey) {
    const mock = generateMockResponse();
    cache = { data: mock, timestamp: now };
    return NextResponse.json(mock);
  }

  // ── Real Notion fetch ──
  try {
    const headers = {
      'Authorization': `Bearer ${notionKey}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    };

    const [tasksRes, logRes, pipelineRes, customersRes] = await Promise.allSettled([
      fetch(`https://api.notion.com/v1/databases/${NOTION_DBS.agentTasks}/query`, {
        method: 'POST', headers,
        body: JSON.stringify({ page_size: 100, sorts: [{ property: 'Fecha Inicio', direction: 'descending' }] }),
      }),
      fetch(`https://api.notion.com/v1/databases/${NOTION_DBS.agentLog}/query`, {
        method: 'POST', headers,
        body: JSON.stringify({ page_size: 30, sorts: [{ timestamp: 'created_time', direction: 'descending' }] }),
      }),
      fetch(`https://api.notion.com/v1/databases/${NOTION_DBS.pipeline}/query`, {
        method: 'POST', headers,
        body: JSON.stringify({ page_size: 50 }),
      }),
      fetch(`https://api.notion.com/v1/databases/${NOTION_DBS.customers}/query`, {
        method: 'POST', headers,
        body: JSON.stringify({ page_size: 100 }),
      }),
    ]);

    const response: HQStatusResponse = {
      agents: {},
      activities: [],
      kpis: { totalTasks: 0, activeTasks: 0, completedTasks: 0, pipelineDeals: 0, customersCount: 0 },
      lastUpdated: new Date().toISOString(),
      source: 'notion',
    };

    // Init agents
    for (const name of AGENT_IDS) {
      const key = AGENT_MAP[name];
      response.agents[key] = { tasksActive: 0, tasksCompleted: 0, currentTask: null, tasks: [] };
    }

    // Process tasks
    if (tasksRes.status === 'fulfilled' && tasksRes.value.ok) {
      const data = await tasksRes.value.json();
      response.kpis.totalTasks = data.results?.length || 0;

      for (const page of data.results || []) {
        const props = page.properties;
        const agentName = props?.Agente?.select?.name;
        const status = props?.Estado?.status?.name || 'Not started';
        const title = props?.Tarea?.title?.[0]?.plain_text || 'Sin titulo';
        const priority = props?.Prioridad?.select?.name || 'Media';
        const type = props?.Tipo?.select?.name || 'Coordinacion';

        const key = AGENT_MAP[agentName];
        if (!key || !response.agents[key]) continue;

        const isComplete = status === 'Done' || status === 'Completada';

        if (isComplete) {
          response.agents[key].tasksCompleted++;
          response.kpis.completedTasks++;
        } else {
          response.agents[key].tasksActive++;
          response.kpis.activeTasks++;
          if (!response.agents[key].currentTask) {
            response.agents[key].currentTask = title;
          }
        }

        response.agents[key].tasks.push({ title, priority, type, status });
      }
    }

    // Process activity log
    if (logRes.status === 'fulfilled' && logRes.value.ok) {
      const data = await logRes.value.json();
      for (const page of data.results || []) {
        const props = page.properties;
        response.activities.push({
          agent: AGENT_MAP[props?.Agente?.select?.name] || 'director',
          action: props?.Accion?.title?.[0]?.plain_text || '',
          type: props?.Tipo?.select?.name || '',
          timestamp: page.created_time,
        });
      }
    }

    // Pipeline
    if (pipelineRes.status === 'fulfilled' && pipelineRes.value.ok) {
      const data = await pipelineRes.value.json();
      response.kpis.pipelineDeals = data.results?.length || 0;
    }

    // Customers
    if (customersRes.status === 'fulfilled' && customersRes.value.ok) {
      const data = await customersRes.value.json();
      response.kpis.customersCount = data.results?.length || 0;
    }

    cache = { data: response, timestamp: now };
    return NextResponse.json(response);
  } catch (error) {
    console.error('HQ Status API error:', error);
    if (cache.data) return NextResponse.json(cache.data);
    return NextResponse.json(generateMockResponse());
  }
}

function generateMockResponse(): HQStatusResponse {
  return {
    agents: {
      director: { tasksActive: 2, tasksCompleted: 0, currentTask: 'Asignar tareas semanales a todos los agentes', tasks: [] },
      vendedor: { tasksActive: 3, tasksCompleted: 0, currentTask: 'Follow-up FinteChile — cobro pendiente $5,800 USD', tasks: [] },
      creador: { tasksActive: 2, tasksCompleted: 0, currentTask: 'Crear 3 posts LinkedIn — semana del 16 marzo', tasks: [] },
      investigador: { tasksActive: 2, tasksCompleted: 0, currentTask: 'Research mercado ConTech Chile Q1 2026', tasks: [] },
      soporte: { tasksActive: 2, tasksCompleted: 0, currentTask: 'Revisar tickets pendientes de soporte FinteChile', tasks: [] },
      arquitecto: { tasksActive: 2, tasksCompleted: 0, currentTask: 'Conectar Agent HQ a Notion databases reales', tasks: [] },
      estratega: { tasksActive: 2, tasksCompleted: 0, currentTask: 'Revisar pricing Metabuild Smart — analisis Q1', tasks: [] },
      contador: { tasksActive: 2, tasksCompleted: 0, currentTask: 'Balance financiero marzo 2026', tasks: [] },
    },
    activities: [],
    kpis: { totalTasks: 17, activeTasks: 17, completedTasks: 0, pipelineDeals: 8, customersCount: 12 },
    lastUpdated: new Date().toISOString(),
    source: 'mock',
  };
}
