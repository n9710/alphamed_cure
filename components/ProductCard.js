'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Pill,
  Stethoscope,
  Activity,
  Package,
  FlaskConical,
  Tag,
  Shield,
  Copy,
  Check,
  Lock,
  ArrowRight,
  Plus,
} from 'lucide-react';

export default function ProductCard({ product }) {
  const [copied, setCopied] = useState(false);
  const hasPrice = Boolean(product.price);

  const copySku = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.sku) {
      navigator.clipboard?.writeText(product.sku);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const getCategoryIconComponent = (categorySlug) => {
    const slug = (categorySlug || '').toLowerCase();
    if (slug.includes('pharma')) return Pill;
    if (slug.includes('med')) return Stethoscope;
    if (slug.includes('dme')) return Activity;
    if (slug.includes('supp')) return Package;
    if (slug.includes('vial')) return FlaskConical;
    if (slug.includes('label')) return Tag;
    if (slug.includes('ppe')) return Shield;
    return Package;
  };

  const CategoryIcon = getCategoryIconComponent(
    product.category?.slug || product.categorySlug
  );

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs card-hover flex flex-col overflow-hidden relative">
      {/* Product Visual Showcase Area */}
      <div className="relative h-48 bg-gradient-to-b from-slate-50/90 via-blue-50/20 to-slate-100/50 border-b border-slate-100 flex items-center justify-center p-4 overflow-hidden">
        {/* Category Pill */}
        {product.category && (
          <span className="absolute top-3.5 left-3.5 text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-white/95 text-slate-700 shadow-2xs border border-slate-200/80 backdrop-blur-xs z-10 transition-colors group-hover:border-blue-300">
            {product.category.name}
          </span>
        )}

        {/* Featured Badge */}
        {product.isFeatured && (
          <span className="absolute top-3.5 right-3.5 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/90 shadow-2xs z-10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Featured
          </span>
        )}

        {/* Clinical Vector Emblem Showcase */}
        <div className="relative flex items-center justify-center">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-[#0052CC] group-hover:scale-110 group-hover:shadow-md group-hover:border-blue-300 transition-all duration-300 relative z-10">
            <CategoryIcon className="w-10 h-10 stroke-[1.75]" />
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {product.sku && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-medium text-slate-400">
                SKU: {product.sku}
              </span>
              <button
                type="button"
                onClick={copySku}
                title="Copy SKU to clipboard"
                className="text-[11px] text-slate-400 hover:text-[#0052CC] transition flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-slate-100 active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3 inline" /> Copied
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy className="w-3 h-3 inline" /> Copy
                  </span>
                )}
              </button>
            </div>
          )}

          <h3 className="text-base sm:text-[17px] font-bold text-[#041E42] group-hover:text-[#0052CC] transition-colors duration-200 line-clamp-2 leading-snug">
            <Link href={`/products/${product.slug}`} className="focus:outline-hidden">
              {product.name}
            </Link>
          </h3>

          {product.shortDesc && (
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed font-normal">
              {product.shortDesc}
            </p>
          )}
        </div>

        {/* Pricing / Access Control Section */}
        <div className="pt-3 border-t border-slate-100">
          {hasPrice ? (
            <div className="space-y-1 mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-[#041E42] font-mono">
                  ₹{Number(product.price.priceINR).toFixed(2)}
                </span>
                {product.price.priceUSD && (
                  <span className="text-xs font-semibold text-slate-400 font-mono">
                    (${Number(product.price.priceUSD).toFixed(2)})
                  </span>
                )}
                <span className="text-xs text-slate-400 font-medium">
                  / {product.price.unit}
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <span>✓ Verified Rate</span>
                <span>•</span>
                <span>MOQ: {product.price.minOrderQty} {product.price.unit}s</span>
              </p>
            </div>
          ) : (
            <div className="bg-slate-50/90 rounded-xl p-3 mb-3 border border-slate-200/80 group-hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#041E42]">
                <Lock className="w-3.5 h-3.5 text-[#0052CC]" />
                <span>B2B Contract Pricing</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                <Link
                  href="/login"
                  className="text-[#0052CC] hover:text-[#0043A8] font-semibold underline underline-offset-2"
                >
                  Sign in
                </Link>{' '}
                or{' '}
                <Link
                  href="/register"
                  className="text-[#0052CC] hover:text-[#0043A8] font-semibold underline underline-offset-2"
                >
                  verify facility
                </Link>{' '}
                for live hospital rates.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/products/${product.slug}`}
              className="w-full text-center text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-200 text-[#041E42] hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all flex items-center justify-center gap-1"
            >
              <span>Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/inquiry?add=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.sku || '')}&cat=${encodeURIComponent(product.category?.name || '')}`}
              className="w-full text-center text-xs font-bold py-2.5 px-3 rounded-xl bg-[#0052CC] text-white hover:bg-[#0043A8] hover:shadow-md hover:shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
