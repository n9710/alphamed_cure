'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { dispatchCartUpdate } from '@/lib/motion';

export default function ProductCard({ product }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [adding, setAdding] = useState(false);
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

  const handleQuickInquire = (e) => {
    e.preventDefault();
    try {
      const saved = localStorage.getItem('alphamed_inquiry_cart');
      let cart = saved ? JSON.parse(saved) : [];
      const existing = cart.find((it) => it.productId === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          productId: product.id,
          name: product.name,
          sku: product.sku || '',
          quantity: 1,
          notes: '',
        });
      }
      localStorage.setItem('alphamed_inquiry_cart', JSON.stringify(cart));
      dispatchCartUpdate();
      setAdding(true);
      setTimeout(() => {
        router.push('/inquiry');
      }, 350);
    } catch {
      router.push(
        `/inquiry?add=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.sku || '')}&cat=${encodeURIComponent(product.category?.name || '')}`
      );
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
    <div className="group bg-white rounded-xl border border-slate-200 shadow-2xs card-hover flex flex-col overflow-hidden relative hover:border-[#0052CC]/40 hover:shadow-md transition-all duration-200 active:scale-[0.995]">
      {/* Product Visual Showcase Area */}
      <div className="relative h-44 bg-slate-50/60 border-b border-slate-100 flex items-center justify-center p-4 overflow-hidden">
        {/* Category Pill */}
        {product.category && (
          <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white text-slate-700 shadow-2xs border border-slate-200/90 z-10 transition-colors group-hover:border-slate-300">
            {product.category.name}
          </span>
        )}

        {/* Featured Badge */}
        {product.isFeatured && (
          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/90 shadow-2xs z-10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Featured
          </span>
        )}

        {/* Clinical Vector Emblem Showcase */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl bg-white shadow-2xs border border-slate-200/90 flex items-center justify-center text-[#0052CC] group-hover:scale-[1.02] group-hover:border-[#0052CC]/40 transition-all duration-200">
            <CategoryIcon className="w-8 h-8 stroke-[1.75]" />
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {product.sku && (
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono font-medium text-slate-500">
                SKU: {product.sku}
              </span>
              <button
                type="button"
                onClick={copySku}
                title="Copy SKU to clipboard"
                className="text-[11px] text-slate-400 hover:text-[#0052CC] transition-all flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-100 active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
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

          <h3 className="text-sm sm:text-base font-bold text-[#041E42] group-hover:text-[#0052CC] transition-colors line-clamp-2 leading-snug">
            <Link
              href={`/products/${product.slug}`}
              className="focus-visible:outline-2 focus-visible:outline-[#0052CC] focus-visible:outline-offset-2 rounded-sm"
            >
              {product.name}
            </Link>
          </h3>

          {product.shortDesc && (
            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed font-normal">
              {product.shortDesc}
            </p>
          )}
        </div>

        {/* Pricing / Access Control Section */}
        <div className="pt-3 border-t border-slate-100">
          {hasPrice ? (
            <div className="space-y-1 mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-[#041E42] font-mono">
                  ₹{Number(product.price.priceINR).toFixed(2)}
                </span>
                {product.price.priceUSD && (
                  <span className="text-xs font-semibold text-slate-400 font-mono">
                    (${Number(product.price.priceUSD).toFixed(2)})
                  </span>
                )}
                <span className="text-xs text-slate-400 font-normal">
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
            <div className="bg-slate-50 rounded-lg p-2.5 mb-3 border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#041E42]">
                <Lock className="w-3.5 h-3.5 text-[#0052CC]" />
                <span>B2B Contract Pricing</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug font-normal">
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
                for live rates.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/products/${product.slug}`}
              className="btn-tactile group/specs w-full text-center text-xs font-bold py-2 px-3 rounded-lg border border-slate-200 text-[#041E42] hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Specs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/specs:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <button
              type="button"
              onClick={handleQuickInquire}
              disabled={adding}
              className={`btn-tactile w-full text-center text-xs font-bold py-2 px-3 rounded-lg transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer ${
                adding
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0052CC] text-white hover:bg-[#0043A8]'
              }`}
            >
              {adding ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added ✓</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
