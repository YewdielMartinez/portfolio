

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation?: string; // Optional explanation after answering
}

export interface Quiz {
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface Quizzes {
  en: Quiz;
  es: Quiz;
}

export const quiz: Quizzes = {
  en: {
    title: "How Well Do You Know Me?",
    description: "Test your knowledge about my skills, interests, and experience!",
    questions: [
      {
        id: 1,
        question: "What was my first full web app project?",
        options: ["EcoSend", "Watchlt", "Medic Life", "Banchido"],
        correctAnswer: 1,
        explanation: "Watchlt was my first complete app — a movie comparison platform built with React, Firebase, and Tailwind!"
      },
      {
        id: 2,
        question: "Which hackathon project did I build in 24 hours?",
        options: ["Medic Life", "EcoSend", "Watchlt", "Banchido"],
        correctAnswer: 1,
        explanation: "EcoSend was built in 24 hours during a hackathon — it manages eco-friendly delivery logistics."
      },
      {
        id: 3,
        question: "Which technology do I most often use for backend development?",
        options: ["Node.js", "PHP", "Python", "Java"],
        correctAnswer: 1,
        explanation: "I frequently use PHP with MySQL for backend systems in projects like Medic Life."
      },
      {
        id: 4,
        question: "Which frontend framework do I use most frequently?",
        options: ["Angular", "React", "Vue", "Svelte"],
        correctAnswer: 1,
        explanation: "React is my main framework — I’ve used it for multiple web and mobile apps."
      },
      {
        id: 5,
        question: "Which mobile framework have I used for app development?",
        options: ["React Native", "Flutter", "Swift", "Kotlin"],
        correctAnswer: 0,
        explanation: "I use React Native for mobile apps, like the private sales route app for PuntoZeroweb."
      },
      {
        id: 6,
        question: "Which movie is one of my favorites?",
        options: ["Interstellar", "Titanic", "Fight Club", "Avatar"],
        correctAnswer: 0,
        explanation: "Interstellar is one of my all-time favorites — a perfect mix of science and emotion."
      },
      {
        id: 7,
        question: "Which design inspiration do I used for Watchlt?",
        options: ["Material Design", "Neumorphism", "Apple Liquid Glass", "Minimal Brutalism"],
        correctAnswer: 2,
        explanation: "Watchlt followed Apple’s liquid glass design aesthetic."
      },
      {
        id: 8,
        question: "Which CSS framework do I prefer for styling?",
        options: ["Bootstrap", "Tailwind CSS", "Material UI", "Bulma"],
        correctAnswer: 1,
        explanation: "Tailwind CSS — it’s fast, flexible, and my go-to for custom designs."
      }
    ]
  },

  es: {
    title: "¿Qué tanto me conoces?",
    description: "Pon a prueba tus conocimientos sobre mis habilidades, intereses y experiencia.",
    questions: [
      {
        id: 1,
        question: "¿Cuál fue mi primer proyecto web completo?",
        options: ["EcoSend", "Watchlt", "Medic Life", "Banchido"],
        correctAnswer: 1,
        explanation: "Watchlt fue mi primera app completa — una plataforma de comparación de películas hecha con React, Firebase y Tailwind."
      },
      {
        id: 2,
        question: "¿Qué proyecto desarrollé durante un hackathon en 24 horas?",
        options: ["Medic Life", "EcoSend", "Watchlt", "Banchido"],
        correctAnswer: 1,
        explanation: "EcoSend se creó en 24 horas en un hackathon. Gestiona la logística de envíos sostenibles."
      },
      {
        id: 3,
        question: "¿Qué tecnología uso más frecuentemente para el backend?",
        options: ["Node.js", "PHP", "Python", "Java"],
        correctAnswer: 1,
        explanation: "Uso PHP con MySQL en varios proyectos como Medic Life pero personalmente me gusta mas NestJS."
      },
      {
        id: 4,
        question: "¿Qué framework frontend uso con mayor frecuencia?",
        options: ["Angular", "React", "Vue", "Svelte"],
        correctAnswer: 1,
        explanation: "React es mi framework principal — lo he usado en múltiples aplicaciones web y móviles."
      },
      {
        id: 5,
        question: "¿Qué framework móvil he utilizado para el desarrollo de apps?",
        options: ["React Native", "Flutter", "Swift", "Kotlin"],
        correctAnswer: 0,
        explanation: "Uso React Native para apps móviles, como la aplicación privada de ventas en ruta de PuntoZeroweb."
      },
      {
        id: 6,
        question: "¿Cuál es una de mis películas favoritas?",
        options: ["Interstellar", "Titanic", "Fight Club", "Avatar"],
        correctAnswer: 0,
        explanation: "Interstellar es una de mis favoritas — una mezcla perfecta entre ciencia y emoción."
      },
      {
        id: 7,
        question: "¿Qué tipo de diseño utilicé como inspiración para Watchlt?",
        options: ["Material Design", "Neumorfismo", "Apple Liquid Glass", "Brutalismo Minimalista"],
        correctAnswer: 2,
        explanation: "Watchlt siguió la línea de diseño 'liquid glass' de Apple."
      },
      {
        id: 8,
        question: "¿Qué framework de CSS prefiero para los estilos?",
        options: ["Bootstrap", "Tailwind CSS", "Material UI", "Bulma"],
        correctAnswer: 1,
        explanation: "Tailwind CSS — rápido, flexible y mi favorito para crear diseños personalizados."
      }
    ]
  }
};
// Quiz translations
export const quizTranslations = {
  en: {
    startButton: 'Start Quiz',
    nextButton: 'Next Question',
    finishButton: 'See Results',
    retryButton: 'Try Again',
    closeButton: 'Close',
    correctAnswer: 'Correct!',
    wrongAnswer: 'Not quite!',
    score: 'Your Score',
    outOf: 'out of',
    perfect: 'Perfect! You know me well!',
    great: 'Great job! You know quite a bit!',
    good: 'Not bad! Keep learning!',
    tryAgain: 'Give it another shot!',
    readyText: 'Ready to test your knowledge?',
    questionLabel: 'Question',
    ofLabel: 'of'
  },
  es: {
    startButton: 'Comenzar Quiz',
    nextButton: 'Siguiente Pregunta',
    finishButton: 'Ver Resultados',
    retryButton: 'Intentar de Nuevo',
    closeButton: 'Cerrar',
    correctAnswer: '¡Correcto!',
    wrongAnswer: '¡No exactamente!',
    score: 'Tu Puntuación',
    outOf: 'de',
    perfect: '¡Perfecto! ¡Me conoces bien!',
    great: '¡Muy bien! ¡Sabes bastante!',
    good: '¡No está mal! ¡Sigue aprendiendo!',
    tryAgain: '¡Inténtalo de nuevo!',
    readyText: '¿Listo para poner a prueba tus conocimientos?',
    questionLabel: 'Pregunta',
    ofLabel: 'de'
  }
};
