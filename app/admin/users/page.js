import prisma from '@/lib/prisma';

export default async function AdminUsersPage() {
  let users = [];
  try {
    users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        company: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  } catch (err) {
    console.warn('Admin users error:', err.message);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Healthcare Facility Verification Queue
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review credentials of registered clinics, hospitals, and distributors to grant wholesale pricing access.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-left">
              <tr>
                <th className="px-5 py-3">Facility / Contact</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Verification Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-slate-900">{u.company || 'Direct Entity'}</p>
                    <p className="text-[11px] text-slate-400">
                      {u.firstName} {u.lastName}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{u.email}</td>
                  <td className="px-5 py-3 text-slate-600">{u.phone || 'N/A'}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase bg-slate-100 text-slate-700">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        u.status === 'verified'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : u.status === 'suspended'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {u.role !== 'admin' && (
                      <form action="/api/admin/users" method="POST" className="flex items-center gap-2">
                        <input type="hidden" name="userId" value={u.id} />
                        <input
                          type="hidden"
                          name="status"
                          value={u.status === 'verified' ? 'unverified' : 'verified'}
                        />
                        <button
                          type="submit"
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                            u.status === 'verified'
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {u.status === 'verified' ? 'Revoke' : 'Approve Partner'}
                        </button>
                      </form>
                    )}
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
