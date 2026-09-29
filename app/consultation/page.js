'use client';

import { useState } from 'react';
import {
  CalendarCheck,
  Building2,
  TrendingUp,
  Package,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { TRANSITION_EASE } from '@/lib/motion';

export default function ConsultationPage() {
  const shouldReduceMotion = useReducedMotion();
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
    { value: 'Healthcare Solutions', label: 'Healthcare Solutions', icon: Layers },
    { value: 'Other', label: 'Other / Custom Scope', icon: CalendarCheck },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 750);
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: TRANSITION_EASE }}
        className="max-w-3xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6"
      >
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-2xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#041E42]">Request Received</h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal">
          Thank you for reaching out, {formData.name}. We&apos;ve received your consultation request regarding {formData.interest}. Our team will review your details and contact you within 1 business day to schedule an introductory discussion.
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="btn-tactile inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0052CC] text-white font-bold hover:bg-[#0043A8] shadow-sm cursor-pointer"
          >
            Return Home
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Info */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold tracking-wide uppercase border border-blue-100">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Discovery Consultation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#041E42] tracking-tight">
              Let&apos;s Discuss Your Operational Needs
            </h1>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Whether you are looking to scale commercial sales, coordinate your product catalog, or implement reliable customer communication, Alphamed Cure is here to support your team.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#041E42]">
              What to expect
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0 font-bold text-sm border border-blue-100">1</div>
                <div>
                  <p className="text-sm font-bold text-[#041E42]">Submit Details</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">Share your business profile, target markets, and primary areas of operational interest.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0 font-bold text-sm border border-blue-100">2</div>
                <div>
                  <p className="text-sm font-bold text-[#041E42]">Discovery Call</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">We schedule a focused 20-minute discussion to map out your commercial bottlenecks.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0 font-bold text-sm border border-blue-100">3</div>
                <div>
                  <p className="text-sm font-bold text-[#041E42]">Tailored Support Plan</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">We propose a structured engagement model covering Sales, Service, or Support execution.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-normal">
              Need immediate assistance?{' '}
              <Link href="/contact" className="font-bold text-[#0052CC] hover:underline">
                Contact our support desk
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/90 shadow-2xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Officer / Representative Name"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0052CC]/15 focus:border-[#0052CC] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Healthcare Entity"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0052CC]/15 focus:border-[#0052CC] outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="officer@company.com"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0052CC]/15 focus:border-[#0052CC] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0052CC]/15 focus:border-[#0052CC] outline-none transition-all"
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
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer active:scale-[0.98] ${
                        isActive 
                          ? 'border-[#0052CC] bg-blue-50/70 shadow-2xs' 
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
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
                Current Operational Context (Optional)
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly describe your products, current challenges, or specific support requirements..."
                className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0052CC]/15 focus:border-[#0052CC] outline-none transition-all leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-tactile group w-full py-4 px-6 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-sm font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.98]"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting Request...</span>
                </>
              ) : (
                <>
                  <span>Request Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-4">
              Your information is held in confidence and used strictly to coordinate your discovery consultation.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
