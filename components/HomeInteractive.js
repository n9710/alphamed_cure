'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, CheckCircle2 } from 'lucide-react';

export function HeroQuickSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const quickKeywords = [
    { label: 'Meropenem 1g IV', q: 'Meropenem' },
    { label: 'Chemo Nitrile Gloves', q: 'Nitrile' },
    { label: 'ICU Patient Monitor', q: 'Monitor' },
    { label: 'USP Borosilicate Vials', q: 'Vials' },
    { label: 'Sterile Sutures', q: 'Suture' },
    { label: 'Cryogenic Labels', q: 'Cryogenic' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-3.5 pt-2">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center shadow-lg shadow-blue-950/5 rounded-2xl overflow-hidden border border-slate-200/90 bg-white/95 backdrop-blur-md focus-within:border-[#0052CC] focus-within:ring-3 focus-within:ring-blue-500/15 transition-all p-1.5"
      >
        <div className="pl-3.5 pr-2 text-slate-400">
          <Search className="w-5 h-5 text-blue-600" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by formulation, active API, SKU, or consumable..."
          className="w-full px-2 py-3 bg-transparent text-sm sm:text-base text-[#091E3A] placeholder:text-slate-400 focus:outline-hidden font-medium"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          Search Catalog
        </button>
      </form>

      {/* Popular Fast Search Chips */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-semibold text-[11px] tracking-wide uppercase mr-1">
          Popular:
        </span>
        {quickKeywords.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => router.push(`/products?q=${encodeURIComponent(item.q)}`)}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-blue-50 hover:text-[#0052CC] hover:border-blue-200 border border-slate-200/80 text-slate-600 text-xs font-medium transition-all active:scale-95 cursor-pointer shadow-2xs"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProcurementFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does institutional verification and wholesale contract pricing work?',
      a: 'In adherence to national pharmaceutical and medical device distribution regulations, live wholesale contract pricing and institutional tier discounts are reserved for verified healthcare organizations. Upon registration, hospital pharmacies and licensed procurement directors submit their regulatory credentials (drug license, tax identifier) for expedited validation, typically completed within 24 to 48 hours.',
    },
    {
      q: 'What cold-chain protocols govern temperature-sensitive pharmaceuticals?',
      a: 'All biologicals, vaccines, and injectables are packed in qualified thermal insulation boxes with continuous digital temperature loggers. Shipments maintain a validated 2°C to 8°C environment, with data logs audited and handed over at the hospital receiving dock.',
    },
    {
      q: 'Can institutions request customized packaging and cryogenic barcoding?',
      a: 'Yes. Alphamed Cure provides specialized clinical supply services including cryogenic-resistant thermal transfer labeling, serialized GS1 DataMatrix barcodes, and cleanroom-packed USP Type I borosilicate vials tailored to hospital automated medication dispensing cabinets (ADCs) and central sterile supply departments (CSSD).',
    },
    {
      q: 'How are emergency ICU stock shortages and hospital tenders supported?',
      a: 'Our Emergency Replenishment Desk maintains dedicated inventory buffers for critical care antibiotics, airway devices, and sterile surgical sets. We also partner on recurring annual rate contracts (RC) and institutional hospital procurement tenders with dedicated account managers.',
    },
  ];

  return (
    <div className="space-y-3.5 max-w-3xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-blue-300 shadow-md shadow-blue-900/5 ring-1 ring-blue-100'
                : 'bg-white border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-hidden cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isOpen ? 'text-[#0052CC]' : 'text-slate-400'
                  }`}
                />
                <span className="text-sm sm:text-base font-bold text-[#041E42]">
                  {faq.q}
                </span>
              </div>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-transform duration-200 ${
                  isOpen
                    ? 'bg-blue-50 text-[#0052CC] rotate-180'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pl-14">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
