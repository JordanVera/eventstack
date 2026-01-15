import React from 'react';
import Link from 'next/link';
import EventCard from './cards/EventCard';
import { appRouter } from '@/lib/routers';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const EventsSection = async () => {
  // Create a server-side caller for tRPC
  const caller = appRouter.createCaller({});

  // Fetch events on the server (limit to 8 for homepage)
  const allEvents = await caller.events.getAll();
  const events = allEvents?.slice(0, 8) || [];

  return (
    <div>
      {events && events.length > 0 ? (
        <>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {allEvents && allEvents.length > 8 && (
            <div className="mt-12 text-center">
              <Link href="/events">
                <Button
                  variant="outline"
                  className="group rounded-2xl border-2 border-white/20 bg-white/5 px-8 py-6 text-lg font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10"
                >
                  <span className="flex items-center gap-2">
                    View All Events
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="py-16 text-center">
          <p className="mb-8 text-xl text-gray-400">No events found</p>
          <Link href="/events/create">
            <Button
              size="lg"
              className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-lg font-semibold text-white shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              Create Your First Event
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventsSection;
