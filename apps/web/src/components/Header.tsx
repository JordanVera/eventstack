'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full bg-black text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold hover:text-gray-300">
            Event Stack
          </Link>
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
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
                className="bg-red-600 hover:bg-red-700 cursor-pointer flex items-center gap-2"
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button className="bg-blue-600 cursor-pointer">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-zinc-700 cursor-pointer">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
