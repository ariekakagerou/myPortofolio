/**
 * Detailed Case Studies for selected projects.
 */
export const caseStudies = [
  {
    projectId: "authub-frontend",
    overview_id: "Authub adalah solusi autentikasi modern yang dirancang untuk memberikan pengalaman login yang aman dan mulus.",
    overview_en: "Authub is a modern authentication solution designed to provide a secure and seamless login experience.",
    problem_id: "Banyak aplikasi menghadapi kesulitan dalam mengelola sesi pengguna secara aman dan memberikan responsivitas UI yang konsisten di berbagai perangkat.",
    problem_en: "Many applications face difficulties in managing user sessions securely and providing consistent UI responsiveness across various devices.",
    solution_id: "Membangun aplikasi Flutter dengan arsitektur bersih, menggunakan Provider untuk state management, dan integrasi Firebase untuk keamanan tingkat tinggi.",
    solution_en: "Building a Flutter application with clean architecture, using Provider for state management, and Firebase integration for high-level security.",
    results_id: "Peningkatan 40% dalam kecepatan login dan feedback positif dari pengguna mengenai kemudahan antarmuka.",
    results_en: "40% increase in login speed and positive user feedback regarding interface ease-of-use.",
    metrics: [
      { label_id: "Waktu Muat", label_en: "Load Time", value: "< 2s" },
      { label_id: "Keamanan", label_en: "Security", value: "AES-256" },
    ],
  },
  {
    projectId: "h5-revolution",
    overview_id: "H5-Revolution adalah platform engagement fans untuk grup idola, menggabungkan konten eksklusif dengan fitur komunitas.",
    overview_en: "H5-Revolution is a fan engagement platform for idol groups, combining exclusive content with community features.",
    problem_id: "Fans membutuhkan satu tempat terpusat untuk mendapatkan informasi, menonton streaming, dan berinteraksi satu sama lain secara real-time.",
    problem_en: "Fans needed a single centralized place to get information, watch streaming, and interact with each other in real-time.",
    solution_id: "Menggunakan MERN Stack dengan Socket.io untuk fitur real-time, MongoDB untuk fleksibilitas data, dan AWS untuk hosting video yang scalable.",
    solution_en: "Using MERN Stack with Socket.io for real-time features, MongoDB for data flexibility, and AWS for scalable video hosting.",
    results_id: "Lebih dari 1000 pengguna aktif di bulan pertama dan peningkatan interaksi fans yang signifikan.",
    results_en: "Over 1000 active users in the first month and a significant increase in fan interaction.",
    metrics: [
      { label_id: "Pengguna Aktif", label_en: "Active Users", value: "1000+" },
      { label_id: "Engagement", label_en: "Engagement", value: "+85%" },
    ],
  },
  {
    projectId: "youth-trigger",
    overview_id: "Backend sistem untuk platform edukasi pemuda yang menangani data siswa, kurikulum, dan interaksi pengajar.",
    overview_en: "Backend system for a youth education platform handling student data, curriculum, and instructor interaction.",
    problem_id: "Sistem lama memiliki skalabilitas rendah dan seringkali lambat saat menangani banyak permintaan data real-time.",
    problem_en: "The old system had low scalability and was often slow when handling many real-time data requests.",
    solution_id: "Implementasi Node.js dengan caching Redis dan optimasi query MySQL untuk memastikan responsivitas sistem di bawah beban berat.",
    solution_en: "Implementation of Node.js with Redis caching and MySQL query optimization to ensure system responsiveness under heavy load.",
    results_id: "Respons API meningkat 60% dan sistem mampu menangani 5x lebih banyak trafik simultan.",
    results_en: "API response improved by 60% and the system is able to handle 5x more simultaneous traffic.",
    metrics: [
      { label_id: "Latensi API", label_en: "API Latency", value: "-60ms" },
      { label_id: "Kapasitas Trafik", label_en: "Traffic Capacity", value: "5x" },
    ],
  },
];
