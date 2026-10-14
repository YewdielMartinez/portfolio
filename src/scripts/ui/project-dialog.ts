import { createMorphDialog } from '../motion/morph-dialog';
import { revealWords, trackWords, untrackWords } from '../motion/words';
import { applyI18n, getLang } from '../i18n';
import { translations } from '../../data/translations';

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

  // Install snippets (e.g. `npm i loon-core`)
  content.addEventListener('click', async (e) => {
    const button = (e.target as Element).closest<HTMLElement>('[data-copy]');
    if (!button) return;
    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? '');
      button.textContent = translations[getLang()].dialog.copied;
      setTimeout(() => applyI18n(button), 1600);
    } catch {
      /* clipboard blocked: the command stays visible to copy by hand */
    }
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
