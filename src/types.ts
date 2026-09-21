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

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bioShort: string;
  bioLong: string;
  location: string;
  email: string;
  phone?: string;
  availability: string;
  yearsOfExperience: string;
  cvUrl: string;
  avatarUrl?: string;
  aboutImageUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  websiteUrl?: string;
  socialLinks?: SocialLink[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

