import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function AdminProductsPage() {
  let products = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: { select: { name: true } },
        price: true,
      },
    });
  } catch (err) {
    console.warn('Admin products error:', err.message);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Product Catalog Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review live products, wholesale contract price schedules, and formulation specifications.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-left">
              <tr>
                <th className="px-5 py-3">Product / SKU</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Price (INR)</th>
                <th className="px-5 py-3">Price (USD)</th>
                <th className="px-5 py-3">MOQ</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-slate-900">{p.name}</p>
                    <p className="text-[11px] font-mono text-slate-400">{p.sku || 'No SKU'}</p>
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {p.category?.name || 'Uncategorized'}
                  </td>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {p.price ? `₹${Number(p.price.priceINR).toFixed(2)}` : '—'}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {p.price?.priceUSD ? `$${Number(p.price.priceUSD).toFixed(2)}` : '—'}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {p.price ? `${p.price.minOrderQty} ${p.price.unit}` : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        p.isActive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {p.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
