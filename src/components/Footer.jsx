export default function Footer() {
  return (
    <footer className="mt-auto border-t border-cyan-500/20 bg-gray-950/80 backdrop-blur-xl shadow-[0_-5px_15px_rgba(6,182,212,0.05)] relative z-20">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start group">
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-400 transition-all cursor-pointer">
            MyPortfolio
          </span>
          <p className="text-gray-400 text-xs mt-1">© {new Date().getFullYear()} Ari Eka Prianda. All rights reserved.</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-4 text-xs font-medium">
          <div className="flex gap-4">
            <a href="https://github.com/ariekakagerou" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300">GitHub</a>
            <a href="https://linkedin.com/in/ari-eka-prianda-78714232a" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300">LinkedIn</a>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="flex items-center gap-2 text-cyan-500/80 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
            <span>Built with Next.js & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}