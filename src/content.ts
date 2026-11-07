/**
 * Edit this file to update portfolio copy, metrics, skills, projects, and links.
 * Components read from here — no need to hunt through JSX.
 */

/** Public-folder URL. `BASE_URL` is `/` in dev and `/jaweed-portfolio/` in production. */
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const site = {
  name: 'Jaweed',
  location: 'Dhaka · Bangladesh',
  availability: 'Open to remote freelance, internships & junior roles',
  email: 'jaweedbin@gmail.com',
  socials: {
    github: 'https://github.com/Ja-we-ed',
    linkedin: 'https://www.linkedin.com/in/jaweed-dev',
    x: 'https://x.com/Ja_we_ed',
  },
} as const

export const hero = {
  eyebrow: 'CSE · Software Engineering',
  headline: 'Building software that earns trust.',
  subhead:
    'I am Jaweed, a Computer Science student learning to ship clear, reliable systems — from first sketch to working product.',
  primaryCta: { label: 'View work', href: '#projects' },
  secondaryCta: { label: 'Contact', href: '#contact' },
  metrics: [
    { value: '04+', label: 'Years coding' },
    { value: '09', label: 'Builds this year' },
    { value: 'ULAB', label: 'CSE · Dhaka' },
  ],
} as const

export const about = {
  eyebrow: 'Focus',
  title: 'How I approach engineering.',
  philosophy:
    'Not a list of buzzwords. A working habit: understand the problem, ship the smallest honest version, then tighten until it feels inevitable.',
  chips: [
    'Clean interfaces',
    'Readable systems',
    'Fast feedback loops',
    'Product sense',
    'Honest shipping',
  ],
} as const

export const pipeline = {
  eyebrow: 'Launch circuit',
  title: 'From spark to signal.',
  subtitle:
    'A working chain I keep returning to — not a rigid waterfall, a loop that gets sharper every pass.',
  nodes: [
    {
      id: 'idea',
      label: 'Idea',
      detail: 'Find the real problem',
      body: 'Start with the person who will actually use it — a teacher taking attendance, a student counting taka — before a single line of code.',
      image: publicAsset('circuit/idea.webp'),
      imageAlt: 'A painted tea stall at Dhaka University TSC, where campus ideas often start',
    },
    {
      id: 'design',
      label: 'Design',
      detail: 'Shape the smallest honest UI',
      body: 'Sketch the smallest version that still feels clear. Paper first, pixels second, so the interface does not outrun the problem.',
      image: publicAsset('circuit/design.webp'),
      imageAlt: 'A hand drawing numbered mobile wireframes on paper',
    },
    {
      id: 'build',
      label: 'Build',
      detail: 'Ship readable systems',
      body: 'Write code another student could open tomorrow and follow. Names that mean something, structure that stays calm under change.',
      image: publicAsset('circuit/build.webp'),
      imageAlt: 'A laptop showing code on a bright desk beside a second monitor',
    },
    {
      id: 'ship',
      label: 'Ship',
      detail: 'Put it in front of people',
      body: 'A build that only I can run is still a draft. The loop closes when someone else can click, compile, or hold it.',
      image: publicAsset('circuit/ship.webp'),
      imageAlt: 'A straddle carrier moving shipping containers at the Port of Chittagong',
    },
    {
      id: 'grow',
      label: 'Grow',
      detail: 'Learn, refine, expand',
      body: 'Keep what worked, cut what did not, and take the next tighter pass. Every circuit should leave the last one looking a little naive.',
      image: publicAsset('circuit/grow.webp'),
      imageAlt: 'Terraced tea gardens in Sreemangal, Bangladesh',
    },
  ],
  outcome: 'Live product',
} as const

export type SkillLevel = 'Learning' | 'Comfortable' | 'Building with'
export type SkillCategory = 'Languages' | 'Frameworks' | 'Tools'

export const skillFilters = ['All', 'Languages', 'Frameworks', 'Tools'] as const
export type SkillFilter = (typeof skillFilters)[number]

export type SkillItem = {
  name: string
  category: SkillCategory
  level: SkillLevel
  use: string
}

