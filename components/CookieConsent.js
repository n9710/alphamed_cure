'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('alphamed_cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (level) => {
    localStorage.setItem('alphamed_cookie_consent', level);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie and telemetry consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#041E42]/95 backdrop-blur-md text-white p-5 rounded-3xl border border-[#0A284D] shadow-2xl space-y-3.5"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Institutional Privacy &amp; Cookies
          </h2>
          <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
            We use secure cookies for institutional session authentication and aggregated telemetry to optimize hospital pharmaceutical logistics.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2.5 pt-1">
        <button
          type="button"
          onClick={() => handleConsent('essential')}
          className="px-3.5 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 transition cursor-pointer"
        >
          Essential Only
        </button>
        <button
          type="button"
          onClick={() => handleConsent('all')}
          className="px-4 py-1.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-[11px] font-bold text-white transition shadow-xs cursor-pointer"
        >
          Accept All
        </button>
      </div>
    </aside>
  );
}
