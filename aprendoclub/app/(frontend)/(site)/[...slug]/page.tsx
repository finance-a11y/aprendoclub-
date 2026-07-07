import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPayload } from 'payload'
import type { Payload } from 'payload'

import config from '@/payload.config'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { JsonLd } from '@/components/json-ld'
import { resolveRedirect } from '@/lib/redirects'
import { buildMetadata } from '@/lib/seo/metadata'
import { getGraphsForSlug } from '@/lib/schema-mappers'
import { BlogPostView } from '@/components/blog/blog-post-view'
import { CategoryView } from '@/components/blog/category-view'
import { AuthorView } from '@/components/blog/author-view'
import {
  findAuthorBySlug,
  findCategoryBySlug,
  findPostBySlug,
  listPostsByAuthor,
  listPostsByCategory,
  relatedPosts,
} from '@/lib/blog/queries'

// Página nunca cacheada estáticamente: el contenido se crea/edita desde /admin
// y debe reflejarse sin rebuild.
export const dynamic = 'force-dynamic'

/**
 * Slugs reservados servidos por rutas explícitas (índice, /blog, /links, admin,
 * api). El resto lo resuelve este catch-all, en este orden: (1) blog —
 * /autor/{slug}, /{categoria}, /{categoria}/{slug} — antes que (2) Pages, para
 * que la estructura flat del blog conviva con las páginas del builder sin chocar.
 */
const RESERVED_SLUGS = new Set<string>(['', 'home', 'links', 'admin', 'api', 'blog'])

function pageParam(searchParams?: { page?: string | string[] }): number {
  const raw = Array.isArray(searchParams?.page) ? searchParams?.page[0] : searchParams?.page
  const n = raw ? parseInt(raw, 10) : 1
  return Number.isFinite(n) && n > 0 ? n : 1
}

type Params = Promise<{ slug: string[] }>
type Search = Promise<{ page?: string | string[] }>

/** Metadata de una ruta de blog (autor/categoría/post) o null si no es blog. */
async function blogMetadata(
  payload: Payload,
  slugParts: string[],
): Promise<Metadata | null> {
  if (slugParts[0] === 'autor' && slugParts.length === 2) {
    const author = await findAuthorBySlug(payload, slugParts[1])
    if (!author) return null
    const slug = `autor/${author.slug}`
    return {
      title: `${author.name} | aprendoclub`,
      description: author.bio || undefined,
      alternates: { canonical: `https://aprendoclub.com/${slug}` },
    }
  }
  if (slugParts.length === 1) {
    const cat = await findCategoryBySlug(payload, slugParts[0])
    if (cat) {
      const slug = cat.slug
      return {
        title: `${cat.name} | Blog aprendoclub`,
        description: cat.description || undefined,
        alternates: { canonical: `https://aprendoclub.com/${slug}` },
      }
    }
  }
  if (slugParts.length === 2) {
    const post = await findPostBySlug(payload, slugParts[0], slugParts[1])
    if (post) return buildMetadata(post.meta, `${slugParts[0]}/${post.slug}`)
  }
  return null
}

/** Nodo React de una ruta de blog o null si no es blog. */
async function blogNode(
  payload: Payload,
  slugParts: string[],
  page: number,
): Promise<ReactNode | null> {
  // /autor/{slug}
  if (slugParts[0] === 'autor' && slugParts.length === 2) {
    const author = await findAuthorBySlug(payload, slugParts[1])
    if (!author) return null
    const { docs, totalPages } = await listPostsByAuthor(payload, Number(author.id), page)
    return <AuthorView author={author} posts={docs} page={page} totalPages={totalPages} />
  }
  // /{categoria}
  if (slugParts.length === 1) {
    const cat = await findCategoryBySlug(payload, slugParts[0])
    if (cat) {
      const { docs, totalPages } = await listPostsByCategory(payload, Number(cat.id), page)
      return <CategoryView category={cat} posts={docs} page={page} totalPages={totalPages} />
    }
  }
  // /{categoria}/{slug}
  if (slugParts.length === 2) {
    const post = await findPostBySlug(payload, slugParts[0], slugParts[1])
    if (post) {
      const catId = typeof post.category === 'object' ? Number(post.category.id) : 0
      const related = await relatedPosts(payload, catId, Number(post.id))
      return <BlogPostView post={post} related={related} />
    }
  }
  return null
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')
  if (RESERVED_SLUGS.has(slug)) return {}

  const payload = await getPayload({ config })

  const blogMeta = await blogMetadata(payload, slugParts)
  if (blogMeta) return blogMeta

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return buildMetadata(docs[0]?.meta, slug)
}

export default async function CatchAllPage({
  params,
  searchParams,
}: {
  params: Params
  searchParams: Search
}) {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')

  if (RESERVED_SLUGS.has(slug)) {
    notFound()
  }

  const payload = await getPayload({ config })

  // 1. Blog (autor / categoría / post) — antes que Pages.
  const page = pageParam(await searchParams)
  const blog = await blogNode(payload, slugParts, page)
  if (blog) return blog

  // 2. Pages (page-builder).
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const doc = docs[0]
  if (!doc) {
    // 3. Redirects gestionados (plugin-redirects): la ruta ya no resuelve a
    //    contenido vivo; si hay un redirect, 308 al destino actual.
    const dest = await resolveRedirect(payload, `/${slug}`)
    if (dest && dest !== `/${slug}`) {
      permanentRedirect(dest)
    }
    notFound()
  }

  const graphs = await getGraphsForSlug(slug, payload, doc)

  return (
    <>
      {graphs && <JsonLd data={graphs} />}
      <RenderBlocks blocks={doc.layout ?? []} />
    </>
  )
}
