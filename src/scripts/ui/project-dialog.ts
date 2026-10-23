import { createDialog, toast } from '@yewdiel21/motion-kit';
import { applyI18n, getLang } from '../i18n';
import { translations } from '../../data/translations';
import { createProjectTitleTransition } from '../motion/project-title';

/*
 * Fill the shared project dialog from its <template> and open it with Motion Kit's
 * dialog: the surface grows out of the clicked card while its title travels into
 * the heading. Both return on close; touch screens can drag down to dismiss.
 */
export function initProjectDialog() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-project-dialog]');
  const content = dialog?.querySelector<HTMLElement>('[data-dialog-content]');
  if (!dialog || !content) return;

  const kit = createDialog(dialog, { triggers: false });
  const title = createProjectTitleTransition();

  // With a mouse or trackpad, dragging and pulling the wheel past the top would close
  // a long, scrolling dialog by accident: there it closes with Esc, the backdrop or ✕.
  const finePointer = matchMedia('(pointer: fine)');
  const syncDrag = () => content.toggleAttribute('data-mk-no-drag', finePointer.matches);
  syncDrag();
  finePointer.addEventListener('change', syncDrag);

  const templateFor = (index: string) =>
    document.querySelector<HTMLTemplateElement>(`template[data-project-template="${index}"]`);

  function openProject(trigger: HTMLElement) {
    const template = templateFor(trigger.dataset.project ?? '');
    if (!template || kit.isOpen) return;
    content!.replaceChildren(template.content.cloneNode(true));
    content!.scrollTop = 0;
    applyI18n(content!);
    // Measure the final heading before Motion Kit transforms the surface and body.
    title.reset();
    trigger.setAttribute('data-project-opening', '');
    dialog!.showModal();
    const source = trigger.querySelector<HTMLElement>('[data-project-title]');
    const target = content!.querySelector<HTMLElement>('[data-project-title]');
    if (source && target) title.open(source, target);
    trigger.removeAttribute('data-project-opening');
    kit.open(trigger);
  }

  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element).closest<HTMLElement>('[data-project]');
    if (trigger && !dialog.contains(trigger)) openProject(trigger);
  });

  // The closing copy is built from the markup, which has no scroll position: carry it over.
  dialog.addEventListener('mk:close', () => {
    title.close();
    const y = content.scrollTop;
    const article = content.firstElementChild as HTMLElement | null;
    if (y && article) article.style.translate = `0 ${-y}px`;
  });
  dialog.addEventListener('mk:closed', () => content.replaceChildren()); // also stops any playing video

  // Install snippets (e.g. `npm i loon-core`)
  content.addEventListener('click', async (e) => {
    const button = (e.target as Element).closest<HTMLElement>('[data-copy]');
    if (!button) return;
    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? '');
      toast(translations[getLang()].dialog.copied, { origin: button, duration: 2000 });
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
