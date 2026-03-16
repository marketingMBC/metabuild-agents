'use client';

import { Search, Zap, Brain, Sparkles, Shield, Bot, ArrowRight, Target, BarChart3, TrendingUp } from 'lucide-react';

const FEATURES = [
  {
    icon: Search,
    title: 'Deteccion Automatica',
    description: 'Escaneamos tu sitio y detectamos que tecnologia de chatbot usas entre 30+ plataformas conocidas.',
    metric: 'Scan en <5s',
    color: '#29F8D4',
  },
  {
    icon: Zap,
    title: 'Velocidad & Rendimiento',
    description: 'Evaluamos tiempo de respuesta, consistencia y carga del widget. Benchmark: <2s es bueno, <1s es elite.',
    metric: 'Benchmark: <1s',
    color: '#29F8D4',
  },
  {
    icon: Brain,
    title: 'Calidad de Respuesta',
    description: 'Metricas RAGAS: relevancia, precision, groundedness, retencion de contexto y deteccion de hallucinations.',
    metric: 'Basado en RAGAS',
    color: '#8B5CF6',
  },
  {
    icon: Sparkles,
    title: 'Experiencia de Usuario',
    description: 'Personalización, naturalidad, tono de marca, escalacion a humanos y compatibilidad movil.',
    metric: 'Ref: CSAT >80%',
    color: '#8B5CF6',
  },
  {
    icon: Target,
    title: 'Efectividad Operacional',
    description: 'First Contact Resolution, task completion, proactividad, base de conocimiento y soporte multilingue.',
    metric: 'Ref: FCR >70%',
    color: '#29F8D4',
  },
  {
    icon: Shield,
    title: 'Seguridad & Confianza',
    description: 'Transparencia de IA, proteccion PII, resistencia a prompt injection, manejo de errores y fallbacks.',
    metric: 'Ref: 0% PII leak',
    color: '#8B5CF6',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Ingresa tu URL',
    description: 'Pegamos la URL y nuestro sistema escanea automaticamente en busca de chatbots y agentes IA.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Evalua tu Chatbot',
    description: 'Sigue las pruebas guiadas con prompts predefinidos basados en metricas de la industria.',
    icon: Bot,
  },
  {
    step: '03',
    title: 'Obtiene tu Score',
    description: 'Recibe un reporte con score 0-100, comparacion con benchmarks y recomendaciones priorizadas.',
    icon: BarChart3,
  },
];

export default function ScoreFeatures() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/8 border border-purple/15 mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-purple" />
            <span className="text-xs font-medium text-purple-light">Metodologia basada en estandares</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--theme-text)] mb-4 tracking-tight">
            6 Dimensiones de{' '}
            <span className="gradient-text">Evaluacion</span>
          </h2>
          <p className="text-[var(--theme-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Basado en frameworks de evaluacion líderes: RAGAS, DeepEval, IEEE 3128-2025.
            Cada dimension tiene benchmarks de la industria para que sepas exactamente donde estas.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 hover:border-cyan/15 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle gradient on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at top left, ${feature.color}05 0%, transparent 70%)`,
                }}
              />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}10` }}
                  >
                    <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-1 rounded-full"
                    style={{
                      color: feature.color,
                      backgroundColor: `${feature.color}10`,
                    }}
                  >
                    {feature.metric}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--theme-text)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--theme-text)] mb-4 tracking-tight">
              Asi de <span className="gradient-text">Simple</span>
            </h2>
            <p className="text-[var(--theme-text-secondary)]">
              En menos de 5 minutos tienes un diagnostico completo de tu agente de IA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((item, i) => (
              <div key={item.step} className="relative text-center group">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-cyan/20 to-transparent" />
                )}

                <div className="text-6xl font-black text-cyan/[0.06] mb-3">{item.step}</div>
                <div className="w-14 h-14 rounded-2xl bg-cyan/8 border border-cyan/10 flex items-center justify-center mx-auto mb-4 group-hover:border-cyan/25 transition-all">
                  <item.icon className="w-6 h-6 text-cyan" />
                </div>
                <h3 className="text-base font-semibold text-[var(--theme-text)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl border border-[var(--theme-border)] bg-gradient-to-b from-white/[0.02] to-transparent">
            <p className="text-[var(--theme-text-secondary)]">
              ¿Tu empresa necesita un chatbot de alta calidad?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan/10 border border-cyan/20 text-cyan font-semibold hover:bg-cyan/15 hover:border-cyan/30 transition-all group"
            >
              Conoce MetaBuild Agents
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
