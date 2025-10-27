import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter, Roboto_Mono, Space_Mono, JetBrains_Mono } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import TechBackdrop from "@/components/TechBackdrop";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const spaceMono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "IT Portfolio - Ari Eka Prianda",
  description: "Portfolio profesional Ari Eka Prianda - Full Stack Developer & IT Specialist",
  keywords: "portfolio, full stack developer, IT specialist, web developer, coding, Ari Eka Prianda",
  author: "Ari Eka Prianda",
  applicationName: "IT Portfolio",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0e27",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${robotoMono.variable} ${spaceMono.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="relative bg-black text-slate-100 antialiased overflow-x-hidden selection:bg-cyan-500/40 selection:text-cyan-100 min-h-screen flex flex-col">
        
        {/* ===== BACKGROUND LAYERS ===== */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950" />
          
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/30 via-cyan-500/10 to-transparent rounded-full filter blur-3xl animate-blob" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-500/30 via-blue-500/10 to-transparent rounded-full filter blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-500/20 via-purple-500/5 to-transparent rounded-full filter blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
            <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gradient-to-tl from-cyan-400/15 via-cyan-400/5 to-transparent rounded-full filter blur-3xl animate-blob" style={{ animationDelay: "6s" }} />
          </div>

          {/* Animated grid */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
              animation: "grid-move 20s linear infinite"
            }} />
          </div>

          {/* Scanline effect */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,255,0.05) 2px, rgba(0,255,255,0.05) 4px)",
            animation: "scanlines 8s linear infinite"
          }} />

          {/* Glow lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
            <defs>
              <linearGradient id="line-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#06b6d4", stopOpacity: 0.5 }} />
                <stop offset="50%" style={{ stopColor: "#06b6d4", stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: "#06b6d4", stopOpacity: 0 }} />
              </linearGradient>
              <linearGradient id="line-grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#0891b2", stopOpacity: 0 }} />
                <stop offset="50%" style={{ stopColor: "#0891b2", stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: "#0891b2", stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#line-grad1)" strokeWidth="2" opacity="0.3" />
            <line x1="0" y1="40%" x2="100%" y2="40%" stroke="url(#line-grad1)" strokeWidth="2" opacity="0.2" />
            <line x1="0" y1="60%" x2="100%" y2="60%" stroke="url(#line-grad1)" strokeWidth="2" opacity="0.3" />
            <line x1="0" y1="80%" x2="100%" y2="80%" stroke="url(#line-grad1)" strokeWidth="2" opacity="0.2" />
            <line x1="15%" y1="0" x2="15%" y2="100%" stroke="url(#line-grad2)" strokeWidth="2" opacity="0.2" />
            <line x1="35%" y1="0" x2="35%" y2="100%" stroke="url(#line-grad2)" strokeWidth="2" opacity="0.25" />
            <line x1="65%" y1="0" x2="65%" y2="100%" stroke="url(#line-grad2)" strokeWidth="2" opacity="0.2" />
            <line x1="85%" y1="0" x2="85%" y2="100%" stroke="url(#line-grad2)" strokeWidth="2" opacity="0.25" />
          </svg>

          {/* Floating code snippets */}
          <div className="absolute top-20 left-10 text-cyan-500/30 font-mono text-xs opacity-0 animate-float-code" style={{
            animation: "float-code 8s ease-in-out infinite",
            textShadow: "0 0 10px rgba(6,182,212,0.5)"
          }}>
            &lt;div className="tech"&gt;
          </div>
          <div className="absolute top-40 right-20 text-blue-500/25 font-mono text-xs opacity-0 animate-float-code" style={{
            animation: "float-code 10s ease-in-out infinite 1s",
            textShadow: "0 0 10px rgba(3,102,214,0.5)"
          }}>
            {'{ "status": "online" }'}
          </div>
          <div className="absolute bottom-32 left-1/4 text-purple-500/20 font-mono text-xs opacity-0 animate-float-code" style={{
            animation: "float-code 12s ease-in-out infinite 2s",
            textShadow: "0 0 10px rgba(147,51,234,0.3)"
          }}>
            console.log('building...')
          </div>
          <div className="absolute bottom-20 right-1/4 text-cyan-500/20 font-mono text-xs opacity-0 animate-float-code" style={{
            animation: "float-code 9s ease-in-out infinite 3s",
            textShadow: "0 0 10px rgba(6,182,212,0.3)"
          }}>
            npm run deploy
          </div>

          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-50"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `particle-float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* ===== SKIP TO CONTENT LINK ===== */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-6 py-3 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 font-bold shadow-lg shadow-cyan-500/50"
        >
          Lompat ke konten utama
        </a>

        {/* ===== HEADER ===== */}
        <header className="sticky top-0 z-40 backdrop-blur-2xl border-b border-cyan-500/20 shadow-2xl" style={{
          backgroundImage: "linear-gradient(135deg, rgba(6,182,212,0.05) 0%, rgba(3,102,214,0.05) 100%)",
          boxShadow: "0 0 50px rgba(6,182,212,0.1), inset 0 1px 0 rgba(6,182,212,0.1)"
        }}>
          <Navbar />
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main id="main-content" className="flex-1 w-full relative z-10">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 max-w-7xl">
            
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
              {/* Center glow */}
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full h-full max-w-2xl bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent blur-3xl" />
              
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent blur-2xl rounded-full" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-blue-500/10 via-blue-500/5 to-transparent blur-2xl rounded-full" />
            </div>

            {/* Content wrapper */}
            <div className="relative z-10">
              <PageTransition>
            {children}
              </PageTransition>
            </div>
          </div>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="relative z-10 mt-auto border-t border-cyan-500/20">
          <div style={{
            backgroundImage: "linear-gradient(180deg, rgba(6,182,212,0.03) 0%, rgba(3,102,214,0.03) 100%)",
            boxShadow: "inset 0 1px 0 rgba(6,182,212,0.1), 0 0 50px rgba(6,182,212,0.05)"
          }} className="backdrop-blur-sm">
          <Footer />
          </div>
        </footer>

        {/* ===== SCROLL TO TOP ===== */}
        <ScrollToTop />

        {/* global styles moved to globals.css to avoid styled-jsx in server layout */}
      </body>
    </html>
  );
}