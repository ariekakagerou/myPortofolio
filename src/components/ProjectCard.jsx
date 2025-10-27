'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";

export default function ProjectCard({
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

  const statusColors = {
    completed: 'bg-green-500',
    'in-progress': 'bg-yellow-500',
    planning: 'bg-blue-500'
  };

  const statusLabels = {
    completed: 'Selesai',
    'in-progress': 'Dalam Progres',
    planning: 'Perencanaan'
  };

  return (
    <div className={`group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border ${
      featured ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-gray-700'
    }`}>
      
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          ⭐ Unggulan
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${statusColors[status]}`}></span>
        <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">
          {statusLabels[status]}
        </span>
      </div>

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center transition-opacity duration-300 ${
          imageLoaded ? 'opacity-0 absolute' : 'opacity-100'
        }`}>
          <div className="w-16 h-16 text-white/50">💻</div>
        </div>
        
        <Image
          src={image}
          alt={title}
          fill
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadingComplete={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 90vw, 33vw"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Hover overlay with tech + actions */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div initial={{ opacity: 0, y: 8 }} whileHover={{}} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className="flex flex-wrap gap-2 mb-3">
              {technologies.slice(0, 4).map((tech, index) => (
                <span key={index} className="bg-black/50 text-white/90 text-xs px-2 py-1 rounded border border-white/10">{tech}</span>
              ))}
            </div>
            <div className="flex gap-2">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900/80 text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                >
                  Source
                </a>
              )}
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600/90 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                >
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Project Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            ⏱️ {duration}
          </div>
          <div className="flex items-center gap-1">
            👥 {teamSize}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-xs border border-indigo-500/20"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="text-gray-400 text-xs py-1 px-2">
                +{technologies.length - 4} lainnya
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
          >
            {showDetails ? 'Tutup Detail' : 'Lihat Detail'}
          </button>
          
          <div className="flex gap-2">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 hover:bg-black text-white p-2 rounded-lg transition-colors"
              >
                📂
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors"
              >
                🔗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Information (Expandable) */}
      {showDetails && (
        <div className="border-t border-gray-700 bg-gray-900/50 p-6 space-y-6">
          
          {/* All Technologies */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              💻 Teknologi yang Digunakan
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          {highlights.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                🏆 Fitur Unggulan
              </h4>
              <ul className="space-y-2">
                {highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-300 flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {challenges && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                💡 Tantangan & Solusi
              </h4>
              <p className="text-gray-300 leading-relaxed">{challenges}</p>
            </div>
          )}

          {/* Impact */}
          {impact && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                📈 Dampak & Pembelajaran
              </h4>
              <p className="text-gray-300 leading-relaxed">{impact}</p>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 pt-4 border-t border-gray-700">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📂 Source Code
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🔗 Live Demo
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}