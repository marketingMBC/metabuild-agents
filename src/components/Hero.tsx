'use client';

import Link from 'next/link';
import { MessageCircle, CheckCircle } from 'lucide-react';

export default function Hero() {
  const stats = [
    { icon: '💬', label: 'Conversaciones/día', value: '500+' },
    { icon: '24', label: 'Disponibilidad', value: '24/7' },
    { icon: '📈', label: 'Canales Integrados', value: '5+' },
    { icon: '💰', label: 'Menos Costos Operativos', value: '60%' },
  ];

  return (
    <section className="relative min-h-screen w-full bg-gradient-hero bg-grid overflow-hidden pt-20">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-80px)]">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center py-12 lg:py-0">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
              <span className="text-white">Despliega Agentes de IA en </span>
              <span className="gradient-text">Todos tus Canales</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl animate-slide-up delay-200">
              Despliega agentes de IA en WhatsApp, Instagram, Facebook, Email y Web desde una sola plataforma. Configura en minutos con Agent Studio, entrena con tu Base de Conocimiento y monitorea todo desde el Dashboard integrado.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up delay-300">
              <Link
                href="/dashboard"
                className="px-8 py-3 sm:px-10 sm:py-4 bg-cyan-400 text-navy-900 font-semibold rounded-lg hover:bg-cyan-300 transition-all duration-200 hover:shadow-lg shadow-lg shadow-cyan-500/30 text-center sm:text-left whitespace-nowrap"
              >
                Comenzar Gratis
              </Link>
              <Link
                href="/#demo"
                className="px-8 py-3 sm:px-10 sm:py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400/10 transition-all duration-200 text-center sm:text-left whitespace-nowrap"
              >
                Ver Demo
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 animate-slide-up delay-400">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center sm:items-start p-4 rounded-lg bg-surface/30 backdrop-blur-sm border border-cyan-400/10 hover:border-cyan-400/30 transition-colors duration-200"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Chat Mockup */}
          <div className="hidden lg:flex flex-col justify-center items-center lg:items-end">
            <div className="w-full max-w-sm animate-float delay-500">
              {/* Chat Mockup Container */}
              <div className="bg-surface-light rounded-3xl p-6 shadow-2xl border border-cyan-400/20 overflow-hidden">
                {/* Phone header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-cyan-400/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">MB</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">MetaBuild Agents</div>
                      <div className="text-xs text-gray-400">Online</div>
                    </div>
                  </div>
                  <div className="text-gray-400">⋮</div>
                </div>

                {/* Chat messages */}
                <div className="flex flex-col gap-4 mb-4 max-h-96 overflow-y-auto">
                  {/* User message 1 */}
                  <div className="flex justify-end animate-chat-bubble">
                    <div className="bg-cyan-400/20 border border-cyan-400/40 rounded-2xl rounded-tr-md px-4 py-2 max-w-xs">
                      <p className="text-white text-sm">
                        Hola, ¿tienen departamentos disponibles?
                      </p>
                    </div>
                  </div>

                  {/* Bot message 1 */}
                  <div className="flex justify-start animate-chat-bubble delay-200">
                    <div className="bg-surface rounded-2xl rounded-tl-md px-4 py-2 max-w-xs border border-cyan-400/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-xs bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-2 py-1 rounded-full font-semibold">
                          MetaBuild Agents
                        </div>
                      </div>
                      <p className="text-white text-sm">
                        ¡Hola! Sí, tenemos 3 tipologías disponibles desde 2.450 UF. ¿Te gustaría agendar una visita virtual?
                      </p>
                    </div>
                  </div>

                  {/* User message 2 */}
                  <div className="flex justify-end animate-chat-bubble delay-300">
                    <div className="bg-cyan-400/20 border border-cyan-400/40 rounded-2xl rounded-tr-md px-4 py-2 max-w-xs">
                      <p className="text-white text-sm">Sí, para el sábado</p>
                    </div>
                  </div>

                  {/* Bot message 2 */}
                  <div className="flex justify-start animate-chat-bubble delay-400">
                    <div className="bg-surface rounded-2xl rounded-tl-md px-4 py-2 max-w-xs border border-cyan-400/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-xs bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-2 py-1 rounded-full font-semibold">
                          MetaBuild Agents
                        </div>
                      </div>
                      <p className="text-white text-sm">
                        Perfecto, te agendé para el sábado a las 11:00. Te enviaré un recordatorio. ¿Algo más en que pueda ayudarte?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input area */}
                <div className="flex items-center gap-2 pt-4 border-t border-cyan-400/10">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-surface rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                    disabled
                  />
                  <button className="p-2 rounded-full hover:bg-surface-light transition-colors duration-200">
                    <span className="text-cyan-400">→</span>
                  </button>
                </div>
              </div>

              {/* Decorative badge */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface/50 border border-cyan-400/20 rounded-full">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-gray-300">
                    Integración WhatsApp nativa
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-sm text-gray-400">Conoce más</p>
          <div className="w-6 h-10 border-2 border-cyan-400/40 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-cyan-400 rounded-full mt-2 animate-slide-up" />
          </div>
        </div>
      </div>
    </section>
  );
}
