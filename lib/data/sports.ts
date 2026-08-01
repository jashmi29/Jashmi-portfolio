export interface TournamentResult {
  event: string;
  level: string;
  result: string;
  date: string;
}

export interface SportCertificate {
  id: string;
  title: string;
  image: string;
  issuer: string;
  event: string;
  date: string;
  achievement: string;
  description: string;
  highlights: string[];
}



export interface SportAchievement {
  title: string;
  description: string;
  icon: string;
}

export interface Sport {
  id: string;
  name: string;
  discipline: string;
  heroImage: string;
  accent: string;
  intro: string;
  startDate: string;
  achievements: SportAchievement[];
  timeline: TournamentResult[];
  certificates: SportCertificate[];
  gallery: string[];
}

export const sports: Sport[] = [
  {
    id: 'athletics',
    name: 'Athletics',
    discipline: 'Track & Field',
    heroImage:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTFgLl6Nc1ZGkU9Cgk8HDenlDidiuMxMLlaee1GWhAYe4ZtsPmR5g__9o&s=10',
    accent: '#F59E0B',
    intro:
      'Athletics shaped my discipline, consistency, and long-term focus.',
    startDate: '2017',
    achievements: [],
    timeline: [],
    certificates: [
      {
        id: 'athletics-certificate-1',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1.jpg',
        issuer: 'Sports Committee',
        event: 'Athletics',
        date: '2017',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'athletics-certificate-2',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(1).jpg',
        issuer: 'Sports Committee',
        event: 'Athletics',
        date: '2018',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'athletics-certificate-3',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(2).jpg',
        issuer: 'Sports Committee',
        event: 'Athletics',
        date: '2019',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'athletics-certificate-4',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(3).jpg',
        issuer: 'Sports Committee',
        event: 'Athletics',
        date: '2020',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'athletics-certificate-5',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(4).jpg',
        issuer: 'Sports Committee',
        event: 'Athletics',
        date: '2021',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'athletics-certificate-6',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(5).jpg',
        issuer: 'Sports Committee',
        event: 'Athletics',
        date: '2022',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'athletics-certificate-7',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(6).jpg',
        issuer: 'Sports Committee',
        event: 'Athletics',
        date: '2023',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'athletics-certificate-8',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(7).jpg',
        issuer: 'Sports Committee',
        event: 'Athletics',
        date: '2024',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'athletics-certificate-9',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(8).jpg',
        issuer: 'Sports Committee',
        event: 'Athletics',
        date: '2025',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'athletics-certificate-10',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(14).jpg',
        issuer: 'Sports Committee',
        event: 'Athletics',
        date: '2026',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
    ],
    gallery: [],
  },
  {
    id: 'run',
    name: 'Run',
    discipline: 'Running',
    heroImage:
      'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=2',
    accent: '#38BDF8',
    intro:
      'Running reflects the same discipline and calm focus that define my work.',
    startDate: '2017',
    achievements: [],
    timeline: [],
    certificates: [
      {
        id: 'run-certificate-1',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1.jpg',
        issuer: 'Sports Committee',
        event: 'Running',
        date: '2017',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'run-certificate-2',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(1).jpg',
        issuer: 'Sports Committee',
        event: 'Running',
        date: '2018',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'run-certificate-3',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(2).jpg',
        issuer: 'Sports Committee',
        event: 'Running',
        date: '2019',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'run-certificate-4',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(3).jpg',
        issuer: 'Sports Committee',
        event: 'Running',
        date: '2020',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'run-certificate-5',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(4).jpg',
        issuer: 'Sports Committee',
        event: 'Running',
        date: '2021',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'run-certificate-6',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(5).jpg',
        issuer: 'Sports Committee',
        event: 'Running',
        date: '2022',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'run-certificate-7',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(6).jpg',
        issuer: 'Sports Committee',
        event: 'Running',
        date: '2023',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'run-certificate-8',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(7).jpg',
        issuer: 'Sports Committee',
        event: 'Running',
        date: '2024',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'run-certificate-9',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(8).jpg',
        issuer: 'Sports Committee',
        event: 'Running',
        date: '2025',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'run-certificate-10',
        title: 'Certificate',
        image: '/certificates/sports/run/DocScanner Aug 1, 2026 7-21 PM_1(14).jpg',
        issuer: 'Sports Committee',
        event: 'Running',
        date: '2026',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
    ],
    gallery: [],
  },
  {
    id: 'throwball',
    name: 'Throwball',
    discipline: 'Team sport · Captain & setter',
    heroImage:
    'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA3L21vdGFybzdfbW9kZXJuX2JsYWNrX2FuZF93aGl0ZV9waG90b19wYXBlcl9jb2xsYWdlX29mX3ZvbGxleWJhbF8wZTk1MjZkZC02ODYwLTQ5ZjYtYWI3OS00ODFhMGFjZDMwYjYucG5n.png',
        accent: '#E879F9',
    intro:
      'Throwball taught me how calm coordination can outshine raw strength — every pass, every positioning decision, and every team moment mattered.',
    startDate: '2019',
    achievements: [
      {
        title: 'District Championship',
        description: 'Led the team to district-level success in the school tournament circuit.',
        icon: 'Trophy',
      },
      {
        title: 'Captaincy Role',
        description: 'Organised team play and led the side through competitive matches.',
        icon: 'Users',
      },
      {
        title: 'Team Discipline',
        description: 'Strengthened positioning, communication, and match composure under pressure.',
        icon: 'Star',
      },
    ],
    timeline: [
      {
        event: 'School Throwball Tournament',
        level: 'Institutional',
        result: 'Finalist · Team Captain',
        date: '2020',
      },
      {
        event: 'District Throwball Meet',
        level: 'District',
        result: 'Championship appearance',
        date: '2021',
      },
      {
        event: 'Inter-School League',
        level: 'Regional',
        result: 'Consistent performer',
        date: '2022',
      },
    ],
    certificates: [
      {
        id: 'throwball-certificate-1',
        title: 'Throwball Certificate 01',
        image: '/certificates/sports/throwball/DocScanner Aug 1, 2026 7-21 PM_1(10).jpg',
        issuer: 'School Sports Committee',
        event: 'Throwball Championship',
        date: '2020',
        achievement: 'Team participation and excellence',
        description: 'Recognised for contribution and leadership in the throwball championship circuit.',
        highlights: ['Team participation', 'Leadership', 'Match discipline'],
      },
      {
        id: 'throwball-certificate-2',
        title: 'Throwball Certificate 02',
        image: '/certificates/sports/throwball/DocScanner Aug 1, 2026 7-21 PM_1(12).jpg',
        issuer: 'School Sports Committee',
        event: 'Throwball Meet',
        date: '2021',
        achievement: 'District-level recognition',
        description: 'Awarded for strong team performance and sustained effort during the district meet.',
        highlights: ['District-level recognition', 'Team coordination', 'Competitive spirit'],
      },
      {
        id: 'throwball-certificate-3',
        title: 'Throwball Certificate 03',
        image: '/certificates/sports/throwball/DocScanner Aug 1, 2026 7-21 PM_1(16).jpg',
        issuer: 'School Sports Committee',
        event: 'Inter-School League',
        date: '2022',
        achievement: 'Consistent performer',
        description: 'Celebrated for consistency and team-first play during the inter-school league.',
        highlights: ['Consistent performance', 'Game awareness', 'Team-first play'],
      },
      {
        id: 'throwball-certificate-4',
        title: 'Throwball Certificate 04',
        image: '/certificates/sports/throwball/DocScanner Aug 1, 2026 7-21 PM_1(9).jpg',
        issuer: 'School Sports Committee',
        event: 'Throwball Tournament',
        date: '2023',
        achievement: 'Leadership and participation',
        description: 'Recognised for leadership and participation during the throwball tournament.',
        highlights: ['Leadership', 'Participation', 'Sportsmanship'],
      },
    ],
    gallery: [],
  },
  {
    id: 'basketball',
    name: 'Basketball',
    discipline: 'Captain',
    heroImage:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzdyCcG-nbcvdfSIE3y5KKudCcX8u7vJiwx6KSY0ABLM7QzyziWUJT-aY&s=10',
        accent: '#F97316',
    intro:
      'Leading a team on the hardwood sharpened two skills I use every day as an engineer: reading the floor, and making the pass before the defense expects it.',
    startDate: '2018',
    achievements: [
      {
        title: 'Team Captain',
        description: 'Led the college squad to a regional semifinal, 2023',
        icon: 'Users',
      },
      {
        title: 'Regional Semifinalist',
        description: 'South Zone Inter-College Basketball, 2023',
        icon: 'Trophy',
      },
      {
        title: 'MVP — College Tournament',
        description: 'Awarded most valuable player, 2022 intramural cup',
        icon: 'Star',
      },
    ],
    timeline: [
      {
        event: 'South Zone Inter-College Basketball',
        level: 'Regional',
        result: 'Semifinalist · Captain',
        date: '2023',
      },
      {
        event: 'College Intramural Cup',
        level: 'Institutional',
        result: 'Champions · MVP',
        date: '2022',
      },
      {
        event: 'City League Division 2',
        level: 'City',
        result: 'Quarterfinals',
        date: '2021',
      },
    ],
    certificates: [
      {
        id: 'taluk-level-sports-meet-2017-18',
        title: 'Taluk Level Sports Meet (2017–18)',
        image: '/certificates/sports/Basketball/2017.jpeg',
        issuer: 'Government of Karnataka – Bengaluru Urban District Panchayat Sports Association',
        event: 'Taluk Level Sports Meet',
        date: '2017–18',
        achievement: '2nd Place at Taluk Level Sports Meet (under my captaincy)',
        description:
          'Secured 2nd Place for my team at the Taluk Level Sports Meet under my captaincy. Qualified for the Taluk Level from the Zonal competition and represented my school in the final tournament.',
        highlights: [
          '2nd Place at the Taluk Level Sports Meet under my captaincy',
          'Advanced to Taluk Level after Zonal Level qualification',
          'Represented my school at the Taluk tournament stage',
          'Led in-game decision-making and team coordination as captain',
        ],
      },
      {
        id: 'taluk-level-sports-meet-2018-19',
        title: 'Taluk Level Sports Meet (2018–19)',
        image: '/certificates/sports/Basketball/18- 19.jpeg',
        issuer: 'Government of Karnataka – Bengaluru Urban District Panchayat Sports Association',
        event: 'Taluk Level Sports Meet',
        date: '2018–19',
        achievement: '2nd Place at Taluk Level Sports Meet under my captaincy',
        description:
          'Secured 2nd Place for my team at the Taluk Level Sports Meet under my captaincy. Qualified for the Taluk Level from the Zonal competition and represented my school in the final tournament.',
        highlights: [
          '2nd Place at the Taluk Level Sports Meet under my captaincy',
          'Advanced to Taluk Level after Zonal Level qualification',
          'Represented my school at the Taluk tournament stage',
          'Led in-game decision-making and team coordination as captain',
        ],
      },

      {
      id: 'annual-sports-meet-basketball-2018-19',
      title: 'Annual Sports Meet – Basketball (2018–19)',
      image: '/certificates/sports/Basketball/2018-19.jpeg',
  issuer: 'Sree Cauvery School, Double Road, Indiranagar, Bengaluru',
  event: 'Annual Sports Meet – Basketball',
  date: '2018–19',
  achievement: 'Second Place in Basketball',
  description:
    'Awarded Second Place in the Basketball event at the Annual Sports Meet 2018–19, representing Sree Cauvery School and demonstrating teamwork, discipline, and competitive sportsmanship.',
  highlights: [
    'Secured 2nd Place in the Basketball event',
    'Represented Sree Cauvery School at the Annual Sports Meet',
    'Demonstrated teamwork, discipline, and sportsmanship',
    'Strengthened game strategy and on-court decision-making',
  ],
},
{
        id: 'taluk-level-sports-meet-2018-19',
        title: 'Taluk Level Sports Meet (2019–20)',
        image: '/certificates/sports/Basketball/2019.jpeg',
        issuer: 'Government of Karnataka – Bengaluru Urban District Panchayat Sports Association',
        event: 'Taluk Level Sports Meet',
        date: '2019–20',
        achievement: '1st Place at Taluk Level Sports Meet under my captaincy',
        description:
          'Secured 1st Place for my team at the Taluk Level Sports Meet under my captaincy. Qualified for the Taluk Level from the Zonal competition and represented my school in the final tournament.',
        highlights: [
          '1st Place at the Taluk Level Sports Meet under my captaincy',
          'Advanced to Taluk Level after Zonal Level qualification',
          'Represented my school at the Taluk tournament stage',
          'Led in-game decision-making and team coordination as captain',
        ],
      },
     {
      id: 'annual-sports-meet-basketball-2018-19',
      title: 'Annual Sports Meet – Basketball (2019–120)',
      image: '/certificates/sports/Basketball/2019-20.jpeg',
  issuer: 'Sree Cauvery School, Double Road, Indiranagar, Bengaluru',
  event: 'Annual Sports Meet – Basketball',
  date: '2019–20',
  achievement: 'First place in Basketball',
  description:
    'Awarded First Place in the Basketball event at the Annual Sports Meet 2019–20, representing Sree Cauvery School and demonstrating teamwork, discipline, and competitive sportsmanship.',
  highlights: [
    'Secured 1st Place in the Basketball event',
    'Represented Sree Cauvery School at the Annual Sports Meet',
    'Demonstrated teamwork, discipline, and sportsmanship',
    'Strengthened game strategy and on-court decision-making',
  ],
},
], 
    gallery: [
      'https://images.pexels.com/photos/3067631/pexels-photo-3067631.jpeg?auto=compress&cs=tinysrgb&w=900&h=650&dpr=2',
      'https://images.pexels.com/photos/2167673/pexels-photo-2167673.jpeg?auto=compress&cs=tinysrgb&w=900&h=650&dpr=2',
      'https://images.pexels.com/photos/2148794/pexels-photo-2148794.jpeg?auto=compress&cs=tinysrgb&w=900&h=650&dpr=2',
    ],
  },
  {
    id: 'cricket',
    name: 'Cricket',
    discipline: 'All-rounder · Right-arm Medium',
    heroImage:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXO_LuimUkHNBOrBMZRGvA8Qc7Da2s32hD9UjgX2qpA&s=10',
        accent: '#10B981',
    intro:
      'Cricket is a game of patience and timing — qualities that map surprisingly well to debugging a stubborn component at 2 a.m.',
    startDate: '2016',
    achievements: [
      {
        title: 'District Quarterfinalist',
        description: 'Represented the district U-19 squad, 2019',
        icon: 'Trophy',
      },
      {
        title: 'Best Batsman — College',
        description: 'Highest run-scorer in the 2020 college season',
        icon: 'Award',
      },
    ],
    timeline: [
      {
        event: 'District U-19 Tournament',
        level: 'District',
        result: 'Quarterfinals · All-rounder',
        date: '2019',
      },
      {
        event: 'College Premier League',
        level: 'Institutional',
        result: 'Best Batsman',
        date: '2020',
      },
    ],
    certificates: [
      {
        id: 'cricket-certificate-1',
        title: 'Certificate',
        image: '/certificates/sports/Crick/DocScanner Aug 1, 2026 7-21 PM_1(13).jpg',
        issuer: 'Sports Committee',
        event: 'Cricket',
        date: '2019',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
      {
        id: 'cricket-certificate-2',
        title: 'Certificate',
        image: '/certificates/sports/Crick/DocScanner Aug 1, 2026 7-21 PM_1(15).jpg',
        issuer: 'Sports Committee',
        event: 'Cricket',
        date: '2020',
        achievement: 'Certificate',
        description: '',
        highlights: [],
      },
    ],
    gallery: [
      'https://images.pexels.com/photos/1666222/pexels-photo-1666222.jpeg?auto=compress&cs=tinysrgb&w=900&h=650&dpr=2',
      'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=900&h=650&dpr=2',
    ],
  },
{
    id: 'Badminton',
    name: 'Badminton',
    discipline: 'Rackets · Singles & Doubles',
    heroImage:
    'https://images.squarespace-cdn.com/content/v1/5bd969d6506fbe4b1a0f5e6b/1613556027347-TNYY9VEX2PRTODIHEP9J/shutterstock_1592944909+-+Badminton+racket+and+shuttlecock+in+motion_1200px+JPEG.jpg',
        accent: '#F59E0B',
    intro:
      'Badminton taught me precision under pressure — reading the shuttle early, adjusting footwork instantly, and staying calm even when the rallies turn fast.',
    startDate: '2017',
    achievements: [
      {
        title: 'Competition Podium — Singles',
        description:
          'Earned a podium finish through focused match play and consistent practice (2017–18).',
        icon: 'Medal',
      },
      {
        title: 'Doubles Confidence',
        description:
          'Built teamwork and court coverage that helped me stay composed during fast exchanges.',
        icon: 'Users',
      },
      {
        title: 'Serve & Net Craft',
        description:
          'Developed sharp serves and aggressive net transitions to control rally tempo.',
        icon: 'Flag',
      },
    ],
    timeline: [
      {
        event: 'Annual Sports Meet — Badminton',
        level: 'Institutional',
        result: 'Second Place (Singles/Doubles)',
        date: '2017–18',
      },
      {
        event: 'Annual Sports Meet — Badminton',
        level: 'Institutional',
        result: 'Podium Finish (match play focus)',
        date: '2018–19',
      },
      {
        event: 'Annual Sports Meet — Badminton',
        level: 'Institutional',
        result: 'Improved Tournament Performance',
        date: '2019–20',
      },
    ],
    certificates: [
      {
        id: 'badminton-annual-sports-meet-17-18',
        title: 'Annual Sports Meet – Badminton (2017–18)',
        image: '/certificates/sports/Badminton/17-18.jpeg',
        issuer: 'Sree Cauvery School, Double Road, Indiranagar, Bengaluru',
        event: 'Annual Sports Meet – Badminton',
        date: '2017–18',
        achievement: 'Second Place',
        description:
          'Secured Second Place in the Badminton event at the Annual Sports Meet (2017–18), showcasing consistency, quick reflexes, and match-ready focus.',
        highlights: [
          'Second Place in Badminton at the Annual Sports Meet',
          'Improved reaction time during rapid rallies',
          'Better serve accuracy and net execution',
          'Learned momentum control in tie-break situations',
        ],
      },
      {
        id: 'badminton-annual-sports-meet-18-19',
        title: 'Annual Sports Meet – Badminton (2018–19)',
        image: '/certificates/sports/Badminton/18-19.jpeg',
        issuer: 'Sree Cauvery School, Double Road, Indiranagar, Bengaluru',
        event: 'Annual Sports Meet – Badminton',
        date: '2018–19',
        achievement: 'Participation & Performance Upgrade',
        description:
          'Returned stronger for the next season—refined footwork patterns and improved rally endurance to stay competitive through the bracket.',
        highlights: [
          'Refined footwork for faster transitions',
          'Improved defensive retrieval under pressure',
          'More controlled shot selection during rallies',
          'Stronger doubles coordination and court coverage',
        ],
      },
      {
        id: 'badminton-annual-sports-meet-19-20',
        title: 'Annual Sports Meet – Badminton (2019–20)',
        image: '/certificates/sports/Badminton/2019-20.jpeg',
        issuer: 'Sree Cauvery School, Double Road, Indiranagar, Bengaluru',
        event: 'Annual Sports Meet – Badminton',
        date: '2019–20',
        achievement: 'Consistent Tournament Performer',
        description:
          'Maintained consistent performance across rounds by tightening technique and focusing on high-percentage shot play.',
        highlights: [
          'Consistent performance across multiple rounds',
          'Improved shot placement (depth + angles)',
          'Better endurance during long rallies',
          'Refined serve strategy for early advantage',
        ],
      },
    ],
    gallery: [
      '/certificates/sports/Badminton/17-18.jpeg',
      '/certificates/sports/Badminton/18-19.jpeg',
      '/certificates/sports/Badminton/2019-20.jpeg',
    ],
  },
];
