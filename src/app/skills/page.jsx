"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Database,
  Wrench,
  Users,
  Calendar,
  MessageSquare,
  Briefcase,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

export default function SkillsPage() {
  const [copiedItem, setCopiedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const technicalSkills = [
    {
      title: "Pengembangan Aplikasi Web & Mobile",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      description: "Membangun aplikasi responsif dengan teknologi modern untuk web dan mobile"
    },
    {
      title: "Desain dan Arsitektur Perangkat Lunak",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      description: "Merancang struktur sistem yang scalable, maintainable, dan efisien"
    },
    {
      title: "Database Management System",
      icon: <Database className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      description: "Mengelola dan mengoptimalkan basis data untuk performa terbaik"
    },
    {
      title: "RESTful API & Integrasi Sistem",
      icon: <Wrench className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      description: "Membangun API dan mengintegrasikan berbagai sistem dengan standar terbaik"
    },
  ];

  const nonTechnicalSkills = [
    {
      title: "Pemecahan Masalah & Analisis",
      icon: <Code className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      description: "Menganalisis masalah kompleks dan menemukan solusi efektif"
    },
    {
      title: "Manajemen Waktu",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-cyan-500 to-blue-500",
      description: "Mengatur prioritas dan menyelesaikan tugas tepat waktu"
    },
    {
      title: "Kolaborasi & Kerja Tim",
      icon: <Users className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      description: "Berkontribusi aktif dalam tim dengan komunikasi yang efektif"
    },
    {
      title: "Disiplin & Tanggung Jawab",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      description: "Menjaga komitmen dan bertanggung jawab atas tugas yang diberikan"
    },
  ];

  const languages = [
    { name: "JAVASCRIPT", color: "bg-yellow-400 text-black", level: 62, icon: "/icons/javascript-icon.png" },
    { name: "TYPESCRIPT", color: "bg-blue-500", level: 58, icon: "/icons/typescript-icon.png" },
    { name: "DART", color: "bg-cyan-500", level: 55, icon: "/icons/dart-icon.png" },
    { name: "PHP", color: "bg-indigo-500", level: 60, icon: "/icons/php-icon.png" },
    { name: "C++", color: "bg-blue-600", level: 50 },
    { name: "GO", color: "bg-cyan-400 text-black", level: 57, icon: "/icons/golang-icon.png" },
    { name: "HTML5", color: "bg-orange-500", level: 65, icon: "/icons/html5-icon.png" },
    { name: "CSS3", color: "bg-blue-400", level: 63, icon: "/icons/css3-icon.png" },
  ];

  const frameworks = [
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

  const tools = [
    { name: "FIREBASE", color: "bg-yellow-500 text-black", level: 60, icon: "/icons/firebase-icon.png" },
    { name: "DOCKER", color: "bg-blue-500", level: 55 },
    { name: "MYSQL", color: "bg-blue-600", level: 58, icon: "/icons/mysql-icon.png" },
    { name: "GIT", color: "bg-orange-600", level: 65, icon: "/icons/git-icon.png" },
    { name: "FIGMA", color: "bg-purple-500", level: 55, icon: "/icons/figma-icon.png" },
    { name: "CANVA", color: "bg-cyan-400 text-black", level: 60, icon: "/icons/canva-icon.png" },
    { name: "POSTMAN", color: "bg-orange-500", level: 62, icon: "/icons/postman-icon.png" },
    { name: "VERCEL", color: "bg-black border border-white", level: 50 },
  ];

  const tabs = useMemo(() => ([
    { key: 'languages', label: 'Languages', data: languages, barClass: 'from-blue-500 to-purple-500' },
    { key: 'frameworks', label: 'Frameworks', data: frameworks, barClass: 'from-purple-500 to-pink-500' },
    { key: 'tools', label: 'Tools', data: tools, barClass: 'from-green-500 to-cyan-500' }
  ]), []);
  const [activeTab, setActiveTab] = useState('languages');

  const activeData = useMemo(() => tabs.find(t => t.key === activeTab) || tabs[0], [activeTab, tabs]);

  const handleCopy = async (text, type, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(`${type}-${index}`);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-sm text-purple-300 font-medium">Skills & Expertise</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Technical Skills & Expertise
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mahasiswa Teknik Informatika dengan passion dalam pengembangan
            software dan teknologi. Siap berkontribusi dalam tim pengembangan
            dengan skill teknis yang solid dan kemampuan problem-solving yang
            kuat.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Technical Skills */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center mb-8">
              <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-purple-600 rounded mr-4"></div>
              <h2 className="text-3xl font-bold text-white">Keahlian Teknis</h2>
            </div>
            <div className="space-y-4">
              {technicalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start gap-4 relative z-10">
                    <div
                      className={`p-3 bg-gradient-to-br ${skill.color} rounded-lg text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {skill.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Technical Skills */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center mb-8">
              <div className="w-2 h-10 bg-gradient-to-b from-pink-500 to-orange-600 rounded mr-4"></div>
              <h2 className="text-3xl font-bold text-white">Keahlian Non-Teknis</h2>
            </div>
            <div className="space-y-4">
              {nonTechnicalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-pink-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/25 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start gap-4 relative z-10">
                    <div
                      className={`p-3 bg-gradient-to-br ${skill.color} rounded-lg text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {skill.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Tabs */}
        <div className="space-y-8">
          <div className="flex justify-center gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${activeTab === t.key ? 'bg-indigo-600 border-indigo-500 text-white shadow-indigo-500/30 shadow' : 'bg-transparent border-white/20 text-gray-300 hover:border-indigo-500 hover:text-white'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.25 }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {activeData.data.map((item, index) => (
                  <div key={index} className="group relative">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.name, activeTab === 'languages' ? 'lang' : activeTab === 'frameworks' ? 'fw' : 'tool', index)}
                      className={`${item.color} w-full px-4 py-4 rounded-xl font-bold text-sm ${activeTab === 'languages' ? 'tracking-wide' : 'text-white'} hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-between`}
                      title={`Salin ${item.name}`}
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && (
                          <Image src={item.icon} alt={`${item.name} icon`} width={18} height={18} />
                        )}
                        {item.name}
                      </span>
                      {copiedItem === `${activeTab === 'languages' ? 'lang' : activeTab === 'frameworks' ? 'fw' : 'tool'}-${index}` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${activeData.barClass} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button as="a" href="/projects" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50">
            <Briefcase className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span>Lihat Portfolio Projects</span>
          </button>
        </div>
      </div>
    </section>
  );
}