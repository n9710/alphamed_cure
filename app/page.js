import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/products';
import { getSession } from '@/lib/auth';
import { HeroQuickSearch, ProcurementFaq } from '@/components/HomeInteractive';
import {
  ArrowRight,
  Building2,
  Layers,
  Activity,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Package,
  Headphones,
  CheckCircle2,
  Users,
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
              {/* Business positioning badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-[#041E42] tracking-wide">
                  Sales · Service · Support · Healthcare Solutions
                </span>
              </div>

              {/* Large, Confident Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#041E42] tracking-tight leading-[1.1]">
                Healthcare{' '}
                <span className="text-[#0052CC]">Sales, Service</span>{' '}
                &amp; Support.
              </h1>

              {/* Supporting Copy (18-20px) */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Alphamed Cure is a healthcare business partner providing Sales Management, Product Management, and Customer Support to businesses in the healthcare products space.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#0052CC] text-white font-bold text-sm hover:bg-[#0043A8] shadow-md hover:shadow-lg hover:shadow-blue-600/25 active:scale-95 transition-all"
                >
                  <span>Request a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white border border-slate-200 text-[#041E42] font-bold text-sm hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all shadow-2xs"
                >
                  <span>Explore Products</span>
                </Link>
                <Link
                  href="/services"
                  className="px-3 py-4 text-xs font-bold text-[#0052CC] hover:text-[#0043A8] underline underline-offset-4 transition"
                >
                  Our Services →
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

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. ASYMMETRIC ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xs card-hover">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Healthcare Partner</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041E42] tracking-tight">
              Operational Support for Healthcare Businesses
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Alphamed Cure helps healthcare businesses grow by providing the operational backbone they need. From full-cycle sales management and product coordination to dedicated customer support, we embed ourselves into your processes so you can focus on scale.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#041E42] text-white text-xs sm:text-sm font-bold hover:bg-[#0A2540] active:scale-95 transition-all shadow-xs"
              >
                <span>Read Our Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200/80 rounded-2xl p-7 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#041E42] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0052CC]" />
              <span>How We Support You</span>
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Dedicated sales and lead engagement strategies</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Product portfolio organization and sourcing coordination</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Professional inbound and outbound customer communication</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Scalable business process and administrative support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. SERVICES CAPABILITIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
              Core Offerings
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight mt-1">
              Business Support Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Structured operational programs engineered for healthcare businesses.
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
          {/* We map specific representative services instead of just slicing */}
          {[
            {
              id: 'sales-management',
              title: 'Sales Management',
              shortDesc: 'End-to-end sales coordination for healthcare businesses — from lead engagement to order closure.',
              icon: TrendingUp
            },
            {
              id: 'product-management',
              title: 'Product Management',
              shortDesc: 'Organized management of product portfolios — from listing and documentation to availability tracking.',
              icon: Package
            },
            {
              id: 'customer-communication',
              title: 'Calling & Customer Communication',
              shortDesc: 'Professional outbound calling and inbound communication management for healthcare businesses.',
              icon: Headphones
            }
          ].map((service) => {
            const Icon = service.icon;
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
                  <span>View Details</span>
                  <span>→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CONSULTATION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50 via-white to-emerald-50/40 border border-blue-200/70 rounded-3xl p-6 sm:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0052CC] uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Let&apos;s Build Together</span>
            </div>
            <h3 className="text-xl font-bold text-[#041E42]">
              Ready to structure your business support?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you need sales management, product coordination, or comprehensive customer support, our team is ready to discuss how we can help your healthcare business scale efficiently.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/consultation"
              className="px-5 py-3 rounded-xl bg-[#0052CC] text-white font-bold text-xs hover:bg-[#0043A8] active:scale-95 transition shadow-xs"
            >
              Request a Consultation
            </Link>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 active:scale-95 transition shadow-2xs"
            >
              Contact Us
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

      {/* 8. BRAND POSITIONING STRIP */}
      <section className="bg-[#041E42] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                A Business Partner, Not Just a Product Seller.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Alphamed Cure partners with healthcare businesses to provide the sales, service, and support infrastructure they need to grow. We handle the work that keeps your business running.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs font-bold active:scale-95 transition shadow-sm"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border-t border-[#0A284D] pt-6 space-y-2">
                <p className="text-sm font-bold text-white">Sales</p>
                <p className="text-xs text-slate-400">Sales management, lead support, and business development.</p>
              </div>
              <div className="border-t border-[#0A284D] pt-6 space-y-2">
                <p className="text-sm font-bold text-white">Service</p>
                <p className="text-xs text-slate-400">Product management, sourcing, and order coordination.</p>
              </div>
              <div className="border-t border-[#0A284D] pt-6 space-y-2">
                <p className="text-sm font-bold text-white">Support</p>
                <p className="text-xs text-slate-400">Customer communication, service, and business process support.</p>
              </div>
            </div>
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
              href="/consultation"
              className="px-7 py-4 rounded-xl bg-white text-[#041E42] font-bold text-xs sm:text-sm hover:bg-slate-100 active:scale-95 transition shadow-md"
            >
              Request a Consultation
            </Link>
            <Link
              href="/products"
              className="px-7 py-4 rounded-xl bg-blue-700/80 border border-white/25 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 active:scale-95 transition"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
