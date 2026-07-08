import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/db";

export const metadata = { title: "Cookie Policy", description: "How YugNirman uses cookies." };

export default function CookiesPage() {
  const s = getSettings();

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="reveal mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Legal</span>
            <h1 className="mt-4 text-4xl font-display font-bold">Cookie Policy</h1>
            <p className="mt-4 text-muted text-sm">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>

          <div className="reveal space-y-8 text-sm leading-relaxed text-muted">
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">What are cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. They help the site
                function properly, remember your preferences, and (where you allow it) understand how visitors use
                the site.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">Cookies we use</h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="text-white font-medium text-sm mb-1">Strictly necessary</div>
                  <p>
                    Required for core functionality such as keeping you signed in to your account and maintaining
                    admin session security. These cannot be disabled.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="text-white font-medium text-sm mb-1">Preference</div>
                  <p>Remembers your cookie consent choice so we don't ask again on every visit.</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="text-white font-medium text-sm mb-1">Analytics (optional)</div>
                  <p>
                    If enabled, helps us understand aggregate site usage (pages visited, time on site) so we can
                    improve the website. Only set if you accept cookies in the consent banner.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">Managing cookies</h2>
              <p>
                You can accept or decline non-essential cookies via the cookie banner shown on your first visit.
                You can also clear or block cookies at any time through your browser settings — note that blocking
                strictly necessary cookies may affect site functionality, such as staying signed in.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">Contact</h2>
              <p>
                Questions about our use of cookies can be sent to{" "}
                <a href={`mailto:${s.email}`} className="text-accent hover:underline" data-cursor-hover>
                  {s.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
