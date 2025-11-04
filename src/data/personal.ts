
export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  avatar: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    letterboxd?: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: 'Yewdiel Medina',
  role: 'Software Developer',
  tagline: 'Building elegant, scalable, and user-focused web experiences',
  bio: "I'm a passionate developer who loves creating beautiful, functional applications. With expertise in modern web technologies, I focus on delivering exceptional user experiences and clean, maintainable code.",
  avatar: '/avatar.jpg',
  email: 'yewdiel211@gmail.com',
  social: {
  github: 'https://github.com/YewdielMartinez',
  linkedin: 'https://www.linkedin.com/in/yewdiel-mart%C3%ADnez-medina-0b6752249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  twitter: 'https://x.com/yewdiel211?t=pJcz40-GjgEgHyNtrnKljA&s=09',
  letterboxd: 'https://boxd.it/47j69'
  }
};
