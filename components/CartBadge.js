'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSITION_EASE } from '@/lib/motion';

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
    window.addEventListener('alphamed-cart-updated', updateCount);
    const interval = setInterval(updateCount, 2000);
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('alphamed-cart-updated', updateCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <Link
      href="/inquiry"
      className="btn-tactile relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 transition-colors shadow-2xs group"
      title="View Institutional Inquiry Cart"
      aria-label={`Inquiry Cart with ${count} items`}
    >
      <ClipboardList className="w-4 h-4 text-slate-600 group-hover:text-[#0052CC] group-hover:scale-105 transition-all duration-200" />
      <span className="text-sm font-semibold tracking-tight text-slate-700 group-hover:text-[#0052CC] transition-colors">
        Inquiry Cart
      </span>
      {count > 0 ? (
        <AnimatePresence mode="wait">
          <motion.span
            key={count}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2, ease: TRANSITION_EASE }}
            className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#0052CC] text-white text-[11px] font-extrabold flex items-center justify-center"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-[#0052CC] transition-colors duration-200" />
      )}
    </Link>
  );
}
