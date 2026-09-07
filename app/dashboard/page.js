import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  Package, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Plus
} from 'lucide-react';

export const metadata = {
  title: 'Client Partner Dashboard | AlphaMed Cure',
};

export default async function DashboardPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect('/login?redirect=/dashboard');
  }

  // Fetch user's previous inquiries
  let inquiries = [];
  try {
    inquiries = await prisma.inquiryCart.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: {
              select: { name: true, sku: true, dosageForm: true, strength: true },
            },
          },
        },
      },
    });
  } catch (err) {
    console.warn('Dashboard query error:', err.message);
  }

  const isVerified = user.status === 'verified';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-[11px] font-semibold">
            <Building2 className="w-3.5 h-3.5 text-medical-600" />
            <span>INSTITUTIONAL CLIENT DESK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {user.firstName || 'Partner'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {user.company ? <strong className="text-slate-800 font-semibold">{user.company}</strong> : user.email} • Assigned ID: <span className="font-mono text-slate-600">CLI-{user.id?.slice(0, 6).toUpperCase()}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Browse Catalog</span>
          </Link>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Inquiry Cart</span>
          </Link>
        </div>
      </div>

      {/* Verification Status Banner */}
      {isVerified ? (
        <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 flex items-start gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Verified Healthcare Partner Account
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-200/60 text-emerald-800">
                Active Tier 1
              </span>
            </div>
            <p className="text-xs text-emerald-800/90 leading-relaxed max-w-3xl">
              Your facility credentials and drug distribution documentation have been authenticated. You have unlocked contracted institutional wholesale pricing, temperature-controlled dispatch prioritization, and direct batch allocation requests.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Institutional Verification In Progress
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-200/60 text-amber-800">
                Under Review
              </span>
            </div>
            <p className="text-xs text-amber-800/90 leading-relaxed max-w-3xl">
              Your partner registration is undergoing routine validation by our medical regulatory compliance team. You can continue configuring inquiry inquiries and Request For Quotes (RFQs), which will be quoted directly by your assigned institutional account manager.
            </p>
          </div>
        </div>
      )}

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Inquiries</span>
          <div className="text-2xl font-extrabold text-slate-900">{inquiries.length}</div>
          <p className="text-[11px] text-slate-500">RFQ submissions logged</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Account Authorization</span>
          <div className="text-2xl font-extrabold text-slate-900">{isVerified ? 'Accredited' : 'Pending'}</div>
          <p className="text-[11px] text-slate-500">Regulatory documentation status</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Logistics Channel</span>
          <div className="text-2xl font-extrabold text-slate-900">Direct Cold-Chain</div>
          <p className="text-[11px] text-slate-500">Validated 2°C – 8°C & Ambient</p>
        </div>
      </div>

      {/* Inquiries History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Institutional Inquiries & RFQs
            </h2>
            <p className="text-xs text-slate-500">
              Detailed history of batch inquiries, formulation quotations, and requested quantities.
            </p>
          </div>
          {inquiries.length > 0 && (
            <Link
              href="/inquiry"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>Submit New RFQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {inquiries.length > 0 ? (
          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-slate-300 transition space-y-4"
              >
                <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-900 px-2.5 py-1 rounded-lg bg-slate-100">
                      #{inq.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500">
                      Dispatched on {new Date(inq.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200/60">
                    {inq.status || 'Pending Quotation'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Requested Formulations ({inq.items?.length || 0}):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {inq.items.map((it) => (
                      <div key={it.id} className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-900">
                            {it.product?.name || `Product ID: ${it.productId}`}
                          </div>
                          {it.product?.sku && (
                            <div className="text-[10px] font-mono text-slate-500">
                              SKU: {it.product.sku}
                            </div>
                          )}
                          {it.notes && (
                            <div className="text-[11px] text-slate-500 italic">
                              &ldquo;{it.notes}&rdquo;
                            </div>
                          )}
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-bold text-xs text-slate-800 shrink-0">
                          {it.quantity} units
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Package className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">No Inquiries Logged Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore our catalog of certified pharmaceuticals, oncology therapeutics, and surgical supplies to generate your first institutional RFQ.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
              >
                <span>Browse Product Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
