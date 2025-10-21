import React from 'react';
import { appRouter } from '@/lib/routers';
import EventCard from '@/components/cards/EventCard';

const EventsPage = async () => {
  // Create a server-side caller for tRPC
  const caller = appRouter.createCaller({});

  // Fetch events on the server
  const events = await caller.events.getAll();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full px-4 py-6">
        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-xl text-gray-400">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
