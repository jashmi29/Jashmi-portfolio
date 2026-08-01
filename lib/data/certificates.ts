export type CertificateCategory = 'tech' | 'ncc' | 'creative';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  description: string;
  image: string;
  context: string;
  learningOutcomes: string[];
}


export const certificateCategories: {
  id: CertificateCategory;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    id: 'tech',
    label: 'Tech & Engineering',
    icon: 'Code2',
    description: 'Certifications and courses in software engineering.',
  },
  {
    id: 'ncc',
    label: 'NCC',
    icon: 'Shield',
    description: 'National Cadet Corps achievements and qualifications.',
  },

  {
    id: 'creative',
    label: 'Creative',
    icon: 'Palette',
    description: 'Design, photography and creative pursuits.',
  },
];

export const certificates: Certificate[] = [
  // Tech & Engineering (auto-detected from /public/certificates/tech)
  {
    id: 'artificial-intelligence-fundamentals-ibm-skillsbuild',
    title: 'Artificial Intelligence Fundamentals IBM SkillsBuild',
    issuer: '',
    date: '',
    category: 'tech',
    description: '',
    image:
      '/certificates/tech/Artificial Intelligence Fundamentals IBM SkillsBuild.jpg',
    context: '',
    learningOutcomes: [],
  },
  {
    id: 'blockchain-specialization',
    title: 'Blockchain Specialization',
    issuer: '',
    date: '',
    category: 'tech',
    description: '',
    image: '/certificates/tech/Blockchain Specialization.jpg',
    context: '',
    learningOutcomes: [],
  },
  {
    id: 'data-warehousing-and-business-intelligence',
    title: 'Data Warehousing and Business Intelligence',
    issuer: '',
    date: '',
    category: 'tech',
    description: '',
    image:
      '/certificates/tech/Data Warehousing and Business Intelligence.jpg',
    context: '',
    learningOutcomes: [],
  },
  {
    id: 'digital-forensics-with-kali-linux',
    title: 'Digital Forensics with Kali Linux',
    issuer: '',
    date: '',
    category: 'tech',
    description: '',
    image:
      '/certificates/tech/Digital Forensics with Kali Linux.jpg',
    context: '',
    learningOutcomes: [],
  },
  {
    id: 'exploratory-data-analysis-with-matlab',
    title: 'Exploratory Data Analysis with MATLAB',
    issuer: '',
    date: '',
    category: 'tech',
    description: '',
    image:
      '/certificates/tech/Exploratory Data Analysis with MATLAB.jpg',
    context: '',
    learningOutcomes: [],
  },
  {
    id: 'flutter-and-dart',
    title: 'Flutter and Dart',
    issuer: '',
    date: '',
    category: 'tech',
    description: '',
    image: '/certificates/tech/Flutter and Dart.jpg',
    context: '',
    learningOutcomes: [],
  },
  {
    id: 'mobile-app-development-capstone-project',
    title: 'Mobile App Development Capstone Project',
    issuer: '',
    date: '',
    category: 'tech',
    description: '',
    image:
      '/certificates/tech/Mobile App Development Capstone Project.jpg',
    context: '',
    learningOutcomes: [],
  },

  // NCC
  {
    id: 'ncc-a-cert',
    title: 'NCC “A” Certificate',
    issuer: 'National Cadet Corps · India',
    date: '2019-20',
    category: 'ncc',
    description:
      'The highest NCC certification, awarded after three years of training, camps, and a national-level exam.',
    image: '/certificates/ncc/A CERTIFICATE.jpg',
    context:
      'The culmination of three years of discipline, leadership training, and service — the credential I am most proud of.',
    learningOutcomes: [
      'Completed three annual training camps including a national camp',
      'Passed the national “A” certificate examination with A grade',
      'Demonstrated leadership as a Corporal',
    ],
    
  },
  {
    id: 'ncc-b-cert',
    title: 'NCC “B” Certificate',
    issuer: 'National Cadet Corps · India',
    date: '2023',
    category: 'ncc',
    description:
      'The highest NCC certification, awarded after three years of training, camps, and a national-level exam.',
    image: '/certificates/sports/ncc/ncc_1.jpg',
    context:
      'The culmination of three years of discipline, leadership training, and service — the credential I am most proud of.',
    learningOutcomes: [
      'Completed three annual training camps including a national camp',
      'Passed the national “B” certificate examination with A grade',
      'Demonstrated leadership as a Corporal',
    ],
    
  },
  {
    id: 'ncc-c-cert',
    title: 'NCC “C” Certificate',
    issuer: 'National Cadet Corps · India',
    date: '2024',
    category: 'ncc',
    description:
      'A senior NCC qualification awarded after continued training, camp participation, and leadership development.',
    image: '/certificates/sports/ncc/ncc_1(1).jpg',
    context:
      'A milestone in my NCC journey that reflected continued growth in discipline, responsibility, and leadership.',
    learningOutcomes: [
      'Completed advanced NCC training and leadership responsibilities',
      'Demonstrated consistency, responsibility, and teamwork',
      'Strengthened confidence through camp and unit activities',
    ],
  },
  // Creative
  {
    id: 'ui-design',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google · Coursera',
    date: '2023',
    category: 'creative',
    description:
      'Seven-course certificate covering the end-to-end UX design process from research to high-fidelity prototypes.',
    image: '/certificates/creative/ux.png',
    context:
      'Undertaken to formalize self-taught design instincts with a structured, research-driven process.',
    learningOutcomes: [
      'Conducted user research and synthesized findings into personas',
      'Designed wireframes, mockups, and high-fidelity prototypes in Figma',
      'Ran usability studies and iterated on designs from feedback',
    ],
  },
  {
    id: 'flutter-ui-design',
    title: 'Flutter UI Design',
    issuer: 'Flutter · Dart',
    date: '2023',
    category: 'creative',
    description:
      'Hands-on certificate in crafting pixel-perfect, responsive UIs with Flutter and Dart.',
    image: '/certificates/creative/flutter.png',
    context:
      'Bridged my design and engineering skills by building real, animated interfaces with Flutter.',
    learningOutcomes: [
      'Built responsive layouts with Flutter widgets',
      'Styled pixel-perfect, cross-platform interfaces',
      'Implemented animations and micro-interactions',
    ],
  },
];
