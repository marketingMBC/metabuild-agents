'use client';

import React, { useEffect, useState } from 'react';

interface StatItem {
  id: string;
  value: string;
  label: string;
}

const stats: StatItem[] = [
  {
    id: 'messages',
    value: '10.000+',
    label: 'Mensajes procesados por día',
  },
  {
    id: 'response-rate',
    value: '98%',
    label: 'Tasa de respuesta',
  },
  {
    id: 'response-time',
    value: '< 3s',
    label: 'Tiempo de respuesta promedio',
  },
  {
    id: 'conversion',
    value: '45%',
    label: 'Aumento en conversiones',
  },
];

interface CounterProps {
  value: string;
  label: string;
  delay?: number;
}

const AnimatedStat: React.FC<CounterProps> = ({ value, label, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    // Extract numeric value for animation
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const duration = 2000; // 2 seconds animation
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const currentValue = Math.floor(numericValue * progress);

      // Reconstruct value with original format
      if (value.includes('000+')) {
        const k = currentValue / 1000;
        setDisplayValue(k.toFixed(0) + '.000+');
      } else if (value.includes('%')) {
        setDisplayValue(currentValue + '%');
      } else if (value.includes('s')) {
        const seconds = (currentValue / 100).toFixed(1);
        setDisplayValue('< ' + seconds + 's');
      } else {
        setDisplayValue(currentValue.toString());
      }

      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      className={`flex flex-col items-center justify-center transition-all duration-700 transform ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="text-5xl md:text-6xl font-bold text-cyan-400 mb-3 font-mono">
        {displayValue}
      </div>
      <p className="text-gray-400 text-sm md:text-base text-center max-w-xs">
        {label}
      </p>
    </div>
  );
};

export default function Stats() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Background with subtle grid pattern */}
      <div className="absolute inset-0 bg-surface opacity-40">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="glass rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20"
            >
              <AnimatedStat value={stat.value} label={stat.label} delay={index * 100} />
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm md:text-base">
            Datos basados en métricas promedio de nuestros clientes activos
          </p>
        </div>
      </div>
    </section>
  );
}
