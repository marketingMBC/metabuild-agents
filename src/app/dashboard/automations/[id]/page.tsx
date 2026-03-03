'use client';

import { use, useState } from 'react';
import { ArrowLeft, Save, Undo, ZoomIn, ZoomOut, ToggleLeft } from 'lucide-react';
import Link from 'next/link';
import { automations } from '@/lib/mock-data';
import Button from '@/components/ui/Button';
import FlowCanvas from '@/components/dashboard/automations/FlowCanvas';
import FlowToolbar from '@/components/dashboard/automations/FlowToolbar';
import FlowNodePalette from '@/components/dashboard/automations/FlowNodePalette';
import FlowNodeConfig from '@/components/dashboard/automations/FlowNodeConfig';

export default function AutomationFlowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const automation = automations.find((a) => a.id === id);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!automation) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-white/50">Automatización no encontrada</p>
        <Link href="/dashboard/automations" className="text-cyan text-sm mt-2 hover:underline">Volver</Link>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/automations" className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">{automation.name}</h1>
            <p className="text-sm text-white/50">Flow Builder</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FlowToolbar />
          <Button onClick={handleSave} loading={saving} icon={<Save size={16} />}>
            Guardar
          </Button>
        </div>
      </div>

      {/* Flow Builder */}
      <div className="flex gap-4">
        {/* Palette */}
        <div className="w-48 flex-shrink-0 hidden lg:block">
          <FlowNodePalette />
        </div>

        {/* Canvas */}
        <div className="flex-1">
          <FlowCanvas
            nodes={automation.nodes}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
          />
        </div>

        {/* Config Panel */}
        {selectedNodeId && (
          <div className="w-72 flex-shrink-0 hidden lg:block">
            <FlowNodeConfig
              node={automation.nodes.find((n) => n.id === selectedNodeId) || null}
              onClose={() => setSelectedNodeId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
