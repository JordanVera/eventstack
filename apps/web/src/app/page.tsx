import VideoHero from '@/components/heroes/VideoHero';
import EventsSection from '@/components/EventsSection';

export default function Web() {
  return (
    <div className="min-h-screen w-full">
      <VideoHero />
      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-16">
        <EventsSection />
      </div>
    </div>
  );
}
