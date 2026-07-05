import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPayloadClient } from "@/lib/payload";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";
import { buildMetadata } from "@/lib/seo/metadata";

// El home se sirve desde el Page slug='home' de Payload (los bloques se
// crean/editan desde /admin y deben reflejarse sin rebuild). El catch-all
// `[...slug]` no matchea el índice `/`, así que esta ruta explícita es la que
// resuelve la raíz.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
    depth: 1,
    limit: 1,
  });

  return buildMetadata(docs[0]?.meta, "");
}

export default async function Home() {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
    depth: 2,
    limit: 1,
  });

  const doc = docs[0];
  if (!doc) {
    notFound();
  }

  return <RenderBlocks blocks={doc.layout ?? []} />;
}
