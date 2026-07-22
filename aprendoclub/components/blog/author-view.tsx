import Image from 'next/image'

import type { Author, Blogpost } from '@/payload-types'
import { Eyebrow } from '@/components/ui/eyebrow'
import { JsonLd } from '@/components/json-ld'
import { authorGraph } from '@/lib/schema'
import { PostGrid } from '@/components/blog/post-grid'
import { AuthorSocials } from '@/components/blog/author-socials'
import { mediaUrl, postHref } from '@/lib/blog/format'

/** Página de autor: bio + grid paginado de sus posts. */
export function AuthorView({
  author,
  posts,
  page,
  totalPages,
}: {
  author: Author
  posts: Blogpost[]
  page: number
  totalPages: number
}) {
  const avatar = mediaUrl(author.avatar)

  const sameAs = (author.socials ?? [])
    .map((s) => s.url)
    .filter((u): u is string => typeof u === 'string' && /^https?:\/\//.test(u))

  const graph = authorGraph({
    name: author.name,
    path: `/autor/${author.slug}`,
    role: author.role ?? undefined,
    bio: author.bio ?? undefined,
    imageUrl: avatar ?? undefined,
    sameAs,
    posts: posts.map((p) => ({ name: p.title, path: postHref(p) })),
  })

  return (
    <div className="w-full bg-[var(--bg-primary)] text-white">
      <JsonLd data={graph} />
      <header className="container-padding mx-auto flex max-w-3xl flex-col items-center gap-5 pt-28 pb-12 text-center">
        <Eyebrow>Autor</Eyebrow>
        {avatar && (
          <Image
            src={avatar}
            alt={author.name}
            width={96}
            height={96}
            className="rounded-full object-cover"
            unoptimized
          />
        )}
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
          {author.name}
        </h1>
        {author.role && <p className="text-[var(--accent)]">{author.role}</p>}
        {author.bio && (
          <p className="max-w-2xl text-base leading-relaxed text-gray-400">
            {author.bio}
          </p>
        )}
        <AuthorSocials socials={author.socials} />
      </header>
      <div className="container-padding section-spacing mx-auto max-w-6xl">
        <PostGrid
          posts={posts}
          page={page}
          totalPages={totalPages}
          basePath={`/autor/${author.slug}`}
        />
      </div>
    </div>
  )
}

export default AuthorView
