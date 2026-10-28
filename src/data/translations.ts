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
    /** Cursor chip over an archive card */
    view: string;
    /** Cursor word inside the carousel */
    cursorDrag: string;
    filters: {
      label: string;
      all: string;
      web: string;
      mobile: string;
      backend: string;
      library: string;
      ai: string;
    };
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
    invalid: string;
    nameHint: string;
    emailHint: string;
    messageHint: string;
    direct: string;
  };
  footer: {
    title: string;
    rights: string;
  };
  chat: {
    launcher: string;
    title: string;
    intro: string;
    messages: string;
    placeholder: string;
    send: string;
    stop: string;
    close: string;
    thinking: string;
    stopped: string;
    error: string;
    rateLimit: string;
    suggestProjects: string;
    suggestStack: string;
    suggestContact: string;
    privacy: string;
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
      role: 'Full-Stack .NET & AI Developer',
      location: 'Los Mochis, Mexico',
      portfolio: 'Portfolio',
    },
    about: {
      hello: 'Hello!',
      name: "I'm Yewdiel Medina",
      bio: "I'm a full-stack software developer based in Los Mochis, Sinaloa. I specialize in C# and .NET with React and Angular, and I bring generative AI into business applications: LLM integrations, RAG pipelines with embeddings and semantic search, and Python services orchestrated with LangChain and LlamaIndex.",
      bio2: 'I design REST APIs with ASP.NET Core and SQL Server databases with stored procedures, work with vector stores such as pgvector, Qdrant and Chroma, and ship through Azure DevOps repositories and CI/CD pipelines. I work with clients and business teams from requirements to production, I am studying Software Engineering, and I publish my own tools on npm, like LOON and Motion Kit.',
    },
    services: {
      title1: 'What I do?',
      title2: '(and love doing)',
      body: 'I build business applications end to end — .NET APIs, React and Angular interfaces, SQL Server data — and add generative AI where it pays off: assistants that answer from company information, semantic search and automated processes.',
      items: ['.NET backend', 'REST APIs', 'Generative AI', 'Semantic search', 'Frontend', 'Mobile apps'],
    },
    tools: {
      title1: 'Tools',
      title2: "I'm fluent in.",
      core: 'Specialized in',
      extra: 'Complemented with',
      outro: 'plus AI-assisted workflows across design, development and delivery.',
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
      view: 'View project',
      cursorDrag: 'Drag',
      filters: {
        label: 'Filter projects',
        all: 'All',
        web: 'Web',
        mobile: 'Mobile',
        backend: 'Backend',
        library: 'Libraries',
        ai: 'AI',
      },
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
      invalid: 'Check the highlighted fields.',
      nameHint: 'Enter your name (at least 2 characters).',
      emailHint: 'Enter a valid email so I can reply.',
      messageHint: 'Tell me a little about your idea (at least 10 characters).',
      direct: 'Prefer email? ',
    },
    chat: {
      launcher: 'Ask about my work',
      title: 'Get to know my work.',
      intro: "Hi! I'm the AI assistant for Yewdiel's portfolio. Ask me about his projects, experience or tools, and I'll help you find your way around.",
      messages: 'Conversation with the portfolio assistant',
      placeholder: 'Write a message…',
      send: 'Send question',
      stop: 'Stop response',
      close: 'Close assistant',
      thinking: 'Looking through the portfolio…',
      stopped: 'Response stopped.',
      error: 'I could not complete the response. Try again, or use the contact form to reach Yewdiel.',
      rateLimit: 'There have been several questions in a short time. Please try again in a minute.',
      suggestProjects: 'What projects has he built?',
      suggestStack: 'What technologies does he use?',
      suggestContact: 'How can I contact him?',
      privacy: 'AI answers from this portfolio. Questions are processed by Groq.',
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
      role: 'Desarrollador Full-Stack .NET e IA',
      location: 'Los Mochis, México',
      portfolio: 'Portfolio',
    },
    about: {
      hello: '¡Hola!',
      name: 'Soy Yewdiel Medina',
      bio: 'Soy desarrollador de software full-stack, radicado en Los Mochis, Sinaloa. Me especializo en C# y .NET con React y Angular, y llevo la IA generativa a aplicaciones empresariales: integración de LLMs, arquitecturas RAG con embeddings y búsqueda semántica, y servicios en Python orquestados con LangChain y LlamaIndex.',
      bio2: 'Diseño APIs REST con ASP.NET Core y bases de datos SQL Server con procedimientos almacenados, trabajo con bases vectoriales como pgvector, Qdrant y Chroma, y entrego mediante repositorios y pipelines de CI/CD en Azure DevOps. Trabajo con clientes y equipos de negocio desde los requisitos hasta producción, estudio Ingeniería de Software y publico mis propias herramientas en npm, como LOON y Motion Kit.',
    },
    services: {
      title1: '¿Qué hago?',
      title2: '(y me encanta hacer)',
      body: 'Construyo aplicaciones empresariales de punta a punta — APIs en .NET, interfaces en React y Angular, datos en SQL Server — y sumo IA generativa donde aporta: asistentes que responden con la información de la empresa, búsqueda semántica y procesos automatizados.',
      items: ['Backend .NET', 'APIs REST', 'IA generativa', 'Búsqueda semántica', 'Frontend', 'Apps móviles'],
    },
    tools: {
      title1: 'Herramientas',
      title2: 'que domino.',
      core: 'Me especializo en',
      extra: 'Lo complemento con',
      outro: 'además de flujos asistidos por IA en diseño, desarrollo y entrega.',
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
      view: 'Ver proyecto',
      cursorDrag: 'Arrastra',
      filters: {
        label: 'Filtrar proyectos',
        all: 'Todos',
        web: 'Web',
        mobile: 'Móvil',
        backend: 'Backend',
        library: 'Librerías',
        ai: 'IA',
      },
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
      invalid: 'Revisa los campos marcados.',
      nameHint: 'Escribe tu nombre (al menos 2 caracteres).',
      emailHint: 'Escribe un email válido para poder responderte.',
      messageHint: 'Cuéntame un poco de tu idea (al menos 10 caracteres).',
      direct: '¿Prefieres escribirme? ',
    },
    chat: {
      launcher: 'Pregúntame',
      title: 'Conoce mi trabajo.',
      intro: '¡Hola! Soy el asistente de IA del portfolio de Yewdiel. Pregúntame sobre sus proyectos, experiencia o herramientas y te ayudo a explorar su trabajo.',
      messages: 'Conversación con el asistente del portfolio',
      placeholder: 'Escribe un mensaje…',
      send: 'Enviar pregunta',
      stop: 'Detener respuesta',
      close: 'Cerrar asistente',
      thinking: 'Revisando el portfolio…',
      stopped: 'Respuesta detenida.',
      error: 'No pude completar la respuesta. Inténtalo de nuevo o usa el formulario para contactar a Yewdiel.',
      rateLimit: 'Hubo varias preguntas en poco tiempo. Inténtalo de nuevo en un minuto.',
      suggestProjects: '¿Qué proyectos ha desarrollado?',
      suggestStack: '¿Qué tecnologías utiliza?',
      suggestContact: '¿Cómo puedo contactarlo?',
      privacy: 'Respuestas de IA basadas en este portfolio. Groq procesa las preguntas.',
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
