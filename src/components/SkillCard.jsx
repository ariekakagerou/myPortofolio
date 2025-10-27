import React, { useState } from 'react';
import { ExternalLink, Code2, Trophy, Clock } from 'lucide-react';

const SkillCard = ({ 
  title, 
  description, 
  icon, 
  proficiency = 0, 
  projects = 0, 
  category = "",
  technologies = [],
  projectLinks = [],
  lastUsed = "",
  level = "Intermediate"
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getProficiencyColor = (proficiency) => {
    if (proficiency >= 85) return 'from-green-500 to-emerald-600';
    if (proficiency >= 70) return 'from-blue-500 to-cyan-600';
    if (proficiency >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getLevelBadgeColor = (level) => {
    switch(level.toLowerCase()) {
      case 'expert': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'advanced': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'beginner': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default: return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
    }
  };

  return (
    <div className="group relative">
      <div 
        className={`
          bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 
          hover:border-purple-500/50 transition-all duration-500 cursor-pointer
          hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20
          ${isExpanded ? 'ring-2 ring-purple-500/50 border-purple-500/50' : ''}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className={`
              p-3 rounded-lg text-white transition-all duration-300
              bg-gradient-to-br ${getProficiencyColor(proficiency)}
              group-hover:scale-110 group-hover:rotate-3
            `}>
              {icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium border
                  ${getLevelBadgeColor(level)}
                `}>
                  {level}
                </span>
              </div>
              {category && (
                <p className="text-xs text-purple-400 font-medium">{category}</p>
              )}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-400">{proficiency}%</div>
            <div className="text-xs text-gray-400">{projects} projects</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Proficiency Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Proficiency Level</span>
            <span className="text-xs text-gray-400">{proficiency}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <div 
              className={`
                h-full rounded-full transition-all duration-1000 ease-out
                bg-gradient-to-r ${getProficiencyColor(proficiency)}
              `}
              style={{ 
                width: `${proficiency}%`,
                boxShadow: `0 0 10px ${proficiency >= 85 ? '#10b981' : proficiency >= 70 ? '#3b82f6' : '#f59e0b'}33`
              }}
            ></div>
          </div>
        </div>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {technologies.slice(0, isExpanded ? technologies.length : 3).map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-white/10 text-xs text-gray-300 rounded-md border border-white/20"
                >
                  {tech}
                </span>
              ))}
              {!isExpanded && technologies.length > 3 && (
                <span className="px-2 py-1 text-xs text-purple-400">
                  +{technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-4 animate-fadeIn">
            {/* Additional Stats */}
            <div className="grid grid-cols-2 gap-4">
              {lastUsed && (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>Last used: {lastUsed}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Trophy className="w-3 h-3" />
                <span>Experience: 2+ years</span>
              </div>
            </div>

            {/* Project Links */}
            {projectLinks.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Related Projects:</h4>
                <div className="space-y-2">
                  {projectLinks.map((project, index) => (
                    <a
                      key={index}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Code2 className="w-3 h-3" />
                      <span>{project.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-2">
              <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02]">
                View Projects & Examples
              </button>
            </div>
          </div>
        )}

        {/* Expand Indicator */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className={`
            w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center
            transform transition-transform duration-300
            ${isExpanded ? 'rotate-180' : ''}
          `}>
            <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;