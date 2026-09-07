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
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md p-6'
    : 'flex flex-col items-center justify-center p-8 sm:p-12';

  const logoWidth = isLarge ? 220 : isSmall ? 130 : 180;
  const logoHeight = Math.round(logoWidth / 1.5);

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className="relative flex flex-col items-center max-w-sm text-center">
        {/* Ambient Soft Glow Backdrop */}
        <div className="absolute -inset-8 bg-radial from-blue-500/10 via-emerald-500/5 to-transparent rounded-full blur-2xl pointer-events-none animate-pulse" />

        {/* Logo with Precision Hexagonal Stroke Frame */}
        <div className="relative p-6 bg-white/95 rounded-3xl border border-slate-200/80 shadow-lg shadow-blue-950/5">
          {/* Animated SVG Hexagonal / Medical Trace Frame */}
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
              rx="22"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Animated pharmaceutical blue active tracer */}
            <rect
              x="3"
              y="3"
              width="194"
              height="134"
              rx="22"
              stroke="#0052CC"
              strokeWidth="2"
              className="animate-loader-draw"
            />
          </svg>

          {/* Authentic AlphaMed Cure Logo */}
          <div className="relative z-10 flex items-center justify-center">
            <div
              style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
              className="relative transition-transform duration-300"
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

          {/* Strategic Medical-Green Pulse Beacon */}
          <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse-emerald" />
            <span className="absolute w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* Dynamic Progress Indicator Bar */}
        <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden mt-6 relative">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-500 rounded-full"
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
