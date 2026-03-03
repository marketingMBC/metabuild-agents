'use client';

import Textarea from '@/components/ui/Textarea';
import { cn } from '@/lib/utils';

interface PersonalityTabProps {
  data: { personality: string; greeting: string; fallback: string; personalityTemplate: string };
  onChange: (updates: Record<string, unknown>) => void;
}

const TEMPLATES = [
  { id: 'profesional', label: 'Profesional', emoji: '\u{1F4BC}', description: 'Formal, directo, orientado a resultados', example: 'Buenos dias. \u00BFEn que puedo asistirle?' },
  { id: 'cercano', label: 'Cercano', emoji: '\u{1F60A}', description: 'Amigable, empatico, conversacional', example: '\u00A1Hola! \u00BFComo estas? Cuentame en que te puedo ayudar' },
  { id: 'formal', label: 'Formal', emoji: '\u{1F3A9}', description: 'Muy formal, protocolar, respetuoso', example: 'Estimado/a, es un placer atenderle. \u00BFCual es su consulta?' },
  { id: 'juvenil', label: 'Juvenil', emoji: '\u{1F680}', description: 'Casual, usa emojis, tono relajado', example: '\u00A1Hey! \u{1F44B} \u00BFQue onda? Dime en que te echo una mano' },
];

export default function PersonalityTab({ data, onChange }: PersonalityTabProps) {
  return (
    <div className="space-y-6">
      {/* Templates */}
      <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
        <h3 className="text-base font-semibold text-white">Plantilla de Personalidad</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ personalityTemplate: t.id, personality: t.description, greeting: t.example })}
              className={cn(
                'p-4 rounded-xl border text-left transition-all',
                data.personalityTemplate === t.id
                  ? 'border-cyan/40 bg-cyan/5'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{t.emoji}</span>
                <span className="text-sm font-semibold text-white">{t.label}</span>
              </div>
              <p className="text-xs text-white/50">{t.description}</p>
              <p className="text-xs text-cyan/70 mt-2 italic">&quot;{t.example}&quot;</p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom personality */}
      <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
        <h3 className="text-base font-semibold text-white">Personalizacion</h3>
        <Textarea
          label="Personalidad / Instrucciones"
          value={data.personality}
          onChange={(e) => onChange({ personality: e.target.value })}
          placeholder="Describe la personalidad del agente..."
          rows={3}
        />
        <Textarea
          label="Mensaje de bienvenida"
          value={data.greeting}
          onChange={(e) => onChange({ greeting: e.target.value })}
          placeholder="\u00A1Hola! \u00BFEn que puedo ayudarte?"
          rows={2}
        />
        <Textarea
          label="Mensaje de fallback"
          value={data.fallback}
          onChange={(e) => onChange({ fallback: e.target.value })}
          placeholder="Lo siento, no entendi tu consulta..."
          rows={2}
        />
      </div>
    </div>
  );
}
