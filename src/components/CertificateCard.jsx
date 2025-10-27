import Image from "next/image";

export default function CertificateCard({ title, issuer, image }) {
  return (
    <div className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl border border-gray-700 p-4 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-500/50">
      <div className="relative overflow-hidden rounded-md">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Image src={image} alt={title} width={300} height={200} className="mx-auto rounded-md" loading="lazy" sizes="(max-width: 768px) 90vw, 300px" />
      </div>
      <h3 className="mt-4 text-base md:text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm">{issuer}</p>
    </div>
  );
}
