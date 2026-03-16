'use client';

import { useRef, useState } from 'react';
import { useHQEngine } from '@/hooks/useHQEngine';
import { useHQStore } from '@/stores/hq-store';
import { Maximize2, Minimize2 } from 'lucide-react';

const SPEEDS = [
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 4, label: '4x' },
];

export default function OfficeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { handleClick, handleMouseMove } = useHQEngine(canvasRef);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const speed = useHQStore(s => s.speed);
  const setSpeed = useHQStore(s => s.setSpeed);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) containerRef.current.requestFullscreen?.();
    else document.exitFullscreen?.();
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        className="w-full h-auto"
        style={{ aspectRatio: '960 / 640' }}
      />

      {/* Top-left controls */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        {/* Live badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Live</span>
        </div>

        {/* Speed */}
        <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 shadow-sm">
          {SPEEDS.map(s => (
            <button
              key={s.value}
              onClick={() => setSpeed(s.value)}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all"
              style={{
                backgroundColor: speed === s.value ? '#29F8D4' : 'transparent',
                color: speed === s.value ? '#065F46' : '#9CA3AF',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/5 shadow-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
      </button>
    </div>
  );
}
