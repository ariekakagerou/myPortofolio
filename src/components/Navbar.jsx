"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (href) =>
    `relative px-3 py-2 transition-all duration-300 text-sm font-medium ${
      pathname === href ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "text-gray-300 hover:text-cyan-200"
    } hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]`;

  const NavLinks = ({ onClick }) => (
    <>
      <Link href="/about" className={linkClass("/about")} onClick={onClick}>{t.about}</Link>
      <Link href="/designs" className={linkClass("/designs")} onClick={onClick}>{t.designs}</Link>
      <Link href="/skills" className={linkClass("/skills")} onClick={onClick}>{t.skills}</Link>
      <Link href="/projects" className={linkClass("/projects")} onClick={onClick}>{t.projects}</Link>
      <Link href="/certificates" className={linkClass("/certificates")} onClick={onClick}>{t.certificates}</Link>
      <Link href="/case-studies" className={linkClass("/case-studies")} onClick={onClick}>{t.caseStudies}</Link>
    </>
  );

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-500 border-b ${
        scrolled 
          ? "bg-gray-950/80 backdrop-blur-xl border-cyan-500/20 shadow-[0_4px_30px_rgba(6,182,212,0.1)] py-2" 
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link 
          href="/" 
          className="group flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-shadow">
            <span className="text-white font-bold text-xl leading-none">A</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-400 transition-all">
            MyPortfolio
          </span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-2 bg-gray-900/50 rounded-full px-4 py-1.5 border border-white/5 backdrop-blur-md">
          <NavLinks />
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
            aria-label="Toggle Language"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{language}</span>
          </button>

          <Link 
            href="/contact" 
            className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300 border border-cyan-400/30"
          >
            {t.contact}
          </Link>
        </div>

        {/* Hamburger Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-lg text-cyan-400 hover:bg-white/10"
          >
            <span className="text-xs font-bold uppercase">{language}</span>
          </button>
          <button 
            className="focus:outline-none p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-cyan-500/20 bg-gray-950/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              <NavLinks onClick={() => setIsOpen(false)} />
              <Link 
                href="/contact" 
                className="mt-2 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                onClick={() => setIsOpen(false)}
              >
                {t.contact}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
