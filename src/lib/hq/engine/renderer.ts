// ============================================================
// MBC Agent HQ — Canvas Renderer (v5 — Dark OLED High Contrast)
// ============================================================

import type { HQAgent, HQSparkle } from '../types';
import {
  TILE_SIZE, MAP_COLS, MAP_ROWS, AGENT_SIZE,
  ROOMS, FURNITURE,
} from '../constants';

// ── Dark OLED Palette ─────────────────────────────────────
const BG_COLOR = '#0F1117';
const GRID_COLOR = 'rgba(255,255,255,0.04)';
const WALL_COLOR = 'rgba(255,255,255,0.12)';
const WALL_INNER = 'rgba(255,255,255,0.06)';
const ROOM_LABEL_COLOR = 'rgba(255,255,255,0.5)';
const TEXT_PRIMARY = 'rgba(255,255,255,0.85)';
const TEXT_SECONDARY = 'rgba(255,255,255,0.6)';
const SHADOW_COLOR = 'rgba(0,0,0,0.4)';

// Room floor colors (deep dark tones)
const ROOM_FLOORS: Record<string, string> = {
  'dev-room': '#1A1535',       // deep purple
  'meeting-room': '#1A2035',   // deep blue
  'research-lab': '#152030',   // navy
  'finance-corner': '#201520', // dark wine
  'creative-lab': '#201530',   // deep magenta
  'central': '#0D1A1A',        // dark teal (special)
  'sales-room': '#152015',     // dark green
  'reception': '#1A1A15',      // dark olive
  'break-room': '#1A1510',     // dark amber
};

const ROOM_ACCENTS: Record<string, string> = {
  'dev-room': '#8B5CF6',
  'meeting-room': '#F59E0B',
  'research-lab': '#3B82F6',
  'finance-corner': '#EF4444',
  'creative-lab': '#EC4899',
  'central': '#10B981',
  'sales-room': '#22C55E',
  'reception': '#F97316',
  'break-room': '#EAB308',
};

const ROOM_ICONS: Record<string, string> = {
  'dev-room': '</>', 'meeting-room': '[ ]', 'research-lab': '{?}',
  'finance-corner': '$$', 'creative-lab': '~*~', 'central': '>>>',
  'sales-room': '%%', 'reception': 'ii', 'break-room': '__',
};

