import { Project, Skill, StatItem, ExperienceHighlight, SocialLink, NavItem, PersonalInfo } from '../types.ts';

export const personalInfo: PersonalInfo = {
  name: 'Dinda Fika',
  role: 'Frontend Developer & UI/UX Enthusiast',
  tagline: 'Membangun pengalaman web yang modern, interaktif, dan performan tinggi.',
  bioShort:
    'Seorang Frontend Developer dan pecinta UI/UX yang berfokus menciptakan antarmuka digital yang memikat secara visual, mudah diakses, dan memiliki kode yang bersih serta terstruktur rapi.',
  bioLong:
    'Dengan latar belakang kuat dalam ekosistem React, TypeScript, dan desain modern berbasis Tailwind CSS, saya memiliki hasrat untuk menerjemahkan ide kompleks menjadi produk digital yang intuitif. Saya percaya bahwa pengalaman web yang luar biasa lahir dari pertemuan antara estetika desain yang matang dan rekayasa perangkat lunak yang andal.',
  location: 'Jakarta, Indonesia',
  email: 'dindafika686@gmail.com',
  phone: '+62 812-3456-7890',
  availability: 'Tersedia untuk proyek freelance & kesempatan kerja penuh waktu',
  yearsOfExperience: '3+',
  cvUrl: 'https://drive.google.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  aboutImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  githubUrl: 'https://github.com/dindafika',
  linkedinUrl: 'https://linkedin.com/in/dindafika',
  instagramUrl: 'https://instagram.com/dindafika.dev',
  whatsappUrl: 'https://wa.me/6281234567890',
  websiteUrl: 'https://dindafika.dev',
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/dindafika',
      icon: 'Github',
      label: 'github.com/dindafika',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/dindafika',
      icon: 'Linkedin',
      label: 'linkedin.com/in/dindafika',
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/dindafika.dev',
      icon: 'Instagram',
      label: '@dindafika.dev',
    },
    {
      platform: 'WhatsApp',
      url: 'https://wa.me/6281234567890',
      icon: 'MessageCircle',
      label: '+62 812-3456-7890',
    },
    {
      platform: 'Email',
      url: 'mailto:dindafika686@gmail.com',
      icon: 'Mail',
      label: 'dindafika686@gmail.com',
    },
  ],
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const stats: StatItem[] = [
  { value: '3+', label: 'Tahun Pengalaman', description: 'Membangun aplikasi web production' },
  { value: '25+', label: 'Proyek Selesai', description: 'Dari landing page hingga web apps' },
  { value: '15+', label: 'Klien Puas', description: 'Kolaborasi lokal & internasional' },
  { value: '99%', label: 'Kepuasan Pengguna', description: 'Feedback positif & kode teruji' },
];

export const experienceHighlights: ExperienceHighlight[] = [
  {
    title: 'Arsitektur Kode Modern & Rapi',
    subtitle: 'Maintainable & Scalable',
    description: 'Mengimplementasikan prinsip component-driven architecture, typing aman dengan TypeScript, dan manajemen state yang efisien.',
    icon: 'Code2',
  },
  {
    title: 'Desain Responsif & Adaptif',
    subtitle: 'Mobile First Philosophy',
    description: 'Menjamin kenyamanan visual dan interaksi mulus di layar smartphone, tablet, laptop, hingga monitor ultra-wide.',
    icon: 'Smartphone',
  },
  {
    title: 'UI/UX & Prototyping Intuitif',
    subtitle: 'User-Centered Thinking',
    description: 'Menerjemahkan wireframe dan desain Figma menjadi pengalaman pengguna hidup dengan hierarki tipografi dan animasi natural.',
    icon: 'Palette',
  },
  {
    title: 'Optimasi Kecepatan & SEO',
    subtitle: 'Core Web Vitals Oriented',
    description: 'Memperhatikan waktu render, lazy loading, bundler optimization, dan praktik terbaik aksesibilitas web (a11y).',
    icon: 'Zap',
  },
];

