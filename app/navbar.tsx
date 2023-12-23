'use client';

import { cn } from '@/libs/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBug } from 'react-icons/fa';

const configuration = [
  { href: '/', label: 'Dashboard' },
  { href: '/issues', label: 'Issues' },
];

export default function Navbar({ className }: { className?: string }) {
  const [pending, setPending] = useState(false);
  const [update, setUpdate] = useState(true);
  const currentPath = usePathname();
  return (
    <nav className='navbar navbar-center py-1 rounded-lg shadow bg-base-100'>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost text-xl'>
          <FaBug />
        </Link>
      </div>

      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1 gap-2'>
          {configuration.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                // 👇🏻 Utils function takes 3 arguments (twMerge and clsx)
                className={cn(
                  'link no-underline opacity-70 hover:opacity-100', // 👈🏻 Merge with twMerge
                  className, // 👈🏻 Incoming props applied by twMerge
                  { 'opacity-100': currentPath === href } // 👈🏻 Conditional logic applied by clsx
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
