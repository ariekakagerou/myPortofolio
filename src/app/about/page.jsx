"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  User,
  Download,
  Mail,
  Linkedin,
  Github,
  Languages,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import {
  personalInfoData,
  expertiseData,
  achievementsData,
  timelineData,
  hobbiesData,
  statsData,
} from "@/data/about";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];

  // Localized personal info
  const personalInfo = useMemo(() => 
    personalInfoData.map(item => ({
      ...item,
      ...t.about.personalInfo[item.id]
    })), [language, t.about.personalInfo]);

  // Localized expertise
  const expertise = useMemo(() => 
    expertiseData.map(item => ({
      ...item,
      title: t.about.expertise[item.id]
    })), [language, t.about.expertise]);

  // Localized achievements
  const achievements = useMemo(() => 
    achievementsData.map(item => ({
      ...item,
      ...t.about.achievements[item.id]
    })), [language, t.about.achievements]);

  // Localized timeline
  const timeline = useMemo(() => 
    timelineData.map(item => ({
      ...item,
      ...t.about.timeline[item.id]
    })), [language, t.about.timeline]);

  // Localized soft skills
  const softSkills = t.about.softSkills.skills;

  // Localized languages
  const languagesData = [
    { name: t.about.languages.indonesian, level: t.about.languages.native, proficiency: 100 },
    { name: t.about.languages.english, level: t.about.languages.professional, proficiency: 85 },
  ];

  // Localized hobbies
  const hobbies = useMemo(() => 
    hobbiesData.map(item => ({
      ...item,
      ...t.about.hobbies[item.id]
    })), [language, t.about.hobbies]);

  // Localized stats titles
  const stats = useMemo(() => 
    statsData.map(item => ({
      ...item,
      label: t.about.stats[item.id]
    })), [language, t.about.stats]);

  // Typewriter for role headline
  const [roleText, setRoleText] = useState("");
  const [caretVisible, setCaretVisible] = useState(true);
  const typeIndexRef = useRef(0);

  useEffect(() => {
    const fullRole = language === "en" ? "Full-Stack Developer" : "Full-Stack Developer";
    const typingInterval = setInterval(() => {
      const index = typeIndexRef.current;
      if (index <= fullRole.length) {
        setRoleText(fullRole.slice(0, index));
        typeIndexRef.current = index + 1;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);
    return () => clearInterval(typingInterval);
  }, [language]);

  useEffect(() => {
    const caretInterval = setInterval(() => setCaretVisible((v) => !v), 500);
    return () => clearInterval(caretInterval);
  }, []);

  // Animate progress bars when the section enters viewport
  const progressRef = useRef(null);
  const [animateBars, setAnimateBars] = useState(false);

  // Animation for stats counter
  const statsRef = useRef(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [counterValues, setCounterValues] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!progressRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateBars(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(progressRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateStats(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Count-up animation for stats when in view
  useEffect(() => {
    if (!animateStats) return;
    const durationMs = 1200;
    const start = performance.now();
    const targets = stats.map((s) => {
      const num = parseInt(String(s.value).replace(/[^0-9]/g, ""));
      return Number.isNaN(num) ? 0 : num;
    });

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCounterValues(targets.map((t) => Math.round(t * easeOutCubic)));
      if (progress < 1) requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [animateStats, stats]);

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
        {/* Premium Split Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full text-cyan-300 text-sm font-bold mb-6 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              {t.about.availableForHire}
            </div>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-sm">
              {t.about.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              {t.about.desc1}{" "}
              <span className="text-blue-400 font-semibold relative inline-block">
                {roleText}
                <span className={`ml-1 inline-block w-[2px] h-6 bg-blue-400 align-middle ${caretVisible ? "opacity-100" : "opacity-0"}`}></span>
              </span>{" "}
              {t.about.desc2}
            </p>
            
            {/* Stats Counter */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center group hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                >
                  <div className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {(() => {
                      const raw = String(stat.value);
                      const numeric = parseInt(raw.replace(/[^0-9]/g, ""));
                      const hasPlus = raw.includes("+");
                      if (Number.isNaN(numeric)) return raw;
                      const val = counterValues[index] || 0;
                      return `${val}${hasPlus ? "+" : ""}`;
                    })()}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                <Download className="w-5 h-5" />
                <span> {t.about.downloadCv} </span>
              </button>
              <button as="a" href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-md rounded-xl text-white font-bold border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 transform hover:scale-105">
                <Mail className="w-5 h-5" />
                <span> {t.about.contactMe} </span>
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center items-center relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gray-900/80 rounded-full border border-white/20 backdrop-blur-xl flex items-center justify-center overflow-hidden z-10 shadow-[0_0_40px_rgba(6,182,212,0.3)] group">
                <User className="w-32 h-32 text-gray-600 group-hover:text-cyan-400 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Personal Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {personalInfo.map((info, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 group relative overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-start gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                  {info.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-white">
                      {info.title}
                    </h3>
                    <span className="text-xs px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                      {info.stats}
                    </span>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed mb-4">
                    {info.desc}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-purple-500/50 pl-4">
                    {info.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Expertise Section with Progress Bars */}
        <div className="mb-20" ref={progressRef}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 inline-flex items-center justify-center gap-3">
              <span className="w-3 h-10 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></span>
              {t.about.expertise.title}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t.about.expertise.desc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertise.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-pink-500/50 transition-all duration-500 group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">
                      {skill.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {skill.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">{language === "en" ? "Proficiency" : "Kemampuan"}</span>
                    <span className="text-sm font-semibold text-white">
                      {animateBars ? `${skill.level}%` : "0%"}
                    </span>
                  </div>
                  <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ 
                        width: animateBars ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 200}ms`
                      }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Achievements Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 inline-flex items-center justify-center gap-3">
              <span className="w-3 h-10 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></span>
              {t.about.achievements.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 text-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                    {achievement.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {achievement.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Timeline Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 inline-flex items-center justify-center gap-3">
              <span className="w-3 h-10 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></span>
              {t.about.timeline.title}
            </h2>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded shadow-2xl"></div>
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex-1 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-blue-500/50 transition-all duration-500 mx-6 group hover:transform hover:scale-105 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-blue-400 font-bold text-2xl">
                          {item.year}
                        </div>
                        <span className="text-sm px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                          {item.highlight}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-2xl mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-base leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-slate-900 z-10 group-hover:scale-125 transition-transform duration-300 shadow-lg"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Soft Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-white mb-4 inline-flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></span>
                {t.about.softSkills.title}
              </h2>
              <p className="text-gray-400 text-sm">{t.about.softSkills.desc}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="px-5 py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-cyan-500/50 text-gray-300 hover:text-white transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-default group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 font-medium text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
             <div className="mb-10">
              <h2 className="text-3xl font-bold text-white mb-4 inline-flex items-center gap-3">
                <Languages className="text-cyan-400 w-8 h-8" />
                {t.about.languages.title}
              </h2>
              <p className="text-gray-400 text-sm">{t.about.languages.desc}</p>
            </div>
            <div className="space-y-6">
              {languagesData.map((lang, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white">{lang.name}</span>
                    <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg">{lang.level}</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${lang.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 inline-flex items-center justify-center gap-3">
              <span className="w-3 h-10 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></span>
              {t.about.hobbies.title}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t.about.hobbies.desc}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hobbies.map((hobby, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2 group text-center"
              >
                <div className="inline-flex p-4 bg-white/5 rounded-2xl text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-lg">
                  {hobby.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{hobby.name}</h3>
                <p className="text-sm text-gray-400">{hobby.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-6">
                {t.about.cta}
              </h3>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                {t.about.ctaDesc}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/40">
                  <Mail className="w-5 h-5" />
                  <span> {t.about.emailMe} </span>
                </button>
                <a href="https://linkedin.com/in/ariekaprianda" target="_blank" rel="noopener noreferrer nofollow" aria-label="LinkedIn Ari Eka Prianda" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white font-semibold border border-white/20 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                  <Linkedin className="w-5 h-5" />
                  <span> LinkedIn </span>
                </a>
                <a href="https://github.com/ariekakagerou" target="_blank" rel="noopener noreferrer nofollow" aria-label="GitHub Ari Eka Prianda" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white font-semibold border border-white/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
                  <Github className="w-5 h-5" />
                  <span> GitHub </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}