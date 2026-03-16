'use client';

import { useEffect, useState } from 'react';
import type { Grade } from '@/lib/score/types';
import { getGradeColor } from '@/lib/score/categories';

interface ScoreGaugeProps {
  score: number;
  grade: Grade;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  label?: string;
}

export default function ScoreGauge({
  score,
  grade,
  size = 'lg',
  animated = true,
  label,
}: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);
  const color = getGradeColor(grade);

  const sizes = {
    sm: { w: 80, stroke: 6, fontSize: 'text-lg', gradeSize: 'text-xs' },
    md: { w: 120, stroke: 8, fontSize: 'text-3xl', gradeSize: 'text-sm' },
    lg: { w: 200, stroke: 10, fontSize: 'text-5xl', gradeSize: 'text-lg' },
  };

  const { w, stroke, fontSize, gradeSize } = sizes[size];
  const radius = (w - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    if (!animated) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayScore(Math.round(score * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score, animated]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: w, height: w }}>
        <svg
          width={w}
          height={w}
          className="transform -rotate-90"
          viewBox={`0 0 ${w} ${w}`}
        >
          {/* Background circle */}
          <circle
            cx={w / 2}
            cy={w / 2}
            r={radius}
            fill="none"
            stroke="rgba(100,116,145,0.1)"
            strokeWidth={stroke}
          />
          {/* Score arc */}
          <circle
            cx={w / 2}
            cy={w / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: animated ? 'none' : 'stroke-dashoffset 1s ease-out',
              filter: `drop-shadow(0 0 6px ${color}30)`,
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${fontSize} font-bold`} style={{ color }}>
            {displayScore}
          </span>
          <span
            className={`${gradeSize} font-semibold px-2 py-0.5 rounded`}
            style={{ color, backgroundColor: `${color}15` }}
          >
            {grade}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-sm text-[var(--theme-text-secondary)]">{label}</span>
      )}
    </div>
  );
}
