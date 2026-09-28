import Link from 'next/link';
import { SERVICES, SERVICE_PILLARS, getServicesByPillar } from '@/data/services';
import {
  TrendingUp,
  Package,
  Headphones,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';

export const metadata = {
  title: 'Our Services | Alphamed Cure',
  description:
    'Alphamed Cure provides Sales, Service, and Support to healthcare businesses. Explore our capabilities across sales management, product management, and customer support.',
};

const PILLAR_CONFIG = {
  Sales: {
    icon: TrendingUp,
    color: 'blue',
    description: 'We manage the full sales cycle — from lead engagement to order closure.',
  },
  Service: {
    icon: Package,
    color: 'emerald',
    description: 'We handle product management, sourcing coordination, and order management.',
  },
  Support: {
    icon: Headphones,
    color: 'indigo',
    description: 'From customer communication to business process support, we keep operations running.',
  },
};

const COLOR_MAP = {
  blue: {
    badge: 'bg-blue-50 text-[#0052CC] border border-blue-100',
    icon: 'bg-blue-50 text-[#0052CC] border-blue-100/80',
    pillarBg: 'bg-blue-50/60',
    pillarBorder: 'border-blue-200/50',
  },
  emerald: {
    badge: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    icon: 'bg-emerald-50 text-emerald-600 border-emerald-100/80',
    pillarBg: 'bg-emerald-50/60',
    pillarBorder: 'border-emerald-200/50',
  },
  indigo: {
    badge: 'bg-indigo-50 text-indigo-800 border border-indigo-200',
    icon: 'bg-indigo-50 text-indigo-600 border-indigo-100/80',
    pillarBg: 'bg-indigo-50/60',
    pillarBorder: 'border-indigo-200/50',
  },
};

export default function ServicesPage() {
  const byPillar = getServicesByPillar();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F0F7FF] via-[#FAFCFE] to-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-[#0052CC] text-xs font-bold shadow-2xs">
            <span>What We Do</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#041E42] max-w-3xl">
            Sales. Service. Support.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
            Alphamed Cure provides structured business support to healthcare product companies. We work as an extension of your team — managing sales, coordinating products, and delivering customer support.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white text-sm font-bold transition shadow-sm"
            >
              <span>Request a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-white text-[#041E42] text-sm font-bold hover:bg-slate-50 transition"
            >
              <PhoneCall className="w-4 h-4 text-slate-400" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      {SERVICE_PILLARS.map((pillar) => {
        const config = PILLAR_CONFIG[pillar];
        const colors = COLOR_MAP[config.color];
        const Icon = config.icon;
        const services = byPillar[pillar];

        return (
          <section key={pillar} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Pillar header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${colors.badge}`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pillar}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight">
                  {pillar} Services
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                  {config.description}
                </p>
              </div>
            </div>

            {/* Services in this pillar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-8 flex flex-col justify-between card-hover shadow-2xs group"
                >
                  <div className="space-y-5">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${colors.icon}`}>
                      <span className="text-xl">{service.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#041E42] group-hover:text-[#0052CC] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100 font-normal">
                      {service.fullDesc}
                    </p>

                    <div className="pt-2 space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        What we handle
                      </h4>
                      <ul className="space-y-1.5">
                        {service.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href="/consultation"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052CC] hover:text-[#0043A8] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Discuss This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* How We Work */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
              Our Approach
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight">
              How We Work With You
            </h2>
            <p className="text-sm text-slate-600 font-normal">
              We embed ourselves into your business operations and handle the work that keeps your healthcare business growing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 space-y-3 shadow-2xs">
              <div className="text-[#0052CC] font-mono font-extrabold text-2xl">01</div>
              <h3 className="text-lg font-bold text-[#041E42]">Understand Your Business</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We start by learning about your products, your clients, and your business goals — so we can structure the right support.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 space-y-3 shadow-2xs">
              <div className="text-[#0052CC] font-mono font-extrabold text-2xl">02</div>
              <h3 className="text-lg font-bold text-[#041E42]">Handle the Work</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We take over the sales management, product coordination, and customer support responsibilities — professionally and consistently.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 space-y-3 shadow-2xs">
              <div className="text-[#0052CC] font-mono font-extrabold text-2xl">03</div>
              <h3 className="text-lg font-bold text-[#041E42]">Grow Together</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                As your business grows, we scale our support. You focus on your product and strategy — we handle the execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl medical-gradient text-white p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl card-hover">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to discuss how we can support your business?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
              Request a consultation and we&apos;ll discuss which of our Sales, Service, and Support capabilities would best fit your needs.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/consultation"
              className="px-7 py-4 rounded-xl bg-white text-[#041E42] font-bold text-xs sm:text-sm hover:bg-slate-100 active:scale-95 transition shadow-md"
            >
              Request a Consultation
            </Link>
            <Link
              href="/contact"
              className="px-7 py-4 rounded-xl bg-blue-700/80 border border-white/25 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 active:scale-95 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
