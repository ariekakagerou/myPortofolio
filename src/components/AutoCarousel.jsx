"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AutoCarousel({ children, itemsCount, desktopItems = 2, tabletItems = 2, mobileItems = 1, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(desktopItems);

  // Responsive items logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(mobileItems);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(tabletItems);
      } else {
        setItemsPerView(desktopItems);
      }
    };
    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [desktopItems, mobileItems, tabletItems]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev + itemsPerView >= itemsCount) {
        return 0;
      }
      return prev + itemsPerView;
    });
  }, [itemsCount, itemsPerView]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        // Go to start of the last 'page'
        const remainder = itemsCount % itemsPerView;
        return Math.max(0, itemsCount - (remainder === 0 ? itemsPerView : remainder));
      }
      return Math.max(0, prev - itemsPerView);
    });
  }, [itemsCount, itemsPerView]);

  useEffect(() => {
    let timer;
    if (interval > 0) {
      timer = setInterval(nextSlide, interval);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [nextSlide, interval]);

  return (
    <div className="relative group overflow-hidden py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
      {/* Container holding all items items */}
      <div 
        className="flex transition-transform duration-700 ease-in-out gap-6"
        style={{ transform: `translateX(calc(-${(currentIndex / itemsPerView) * 100}% - ${(currentIndex / itemsPerView) * 1.5}rem))` }}
      >
        {children}
      </div>

      {/* Navigation Buttons (visible on hover or desktop) */}
      <button 
        onClick={prevSlide}
        className="hidden md:block absolute left-4 sm:left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-cyan-600 border border-white/10 text-white p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md z-10 shadow-[0_0_15px_rgba(6,182,212,0)] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="hidden md:block absolute right-4 sm:right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-cyan-600 border border-white/10 text-white p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md z-10 shadow-[0_0_15px_rgba(6,182,212,0)] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center flex-wrap gap-2 mt-8">
        {Array.from({ length: Math.ceil(itemsCount / itemsPerView) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx * itemsPerView)}
            className={`h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / itemsPerView) === idx 
                ? "bg-cyan-500 w-8 shadow-[0_0_10px_rgba(6,182,212,0.6)]" 
                : "bg-gray-700 hover:bg-gray-500 w-2"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
