export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export interface Technology {
  name: string;
  categoryId: string;
  /** 0–100 weight controlling orbit radius / cluster prominence */
  weight: number;
  color?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Interfaces, components & visual systems',
    icon: 'Layout',
    color: 'hsl(199 89% 48%)',
  },
  {
    id: 'backend',
    label: 'Backend',
    description: 'APIs, databases & server logic',
    icon: 'Server',
    color: 'hsl(142 71% 45%)',
  },
  {
    id: 'design',
    label: 'Design',
    description: 'UI, UX & visual design',
    icon: 'Palette',
    color: 'hsl(38 92% 50%)',
  },
  {
    id: 'tools',
    label: 'Tools & Development',
    description: 'Build, version control & development',
    icon: 'Wrench',
    color: 'hsl(280 65% 60%)',
  },
  {
    id: 'ai',
    label: 'AI-Assisted Development',
    description: 'AI-powered workflows & rapid prototyping',
    icon: 'Sparkles',
    color: 'hsl(265 89% 60%)',
  },
];

export const technologies: Technology[] = [
  { name: 'React', categoryId: 'frontend', weight: 95, color: '#61DAFB' },
  { name: 'Next.js', categoryId: 'frontend', weight: 92, color: '#fff' },
  { name: 'Tailwind CSS', categoryId: 'frontend', weight: 95, color: '#06B6D4' },
  { name: 'HTML5', categoryId: 'frontend', weight: 92, color: '#E34F26' },
  { name: 'CSS3', categoryId: 'frontend', weight: 92, color: '#1572B6' },
  { name: 'JavaScript', categoryId: 'frontend', weight: 95, color: '#F7DF1E' },
  { name: 'Node.js', categoryId: 'backend', weight: 90, color: '#83CD29' },
  { name: 'Express.js', categoryId: 'backend', weight: 85, color: '#fff' },
  { name: 'REST APIs', categoryId: 'backend', weight: 88, color: '#fff' },
  { name: 'JWT Authentication', categoryId: 'backend', weight: 82, color: '#FF4081' },
  { name: 'MySQL', categoryId: 'backend', weight: 75, color: '#4479A1' },
  { name: 'Firebase', categoryId: 'backend', weight: 80, color: '#FFCA28' },
  { name: 'Figma', categoryId: 'design', weight: 90, color: '#F24E1E' },
  { name: 'Balsamiq', categoryId: 'design', weight: 70, color: '#CC0000' },
  { name: 'Canva', categoryId: 'design', weight: 85, color: '#00C4CC' },
  { name: 'Wireframing', categoryId: 'design', weight: 80, color: '#fff' },
  { name: 'Prototyping', categoryId: 'design', weight: 82, color: '#fff' },
  { name: 'Git', categoryId: 'tools', weight: 90, color: '#F05032' },
  { name: 'GitHub', categoryId: 'tools', weight: 92, color: '#fff' },
  { name: 'Firebase', categoryId: 'tools', weight: 80, color: '#FFCA28' },
  { name: 'VS Code', categoryId: 'tools', weight: 88, color: '#007ACC' },
  { name: 'LocalStorage', categoryId: 'tools', weight: 70, color: '#F7DF1E' },
  { name: 'REST APIs', categoryId: 'tools', weight: 85, color: '#fff' },
  { name: 'ChatGPT', categoryId: 'ai', weight: 90, color: '#10A37F' },
  { name: 'Claude AI', categoryId: 'ai', weight: 88, color: '#D97757' },
  { name: 'Blackbox AI', categoryId: 'ai', weight: 85, color: '#000000' },
  { name: 'Bolt.new', categoryId: 'ai', weight: 80, color: '#7A5AF8' },
  { name: 'Lovable', categoryId: 'ai', weight: 78, color: '#FF4D8D' },
];