export const skills = {
  eyebrow: 'Inventory',
  title: 'What I actually reach for.',
  subtitle:
    'Not a scoreboard of fake percentages — honest notes on how I use each tool in class and on side builds.',
  legend: [
    { level: 'Building with' as SkillLevel, meaning: 'Shipping something with it this year' },
    { level: 'Comfortable' as SkillLevel, meaning: 'Used it enough to be useful' },
    { level: 'Learning' as SkillLevel, meaning: 'In class, or just getting started' },
  ],
  items: [
    {
      name: 'C',
      category: 'Languages' as SkillCategory,
      level: 'Building with' as SkillLevel,
      use: 'Intro to Programming this semester — structs, file I/O, and Library Desk.',
    },
    {
      name: 'Python',
      category: 'Languages' as SkillCategory,
      level: 'Building with' as SkillLevel,
      use: 'Class scripts and the Bangla digit recognizer waiting next in line.',
    },
    {
      name: 'JavaScript',
      category: 'Languages' as SkillCategory,
      level: 'Comfortable' as SkillLevel,
      use: 'The Structure Lab visualizer and small campus web experiments.',
    },
    {
      name: 'TypeScript',
      category: 'Languages' as SkillCategory,
      level: 'Learning' as SkillLevel,
      use: 'Typing this portfolio and the React apps I am growing into.',
    },
    {
      name: 'SQL',
      category: 'Languages' as SkillCategory,
      level: 'Learning' as SkillLevel,
      use: 'Modeling tables for Campus Attendance Desk — queries, not dashboards yet.',
    },
    {
      name: 'React',
      category: 'Frameworks' as SkillCategory,
      level: 'Building with' as SkillLevel,
      use: 'This site, Attendance Desk, and the next web cards in the pipeline.',
    },
    {
      name: 'Node.js',
      category: 'Frameworks' as SkillCategory,
      level: 'Learning' as SkillLevel,
      use: 'Small backends so a browser app has somewhere honest to talk to.',
    },
    {
      name: 'Tailwind CSS',
      category: 'Frameworks' as SkillCategory,
      level: 'Building with' as SkillLevel,
      use: 'Laying out this portfolio and keeping UI consistent without a design system.',
    },
    {
      name: 'Vite',
      category: 'Frameworks' as SkillCategory,
      level: 'Building with' as SkillLevel,
      use: 'Fast local tooling whenever a web idea needs to become a running page.',
    },
    {
      name: 'Express',
      category: 'Frameworks' as SkillCategory,
      level: 'Learning' as SkillLevel,
      use: 'REST routes for class projects that need more than a static file.',
    },
    {
      name: 'Git',
      category: 'Tools' as SkillCategory,
      level: 'Comfortable' as SkillLevel,
      use: 'Versioning every build so I can undo a bad night without panic.',
    },
    {
      name: 'Linux',
      category: 'Tools' as SkillCategory,
      level: 'Learning' as SkillLevel,
      use: 'Campus lab machines and the command line I am still making a habit.',
    },
    {
      name: 'VS Code / Cursor',
      category: 'Tools' as SkillCategory,
      level: 'Building with' as SkillLevel,
      use: 'The editor I live in — writing, running, and fixing in the same place.',
    },
    {
      name: 'Figma',
      category: 'Tools' as SkillCategory,
      level: 'Learning' as SkillLevel,
      use: 'Wiring the smallest honest UI on paper-turned-pixels before I code it.',
    },
    {
      name: 'Postman',
      category: 'Tools' as SkillCategory,
      level: 'Learning' as SkillLevel,
      use: 'Checking the APIs I write or consume before I trust the frontend.',
    },
  ] satisfies SkillItem[],
}

/** Flip status to "Shipped" once a build is actually done and linkable. */
export type ProjectStatus = 'Building' | 'Next up' | 'Shipped'

export type ProjectCategory = 'Hardware' | 'Web' | 'Mobile' | 'ML' | 'Fundamentals'

export type ProjectItem = {
  id: string
  role: string
  title: string
  description: string
  tags: string[]
  status: ProjectStatus
  category: ProjectCategory
  image: string
  imageAlt: string
  /** Empty string = no live demo / GitHub yet. UI shows a disabled "Coming soon". */
  href: string
}

export const projectFilters = ['All', 'Hardware', 'Web', 'Mobile', 'ML', 'Fundamentals'] as const
export type ProjectFilter = (typeof projectFilters)[number]

