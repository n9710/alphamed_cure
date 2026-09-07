import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  ThermometerSnowflake,
  SearchCheck,
  FileCheck2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'Quality & Regulatory Compliance | Alphamed Cure',
  description:
    'Overview of Alphamed Cure quality assurance protocols, WHO-GMP standards, ISO 13485:2016 certifications, and cold-chain distribution integrity.',
};

export default function CompliancePage() {
  const compliancePillars = [
    {
      title: 'WHO-GMP Certified Formulations',
      icon: Award,
      desc: 'All pharmaceutical formulations and injectables distributed by Alphamed Cure are manufactured in cGMP and WHO-GMP compliant facilities. Stringent validation guidelines govern air filtration (HVAC ISO Class 5–8), water purification (WFI grade), and sterile aseptic filling.',
      checks: [
        'Batch-to-batch chemical assay and chromatographic verification',
        'Endotoxin, sterility, and microbiological assays',
        'Accelerated and real-time ICH stability validation',
      ],
    },
    {
      title: 'ISO 13485:2016 Medical Devices',
      icon: ShieldCheck,
      desc: 'Our medical equipment, diagnostic reagents, and operative surgical consumables adhere strictly to ISO 13485:2016 standards for comprehensive medical device quality management systems, ensuring clinical safety and performance consistency.',
      checks: [
        'Biocompatibility testing (ISO 10993 compliant)',
        'Gamma & EO gas sterile barrier validation (ISO 11607)',
        'Calibrated bio-medical equipment performance testing',
      ],
    },
    {
      title: 'Cold-Chain Distribution Integrity',
      icon: ThermometerSnowflake,
      desc: 'Biologics, vaccines, and sensitive parenteral drugs are managed under continuous temperature parameters (2°C to 8°C or -20°C frozen storage). Active phase-change material (PCM) shippers and wireless data loggers accompany all cold-chain shipments.',
      checks: [
        'Continuous calibrated digital temperature loggers enclosed',
        'Pre-qualified insulated shippers validated up to 96 hours',
        'Immediate audit report handoff upon hospital delivery',
      ],
    },
    {
      title: 'Pharmacovigilance & Quality Audits',
      icon: SearchCheck,
      desc: 'Our regulatory affairs team monitors adverse drug reactions and batch performance in accordance with national and international pharmacovigilance standards. Rapid recall protocols ensure immediate quarantine capabilities if required.',
      checks: [
        'Dedicated 24-hour adverse incident reporting desk',
        'Comprehensive serial and lot-level recall protocols',
        'Annual manufacturing facility audits and risk assessments',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wide border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Regulatory Assurance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041E42] tracking-tight">
          Quality, Safety &amp; Regulatory Standards
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          At Alphamed Cure, quality assurance is integrated into every phase of our supply chain — from manufacturer facility audits and batch analytical testing to temperature-controlled transit and hospital intake verification.
        </p>
      </div>

      {/* Compliance Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {compliancePillars.map((pillar, idx) => {
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

      {/* Audit Document Request Strip */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-emerald-50/50 rounded-3xl border border-blue-200/70 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0052CC] uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4" />
            <span>Audit Dossier Desk</span>
          </div>
          <h3 className="text-xl font-bold text-[#041E42]">
            Require Audit Dossiers or Certificates of Analysis (COA)?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Our regulatory affairs team provides authenticated batch test releases and manufacturer clearance files for hospital pharmacy audit committees upon request.
          </p>
        </div>
        <Link
          href="/contact?subject=Audit%20Dossier%20Request"
          className="shrink-0 px-6 py-3.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs sm:text-sm font-bold active:scale-95 transition shadow-sm"
        >
          Request Documentation
        </Link>
      </div>
    </div>
  );
}
