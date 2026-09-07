'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Mail, 
  Phone, 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileCheck,
  Check
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50/50">
        <div className="max-w-lg w-full bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-slate-200/80 text-center space-y-6 shadow-xl shadow-slate-900/[0.04]">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>
          
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold tracking-wider uppercase border border-emerald-200/60">
              Application Logged Successfully
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Institutional Accreditation Pending
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you for registering your healthcare organization with AlphaMed Cure. Your credentials have been submitted to our regulatory compliance desk. You may now sign in to configure inquiries, review formulation specs, and request custom quotations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-left space-y-2 text-xs text-slate-600">
            <div className="font-bold text-slate-900 text-xs">What happens next?</div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Standard CDSCO & institutional verification completes within 1–2 business days.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Contract tier rates and batch allocation reserves will be unlocked on approval.</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition shadow-md shadow-slate-900/10"
            >
              <span>Proceed to Partner Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50/50">
      {/* Ambient background glows */}
      <div className="absolute top-20 right-1/3 w-[500px] h-[350px] bg-sky-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-1/4 w-[450px] h-[300px] bg-emerald-200/15 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-50 border border-navy-100/60 text-navy-800 text-[11px] font-semibold tracking-wide shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-medical-600" />
            <span>INSTITUTIONAL ACCREDITATION & PROCUREMENT</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Healthcare Facility Partner Application
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Accredited hospitals, surgical clinics, and licensed pharmaceutical distributors can register to unlock contracted institutional tier pricing, cold-chain scheduling, and dedicated account support.
          </p>
        </div>

        {/* Benefits bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Wholesale Contracts</div>
              <div className="text-[11px] text-slate-500">Tiered institutional pricing</div>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Batch Traceability</div>
              <div className="text-[11px] text-slate-500">Full COA & cold-chain data</div>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-navy-50 text-navy-600 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Dedicated Account Exec</div>
              <div className="text-[11px] text-slate-500">Priority allocation desk</div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/[0.04]">
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50/90 border border-red-200/80 text-red-700 text-xs font-medium flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Dr. / Officer First Name"
                      className="block w-full pl-10 pr-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl shadow-2xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden transition font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="block w-full pl-10 pr-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl shadow-2xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden transition font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Institutional Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="procurement@metrohospital.org"
                    className="block w-full pl-10 pr-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl shadow-2xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden transition font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Hospital / Health Organization Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Apex Health Systems / Licensed Specialty Clinic"
                    className="block w-full pl-10 pr-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl shadow-2xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden transition font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Direct Procurement Contact Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="block w-full pl-10 pr-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl shadow-2xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden transition font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Institutional Account Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters with alphanumeric credentials"
                    className="block w-full pl-10 pr-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl shadow-2xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden transition font-medium"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wide shadow-md shadow-slate-900/10 hover:shadow-slate-900/20 focus:outline-hidden focus:ring-2 focus:ring-slate-400 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Institutional Application...</span>
                    </div>
                  ) : (
                    <>
                      <span>Register Institutional Partner Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Already registered with an accredited account?{' '}
                <Link href="/login" className="font-bold text-sky-600 hover:text-sky-700 transition inline-flex items-center gap-1">
                  Sign in here
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
