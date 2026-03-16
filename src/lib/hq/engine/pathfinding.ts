// ============================================================
// MBC Agent HQ — Simple Pathfinding (waypoint lerp)
// ============================================================

import type { HQPosition } from '../types';
import { MOVE_SPEED } from '../constants';

/**
 * Move position towards target by MOVE_SPEED pixels.
 * Returns true when arrived (distance < threshold).
 */
export function moveTowards(
  pos: HQPosition,
  target: HQPosition,
): { arrived: boolean; x: number; y: number } {
  const dx = target.x - pos.x;
  const dy = target.y - pos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < MOVE_SPEED * 2) {
    return { arrived: true, x: target.x, y: target.y };
  }

  const nx = dx / dist;
  const ny = dy / dist;

  return {
    arrived: false,
    x: pos.x + nx * MOVE_SPEED,
    y: pos.y + ny * MOVE_SPEED,
  };
}

/**
 * Get a random position within a room (with padding).
 */
export function randomPositionInRoom(
  roomX: number, roomY: number,
  roomW: number, roomH: number,
  tileSize: number,
  padding: number = 2,
): HQPosition {
  const minX = (roomX + padding) * tileSize;
  const maxX = (roomX + roomW - padding) * tileSize;
  const minY = (roomY + padding) * tileSize;
  const maxY = (roomY + roomH - padding) * tileSize;

  return {
    x: minX + Math.random() * (maxX - minX),
    y: minY + Math.random() * (maxY - minY),
  };
}
