import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck2,
  ArrowRight,
  CheckCircle2,
  Info,
} from 'lucide-react';

export const metadata = {
  title: 'Quality & Standards | Alphamed Cure',
  description:
    'Alphamed Cure is committed to quality in healthcare product management, sourcing, and customer service.',
};

export default function CompliancePage() {
  const qualityPillars = [
    {
      title: 'Product Quality Standards',
      icon: ShieldCheck,
      desc: 'We coordinate with suppliers to ensure the healthcare products in our catalog meet appropriate quality standards. Product information is maintained accurately and updated regularly.',
      checks: [
        'Accurate product information and documentation',
        'Supplier coordination for quality assurance',
        'Regular catalog review and verification',
      ],
    },
    {
      title: 'Service Standards',
      icon: FileCheck2,
      desc: 'Our service delivery is built around professional standards for sales management, customer communication, and order handling. We maintain consistent processes across all client interactions.',
      checks: [
        'Professional communication protocols',
        'Structured sales and service processes',
        'Clear escalation and resolution paths',
      ],
    },
    {
      title: 'Data & Privacy',
      icon: Info,
      desc: 'We handle client and business information responsibly, in accordance with applicable data protection standards.',
      checks: [
        'Secure handling of client information',
        'Responsible data practices',
        'Transparent privacy policy',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wide border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Quality & Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041E42] tracking-tight">
          Our Commitment to Quality
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Alphamed Cure is committed to maintaining high standards across our services — from the quality of healthcare products we help manage, to the professionalism of our customer interactions.
        </p>
      </div>

      {/* Quality Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {qualityPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-white p-8 sm:p-9 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5 card-hover"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052CC] border border-blue-100/80 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#041E42]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 font-normal">
                  {pillar.desc}
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100">
                {pillar.checks.map((check, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-emerald-50/50 rounded-3xl border border-blue-200/70 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold text-[#041E42]">
            Have questions about how we work?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            We&apos;re happy to discuss our processes, service standards, and how we can support your healthcare business.
          </p>
        </div>
        <Link
          href="/consultation"
          className="shrink-0 px-6 py-3.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs sm:text-sm font-bold active:scale-95 transition shadow-sm inline-flex items-center gap-2"
        >
          <span>Request a Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
