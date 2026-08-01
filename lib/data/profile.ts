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

export const contactInfo: ContactInfo = {
  email: 'jashmiks29@gmail.com',
  phone: '+91 9740035942',
  location: 'Bengaluru, India',
  availability: 'Open to internships & freelance frontend work',
  available: true,
  socials: [
    { label: 'GitHub', href: 'https://github.com/jashmi29', icon: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jashmi-ks-35a5552a9',
      icon: 'linkedin',
    },
    { label: 'Email', href: 'mailto:jashmiks29@gmail.com', icon: 'mail' },
  ],
};

export const profileInfo = {
  name: 'Jashmi KS',
  firstName: 'Jashmi ',
  lastName: 'KS',
  tagline: 'I craft interfaces that feel alive.',

  roles: [
    'Frontend Engineer',
    'Full-Stack Developer',
    'UI / UX Designer',
    'Motion Designer',
    'Product Thinker',
    'Interaction Designer',
  ],
  intro:
    'I design and build premium digital products — blending engineering precision with motion, depth, and a deep respect for the human on the other side of the screen.',
  yearsExperience: 4,
  projectsShipped: 30,
  accolades: 12,
};
