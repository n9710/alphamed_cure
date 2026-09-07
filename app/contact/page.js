'use client';

import { useState } from 'react';
import {
  PhoneCall,
  Mail,
  Building2,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Institutional Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041E42] tracking-tight">
          Contact Procurement &amp; Support
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Connect directly with our healthcare account specialists for quotation requests, recurring supply contracts, regulatory documentation, or technical product inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#041E42]">
              Submit an Institutional Inquiry
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              All requests are handled by dedicated medical supply coordinators.
            </p>
          </div>

          {success && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Your message has been routed to our corporate sales and compliance desk. A specialist will reply within 2 business hours.</span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Dr. / Officer Name"
                  className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Official Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="officer@hospital.org"
                  className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] focus:outline-hidden transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Hospital / Entity Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Apex Multi-Speciality Clinic"
                  className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] focus:outline-hidden transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Subject / Tender Reference
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Institutional Contract Quote for IV Antibiotics"
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] focus:outline-hidden transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Message / RFQ Details
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Specify formulations, quantities, delivery destination, packaging specifications, or tender deadlines..."
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] focus:outline-hidden transition leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs sm:text-sm font-bold active:scale-95 transition disabled:opacity-50 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Dispatching Message...' : 'Send Message to Procurement Desk'}</span>
            </button>
          </form>
        </div>

        {/* Corporate Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-[#041E42] uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0052CC]" />
              <span>Corporate Headquarters</span>
            </h3>
            <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
              <p className="font-bold text-[#041E42]">Alphamed Cure Private Limited</p>
              <p>Industrial Distribution Hub, Phase II, New Delhi, India</p>
              <p className="font-mono text-xs text-slate-500">National Drug Distribution License: DL-DL-2024-99881</p>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-[#041E42] uppercase tracking-wider flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#0052CC]" />
              <span>Direct Communication Lines</span>
            </h3>
            <div className="text-xs sm:text-sm space-y-3.5 text-slate-600">
              <div>
                <p className="font-bold text-[#041E42]">Hospital Procurement Hotline</p>
                <p className="text-[#0052CC] font-mono text-base font-extrabold mt-0.5">+91 98765 43210</p>
                <p className="text-[11px] text-slate-400">Available Mon–Sat: 09:00 - 19:00 IST</p>
              </div>
              <div className="pt-2.5 border-t border-slate-100">
                <p className="font-bold text-[#041E42]">Tenders &amp; Institutional Orders</p>
                <p className="text-[#0052CC] font-mono mt-0.5">procurement@alphamedcure.com</p>
              </div>
              <div className="pt-2.5 border-t border-slate-100">
                <p className="font-bold text-[#041E42]">Quality &amp; Regulatory Affairs</p>
                <p className="text-[#0052CC] font-mono mt-0.5">compliance@alphamedcure.com</p>
              </div>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#041E42] text-white space-y-2.5 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Emergency ICU Dispatch</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              For immediate critical drug shortages or emergency surgical inventory replenishment, accredited hospital pharmacy chiefs can access 24/7 prioritized dispatch routing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
