import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginFormClient from "@/components/LoginFormClient";

export const metadata = { title: "Log In", description: "Sign in to your YugNirman account." };

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 pt-32 pb-16">
        <div className="w-full max-w-sm reveal">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h1 className="font-display font-bold text-xl mb-1">Sign in</h1>
            <p className="text-muted text-sm mb-6">Track your bookings and manage your account.</p>
            <Suspense fallback={<div className="text-muted text-sm">Loading...</div>}>
              <LoginFormClient />
            </Suspense>
          </div>
          <p className="text-center text-muted text-sm mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-accent font-semibold" data-cursor-hover>
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
