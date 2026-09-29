import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/auth';
import MobileNav from '@/components/MobileNav';
import CartBadge from '@/components/CartBadge';
import ActiveLink from '@/components/ActiveLink';
import { Lock, PhoneCall, Mail, User, ClipboardList } from 'lucide-react';

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  const navLinks = [
    { name: 'Home', href: '/', exactMatch: true },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/98 border-b border-slate-200/90 shadow-2xs relative">
      {/* Top Brand Strip */}
      <div className="bg-[#041E42] text-slate-300 text-[11px] py-1.5 border-b border-[#0A284D]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-y-1 gap-x-3">
          {/* Left: Brand positioning tagline */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-slate-200 tracking-wide truncate">
              <span className="hidden sm:inline">Sales · Service · Support · Healthcare Solutions</span>
              <span className="sm:hidden">Sales · Service · Support</span>
            </span>
          </div>

          {/* Right: Contact info */}
          <div className="flex items-center gap-3 text-slate-300 shrink-0">
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-sky-400 shrink-0" />
              <a href="/contact" className="text-white font-semibold whitespace-nowrap hover:text-sky-300 transition-colors">
                Contact Us
              </a>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5 min-w-0">
              <Mail className="w-3 h-3 text-sky-400 shrink-0" />
              <a
                href="mailto:info@alphamedcure.com"
                className="text-slate-300 hover:text-white transition-colors truncate"
              >
                info@alphamedcure.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-xl transition-colors shrink-0"
            title="AlphaMed Cure"
          >
            <div className="relative w-28 h-12 md:w-36 md:h-14">
              <Image
                src="/assets/alphamed_cure_logo.png"
                alt="AlphaMed Cure - Sales, Service, Support, Healthcare Solutions"
                fill
                sizes="(max-width: 768px) 112px, 144px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700 whitespace-nowrap flex-1 justify-center"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => (
              <ActiveLink
                key={item.href}
                href={item.href}
                exactMatch={item.exactMatch}
                className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-[#0052CC] hover:bg-slate-50 transition-all font-medium"
                activeClassName="px-3.5 py-2 rounded-xl text-[#0052CC] bg-blue-50/80 font-bold border border-blue-100/60"
              >
                {item.name}
              </ActiveLink>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0 whitespace-nowrap">
            {user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition border border-slate-200/60"
                >
                  <User className="w-3.5 h-3.5 text-[#0052CC]" />
                  <span>{user.role === 'admin' ? 'Admin Portal' : (user.firstName || 'Dashboard')}</span>
                </Link>
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="text-xs font-semibold text-slate-500 hover:text-red-600 transition px-2 py-1 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="btn-tactile inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#0052CC] px-3.5 py-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Client Portal</span>
                </Link>

                <Link
                  href="/consultation"
                  className="btn-tactile inline-flex items-center justify-center text-xs font-bold px-4 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white transition shadow-xs"
                >
                  Request Consultation
                </Link>
              </div>
            )}

            {/* Inquiry Cart Icon Badge */}
            <CartBadge />
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <Link
              href="/inquiry"
              className="p-2 text-slate-700 hover:text-[#0052CC] transition rounded-lg hover:bg-slate-100"
              title="Inquiry Cart"
              aria-label="Inquiry Cart"
            >
              <ClipboardList className="w-5 h-5" aria-hidden="true" />
            </Link>
            <MobileNav user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}

