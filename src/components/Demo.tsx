'use client';

import React, { useState, useEffect } from 'react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  showTyping?: boolean;
}

const CheckIcon = () => (
  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

export default function Demo() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showFeatures, setShowFeatures] = useState(false);

  // Initialize messages with staggered appearance
  useEffect(() => {
    const messageSequence: ChatMessage[] = [
      {
        id: 1,
        sender: 'user',
        text: 'Hola, vi su publicación en Instagram. ¿Tienen departamentos de 2 dormitorios?',
        timestamp: '10:30',
      },
      {
        id: 2,
        sender: 'bot',
        text: '¡Hola! 👋 Sí, tenemos 3 opciones de 2 dormitorios disponibles:\n\n🏠 Tipo A: 55m², desde 3.200 UF\n🏠 Tipo B: 62m², desde 3.650 UF\n🏠 Tipo C: 68m², desde 4.100 UF\n\n¿Te gustaría más detalles de alguno?',
        timestamp: '10:30',
        showTyping: true,
      },
      {
        id: 3,
        sender: 'user',
        text: 'El tipo B me interesa. ¿Puedo visitarlo?',
        timestamp: '10:31',
      },
      {
        id: 4,
        sender: 'bot',
        text: '¡Excelente elección! El Tipo B tiene cocina americana, terraza y estacionamiento incluido.\n\n📅 Tengo disponibilidad para visitas:\n• Sábado 10:00 - 14:00\n• Domingo 11:00 - 13:00\n\n¿Cuál te acomoda?',
        timestamp: '10:31',
        showTyping: true,
      },
      {
        id: 5,
        sender: 'user',
        text: 'Sábado a las 11',
        timestamp: '10:32',
      },
      {
        id: 6,
        sender: 'bot',
        text: 'Perfecto, quedas agendado:\n\n✅ Visita: Sábado 11:00\n📍 Av. Providencia 1234, Piso 5\n👤 Te recibirá Carla, nuestra ejecutiva\n\nTe enviaré un recordatorio el viernes. ¿Algo más?',
        timestamp: '10:32',
        showTyping: true,
      },
    ];

    // Add messages with delays
    messageSequence.forEach((msg, index) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
        if (index === messageSequence.length - 1) {
          setTimeout(() => setShowFeatures(true), 500);
        }
      }, index * 800);
    });
  }, []);

  const getAnimationDelay = (index: number): string => {
    const delays = [
      'delay-100',
      'delay-300',
      'delay-500',
      'delay-700',
      'delay-1000',
    ];
    return delays[index] || `delay-${(index + 1) * 200}`;
  };

  const features = [
    {
      text: 'Respondió en menos de 2 segundos',
      description: 'Respuestas instantáneas sin latencia',
    },
    {
      text: 'Identificó el interés del cliente',
      description: 'Comprensión del contexto y necesidades',
    },
    {
      text: 'Presentó opciones relevantes',
      description: 'Personalización basada en preferencias',
    },
    {
      text: 'Agendó visita automáticamente',
      description: 'Gestión de calendarios sin intervención',
    },
    {
      text: 'Se registró todo en el Dashboard',
      description: 'Sincronización automática de datos',
    },
    {
      text: 'Se actualizó el CRM',
      description: 'Integración seamless con tu CRM',
    },
  ];

  return (
    <section id="demo" className="py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000031]/50 via-transparent to-[#000031]/50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Mira tu Agente en Acción
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Así es como tu agente responde automáticamente a tus clientes
          </p>
        </div>

        {/* Demo Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Chat Interface */}
          <div className="flex justify-center">
            {/* Phone Frame */}
            <div className="w-full max-w-sm">
              <div className="rounded-3xl border-8 border-gray-800 shadow-2xl overflow-hidden bg-black">
                {/* Phone Header */}
                <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">IN</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Inmobiliaria Agents</p>
                      <p className="text-green-100 text-xs">En línea</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-full transition">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="h-96 bg-gradient-to-b from-white to-gray-50 overflow-y-auto p-4 flex flex-col gap-3">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-400 text-sm">Iniciando conversación...</p>
                    </div>
                  ) : (
                    <>
                      {messages.map((msg, index) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                          } animate-chat-bubble ${getAnimationDelay(index)}`}
                        >
                          <div
                            className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                              msg.sender === 'user'
                                ? 'bg-[#DCF8C6] text-gray-900 rounded-br-none'
                                : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                            }`}
                          >
                            <p className="whitespace-pre-line leading-relaxed">
                              {msg.text}
                            </p>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {msg.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Typing Indicator - show when last message is from bot */}
                      {messages.length > 0 &&
                        messages[messages.length - 1].sender === 'bot' && (
                          <div className="flex justify-start mt-2">
                            <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-2 flex gap-1.5">
                              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                            </div>
                          </div>
                        )}
                    </>
                  )}
                </div>

                {/* Input Area */}
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex gap-2">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    disabled
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 placeholder-gray-400 disabled:opacity-50"
                  />
                  <button
                    disabled
                    className="p-2 text-[#25D366] hover:bg-gray-200 rounded-full transition disabled:opacity-50"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.40151696,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16151496 C3.34915502,0.9 2.40151696,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951062 3.19218622,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089826 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Highlights */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8">
              Lo que acaba de pasar:
            </h3>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`animate-chat-bubble ${getAnimationDelay(index)} ${
                    !showFeatures ? 'opacity-0' : ''
                  }`}
                >
                  <div className="flex gap-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <CheckIcon />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1">
                        {feature.text}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button className="w-full bg-gradient-to-r from-[#29F8D4] to-[#8B5CF6] text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 text-lg">
                Probar Demo Interactiva
              </button>
              <p className="text-center text-gray-400 text-sm mt-4">
                Agent Studio, Base de Conocimiento y 30+ integraciones incluidas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
