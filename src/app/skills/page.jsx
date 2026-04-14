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
import { useLanguage } from "@/context/LanguageContext";
import {
  technicalSkills,
  nonTechnicalSkills,
  programmingLanguages,
  frameworks,
  tools,
} from "@/data/skills";

// Map icon strings to components (data file can't store JSX)
const ICON_MAP = {
  Code: <Code className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Calendar: <Calendar className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  MessageSquare: <MessageSquare className="w-6 h-6" />,
};

const TECHNICAL_ICONS = ["Code", "Briefcase", "Database", "Wrench"];
const NON_TECHNICAL_ICONS = ["Code", "Calendar", "Users", "MessageSquare"];

export default function SkillsPage() {
  const { language } = useLanguage();
  const [copiedItem, setCopiedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const localizedTechnical = useMemo(() =>
    technicalSkills.map((s, i) => ({
      ...s,
      title: language === "en" ? s.title_en : s.title_id,
      description: language === "en" ? s.description_en : s.description_id,
      icon: ICON_MAP[TECHNICAL_ICONS[i]],
    })), [language]
  );

  const localizedNonTechnical = useMemo(() =>
    nonTechnicalSkills.map((s, i) => ({
      ...s,
      title: language === "en" ? s.title_en : s.title_id,
      description: language === "en" ? s.description_en : s.description_id,
      icon: ICON_MAP[NON_TECHNICAL_ICONS[i]],
    })), [language]
  );

  const tabs = useMemo(() => ([
    {
      key: "languages",
      label: language === "en" ? "Languages" : "Bahasa",
      data: programmingLanguages,
      barClass: "from-blue-500 to-purple-500",
    },
    {
      key: "frameworks",
      label: "Frameworks",
      data: frameworks,
      barClass: "from-purple-500 to-pink-500",
    },
    {
      key: "tools",
      label: "Tools",
      data: tools,
      barClass: "from-green-500 to-cyan-500",
    },
  ]), [language]);

  const [activeTab, setActiveTab] = useState("languages");
  const activeData = useMemo(() => tabs.find((t) => t.key === activeTab) || tabs[0], [activeTab, tabs]);

  const handleCopy = async (text, type, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(`${type}-${index}`);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden py-12">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-bold">Skills & Expertise</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 drop-shadow-sm">
            {language === "en" ? "Technical Skills & Expertise" : "Technical Skills & Expertise"}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {language === "en"
              ? "Informatics student passionate about software development and technology. Ready to contribute to development teams with solid technical skills and strong problem-solving abilities."
              : "Mahasiswa Teknik Informatika dengan passion dalam pengembangan software dan teknologi. Siap berkontribusi dalam tim pengembangan dengan skill teknis yang solid dan kemampuan problem-solving yang kuat."}
          </p>
        </div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Technical Skills */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center mb-8">
              <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-purple-600 rounded mr-4"></div>
              <h2 className="text-3xl font-bold text-white">
                {language === "en" ? "Technical Skills" : "Keahlian Teknis"}
              </h2>
            </div>
            <div className="space-y-4">
              {localizedTechnical.map((skill, index) => (
                <div
                  key={skill.id}
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`p-3 bg-gradient-to-br ${skill.color} rounded-lg text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{skill.title}</h3>
                      <p className="text-gray-300 text-sm">{skill.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Technical Skills */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center mb-8">
              <div className="w-2 h-10 bg-gradient-to-b from-pink-500 to-orange-600 rounded mr-4"></div>
              <h2 className="text-3xl font-bold text-white">
                {language === "en" ? "Non-Technical Skills" : "Keahlian Non-Teknis"}
              </h2>
            </div>
            <div className="space-y-4">
              {localizedNonTechnical.map((skill) => (
                <div
                  key={skill.id}
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-pink-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/25 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`p-3 bg-gradient-to-br ${skill.color} rounded-lg text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{skill.title}</h3>
                      <p className="text-gray-300 text-sm">{skill.description}</p>
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
                className={`px-4 py-2 rounded-full border transition-all duration-300 font-bold backdrop-blur-sm ${activeTab === t.key ? "bg-cyan-600 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-500 hover:text-white"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.25 }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {activeData.data.map((item, index) => {
                  const typeKey = activeTab === "languages" ? "lang" : activeTab === "frameworks" ? "fw" : "tool";
                  return (
                    <div key={index} className="group relative">
                      <button
                        type="button"
                        onClick={() => handleCopy(item.name, typeKey, index)}
                        className={`${item.color} w-full px-4 py-4 rounded-xl font-bold text-sm text-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-between`}
                        title={language === "en" ? `Copy ${item.name}` : `Salin ${item.name}`}
                      >
                        <span className="flex items-center gap-2">
                          {item.icon && (
                            <Image src={item.icon} alt={`${item.name} icon`} width={18} height={18} />
                          )}
                          {item.name}
                        </span>
                        {copiedItem === `${typeKey}-${index}` ? (
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
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <a href="/projects" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white font-bold hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]">
            <Briefcase className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span>{language === "en" ? "View Portfolio Projects" : "Lihat Portfolio Projects"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}