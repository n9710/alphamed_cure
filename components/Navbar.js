import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/auth';
import MobileNav from '@/components/MobileNav';
import CartBadge from '@/components/CartBadge';
import { Lock, PhoneCall, Mail, ShieldCheck, User } from 'lucide-react';

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Institutional Regulatory & Hotline Strip */}
      <div className="bg-[#041E42] text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#0A284D]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
              WHO-GMP & ISO 13485:2016 Compliant B2B Institutional Supply
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-sky-400" />
              <span>Desk:</span>
              <strong className="text-white font-semibold">+91 98765 43210</strong>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-sky-400" />
              <a
                href="mailto:procurement@alphamedcure.com"
                className="text-slate-300 hover:text-white transition-colors"
              >
                procurement@alphamedcure.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Single-Line Corporate Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 flex-nowrap">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-hidden focus:ring-2 focus:ring-sky-500 rounded-xl transition-transform hover:scale-[1.01] shrink-0"
            title="AlphaMed Cure"
          >
            <div className="relative w-44 sm:w-52 h-11 sm:h-12">
              <Image
                src="/assets/alphamed_cure_logo.png"
                alt="AlphaMed Cure - Institutional Healthcare Procurement"
                fill
                sizes="(max-width: 640px) 176px, 208px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Single-Line Navigation Options */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700 whitespace-nowrap"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 rounded-xl hover:text-sky-700 hover:bg-slate-100/80 transition-all active:scale-95"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions Group (Single Line) */}
          <div className="hidden md:flex items-center gap-3 shrink-0 whitespace-nowrap">
            {user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition"
                >
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  <span>{user.role === 'admin' ? 'Admin Portal' : (user.firstName || 'Dashboard')}</span>
                </Link>
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="text-xs font-semibold text-slate-400 hover:text-red-600 transition px-2 py-1 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 px-3 py-2 rounded-xl hover:bg-slate-50 transition"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Client Portal</span>
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center justify-center text-xs font-bold px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition shadow-sm hover:shadow-md"
                >
                  Register Partner
                </Link>
              </div>
            )}

            {/* Inquiry Cart Icon Badge */}
            <CartBadge />
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/inquiry"
              className="p-2 text-slate-700 hover:text-sky-600 text-xs font-bold transition"
              title="Inquiry Cart"
            >
              📋 Cart
            </Link>
            <MobileNav user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
