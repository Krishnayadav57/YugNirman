import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";
import { getBookings, getServices } from "@/lib/db";
import { userLogoutAction } from "@/lib/actions";

export default async function AccountPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const services = getServices();
  const serviceMap = Object.fromEntries(services.map((s) => [s.id, s.title]));
  const myBookings = getBookings().filter((b) => b.email?.toLowerCase() === user.email?.toLowerCase());

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 px-6 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <div className="reveal flex items-center justify-between flex-wrap gap-4 mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">My account</span>
              <h1 className="mt-3 text-3xl md:text-4xl font-display font-bold">
                {user.user_metadata?.full_name || user.email}
              </h1>
              <p className="mt-2 text-muted text-sm">{user.email}</p>
            </div>
            <form action={userLogoutAction}>
              <button type="submit" className="rounded-xl px-5 py-2.5 text-sm font-semibold border border-border bg-card">
                Sign out
              </button>
            </form>
          </div>

          <div className="reveal">
            <h2 className="font-semibold text-lg mb-5">Your booking requests</h2>
            {myBookings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <p className="text-muted text-sm">You haven't booked a service yet.</p>
                <a href="/book" className="inline-block mt-4 text-accent font-semibold text-sm" data-cursor-hover>
                  Book a service →
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {myBookings.map((b) => (
                  <div key={b.id} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex justify-between items-start flex-wrap gap-3">
                      <div>
                        <div className="font-semibold text-sm">{serviceMap[b.serviceId] || "Service"}</div>
                        <div className="text-muted text-xs mt-1">
                          Submitted {new Date(b.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <span className="text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full bg-white/5 text-muted">
                        {b.status}
                      </span>
                    </div>
                    {b.message && <p className="text-muted text-sm mt-3">{b.message}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
