import Link from 'next/link'

import type { Blogpost } from '@/payload-types'
import { PostCard } from '@/components/blog/post-card'

/** Grid de tarjetas + paginación simple (prev/next) sobre `basePath`. */
export function PostGrid({
  posts,
  page,
  totalPages,
  basePath,
}: {
  posts: Blogpost[]
  page: number
  totalPages: number
  basePath: string
}) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-400">Todavía no hay artículos por aquí.</p>
    )
  }

  const pageHref = (p: number) => (p <= 1 ? basePath : `${basePath}?page=${p}`)

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} headingLevel="h2" />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-4 text-sm" aria-label="Paginación">
          {page > 1 && (
            <Link
              href={pageHref(page - 1)}
              className="rounded-full border border-white/15 px-5 py-2 text-white transition-colors hover:border-white/40"
            >
              ← Anterior
            </Link>
          )}
          <span className="text-gray-400">
            Página {page} de {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={pageHref(page + 1)}
              className="rounded-full border border-white/15 px-5 py-2 text-white transition-colors hover:border-white/40"
            >
              Siguiente →
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}

export default PostGrid
