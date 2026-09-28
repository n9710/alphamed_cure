'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';

/**
 * Controlled product search bar with instant loading spinner and clear button.
 */
export default function ProductSearch({ defaultValue = '', categorySlug = '' }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef(null);

  const navigate = (q) => {
    const params = new URLSearchParams();
    if (categorySlug) params.set('category', categorySlug);
    if (q) params.set('q', q);
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(value.trim());
  };

  const handleClear = () => {
    setValue('');
    inputRef.current?.focus();
    navigate('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-2xs focus-within:border-[#0052CC] focus-within:ring-2 focus-within:ring-blue-500/15 transition-all"
    >
      <div className="relative flex-1 flex items-center pl-3 min-w-0">
        {isPending ? (
          <Loader2 className="w-4 h-4 text-blue-600 shrink-0 animate-spin" />
        ) : (
          <Search className="w-4 h-4 text-blue-600 shrink-0" />
        )}
        <input
          ref={inputRef}
          type="text"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search formulation, SKU, consumable..."
          className="w-full pl-2.5 pr-2 py-2.5 bg-transparent text-xs sm:text-sm text-[#091E3A] placeholder:text-slate-400 focus:outline-none font-medium min-w-0"
          autoComplete="off"
        />
      </div>

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 flex items-center shrink-0 transition"
          title="Clear search"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="px-4 sm:px-6 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] disabled:opacity-60 text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition shrink-0 cursor-pointer whitespace-nowrap"
      >
        <span className="hidden sm:inline">{isPending ? 'Searching...' : 'Search'}</span>
        <Search className="w-4 h-4 sm:hidden" />
      </button>
    </form>
  );
}
