import { gsap } from 'gsap';

export type Tick = (dt: number) => void;

const subscribers = new Set<Tick>();
const FRAME_MS = 1000 / 60;

function tick(_time: number, deltaMs: number) {
  // dt = 1 at 60 Hz; capped so a backgrounded tab does not explode the springs.
  const dt = Math.min(deltaMs / FRAME_MS, 3);
  subscribers.forEach((fn) => fn(dt));
}

export function subscribe(fn: Tick): () => void {
  if (!subscribers.size) gsap.ticker.add(tick);
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
    if (!subscribers.size) gsap.ticker.remove(tick);
  };
}

/** Run `fn` every frame only while `el` is near the viewport. */
export function whileVisible(el: Element, fn: Tick, rootMargin = '100px'): () => void {
  let stop: (() => void) | null = null;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) stop ??= subscribe(fn);
      else {
        stop?.();
        stop = null;
      }
    },
    { rootMargin },
  );
  io.observe(el);
  return () => {
    io.disconnect();
    stop?.();
  };
}
