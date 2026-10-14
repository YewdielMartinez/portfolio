import { wrap } from './math.ts';

export const FRICTION = 0.85;

/** X of slide k relative to the viewport's left edge, wrapped so the track loops. */
export function slideX(k: number, offset: number, step: number, length: number) {
  return wrap(k * step - offset + step, length) - step;
}

/** Where the offset ends if velocity v (px/frame, applied as offset -= v) decays by f each frame. */
export const restingOffset = (offset: number, v: number, f = FRICTION) => offset - (v * f) / (1 - f);

/** Velocity that makes restingOffset(offset, v) === target. */
export const velocityFor = (target: number, offset: number, f = FRICTION) => -((target - offset) * (1 - f)) / f;

/** Offset that centres the slide nearest to the projected rest; `dir` forces ±1 slide from the current one. */
export function snapOffset(offset: number, v: number, step: number, center: number, f = FRICTION, dir = 0) {
  const base = dir === 0 ? restingOffset(offset, v, f) : offset;
  return (Math.round((base + center) / step) + dir) * step - center;
}
