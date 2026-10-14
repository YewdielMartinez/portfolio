import { translations } from '../../data/translations';
import { getLang } from '../i18n';

/** EmailJS contact form with inline, announced status. */
export function initContactForm() {
  const section = document.getElementById('contact');
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const button = form?.querySelector<HTMLButtonElement>('[data-send]');
  const label = button?.querySelector<HTMLElement>('[data-i18n]');
  const status = form?.querySelector<HTMLElement>('[data-form-status]');
  if (!section || !form || !button || !label || !status) return;

  const { publicKey = '', templateId = '', serviceId = '' } = section.dataset;
  let timer = 0;

  const show = (message: string) => {
    status.textContent = message;
    clearTimeout(timer);
    timer = window.setTimeout(() => (status.textContent = ''), 6000);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const copy = translations[getLang()].contact;
    if (!publicKey || !serviceId || !templateId) {
      show(copy.error);
      return;
    }

    button.disabled = true;
    label.textContent = copy.sending;
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      show(copy.success);
    } catch (error) {
      console.error('Contact form failed', error);
      show(copy.error);
    } finally {
      button.disabled = false;
      label.textContent = translations[getLang()].contact.send;
    }
  });
}
