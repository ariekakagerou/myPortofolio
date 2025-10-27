export default function Footer() {
    return (
      <footer className="mt-10 border-t border-white/10 bg-gray-900/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
          <div className="mt-3 md:mt-0 flex items-center gap-3 text-xs text-gray-400">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>Built with Next.js • Tailwind CSS</span>
          </div>
        </div>
      </footer>
    );
  }
  