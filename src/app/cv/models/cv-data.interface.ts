export interface PersonalInfo {
  fullName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  website?: string;
  profileImage?: string;
  bio?: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  portfolio?: string;
}

export interface AboutSection {
  description: string;
  yearsExperience: number;
  projectsCompleted: number;
  clientsSatisfied: number;
  technologies: string[];
  highlights?: string[];
  additionalStats?: { label: string; value: string }[];
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
  companyLogo?: string;
  employmentType?: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  location: string;
  gpa?: string;
  description?: string;
  achievements?: string[];
  relevantCourses?: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  years: number;
  icon?: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  startDate: string;
  endDate?: string;
  featured: boolean;
  type?: string;
  status?: string;
  features?: string[];
  metrics?: { label: string; value: string }[];
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  imageUrl?: string;
  rating: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
  preferredContact: 'email' | 'phone' | 'linkedin';
  socialLinks?: SocialLink[];
  message?: string;
  responseTime?: string;
  calendlyUrl?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  about: AboutSection;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  portfolio: Project[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  theme: ThemeConfig;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  isDarkMode: boolean;
}