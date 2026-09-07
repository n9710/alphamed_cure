'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClipboardList } from 'lucide-react';

export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      try {
        const saved = localStorage.getItem('alphamed_inquiry_cart');
        if (saved) {
          const items = JSON.parse(saved);
          setCount(Array.isArray(items) ? items.reduce((acc, it) => acc + (it.quantity || 1), 0) : 0);
        } else {
          setCount(0);
        }
      } catch {
        setCount(0);
      }
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    const interval = setInterval(updateCount, 1500);
    return () => {
      window.removeEventListener('storage', updateCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <Link
      href="/inquiry"
      className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 active:scale-95 transition-all shadow-2xs group"
      title="View Institutional Inquiry Cart"
      aria-label={`Inquiry Cart with ${count} items`}
    >
      <ClipboardList className="w-4 h-4 text-slate-600 group-hover:text-blue-600 transition-colors" />
      <span className="text-sm font-semibold tracking-tight text-slate-700 group-hover:text-blue-600 transition-colors">
        Inquiry Cart
      </span>
      {count > 0 ? (
        <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#0052CC] text-white text-[11px] font-extrabold flex items-center justify-center animate-pulse">
          {count}
        </span>
      ) : (
        <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-blue-400 transition-colors" />
      )}
    </Link>
  );
}
