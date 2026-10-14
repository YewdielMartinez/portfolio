import { createMorphDialog } from '../motion/morph-dialog';
import { revealWords, trackWords, untrackWords } from '../motion/words';
import { applyI18n } from '../i18n';

/** Fill the shared project dialog from its <template> and morph it out of the clicked card. */
export function initProjectDialog() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-project-dialog]');
  const content = dialog?.querySelector<HTMLElement>('[data-dialog-content]');
  if (!dialog || !content) return;

  let title: HTMLElement | null = null;
  const morph = createMorphDialog(dialog, {
    onClosed: () => {
      if (title) untrackWords(title);
      title = null;
      content.replaceChildren(); // also stops any playing video
    },
  });

  const templateFor = (index: string) =>
    document.querySelector<HTMLTemplateElement>(`template[data-project-template="${index}"]`);

  async function openProject(trigger: HTMLElement) {
    const template = templateFor(trigger.dataset.project ?? '');
    if (!template || morph.isOpen) return;
    content!.replaceChildren(template.content.cloneNode(true));
    content!.scrollTop = 0;
    applyI18n(content!);
    title = content!.querySelector<HTMLElement>('[data-words]');

    const origin = trigger.querySelector<HTMLElement>('.carousel__media, .pile__stack') ?? trigger;
    await morph.open({
      origin,
      returnFocus: trigger,
      // SplitText needs rendered text (a closed <dialog> is display:none and loses word spaces).
      onShown: () => title && trackWords(title),
    });
    if (title) {
      revealWords(title);
      title.focus({ preventScroll: true });
    }
  }

  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element).closest<HTMLElement>('[data-project]');
    if (trigger) void openProject(trigger);
  });

  // Warm the cover image on first hover so it is decoded before the morph ends.
  const warmed = new Set<string>();
  document.addEventListener('pointerover', (e) => {
    const index = (e.target as Element).closest<HTMLElement>('[data-project]')?.dataset.project;
    if (!index || warmed.has(index)) return;
    warmed.add(index);
    const img = templateFor(index)?.content.querySelector('img');
    if (!img) return;
    const preload = new Image();
    preload.sizes = img.sizes;
    preload.srcset = img.srcset;
    preload.src = img.src;
  });
}
