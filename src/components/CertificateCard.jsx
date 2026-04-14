import Image from "next/image";
import { motion } from "framer-motion";

export default function CertificateCard({ title, issuer, image }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-5 text-center transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.3)] hover:border-cyan-500/50"
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-950 pb-[70%]">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity z-10" />
        <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
          loading="lazy" 
          sizes="(max-width: 768px) 90vw, 300px" 
        />
      </div>
      <div className="mt-5 relative z-20">
        <h3 className="text-base md:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[3.5rem]">{title}</h3>
        <p className="text-cyan-500/80 text-sm font-medium mt-2 flex items-center justify-center gap-2">
          <span>🏆</span> {issuer}
        </p>
      </div>
    </motion.div>
  );
}
