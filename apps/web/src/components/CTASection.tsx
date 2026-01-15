'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />
        <div
          className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-pink-500/20 blur-3xl"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-sm text-gray-300">Ready to get started?</span>
        </div>

        <h2 className="tracking-heading mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl">
          Bring Your Events to Life
        </h2>

        <p className="mb-12 text-xl leading-relaxed text-gray-400">
          Join thousands of creators building unforgettable experiences. Create your first event in
          minutes.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/events/create">
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] px-8 py-6 text-lg font-semibold text-white shadow-2xl shadow-purple-500/50 transition-all duration-500 hover:scale-105 hover:bg-[position:100%_0%] hover:shadow-purple-500/70"
            >
              <span className="relative z-10 flex items-center gap-2">
                Create Your Event
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>

          <Link href="/events">
            <Button
              size="lg"
              variant="outline"
              className="group rounded-2xl border-2 border-white/20 bg-white/5 px-8 py-6 text-lg font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10"
            >
              <span className="flex items-center gap-2">
                Browse Events
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