export const projects = {
  eyebrow: 'In the pipeline',
  title: "Projects I'm building this year.",
  subtitle:
    'Coursework and campus builds I can take from a brief to something that runs — including the C and Data Structures work I am doing this semester. A card moves to Shipped only when it is actually finished.',
  items: [
    {
      id: '01',
      role: 'Hardware · Robotics',
      title: 'Line-Follower Robot',
      description:
        'A classroom robot that follows a painted track and steers around obstacles so first-year labs can see sensors and motors working together.',
      tags: ['Arduino', 'C++', 'IR sensors', 'Ultrasonic'],
      status: 'Building' as ProjectStatus,
      category: 'Hardware' as ProjectCategory,
      image: publicAsset('projects/line-follower.webp'),
      imageAlt: 'Arduino Uno and breadboard used to prototype a line-follower robot',
      href: '',
    },
    {
      id: '02',
      role: 'IoT · Embedded',
      title: 'ESP32 Smart Planter',
      description:
        'Watches soil moisture and waters campus plants only when they need it — less waste, fewer wilted pots.',
      tags: ['ESP32', 'Arduino', 'Sensors', 'MQTT'],
      status: 'Building' as ProjectStatus,
      category: 'Hardware' as ProjectCategory,
      image: publicAsset('projects/smart-planter.webp'),
      imageAlt: 'Potted plants on a Bangladeshi rooftop garden, standing in for an IoT planter',
      href: '',
    },
    {
      id: '03',
      role: 'Full-stack · Web',
      title: 'Campus Attendance Desk',
      description:
        'Lets teachers mark who is in class from a browser, so paper registers and proxy attendance stop being the default.',
      tags: ['React', 'Node.js', 'Express', 'MySQL'],
      status: 'Building' as ProjectStatus,
      category: 'Web' as ProjectCategory,
      image: publicAsset('projects/attendance.webp'),
      imageAlt: 'Tree-lined walkway at the University of Liberal Arts Bangladesh campus in Dhaka',
      href: '',
    },
    {
      id: '04',
      role: 'Machine Learning · Coursework',
      title: 'Bangla Digit Recognizer',
      description:
        'Reads handwritten Bangla digits from a photo so forms and exam scripts can be digitized without English-only OCR.',
      tags: ['Python', 'TensorFlow', 'OpenCV', 'NumPy'],
      status: 'Next up' as ProjectStatus,
      category: 'ML' as ProjectCategory,
      image: publicAsset('projects/bangla-digits.webp'),
      imageAlt: 'Eyeglasses in front of a dark code editor, standing in for a handwritten Bangla digit recognizer',
      href: '',
    },
    {
      id: '05',
      role: 'Mobile · Android',
      title: 'Campus Bites',
      description:
        'A campus food-run app so students can order from nearby stalls without shouting across a group chat.',
      tags: ['Kotlin', 'Android', 'Firebase', 'REST'],
      status: 'Next up' as ProjectStatus,
      category: 'Mobile' as ProjectCategory,
      image: publicAsset('projects/campus-bites.webp'),
      imageAlt: 'Vendors cooking at a street food stall in Dhaka, standing in for a campus food-run app',
      href: '',
    },

    {
      id: '06',
      role: 'Fundamentals · C',
      title: 'Library Desk',
      description:
        'A C console app to add, search, issue, and return books — the classic first-year file I/O project, done carefully.',
      tags: ['C', 'File I/O', 'Structs', 'CLI'],
      status: 'Building' as ProjectStatus,
      category: 'Fundamentals' as ProjectCategory,
      image: publicAsset('projects/library-desk.webp'),
      imageAlt: 'Bookshops at Nilkhet Book Market in Dhaka, standing in for a campus library desk system',
      href: '',
    },
    {
      id: '07',
      role: 'Fundamentals · Data Structures',
      title: 'Structure Lab',
      description:
        'A small visualizer for stacks, queues, linked lists, and sorts, so Data Structures is something you can watch, not just memorize.',
      tags: ['C concepts', 'JavaScript', 'React', 'Algorithms'],
      status: 'Building' as ProjectStatus,
      category: 'Fundamentals' as ProjectCategory,
      image: publicAsset('projects/structure-lab.webp'),
      imageAlt: 'Close-up of syntax-highlighted code on a monitor',
      href: '',
    },
    {
      id: '08',
      role: 'Full-stack · Web',
      title: 'TakaTrack',
      description:
        'A bilingual Bangla and English expense log that keeps student spending in BDT in one quiet, readable place.',
      tags: ['React', 'TypeScript', 'Local-first', 'i18n'],
      status: 'Next up' as ProjectStatus,
      category: 'Web' as ProjectCategory,
      image: publicAsset('projects/taka-track.webp'),
      imageAlt: 'Scattered Bangladeshi 10-taka banknotes, standing in for a bilingual expense tracker',
      href: '',
    },
    {
      id: '09',
      role: 'Frontend · APIs',
      title: 'Open Sky',
      description:
        'A compact Dhaka weather board fed by a public API — practice for fetch, state, and a UI that stays calm when the data moves.',
      tags: ['React', 'REST', 'Open-Meteo', 'Vite'],
      status: 'Next up' as ProjectStatus,
      category: 'Web' as ProjectCategory,
      image: publicAsset('projects/open-sky.webp'),
      imageAlt: 'Hatirjheel lake and the Dhaka skyline under open sky, standing in for a weather dashboard',
      href: '',
    },
  ] satisfies ProjectItem[],
}

export const trusted = {
  eyebrow: 'The stack',
  title: 'What I build alongside.',
  subtitle:
    'Languages, frameworks, and hardware I treat as working partners — from Arduino benches to React apps. Not a client roster: the tools I actually ship with.',
  caption: 'A working stack I sit beside every week — not brands that hired me.',
} as const

