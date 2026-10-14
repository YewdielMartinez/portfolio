import { translations, type Lang } from '../data/translations';
import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { resolvePath } from './i18n-resolve';

export type { Lang };

/*
 * Markup carries English from the server. Elements opt in with:
 *   data-i18n="path"                     → textContent
 *   data-i18n-attr="attr:path;attr:path" → attributes
 *   data-i18n-date                       → current month and year
 */

export function getLang(): Lang {
  try {
    return localStorage.getItem('language') === 'es' ? 'es' : 'en';
  } catch {
    return 'en';
  }
}

const dictionaries = new Map<Lang, unknown>();

function dictionary(lang: Lang) {
  if (!dictionaries.has(lang)) {
    // `jobs` (not `experience`) so the list does not shadow the section copy in `translations`.
    dictionaries.set(lang, { ...translations[lang], projects: projects[lang], jobs: experience[lang] });
  }
  return dictionaries.get(lang);
}

function select(root: ParentNode, selector: string) {
  const found = [...root.querySelectorAll<HTMLElement>(selector)];
  if (root instanceof HTMLElement && root.matches(selector)) found.unshift(root);
  return found;
}

export function applyI18n(root: ParentNode = document, lang: Lang = getLang()) {
  const dict = dictionary(lang);

  for (const el of select(root, '[data-i18n]')) {
    const value = resolvePath(dict, el.dataset.i18n ?? '');
    if (value !== undefined && el.textContent !== value) el.textContent = value;
  }

  for (const el of select(root, '[data-i18n-attr]')) {
    for (const pair of (el.dataset.i18nAttr ?? '').split(';')) {
      const [attr, path] = pair.split(':').map((part) => part.trim());
      const value = path ? resolvePath(dict, path) : undefined;
      if (attr && value !== undefined) el.setAttribute(attr, value);
    }
  }

  for (const el of select(root, '[data-i18n-date]')) {
    const text = new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(new Date());
    el.textContent = text.charAt(0).toUpperCase() + text.slice(1);
  }
}

export function setLanguage(lang: Lang) {
  dispatchEvent(new CustomEvent('languagewillchange', { detail: { lang } }));
  try {
    localStorage.setItem('language', lang);
  } catch {
    /* storage unavailable: the choice lasts for this page view */
  }
  document.documentElement.lang = lang;
  applyI18n(document, lang);
  dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}
