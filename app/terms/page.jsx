import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/db";

export const metadata = { title: "Terms of Service", description: "Terms governing use of YugNirman's website and services." };

export default async function TermsPage() {
  const s = await getSettings();

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="reveal mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Legal</span>
            <h1 className="mt-4 text-4xl font-display font-bold">Terms of Service</h1>
            <p className="mt-4 text-muted text-sm">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>

          <div className="reveal space-y-8 text-sm leading-relaxed text-muted">
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">1. Acceptance of terms</h2>
              <p>
                By accessing or using this website, or engaging {s.companyName} for services, you agree to be bound
                by these Terms of Service. If you do not agree, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">2. Services</h2>
              <p>
                {s.companyName} provides software development and related technology services, including but not
                limited to AI solutions, web development, mobile app development, cloud solutions, business
                automation, enterprise software, UI/UX design, DevOps, and SaaS development. Specific scope, pricing,
                timelines, and deliverables for any engagement will be defined in a separate written proposal,
                statement of work, or contract agreed upon by both parties. These Terms govern general use of the
                website; a signed project agreement governs any paid engagement.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">3. Booking requests & quotes</h2>
              <p>
                Submitting a booking or contact form is a request for information and does not constitute a binding
                contract. A project begins only once both parties have agreed to and signed a proposal, quote, or
                service agreement outlining scope, cost, and timeline.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">4. User accounts</h2>
              <p>
                If you create an account, you're responsible for maintaining the confidentiality of your login
                credentials and for all activity under your account. Notify us immediately of any unauthorized use.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">5. Intellectual property</h2>
              <p>
                Unless otherwise agreed in a signed project contract, all content on this website — including
                design, branding, code, and copy — is the property of {s.companyName} and may not be copied,
                reproduced, or distributed without permission. Ownership of deliverables produced under a client
                engagement is governed by the relevant signed agreement for that project.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">6. Payments & refunds</h2>
              <p>
                Payment terms for any engagement are set out in the applicable project agreement or invoice. See our{" "}
                <a href="/refund-policy" className="text-accent hover:underline" data-cursor-hover>
                  Refund & Cancellation Policy
                </a>{" "}
                for details on refunds and cancellations.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">7. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by applicable law, {s.companyName} shall not be liable for any
                indirect, incidental, special, or consequential damages arising from use of this website or our
                services. Our total liability for any claim arising from a paid engagement is limited to the fees
                paid for that specific engagement, unless otherwise agreed in writing.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">8. Third-party links</h2>
              <p>
                Our website may contain links to third-party websites (including social media). We are not
                responsible for the content or practices of those sites.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">9. Governing law</h2>
              <p>
                These Terms are governed by the laws of Nepal, without regard to conflict-of-law principles. Any
                disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts of
                Nepal, unless otherwise agreed in a specific client contract.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">10. Changes to these terms</h2>
              <p>We may revise these Terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">11. Contact</h2>
              <p>
                Questions about these Terms can be sent to{" "}
                <a href={`mailto:${s.email}`} className="text-accent hover:underline" data-cursor-hover>
                  {s.email}
                </a>
                .
              </p>
            </section>

            <p className="text-xs pt-6 border-t border-border">
              This document is a general template and does not constitute legal advice. Please have it reviewed by a
              qualified lawyer before relying on it, especially the governing law and liability sections.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
