import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Pill, ClipboardList, ShieldAlert, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default async function AdminDashboardPage() {
  let productCount = 0;
  let inquiryCount = 0;
  let pendingVerifications = 0;
  let unreadMessages = 0;
  let recentInquiries = [];

  try {
    const [pCount, iCount, vCount, mCount, recents] = await Promise.all([
      prisma.product.count(),
      prisma.inquiryCart.count(),
      prisma.user.count({ where: { status: 'unverified', role: 'customer' } }),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.inquiryCart.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { firstName: true, lastName: true, company: true, email: true },
          },
          items: {
            include: {
              product: { select: { name: true } },
            },
          },
        },
      }),
    ]);
    productCount = pCount;
    inquiryCount = iCount;
    pendingVerifications = vCount;
    unreadMessages = mCount;
    recentInquiries = recents;
  } catch (err) {
    console.warn('Admin dashboard DB query error:', err.message);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Executive Operations & Procurement Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor incoming institutional RFQs, pending healthcare partner approvals, and catalog inventory status.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Formulations</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{productCount}</span>
            <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">Catalog Active</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Inquiries Logged</span>
            <div className="w-8 h-8 rounded-lg bg-navy-50 text-navy-600 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{inquiryCount}</span>
            <Link href="/admin/inquiries" className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
              <span>View RFQs</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Partners</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-amber-600">{pendingVerifications}</span>
            <Link href="/admin/users" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
              <span>Review</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Unread Messages</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-600">{unreadMessages}</span>
            <Link href="/admin/messages" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <span>Inbox</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200/80 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-900">
            Recent Institutional Inquiries
          </h2>
          <Link
            href="/admin/inquiries"
            className="text-xs font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
          >
            <span>All Inquiries</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200/80 text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-left">
              <tr>
                <th className="px-5 py-3.5">Inquiry ID</th>
                <th className="px-5 py-3.5">Organization</th>
                <th className="px-5 py-3.5">Formulations</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Received At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5 font-mono font-bold text-slate-900">
                      #{inq.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-slate-800">
                        {inq.user?.company || `${inq.user?.firstName || ''} ${inq.user?.lastName || ''}`}
                      </p>
                      <p className="text-[11px] text-slate-400">{inq.user?.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      <span className="font-medium">{inq.items?.length || 0} formulation(s)</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200/60">
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 font-medium">
                      {new Date(inq.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-slate-400 font-medium">
                    No institutional inquiries recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
