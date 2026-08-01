export interface AboutStat {
  value: number;
  suffix: string;
  label: string;
}

export interface AboutKeyword {
  text: string;
  angle: number;
}

export const aboutStats: AboutStat[] = [
  { value: 3, suffix: '+', label: 'Years building' },
  { value: 15, suffix: '+', label: 'Projects shipped' },
  { value: 10, suffix: '+', label: 'Achievements' },
  { value: 5, suffix: '+', label: 'Sports pursued' },
];

export const aboutKeywords: AboutKeyword[] = [
  { text: 'Craft', angle: -8 },
  { text: 'Motion', angle: 6 },
  { text: 'Depth', angle: -4 },
  { text: 'Detail', angle: 10 },
  { text: 'Intention', angle: -6 },
  { text: 'Systems', angle: 8 },
];

export const aboutContent = {
  lead:
    'I’m Jashmi — an engineer who treats interfaces like products and products like experiences.',
  paragraphs: [
    {
      text: 'For the last four years I’ve lived at the intersection of frontend engineering, full-stack development, and design. I believe the best software doesn’t just work — it feels considered, responsive, and alive.',
      highlight: ['feels considered, responsive, and alive'],
    },
    {
      text: 'My work is shaped by three parallel disciplines. Engineering gives me the tools to build. Design gives me the vocabulary to make it mean something. And sport gives me the stamina to finish what I start.',
      highlight: ['Engineering', 'Design', 'sport'],
    },
    {
      text: 'Whether it’s a component library, an analytics platform, or a finance tracker, I obsess over the moments people don’t notice — the easing curve on a hover, the timing of a page transition, the weight of a headline.',
      highlight: ['the moments people don’t notice'],
    },
  ],
};

export interface Experience {
  role: string;
  org: string;
  period: string;
  summary: string;
}

export const experiences: Experience[] = [
  {
    role: 'Freelance Designer',
    org: 'Independent',
    period: '2026 — Present',
    summary:
      'Exploring UI/UX, visual design, and digital experiences through personal and client-focused creative work.',
  },
  {
    role: 'Student & Creative Projects',
    org: 'Garden City University',
    period: '2023 — Present',
    summary:
      'Designing interfaces, visual experiences, presentations, and creative digital projects alongside my Computer Science studies.',
  },
  {
    role: 'Sergeant',
    org: 'National Cadet Corps',
    period: '2018 — 2024',
    summary:
      'Completed 5 years of NCC and earned A, B, and C Certificates, with participation in leadership training, camps, and unit activities.',
  },
];
