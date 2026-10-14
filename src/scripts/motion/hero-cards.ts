import { gsap, ELASTIC, entrances, reduced } from './core';
import { createSpring, type Spring } from './spring';
import { whileVisible } from './loop';
import { bindPointer, pointer, takeMovement } from './pointer';
import { clamp } from './math';

/*
 * spencergabor.com hero (TX_6gWle.js): each card owns a spring that starts at a
 * random offset of ±100 px and is pulled home 100 ms later; pointer movement
 * near a card adds velocity with a (1 − distance)^6 · 0.4 falloff.
 */

interface Card {
  el: HTMLElement;
  spring: Spring;
  push: { x: number; y: number };
  cx: number;
  cy: number;
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export function initHeroCards(root: HTMLElement) {
  const slots = [...root.querySelectorAll<HTMLElement>('[data-hero-card]')];
  if (!slots.length) return;

  if (entrances()) {
    gsap.fromTo(slots, { scale: 0 }, { scale: 1, duration: 1, ease: ELASTIC, stagger: 0.08, delay: 0.4 });
  }
  slots.forEach((slot) => (slot.dataset.ready = ''));
  if (reduced()) return;

  bindPointer();
  const cards: Card[] = slots.map((el) => {
    const spring = createSpring();
    spring.current.x = spring.target.x = rand(-100, 100);
    spring.current.y = spring.target.y = rand(-100, 100);
    return { el, spring, push: { x: 0, y: 0 }, cx: 0, cy: 0 };
  });
  setTimeout(() => cards.forEach(({ spring }) => (spring.target.x = spring.target.y = 0)), 100);

  // Centres in page coordinates; the slot itself is only scaled, never translated.
  const measure = () =>
    cards.forEach((card) => {
      const rect = card.el.getBoundingClientRect();
      card.cx = rect.left + scrollX + rect.width / 2;
      card.cy = rect.top + scrollY + rect.height / 2;
    });
  measure();
  new ResizeObserver(measure).observe(root);

  whileVisible(root, (dt) => {
    const movement = takeMovement();
    const mx = clamp(movement.mx, -80, 80);
    const my = clamp(movement.my, -80, 80);
    const decay = Math.pow(0.9, dt);

    for (const card of cards) {
      const { spring, push } = card;
      push.x *= decay;
      push.y *= decay;
      spring.current.x += push.x * dt;
      spring.current.y += push.y * dt;
      spring.update(dt);

      if (pointer.active) {
        const dx = ((pointer.x + scrollX - card.cx) / innerWidth) * 2;
        const dy = ((pointer.y + scrollY - card.cy) / innerHeight) * 2;
        const k = Math.pow(Math.max(0, 1 - Math.hypot(dx, dy)), 6) * 0.4;
        push.x += mx * k;
        push.y += my * k;
      }

      const style = card.el.style;
      style.setProperty('--offsetX', spring.current.x.toFixed(2));
      style.setProperty('--offsetY', spring.current.y.toFixed(2));
      style.setProperty('--velocity', (spring.velocity.x - spring.velocity.y).toFixed(3));
    }
  });
}
