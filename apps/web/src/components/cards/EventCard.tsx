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
      <div className="relative flex h-full w-full flex-col rounded-3xl border border-zinc-800 transition-all duration-500 group-hover:border-transparent group-hover:p-[1px]">
        {/* Subtle Siri-like Border */}
        <div className="pointer-events-none absolute -inset-[1px] overflow-hidden rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div
            className="animate-siri-border absolute inset-0 rounded-3xl bg-[length:250%_100%] blur-[0.5px]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9), rgba(236, 72, 153, 0.9), rgba(249, 115, 22, 0.9), rgba(59, 130, 246, 0.9), rgba(99, 102, 241, 0.9))',
            }}
          ></div>
        </div>
        <div className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-3xl bg-black">
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
              <div className="rounded-lg border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-xl">
                <div className="text-sm font-semibold tracking-wide uppercase">
                  {format(new Date(event.startDate), 'EEE · h:mm a')}
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="flex-1 p-4">
            <h2 className="tracking-heading mb-2 line-clamp-2 text-3xl font-semibold transition-colors">
              {event.title}
            </h2>
            {event.venueName && <p className="text-lg text-gray-400">{event.venueName}</p>}
            {event.location && !event.venueName && (
              <p className="line-clamp-1 text-sm text-gray-400">{event.location}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
