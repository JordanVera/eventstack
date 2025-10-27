import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function VideoHero() {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden sm:h-[85vh] md:h-[80vh] lg:h-[75vh]">
      <iframe
        src="https://customer-55aij4xphwdwvuce.cloudflarestream.com/35be932bf107bd5d623ba8d2c2d8db10/iframe?autoplay=true&controls=false&loop=true&muted=true&preload=true"
        className="absolute top-0 left-0 h-full w-full border-0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="absolute inset-0 bg-black/50" /> {/* Overlay to darken video */}
      {/* Text Container with mix-blend-mode effect */}
      <div className="relative flex h-full flex-col items-center justify-center px-4">
        <div className="mix-blend-difference">
          <h1 className="mb-4 text-center text-5xl font-bold text-white sm:text-6xl md:text-7xl">
            create & discover events
          </h1>
          <p className="mb-8 text-center text-lg text-white sm:text-xl">
            Full-stack event management platform for creating unforgettable experiences
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex gap-4">
          <Link href="/events/create">
            <Button className="bg-white px-8 py-6 text-lg font-semibold text-black hover:bg-white/90">
              CREATE EVENT
            </Button>
          </Link>
          <Link href="/events">
            <Button className="border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white hover:bg-white/10">
              EXPLORE
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
