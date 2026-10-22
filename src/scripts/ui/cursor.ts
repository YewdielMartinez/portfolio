import { createCursor } from '@yewdiel21/motion-kit';

/*
 * Motion Kit cursors (off on touch screens and with reduced motion): a glass chip
 * reads the archive cards' data-mk-cursor ("View project"), and inside the
 * carousel a dot with the carousel's own word ("Drag") replaces the pointer.
 */
export function initCursors() {
  const layer = () => document.body.appendChild(document.createElement('div'));

  const archive = document.querySelector<HTMLElement>('[data-archive]');
  if (archive) createCursor(layer(), { zone: archive });

  const carousel = document.querySelector<HTMLElement>('[data-carousel]');
  if (carousel) createCursor(layer(), { variant: 'dot', zone: carousel, arrows: 'x' });
}
