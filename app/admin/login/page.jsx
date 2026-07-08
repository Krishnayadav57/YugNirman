"use client";

import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { loginAction } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl px-6 py-3.5 font-semibold bg-gradient-to-br from-primary to-secondary disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAction, {});

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image src="/logo-wordmark.svg" alt="YugNirman" width={170} height={32} />
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="font-display font-bold text-xl mb-1">Admin sign in</h1>
          <p className="text-muted text-sm mb-6">Manage services, bookings, and site content.</p>
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs text-muted mb-2">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-2">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
            <SubmitButton />
          </form>
        </div>
        <p className="text-center text-muted text-xs mt-6">
          Admin accounts are managed in Supabase — see README for setup instructions.
        </p>
      </div>
    </div>
  );
}
