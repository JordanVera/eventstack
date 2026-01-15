'use client';

import { Calendar, Ticket, Sparkles, Users, Zap, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Calendar,
    title: 'Create Events',
    description:
      'Design stunning events with rich descriptions, custom tickets, and beautiful flyers.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconGradient: 'from-purple-400 to-pink-400',
  },
  {
    icon: Ticket,
    title: 'Smart Ticketing',
    description:
      'Flexible ticket management with sales periods, validity windows, and purchase limits.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconGradient: 'from-blue-400 to-cyan-400',
  },
  {
    icon: Sparkles,
    title: 'Rich Features',
    description: 'Guestlists, event features, video galleries, and password protection.',
    gradient: 'from-orange-500/20 to-yellow-500/20',
    iconGradient: 'from-orange-400 to-yellow-400',
  },
  {
    icon: Users,
    title: 'Discover Events',
    description: 'Explore amazing events happening around you and connect with communities.',
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconGradient: 'from-green-400 to-emerald-400',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for speed with modern tech stack and seamless user experience.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconGradient: 'from-violet-400 to-purple-400',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Share your events worldwide with timezone support and multi-language ready.',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    iconGradient: 'from-indigo-400 to-blue-400',
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="tracking-heading mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl">
            Everything You Need
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Powerful tools to create, manage, and discover events that bring people together
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${feature.iconGradient} p-4 shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="tracking-heading mb-3 text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-400">{feature.description}</p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link href="/events/create">
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-lg font-semibold text-white shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/70"
            >
              <span className="relative z-10">Start Creating Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
