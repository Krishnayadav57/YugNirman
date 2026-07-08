import { getPortfolio } from "@/lib/db";
import { createPortfolioAction, removePortfolioAction } from "@/lib/actions";

const inputCls = "w-full rounded-lg border border-border bg-white/[0.03] px-3 py-2.5 text-sm focus:outline-none focus:border-accent";

export default async function AdminPortfolioPage() {
  const portfolio = await getPortfolio();

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1">Portfolio</h1>
      <p className="text-muted text-sm mb-8">
        Add real projects here as you deliver them for clients — this is what shows on the public Portfolio page.
      </p>

      <details className="mb-10 rounded-2xl border border-border bg-card p-6" open={portfolio.length === 0}>
        <summary className="cursor-pointer font-semibold text-sm">+ Add project</summary>
        <form action={createPortfolioAction} className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Project title</label><input name="title" required className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Description</label><textarea name="description" rows={3} required className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Tags (comma-separated)</label><input name="tags" placeholder="Next.js, PostgreSQL, AWS" className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Live URL</label><input name="liveUrl" placeholder="https://" className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">GitHub URL</label><input name="githubUrl" placeholder="https://" className={inputCls} /></div>
          <button type="submit" className="sm:col-span-2 rounded-xl px-6 py-3 font-semibold bg-gradient-to-br from-primary to-secondary">
            Add project
          </button>
        </form>
      </details>

      <div className="space-y-4">
        {portfolio.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card p-6 flex justify-between items-start gap-4">
            <div>
              <div className="font-semibold text-sm">{p.title}</div>
              <p className="text-muted text-sm mt-1">{p.description}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {(p.tags || []).map((t) => (
                  <span key={t} className="text-[11px] px-2 py-1 rounded-full border border-border text-muted">{t}</span>
                ))}
              </div>
            </div>
            <form action={removePortfolioAction.bind(null, p.id)}>
              <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold border border-border text-red-400">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
