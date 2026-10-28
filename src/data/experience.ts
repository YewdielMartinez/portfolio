
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
        "Full-stack development of the company's business applications: REST APIs and backend services in C#/.NET with SQL Server (stored procedures and query optimization), web interfaces in React and Angular, internal PHP/MySQL systems and a client-facing React Native app. I build generative AI features — LLM integrations and RAG pipelines with embeddings and vector search — and manage repositories and CI/CD pipelines in Azure DevOps, alongside server administration and project management support."
    },
    {
      year: '2022 - 2025',
      company: 'Freelance Projects',
      position: 'Software Developer',
      description:
        'Delivered web and mobile products for clients with C#/.NET backends, SQL Server and PostgreSQL databases and React or Angular frontends — among them the MedicLife clinic platform, from its PHP/MySQL origins to a React and TypeScript redesign, and Foodero, a restaurant app with React Native, C#/.NET, PostgreSQL and Docker. I integrated LLMs and RAG through Python services, gathered requirements with clients, planned and tracked deliveries, and set up CI/CD in Azure DevOps with automated deployments (Bash, PowerShell) and server administration.'
    }
  ],
  es: [
    {
      year: '2025 - Presente',
      company: 'DICOM',
      position: 'Desarrollador de Software',
      description:
        'Desarrollo full-stack de las aplicaciones empresariales de la compañía: APIs REST y servicios backend en C#/.NET con SQL Server (procedimientos almacenados y optimización de consultas), interfaces web en React y Angular, sistemas internos en PHP/MySQL y una app móvil para clientes con React Native. Desarrollo funcionalidades de IA generativa —integración de LLMs y arquitecturas RAG con embeddings y búsqueda vectorial— y gestiono repositorios y pipelines de CI/CD en Azure DevOps, además de administrar servidores y apoyar la gestión de proyectos.'
    },
    {
      year: '2022 - 2025',
      company: 'Proyectos Freelance',
      position: 'Desarrollador de Software',
      description:
        'Desarrollé productos web y móviles para clientes con backends en C#/.NET, bases de datos SQL Server y PostgreSQL y frontends en React o Angular —entre ellos la plataforma de clínicas MedicLife, desde su origen en PHP/MySQL hasta su rediseño en React y TypeScript, y Foodero, una app para restaurantes con React Native, C#/.NET, PostgreSQL y Docker—. Integré LLMs y RAG mediante servicios en Python, levanté requisitos con los clientes, planeé y di seguimiento a las entregas, y configuré CI/CD en Azure DevOps con despliegues automatizados (Bash, PowerShell) y administración de servidores.'
    }
  ]
};
