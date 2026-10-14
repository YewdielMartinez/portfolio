import { translations } from '../data/translations';
import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { resolvePath } from '../scripts/i18n-resolve';

const source = { ...translations.en, projects: projects.en, experience: experience.en };

/** Server-side English text for an i18n key; the client swaps it when the language changes. */
export const t = (key: string) => resolvePath(source, key) ?? '';
