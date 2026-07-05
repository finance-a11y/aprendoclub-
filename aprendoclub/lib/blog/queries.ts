import type { Payload, Where } from 'payload'

import type { Author, Blogpost, Category } from '@/payload-types'

const POSTS_PER_PAGE = 12

type PostList = { docs: Blogpost[]; totalDocs: number; totalPages: number; page: number }

/** Categoría por slug (o null). */
export async function findCategoryBySlug(
  payload: Payload,
  slug: string,
): Promise<Category | null> {
  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  return (docs[0] as Category) ?? null
}

/** Autor por slug (o null). */
export async function findAuthorBySlug(
  payload: Payload,
  slug: string,
): Promise<Author | null> {
  const { docs } = await payload.find({
    collection: 'authors',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return (docs[0] as Author) ?? null
}

/**
 * Post por slug, verificando que su categoría coincida con `categorySlug` (la
 * ruta es /{categoria}/{slug}). Devuelve null si no matchea — así el catch-all
 * cae a la resolución de Pages.
 */
export async function findPostBySlug(
  payload: Payload,
  categorySlug: string,
  slug: string,
): Promise<Blogpost | null> {
  const { docs } = await payload.find({
    collection: 'blogposts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const post = docs[0] as Blogpost | undefined
  if (!post) return null
  const cat = post.category
  const catSlug = typeof cat === 'object' && cat ? cat.slug : undefined
  return catSlug === categorySlug ? post : null
}

export async function listPosts(
  payload: Payload,
  page = 1,
  where: Where = {},
): Promise<PostList> {
  const res = await payload.find({
    collection: 'blogposts',
    where,
    sort: '-publishedAt',
    depth: 2,
    limit: POSTS_PER_PAGE,
    page,
  })
  return {
    docs: res.docs as Blogpost[],
    totalDocs: res.totalDocs,
    totalPages: res.totalPages,
    page: res.page ?? page,
  }
}

export function listPostsByCategory(payload: Payload, categoryId: number, page = 1) {
  return listPosts(payload, page, { category: { equals: categoryId } })
}

export function listPostsByAuthor(payload: Payload, authorId: number, page = 1) {
  return listPosts(payload, page, { author: { equals: authorId } })
}

/** 3 posts recientes de la misma categoría, excluyendo el actual. */
export async function relatedPosts(
  payload: Payload,
  categoryId: number,
  excludeId: number,
): Promise<Blogpost[]> {
  const { docs } = await payload.find({
    collection: 'blogposts',
    where: {
      and: [{ category: { equals: categoryId } }, { id: { not_equals: excludeId } }],
    },
    sort: '-publishedAt',
    depth: 1,
    limit: 3,
  })
  return docs as Blogpost[]
}

export { POSTS_PER_PAGE }
