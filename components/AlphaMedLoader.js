'use client';

import Image from 'next/image';

export default function AlphaMedLoader({
  message = 'Preparing institutional supply catalog...',
  subtext = 'WHO-GMP & ISO 13485:2016 Verified Network',
  fullScreen = false,
  size = 'md',
}) {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/98 p-6'
    : 'flex flex-col items-center justify-center p-8 sm:p-12';

  const logoWidth = isLarge ? 220 : isSmall ? 130 : 180;
  const logoHeight = Math.round(logoWidth / 1.5);

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className="relative flex flex-col items-center max-w-sm text-center">
        {/* Logo Frame with Precision Border */}
        <div className="relative p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
          {/* Animated SVG Hairline Guide */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 200 140"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Background hairline guide */}
            <rect
              x="3"
              y="3"
              width="194"
              height="134"
              rx="16"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Active cobalt tracer */}
            <rect
              x="3"
              y="3"
              width="194"
              height="134"
              rx="16"
              stroke="#0052CC"
              strokeWidth="2"
              className="animate-loader-draw"
            />
          </svg>

          {/* Authentic AlphaMed Cure Logo */}
          <div className="relative z-10 flex items-center justify-center">
            <div
              style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
              className="relative transition-transform duration-200"
            >
              <Image
                src="/assets/alphamed_cure_logo.png"
                alt="Alphamed Cure Loading"
                fill
                sizes="220px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Clean status beacon */}
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
        </div>

        {/* Dynamic Progress Indicator Bar */}
        <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden mt-6 relative">
          <div
            className="h-full bg-[#0052CC] rounded-full"
            style={{
              animation: 'skeleton-shimmer 1.8s ease-in-out infinite',
              backgroundSize: '200% 100%',
            }}
          />
        </div>

        {/* Branded Status Copy */}
        <div className="mt-4 space-y-1">
          <p className="text-sm font-bold text-[#041E42] tracking-tight">
            {message}
          </p>
          {subtext && (
            <p className="text-[11px] font-medium text-slate-500 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
              <span>{subtext}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
