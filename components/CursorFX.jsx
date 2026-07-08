"use client";

import { useEffect } from "react";

export default function CursorFX() {
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    const ring = document.getElementById("cursor-ring");
    if (!glow || !ring) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0, ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      ringX += (mouseX - ringX) * 0.25;
      ringY += (mouseY - ringY) * 0.25;
      glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const hoverables = () => document.querySelectorAll("a, button, [data-cursor-hover], input, textarea, select");

    const addHoverClass = () => ring.classList.add("hovering");
    const removeHoverClass = () => ring.classList.remove("hovering");

    const attach = () => {
      hoverables().forEach((el) => {
        el.addEventListener("mouseenter", addHoverClass);
        el.addEventListener("mouseleave", removeHoverClass);
      });
    };
    attach();

    // Re-attach on DOM changes (client-side navigations add/remove nodes)
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    // Magnetic buttons
    const magnets = document.querySelectorAll("[data-magnetic]");
    const magnetHandlers = [];
    magnets.forEach((el) => {
      const onMouseMove = (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
      };
      const onLeave = () => {
        el.style.transform = "translate(0,0)";
      };
      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onLeave);
      magnetHandlers.push({ el, onMouseMove, onLeave });
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      magnetHandlers.forEach(({ el, onMouseMove, onLeave }) => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return null;
}
