import type { Metadata } from "next";
import Link from "next/link";

import { getPayloadClient } from "@/lib/payload";
import { Eyebrow } from "@/components/ui/eyebrow";

// Se regenera en cada request: refleja páginas, programas y posts nuevos sin
// redeploy (espejo humano del sitemap.xml).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mapa del sitio | aprendoclub",
  description:
    "Índice completo de aprendoclub: páginas, programas, categorías del blog, artículos y autores.",
};

type SitemapLink = { label: string; href: string };
type SitemapSection = { title: string; links: SitemapLink[] };

export default async function SitemapPage() {
  const payload = await getPayloadClient();

  const [
    { docs: pages },
    { docs: programas },
    { docs: posts },
    { docs: categories },
    { docs: authors },
  ] = await Promise.all([
    payload.find({ collection: "pages", depth: 0, limit: 1000, sort: "title" }),
    payload.find({ collection: "programas", depth: 0, limit: 1000, sort: "orden" }),
    payload.find({ collection: "blogposts", depth: 1, limit: 1000, sort: "-publishedAt" }),
    payload.find({ collection: "categories", depth: 0, limit: 1000, sort: "name" }),
    payload.find({ collection: "authors", depth: 0, limit: 1000, sort: "name" }),
  ]);

  const sections: SitemapSection[] = [];

  // Principal: home + páginas del builder (sin 'home', que es la raíz).
  const principal: SitemapLink[] = [{ label: "Inicio", href: "/" }];
  for (const p of pages) {
    if (p.slug === "home") continue;
    principal.push({ label: p.title, href: `/${p.slug}` });
  }
  principal.push({ label: "Links", href: "/links" });
  sections.push({ title: "Principal", links: principal });

  // Programas (por ctaHref interno).
  const programaLinks: SitemapLink[] = programas
    .filter((pr) => pr.ctaHref?.startsWith("/"))
    .map((pr) => ({ label: pr.nombre, href: pr.ctaHref as string }));
  if (programaLinks.length) {
    sections.push({ title: "Programas", links: programaLinks });
  }

  // Blog: índice + categorías + autores.
  const blogLinks: SitemapLink[] = [{ label: "Blog", href: "/blog" }];
  for (const c of categories) blogLinks.push({ label: c.name, href: `/${c.slug}` });
  sections.push({ title: "Blog y categorías", links: blogLinks });

  if (authors.length) {
    sections.push({
      title: "Autores",
      links: authors.map((a) => ({ label: a.name, href: `/autor/${a.slug}` })),
    });
  }

  // Artículos agrupados por categoría.
  const postsByCat = new Map<string, { name: string; links: SitemapLink[] }>();
  for (const post of posts) {
    const cat = post.category;
    if (typeof cat !== "object" || !cat) continue;
    const key = cat.slug;
    if (!postsByCat.has(key)) postsByCat.set(key, { name: cat.name, links: [] });
    postsByCat.get(key)!.links.push({
      label: post.title,
      href: `/${cat.slug}/${post.slug}`,
    });
  }
  const articleSections: SitemapSection[] = [...postsByCat.values()].map((g) => ({
    title: g.name,
    links: g.links,
  }));

  const totalUrls =
    sections.reduce((n, s) => n + s.links.length, 0) +
    articleSections.reduce((n, s) => n + s.links.length, 0);

  return (
    <div className="w-full bg-[var(--bg-primary)] text-white">
      {/* Header */}
      <header className="container-padding mx-auto flex max-w-3xl flex-col items-center gap-4 pt-28 pb-12 text-center">
        <Eyebrow>Mapa del sitio</Eyebrow>
        <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
          Todo aprendoclub, en un solo lugar
        </h1>
        <p className="max-w-2xl text-lg text-gray-400">
          Índice completo de páginas, programas, categorías y artículos.{" "}
          {totalUrls} enlaces en total.
        </p>
        <a
          href="/sitemap.xml"
          className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-white"
        >
          Ver el sitemap XML →
        </a>
      </header>

      {/* Secciones */}
      <div className="container-padding section-spacing mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...sections, ...articleSections].map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6"
            >
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                {section.title}
                <span className="text-sm font-normal text-gray-500">
                  {section.links.length}
                </span>
              </h2>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-[var(--primary-light)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
