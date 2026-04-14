import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-20 md:py-32 min-h-[80vh] bg-transparent text-white">
      {/* Background Glow Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-blob" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "2s" }} />

      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-6 z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm text-cyan-300 text-sm font-semibold mb-4 glow-effect"
        >
          {t.role}
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white">
          {t.title} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-sm">
            Ari Eka Prianda
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
          {t.subtitle} <span className="text-cyan-400 font-semibold">{t.backend}</span> & <span className="text-blue-400 font-semibold">{t.mobile}</span>. {t.description}
        </p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex gap-4 pt-4"
        >
          <a 
            href="/contact" 
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-cyan-600 border border-transparent rounded-full hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative">{t.contactMe}</span>
          </a>
          
          <a 
            href="/projects" 
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-cyan-400 transition-all duration-200 bg-transparent border-2 border-cyan-500/50 rounded-full hover:bg-cyan-500/10 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 backdrop-blur-sm"
          >
            {t.viewProjects}
          </a>
        </motion.div>
      </motion.div>

      {/* Image Profile */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 flex justify-center mt-16 md:mt-0 z-10"
      >
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 blur-2xl opacity-40 animate-pulse" />
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative p-1 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 w-full h-full glass-border"
            style={{ boxShadow: "0 0 40px rgba(6, 182, 212, 0.3)" }}
          >
            <div className="rounded-full bg-gray-900 w-full h-full p-2 overflow-hidden relative">
              <Image
                src="/images/g.png"
                alt="Ari Eka Prianda"
                fill
                className="object-cover rounded-full"
                priority
                sizes="(max-width: 768px) 80vw, 400px"
              />
            </div>
          </motion.div>
          
          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-4 top-10 bg-gray-900/80 backdrop-blur-md border border-gray-700 p-3 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <span className="text-2xl">💻</span>
            <span className="text-sm font-bold text-white">Code</span>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -left-8 bottom-20 bg-gray-900/80 backdrop-blur-md border border-gray-700 p-3 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <span className="text-2xl">📱</span>
            <span className="text-sm font-bold text-white">Mobile</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
