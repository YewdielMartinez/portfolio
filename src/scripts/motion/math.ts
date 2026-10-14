export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b;
/** Spencer's frame-rate independent smoothing: lerp by 1 - e^(-lambda·dt). */
export const damp = (a: number, b: number, lambda: number, dt: number) => lerp(a, b, 1 - Math.exp(-lambda * dt));
export const wrap = (v: number, length: number) => ((v % length) + length) % length;
export function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number, clamped = false) {
  const t = (v - inMin) / (inMax - inMin);
  return lerp(outMin, outMax, clamped ? clamp(t, 0, 1) : t);
}
