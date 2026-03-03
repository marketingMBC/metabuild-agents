'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Rocket, Radio, Bot, BookOpen, CheckCircle, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import { CHANNEL_CONFIGS } from '@/lib/constants';

const STEPS = [
  { id: 'welcome', label: 'Bienvenida', icon: Rocket },
  { id: 'channels', label: 'Canales', icon: Radio },
  { id: 'agent', label: 'Primer Agente', icon: Bot },
  { id: 'knowledge', label: 'Conocimiento', icon: BookOpen },
  { id: 'complete', label: 'Completado', icon: CheckCircle },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [channels, setChannels] = useState<string[]>(['whatsapp']);
  const [agentName, setAgentName] = useState('');
  const [agentType, setAgentType] = useState('ventas');
  const router = useRouter();

  const canNext = () => {
    if (step === 0) return true;
    if (step === 1) return channels.length > 0;
    if (step === 2) return agentName.trim().length > 0;
    if (step === 3) return true;
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === step;
          const isDone = i < step;
          return (
            <div key={s.id} className="flex items-center">
              <div className={cn(
                'flex items-center gap-2',
                isActive && 'text-cyan',
                isDone && 'text-green-400',
                !isActive && !isDone && 'text-white/30'
              )}>
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors',
                  isActive && 'border-cyan bg-cyan/10',
                  isDone && 'border-green-400 bg-green-500/10',
                  !isActive && !isDone && 'border-white/20'
                )}>
                  {isDone ? <CheckCircle size={14} /> : <Icon size={14} />}
                </div>
                <span className="text-xs font-medium hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn('w-8 sm:w-16 h-px mx-2', isDone ? 'bg-green-400' : 'bg-white/10')} />
              )}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="rounded-2xl border border-white/10 bg-surface p-8">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan/10 flex items-center justify-center mx-auto">
              <Sparkles size={32} className="text-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-white">Bienvenido a MetaBuild Agents</h2>
            <p className="text-white/50 max-w-md mx-auto">
              Vamos a configurar tu primera experiencia en la plataforma. En pocos minutos tendrás tu primer agente de IA listo para atender clientes.
            </p>
          </div>
        )}

        {/* Step 1: Channels */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white">Conecta tus Canales</h2>
              <p className="text-sm text-white/50 mt-1">Selecciona los canales donde quieres que tu agente responda</p>
            </div>
            <div className="space-y-3">
              {CHANNEL_CONFIGS.map((ch) => (
                <div key={ch.id} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: ch.color + '20' }}>
                      <span className="text-lg" style={{ color: ch.color }}>
                        {ch.id === 'whatsapp' ? '\uD83D\uDCAC' : ch.id === 'instagram' ? '\uD83D\uDCF7' : ch.id === 'facebook' ? '\uD83D\uDC4D' : ch.id === 'email' ? '\uD83D\uDCE7' : '\uD83C\uDF10'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{ch.label}</p>
                    </div>
                  </div>
                  <Switch
                    checked={channels.includes(ch.id)}
                    onChange={() => {
                      setChannels((prev) =>
                        prev.includes(ch.id) ? prev.filter((c) => c !== ch.id) : [...prev, ch.id]
                      );
                    }}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: First Agent */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white">Crea tu Primer Agente</h2>
              <p className="text-sm text-white/50 mt-1">Dale un nombre y elige su especialidad</p>
            </div>
            <Input label="Nombre del agente" value={agentName} onChange={(e) => setAgentName(e.target.value)} placeholder="Ej: Sofía, Carlos, Asistente..." />
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Tipo de agente</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'ventas', label: 'Ventas', emoji: '\uD83D\uDCBC' },
                  { id: 'soporte', label: 'Soporte', emoji: '\uD83C\uDFA7' },
                  { id: 'rrss', label: 'Redes Sociales', emoji: '\uD83D\uDCF1' },
                  { id: 'admin', label: 'Administración', emoji: '\uD83C\uDFE2' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setAgentType(t.id)}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all',
                      agentType === t.id ? 'border-cyan/40 bg-cyan/5' : 'border-white/10 hover:border-white/20'
                    )}
                  >
                    <span className="text-xl">{t.emoji}</span>
                    <p className="text-sm font-medium text-white mt-1">{t.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Knowledge */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white">Base de Conocimiento</h2>
              <p className="text-sm text-white/50 mt-1">Sube documentos o agrega FAQs para que tu agente aprenda</p>
            </div>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center">
              <BookOpen size={32} className="mx-auto text-white/20 mb-2" />
              <p className="text-sm text-white/50">Arrastra documentos aquí</p>
              <p className="text-xs text-white/30 mt-1">PDF, DOC, TXT — Máx 10MB</p>
              <Button variant="secondary" size="sm" className="mt-4">Seleccionar archivos</Button>
            </div>
            <p className="text-xs text-white/30 text-center">Puedes saltar este paso y agregar conocimiento después</p>
          </div>
        )}

        {/* Step 4: Complete */}
        {step === 4 && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">¡Todo Listo!</h2>
            <p className="text-white/50 max-w-md mx-auto">
              Tu agente <span className="text-cyan font-semibold">{agentName || 'Agente'}</span> está configurado y listo para atender en {channels.length} canal{channels.length !== 1 ? 'es' : ''}.
            </p>
            <Button size="lg" onClick={() => router.push('/dashboard')} className="mt-4">
              Ir al Dashboard
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      {step < 4 && (
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            icon={<ArrowLeft size={16} />}
          >
            Anterior
          </Button>
          {step === 3 ? (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setStep(4)}>Saltar</Button>
              <Button onClick={() => setStep(4)} icon={<ArrowRight size={16} />}>Finalizar</Button>
            </div>
          ) : (
            <Button onClick={() => setStep(step + 1)} disabled={!canNext()} icon={<ArrowRight size={16} />}>
              Siguiente
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
