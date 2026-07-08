"use client";

import { useState } from "react";
import { updateSettingsAction } from "@/lib/actions";
import { createClient } from "@/utils/supabase/client";

const inputCls = "w-full rounded-lg border border-border bg-white/[0.03] px-3 py-2.5 text-sm focus:outline-none focus:border-accent";

function PasswordChangeCard() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }
    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("success");
      setMessage("Password updated.");
      setPassword("");
    }
  };

  return (
    <div>
      <h2 className="font-semibold mb-4">Change admin password</h2>
      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 grid sm:grid-cols-2 gap-4 max-w-xl">
        <div className="sm:col-span-2">
          <label className="block text-xs text-muted mb-2">New password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className={inputCls}
          />
        </div>
        {status === "error" && <p className="sm:col-span-2 text-sm text-red-400">{message}</p>}
        {status === "success" && <p className="sm:col-span-2 text-sm text-emerald-400">{message}</p>}
        <div className="sm:col-span-2">
          <button type="submit" disabled={status === "loading"} className="rounded-xl px-6 py-3 font-semibold bg-gradient-to-br from-primary to-secondary disabled:opacity-60">
            {status === "loading" ? "Updating..." : "Update password"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminSettingsClient({ settings }) {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display font-bold text-2xl mb-1">Settings</h1>
        <p className="text-muted text-sm mb-8">Company info, legal details, contact info, and social links shown across the site.</p>

        <form action={updateSettingsAction} className="rounded-2xl border border-border bg-card p-6 grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Company name</label><input name="companyName" defaultValue={settings.companyName} className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Tagline</label><input name="tagline" defaultValue={settings.tagline} className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Mission</label><textarea name="mission" defaultValue={settings.mission} rows={2} className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Vision</label><textarea name="vision" defaultValue={settings.vision} rows={2} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Email</label><input name="email" defaultValue={settings.email} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Phone</label><input name="phone" defaultValue={settings.phone} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">WhatsApp number</label><input name="whatsapp" defaultValue={settings.whatsapp} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Office address (public)</label><input name="address" defaultValue={settings.address} className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Google Maps embed URL</label><input name="mapEmbedUrl" defaultValue={settings.mapEmbedUrl} className={inputCls} /></div>

          <div className="sm:col-span-2 mt-4 mb-1 text-sm font-semibold">Legal & registration details</div>
          <p className="sm:col-span-2 text-xs text-muted -mt-2 mb-1">Shown in the footer and on legal pages — fill in with your registered company details.</p>
          <div><label className="block text-xs text-muted mb-2">Company registration no.</label><input name="registrationNo" defaultValue={settings.legal?.registrationNo} placeholder="e.g. 123456/078/079" className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">PAN number</label><input name="panNo" defaultValue={settings.legal?.panNo} placeholder="e.g. 609XXXXXX" className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">VAT number</label><input name="vatNo" defaultValue={settings.legal?.vatNo} placeholder="if VAT registered" className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Registered office address</label><input name="registeredAddress" defaultValue={settings.legal?.registeredAddress} className={inputCls} /></div>

          <div className="sm:col-span-2 mt-4 mb-1 text-sm font-semibold">Social media links</div>
          <div><label className="block text-xs text-muted mb-2">Facebook</label><input name="facebook" defaultValue={settings.socials?.facebook} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Instagram</label><input name="instagram" defaultValue={settings.socials?.instagram} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">LinkedIn</label><input name="linkedin" defaultValue={settings.socials?.linkedin} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">X (Twitter)</label><input name="x" defaultValue={settings.socials?.x} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">YouTube</label><input name="youtube" defaultValue={settings.socials?.youtube} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">GitHub</label><input name="github" defaultValue={settings.socials?.github} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">TikTok</label><input name="tiktok" defaultValue={settings.socials?.tiktok} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">WhatsApp link</label><input name="whatsappLink" defaultValue={settings.socials?.whatsapp} className={inputCls} /></div>

          <div className="sm:col-span-2 mt-2">
            <button type="submit" className="rounded-xl px-6 py-3 font-semibold bg-gradient-to-br from-primary to-secondary">
              Save changes
            </button>
          </div>
        </form>
      </div>

      <PasswordChangeCard />
    </div>
  );
}
