"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Award, Calendar } from "lucide-react";
import Image from "next/image";
import { certificates, getCertTitle } from "@/data/certificates";
import { useLanguage } from "@/context/LanguageContext";

export default function CertificatesPage() {
  const { language } = useLanguage();
  const [lightbox, setLightbox] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(certificates.map((c) => c.category))];
  const filteredCerts =
    filter === "All"
      ? certificates
      : certificates.filter((c) => c.category === filter);

  return (
    <section className="py-12">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-8 h-8 text-cyan-400" />
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
            {language === "en" ? "Certificates" : "Sertifikat"}
          </h1>
        </div>
        <p className="text-gray-300 text-lg">
          {language === "en"
            ? "Collection of professional certificates and completed courses"
            : "Koleksi sertifikat profesional dan kursus yang telah diselesaikan"}
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-8 flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-bold transition-all duration-300 backdrop-blur-sm border ${
              filter === cat
                ? "bg-cyan-600 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-500 hover:text-white"
            }`}
          >
            {cat === "All" ? (language === "en" ? "All" : "Semua") : cat}
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert, index) => (
          <button
            key={cert.id}
            onClick={() => { setLightbox(cert); setZoom(1); setOffset({ x: 0, y: 0 }); }}
            type="button"
            className="group text-left"
          >
            <motion.div
              className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300"
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={cert.image}
                alt={getCertTitle(cert, language)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {language === "en" ? "View Detail" : "Lihat Detail"}
                </span>
              </div>
            </motion.div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                {getCertTitle(cert, language)}
              </h3>
              <p className="text-indigo-400 text-sm font-medium mt-2">{cert.issuer}</p>
              <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                <Calendar className="w-4 h-4" />
                <span>{cert.year}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-indigo-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{getCertTitle(lightbox, language)}</h2>
                  <p className="text-indigo-400 mt-1">{lightbox.issuer}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="relative h-96 rounded-xl border border-gray-700 overflow-hidden bg-black/40">
                {/* Zoom controls */}
                <div className="absolute top-3 right-3 z-10 flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 rounded-md bg-gray-800/80 text-white border border-gray-700 hover:bg-gray-700"
                    onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 rounded-md bg-gray-800/80 text-white border border-gray-700 hover:bg-gray-700"
                    onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
                  >
                    +
                  </button>
                </div>
                <div
                  ref={dragRef}
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                  onMouseDown={(e) => {
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const startOffset = { ...offset };
                    const onMove = (ev) => {
                      setOffset({ x: startOffset.x + (ev.clientX - startX), y: startOffset.y + (ev.clientY - startY) });
                    };
                    const onUp = () => {
                      window.removeEventListener("mousemove", onMove);
                      window.removeEventListener("mouseup", onUp);
                    };
                    window.addEventListener("mousemove", onMove);
                    window.addEventListener("mouseup", onUp);
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center select-none"
                    style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, transition: "transform 120ms ease-out" }}
                  >
                    <img
                      src={lightbox.image}
                      alt={getCertTitle(lightbox, language)}
                      className="max-w-full max-h-full object-contain pointer-events-none rounded"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex gap-3">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-2">{language === "en" ? "Category" : "Kategori"}</p>
                  <p className="text-white font-semibold">{lightbox.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                >
                  {language === "en" ? "Close" : "Tutup"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}