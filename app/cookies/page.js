import Link from 'next/link';
import { Cookie, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Cookie & Tracking Policy | AlphaMed Cure',
  description:
    'Information regarding cookie usage, technical session tokens, and privacy preferences on the AlphaMed Cure institutional portal.',
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-slate-800">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-[11px] font-semibold">
          <Cookie className="w-3.5 h-3.5 text-medical-600" />
          <span>LEGAL & PLATFORM COMPLIANCE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Cookie & Session Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Effective Date: January 1, 2026 • AlphaMed Cure Digital Governance Unit
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xs space-y-8">
        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">1</span>
            <span>Purpose of Cookies on Our Platform</span>
          </h2>
          <p>
            AlphaMed Cure uses cookies and related browser storage technologies strictly to deliver essential functionality, maintain secure authenticated institutional sessions, protect against cross-site request forgery, and evaluate aggregate system performance.
          </p>
        </section>

        <section className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">2</span>
            <span>Categories of Cookies We Use</span>
          </h2>
          <div className="space-y-4 pt-1">
            <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-5 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>A. Essential & Authentication Cookies (Strictly Necessary)</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                These cookies are mandatory for the website to function. They store encrypted session tokens (<code className="text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded font-mono text-[11px]">alphamed_cure_session</code>) to keep verified institutional buyers authenticated across protected portal pages, enable inquiry cart management, and verify CSRF tokens. They cannot be deactivated.
              </p>
            </div>

            <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-5 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>B. Preference & Consent Cookies</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                These cookies retain your user preferences, such as your cookie consent choice (<code className="text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded font-mono text-[11px]">alphamed_cookie_consent</code>), so that the banner does not repeatedly appear on every page reload.
              </p>
            </div>

            <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-5 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-navy-600" />
                <span>C. Performance & Diagnostic Telemetry</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We may utilize diagnostic telemetry to observe page load times, broken links, and user navigation patterns to optimize our procurement workflows. Telemetry data is pseudonymized and never linked to patient health information.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">3</span>
            <span>Managing Your Browser Cookie Settings</span>
          </h2>
          <p>
            You can configure your browser to block or alert you about cookies at any time. However, blocking essential session cookies will prevent login into the institutional client portal, price unlocking, and inquiry cart submissions.
          </p>
          <p>
            Most modern web browsers allow control of cookies through their respective configuration menus (Settings → Privacy & Security → Cookies).
          </p>
        </section>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 flex flex-wrap justify-between items-center gap-4">
          <p>Questions regarding cookie policies or governance?</p>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-1.5 font-bold text-sky-600 hover:text-sky-700 transition"
          >
            <span>Review Full Privacy Policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
