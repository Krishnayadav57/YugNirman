"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { userLoginAction } from "@/lib/actions";

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
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export default function LoginFormClient() {
  const [state, formAction] = useFormState(userLoginAction, {});
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get("redirectedFrom") || "/account";

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirectTo" value={redirectedFrom} />
      <div>
        <label className="block text-xs text-muted mb-2">Email</label>
        <input name="email" type="email" required className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      <div>
        <label className="block text-xs text-muted mb-2">Password</label>
        <input name="password" type="password" required className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-accent" />
      </div>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
