import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { 
  BarChart3, 
  Pill, 
  ClipboardList, 
  Building2, 
  Mail, 
  ExternalLink, 
  LogOut, 
  ShieldCheck,
  User
} from 'lucide-react';

export const metadata = {
  title: 'Admin Control Center | AlphaMed Cure',
};

export default async function AdminLayout({ children }) {
  const session = await getSession();
  const user = session?.user;

  // Layer 2: Server component layout security check
  if (!user || user.role !== 'admin') {
    redirect('/login?redirect=/admin');
  }

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col">
      {/* Admin Topbar */}
      <header className="bg-slate-950 text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800 shadow-md gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <Link href="/admin" className="font-extrabold text-sm tracking-wide text-white whitespace-nowrap">
            <span className="hidden sm:inline">ALPHAMED <span className="text-sky-400">CURE</span> <span className="text-slate-400 text-xs font-medium">| Admin</span></span>
            <span className="sm:hidden text-sky-400">Admin</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
          <div className="hidden md:flex items-center gap-2 text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span className="truncate max-w-[120px]"><strong className="text-white">{user.firstName || user.email}</strong></span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
          >
            <span className="hidden sm:inline">Public Site</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-900/40 transition font-medium cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Admin Navigation Sub-bar — scrolls horizontally on narrow screens */}
      <div className="bg-white border-b border-slate-200/80 px-3 sm:px-6 py-2 flex items-center gap-1 sm:gap-4 text-xs font-semibold text-slate-600 overflow-x-auto no-scrollbar">
        <Link href="/admin" className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:text-sky-700 hover:bg-slate-50 transition whitespace-nowrap shrink-0">
          <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
          <span>Overview</span>
        </Link>
        <Link href="/admin/products" className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:text-sky-700 hover:bg-slate-50 transition whitespace-nowrap shrink-0">
          <Pill className="w-3.5 h-3.5 text-slate-400" />
          <span>Catalog</span>
        </Link>
        <Link href="/admin/inquiries" className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:text-sky-700 hover:bg-slate-50 transition whitespace-nowrap shrink-0">
          <ClipboardList className="w-3.5 h-3.5 text-slate-400" />
          <span>Inquiries</span>
        </Link>
        <Link href="/admin/users" className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:text-sky-700 hover:bg-slate-50 transition whitespace-nowrap shrink-0">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Verifications</span>
        </Link>
        <Link href="/admin/messages" className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:text-sky-700 hover:bg-slate-50 transition whitespace-nowrap shrink-0">
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          <span>Messages</span>
        </Link>
      </div>

      {/* Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-screen-xl mx-auto">{children}</main>
    </div>
  );
}
