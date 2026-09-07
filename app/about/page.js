import Link from 'next/link';
import {
  Building2,
  Microscope,
  ThermometerSnowflake,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Alphamed Cure',
  description:
    'Alphamed Cure is an accredited global medical and pharmaceutical distribution company serving healthcare providers with certified supplies, hospital equipment, and formulations.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About Alphamed Cure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041E42] tracking-tight">
          Empowering Healthcare Providers with Uncompromising Supply Reliability.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Founded to bridge critical gaps in clinical supply chains, Alphamed Cure is a premier business-to-business healthcare distributor delivering hospital-grade pharmaceuticals, sterile surgical consumables, and advanced diagnostic monitoring devices.
        </p>
      </div>

      {/* Core Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 card-hover">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052CC] border border-blue-100/80 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#041E42]">Hospital &amp; Clinical Networks</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            We partner directly with leading hospital networks, tertiary medical centers, and government institutions, ensuring consistent inventory buffers for essential critical-care formulations.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 card-hover">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/80 flex items-center justify-center">
            <Microscope className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#041E42]">Direct Manufacturer Sourcing</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            By procuring directly from WHO-GMP certified production facilities, we eliminate intermediaries, guaranteeing authentic provenance and competitive institutional pricing.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 card-hover">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052CC] border border-blue-100/80 flex items-center justify-center">
            <ThermometerSnowflake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#041E42]">Validated Cold-Chain Transport</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            From temperature-mapped warehouse zones to active insulated transport carriers, our cold-chain maintains intact efficacy for vaccines, serums, and temperature-sensitive biologics.
          </p>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="bg-[#041E42] text-white rounded-3xl p-8 sm:p-14 space-y-8 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Clinical Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Our Core Commitments</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every product supplied by Alphamed Cure directly affects patient care outcomes. Our operating philosophy is rooted in clinical responsibility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border-t border-[#0A284D] pt-5 space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>0% Compromise</span>
            </h4>
            <p className="text-xs text-slate-400">Strict batch quarantine until lab analytical assay sign-off.</p>
          </div>
          <div className="border-t border-[#0A284D] pt-5 space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full Traceability</span>
            </h4>
            <p className="text-xs text-slate-400">Barcode track-and-trace on all sterile consumables and vials.</p>
          </div>
          <div className="border-t border-[#0A284D] pt-5 space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Rapid Dispatch</span>
            </h4>
            <p className="text-xs text-slate-400">Emergency 24–48h routing for critical ICU care medications.</p>
          </div>
          <div className="border-t border-[#0A284D] pt-5 space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Regulatory Dossiers</span>
            </h4>
            <p className="text-xs text-slate-400">Audit-ready COA dossiers provided with every batch shipment.</p>
          </div>
        </div>
      </div>

      {/* Bottom Institutional CTA */}
      <div className="text-center space-y-4 pt-4 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-[#041E42]">
          Partner with Alphamed Cure for Your Hospital Supply
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
          Contact our corporate procurement desk to establish an institutional account or discuss specialized annual rate contracts.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs sm:text-sm font-bold transition shadow-sm"
          >
            Contact Procurement Desk
          </Link>
          <Link
            href="/products"
            className="px-6 py-3.5 rounded-xl border border-slate-300 bg-white text-[#041E42] text-xs sm:text-sm font-bold hover:bg-slate-50 transition shadow-2xs"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
