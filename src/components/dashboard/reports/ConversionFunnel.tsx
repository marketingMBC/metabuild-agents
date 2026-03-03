'use client';

import { conversionFunnel } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';

export default function ConversionFunnel() {
  const maxCount = conversionFunnel[0].count;

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <h3 className="text-sm font-semibold text-white mb-6">Funnel de conversión</h3>
      <div className="space-y-3">
        {conversionFunnel.map((step, i) => {
          const width = Math.max((step.count / maxCount) * 100, 8);
          const opacity = 1 - i * 0.12;

          return (
            <div key={step.stage} className="flex items-center gap-3">
              <div className="w-36 flex-shrink-0 text-right">
                <p className="text-xs text-white/60 leading-tight">{step.stage}</p>
              </div>
              <div className="flex-1">
                <div
                  className="h-8 rounded-md flex items-center px-3 animate-funnel transition-all"
                  style={{
                    width: `${width}%`,
                    backgroundColor: `rgba(41, 248, 212, ${opacity * 0.3})`,
                    border: '1px solid rgba(41, 248, 212, 0.15)',
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <span className="text-xs font-medium text-white whitespace-nowrap">
                    {formatNumber(step.count)}
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-white/30 w-12 text-right flex-shrink-0">
                {step.percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
