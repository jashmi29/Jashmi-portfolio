export interface LeadershipRole {
  id: string;
  organization: string;
  role: string;
  duration: string;
  responsibilities: string[];
  impact: string[];
  achievements: string[];
  image: string;
  accent: string;
}

export const leadership: LeadershipRole[] = [
  {
    id: 'ncc',
    organization: 'National Cadet Corps (NCC)',
    role: 'Corporal → Sergeant',
    duration: '2017 — 2025',
    responsibilities: [
      'Rose from Cadet to Corporal and then Sergeant across years of dedicated service',
      'Completed A, B, and C Certificate levels with consistent performance',
      'Qualified for the Pre-IGC RDC-I Camp, advancing toward Republic Day Camp selection',
    ],
    impact: [
      'Built leadership, discipline, and teamwork through camps, parades, and drills',
      'Trained and mentored junior cadets across the unit',
      'Performed consistently under pressure during camps and examinations',
    ],
    achievements: [
      'NCC A, B & C Certificates',
      'Pre-IGC RDC-I Qualification',
      'Rank of Sergeant',
    ],
    image: '/leader/ncc.png',
    accent: '#10B981',
  },
  {
    id: 'digital-detectives',
    organization: 'Digital Detectives Club',
    role: 'Club Coordinator',
    duration: '2025',
    responsibilities: [
      'Organized cybersecurity awareness events for students',
      'Coordinated student activities and initiatives',
      'Led technical initiatives across the club',
    ],
    impact: [
      'Raised cybersecurity awareness across the student community',
      'Strengthened the club\u2019s technical footprint and student engagement',
      'Mentored peers in security fundamentals',
    ],
    achievements: [
      'Organized cybersecurity awareness events',
      'Led technical initiatives',
      'Coordinated student activities',
    ],
    image:
  '/leader/club.png',
    accent: '#F59E0B',
  },
  {
    id: 'elevate-labs',
    organization: 'Elevate Labs',
    role: 'Cyber Security Intern',
    duration: '2026',
    responsibilities: [
      'Took ownership of security tasks end to end',
      'Collaborated in a professional, fast-paced environment',
      'Applied cybersecurity practices to real-world scenarios',
    ],
    impact: [
      'Delivered assigned security tasks with ownership and accountability',
      'Learned industry workflows and professional collaboration',
      'Translated academic security knowledge into hands-on practice',
    ],
    achievements: [
      'Completed Cyber Security Internship at Elevate Labs',
    ],
    image:
      'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    accent: '#06B6D4',
  },
  {
    id: 'tech-project-lead',
    organization: 'Academic Projects',
    role: 'Technical Project Lead',
    duration: '2024 — Present',
    responsibilities: [
      'Led the development of major academic projects',
      'Managed planning, UI/UX decisions, and project execution',
      'Collaborated with teammates to deliver working solutions',
    ],
    impact: [
      'Shipped multiple working solutions with cross-functional teams',
      'Drove architecture, UI/UX, and delivery decisions',
      'Strengthened team collaboration and technical leadership',
    ],
    achievements: [
      'Delivered major academic projects end to end',
    ],
    image:
    '/leader/l.png',
    accent: '#8B5CF6',
  },
];
