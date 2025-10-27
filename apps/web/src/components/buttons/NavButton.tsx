import React from 'react';
import Link from 'next/link';

const NavButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      href={href}
      className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black uppercase transition-transform hover:scale-105"
    >
      {text}
    </Link>
  );
};

export default NavButton;
