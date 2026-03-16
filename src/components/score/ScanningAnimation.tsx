'use client';

import { useEffect, useState } from 'react';
import { Search, Wifi, Bot, Shield, CheckCircle2, Loader2, Code2, Zap } from 'lucide-react';

const SCAN_STEPS = [
  { icon: Wifi, label: 'Conectando al sitio web...', duration: 1200 },
  { icon: Code2, label: 'Analizando HTML y scripts...', duration: 1800 },
  { icon: Bot, label: 'Detectando chatbots y agentes IA...', duration: 2000 },
  { icon: Shield, label: 'Verificando seguridad HTTPS...', duration: 800 },
  { icon: Zap, label: 'Generando reporte...', duration: 600 },
];

interface ScanningAnimationProps {
  url: string;
  onComplete?: () => void;
}

export default function ScanningAnimation({ url }: ScanningAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const advanceStep = (step: number) => {
      if (step < SCAN_STEPS.length) {
        timeout = setTimeout(() => {
          setCurrentStep(step + 1);
          advanceStep(step + 1);
        }, SCAN_STEPS[step].duration);
      }
    };

    advanceStep(0);
    return () => clearTimeout(timeout);
  }, []);

  const progress = Math.min((currentStep / SCAN_STEPS.length) * 100, 100);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto text-center space-y-8 px-4">
        {/* Animated scanner */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border border-cyan/10 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-3 rounded-full border border-cyan/15 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
          <div className="absolute inset-6 rounded-full border border-cyan/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s' }} />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
              <Search className="w-7 h-7 text-cyan animate-pulse" />
            </div>
          </div>
        </div>

        {/* URL being scanned */}
        <div className="px-4 py-2.5 rounded-xl bg-surface-light/30 border border-[var(--theme-border)] inline-block">
          <span className="text-sm text-[var(--theme-text-secondary)] font-mono">
            {url}
          </span>
        </div>

        {/* Progress bar */}
        <div className="max-w-xs mx-auto">
          <div className="h-1 bg-surface-light rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan to-purple rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2 text-left max-w-sm mx-auto">
          {SCAN_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === currentStep;
            const isDone = i < currentStep;

            return (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-500 ${
                  isActive
                    ? 'bg-cyan/8 border border-cyan/15'
                    : isDone
                    ? 'opacity-50'
                    : 'opacity-20'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-cyan shrink-0" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-cyan animate-spin shrink-0" />
                ) : (
                  <Icon className="w-5 h-5 text-gray-600 shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    isActive ? 'text-cyan font-medium' : isDone ? 'text-[var(--theme-text-secondary)]' : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
