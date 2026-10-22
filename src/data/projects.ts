// Configuración de Proyectos
// Agrega o modifica tus proyectos aquí

export interface Project {
  title: string;
  description: string;
  image: string;
  /** Extra screenshots shown in the archive pile; `image` stays the cover. */
  images?: string[];
  tags: string[];
  link: string;
  gridSize: "small" | "medium" | "large" | "wide";
  detailedDescription?: string;
  features?: string[];
  github?: string;
  demo?: string;
  /** npm package page */
  npm?: string;
  /** Install command shown in the project dialog */
  install?: string;
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
    // 00 — Motion Kit
    {
      title: "Motion Kit",
      description:
        "Motion toolkit published on npm: GSAP recipes, accessible components, 19 themes and optional WebGL effects for vanilla, Astro and React.",
      image: "/projects/MotionKit.jpeg",
      tags: ["TypeScript", "GSAP", "React", "Astro", "npm", "WebGL"],
      link: "https://motion-kit-playground.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "Motion Kit is the animation toolkit behind this portfolio, published on npm as @yewdiel21/motion-kit. Every piece is a framework-agnostic GSAP factory that behaves the same in plain HTML and Astro (data-mk attributes + autoInit), in React and Next.js (hooks and components) and as custom elements. It ships 40 recipes — spring cards, a curved inertia carousel, elastic words, a stretching footer, sortable lists, parallax, marquees and GPU effects such as particle text and liquid image blends — plus 10 accessible components (morphing dialogs, menus, toasts, chat, navigation, steps), CSS controls, 19 themes with light, dark and system modes, and a palette generator. A CLI copies any piece into a project as editable code, and a Claude Code skill applies them on request. Every piece has vanilla and React demos in the public playground.",
      features: [
        "40 motion recipes and 10 accessible components (dialog, menu, toast, chat, navigation…)",
        "Same behaviour in vanilla/Astro (data-mk + autoInit), React/Next.js hooks and custom elements",
        "19 themes with 37 colour roles, light/dark/system modes and a palette generator",
        "Optional WebGL effects with HTML fallback: particle text, liquid blend, matcap, film grain",
        "CLI that copies recipes into any project as editable code, plus a Claude Code skill",
        "Respects prefers-reduced-motion; tested with Vitest and screenshot checks at 1440 and 390 px",
      ],
      demo: "https://motion-kit-playground.vercel.app/",
      github: "https://github.com/YewdielMartinez/motion-kit",
      npm: "https://www.npmjs.com/package/@yewdiel21/motion-kit",
      install: "npm install @yewdiel21/motion-kit gsap",
      year: "2026",
      role: "Creator & Maintainer",
    },
    // 01 — Kayro
    {
      title: "Kayro",
      description:
        "An open-source workspace combining Notion and Obsidian. Create notes, markdown, canvas, kanban, and calendar with bidirectional linking for collaborative work. (In Progress)",
      image: "/projects/Kayro.jpeg",
      images: ["/projects/kayrocap.png"],
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
    // 02 — ARES
    {
      title: "ARES",
      description:
        "Intelligent multi-agent system for emergency management: ambulances, fire units and patrols plan routes across a city with BFS, DFS, Dijkstra and A*.",
      image: "/projects/ARES.png",
      images: ["/projects/AresDashboard.png"],
      tags: ["Python", "FastAPI", "React", "TypeScript", "AI", "Motion Kit"],
      link: "https://ares-emergencias.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "ARES is an Artificial Intelligence team project that simulates an emergency operations center. Six rational agents — two ambulances, two fire units and two patrols — move across a 30 × 23 urban grid while a coordinator assigns each incident by specialty, priority with aging and route cost. Routes are computed in Python with BFS, DFS, Dijkstra and A* behind a Strategy pattern, and replanned when streets get blocked. The engine runs on FastAPI with a clean layered architecture, and the React + TypeScript interface is built on Motion Kit: dock navigation, menus, multi-step dialogs, toasts, animated counters and selectable themes. The app compares the four algorithms by steps, cost, expanded nodes and compute time, and exports the results to CSV.",
      features: [
        "Six agents (ambulances, fire units, patrols) dispatched by specialty, priority and route cost",
        "BFS, DFS, Dijkstra and A* in Python behind a Strategy pattern, with dynamic replanning around blocked streets",
        "Live SVG city map with start, pause, step and 1×/2×/4× speeds, plus three reproducible scenarios",
        "Algorithm comparison by steps, cost, expanded nodes and compute time, exported to CSV",
        "React + TypeScript interface built on Motion Kit: dock, menus, step dialogs, toasts and themes",
        "23 Python tests and 14 Playwright browser tests; frontend on Vercel, API on Render with Docker",
      ],
      demo: "https://ares-emergencias.vercel.app/",
      github: "https://github.com/YewdielMartinez/ares-emergencias",
      year: "2026",
      role: "Full-Stack Developer (team project)",
    },
    // 02 — MedicLife Landing
    {
      title: "MedicLife Landing",
      description:
        "Marketing landing page for the NewMedicLife clinic system. UI/UX focused with GSAP animations, React, and Tailwind.",
      image: "/projects/MedicLife.jpeg",
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
      image: "/projects/MedicLife.jpeg",
      images: ["/projects/NewMedicLifecap.png"],
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
    // 03 — LOON (formerly TRON)
    {
      title: "LOON",
      description:
        "LLM-Optimized Object Notation: an open-source npm library that serializes JSON, CSV, XML and YAML into a token-efficient format for LLM pipelines.",
      image: "/projects/LOON.jpeg",
      tags: ["TypeScript", "Node.js", "npm", "LLM"],
      link: "https://www.npmjs.com/package/loon-core",
      gridSize: "wide",
      detailedDescription:
        "LOON (LLM-Optimized Object Notation) is a serialization library published on npm as loon-core. It turns structured data — JSON, CSV, XML, YAML and nested trees — into a compact, losslessly reversible format that cuts the tokens spent in LLM prompts and data pipelines. In a real 1,000-row retrieval session it used 64% fewer tokens than JSON and 47% fewer than TOON. It ships with a documentation site and an interactive playground.",
      features: [
        "Three modes: full for storage and transfer, llm for direct model reading, compact for small objects",
        "Lossless round-trip back to the original JSON",
        "Up to ~78% fewer tokens than JSON",
        "Bridges for JSON, CSV, XML, YAML and nested trees",
        "Prompt-cache friendly sessions and a CLI with --stats",
      ],
      demo: "https://tron-landing-page.vercel.app/",
      npm: "https://www.npmjs.com/package/loon-core",
      install: "npm i loon-core",
      year: "2026",
      role: "Creator & Maintainer",
    },
    // 04 — Watchlt
    {
      title: "Watchlt",
      description:
        "Movie comparison app inspired by Apple liquid glass design. Built with React, Firebase, Tailwind, and deployed on Vercel.",
      image: "/projects/WatchLt.jpeg",
      images: ["/projects/WatchLtCap.png"],
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
      image: "/projects/Ecosend.jpeg",
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
      image: "/projects/MedicLife.jpeg",
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
    // 07 — Venta en Ruta app
    {
      title: "Venta en Ruta app",
      description:
        "Private React Native app for route-based sales, focused on real-time product distribution.",
      image: "/projects/Venta en Ruta.jpeg",
      images: ["/projects/AppMovil.png"],
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
    // 08 — Foodero
    {
      title: "Foodero",
      description:
        "React Native app for restaurants: table management, home delivery, product catalog, reports, cash drawer, Mercado Pago subscriptions, and printer integration.",
      image: "/projects/Foodero.jpeg",
      tags: ["React Native", "C#", "PostgreSQL", "Docker", "Tailwind CSS"],
      link: "#",
      gridSize: "wide",
      detailedDescription:
        "Foodero is a full-featured restaurant management app built with React Native. I contributed to the UI implementation based on an existing design. The app covers the full operational lifecycle of a restaurant: table management, in-house and delivery sales, product and add-on registration, end-of-day cash drawer closing, subscription billing via Mercado Pago, user role management, and thermal printer integration for receipts.",
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
      image: "/projects/PuntoZeroWeb.jpeg",
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
      year: "2025",
      role: "Full-Stack Developer",
    },
    // 10 — PuntoZero Web Hotel
    {
      title: "PuntoZero Web Hotel",
      description:
        "Internal system for hotels to register check-ins and check-outs of tools and equipment across departments.",
      image: "/projects/WebHotel.jpeg",
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
      year: "2025",
      role: "Full-Stack Developer",
    },
    // 10 — PuntoZeroweb Landing
    {
      title: "PuntoZeroweb Landing",
      description:
        "Marketing landing page for the PuntoZeroweb POS system, presenting its features to potential clients.",
      image: "/projects/Puntozerolandingcap.png",
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
      year: "2025",
      role: "Frontend Developer",
    },
    // 12 — PuntoZero Facturación en Línea
    {
      title: "PuntoZero Online Billing",
      description:
        "Collaborative online invoicing platform — contributed frontend development and UI implementation for digital invoice management.",
      image: "/projects/PZWEBFacturacion.jpeg",
      images: ["/projects/Facturacionenlinea1.png", "/projects/Facturacion en linea 2.png"],
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
      year: "2025",
      role: "Frontend Developer (Collaborative)",
    },
  ],

  es: [
    // 00 — Motion Kit
    {
      title: "Motion Kit",
      description:
        "Kit de animación publicado en npm: recetas GSAP, componentes accesibles, 19 temas y efectos WebGL opcionales para vanilla, Astro y React.",
      image: "/projects/MotionKit.jpeg",
      tags: ["TypeScript", "GSAP", "React", "Astro", "npm", "WebGL"],
      link: "https://motion-kit-playground.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "Motion Kit es el kit de animación detrás de este portfolio, publicado en npm como @yewdiel21/motion-kit. Cada pieza es una factory GSAP independiente del framework que se comporta igual en HTML y Astro (atributos data-mk + autoInit), en React y Next.js (hooks y componentes) y como custom elements. Incluye 40 recetas — tarjetas con resorte, carrusel curvo con inercia, palabras elásticas, footer que se estira, listas reordenables, parallax, marquesinas y efectos en GPU como texto de partículas y mezclas líquidas de imágenes —, 10 componentes accesibles (diálogos que nacen del botón, menús, toasts, chat, navegación, pasos), controles CSS, 19 temas con modos claro, oscuro y sistema, y un generador de paletas. Un CLI copia cualquier pieza a un proyecto como código editable y una skill de Claude Code las aplica a pedido. Cada pieza tiene demos vanilla y React en el playground público.",
      features: [
        "40 recetas de movimiento y 10 componentes accesibles (diálogo, menú, toast, chat, navegación…)",
        "Mismo comportamiento en vanilla/Astro (data-mk + autoInit), hooks de React/Next.js y custom elements",
        "19 temas con 37 roles de color, modos claro/oscuro/sistema y generador de paletas",
        "Efectos WebGL opcionales con respaldo HTML: texto de partículas, mezcla líquida, matcap, grano",
        "CLI que copia recetas a cualquier proyecto como código editable, más una skill de Claude Code",
        "Respeta prefers-reduced-motion; probado con Vitest y capturas a 1440 y 390 px",
      ],
      demo: "https://motion-kit-playground.vercel.app/",
      github: "https://github.com/YewdielMartinez/motion-kit",
      npm: "https://www.npmjs.com/package/@yewdiel21/motion-kit",
      install: "npm install @yewdiel21/motion-kit gsap",
      year: "2026",
      role: "Creador y mantenedor",
    },
    // 01 — Kayro
    {
      title: "Kayro",
      description:
        "Un espacio de trabajo open-source que combina Notion y Obsidian. Permite crear notas, markdown, canvas, kanban y calendarios enfocados en el trabajo colaborativo. (En proceso)",
      image: "/projects/Kayro.jpeg",
      images: ["/projects/kayrocap.png"],
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
    // 02 — ARES
    {
      title: "ARES",
      description:
        "Sistema multiagente inteligente para la gestión de emergencias: ambulancias, bomberos y patrullas calculan rutas en una ciudad con BFS, DFS, Dijkstra y A*.",
      image: "/projects/ARES.png",
      images: ["/projects/AresDashboard.png"],
      tags: ["Python", "FastAPI", "React", "TypeScript", "IA", "Motion Kit"],
      link: "https://ares-emergencias.vercel.app/",
      gridSize: "wide",
      detailedDescription:
        "ARES es un proyecto en equipo de Inteligencia Artificial que simula un centro de operaciones de emergencias. Seis agentes racionales — dos ambulancias, dos unidades de bomberos y dos patrullas — se desplazan por una cuadrícula urbana de 30 × 23 mientras un coordinador asigna cada incidente por especialidad, prioridad con envejecimiento y costo de ruta. Las rutas se calculan en Python con BFS, DFS, Dijkstra y A* mediante el patrón Strategy, y se replanifican cuando se bloquean calles. El motor corre sobre FastAPI con una arquitectura por capas, y la interfaz en React + TypeScript está construida con Motion Kit: navegación tipo dock, menús, diálogos por pasos, toasts, contadores animados y temas seleccionables. La aplicación compara los cuatro algoritmos por pasos, costo, nodos expandidos y tiempo de cómputo, y exporta los resultados a CSV.",
      features: [
        "Seis agentes (ambulancias, bomberos, patrullas) asignados por especialidad, prioridad y costo de ruta",
        "BFS, DFS, Dijkstra y A* en Python con patrón Strategy y replanificación ante calles bloqueadas",
        "Mapa urbano SVG en vivo con inicio, pausa, avance por paso y velocidades 1×/2×/4×, más tres escenarios reproducibles",
        "Comparación de algoritmos por pasos, costo, nodos expandidos y tiempo de cómputo, con exportación CSV",
        "Interfaz React + TypeScript construida con Motion Kit: dock, menús, diálogos por pasos, toasts y temas",
        "23 pruebas en Python y 14 pruebas de navegador con Playwright; frontend en Vercel y API en Render con Docker",
      ],
      demo: "https://ares-emergencias.vercel.app/",
      github: "https://github.com/YewdielMartinez/ares-emergencias",
      year: "2026",
      role: "Desarrollador Full-Stack (proyecto en equipo)",
    },
    // 02 — MedicLife Landing
    {
      title: "MedicLife Landing",
      description:
        "Landing page de marketing para el sistema de clínicas NewMedicLife. Enfocada en UI/UX con animaciones GSAP, React y Tailwind.",
      image: "/projects/MedicLife.jpeg",
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
      image: "/projects/MedicLife.jpeg",
      images: ["/projects/NewMedicLifecap.png"],
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
    // 03 — LOON (antes TRON)
    {
      title: "LOON",
      description:
        "LLM-Optimized Object Notation: librería open-source en npm que serializa JSON, CSV, XML y YAML a un formato eficiente en tokens para flujos con LLM.",
      image: "/projects/LOON.jpeg",
      tags: ["TypeScript", "Node.js", "npm", "LLM"],
      link: "https://www.npmjs.com/package/loon-core",
      gridSize: "wide",
      detailedDescription:
        "LOON (LLM-Optimized Object Notation) es una librería de serialización publicada en npm como loon-core. Convierte datos estructurados — JSON, CSV, XML, YAML y árboles anidados — en un formato compacto y reversible sin pérdidas que reduce los tokens en prompts y pipelines de datos con LLM. En una sesión real de 1,000 filas usó 64% menos tokens que JSON y 47% menos que TOON. Incluye un sitio de documentación con playground interactivo.",
      features: [
        "Tres modos: full para almacenamiento y transferencia, llm para lectura directa del modelo, compact para objetos pequeños",
        "Ida y vuelta sin pérdidas al JSON original",
        "Hasta ~78% menos tokens que JSON",
        "Puentes para JSON, CSV, XML, YAML y árboles anidados",
        "Sesiones compatibles con caché de prompts y CLI con --stats",
      ],
      demo: "https://tron-landing-page.vercel.app/",
      npm: "https://www.npmjs.com/package/loon-core",
      install: "npm i loon-core",
      year: "2026",
      role: "Creador y mantenedor",
    },
    // 04 — Watchlt
    {
      title: "Watchlt",
      description:
        'Aplicación de comparación de películas inspirada en el diseño "liquid glass" de Apple. Desarrollada con React, Firebase, Tailwind y desplegada en Vercel.',
      image: "/projects/WatchLt.jpeg",
      images: ["/projects/WatchLtCap.png"],
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
      image: "/projects/Ecosend.jpeg",
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
      image: "/projects/MedicLife.jpeg",
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
    // 07 — Venta en Ruta app
    {
      title: "Venta en Ruta app",
      description:
        "App móvil privada para ventas en ruta desarrollada con React Native y Tailwind.",
      image: "/projects/Venta en Ruta.jpeg",
      images: ["/projects/AppMovil.png"],
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
    // 08 — Foodero
    {
      title: "Foodero",
      description:
        "App de gestión para restaurantes: mesas, domicilios, catálogo de productos, reportes, corte de caja, suscripciones con Mercado Pago e impresora.",
      image: "/projects/Foodero.jpeg",
      tags: ["React Native", "C#", "PostgreSQL", "Docker", "Tailwind CSS"],
      link: "#",
      gridSize: "wide",
      detailedDescription:
        "Foodero es una app completa de gestión para restaurantes construida con React Native. Contribuí en la implementación del diseño. Cubre el ciclo operativo completo: manejo de mesas, ventas en local y a domicilio, registro de productos, complementos y adicionales, corte de caja, facturación de suscripciones con Mercado Pago, gestión de usuarios por rol e integración con impresora térmica para recibos.",
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
      image: "/projects/PuntoZeroWeb.jpeg",
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
      year: "2025",
      role: "Desarrollador Full-Stack",
    },
    // 10 — PuntoZero Web Hotel
    {
      title: "PuntoZero Web Hotel",
      description:
        "Sistema interno para hoteles que registra entradas y salidas de herramientas y equipos por departamento.",
      image: "/projects/WebHotel.jpeg",
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
      year: "2025",
      role: "Desarrollador Full-Stack",
    },
    // 10 — PuntoZeroweb Landing
    {
      title: "PuntoZeroweb Landing",
      description:
        "Landing page de marketing para el sistema POS de PuntoZeroweb, presentando sus funcionalidades a clientes potenciales.",
      image: "/projects/Puntozerolandingcap.png",
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
      year: "2025",
      role: "Desarrollador Frontend",
    },
    // 12 — PuntoZero Facturación en Línea
    {
      title: "PuntoZero Facturación en Línea",
      description:
        "Plataforma colaborativa de facturación online — aporté en el desarrollo frontend e implementación de la interfaz para gestión de facturas digitales.",
      image: "/projects/PZWEBFacturacion.jpeg",
      images: ["/projects/Facturacionenlinea1.png", "/projects/Facturacion en linea 2.png"],
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
      year: "2025",
      role: "Desarrollador Frontend (Colaborativo)",
    },
  ],
};
