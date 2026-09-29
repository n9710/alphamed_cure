'use client';

import { useState } from 'react';
import {
  PhoneCall,
  Mail,
  Building2,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wide border border-blue-100">
          <Mail className="w-3.5 h-3.5" />
          <span>Direct Communication</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041E42] tracking-tight">
          Contact Desk
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Connect directly with Alphamed Cure for operational support, product inquiries, or commercial partnership discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#041E42]">
              Send Us a Message
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Our support team will review and reply within 1 business day.
            </p>
          </div>

          {success && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Your message has been received. We will respond within 1 business day.</span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
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
                  className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#0052CC] focus:outline-hidden transition font-normal"
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
                  placeholder="officer@organization.org"
                  className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#0052CC] focus:outline-hidden transition font-normal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Healthcare Facility / Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Organization Name"
                  className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#0052CC] focus:outline-hidden transition font-normal"
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
                  className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#0052CC] focus:outline-hidden transition font-normal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g., Sales Management / Sourcing Inquiry"
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#0052CC] focus:outline-hidden transition font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Message Details
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Provide details regarding your operational requirements, inquiry specs, or partnership scope..."
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#0052CC] focus:outline-hidden transition leading-relaxed font-normal"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs sm:text-sm font-bold transition disabled:opacity-50 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

        {/* Corporate Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-[#041E42] uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0052CC]" />
              <span>Corporate Presence</span>
            </h3>
            <div className="text-xs sm:text-sm text-slate-600 space-y-1.5 leading-relaxed font-normal">
              <p className="font-bold text-[#041E42]">Alphamed Cure</p>
              <p>Healthcare Business Partner &amp; Operations Support</p>
              <p className="text-slate-400 text-xs">[Address available upon verification]</p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-[#041E42] uppercase tracking-wider flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#0052CC]" />
              <span>Direct Electronic Mail</span>
            </h3>
            <div className="text-xs sm:text-sm space-y-2 text-slate-600 font-normal">
              <div>
                <p className="font-bold text-[#041E42]">Inquiries &amp; Support</p>
                <p className="text-[#0052CC] font-mono mt-0.5">
                  <a href="mailto:info@alphamedcure.com" className="hover:underline">info@alphamedcure.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-[#041E42] text-white space-y-3 shadow-xs border border-[#0052CC]/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Need Structured Support?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              If your organization requires dedicated sales management, product sourcing, or customer service coordination, request a discovery consultation.
            </p>
            <div className="pt-2">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0043A8] px-4 py-2.5 rounded-xl transition shadow-xs"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
