'use client';

import React from 'react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  badge: string;
  description: string;
  features: string[];
  ctaText: string;
  highlighted: boolean;
}

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 299,
    badge: 'Ideal para empezar',
    description: 'Perfecto para pequeños negocios que están comenzando',
    features: [
      '1 Agente de IA (WhatsApp o Email)',
      'Hasta 1.000 conversaciones/mes',
      'Dashboard integrado básico',
      'Agent Studio (configuración básica)',
      'Base de Conocimiento (hasta 50 docs)',
      'Respuestas en español',
      'Soporte por email',
      'Reportes semanales',
      '1 canal de comunicación',
    ],
    ctaText: 'Comenzar',
    highlighted: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 499,
    badge: 'Más popular',
    description: 'La mejor opción para empresas en crecimiento',
    features: [
      '3 Agentes de IA (multi-canal)',
      'Hasta 5.000 conversaciones/mes',
      'Dashboard integrado avanzado',
      'Agent Studio completo',
      'Base de Conocimiento (hasta 500 docs)',
      'Flow Builder (10 flujos)',
      'Respuestas en español e inglés',
      'Soporte prioritario (WhatsApp)',
      'Reportes diarios + Analytics avanzado',
      '5 canales de comunicación',
      'Calificación automática de leads',
      'Integración CRM',
    ],
    ctaText: 'Comenzar',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 699,
    badge: 'Máximo poder',
    description: 'Solución completa para empresas de cualquier tamaño',
    features: [
      'Agentes ilimitados',
      'Conversaciones ilimitadas',
      'Dashboard integrado personalizado',
      'Agent Studio avanzado con IA predictiva',
      'Base de Conocimiento ilimitada',
      'Flow Builder ilimitado',
      'Multi-idioma',
      'Soporte dedicado 24/7',
      'Analytics avanzado + IA predictiva',
      'Canales ilimitados',
      'Lead scoring con IA',
      'Integraciones custom',
      'Account manager dedicado',
      'Onboarding personalizado',
    ],
    ctaText: 'Contactar Ventas',
    highlighted: false,
  },
];

const includedFeatures = [
  'Setup gratuito',
  '14 días de prueba',
  'Cancelación sin penalidad',
  'Actualizaciones incluidas',
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000031]/50 via-transparent to-[#000031]/50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title and Subtitle */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#29F8D4] via-[#8B5CF6] to-[#29F8D4] bg-clip-text text-transparent">
              Planes que se Adaptan a tu Negocio
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sin contratos de permanencia. Escala cuando quieras.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                plan.highlighted
                  ? 'md:scale-105 glass border border-[#29F8D4] bg-white/5 shadow-[0_0_40px_rgba(41,248,212,0.3)]'
                  : plan.id === 'enterprise'
                  ? 'glass border border-[#8B5CF6]/50 bg-white/5'
                  : 'glass border border-white/10 bg-white/5'
              }`}
            >
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    plan.highlighted
                      ? 'bg-[#29F8D4] text-[#000031]'
                      : 'bg-gray-800 text-gray-300 border border-gray-700'
                  }`}
                >
                  {plan.badge}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-8">
                {/* Plan Name and Price */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-2">USD/mes</span>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 mb-8 ${
                    plan.highlighted
                      ? 'bg-[#29F8D4] text-[#000031] hover:shadow-[0_0_20px_rgba(41,248,212,0.4)] hover:scale-105'
                      : 'border border-[#29F8D4] text-[#29F8D4] hover:bg-[#29F8D4]/10 hover:shadow-[0_0_20px_rgba(41,248,212,0.2)]'
                  }`}
                >
                  {plan.ctaText}
                </button>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-[#29F8D4]/20">
                          <CheckIcon />
                        </div>
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Included Features */}
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-8 mb-8">
          <p className="text-center text-white font-semibold mb-4">
            Todos los planes incluyen:
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {includedFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-[#29F8D4]">•</span>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Plan CTA */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            ¿Necesitas un plan personalizado?{' '}
            <a href="#" className="text-[#29F8D4] hover:text-[#29F8D4]/80 font-semibold transition-colors">
              Contáctanos para una solución a medida.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
