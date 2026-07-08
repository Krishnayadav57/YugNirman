import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPortfolio } from "@/lib/db";

export const metadata = { title: "Portfolio", description: "Projects delivered by YugNirman." };

export default async function PortfolioPage() {
  const portfolio = await getPortfolio();

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="reveal max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Our work</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold">Portfolio</h1>
            <p className="mt-5 text-muted leading-relaxed">
              Projects we've delivered for clients, added here as we ship them.
            </p>
          </div>

          {portfolio.length === 0 ? (
            <div className="reveal rounded-3xl border border-dashed border-border bg-card px-8 py-20 text-center">
              <h2 className="text-2xl font-display font-bold">Our first case studies are on the way</h2>
              <p className="mt-4 text-muted max-w-md mx-auto leading-relaxed">
                We add real projects here as we complete them with clients — no placeholders, no fake work.
              </p>
              <Link href="/book" data-cursor-hover className="inline-block mt-6 text-accent font-semibold hover:underline">
                Be our next case study →
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((p) => (
                <div key={p.id} className="reveal rounded-2xl overflow-hidden border border-border bg-card">
                  <div
                    className="h-52 flex items-center justify-center font-display font-semibold text-muted"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 20%, rgba(79,70,229,.35), transparent 60%), radial-gradient(circle at 80% 80%, rgba(6,182,212,.3), transparent 60%), #0a0f2b",
                    }}
                  >
                    {p.title}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="mt-2 text-muted text-sm leading-relaxed">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(p.tags || []).map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-full border border-border text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex gap-4 text-sm">
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-accent font-semibold" data-cursor-hover>
                          Live demo ↗
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-muted font-semibold" data-cursor-hover>
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
