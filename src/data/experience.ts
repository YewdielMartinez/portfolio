
export interface ExperienceItem {
  year: string;
  company: string;
  position: string;
  description: string;
}

export interface Experience {
  en: ExperienceItem[];
  es: ExperienceItem[];
}

export const experience: Experience = {
  en: [
    {
      year: '2025 - Present',
      company: 'DICOM',
      position: 'Software Developer',
      description:
        "Full-stack development of the company's applications: internal systems with PHP, React and MySQL, a client-facing mobile app in React Native, and backend services in .NET. I also contribute to CI/CD pipelines and server administration, and support project management."
    },
    {
      year: '2022 - 2025',
      company: 'Freelance Projects',
      position: 'Software Developer',
      description:
        'Analyzed, designed, and implemented custom systems to automate inventory control, sales, and reporting. Built web apps using PHP, React, MySQL, HTML, CSS, JavaScript, and Bootstrap, and automated deployments with Bash and PowerShell scripts.'
    }
  ],
  es: [
    {
      year: '2025 - Presente',
      company: 'DICOM',
      position: 'Desarrollador de Software',
      description:
        'Desarrollo full-stack de las aplicaciones de la empresa: sistemas internos con PHP, React y MySQL, una app móvil para clientes con React Native y servicios backend en .NET. También participo en pipelines de CI/CD y en la administración de servidores, y apoyo en la gestión de proyectos.'
    },
    {
      year: '2022 - 2025',
      company: 'Proyectos Freelance',
      position: 'Desarrollador de Software',
      description:
        'Analicé, diseñé e implementé sistemas personalizados para automatizar procesos como control de inventario, ventas y reportes. Desarrollé aplicaciones web con PHP, React, MySQL, HTML, CSS, JavaScript y Bootstrap, y automatizaciones con scripts en Bash y PowerShell.'
    }
  ]
};
