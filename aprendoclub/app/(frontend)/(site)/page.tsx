import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPayloadClient } from "@/lib/payload";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getGraphsForSlug } from "@/lib/schema-mappers";

// El home se sirve desde el Page slug='home' de Payload (los bloques se
// crean/editan desde /admin). El catch-all `[...slug]` no matchea el índice
// `/`, así que esta ruta explícita es la que resuelve la raíz. Cacheada (ISR
// on-demand): el hook afterChange de la colección Pages llama a
// revalidatePath('/') al guardar, así que no hace falta force-dynamic para
// reflejar cambios — y evitarlo ahorra una consulta a Neon por cada visita.
//
// TEMP-NEON-OUTAGE: forzado a dynamic mientras Neon está sin cuota, decisión
// explícita de Juan (2026-09-29): con Neon caída, `next build` no puede
// prerenderizar esta página y aborta TODO el build — incluidos los HTML
// estáticos del equipo en public/ que no dependen de la DB. Prioridad: que
// esos assets estáticos se publiquen. Costo aceptado: la home deja de servir
// la versión en caché (200) y pasa a fallar en cada visita (500) mientras
// Neon siga caída, igual que /blog, /glosario y /programas ahora mismo.
// Revertir (quitar este export) en cuanto el plan de Neon esté activo.
export const dynamic = 'force-dynamic'

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

  const graphs = await getGraphsForSlug("", payload, doc);

  return (
    <>
      {graphs && <JsonLd data={graphs} />}
      <RenderBlocks blocks={doc.layout ?? []} />
    </>
  );
}
