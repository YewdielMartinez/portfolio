import { getLang, setLanguage } from '../i18n';
import { reduced } from '../motion/core';

/** Radial settings button: theme and language. */
export function initSettings() {
  const root = document.querySelector<HTMLElement>('[data-settings]');
  const toggle = root?.querySelector<HTMLButtonElement>('[data-settings-toggle]');
  const options = root?.querySelector<HTMLElement>('[data-settings-options]');
  if (!root || !toggle || !options) return;

  const setOpen = (open: boolean) => {
    root.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    options.inert = !open;
  };

  toggle.addEventListener('click', () => setOpen(!root.hasAttribute('data-open')));
  document.addEventListener('pointerdown', (e) => {
    if (!root.contains(e.target as Node)) setOpen(false);
  });
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    setOpen(false);
    toggle.focus();
  });

  root.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
    const apply = () => {
      const dark = document.documentElement.classList.toggle('dark');
      document.documentElement.dataset.mkMode = dark ? 'dark' : 'light';
      try {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
      } catch {
        /* storage unavailable */
      }
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0a0a0a' : '#ffffff');
    };
    // Cross-fade the whole page where View Transitions exist.
    if (!reduced() && 'startViewTransition' in document) document.startViewTransition(apply);
    else apply();
  });

  root.querySelector('[data-lang-toggle]')?.addEventListener('click', () => {
    setLanguage(getLang() === 'en' ? 'es' : 'en');
  });
}
