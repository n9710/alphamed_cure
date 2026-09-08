'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Home,
  Info,
  Package,
  PhoneCall,
  ChevronRight,
} from 'lucide-react';

export default function MobileNav({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Clean navigation options ONLY: Home, About, Catalog, Contact Us
  const navItems = [
    { name: 'Home', href: '/', icon: Home, exact: true },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Catalog', href: '/products', icon: Package },
    { name: 'Contact Us', href: '/contact', icon: PhoneCall },
  ];

  // Close menu on route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Automatically close on resize to desktop screens
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Mobile Hamburger Button - toggles navigation menu ONLY */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-dropdown-navigation"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="p-2.5 rounded-xl text-[#041E42] hover:bg-slate-100 active:scale-90 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052CC]"
      >
        <span className="sr-only">{isOpen ? 'Close navigation menu' : 'Open navigation menu'}</span>
        {isOpen ? (
          <X className="w-6 h-6 text-slate-800 transition-transform duration-150" />
        ) : (
          <Menu className="w-6 h-6 text-slate-800 transition-transform duration-150" />
        )}
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-Down Mobile Navigation Menu */}
      <div
        id="mobile-dropdown-navigation"
        className={`absolute top-full left-0 right-0 w-full z-50 bg-white border-b border-slate-200/90 shadow-xl transition-all duration-200 ease-out origin-top ${
          isOpen
            ? 'opacity-100 translate-y-0 visible pointer-events-auto'
            : 'opacity-0 -translate-y-2 invisible pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <nav
          className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 space-y-1.5"
          aria-label="Mobile Navigation Links"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px] active:scale-[0.99] ${
                  isActive
                    ? 'bg-blue-50/90 text-[#0052CC] font-bold shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#0052CC]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-[#0052CC]'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="tracking-tight text-[15px]">{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isActive && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  )}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-[#0052CC]' : 'text-slate-300'
                    }`}
                  />
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
