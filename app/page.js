import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/products';
import { getSession } from '@/lib/auth';
import { SERVICES } from '@/data/services';
import { HeroQuickSearch, ProcurementFaq } from '@/components/HomeInteractive';
import {
  ShieldCheck,
  Award,
  ThermometerSnowflake,
  FileCheck2,
  Building2,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Pill,
  Activity,
  Layers,
  Sparkles,
  Lock,
} from 'lucide-react';

export default async function HomePage() {
  const session = await getSession();
  const user = session?.user;

  // Fetch featured products & categories (from DB with graceful fallback)
  let featuredProducts = [];
  let categories = [];
  try {
    const [productsResult, categoriesResult] = await Promise.all([
      getProducts({ featured: true, limit: 6, user }),
      getCategories(),
    ]);
    featuredProducts = productsResult.products;
    categories = categoriesResult;
  } catch (err) {
    console.warn('Database query fallback on homepage:', err.message);
  }

  const trustCredentials = [
    {
      title: 'WHO-GMP Certified',
      subtitle: 'Partner Manufacturing',
      icon: Award,
    },
    {
      title: 'ISO 13485:2016',
      subtitle: 'Medical Device Standards',
      icon: ShieldCheck,
    },
    {
      title: 'Validated Cold-Chain',
      subtitle: '2°C to 8°C Continuous Logging',
      icon: ThermometerSnowflake,
    },
    {
      title: '100% Traceability',
      subtitle: 'Lot-Specific COA Dossiers',
      icon: FileCheck2,
    },
    {
      title: 'Direct Institutional',
      subtitle: 'Hospital Supply Allocations',
      icon: Building2,
    },
  ];

  const statMetrics = [
    { value: '500+', label: 'Certified Formulations & Devices' },
    { value: '24–48h', label: 'Emergency Clinical Dispatch' },
    { value: '100%', label: 'Batch Analytical Traceability' },
    { value: '50+', label: 'Healthcare Network Partners' },
  ];

  return (
    <div className="space-y-12 sm:space-y-20 pb-16 sm:pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-[#FAFCFE] to-white pt-10 sm:pt-14 pb-14 sm:pb-20 border-b border-slate-200/80">
        {/* Subtle Ambient Radial Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Authoritative Editorial Copy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge with Live Green Indicator */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-[#041E42] tracking-wide">
                  WHO-GMP & ISO 13485:2016 Certified Procurement Network
                </span>
              </div>

              {/* Large, Confident Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#041E42] tracking-tight leading-[1.1]">
                Institutional Healthcare &amp;{' '}
                <span className="text-[#0052CC]">Pharmaceutical</span> Supply.
              </h1>

              {/* Supporting Copy (18-20px) */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Alphamed Cure coordinates precision procurement and certified distribution of hospital-grade pharmaceuticals, sterile surgical consumables, and advanced clinical equipment for licensed healthcare networks.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#0052CC] text-white font-bold text-sm hover:bg-[#0043A8] shadow-md hover:shadow-lg hover:shadow-blue-600/25 active:scale-95 transition-all"
                >
                  <span>Explore Products Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white border border-slate-200 text-[#041E42] font-bold text-sm hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all shadow-2xs"
                >
                  <span>Inquiry Desk</span>
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-4 text-xs font-bold text-[#0052CC] hover:text-[#0043A8] underline underline-offset-4 transition"
                >
                  Apply for Institutional Account →
                </Link>
              </div>

              {/* Interactive Catalog Quick Search */}
              <HeroQuickSearch />
            </div>

            {/* Right Column: Premium Pharmaceutical Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Image Container with Clinical Frame */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white">
                  <Image
                    src="/assets/alphamed_hero_visual.jpg"
                    alt="Alphamed Cure Pharmaceutical Sourcing & Cold-Chain Logistics"
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover"
                    priority
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041E42]/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Badge 1 (Top Right): Cold-Chain Telemetry — hidden on smallest screens */}
                <div className="hidden sm:flex absolute -top-4 -right-2 sm:-right-4 lg:-right-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-xl items-center gap-3 animate-float max-w-[200px]">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <ThermometerSnowflake className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-[#041E42] uppercase tracking-wider">
                        Validated Cold-Chain
                      </span>
                    </div>
                    <p className="text-xs font-extrabold text-[#0052CC] font-mono mt-0.5">
                      2°C – 8°C (4.2°C)
                    </p>
                  </div>
                </div>

                {/* Floating Badge 2 (Bottom Left): Batch Traceability — hidden on smallest screens */}
                <div
                  className="hidden sm:flex absolute -bottom-4 -left-2 sm:-left-4 lg:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-xl items-center gap-3 animate-float max-w-[200px]"
                  style={{ animationDelay: '1.5s' }}
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <FileCheck2 className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1 text-emerald-700 font-bold text-[10px] uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 inline" />
                      <span>COA Lot Assayed</span>
                    </div>
                    <p className="text-xs font-bold text-[#041E42] mt-0.5">
                      100% Batch Traceability
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & CREDENTIAL STRIP — Refined Institutional Verification */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {trustCredentials.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3.5 ${idx !== 0 ? 'lg:pl-6' : ''} ${idx > 1 ? 'pt-4 lg:pt-0' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100/80 flex items-center justify-center text-[#0052CC] shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#041E42] flex items-center gap-1.5">
                      <span>{item.title}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium leading-snug">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ASYMMETRIC ABOUT SECTION — Editorial Layout with Supply Commitments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xs card-hover">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dedicated Supply Partner</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041E42] tracking-tight">
              A Resilient Procurement Bridge for Clinical Healthcare
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Alphamed Cure links certified pharmaceutical manufacturers, medical device fabricators, and specialized clinical packaging directly to licensed hospitals, diagnostic centers, and compounding pharmacies. We eliminate supply volatility with batch quarantine protocols, rigorous temperature auditing, and dedicated institutional reserves.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#041E42] text-white text-xs sm:text-sm font-bold hover:bg-[#0A2540] active:scale-95 transition-all shadow-xs"
              >
                <span>Read Institutional Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200/80 rounded-2xl p-7 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#041E42] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict Operational Commitments</span>
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                <span>Direct procurement from WHO-GMP inspected manufacturing plants</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                <span>Calibrated digital data logging on all cold-chain biological shipments</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                <span>Lot-specific Certificate of Analysis (COA) included with all batches</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                <span>Emergency 24–48 hour prioritization for acute hospital shortages</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. SERVICES CAPABILITIES SECTION — Professional Vector Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
              Capabilities &amp; Logistics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight mt-1">
              B2B Institutional Supply Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Structured operational programs engineered for hospital purchasing directors and clinical buyers.
            </p>
          </div>
          <Link
            href="/services"
            className="text-xs sm:text-sm font-bold text-[#0052CC] hover:text-[#0043A8] inline-flex items-center gap-1 transition"
          >
            <span>Explore All Capabilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.slice(0, 3).map((service, idx) => {
            const icons = [Building2, ThermometerSnowflake, Layers];
            const Icon = icons[idx] || Activity;
            return (
              <div
                key={service.id}
                className="p-7 bg-white rounded-2xl border border-slate-200/90 card-hover flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3.5">
                  <div className="w-13 h-13 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-[#0052CC] group-hover:scale-110 group-hover:bg-[#0052CC] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#041E42] group-hover:text-[#0052CC] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {service.shortDesc}
                  </p>
                </div>
                <Link
                  href="/services"
                  className="text-xs font-bold text-[#0052CC] hover:text-[#0043A8] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-3 border-t border-slate-100"
                >
                  <span>View Specifications</span>
                  <span>→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. INSTITUTIONAL CONTRACT PRICING POLICY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50 via-white to-emerald-50/40 border border-blue-200/70 rounded-3xl p-6 sm:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0052CC] uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>B2B Healthcare Compliance &amp; Tiered Pricing</span>
            </div>
            <h3 className="text-xl font-bold text-[#041E42]">
              Institutional Contract Pricing &amp; Volume Schedules
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In accordance with national pharmaceutical regulations, wholesale contract rates and bulk tier discounts are reserved for verified healthcare facilities, hospitals, and licensed dispensing pharmacies.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/register"
              className="px-5 py-3 rounded-xl bg-[#0052CC] text-white font-bold text-xs hover:bg-[#0043A8] active:scale-95 transition shadow-xs"
            >
              Verify Your Organization
            </Link>
            <Link
              href="/login"
              className="px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 active:scale-95 transition shadow-2xs"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT CATEGORIES SECTION — Clean Modern Presentation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
              Procurement Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight mt-1">
              Procurement Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Essential medical supplies spanning hospital pharmacy, surgical suites, and intensive care units.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-[#0052CC] hover:text-[#0043A8] transition"
          >
            View Full Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat, idx) => (
            <Link
              key={cat.slug || idx}
              href={`/products?category=${cat.slug}`}
              className="group p-6 bg-white rounded-2xl border border-slate-200/90 card-hover flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-3 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300 inline-block">
                  {cat.icon || '📦'}
                </div>
                <h3 className="text-base font-bold text-[#041E42] group-hover:text-[#0052CC] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {cat.description || 'Certified institutional quality with full batch traceability.'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#0052CC] mt-5 inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                <span>Explore Formulations</span>
                <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. FEATURED PRODUCTS SECTION — Using Redesigned Editorial ProductCard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
              Featured Formulations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight mt-1">
              Critical Care &amp; Clinical Supplies
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Representative hospital medications, sterile consumables, and monitoring devices.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-[#0052CC] hover:text-[#0043A8] transition"
          >
            All Products ({featuredProducts.length || '6+'}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 8. INSTITUTIONAL METRICS STRIP */}
      <section className="bg-[#041E42] text-white py-16 sm:py-20">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Supply Scale &amp; Performance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
              Engineered for Clinical Supply Integrity
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Our operations are built around the strict disciplines demanded by hospital pharmacy audit committees.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statMetrics.map((stat, idx) => (
              <div key={idx} className="border-t border-[#0A284D] pt-6 space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. INTERACTIVE FAQ ACCORDION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
            Procurement FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight">
            Institutional Procurement Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Direct guidance for hospital pharmacy buyers, clinical procurement officers, and licensed distributors.
          </p>
        </div>

        <ProcurementFaq />
      </section>

      {/* 10. CLOSING INQUIRY CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl medical-gradient text-white p-8 sm:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-xl card-hover relative overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3.5 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold backdrop-blur-md">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Direct Institutional Procurement Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Looking for a specific healthcare formulation or medical device?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
              Our clinical procurement desk coordinates with verified pharmaceutical manufacturers to source custom batch formulations, hospital tender volumes, and temperature-controlled biologicals.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0 relative z-10">
            <Link
              href="/contact"
              className="px-7 py-4 rounded-xl bg-white text-[#041E42] font-bold text-xs sm:text-sm hover:bg-slate-100 active:scale-95 transition shadow-md"
            >
              Talk to Our Team
            </Link>
            <Link
              href="/inquiry"
              className="px-7 py-4 rounded-xl bg-blue-700/80 border border-white/25 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 active:scale-95 transition"
            >
              Submit Item Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
