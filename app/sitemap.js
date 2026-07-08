import { getServices } from "@/lib/db";

export default async function sitemap() {
  const base = "https://yugnirman.com";
  const staticRoutes = ["", "/services", "/portfolio", "/about", "/contact", "/book"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  try {
    const services = await getServices();
    const serviceRoutes = services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
    }));
    return [...staticRoutes, ...serviceRoutes];
  } catch {
    return staticRoutes;
  }
}
