'use client';

import { useState } from 'react';
import {
  CalendarCheck,
  Building2,
  TrendingUp,
  Package,
  Headphones,
  Send,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: 'Sales Management',
    message: '',
  });

  const [status, setStatus] = useState('idle');

  const interests = [
    { value: 'Sales Management', label: 'Sales Management', icon: TrendingUp },
    { value: 'Product Management', label: 'Product Coordination', icon: Package },
    { value: 'Customer Support', label: 'Customer Support', icon: Headphones },
    { value: 'Comprehensive', label: 'Comprehensive Support', icon: Building2 },
    { value: 'Other', label: 'Other / Not Sure', icon: CalendarCheck },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1000);
  };

  if (status === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#041E42]">Request Received</h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Thank you for reaching out, {formData.name}. We&apos;ve received your consultation request regarding {formData.interest}. Our team will review your details and contact you within 1 business day to schedule a call.
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0052CC] text-white font-bold hover:bg-[#0043A8] transition shadow-sm"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Info */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold tracking-wide uppercase">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Free Consultation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#041E42] tracking-tight">
              Let&apos;s Discuss Your Business Needs
            </h1>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Whether you are looking to scale your sales, organize your product catalog, or implement professional customer support, Alphamed Cure is here to help.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#041E42]">
              What to expect
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0 font-bold text-sm">1</div>
                <div>
                  <p className="text-sm font-bold text-[#041E42]">Submit Your Request</p>
                  <p className="text-xs text-slate-500 mt-0.5">Fill out the form with your basic business details and areas of interest.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0 font-bold text-sm">2</div>
                <div>
                  <p className="text-sm font-bold text-[#041E42]">Discovery Call</p>
                  <p className="text-xs text-slate-500 mt-0.5">We&apos;ll schedule a brief 15-20 minute call to understand your current operations.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0 font-bold text-sm">3</div>
                <div>
                  <p className="text-sm font-bold text-[#041E42]">Proposal & Structure</p>
                  <p className="text-xs text-slate-500 mt-0.5">We present a tailored support structure outlining how we can handle the work.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Need immediate assistance?{' '}
              <Link href="/contact" className="font-bold text-[#0052CC] hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  placeholder="John Doe"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] outline-hidden transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Healthcare Business"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] outline-hidden transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] outline-hidden transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] outline-hidden transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-3">
                Primary Area of Interest
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interests.map((option) => {
                  const Icon = option.icon;
                  const isActive = formData.interest === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, interest: option.value }))}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                        isActive 
                          ? 'border-[#0052CC] bg-blue-50/50 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#0052CC] text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-sm font-bold ${isActive ? 'text-[#041E42]' : 'text-slate-600'}`}>
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tell us about your current operations (Optional)
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="What challenges are you facing with sales, product management, or support?"
                className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-[#0052CC] outline-hidden transition leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 px-6 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-sm font-bold active:scale-95 transition disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Request Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-4">
              Your information is secure and will only be used to contact you regarding our services.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
