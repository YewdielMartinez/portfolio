import { TIMING } from '@yewdiel21/motion-kit';
import { gsap, reduced } from '../motion/core';

/** Reveal only laid-out words, so a long reply cannot reserve empty scroll space. */
export function revealChatReply(
  message: HTMLElement,
  list: HTMLElement,
  mount: () => void,
  signal: AbortSignal,
  followFromQuestion: boolean,
): Promise<string> {
  const text = message.querySelector<HTMLElement>('[data-mk-text]')!;
  const nearBottom = () => list.scrollHeight - list.clientHeight - list.scrollTop < 32;
  let following = followFromQuestion;
  const answer = text.textContent ?? '';

  if (reduced()) {
    mount();
    // An instant, long answer should open at its beginning.
    if (following) list.scrollTop = Math.min(message.offsetTop, list.scrollHeight - list.clientHeight);
    return Promise.resolve(answer);
  }

  // Empty text anchors preserve the order and formatting of links, emphasis and
  // code. Whitespace enters with its word, including paragraph breaks.
  const words: { anchor: Comment; space: string; word: string }[] = [];
  const walker = document.createTreeWalker(text, NodeFilter.SHOW_TEXT);
  const sources: Text[] = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    sources.push(node as Text);
  }
  for (const source of sources) {
    // Comments survive the kit's Text.normalize() after its opening animation.
    const anchor = document.createComment('');
    for (const token of source.data.matchAll(/(\s*)(\S+|$)/g)) {
      if (token[0]) words.push({ anchor, space: token[1], word: token[2] });
    }
    source.replaceWith(anchor);
  }
  const append = ({ anchor, space, word }: typeof words[number], animated: boolean) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    anchor.before(document.createTextNode(space), span);
    if (animated && word) {
      gsap.fromTo(span, { y: 16, autoAlpha: 0, filter: 'blur(6px)' }, {
        y: 0, autoAlpha: 1, filter: 'blur(0px)',
        duration: TIMING.word / 0.75, ease: 'back.out(1)',
        onComplete: () => span.replaceWith(word),
      });
    } else span.replaceWith(word);
  };
  if (words.length) append(words[0], false);
  message.setAttribute('aria-busy', 'true');
  mount();

  // Keep the kit's initial bubble morph, without its scroll-to-final-height.
  const entrance = gsap.getTweensOf([message, ...message.querySelectorAll('*')]);
  entrance.forEach((tween) => tween.timeScale(0.75));
  const delay = Math.max(0, ...entrance.map((tween) => (tween.totalDuration() - tween.totalTime()) / 0.75));

  return new Promise((resolve) => {
    let previousTop = list.scrollTop;
    const onScroll = () => {
      if (list.scrollTop < previousTop - 1) following = false;
      else if (nearBottom()) following = true;
      previousTop = list.scrollTop;
    };
    const follow = () => {
      if (following) list.scrollTop = list.scrollHeight;
      previousTop = list.scrollTop;
    };
    const finish = () => {
      timeline.kill();
      signal.removeEventListener('abort', finish);
      list.removeEventListener('scroll', onScroll);
      entrance.forEach((tween) => tween.progress(1));
      gsap.set(message, { clearProps: 'width,height,transform' });
      // Finish visible words only when stopped; unrevealed words stay absent.
      const spans = [...text.querySelectorAll<HTMLElement>('span')];
      gsap.killTweensOf(spans);
      spans.forEach((span) => span.replaceWith(span.textContent ?? ''));
      words.forEach(({ anchor }) => anchor.remove());
      text.querySelectorAll('strong,code,a').forEach((inline) => { if (!inline.textContent) inline.remove(); });
      text.normalize();
      message.removeAttribute('aria-busy');
      follow();
      resolve(text.textContent ?? '');
    };
    const timeline = gsap.timeline({ onUpdate: follow, onComplete: finish });
    timeline.set(message, { clearProps: 'width,height,transform' }, delay);
    list.addEventListener('scroll', onScroll, { passive: true });
    signal.addEventListener('abort', finish, { once: true });
    words.slice(1).forEach((word, index) => {
      timeline.call(() => append(word, true), [], delay + index * TIMING.wordStagger / 0.75);
    });
    // Keep following through the last word's entrance, then release all markup.
    timeline.to({}, { duration: TIMING.word / 0.75 }, Math.max(delay, timeline.duration()));
    follow();
    if (signal.aborted) finish();
  });
}
