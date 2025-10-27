import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-16 md:py-20 bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-800 text-white">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      {/* Teks */}
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Hi, I'm <span className="text-indigo-400">Ari Eka Prianda</span>
        </h1>
        <p className="text-lg text-gray-300">
          Mahasiswa Teknik Informatika dengan fokus pada Backend Development & Mobile App Development.
        </p>
        <a 
          href="/contact" 
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md transition"
        >
          Contact Me
        </a>
      </div>

      {/* Foto */}
      <div className="flex-1 flex justify-center mt-10 md:mt-0">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 blur-xl opacity-30" />
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500">
            <div className="rounded-full bg-gray-900 p-1">
              <Image
                src="/images/g.png"
                alt="Ari Eka Prianda"
                width={300}
                height={300}
                className="rounded-full shadow-xl"
                priority
                sizes="(max-width: 768px) 80vw, 300px"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