export const skills: Skill[] = [
  // Frontend
  {
    name: 'React.js',
    category: 'frontend',
    icon: 'Atom',
    level: 95,
    experience: '3+ Tahun',
    tagline: 'Hooks, Context API, Performance Tuning & Architecture',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: 'FileCode2',
    level: 90,
    experience: '2.5 Tahun',
    tagline: 'Type-safe interfaces, generics, and strict validation',
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    icon: 'Code',
    level: 95,
    experience: '3.5 Tahun',
    tagline: 'Async/Await, DOM manipulation, functional patterns',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: 'LayoutGrid',
    level: 95,
    experience: '3 Tahun',
    tagline: 'Utility-first styling, dark mode, responsive layouts',
  },
  {
    name: 'Next.js',
    category: 'frontend',
    icon: 'Globe',
    level: 85,
    experience: '2 Tahun',
    tagline: 'SSR, SSG, App Router, dan API Routes',
  },
  {
    name: 'HTML5 & CSS3',
    category: 'frontend',
    icon: 'FileText',
    level: 98,
    experience: '4 Tahun',
    tagline: 'Semantic markup, Flexbox, CSS Grid, animations',
  },

  // Backend & Database
  {
    name: 'Node.js & Express',
    category: 'backend',
    icon: 'Server',
    level: 80,
    experience: '2 Tahun',
    tagline: 'RESTful APIs, middleware, authetications, routing',
  },
  {
    name: 'PostgreSQL & SQL',
    category: 'backend',
    icon: 'Database',
    level: 75,
    experience: '1.5 Tahun',
    tagline: 'Relational data modeling, queries, dan ORM (Prisma/Drizzle)',
  },
  {
    name: 'RESTful API & GraphQL',
    category: 'backend',
    icon: 'Network',
    level: 85,
    experience: '2.5 Tahun',
    tagline: 'API integration, Axios, TanStack React Query',
  },

  // Tools & Design
  {
    name: 'Figma & UI/UX',
    category: 'design',
    icon: 'Figma',
    level: 90,
    experience: '3 Tahun',
    tagline: 'Design systems, wireframing, high-fidelity mockups',
  },
  {
    name: 'Git & GitHub',
    category: 'tools',
    icon: 'GitBranch',
    level: 90,
    experience: '3+ Tahun',
    tagline: 'Version control, branch workflows, pull requests',
  },
  {
    name: 'Vite & Build Tools',
    category: 'tools',
    icon: 'Sparkles',
    level: 90,
    experience: '2 Tahun',
    tagline: 'Bundling, dev server configs, environment variables',
  },
  {
    name: 'Testing (Jest & Vitest)',
    category: 'tools',
    icon: 'CheckCircle2',
    level: 75,
    experience: '1.5 Tahun',
    tagline: 'Unit testing, component tests, assertions',
  },
  {
    name: 'Motion / Framer Motion',
    category: 'design',
    icon: 'Activity',
    level: 88,
    experience: '2 Tahun',
    tagline: 'Micro-interactions, scroll reveals, layout animations',
  },
];

