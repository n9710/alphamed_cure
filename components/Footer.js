import Link from 'next/link';
import Image from 'next/image';
import {
  PhoneCall,
  Mail,
  Building2,
  ArrowRight,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#041E42] text-slate-300 pt-16 pb-12 border-t border-[#0A284D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#0A284D]">
          {/* Col 1 & 2: Brand Identity & Accreditations */}
          <div className="space-y-5 lg:col-span-2">
            <div className="relative w-36 h-9">
              <Image
                src="/assets/alphamed_cure_logo.png"
                alt="Alphamed Cure Logo"
                fill
                sizes="192px"
                className="object-contain object-left"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md font-normal">
              Alphamed Cure is a healthcare business partner providing Sales, Service, Support, and Healthcare Solutions. We help healthcare businesses maintain reliable commercial coordination, product portfolio management, and institutional communication.
            </p>
          </div>

          {/* Col 3: Product Catalog */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Product Catalog
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/products" className="hover:text-blue-400 transition-colors">
                  Browse All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=pharmaceutical-products" className="hover:text-blue-400 transition-colors">
                  Pharmaceutical Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=medical-products" className="hover:text-blue-400 transition-colors">
                  Medical Supplies
                </Link>
              </li>
              <li>
                <Link href="/products?category=dme-durable-medical-equipment" className="hover:text-blue-400 transition-colors">
                  Medical Equipment
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="hover:text-blue-400 transition-colors">
                  Institutional Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Alphamed Cure
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-blue-400 transition-colors">
                  Compliance &amp; Standards
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-blue-400 transition-colors">
                  Request Consultation
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Desk */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Desk
            </h4>
            <div className="text-xs space-y-2.5 text-slate-300">
              <p className="text-slate-100 font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Alphamed Cure</span>
              </p>
              <p className="text-slate-400 leading-relaxed font-normal">
                Institutional Operations &amp; Support
              </p>
              <div className="pt-1 space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span><Link href="/contact" className="text-white hover:text-sky-300 transition-colors">Contact Form</Link></span>
                </p>
                <p className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <a href="mailto:info@alphamedcure.com" className="truncate hover:text-white transition-colors">info@alphamedcure.com</a>
                </p>
              </div>

              <div className="pt-3">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A8] text-white font-bold text-xs shadow-xs transition"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-[11px] text-slate-400 leading-relaxed space-y-3">
          <p>
            Alphamed Cure provides sales, service, and support solutions for healthcare businesses. All product transactions are conducted through appropriate business channels.
          </p>
          <div className="flex flex-wrap justify-between items-center pt-4 border-t border-[#0A284D] text-slate-400 text-xs gap-3">
            <p>© {new Date().getFullYear()} ALPHAMED CURE. All rights reserved.</p>
            <p className="font-semibold text-slate-300">
              Sales · Service · Support · Healthcare Solutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
