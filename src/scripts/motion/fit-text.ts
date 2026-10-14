/** Size every [data-fit] element so its single line spans its parent's content box. */
export function initFitText(root: ParentNode = document) {
  const els = [...root.querySelectorAll<HTMLElement>('[data-fit]')];
  if (!els.length) return;

  const fit = (el: HTMLElement) => {
    const parent = el.parentElement;
    if (!parent) return;
    const style = getComputedStyle(parent);
    const available = parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    el.style.fontSize = '100px';
    const width = el.getBoundingClientRect().width;
    if (width > 0) el.style.fontSize = `${(100 * available * 0.995) / width}px`;
  };

  const fitAll = () => els.forEach(fit);
  fitAll();
  // Refit on width changes only; the height change caused by fitting must not loop.
  const widths = new WeakMap<Element, number>();
  const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      if (widths.get(entry.target) === width) continue;
      widths.set(entry.target, width);
      els.filter((el) => el.parentElement === entry.target).forEach(fit);
    }
  });
  els.forEach((el) => el.parentElement && ro.observe(el.parentElement));
  addEventListener('languagechange', fitAll);
}
