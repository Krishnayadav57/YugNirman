import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceIcon from "@/components/ServiceIcon";
import Counter from "@/components/Counter";
import { getServices, getTestimonials, getPortfolio } from "@/lib/db";

export default function HomePage() {
  const services = getServices().slice(0, 6);
  const testimonials = getTestimonials();
  const portfolio = getPortfolio();

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-40 pb-24">
          <span className="eyebrow inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent border border-border bg-card rounded-full px-4 py-1.5">
            ⚡ AI-Powered Software Studio · Nepal → World
          </span>
          <h1 className="mt-8 text-5xl sm:text-6xl md:text-7xl font-display font-bold leading-[1.02] tracking-tight max-w-4xl">
            Building the <span className="gradient-text">Next Era</span><br />Through Technology
          </h1>
          <p className="mt-7 text-lg text-muted max-w-xl leading-relaxed">
            We create AI, web platforms, mobile applications, SaaS products, automation systems, and enterprise
            software that help businesses grow faster.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/book" data-magnetic data-cursor-hover className="rounded-xl px-7 py-3.5 font-semibold bg-gradient-to-br from-primary to-secondary shadow-[0_8px_28px_-8px_rgba(79,70,229,0.7)]">
              Start Your Project →
            </Link>
            <Link href="/portfolio" data-magnetic data-cursor-hover className="rounded-xl px-7 py-3.5 font-semibold border border-border bg-card">
              View Our Work
            </Link>
          </div>

          <div className="reveal mt-16 w-full max-w-2xl text-left rounded-2xl overflow-hidden glass-card shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="px-6 py-6 font-mono text-[13.5px] leading-8 text-[#c9d1f5]">
              <div className="text-muted">// yugnirman/core.ts</div>
              <div><span className="text-sky-300">export</span> <span className="text-violet-300">async function</span> buildTheNextEra(client<span className="text-muted">: Business</span>) {'{'}</div>
              <div>&nbsp;&nbsp;<span className="text-sky-300">const</span> stack = [<span className="text-emerald-400">'AI'</span>, <span className="text-emerald-400">'Cloud'</span>, <span className="text-emerald-400">'Automation'</span>];</div>
              <div>&nbsp;&nbsp;<span className="text-sky-300">const</span> result = <span className="text-sky-300">await</span> yugnirman.ship(client, stack);</div>
              <div>&nbsp;&nbsp;<span className="text-sky-300">return</span> result.<span className="text-emerald-400">growth</span>; <span className="text-muted">// 10x faster</span><span className="caret" /></div>
              <div>{'}'}</div>
            </div>
          </div>
        </section>

        {/* SERVICES PREVIEW */}
        <section className="py-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="reveal max-w-xl mb-16">
              <div className="w-14 h-[3px] rounded bg-gradient-to-r from-primary to-accent mb-5" />
              <h2 className="text-3xl md:text-4xl font-display font-bold">Services built for scale</h2>
              <p className="mt-4 text-muted leading-relaxed">
                From AI-native products to enterprise-grade infrastructure — every service is engineered to
                compound your growth.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  data-cursor-hover
                  className="reveal group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1.5 hover:border-secondary/40 hover:bg-white/[0.07]"
                >
                  <ServiceIcon icon={s.icon} className="mb-6" />
                  <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{s.shortDesc}</p>
                </Link>
              ))}
            </div>
            <div className="reveal text-center mt-12">
              <Link href="/services" data-cursor-hover className="text-accent font-semibold hover:underline">
                View all services →
              </Link>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="reveal max-w-xl mb-16">
              <div className="w-14 h-[3px] rounded bg-gradient-to-r from-primary to-accent mb-5" />
              <h2 className="text-3xl md:text-4xl font-display font-bold">Why teams choose YugNirman</h2>
              <p className="mt-4 text-muted">We don't just write code — we engineer outcomes.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <Counter value={10} suffix="x" label="Faster Delivery" />
              <Counter value={99.9} decimals={1} suffix="%" label="Reliability Target" />
              <Counter value={9} suffix="+" label="Core Service Lines" />
              <Counter value={24} suffix="/7" label="Dedicated Support" />
            </div>
          </div>
        </section>

        {/* FUTURE CLIENT WORK PLACEHOLDER SECTION (per request: no fake logos) */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="reveal rounded-3xl border border-dashed border-border bg-card px-8 py-16 text-center">
              <div className="w-14 h-[3px] rounded bg-gradient-to-r from-primary to-accent mb-5 mx-auto" />
              <h2 className="text-2xl md:text-3xl font-display font-bold">Companies we build with</h2>
              <p className="mt-4 text-muted max-w-lg mx-auto leading-relaxed">
                {portfolio.length === 0
                  ? "This space will showcase the companies and products we partner with as we deliver projects. Check back soon — or be the first."
                  : "A selection of companies and products we've built for."}
              </p>
              {portfolio.length === 0 && (
                <Link href="/book" data-cursor-hover className="inline-block mt-6 text-accent font-semibold hover:underline">
                  Start the first project with us →
                </Link>
              )}
            </div>
          </div>
        </section>

        {testimonials.length > 0 && (
          <section className="py-24 px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="reveal max-w-xl mb-16">
                <div className="w-14 h-[3px] rounded bg-gradient-to-r from-primary to-accent mb-5" />
                <h2 className="text-3xl md:text-4xl font-display font-bold">What clients say</h2>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="reveal min-w-[320px] max-w-sm rounded-2xl border border-border bg-card p-8">
                    <div className="text-amber-400 mb-4">{"★".repeat(t.rating || 5)}</div>
                    <p className="text-muted text-sm leading-relaxed">"{t.quote}"</p>
                    <p className="mt-5 font-semibold text-sm">
                      {t.name} <span className="text-muted font-normal">· {t.role}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-28 px-6">
          <div className="container mx-auto max-w-4xl text-center reveal">
            <h2 className="text-3xl md:text-5xl font-display font-bold">Ready to build the next era?</h2>
            <p className="mt-5 text-muted max-w-lg mx-auto">
              Tell us what you're building — we'll get back to you within one business day.
            </p>
            <div className="mt-9 flex gap-4 justify-center flex-wrap">
              <Link href="/book" data-magnetic data-cursor-hover className="rounded-xl px-7 py-3.5 font-semibold bg-gradient-to-br from-primary to-secondary">
                Book a Service →
              </Link>
              <Link href="/contact" data-magnetic data-cursor-hover className="rounded-xl px-7 py-3.5 font-semibold border border-border bg-card">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
