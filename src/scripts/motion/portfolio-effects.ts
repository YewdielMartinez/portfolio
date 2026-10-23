import { createFillText, createParallax, type FillTextInstance } from '@yewdiel21/motion-kit';
import { ScrollTrigger, reduced } from './core';

/** Motion Kit recipes on the existing portfolio markup. */
export function initPortfolioEffects() {
  const paragraphs = [...document.querySelectorAll<HTMLElement>('[data-mk="fill-text"]')];
  const progress = new Map<HTMLElement, number>();
  let fills: { fill: FillTextInstance; trigger: ScrollTrigger | null }[] = [];
  const fill = () => {
    fills = paragraphs.map((paragraph) => {
      const instance = createFillText(paragraph, { scroll: false });
      const reveal = (value: number) => {
        const next = Math.max(progress.get(paragraph) ?? 0, value);
        progress.set(paragraph, next);
        instance.seek(next);
      };
      reveal(reduced() ? 1 : 0);
      if (progress.get(paragraph) === 1) return { fill: instance, trigger: null };

      // Track globally so jumping past About also completes the reveal. Returning
      // to a paragraph keeps it readable instead of reversing its character fade.
      const trigger = ScrollTrigger.create({
        trigger: paragraph,
        start: 'top 90%',
        end: 'center 40%',
        onUpdate: (self) => {
          reveal(self.direction < 0 && self.progress > 0 ? 1 : self.progress);
          if (progress.get(paragraph) === 1) self.kill();
        },
      });
      reveal(trigger.progress);
      if (progress.get(paragraph) === 1) trigger.kill();
      return { fill: instance, trigger };
    });
  };
  fill();
  // SplitText must release its markup before translations replace the text.
  addEventListener('languagewillchange', () => {
    fills.forEach(({ fill, trigger }) => { trigger?.kill(); fill.destroy(); });
    fills = [];
  });
  addEventListener('languagechange', fill);

  document.querySelectorAll<HTMLElement>('[data-mk="parallax"]').forEach((el) => createParallax(el));
}
