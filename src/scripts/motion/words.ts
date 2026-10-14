import { gsap, ScrollTrigger, SplitText, ELASTIC, entrances } from './core';

/*
 * Spencer's headline entrance: every word (or letter) grows from the baseline,
 * `scaleY 0 → 1` + `translateY .25em → 0`, elastic, 100 ms apart.
 */

interface Entry {
  el: HTMLElement;
  split: SplitText | null;
  revealed: boolean;
  trigger: ScrollTrigger | null;
}

const entries = new Map<HTMLElement, Entry>();
const HIDDEN = { scaleY: 0, yPercent: 25 };

const isLetters = (el: HTMLElement) => el.dataset.words === 'letters';
const units = (entry: Entry) =>
  (entry.split ? (isLetters(entry.el) ? entry.split.chars : entry.split.words) : []) as HTMLElement[];

function prepare(entry: Entry, hidden: boolean) {
  const letters = isLetters(entry.el);
  entry.split = SplitText.create(entry.el, {
    type: letters ? 'chars' : 'words',
    charsClass: 'w',
    wordsClass: 'w',
    // Headings get an aria-label; inline spans stay readable as they are.
    aria: /^H[1-6]$/.test(entry.el.tagName) ? 'auto' : 'none',
    smartWrap: letters,
  });
  const list = units(entry);
  if (list.length) gsap.set(list, { transformOrigin: '50% 100%', ...(hidden ? HIDDEN : {}) });
}

function release(entry: Entry) {
  if (!entry.split) return;
  gsap.killTweensOf(units(entry));
  entry.split.revert();
  entry.split = null;
}

export function trackWords(el: HTMLElement, { hidden = true, onScroll = false } = {}) {
  if (entries.has(el)) return;
  const animate = entrances();
  const entry: Entry = { el, split: null, revealed: !animate || !hidden, trigger: null };
  entries.set(el, entry);
  if (animate) {
    prepare(entry, !entry.revealed);
    if (onScroll && !entry.revealed) {
      entry.trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        end: 'max',
        once: true,
        onEnter: () => revealWords(el),
      });
    }
  }
  el.dataset.ready = '';
}

/** Track every `[data-words]`; those marked `data-words-load` play right away instead of on scroll. */
export function initWords(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
    const onLoad = el.hasAttribute('data-words-load');
    trackWords(el, { onScroll: !onLoad });
    if (onLoad) revealWords(el, 0.2);
  });
}

export function revealWords(el: HTMLElement, delay = 0) {
  const entry = entries.get(el);
  if (!entry) return;
  entry.revealed = true;
  entry.trigger?.kill();
  entry.trigger = null;
  if (!entrances() || !entry.split) return;
  const list = units(entry);
  if (!list.length) return;
  gsap.killTweensOf(list);
  return gsap.fromTo(list, HIDDEN, {
    scaleY: 1,
    yPercent: 0,
    duration: 0.8,
    ease: ELASTIC,
    stagger: isLetters(el) ? 0.06 : 0.1,
    delay,
  });
}

/** Swap the text of a tracked element (via `mutate`) and replay its entrance. */
export function replaceWords(el: HTMLElement, mutate: () => void) {
  const entry = entries.get(el);
  if (!entry) return mutate();
  release(entry);
  mutate();
  if (entrances()) {
    prepare(entry, true);
    revealWords(el);
  }
}

export function untrackWords(el: HTMLElement) {
  const entry = entries.get(el);
  if (!entry) return;
  entry.trigger?.kill();
  release(entry);
  entries.delete(el);
}

// SplitText.revert() restores the markup captured at split time, so splits are undone
// before i18n writes the new language and rebuilt afterwards.
addEventListener('languagewillchange', () => entries.forEach(release));
addEventListener('languagechange', () => {
  if (!entrances()) return;
  entries.forEach((entry) => prepare(entry, !entry.revealed));
});
