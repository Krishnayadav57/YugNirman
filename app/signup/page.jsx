import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignupFormClient from "@/components/SignupFormClient";

export const metadata = { title: "Sign Up", description: "Create a YugNirman account." };

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 pt-32 pb-16">
        <div className="w-full max-w-sm reveal">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h1 className="font-display font-bold text-xl mb-1">Create your account</h1>
            <p className="text-muted text-sm mb-6">Book services and track your project requests.</p>
            <SignupFormClient />
          </div>
          <p className="text-center text-muted text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-accent font-semibold" data-cursor-hover>
              Sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
