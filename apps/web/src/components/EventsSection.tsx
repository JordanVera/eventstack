import React from 'react';
import EventCard from './cards/EventCard';
import { appRouter } from '@/lib/routers';

const EventsSection = async () => {
  // Create a server-side caller for tRPC
  const caller = appRouter.createCaller({});

  // Fetch events on the server
  const events = await caller.events.getAll();

  return (
    <div>
      {events && events.length > 0 ? (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
  );
};

export default EventsSection;
