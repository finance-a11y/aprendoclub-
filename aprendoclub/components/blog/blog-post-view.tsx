import Image from 'next/image'
import Link from 'next/link'

import type { Blogpost } from '@/payload-types'
import { Eyebrow } from '@/components/ui/eyebrow'
import { JsonLd } from '@/components/json-ld'
import { blogPostingGraph } from '@/lib/schema'
import { RichBody } from '@/components/blog/rich-body'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { PostCta } from '@/components/blog/post-cta'
import { PostCard } from '@/components/blog/post-card'
import { extractToc, readingTimeMinutes } from '@/lib/blog/lexical-utils'
import {
  authorOf,
  categoryOf,
  formatDate,
  mediaAlt,
  mediaUrl,
} from '@/lib/blog/format'

/** Vista completa de un artículo: hero, meta, TOC, body, CTA y relacionados. */
export function BlogPostView({
  post,
  related,
}: {
  post: Blogpost
  related: Blogpost[]
}) {
  const cat = categoryOf(post)
  const author = authorOf(post)
  const hero = mediaUrl(post.heroImage)
  const avatar = author ? mediaUrl(author.avatar) : null
  const toc = extractToc(post.body)
  const readingTime = readingTimeMinutes(post.body)

  const graph = blogPostingGraph({
    title: post.title,
    description: post.excerpt ?? undefined,
    path: `/${cat?.slug ?? 'blog'}/${post.slug}`,
    imageUrl: hero ?? undefined,
    authorName: author?.name,
    authorPath: author ? `/autor/${author.slug}` : undefined,
    datePublished: post.publishedAt ?? undefined,
    section: cat?.name,
  })

  return (
    <article className="w-full bg-[var(--bg-primary)] text-white">
      <JsonLd data={graph} />
      {/* Header */}
      <header className="container-padding mx-auto flex max-w-3xl flex-col items-center gap-5 pt-28 pb-10 text-center">
        {cat && (
          <Link href={`/${cat.slug}`}>
            <Eyebrow>{cat.name}</Eyebrow>
          </Link>
        )}
        <h1 className="text-3xl font-semibold leading-[1.15] md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
          {author && (
            <Link href={`/autor/${author.slug}`} className="flex items-center gap-2 hover:text-white">
              {avatar && (
                <Image
                  src={avatar}
                  alt={author.name}
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
              )}
              <span>{author.name}</span>
            </Link>
          )}
          <span aria-hidden>·</span>
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          )}
          <span aria-hidden>·</span>
          <span>{readingTime} min de lectura</span>
        </div>
      </header>

      {/* Hero */}
      {hero && (
        <div className="container-padding mx-auto max-w-4xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={hero}
              alt={mediaAlt(post.heroImage, post.title)}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Body + TOC */}
      <div className="container-padding mx-auto grid max-w-6xl grid-cols-1 gap-12 py-12 lg:grid-cols-[1fr_260px]">
        <div className="order-2 lg:order-1">
          <RichBody data={post.body} />
          <PostCta />
        </div>
        {toc.length >= 2 && (
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-28">
              <TableOfContents items={toc} />
            </div>
          </aside>
        )}
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="container-padding section-spacing mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-semibold">Sigue leyendo</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <PostCard key={r.id} post={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

export default BlogPostView
