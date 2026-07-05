import type { CollectionAfterChangeHook, Payload, PayloadRequest } from 'payload'

/**
 * Redirecciones gestionadas desde Payload (plugin-redirects).
 *
 * Dos responsabilidades:
 *  1. Auto-creación: hooks `afterChange` que, al cambiar el slug (o la categoría
 *     de un post), guardan un redirect 308 de la URL vieja a la nueva.
 *  2. Serving: `resolveRedirect` traduce una ruta entrante a su destino actual,
 *     consumido por el catch-all antes de devolver 404.
 *
 * Los redirects auto-creados usan `to.type = 'reference'` (apuntan al documento,
 * no a una URL fija), de modo que si el slug vuelve a cambiar el destino se
 * actualiza solo y siempre hay un único salto.
 */

// ---------- Construcción de URLs públicas ----------

/** URL pública de una Page. La home vive en la raíz. */
export function pageUrl(slug: string): string {
  return slug === 'home' ? '/' : `/${slug}`
}

/** URL de una categoría del blog: /{slug}. */
export function categoryUrl(slug: string): string {
  return `/${slug}`
}

/** URL de un autor: /autor/{slug}. */
export function authorUrl(slug: string): string {
  return `/autor/${slug}`
}

/** URL de un post: /{categoria}/{slug}. */
export function blogpostUrl(categorySlug: string, slug: string): string {
  return `/${categorySlug}/${slug}`
}

// ---------- Helpers ----------

type RelationTo = 'pages' | 'blogposts' | 'categories' | 'authors' | 'programas'

/** ID de un campo relationship que puede llegar como número o documento poblado. */
function idOf(value: unknown): number | null {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id: unknown }).id
    return typeof id === 'number' ? id : null
  }
  return null
}

/** Slug de una categoría por id (afterChange entrega relaciones como id). */
async function categorySlug(req: PayloadRequest, id: number | null): Promise<string | null> {
  if (!id) return null
  try {
    const cat = await req.payload.findByID({ collection: 'categories', id, depth: 0, req })
    return cat?.slug ?? null
  } catch {
    return null
  }
}

/** Borra cualquier redirect cuyo `from` sea `path` (evita entradas obsoletas y loops). */
async function deleteRedirectFrom(req: PayloadRequest, path: string): Promise<void> {
  await req.payload.delete({
    collection: 'redirects',
    where: { from: { equals: path } },
    req,
  })
}

/**
 * Crea o actualiza (por `from`) un redirect hacia un documento.
 * Idempotente: si ya existe uno con ese `from`, reescribe su destino.
 */
async function upsertRedirect(
  req: PayloadRequest,
  from: string,
  relationTo: RelationTo,
  id: number,
): Promise<void> {
  const to = { type: 'reference' as const, reference: { relationTo, value: id } }
  const existing = await req.payload.find({
    collection: 'redirects',
    where: { from: { equals: from } },
    limit: 1,
    depth: 0,
    req,
  })
  if (existing.docs[0]) {
    await req.payload.update({
      collection: 'redirects',
      id: existing.docs[0].id,
      data: { to },
      req,
    })
  } else {
    await req.payload.create({ collection: 'redirects', data: { from, to }, req })
  }
}

// ---------- Hooks de auto-creación ----------

/** Pages: al cambiar el slug, redirige la URL vieja al documento. */
export const pageRedirectHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (operation !== 'update' || !previousDoc) return doc
  const oldSlug: string = previousDoc.slug
  const newSlug: string = doc.slug
  if (oldSlug === newSlug || oldSlug === 'home') return doc

  await upsertRedirect(req, pageUrl(oldSlug), 'pages', doc.id)
  await deleteRedirectFrom(req, pageUrl(newSlug))
  return doc
}

/** BlogPost: al cambiar el slug o la categoría, redirige la URL vieja al post. */
export const blogpostRedirectHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (operation !== 'update' || !previousDoc) return doc
  const oldSlug: string = previousDoc.slug
  const newSlug: string = doc.slug
  const oldCatId = idOf(previousDoc.category)
  const newCatId = idOf(doc.category)
  if (oldSlug === newSlug && oldCatId === newCatId) return doc

  const [oldCat, newCat] = await Promise.all([
    categorySlug(req, oldCatId),
    categorySlug(req, newCatId),
  ])
  if (!oldCat || !newCat) return doc

  const from = blogpostUrl(oldCat, oldSlug)
  const to = blogpostUrl(newCat, newSlug)
  if (from === to) return doc

  await upsertRedirect(req, from, 'blogposts', doc.id)
  await deleteRedirectFrom(req, to)
  return doc
}

/**
 * Category: al cambiar el slug, redirige la página de la categoría y TODAS las
 * URLs de sus posts (que dependen del slug de la categoría).
 */
export const categoryRedirectHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (operation !== 'update' || !previousDoc) return doc
  const oldSlug: string = previousDoc.slug
  const newSlug: string = doc.slug
  if (oldSlug === newSlug) return doc

  // Página de la categoría.
  await upsertRedirect(req, categoryUrl(oldSlug), 'categories', doc.id)
  await deleteRedirectFrom(req, categoryUrl(newSlug))

  // Posts de la categoría: /{oldCat}/{postSlug} -> post.
  const posts = await req.payload.find({
    collection: 'blogposts',
    where: { category: { equals: doc.id } },
    limit: 1000,
    depth: 0,
    req,
  })
  for (const p of posts.docs) {
    await upsertRedirect(req, blogpostUrl(oldSlug, p.slug), 'blogposts', p.id)
    await deleteRedirectFrom(req, blogpostUrl(newSlug, p.slug))
  }
  return doc
}

// ---------- Serving ----------

/**
 * Traduce una ruta entrante a su destino actual, o null si no hay redirect.
 * Resuelve referencias al vuelo (depth 2) para que el destino refleje el slug
 * vigente del documento.
 */
export async function resolveRedirect(payload: Payload, path: string): Promise<string | null> {
  const res = await payload.find({
    collection: 'redirects',
    where: { from: { equals: path } },
    limit: 1,
    depth: 2,
  })
  const to = res.docs[0]?.to
  if (!to) return null

  if (to.type === 'custom') return to.url ?? null

  const reference = to.reference
  if (!reference || typeof reference.value !== 'object') return null
  const target = reference.value as { slug?: string; category?: unknown }

  switch (reference.relationTo) {
    case 'pages':
      return target.slug ? pageUrl(target.slug) : null
    case 'categories':
      return target.slug ? categoryUrl(target.slug) : null
    case 'authors':
      return target.slug ? authorUrl(target.slug) : null
    case 'blogposts': {
      const cat = target.category
      const catSlug =
        cat && typeof cat === 'object' && 'slug' in cat ? (cat as { slug: string }).slug : null
      return catSlug && target.slug ? blogpostUrl(catSlug, target.slug) : null
    }
    case 'programas':
      return target.slug ? `/${target.slug}` : null
    default:
      return null
  }
}
