export interface JourneyMilestone {
  year: string;
  chapter: string;
  title: string;
  description: string;
  marker: 'start' | 'milestone' | 'achievement' | 'turning' | 'current';
  icon: string;
}

export const journey: JourneyMilestone[] = [
  {
    year: '2015',
    chapter: 'Chapter One',
    title: 'Finding Balance',
    description:
      'My journey began with Yoga. Long before I discovered technology, it taught me discipline, patience, consistency, and the importance of showing up every single day. Those lessons became the foundation of everything that followed.',
    marker: 'start',
    icon: 'Leaf',
  },
  {
    year: '2017',
    chapter: 'Chapter Two',
    title: 'Answering the Call',
    description:
      'I joined the National Cadet Corps (NCC), earned my A Certificate, and rose to the rank of Corporal. It was my first experience of structured leadership, teamwork, and responsibility—lessons that continue to shape the way I approach every challenge.',
    marker: 'milestone',
    icon: 'Shield',
  },
  {
    year: '2018',
    chapter: 'Chapter Three',
    title: 'One Step Closer',
    description:
      'During my NCC journey, I qualified for the Pre-IGC RDC-I Camp, moving one step closer to the prestigious Republic Day Camp selection process. It challenged my endurance, strengthened my confidence, and reinforced the value of perseverance.',
    marker: 'achievement',
    icon: 'Flag',
  },
  {
    year: '2021',
    chapter: 'Chapter Four',
    title: 'Leading from the Front',
    description:
      'I was entrusted with the role of Sports Captain while continuing my NCC journey. Leading teams across basketball, badminton, athletics, throwball, and cricket taught me that leadership is earned through action, discipline, and consistency.',
    marker: 'milestone',
    icon: 'Trophy',
  },
  {
    year: '2022',
    chapter: 'Chapter Five',
    title: 'Beyond the Game',
    description:
      'Sports became another classroom. Winning 1st Place in Taluk Basketball and 2nd Place in Taluk Badminton reminded me that preparation, teamwork, and resilience create lasting success. Every competition strengthened my mindset both on and off the field.',
    marker: 'achievement',
    icon: 'Medal',
  },
  {
    year: '2021–2023',
    chapter: 'Chapter Six',
    title: 'Growing Through Service',
    description:
      'I completed my NCC B Certificate and earned the rank of Sergeant. Every camp, parade, and challenge strengthened my resilience, teamwork, confidence, and ability to perform under pressure.',
    marker: 'achievement',
    icon: 'Award',
  },
  {
    year: '2023',
    chapter: 'Chapter Seven',
    title: 'Hello, Engineering',
    description:
      'I began my Computer Science Engineering journey. Writing my first lines of code opened an entirely new world where creativity and technology could come together to solve meaningful problems. That moment sparked my passion for building digital experiences.',
    marker: 'turning',
    icon: 'Code',
  },
  {
    year: '2024',
    chapter: 'Chapter Eight',
    title: 'Building Beyond the Classroom',
    description:
      'I started creating real-world projects while exploring UI/UX design, full-stack development, and product thinking. Every project became an opportunity to turn ideas into impactful digital solutions.',
    marker: 'milestone',
    icon: 'Rocket',
  },
  {
    year: '2025',
    chapter: 'Chapter Nine',
    title: 'Stepping Forward',
    description:
      'I completed my NCC C Certificate with the rank of Sergeant, participated in hackathons, and became the Digital Detectives Club Coordinator. These experiences strengthened my leadership, collaboration, and technical confidence.',
    marker: 'achievement',
    icon: 'ShieldCheck',
  },
  {
    year: '2026',
    chapter: 'Chapter Ten',
    title: "Creating What's Next",
    description:
      "Today, I'm a final-year Computer Science Engineering student building impactful projects, freelancing in UI/UX and visual design, and exploring AI, cybersecurity, and product development. Every challenge continues to shape the next chapter of my journey.",
    marker: 'current',
    icon: 'Sparkles',
  },
];

