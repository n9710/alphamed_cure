import Link from 'next/link';
import {
  CheckCircle2,
  Sparkles,
  Headphones,
  Package,
  TrendingUp,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Alphamed Cure',
  description:
    'Alphamed Cure is a healthcare business partner providing Sales, Service, and Support to businesses in the healthcare products space.',
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
          A Business Partner for Healthcare.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Alphamed Cure exists to help businesses in the healthcare products space grow. We provide structured sales management, product coordination, and customer support — so healthcare businesses can focus on what they do best.
        </p>
      </div>

      {/* Three Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 card-hover">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052CC] border border-blue-100/80 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#041E42]">Sales</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            We manage the full sales cycle for healthcare businesses — from lead engagement and product presentation to order closure and follow-up.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 card-hover">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/80 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#041E42]">Service</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            We handle product management, sourcing coordination, and order management so that every client interaction is handled professionally and efficiently.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 card-hover">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052CC] border border-blue-100/80 flex items-center justify-center">
            <Headphones className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#041E42]">Support</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            From calling and customer communication to business process support, we provide the operational backbone that keeps healthcare businesses running smoothly.
          </p>
        </div>
      </div>

      {/* How We Work */}
      <div className="bg-[#041E42] text-white rounded-3xl p-8 sm:p-14 space-y-8 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            How We Work
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Our Approach</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Alphamed Cure operates as an extension of your business. We understand your products, your clients, and your goals — and we bring the processes and people to deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border-t border-[#0A284D] pt-5 space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Understand</span>
            </h4>
            <p className="text-xs text-slate-400">We learn your business, your products, and your market before we start.</p>
          </div>
          <div className="border-t border-[#0A284D] pt-5 space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Plan</span>
            </h4>
            <p className="text-xs text-slate-400">We build the right support structure — sales, service, or a combination of both.</p>
          </div>
          <div className="border-t border-[#0A284D] pt-5 space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Execute</span>
            </h4>
            <p className="text-xs text-slate-400">We handle the day-to-day work — calling, coordination, follow-up, and management.</p>
          </div>
          <div className="border-t border-[#0A284D] pt-5 space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Grow</span>
            </h4>
            <p className="text-xs text-slate-400">As your business grows, we scale our support alongside you.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 pt-4 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-[#041E42]">
          Ready to work with Alphamed Cure?
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
          Tell us about your business and we&apos;ll discuss how we can support your growth.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/consultation"
            className="px-6 py-3.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs sm:text-sm font-bold transition shadow-sm"
          >
            Request a Consultation
          </Link>
          <Link
            href="/products"
            className="px-6 py-3.5 rounded-xl border border-slate-300 bg-white text-[#041E42] text-xs sm:text-sm font-bold hover:bg-slate-50 transition shadow-2xs"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
}
