import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/db";

export const metadata = { title: "About", description: "About YugNirman — a Nepal-based technology company." };

const PROCESS = [
  { step: "01", title: "Discovery", desc: "We learn your business, users, and goals." },
  { step: "02", title: "Planning", desc: "Scope, architecture, and timeline locked in." },
  { step: "03", title: "Design", desc: "High-fidelity UI/UX crafted around real users." },
  { step: "04", title: "Development", desc: "Agile sprints with regular demos." },
  { step: "05", title: "Testing", desc: "Automated and manual QA before every release." },
  { step: "06", title: "Deployment", desc: "Zero-downtime launches, monitored closely." },
  { step: "07", title: "Maintenance", desc: "Ongoing support and continuous improvement." },
];

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="reveal">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">About YugNirman</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold">
              A Nepal-based technology company, built for the world.
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              YugNirman means "building a new era." We're a team of engineers, designers, and AI specialists based
              in Kathmandu, working with clients across Nepal and internationally to build products that last.
            </p>
          </div>

          <div className="reveal grid sm:grid-cols-2 gap-6 mt-14">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-display font-bold text-lg mb-3">Our mission</h3>
              <p className="text-muted text-sm leading-relaxed">{settings.mission}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-display font-bold text-lg mb-3">Our vision</h3>
              <p className="text-muted text-sm leading-relaxed">{settings.vision}</p>
            </div>
          </div>

          <div className="mt-24">
            <div className="reveal w-14 h-[3px] rounded bg-gradient-to-r from-primary to-accent mb-5" />
            <h2 className="reveal text-3xl font-display font-bold mb-12">How we build</h2>
            <div className="relative">
              <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary to-accent" />
              {PROCESS.map((p) => (
                <div key={p.step} className="reveal relative flex gap-6 py-6">
                  <div className="w-12 h-12 flex-none rounded-full border border-border bg-card flex items-center justify-center font-display font-semibold z-[1]">
                    {p.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{p.title}</h4>
                    <p className="text-muted text-sm">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
