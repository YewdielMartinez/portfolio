import { confetti, toast } from '@yewdiel21/motion-kit';
import { translations } from '../../data/translations';
import { applyI18n, getLang } from '../i18n';

type Field = HTMLInputElement | HTMLTextAreaElement;

/** EmailJS contact form: Motion Kit fields shake when invalid, the result arrives as a toast. */
export function initContactForm() {
  const section = document.getElementById('contact');
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const button = form?.querySelector<HTMLButtonElement>('[data-send]');
  const label = button?.querySelector<HTMLElement>('[data-i18n]');
  const sent = form?.querySelector<HTMLElement>('[data-sent]');
  if (!section || !form || !button || !label || !sent) return;

  const { publicKey = '', templateId = '', serviceId = '' } = section.dataset;
  const fields = [...form.querySelectorAll<Field>('input, textarea')];
  let sentTimer = 0;

  // The roll label and its copy (data-text) follow the i18n key.
  const labelAs = (key: string) => {
    label.dataset.i18n = key;
    label.dataset.i18nAttr = `data-text:${key}`;
    applyI18n(button);
  };

  /** Mark invalid fields; re-marking replays the kit's vibration. */
  const validate = () => {
    const invalid = fields.filter((field) => !field.checkValidity());
    for (const field of fields) field.removeAttribute('aria-invalid');
    void form.offsetWidth;
    for (const field of invalid) field.setAttribute('aria-invalid', 'true');
    return invalid;
  };

  form.addEventListener('input', (e) => {
    const field = e.target as Field;
    if (field.hasAttribute('aria-invalid') && field.checkValidity()) field.removeAttribute('aria-invalid');
  });

  const celebrate = () => {
    const style = getComputedStyle(document.documentElement);
    const colors = ['--fg', '--muted'].map((name) => style.getPropertyValue(name).trim()).filter(Boolean);
    confetti(button, { colors: [...colors, '#737373'] });
    sent.hidden = true;
    void sent.offsetWidth; // replay the mark's spring
    sent.hidden = false;
    clearTimeout(sentTimer);
    sentTimer = window.setTimeout(() => (sent.hidden = true), 5000);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const copy = translations[getLang()].contact;
    const invalid = validate();
    if (invalid.length) {
      invalid[0].focus();
      toast(copy.invalid, { tone: 'error', origin: button });
      return;
    }
    if (!publicKey || !serviceId || !templateId) {
      toast(copy.error, { tone: 'error', duration: 8000 });
      return;
    }

    button.disabled = true;
    labelAs('contact.sending');
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      toast(translations[getLang()].contact.success, { origin: button });
      celebrate();
    } catch (error) {
      console.error('Contact form failed', error);
      toast(translations[getLang()].contact.error, { tone: 'error', duration: 8000 });
    } finally {
      button.disabled = false;
      labelAs('contact.send');
    }
  });
}
