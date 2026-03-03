'use client';

import { X } from 'lucide-react';
import type { AutomationNode } from '@/lib/types';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

interface FlowNodeConfigProps {
  node: AutomationNode | null;
  onClose: () => void;
}

export default function FlowNodeConfig({ node, onClose }: FlowNodeConfigProps) {
  if (!node) return null;

  const typeLabel = node.type === 'trigger' ? 'Trigger' : node.type === 'condition' ? 'Condición' : 'Acción';

  return (
    <div className="rounded-xl border border-white/10 bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white">Configurar {typeLabel}</h3>
        <button onClick={onClose} className="p-1 text-white/40 hover:text-white rounded">
          <X size={14} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <Input label="Nombre" defaultValue={node.label} />
        <Textarea label="Descripción" defaultValue={node.description} rows={2} />

        {node.type === 'trigger' && (
          <div className="space-y-3">
            <Input label="Canal" defaultValue="WhatsApp" />
            <Input label="Condición" defaultValue="Mensaje recibido" />
          </div>
        )}

        {node.type === 'condition' && (
          <div className="space-y-3">
            <Input label="Variable" defaultValue="conversation.status" />
            <Input label="Operador" defaultValue="igual a" />
            <Input label="Valor" defaultValue="activa" />
          </div>
        )}

        {node.type === 'action' && (
          <div className="space-y-3">
            <Input label="Tipo de acción" defaultValue="Enviar mensaje" />
            <Textarea label="Contenido" defaultValue="Mensaje personalizado..." rows={3} />
          </div>
        )}

        <p className="text-[10px] text-white/30">ID: {node.id}</p>
      </div>
    </div>
  );
}
