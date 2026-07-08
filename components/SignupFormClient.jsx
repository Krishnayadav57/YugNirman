"use client";

import { useFormState, useFormStatus } from "react-dom";
import { userSignupAction } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      data-magnetic
      data-cursor-hover
      className="w-full rounded-xl px-6 py-3.5 font-semibold bg-gradient-to-br from-primary to-secondary disabled:opacity-60"
    >
      {pending ? "Creating account..." : "Create account"}
    </button>
  );
}

export default function SignupFormClient() {
  const [state, formAction] = useFormState(userSignupAction, {});

  if (state?.success) {
    return <p className="text-sm text-emerald-400">{state.success}</p>;
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-xs text-muted mb-2">Full name</label>
        <input name="name" required className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      <div>
        <label className="block text-xs text-muted mb-2">Email</label>
        <input name="email" type="email" required className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      <div>
        <label className="block text-xs text-muted mb-2">Password</label>
        <input name="password" type="password" required minLength={8} className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
