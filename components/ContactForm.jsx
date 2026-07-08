"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again or reach out via WhatsApp/email.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <div className="text-3xl mb-4">✓</div>
        <h3 className="font-display font-bold text-xl mb-2">Message sent</h3>
        <p className="text-muted text-sm">Thanks for reaching out — we'll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs text-muted mb-2">Full name</label>
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-xs text-muted mb-2">Email</label>
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@company.com"
          className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-xs text-muted mb-2">Subject</label>
        <input
          required
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-xs text-muted mb-2">Message</label>
        <textarea
          required
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us what you're building..."
          className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent"
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        data-magnetic
        data-cursor-hover
        className="w-full rounded-xl px-7 py-3.5 font-semibold bg-gradient-to-br from-primary to-secondary disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send message →"}
      </button>
    </form>
  );
}
