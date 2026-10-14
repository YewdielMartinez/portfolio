import { reduced } from './core';
import { whileVisible } from './loop';
import { damp, mapRange } from './math';

/*
 * spencergabor.com footer: fixed behind <main>, revealed by a 100dvh phantom.
 * Smoothed scroll g = damp(g, scrollY, .9) drives the title's scaleY (0 → 1)
 * and lifts the footer from "title on the bottom edge" to its resting place.
 */
export function initFooterStretch() {
  const footer = document.querySelector<HTMLElement>('[data-footer]');
  const phantom = document.querySelector<HTMLElement>('[data-footer-phantom]');
  const title = footer?.querySelector<HTMLElement>('[data-footer-title]');
  if (!footer || !phantom || !title || reduced()) return;

  let phantomTop = 0;
  let titleBottom = 0;
  let viewport = innerHeight;
  let g = scrollY;

  const measure = () => {
    phantomTop = phantom.offsetTop;
    titleBottom = title.offsetTop + title.offsetHeight;
    viewport = innerHeight;
  };
  measure();
  new ResizeObserver(measure).observe(document.body);
  addEventListener('resize', measure);

  const update = (dt: number) => {
    g = damp(g, scrollY, 0.9, dt);
    const start = phantomTop - viewport;
    footer.style.setProperty('--footer-scale', mapRange(g, start, phantomTop, 0, 1, true).toFixed(4));
    footer.style.setProperty('--footer-offset', mapRange(g, start, phantomTop, viewport - titleBottom, 0, true).toFixed(2));
  };
  update(100); // settle on the current scroll position before the first frame
  whileVisible(phantom, update, '0px');
}
