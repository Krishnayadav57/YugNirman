import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/db";

export const metadata = { title: "Refund & Cancellation Policy", description: "YugNirman's refund and cancellation terms." };

export default function RefundPolicyPage() {
  const s = getSettings();

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="reveal mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Legal</span>
            <h1 className="mt-4 text-4xl font-display font-bold">Refund & Cancellation Policy</h1>
            <p className="mt-4 text-muted text-sm">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>

          <div className="reveal space-y-8 text-sm leading-relaxed text-muted">
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">1. Project deposits</h2>
              <p>
                Projects typically begin with an upfront deposit as agreed in your project proposal or contract.
                This deposit reserves our team's time and covers initial discovery and planning work.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">2. Cancellation before work begins</h2>
              <p>
                If you cancel before any work has started, your deposit is refundable in full, less any
                non-recoverable third-party costs already incurred on your behalf (e.g. domain or license
                purchases).
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">3. Cancellation after work has begun</h2>
              <p>
                Once work has started, you'll be invoiced for work completed to date, calculated on a pro-rata basis
                against the agreed project scope and timeline. Any remaining balance from your deposit, after
                deducting completed work, will be refunded within a reasonable period.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">4. Milestone-based payments</h2>
              <p>
                For projects billed by milestone, payments made for completed and approved milestones are
                non-refundable. Payments made for milestones not yet started are refundable in full.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">5. Retainer / ongoing support contracts</h2>
              <p>
                Monthly retainer or support agreements may be cancelled with the notice period specified in your
                contract (typically 30 days). Fees already paid for the current billing period are non-refundable,
                but no further charges will apply after cancellation takes effect.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">6. Non-refundable items</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Third-party costs already paid on your behalf (domains, hosting, licenses, App Store fees, etc.)</li>
                <li>Work already delivered and approved</li>
                <li>Custom design or development work specific to your brand that cannot be reused</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">7. How to request a refund</h2>
              <p>
                Email us at{" "}
                <a href={`mailto:${s.email}`} className="text-accent hover:underline" data-cursor-hover>
                  {s.email}
                </a>{" "}
                with your project name and reason for cancellation. We'll review your request against the relevant
                signed agreement and respond within 5 business days.
              </p>
            </section>

            <p className="text-xs pt-6 border-t border-border">
              This policy is a general template. The specific refund terms for your project are ultimately governed
              by the signed proposal or contract for that engagement, which takes precedence over this general
              policy in case of conflict. Please have this reviewed by a qualified lawyer before relying on it.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
