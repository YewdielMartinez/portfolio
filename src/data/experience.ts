
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
        'Delivered web and mobile products for clients: the MedicLife clinic platform — from the original PHP/MySQL system to its React and TypeScript redesign and landing page — and Foodero, a restaurant app built with React Native, a C#/.NET backend, PostgreSQL and Docker. I gathered requirements with clients, planned and tracked deliveries, and handled CI/CD, automated deployments (Bash, PowerShell) and server administration.'
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
        'Desarrollé productos web y móviles para clientes: la plataforma de clínicas MedicLife —desde el sistema original en PHP/MySQL hasta su rediseño en React y TypeScript y su landing— y Foodero, una app para restaurantes con React Native, backend en C#/.NET, PostgreSQL y Docker. Levanté requisitos con los clientes, planeé y di seguimiento a las entregas, y me encargué de CI/CD, despliegues automatizados (Bash, PowerShell) y administración de servidores.'
    }
  ]
};
