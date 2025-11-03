
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
        'Designing and implementing internal systems using PHP, Bootstrap, and MySQL. Currently developing an external mobile application with React Native to extend company services and enhance client interaction.'
    },
    {
      year: '2024 - 2025',
      company: 'Freelance Projects',
      position: 'Software Developer',
      description:
        'Analyzed, designed, and implemented custom systems to automate inventory control, sales, and reporting. Built web apps using PHP, MySQL, HTML, CSS, JavaScript, and Bootstrap, and automated deployments with Bash and PowerShell scripts.'
    },
    {
      year: '2022 - 2025',
      company: 'Super Nhoa',
      position: 'Store Manager',
      description:
        'Handled cash and card transactions, managed suppliers and orders, trained new employees, and prepared income and expense reports. Improved daily operations and reporting accuracy by streamlining manual tracking processes.'
    }
  ],
  es: [
    {
      year: '2025 - Presente',
      company: 'DICOM',
      position: 'Desarrollador de Software',
      description:
        'Diseño e implementación de sistemas internos utilizando PHP, Bootstrap y MySQL. Actualmente desarrollo una aplicación móvil externa con React Native para ampliar los servicios de la empresa y optimizar la interacción con los clientes.'
    },
    {
      year: '2024 - 2025',
      company: 'Proyectos Freelance',
      position: 'Desarrollador de Software',
      description:
        'Analicé, diseñé e implementé sistemas personalizados para automatizar procesos como control de inventario, ventas y reportes. Desarrollé aplicaciones web con PHP, MySQL, HTML, CSS, JavaScript y Bootstrap, y automatizaciones con scripts en Bash y PowerShell.'
    },
    {
      year: '2022 - 2025',
      company: 'Super Nhoa',
      position: 'Gerente de Tienda',
      description:
        'Realizaba cobros en efectivo y terminal, gestionaba pedidos y proveedores, capacitaba nuevos empleados y elaboraba reportes de ingresos y gastos. Mejoré la eficiencia operativa optimizando los procesos manuales de control diario.'
    }
  ]
};
