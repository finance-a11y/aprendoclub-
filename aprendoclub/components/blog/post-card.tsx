import Image from 'next/image'
import Link from 'next/link'

import type { Blogpost } from '@/payload-types'
import { Eyebrow } from '@/components/ui/eyebrow'
import {
  authorOf,
  categoryOf,
  formatDate,
  mediaAlt,
  mediaUrl,
  postHref,
} from '@/lib/blog/format'

/**
 * Tarjeta de post para listados. `headingLevel` mantiene la jerarquía correcta:
 * h2 en grids que cuelgan directo del h1 de la página (índice/categoría/autor),
 * h3 en la sección "Sigue leyendo" (que ya tiene su propio h2).
 */
export function PostCard({
  post,
  headingLevel = 'h3',
}: {
  post: Blogpost
  headingLevel?: 'h2' | 'h3'
}) {
  const cat = categoryOf(post)
  const author = authorOf(post)
  const hero = mediaUrl(post.heroImage)
  const Heading = headingLevel

  return (
    <Link
      href={postHref(post)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--bg-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--bg-primary)]">
        {hero ? (
          <Image
            src={hero}
            alt={mediaAlt(post.heroImage, post.title)}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/10">
            <span className="text-4xl font-semibold text-white/20">aprendo</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        {cat && <Eyebrow>{cat.name}</Eyebrow>}
        <Heading className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-white/80">
          {post.title}
        </Heading>
        {post.excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-400">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-gray-500">
          {author && <span>{author.name}</span>}
          {author && post.publishedAt && <span aria-hidden>·</span>}
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
        </div>
      </div>
    </Link>
  )
}

export default PostCard
