
import { SiPrisma } from "react-icons/si";

export interface Skill {
  name: string;
  icon: string;      
  color?: string;    
}

export const skills: Skill[] = [
  // Frontend
  {
    name: 'React',
    icon: 'Si/SiReact',
    color: '#61DAFB'
  },
  {
    name: 'React Native',
    icon: 'Si/SiReact',
    color: '#61DAFB'
  },
  {
    name: 'Next.js',
    icon: 'Si/SiNextdotjs',
    color: '#000000'
  },
  {
    name: 'Astro',
    icon: 'Si/SiAstro',
    color: '#FF5C00'
  },
  {
    name: 'Angular',
    icon: 'Si/SiAngular',
    color: '#DD0031'
  },
  {
    name: 'TypeScript',
    icon: 'Si/SiTypescript',
    color: '#3178C6'
  },
  {
    name: 'JavaScript',
    icon: 'Si/SiJavascript',
    color: '#F7DF1E'
  },
  {
    name: 'HTML5',
    icon: 'Si/SiHtml5',
    color: '#E34F26'
  },
  {
    name: 'CSS3',
    icon: 'Si/SiCss3',
    color: '#1572B6'
  },
  {
    name: 'Tailwind CSS',
    icon: 'Si/SiTailwindcss',
    color: '#06B6D4'
  },
  
  // Backend
  {
    name: 'Nest.js',
    icon: 'Si/SiNestjs',
    color: '#E0234E'
  },
  {
    name: 'PHP',
    icon: 'Si/SiPhp',
    color: '#777BB4'
  },
  {
    name: 'Laravel',
    icon: 'Si/SiLaravel',
    color: '#FF2D20'
  },
  
  // Databases
  {
    name: 'Firebase',
    icon: 'Si/SiFirebase',
    color: '#FFCA28'
  },
  {
    name: 'PostgreSQL',
    icon: 'Si/SiPostgresql',
    color: '#4169E1'
  },
  {
    name: 'MySQL',
    icon: 'Si/SiMysql',
    color: '#4479A1'
  },
  {
    name: 'Prisma',
    icon: 'Si/SiPrisma',
    color: '#2D3748'
  },
  
  // Tools & Others
  {
    name: 'Git',
    icon: 'Si/SiGit',
    color: '#F05032'
  },
  {
    name: 'Docker',
    icon: 'Si/SiDocker',
    color: '#2496ED'
  },
  {
    name: 'Figma',
    icon: 'Si/SiFigma',
    color: '#F24E1E'
  },

  // Add more skills below following the same format:
  // {
  //   name: 'Skill Name',
  //   icon: 'Si/SiIconName',
  //   color: '#FF5733'  // Optional
  // },
];
