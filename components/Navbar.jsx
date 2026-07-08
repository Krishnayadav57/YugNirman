"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[500] transition-all ${
        scrolled ? "bg-bg/70 backdrop-blur-xl border-b border-border" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2" data-cursor-hover>
          <Image src="/logo-wordmark.svg" alt="YugNirman" width={170} height={32} priority />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:text-white transition-colors ${pathname === l.href ? "text-white" : ""}`}
              data-cursor-hover
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/book"
            data-magnetic
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold bg-gradient-to-br from-primary to-secondary shadow-[0_8px_24px_-8px_rgba(79,70,229,0.6)]"
          >
            Book a Service
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
          data-cursor-hover
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-bg/95 backdrop-blur-xl border-t border-border px-6 py-6 flex flex-col gap-5">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/90 text-base font-medium">
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="mt-2 inline-flex justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-gradient-to-br from-primary to-secondary"
          >
            Book a Service
          </Link>
        </div>
      )}
    </header>
  );
}
