"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Code,
  Heart,
  Target,
  Lightbulb,
  Globe,
  Coffee,
  Award,
  Briefcase,
  Star,
  TrendingUp,
  Download,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";

export default function AboutPage() {
  const personalInfo = [
    {
      title: "Pendidikan",
      description:
        "Mahasiswa S1 Teknik Informatika dengan IPK 3.7+ dan pengalaman dalam pengembangan software profesional.",
      icon: <GraduationCap className="w-6 h-6" />,
      details:
        "Fokus pada Software Engineering, Web Development, dan Data Structures & Algorithms. Aktif dalam berbagai organisasi dan kompetisi programming.",
      stats: "IPK 3.7+ | Semester 6",
    },
    {
      title: "Skills & Expertise",
      description:
        "Full-stack developer dengan kemampuan dalam modern web technologies dan best practices.",
      icon: <Code className="w-6 h-6" />,
      details:
        "React.js, Next.js, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, Git, Docker, dan REST API development.",
      stats: "10+ Technologies",
    },
    {
      title: "Professional Goals",
      description:
        "Mencari kesempatan sebagai Software Developer untuk berkontribusi dalam tim yang inovatif.",
      icon: <Target className="w-6 h-6" />,
      details:
        "Berdedikasi untuk menulis clean code, mengikuti best practices, dan terus belajar teknologi terbaru untuk memberikan solusi terbaik.",
      stats: "Career Ready",
    },
    {
      title: "Work Philosophy",
      description:
        "Percaya pada kolaborasi tim, continuous learning, dan code quality untuk menciptakan produk yang excellent.",
      icon: <Lightbulb className="w-6 h-6" />,
      details:
        "Menerapkan Agile methodology, code review, testing, dan dokumentasi yang baik dalam setiap project.",
      stats: "Team Player",
    },
  ];

  const expertise = [
    {
      title: "Frontend Development",
      description: "React, Next.js, Vue.js, Tailwind CSS",
      icon: <Code className="w-6 h-6" />,
      level: 60,
    },
    {
      title: "Backend Development",
      description: "Node.js, Express, REST API, GraphQL",
      icon: <Globe className="w-6 h-6" />,
      level: 55,
    },
    {
      title: "Database Management",
      description: "MongoDB, PostgreSQL, MySQL, Redis",
      icon: <Award className="w-6 h-6" />,
      level: 50,
    },
    {
      title: "Mobile Development",
      description: "React Native, Flutter, Responsive Design",
      icon: <Briefcase className="w-6 h-6" />,
      level: 45,
    },
  ];

  const achievements = [
    {
      title: "5+ Projects Completed",
      description: "Successfully delivered various web and mobile applications",
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: "100+ GitHub Contributions",
      description: "Active contributor in open source community",
      icon: <Github className="w-5 h-5" />,
    },
    {
      title: "Fast Learner",
      description: "Quickly adapt to new technologies and frameworks",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      title: "Team Collaboration",
      description: "Experienced in working with cross-functional teams",
      icon: <Heart className="w-5 h-5" />,
    },
  ];

  const timeline = [
    {
      year: "2022",
      title: "Memulai Journey Programming",
      description:
        "Belajar fundamental programming dengan C++, Python, dan JavaScript. Membangun project pertama berupa website sederhana.",
      highlight: "Foundation Building",
    },
    {
      year: "2023",
      title: "Full-Stack Development Mastery",
      description:
        "Mendalami MERN Stack (MongoDB, Express, React, Node.js) dan membangun beberapa full-stack applications dengan fitur kompleks.",
      highlight: "Professional Growth",
    },
    {
      year: "2024",
      title: "Advanced Topics & Real Projects",
      description:
        "Mempelajari Docker, CI/CD, testing, dan system design. Mengerjakan project nyata untuk klien dan berkontribusi dalam open source.",
      highlight: "Industry Ready",
    },
    {
      year: "2025",
      title: "Seeking Opportunities",
      description:
        "Siap untuk bergabung dengan tim profesional dan berkontribusi dalam pengembangan produk software berkualitas tinggi.",
      highlight: "Career Launch",
    },
  ];

  const softSkills = [
    "Problem Solving",
    "Critical Thinking",
    "Team Collaboration",
    "Communication",
    "Time Management",
    "Adaptability",
    "Attention to Detail",
    "Self-Learning",
  ];

  const stats = [
    { label: "Projects Completed", value: "15+" },
    { label: "Technologies Mastered", value: "20+" },
    { label: "Coding Hours", value: "2000+" },
    { label: "Coffee Cups", value: "∞" },
  ];

  // Typewriter for role headline
  const fullRole = "Full-Stack Developer";
  const [roleText, setRoleText] = useState("");
  const [caretVisible, setCaretVisible] = useState(true);
  const typeIndexRef = useRef(0);

  useEffect(() => {
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
  }, []);

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
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6 border border-blue-500/30 backdrop-blur-sm">
            <Award className="w-4 h-4" />
            <span> Available for Hire </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 leading-tight">
            Tentang Saya
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Seorang{" "}
            <span className="text-blue-400 font-semibold relative inline-block">
              {roleText}
              <span className={`ml-1 inline-block w-[2px] h-6 bg-blue-400 align-middle ${caretVisible ? "opacity-100" : "opacity-0"}`}></span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>{" "}
            passionate yang berfokus pada pembuatan aplikasi web dan mobile
            dengan performa tinggi dan user experience yang excellent. Siap
            berkontribusi dalam tim development profesional.
          </p>
          
          {/* Stats Counter */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-10">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center group hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {(() => {
                    const raw = String(stat.value);
                    const numeric = parseInt(raw.replace(/[^0-9]/g, ""));
                    const hasPlus = raw.includes("+");
                    if (Number.isNaN(numeric)) return raw;
                    const val = counterValues[index] || 0;
                    return `${val}${hasPlus ? "+" : ""}`;
                  })()}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
              <Download className="w-5 h-5" />
              <span> Download CV </span>
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white font-semibold border border-white/20 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
              <Mail className="w-5 h-5" />
              <span> Contact Me </span>
            </button>
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
                    {info.description}
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
              Technical Expertise
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Pengalaman dan kemampuan teknis yang terus dikembangkan melalui project nyata dan continuous learning
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
                    <span className="text-sm text-gray-300">Proficiency</span>
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
              Achievements & Highlights
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
                    {achievement.description}
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
              Professional Journey
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
                        {item.description}
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
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 inline-flex items-center justify-center gap-3">
              <span className="w-3 h-10 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></span>
              Soft Skills
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Kemampuan interpersonal yang mendukung kolaborasi efektif dan pengembangan profesional
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {softSkills.map((skill, index) => (
              <div
                key={index}
                className="px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-purple-500/50 text-gray-300 hover:text-white transition-all duration-300 hover:transform hover:scale-110 cursor-default group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 font-medium">{skill}</span>
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
                Mari Berkolaborasi!
              </h3>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                Saya terbuka untuk peluang kerja full-time, freelance, atau
                kolaborasi project. Mari diskusikan bagaimana saya dapat
                berkontribusi dalam tim Anda!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/40">
                  <Mail className="w-5 h-5" />
                  <span> Email Me </span>
                </button>
                <button as="a" href="https://linkedin.com/in/ariekaprianda" target="_blank" rel="noopener noreferrer nofollow" aria-label="LinkedIn Ari Eka Prianda" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white font-semibold border border-white/20 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                  <Linkedin className="w-5 h-5" />
                  <span> LinkedIn </span>
                </button>
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white font-semibold border border-white/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
                  <Github className="w-5 h-5" />
                  <span> GitHub </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}