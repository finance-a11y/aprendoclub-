import type { Metadata } from "next";

import { getPayloadClient } from "@/lib/payload";
import { Eyebrow } from "@/components/ui/eyebrow";
import { JsonLd } from "@/components/json-ld";
import { blogListGraph, breadcrumbGraph } from "@/lib/schema";
import { Breadcrumbs, type Crumb } from "@/components/blog/breadcrumbs";
import { PostGrid } from "@/components/blog/post-grid";
import { listPosts } from "@/lib/blog/queries";
import { postHref } from "@/lib/blog/format";

// Cacheada (ISR on-demand): el hook afterChange de BlogPost llama a
// revalidatePath('/blog') al guardar/borrar un post.
export const metadata: Metadata = {
  title: "Blog de SEO e IA | aprendoclub",
  description:
    "Guías, tutoriales y estrategias de SEO y AIO en español para posicionar en Google, ChatGPT y Gemini.",
  alternates: {
    canonical: "https://www.aprendoclub.com/blog",
  },
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const sp = await searchParams;
  const raw = Array.isArray(sp?.page) ? sp.page[0] : sp?.page;
  const page = raw && parseInt(raw, 10) > 0 ? parseInt(raw, 10) : 1;

  const payload = await getPayloadClient();
  const { docs, totalPages } = await listPosts(payload, page);

  const graph = blogListGraph({
    name: "Blog de SEO e IA | aprendoclub",
    path: "/blog",
    description:
      "Guías, tutoriales y estrategias de SEO y AIO en español para posicionar en Google, ChatGPT y Gemini.",
    items: docs.map((p) => ({ name: p.title, path: postHref(p) })),
  });

  const crumbs: Crumb[] = [
    { name: "Inicio", path: "/" },
    { name: "Blog" },
  ];

  return (
    <div className="w-full bg-[var(--bg-primary)] text-white">
      <JsonLd data={[graph, breadcrumbGraph(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <header className="container-padding mx-auto flex max-w-3xl flex-col items-center gap-4 pt-6 pb-12 text-center">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
          Aprende SEO e IA, artículo por artículo
        </h1>
        <p className="max-w-2xl text-lg text-gray-400">
          Guías prácticas y sin humo para posicionar en Google, ChatGPT y Gemini.
        </p>
      </header>
      <div className="container-padding section-spacing mx-auto max-w-6xl">
        <PostGrid posts={docs} page={page} totalPages={totalPages} basePath="/blog" />
      </div>
    </div>
  );
}
