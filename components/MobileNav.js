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
  Layers,
  ChevronRight,
  ShieldCheck,
  Lock,
  User,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { TRANSITION_EASE } from '@/lib/motion';

export default function MobileNav({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Navigation items — mirrors desktop nav
  const navItems = [
    { name: 'Home', href: '/', icon: Home, exact: true },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Services', href: '/services', icon: Layers },
    { name: 'Compliance', href: '/compliance', icon: ShieldCheck },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: PhoneCall },
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

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.22,
        ease: TRANSITION_EASE,
        staggerChildren: shouldReduceMotion ? 0 : 0.035,
        delayChildren: 0.02,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -8,
      transition: {
        duration: 0.15,
        ease: TRANSITION_EASE,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -6 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.18, ease: TRANSITION_EASE },
    },
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-dropdown-navigation"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-haspopup="dialog"
        className="p-2.5 rounded-xl text-[#041E42] hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052CC]"
      >
        <span className="sr-only">{isOpen ? 'Close navigation menu' : 'Open navigation menu'}</span>
        {isOpen ? (
          <X className="w-6 h-6 text-slate-800 transition-transform duration-150" />
        ) : (
          <Menu className="w-6 h-6 text-slate-800 transition-transform duration-150" />
        )}
      </button>

      {/* Backdrop & Menu Animation with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-[1px]"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-Down Mobile Navigation Menu */}
            <motion.div
              id="mobile-dropdown-navigation"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-0 right-0 w-full z-50 bg-white border-b border-slate-200 shadow-xl"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <nav
                className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1.5"
                aria-label="Mobile Navigation Links"
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(item.href + '/');

                  return (
                    <motion.div key={item.name} variants={itemVariants}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[46px] ${
                          isActive
                            ? 'bg-blue-50 text-[#0052CC] font-bold border border-blue-100/70'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#0052CC]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? 'bg-blue-100 text-[#0052CC]'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="tracking-tight text-sm font-medium">{item.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isActive && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Active
                            </span>
                          )}
                          <ChevronRight
                            className={`w-4 h-4 ${
                              isActive ? 'text-[#0052CC]' : 'text-slate-300'
                            }`}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Bottom Auth & CTA Strip */}
                <motion.div
                  variants={itemVariants}
                  className="pt-3 mt-3 border-t border-slate-100 space-y-2"
                >
                  {user ? (
                    <div className="flex items-center justify-between px-2 py-1">
                      <Link
                        href={user.role === 'admin' ? '/admin' : '/dashboard'}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#041E42] hover:text-[#0052CC]"
                      >
                        <User className="w-4 h-4 text-[#0052CC]" />
                        <span>{user.role === 'admin' ? 'Admin Portal' : (user.firstName || 'Dashboard')}</span>
                      </Link>
                      <form action="/api/auth/logout" method="POST">
                        <button
                          type="submit"
                          className="text-xs font-semibold text-slate-400 hover:text-red-600 transition cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="btn-tactile flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs"
                      >
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Client Portal</span>
                      </Link>
                      <Link
                        href="/consultation"
                        onClick={() => setIsOpen(false)}
                        className="btn-tactile flex items-center justify-center py-2.5 px-3 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs font-bold shadow-xs"
                      >
                        Consultation
                      </Link>
                    </div>
                  )}
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
