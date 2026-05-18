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
    // 01 — Kayro
    {
      title: "Kayro",
      description:
        "An open-source workspace combining Notion and Obsidian. Create notes, markdown, canvas, kanban, and calendar with bidirectional linking for collaborative work. (In Progress)",
      image: "/projects/Home Kayro.png",
      tags: ["Open Source", "Workspace", "Markdown", "In Progress"],
      link: "https://kayro-omega.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "Kayro is an open-source collaborative workspace that merges the best of Notion and Obsidian. It allows you to create notes, write in Markdown, build interactive canvases, insert files, and organize with Kanban boards and calendars. Everything is interconnected using bidirectional linking like Obsidian, providing a powerful, relation-driven environment focused on seamless collaborative work. Currently in development.",
      features: [
        "Markdown-based note taking",
        "Interactive canvas and file attachments",
        "Kanban boards and calendar integration",
        "Bidirectional linking between notes",
        "Open-source and collaborative-focused",
      ],
      demo: "https://kayro-omega.vercel.app/",
      year: "2026",
      role: "Full-Stack Developer",
    },
    // 02 — MedicLife Landing
    {
      title: "MedicLife Landing",
      description:
        "Marketing landing page for the NewMedicLife clinic system. UI/UX focused with GSAP animations, React, and Tailwind.",
      image: "/projects/MEDICLIFELANDING.png",
      tags: ["React", "Tailwind", "GSAP", "UI/UX"],
      link: "https://mediclife.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "A polished marketing landing page built for the NewMedicLife clinic management system. The project focused heavily on UI/UX design principles — clear hierarchy, progressive disclosure, and smooth GSAP-driven scroll animations — to communicate the product's value to medical professionals and clinic administrators.",
      features: [
        "GSAP scroll-triggered entrance animations",
        "Responsive layout optimized for desktop and mobile",
        "UI/UX-first design with clear visual hierarchy",
        "Feature sections, pricing, and CTA blocks",
        "Deployed on Vercel for fast global delivery",
      ],
      demo: "https://mediclife.vercel.app/",
      year: "2025",
      role: "Frontend Developer",
    },
    // 02 — NewMedicLife
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
    // 03 — TRON
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
    // 04 — Watchlt
    {
      title: "Watchlt",
      description:
        "Movie comparison app inspired by Apple liquid glass design. Built with React, Firebase, Tailwind, and deployed on Vercel.",
      image: "/projects/Watchlt.png",
      tags: ["React", "Firebase", "Tailwind", "Vercel"],
      link: "https://watchlt.vercel.app/dashboard",
      gridSize: "wide",
      detailedDescription:
        "Watchlt is a movie comparison web app that allows users to explore, rate, and compare films in an elegant interface inspired by Apple's liquid glass aesthetic. Developed as a school project, it focuses on design detail and real-time Firebase interactions.",
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
    // 05 — EcoSend
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
    // 06 — Medic Life
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
    // 07 — PuntoZeroweb Mobile App
    {
      title: "PuntoZeroweb App",
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
    // 08 — Foodapp
    {
      title: "Foodapp",
      description:
        "React Native app for restaurants: table management, home delivery, product catalog, reports, cash drawer, Mercado Pago subscriptions, and printer integration.",
      image: "/projects/FOODAPP.png",
      tags: ["React Native", "C#", "PostgreSQL", "Docker", "Tailwind CSS"],
      link: "#",
      gridSize: "wide",
      detailedDescription:
        "Foodapp is a full-featured restaurant management app built with React Native. I contributed to the UI implementation based on an existing design. The app covers the full operational lifecycle of a restaurant: table management, in-house and delivery sales, product and add-on registration, end-of-day cash drawer closing, subscription billing via Mercado Pago, user role management, and thermal printer integration for receipts.",
      features: [
        "Table management and order tracking",
        "Home delivery and in-house sales flow",
        "Product, complement, and add-on registration",
        "Sales reports and cash drawer closing",
        "Subscription sales with Mercado Pago integration",
        "User management with role-based access",
        "Thermal printer integration for receipts",
      ],
      year: "2024",
      role: "Mobile Developer (UI Implementation)",
    },
    // 09 — PuntoZeroweb POS
    {
      title: "PuntoZeroweb POS",
      description:
        "Full-featured web point-of-sale system built at PuntoZeroweb. Handles sales, inventory, and reporting across multiple branches.",
      image: "",
      tags: ["PHP", "MySQL", "Docker", "HTML", "CSS"],
      link: "#",
      gridSize: "wide",
      detailedDescription:
        "A comprehensive web-based point-of-sale system developed internally at PuntoZeroweb. Built with PHP and MySQL for the backend and containerized with Docker for consistent deployment across environments. Handles real-time sales transactions, inventory tracking, and reporting across multiple store branches.",
      features: [
        "Real-time sales and transaction processing",
        "Inventory tracking with low-stock alerts",
        "Multi-branch reporting and analytics dashboard",
        "Docker-containerized for consistent deployments",
        "Role-based access for cashiers and administrators",
      ],
      year: "2024",
      role: "Full-Stack Developer",
    },
    // 09 — Hotel Tool Tracker
    {
      title: "Hotel Tool Tracker",
      description:
        "Internal system for hotels to register check-ins and check-outs of tools and equipment across departments.",
      image: "",
      tags: ["React", "C#", "Tailwind CSS"],
      link: "#",
      gridSize: "medium",
      detailedDescription:
        "An internal management system developed for hotel operations, tracking the check-in and check-out of tools and equipment across departments. Built with a React frontend, a C# backend, and a clean Tailwind CSS interface designed for daily use by hotel staff.",
      features: [
        "Tool and equipment check-in / check-out tracking",
        "Department-level inventory overview",
        "Staff assignment and activity log",
        "Search and filter by tool, department, or date",
        "Fast, clean interface optimized for daily use",
      ],
      year: "2024",
      role: "Full-Stack Developer",
    },
    // 10 — PuntoZeroweb Landing
    {
      title: "PuntoZeroweb Landing",
      description:
        "Marketing landing page for the PuntoZeroweb POS system, presenting its features to potential clients.",
      image: "",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "#",
      gridSize: "small",
      detailedDescription:
        "A marketing landing page designed and built for the PuntoZeroweb point-of-sale system. The goal was to communicate the system's value to potential business clients through a professional, responsive layout with clear feature sections and a strong call-to-action flow.",
      features: [
        "Feature and benefit sections with visual hierarchy",
        "Responsive layout for all screen sizes",
        "Optimized for fast static delivery",
        "Clear call-to-action flow for lead generation",
      ],
      year: "2024",
      role: "Frontend Developer",
    },
    // 11 — Online Billing Platform
    {
      title: "Online Billing",
      description:
        "Collaborative online invoicing platform — contributed frontend development and UI implementation for digital invoice management.",
      image: "",
      tags: ["React", "TypeScript", "MySQL"],
      link: "#",
      gridSize: "medium",
      detailedDescription:
        "A collaborative project for an online billing and invoicing platform. I contributed to the frontend development and UI implementation, building the interface for generating, managing, and tracking invoices digitally for businesses.",
      features: [
        "Digital invoice generation and management",
        "Client and product catalog",
        "Invoice status tracking and history",
        "Clean and intuitive billing interface",
      ],
      year: "2024",
      role: "Frontend Developer (Collaborative)",
    },
  ],

  es: [
    // 01 — Kayro
    {
      title: "Kayro",
      description:
        "Un espacio de trabajo open-source que combina Notion y Obsidian. Permite crear notas, markdown, canvas, kanban y calendarios enfocados en el trabajo colaborativo. (En proceso)",
      image: "/projects/Home Kayro.png",
      tags: ["Open Source", "Workspace", "Markdown", "En proceso"],
      link: "https://kayro-omega.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "Kayro es un espacio de trabajo colaborativo open-source que combina lo mejor de Notion y Obsidian. Permite crear notas, escribir en markdown, usar canvas interactivos, insertar archivos y organizar tareas con tableros Kanban y calendarios. Todo está interconectado mediante relaciones bidireccionales tipo Obsidian, ofreciendo un entorno potente enfocado en el trabajo colaborativo. Actualmente en desarrollo.",
      features: [
        "Creación de notas con soporte Markdown",
        "Canvas interactivos e inserción de archivos",
        "Integración de tableros Kanban y calendario",
        "Relaciones bidireccionales entre notas",
        "Enfoque colaborativo y de código abierto",
      ],
      demo: "https://kayro-omega.vercel.app/",
      year: "2026",
      role: "Desarrollador Full-Stack",
    },
    // 02 — MedicLife Landing
    {
      title: "MedicLife Landing",
      description:
        "Landing page de marketing para el sistema de clínicas NewMedicLife. Enfocada en UI/UX con animaciones GSAP, React y Tailwind.",
      image: "/projects/MEDICLIFELANDING.png",
      tags: ["React", "Tailwind", "GSAP", "UI/UX"],
      link: "https://mediclife.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "Landing page de marketing construida para el sistema de gestión de clínicas NewMedicLife. El proyecto se enfocó en principios de UI/UX — jerarquía visual clara, divulgación progresiva y animaciones fluidas con GSAP — para comunicar el valor del producto a profesionales médicos y administradores de clínicas.",
      features: [
        "Animaciones de entrada con GSAP y ScrollTrigger",
        "Diseño responsivo para escritorio y móvil",
        "Diseño UI/UX con jerarquía visual clara",
        "Secciones de funcionalidades, precios y llamadas a la acción",
        "Desplegada en Vercel para entrega global rápida",
      ],
      demo: "https://mediclife.vercel.app/",
      year: "2025",
      role: "Desarrollador Frontend",
    },
    // 02 — NewMedicLife
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
    // 03 — TRON
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
    // 04 — Watchlt
    {
      title: "Watchlt",
      description:
        'Aplicación de comparación de películas inspirada en el diseño "liquid glass" de Apple. Desarrollada con React, Firebase, Tailwind y desplegada en Vercel.',
      image: "/projects/Watchlt.png",
      tags: ["React", "Firebase", "Tailwind", "Vercel"],
      link: "https://watchlt.vercel.app/dashboard",
      gridSize: "wide",
      detailedDescription:
        "Watchlt es una aplicación web para comparar películas que permite explorar, calificar y comparar filmes dentro de una interfaz moderna inspirada en el estilo liquid glass de Apple. Proyecto académico enfocado en diseño y funcionalidad en tiempo real con Firebase.",
      features: [
        "Comparador de películas",
        "Búsqueda y filtrado dinámico",
        "Autenticación y base de datos con Firebase",
        "Interfaz responsiva con diseño liquid glass",
        "Despliegue optimizado en Vercel",
      ],
      github: "https://github.com/YewdielMartinez/watchlt",
      year: "2024",
      role: "Desarrollador Frontend",
    },
    // 05 — EcoSend
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
    // 06 — Medic Life
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
    // 07 — PuntoZeroweb App
    {
      title: "PuntoZeroweb App",
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
    // 08 — Foodapp
    {
      title: "Foodapp",
      description:
        "App de gestión para restaurantes: mesas, domicilios, catálogo de productos, reportes, corte de caja, suscripciones con Mercado Pago e impresora.",
      image: "/projects/FOODAPP.png",
      tags: ["React Native", "C#", "PostgreSQL", "Docker", "Tailwind CSS"],
      link: "#",
      gridSize: "wide",
      detailedDescription:
        "Foodapp es una app completa de gestión para restaurantes construida con React Native. Contribuí en la implementación del diseño. Cubre el ciclo operativo completo: manejo de mesas, ventas en local y a domicilio, registro de productos, complementos y adicionales, corte de caja, facturación de suscripciones con Mercado Pago, gestión de usuarios por rol e integración con impresora térmica para recibos.",
      features: [
        "Manejo de mesas y seguimiento de pedidos",
        "Flujo de ventas en local y a domicilio",
        "Registro de productos, complementos y adicionales",
        "Reportes de ventas y corte de caja",
        "Venta de suscripciones con Mercado Pago",
        "Gestión de usuarios con control de acceso por rol",
        "Integración con impresora térmica para recibos",
      ],
      year: "2024",
      role: "Desarrollador Móvil (Implementación UI)",
    },
    // 09 — PuntoZeroweb POS
    {
      title: "PuntoZeroweb POS",
      description:
        "Sistema de punto de venta web desarrollado en PuntoZeroweb. Maneja ventas, inventario y reportes en múltiples sucursales.",
      image: "",
      tags: ["PHP", "MySQL", "Docker", "HTML", "CSS"],
      link: "#",
      gridSize: "wide",
      detailedDescription:
        "Sistema integral de punto de venta web desarrollado internamente en PuntoZeroweb. Construido con PHP y MySQL en el backend y contenerizado con Docker para despliegues consistentes. Gestiona transacciones de venta en tiempo real, control de inventario y reportes por sucursal.",
      features: [
        "Procesamiento de ventas y transacciones en tiempo real",
        "Control de inventario con alertas de stock bajo",
        "Panel de reportes por sucursal",
        "Contenerizado con Docker para despliegues uniformes",
        "Acceso por roles: cajeros y administradores",
      ],
      year: "2024",
      role: "Desarrollador Full-Stack",
    },
    // 09 — Hotel Tool Tracker
    {
      title: "Hotel Tool Tracker",
      description:
        "Sistema interno para hoteles que registra entradas y salidas de herramientas y equipos por departamento.",
      image: "",
      tags: ["React", "C#", "Tailwind CSS"],
      link: "#",
      gridSize: "medium",
      detailedDescription:
        "Sistema de gestión interna desarrollado para operaciones hoteleras, que permite registrar la entrada y salida de herramientas y equipos entre departamentos. Construido con React en el frontend, C# en el backend y una interfaz limpia en Tailwind CSS optimizada para el uso diario del personal.",
      features: [
        "Registro de entrada y salida de herramientas por departamento",
        "Vista general del inventario por área",
        "Bitácora de asignaciones y actividad del personal",
        "Búsqueda y filtrado por herramienta, departamento o fecha",
        "Interfaz rápida y clara para uso diario",
      ],
      year: "2024",
      role: "Desarrollador Full-Stack",
    },
    // 10 — PuntoZeroweb Landing
    {
      title: "PuntoZeroweb Landing",
      description:
        "Landing page de marketing para el sistema POS de PuntoZeroweb, presentando sus funcionalidades a clientes potenciales.",
      image: "",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "#",
      gridSize: "small",
      detailedDescription:
        "Landing page de marketing diseñada y desarrollada para el sistema de punto de venta de PuntoZeroweb. El objetivo fue comunicar el valor del sistema a clientes empresariales potenciales mediante un diseño profesional y responsivo con secciones de características y un flujo de llamada a la acción claro.",
      features: [
        "Secciones de funcionalidades y beneficios con jerarquía visual",
        "Diseño responsivo para todos los dispositivos",
        "Optimizada para carga rápida",
        "Flujo de llamada a la acción para captación de clientes",
      ],
      year: "2024",
      role: "Desarrollador Frontend",
    },
    // 11 — Online Billing Platform
    {
      title: "Facturación en Línea",
      description:
        "Plataforma colaborativa de facturación online — aporté en el desarrollo frontend e implementación de la interfaz para gestión de facturas digitales.",
      image: "",
      tags: ["React", "TypeScript", "MySQL"],
      link: "#",
      gridSize: "medium",
      detailedDescription:
        "Proyecto colaborativo de una plataforma de facturación en línea. Contribuí en el desarrollo frontend e implementación de la interfaz, construyendo el sistema para generar, gestionar y dar seguimiento a facturas digitales para empresas.",
      features: [
        "Generación y gestión de facturas digitales",
        "Catálogo de clientes y productos",
        "Seguimiento del estado de facturas e historial",
        "Interfaz de facturación limpia e intuitiva",
      ],
      year: "2024",
      role: "Desarrollador Frontend (Colaborativo)",
    },
  ],
};
