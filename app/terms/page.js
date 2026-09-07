import Link from 'next/link';
import { Scale, ShieldCheck, ThermometerSnowflake, FileCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Institutional Terms of Supply | AlphaMed Cure',
  description:
    'Terms and conditions governing business-to-business pharmaceutical and surgical equipment procurement from AlphaMed Cure.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-slate-800">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-[11px] font-semibold">
          <Scale className="w-3.5 h-3.5 text-medical-600" />
          <span>LEGAL & COMMERCIAL FRAMEWORK</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Institutional Terms of Supply & Commercial Policies
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Effective Date: January 1, 2026 • Last Reviewed: September 2026 • AlphaMed Cure Legal Division
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xs space-y-8">
        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">1</span>
            <span>Scope of B2B Wholesale Distribution</span>
          </h2>
          <p>
            AlphaMed Cure operates strictly as an institutional healthcare supplier and pharmaceutical distributor. Purchases of scheduled prescription formulations, surgical implants, and clinical diagnostic devices are restricted exclusively to licensed healthcare institutions, accredited hospitals, registered clinics, qualified retail pharmacies, and approved biomedical distributors.
          </p>
          <p>
            We do not sell directly to individual consumers or retail patients. All purchasing accounts must complete institutional facility verification prior to placing orders or accessing contract rate pricing.
          </p>
        </section>

        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">2</span>
            <span>Quotations, Pricing & Minimum Order Quantities (MOQ)</span>
          </h2>
          <p>
            All quotations and catalog pricing provided to verified clients are confidential commercial terms. Prices are subject to formal confirmation based on current batch manufacturing runs and raw material currency parity (INR / USD).
          </p>
          <p>
            Each pharmaceutical SKU or medical device line item specifies a Minimum Order Quantity (MOQ). Orders below stated MOQs may be subject to institutional repackaging surcharges or deferred until standard batch consolidation.
          </p>
        </section>

        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">3</span>
            <span>Cold-Chain & Temperature-Controlled Logistics</span>
          </h2>
          <p>
            Where products require temperature-controlled handling (e.g. 2°C – 8°C or frozen storage), AlphaMed Cure guarantees dispatch using validated thermal shippers and calibrated data loggers.
          </p>
          <p>
            Receiving hospital pharmacy personnel must inspect logger readings immediately upon delivery dock arrival. Any temperature excursion must be reported within 4 hours of receipt with accompanying logger printout for insurance and batch replacement processing.
          </p>
        </section>

        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">4</span>
            <span>Returns, Damaged Goods & Batch Recalls</span>
          </h2>
          <p>
            Due to strict cGMP and WHO guidelines for pharmaceutical safety and chain-of-custody maintenance, opened or unsealed medical supplies cannot be accepted for return.
          </p>
          <p>
            In the event of an official manufacturer product recall or verified quality defect confirmed by our pharmacovigilance unit, AlphaMed Cure manages full inventory quarantine, replacement shipments, and regulatory compliance filings.
          </p>
        </section>

        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs flex items-center justify-center">5</span>
            <span>Regulatory Compliance & Audit Rights</span>
          </h2>
          <p>
            Every batch shipment is accompanied by an authenticated Certificate of Analysis (COA) and batch test release protocol. Accredited hospital audit teams may request supplier quality audits in accordance with standard prior written notice protocols.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 flex flex-wrap justify-between items-center gap-4">
          <p>Questions regarding commercial supply contracts or institutional terms?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-bold text-sky-600 hover:text-sky-700 transition"
          >
            <span>Contact Corporate Legal & Compliance Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
