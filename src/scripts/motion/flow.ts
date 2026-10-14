import { gsap, ScrollTrigger, ELASTIC, entrances } from './core';

interface FlowOptions {
  y?: number;
  blur?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
}

/** Stepbro flowIn: from 20 px above, blurred 16 px, 0.5 s, 50 ms apart, `flowSoft`. */
export function flowIn(
  targets: gsap.TweenTarget,
  { y = 20, blur = 16, duration = 0.5, stagger = 0.05, delay = 0 }: FlowOptions = {},
) {
  return gsap.fromTo(
    targets,
    { y: -y, autoAlpha: 0, filter: `blur(${blur}px)` },
    {
      y: 0,
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration,
      stagger,
      delay,
      ease: 'flowSoft',
      clearProps: 'transform,filter,opacity,visibility',
    },
  );
}

// `end: 'max'` keeps the trigger active down to the page end, so content above a
// reload position still enters instead of staying hidden.
const onArrive = (trigger: Element, start: string, onEnter: () => void) =>
  ScrollTrigger.create({ trigger, start, end: 'max', once: true, onEnter });

/** `[data-flow]` children flow in on scroll; `[data-pop]` elements pop in with Spencer's elastic scale. */
export function initFlows(root: ParentNode = document) {
  const animate = entrances();

  root.querySelectorAll<HTMLElement>('[data-flow]').forEach((el) => {
    const children = [...el.children] as HTMLElement[];
    if (animate && children.length) {
      gsap.set(children, { autoAlpha: 0 });
      onArrive(el, 'top 88%', () => flowIn(children));
    }
    el.dataset.ready = '';
  });

  root.querySelectorAll<HTMLElement>('[data-pop]').forEach((el) => {
    if (animate) {
      gsap.set(el, { scale: 0.7, autoAlpha: 0 });
      onArrive(el, 'top 85%', () =>
        gsap.to(el, { scale: 1, autoAlpha: 1, duration: 1.1, ease: ELASTIC, clearProps: 'transform,opacity,visibility' }),
      );
    }
    el.dataset.ready = '';
  });
}
