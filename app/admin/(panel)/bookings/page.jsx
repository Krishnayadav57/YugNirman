import { getBookings, getServices } from "@/lib/db";
import { updateBookingStatusAction, removeBookingAction } from "@/lib/actions";

const STATUSES = ["new", "contacted", "in-progress", "completed", "declined"];

export default async function AdminBookingsPage() {
  const bookings = await getBookings();
  const services = await getServices();
  const serviceMap = Object.fromEntries(services.map((s) => [s.id, s.title]));

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1">Bookings</h1>
      <p className="text-muted text-sm mb-8">Service requests submitted through the public booking form.</p>

      {bookings.length === 0 ? (
        <p className="text-muted text-sm">No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap justify-between gap-4 items-start">
                <div>
                  <div className="font-semibold">{b.name} {b.company && <span className="text-muted font-normal">· {b.company}</span>}</div>
                  <div className="text-muted text-sm mt-1">{b.email} · {b.phone}</div>
                  <div className="text-sm mt-2">
                    <span className="text-accent font-medium">{serviceMap[b.serviceId] || "Unknown service"}</span>
                    {b.budget && <span className="text-muted"> · Budget: {b.budget}</span>}
                    {b.timeline && <span className="text-muted"> · Timeline: {b.timeline}</span>}
                  </div>
                  {b.message && <p className="text-muted text-sm mt-3 max-w-xl">{b.message}</p>}
                  <div className="text-muted text-xs mt-3">{new Date(b.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <form action={updateBookingStatusAction.bind(null, b.id)}>
                    <select
                      name="status"
                      defaultValue={b.status}
                      onChange={(e) => e.target.form.requestSubmit()}
                      className="rounded-lg border border-border bg-white/[0.03] px-3 py-2 text-xs focus:outline-none focus:border-accent"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-[#0a0f2b]">{s}</option>
                      ))}
                    </select>
                  </form>
                  <form action={removeBookingAction.bind(null, b.id)}>
                    <button type="submit" className="text-xs text-red-400 font-semibold">Delete</button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
