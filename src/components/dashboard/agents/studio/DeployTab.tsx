'use client';

import { CheckCircle, Circle, Copy, QrCode, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Channel } from '@/lib/types';
import Button from '@/components/ui/Button';

interface DeployTabProps {
  agentName: string;
  channels: Channel[];
}

const CHECKLIST = [
  { id: 'name', label: 'Nombre configurado' },
  { id: 'personality', label: 'Personalidad definida' },
  { id: 'channels', label: 'Al menos 1 canal habilitado' },
  { id: 'knowledge', label: 'Base de conocimiento cargada' },
  { id: 'test', label: 'Prueba realizada' },
];

export default function DeployTab({ agentName, channels }: DeployTabProps) {
  // Simulated checklist state
  const completedItems = ['name', 'personality', 'channels'];

  const embedCode = `<!-- MetaBuild Agents Widget -->
<script src="https://cdn.metabuildcity.com/widget.js"
  data-agent="${agentName.toLowerCase().replace(/\s+/g, '-')}"
  data-color="#29F8D4"
  data-position="bottom-right">
</script>`;

  return (
    <div className="space-y-6">
      {/* Checklist */}
      <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
        <h3 className="text-base font-semibold text-white">Checklist de Despliegue</h3>
        <div className="space-y-2.5">
          {CHECKLIST.map((item) => {
            const done = completedItems.includes(item.id);
            return (
              <div key={item.id} className="flex items-center gap-3">
                {done ? (
                  <CheckCircle size={18} className="text-green-400" />
                ) : (
                  <Circle size={18} className="text-white/20" />
                )}
                <span className={cn('text-sm', done ? 'text-white' : 'text-white/40')}>{item.label}</span>
              </div>
            );
          })}
        </div>
        <div className="pt-2">
          <Button size="lg" className="w-full" icon={<ExternalLink size={16} />}>
            Desplegar Agente
          </Button>
        </div>
      </div>

      {/* Embed Code */}
      <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
        <h3 className="text-base font-semibold text-white">Codigo de Integracion (Web)</h3>
        <div className="relative">
          <pre className="bg-navy p-4 rounded-lg text-xs text-cyan/80 overflow-x-auto">
            {embedCode}
          </pre>
          <button className="absolute top-2 right-2 p-1.5 text-white/40 hover:text-white bg-surface rounded-md hover:bg-white/10 transition-colors">
            <Copy size={14} />
          </button>
        </div>
      </div>

      {/* WhatsApp QR */}
      {channels.includes('whatsapp') && (
        <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
          <h3 className="text-base font-semibold text-white">WhatsApp QR</h3>
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center">
              <QrCode size={80} className="text-navy" />
            </div>
            <div>
              <p className="text-sm text-white/70">Escanea el codigo QR para iniciar una conversacion con tu agente por WhatsApp.</p>
              <p className="text-xs text-white/40 mt-2">+56 9 8765 4321</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
