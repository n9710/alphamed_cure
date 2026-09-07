import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy & Data Protection Policy | AlphaMed Cure',
  description:
    'Information on how AlphaMed Cure secures institutional customer data, inquiry specifications, and regulatory account records.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-slate-800">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-[11px] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-medical-600" />
          <span>DATA GOVERNANCE & COMPLIANCE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Privacy & Institutional Data Protection Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Effective Date: January 1, 2026 • AlphaMed Cure Data Governance & Information Security Unit
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xs space-y-8">
        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">1</span>
            <span>Information We Collect</span>
          </h2>
          <p>
            AlphaMed Cure collects information strictly necessary to execute institutional healthcare procurement, satisfy national drug distribution licensing laws, and manage verified business-to-business transactions:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
            <li><strong className="text-slate-800">Institutional contact information:</strong> Name, professional designation, hospital/clinic name, institutional email address, telephone numbers.</li>
            <li><strong className="text-slate-800">Facility credentials:</strong> Drug licenses, institutional tax IDs, hospital registration certificates, and wholesale accreditation numbers.</li>
            <li><strong className="text-slate-800">Transactional records:</strong> RFQs, inquiry lists, custom batch formulations, and delivery addresses.</li>
            <li><strong className="text-slate-800">Technical telemetry:</strong> System access logs, IP addresses, and secure session authentication tokens.</li>
          </ul>
        </section>

        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">2</span>
            <span>How We Use Collected Data</span>
          </h2>
          <p>
            Information provided to AlphaMed Cure is used solely for legitimate healthcare supply operations:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
            <li>Verifying licensed healthcare entity credentials before releasing contracted drug prices.</li>
            <li>Processing and quoting institutional pharmaceutical inquiries and tenders.</li>
            <li>Complying with statutory drug recall and batch traceability record-keeping requirements.</li>
            <li>Preventing fraudulent pharmaceutical procurement and unauthorized system access.</li>
          </ul>
        </section>

        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">3</span>
            <span>Confidentiality of Hospital RFQs & Commercial Data</span>
          </h2>
          <p>
            We treat all hospital pricing agreements, tender submissions, and custom formulation inquiries as strictly confidential trade secrets. We never sell, monetize, or disclose institutional client data to third-party marketing brokers.
          </p>
        </section>

        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">4</span>
            <span>Data Security & Storage Standards</span>
          </h2>
          <p>
            All account data and inquiry transmissions are protected using industry-standard TLS 1.3 encryption in transit and AES-256 encryption at rest. Database access is guarded by strict role-based access control (RBAC) and audited server-side session tokens.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 flex flex-wrap justify-between items-center gap-4">
          <p>Data protection or compliance inquiries?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-bold text-sky-600 hover:text-sky-700 transition"
          >
            <span>Contact Data Protection Officer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
