import { gsap, reduced } from './core';

const HIDDEN = 'data-project-title-hidden';

/** Measure the actual text, including its line breaks, rather than the heading's box. */
function wordsOf(element: HTMLElement) {
  const words: { text: string; box: DOMRect }[] = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    for (const match of (node.textContent ?? '').matchAll(/\S+/g)) {
      const range = document.createRange();
      range.setStart(node, match.index!);
      range.setEnd(node, match.index! + match[0].length);
      words.push({ text: match[0], box: range.getBoundingClientRect() });
    }
  }
  return words;
}

/** Keep the title independent of the surface's scaling, clipping and content blur. */
export function createProjectTitleTransition() {
  let origin: HTMLElement | null = null;
  let heading: HTMLElement | null = null;
  let flight: HTMLElement | null = null;
  let timeline: gsap.core.Timeline | null = null;

  function stopFlight() {
    timeline?.kill();
    timeline = null;
    flight?.remove();
    flight = null;
  }

  function reset() {
    stopFlight();
    origin?.removeAttribute(HIDDEN);
    heading?.removeAttribute(HIDDEN);
    origin = heading = null;
  }

  function fly(from: HTMLElement, to: HTMLElement, duration: number, closing: boolean) {
    // Closing during the entrance continues from the words currently on screen.
    const start = wordsOf(flight ?? from);
    const end = wordsOf(to);
    stopFlight();

    if (
      reduced() || typeof HTMLElement.prototype.showPopover !== 'function' ||
      !start.length || start.length !== end.length || start.some((word, i) => word.text !== end[i].text)
    ) {
      if (closing) reset();
      return;
    }

    const look = getComputedStyle(to);
    const layer = document.createElement('div');
    layer.setAttribute('popover', 'manual');
    layer.setAttribute('aria-hidden', 'true');
    layer.dataset.projectTitleFlight = '';
    Object.assign(layer.style, {
      position: 'fixed', inset: '0', width: '100%', height: '100%',
      maxWidth: 'none', maxHeight: 'none', margin: '0', padding: '0', border: '0',
      background: 'transparent', overflow: 'visible', pointerEvents: 'none',
      fontFamily: look.fontFamily, fontSize: look.fontSize, fontWeight: look.fontWeight,
      fontStyle: look.fontStyle, lineHeight: look.lineHeight, letterSpacing: look.letterSpacing,
      color: look.color,
    });
    document.body.append(layer);
    layer.showPopover();
    flight = layer;

    const elements = end.map(({ text }) => {
      const word = document.createElement('span');
      word.textContent = text;
      Object.assign(word.style, {
        position: 'absolute', left: '0', top: '0', whiteSpace: 'pre', transformOrigin: '0 0',
      });
      layer.append(word);
      return word;
    });
    const natural = elements.map((word) => wordsOf(word)[0].box);
    from.setAttribute(HIDDEN, '');
    to.setAttribute(HIDDEN, '');

    timeline = gsap.timeline({
      onComplete: () => {
        stopFlight();
        if (closing) reset();
        else to.removeAttribute(HIDDEN);
      },
    });
    elements.forEach((word, i) => {
      const box = natural[i];
      const scaleX = start[i].box.width / box.width;
      const scaleY = start[i].box.height / box.height;
      timeline!.fromTo(word, {
        x: start[i].box.left - box.left * scaleX,
        y: start[i].box.top - box.top * scaleY,
        scaleX, scaleY,
      }, {
        x: end[i].box.left - box.left,
        y: end[i].box.top - box.top,
        scaleX: 1, scaleY: 1, duration, ease: 'signature',
      }, 0);
    });
  }

  return {
    open(source: HTMLElement, target: HTMLElement) {
      reset();
      origin = source;
      heading = target;
      fly(source, target, 0.7, false);
    },
    close() {
      if (origin && heading) fly(heading, origin, 0.5, true);
    },
    reset,
  };
}
