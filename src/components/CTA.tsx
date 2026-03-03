'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Glow effect elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="glass rounded-3xl p-12 sm:p-16 lg:p-20 border border-cyan-400/20 backdrop-blur-xl bg-gradient-to-br from-[#000031] via-[#000031]/95 to-[#000031]/90 shadow-2xl shadow-cyan-500/20">
          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight">
            <span className="text-white">Comienza a </span>
            <span className="gradient-text">Desplegar Agentes</span>
            <span className="text-white"> Hoy</span>
          </h2>

          {/* Subtitle */}
          <p className="text-center text-gray-300 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Crea tu primer agente de IA en minutos con Agent Studio. Conecta tus canales, entrena con tu conocimiento y despliega en todos tus canales.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              href="/dashboard"
              className="px-10 py-4 bg-cyan-400 text-navy-900 font-bold text-lg rounded-lg hover:bg-cyan-300 transition-all duration-200 hover:shadow-lg shadow-lg shadow-cyan-500/40 hover:scale-105 whitespace-nowrap"
            >
              Comenzar Gratis
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 border-2 border-cyan-400 text-cyan-400 font-bold text-lg rounded-lg hover:bg-cyan-400/10 transition-all duration-200 hover:shadow-lg shadow-lg shadow-cyan-500/20 hover:scale-105 whitespace-nowrap"
            >
              Agendar Demo
            </Link>
          </div>

          {/* Decorative bottom element */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-sm text-cyan-300">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Sin tarjeta de crédito requerida
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
