'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GradientHeader } from '../GradientHeader';

export default function EventsHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-[60vh] w-full overflow-hidden bg-black">
      {/* Background Video */}
      <iframe
        src="https://customer-55aij4xphwdwvuce.cloudflarestream.com/35be932bf107bd5d623ba8d2c2d8db10/iframe?autoplay=true&controls=false&loop=true&muted=true&preload=true"
        className="absolute top-0 left-0 h-[75vw] min-h-full w-[220vh] min-w-full border-0 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Dark overlay to dim the video */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #8b5cf6 0%, #ec4899 25%, transparent 50%)`,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-purple-500"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
              x: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-600 opacity-20 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-pink-600 opacity-20 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 opacity-10 blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <div className="mb-6 inline-block">
            <div className="relative">
              <motion.div
                className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-75 blur-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span className="relative inline-block rounded-lg border border-purple-500/50 bg-black/50 px-6 py-2 text-sm font-semibold tracking-wider text-purple-300 uppercase backdrop-blur-sm">
                Discover Your Next Experience
              </span>
            </div>
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text p-6 text-6xl font-bold tracking-tighter text-transparent sm:text-7xl md:text-8xl">
            <GradientHeader text="Upcoming Events" />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl"
          >
            Explore cutting-edge events, connect with innovators, and experience the future of
            entertainment
          </motion.p>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-wider text-gray-500 uppercase">
              Scroll to explore
            </span>
            <svg
              className="h-6 w-6 text-purple-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
