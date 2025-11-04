
export interface Translation {
  nav: {
    home: string;
    experience: string;
    work: string;
    about: string;
    contact: string;
  };
  home: {
    name: string;
    role: string;
    tagline: string;
    viewWork: string;
    contactMe: string;
  };
  experience: {
    title: string;
  };
  work: {
    title: string;
    viewProject: string;
    viewDetails: string;
    aboutProject: string;
    keyFeatures: string;
    viewCode: string;
    viewDemo: string;
  };
  about: {
    title: string;
    bio: string;
    skillsTitle: string;
    favorites: string;
  };
  contact: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sending: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
  };
  behind: {
    unlocked: string;
    title: string;
    subtitle: string;
    techStack: string;
    features: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    feature5Title: string;
    feature5Desc: string;
    feature6Title: string;
    feature6Desc: string;
    apis: string;
    tmdbDesc: string;
    colorPalette: string;
    secretFound: string;
    pressKey: string;
    togglePanel: string;
    builtWith: string;
  };
}

export interface Translations {
  en: Translation;
  es: Translation;
}

export const translations: Translations = {
  en: {
    nav: {
      home: 'Home',
      experience: 'Experience',
      work: 'Work',
      about: 'About',
      contact: 'Contact'
    },
    home: {
      name: 'Yewdiel Medina',
      role: 'Software Developer',
      tagline: 'Turning ideas into scalable web and mobile apps',
      viewWork: 'View Work',
      contactMe: 'Contact Me'
    },
    experience: {
      title: 'Experience'
    },
    work: {
      title: 'Work',
      viewProject: 'View Project',
      viewDetails: 'View details',
      aboutProject: 'About the Project',
      keyFeatures: 'Key Features',
      viewCode: 'View Code',
      viewDemo: 'View Demo'
    },
    about: {
      title: 'About Me',
      bio: "I'm a software developer passionate about design, backend development, and mobile applications. I love blending creativity and logic to build meaningful digital experiences. Outside of coding, I'm a big fan of cinema, wrestling, and video games. I enjoy going to the gym, sharing ideas, and have a soft spot for dogs and sharks. Also, meatballs and carne asada are definitely my favorite food.",
      skillsTitle: 'Skills & Technologies',
      favorites: 'My Favorites'
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "Have a project in mind? I'd love to hear from you.",
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      sendButton: 'Send Message',
      sending: 'Sending...',
      successTitle: '✓ Message sent successfully!',
      successMessage: "I'll get back to you soon.",
      errorTitle: '✗ Error sending message',
      errorMessage: 'Please try again later.'
    },
    behind: {
      unlocked: 'Easter Egg Unlocked!',
      title: 'Behind the Code',
      subtitle: 'How this portfolio was crafted',
      techStack: 'Tech Stack',
      features: 'Key Features',
      feature1Title: 'Typewriter Animation',
      feature1Desc: 'Custom async typewriter effect on hero section with loop and delete animations',
      feature2Title: 'Auto Slideshow',
      feature2Desc: 'Integrated TMDB API for movies with random shuffle',
      feature3Title: 'TypeScript Data Management',
      feature3Desc: 'All data (skills, movies, photos, projects) managed via TypeScript files',
      feature4Title: 'Interactive Quiz',
      feature4Desc: 'Custom quiz system with scoring and multilingual support',
      feature5Title: 'Hover Detail Modals',
      feature5Desc: '1.5s hover delay to show detailed project information',
      feature6Title: 'Scroll Snapping Navigation',
      feature6Desc: 'Full-page sections with smooth scroll snap and keyboard navigation',
      apis: 'APIs & Integrations',
      tmdbDesc: 'The Movie Database for movie posters and information',
      colorPalette: 'Color Palette',
      secretFound: 'You found the secret!',
      pressKey: 'Press',
      togglePanel: 'anytime to toggle this panel',
      builtWith: 'Built with passion and precision'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      experience: 'Experiencia',
      work: 'Proyectos',
      about: 'Sobre Mí',
      contact: 'Contacto'
    },
    home: {
      name: 'Yewdiel Medina',
      role: 'Desarrollador de Software',
      tagline: 'Transformando ideas en experiencias web y móviles excepcionales',
      viewWork: 'Ver Proyectos',
      contactMe: 'Contáctame'
    },
    experience: {
      title: 'Experiencia'
    },
    work: {
      title: 'Proyectos',
      viewProject: 'Ver Proyecto',
      viewDetails: 'Ver detalles',
      aboutProject: 'Sobre el Proyecto',
      keyFeatures: 'Características Clave',
      viewCode: 'Ver Código',
      viewDemo: 'Ver Demo'
    },
    about: {
      title: 'Sobre Mí',
      bio: 'Soy un estudiante de ingeniería de software apasionado por el diseño, el desarrollo backend y las aplicaciones móviles. Me gusta combinar creatividad y lógica para construir experiencias digitales significativas. Fuera del código, soy fan del cine, la lucha libre y los videojuegos. Disfruto ir al gimnasio, ofrecer ideas y tengo un gran cariño por los perros y los tiburones. Además, mis comidas favoritas son las albóndigas y la carne asada.',
      skillsTitle: 'Habilidades y Tecnologías',
      favorites: 'Mis Favoritos'
    },
    contact: {
      title: 'Trabajemos Juntos',
      subtitle: '¿Tienes un proyecto en mente? Me encantaría saber de ti.',
      namePlaceholder: 'Tu Nombre',
      emailPlaceholder: 'Tu Email',
      messagePlaceholder: 'Tu Mensaje',
      sendButton: 'Enviar Mensaje',
      sending: 'Enviando...',
      successTitle: '✓ ¡Mensaje enviado con éxito!',
      successMessage: 'Te responderé pronto.',
      errorTitle: '✗ Error al enviar mensaje',
      errorMessage: 'Por favor intenta de nuevo más tarde.'
    },
    behind: {
      unlocked: '¡Easter Egg Desbloqueado!',
      title: 'Detrás del Código',
      subtitle: 'Cómo se construyó este portafolio',
      techStack: 'Stack Tecnológico',
      features: 'Características Clave',
      feature1Title: 'Animación de Máquina de Escribir',
      feature1Desc: 'Efecto de escritura asíncrona personalizado en la sección hero con animaciones de bucle y eliminación',
      feature2Title: 'Slideshow Automático',
      feature2Desc: 'API de TMDB integrada para películas con reproducción aleatoria',
      feature3Title: 'Gestión de Datos TypeScript',
      feature3Desc: 'Todos los datos (habilidades, películas, fotos, proyectos) gestionados mediante archivos TypeScript',
      feature4Title: 'Quiz Interactivo',
      feature4Desc: 'Sistema de quiz personalizado con puntuación y soporte multilingüe',
      feature5Title: 'Modales de Detalle al Hover',
      feature5Desc: 'Retraso de 1.5s al hacer hover para mostrar información detallada del proyecto',
      feature6Title: 'Navegación con Scroll Snap',
      feature6Desc: 'Secciones de página completa con scroll snap suave y navegación por teclado',
      apis: 'APIs e Integraciones',
      tmdbDesc: 'The Movie Database para pósters e información de películas',
      colorPalette: 'Paleta de Colores',
      secretFound: '¡Encontraste el secreto!',
      pressKey: 'Presiona',
      togglePanel: 'en cualquier momento para alternar este panel',
      builtWith: 'Construido con pasión y precisión'
    }
  }
};

// Social links
export const social = {
  github: 'https://github.com/YewdielMartinez',
  linkedin: 'https://www.linkedin.com/in/yewdiel-mart%C3%ADnez-medina-0b6752249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  twitter: 'https://x.com/yewdiel211?t=pJcz40-GjgEgHyNtrnKljA&s=09',
  letterboxd: 'https://boxd.it/47j69',
  email: 'yewdiel211@gmail.com'
};

// Avatar
export const avatar = '/avatar.jpg';
