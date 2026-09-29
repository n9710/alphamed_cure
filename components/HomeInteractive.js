'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { TRANSITION_EASE } from '@/lib/motion';

/**
 * HeroChoreography provides subtle, professional entrance orchestration
 * for the homepage hero viewport without flashiness or floating gimmicks.
 * Respects prefers-reduced-motion.
 */
export function HeroChoreography({ leftContent, rightVisual }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.08,
            delayChildren: 0.04,
          },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: TRANSITION_EASE,
      },
    },
  };

  const visualVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.42,
        ease: TRANSITION_EASE,
        delay: shouldReduceMotion ? 0 : 0.16,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
      <motion.div
        className="lg:col-span-7 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {leftContent.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="lg:col-span-5 relative"
        variants={visualVariants}
        initial="hidden"
        animate="visible"
      >
        {rightVisual}
      </motion.div>
    </div>
  );
}

/**
 * MotionReveal adds subtle viewport-based scroll reveals for key homepage sections.
 * Clean, restrained entrance: opacity + gentle 14px upward translation.
 */
export function MotionReveal({ children, className = '', delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.35,
        ease: TRANSITION_EASE,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
        className="relative flex items-center rounded-xl overflow-hidden border border-slate-200 bg-white focus-within:border-[#0052CC] focus-within:ring-2 focus-within:ring-[#0052CC]/15 transition-all p-1.5 shadow-2xs"
      >
        <div className="pl-3.5 pr-2 text-slate-400">
          <Search className="w-5 h-5 text-[#0052CC]" />
        </div>
        <label htmlFor="catalog-search" className="sr-only">
          Search medical catalog by formulation, API, SKU, or consumable
        </label>
        <input
          id="catalog-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by formulation, active API, SKU, or consumable..."
          className="w-full px-2 py-2.5 bg-transparent text-xs sm:text-sm text-[#091E3A] placeholder:text-slate-400 focus:outline-none font-medium"
        />
        <button
          type="submit"
          className="btn-tactile px-5 py-2.5 rounded-lg bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs sm:text-sm font-bold shadow-xs shrink-0 cursor-pointer"
        >
          Search Catalog
        </button>
      </form>

      {/* Popular Fast Search Chips */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-400 font-semibold text-[11px] tracking-wide uppercase mr-1">
          Popular:
        </span>
        {quickKeywords.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => router.push(`/products?q=${encodeURIComponent(item.q)}`)}
            className="px-3 py-1 rounded-full bg-white hover:bg-slate-50 hover:text-[#0052CC] hover:border-slate-300 border border-slate-200 text-slate-600 text-[11px] font-medium transition-all active:scale-95 cursor-pointer shadow-2xs"
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
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#0052CC]/60 shadow-2xs'
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                    isOpen ? 'text-[#0052CC]' : 'text-slate-400'
                  }`}
                />
                <span className="text-sm sm:text-base font-bold text-[#041E42]">
                  {faq.q}
                </span>
              </div>
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-transform duration-200 ${
                  isOpen
                    ? 'bg-blue-50 text-[#0052CC] rotate-180'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: TRANSITION_EASE }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pl-12 font-normal">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

