'use client';

import { Plug, Settings, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Crea tu Primer Agente',
      description:
        'Configura tu agente en Agent Studio: define su personalidad, tono de comunicación, reglas de escalación y objetivos. Todo desde una interfaz visual intuitiva.',
      icon: Settings,
    },
    {
      number: '02',
      title: 'Conecta tus Canales',
      description:
        'Conecta WhatsApp, Instagram, Facebook, Email y Web Chat en minutos. Tu agente responderá en todos los canales desde una sola plataforma.',
      icon: Plug,
    },
    {
      number: '03',
      title: 'Entrena con tu Conocimiento',
      description:
        'Sube documentos, FAQs y URLs a la Base de Conocimiento. Tu agente aprende automáticamente y responde con información precisa de tu negocio.',
      icon: Rocket,
    },
    {
      number: '04',
      title: 'Despliega y Monitorea',
      description:
        'Activa tu agente y monitorea su rendimiento en el Dashboard integrado en tiempo real. Métricas de satisfacción, conversión y rendimiento al instante.',
      icon: Rocket,
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial pointer-events-none opacity-40" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-radial pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Cómo Funciona</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            En 4 simples pasos, tus agentes de IA estarán operando en todos tus canales
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting line - visible on desktop only */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 border-b border-dashed border-cyan-400 opacity-40" />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} className="flex flex-col">
                  {/* Step Card */}
                  <div className="glass rounded-2xl p-8 sm:p-10 h-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 group border border-cyan-400/10 hover:border-cyan-400/30">
                    {/* Number Badge */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-400 text-navy-900 font-bold text-2xl mb-8 group-hover:shadow-lg group-hover:shadow-cyan-400/40 transition-all duration-300">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mb-6 text-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <IconComponent className="w-12 h-12" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector - mobile and tablet */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center py-6">
                      <div className="text-cyan-400 opacity-60 animate-bounce">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Connecting dots and lines for desktop - visual enhancement */}
          <div className="hidden lg:block absolute top-24 left-1/6 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60 -translate-x-1/2" />
          <div className="hidden lg:block absolute top-24 left-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60 -translate-x-1/2" />
          <div className="hidden lg:block absolute top-24 right-1/6 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60 translate-x-1/2" />
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-20">
          <button className="relative px-8 py-4 font-semibold text-white bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            <span className="relative z-10">Comienza Ahora Gratis</span>
          </button>
        </div>
      </div>
    </section>
  );
}
