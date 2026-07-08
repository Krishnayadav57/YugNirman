"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "yugnirman_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem(CONSENT_KEY);
    if (!existing) setVisible(true);
  }, []);

  const respond = (choice) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, date: new Date().toISOString() }));
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: choice }));
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[2000]">
      <div className="rounded-2xl border border-border bg-[#0a0f2b]/95 backdrop-blur-xl p-6 shadow-2xl">
        <p className="text-sm text-white/90 leading-relaxed">
          We use cookies to keep you signed in and, if you allow it, to understand how visitors use our site. See
          our{" "}
          <Link href="/cookies" className="text-accent hover:underline" data-cursor-hover>
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => respond("accepted")}
            data-cursor-hover
            className="rounded-lg px-4 py-2 text-sm font-semibold bg-gradient-to-br from-primary to-secondary"
          >
            Accept
          </button>
          <button
            onClick={() => respond("declined")}
            data-cursor-hover
            className="rounded-lg px-4 py-2 text-sm font-semibold border border-border"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
