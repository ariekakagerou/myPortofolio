/**
 * Single source of truth for all skills data.
 * Skills with _id / _en variants for i18n.
 */

export const technicalSkills = [
  {
    id: "web-mobile",
    title_id: "Pengembangan Aplikasi Web & Mobile",
    title_en: "Web & Mobile Application Development",
    color: "from-blue-500 to-cyan-500",
    description_id: "Membangun aplikasi responsif dengan teknologi modern untuk web dan mobile",
    description_en: "Building responsive applications with modern technologies for web and mobile",
  },
  {
    id: "architecture",
    title_id: "Desain dan Arsitektur Perangkat Lunak",
    title_en: "Software Design & Architecture",
    color: "from-purple-500 to-pink-500",
    description_id: "Merancang struktur sistem yang scalable, maintainable, dan efisien",
    description_en: "Designing scalable, maintainable, and efficient system structures",
  },
  {
    id: "database",
    title_id: "Database Management System",
    title_en: "Database Management System",
    color: "from-green-500 to-emerald-500",
    description_id: "Mengelola dan mengoptimalkan basis data untuk performa terbaik",
    description_en: "Managing and optimizing databases for best performance",
  },
  {
    id: "api",
    title_id: "RESTful API & Integrasi Sistem",
    title_en: "RESTful API & System Integration",
    color: "from-orange-500 to-red-500",
    description_id: "Membangun API dan mengintegrasikan berbagai sistem dengan standar terbaik",
    description_en: "Building APIs and integrating various systems with best practices",
  },
];

export const nonTechnicalSkills = [
  {
    id: "problem-solving",
    title_id: "Pemecahan Masalah & Analisis",
    title_en: "Problem Solving & Analysis",
    color: "from-indigo-500 to-purple-500",
    description_id: "Menganalisis masalah kompleks dan menemukan solusi efektif",
    description_en: "Analyzing complex problems and finding effective solutions",
  },
  {
    id: "time-management",
    title_id: "Manajemen Waktu",
    title_en: "Time Management",
    color: "from-cyan-500 to-blue-500",
    description_id: "Mengatur prioritas dan menyelesaikan tugas tepat waktu",
    description_en: "Setting priorities and completing tasks on time",
  },
  {
    id: "teamwork",
    title_id: "Kolaborasi & Kerja Tim",
    title_en: "Collaboration & Teamwork",
    color: "from-pink-500 to-rose-500",
    description_id: "Berkontribusi aktif dalam tim dengan komunikasi yang efektif",
    description_en: "Actively contributing to teams with effective communication",
  },
  {
    id: "discipline",
    title_id: "Disiplin & Tanggung Jawab",
    title_en: "Discipline & Responsibility",
    color: "from-yellow-500 to-orange-500",
    description_id: "Menjaga komitmen dan bertanggung jawab atas tugas yang diberikan",
    description_en: "Maintaining commitment and being responsible for assigned tasks",
  },
];

export const programmingLanguages = [
  { name: "JAVASCRIPT", color: "bg-yellow-400 text-black", level: 62, icon: "/icons/javascript-icon.png" },
  { name: "TYPESCRIPT", color: "bg-blue-500", level: 58, icon: "/icons/typescript-icon.png" },
  { name: "DART", color: "bg-cyan-500", level: 55, icon: "/icons/dart-icon.png" },
  { name: "PHP", color: "bg-indigo-500", level: 60, icon: "/icons/php-icon.png" },
  { name: "C++", color: "bg-blue-600", level: 50 },
  { name: "GO", color: "bg-cyan-400 text-black", level: 57, icon: "/icons/golang-icon.png" },
  { name: "HTML5", color: "bg-orange-500", level: 65, icon: "/icons/html5-icon.png" },
  { name: "CSS3", color: "bg-blue-400", level: 63, icon: "/icons/css3-icon.png" },
];

export const frameworks = [
  { name: "REACT", color: "bg-cyan-400 text-black", level: 60 },
  { name: "NEXT.JS", color: "bg-black border border-white", level: 58 },
  { name: "ANGULAR", color: "bg-red-600", level: 50 },
  { name: "FLUTTER", color: "bg-blue-500", level: 60, icon: "/icons/flutter-icon.png" },
  { name: "LARAVEL", color: "bg-red-500", level: 55, icon: "/icons/laravel-icon.png" },
  { name: "EXPRESS.JS", color: "bg-gray-700", level: 60, icon: "/icons/expressjs-icon.png" },
  { name: "NODE.JS", color: "bg-green-600", level: 62, icon: "/icons/nodejs-icon.png" },
  { name: "TAILWIND", color: "bg-cyan-500", level: 63 },
  { name: "ASP.NET", color: "bg-purple-600", level: 45 },
];

export const tools = [
  { name: "FIREBASE", color: "bg-yellow-500 text-black", level: 60, icon: "/icons/firebase-icon.png" },
  { name: "DOCKER", color: "bg-blue-500", level: 55 },
  { name: "MYSQL", color: "bg-blue-600", level: 58, icon: "/icons/mysql-icon.png" },
  { name: "GIT", color: "bg-orange-600", level: 65, icon: "/icons/git-icon.png" },
  { name: "FIGMA", color: "bg-purple-500", level: 55, icon: "/icons/figma-icon.png" },
  { name: "CANVA", color: "bg-cyan-400 text-black", level: 60, icon: "/icons/canva-icon.png" },
  { name: "POSTMAN", color: "bg-orange-500", level: 62, icon: "/icons/postman-icon.png" },
  { name: "VERCEL", color: "bg-black border border-white", level: 50 },
];
