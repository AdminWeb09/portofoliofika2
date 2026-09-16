export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web App' | 'E-Commerce' | 'Dashboard' | 'Landing Page';
  description: string;
  fullDescription: string;
  features: string[];
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design';
  icon: string;
  level: number; // 0-100%
  experience: string;
  tagline: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface ExperienceHighlight {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
