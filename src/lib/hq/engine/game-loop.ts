// ============================================================
// MBC Agent HQ — Game Loop (requestAnimationFrame @ 30fps)
// ============================================================

import { FRAME_TIME } from '../constants';

export type UpdateFn = (dt: number) => void;
export type RenderFn = () => void;

export class GameLoop {
  private rafId: number | null = null;
  private lastTime = 0;
  private accumulator = 0;
  private running = false;

  constructor(
    private update: UpdateFn,
    private render: RenderFn,
  ) {}

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.accumulator = 0;
    this.tick(this.lastTime);
  }

  stop() {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private tick = (now: number) => {
    if (!this.running) return;
    const delta = now - this.lastTime;
    this.lastTime = now;
    this.accumulator += delta;

    // Cap accumulator to avoid spiral of death
    if (this.accumulator > FRAME_TIME * 5) {
      this.accumulator = FRAME_TIME;
    }

    while (this.accumulator >= FRAME_TIME) {
      this.update(FRAME_TIME);
      this.accumulator -= FRAME_TIME;
    }

    this.render();
    this.rafId = requestAnimationFrame(this.tick);
  };
}
