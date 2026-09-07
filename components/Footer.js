import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Award,
  ThermometerSnowflake,
  PhoneCall,
  Mail,
  Building2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#041E42] text-slate-300 pt-16 pb-12 border-t border-[#0A284D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#0A284D]">
          {/* Col 1 & 2: Brand Identity & Accreditations */}
          <div className="space-y-5 lg:col-span-2">
            {/* Logo on clean white plate for maximum contrast & crispness */}
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-md">
              <div className="relative w-48 h-12">
                <Image
                  src="/assets/alphamed_cure_logo.png"
                  alt="Alphamed Cure Logo"
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md font-normal">
              Alphamed Cure is an accredited institutional healthcare and pharmaceutical supply partner catering to licensed hospitals, tertiary medical centers, research clinics, and specialized pharmacy networks.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <p className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WHO-GMP Inspected Manufacturing Partnerships</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ISO 13485:2016 Medical Device Protocols</span>
              </p>
              <p className="flex items-center gap-2">
                <ThermometerSnowflake className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Validated 2°C – 8°C Cold-Chain Transit Integrity</span>
              </p>
            </div>
          </div>

          {/* Col 3: Canonical Product Lines */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Procurement Catalog
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/products?category=pharmaceutical-products" className="hover:text-blue-400 transition-colors">
                  Pharmaceutical Formulations
                </Link>
              </li>
              <li>
                <Link href="/products?category=medical-products" className="hover:text-blue-400 transition-colors">
                  Surgical &amp; Medical Supplies
                </Link>
              </li>
              <li>
                <Link href="/products?category=dme-durable-medical-equipment" className="hover:text-blue-400 transition-colors">
                  Durable Medical Equipment (DME)
                </Link>
              </li>
              <li>
                <Link href="/products?category=pharmacy-supplies" className="hover:text-blue-400 transition-colors">
                  Pharmacy Compounding Supplies
                </Link>
              </li>
              <li>
                <Link href="/products?category=vials" className="hover:text-blue-400 transition-colors">
                  USP Borosilicate Serum Vials
                </Link>
              </li>
              <li>
                <Link href="/products?category=thermal-labels" className="hover:text-blue-400 transition-colors">
                  Cryogenic Thermal Barcode Labels
                </Link>
              </li>
              <li>
                <Link href="/products?category=ppe-personal-protective-equipment" className="hover:text-blue-400 transition-colors">
                  Infection Control &amp; PPE
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services & Compliance */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quality &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  Institutional Supply Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Alphamed Cure
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-blue-400 transition-colors">
                  Quality &amp; Regulatory Compliance
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  B2B Supply Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy &amp; Data Protection
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-blue-400 transition-colors">
                  Cookie &amp; Tracking Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Procurement Desk */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Procurement Desk
            </h4>
            <div className="text-xs space-y-2.5 text-slate-300">
              <p className="text-slate-100 font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Central Distribution Hub</span>
              </p>
              <p className="text-slate-400 leading-relaxed">
                Alphamed Cure Distribution Hub, Industrial Area Phase II, New Delhi, India
              </p>
              <div className="pt-1 space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tel: <strong className="text-white">+91 98765 43210</strong></span>
                </p>
                <p className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span className="truncate">procurement@alphamedcure.com</span>
                </p>
              </div>

              <div className="pt-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white font-bold text-xs shadow-xs active:scale-95 transition"
                >
                  <span>Open Contact Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright Bar */}
        <div className="mt-8 text-[11px] text-slate-400 leading-relaxed space-y-3">
          <p>
            <strong className="text-slate-200">Regulatory &amp; Compliance Notice:</strong> Alphamed Cure is a business-to-business (B2B) healthcare and pharmaceutical distributor. Sales of scheduled prescription medications and specialized clinical medical devices are strictly restricted to licensed pharmacies, hospitals, clinics, medical institutions, and authorized healthcare distribution channels in full compliance with national drug and cosmetic regulations.
          </p>
          <div className="flex flex-wrap justify-between items-center pt-4 border-t border-[#0A284D] text-slate-400 text-xs gap-3">
            <p>© {new Date().getFullYear()} ALPHAMED CURE. All rights reserved.</p>
            <p className="font-semibold text-slate-300">
              Institutional Healthcare &amp; Pharmaceutical Solutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
