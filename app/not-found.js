import Link from 'next/link';
import { ShieldAlert, ArrowRight, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16 relative overflow-hidden bg-slate-50/50">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-sky-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-lg w-full bg-white/95 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/[0.04] space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-8 h-8 stroke-[2]" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-bold tracking-widest uppercase">
            ERROR 404 • CATALOG EXCEPTION
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Formulation or Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            The requested pharmaceutical formulation, catalog resource, or institutional regulatory dossier could not be located or may have been reclassified.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Search Catalog</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-2xs"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Return to Home</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
          Need assistance? Reach our institutional desk at{' '}
          <Link href="/contact" className="font-semibold text-sky-600 hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
