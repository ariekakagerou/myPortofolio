"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
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

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section>
      <h1 className="text-4xl font-bold text-indigo-400 mb-6"> Proyek Saya </h1>
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              active === cat
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                : "bg-transparent border-gray-700 text-gray-300 hover:border-indigo-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          transition={{ layout: { duration: 0.4 } }}
        >
          {filtered.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
