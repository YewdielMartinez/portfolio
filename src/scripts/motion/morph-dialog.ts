import { gsap, reduced } from './core';

/*
 * Stepbro ModalHost recipe: the panel travels from the trigger's box to its final
 * box (0.7 s, `signature`) while the content scales as one group from the trigger
 * width, blur 8 → 0. Closing reverses in 0.5 s with the content blurring to 32 px;
 * without a visible origin the panel scales .92 → 1 (open) or to .9 (close).
 */

export interface MorphOpenOptions {
  /** Element the panel grows from and returns to. */
  origin?: HTMLElement | null;
  /** Element that receives focus after closing (defaults to the origin). */
  returnFocus?: HTMLElement | null;
  /** Runs right after showModal(), while the content is rendered but before anything paints. */
  onShown?: () => void;
}

export interface MorphDialog {
  open(options?: MorphOpenOptions): Promise<void>;
  close(options?: { restoreFocus?: boolean }): Promise<void>;
  readonly isOpen: boolean;
}

const inViewport = (r: DOMRect) =>
  r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth;

const radiusOf = (el: Element) => getComputedStyle(el).borderTopLeftRadius;

export function createMorphDialog(dialog: HTMLDialogElement, hooks: { onClosed?: () => void } = {}): MorphDialog {
  const panel = dialog.querySelector<HTMLElement>('.morph__panel')!;
  const content = dialog.querySelector<HTMLElement>('.morph__content')!;
  const backdrop = dialog.querySelector<HTMLElement>('.morph__backdrop')!;

  let origin: HTMLElement | null = null;
  let returnFocus: HTMLElement | null = null;
  let open = false;
  let busy = false;

  /** Pin the panel to explicit px so its geometry can be tweened. */
  const pin = (rect: DOMRect) => {
    Object.assign(panel.style, {
      translate: 'none',
      right: 'auto',
      bottom: 'auto',
      maxHeight: 'none',
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
    // Content keeps its final size so it scales instead of reflowing.
    Object.assign(content.style, { flex: 'none', width: `${rect.width}px`, height: `${rect.height}px` });
  };

  const unpin = () => {
    panel.removeAttribute('style');
    content.removeAttribute('style');
  };

  async function openDialog({ origin: from = null, returnFocus: focusEl = null, onShown }: MorphOpenOptions = {}) {
    if (open || busy) return;
    busy = true;
    origin = from;
    returnFocus = focusEl ?? from;

    const start = origin?.getBoundingClientRect();
    const startRadius = origin ? radiusOf(origin) : '0px';

    dialog.showModal();
    document.documentElement.classList.add('is-locked');
    open = true;
    onShown?.();

    const end = panel.getBoundingClientRect();
    const endRadius = radiusOf(panel);
    const panelBg = getComputedStyle(panel).backgroundColor;

    if (reduced()) {
      await gsap.fromTo(dialog, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15, clearProps: 'all' });
      busy = false;
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power1.out' }, 0);

    if (origin && start && inViewport(start)) {
      pin(end);
      tl.to(origin, { autoAlpha: 0, duration: 0.2, delay: 0.05 }, 0)
        .fromTo(
          panel,
          { left: start.left, top: start.top, width: start.width, height: start.height, borderRadius: startRadius, backgroundColor: 'rgba(0,0,0,0)' },
          { left: end.left, top: end.top, width: end.width, height: end.height, borderRadius: endRadius, duration: 0.7, ease: 'signature' },
          0,
        )
        .to(panel, { backgroundColor: panelBg, duration: 0.3, ease: 'power1.out' }, 0)
        .fromTo(
          content,
          { scale: start.width / end.width, transformOrigin: '0 0', filter: 'blur(8px)', autoAlpha: 0 },
          { scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'signature' },
          0,
        )
        .to(content, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, 0);
    } else {
      tl.fromTo(panel, { scale: 0.92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0);
    }

    await tl;
    unpin();
    gsap.set([panel, content], { clearProps: 'all' });
    busy = false;
  }

  async function closeDialog({ restoreFocus = true } = {}) {
    if (!open || busy) return;
    busy = true;

    const from = panel.getBoundingClientRect();
    const to = origin?.getBoundingClientRect();

    if (reduced()) {
      await gsap.to(dialog, { autoAlpha: 0, duration: 0.15 });
    } else {
      const tl = gsap.timeline();
      tl.to(backdrop, { autoAlpha: 0, duration: 0.4, ease: 'power1.in' }, 0);

      if (origin && to && inViewport(to)) {
        pin(from);
        tl.to(
          panel,
          { left: to.left, top: to.top, width: to.width, height: to.height, borderRadius: radiusOf(origin), duration: 0.5, ease: 'signature' },
          0,
        )
          .to(panel, { backgroundColor: 'rgba(0,0,0,0)', boxShadow: 'none', duration: 0.2, ease: 'power1.in' }, 0.3)
          .to(content, { scale: to.width / from.width, transformOrigin: '0 0', duration: 0.5, ease: 'signature' }, 0)
          .to(content, { filter: 'blur(32px)', duration: 0.5, ease: 'closeFade' }, 0)
          .to(content, { autoAlpha: 0, duration: 0.3, ease: 'closeFade' }, 0)
          .to(origin, { autoAlpha: 1, duration: 0.3 }, 0.2);
      } else {
        tl.to(panel, { scale: 0.9, autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, 0).to(
          content,
          { filter: 'blur(32px)', duration: 0.35, ease: 'closeFade' },
          0,
        );
        if (origin) gsap.set(origin, { autoAlpha: 1 });
      }
      await tl;
    }

    dialog.close();
    unpin();
    gsap.set([panel, content, backdrop, dialog], { clearProps: 'all' });
    if (origin) gsap.set(origin, { clearProps: 'opacity,visibility' });
    document.documentElement.classList.remove('is-locked');
    open = false;
    busy = false;
    if (restoreFocus) returnFocus?.focus({ preventScroll: true });
    origin = returnFocus = null;
    hooks.onClosed?.();
  }

  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    void closeDialog();
  });
  dialog.addEventListener('click', (e) => {
    if ((e.target as Element).closest('[data-close]')) void closeDialog();
  });

  return {
    open: openDialog,
    close: closeDialog,
    get isOpen() {
      return open;
    },
  };
}
