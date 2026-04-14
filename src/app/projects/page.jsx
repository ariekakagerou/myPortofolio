"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectsPage() {
  const { language } = useLanguage();

  // Add localized description to each project
  const localizedProjects = useMemo(() =>
    projects.map((p) => ({
      ...p,
      description: language === "en" ? p.description_en : p.description_id,
      duration: language === "en" ? p.duration_en : p.duration_id,
      highlights: language === "en" ? p.highlights_en : p.highlights,
      challenges: language === "en" ? p.challenges_en : p.challenges_id,
      impact: language === "en" ? p.impact_en : p.impact_id,
    })),
    [language]
  );

  const categories = useMemo(() => {
    const cats = new Set(localizedProjects.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [localizedProjects]);

  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? localizedProjects : localizedProjects.filter((p) => p.category === active)),
    [active, localizedProjects]
  );

  return (
    <section>
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 drop-shadow-sm">
        {language === "en" ? "My Projects" : "Proyek Saya"}
      </h1>
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-sm ${active === cat
                ? "bg-cyan-600 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-500 hover:text-white"
              }`}
          >
            {cat === "All" ? (language === "en" ? "All" : "Semua") : cat}
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
              key={`${project.id}-${index}`}
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
