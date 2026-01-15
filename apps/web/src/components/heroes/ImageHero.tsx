'use client';

import { useState, useEffect, useRef } from 'react';

export default function ImageHero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const heroHeight = rect.height;
      const scrollY = window.scrollY;

      // Calculate progress: 0 when at top, 1 when hero is fully scrolled past
      // We'll start removing blur when scrolled 20% of hero height
      const startOffset = heroHeight * 0.01;
      const endOffset = heroHeight * 0.3;
      const scrollAmount = scrollY - startOffset;
      const scrollRange = endOffset - startOffset;

      const progress = Math.max(0, Math.min(1, scrollAmount / scrollRange));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interpolate filter values based on scroll progress
  const blur = 18 * (1 - scrollProgress); // 18px to 0px
  const brightness = 70 + 30 * scrollProgress; // 70% to 100%
  const saturation = 80 + 20 * scrollProgress; // 80% to 100%
  const contrast = 90 + 10 * scrollProgress; // 90% to 100%

  const filterStyle = {
    filter: `blur(${blur}px) brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%)`,
  };

  return (
    <div ref={heroRef} className="relative h-[85vh] w-screen overflow-hidden sm:h-[80vh]">
      {/* Background image */}
      <img
        src="/stage.jpg"
        alt="Concert stage with vibrant lighting"
        className="absolute top-0 left-0 h-[75vw] min-h-full w-[220vh] min-w-full object-cover sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
        style={filterStyle}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-4">
        <h1 className="tracking-heading mb-4 text-center text-5xl font-black text-white uppercase mix-blend-difference sm:text-6xl md:text-8xl">
          about us
        </h1>
      </div>
    </div>
  );
}
