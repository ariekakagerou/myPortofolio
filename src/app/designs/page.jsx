"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Filter, X, ZoomIn, ArrowLeft, ArrowRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { designsData } from "@/data/designs";

export default function DesignsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const items = designsData;

  const tools = useMemo(() => [t.designs.all, ...Array.from(new Set(items.map(i => i.tool)))], [t.designs.all, items]);
  const categories = useMemo(() => [t.designs.all, ...Array.from(new Set(items.map(i => i.category)))], [t.designs.all, items]);

  const toolCounts = useMemo(() => {
    const map = {};
    for (const i of items) map[i.tool] = (map[i.tool] || 0) + 1;
    return map;
  }, [items]);
  const categoryCounts = useMemo(() => {
    const map = {};
    for (const i of items) map[i.category] = (map[i.category] || 0) + 1;
    return map;
  }, [items]);

  const [activeTool, setActiveTool] = useState(t.designs.all);
  const [activeCategory, setActiveCategory] = useState(t.designs.all);

  // Sync state if language changes and "All" translation changes
  useEffect(() => {
    setActiveTool(t.designs.all);
    setActiveCategory(t.designs.all);
  }, [t.designs.all]);

  const [lightbox, setLightbox] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  const filtered = useMemo(() => items.filter(i =>
    (activeTool === t.designs.all || i.tool === activeTool) &&
    (activeCategory === t.designs.all || i.category === activeCategory)
  ), [activeTool, activeCategory, t.designs.all, items]);

  useEffect(() => {
    if (lightboxIndex < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") { setLightbox(null); setLightboxIndex(-1); }
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, z + 0.2));
      if (e.key === "-" || e.key === "_") setZoom((z) => Math.max(1, z - 0.2));
      if (e.key === "0") { setZoom(1); setOffset({ x: 0, y: 0 }); }
      if (e.key === "ArrowRight") {
        const next = (lightboxIndex + 1) % filtered.length;
        setLightbox(filtered[next]); setLightboxIndex(next); setZoom(1); setOffset({ x: 0, y: 0 });
      }
      if (e.key === "ArrowLeft") {
        const prev = (lightboxIndex - 1 + filtered.length) % filtered.length;
        setLightbox(filtered[prev]); setLightboxIndex(prev); setZoom(1); setOffset({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filtered]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-8 h-8 text-cyan-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
              {t.designs.title}
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            {t.designs.subtitle}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-gray-300 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">{t.designs.filter}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tools.map(tool => (
              <button 
                key={tool} 
                onClick={() => setActiveTool(tool)} 
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all border backdrop-blur-sm ${activeTool === tool ? "bg-cyan-600 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-500 hover:text-white"}`}
              >
                {tool} {tool !== t.designs.all && <span className="ml-1 text-xs opacity-70">({toolCounts[tool] || 0})</span>}
              </button>
            ))}
          </div>
          <span className="mx-2 text-gray-600">•</span>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button 
                key={category} 
                onClick={() => setActiveCategory(category)} 
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all border backdrop-blur-sm ${activeCategory === category ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "bg-white/5 border-white/10 text-gray-300 hover:border-blue-500 hover:text-white"}`}
              >
                {category} {category !== t.designs.all && <span className="ml-1 text-xs opacity-70">({categoryCounts[category] || 0})</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={() => { setLightbox(d); setLightboxIndex(idx); setZoom(1); setOffset({ x: 0, y: 0 }); }}
              className="group text-left"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              whileHover={{ scale: 1.02, rotate: -0.5 }}
            >
              <div className="relative h-64 bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                <div className="w-full h-full flex items-center justify-center p-4">
                  <span className="text-gray-400 text-center">{d.title}</span>
                </div>
                <div className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-black/50 border border-white/10 text-white/90">
                  {d.tool}
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-semibold flex items-center gap-2"><ZoomIn className="w-4 h-4" /> {t.designs.zoomIn}</span>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-white font-semibold">{d.title}</h3>
                <p className="text-gray-400 text-sm">{d.tool} • {d.category} • {d.year}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => { setLightbox(null); setLightboxIndex(-1); }}>
            <div className="max-w-5xl w-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-800" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <h2 className="text-white font-bold text-xl">{lightbox.title}</h2>
                  <a href={lightbox.image} download rel="noopener noreferrer nofollow" aria-label={`Download ${lightbox.title}`} className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 flex items-center gap-1"><Download className="w-3 h-3" /> {t.designs.download}</a>
                </div>
                <button className="p-2 hover:bg-gray-800 rounded-lg" onClick={() => { setLightbox(null); setLightboxIndex(-1); }}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <div className="p-4">
                <div className="relative h-[70vh] bg-black/40 rounded-lg border border-gray-800 overflow-hidden">
                  <button aria-label="Prev" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded bg-gray-900/70 hover:bg-gray-800 border border-gray-700" onClick={() => { const prev = (lightboxIndex - 1 + filtered.length) % filtered.length; setLightbox(filtered[prev]); setLightboxIndex(prev); setZoom(1); setOffset({ x: 0, y: 0 }); }}>
                    <ArrowLeft className="w-5 h-5 text-gray-200" />
                  </button>
                  <button aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded bg-gray-900/70 hover:bg-gray-800 border border-gray-700" onClick={() => { const next = (lightboxIndex + 1) % filtered.length; setLightbox(filtered[next]); setLightboxIndex(next); setZoom(1); setOffset({ x: 0, y: 0 }); }}>
                    <ArrowRight className="w-5 h-5 text-gray-200" />
                  </button>
                  <div className="absolute top-3 right-3 z-10 flex gap-2">
                    <button type="button" className="px-3 py-1 rounded-md bg-gray-800/80 text-white border border-gray-700 hover:bg-gray-700" onClick={() => setZoom((z) => Math.max(1, z - 0.2))}>-</button>
                    <button type="button" className="px-3 py-1 rounded-md bg-gray-800/80 text-white border border-gray-700 hover:bg-gray-700" onClick={() => setZoom((z) => Math.min(3, z + 0.2))}>+</button>
                    <button type="button" className="px-3 py-1 rounded-md bg-gray-800/80 text-white border border-gray-700 hover:bg-gray-700" onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}>{t.designs.reset}</button>
                  </div>
                  <div
                    ref={dragRef}
                    className="w-full h-full cursor-grab active:cursor-grabbing"
                    onMouseDown={(e) => {
                      const startX = e.clientX; const startY = e.clientY; const startOffset = { ...offset };
                      const onMove = (ev) => { setOffset({ x: startOffset.x + (ev.clientX - startX), y: startOffset.y + (ev.clientY - startY) }); };
                      const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
                      window.addEventListener('mousemove', onMove);
                      window.addEventListener('mouseup', onUp);
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center select-none" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, transition: 'transform 120ms ease-out' }}>
                      <div className="text-center">
                        <div className="w-24 h-24 rounded bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto mb-4" />
                        <p className="text-gray-400">Preview {lightbox.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
