'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  Home,
  Package,
  Hospital,
  Info,
  ShieldCheck,
  PhoneCall,
  Lock,
  UserCheck,
  ClipboardList,
  ChevronRight,
} from 'lucide-react';

export default function MobileNav({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products Catalog', href: '/products', icon: Package },
    { name: 'Services', href: '/services', icon: Hospital },
    { name: 'About Us', href: '/about', icon: Info },
    { name: 'Quality & Compliance', href: '/compliance', icon: ShieldCheck },
    { name: 'Contact Desk', href: '/contact', icon: PhoneCall },
  ];

  return (
    <div className="lg:hidden flex items-center">
      {/* Mobile Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="p-2.5 rounded-xl text-[#041E42] hover:bg-slate-100 active:scale-90 transition-all cursor-pointer"
      >
        <span className="sr-only">Toggle navigation</span>
        {isOpen ? (
          <X className="w-6 h-6 text-slate-800" />
        ) : (
          <Menu className="w-6 h-6 text-slate-800" />
        )}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer Content */}
      <div
        id="mobile-navigation"
        className={`fixed top-0 right-0 bottom-0 z-50 w-5/6 max-w-sm bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="relative w-28 h-8">
              <Image
                src="/assets/alphamed_cure_logo.png"
                alt="Alphamed Cure"
                fill
                sizes="144px"
                className="object-contain object-left"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 active:scale-90 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1" aria-label="Mobile Menu Links">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0052CC] active:scale-[0.98] transition-all min-h-[48px]"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#0052CC]" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>
              );
            })}
          </nav>

          {/* Portal & Actions */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Institutional Access
            </span>
            {user ? (
              <div className="space-y-2">
                <Link
                  href={user.role === 'admin' ? '/admin' : '/dashboard'}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm hover:bg-slate-200 active:scale-95 transition min-h-[48px]"
                >
                  <span>{user.role === 'admin' ? '⚙️ Admin Portal' : `🏥 ${user.firstName || 'My Dashboard'}`}</span>
                </Link>
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="w-full text-center px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition active:scale-95 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-2.5">
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#0052CC] text-white font-bold text-sm hover:bg-[#0043A8] active:scale-95 transition shadow-sm min-h-[48px]"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Register Healthcare Partner</span>
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 active:scale-95 transition min-h-[48px]"
                >
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span>Client Portal Sign In</span>
                </Link>
              </div>
            )}

            <Link
              href="/inquiry"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-blue-200 bg-blue-50/70 text-blue-800 font-bold text-sm hover:bg-blue-100 active:scale-95 transition min-h-[48px]"
            >
              <ClipboardList className="w-4 h-4 text-blue-700" />
              <span>View Inquiry Cart</span>
            </Link>
          </div>
        </div>

        {/* Drawer Footer Contact Notice */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 space-y-1">
          <p className="font-bold text-[#041E42]">Direct Procurement Desk:</p>
          <p className="font-mono text-slate-700">+91 98765 43210</p>
          <p className="text-slate-500 truncate">procurement@alphamedcure.com</p>
        </div>
      </div>
    </div>
  );
}
