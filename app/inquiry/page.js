'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  CheckCircle2,
  Trash2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Plus,
  Minus,
  Building2,
  Sparkles,
} from 'lucide-react';

export default function InquiryPage() {
  const [items, setItems] = useState([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [error, setError] = useState('');

  // Guest fields if not logged in
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  });

  useEffect(() => {
    // Read cart items from localStorage or URL query param
    const saved = localStorage.getItem('alphamed_inquiry_cart');
    let cart = [];
    if (saved) {
      try {
        cart = JSON.parse(saved);
      } catch {
        cart = [];
      }
    }

    // Check if ?add=productId in URL
    const params = new URLSearchParams(window.location.search);
    const addId = params.get('add');
    const addName = params.get('name');
    const addSku = params.get('sku');

    if (addId) {
      const existing = cart.find((i) => i.productId === addId);
      if (existing) {
        existing.quantity += 1;
        if (addName && (!existing.name || existing.name === 'Selected Medical Supply Item')) {
          existing.name = addName;
        }
        if (addSku && !existing.sku) {
          existing.sku = addSku;
        }
      } else {
        cart.push({
          productId: addId,
          name: addName || 'Selected Medical Supply Item',
          sku: addSku || '',
          quantity: 1,
          notes: '',
        });
      }
      localStorage.setItem('alphamed_inquiry_cart', JSON.stringify(cart));
      window.history.replaceState({}, '', '/inquiry');
    }

    setItems(cart);
  }, []);

  const updateQuantity = (index, delta) => {
    setItems((prev) => {
      const copy = [...prev];
      const newQty = Math.max(1, copy[index].quantity + delta);
      copy[index].quantity = newQty;
      localStorage.setItem('alphamed_inquiry_cart', JSON.stringify(copy));
      return copy;
    });
  };

  const removeItem = (index) => {
    setItems((prev) => {
      const copy = prev.filter((_, i) => i !== index);
      localStorage.setItem('alphamed_inquiry_cart', JSON.stringify(copy));
      return copy;
    });
  };

  const clearAllItems = () => {
    if (confirm('Are you sure you want to clear all items from your inquiry cart?')) {
      localStorage.removeItem('alphamed_inquiry_cart');
      setItems([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((it) => ({
            productId: it.productId,
            quantity: it.quantity,
            notes: it.notes || '',
          })),
          notes,
          guestInfo,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmitted(true);
      setInquiryId(data.inquiryId || 'INQ-' + Date.now().toString().slice(-6));
      localStorage.removeItem('alphamed_inquiry_cart');
      setItems([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-md space-y-5 card-hover">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center text-4xl mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#041E42]">
            Inquiry Successfully Transmitted
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed font-normal">
            Your medical supply inquiry has been routed to our institutional procurement desk. Reference ID:{' '}
            <strong className="text-[#041E42] font-mono bg-slate-100 px-2.5 py-1 rounded-md">
              {inquiryId}
            </strong>
            . A pharmaceutical specialist will reply with official quotation and batch availability.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="px-7 py-3.5 rounded-xl bg-[#0052CC] text-white text-xs sm:text-sm font-bold hover:bg-[#0043A8] active:scale-95 transition shadow-sm"
            >
              Return to Products Catalog
            </Link>
            <Link
              href="/"
              className="px-7 py-3.5 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 active:scale-95 transition shadow-2xs"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200/90 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wide">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Procurement Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#041E42] tracking-tight mt-1.5">
            Institutional Inquiry &amp; RFQ Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review requested formulations and equipment before dispatching to our clinical procurement specialists.
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearAllItems}
            className="text-xs text-slate-400 hover:text-red-600 font-bold flex items-center gap-1.5 self-start sm:self-auto transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Items</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-14 text-center space-y-4 shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0052CC] flex items-center justify-center mx-auto">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#041E42]">Your Inquiry Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-normal">
            Select products from our catalog to build an institutional Request For Quote (RFQ) or batch availability check.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0052CC] text-white text-xs sm:text-sm font-bold hover:bg-[#0043A8] active:scale-95 transition shadow-sm"
            >
              <span>Explore Products Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs">
            <div className="p-5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#041E42] uppercase tracking-wider">
              <span>Selected Formulations ({items.length})</span>
              <span className="text-[11px] font-medium text-slate-500 lowercase">no payment required</span>
            </div>

            <div className="divide-y divide-slate-100">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#041E42]">
                      {item.name || `Product Item`}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      {item.sku && <span>SKU: {item.sku}</span>}
                      <span>•</span>
                      <span>Ref: {item.productId.slice(0, 10)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(idx, -1)}
                        className="p-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-bold active:scale-90 transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-900 bg-white min-w-[36px] text-center border-x border-slate-200 font-mono">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(idx, 1)}
                        className="p-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-bold active:scale-90 transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-xs text-red-500 hover:text-red-700 font-bold transition px-2 py-1 rounded-md hover:bg-red-50 cursor-pointer active:scale-95"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Form Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-5 sticky top-28">
            <div>
              <h2 className="text-sm font-extrabold text-[#041E42] uppercase tracking-wider">
                Institutional Request Form
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official price quotation dispatched within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Procurement Officer Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestInfo.name}
                  onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                  placeholder="Dr. Rajesh / Purchase Head"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Institutional Email *
                </label>
                <input
                  type="email"
                  required
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                  placeholder="procurement@hospital.org"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Healthcare Facility / Company *
                </label>
                <input
                  type="text"
                  required
                  value={guestInfo.company}
                  onChange={(e) => setGuestInfo({ ...guestInfo, company: e.target.value })}
                  placeholder="City Hospital / Clinic Network"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Contact Phone / Mobile
                </label>
                <input
                  type="tel"
                  value={guestInfo.phone}
                  onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Special Delivery or Cold-Chain Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify delivery timeline, cold-chain temperature preferences, or required batch test dossiers..."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] focus:outline-hidden transition leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-blue-600/20 active:scale-95 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Transmitting Request...' : 'Submit Institutional RFQ →'}
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-snug flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-slate-400 inline" />
                <span>Protected under hospital trade secret and patient privacy covenants.</span>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
