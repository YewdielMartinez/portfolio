import { createToaster, type ToasterInstance } from '@yewdiel21/motion-kit';
import { getLang } from '../i18n';
import { translations } from '../../data/translations';

/** One Motion Kit toaster for the page (copy confirmations, contact form status). */
export function initToaster() {
  const host = document.createElement('div');
  host.className = 'mk-toaster';
  document.body.append(host);

  let toaster: ToasterInstance | null = null;
  const mount = () => {
    toaster?.destroy();
    toaster = createToaster(host, { labels: { dismiss: translations[getLang()].dialog.close } });
  };
  mount();
  addEventListener('languagechange', mount);
}
