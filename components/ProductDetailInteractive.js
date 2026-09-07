'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Copy,
  Check,
  Lock,
  Plus,
  Minus,
  ClipboardList,
  Mail,
  ShieldCheck,
  ThermometerSnowflake,
  FileText,
  FileCheck2,
} from 'lucide-react';

export default function ProductDetailInteractive({ product }) {
  const [activeTab, setActiveTab] = useState('specs');
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const specifications =
    typeof product.specifications === 'object' && product.specifications !== null
      ? product.specifications
      : {};

  const handleCopySku = () => {
    if (product.sku) {
      navigator.clipboard?.writeText(product.sku);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const handleAddToInquiry = () => {
    try {
      const saved = localStorage.getItem('alphamed_inquiry_cart');
      let cart = saved ? JSON.parse(saved) : [];
      const existing = cart.find((it) => it.productId === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          productId: product.id,
          name: product.name,
          sku: product.sku || '',
          quantity,
          notes: '',
        });
      }
      localStorage.setItem('alphamed_inquiry_cart', JSON.stringify(cart));
      setAdded(true);
      setTimeout(() => {
        router.push('/inquiry');
      }, 400);
    } catch {
      router.push(
        `/inquiry?add=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.sku || '')}`
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            {product.category && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] border border-blue-200/70">
                {product.category.name}
              </span>
            )}
            {product.sku && (
              <button
                type="button"
                onClick={handleCopySku}
                className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                title="Click to copy SKU"
              >
                <span>SKU: {product.sku}</span>
                {copied ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3 inline" /> Copied!
                  </span>
                ) : (
                  <Copy className="w-3 h-3 text-slate-400" />
                )}
              </button>
            )}
            {product.isFeatured && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Featured Formulation
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041E42] tracking-tight leading-tight">
            {product.name}
          </h1>

          {product.shortDesc && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {product.shortDesc}
            </p>
          )}
        </div>

        {/* Pricing / Access Control Banner */}
        <div className="pt-6 border-t border-slate-100">
          {product.canSeePrices && product.price ? (
            <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-5 space-y-2">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#041E42] font-mono">
                  ₹{Number(product.price.priceINR).toFixed(2)}
                </span>
                {product.price.priceUSD && (
                  <span className="text-base text-slate-500 font-semibold font-mono">
                    (${Number(product.price.priceUSD).toFixed(2)} USD)
                  </span>
                )}
                <span className="text-sm text-slate-500 font-medium">
                  / per {product.price.unit}
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Verified Hospital Contract Pricing Active</span>
                <span>•</span>
                <span>Minimum Order Quantity: {product.price.minOrderQty} {product.price.unit}s</span>
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-50/90 to-slate-50 border border-blue-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0052CC] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Institutional Contract Pricing</span>
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Wholesale volume schedules and tier rates require facility verification.
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <Link
                  href="/login"
                  className="px-4 py-2.5 rounded-xl bg-[#0052CC] text-white font-bold text-xs hover:bg-[#0043A8] active:scale-95 transition shadow-2xs"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 active:scale-95 transition shadow-2xs"
                >
                  Register Facility
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Quantity & Inquiry Cart Trigger */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex items-center border border-slate-300 rounded-2xl overflow-hidden bg-slate-50 w-fit self-center sm:self-auto shadow-2xs">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-3 text-slate-600 hover:bg-slate-200 font-bold transition active:scale-95 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-5 py-3 text-sm font-bold text-slate-900 bg-white min-w-[50px] text-center border-x border-slate-200">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-3 text-slate-600 hover:bg-slate-200 font-bold transition active:scale-95 cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToInquiry}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shadow-md cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0052CC] text-white hover:bg-[#0043A8] hover:shadow-lg hover:shadow-blue-600/25'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>{added ? '✓ Added to Inquiry Cart!' : 'Add to Institutional Inquiry Cart'}</span>
          </button>

          <Link
            href="/contact"
            className="py-4 px-6 rounded-2xl border border-slate-300 bg-white text-[#041E42] hover:bg-slate-50 text-xs sm:text-sm font-bold text-center active:scale-95 transition shadow-2xs flex items-center justify-center gap-1.5"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            <span>Direct Inquiry</span>
          </Link>
        </div>
      </div>

      {/* Interactive Tabs: Specs / Clinical / Compliance */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-4 sm:gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-[#0052CC] text-[#0052CC]'
                : 'border-transparent text-slate-500 hover:text-[#041E42]'
            }`}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('storage')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'storage'
                ? 'border-[#0052CC] text-[#0052CC]'
                : 'border-transparent text-slate-500 hover:text-[#041E42]'
            }`}
          >
            Storage &amp; Cold Chain Protocols
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('compliance')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'compliance'
                ? 'border-[#0052CC] text-[#0052CC]'
                : 'border-transparent text-slate-500 hover:text-[#041E42]'
            }`}
          >
            Quality &amp; Regulatory Standards
          </button>
        </div>

        {/* Tab 1: Specs */}
        {activeTab === 'specs' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Formulation &amp; Technical Parameters
            </h3>
            {Object.keys(specifications).length > 0 ? (
              <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs sm:text-sm">
                {Object.entries(specifications).map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/80 transition ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                    }`}
                  >
                    <span className="font-bold text-[#041E42]">{key}</span>
                    <span className="sm:col-span-2 text-slate-600 mt-1 sm:mt-0 font-medium">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-4">
                Detailed monograph parameters available upon request from the procurement desk.
              </p>
            )}

            {product.description && (
              <div className="pt-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Clinical Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Storage & Cold Chain */}
        {activeTab === 'storage' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
              <h4 className="font-bold text-[#041E42] text-sm flex items-center gap-2">
                <ThermometerSnowflake className="w-4 h-4 text-[#0052CC]" />
                <span>Cold-Chain &amp; Thermal Stability Handling</span>
              </h4>
              <p>
                This item is stored and dispatched following validated cold-chain or ambient controlled standards. All batches are kept in ISO-certified warehousing facilities monitored by automated temperature alarm systems.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700 font-medium pt-1">
                <li>Continuous digital temperature logger enclosed with bulk institutional shipments.</li>
                <li>Pre-qualified EPS insulated shipping units with dry ice / gel packs as specified.</li>
                <li>Guaranteed minimum 80% remaining shelf life upon institutional delivery.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Compliance */}
        {activeTab === 'compliance' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
              <h4 className="font-bold text-[#041E42] text-sm flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Batch Documentation</span>
              </h4>
              <p>
                Every order dispatched from Alphamed Cure is accompanied by complete regulatory validation files ready for hospital pharmacy audit committees:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <p className="font-bold text-[#041E42]">Certificate of Analysis (COA)</p>
                  <p className="text-xs text-slate-500 mt-1">Lot-specific potency, dissolution, and sterility assays.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <p className="font-bold text-[#041E42]">GMP Release Dossier</p>
                  <p className="text-xs text-slate-500 mt-1">Manufacturer clearance and pharmacopeial compliance.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
