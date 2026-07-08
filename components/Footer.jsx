import Link from "next/link";
import Image from "next/image";
import { getSettings } from "@/lib/db";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const settings = getSettings();
  const legal = settings.legal || {};
  const hasLegalInfo = legal.registrationNo || legal.panNo || legal.vatNo;

  return (
    <footer className="border-t border-border mt-20">
      <div className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2">
            <Image src="/logo-wordmark.svg" alt="YugNirman" width={170} height={32} />
            <p className="text-muted text-sm mt-4 max-w-xs leading-relaxed">{settings.tagline}. {settings.mission}</p>
            <SocialLinks socials={settings.socials} className="mt-6" />
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-wider text-muted mb-4">Company</h5>
            <Link href="/about" className="block text-muted hover:text-white text-sm py-1.5 transition-colors">About</Link>
            <Link href="/portfolio" className="block text-muted hover:text-white text-sm py-1.5 transition-colors">Portfolio</Link>
            <Link href="/contact" className="block text-muted hover:text-white text-sm py-1.5 transition-colors">Contact</Link>
            <Link href="/login" className="block text-muted hover:text-white text-sm py-1.5 transition-colors">Log In</Link>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-wider text-muted mb-4">Get in touch</h5>
            <a href={`mailto:${settings.email}`} className="block text-muted hover:text-white text-sm py-1.5 transition-colors">{settings.email}</a>
            <a href={`tel:${settings.phone}`} className="block text-muted hover:text-white text-sm py-1.5 transition-colors">{settings.phone}</a>
            <span className="block text-muted text-sm py-1.5">{settings.address}</span>
          </div>
        </div>

        <div className="pt-8 border-t border-border grid sm:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
          {hasLegalInfo && (
            <div className="flex flex-wrap sm:justify-end gap-x-5 gap-y-1 text-xs text-muted">
              {legal.registrationNo && <span>Reg. No: {legal.registrationNo}</span>}
              {legal.panNo && <span>PAN: {legal.panNo}</span>}
              {legal.vatNo && <span>VAT: {legal.vatNo}</span>}
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 text-muted text-xs">
          <span>© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</span>
          <span>Made in Kathmandu, for the world.</span>
        </div>
      </div>
    </footer>
  );
}
