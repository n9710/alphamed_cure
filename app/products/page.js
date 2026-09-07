import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/products';
import { getSession } from '@/lib/auth';
import {
  Search,
  Lock,
  CheckCircle2,
  Filter,
  X,
  Package,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const metadata = {
  title: 'Products Catalog | Alphamed Cure',
  description:
    'Search and browse pharmaceutical formulations, hospital consumables, surgical sutures, and medical diagnostic equipment available from Alphamed Cure.',
};

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = resolvedSearchParams?.category || '';
  const query = resolvedSearchParams?.q || '';
  const page = parseInt(resolvedSearchParams?.page || '1', 10);

  const session = await getSession();
  const user = session?.user;

  let products = [];
  let total = 0;
  let totalPages = 1;
  let categories = [];
  let canSeePrices = false;

  try {
    const [prodResult, catResult] = await Promise.all([
      getProducts({ categorySlug, query, page, limit: 12, user }),
      getCategories(),
    ]);
    products = prodResult.products;
    total = prodResult.total;
    totalPages = prodResult.totalPages;
    canSeePrices = prodResult.canSeePrices;
    categories = catResult;
  } catch (err) {
    console.warn('DB query error on products page:', err.message);
  }

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header with Institutional Status Strip */}
      <div className="border-b border-slate-200/90 pb-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#0052CC] text-xs font-bold">
              <Package className="w-3.5 h-3.5" />
              <span>Institutional Formulary &amp; Supplies</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#041E42] tracking-tight">
              Medical &amp; Pharmaceutical Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal">
              Browse hospital-certified medications, sterile surgical consumables, and durable clinical care equipment.
            </p>
          </div>

          {/* Pricing Tier Status Pill */}
          {canSeePrices ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold self-start md:self-auto shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>✓ Verified Facility Pricing Active</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium self-start md:self-auto shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-[#0052CC]" />
              <span>B2B Wholesale Rates Locked:</span>
              <Link
                href="/login"
                className="font-bold text-[#0052CC] underline hover:text-[#0043A8] ml-0.5"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Horizontal Category Rail */}
        <div className="md:hidden mt-6 pt-4 border-t border-slate-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Categories
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
            <Link
              href={query ? `/products?q=${encodeURIComponent(query)}` : '/products'}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                !categorySlug
                  ? 'bg-[#0052CC] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Formulations
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                  categorySlug === cat.slug
                    ? 'bg-[#0052CC] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat.icon || '📦'} {cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Filter & Catalog Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Desktop Sticky Category Sidebar */}
        <aside className="hidden md:block space-y-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#0052CC]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#041E42]">
                Categories
              </h2>
            </div>
            {categorySlug && (
              <Link
                href={query ? `/products?q=${encodeURIComponent(query)}` : '/products'}
                className="text-[11px] font-bold text-[#0052CC] hover:underline"
              >
                Reset
              </Link>
            )}
          </div>

          <div className="space-y-1.5">
            <Link
              href={query ? `/products?q=${encodeURIComponent(query)}` : '/products'}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                !categorySlug
                  ? 'bg-[#0052CC] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>All Categories</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                  !categorySlug
                    ? 'bg-blue-800 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {total}
              </span>
            </Link>

            {categories.map((cat) => {
              const isSelected = categorySlug === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                  className={`flex justify-between items-center px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#0052CC] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate flex items-center gap-2">
                    <span>{cat.icon || '📦'}</span>
                    <span className="truncate">{cat.name}</span>
                  </span>
                  {cat._count?.products !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                        isSelected
                          ? 'bg-blue-800 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {cat._count.products}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Product Grid & Search Area */}
        <div className="md:col-span-3 space-y-6">
          {/* Search Bar Form */}
          <form
            method="GET"
            action="/products"
            className="flex gap-2.5 p-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-2xs focus-within:border-[#0052CC] focus-within:ring-2 focus-within:ring-blue-500/15 transition-all"
          >
            {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            <div className="relative flex-1 flex items-center pl-3">
              <Search className="w-4 h-4 text-blue-600 shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by formulation, active ingredient, SKU, or consumable..."
                className="w-full pl-2.5 pr-4 py-2.5 bg-transparent text-xs sm:text-sm text-[#091E3A] placeholder:text-slate-400 focus:outline-hidden font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition shrink-0 cursor-pointer"
            >
              Search
            </button>
            {query && (
              <Link
                href={categorySlug ? `/products?category=${categorySlug}` : '/products'}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1 shrink-0 transition"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear</span>
              </Link>
            )}
          </form>

          {/* Results Summary Strip */}
          <div className="flex flex-wrap justify-between items-center text-xs text-slate-500 px-1 gap-2">
            <span>
              Showing <strong className="text-[#041E42]">{products.length}</strong> of{' '}
              <strong className="text-[#041E42]">{total}</strong> items
              {query && (
                <span>
                  {' '}matching &quot;<strong className="text-[#0052CC]">{query}</strong>&quot;
                </span>
              )}
              {activeCategory && (
                <span>
                  {' '}in <strong className="text-[#041E42]">{activeCategory.name}</strong>
                </span>
              )}
            </span>
            <span className="font-medium">
              Page {page} of {Math.max(totalPages, 1)}
            </span>
          </div>

          {/* Product Cards Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-2xs">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0052CC] flex items-center justify-center mx-auto text-2xl font-bold">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#041E42]">
                No matching formulations found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find items matching your search criteria. Try adjusting your query or resetting category filters.
              </p>
              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0052CC] text-white text-xs sm:text-sm font-bold hover:bg-[#0043A8] active:scale-95 transition shadow-xs"
                >
                  <span>Reset All Filters</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/products?${new URLSearchParams({
                    ...(categorySlug ? { category: categorySlug } : {}),
                    ...(query ? { q: query } : {}),
                    page: String(p),
                  }).toString()}`}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    p === page
                      ? 'bg-[#0052CC] text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-95'
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
