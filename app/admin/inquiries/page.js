import prisma from '@/lib/prisma';

export default async function AdminInquiriesPage() {
  let inquiries = [];
  try {
    inquiries = await prisma.inquiryCart.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  } catch (err) {
    console.warn('Admin inquiries error:', err.message);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Institutional RFQs & Supply Inquiries
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review and respond to hospital procurement requests and batch inquiries.
        </p>
      </div>

      <div className="space-y-4">
        {inquiries.length > 0 ? (
          inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-sky-700">
                    INQUIRY #{inq.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400 ml-2">
                    Received {new Date(inq.createdAt).toLocaleString()}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase bg-sky-50 text-sky-700 border border-sky-200">
                  {inq.status}
                </span>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="text-slate-400">Organization</p>
                  <p className="font-semibold text-slate-900">
                    {inq.user?.company || 'Direct Entity'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Procurement Contact</p>
                  <p className="font-semibold text-slate-900">
                    {inq.user?.firstName} {inq.user?.lastName} ({inq.user?.email})
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Phone</p>
                  <p className="font-semibold text-slate-900">{inq.user?.phone || 'N/A'}</p>
                </div>
              </div>

              {inq.notes && (
                <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100">
                  <strong>Logistics / Batch Notes:</strong> {inq.notes}
                </div>
              )}

              {/* Line items table */}
              <div className="border border-slate-100 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                  <thead className="bg-slate-50 text-slate-500 text-left font-semibold">
                    <tr>
                      <th className="px-4 py-2">Requested Item</th>
                      <th className="px-4 py-2 text-center">Quantity</th>
                      <th className="px-4 py-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {inq.items.map((it) => (
                      <tr key={it.id}>
                        <td className="px-4 py-2 font-medium text-slate-800">
                          {it.product?.name || `Product ID: ${it.productId}`}
                        </td>
                        <td className="px-4 py-2 text-center font-semibold text-slate-900">
                          {it.quantity}
                        </td>
                        <td className="px-4 py-2 text-slate-500">{it.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
            No institutional inquiries logged in the database yet.
          </div>
        )}
      </div>
    </div>
  );
}