export const projects: Project[] = [
  {
    id: 'lumina-ecommerce',
    title: 'Lumina - E-Commerce Fashion Store',
    subtitle: 'Modern Shopping Experience',
    category: 'E-Commerce',
    description:
      'Platform belanja daring responsif dengan sistem filter produk dinamis, keranjang belanja real-time, dan checkout interaktif.',
    fullDescription:
      'Lumina adalah aplikasi web e-commerce berorientasi performa tinggi. Menghadirkan navigasi produk yang cepat, pencarian dengan debounce, filter berdasarkan kategori dan rentang harga, keranjang belanja dengan sinkronisasi local storage, serta simulasi alur pembayaran.',
    features: [
      'Katalog produk responsif dengan filter dinamis & pencarian instan',
      'Manajemen keranjang belanja interaktif dengan kalkulasi otomatis',
      'Tampilan detail produk dengan galeri gambar dan pilihan varian',
      'Desain mobile-first dengan loading skeleton untuk UX maksimal',
    ],
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Lucide React', 'Context API'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=80',
    liveUrl: 'https://example.com/lumina',
    githubUrl: 'https://github.com/dindafika/lumina-ecommerce',
    featured: true,
  },
  {
    id: 'nexus-ai-dashboard',
    title: 'Nexus AI - Workspace & Analytics Dashboard',
    subtitle: 'Data Visualization & Insights',
    category: 'Dashboard',
    description:
      'Dashboard manajemen cerdas dengan visualisasi metrik performa, pemantauan status server, dan integrasi workflow kolaboratif.',
    fullDescription:
      'Nexus AI Workspace dirancang untuk tim modern yang membutuhkan monitoring data secara real-time. Dilengkapi grafik analitik komprehensif, navigasi sidebar lipat, tabel data yang dapat disortir, serta mode gelap dan terang yang nyaman untuk penggunaan berjam-jam.',
    features: [
      'Visualisasi metrik interaktif untuk performa dan traffic pengguna',
      'Komponen tabel data dengan sorting, filter, dan pagination',
      'Dukungan penuh tema gelap (dark mode) & tema terang (light mode)',
      'Widget status sistem dan notifikasi aktivitas terkini',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Recharts'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    liveUrl: 'https://example.com/nexus-dashboard',
    githubUrl: 'https://github.com/dindafika/nexus-dashboard',
    featured: true,
  },
  {
    id: 'fintrack-app',
    title: 'FinTrack - Pengelola Finansial Cerdas',
    subtitle: 'Personal Finance & Budgeting Web App',
    category: 'Web App',
    description:
      'Aplikasi web pencatatan keuangan pribadi dengan kategorisasi pengeluaran, target tabungan, dan ringkasan pengeluaran bulanan.',
    fullDescription:
      'FinTrack membantu pengguna mengelola arus kas harian, mingguan, dan bulanan. Menggunakan grafik interaktif untuk membaca kebiasaan berbelanja, kalkulator target tabungan, dan opsi export laporan keuangan.',
    features: [
      'Pencatatan transaksi cepat dengan kategori pengeluaran visual',
      'Kalkulasi saldo dan alokasi bujet otomatis per periode',
      'Grafik persentase pengeluaran menggunakan diagram donat',
      'Penyimpanan data lokal yang aman tanpa perlu login rumit',
    ],
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Chart.js', 'LocalStorage'],
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80',
    liveUrl: 'https://example.com/fintrack',
    githubUrl: 'https://github.com/dindafika/fintrack-app',
    featured: true,
  },
  {
    id: 'aura-creative-studio',
    title: 'Aura Studio - Agensi Kreatif & Branding',
    subtitle: 'High-Converting Landing Page',
    category: 'Landing Page',
    description:
      'Landing page elegan untuk agensi desain dengan animasi micro-interaction halus, tipografi berkarakter, dan showcase portofolio interaktif.',
    fullDescription:
      'Aura Studio didesain khusus untuk menampilkan kredibilitas agensi desain. Menonjolkan tata letak bento grid, testimoni interaktif dari para klien ternama, dan formulir konsultasi terintegrasi.',
    features: [
      'Animasi reveal dan scroll-triggered interaksi yang mulus',
      'Showcase studi kasus dengan efek lightbox dan preview',
      'Tata letak Bento Grid modern dengan kontras warna harmonis',
      'Optimalisasi skor Core Web Vitals dan SEO yang matang',
    ],
    tags: ['React', 'Tailwind CSS', 'Motion', 'Responsive Design'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
    liveUrl: 'https://example.com/aura-studio',
    githubUrl: 'https://github.com/dindafika/aura-creative-studio',
  },
  {
    id: 'devpulse-community',
    title: 'DevPulse - Forum & Blog Komunitas Koding',
    subtitle: 'Developer Social & Sharing Hub',
    category: 'Web App',
    description:
      'Platform berbagi artikel teknis, snippet kode kustom dengan syntax highlighting, dan ruang diskusi terbuka bagi para developer.',
    fullDescription:
      'DevPulse memudahkan pengembang web menulis dan membagikan tutorial pemrograman dengan editor markdown responsif, sistem upvote artikel, dan kolom diskusi bertingkat.',
    features: [
      'Editor markdown dengan preview langsung & syntax highlighter',
      'Filter artikel berdasarkan tag teknologi (React, Node, CSS, dll)',
      'Sistem bookmark artikel favorit untuk dibaca offline',
      'Antarmuka ramah mata dengan mode kontras tinggi',
    ],
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'PrismJS'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
    liveUrl: 'https://example.com/devpulse',
    githubUrl: 'https://github.com/dindafika/devpulse-community',
  },
  {
    id: 'medicare-booking',
    title: 'MediCare - Sistem Janji Temu Dokter',
    subtitle: 'Healthcare Booking & Telemedicine App',
    category: 'Web App',
    description:
      'Sistem reservasi jadwal konsultasi medis dengan pencarian dokter spesialis, jadwal interaktif, dan riwayat janji temu pasien.',
    fullDescription:
      'MediCare menghadirkan alur penjadwalan yang ramah pasien lansia dan keluarga. Memiliki pemilih tanggal dan jam konsultasi real-time, verifikasi nomor telepon, serta ringkasan dokumen tiket konsultasi.',
    features: [
      'Pencarian dokter berdasarkan spesialisasi, lokasi, dan rating',
      'Kalender pemilih tanggal & slot waktu yang interaktif',
      'Penerbitan kartu konfirmasi janji temu yang dapat diunduh',
      'Desain bersih dengan standar aksesibilitas kontras tinggi',
    ],
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Lucide Icons'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    liveUrl: 'https://example.com/medicare',
    githubUrl: 'https://github.com/dindafika/medicare-booking',
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com',
    icon: 'Github',
    label: 'github.com/dindafika',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: 'Linkedin',
    label: 'linkedin.com/in/dindafika',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com',
    icon: 'Instagram',
    label: '@dindafika.dev',
  },
  {
    platform: 'Email',
    url: 'mailto:dindafika686@gmail.com',
    icon: 'Mail',
    label: 'dindafika686@gmail.com',
  },
];
