import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/db";

export const metadata = { title: "Privacy Policy", description: "How YugNirman collects, uses, and protects your data." };

export default function PrivacyPage() {
  const s = getSettings();

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="reveal mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Legal</span>
            <h1 className="mt-4 text-4xl font-display font-bold">Privacy Policy</h1>
            <p className="mt-4 text-muted text-sm">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>

          <div className="reveal prose-legal space-y-8 text-sm leading-relaxed text-muted">
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">1. Introduction</h2>
              <p>
                {s.companyName} ("we", "us", "our") respects your privacy and is committed to protecting the personal
                data you share with us through {s.companyName === "YugNirman" ? "yugnirman.com" : "our website"} and
                related services. This policy explains what information we collect, why we collect it, and how you
                can control it.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">2. Information we collect</h2>
              <p className="mb-3">We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Contact details submitted through our contact and booking forms (name, email, phone, company)</li>
                <li>Account information if you create a customer account (name, email, password — stored securely and hashed by our authentication provider)</li>
                <li>Project details you share with us when requesting a service</li>
                <li>Communications you send us directly via email, phone, or social media</li>
              </ul>
              <p className="mt-3">
                We also automatically collect limited technical data (browser type, device type, pages visited) via
                standard analytics tools to help us understand site usage and improve performance.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">3. How we use your information</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>To respond to your inquiries and service booking requests</li>
                <li>To deliver and manage the services you've engaged us for</li>
                <li>To send you updates about your project or account, when relevant</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
              </ul>
              <p className="mt-3">We do not sell your personal data to third parties.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">4. Data storage & security</h2>
              <p>
                Account authentication is handled by our authentication provider using industry-standard encryption.
                We take reasonable technical and organizational measures to protect your information against
                unauthorized access, alteration, disclosure, or destruction. No method of transmission over the
                internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">5. Cookies</h2>
              <p>
                We use cookies and similar technologies to operate essential site functions and, where you consent,
                to understand site usage. See our{" "}
                <a href="/cookies" className="text-accent hover:underline" data-cursor-hover>
                  Cookie Policy
                </a>{" "}
                for details.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">6. Your rights</h2>
              <p className="mb-3">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Object to or restrict certain processing of your data</li>
                <li>Withdraw consent where processing is based on consent</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a href={`mailto:${s.email}`} className="text-accent hover:underline" data-cursor-hover>
                  {s.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">7. Third-party services</h2>
              <p>
                We use trusted third-party providers to operate our website and services, including authentication,
                hosting, and email delivery providers. These providers process data on our behalf and are bound by
                appropriate data protection obligations.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">8. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will post any changes on this page with an
                updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">9. Contact us</h2>
              <p>
                If you have questions about this Privacy Policy, contact us at{" "}
                <a href={`mailto:${s.email}`} className="text-accent hover:underline" data-cursor-hover>
                  {s.email}
                </a>{" "}
                or {s.address}.
              </p>
            </section>

            <p className="text-xs pt-6 border-t border-border">
              This policy is a general template and does not constitute legal advice. Please have it reviewed by a
              qualified lawyer to ensure compliance with applicable laws in your jurisdiction (e.g. Nepal's data
              protection framework, GDPR, or other regional regulations relevant to your clients).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
