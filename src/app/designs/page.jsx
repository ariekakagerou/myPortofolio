"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Filter, X, ZoomIn, ArrowLeft, ArrowRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DesignsPage() {
  const items = [
    // Example entries; replace paths with your images under public/designs/...
    { title: "Logo H5", tool: "Figma", category: "Logo", year: "2024", image: "/designs/figma/logo-h5.jpg" },
    { title: "Poster Event", tool: "Canva", category: "Poster", year: "2023", image: "/designs/canva/poster-event.jpg" },
    { title: "UI Mobile Shop", tool: "Figma", category: "UI", year: "2024", image: "/designs/figma/ui-shop.jpg" },
    { title: "Banner Promo", tool: "Photoshop", category: "Banner", year: "2022", image: "/designs/photoshop/banner-promo.jpg" },
    { title: "Flyer Produk", tool: "CorelDRAW", category: "Flyer", year: "2021", image: "/designs/coreldraw/flyer-produk.jpg" },
  ];

  const tools = useMemo(() => ["All", ...Array.from(new Set(items.map(i => i.tool)))], []);
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map(i => i.category)))], []);

  const toolCounts = useMemo(() => {
    const map = {};
    for (const i of items) map[i.tool] = (map[i.tool] || 0) + 1;
    return map;
  }, []);
  const categoryCounts = useMemo(() => {
    const map = {};
    for (const i of items) map[i.category] = (map[i.category] || 0) + 1;
    return map;
  }, []);

  const [activeTool, setActiveTool] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  // Filtered list memoized for navigation and rendering
  const filtered = useMemo(() => items.filter(i =>
    (activeTool === "All" || i.tool === activeTool) &&
    (activeCategory === "All" || i.category === activeCategory)
  ), [items, activeTool, activeCategory]);

  // Keyboard shortcuts within lightbox
  useEffect(() => {
    if (lightboxIndex < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null), setLightboxIndex(-1);
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
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-gray-300">
          <Filter className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold">Filter</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tools.map(t => (
            <button key={t} onClick={() => setActiveTool(t)} className={`px-3 py-1.5 rounded-full text-sm transition-all border ${activeTool === t ? "bg-indigo-600 border-indigo-500 text-white shadow shadow-indigo-500/30" : "border-gray-700 text-gray-300 hover:border-indigo-500"}`}>
              {t} {t !== 'All' && <span className="ml-1 text-xs opacity-70">({toolCounts[t] || 0})</span>}
            </button>
          ))}
        </div>
        <span className="mx-2 text-gray-600">•</span>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-1.5 rounded-full text-sm transition-all border ${activeCategory === c ? "bg-purple-600 border-purple-500 text-white shadow shadow-purple-500/30" : "border-gray-700 text-gray-300 hover:border-purple-500"}`}>
              {c} {c !== 'All' && <span className="ml-1 text-xs opacity-70">({categoryCounts[c] || 0})</span>}
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
            <div className="relative h-64 bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">{d.title}</span>
              </div>
              <div className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-black/50 border border-white/10 text-white/90">
                {d.tool}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold flex items-center gap-2"><ZoomIn className="w-4 h-4" /> Perbesar</span>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-white font-semibold">{d.title}</h3>
              <p className="text-gray-400 text-sm">{d.tool} • {d.category} • {d.year}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => { setLightbox(null); setLightboxIndex(-1); }}>
            <div className="max-w-5xl w-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-800" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <h2 className="text-white font-bold text-xl">{lightbox.title}</h2>
                  <a href={lightbox.image} download rel="noopener noreferrer nofollow" aria-label={`Download ${lightbox.title}`} className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 flex items-center gap-1"><Download className="w-3 h-3" /> Download</a>
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
                    <button type="button" className="px-3 py-1 rounded-md bg-gray-800/80 text-white border border-gray-700 hover:bg-gray-700" onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}>Reset</button>
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
                      {/* Replace with actual image if provided */}
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


