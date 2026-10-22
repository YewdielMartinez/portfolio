import { createCascade } from '@yewdiel21/motion-kit';

/** Motion Kit cascade: each `[data-cascade]` block draws its rules and brings its text in once it shows. */
export function initCascades(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-cascade]').forEach((el) => createCascade(el, { once: true }));
}
