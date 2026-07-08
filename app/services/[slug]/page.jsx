import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceIcon from "@/components/ServiceIcon";
import { getServiceBySlug } from "@/lib/db";

export async function generateMetadata({ params }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  return { title: service.title, description: service.shortDesc };
}

export default async function ServiceDetailPage({ params }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="reveal">
            <ServiceIcon icon={service.icon} className="mb-8 w-16 h-16 text-2xl" />
            <h1 className="text-4xl md:text-5xl font-display font-bold">{service.title}</h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">{service.description}</p>
          </div>

          <div className="reveal mt-14 grid sm:grid-cols-2 gap-4">
            {service.features.map((f) => (
              <div key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4">
                <span className="text-accent">✓</span>
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>

          <div className="reveal mt-14 flex items-center justify-between flex-wrap gap-6 rounded-2xl border border-border bg-card px-8 py-7">
            <div>
              <div className="text-muted text-xs uppercase tracking-wider mb-1">Starting at</div>
              <div className="text-xl font-display font-bold">{service.startingPrice}</div>
            </div>
            <Link
              href={`/book?service=${service.slug}`}
              data-magnetic
              data-cursor-hover
              className="rounded-xl px-7 py-3.5 font-semibold bg-gradient-to-br from-primary to-secondary"
            >
              Book this service →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
