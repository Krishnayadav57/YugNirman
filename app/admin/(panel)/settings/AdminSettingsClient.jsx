"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateSettingsAction, changePasswordAction } from "@/lib/actions";

const inputCls = "w-full rounded-lg border border-border bg-white/[0.03] px-3 py-2.5 text-sm focus:outline-none focus:border-accent";

function SaveButton({ children = "Save changes" }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="rounded-xl px-6 py-3 font-semibold bg-gradient-to-br from-primary to-secondary disabled:opacity-60">
      {pending ? "Saving..." : children}
    </button>
  );
}

export default function AdminSettingsClient({ settings }) {
  const [pwState, pwAction] = useFormState(changePasswordAction, {});

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display font-bold text-2xl mb-1">Settings</h1>
        <p className="text-muted text-sm mb-8">Company info, contact details, and social links shown across the site.</p>

        <form action={updateSettingsAction} className="rounded-2xl border border-border bg-card p-6 grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Company name</label><input name="companyName" defaultValue={settings.companyName} className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Tagline</label><input name="tagline" defaultValue={settings.tagline} className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Mission</label><textarea name="mission" defaultValue={settings.mission} rows={2} className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Vision</label><textarea name="vision" defaultValue={settings.vision} rows={2} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Email</label><input name="email" defaultValue={settings.email} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Phone</label><input name="phone" defaultValue={settings.phone} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">WhatsApp number</label><input name="whatsapp" defaultValue={settings.whatsapp} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Address</label><input name="address" defaultValue={settings.address} className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted mb-2">Google Maps embed URL</label><input name="mapEmbedUrl" defaultValue={settings.mapEmbedUrl} className={inputCls} /></div>

          <div className="sm:col-span-2 mt-4 mb-1 text-sm font-semibold">Social media links</div>
          <div><label className="block text-xs text-muted mb-2">Facebook</label><input name="facebook" defaultValue={settings.socials?.facebook} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">Instagram</label><input name="instagram" defaultValue={settings.socials?.instagram} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">LinkedIn</label><input name="linkedin" defaultValue={settings.socials?.linkedin} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">X (Twitter)</label><input name="x" defaultValue={settings.socials?.x} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">YouTube</label><input name="youtube" defaultValue={settings.socials?.youtube} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">GitHub</label><input name="github" defaultValue={settings.socials?.github} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">TikTok</label><input name="tiktok" defaultValue={settings.socials?.tiktok} className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">WhatsApp link</label><input name="whatsappLink" defaultValue={settings.socials?.whatsapp} className={inputCls} /></div>

          <div className="sm:col-span-2 mt-2"><SaveButton /></div>
        </form>
      </div>

      <div>
        <h2 className="font-semibold mb-4">Change admin password</h2>
        <form action={pwAction} className="rounded-2xl border border-border bg-card p-6 grid sm:grid-cols-2 gap-4 max-w-xl">
          <div><label className="block text-xs text-muted mb-2">Current password</label><input type="password" name="current" required className={inputCls} /></div>
          <div><label className="block text-xs text-muted mb-2">New password</label><input type="password" name="next" required minLength={8} className={inputCls} /></div>
          {pwState?.error && <p className="sm:col-span-2 text-sm text-red-400">{pwState.error}</p>}
          {pwState?.success && <p className="sm:col-span-2 text-sm text-emerald-400">{pwState.success}</p>}
          <div className="sm:col-span-2"><SaveButton>Update password</SaveButton></div>
        </form>
      </div>
    </div>
  );
}
