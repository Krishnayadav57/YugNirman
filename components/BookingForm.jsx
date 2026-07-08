"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function BookingForm({ services }) {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("service");
  const preselectedService = services.find((s) => s.slug === preselect);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceId: preselectedService?.id || services[0]?.id || "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (preselectedService) setForm((f) => ({ ...f, serviceId: preselectedService.id }));
  }, [preselect]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again or contact us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-display font-bold text-2xl mb-2">Booking received</h3>
        <p className="text-muted">
          Thanks — our team will review your request and reach out within one business day to schedule a call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
      <div>
        <label className="block text-xs text-muted mb-2">Full name</label>
        <input required name="name" value={form.name} onChange={handleChange} className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      <div>
        <label className="block text-xs text-muted mb-2">Email</label>
        <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      <div>
        <label className="block text-xs text-muted mb-2">Phone</label>
        <input required name="phone" value={form.phone} onChange={handleChange} placeholder="+977 98xxxxxxxx" className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      <div>
        <label className="block text-xs text-muted mb-2">Company (optional)</label>
        <input name="company" value={form.company} onChange={handleChange} className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs text-muted mb-2">Service</label>
        <select name="serviceId" value={form.serviceId} onChange={handleChange} className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent">
          {services.map((s) => (
            <option key={s.id} value={s.id} className="bg-[#0a0f2b]">
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-muted mb-2">Budget (optional)</label>
        <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. NPR 200,000 – 500,000" className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      <div>
        <label className="block text-xs text-muted mb-2">Timeline (optional)</label>
        <input name="timeline" value={form.timeline} onChange={handleChange} placeholder="e.g. Within 2 months" className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs text-muted mb-2">Project details</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your project..." className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      {error && <p className="sm:col-span-2 text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        data-magnetic
        data-cursor-hover
        className="sm:col-span-2 rounded-xl px-7 py-3.5 font-semibold bg-gradient-to-br from-primary to-secondary disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : "Submit booking request →"}
      </button>
    </form>
  );
}
