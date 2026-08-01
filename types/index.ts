/**
 * Centralized type definitions for the portfolio.
 *
 * Each type is also exported from its co-located data file under lib/data/.
 * This index provides a single import surface for consumers that want
 * to reference types without pulling in the runtime data.
 */

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'mail' | 'twitter' | 'instagram' | 'phone';
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
  available: boolean;
  socials: SocialLink[];
}

export interface AboutStat {
  label: string;
  value: number;
  suffix: string;
}

export interface AboutKeyword {
  text: string;
  emphasis: 'high' | 'medium' | 'low';
}

export interface Experience {
  role: string;
  org: string;
  period: string;
  description: string;
  skills: string[];
}

export type CertificateCategory = 'tech' | 'ncc' | 'sports' | 'creative';

export interface CertificateLearningOutcome {
  title: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  credentialId: string;
  image: string;
  description: string;
  learningOutcomes: CertificateLearningOutcome[];
  skills: string[];
}

export interface JourneyMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  achievements: string[];
  icon: string;
}

export interface LeadershipRole {
  id: string;
  title: string;
  org: string;
  period: string;
  description: string;
  responsibilities: string[];
  impact: string;
  achievements: string[];
  image: string;
  accent: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  category: string;
  tech: string[];
  github: string;
  demo: string;
  featured: boolean;
  previewImage: string;
  galleryImages: string[];
  features: ProjectFeature[];
  architecture: string;
  howItWorks: string;
  accent: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
  technologies: Technology[];
}

export interface Technology {
  name: string;
  level: number;
  category: 'core' | 'secondary' | 'tool';
}

export interface TournamentResult {
  name: string;
  date: string;
  result: string;
  location: string;
}

export interface SportCertificate {
  title: string;
  issuer: string;
  date: string;
}

export interface SportAchievement {
  title: string;
  description: string;
  year: string;
}

export interface Sport {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  heroImage: string;
  yearsActive: string;
  level: string;
  achievements: SportAchievement[];
  tournaments: TournamentResult[];
  certificates: SportCertificate[];
  gallery: string[];
  accent: string;
}
