import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { getSettings } from "@/lib/db";

export const metadata = { title: "Contact", description: "Get in touch with YugNirman." };

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="reveal max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Get in touch</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold">Let's build something great</h1>
            <p className="mt-5 text-muted leading-relaxed">
              Tell us about your project, or reach us directly through email, phone, or social media —
              whichever is easiest for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="reveal">
              <ContactForm />
            </div>

            <div className="reveal space-y-6">
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="flex items-start gap-4 py-3 border-b border-border">
                  <span>📍</span>
                  <div>
                    <div className="font-semibold text-sm">Office</div>
                    <div className="text-muted text-sm mt-1">{settings.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-3 border-b border-border">
                  <span>✉️</span>
                  <div>
                    <div className="font-semibold text-sm">Email</div>
                    <a href={`mailto:${settings.email}`} className="text-accent text-sm mt-1 block" data-cursor-hover>
                      {settings.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-3 border-b border-border">
                  <span>📞</span>
                  <div>
                    <div className="font-semibold text-sm">Phone</div>
                    <a href={`tel:${settings.phone}`} className="text-accent text-sm mt-1 block" data-cursor-hover>
                      {settings.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-3">
                  <span>💬</span>
                  <div>
                    <div className="font-semibold text-sm">WhatsApp</div>
                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent text-sm mt-1 block"
                      data-cursor-hover
                    >
                      Chat with our team
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="font-semibold text-sm mb-4">Follow us</div>
                <SocialLinks socials={settings.socials} />
              </div>

              {settings.mapEmbedUrl && (
                <div className="rounded-2xl overflow-hidden border border-border">
                  <iframe
                    src={settings.mapEmbedUrl}
                    width="100%"
                    height="240"
                    style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
                    loading="lazy"
                    title="YugNirman office location"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
