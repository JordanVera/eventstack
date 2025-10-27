'use client';

import { UsersExample } from '@/components/UsersExample';
import { EventsExample } from '@/components/EventsExample';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock } from 'lucide-react';

import '@/styles/global.css';

export default function Web() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen w-full">
      {/* Hero Video Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 h-full w-full object-cover"
          src="/hero.mp4"
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay to darken video */}
        {/* Text Container with mix-blend-mode effect */}
        <div className="relative flex h-full flex-col items-center justify-center px-4">
          <div className="mix-blend-difference">
            <h1 className="mb-4 text-center text-7xl font-bold text-white">
              create & discover events
            </h1>
            <p className="mb-8 text-center text-xl text-white">
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

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          {status === 'loading' ? (
            <div className="text-gray-400">Loading...</div>
          ) : session ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <p className="mb-4 text-lg">
                Welcome back,{' '}
                <span className="font-semibold text-blue-400">
                  {session.user.name || session.user.email}
                </span>
                !
              </p>
              <Link href="/dashboard">
                <Button className="mx-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  Go to Dashboard <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <p className="mb-4 flex items-center justify-center gap-2 text-lg">
                <Lock size={20} className="text-blue-400" />
                Sign in to access your dashboard
              </p>
              <div className="flex justify-center gap-3">
                <Link href="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700">Sign Up</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* tRPC Demo Section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
          <h2 className="mb-6 text-center text-3xl font-bold">tRPC Demo</h2>

          <div style={{ marginTop: '2rem' }}>
            <UsersExample />
          </div>

          <div style={{ marginTop: '2rem' }}>
            <EventsExample />
          </div>
        </div>
      </div>
    </div>
  );
}
