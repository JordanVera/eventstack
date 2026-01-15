import VideoHero from '@/components/heroes/VideoHero';
import EventsSection from '@/components/EventsSection';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';

export default function Web() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <VideoHero />

      {/* Features Section */}
      <FeaturesSection />

      {/* Events Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="tracking-heading mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl">
              Discover Events
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-400">
              Explore amazing events happening around you
            </p>
          </div>
          <EventsSection />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
