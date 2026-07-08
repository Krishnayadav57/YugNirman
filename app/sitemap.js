import { getServices } from "@/lib/db";

export default function sitemap() {
  const base = "https://yugnirman.com";
  const staticRoutes = ["", "/services", "/portfolio", "/about", "/contact", "/book"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  const serviceRoutes = getServices().map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...serviceRoutes];
}
