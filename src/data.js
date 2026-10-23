/**
 * All the text of the site: about me, my projects, jobs, schools, skills and the themes.
 * Change this file to change what the portfolio says — the other files only decide how it looks.
 */

/* ── profile ── */

const profile = {
  name: 'Jakup Jakupi',
  title: 'Web Developer | IT Support Specialist',
  location: 'Skopje, North Macedonia',
  email: 'j@jakupjakupi.com',
  focus: 'Websites, WordPress & IT support',
  about: [
    'I’m Jakup, a web developer and IT support specialist from Skopje with a Bachelor’s degree in Information Technology.',
    'I design and build websites for businesses and individuals — from company sites and online stores to booking systems — ' +
      'with a focus on clean design, speed and reliability.',
    'I’ve also worked in IT support at a municipality and a university, helping people keep their ' +
      'systems running. I enjoy solving problems, learning new technologies ' +
      'and turning ideas into things people actually use.',
  ],
  availability: 'Available for collaboration on web projects and IT solutions.',
};

/* My accounts. `icon` is the name of an icon in src/components.jsx. */
const socials = [
  {
    label: 'instagram',
    handle: '@jwkupp',
    url: 'https://www.instagram.com/jwkupp/',
    icon: 'instagram',
  },
  {
    label: 'facebook',
    handle: 'jwkupp',
    url: 'https://www.facebook.com/jwkupp',
    icon: 'facebook',
  },
];

/* ── projects ──
 * slug        the short name, used in commands (/project jakostore) and links (#/projects/jakostore)
 * domain      the website's address, without https://
 * location    and `stack` are optional — leave location out, or stack empty, to hide them
 * The screenshot of each project is assets/projects/<slug>.webp (1280×800) and <slug>-640.webp (640×400).
 * Bump `screenshotVersion` when you replace them, so phones drop the old copies.
 */

const screenshotVersion = 4;

