"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter({ value, suffix = "", decimals = 0, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const start = performance.now();
            const animate = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(value * eased);
              if (progress < 1) requestAnimationFrame(animate);
              else setDisplay(value);
            };
            requestAnimationFrame(animate);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="reveal text-center rounded-2xl border border-border bg-card px-4 py-8">
      <div className="font-display text-4xl font-bold gradient-text">
        {display.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-2 text-muted text-sm">{label}</div>
    </div>
  );
}
