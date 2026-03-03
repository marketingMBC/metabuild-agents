'use client';

import { cn } from '@/lib/utils';
import type { AutomationNode } from '@/lib/types';
import FlowNode from './FlowNode';
import FlowEdge from './FlowEdge';

interface FlowCanvasProps {
  nodes: AutomationNode[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
}

export default function FlowCanvas({ nodes, selectedNodeId, onSelectNode }: FlowCanvasProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-surface p-6 min-h-[500px] relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Flow */}
      <div className="relative flex flex-col items-center gap-0">
        {nodes.map((node, idx) => (
          <div key={node.id} className="flex flex-col items-center">
            <FlowNode
              node={node}
              selected={selectedNodeId === node.id}
              onClick={() => onSelectNode(node.id)}
            />
            {idx < nodes.length - 1 && <FlowEdge />}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/30 text-sm">Arrastra nodos desde la paleta para comenzar</p>
        </div>
      )}
    </div>
  );
}
