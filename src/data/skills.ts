export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'data' | 'ai' | 'tools';
  /** Main specialization; everything else is listed as a complement. */
  core?: boolean;
}

export const skills: Skill[] = [
  { name: 'C# / .NET', category: 'backend', core: true },
  { name: 'React', category: 'frontend', core: true },
  { name: 'Angular', category: 'frontend', core: true },
  { name: 'SQL Server', category: 'data', core: true },
  { name: 'Python', category: 'backend', core: true },
  { name: 'LLMs & RAG', category: 'ai', core: true },

  { name: 'ASP.NET Core', category: 'backend' },
  { name: 'Azure DevOps', category: 'tools' },
  { name: 'LangChain', category: 'ai' },
  { name: 'LlamaIndex', category: 'ai' },
  { name: 'pgvector', category: 'ai' },
  { name: 'Qdrant', category: 'ai' },
  { name: 'Chroma', category: 'ai' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'React Native', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Astro', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'GSAP', category: 'frontend' },

  { name: 'PHP', category: 'backend' },
  { name: 'Laravel', category: 'backend' },
  { name: 'Nest.js', category: 'backend' },

  { name: 'PostgreSQL', category: 'data' },
  { name: 'MySQL', category: 'data' },
  { name: 'Supabase', category: 'data' },
  { name: 'Firebase', category: 'data' },
  { name: 'Prisma', category: 'data' },

  { name: 'Docker', category: 'tools' },
  { name: 'AWS', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Figma', category: 'tools' },
];
