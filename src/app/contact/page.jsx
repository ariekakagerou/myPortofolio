"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  Star,
  Heart,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);
  const confettiRef = useRef(null);

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email tidak valid";
    if (!form.message.trim()) e.message = "Pesan wajib diisi";
    return e;
  }, [form]);

  useEffect(() => {
    if (!status || status.type !== "error") return;
    if (formRef.current) {
      formRef.current.classList.remove("animate-shake");
      // force reflow to restart animation
      void formRef.current.offsetWidth;
      formRef.current.classList.add("animate-shake");
    }
  }, [status]);
  const contactMethods = [
    {
      title: "Email",
      value: "your.email@example.com",
      icon: <Mail />,
      description: "Respon dalam 24 jam",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Phone",
      value: "+62 812-3456-7890",
      icon: <Phone />,
      description: "Senin - Jumat, 9:00 - 17:00",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Location",
      value: "Jakarta, Indonesia",
      icon: <MapPin />,
      description: "Available for meetings",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: <Github />,
      color: "hover:from-gray-600 hover:to-gray-800",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: <Linkedin />,
      color: "hover:from-blue-600 hover:to-blue-800",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/yourusername",
      icon: <Instagram />,
      color: "hover:from-pink-500 hover:to-purple-600",
    },
  ];

  const responseTime = [
    { type: "General Inquiry", time: "24 hours", icon: <Clock /> },
    { type: "Project Discussion", time: "12 hours", icon: <MessageCircle /> },
    { type: "Urgent Matter", time: "2-4 hours", icon: <Send /> },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        {" "}
        {/* Header Section */}{" "}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Hubungi Saya{" "}
          </h1>{" "}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tertarik untuk bekerja sama atau ingin berdiskusi tentang project ?
            Saya selalu senang mendengar ide - ide baru dan kesempatan
            kolaborasi yang menarik.{" "}
          </p>{" "}
        </div>{" "}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {" "}
          {/* Contact Form */}{" "}
          <div ref={formRef} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 mr-3 text-blue-400" />
              Kirim Pesan{" "}
            </h2>{" "}
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setStatus(null);
                setTouched({ name: true, email: true, message: true });
                if (Object.keys(errors).length > 0) {
                  setStatus({ type: "error", msg: "Periksa kembali input yang wajib diisi." });
                  return;
                }
                setSubmitting(true);
                // Simulasi submit + efek sukses
                setTimeout(() => {
                  setSubmitting(false);
                  setSuccess(true);
                  setStatus({ type: "success", msg: "Pesan siap dikirim via email." });
                  // Launch confetti elements briefly
                  if (confettiRef.current) {
                    const container = confettiRef.current;
                    container.innerHTML = "";
                    const colors = ["#60a5fa", "#a78bfa", "#f472b6", "#34d399", "#fbbf24"];
                    for (let i = 0; i < 24; i++) {
                      const piece = document.createElement("div");
                      piece.className = "confetti-piece";
                      piece.style.left = Math.random() * 100 + "%";
                      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
                      piece.style.animationDuration = 1200 + Math.random() * 800 + "ms";
                      container.appendChild(piece);
                    }
                    setTimeout(() => (container.innerHTML = ""), 2200);
                  }
                  const mailto = `mailto:${"your.email@example.com"}?subject=${encodeURIComponent(
                    form.subject || `Pesan dari ${form.name}`
                  )}&body=${encodeURIComponent(
                    `Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
                  )}`;
                  window.location.href = mailto;
                  setForm({ name: "", email: "", subject: "", message: "" });
                  setTouched({ name: false, email: false, message: false });
                  setTimeout(() => setSuccess(false), 1400);
                }, 500);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onBlur={() => setTouched({ ...touched, name: true })}
                    className="w-full p-4 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>{" "}
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onBlur={() => setTouched({ ...touched, email: true })}
                    className="w-full p-4 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>{" "}
              </div>{" "}
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full p-4 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>{" "}
              <div>
                <textarea
                  placeholder="Tulis pesan Anda di sini..."
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onBlur={() => setTouched({ ...touched, message: true })}
                  className="w-full p-4 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>{" "}
              {status && (
                <div
                  className={`text-sm ${
                    status.type === "error" ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {status.msg}
                </div>
              )}
              <div className="relative">
                <div ref={confettiRef} className="pointer-events-none absolute inset-0 overflow-hidden"></div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 transform flex items-center justify-center gap-2 ${
                    success
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                  } ${submitting ? "opacity-75" : ""}`}
                >
                  {success ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Terkirim
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </div>{" "}
            </form>{" "}
          </div>{" "}
          {/* Contact Information */}{" "}
          <div className="space-y-8">
            {" "}
            {/* Contact Methods */}{" "}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                Informasi Kontak{" "}
              </h2>{" "}
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 bg-gradient-to-br ${method.color} rounded-lg text-white`}
                    >
                      {" "}
                      {method.icon}{" "}
                    </div>{" "}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {" "}
                        {method.title}{" "}
                      </h3>{" "}
                      <p className="text-blue-400 font-medium mb-1">
                        {" "}
                        {method.value}{" "}
                      </p>{" "}
                      <p className="text-gray-400 text-sm">
                        {" "}
                        {method.description}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
              ))}{" "}
            </div>{" "}
            {/* Response Time */}{" "}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                Waktu Respon{" "}
              </h3>{" "}
              <div className="space-y-3">
                {" "}
                {responseTime.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-400"> {item.icon} </div>{" "}
                      <span className="text-gray-300"> {item.type} </span>{" "}
                    </div>{" "}
                    <span className="text-blue-400 font-medium">
                      {" "}
                      {item.time}{" "}
                    </span>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            {/* Social Links */}{" "}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                Social Media{" "}
              </h3>{" "}
              <div className="flex gap-4">
                {" "}
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label={`Media sosial ${social.name}`}
                    className={`p-3 bg-gradient-to-br from-gray-700 to-gray-800 ${social.color} rounded-lg text-white transition-all duration-300 transform hover:scale-110`}
                  >
                    {" "}
                    {social.icon}{" "}
                  </a>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Call to Action */}{" "}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
              <Heart className="w-6 h-6 mr-2 text-red-400" />
              Siap Memulai Project Bersama ?
            </h2>{" "}
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Mari diskusikan ide project Anda dan bagaimana saya dapat membantu
              mewujudkannya.Saya selalu excited untuk challenge baru dan
              kolaborasi yang bermakna.{" "}
            </p>{" "}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105">
                Mulai Diskusi{" "}
              </button>{" "}
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105">
                Lihat Portfolio{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
