export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
      {/* Product Image / Visual Showcase Skeleton */}
      <div className="relative h-48 bg-slate-50 border-b border-slate-100/80 flex items-center justify-center p-4 overflow-hidden">
        {/* Category Pill Skeleton */}
        <div className="absolute top-3 left-3 w-24 h-5 rounded-full skeleton-shimmer" />

        {/* Center Icon Frame Skeleton */}
        <div className="w-20 h-20 rounded-2xl bg-white/80 border border-slate-200/60 flex items-center justify-center">
          <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
        </div>
      </div>

      {/* Product Details Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* SKU Skeleton */}
          <div className="w-28 h-3.5 rounded-md skeleton-shimmer" />

          {/* Title Skeleton */}
          <div className="w-4/5 h-5 rounded-md skeleton-shimmer" />
          <div className="w-2/3 h-5 rounded-md skeleton-shimmer" />

          {/* Description Lines */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-3 rounded-md skeleton-shimmer" />
            <div className="w-5/6 h-3 rounded-md skeleton-shimmer" />
          </div>
        </div>

        {/* Pricing / Access Control Skeleton */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="w-full h-12 rounded-xl bg-slate-50/80 border border-slate-100 p-2.5 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full skeleton-shimmer shrink-0" />
            <div className="w-3/4 h-3.5 rounded-md skeleton-shimmer" />
          </div>

          {/* CTA Buttons Skeleton */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="h-10 rounded-xl skeleton-shimmer" />
            <div className="h-10 rounded-xl skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
}
