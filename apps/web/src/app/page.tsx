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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Event Stack
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Full-stack event management with authentication & tRPC
          </p>

          {status === 'loading' ? (
            <div className="text-gray-400">Loading...</div>
          ) : session ? (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto">
              <p className="text-lg mb-4">
                Welcome back,{' '}
                <span className="text-blue-400 font-semibold">
                  {session.user.name || session.user.email}
                </span>
                !
              </p>
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 mx-auto">
                  Go to Dashboard <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto">
              <p className="text-lg mb-4 flex items-center justify-center gap-2">
                <Lock size={20} className="text-blue-400" />
                Sign in to access your dashboard
              </p>
              <div className="flex gap-3 justify-center">
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
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold mb-6 text-center">tRPC Demo</h2>

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
