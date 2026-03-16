// ============================================================
// MBC Agent HQ — Canvas Engine Hook (v3 — sparkles)
// ============================================================

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { GameLoop } from '@/lib/hq/engine/game-loop';
import { Renderer } from '@/lib/hq/engine/renderer';
import { useHQStore } from '@/stores/hq-store';
import { CANVAS_WIDTH, CANVAS_HEIGHT, AGENT_SIZE } from '@/lib/hq/constants';

export function useHQEngine(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const loopRef = useRef<GameLoop | null>(null);
  const rendererRef = useRef<Renderer | null>(null);

  const tick = useHQStore(s => s.tick);
  const agents = useHQStore(s => s.agents);
  const selectedAgentId = useHQStore(s => s.selectedAgentId);
  const hoveredAgentId = useHQStore(s => s.hoveredAgentId);
  const selectAgent = useHQStore(s => s.selectAgent);
  const setHoveredAgent = useHQStore(s => s.setHoveredAgent);
  const consumeSparkles = useHQStore(s => s.consumeSparkles);

  const stateRef = useRef({ agents, selectedAgentId, hoveredAgentId });
  stateRef.current = { agents, selectedAgentId, hoveredAgentId };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const renderer = new Renderer(canvas);
    rendererRef.current = renderer;

    const loop = new GameLoop(
      (dt) => {
        tick(dt);
        // Process sparkle queue
        const sparkles = consumeSparkles();
        for (const s of sparkles) {
          renderer.addSparkles(s.x, s.y, s.color);
        }
      },
      () => {
        const s = stateRef.current;
        renderer.drawAll(s.agents, s.selectedAgentId, s.hoveredAgentId);
      },
    );

    loopRef.current = loop;
    loop.start();

    return () => { loop.stop(); };
  }, [canvasRef, tick, consumeSparkles]);

  const getAgentAtPos = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    const currentAgents = stateRef.current.agents;
    const half = AGENT_SIZE / 2 + 4;
    for (let i = currentAgents.length - 1; i >= 0; i--) {
      const a = currentAgents[i];
      if (Math.abs(a.position.x - x) < half && Math.abs(a.position.y - y) < half) return a.id;
    }
    return null;
  }, [canvasRef]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    selectAgent(getAgentAtPos(e.clientX, e.clientY));
  }, [getAgentAtPos, selectAgent]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const agentId = getAgentAtPos(e.clientX, e.clientY);
    setHoveredAgent(agentId);
    const canvas = canvasRef.current;
    if (canvas) canvas.style.cursor = agentId ? 'pointer' : 'default';
  }, [getAgentAtPos, setHoveredAgent, canvasRef]);

  return { handleClick, handleMouseMove };
}
