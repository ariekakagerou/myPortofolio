"use client";

import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import CertificateCard from "@/components/CertificateCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentAboutImage, setCurrentAboutImage] = useState(0);

  const aboutImages = [
    "/images/about-1.jpg",
    "/images/about-2.jpg",
    "/images/about-3.jpg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentAboutImage((prev) => (prev + 1) % aboutImages.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [aboutImages.length]);

  // Projects data aligned with /projects page
  const projects = [
    {
      title: "Authub (Frontend Flutter)",
      description:
        "Aplikasi mobile untuk autentikasi dan manajemen pengguna dengan Flutter.",
      image: "/projects/authub-frontend.jpg",
      technologies: ["Flutter", "Dart", "Firebase", "Material Design"],
      category: "Mobile App",
      githubLink: "https://github.com/username/authub-frontend",
      status: "completed",
      duration: "3 bulan",
      teamSize: "3 developers",
      highlights: [
        "UI/UX yang responsif",
        "Integrasi Firebase Auth",
        "State management dengan Provider",
      ],
      challenges:
        "Implementasi state management yang efisien dan integrasi dengan backend API.",
      impact:
        "Aplikasi berhasil meningkatkan user experience dengan performa yang optimal.",
    },
    {
      title: "Authub (Backend Express)",
      description:
        "Backend API untuk sistem autentikasi dengan Express.js dan JWT.",
      image: "/projects/authub-backend.jpg",
      technologies: ["Express.js", "Node.js", "MSQL", "JWT", "Bcrypt"],
      category: "Backend API",
      githubLink: "https://github.com/username/authub-backend",
      status: "completed",
      duration: "2 bulan",
      teamSize: "1 developer",
      highlights: [
        "RESTful API",
        "JWT Authentication",
        "MSQL Integration",
        "Password Hashing",
      ],
      challenges:
        "Implementasi security yang robust dan optimasi performa database.",
      impact: "API yang aman dan scalable untuk mendukung aplikasi mobile.",
    },
    {
      title: "Youth Trigger School Backend",
      description:
        "Backend sistem untuk platform edukasi pemuda dengan fitur lengkap.",
      image: "/projects/youth-trigger.jpg",
      technologies: ["Express.js", "Node.js", "MSQL", "Redis", "Socket.io"],
      category: "Backend API",
      githubLink: "https://github.com/username/youth-trigger-backend",
      status: "completed",
      duration: "4 bulan",
      teamSize: "4 developers",
      highlights: [
        "Real-time messaging",
        "File upload system",
        "Database optimization",
        "API documentation",
      ],
      challenges:
        "Menangani real-time communication dan optimasi query database yang kompleks.",
      impact:
        "Platform edukasi yang stabil dengan fitur real-time untuk pembelajaran.",
    },
    {
      title: "Sweet Treats App",
      description:
        "Aplikasi full-stack untuk toko kue dengan frontend dan backend terintegrasi.",
      image: "/projects/sweet-treats.jpg",
      technologies: ["dart", "Express.js", "MSQL"],
      category: "Full Stack",
      githubLink: "https://github.com/username/sweet-treats",
      status: "completed",
      duration: "5 bulan",
      teamSize: "2 developers",
      highlights: [
        "E-commerce functionality",
        "Payment integration",
        "Image upload",
        "Admin dashboard",
      ],
      challenges:
        "Integrasi payment gateway dan optimasi performa untuk handling banyak produk.",
      impact:
        "Aplikasi e-commerce yang fungsional dengan sistem pembayaran yang aman.",
    },
    {
      title: "Project Bumdesa Backend",
      description: "Backend API untuk sistem manajemen Badan Usaha Milik Desa.",
      image: "/projects/bumdesa.jpg",
      technologies: ["Express.js", "Node.js", "MSQL", "JWT", "Multer"],
      category: "Backend API",
      githubLink: "https://github.com/username/bumdesa-backend",
      status: "completed",
      duration: "3 bulan",
      teamSize: "4 developers",
      highlights: [
        "CRUD operations",
        "File management",
        "User roles",
        "Data reporting",
      ],
      challenges:
        "Mendesain struktur database yang efisien untuk data BUMDesa yang kompleks.",
      impact:
        "Sistem backend yang mendukung operasional BUMDesa secara digital.",
    },
    {
      title: "JobCom (Frontend)",
      description:
        "Frontend aplikasi untuk platform pencarian kerja dan recruitment.",
      image: "/projects/jobcom.jpg",
      technologies: ["Dart", "Flutter", "Redux", "Material-UI", "Axios"],
      category: "Frontend",
      githubLink: "https://github.com/username/jobcom-frontend",
      status: "completed",
      duration: "4 bulan",
      teamSize: "1 developer",
      highlights: [
        "Responsive design",
        "State management",
        "Component library",
        "API integration",
      ],
      challenges:
        "Membuat UI yang user-friendly untuk berbagai jenis pengguna (job seeker & employer).",
      impact:
        "Interface yang intuitif untuk platform job matching yang efisien.",
    },
    {
      title: "H5 Revolution",
      description:
        "Aplikasi web untuk grup idola H5-Revolution dengan fitur fan engagement dan konten eksklusif.",
      image: "/projects/h5-revolution.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      category: "Idol Group Web App",
      githubLink: "https://github.com/username/h5-revolution",
      status: "completed",
      duration: "6 bulan",
      teamSize: "1 developer",
      highlights: [
        "Fan community platform",
        "Live streaming integration",
        "Merchandise store",
        "Member profiles",
        "Event calendar",
      ],
      challenges:
        "Membangun platform yang engaging untuk fans dengan fitur real-time dan sistem membership.",
      impact:
        "Aplikasi web yang berhasil menghubungkan grup idola H5-Revolution dengan fans mereka secara digital.",
    },
    {
      title: "H5 Official Store",
      description:
        "Website toko online resmi untuk menjual merchandise grup idola H5-Revolution.",
      image: "/projects/h5-store.jpg",
      technologies: ["Next.js", "Node.js", "Stripe", "AWS S3", "PostgreSQL"],
      category: "Idol Merchandise Store",
      githubLink: "https://github.com/username/h5-official-store",
      status: "completed",
      duration: "4 bulan",
      teamSize: "1 developer",
      highlights: [
        "Official merchandise",
        "Payment processing",
        "Product gallery",
        "Order tracking",
        "Fan reviews",
      ],
      challenges:
        "Mengelola inventory merchandise yang beragam dan sistem pembayaran yang aman untuk fans.",
      impact:
        "Toko online resmi yang berhasil menyediakan merchandise berkualitas untuk fans H5-Revolution.",
    },
    {
      title: "SIMA BPJS API",
      description:
        "API untuk integrasi sistem informasi manajemen dengan BPJS Kesehatan.",
      image: "/projects/sima-bpjs.jpg",
      technologies: ["ASP.net", "Node.js", "Oracle DB", "SOAP", "XML"],
      category: "Integration API",
      githubLink: "https://github.com/username/sima-bpjs-api",
      status: "completed",
      duration: "3 bulan",
      teamSize: "3 developers",
      highlights: [
        "BPJS integration",
        "SOAP services",
        "Data synchronization",
        "Error handling",
      ],
      challenges:
        "Integrasi dengan sistem BPJS yang kompleks dan handling data sensitive.",
      impact:
        "API yang memungkinkan sistem rumah sakit terintegrasi dengan BPJS Kesehatan.",
    },
  ];

  // Skills data aligned with /skills page
  const technicalSkills = [
    {
      title: "Pengembangan Aplikasi Web & Mobile",
      description: "Membangun aplikasi responsif dengan teknologi modern untuk web dan mobile",
    },
    {
      title: "Desain dan Arsitektur Perangkat Lunak",
      description: "Merancang struktur sistem yang scalable, maintainable, dan efisien",
    },
    {
      title: "Database Management System",
      description: "Mengelola dan mengoptimalkan basis data untuk performa terbaik",
    },
    {
      title: "RESTful API & Integrasi Sistem",
      description: "Membangun API dan mengintegrasikan berbagai sistem dengan standar terbaik",
    },
  ];

  const nonTechnicalSkills = [
    {
      title: "Pemecahan Masalah & Analisis",
      description: "Menganalisis masalah kompleks dan menemukan solusi efektif",
    },
    {
      title: "Manajemen Waktu",
      description: "Mengatur prioritas dan menyelesaikan tugas tepat waktu",
    },
    {
      title: "Kolaborasi & Kerja Tim",
      description: "Berkontribusi aktif dalam tim dengan komunikasi yang efektif",
    },
    {
      title: "Disiplin & Tanggung Jawab",
      description: "Menjaga komitmen dan bertanggung jawab atas tugas yang diberikan",
    },
  ];

  const languages = [
    { name: "JAVASCRIPT", level: 62, icon: "/icons/javascript-icon.png" },
    { name: "TYPESCRIPT", level: 58, icon: "/icons/typescript-icon.png" },
    { name: "DART", level: 55, icon: "/icons/dart-icon.png" },
    { name: "PHP", level: 60, icon: "/icons/php-icon.png" },
    { name: "C++", level: 50 },
    { name: "GO", level: 57, icon: "/icons/golang-icon.png" },
    { name: "HTML5", level: 65, icon: "/icons/html5-icon.png" },
    { name: "CSS3", level: 63, icon: "/icons/css3-icon.png" },
  ];

  const frameworks = [
    { name: "REACT", level: 60 },
    { name: "NEXT.JS", level: 58 },
    { name: "ANGULAR", level: 50 },
    { name: "FLUTTER", level: 60, icon: "/icons/flutter-icon.png" },
    { name: "LARAVEL", level: 55, icon: "/icons/laravel-icon.png" },
    { name: "EXPRESS.JS", level: 60, icon: "/icons/expressjs-icon.png" },
    { name: "NODE.JS", level: 62, icon: "/icons/nodejs-icon.png" },
    { name: "TAILWIND", level: 63 },
    { name: "ASP.NET", level: 45 },
  ];

  const tools = [
    { name: "FIREBASE", level: 60, icon: "/icons/firebase-icon.png" },
    { name: "DOCKER", level: 55 },
    { name: "MYSQL", level: 58, icon: "/icons/mysql-icon.png" },
    { name: "GIT", level: 65, icon: "/icons/git-icon.png" },
    { name: "FIGMA", level: 55, icon: "/icons/figma-icon.png" },
    { name: "CANVA", level: 60, icon: "/icons/canva-icon.png" },
    { name: "POSTMAN", level: 62, icon: "/icons/postman-icon.png" },
    { name: "VERCEL", level: 50 },
  ];

  // Certificates data aligned with /certificates page
  const certificates = [
    {
      title: "Belajar Dasar Bahasa Pemrograman dengan Python",
      issuer: "Mounev Academy",
      image: "/certificates/python-mounev.png",
      category: "Programming",
      year: "2024",
    },
    {
      title:
        "Engineering Resilience: Microservices' Contribution to High Scalability in Tech Company",
      issuer: "Tech Company",
      image: "/certificates/microservices.png",
      category: "Architecture",
      year: "2024",
    },
    {
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      image: "/certificates/ccna.png",
      category: "Networking",
      year: "2023",
    },
    {
      title: "Prinsip Dasar UI/UX Designer",
      issuer: "Eduwork",
      image: "/certificates/ui-ux-eduwork.png",
      category: "Design",
      year: "2024",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Hero />

      {/* Typewriter Section with Buttons */}
      <motion.section
        className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-16 sm:h-16 bg-green-500/10 rounded-full blur-lg"></div>

        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          variants={itemVariants}
        >
          <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed">
              Mahasiswa Teknik Informatika | Backend & Mobile Developer
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group min-w-[200px] text-sm sm:text-base"
              variants={pulseVariants}
              animate="pulse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/cv.pdf";
                link.download = "cv.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download CV
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </motion.button>

            <motion.button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-500 text-blue-400 font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 relative overflow-hidden group min-w-[200px] text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/contact")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Me
              </span>
            </motion.button>

            <motion.button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-500 text-purple-400 font-semibold rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 relative overflow-hidden group min-w-[200px] text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/projects")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                View Projects
              </span>
            </motion.button>
          </motion.div>

          {/* Quick Links to Pages */}
          <motion.div
            className="mt-6 flex flex-wrap gap-3 justify-center"
            variants={itemVariants}
          >
            <motion.button
              className="px-5 py-2 rounded-full border border-white/20 text-gray-200 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/about")}
            >
              About
            </motion.button>
            <motion.button
              className="px-5 py-2 rounded-full border border-white/20 text-gray-200 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/certificates")}
            >
              Certificates
            </motion.button>
            <motion.button
              className="px-5 py-2 rounded-full border border-white/20 text-gray-200 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/skills")}
            >
              Skills
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-12 sm:mt-16 flex flex-col items-center"
            variants={itemVariants}
          >
            <p className="text-gray-400 text-xs sm:text-sm mb-2 px-4 text-center">
              Scroll untuk melihat lebih banyak
            </p>
            <motion.div
              className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 rounded-full flex justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-gray-400 rounded-full mt-1.5 sm:mt-2 opacity-60"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Perbaiki heading homepage agar ada 1 h1 saja dan heading penting = h2/h3 */}
      <motion.section
        className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Selamat Datang di Portofolio Saya
          </motion.h1>
          <motion.p
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Di sini Anda dapat menemukan informasi tentang keahlian, proyek,
            sertifikat, dan cara menghubungi saya.
          </motion.p>
        </div>
      </motion.section>

      {/* ABOUT SECTION */}
      <motion.section
        id="about"
        className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full blur-xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Tentang Saya
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mt-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Mahasiswa Bersemangat di Bidang Teknologi
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Saya adalah mahasiswa Teknik Informatika yang passionate tentang
                pengembangan backend dan mobile. Dengan keahlian di berbagai
                teknologi modern, saya siap menghadapi tantangan di industri
                teknologi.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Saya percaya bahwa belajar adalah proses berkelanjutan. Setiap
                proyek adalah kesempatan untuk meningkatkan skills dan
                memberikan nilai terbaik.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Ketika tidak coding, saya menyukai berbagi pengetahuan dan
                berkontribusi pada komunitas tech lokal.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden border border-gray-700">
                {aboutImages.map((src, idx) => (
                  <motion.div key={src} className="absolute inset-0 w-full h-full object-cover">
                    <Image
                      src={src}
                      alt={`Foto Ari Eka Prianda ${idx + 1}`}
                      fill
                      className="object-cover"
                      style={{ opacity: idx === currentAboutImage ? 1 : 0, transition: 'opacity 0.6s' }}
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                ))}

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {aboutImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`${idx === currentAboutImage ? "bg-white" : "bg-white/40"} h-2 w-2 rounded-full`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  { number: "10+", label: "Projects Completed" },
                  { number: "3+", label: "Years Experience" },
                  { number: "50+", label: "Happy Clients" },
                  { number: "15+", label: "Technologies" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-lg text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-blue-100">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SKILLS SECTION */}
      <motion.section
        id="skills"
        className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Keahlian Saya
          </motion.h2>
          <motion.p
            className="text-gray-400 text-center text-lg mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Teknologi dan tools yang saya kuasai
          </motion.p>

          {/* Technical & Non-Technical Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 md:p-8 rounded-lg border border-gray-700"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Keahlian Teknis</h3>
              <div className="space-y-4">
                {technicalSkills.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    <p className="text-white font-medium mb-1">{item.title}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 md:p-8 rounded-lg border border-gray-700"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Keahlian Non-Teknis</h3>
              <div className="space-y-4">
                {nonTechnicalSkills.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    <p className="text-white font-medium mb-1">{item.title}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Languages */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Programming Languages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {languages.map((lang, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 p-5 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      {lang.icon && (
                        <Image src={lang.icon} alt={`${lang.name} icon`} width={20} height={20} />
                      )}
                      <span className="text-gray-200 font-medium">{lang.name}</span>
                    </div>
                    <span className="text-blue-400 text-sm">{lang.level}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Frameworks & Libraries */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Frameworks & Libraries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {frameworks.map((fw, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 p-5 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      {fw.icon && (
                        <Image src={fw.icon} alt={`${fw.name} icon`} width={20} height={20} />
                      )}
                      <span className="text-gray-200 font-medium">{fw.name}</span>
                    </div>
                    <span className="text-blue-400 text-sm">{fw.level}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${fw.level}%` }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tools & Platforms */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Tools & Platforms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 p-5 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      {tool.icon && (
                        <Image src={tool.icon} alt={`${tool.name} icon`} width={20} height={20} />
                      )}
                      <span className="text-gray-200 font-medium">{tool.name}</span>
                    </div>
                    <span className="text-blue-400 text-sm">{tool.level}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.level}%` }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* PROJECTS SECTION */}
      <motion.section
        id="projects"
        className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full blur-xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Proyek Saya
          </motion.h2>
          <motion.p
            className="text-gray-300 text-center text-lg mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Kumpulan proyek yang telah saya kerjakan
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CERTIFICATES SECTION */}
      <motion.section
        id="certificates"
        className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Sertifikat & Penghargaan
          </motion.h2>
          <motion.p
            className="text-gray-400 text-center text-lg mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Sertifikasi profesional yang telah saya raih
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {certificates.map((cert, idx) => (
              <CertificateCard key={idx} title={cert.title} issuer={cert.issuer} image={cert.image} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section
        id="contact"
        className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full blur-xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Hubungi Saya
          </motion.h2>
          <motion.p
            className="text-gray-300 text-center text-lg mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Mari kita diskusikan proyek atau peluang kolaborasi Anda
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Informasi Kontak
              </h3>

              <div className="space-y-6">
                {[
                  {
                    icon: "📧",
                    title: "Email",
                    value: "ariekaprianda@gmail.com",
                  },
                  {
                    icon: "📱",
                    title: "WhatsApp",
                    value: "+62 812 8507 7403",
                  },
                  {
                    icon: "💼",
                    title: "LinkedIn",
                    value: "www.linkedin.com/in/ari-eka-prianda-78714232a",
                  },
                  {
                    icon: "🐙",
                    title: "GitHub",
                    value: "https://github.com/ariekakagerou",
                  },
                ].map((info, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                    className="group flex items-start gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 border border-gray-700"
                  >
                    <div className="text-3xl mt-1">{info.icon}</div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {info.title}
                      </h4>
                      <p className="text-gray-400 text-sm group-hover:text-blue-400 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-lg font-bold text-white mb-4">
                  Ikuti Saya
                </h4>
                <div className="flex gap-4">
                  {[
                    { icon: "f", label: "Facebook", url: "https://facebook.com/USERNAME" },
                    { icon: "𝕏", label: "Twitter", url: "https://twitter.com/USERNAME" },
                    { icon: "in", label: "Instagram", url: "https://instagram.com/USERNAME" },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      aria-label={social.label}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 md:p-10 rounded-lg border border-gray-700">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Kirim Pesan
                </h3>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Terima Kasih!
                    </h4>
                    <p className="text-gray-300 text-center">
                      Pesan Anda telah terkirim. Saya akan menghubungi Anda
                      segera.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-gray-200 font-medium mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="Nama Anda"
                      />
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-gray-200 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="email@example.com"
                      />
                    </motion.div>

                    {/* Subject Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-gray-200 font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="Subjek pesan"
                      />
                    </motion.div>

                    {/* Message Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-gray-200 font-medium mb-2">
                        Pesan
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                        placeholder="Tulis pesan Anda di sini..."
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Kirim Pesan
                      </span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}