'use client';

import React from 'react';

interface UseCase {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stack: string;
}

const HouseIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const useCases: UseCase[] = [
  {
    id: 'real-estate',
    title: 'Inmobiliarias',
    description: 'Agentes que responden consultas sobre disponibilidad, precios, ubicación. Agendan visitas virtuales y presenciales. Envían brochures y cotizaciones automáticamente.',
    icon: <HouseIcon />,
    stack: 'WhatsApp + Agent Studio + Dashboard',
  },
  {
    id: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    description: 'Atención al cliente 24/7, seguimiento de pedidos, recomendaciones personalizadas. Recupera carritos abandonados y aumenta el ticket promedio.',
    icon: <ShoppingBagIcon />,
    stack: 'WhatsApp + Agent Studio + Dashboard',
  },
  {
    id: 'professional-services',
    title: 'Servicios Profesionales',
    description: 'Agenda citas, responde preguntas frecuentes, envía presupuestos. Ideal para clínicas, estudios de abogados, consultoras y más.',
    icon: <BriefcaseIcon />,
    stack: 'WhatsApp + Agent Studio + Dashboard',
  },
  {
    id: 'building-admin',
    title: 'Administración de Edificios',
    description: 'Gestiona solicitudes de residentes, reportes de mantención, comunicados y pagos. Todo centralizado en un dashboard inteligente.',
    icon: <BuildingIcon />,
    stack: 'WhatsApp + Agent Studio + Dashboard',
  },
];

const getIconBgColor = (id: string): string => {
  const colorMap: { [key: string]: string } = {
    'real-estate': 'bg-amber-500/20 text-amber-400',
    'retail-ecommerce': 'bg-green-500/20 text-green-400',
    'professional-services': 'bg-blue-500/20 text-blue-400',
    'building-admin': 'bg-purple-500/20 text-purple-400',
  };
  return colorMap[id] || 'bg-cyan-500/20 text-cyan-400';
};

const getCardGradient = (id: string): string => {
  const gradientMap: { [key: string]: string } = {
    'real-estate': 'from-amber-500/10 to-amber-500/5',
    'retail-ecommerce': 'from-green-500/10 to-green-500/5',
    'professional-services': 'from-blue-500/10 to-blue-500/5',
    'building-admin': 'from-purple-500/10 to-purple-500/5',
  };
  return gradientMap[id] || 'from-cyan-500/10 to-cyan-500/5';
};

export default function UseCases() {
  return (
    <section id="casos-uso" className="py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000031]/30 via-transparent to-[#000031]/30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#29F8D4] via-[#8B5CF6] to-[#29F8D4] bg-clip-text text-transparent">
              Agentes para Cada Industria
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Nuestra plataforma se adapta al contexto de tu negocio
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {useCases.map((useCase) => (
            <div
              key={useCase.id}
              className={`glass rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-gradient-to-br ${getCardGradient(
                useCase.id
              )} hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(41,248,212,0.15)] group cursor-pointer`}
            >
              {/* Icon Container */}
              <div
                className={`w-16 h-16 rounded-full ${getIconBgColor(
                  useCase.id
                )} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {useCase.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {useCase.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-6">
                {useCase.description}
              </p>

              {/* Stack Tag */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {useCase.stack.split(' + ').map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
