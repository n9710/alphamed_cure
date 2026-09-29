import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/products';
import { getSession } from '@/lib/auth';
import {
  HeroChoreography,
  MotionReveal,
  HeroQuickSearch,
  ProcurementFaq,
} from '@/components/HomeInteractive';
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
  Pill,
  Stethoscope,
  FlaskConical,
  Tag,
  Shield,
} from 'lucide-react';

const getCategoryIcon = (categorySlug) => {
  const slug = (categorySlug || '').toLowerCase();
  if (slug.includes('pharma')) return Pill;
  if (slug.includes('med')) return Stethoscope;
  if (slug.includes('dme')) return Activity;
  if (slug.includes('supp')) return Package;
  if (slug.includes('vial')) return FlaskConical;
  if (slug.includes('label')) return Tag;
  if (slug.includes('ppe')) return Shield;
  return Package;
};

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

  const heroLeftItems = [
    // 1. Business positioning badge
    <div key="badge" className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
      <span className="text-xs font-bold text-[#041E42] tracking-wide">
        Sales · Service · Support · Healthcare Solutions
      </span>
    </div>,

    // 2. Large, Confident Headline
    <h1 key="headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#041E42] tracking-tight leading-[1.08]">
      Healthcare{' '}
      <span className="text-[#0052CC]">Sales, Service</span>{' '}
      &amp; Support.
    </h1>,

    // 3. Supporting Copy
    <p key="copy" className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
      Alphamed Cure is a healthcare business partner providing Sales Management, Product Management, and Customer Support to businesses in the healthcare products space.
    </p>,

    // 4. Interactive CTAs
    <div key="ctas" className="flex flex-wrap items-center gap-3.5 pt-2">
      <Link
        href="/consultation"
        className="btn-tactile group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0052CC] text-white font-bold text-sm hover:bg-[#0043A8] shadow-xs cursor-pointer"
      >
        <span>Request a Consultation</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
      </Link>
      <Link
        href="/products"
        className="btn-tactile group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-[#041E42] font-bold text-sm hover:bg-slate-50 hover:border-slate-300 shadow-2xs cursor-pointer"
      >
        <span>Explore Products</span>
      </Link>
      <Link
        href="/services"
        className="px-3 py-3.5 text-xs font-bold text-[#0052CC] hover:text-[#0043A8] underline underline-offset-4 transition-colors"
      >
        Our Services →
      </Link>
    </div>,

    // 5. Interactive Catalog Quick Search
    <HeroQuickSearch key="search" />,
  ];

  const heroVisual = (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
        <Image
          src="/assets/alphamed_hero_visual.jpg"
          alt="Alphamed Cure Pharmaceutical Sourcing & Logistics"
          fill
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041E42]/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 sm:pb-20">
      {/* 1. HERO SECTION WITH ENTRANCE CHOREOGRAPHY */}
      <section className="relative overflow-hidden bg-[#FAFCFE] pt-10 sm:pt-14 pb-14 sm:pb-20 border-b border-slate-200">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroChoreography leftContent={heroLeftItems} rightVisual={heroVisual} />
        </div>
      </section>

      {/* 2. THE FOUR PILLARS ARCHITECTURAL STRIP */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-xl border border-slate-200 card-hover shadow-2xs space-y-2 group cursor-default">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0052CC] group-hover:scale-105 transition-transform duration-200">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-[#041E42] group-hover:text-[#0052CC] transition-colors">Sales</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Lead engagement, market coordination, and structured sales closure routines.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 card-hover shadow-2xs space-y-2 group cursor-default">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform duration-200">
                <Package className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-[#041E42] group-hover:text-emerald-700 transition-colors">Service</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Product catalog administration, supplier matching, and availability tracking.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 card-hover shadow-2xs space-y-2 group cursor-default">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 group-hover:scale-105 transition-transform duration-200">
                <Headphones className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-[#041E42] group-hover:text-indigo-700 transition-colors">Support</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Dedicated communication, inquiries handling, and business continuity workflows.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 card-hover shadow-2xs space-y-2 group cursor-default">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[#041E42] group-hover:scale-105 transition-transform duration-200">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-[#041E42]">Healthcare Solutions</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Embedded operational backbone supporting healthcare product company scale.
              </p>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 3. ASYMMETRIC ABOUT SECTION */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xs">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold tracking-wide uppercase border border-blue-100/60">
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
                  className="btn-tactile group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#041E42] text-white text-xs sm:text-sm font-bold hover:bg-[#0A2540] shadow-xs cursor-pointer"
                >
                  <span>Read Our Profile</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
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
      </MotionReveal>

      {/* 4. SERVICES CAPABILITIES SECTION */}
      <MotionReveal>
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
              className="text-xs sm:text-sm font-bold text-[#0052CC] hover:text-[#0043A8] inline-flex items-center gap-1 group transition-colors"
            >
              <span>Explore All Capabilities</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="p-6 bg-white rounded-xl border border-slate-200 card-hover flex flex-col justify-between space-y-5 group shadow-2xs hover:border-slate-300"
                >
                  <div className="space-y-3.5">
                    <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0052CC] group-hover:border-[#0052CC]/50 group-hover:bg-blue-100/60 transition-all duration-200">
                      <Icon className="w-5 h-5 group-hover:scale-105 transition-transform duration-200" />
                    </div>
                    <h3 className="text-base font-bold text-[#041E42] group-hover:text-[#0052CC] transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                      {service.shortDesc}
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="text-xs font-bold text-[#0052CC] hover:text-[#0043A8] inline-flex items-center gap-1.5 pt-3 border-t border-slate-100 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </MotionReveal>

      {/* 5. CONSULTATION STRIP */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0052CC] uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-[#0052CC]" />
                <span>Let&apos;s Build Together</span>
              </div>
              <h3 className="text-xl font-bold text-[#041E42]">
                Ready to structure your business support?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Whether you need sales management, product coordination, or comprehensive customer support, our team is ready to discuss how we can help your healthcare business scale efficiently.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <Link
                href="/consultation"
                className="btn-tactile group inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#0052CC] text-white font-bold text-xs hover:bg-[#0043A8] shadow-xs cursor-pointer"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
              <Link
                href="/contact"
                className="btn-tactile px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 shadow-2xs cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 6. PRODUCT CATEGORIES SECTION — Professional Vector Emblems */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                Procurement Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight mt-1">
                Procurement Categories
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
                Essential medical supplies spanning hospital pharmacy, surgical suites, and intensive care units.
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-bold text-[#0052CC] hover:text-[#0043A8] inline-flex items-center gap-1 group transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {categories.map((cat, idx) => {
              const CatIcon = getCategoryIcon(cat.slug);
              return (
                <Link
                  key={cat.slug || idx}
                  href={`/products?category=${cat.slug}`}
                  className="group p-5 bg-white rounded-xl border border-slate-200 card-hover flex flex-col justify-between shadow-2xs hover:border-[#0052CC]/40"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0052CC] mb-3 group-hover:border-[#0052CC]/50 group-hover:bg-blue-100/60 transition-all duration-200">
                      <CatIcon className="w-5 h-5 stroke-[1.75] group-hover:scale-105 transition-transform duration-200" />
                    </div>
                    <h3 className="text-sm font-bold text-[#041E42] group-hover:text-[#0052CC] transition-colors duration-200">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
                      {cat.description || 'Certified institutional quality with full batch traceability.'}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#0052CC] mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                    <span>Explore Items</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </MotionReveal>

      {/* 7. FEATURED PRODUCTS SECTION */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                Featured Formulations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight mt-1">
                Critical Care &amp; Clinical Supplies
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
                Representative hospital medications, sterile consumables, and monitoring devices.
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-bold text-[#0052CC] hover:text-[#0043A8] inline-flex items-center gap-1 group transition-colors"
            >
              <span>All Products ({featuredProducts.length || '6+'})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </MotionReveal>

      {/* 8. BRAND POSITIONING STRIP */}
      <section className="bg-[#041E42] text-white py-14 sm:py-18 border-y border-[#0A284D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                What We Do
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                A Business Partner, Not Just a Product Seller.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Alphamed Cure partners with healthcare businesses to provide the sales, service, and support infrastructure they need to grow. We handle the operational work that keeps your business running.
              </p>
              <Link
                href="/consultation"
                className="btn-tactile group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border-t border-[#0A284D] pt-5 space-y-1.5">
                <p className="text-sm font-bold text-white">Sales</p>
                <p className="text-xs text-slate-400 font-normal">Sales management, lead support, and business development.</p>
              </div>
              <div className="border-t border-[#0A284D] pt-5 space-y-1.5">
                <p className="text-sm font-bold text-white">Service</p>
                <p className="text-xs text-slate-400 font-normal">Product management, sourcing, and order coordination.</p>
              </div>
              <div className="border-t border-[#0A284D] pt-5 space-y-1.5">
                <p className="text-sm font-bold text-white">Support</p>
                <p className="text-xs text-slate-400 font-normal">Customer communication, service, and business process support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. INTERACTIVE FAQ ACCORDION SECTION */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
              Procurement FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight">
              Institutional Procurement Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Direct guidance for hospital pharmacy buyers, clinical procurement officers, and licensed distributors.
            </p>
          </div>

          <ProcurementFaq />
        </section>
      </MotionReveal>

      {/* 10. CLOSING INQUIRY CTA BANNER */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#041E42] border border-[#0A284D] text-white p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-sm relative overflow-hidden">
            <div className="space-y-3 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-bold border border-white/10">
                <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                <span>Direct Institutional Procurement Desk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Looking for a specific healthcare formulation or medical device?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Our clinical procurement desk coordinates with verified pharmaceutical manufacturers to source custom batch formulations, hospital tender volumes, and temperature-controlled biologicals.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0 relative z-10">
              <Link
                href="/consultation"
                className="btn-tactile px-6 py-3.5 rounded-xl bg-white text-[#041E42] font-bold text-xs sm:text-sm hover:bg-slate-100 shadow-xs cursor-pointer"
              >
                Request a Consultation
              </Link>
              <Link
                href="/products"
                className="btn-tactile px-6 py-3.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </section>
      </MotionReveal>
    </div>
  );
}
