'use client';

import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { AGENT_TYPES } from '@/lib/constants';

interface GeneralTabProps {
  data: { name: string; type: string; avatar: string; language: string; description: string; tags: string[] };
  onChange: (updates: Record<string, unknown>) => void;
  isNew: boolean;
}

const AVATARS = ['\u{1F916}', '\u{1F469}\u200D\u{1F4BC}', '\u{1F468}\u200D\u2695\uFE0F', '\u{1F319}', '\u{1F3E2}', '\u{1F4AC}', '\u{1F3AF}', '\u{1F4CA}', '\u{1F6E0}\uFE0F', '\u{1F3A8}'];

export default function GeneralTab({ data, onChange, isNew }: GeneralTabProps) {
  const typeOptions = Object.entries(AGENT_TYPES).map(([key, val]) => ({ value: key, label: val.label }));

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-5">
        <h3 className="text-base font-semibold text-white">Informacion General</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nombre del agente" value={data.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Ej: Sofia" />
          <Select label="Tipo de agente" value={data.type} onChange={(e) => onChange({ type: e.target.value })} options={typeOptions} />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Avatar</label>
          <div className="flex gap-2 flex-wrap">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => onChange({ avatar: emoji })}
                className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                  data.avatar === emoji ? 'bg-cyan/20 ring-2 ring-cyan' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <Select
          label="Idioma"
          value={data.language}
          onChange={(e) => onChange({ language: e.target.value })}
          options={[
            { value: 'es', label: 'Espanol' },
            { value: 'en', label: 'English' },
            { value: 'pt', label: 'Portugues' },
          ]}
        />

        <Textarea
          label="Descripcion"
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Describe que hace este agente..."
          rows={3}
        />
      </div>
    </div>
  );
}
