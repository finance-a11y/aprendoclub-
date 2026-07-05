import { MetadataRoute } from "next";

import { getPayloadClient } from "@/lib/payload";
import { SITE_URL } from "@/lib/schema";

// Se regenera en cada request: una Page nueva creada en /admin aparece en el
// sitemap sin redeploy.
export const dynamic = "force-dynamic";

/**
 * Sitemap dinámico: los slugs salen de la colección `pages` + los `ctaHref` de
 * `programas` de Payload (ya no una lista estática). Así, crear una página nueva
 * desde /admin la incluye sin tocar código. `/links` es estático (ruta propia).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const payload = await getPayloadClient();

  const [{ docs: pages }, { docs: programas }] = await Promise.all([
    payload.find({ collection: "pages", depth: 0, limit: 1000 }),
    payload.find({ collection: "programas", depth: 0, limit: 1000 }),
  ]);

  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];
  const push = (
    url: string,
    priority: number,
    changeFrequency: "weekly" | "monthly",
  ) => {
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({ url, lastModified, changeFrequency, priority });
  };

  // Home primero.
  push(SITE_URL, 1, "weekly");

  // Cada Page de Payload ('home' → raíz, ya cubierta).
  for (const page of pages) {
    if (page.slug === "home") continue;
    push(`${SITE_URL}/${page.slug}`, 0.8, "monthly");
  }

  // Programas cuyo ctaHref no esté ya cubierto por un slug de Page.
  for (const programa of programas) {
    const href = programa.ctaHref?.startsWith("/")
      ? `${SITE_URL}${programa.ctaHref}`
      : null;
    if (href) push(href, 0.8, "monthly");
  }

  // Ruta estática propia.
  push(`${SITE_URL}/links`, 0.5, "monthly");

  return entries;
}
