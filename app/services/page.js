import Link from 'next/link';
import { SERVICES } from '@/data/services';
import {
  Building2,
  ThermometerSnowflake,
  Layers,
  Activity,
  FileCheck2,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'Institutional Healthcare Services | Alphamed Cure',
  description:
    'Explore Alphamed Cure’s specialized B2B medical supply services: hospital procurement, validated cold-chain logistics, pharmacy supplies, DME hardware, and regulatory support.',
};

export default function ServicesPage() {
  const serviceIcons = [
    Building2,
    ThermometerSnowflake,
    Layers,
    Activity,
    FileCheck2,
    Zap,
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Services Header */}
      <section className="bg-gradient-to-b from-[#F0F7FF] via-[#FAFCFE] to-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-[#0052CC] text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>B2B Healthcare Capabilities &amp; Logistics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#041E42]">
            Healthcare Supply &amp; Institutional Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
            From bulk institutional hospital tenders and validated cryogenic packaging to strict cold-chain distribution, Alphamed Cure provides dependable operational support engineered for healthcare providers.
          </p>
        </div>
      </section>

      {/* Services Grid (Data-driven) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = serviceIcons[idx] || Activity;
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-8 flex flex-col justify-between card-hover shadow-2xs group"
              >
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-[#0052CC] group-hover:scale-110 group-hover:bg-[#0052CC] group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#041E42] group-hover:text-[#0052CC] transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-xs font-semibold text-slate-400 mt-1">
                      {service.shortDesc}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100 font-normal">
                    {service.fullDesc}
                  </p>

                  {/* Key Capabilities */}
                  <div className="pt-2 space-y-2.5">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Capabilities
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052CC] hover:text-[#0043A8] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How We Support Clinical Supply Chains */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
              Workflow Integration
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight">
              How Alphamed Cure Supports Your Hospital Supply
            </h2>
            <p className="text-sm text-slate-600 font-normal">
              We eliminate friction between certified manufacturers and frontline healthcare facilities with disciplined operational execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 space-y-3 shadow-2xs">
              <div className="text-[#0052CC] font-mono font-extrabold text-2xl">01</div>
              <h3 className="text-lg font-bold text-[#041E42]">Custom Formulary Alignment</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We review your hospital formulary requirements, establish SKU buffer targets, and lock scheduled delivery intervals to prevent emergency stockouts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 space-y-3 shadow-2xs">
              <div className="text-[#0052CC] font-mono font-extrabold text-2xl">02</div>
              <h3 className="text-lg font-bold text-[#041E42]">End-to-End Batch Documentation</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Every release includes verified manufacturer COAs, sterility certifications, and temperature monitoring logs ready for institutional audits.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 space-y-3 shadow-2xs">
              <div className="text-[#0052CC] font-mono font-extrabold text-2xl">03</div>
              <h3 className="text-lg font-bold text-[#041E42]">Responsive Account Desk</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Direct access to institutional procurement representatives who understand medical supply urgencies and clinical regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl medical-gradient text-white p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl card-hover">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Need a Customized Institutional Supply Agreement?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
              Our institutional procurement team works closely with hospital purchasing committees, health networks, and licensed distributors to establish reliable supply contracts.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/contact"
              className="px-7 py-4 rounded-xl bg-white text-[#041E42] font-bold text-xs sm:text-sm hover:bg-slate-100 active:scale-95 transition shadow-md"
            >
              Contact Procurement Desk
            </Link>
            <Link
              href="/inquiry"
              className="px-7 py-4 rounded-xl bg-blue-700/80 border border-white/25 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 active:scale-95 transition"
            >
              Submit Item Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
