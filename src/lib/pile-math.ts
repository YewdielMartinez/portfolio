export interface PileLayer { rotation: number; offsetX: number; offsetY: number }

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Spencer's stack transforms, seeded so SSR output is stable. Layer 0 is the back. */
export function pileLayers(count: number, seed: number): PileLayer[] {
  const rand = mulberry32(seed + 1);
  const range = (min: number, max: number) => rand() * (max - min) + min;
  return Array.from({ length: count }, (_, i) => ({
    rotation: range(2, 5) * ((i % 2) * 2 - 1),
    offsetX: range(4, 10) * (rand() < 0.5 ? -1 : 1),
    offsetY: (count - i) * 5,
  }));
}
