'use client';

import { useState, type FormEvent } from 'react';
import { Search, ArrowRight, AlertCircle, Bot, Zap, Shield, Brain, Target, Sparkles } from 'lucide-react';

interface ScoreHeroProps {
  onAnalyze: (url: string) => void;
  error: string | null;
}

const TRUSTED_BY = [
  'Bambi AI', 'Botpress', 'Intercom', 'Drift', 'Tidio', 'HubSpot',
];

export default function ScoreHero({ onAnalyze, error }: ScoreHeroProps) {
  const [url, setUrl] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (url.trim()) onAnalyze(url.trim());
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial opacity-40" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-[15%] w-64 h-64 rounded-full bg-cyan/5 blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-[15%] w-48 h-48 rounded-full bg-purple/8 blur-[80px] animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/8 border border-cyan/15 mb-8 animate-slide-up">
          <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-xs font-medium text-cyan/90 tracking-wide uppercase">
            Basado en estandares RAGAS, DeepEval & IEEE 3128
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[var(--theme-text)] mb-6 animate-slide-up delay-100 tracking-tight leading-[1.1]">
          ¿Tu chatbot realmente
          <br />
          <span className="gradient-text">funciona</span>?
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] mb-10 max-w-2xl mx-auto animate-slide-up delay-200 leading-relaxed">
          Evaluamos tu agente de IA en 6 dimensiones con metricas de la industria.
          Obtiene un score de 0 a 100 y recomendaciones accionables para mejorar.
        </p>

        {/* URL Input */}
        <form
          onSubmit={handleSubmit}
          className="animate-slide-up delay-300"
        >
          <div className={`flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto p-2 rounded-2xl transition-all duration-300 ${focused ? 'bg-surface-light/30 ring-1 ring-cyan/20' : 'bg-surface-light/15'}`}>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--theme-text-tertiary)]" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Ingresa la URL de tu sitio web..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent text-[var(--theme-text)] placeholder:text-[var(--theme-text-tertiary)] focus:outline-none text-base"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={!url.trim()}
              className="px-8 py-4 rounded-xl bg-cyan text-navy font-bold text-base hover:bg-cyan-light transition-all glow-cyan disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 whitespace-nowrap group"
            >
              Analizar Gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 mt-4 text-red-400 text-sm animate-slide-up">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </form>

        {/* Category pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-12 animate-slide-up delay-500">
          {[
            { icon: Brain, label: 'Calidad IA', weight: '25%', color: '#29F8D4' },
            { icon: Target, label: 'Efectividad', weight: '20%', color: '#8B5CF6' },
            { icon: Sparkles, label: 'Experiencia', weight: '20%', color: '#29F8D4' },
            { icon: Shield, label: 'Seguridad', weight: '15%', color: '#8B5CF6' },
            { icon: Zap, label: 'Velocidad', weight: '10%', color: '#29F8D4' },
            { icon: Search, label: 'Deteccion', weight: '10%', color: '#8B5CF6' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-cyan/20 transition-all"
            >
              <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
              <span className="text-xs text-[var(--theme-text-secondary)]">{stat.label}</span>
              <span className="text-[10px] font-bold text-[var(--theme-text)]/40">{stat.weight}</span>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-16 animate-slide-up delay-700">
          <p className="text-[10px] uppercase tracking-widest text-[var(--theme-text)]/20 mb-3">
            Detectamos y evaluamos agentes de
          </p>
          <div className="flex items-center justify-center gap-6 opacity-30">
            {TRUSTED_BY.map((name) => (
              <span key={name} className="text-xs font-medium text-[var(--theme-text)]/60">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
