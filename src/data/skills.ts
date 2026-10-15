export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'data' | 'tools';
  /** Main specialization; everything else is listed as a complement. */
  core?: boolean;
}

export const skills: Skill[] = [
  { name: 'React', category: 'frontend', core: true },
  { name: 'React Native', category: 'frontend', core: true },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Astro', category: 'frontend' },
  { name: 'Angular', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'GSAP', category: 'frontend' },

  { name: 'Nest.js', category: 'backend' },
  { name: '.NET', category: 'backend', core: true },
  { name: 'C#', category: 'backend' },
  { name: 'PHP', category: 'backend', core: true },
  { name: 'Laravel', category: 'backend' },

  { name: 'Supabase', category: 'data' },
  { name: 'Firebase', category: 'data' },
  { name: 'PostgreSQL', category: 'data' },
  { name: 'MySQL', category: 'data' },
  { name: 'Prisma', category: 'data' },

  { name: 'Docker', category: 'tools' },
  { name: 'AWS', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Figma', category: 'tools' },
];
