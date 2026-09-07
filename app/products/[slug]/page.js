import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { getSession } from '@/lib/auth';
import ProductDetailInteractive from '@/components/ProductDetailInteractive';
import {
  ChevronRight,
  ShieldCheck,
  ThermometerSnowflake,
  FileCheck2,
  Clock,
  Pill,
  Stethoscope,
  Activity,
  Package,
  FlaskConical,
  Tag,
  Shield,
} from 'lucide-react';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return { title: 'Product Not Found | Alphamed Cure' };
  }

  return {
    title: `${product.seoTitle || product.name} | Alphamed Cure`,
    description:
      product.seoDescription ||
      product.shortDesc ||
      `Procure ${product.name} with certified hospital batch traceability from Alphamed Cure.`,
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const session = await getSession();
  const user = session?.user;

  const product = await getProductBySlug(resolvedParams.slug, user);

  if (!product) {
    notFound();
  }

  const getCategoryIconComponent = (categorySlug) => {
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

  const CategoryIcon = getCategoryIconComponent(product.category?.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku || undefined,
    description: product.shortDesc || product.description,
    category: product.category?.name,
    offers:
      product.canSeePrices && product.price
        ? {
            '@type': 'Offer',
            price: product.price.priceINR,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          }
        : undefined,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Clean Breadcrumbs Navigation */}
      <nav
        className="flex items-center space-x-2 text-xs font-medium text-slate-500 overflow-x-auto no-scrollbar pb-1"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-[#0052CC] transition shrink-0">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
        <Link href="/products" className="hover:text-[#0052CC] transition shrink-0">
          Catalog
        </Link>
        {product.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            <Link
              href={`/products?category=${product.category.slug}`}
              className="hover:text-[#0052CC] transition shrink-0"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
        <span className="text-[#041E42] font-bold truncate max-w-xs shrink-0">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Product Visual Showcase */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="aspect-square bg-gradient-to-b from-slate-50/80 via-white to-blue-50/20 rounded-3xl border border-slate-200/90 flex flex-col items-center justify-center p-8 shadow-xs relative overflow-hidden group">
            <div className="relative z-10 w-36 h-36 rounded-3xl bg-white shadow-md border border-slate-200/80 flex items-center justify-center text-[#0052CC] group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
              <CategoryIcon className="w-20 h-20 stroke-[1.5]" />
            </div>

            <div className="absolute top-4 left-4">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#041E42] text-white shadow-2xs">
                Hospital Grade
              </span>
            </div>

            <div className="absolute bottom-4 inset-x-4 text-center">
              <span className="text-[11px] text-slate-400 font-mono font-medium">
                Official Formulation Spec • Monograph IP/USP
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-600 space-y-3.5 shadow-2xs">
            <p className="font-bold text-[#041E42] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Assurance &amp; Handling Protocols:</span>
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <ThermometerSnowflake className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                <span>Validated cold-chain (2°C–8°C) &amp; ambient packaging</span>
              </div>
              <div className="flex items-start gap-2.5">
                <FileCheck2 className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                <span>Lot-specific Certificate of Analysis (COA) included</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                <span>Guaranteed remaining shelf life &gt; 80% on dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Detail & Inquiry Component */}
        <div className="lg:col-span-7">
          <ProductDetailInteractive product={product} />
        </div>
      </div>
    </div>
  );
}
