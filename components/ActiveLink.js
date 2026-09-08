'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Drop-in replacement for Next.js Link that adds active-state class
 * based on the current pathname.
 */
export default function ActiveLink({
  href,
  children,
  className = '',
  activeClassName = '',
  exactMatch = false,
  ...props
}) {
  const pathname = usePathname();

  const isActive = (exactMatch || href === '/')
    ? pathname === href
    : pathname === href || pathname.startsWith(href + '/');

  const resolvedClass = isActive && activeClassName ? activeClassName : className;

  return (
    <Link
      href={href}
      className={resolvedClass}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}
