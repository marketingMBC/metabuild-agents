'use client';

import { useState } from 'react';
import { peakHoursData } from '@/lib/mock-data';
import { DAYS_OF_WEEK } from '@/lib/constants';

export default function PeakHoursGrid() {
  const [hoveredCell, setHoveredCell] = useState<{ day: number; hour: number } | null>(null);
  const maxVal = Math.max(...peakHoursData.flat());

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Horas pico de actividad</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Hour labels */}
          <div className="flex ml-10 mb-1">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="flex-1 text-center">
                {i % 3 === 0 && (
                  <span className="text-[8px] text-white/25">{i.toString().padStart(2, '0')}</span>
                )}
              </div>
            ))}
          </div>

          {/* Grid */}
          {DAYS_OF_WEEK.map((day, dayIdx) => (
            <div key={day} className="flex items-center gap-1 mb-1">
              <span className="text-[10px] text-white/40 w-8 text-right flex-shrink-0">{day}</span>
              <div className="flex flex-1 gap-0.5">
                {peakHoursData[dayIdx].map((value, hourIdx) => {
                  const intensity = maxVal > 0 ? value / maxVal : 0;
                  const isHovered = hoveredCell?.day === dayIdx && hoveredCell?.hour === hourIdx;

                  return (
                    <div
                      key={hourIdx}
                      className="flex-1 aspect-square rounded-sm heatmap-cell cursor-pointer"
                      style={{
                        backgroundColor: value === 0
                          ? 'rgba(255,255,255,0.03)'
                          : `rgba(41, 248, 212, ${0.1 + intensity * 0.7})`,
                        outline: isHovered ? '2px solid rgba(41, 248, 212, 0.8)' : 'none',
                      }}
                      title={`${day} ${hourIdx}:00 — ${value} conversaciones`}
                      onMouseEnter={() => setHoveredCell({ day: dayIdx, hour: hourIdx })}
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-3">
            <span className="text-[9px] text-white/30">Menos</span>
            {[0.1, 0.25, 0.4, 0.6, 0.8].map((opacity) => (
              <div
                key={opacity}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: `rgba(41, 248, 212, ${opacity})` }}
              />
            ))}
            <span className="text-[9px] text-white/30">Más</span>
          </div>
        </div>
      </div>
    </div>
  );
}
