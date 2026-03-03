'use client';

import { PLANS } from '@/lib/constants';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BillingSettings() {
  const currentPlan = 'growth';

  return (
    <div className="space-y-6">
      {/* Current plan */}
      <div className="rounded-xl border border-cyan/20 bg-cyan/5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-cyan/60 font-medium">Plan actual</p>
            <p className="text-xl font-bold text-white mt-1">Growth</p>
            <p className="text-sm text-white/50 mt-0.5">$149 USD/mes · Renovación: 15 mar 2026</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/50">Uso este mes</p>
            <p className="text-lg font-bold text-white">1.247 <span className="text-sm font-normal text-white/40">/ 2.000 conv.</span></p>
            <div className="w-32 h-1.5 bg-white/10 rounded-full mt-2">
              <div className="h-full bg-cyan rounded-full" style={{ width: '62%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Plans comparison */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Planes disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const isCurrent = plan.tier === currentPlan;
            return (
              <div
                key={plan.tier}
                className={cn(
                  'rounded-xl border p-5 transition-all',
                  isCurrent
                    ? 'border-cyan/30 bg-cyan/5'
                    : 'border-white/10 bg-surface hover:border-white/20'
                )}
              >
                <div className="mb-4">
                  <h4 className="text-base font-semibold text-white">{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-bold text-white">${plan.price}</span>
                    <span className="text-sm text-white/40">USD/mes</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-white/60">
                      <Check size={14} className="text-cyan mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    'w-full py-2 text-sm font-medium rounded-lg transition-colors',
                    isCurrent
                      ? 'bg-white/10 text-white/50 cursor-default'
                      : 'bg-cyan text-navy hover:bg-cyan-light'
                  )}
                  disabled={isCurrent}
                >
                  {isCurrent ? 'Plan actual' : plan.price > 149 ? 'Upgrade' : 'Downgrade'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