export const documentary = {
  eyebrow: 'Career documentary',
  title: 'The cut so far.',
  subtitle:
    'A narrative reel of how Jaweed got here — expandable chapters, not a dry CV dump.',
  chapters: [
    {
      chapter: '01',
      title: 'CSE at ULAB',
      period: 'Now',
      body: 'Learning systems the hard way: data structures, deadlines, and the discipline of finishing what you start. Dhaka campus, late nights, and a growing hunger to ship.',
    },
    {
      chapter: '02',
      title: 'Building in public',
      period: 'Ongoing',
      body: 'Small products, scripts, and portfolio experiments that people can actually open. Progress over polish theatre — but polish when it matters.',
    },
    {
      chapter: '03',
      title: 'Founder curiosity',
      period: 'Exploring',
      body: 'Curious how small teams turn an idea into something people actually show up for — and how I would own a product end-to-end someday.',
    },
    {
      chapter: '04',
      title: 'Learning AI',
      period: 'Active',
      body: 'Treating models as tools, not magic: prompts as interfaces, agents as workflows, and always asking what stays human in the loop.',
    },
    {
      chapter: '05',
      title: 'Games & modding as craft',
      period: 'Lifelong',
      body: 'Controllers, browser ports, reverse-engineering curiosity — gaming as a lab for systems thinking, not just a pastime.',
    },
  ],
} as const

export const education = {
  eyebrow: 'Path',
  title: 'Education & trajectory.',
  items: [
    {
      period: '2026 → Present',
      org: 'University of Liberal Arts Bangladesh (ULAB)',
      role: 'BSc in Computer Science & Engineering',
      detail:
        'Core focus on programming foundations, data structures, and shipping small products that feel production-aware.',
      current: true,
    },
    {
      period: 'Next',
      org: 'Internships & open-source',
      role: 'Software engineering roles',
      detail:
        'Looking for teams where I can write real code, take feedback seriously, and grow into a dependable engineer.',
      current: false,
    },
  ],
} as const

export const contact = {
  eyebrow: 'Now',
  title: "Let's build.",
  hireLine: 'Hire Jaweed.',
  body: 'Internships, junior roles, student collaborations, or a sharp technical chat — I reply when the ask is clear.',
  ctaLabel: 'Email Jaweed',
} as const


export const ai = {
  eyebrow: 'AI-native builder',
  title: 'I build with AI, not just about it.',
  subtitle:
    'AI fluency is how I stretch a CSE practice: I direct agents, write tighter prompts, and stay responsible for what ships.',
  terminalPrompt: "Specify the day's stack — research, briefing, tutoring, code, planning.",
  terminalResult:
    'About ten AI agents in a loop I direct. I review every pass and keep the last call.',
  cards: [
    {
      id: 'orchestrate',
      title: 'Agent orchestration',
      proof:
        'I run and direct a team of about ten AI agents for daily work — research, news briefings, tutoring, coding, and project planning.',
    },
    {
      id: 'assisted-dev',
      title: 'AI-assisted development',
      proof:
        'This site was built by directing AI coding agents: I specified the work, reviewed every pass, iterated, and tested with Lighthouse and Playwright.',
    },
    {
      id: 'prompts',
      title: 'Prompt engineering',
      proof:
        'I turn rough ideas into structured prompts for AI coding tools I actually use, including Cursor and Grok.',
    },
    {
      id: 'research',
      title: 'AI for research',
      proof:
        'I use AI to research and shape product discovery for a hardware and tech startup idea based in Bangladesh.',
    },
    {
      id: 'modding',
      title: 'AI + modding',
      proof:
        'I use AI to help reverse-engineer and mod games I play, including Project Zomboid and Red Dead Redemption 2.',
    },
    {
      id: 'learning',
      title: 'Learning ML',
      proof:
        'Alongside CSE at ULAB, I am deepening how LLMs, agents, and machine-learning fundamentals actually work — still learning, not claiming a research lab.',
    },
  ],
  toolkitLabel: 'AI toolkit',
  toolkitNote: 'Tools I reach for. Not a sponsorship, and not a usage leaderboard.',
  toolkit: [
    { name: 'Cursor', icon: 'Cursor' },
    { name: 'ChatGPT', icon: '' },
    { name: 'Claude', icon: 'Claude' },
    { name: 'Gemini', icon: 'Gemini' },
    { name: 'Hugging Face', icon: 'Hugging Face' },
    { name: 'Python', icon: 'Python' },
  ],
} as const

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'AI', href: '#ai' },
  { label: 'Circuit', href: '#pipeline' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Story', href: '#story' },
  { label: 'Contact', href: '#contact' },
] as const
