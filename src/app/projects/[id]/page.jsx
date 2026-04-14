"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Target, Lightbulb, TrendingUp, BarChart3 } from "lucide-react";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import Image from "next/image";

export default function ProjectDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].caseStudies;

  const project = useMemo(() => projects.find((p) => p.id === id), [id]);
  const caseStudy = useMemo(() => caseStudies.find((cs) => cs.projectId === id), [id]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl text-white">Project not found</h1>
        <button onClick={() => router.back()} className="mt-4 text-cyan-400">Go Back</button>
      </div>
    );
  }

  const content = {
    overview: language === "en" ? caseStudy?.overview_en : caseStudy?.overview_id,
    problem: language === "en" ? caseStudy?.problem_en : caseStudy?.problem_id,
    solution: language === "en" ? caseStudy?.solution_en : caseStudy?.solution_id,
    results: language === "en" ? caseStudy?.results_en : caseStudy?.results_id,
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t.backToProjects}
      </motion.button>

      {/* Hero Section */}
      <div className="space-y-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase"
        >
          {project.category}
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text"
        >
          {project.title}
        </motion.h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative h-64 md:h-[450px] w-full rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl"
      >
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </motion.div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{language === 'en' ? 'Duration' : 'Durasi'}</p>
          <p className="text-white font-semibold">{language === 'en' ? project.duration_en : project.duration_id}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{language === 'en' ? 'Team' : 'Tim'}</p>
          <p className="text-white font-semibold">{project.teamSize}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Role</p>
          <p className="text-white font-semibold">{project.category}</p>
        </div>
      </div>

      {/* Case Study Content */}
      {caseStudy ? (
        <div className="space-y-16">
          <Section icon={<BarChart3 className="text-cyan-400" />} title={t.overview} text={content.overview} />
          <Section icon={<Target className="text-red-400" />} title={t.problem} text={content.problem} />
          <Section icon={<Lightbulb className="text-amber-400" />} title={t.solution} text={content.solution} />
          <Section icon={<TrendingUp className="text-emerald-400" />} title={t.results} text={content.results} />
          
          {/* Metrics */}
          {caseStudy.metrics && (
            <div className="pt-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-cyan-400" />
                {t.metrics}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {caseStudy.metrics.map((m, i) => (
                  <div key={i} className="bg-cyan-500/5 border border-cyan-500/20 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-white mb-1">{m.value}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">{language === "en" ? m.label_en : m.label_id}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-400 italic">No detailed case study available yet.</p>
      )}

      {/* Tech Stack Footer */}
      <div className="mt-20 pt-12 border-t border-white/10">
        <h3 className="text-white font-bold mb-6 italic">{language === 'en' ? 'Technologies Used' : 'Teknologi yang Digunakan'}</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span key={i} className="px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/5 hover:border-cyan-500/50 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, text }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-white flex items-center gap-4">
        <span className="p-2 bg-white/5 rounded-lg border border-white/10">{icon}</span>
        {title}
      </h2>
      <p className="text-gray-300 text-lg leading-relaxed pl-14">
        {text}
      </p>
    </motion.section>
  );
}
