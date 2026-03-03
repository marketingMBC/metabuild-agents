'use client';

interface LineChartProps {
  title: string;
  labels: string[];
  values: number[];
  color?: string;
}

export default function LineChart({ title, labels, values, color = '#29F8D4' }: LineChartProps) {
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const range = maxVal - minVal || 1;
  const width = 400;
  const height = 160;
  const padding = 8;

  const points = values.map((v, i) => {
    const x = padding + (i / (values.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((v - minVal) / range) * (height - 2 * padding);
    return { x, y, value: v };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
      <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full h-auto">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
          <line
            key={frac}
            x1={padding}
            y1={padding + frac * (height - 2 * padding)}
            x2={width - padding}
            y2={padding + frac * (height - 2 * padding)}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        ))}
        {/* Area */}
        <path d={areaD} fill={`${color}10`} />
        {/* Line */}
        <path d={pathD} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {/* Dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />
        ))}
        {/* Labels */}
        {labels.map((label, i) => {
          const x = padding + (i / (labels.length - 1)) * (width - 2 * padding);
          return (
            <text key={label} x={x} y={height + 14} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
