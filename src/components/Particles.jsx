"use client";

import { useEffect, useState } from "react";

export default function Particles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => {
        // We can safely use Math.random here because it only runs on the client after mount
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const duration = `${3 + Math.random() * 4}s`;
        const delay = `${Math.random() * 2}s`;

        return (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-50"
            style={{
              left,
              top,
              animation: `particle-float ${duration} ease-in-out infinite`,
              animationDelay: delay,
            }}
          />
        );
      })}
    </div>
  );
}
