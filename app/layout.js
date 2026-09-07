import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: {
    default: 'Alphamed Cure — B2B Medical Supplies & Healthcare Equipment',
    template: '%s | Alphamed Cure',
  },
  description:
    'Alphamed Cure is an accredited global B2B medical supply and pharmaceutical distributor providing licensed hospitals, pharmacies, and clinics with certified formulations, surgical consumables, and ICU equipment.',
  keywords: [
    'B2B medical supply',
    'hospital procurement',
    'wholesale pharmaceuticals',
    'surgical consumables',
    'ICU patient monitors',
    'medical equipment distributor',
    'Alphamed Cure',
  ],
  authors: [{ name: 'Alphamed Cure' }],
  metadataBase: new URL('https://alphamedcure.com'),
  openGraph: {
    title: 'Alphamed Cure — Global Medical & Pharmaceutical Distribution',
    description:
      'Certified institutional supply chain partner for hospitals, clinics, and government healthcare agencies.',
    siteName: 'Alphamed Cure',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full ${plusJakartaSans.variable}`}>
      <body className="flex flex-col min-h-full font-sans bg-[#FAFCFE] text-[#091E3A] antialiased selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
