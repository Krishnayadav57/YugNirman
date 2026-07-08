import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32">
        <div className="text-7xl font-display font-bold gradient-text">404</div>
        <h1 className="mt-6 text-2xl font-display font-bold">This page doesn't exist</h1>
        <p className="mt-3 text-muted max-w-md">
          The page you're looking for may have moved or never existed. Let's get you back on track.
        </p>
        <Link href="/" data-cursor-hover className="mt-8 rounded-xl px-7 py-3.5 font-semibold bg-gradient-to-br from-primary to-secondary">
          Back to homepage
        </Link>
      </main>
      <Footer />
    </>
  );
}