interface Particle { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string; }

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private particles: Particle[] = [];
  private sparkles: HQSparkle[] = [];
  frameCount = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
    this.initParticles();
  }

  private initParticles() {
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: Math.random() * this.width, y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 2 + 1, alpha: Math.random() * 0.1 + 0.05,
        color: ['#29F8D4', '#60A5FA', '#8B5CF6', '#F472B6', '#FBBF24'][Math.floor(Math.random() * 5)],
      });
    }
  }

  addSparkles(x: number, y: number, color: string, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 1.5 + Math.random() * 2.5;
      this.sparkles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1.5,
        life: 1, maxLife: 0.8 + Math.random() * 0.4, color, size: 2 + Math.random() * 3,
      });
    }
  }

  clear() {
    this.ctx.fillStyle = BG_COLOR;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawGrid() {
    const ctx = this.ctx;
    ctx.strokeStyle = GRID_COLOR; ctx.lineWidth = 1;
    for (let x = 0; x <= MAP_COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * TILE_SIZE + 0.5, 0); ctx.lineTo(x * TILE_SIZE + 0.5, this.height); ctx.stroke();
    }
    for (let y = 0; y <= MAP_ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * TILE_SIZE + 0.5); ctx.lineTo(this.width, y * TILE_SIZE + 0.5); ctx.stroke();
    }
  }

  drawRooms() {
    const ctx = this.ctx;
    for (const room of ROOMS) {
      const rx = room.x * TILE_SIZE, ry = room.y * TILE_SIZE;
      const rw = room.width * TILE_SIZE, rh = room.height * TILE_SIZE;
      const floor = ROOM_FLOORS[room.id] || '#141418';
      const accent = ROOM_ACCENTS[room.id] || '#6B7280';

      // Room shadow
      ctx.fillStyle = SHADOW_COLOR;
      ctx.fillRect(rx + 2, ry + 2, rw, rh);

      // Room fill
      ctx.fillStyle = floor;
      ctx.fillRect(rx, ry, rw, rh);

      // Floor pattern — checkerboard subtle
      for (let tx = room.x; tx < room.x + room.width; tx++) {
        for (let ty = room.y; ty < room.y + room.height; ty++) {
          if ((tx + ty) % 2 === 0) {
            ctx.fillStyle = 'rgba(255,255,255,0.015)';
            ctx.fillRect(tx * TILE_SIZE, ty * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          }
        }
      }

      // Room border
      ctx.strokeStyle = WALL_COLOR; ctx.lineWidth = 2;
      ctx.strokeRect(rx + 0.5, ry + 0.5, rw - 1, rh - 1);

      // Accent line top — 4px thick, 0.6 opacity
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(rx + 1, ry + 1, rw - 2, 4);
      ctx.globalAlpha = 1;

      // Central room special border
      if (room.id === 'central') {
        ctx.strokeStyle = `${accent}40`; ctx.lineWidth = 1;
        ctx.strokeRect(rx + 4, ry + 4, rw - 8, rh - 8);
      }

      // Room label — more visible
      ctx.fillStyle = ROOM_LABEL_COLOR;
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(room.label.toUpperCase(), rx + rw / 2, ry + 18);

      // Room icon watermark
      const icon = ROOM_ICONS[room.id];
      if (icon) {
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.font = 'bold 28px monospace';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(icon, rx + rw / 2, ry + rh / 2 + 12);
        ctx.textBaseline = 'alphabetic';
      }

      // Doors
      if (room.id !== 'central') {
        const doorX = rx + rw / 2, doorY = ry + rh;
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(doorX - 10, doorY - 1.5, 20, 3);
        // Door mat
        ctx.fillStyle = `${accent}20`;
        ctx.fillRect(doorX - 8, doorY + 1, 16, 4);
      }
    }
  }

  drawFurniture() {
    const ctx = this.ctx;
    for (const f of FURNITURE) {
      const fx = f.x * TILE_SIZE, fy = f.y * TILE_SIZE;
      const fw = f.width * TILE_SIZE, fh = f.height * TILE_SIZE;
      ctx.save();

      if (f.type === 'plant') {
        // Pot
        ctx.fillStyle = '#6B4A2A';
        this.roundRect(fx + fw * 0.15, fy + fh * 0.55, fw * 0.7, fh * 0.45, 3);
        ctx.fill();
        // Soil
        ctx.fillStyle = '#4A3510';
        ctx.fillRect(fx + fw * 0.2, fy + fh * 0.55, fw * 0.6, 3);
        // Leaves (layered circles)
        const greens = ['#22C55E', '#16A34A', '#4ADE80'];
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = greens[i]; ctx.globalAlpha = 0.85 - i * 0.15;
          ctx.beginPath();
          ctx.arc(fx + fw / 2 + (i - 1) * 3, fy + fh * 0.35 - i * 2, fw * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      } else if (f.type === 'coffee') {
        // Counter
        ctx.fillStyle = '#3D2E1A';
        this.roundRect(fx, fy, fw, fh, 4); ctx.fill();
        // Counter top
        ctx.fillStyle = '#4A3820';
        this.roundRect(fx + 1, fy + 1, fw - 2, 6, 3); ctx.fill();
        // Coffee machine
        ctx.fillStyle = '#2D2D45';
        ctx.fillRect(fx + fw * 0.15, fy + 8, fw * 0.35, fh * 0.5);
        // Cup
        ctx.fillStyle = '#DDDDE0';
        ctx.beginPath(); ctx.arc(fx + fw * 0.65, fy + fh * 0.6, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#6B4A2A';
        ctx.beginPath(); ctx.arc(fx + fw * 0.65, fy + fh * 0.6, 3.5, 0, Math.PI * 2); ctx.fill();
        // Steam
        const sp = this.frameCount * 0.06;
        ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(fx + fw * 0.65, fy + fh * 0.45);
        ctx.quadraticCurveTo(fx + fw * 0.65 + Math.sin(sp) * 5, fy + fh * 0.25, fx + fw * 0.65 + Math.sin(sp + 1) * 3, fy + fh * 0.1);
        ctx.stroke();
      } else if (f.type === 'screen') {
        // Monitor stand
        ctx.fillStyle = '#4A4A5A';
        ctx.fillRect(fx + fw / 2 - 2, fy + fh, 4, 4);
        ctx.fillRect(fx + fw / 2 - 6, fy + fh + 3, 12, 2);
        // Monitor body
        ctx.fillStyle = '#1A1A2E';
        this.roundRect(fx - 1, fy - 1, fw + 2, fh + 2, 2); ctx.fill();
        // Screen
        ctx.fillStyle = f.color; ctx.globalAlpha = 0.4;
        ctx.fillRect(fx, fy, fw, fh);
        ctx.globalAlpha = 1;
        // Screen glow — MORE glow
        ctx.shadowColor = f.color; ctx.shadowBlur = 15;
        ctx.fillStyle = f.color; ctx.globalAlpha = 0.2;
        ctx.fillRect(fx - 4, fy - 4, fw + 8, fh + 8);
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
        // Scanlines
        ctx.globalAlpha = 0.06; ctx.fillStyle = '#000';
        const so = (this.frameCount % 16) * 2;
        for (let sy = 0; sy < fh; sy += 3) ctx.fillRect(fx, fy + ((sy + so) % fh), fw, 1);
        ctx.globalAlpha = 1;
      } else if (f.type === 'desk') {
        // Desk shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(fx + 2, fy + 2, fw, fh);
        // Desk body
        ctx.fillStyle = '#2D2D45';
        this.roundRect(fx, fy, fw, fh, 3); ctx.fill();
        // Desk top surface
        ctx.fillStyle = '#353550';
        this.roundRect(fx + 1, fy + 1, fw - 2, fh - 3, 2); ctx.fill();
        // Keyboard
        ctx.fillStyle = '#3A3A55';
        ctx.fillRect(fx + fw * 0.15, fy + fh * 0.25, fw * 0.5, fh * 0.5);
        // Mouse
        ctx.fillStyle = '#4A4A65';
        ctx.beginPath(); ctx.arc(fx + fw * 0.8, fy + fh * 0.5, 3, 0, Math.PI * 2); ctx.fill();
      } else if (f.type === 'table') {
        // Table shadow
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        this.roundRect(fx + 2, fy + 2, fw, fh, 10); ctx.fill();
        // Table
        ctx.fillStyle = '#2D2D45';
        this.roundRect(fx, fy, fw, fh, 10); ctx.fill();
        // Table surface
        ctx.fillStyle = '#353550';
        this.roundRect(fx + 3, fy + 3, fw - 6, fh - 6, 8); ctx.fill();
        // Chairs
        ctx.fillStyle = '#4A4A65';
        const chairs = [
          [fx - 8, fy + fh * 0.3], [fx - 8, fy + fh * 0.7],
          [fx + fw + 3, fy + fh * 0.3], [fx + fw + 3, fy + fh * 0.7],
          [fx + fw * 0.3, fy - 8], [fx + fw * 0.7, fy - 8],
        ];
        for (const [cx, cy] of chairs) {
          ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
          // Chair back
          ctx.fillStyle = '#3A3A55';
          ctx.fillRect(cx - 4, cy - 6, 8, 3);
          ctx.fillStyle = '#4A4A65';
        }
      }
      ctx.restore();
    }
  }

  drawParticles() {
    const ctx = this.ctx;
    for (const p of this.particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = this.width; if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height; if (p.y > this.height) p.y = 0;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha + Math.sin(this.frameCount * 0.015 + p.x * 0.01) * 0.03;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  drawSparkles() {
    const ctx = this.ctx;
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const s = this.sparkles[i];
      s.x += s.vx; s.y += s.vy; s.vy += 0.06;
      s.life -= 0.025;
      if (s.life <= 0) { this.sparkles.splice(i, 1); continue; }
      const alpha = s.life / s.maxLife;
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.fillStyle = s.color; ctx.shadowColor = s.color; ctx.shadowBlur = 8;
      ctx.translate(s.x, s.y); ctx.rotate(this.frameCount * 0.15 + i);
      ctx.beginPath();
      for (let p = 0; p < 4; p++) {
        const a = (Math.PI * 2 * p) / 4;
        ctx.lineTo(Math.cos(a) * s.size, Math.sin(a) * s.size);
        ctx.lineTo(Math.cos(a + Math.PI / 4) * s.size * 0.35, Math.sin(a + Math.PI / 4) * s.size * 0.35);
      }
      ctx.closePath(); ctx.fill(); ctx.restore();
    }
  }

  drawConnectionLines(agents: HQAgent[]) {
    const ctx = this.ctx;
    const meeting = agents.filter(a => a.status === 'meeting');
    for (let i = 0; i < meeting.length; i++) {
      for (let j = i + 1; j < meeting.length; j++) {
        const a = meeting[i], b = meeting[j];
        if (a.room !== b.room) continue;
        const dist = Math.hypot(a.position.x - b.position.x, a.position.y - b.position.y);
        if (dist > 200) continue;
        ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]); ctx.lineDashOffset = -this.frameCount * 0.5;
        ctx.beginPath(); ctx.moveTo(a.position.x, a.position.y); ctx.lineTo(b.position.x, b.position.y); ctx.stroke();
        ctx.setLineDash([]); ctx.lineDashOffset = 0;
        // Data dot
        const t = (this.frameCount * 0.015) % 1;
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.arc(a.position.x + (b.position.x - a.position.x) * t, a.position.y + (b.position.y - a.position.y) * t, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  drawAgentTrails(agents: HQAgent[]) {
    const ctx = this.ctx;
    for (const agent of agents) {
      const dx = agent.targetPosition.x - agent.position.x;
      const dy = agent.targetPosition.y - agent.position.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 5) continue;
      const nx = dx / dist, ny = dy / dist;
      ctx.fillStyle = agent.color; ctx.globalAlpha = 0.15;
      ctx.beginPath(); ctx.arc(agent.position.x - nx * 10, agent.position.y - ny * 10, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.08;
      ctx.beginPath(); ctx.arc(agent.position.x - nx * 22, agent.position.y - ny * 22, 2, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  drawAgents(agents: HQAgent[], selectedId: string | null, hoveredId: string | null) {
    const ctx = this.ctx;
    const sorted = [...agents].sort((a, b) => a.position.y - b.position.y);

    for (const agent of sorted) {
      const ax = agent.position.x, ay = agent.position.y;
      const isSel = agent.id === selectedId, isHov = agent.id === hoveredId;
      const half = AGENT_SIZE / 2;
      const dx = agent.targetPosition.x - ax, dy = agent.targetPosition.y - ay;
      const isMoving = Math.hypot(dx, dy) > 3;
      const walkBob = isMoving ? Math.sin(agent.animFrame * 0.4) * 2.5 : 0;
      const breathe = !isMoving && agent.status === 'working' ? Math.sin(agent.animFrame * 0.08) * 1.2 : 0;
      const bodyY = ay - half + walkBob + breathe;

      // ── Shadow ──
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.beginPath();
      ctx.ellipse(ax, ay + half + 4, half * 0.65, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // ── Selection ring ──
      if (isSel) {
        const rp = Math.sin(this.frameCount * 0.08) * 2;
        ctx.strokeStyle = agent.color; ctx.lineWidth = 2.5;
        ctx.shadowColor = agent.color; ctx.shadowBlur = 15;
        ctx.beginPath(); ctx.arc(ax, ay + breathe, half + 6 + rp, 0, Math.PI * 2); ctx.stroke();
        ctx.shadowBlur = 0;
        const angle = this.frameCount * 0.03;
        ctx.fillStyle = agent.color;
        for (let i = 0; i < 4; i++) {
          const a2 = angle + (Math.PI * 2 * i) / 4, r2 = half + 6 + rp;
          ctx.beginPath(); ctx.arc(ax + Math.cos(a2) * r2, ay + breathe + Math.sin(a2) * r2, 2.5, 0, Math.PI * 2); ctx.fill();
        }
      }

      // ── Hover glow ──
      if (isHov && !isSel) {
        ctx.strokeStyle = agent.color; ctx.lineWidth = 2;
        ctx.globalAlpha = 0.45 + Math.sin(this.frameCount * 0.1) * 0.15;
        ctx.shadowColor = agent.color; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(ax, ay, half + 5, 0, Math.PI * 2); ctx.stroke();
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      }

      // ── Body (rounded square with 3D) ──
      const bodyX = ax - half;

      // Agent body border for definition
      ctx.strokeStyle = agent.color; ctx.globalAlpha = 0.3; ctx.lineWidth = 1;
      ctx.beginPath(); this.roundRectPath(bodyX - 0.5, bodyY - 0.5, AGENT_SIZE + 1, AGENT_SIZE + 1, 8.5); ctx.stroke();
      ctx.globalAlpha = 1;

      // Body fill
      ctx.fillStyle = agent.color;
      ctx.beginPath(); this.roundRectPath(bodyX, bodyY, AGENT_SIZE, AGENT_SIZE, 8); ctx.fill();

      // Top highlight
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath(); this.roundRectPath(bodyX + 2, bodyY + 2, AGENT_SIZE - 4, AGENT_SIZE * 0.4, 6); ctx.fill();

      // Bottom shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(bodyX + 3, bodyY + AGENT_SIZE - 5, AGENT_SIZE - 6, 4);

      // ── Face ──
      const faceY = ay + breathe + walkBob;
      const blinking = (this.frameCount + agent.id.charCodeAt(0) * 17) % 150 < 5;

      if (!isMoving) {
        if (blinking) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(ax - 6, faceY - 2, 5, 2);
          ctx.fillRect(ax + 1, faceY - 2, 5, 2);
        } else {
          // Eyes — white with bigger pupils
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath(); ctx.arc(ax - 4, faceY - 1, 4, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(ax + 4, faceY - 1, 4, 0, Math.PI * 2); ctx.fill();
          // Pupils
          ctx.fillStyle = '#1a1a2e';
          ctx.beginPath(); ctx.arc(ax - 3.5, faceY - 0.5, 2.2, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(ax + 4.5, faceY - 0.5, 2.2, 0, Math.PI * 2); ctx.fill();
          // Eye shine
          ctx.fillStyle = 'rgba(255,255,255,0.9)';
          ctx.beginPath(); ctx.arc(ax - 2.5, faceY - 2, 1.2, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(ax + 5.5, faceY - 2, 1.2, 0, Math.PI * 2); ctx.fill();
        }

        // Mouth
        if (agent.status === 'break') {
          // Happy smile
          ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(ax, faceY + 4, 3.5, 0.2, Math.PI - 0.2); ctx.stroke();
        } else if (agent.status === 'working') {
          // Focused
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.fillRect(ax - 2, faceY + 4, 4, 1.5);
        } else {
          // Neutral
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.beginPath(); ctx.arc(ax, faceY + 4.5, 2, 0, Math.PI); ctx.fill();
        }
      } else {
        // Moving — determined squint
        const eyeY = faceY - 1;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(ax - 6, eyeY, 5, 2);
        ctx.fillRect(ax + 1, eyeY, 5, 2);
        // Open mouth
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath(); ctx.arc(ax, faceY + 4, 2, 0, Math.PI * 2); ctx.fill();
      }

      // ── Initial badge ──
      ctx.fillStyle = 'rgba(15,17,23,0.85)';
      ctx.beginPath(); ctx.arc(ax + half - 1, ay + half + breathe + walkBob - 1, 8, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = agent.color; ctx.lineWidth = 1; ctx.globalAlpha = 0.5;
      ctx.beginPath(); ctx.arc(ax + half - 1, ay + half + breathe + walkBob - 1, 8, 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 9px system-ui, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(agent.initial, ax + half - 1, ay + half + breathe + walkBob - 1);

      // ── Status dot — bigger, brighter glow ──
      const dotColors: Record<string, string> = { working: '#22C55E', idle: '#9CA3AF', meeting: '#F59E0B', break: '#3B82F6' };
      const dotColor = dotColors[agent.status] || '#9CA3AF';
      // Glow behind dot
      ctx.shadowColor = dotColor; ctx.shadowBlur = 10;
      ctx.fillStyle = dotColor;
      ctx.beginPath(); ctx.arc(ax + half - 2, ay - half + breathe + walkBob + 2, 5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      // Inner bright dot
      ctx.fillStyle = '#FFFFFF'; ctx.globalAlpha = 0.3;
      ctx.beginPath(); ctx.arc(ax + half - 2, ay - half + breathe + walkBob + 1, 2, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      // Working pulse
      if (agent.status === 'working') {
        const p = Math.sin(this.frameCount * 0.1) * 0.5 + 0.5;
        ctx.strokeStyle = dotColor; ctx.globalAlpha = 0.3 * (1 - p); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(ax + half - 2, ay - half + breathe + walkBob + 2, 5 + p * 6, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // ── Name label — MUCH brighter ──
      ctx.font = 'bold 10px system-ui, sans-serif';
      const nameMeasure = ctx.measureText(agent.name);
      const nameW = nameMeasure.width + 10;
      // Background pill
      ctx.fillStyle = 'rgba(15,17,23,0.85)';
      this.roundRect(ax - nameW / 2, ay + half + 8, nameW, 16, 4); ctx.fill();
      // Border
      ctx.strokeStyle = `${agent.color}40`; ctx.lineWidth = 1;
      this.roundRect(ax - nameW / 2, ay + half + 8, nameW, 16, 4); ctx.stroke();
      // Text
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(agent.name, ax, ay + half + 16);

      // ── Emote ──
      if (agent.emote && agent.emoteTimer > 0) {
        const ea = Math.min(1, agent.emoteTimer / 400);
        const ey = ay - half - 24 + breathe - Math.sin(agent.emoteTimer * 0.004) * 4;
        ctx.globalAlpha = ea; ctx.font = '16px sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(agent.emote, ax, ey);
        ctx.globalAlpha = 1;
      }

      // ── Chat bubble ──
      if (agent.bubble) {
        const ba = Math.min(1, agent.bubbleTimer / 500);
        this.drawBubble(ax, ay - half - (agent.emote ? 36 : 14) + breathe + walkBob, agent.bubble, agent.color, ba);
      }
    }
  }

  private drawBubble(x: number, y: number, text: string, color: string, alpha: number) {
    const ctx = this.ctx; ctx.save(); ctx.globalAlpha = alpha;
    ctx.font = '10px system-ui, sans-serif';
    const bw = ctx.measureText(text).width + 24, bh = 22;
    const bx = x - bw / 2, by = y - bh;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    this.roundRect(bx + 2, by + 2, bw, bh, 8); ctx.fill();
    // Background
    ctx.fillStyle = 'rgba(20,20,35,0.95)';
    this.roundRect(bx, by, bw, bh, 8); ctx.fill();
    // Border — agent color at full opacity, 1.5px
    ctx.strokeStyle = color; ctx.lineWidth = 1.5;
    this.roundRect(bx, by, bw, bh, 8); ctx.stroke();
    // Accent bar
    ctx.fillStyle = color; ctx.globalAlpha = alpha * 0.7;
    this.roundRect(bx + 3, by + 5, 2.5, bh - 10, 1.5); ctx.fill();
    ctx.globalAlpha = alpha;

    // Arrow — more visible
    ctx.fillStyle = 'rgba(20,20,35,0.95)';
    ctx.beginPath(); ctx.moveTo(x - 5, by + bh); ctx.lineTo(x, by + bh + 6); ctx.lineTo(x + 5, by + bh); ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x - 5, by + bh); ctx.lineTo(x, by + bh + 6); ctx.lineTo(x + 5, by + bh); ctx.stroke();

    // Text — nearly white
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, x, by + bh / 2 + 1);
    ctx.restore();
  }

  drawMinimap(agents: HQAgent[], selectedId: string | null) {
    const ctx = this.ctx;
    const scale = 0.12;
    const mw = this.width * scale, mh = this.height * scale;
    const mx = this.width - mw - 10, my = this.height - mh - 10;

    // Background
    ctx.fillStyle = 'rgba(15,17,23,0.95)';
    this.roundRect(mx - 3, my - 3, mw + 6, mh + 6, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
    this.roundRect(mx - 3, my - 3, mw + 6, mh + 6, 6); ctx.stroke();

    for (const room of ROOMS) {
      // Brighter room fills for minimap
      const accent = ROOM_ACCENTS[room.id] || '#6B7280';
      ctx.fillStyle = accent; ctx.globalAlpha = 0.25;
      ctx.fillRect(mx + room.x * TILE_SIZE * scale, my + room.y * TILE_SIZE * scale, room.width * TILE_SIZE * scale, room.height * TILE_SIZE * scale);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 0.5;
      ctx.strokeRect(mx + room.x * TILE_SIZE * scale, my + room.y * TILE_SIZE * scale, room.width * TILE_SIZE * scale, room.height * TILE_SIZE * scale);
    }

    for (const agent of agents) {
      ctx.fillStyle = agent.id === selectedId ? agent.color : `${agent.color}AA`;
      ctx.beginPath();
      ctx.arc(mx + agent.position.x * scale, my + agent.position.y * scale, agent.id === selectedId ? 3.5 : 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = 'bold 7px system-ui'; ctx.textAlign = 'right';
    ctx.fillText('MAP', mx + mw - 2, my - 5);
  }

  drawClock() {
    const ctx = this.ctx;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

    // Clock pill
    const cw = 50, ch = 18;
    const cx = this.width - cw - 8, cy = 6;
    ctx.fillStyle = 'rgba(15,17,23,0.85)';
    this.roundRect(cx, cy, cw, ch, 9); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
    this.roundRect(cx, cy, cw, ch, 9); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '10px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(timeStr, cx + cw / 2, cy + ch / 2);
    ctx.textBaseline = 'alphabetic';
  }

  drawRoomOccupancy(agents: HQAgent[]) {
    const ctx = this.ctx;
    const counts: Record<string, number> = {};
    for (const a of agents) counts[a.room] = (counts[a.room] || 0) + 1;
    for (const room of ROOMS) {
      const c = counts[room.id] || 0;
      if (c === 0) continue;
      const rx = room.x * TILE_SIZE + room.width * TILE_SIZE - 16;
      const ry = room.y * TILE_SIZE + 8;
      ctx.fillStyle = 'rgba(15,17,23,0.9)';
      ctx.beginPath(); ctx.arc(rx, ry, 8, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(rx, ry, 8, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = 'bold 9px system-ui';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(String(c), rx, ry);
    }
  }

  drawHoverTooltip(agents: HQAgent[], hoveredId: string | null) {
    if (!hoveredId) return;
    const agent = agents.find(a => a.id === hoveredId);
    if (!agent) return;
    const ctx = this.ctx;
    const text = `${agent.shortRole} · ${agent.currentTask}`;
    ctx.font = '9px system-ui';
    const tw = Math.min(ctx.measureText(text).width + 20, 200);
    const th = 20, tx = agent.position.x - tw / 2, ty = agent.position.y + AGENT_SIZE / 2 + 28;
    ctx.fillStyle = 'rgba(15,17,23,0.95)';
    this.roundRect(tx, ty, tw, th, 6); ctx.fill();
    ctx.strokeStyle = `${agent.color}50`; ctx.lineWidth = 1;
    this.roundRect(tx, ty, tw, th, 6); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    let dt = text;
    while (ctx.measureText(dt).width > tw - 16 && dt.length > 5) dt = dt.slice(0, -4) + '...';
    ctx.fillText(dt, agent.position.x, ty + th / 2);
  }

  private roundRect(x: number, y: number, w: number, h: number, r: number) {
    this.ctx.beginPath(); this.roundRectPath(x, y, w, h, r);
  }
  private roundRectPath(x: number, y: number, w: number, h: number, r: number) {
    const ctx = this.ctx;
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  drawAll(agents: HQAgent[], selectedId: string | null, hoveredId: string | null) {
    this.frameCount++;
    this.clear();
    this.drawGrid();
    this.drawRooms();
    this.drawParticles();
    this.drawFurniture();
    this.drawConnectionLines(agents);
    this.drawAgentTrails(agents);
    this.drawAgents(agents, selectedId, hoveredId);
    this.drawSparkles();
    this.drawRoomOccupancy(agents);
    this.drawHoverTooltip(agents, hoveredId);
    this.drawMinimap(agents, selectedId);
    this.drawClock();
  }
}
