import { applyI18n, getLang } from './i18n';
import { initCore, ScrollTrigger } from './motion/core';
import { initFitText } from './motion/fit-text';
import { initWords } from './motion/words';
import { initFlows } from './motion/flow';
import { initHeroCards } from './motion/hero-cards';
import { initCarousel } from './motion/carousel';
import { initPiles } from './motion/piles';
import { initFooterStretch } from './motion/footer-stretch';
import { initSectionLabel } from './motion/section-label';
import { initProjectDialog } from './ui/project-dialog';
import { initSectionMenu } from './ui/section-menu';
import { initSettings } from './ui/settings';
import { initContactForm } from './ui/contact-form';

const root = document.documentElement;

// Cancels the head script's safety net: from here on JS owns the entrance states.
root.classList.add('motion-ready');

// Language first, so nothing animates in and then changes text.
applyI18n(document, getLang());
initCore();

// Interactions that do not depend on measured text.
initSettings();
initContactForm();
initProjectDialog();
initSectionMenu();

const fontsReady = Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 1500))]);

fontsReady.then(() => {
  initFitText();
  initWords();
  initFlows();

  const hero = document.querySelector<HTMLElement>('[data-hero-cards]');
  if (hero) initHeroCards(hero);
  const carousel = document.querySelector<HTMLElement>('[data-carousel]');
  if (carousel) initCarousel(carousel);

  initPiles();
  initFooterStretch();
  initSectionLabel();
  ScrollTrigger.refresh();
});