const projects = [
  {
    slug: 'jako-digital',
    name: 'JakoDigital',
    domain: 'jako.digital',
    category: 'Web & branding studio',
    summary: 'Website for JakoDigital — a studio for web development, WordPress development and branding.',
    description:
      'A dark, editorial site that opens with an animated 3D logo',
    highlights: [
      'Web development — custom builds, performance, technical SEO and accessibility',
      'WordPress development — custom themes, Gutenberg blocks, WooCommerce and migrations',
      'Branding — brand strategy, logo & identity, typography & colour',
      'Case studies for every project in the portfolio',
    ],
    stack: ['PHP', 'HTML', 'CSS', 'JavaScript', 'React'],
    languages: ['English'],
  },
  {
    slug: 'eb-interior',
    name: 'EB Interior',
    domain: 'ebinterior.mk',
    category: 'Interior design studio',
    location: 'North Macedonia',
    summary:
      'Portfolio website for an interior design studio that creates personalised interiors, complete with curated furniture.',
    description:
      'An image-led website that presents the studio’s design approach, showcases finished interiors ' +
      'and makes it easy for new clients to get in touch about their own space.',
    highlights: [
      'Photo gallery of finished interiors',
      'Enquiry form to start a new project',
    ],
    stack: ['WordPress'],
    languages: ['English'],
  },
  {
    slug: 'malhad-er',
    name: 'MALHAD-ER',
    domain: 'malhad-er.com',
    category: 'Interior finishing works',
    location: 'Skopje, North Macedonia',
    summary: 'WordPress website for an interior finishing company in Skopje — plastering, drywall and painting.',
    description:
      'A service website covering everything between bare brick and move-in day, with a page per service ' +
      'and direct phone contact for quotes.',
    highlights: [
      'Machine plastering (MP75)',
      'Skim coating & finishing',
      'Drywall / gypsum board systems',
      'Painting & decoration',
    ],
    stack: ['WordPress'],
    languages: ['Macedonian', 'Albanian', 'English'],
  },
  {
    slug: 'iseni-hausmeister',
    name: 'Iseni HausMeisterService',
    domain: 'isenihausmeister.de',
    category: 'Caretaker & repair service',
    location: 'Feldkirchen, Munich, Germany',
    summary: 'German-language website for a caretaker and repair service in Feldkirchen, near Munich.',
    description:
      'A clear, trustworthy site that lists every service, highlights the company’s written guarantee ' +
      'and keeps the contact button one click away.',
    highlights: [
      'Building & office cleaning',
      'Glass & window cleaning',
      'Winter service and garden care',
      'Transport & moving',
    ],
    stack: ['WordPress'],
    languages: ['German'],
  },
  {
    slug: 'jakostore',
    name: 'JakoStore',
    domain: 'jakostore.shop',
    category: 'Digital marketplace',
    location: 'Online',
    summary:
      'A digital marketplace for ready-made HTML templates, complete business websites and stock photos & videos.',
    description:
      'Customers pay once and download instantly, while independent creators can sell their own work ' +
      'and earn 50% of every sale.',
    highlights: [
      'Business websites, HTML templates and photos & videos',
      'Live previews on desktop, tablet and mobile',
      'Instant download, secure checkout and commercial license',
      'Creator program with a 50% revenue share',
    ],
    stack: ['WordPress'],
    languages: ['English'],
  },
  {
    slug: 'gentleman-barber',
    name: 'Gentleman Barber',
    domain: 'gentlemanbarber.pro',
    category: 'Barber shop',
    summary: 'A premium barber shop website — “Classic style. Modern precision.”',
    description:
      'Built around one goal: getting clients booked. Visitors browse the services, barbers and prices, ' +
      'then pick their barber and time — booking takes less than a minute.',
    highlights: [
      'Online appointment booking system',
      'Services, barbers and pricing at a glance',
      'Available in Albanian, Macedonian and English',
      'Light and dark mode',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'React'],
    languages: ['Albanian', 'Macedonian', 'English'],
  },
  {
    slug: 'jako-invoice',
    name: 'JAKO INVOICE',
    domain: 'jako-inovice.netlify.app',
    category: 'Invoice generator',
    summary: 'Fakturo — a free invoice generator for businesses in Albania, Kosovo and North Macedonia.',
    description:
      'Fill in the details, watch the document update live and download a ready-to-send PDF. ' +
      'No account needed — everything is saved automatically in the browser.',
    highlights: [
      'Invoices, proforma invoices, quotes, credit notes, receipts and delivery notes',
      'Download as PDF or image, or print',
      'VAT, discounts and six currencies, including EUR, MKD and ALL',
      'Three templates with your own logo and brand colour, plus light and dark mode',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    languages: ['Albanian', 'English', 'Macedonian'],
  },
  {
    slug: 'jako-cv',
    name: 'JAKO CV',
    domain: 'jakocv.netlify.app',
    category: 'CV builder',
    summary: 'CV Studio — a free CV builder in Albanian, English and Macedonian.',
    description:
      'Fill in your details, pick a template and download a polished PDF in minutes. ' +
      'No sign-up — everything is saved automatically in the browser.',
    highlights: [
      'Five templates: Modern, Classic, Minimal, Creative and Executive',
      'Live preview with your own photo and accent colour',
      'CV completeness score with tips for a stronger CV',
      'PDF download, plus light and dark mode',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'React'],
    languages: ['Albanian', 'English', 'Macedonian'],
  },
];

/* ── resume ── */

/* My jobs, newest first. Leave `end` out for a job I still have.
 * `projects` is optional: the slugs of the projects I built in that job. They are listed under the job
 * in /experience, and each of those projects links back to the job.
 * /experience is drawn like `git log`, so every job has a made-up commit `hash`. */
const experience = [
  {
    hash: 'f3c9e17',
    role: 'Web & WordPress Developer',
    employer: 'Freelance',
    start: '2025',
    type: 'Self-employed',
    mode: 'Remote',
    projects: ['jako-digital', 'eb-interior', 'malhad-er', 'iseni-hausmeister', 'jakostore', 'gentleman-barber', 'jako-invoice', 'jako-cv'],
  },
  {
    hash: '485b2a6',
    role: 'IT Support Specialist',
    employer: 'Municipality of Aracinovo',
    start: 'Apr 2025',
    end: 'Feb 2026',
    type: 'Full-time',
    mode: 'On-site',
  },
  {
    hash: 'a80b79c',
    role: 'IT Support Specialist',
    employer: 'Mother Teresa University',
    start: 'Jan 2024',
    end: 'Jun 2024',
    type: 'Contract',
    mode: 'On-site',
  },
];

const education = [
  {
    school: 'Mother Teresa University',
    degree: 'Bachelor of Information Technology',
    start: 'Oct 2020',
    end: 'May 2024',
  },
  {
    school: 'Zef Lush Marku High School',
    degree: 'General Studies',
    start: 'Sep 2016',
    end: 'Jun 2020',
  },
];

/* My skills in groups. /skills shows them like a JSON file. */
const skills = {
  frontend: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Tailwind CSS', 'Bootstrap'],
  backend: ['PHP', 'C++', 'C#'],
  databases: ['MySQL'],
  design: ['Logo Design', 'Figma'],
  it: ['Information Technology', 'IT Support', 'Git & GitHub', 'Networking', 'Troubleshooting', 'System Administration', 'Problem Solving'],
  systems: ['Linux', 'macOS', 'Windows'],
};

/* `level` goes from 1 (beginner) to 5 (native), like on LinkedIn. */
const languages = [
  { name: 'Albanian', proficiency: 'Native or bilingual', level: 5 },
  { name: 'English', proficiency: 'Professional working proficiency', level: 3 },
  { name: 'Macedonian', proficiency: 'Professional working proficiency', level: 3 },
];

/* ── themes ──
 * Every name here needs a [data-theme='…'] block with its colours in style.css.
 */

const themes = [
  { name: 'dark', description: 'amber on ink' },
  { name: 'light', description: 'clean white' },
  { name: 'ocean', description: 'teal on deep sea' },
  { name: 'forest', description: 'green on pine' },
  { name: 'rose', description: 'pink on plum' },
  { name: 'coffee', description: 'caramel on espresso' },
  { name: 'sunset', description: 'coral on dusk' },
  { name: 'nebula', description: 'violet on space' },
  { name: 'mono', description: 'black & white' },
  { name: 'paper', description: 'warm sepia' },
];
