import { ScrollTrigger } from './core';
import { replaceWords } from './words';
import { applyI18n } from '../i18n';

/** Header appears after the cover's top row and names the section in the middle of the viewport. */
export function initSectionLabel() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const label = document.querySelector<HTMLElement>('[data-section-label-text]');
  if (!header) return;

  const cover = document.getElementById('home');
  if (cover) {
    ScrollTrigger.create({
      trigger: cover,
      start: 'top+=80 top',
      end: 'max',
      onToggle: (self) => header.toggleAttribute('data-visible', self.isActive),
    });
  } else {
    header.dataset.visible = '';
  }

  if (!label) return;
  let current = label.dataset.i18n;
  document.querySelectorAll<HTMLElement>('[data-section-label]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        const key = section.dataset.sectionLabel;
        if (!self.isActive || !key || key === current) return;
        current = key;
        replaceWords(label, () => {
          label.dataset.i18n = key;
          applyI18n(label);
        });
      },
    });
  });
}
