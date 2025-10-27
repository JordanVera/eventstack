'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import NavButton from '@/components/buttons/NavButton';
import Image from 'next/image';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full px-6 py-4 mix-blend-difference">
      {/* border-b border-white/10 bg-black/80 backdrop-blur-lg */}
      <div className="mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          <Image src="/logo/small/logo.png" alt="Event Stack" width={40} height={40} />
        </Link>

        <div className="flex items-center gap-1">
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
                className="cursor-pointer rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black uppercase transition-transform hover:scale-105"
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            </>
          ) : (
            <NavButton href="/login" text="Login" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
