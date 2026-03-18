import dotenv from 'dotenv';
import connectDB from './config/database';
import Service from './models/Service';
import Project from './models/Project';
import Job from './models/Job';

dotenv.config();

const services = [
  {
    title: 'Mobility Platforms',
    description: 'Developing large-scale platforms for transit and mobility operations, helping users move smarter and faster.',
    icon: 'Globe',
  },
  {
    title: 'Retail & POS Solutions',
    description: 'Creating fast, clear point-of-sale interfaces and systems built for real-world retail workflows.',
    icon: 'Smartphone',
  },
  {
    title: 'Web & API Development',
    description: 'Building modern, high-performance web applications and robust APIs that scale with your business.',
    icon: 'Code2',
  },
  {
    title: 'UX/UI Design',
    description: 'Human-centered design that transforms complex requirements into intuitive and beautiful interfaces.',
    icon: 'Palette',
  },
  {
    title: 'Branding',
    description: 'Designing warm, safe, and effortless brand experiences that resonate with your target audience.',
    icon: 'Heart',
  },
  {
    title: 'System Integration',
    description: 'Building scalable architectures that grow with business needs and integrate seamlessly.',
    icon: 'GitMerge',
  },
];

const projects = [
  {
    title: 'City Bus Mobility Platform',
    description: 'A modern mobility platform for riders, operators, and city-scale performance handling millions of users.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Maps API'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600',
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
  },
  {
    title: 'Pet Care Service App',
    description: 'Service booking and care plans designed to feel warm, safe, and effortless for pet owners.',
    technologies: ['React Native', 'TypeScript', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600',
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
  },
  {
    title: 'NextGen POS System',
    description: 'A fast, clear point-of-sale interface built for real-world retail workflows and inventory management.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
  },
  {
    title: 'Real-time Transit Tracker',
    description: 'A real-time bus tracking system for 500+ routes offering predictive ETA and live maps.',
    technologies: ['Vue.js', 'Go', 'WebSockets', 'Redis', 'Docker'],
    image: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=600',
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
  },
];

const jobs = [
  {
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote / Hybrid',
    description: 'We are looking for an experienced full-stack developer to join our core engineering team and build world-class digital products for our clients.',
    requirements: [
      '5+ years of experience with React and Node.js',
      'Proficiency in TypeScript and modern JavaScript',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
      'Strong understanding of RESTful APIs and microservices',
      'Experience with SQL and NoSQL databases',
      'Excellent problem-solving and communication skills',
    ],
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'On-site (Bangalore)',
    description: 'Join our design team to create beautiful and user-friendly interfaces. You will collaborate closely with developers and product managers to deliver exceptional user experiences.',
    requirements: [
      '3+ years of UI/UX design experience',
      'Proficiency in Figma and Adobe Creative Suite',
      'Strong portfolio demonstrating end-to-end design process',
      'Experience with design systems and component libraries',
      'Understanding of accessibility and inclusive design',
      'Ability to conduct user research and usability testing',
    ],
  },
  {
    title: 'DevOps / Cloud Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    description: 'We need a skilled DevOps engineer to manage and improve our cloud infrastructure, CI/CD pipelines, and help teams deploy with confidence.',
    requirements: [
      '4+ years of DevOps or cloud engineering experience',
      'AWS Certified Solutions Architect or equivalent',
      'Experience with Kubernetes, Docker, and Terraform',
      'Proficiency in CI/CD tools (GitHub Actions, Jenkins)',
      'Strong scripting skills (Python, Bash)',
      'Experience with monitoring tools (Prometheus, Grafana)',
    ],
  },
  {
    title: 'Mobile App Developer (React Native)',
    department: 'Engineering',
    location: 'Remote / Hybrid',
    description: 'Build performant, beautiful cross-platform mobile applications for our clients using React Native and modern mobile development practices.',
    requirements: [
      '3+ years of React Native development experience',
      'Published apps on App Store and Google Play',
      'Experience with native modules and third-party integrations',
      'Proficiency in TypeScript and modern React patterns',
      'Understanding of mobile UI/UX best practices',
      'Experience with app performance profiling and optimization',
    ],
  },
  {
    title: 'Business Development Manager',
    department: 'Sales',
    location: 'On-site (Mumbai)',
    description: 'Drive business growth by identifying new opportunities, building strategic partnerships, and managing key client relationships.',
    requirements: [
      '5+ years of B2B sales experience in IT/technology sector',
      'Proven track record of meeting and exceeding revenue targets',
      'Strong network in the technology industry',
      'Excellent negotiation and presentation skills',
      'Experience with CRM tools and sales processes',
      "Bachelor's degree in Business, Marketing, or related field",
    ],
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    description: 'Lead the strategy, roadmap, and feature definition for our flagship software products. Work closely with engineering and design to deliver high-quality solutions.',
    requirements: [
      '4+ years of product management experience in B2B software',
      'Experience working in Agile/Scrum environments',
      'Strong analytical and problem-solving skills',
      'Excellent cross-functional leadership abilities',
      'Ability to translate complex business needs into clear user stories',
    ],
  },
  {
    title: 'Digital Marketing Strategist',
    department: 'Marketing',
    location: 'Hybrid (London / Remote)',
    description: 'Drive user acquisition and brand awareness through data-driven digital marketing campaigns across social, search, and content channels.',
    requirements: [
      '3+ years of experience in B2B digital marketing',
      'Expertise in SEO, SEM, and performance marketing',
      'Strong copywriting and content strategy skills',
      'Experience with analytics platforms (Google Analytics, Mixpanel)',
      'Creative mindset with a focus on metrics and ROI',
    ],
  },
];

const seed = async () => {
  try {
    await connectDB();

    await Service.deleteMany({});
    await Project.deleteMany({});
    await Job.deleteMany({});

    await Service.insertMany(services);
    await Project.insertMany(projects);
    await Job.insertMany(jobs);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
