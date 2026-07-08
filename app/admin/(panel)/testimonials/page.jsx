import { getTestimonials } from "@/lib/db";
import { createTestimonialAction, removeTestimonialAction } from "@/lib/actions";

const inputCls = "w-full rounded-lg border border-border bg-white/[0.03] px-3 py-2.5 text-sm focus:outline-none focus:border-accent";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1">Testimonials</h1>
      <p className="text-muted text-sm mb-8">Add real client testimonials once received — shown on the homepage.</p>

      <details className="mb-10 rounded-2xl border border-border bg-card p-6" open={testimonials.length === 0}>
        <summary className="cursor-pointer font-semibold text-sm">+ Add testimonial</summary>
        <form action={createTestimonialAction} className="grid sm:grid-cols-2 gap-4 mt-6">
          <div><label className="block text-xs text-muted mb-2">Client name</label><input name="name" required className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Role / Company</label><input name="role" required className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Rating (1-5)</label><input name="rating" type="number" min="1" max="5" defaultValue="5" className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Quote</label><textarea name="quote" rows={3} required className={inputCls} /></div>
          <button type="submit" className="sm:col-span-2 rounded-xl px-6 py-3 font-semibold bg-gradient-to-br from-primary to-secondary">
            Add testimonial
          </button>
        </form>
      </details>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-card p-6 flex justify-between items-start gap-4">
            <div>
              <div className="text-amber-400 text-sm">{"★".repeat(t.rating || 5)}</div>
              <p className="text-sm mt-2">"{t.quote}"</p>
              <div className="text-muted text-xs mt-2">{t.name} · {t.role}</div>
            </div>
            <form action={removeTestimonialAction.bind(null, t.id)}>
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
