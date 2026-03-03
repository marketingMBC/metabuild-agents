'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, User, Radio, BookOpen, AlertTriangle, MessageCircle, Rocket, ArrowLeft, Save } from 'lucide-react';
import { agents } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import GeneralTab from './GeneralTab';
import PersonalityTab from './PersonalityTab';
import ChannelsTab from './ChannelsTab';
import KnowledgeTab from './KnowledgeTab';
import EscalationTab from './EscalationTab';
import TestTab from './TestTab';
import DeployTab from './DeployTab';

const TABS = [
  { id: 'general', label: 'General', icon: Bot },
  { id: 'personality', label: 'Personalidad', icon: User },
  { id: 'channels', label: 'Canales', icon: Radio },
  { id: 'knowledge', label: 'Conocimiento', icon: BookOpen },
  { id: 'escalation', label: 'Escalacion', icon: AlertTriangle },
  { id: 'test', label: 'Prueba', icon: MessageCircle },
  { id: 'deploy', label: 'Despliegue', icon: Rocket },
];

interface StudioLayoutProps {
  agentId: string | null;
}

export default function StudioLayout({ agentId }: StudioLayoutProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const agent = agentId ? agents.find((a) => a.id === agentId) : null;
  const isNew = !agentId;

  // Local form state
  const [formData, setFormData] = useState({
    name: agent?.name || '',
    type: agent?.type || 'ventas',
    avatar: agent?.avatar || '\u{1F916}',
    language: agent?.language || 'es',
    description: agent?.description || '',
    personality: agent?.personality || '',
    greeting: '\u00A1Hola! \u00BFEn qu\u00E9 puedo ayudarte hoy?',
    fallback: 'Lo siento, no entend\u00ED tu consulta. \u00BFPuedes reformularla?',
    personalityTemplate: 'profesional' as const,
    channels: agent?.channels || ['whatsapp'],
    tags: agent?.tags || [],
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  const updateForm = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'general': return <GeneralTab data={formData} onChange={updateForm} isNew={isNew} />;
      case 'personality': return <PersonalityTab data={formData} onChange={updateForm} />;
      case 'channels': return <ChannelsTab data={formData} onChange={updateForm} />;
      case 'knowledge': return <KnowledgeTab agentId={agentId} />;
      case 'escalation': return <EscalationTab />;
      case 'test': return <TestTab agentName={formData.name || 'Agente'} greeting={formData.greeting} />;
      case 'deploy': return <DeployTab agentName={formData.name || 'Agente'} channels={formData.channels} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/dashboard/agents')} className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">
              {isNew ? 'Crear Nuevo Agente' : `Editar: ${agent?.name}`}
            </h1>
            <p className="text-sm text-white/50">Agent Studio</p>
          </div>
        </div>
        <Button onClick={handleSave} loading={saving} icon={<Save size={16} />}>
          {isNew ? 'Crear Agente' : 'Guardar Cambios'}
        </Button>
      </div>

      {/* Layout: Tabs + Content */}
      <div className="flex gap-4">
        {/* Vertical Tabs */}
        <div className="w-48 flex-shrink-0 hidden md:block">
          <nav className="rounded-xl border border-white/10 bg-surface overflow-hidden">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2.5 w-full px-4 py-3 text-sm transition-colors text-left',
                    activeTab === tab.id
                      ? 'bg-cyan/10 text-cyan border-l-2 border-cyan'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                  )}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden w-full overflow-x-auto mb-4">
          <div className="flex gap-1 min-w-max">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs whitespace-nowrap',
                    activeTab === tab.id ? 'bg-cyan/20 text-cyan' : 'text-white/60 hover:text-white bg-white/5'
                  )}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
