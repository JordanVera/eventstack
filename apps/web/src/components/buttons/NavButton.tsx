import React from 'react';
import Link from 'next/link';

const NavButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href} className="hover:text-gray-300">
      {text}
    </Link>
  );
};

export default NavButton;
