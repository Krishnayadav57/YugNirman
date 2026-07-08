import Link from "next/link";
import { getServices, getPortfolio, getBookings, getMessages, getTestimonials } from "@/lib/db";

export default function AdminDashboard() {
  const services = getServices();
  const portfolio = getPortfolio();
  const bookings = getBookings();
  const messages = getMessages();
  const testimonials = getTestimonials();

  const stats = [
    { label: "Services", value: services.length, href: "/admin/services" },
    { label: "Portfolio items", value: portfolio.length, href: "/admin/portfolio" },
    { label: "Total bookings", value: bookings.length, href: "/admin/bookings" },
    { label: "New bookings", value: bookings.filter((b) => b.status === "new").length, href: "/admin/bookings" },
    { label: "Unread messages", value: messages.filter((m) => !m.read).length, href: "/admin/messages" },
    { label: "Testimonials", value: testimonials.length, href: "/admin/testimonials" },
  ];

  const recentBookings = bookings.slice(0, 5);
  const recentMessages = messages.slice(0, 5);

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1">Dashboard</h1>
      <p className="text-muted text-sm mb-8">Overview of everything happening on your site.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-2xl border border-border bg-card p-6 hover:border-secondary/40 transition-colors">
            <div className="text-3xl font-display font-bold">{s.value}</div>
            <div className="text-muted text-sm mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold mb-4">Recent bookings</h2>
          {recentBookings.length === 0 ? (
            <p className="text-muted text-sm">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((b) => (
                <div key={b.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{b.name}</div>
                      <div className="text-muted text-xs mt-1">{b.email}</div>
                    </div>
                    <span className="text-[11px] uppercase tracking-wide px-2 py-1 rounded-full bg-white/5 text-muted">
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="font-semibold mb-4">Recent messages</h2>
          {recentMessages.length === 0 ? (
            <p className="text-muted text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((m) => (
                <div key={m.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{m.subject}</div>
                      <div className="text-muted text-xs mt-1">{m.name} · {m.email}</div>
                    </div>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-accent mt-1.5" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
