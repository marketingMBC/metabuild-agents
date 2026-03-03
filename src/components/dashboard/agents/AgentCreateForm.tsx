'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { AgentType, Channel } from '@/lib/types';
import AgentTypeSelector from './AgentTypeSelector';
import { cn } from '@/lib/utils';

const steps = ['Tipo', 'Info básica', 'Canales', 'Personalidad'];

const channelOptions: { id: Channel; label: string; color: string }[] = [
  { id: 'whatsapp', label: 'WhatsApp', color: '#25D366' },
  { id: 'instagram', label: 'Instagram', color: '#E1306C' },
  { id: 'facebook', label: 'Facebook', color: '#1877F2' },
  { id: 'email', label: 'Email', color: '#60A5FA' },
  { id: 'web', label: 'Web Chat', color: '#8B5CF6' },
];

export default function AgentCreateForm() {
  const [step, setStep] = useState(0);
  const [agentType, setAgentType] = useState<AgentType | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [personality, setPersonality] = useState('');

  const toggleChannel = (ch: Channel) => {
    setChannels((prev) => prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors',
              i <= step ? 'bg-cyan text-navy' : 'bg-white/10 text-white/40'
            )}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className={cn(
              'text-sm hidden sm:block',
              i <= step ? 'text-white' : 'text-white/30'
            )}>
              {s}
            </span>
            {i < steps.length - 1 && (
              <div className={cn(
                'w-8 h-px',
                i < step ? 'bg-cyan' : 'bg-white/10'
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-white/10 bg-surface p-6">
        {step === 0 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">¿Qué tipo de agente necesitas?</h3>
            <AgentTypeSelector selected={agentType} onSelect={setAgentType} />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Información básica</h3>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Nombre del agente</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Sofía, Carlos, Admin Pro..."
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white text-sm placeholder-white/30 outline-none focus:border-cyan/40"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe las funciones principales del agente..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white text-sm placeholder-white/30 outline-none focus:border-cyan/40 resize-none"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Selecciona los canales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {channelOptions.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => toggleChannel(ch.id)}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
                    channels.includes(ch.id)
                      ? 'border-cyan bg-cyan/5'
                      : 'border-white/10 hover:border-white/20'
                  )}
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ch.color }} />
                  <span className="text-sm text-white">{ch.label}</span>
                  {channels.includes(ch.id) && <Check size={16} className="text-cyan ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Personalidad del agente</h3>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Tono y estilo</label>
              <textarea
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="Ej: Profesional, empático y orientado a resultados..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white text-sm placeholder-white/30 outline-none focus:border-cyan/40 resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={16} /> Anterior
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-cyan text-navy hover:bg-cyan-light transition-colors"
          >
            Siguiente <ArrowRight size={16} />
          </button>
        ) : (
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-cyan text-navy hover:bg-cyan-light transition-colors">
            <Check size={16} /> Crear agente
          </button>
        )}
      </div>
    </div>
  );
}
