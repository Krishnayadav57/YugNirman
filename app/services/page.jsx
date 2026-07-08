import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceIcon from "@/components/ServiceIcon";
import { getServices } from "@/lib/db";

export const metadata = {
  title: "Services",
  description: "AI, web, mobile, cloud, automation, enterprise software, UI/UX, DevOps, and SaaS development services from YugNirman.",
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="reveal max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">What we do</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold">Services built for scale</h1>
            <p className="mt-5 text-muted leading-relaxed">
              Every engagement starts with your business goals — then we assemble the right mix of engineering,
              design, and AI to get there.
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
                <p className="text-muted text-sm leading-relaxed mb-4">{s.shortDesc}</p>
                <span className="text-accent text-sm font-semibold">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
