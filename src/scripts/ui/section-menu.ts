import { createMorphDialog } from '../motion/morph-dialog';
import { gsap, entrances, reduced } from '../motion/core';

/** Header label opens the section list; the panel grows out of the label (Stepbro nav-menu). */
export function initSectionMenu() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-section-menu]');
  const trigger = document.querySelector<HTMLElement>('[data-menu-trigger]');
  if (!dialog || !trigger) return;

  const links = [...dialog.querySelectorAll<HTMLAnchorElement>('[data-menu-link]')];
  const morph = createMorphDialog(dialog, {
    onClosed: () => trigger.setAttribute('aria-expanded', 'false'),
  });

  trigger.addEventListener('click', () => {
    if (morph.isOpen) return;
    trigger.setAttribute('aria-expanded', 'true');
    void morph.open({ origin: trigger });
    if (entrances()) {
      gsap.fromTo(
        links,
        { scale: 0.9, autoAlpha: 0, filter: 'blur(4px)', transformOrigin: '0 50%' },
        { scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 0.35, stagger: 0.04, delay: 0.1, ease: 'flowSoft', clearProps: 'all' },
      );
    }
  });

  for (const link of links) {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const section = document.querySelector<HTMLElement>(link.hash);
      await morph.close({ restoreFocus: false });
      section?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' });
      section?.focus({ preventScroll: true });
    });
  }
}
