import { reduced } from './core';
import { whileVisible } from './loop';
import { FRICTION, slideX, snapOffset } from './carousel-math';

/*
 * spencergabor.com carousel (Cv5ZTRhq.js): offset with friction .85, drag follows
 * the pointer, release doubles the velocity and snaps to the slide nearest the
 * projected rest. Slides loop by wrapping their x; CSS turns the distance from
 * the centre (`--t`) into the arc.
 */

const TAP_DISTANCE = 6;

export function initCarousel(root: HTMLElement) {
  const slides = [...root.querySelectorAll<HTMLElement>('.carousel__slide')];
  const count = slides.length;
  if (!count) return;

  let rootW = 0;
  let slideW = 0;
  let step = 0;
  let length = 0;
  let center = 0;
  let offset = 0;
  let v = 0;
  let target: number | null = null;
  let measured = false;

  let down = false;
  let dragDelta = 0;
  let lastX = 0;
  let travelled = 0;
  let suppressClick = false;
  let wheelTimer = 0;

  const centred = (k: number) => {
    // Offset that centres slide k, picking the loop copy nearest to the current offset.
    const base = k * step - center;
    return base + Math.round((offset - base) / length) * length;
  };

  const settleTo = (next: number) => {
    target = next;
    if (!reduced()) return;
    // Reduced motion: jump straight to the slide.
    offset = next;
    target = null;
    v = 0;
    render();
  };

  const measure = () => {
    const previousCenter = center;
    rootW = root.clientWidth;
    slideW = slides[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(root).columnGap) || 16;
    const index = measured ? (offset + previousCenter) / step : 0;
    step = slideW + gap;
    length = count * step;
    center = (rootW - slideW) / 2;
    offset = index * step - center;
    if (target !== null) target = Math.round((target + previousCenter) / step) * step - center;
    measured = true;
    render();
  };

  const render = () => {
    for (let k = 0; k < count; k++) {
      const x = slideX(k, offset, step, length);
      const style = slides[k].style;
      style.setProperty('--x', x.toFixed(2));
      style.setProperty('--t', (x + slideW / 2 - rootW / 2).toFixed(2));
    }
  };

  const tick = (dt: number) => {
    if (down) {
      v = dragDelta;
      dragDelta = 0;
      offset -= v;
    } else if (target !== null) {
      // Geometric approach to the snap point: same path as Spencer's computed velocity.
      const next = offset + (target - offset) * (1 - Math.pow(FRICTION, dt));
      v = offset - next;
      offset = next;
      if (Math.abs(target - offset) < 0.1) {
        offset = target;
        target = null;
        v = 0;
      }
    } else if (Math.abs(v) > 0.01) {
      v *= Math.pow(FRICTION, dt);
      offset -= v * dt;
    } else {
      return;
    }
    render();
  };

  // Pointer drag (window listeners so the drag survives leaving the carousel)
  root.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    if (e.pointerType === 'mouse') e.preventDefault();
    down = true;
    target = null;
    dragDelta = 0;
    travelled = 0;
    lastX = e.clientX;
  });

  addEventListener(
    'pointermove',
    (e) => {
      if (!down) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      dragDelta += dx;
      travelled += Math.abs(dx);
    },
    { passive: true },
  );

  const release = (cancelled: boolean) => {
    if (!down) return;
    down = false;
    suppressClick = travelled > TAP_DISTANCE;
    const throwV = cancelled ? 0 : v * 2;
    settleTo(snapOffset(offset, reduced() ? 0 : throwV, step, center));
  };
  addEventListener('pointerup', () => release(false));
  addEventListener('pointercancel', () => release(true));

  // A drag must not open the project under the pointer.
  root.addEventListener(
    'click',
    (e) => {
      if (!suppressClick) return;
      suppressClick = false;
      e.preventDefault();
      e.stopPropagation();
    },
    true,
  );

  // Horizontal wheel / trackpad
  root.addEventListener(
    'wheel',
    (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      target = null;
      if (reduced()) offset += e.deltaX;
      else v -= e.deltaX * 0.2;
      clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => settleTo(snapOffset(offset, v, step, center)), 150);
      if (reduced()) render();
    },
    { passive: false },
  );

  // Keyboard: arrows step one slide; tabbing to a slide centres it.
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const from = target ?? offset;
    settleTo(snapOffset(from, 0, step, center, FRICTION, e.key === 'ArrowLeft' ? -1 : 1));
  });
  root.addEventListener('focusin', (e) => {
    const slide = (e.target as Element).closest<HTMLElement>('.carousel__slide');
    if (!slide || down) return;
    settleTo(centred(slides.indexOf(slide)));
  });

  new ResizeObserver(measure).observe(root);
  new IntersectionObserver(
    ([entry], io) => {
      if (!entry.isIntersecting) return;
      root.dataset.inview = '';
      io.disconnect();
    },
    { threshold: 0.2 },
  ).observe(root);
  whileVisible(root, tick);
}
