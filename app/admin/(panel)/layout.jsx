import Image from "next/image";
import Link from "next/link";
import { logoutAction } from "@/lib/actions";
import { getBookings, getMessages } from "@/lib/db";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "◧" },
  { href: "/admin/services", label: "Services", icon: "◆" },
  { href: "/admin/portfolio", label: "Portfolio", icon: "▥" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "★" },
  { href: "/admin/bookings", label: "Bookings", icon: "▤" },
  { href: "/admin/messages", label: "Messages", icon: "✉" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default function AdminPanelLayout({ children }) {
  const newBookings = getBookings().filter((b) => b.status === "new").length;
  const unreadMessages = getMessages().filter((m) => !m.read).length;

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 flex-none border-r border-border bg-card/40 p-6 flex flex-col">
        <Image src="/logo-wordmark.svg" alt="YugNirman" width={150} height={28} />
        <nav className="mt-10 flex-1 space-y-1">
          {NAV.map((item) => {
            const badge = item.href === "/admin/bookings" ? newBookings : item.href === "/admin/messages" ? unreadMessages : 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-muted hover:text-white hover:bg-white/5 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="text-accent">{item.icon}</span>
                  {item.label}
                </span>
                {badge > 0 && (
                  <span className="text-[11px] font-semibold bg-secondary text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <form action={logoutAction}>
          <button type="submit" className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-muted hover:text-white hover:bg-white/5 transition-colors">
            ← Sign out
          </button>
        </form>
        <Link href="/" className="mt-2 text-xs text-muted hover:text-white px-3">
          View live site ↗
        </Link>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
