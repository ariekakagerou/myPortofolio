"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
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
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { contactMethodsData, responseTimeData } from "@/data/contact";

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);
  const confettiRef = useRef(null);

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = t.contact.validation.nameRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.contact.validation.emailInvalid;
    if (!form.message.trim()) e.message = t.contact.validation.messageRequired;
    return e;
  }, [form, t.contact.validation]);

  useEffect(() => {
    if (!status || status.type !== "error") return;
    if (formRef.current) {
      formRef.current.classList.remove("animate-shake");
      void formRef.current.offsetWidth;
      formRef.current.classList.add("animate-shake");
    }
  }, [status]);

  const contactMethods = useMemo(() => 
    contactMethodsData.map(method => ({
      ...method,
      title: t.contact.methods[method.id].title,
      description: t.contact.methods[method.id].desc,
    })), [language, t.contact.methods]);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/ariekakagerou",
      icon: <Github />,
      color: "hover:from-gray-600 hover:to-gray-800",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/ari-eka-prianda-78714232a",
      icon: <Linkedin />,
      color: "hover:from-blue-600 hover:to-blue-800",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/USERNAME",
      icon: <Instagram />,
      color: "hover:from-pink-500 hover:to-purple-600",
    },
  ];

  const responseTime = useMemo(() => 
    responseTimeData.map(item => ({
      ...item,
      type: t.contact.responseTime[item.id].type,
      time: t.contact.responseTime[item.id].time,
    })), [language, t.contact.responseTime]);

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full text-cyan-300 text-sm font-bold mb-6 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <MessageCircle className="w-4 h-4" />
            <span> {t.contact.connectLabel} </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-sm">
            {t.contact.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.contact.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center relative z-10">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded mr-4"></span>
              {t.contact.sendMessage}
            </h2>
            <form
              className="space-y-6 relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
                setStatus(null);
                setTouched({ name: true, email: true, message: true });
                if (Object.keys(errors).length > 0) {
                  setStatus({ type: "error", msg: t.contact.validation.checkInput });
                  return;
                }
                setSubmitting(true);
                setTimeout(() => {
                  setSubmitting(false);
                  setSuccess(true);
                  setStatus({ type: "success", msg: t.contact.successDesc });
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
                  const mailto = `mailto:ariekaprianda@gmail.com?subject=${encodeURIComponent(
                    form.subject || `Pesan dari ${form.name}`
                  )}&body=${encodeURIComponent(
                    `Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
                  )}`;
                  window.location.href = mailto;
                  setForm({ name: "", email: "", subject: "", message: "" });
                  setTouched({ name: false, email: false, message: false });
                  setTimeout(() => setSuccess(false), 3000);
                }, 500);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder={t.contact.nameLabel}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onBlur={() => setTouched({ ...touched, name: true })}
                    className="w-full p-4 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] focus:outline-none transition-all duration-300"
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={t.contact.emailLabel}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onBlur={() => setTouched({ ...touched, email: true })}
                    className="w-full p-4 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] focus:outline-none transition-all duration-300"
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={t.contact.subjectLabel}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full p-4 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <textarea
                  placeholder={t.contact.messagePlaceholder}
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onBlur={() => setTouched({ ...touched, message: true })}
                  className="w-full p-4 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] focus:outline-none transition-all duration-300 resize-none"
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>
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
                <div ref={confettiRef} className="pointer-events-none absolute inset-0 overflow-hidden z-20"></div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-4 rounded-xl font-bold tracking-wide text-white transition-all duration-300 transform flex items-center justify-center gap-2 ${
                    success
                      ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:-translate-y-1"
                  } ${submitting ? "opacity-75" : ""}`}
                >
                  {success ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {t.contact.sentStatus}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.contact.sendButton}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded mr-4"></span>
                {t.contact.infoTitle}
              </h2>
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className={`p-4 bg-gradient-to-br ${method.color} rounded-xl text-white group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}
                    >
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {method.title}
                      </h3>
                      <p className="text-cyan-400 font-medium mb-1">
                        {method.value}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Response Time */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-cyan-400" />
                  {t.contact.responseTime.title}
                </h3>
                <div className="space-y-4">
                  {responseTime.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-gray-400">{item.icon}</div>
                        <span className="text-gray-300 text-sm">{item.type}</span>
                      </div>
                      <span className="text-cyan-400 font-medium text-sm">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Star className="w-5 h-5 mr-3 text-cyan-400" />
                  Social Media
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      aria-label={`Media sosial ${social.name}`}
                      className={`p-4 bg-white/5 rounded-xl border border-white/10 text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${
                        social.name === "GitHub" ? "hover:shadow-gray-500/50 hover:border-gray-500" :
                        social.name === "LinkedIn" ? "hover:shadow-blue-500/50 hover:border-blue-500" :
                        "hover:shadow-pink-500/50 hover:border-pink-500"
                      }`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
                <Heart className="w-6 h-6 mr-3 text-red-400" />
                {t.contact.cta.title}
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                {t.contact.cta.desc}
              </p>
              <div className="flex flex-wrap flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                  {t.contact.cta.buttonDiscuss}
                </button>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white font-bold border border-white/20 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 transform hover:scale-105">
                  {t.contact.cta.buttonPortfolio}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
