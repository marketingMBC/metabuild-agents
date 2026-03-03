'use client';

import { useState } from 'react';
import { Copy, Check, Smartphone, Palette, MapPin, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const COLOR_PRESETS = ['#29F8D4', '#8B5CF6', '#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#EC4899', '#6366F1'];

const MOCK_MESSAGES = [
  { sender: 'agent', text: '¡Hola! Soy el asistente virtual de MetaBuild. ¿En qué puedo ayudarte?' },
  { sender: 'user', text: 'Quiero información sobre sus planes' },
  { sender: 'agent', text: 'Con gusto. Tenemos 3 planes: Starter ($49/mes), Growth ($149/mes) y Enterprise ($399/mes). ¿Cuál te interesa?' },
];

export default function PreviewPage() {
  const [color, setColor] = useState('#29F8D4');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [agentName, setAgentName] = useState('Asistente MetaBuild');
  const [copied, setCopied] = useState(false);

  const embedCode = `<script src="https://cdn.metabuildcity.com/widget.js"
  data-agent="asistente"
  data-color="${color}"
  data-position="${position}">
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Preview del Widget</h1>
        <p className="text-sm text-white/50">Personaliza y previsualiza tu widget de chat</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phone Preview */}
        <div className="flex justify-center">
          <div className="w-[320px] h-[640px] rounded-[40px] border-4 border-white/20 bg-navy-light overflow-hidden relative shadow-2xl">
            {/* Status bar */}
            <div className="h-12 bg-black/20 flex items-center justify-center">
              <div className="w-24 h-5 rounded-full bg-black/30" />
            </div>

            {/* Page content placeholder */}
            <div className="h-[480px] bg-white/5 p-4">
              <div className="space-y-3">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-4 bg-white/10 rounded w-1/2" />
                <div className="h-20 bg-white/5 rounded-xl border border-white/10 mt-4" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
                <div className="h-4 bg-white/10 rounded w-1/3" />
              </div>
            </div>

            {/* Chat widget */}
            <div className={cn(
              'absolute bottom-20 w-[280px] rounded-2xl border border-white/10 overflow-hidden shadow-2xl',
              position === 'bottom-right' ? 'right-4' : 'left-4'
            )} style={{ backgroundColor: '#0d0d3d' }}>
              {/* Widget header */}
              <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: color + '20' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
                  <span className="text-xs font-bold text-navy">M</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{agentName}</p>
                  <p className="text-[10px] text-white/50">En línea</p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-3 space-y-2 h-36 overflow-y-auto">
                {MOCK_MESSAGES.map((msg, i) => (
                  <div key={i} className={cn('flex', msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={cn(
                      'max-w-[85%] px-3 py-1.5 rounded-xl text-[11px]',
                      msg.sender === 'user'
                        ? 'rounded-br-sm text-navy'
                        : 'bg-white/10 text-white rounded-bl-sm'
                    )} style={msg.sender === 'user' ? { backgroundColor: color } : undefined}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-2 border-t border-white/10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/30 flex-1">Escribe un mensaje...</span>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
                    <span className="text-[8px] text-navy">↑</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAB button */}
            <div className={cn('absolute bottom-6', position === 'bottom-right' ? 'right-4' : 'left-4')}>
              <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center" style={{ backgroundColor: color }}>
                <Smartphone size={20} className="text-navy" />
              </div>
            </div>
          </div>
        </div>

        {/* Customizer */}
        <div className="space-y-4">
          {/* Agent Name */}
          <div className="rounded-xl border border-white/10 bg-surface p-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Smartphone size={16} className="text-cyan" />
              <h3 className="text-sm font-semibold">Configuración</h3>
            </div>
            <Input label="Nombre del agente" value={agentName} onChange={(e) => setAgentName(e.target.value)} />
          </div>

          {/* Color */}
          <div className="rounded-xl border border-white/10 bg-surface p-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Palette size={16} className="text-cyan" />
              <h3 className="text-sm font-semibold">Color principal</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn('w-8 h-8 rounded-full transition-all', color === c && 'ring-2 ring-white ring-offset-2 ring-offset-navy')}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <Input label="Color personalizado" value={color} onChange={(e) => setColor(e.target.value)} placeholder="#29F8D4" />
          </div>

          {/* Position */}
          <div className="rounded-xl border border-white/10 bg-surface p-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <MapPin size={16} className="text-cyan" />
              <h3 className="text-sm font-semibold">Posición</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(['bottom-right', 'bottom-left'] as const).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosition(pos)}
                  className={cn(
                    'p-3 rounded-xl border text-sm transition-all',
                    position === pos ? 'border-cyan/40 bg-cyan/5 text-cyan' : 'border-white/10 text-white/50 hover:border-white/20'
                  )}
                >
                  {pos === 'bottom-right' ? 'Abajo derecha' : 'Abajo izquierda'}
                </button>
              ))}
            </div>
          </div>

          {/* Embed Code */}
          <div className="rounded-xl border border-white/10 bg-surface p-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Code size={16} className="text-cyan" />
              <h3 className="text-sm font-semibold">Código de integración</h3>
            </div>
            <div className="relative">
              <pre className="bg-navy p-4 rounded-lg text-xs text-cyan/80 overflow-x-auto">{embedCode}</pre>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-surface hover:bg-white/10 transition-colors"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-white/40" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
