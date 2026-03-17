// Configuración de Proyectos
// Agrega o modifica tus proyectos aquí

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  gridSize: "small" | "medium" | "large" | "wide";
  detailedDescription?: string;
  features?: string[];
  github?: string;
  demo?: string;
  year?: string;
  role?: string;
  video?: string;
}

export interface Projects {
  en: Project[];
  es: Project[];
}

export const projects: Projects = {
  en: [
    {
      title: "Watchlt",
      description:
        "Movie comparison app inspired by Apple liquid glass design. Built with React, Firebase, Tailwind, and deployed on Vercel.",
      image: "/projects/Watchlt.png",
      tags: ["React", "Firebase", "Tailwind", "Vercel"],
      link: "https://watchlt.vercel.app/dashboard",
      gridSize: "wide",
      detailedDescription:
        "Watchlt is a movie comparison web app that allows users to explore, rate, and compare films in an elegant interface inspired by Apple’s “liquid glass” aesthetic. Developed as a school project, it focuses on design detail and real-time Firebase interactions.",
      features: [
        "Movie comparison system",
        "Dynamic search and filter",
        "Firebase authentication and database",
        "Responsive liquid-glass UI",
        "Deployed on Vercel for global performance",
      ],
      github: "https://github.com/YewdielMartinez/watchlt",
      year: "2025",
      role: "Frontend Developer",
    },
    {
      title: "PuntoZeroweb Mobile App",
      description:
        "Private React Native app for route-based sales, focused on real-time product distribution.",
      image: "/projects/Ventaenruta.png",
      tags: ["React Native", "Tailwind", "Mobile"],
      link: "#",
      gridSize: "medium",
      detailedDescription:
        "A private mobile application for sales on the go, developed for PuntoZeroweb. The app helps manage product routes, clients, and transactions efficiently. The repository is private for confidentiality reasons.",
      features: [
        "Offline-first mobile experience",
        "Route and client tracking",
        "Real-time updates",
        "Responsive mobile UI with Tailwind",
      ],
      year: "2025",
      role: "Mobile Developer",
    },
    {
      title: "EcoSend",
      description:
        "24-hour hackathon project that optimizes package delivery logistics with a focus on sustainability.",
      image: "/projects/EcoSend.png",
      tags: ["React", "Firebase", "Tailwind", "Hackathon"],
      link: "https://ecoflow-losmochis.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "Built in 24 hours during a hackathon, EcoSend is a full web solution for managing internal and external delivery logistics with environmental awareness. It connects businesses with drivers optimizing routes to reduce CO₂ emissions.",
      features: [
        "Full delivery management system",
        "Eco-friendly route optimization",
        "Driver and company dashboards",
        "Real-time Firebase synchronization",
        "Responsive UI for web and mobile",
      ],
      github: "https://github.com/YewdielMartinez/ecoflow-losmochis",
      demo: "https://ecoflow-losmochis.vercel.app/",
      year: "2025",
      role: "Frontend Developer",
    },
    {
      title: "Medic Life",
      description:
        "Clinic management system for doctors, patients, and appointments.",
      image: "/projects/MedicLife.png",
      tags: ["PHP", "MySQL", "HTML", "CSS"],
      link: "#",
      gridSize: "small",
      detailedDescription:
        "Medic Life is a complete system for managing clinics. It includes modules for doctors, patients, appointments, and administrative tasks — designed to optimize clinical workflows and record management.",
      features: [
        "Doctor and patient management",
        "Appointment scheduling system",
        "Consultation records and reports",
        "User roles and permissions",
        "Database-driven architecture (MySQL)",
      ],
      github: "https://github.com/PricedTuna/newMedicLife",
      year: "2024",
      role: "Full-Stack Developer",
    },
    {
      title: "TRON",
      description:
        "Landing page for a new data compression format, featuring a sleek and futuristic design.",
      image: "/projects/TRON.png",
      tags: ["HTML", "CSS", "JavaScript", "Vercel"],
      link: "https://tron-landing-page.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "TRON is a landing page built to present a new data compression format. It features a futuristic visual design crafted to communicate the technology's speed and efficiency, deployed on Vercel for fast global delivery.",
      features: [
        "Futuristic and immersive UI design",
        "Responsive layout for all devices",
        "Fast load times via Vercel CDN",
        "Clear product value proposition",
      ],
      demo: "https://tron-landing-page.vercel.app/",
      year: "2025",
      role: "Frontend Developer",
    },
    {
      title: "NewMedicLife",
      description:
        "Complete redesign of Medic Life — modernized UI and improved user experience for clinic management.",
      image: "/projects/NewMedicLife.png",
      tags: ["React", "TypeScript", "Tailwind", "MySQL"],
      link: "#",
      gridSize: "medium",
      detailedDescription:
        "NewMedicLife is a full redesign of the original Medic Life clinic management system. The project focuses on a modern, intuitive interface that improves the experience for doctors, receptionists, and administrators while keeping all the core features of the original system.",
      features: [
        "Modernized clinic dashboard",
        "Improved appointment scheduling UX",
        "Responsive design for desktop and tablet",
        "Enhanced patient and doctor management",
        "Clean and accessible UI",
      ],
      github: "https://github.com/PricedTuna/newMedicLife",
      year: "2025",
      role: "Full-Stack Developer",
      video: "https://res.cloudinary.com/dp8yf8nxi/video/upload/q_auto,f_mp4/v1773789455/2026-03-17_16-04-07_qrui2b.mp4",
    },
  ],

  es: [
    {
      title: "Watchlt",
      description:
        'Aplicación de comparación de películas inspirada en el diseño "liquid glass" de Apple. Desarrollada con React, Firebase, Tailwind y desplegada en Vercel.',
      image: "/projects/Watchlt.png",
      tags: ["React", "Firebase", "Tailwind", "Vercel"],
      link: "https://watchlt.vercel.app/dashboard",
      gridSize: "wide",
      detailedDescription:
        "Watchlt es una aplicación web para comparar películas que permite explorar, calificar y comparar filmes dentro de una interfaz moderna inspirada en el estilo “liquid glass” de Apple. Proyecto académico enfocado en diseño y funcionalidad en tiempo real con Firebase.",
      features: [
        "Comparador de películas",
        "Búsqueda y filtrado dinámico",
        "Autenticación y base de datos con Firebase",
        "Interfaz responsiva con diseño “liquid glass”",
        "Despliegue optimizado en Vercel",
      ],
      github: "https://github.com/YewdielMartinez/watchlt",
      year: "2024",
      role: "Desarrollador Frontend",
    },
    {
      title: "Aplicación Móvil PuntoZeroweb",
      description:
        "App móvil privada para ventas en ruta desarrollada con React Native y Tailwind.",
      image: "/projects/Ventaenruta.png",
      tags: ["React Native", "Tailwind", "Mobile"],
      link: "#",
      gridSize: "medium",
      detailedDescription:
        "Aplicación móvil privada de PuntoZeroweb para gestionar ventas y rutas de distribución. Incluye seguimiento de clientes y productos. El repositorio no está disponible públicamente por confidencialidad.",
      features: [
        "Gestión de rutas y clientes",
        "Actualización en tiempo real",
        "Interfaz moderna con Tailwind",
        "Optimizada para uso offline",
      ],
      year: "2025",
      role: "Desarrollador Móvil",
    },
    {
      title: "EcoSend",
      description:
        "Proyecto desarrollado en un hackatón de 24 h que optimiza la logística de envíos con enfoque sostenible.",
      image: "/projects/EcoSend.png",
      tags: ["React", "Firebase", "Tailwind", "Hackathon"],
      link: "https://ecoflow-losmochis.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "Construido en un hackatón de 24 horas, EcoSend resuelve la gestión de envíos y repartos, promoviendo rutas eficientes y sostenibles. Permite a negocios administrar repartidores internos o conectar con externos para reducir emisiones.",
      features: [
        "Gestión completa de envíos y repartidores",
        "Optimización ecológica de rutas",
        "Panel de control para empresas y repartidores",
        "Sincronización en tiempo real con Firebase",
        "Interfaz responsiva y moderna",
      ],
      github: "https://github.com/YewdielMartinez/ecoflow-losmochis",
      demo: "https://ecoflow-losmochis.vercel.app/",
      year: "2024",
      role: "Desarrollador Frontend",
    },
    {
      title: "Medic Life",
      description:
        "Sistema de gestión de consultorios médicos con control de pacientes, citas y médicos.",
      image: "/projects/MedicLife.png",
      tags: ["PHP", "MySQL", "HTML", "CSS"],
      link: "https://github.com/PricedTuna/newMedicLife",
      gridSize: "small",
      detailedDescription:
        "Medic Life es un sistema integral de gestión para consultorios médicos. Permite administrar doctores, pacientes, citas y consultas, agilizando la gestión administrativa y clínica.",
      features: [
        "Gestión de médicos y pacientes",
        "Agenda de citas médicas",
        "Historial de consultas",
        "Roles de usuario y permisos",
        "Interfaz clara y funcional",
      ],
      github: "https://github.com/PricedTuna/newMedicLife",
      year: "2024",
      role: "Desarrollador Full-Stack",
    },
    {
      title: "TRON",
      description:
        "Landing page para un nuevo formato de compresión de datos, con un diseño futurista e inmersivo.",
      image: "/projects/TRON.png",
      tags: ["HTML", "CSS", "JavaScript", "Vercel"],
      link: "https://tron-landing-page.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "TRON es una landing page creada para presentar un nuevo formato de compresión de datos. Su diseño futurista comunica visualmente la velocidad y eficiencia de la tecnología. Está desplegada en Vercel para entrega global ultrarrápida.",
      features: [
        "Diseño UI futurista e inmersivo",
        "Maquetado completamente responsivo",
        "Carga rápida con Vercel CDN",
        "Propuesta de valor clara del producto",
      ],
      demo: "https://tron-landing-page.vercel.app/",
      year: "2025",
      role: "Desarrollador Frontend",
    },
    {
      title: "NewMedicLife",
      description:
        "Rediseño completo de Medic Life — interfaz modernizada y mejor experiencia de usuario para clínicas.",
      image: "/projects/NewMedicLife.png",
      tags: ["React", "TypeScript", "Tailwind", "MySQL"],
      link: "#",
      gridSize: "medium",
      detailedDescription:
        "NewMedicLife es un rediseño completo del sistema original Medic Life. El proyecto se centra en una interfaz moderna e intuitiva que mejora la experiencia de médicos, recepcionistas y administradores, manteniendo todas las funciones esenciales del sistema original.",
      features: [
        "Dashboard clínico modernizado",
        "UX mejorada para agendar citas",
        "Diseño responsivo para escritorio y tablet",
        "Gestión mejorada de pacientes y médicos",
        "Interfaz limpia y accesible",
      ],
      github: "https://github.com/PricedTuna/newMedicLife",
      year: "2025",
      role: "Desarrollador Full-Stack",
      video: "https://res.cloudinary.com/dp8yf8nxi/video/upload/q_auto,f_mp4/v1773789455/2026-03-17_16-04-07_qrui2b.mp4",
    },
  ],
};
