'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import NavButton from '@/components/buttons/NavButton';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full px-6 py-4 text-white">
      {/* border-b border-white/10 bg-black/80 backdrop-blur-lg */}
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold hover:text-gray-300">
            Event Stack
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <NavButton href="/events/create" text="Create Event" />
          <NavButton href="/events" text="Browse Events" />
          <NavButton href="/about" text="About Us" />
          <NavButton href="/" text="Get The App" />
        </div>
        <div className="flex items-center gap-3">
          {status === 'loading' ? (
            <div className="text-gray-400">Loading...</div>
          ) : session ? (
            <>
              <div className="flex items-center gap-2 text-gray-300">
                <User size={18} />
                <span className="text-sm">{session.user?.name || session.user?.email}</span>
              </div>
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex cursor-pointer items-center gap-2 bg-red-600 hover:bg-red-700"
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button className="cursor-pointer bg-blue-600">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="cursor-pointer bg-zinc-700">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
