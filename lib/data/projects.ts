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
  wireframe?: string;
  featured: boolean;
  /** Pexels image URL used for hero preview + browser mockup */
  previewImage: string;
  /** Optional separate hero image for the Case Study modal */
  caseStudyHero?: string;
  galleryImages: string[];
  features: ProjectFeature[];
  architecture: string;
  howItWorks: string;
  /** Optional accent color hex for visual identity */
  accent: string;

  /** Demo images used only as placeholders when real gallery screenshots are missing */
  galleryDemoImages?: string[];
}


export const projects: Project[] = [
  {
    id: 'AgriChain',
    title: 'AgriChain',
    tagline: 'Blockchain-Powered Agricultural Supply Chain',
    description:
      'A full-stack web application that demonstrates blockchain-inspired agricultural supply chain management. AgriChain enables transparent product traceability, secure record management, and end-to-end tracking from farmers to consumers through role-based workflows and blockchain simulation.',
    year: '2026',
    category: 'Blockchain · Supply Chain',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js'],
    github: 'https://github.com/jashmi29/AgriChain',
    demo: 'https://agrichain-nu.vercel.app/',
    featured: true,
    previewImage:
      '/Project/AgriChain/image.png',
    caseStudyHero: '/Project/AgriChain/img1.png',
    galleryImages: [
      '/Project/AgriChain/img2.png',
      '/Project/AgriChain/img4.png',
    ],
    galleryDemoImages: [
      '/Project/AgriChain/img3.png',
      '/Project/AgriChain/img5.png',
      '/Project/AgriChain/img7.png',
    ],

    features: [
      {
        title: 'End-to-End Traceability',
        description:
          'Track agricultural products from farm to consumer through a transparent and traceable supply chain.',
      },
      {
        title: 'Secure Record Management',
        description:
          'Simulate immutable transaction records to demonstrate secure and auditable supply-chain workflows.',
      },
      {
        title: 'Role-Based Access',
        description:
          'Dedicated dashboards and permissions for farmers, distributors, retailers, and consumers.',
      },
      {
        title: 'Responsive Full-Stack Experience',
        description:
          'Built with a modern responsive interface focused on usability across desktop and mobile devices.',
      },
    ],
    architecture:
      'Built using Next.js, TypeScript, Tailwind CSS, Node.js, and Express.js. The application simulates blockchain-based supply chain workflows with role-based access control, enabling transparent product tracking from farm to consumer.',
    howItWorks:
      'Users interact with the platform based on their assigned role. Each stage of the supply chain—from product registration to delivery—is recorded through a blockchain-inspired workflow, creating a transparent and traceable history for every product.',
    accent: '#22C55E',
  },
  {
    id: 'fablefox',
    title: 'FableFox',
    tagline: 'A Modern Virtual Library Platform',
    description:
      'A full-stack digital library platform that enables users to discover, organize, and explore books through an intuitive interface. FableFox combines a clean reading experience with responsive design, efficient book management, and a seamless browsing journey for modern readers.',
    year: '2026',
    category: 'EdTech · Digital Library',
    tech: ['React', 'Vite', 'Node.js', 'Express.js', 'CSS'],
    github: 'https://github.com/jashmi29/FableFox-The-Virtual-Library',
    demo: 'https://fable-fox-the-virtual-library.vercel.app/',
    wireframe: '/Project/FableFox/wireframe.pdf',
    featured: true,
    previewImage:'/Project/FableFox/1.png',
    caseStudyHero: '/Project/FableFox/2.png',
    galleryImages: [
      '/Project/FableFox/3.png',
      '/Project/FableFox/4.png',
      '/Project/FableFox/5.png', 
     ],
    features: [
      {
        title: 'Smart Book Discovery',
        description:
          'Find stories quickly with an intuitive browse flow and clear organization for modern learning.',
      },
      {
        title: 'Organize & Manage Collections',
        description:
          'Efficient book handling so readers can sort, explore, and keep their library organized.',
      },
      {
        title: 'Clean Reading Experience',
        description:
          'A focused UI designed to keep attention on content with responsive, readable layouts.',
      },
      {
        title: 'Seamless Responsive Browsing',
        description:
          'A polished experience across devices with consistent spacing, interactions, and smooth UI behavior.',
      },
    ],
    architecture:
      'Built with React and Vite for a fast frontend experience, and Node.js with Express.js for backend capabilities. CSS provides a clean, premium, responsive UI foundation for the reading and browsing journey.',
    howItWorks:
      'Users browse and explore books using the virtual library interface. Book data is managed through the application’s backend services, enabling smooth discovery and organization with a responsive front-end experience.',
    accent: '#F97316',
  },
  {
    id: 'hungry-chef',
    title: 'Hungry Chef',
    tagline: 'Recipes made simple',
    description:
      'A responsive recipe website for exploring recipes, ingredients, cooking instructions, and YouTube tutorials.',
    year: '2026',
    category: 'Product · Frontend',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/jashmi29/WEBSITE_CULLINARY',
    demo: 'https://website-cullinary.vercel.app/',
    featured: false,
    previewImage:
      '/Project/HungryChef/1.png',
    caseStudyHero: '/Project/HungryChef/4.png',
    galleryImages: [
      '/Project/HungryChef/2.png',
      '/Project/HungryChef/3.png',
    ],
    features: [
      {
        title: 'Explore Recipes',
        description:
          'Browse a diverse collection of recipes presented with appetizing visuals and clear organization.',
      },
      {
        title: 'Ingredient Lists',
        description:
          'Every recipe includes a clean, organized list of ingredients so nothing is missed before you cook.',
      },
      {
        title: 'Step-by-Step Instructions',
        description:
          'Detailed cooking instructions guide you through each dish from prep to plating.',
      },
      {
        title: 'YouTube Tutorials',
        description:
          'Embedded video tutorials offer visual guidance alongside written steps for every recipe.',
      },
    ],
    architecture:
      'Built with semantic HTML5, responsive CSS3 styling, and vanilla JavaScript for interactivity — powering recipe browsing, filtering, and the interactive card experience.',
    howItWorks:
      'Users browse the recipe gallery, open a recipe card to view its ingredients and step-by-step instructions, and can follow along with embedded YouTube tutorials for visual guidance.',
    accent: '#EF4444',
  },
];
