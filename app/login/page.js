'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Building2, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      // Check if redirect url in query param or route to products/admin
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get('redirect') || (data.user?.role === 'admin' ? '/admin' : '/products');
      router.push(redirectUrl);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50/50">
      {/* Subtle institutional ambient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-sky-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-emerald-200/15 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-50 border border-navy-100/60 text-navy-800 text-[11px] font-semibold tracking-wide shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-medical-600" />
          <span>SECURE ACCREDITED PORTAL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Healthcare Partner Sign In
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Access contracted institutional wholesale pricing, submit custom formulations, and monitor batch allocations.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-900/[0.04]">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50/90 border border-red-200/80 text-red-700 text-xs font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Institutional Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="procurement@hospital.org"
                  className="block w-full pl-10 pr-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl shadow-2xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden transition font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Account Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl shadow-2xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden transition font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wide shadow-md shadow-slate-900/10 hover:shadow-slate-900/20 focus:outline-hidden focus:ring-2 focus:ring-slate-400 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Not registered as a healthcare partner?{' '}
              <Link href="/register" className="font-bold text-sky-600 hover:text-sky-700 transition inline-flex items-center gap-1">
                Apply for Institutional Account
                <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100/80 flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              256-Bit SSL
            </span>
            <span>•</span>
            <span>WHO-GMP Compliant</span>
            <span>•</span>
            <span>Audit Logged</span>
          </div>
        </div>
      </div>
    </div>
  );
}
