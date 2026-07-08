import { getServices } from "@/lib/db";
import { createServiceAction, editServiceAction, removeServiceAction } from "@/lib/actions";

function inputCls() {
  return "w-full rounded-lg border border-border bg-white/[0.03] px-3 py-2.5 text-sm focus:outline-none focus:border-accent";
}

export default function AdminServicesPage() {
  const services = getServices();

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1">Services</h1>
      <p className="text-muted text-sm mb-8">Manage the services shown across the site.</p>

      <details className="mb-10 rounded-2xl border border-border bg-card p-6" open={services.length === 0}>
        <summary className="cursor-pointer font-semibold text-sm">+ Add new service</summary>
        <form action={createServiceAction} className="grid sm:grid-cols-2 gap-4 mt-6">
          <div><label className="block text-xs text-muted mb-2">Title</label><input name="title" required className={inputCls()} /></div>
          <div><label className="block text-xs text-muted mb-2">Slug</label><input name="slug" required placeholder="e.g. ai-solutions" className={inputCls()} /></div>
          <div><label className="block text-xs text-muted mb-2">Icon key</label><input name="icon" placeholder="brain-circuit, globe, smartphone..." className={inputCls()} /></div>
          <div><label className="block text-xs text-muted mb-2">Starting price</label><input name="startingPrice" placeholder="e.g. Custom quote" className={inputCls()} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Short description</label><input name="shortDesc" required className={inputCls()} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Full description</label><textarea name="description" rows={3} required className={inputCls()} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Features (comma-separated)</label><input name="features" placeholder="Feature one, Feature two" className={inputCls()} /></div>
          <button type="submit" className="sm:col-span-2 rounded-xl px-6 py-3 font-semibold bg-gradient-to-br from-primary to-secondary">
            Create service
          </button>
        </form>
      </details>

      <div className="space-y-4">
        {services.map((s) => (
          <details key={s.id} className="rounded-2xl border border-border bg-card p-6">
            <summary className="cursor-pointer flex items-center justify-between">
              <span className="font-semibold text-sm">{s.title} <span className="text-muted font-normal">/{s.slug}</span></span>
              <span className="text-muted text-xs">{s.startingPrice}</span>
            </summary>
            <form action={editServiceAction.bind(null, s.id)} className="grid sm:grid-cols-2 gap-4 mt-6">
              <div><label className="block text-xs text-muted mb-2">Title</label><input name="title" defaultValue={s.title} required className={inputCls()} /></div>
              <div><label className="block text-xs text-muted mb-2">Slug</label><input name="slug" defaultValue={s.slug} required className={inputCls()} /></div>
              <div><label className="block text-xs text-muted mb-2">Icon key</label><input name="icon" defaultValue={s.icon} className={inputCls()} /></div>
              <div><label className="block text-xs text-muted mb-2">Starting price</label><input name="startingPrice" defaultValue={s.startingPrice} className={inputCls()} /></div>
              <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Short description</label><input name="shortDesc" defaultValue={s.shortDesc} required className={inputCls()} /></div>
              <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Full description</label><textarea name="description" defaultValue={s.description} rows={3} required className={inputCls()} /></div>
              <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Features (comma-separated)</label><input name="features" defaultValue={(s.features || []).join(", ")} className={inputCls()} /></div>
              <div className="sm:col-span-2 flex gap-3">
                <button type="submit" className="rounded-xl px-6 py-3 font-semibold bg-gradient-to-br from-primary to-secondary">
                  Save changes
                </button>
                <button formAction={removeServiceAction.bind(null, s.id)} className="rounded-xl px-6 py-3 font-semibold border border-border text-red-400">
                  Delete
                </button>
              </div>
            </form>
          </details>
        ))}
      </div>
    </div>
  );
}
