import React from 'react';
import { Event } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

const EventCard = ({ event }: { event: Event }) => {
  return (
    <Link
      key={event.id}
      href={`/events/${event.id}`}
      className="group block h-full w-full cursor-pointer"
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-zinc-900 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        {/* Event Flyer Image */}
        <div className="relative aspect-square w-full">
          {event.flyerImageUrl ? (
            <Image
              src={event.flyerImageUrl}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 20vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
              <span className="text-6xl opacity-50">🎉</span>
            </div>
          )}

          {/* Date/Time Badge Overlay */}
          <div className="absolute bottom-4 left-4">
            <div className="rounded-lg border border-white/20 bg-black/80 px-4 py-2 backdrop-blur-sm">
              <div className="text-sm font-semibold tracking-wide uppercase">
                {format(new Date(event.startDate), 'EEE · h:mm a')}
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="flex-1 p-4">
          <h2 className="mb-2 line-clamp-2 text-xl font-bold transition-colors group-hover:text-purple-400">
            {event.title}
          </h2>
          {event.venueName && <p className="text-sm text-gray-400">{event.venueName}</p>}
          {event.location && !event.venueName && (
            <p className="line-clamp-1 text-sm text-gray-400">{event.location}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
