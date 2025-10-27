"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href) =>
    `relative px-2 py-1 transition-colors ${
      pathname === href ? "text-indigo-300" : "text-gray-200"
    } hover:text-indigo-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 hover:after:scale-x-100 after:transition-transform`;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/70 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        MyPortfolio
      </Link>

      {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/about" className={linkClass("/about")}>About</Link>
          <Link href="/designs" className={linkClass("/designs")}>Designs</Link>
          <Link href="/skills" className={linkClass("/skills")}>Skills</Link>
          <Link href="/projects" className={linkClass("/projects")}>Projects</Link>
          <Link href="/certificates" className={linkClass("/certificates")}>Certificates</Link>
          <Link href="/contact" className="ml-2 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">Contact</Link>
      </div>

      {/* Hamburger Mobile */}
      <button 
          className="md:hidden block focus:outline-none p-2 rounded hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
      >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
      </button>

      {/* Menu Mobile */}
      </div>
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-gray-900/90 backdrop-blur px-4 py-4 animate-[fadeDown_0.2s_ease-out]">
          <div className="flex flex-col gap-3 text-center">
            <Link href="/about" className={linkClass("/about")} onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/designs" className={linkClass("/designs")} onClick={() => setIsOpen(false)}>Designs</Link>
            <Link href="/skills" className={linkClass("/skills")} onClick={() => setIsOpen(false)}>Skills</Link>
            <Link href="/projects" className={linkClass("/projects")} onClick={() => setIsOpen(false)}>Projects</Link>
            <Link href="/certificates" className={linkClass("/certificates")} onClick={() => setIsOpen(false)}>Certificates</Link>
            <Link href="/contact" className="mt-1 inline-block px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
