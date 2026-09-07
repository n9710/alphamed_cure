import prisma from '@/lib/prisma';

export default async function AdminMessagesPage() {
  let messages = [];
  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    console.warn('Admin messages error:', err.message);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Institutional Contact & RFQ Messages
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Direct messages and communication dispatched from the public contact and inquiry desk.
        </p>
      </div>

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-900">{msg.subject}</h3>
                  <p className="text-xs text-slate-500">
                    From: <strong className="text-slate-700">{msg.name}</strong> ({msg.email})
                    {msg.company && ` • ${msg.company}`}
                    {msg.phone && ` • Tel: ${msg.phone}`}
                  </p>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                {msg.message}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
            No contact messages received yet.
          </div>
        )}
      </div>
    </div>
  );
}
