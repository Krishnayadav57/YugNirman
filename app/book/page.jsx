import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { getServices } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";

export const metadata = { title: "Book a Service", description: "Book a service with YugNirman." };

export default async function BookPage() {
  const services = await getServices();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="reveal max-w-2xl mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Book a service</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold">Start your project</h1>
            <p className="mt-5 text-muted leading-relaxed">
              Fill in a few details and our team will reach out to schedule a discovery call.
            </p>
          </div>
          <div className="reveal">
            <Suspense fallback={<div className="text-muted text-sm">Loading form...</div>}>
              <BookingForm
                services={services}
                initialValues={
                  user ? { name: user.user_metadata?.full_name || "", email: user.email || "" } : undefined
                }
              />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
