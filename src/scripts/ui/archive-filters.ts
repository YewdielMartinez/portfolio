import { createReflow, createTabs } from '@yewdiel21/motion-kit';
import { ScrollTrigger } from '../motion/core';

/** Archive filters: a Motion Kit segmented control; the cards travel to their new places (reflow). */
export function initArchiveFilters() {
  const tabs = document.querySelector<HTMLElement>('[data-archive-filters]');
  const grid = document.querySelector<HTMLElement>('[data-archive-grid]');
  if (!tabs || !grid) return;

  const items = [...grid.querySelectorAll<HTMLElement>('[data-mk-item]')];
  const filters = [...tabs.querySelectorAll<HTMLElement>('[data-mk-tab]')].map((tab) => tab.dataset.filter ?? 'all');
  // Only shown cards take part, so the ones coming back grow in.
  const reflow = createReflow(grid, { selector: '[data-mk-item]:not([hidden])' });
  let current = 'all';

  createTabs(tabs, {
    onSelect: (index) => {
      const filter = filters[index] ?? 'all';
      if (filter === current) return;
      current = filter;
      reflow.capture();
      for (const item of items) {
        item.hidden = filter !== 'all' && !(item.dataset.kinds ?? '').split(' ').includes(filter);
      }
      reflow.play();
      ScrollTrigger.refresh();
    },
  });
}
