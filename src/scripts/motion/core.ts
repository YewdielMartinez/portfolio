import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

/** Spencer's elastic overshoot, close to his `--ease-out-elastic` CSS curve. */
export const ELASTIC = 'elastic.out(1, 0.45)';

let registered = false;

export function initCore() {
  if (registered) return;
  registered = true;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  // Stepbro curves (Stepbro kit: money/motion-recipes.mjs, KAYRO.md)
  CustomEase.create('signature', 'M0,0 C0.308,0.19 0.107,0.633 0.288,0.866 0.382,0.987 0.656,1 1,1');
  CustomEase.create('flowSoft', 'M0,0 C0.25,0.1 0.25,1 1,1');
  CustomEase.create('closeFade', '.56,.27,0,1');
}

const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');

export const reduced = () => reducedQuery.matches;

/** Entrance animations run only with motion allowed and when the head safety net has not fired. */
export const entrances = () => !reduced() && !document.documentElement.classList.contains('motion-failed');

export { gsap, ScrollTrigger, SplitText };
