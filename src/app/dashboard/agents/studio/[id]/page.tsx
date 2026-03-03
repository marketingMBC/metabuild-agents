'use client';

import { use } from 'react';
import StudioLayout from '@/components/dashboard/agents/studio/StudioLayout';

export default function AgentStudioEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <StudioLayout agentId={id} />;
}
