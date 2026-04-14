"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function CaseStudiesPage() {
  const { language } = useLanguage();
  const t = translations[language].caseStudies;

  const featuredCaseStudies = useMemo(() => {
    return caseStudies.map(cs => {
      const project = projects.find(p => p.id === cs.projectId);
      return {
        ...cs,
        project,
        overview: language === "en" ? cs.overview_en : cs.overview_id,
      };
    }).filter(cs => cs.project);
  }, [language]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-cyan-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
              {t.title}
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {featuredCaseStudies.map((cs, index) => (
            <motion.div
              key={cs.projectId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gray-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500"
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={cs.project.image}
                  alt={cs.project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-cyan-400 border border-white/10 uppercase tracking-widest">
                    {cs.project.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {cs.project.title}
                </h2>
                <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed">
                  {cs.overview}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {cs.project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="text-[10px] font-bold text-gray-400 border border-white/5 bg-white/5 px-2 py-1 rounded uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <Link
                    href={`/projects/${cs.projectId}`}
                    className="flex items-center gap-2 text-cyan-400 font-bold group/link"
                  >
                    {t.readMore}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                  
                  {cs.project.githubLink && (
                    <a href={cs.project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Decorative corner glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
