'use client';

import { useState } from 'react';

interface BarChartProps {
  title: string;
  labels: string[];
  values: number[];
  color?: string;
}

export default function BarChart({ title, labels, values, color = '#29F8D4' }: BarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxVal = Math.max(...values);

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <h3 className="text-sm font-semibold text-white mb-6">{title}</h3>
      <div className="flex items-end gap-2 h-40">
        {labels.map((label, i) => {
          const height = maxVal > 0 ? (values[i] / maxVal) * 100 : 0;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={label}
              className="flex-1 flex flex-col items-center gap-1 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {isHovered && (
                <span className="text-[10px] text-white/70 bg-white/10 px-2 py-0.5 rounded">
                  {values[i]}
                </span>
              )}
              <div className="w-full flex justify-center" style={{ height: '100%', alignItems: 'flex-end' }}>
                <div
                  className="w-full max-w-8 rounded-t transition-all duration-300"
                  style={{
                    height: `${height}%`,
                    backgroundColor: isHovered ? color : `${color}80`,
                    minHeight: values[i] > 0 ? '4px' : '0',
                  }}
                />
              </div>
              <span className="text-[9px] text-white/30 mt-1 truncate w-full text-center">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
