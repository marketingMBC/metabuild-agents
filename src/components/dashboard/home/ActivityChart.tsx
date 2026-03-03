'use client';

import { useState } from 'react';
import { activityData } from '@/lib/mock-data';

export default function ActivityChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxConv = Math.max(...activityData.conversations);

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">Actividad semanal</h3>
          <p className="text-xs text-white/40 mt-0.5">Conversaciones y leads capturados</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan" />
            <span className="text-[11px] text-white/50">Conversaciones</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-purple" />
            <span className="text-[11px] text-white/50">Leads</span>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 h-40">
        {activityData.labels.map((label, i) => {
          const convHeight = (activityData.conversations[i] / maxConv) * 100;
          const leadHeight = (activityData.leads[i] / maxConv) * 100;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={label}
              className="flex-1 flex flex-col items-center gap-1 group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {isHovered && (
                <div className="text-[10px] text-white/70 bg-white/10 px-2 py-1 rounded mb-1 whitespace-nowrap">
                  {activityData.conversations[i]} conv · {activityData.leads[i]} leads
                </div>
              )}
              <div className="w-full flex gap-1 items-end" style={{ height: '100%' }}>
                <div
                  className="flex-1 rounded-t-sm transition-all duration-300"
                  style={{
                    height: `${convHeight}%`,
                    backgroundColor: isHovered ? '#29F8D4' : 'rgba(41, 248, 212, 0.5)',
                  }}
                />
                <div
                  className="flex-1 rounded-t-sm transition-all duration-300"
                  style={{
                    height: `${leadHeight}%`,
                    backgroundColor: isHovered ? '#8B5CF6' : 'rgba(139, 92, 246, 0.5)',
                  }}
                />
              </div>
              <span className="text-[10px] text-white/40 mt-1">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
