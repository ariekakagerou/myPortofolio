/**
 * Single source of truth for all certificate data.
 */
export const certificates = [
  {
    id: "python-mounev",
    title: "Belajar Dasar Bahasa Pemrograman dengan Python",
    title_en: "Learning Python Programming Fundamentals",
    issuer: "Mounev Academy",
    image: "/certificates/python-mounev.png",
    category: "Programming",
    year: "2024",
  },
  {
    id: "microservices",
    title: "Engineering Resilience: Microservices' Contribution to High Scalability in Tech Company",
    title_en: "Engineering Resilience: Microservices' Contribution to High Scalability in Tech Company",
    issuer: "Tech Company",
    image: "/certificates/microservices.png",
    category: "Architecture",
    year: "2024",
  },
  {
    id: "ccna",
    title: "CCNA: Introduction to Networks",
    title_en: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    image: "/certificates/ccna.png",
    category: "Networking",
    year: "2025",
  },
  {
    id: "ui-ux-eduwork",
    title: "Prinsip Dasar UI/UX Designer",
    title_en: "Fundamentals of UI/UX Design",
    issuer: "Eduwork",
    image: "/certificates/ui-ux-eduwork.png",
    category: "Design",
    year: "2024",
  },
];

/**
 * Helper: get translated title based on current language
 */
export function getCertTitle(cert, lang = "id") {
  return lang === "en" ? cert.title_en : cert.title;
}
