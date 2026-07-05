import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

// Página nunca cacheada estáticamente: los slugs nuevos se crean/editan desde
// /admin y deben reflejarse sin rebuild.
export const dynamic = 'force-dynamic'

/**
 * Slugs reservados que ya sirven las rutas estáticas existentes (o la home).
 * Defensa en profundidad además de la precedencia de Next (un segmento
 * explícito siempre gana sobre un catch-all no-opcional): si por cualquier
 * razón esta ruta llegara a matchear uno de estos slugs, se devuelve
 * notFound() en vez de renderizar, para que el sitio actual (content/*.ts)
 * siga siendo la única fuente de verdad hasta el cutover (Phases 15-17).
 */
const RESERVED_SLUGS = new Set<string>([
  '',
  'home',
  'programas/taller-seo-con-ia',
  'reto',
  'links',
  'admin',
  'api',
])

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')

  if (RESERVED_SLUGS.has(slug)) {
    notFound()
  }

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const doc = docs[0]
  if (!doc) {
    notFound()
  }

  // TODO Phase 17: generateMetadata desde doc.meta (SEO tab de Pages)

  return <RenderBlocks blocks={doc.layout ?? []} />
}
