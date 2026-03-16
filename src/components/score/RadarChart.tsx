'use client';

import { useEffect, useState } from 'react';
import type { CategoryScore } from '@/lib/score/types';
import { EVAL_CATEGORIES, INDUSTRY_AVERAGES, getTierColor } from '@/lib/score/categories';

interface RadarChartProps {
  categories: CategoryScore[];
  size?: number;
  showBenchmark?: boolean;
  animated?: boolean;
}

export default function RadarChart({
  categories,
  size = 320,
  showBenchmark = true,
  animated = true,
}: RadarChartProps) {
  const [progress, setProgress] = useState(animated ? 0 : 1);

  useEffect(() => {
    if (!animated) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [animated]);

  const center = size / 2;
  const maxRadius = size * 0.38;
  const levels = 5;
  const sides = categories.length;

  const getPoint = (index: number, value: number): { x: number; y: number } => {
    const angle = (Math.PI * 2 * index) / sides - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const getPolygonPoints = (values: number[]): string => {
    return values
      .map((value, i) => {
        const point = getPoint(i, value * progress);
        return `${point.x},${point.y}`;
      })
      .join(' ');
  };

  const scores = categories.map((c) => c.score);
  const benchmarks = categories.map((c) => INDUSTRY_AVERAGES[c.categoryId]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid levels */}
        {Array.from({ length: levels }).map((_, level) => {
          const value = ((level + 1) / levels) * 100;
          const points = Array.from({ length: sides })
            .map((_, i) => {
              const p = getPoint(i, value);
              return `${p.x},${p.y}`;
            })
            .join(' ');

          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="rgba(100,116,145,0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {Array.from({ length: sides }).map((_, i) => {
          const point = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="rgba(100,116,145,0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* Benchmark polygon */}
        {showBenchmark && (
          <polygon
            points={getPolygonPoints(benchmarks)}
            fill="rgba(124, 58, 237, 0.06)"
            stroke="rgba(124, 58, 237, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        )}

        {/* Score polygon */}
        <polygon
          points={getPolygonPoints(scores)}
          fill="rgba(14, 165, 160, 0.1)"
          stroke="#0ea5a0"
          strokeWidth="2"
          style={{ filter: 'drop-shadow(0 0 4px rgba(14, 165, 160, 0.2))' }}
        />

        {/* Score points */}
        {scores.map((score, i) => {
          const point = getPoint(i, score * progress);
          const tier = categories[i].benchmark.tier;
          const color = getTierColor(tier);
          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={4}
              fill={color}
              stroke="#ffffff"
              strokeWidth="2"
              style={{ filter: `drop-shadow(0 0 3px ${color}40)` }}
            />
          );
        })}

        {/* Labels */}
        {categories.map((cat, i) => {
          const labelDistance = maxRadius + 30;
          const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
          const x = center + labelDistance * Math.cos(angle);
          const y = center + labelDistance * Math.sin(angle);
          const evalCat = EVAL_CATEGORIES.find((c) => c.id === cat.categoryId);

          return (
            <g key={i}>
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] font-medium"
                fill="#5a6b7f"
              >
                {evalCat?.name.split(' ')[0] || ''}
              </text>
              <text
                x={x}
                y={y + 6}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[11px] font-bold"
                fill={getTierColor(cat.benchmark.tier)}
              >
                {Math.round(cat.score * progress)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      {showBenchmark && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-cyan rounded" />
            <span className="text-[var(--theme-text-tertiary)]">Tu score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-purple rounded opacity-50" style={{ borderStyle: 'dashed' }} />
            <span className="text-[var(--theme-text-tertiary)]">Promedio industria</span>
          </div>
        </div>
      )}
    </div>
  );
}
