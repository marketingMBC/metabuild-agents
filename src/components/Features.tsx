'use client';

import React from 'react';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.557.821-2.98 2.128-4.028 3.85A9.879 9.879 0 002.064 12c0 5.47 4.486 9.914 9.964 9.914 1.659 0 3.29-.378 4.838-1.084 1.548-.707 2.957-1.734 4.11-2.986 1.152-1.252 2.063-2.738 2.686-4.323.623-1.585.944-3.267.944-5.004 0-5.428-4.486-9.914-9.964-9.914z" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 9h4V5H3v4zm0 5h4v-4H3v4zm5 0h12v-4H8v4zm13-9V7h4V5h-4zm0 14h4v-2h-4v2zM8 19h12v-4H8v4z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const DashboardIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4 4h2v14h-2zm4-2h2v16h-2z" />
  </svg>
);

const ZapIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const BrainIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const features: FeatureCard[] = [
  {
    id: 'agent-studio',
    title: 'Agent Studio',
    description: 'Configura agentes con personalidad, conocimiento y reglas de escalación. Define el comportamiento de cada agente desde una interfaz visual intuitiva.',
    icon: <BrainIcon />,
    color: 'from-purple-500/20 to-purple-500/10',
  },
  {
    id: 'unified-inbox',
    title: 'Bandeja Unificada',
    description: 'Todas las conversaciones de WhatsApp, Instagram, Facebook, Email y Web en un solo lugar. Gestiona todos tus canales desde un único dashboard.',
    icon: <MailIcon />,
    color: 'from-blue-500/20 to-blue-500/10',
  },
  {
    id: 'knowledge-base',
    title: 'Base de Conocimiento',
    description: 'Sube documentos, FAQs y URLs. Tus agentes aprenden automáticamente de tu contenido y responden con información precisa y actualizada.',
    icon: <DashboardIcon />,
    color: 'from-cyan-500/20 to-cyan-500/10',
  },
  {
    id: 'flow-builder',
    title: 'Flow Builder',
    description: 'Crea automatizaciones visuales con nuestro editor drag & drop. Diseña flujos de conversación, escalación y seguimiento sin escribir código.',
    icon: <ZapIcon />,
    color: 'from-yellow-500/20 to-yellow-500/10',
  },
  {
    id: 'advanced-analytics',
    title: 'Analytics Avanzado',
    description: 'Métricas de rendimiento, satisfacción y conversión en tiempo real. Dashboards interactivos para optimizar el desempeño de tus agentes.',
    icon: <MegaphoneIcon />,
    color: 'from-green-500/20 to-green-500/10',
  },
  {
    id: 'integrations',
    title: '30+ Integraciones',
    description: 'Conecta con WhatsApp, Instagram, Facebook, Slack, CRM, Zapier y más. Integra tu stack tecnológico existente en minutos.',
    icon: <WhatsAppIcon />,
    color: 'from-pink-500/20 to-pink-500/10',
  },
];

const getIconBgColor = (id: string): string => {
  const colorMap: { [key: string]: string } = {
    'agent-studio': 'bg-purple-500/20 text-purple-400',
    'unified-inbox': 'bg-blue-500/20 text-blue-400',
    'knowledge-base': 'bg-cyan-500/20 text-cyan-400',
    'flow-builder': 'bg-yellow-500/20 text-yellow-400',
    'advanced-analytics': 'bg-green-500/20 text-green-400',
    'integrations': 'bg-pink-500/20 text-pink-400',
  };
  return colorMap[id] || 'bg-cyan-500/20 text-cyan-400';
};

export default function Features() {
  return (
    <section id="soluciones" className="py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000031]/50 via-transparent to-[#000031]/50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Todo lo que Necesitas en una{' '}
            <span className="bg-gradient-to-r from-[#29F8D4] via-[#8B5CF6] to-[#29F8D4] bg-clip-text text-transparent">
              Sola Plataforma
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Crea, entrena y despliega agentes de IA multicanal con herramientas diseñadas para escalar tu operación.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="glass rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(41,248,212,0.2)] group cursor-pointer"
            >
              {/* Icon Container */}
              <div
                className={`w-14 h-14 rounded-full ${getIconBgColor(
                  feature.id
                )} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
