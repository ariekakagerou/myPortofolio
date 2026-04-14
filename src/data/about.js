/**
 * Centralized data for the About page.
 */
import {
  GraduationCap,
  Code,
  Target,
  Lightbulb,
  Globe,
  Award,
  Briefcase,
  Star,
  TrendingUp,
  Heart,
  Terminal,
  Gamepad2,
  BookOpen,
  Music,
} from "lucide-react";

export const personalInfoData = [
  {
    id: "education",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: "skills",
    icon: <Code className="w-6 h-6" />,
  },
  {
    id: "goals",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: "philosophy",
    icon: <Lightbulb className="w-6 h-6" />,
  },
];

export const expertiseData = [
  {
    id: "frontend",
    description: "React, Next.js, Vue.js, Tailwind CSS",
    icon: <Code className="w-6 h-6" />,
    level: 60,
  },
  {
    id: "backend",
    description: "Node.js, Express, REST API, GraphQL",
    icon: <Globe className="w-6 h-6" />,
    level: 55,
  },
  {
    id: "database",
    description: "MongoDB, PostgreSQL, MySQL, Redis",
    icon: <Award className="w-6 h-6" />,
    level: 50,
  },
  {
    id: "mobile",
    description: "React Native, Flutter, Responsive Design",
    icon: <Briefcase className="w-6 h-6" />,
    level: 45,
  },
];

export const achievementsData = [
  {
    id: "projects",
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: "github",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: "learning",
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: "team",
    icon: <Heart className="w-5 h-5" />,
  },
];

export const timelineData = [
  {
    year: "2022",
    id: "start",
  },
  {
    year: "2023",
    id: "fullstack",
  },
  {
    year: "2024",
    id: "advanced",
  },
  {
    year: "2025",
    id: "opportunities",
  },
];

export const hobbiesData = [
  { id: "coding", icon: <Terminal className="w-5 h-5" /> },
  { id: "gaming", icon: <Gamepad2 className="w-5 h-5" /> },
  { id: "reading", icon: <BookOpen className="w-5 h-5" /> },
  { id: "music", icon: <Music className="w-5 h-5" /> },
];

export const statsData = [
  { id: "projects", value: "15+" },
  { id: "tech", value: "20+" },
  { id: "hours", value: "2000+" },
  { id: "coffee", value: "∞" },
];
