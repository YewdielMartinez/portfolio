export type Lang = 'en' | 'es';

export interface Translation {
  nav: {
    home: string;
    about: string;
    services: string;
    tools: string;
    experience: string;
    work: string;
    contact: string;
    menu: string;
    close: string;
  };
  cover: {
    presentedBy: string;
    role: string;
    location: string;
    portfolio: string;
  };
  about: {
    hello: string;
    name: string;
    bio: string;
    bio2: string;
  };
  services: {
    title1: string;
    title2: string;
    body: string;
    items: string[];
  };
  tools: {
    title1: string;
    title2: string;
    core: string;
    extra: string;
    outro: string;
  };
  experience: {
    title1: string;
    title2: string;
  };
  work: {
    title1: string;
    title2: string;
    archive: string;
    drag: string;
    open: string;
    carousel: string;
  };
  dialog: {
    year: string;
    role: string;
    features: string;
    demo: string;
    code: string;
    video: string;
    close: string;
    copy: string;
    copied: string;
    gallery: string;
  };
  contact: {
    title1: string;
    title2: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: {
    title: string;
    rights: string;
  };
  settings: {
    open: string;
    theme: string;
    switchLang: string;
    langCode: string;
  };
}

export const translations: Record<Lang, Translation> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About me',
      services: 'What I do',
      tools: 'Tools',
      experience: 'Experience',
      work: 'Work',
      contact: 'Contact',
      menu: 'Sections',
      close: 'Close',
    },
    cover: {
      presentedBy: 'Presented by: Yewdiel Medina',
      role: 'Software Developer',
      location: 'Los Mochis, Mexico',
      portfolio: 'Portfolio',
    },
    about: {
      hello: 'Hello!',
      name: "I'm Yewdiel Medina",
      bio: "I'm a full-stack software developer based in Los Mochis, Sinaloa. I specialize in React, React Native, .NET and PHP: polished web interfaces, mobile apps and the backend services behind them.",
      bio2: 'Beyond the code, I work on CI/CD pipelines and server administration and support project management, so products make it from idea to production. I am studying Software Engineering while shipping real-world products, and I publish my own tools on npm, like LOON and Motion Kit.',
    },
    services: {
      title1: 'What I do?',
      title2: '(and love doing)',
      body: 'I build clear, fast interfaces — sometimes bold, sometimes minimal, always purposeful. I enjoy turning complex workflows into products people understand at a glance, from the first sketch to production.',
      items: ['Frontend', 'Mobile apps', 'Backend', 'UI/UX', 'APIs', 'Landing pages'],
    },
    tools: {
      title1: 'Tools',
      title2: "I'm fluent in.",
      core: 'Specialized in',
      extra: 'Complemented with',
      outro: 'and I explore AI tools to bring them into design, development and delivery.',
    },
    experience: {
      title1: 'Experience',
      title2: 'so far.',
    },
    work: {
      title1: 'Selected',
      title2: 'work.',
      archive: 'Archive',
      drag: 'Drag or use ← →',
      open: 'Open project',
      carousel: 'Selected projects',
    },
    dialog: {
      year: 'Year',
      role: 'Role',
      features: 'Key features',
      demo: 'View demo',
      code: 'View code',
      video: 'Video demo',
      close: 'Close',
      copy: 'Copy',
      copied: 'Copied',
      gallery: 'Screenshots',
    },
    contact: {
      title1: "Let's work",
      title2: 'together?',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      success: "Message sent. I'll get back to you soon.",
      error: 'The message could not be sent. Write to me at yewdiel211@gmail.com.',
    },
    footer: {
      title: 'Contact',
      rights: 'All rights reserved',
    },
    settings: {
      open: 'Settings',
      theme: 'Toggle dark mode',
      switchLang: 'Cambiar a español',
      langCode: 'ES',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      services: 'Qué hago',
      tools: 'Herramientas',
      experience: 'Experiencia',
      work: 'Proyectos',
      contact: 'Contacto',
      menu: 'Secciones',
      close: 'Cerrar',
    },
    cover: {
      presentedBy: 'Presentado por: Yewdiel Medina',
      role: 'Desarrollador de Software',
      location: 'Los Mochis, México',
      portfolio: 'Portfolio',
    },
    about: {
      hello: '¡Hola!',
      name: 'Soy Yewdiel Medina',
      bio: 'Soy desarrollador de software full-stack, radicado en Los Mochis, Sinaloa. Me especializo en React, React Native, .NET y PHP: interfaces web pulidas, apps móviles y los servicios backend que las sostienen.',
      bio2: 'Además del código, participo en pipelines de CI/CD y en la administración de servidores, y apoyo en la gestión de proyectos para llevar los productos de la idea a producción. Estudio Ingeniería de Software mientras desarrollo productos reales y publico mis propias herramientas en npm, como LOON y Motion Kit.',
    },
    services: {
      title1: '¿Qué hago?',
      title2: '(y me encanta hacer)',
      body: 'Construyo interfaces claras y rápidas — a veces audaces, a veces mínimas, siempre con propósito. Disfruto convertir flujos complejos en productos que se entienden de un vistazo, del primer boceto a producción.',
      items: ['Frontend', 'Apps móviles', 'Backend', 'UI/UX', 'APIs', 'Landing pages'],
    },
    tools: {
      title1: 'Herramientas',
      title2: 'que domino.',
      core: 'Me especializo en',
      extra: 'Lo complemento con',
      outro: 'y exploro herramientas de IA para integrarlas en diseño, desarrollo y entrega.',
    },
    experience: {
      title1: 'Experiencia',
      title2: 'hasta hoy.',
    },
    work: {
      title1: 'Proyectos',
      title2: 'seleccionados.',
      archive: 'Archivo',
      drag: 'Arrastra o usa ← →',
      open: 'Abrir proyecto',
      carousel: 'Proyectos seleccionados',
    },
    dialog: {
      year: 'Año',
      role: 'Rol',
      features: 'Características clave',
      demo: 'Ver demo',
      code: 'Ver código',
      video: 'Video demo',
      close: 'Cerrar',
      copy: 'Copiar',
      copied: 'Copiado',
      gallery: 'Capturas',
    },
    contact: {
      title1: '¿Trabajamos',
      title2: 'juntos?',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      success: 'Mensaje enviado. Te responderé pronto.',
      error: 'No se pudo enviar el mensaje. Escríbeme a yewdiel211@gmail.com.',
    },
    footer: {
      title: 'Contacto',
      rights: 'Todos los derechos reservados',
    },
    settings: {
      open: 'Ajustes',
      theme: 'Cambiar modo oscuro',
      switchLang: 'Switch to English',
      langCode: 'EN',
    },
  },
};
