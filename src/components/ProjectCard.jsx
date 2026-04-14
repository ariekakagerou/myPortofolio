'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { caseStudies } from '@/data/caseStudies';

export default function ProjectCard({
  id,
  title,
  description,
  image,
  technologies = [],
  category,
  githubLink,
  liveLink,
  featured = false,
  status,
  duration,
  teamSize,
  highlights = [],
  challenges,
  impact
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { language } = useLanguage();
  const isEn = language === 'en';

  const statusColors = {
    completed: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]',
    'in-progress': 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]',
    planning: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]'
  };

  const statusLabels = {
    completed: 'Selesai',
    'in-progress': 'Dalam Progres',
    planning: 'Perencanaan'
  };

  return (
    <motion.div 
      layout
      className={`group relative bg-gray-900/40 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.3)] hover:-translate-y-2 border ${
        featured ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-gray-700/50 hover:border-cyan-500/30'
      }`}
    >
      
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center gap-1">
          <span>⭐</span> UNGGULAN
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${statusColors[status] || 'bg-gray-500'}`}></span>
        <span className="bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-medium border border-white/5">
          {statusLabels[status] || status}
        </span>
      </div>

      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br from-cyan-900/50 to-blue-900/50 flex items-center justify-center transition-opacity duration-300 ${
          imageLoaded ? 'opacity-0 absolute' : 'opacity-100'
        }`}>
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 text-cyan-500/50"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </motion.div>
        </div>
        
        <Image
          src={image || "/images/placeholder.jpg"}
          alt={title}
          fill
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadingComplete={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        
        {/* Modern dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Hover overlay content */}
        <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex flex-wrap gap-2 mb-3">
            {technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="bg-cyan-500/20 text-cyan-100 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded backdrop-blur-sm border border-cyan-400/30">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg backdrop-blur-md transition-colors text-xs font-semibold border border-white/10"
              >
                Source Code
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-cyan-500/80 hover:bg-cyan-400 text-white py-2 rounded-lg backdrop-blur-md transition-colors text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-5 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Project Info */}
        <div className="flex items-center gap-5 mb-5 text-xs text-gray-400 font-medium tracking-wide">
          <div className="flex items-center gap-1.5">
            <span className="text-cyan-500">⏱️</span> {duration}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-blue-500">👥</span> {teamSize}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 flex items-center justify-between bg-gray-800/50 hover:bg-gray-800 text-gray-300 py-3 px-4 rounded-xl transition-colors text-sm font-medium border border-gray-700/50 hover:border-cyan-500/30 group/btn"
          >
            <span className="text-xs">{showDetails ? (isEn ? 'Close' : 'Tutup Detail') : (isEn ? 'Quick View' : 'Detail Cepat')}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-300 text-cyan-500 ${showDetails ? 'rotate-180' : ''}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {caseStudies.some(cs => cs.projectId === id) && (
            <Link 
              href={`/projects/${id}`}
              className="flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 py-3 px-4 rounded-xl transition-all text-xs font-bold border border-cyan-500/30 hover:border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.1)] group/cs"
            >
              <span>{isEn ? 'Case Study' : 'Studi Kasus'}</span>
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Detailed Information (Expandable) */}
      <AnimatePresence>
        {showDetails && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-700/50 bg-gray-900/60"
          >
            <div className="p-6 space-y-6">
              
              {/* All Technologies */}
              <div>
                <h4 className="text-sm font-bold text-cyan-400 mb-3 uppercase tracking-wider">
                  Teknologi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-lg text-xs border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-blue-400 mb-3 uppercase tracking-wider">
                    Fitur Unggulan
                  </h4>
                  <ul className="space-y-2">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-400 text-sm flex items-start gap-2 leading-relaxed">
                        <span className="text-cyan-500 mt-1 text-xs">◆</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges */}
              {challenges && (
                <div>
                  <h4 className="text-sm font-bold text-purple-400 mb-3 uppercase tracking-wider">
                    Tantangan & Solusi
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{challenges}</p>
                </div>
              )}

              {/* Impact */}
              {impact && (
                <div>
                  <h4 className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wider">
                    Dampak
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{impact}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}