import "./globals.css";
import CursorFX from "@/components/CursorFX";
import ScrollReveal from "@/components/ScrollReveal";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL("https://yugnirman.com"),
  title: {
    default: "YugNirman — Building the Next Era Through Technology",
    template: "%s | YugNirman",
  },
  description:
    "YugNirman is a Nepal-based technology company building AI solutions, web platforms, mobile apps, SaaS products, cloud infrastructure, and enterprise software for clients worldwide.",
  keywords: [
    "YugNirman", "Nepal software company", "AI solutions Nepal", "web development Nepal",
    "mobile app development Nepal", "SaaS development", "enterprise software Nepal", "Kathmandu tech company",
  ],
  authors: [{ name: "YugNirman" }],
  openGraph: {
    title: "YugNirman — Building the Next Era Through Technology",
    description: "AI, web, mobile, cloud, automation and enterprise software — built in Nepal for clients worldwide.",
    url: "https://yugnirman.com",
    siteName: "YugNirman",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YugNirman — Building the Next Era Through Technology",
    description: "AI, web, mobile, cloud, automation and enterprise software — built in Nepal for clients worldwide.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <div id="cursor-glow" />
        <div id="cursor-ring" />
        <div className="aurora-bg">
          <div className="aurora-blob blob1" />
          <div className="aurora-blob blob2" />
          <div className="aurora-blob blob3" />
        </div>
        <div className="grid-overlay" />
        <div className="relative z-[1]">{children}</div>
        <CursorFX />
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  );
}
