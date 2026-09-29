import Link from 'next/link';
import { SERVICES, SERVICE_PILLARS, getServicesByPillar } from '@/data/services';
import {
  TrendingUp,
  Target,
  Handshake,
  Package,
  Search,
  ClipboardList,
  PhoneCall,
  MessageSquare,
  Settings,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building2,
  Activity,
  Layers,
} from 'lucide-react';

export const metadata = {
  title: 'Our Services | Alphamed Cure',
  description:
    'Alphamed Cure provides Sales, Service, Support, and Healthcare Solutions to healthcare businesses. Explore our capabilities across commercial management, sourcing, and customer operations.',
};

const PILLAR_CONFIG = {
  Sales: {
    icon: TrendingUp,
    badge: 'bg-blue-50 text-[#0052CC] border-blue-200/80',
    iconBg: 'bg-blue-50 text-[#0052CC] border-blue-200/60',
    description: 'We manage the commercial cycle — from qualified lead engagement to institutional order closure.',
  },
  Service: {
    icon: Package,
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/60',
    description: 'We coordinate product portfolios, supplier communication, inventory allocation, and fulfillment.',
  },
  Support: {
    icon: PhoneCall,
    badge: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
    iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/60',
    description: 'Dedicated customer communication, dispute resolution, and operational workflow maintenance.',
  },
};

const SERVICE_ICON_MAP = {
  'sales-management': TrendingUp,
  'lead-support': Target,
  'business-support': Handshake,
  'product-management': Package,
  'product-sourcing': Search,
  'order-inquiry-management': ClipboardList,
  'customer-communication': PhoneCall,
  'customer-service': MessageSquare,
  'business-process-support': Settings,
};

function getServiceIcon(id) {
  const IconComponent = SERVICE_ICON_MAP[id] || Package;
  return <IconComponent className="w-5 h-5" />;
}

export default function ServicesPage() {
  const byPillar = getServicesByPillar();

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* Header */}
      <section className="bg-[#FAFCFE] py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 text-[#0052CC] text-xs font-bold shadow-2xs">
            <Building2 className="w-3.5 h-3.5" />
            <span>Healthcare Enterprise Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#041E42] max-w-3xl leading-tight">
            Sales · Service · Support · Healthcare Solutions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
            Alphamed Cure operates as a trusted operational and commercial arm for healthcare businesses. We manage client relationships, streamline procurement, and maintain consistent operational standards.
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-white text-[#041E42] text-sm font-bold hover:bg-slate-50 transition shadow-2xs"
            >
              <PhoneCall className="w-4 h-4 text-slate-400" />
              <span>Contact Desk</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0052CC] flex items-center justify-center font-bold text-xs">01</div>
            <h3 className="text-sm font-bold text-[#041E42]">Sales Management</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Lead qualification, contract discussions, and commercial closure.</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">02</div>
            <h3 className="text-sm font-bold text-[#041E42]">Product Service</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Portfolio coordination, sourcing, and order tracking workflows.</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">03</div>
            <h3 className="text-sm font-bold text-[#041E42]">Support Desk</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Direct institutional communication and escalation handling.</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">04</div>
            <h3 className="text-sm font-bold text-[#041E42]">Healthcare Solutions</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Integrated facility procurement and supply infrastructure advisory.</p>
          </div>
        </div>
      </section>

      {/* Three Pillars Detailed */}
      {SERVICE_PILLARS.map((pillar) => {
        const config = PILLAR_CONFIG[pillar];
        const Icon = config.icon;
        const services = byPillar[pillar];

        return (
          <section key={pillar} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Pillar header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div className="space-y-1.5">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${config.badge}`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pillar} Pillar</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight">
                  {pillar} Services
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-normal">
                  {config.description}
                </p>
              </div>
            </div>

            {/* Services in this pillar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl border border-slate-200 card-hover p-6 flex flex-col justify-between shadow-2xs hover:border-[#0052CC]/40 hover:shadow-md transition-all duration-200 group active:scale-[0.995]"
                >
                  <div className="space-y-4">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-200 group-hover:scale-105 ${config.iconBg}`}>
                      {getServiceIcon(service.id)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#041E42] group-hover:text-[#0052CC] transition-colors duration-200">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                        {service.shortDesc}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100 font-normal">
                      {service.fullDesc}
                    </p>

                    <div className="pt-2 space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Key Responsibilities
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

                  <div className="pt-5 mt-5 border-t border-slate-100">
                    <Link
                      href="/consultation"
                      className="btn-tactile inline-flex items-center gap-1.5 text-xs font-bold text-[#0052CC] hover:text-[#0043A8] transition-colors"
                    >
                      <span>Discuss {service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Fourth Pillar: Healthcare Solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200/80 pb-4 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200/80">
            <Layers className="w-3.5 h-3.5" />
            <span>Integrated Capability</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight">
            Healthcare Solutions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-normal">
            When individual pillars are combined, Alphamed Cure provides comprehensive institutional support tailored to healthcare systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#041E42]">Procurement Program Architecture</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Structuring multi-item procurement packages across pharmaceutical and medical hardware supplies for hospitals and clinical centers.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#041E42]">Supply Continuity Coordination</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Establishing routine communication cadence, buffer stock oversight, and proactive requisition tracking to minimize stock-outs.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#041E42]">Institutional Partner Alignment</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Synchronizing operational expectations between manufacturers, accredited suppliers, and healthcare facilities.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-[#FAFCFE] py-14 sm:py-18 border-y border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
              Operational Engagement
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E42] tracking-tight">
              How We Work With You
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              We embed directly into your commercial and supply operations to maintain reliability and consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200/90 space-y-3 shadow-2xs">
              <div className="text-[#0052CC] font-mono font-extrabold text-xl">01</div>
              <h3 className="text-base font-bold text-[#041E42]">Operational Assessment</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                We analyze your current product lines, target client facilities, and commercial bottlenecks to configure appropriate support.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/90 space-y-3 shadow-2xs">
              <div className="text-[#0052CC] font-mono font-extrabold text-xl">02</div>
              <h3 className="text-base font-bold text-[#041E42]">Execution &amp; Management</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                We execute sales management, product coordination, and customer communication systematically with transparent tracking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/90 space-y-3 shadow-2xs">
              <div className="text-[#0052CC] font-mono font-extrabold text-xl">03</div>
              <h3 className="text-base font-bold text-[#041E42]">Continuous Scale</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                As your facility partnerships expand, our operational support scales to handle higher volumes and broader catalog offerings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#041E42] border border-[#0052CC]/30 text-white p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-sm">
          <div className="space-y-2.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to discuss how we can support your business?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
              Schedule a discovery session to align on which Sales, Service, Support, or Healthcare Solutions model fits your organization.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/consultation"
              className="px-6 py-3.5 rounded-xl bg-[#0052CC] text-white font-bold text-xs sm:text-sm hover:bg-[#0043A8] transition shadow-xs"
            >
              Request a Consultation
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl border border-slate-600 bg-white/5 text-white font-bold text-xs sm:text-sm hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
