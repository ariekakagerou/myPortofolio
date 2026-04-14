"use client";

import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import CertificateCard from "@/components/CertificateCard";
import AutoCarousel from "@/components/AutoCarousel";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { certificates } from "@/data/certificates";
import { technicalSkills, nonTechnicalSkills, programmingLanguages, frameworks, tools } from "@/data/skills";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function Home() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
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

  // Localized projects from centralized store
  const localizedProjects = useMemo(() =>
    projects.map((p) => ({
      ...p,
      description: language === "en" ? p.description_en : p.description_id,
      duration: language === "en" ? p.duration_en : p.duration_id,
    })),
    [language]
  );

  // Localized skills
  const localizedTechnical = useMemo(() =>
    technicalSkills.map((s) => ({
      ...s,
      title: language === "en" ? s.title_en : s.title_id,
      description: language === "en" ? s.description_en : s.description_id,
    })),
    [language]
  );

  const localizedNonTechnical = useMemo(() =>
    nonTechnicalSkills.map((s) => ({
      ...s,
      title: language === "en" ? s.title_en : s.title_id,
      description: language === "en" ? s.description_en : s.description_id,
    })),
    [language]
  );

  // Central data alias (replace local duplicate variables)
  const languages = programmingLanguages;

  // Certificates already imported from centralized store

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
              {t.hero.subtitle} <span className="text-cyan-400 font-semibold">{t.hero.backend}</span> & <span className="text-blue-400 font-semibold">{t.hero.mobile}</span>
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
                {t.hero.downloadCv}
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
                {t.hero.contactMe}
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
                {t.hero.viewProjects}
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
              {t.nav.about}
            </motion.button>
            <motion.button
              className="px-5 py-2 rounded-full border border-white/20 text-gray-200 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/certificates")}
            >
              {t.nav.certificates}
            </motion.button>
            <motion.button
              className="px-5 py-2 rounded-full border border-white/20 text-gray-200 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/skills")}
            >
              {t.nav.skills}
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-12 sm:mt-16 flex flex-col items-center"
            variants={itemVariants}
          >
            <p className="text-gray-400 text-xs sm:text-sm mb-2 px-4 text-center">
              {t.common.scrollDown}
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
            {language === "en" ? "Welcome to My Portfolio" : "Selamat Datang di Portofolio Saya"}
          </motion.h1>
          <motion.p
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {language === "en"
              ? "Here you can find information about my skills, projects, certificates, and how to contact me."
              : "Di sini Anda dapat menemukan informasi tentang keahlian, proyek, sertifikat, dan cara menghubungi saya."}
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
            {t.about.title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mt-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t.about.subtitle}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {t.about.desc1}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t.about.desc2}
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
            {language === "en" ? "Keahlian Saya" : "Keahlian Saya"}
          </motion.h2>
          <motion.p
            className="text-gray-400 text-center text-lg mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {language === "en" ? "Technologies and tools I master" : "Teknologi dan tools yang saya kuasai"}
          </motion.p>

          {/* Technical & Non-Technical Skills Carousel */}
          <div className="mb-12">
            <AutoCarousel itemsCount={2} desktopItems={2} tabletItems={2} mobileItems={1} interval={5000}>
              {/* Technical Skills */}
              <div className="w-full min-w-[100%] md:min-w-[calc(50%-0.75rem)] shrink-0 bg-gradient-to-br from-gray-800 to-gray-700 p-6 md:p-8 rounded-lg border border-gray-700 flex flex-col h-full">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6">{t.skills.technical}</h3>
                <div className="space-y-4 flex-1">
                  {localizedTechnical.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-colors">
                      <p className="text-white font-medium mb-1">{item.title}</p>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Technical Skills */}
              <div className="w-full min-w-[100%] md:min-w-[calc(50%-0.75rem)] shrink-0 bg-gradient-to-br from-gray-800 to-gray-700 p-6 md:p-8 rounded-lg border border-gray-700 flex flex-col h-full">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6">{t.skills.nonTechnical}</h3>
                <div className="space-y-4 flex-1">
                  {localizedNonTechnical.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-colors">
                      <p className="text-white font-medium mb-1">{item.title}</p>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AutoCarousel>
          </div>

          {/* Languages */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Programming Languages</h3>
            <AutoCarousel itemsCount={languages.length} desktopItems={3} tabletItems={2} mobileItems={1} interval={4000}>
              {languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="w-full min-w-[100%] md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)] shrink-0 bg-gradient-to-br from-gray-800 to-gray-700 p-5 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors"
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
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </AutoCarousel>
          </div>

          {/* Frameworks & Libraries */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Frameworks & Libraries</h3>
            <AutoCarousel itemsCount={frameworks.length} desktopItems={3} tabletItems={2} mobileItems={1} interval={4500}>
              {frameworks.map((fw, idx) => (
                <div
                  key={idx}
                  className="w-full min-w-[100%] md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)] shrink-0 bg-gradient-to-br from-gray-800 to-gray-700 p-5 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors"
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
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${fw.level}%` }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </AutoCarousel>
          </div>

          {/* Tools & Platforms */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">{language === "en" ? "Tools & Platforms" : "Tools & Platforms"}</h3>
            <AutoCarousel itemsCount={tools.length} desktopItems={3} tabletItems={2} mobileItems={1} interval={5000}>
              {tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="w-full min-w-[100%] md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)] shrink-0 bg-gradient-to-br from-gray-800 to-gray-700 p-5 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors"
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
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.level}%` }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </AutoCarousel>
          </div>
        </div>
      </motion.section>

      {/* CASE STUDIES SECTION */}
      <motion.section
        id="case-studies"
        className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="text-left">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t.caseStudies.title}
              </motion.h2>
              <motion.p
                className="text-gray-400 text-lg max-w-xl"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t.caseStudies.subtitle}
              </motion.p>
            </div>
            <motion.button
              onClick={() => router.push("/case-studies")}
              className="px-6 py-3 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all font-bold text-sm whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === "en" ? "View All Case Studies" : "Lihat Semua Studi Kasus"}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.slice(0, 3).map((cs, index) => {
              const project = projects.find(p => p.id === cs.projectId);
              if (!project) return null;
              return (
                <motion.div
                  key={cs.projectId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-6">
                      {language === "en" ? cs.overview_en : cs.overview_id}
                    </p>
                    <Link 
                      href={`/projects/${cs.projectId}`} 
                      className="inline-flex items-center gap-2 text-cyan-400 text-sm font-bold group/btn"
                    >
                      {t.caseStudies.readMore}
                      <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
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
            {t.projects.title}
          </motion.h2>
          <motion.p
            className="text-gray-300 text-center text-lg mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.projects.subtitle}
          </motion.p>

          <div>
            <AutoCarousel itemsCount={localizedProjects.length} desktopItems={2} tabletItems={2} mobileItems={1} interval={5000}>
              {localizedProjects.map((project, index) => (
                <div key={index} className="w-full min-w-[100%] md:min-w-[calc(50%-0.75rem)] shrink-0">
                  <ProjectCard {...project} />
                </div>
              ))}
            </AutoCarousel>
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
            {t.certificates.title}
          </motion.h2>
          <motion.p
            className="text-gray-400 text-center text-lg mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.certificates.subtitle}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {certificates.map((cert, idx) => (
              <CertificateCard key={idx} title={language === "en" ? cert.title_en : cert.title} issuer={cert.issuer} image={cert.image} />
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
            {t.contact.title}
          </motion.h2>
          <motion.p
            className="text-gray-300 text-center text-lg mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.contact.subtitle}
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
                {t.contact.infoTitle}
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
                  {t.contact.followMe}
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
                  {t.contact.sendMessage}
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
                      {t.contact.successTitle}
                    </h4>
                    <p className="text-gray-300 text-center">
                      {t.contact.successDesc}
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
                        {t.contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/40 backdrop-blur-md text-white border border-white/10 placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] focus:outline-none transition-all duration-300"
                        placeholder={t.contact.namePlaceholder}
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
                        {t.contact.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/40 backdrop-blur-md text-white border border-white/10 placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] focus:outline-none transition-all duration-300"
                        placeholder={t.contact.emailPlaceholder}
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
                        {t.contact.subjectLabel}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/40 backdrop-blur-md text-white border border-white/10 placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] focus:outline-none transition-all duration-300"
                        placeholder={t.contact.subjectPlaceholder}
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
                        {t.contact.messageLabel}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/40 backdrop-blur-md text-white border border-white/10 placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] focus:outline-none transition-all duration-300 resize-none"
                        placeholder={t.contact.messagePlaceholder}
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
                      className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold tracking-wide rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:from-cyan-500 hover:to-blue-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
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
                        {t.contact.sendButton}
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