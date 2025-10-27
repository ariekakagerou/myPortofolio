"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Award, Calendar } from "lucide-react";

export default function CertificatesPage() {
  const certificates = [
    {
      title: "Belajar Dasar Bahasa Pemrograman dengan Python",
      issuer: "Mounev Academy",
      image: "/certificates/python-mounev.png",
      category: "Programming",
      year: "2024",
    },
    {
      title:
        "Engineering Resilience: Microservices' Contribution to High Scalability in Tech Company",
      issuer: "Tech Company",
      image: "/certificates/microservices.png",
      category: "Architecture",
      year: "2024",
    },
    {
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      image: "/certificates/ccna.png",
      category: "Networking",
      year: "2025",
    },
    {
      title: "Prinsip Dasar UI/UX Designer",
      issuer: "Eduwork",
      image: "/certificates/ui-ux-eduwork.png",
      category: "Design",
      year: "2024",
    },
  ];

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
          <Award className="w-8 h-8 text-indigo-400" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Sertifikat
          </h1>
        </div>
        <p className="text-gray-300 text-lg">
          Koleksi sertifikat profesional dan kursus yang telah diselesaikan
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-8 flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === cat
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/50"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert, index) => (
          <button
            key={index}
            onClick={() => setLightbox(cert)}
            type="button"
            className="group text-left"
          >
            <motion.div
              className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300"
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Placeholder for image */}
              <div className="w-full h-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center">
                  <Award className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">{cert.category}</p>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">Lihat Detail</span>
              </div>
            </motion.div>

            {/* Card Content */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                {cert.title}
              </h3>
              <p className="text-indigo-400 text-sm font-medium mt-2">
                {cert.issuer}
              </p>
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animation-fade-in"
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
                  <h2 className="text-2xl font-bold text-white">
                    {lightbox.title}
                  </h2>
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
                      window.removeEventListener('mousemove', onMove);
                      window.removeEventListener('mouseup', onUp);
                    };
                    window.addEventListener('mousemove', onMove);
                    window.addEventListener('mouseup', onUp);
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center select-none"
                    style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, transition: 'transform 120ms ease-out' }}
                  >
                    <div className="text-center">
                      <Award className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                      <p className="text-gray-400">Sertifikat dari {lightbox.issuer}</p>
                      <p className="text-sm text-gray-500 mt-2">{lightbox.year}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex gap-3">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-2">Kategori</p>
                  <p className="text-white font-semibold">
                    {lightbox.category}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}