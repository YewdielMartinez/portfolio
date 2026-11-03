import { createDialog, createTabs } from '@yewdiel21/motion-kit';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { getLang, type Lang } from '../i18n';
import { translations } from '../../data/translations';

/*
 * CV viewer: [data-cv-open] opens a Motion Kit dialog that renders the PDF
 * page by page with PDF.js (loaded on first open), in the site's language by
 * default; its ES/EN switch changes the document and the download link.
 */

type PdfJs = typeof import('pdfjs-dist');

let pdfjs: Promise<PdfJs> | null = null;
const loadPdfJs = () =>
  (pdfjs ??= Promise.all([import('pdfjs-dist'), import('pdfjs-dist/build/pdf.worker.min.mjs?url')]).then(
    ([lib, worker]) => {
      lib.GlobalWorkerOptions.workerSrc = worker.default;
      return lib;
    },
  ));

const documents = new Map<string, Promise<PDFDocumentProxy>>();
const LANGS: Lang[] = ['es', 'en'];
// Pages never need more than this many CSS pixels of detail.
const MAX_WIDTH = 820;

export function initCvViewer() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-cv-dialog]');
  const body = dialog?.querySelector<HTMLElement>('[data-cv-body]');
  const pages = dialog?.querySelector<HTMLElement>('[data-cv-pages]');
  const status = dialog?.querySelector<HTMLElement>('[data-cv-status]');
  const error = dialog?.querySelector<HTMLElement>('[data-cv-error]');
  const tabs = dialog?.querySelector<HTMLElement>('[data-cv-langs]');
  if (!dialog || !body || !pages || !status || !error || !tabs) return;

  const kit = createDialog(dialog, { triggers: false });
  const finePointer = matchMedia('(pointer: fine)');
  const syncDrag = () => body.toggleAttribute('data-mk-no-drag', finePointer.matches);
  syncDrag();
  finePointer.addEventListener('change', syncDrag);

  let lang: Lang = getLang();
  let rendered = '';
  let renderId = 0;

  const switcher = createTabs(tabs, {
    onSelect: (index) => {
      lang = LANGS[index] ?? lang;
      if (kit.isOpen) void show();
    },
  });

  /** Links follow the CV on screen, which may differ from the site's language. */
  const syncLinks = () => {
    const { file, filename } = translations[lang].cv;
    dialog.querySelectorAll<HTMLAnchorElement>('[data-cv-download], [data-cv-link]').forEach((link) => {
      link.href = file;
      if (link.hasAttribute('download')) link.download = filename;
    });
  };

  async function show() {
    syncLinks();
    const { file, loading, page: pageLabel } = translations[lang].cv;
    const width = Math.min(pages!.clientWidth || MAX_WIDTH, MAX_WIDTH);
    const key = `${file}@${width}`;
    if (key === rendered) return;
    const id = ++renderId;
    error!.hidden = true;
    if (!rendered.startsWith(file)) {
      pages!.replaceChildren();
      status!.textContent = loading;
    }

    try {
      const lib = await loadPdfJs();
      if (!documents.has(file)) documents.set(file, lib.getDocument({ url: file }).promise);
      const pdf = await documents.get(file)!;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      const canvases: HTMLCanvasElement[] = [];
      for (let n = 1; n <= pdf.numPages; n += 1) {
        const page = await pdf.getPage(n);
        const base = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: (width / base.width) * ratio });
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', pageLabel.replace('{n}', String(n)).replace('{total}', String(pdf.numPages)));
        await page.render({ canvas, viewport }).promise;
        if (id !== renderId) return; // a newer render took over
        canvases.push(canvas);
      }
      pages!.replaceChildren(...canvases);
      status!.textContent = '';
      rendered = key;
    } catch (err) {
      if (id !== renderId) return;
      console.error('CV render failed', err);
      documents.delete(file);
      rendered = '';
      pages!.replaceChildren();
      status!.textContent = '';
      error!.hidden = false;
    }
  }

  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element).closest<HTMLElement>('[data-cv-open]');
    if (!trigger || kit.isOpen) return;
    e.preventDefault(); // without JS the trigger is a plain link to the PDF
    kit.open(trigger);
    // The site's language first; selecting a different tab renders through onSelect.
    const next = LANGS.indexOf(getLang());
    if (next !== switcher.index) switcher.select(next);
    else void show();
  });

  // Sharper pages after the dialog changes width (rotation, window resize).
  let resizeTimer = 0;
  addEventListener('resize', () => {
    if (!kit.isOpen) return;
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => void show(), 250);
  });
}
