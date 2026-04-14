/**
 * Centralized data for Contact page.
 */
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react";

export const contactMethodsData = [
  {
    id: "email",
    value: "ariekaprianda@gmail.com",
    icon: <Mail />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "phone",
    value: "+62 812-8507-7403",
    icon: <Phone />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "location",
    value: "Jakarta, Indonesia",
    icon: <MapPin />,
    color: "from-purple-500 to-pink-500",
  },
];

export const responseTimeData = [
  { id: "general", icon: <Clock /> },
  { id: "discussion", icon: <MessageCircle /> },
  { id: "urgent", icon: <Send /> },
];
