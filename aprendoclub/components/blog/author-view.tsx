import Image from 'next/image'

import type { Author, Blogpost } from '@/payload-types'
import { Eyebrow } from '@/components/ui/eyebrow'
import { PostGrid } from '@/components/blog/post-grid'
import { mediaUrl } from '@/lib/blog/format'

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

  return (
    <div className="w-full bg-[var(--bg-primary)] text-white">
      <header className="container-padding mx-auto flex max-w-3xl flex-col items-center gap-5 pt-28 pb-12 text-center">
        <Eyebrow>Autor</Eyebrow>
        {avatar && (
          <Image
            src={avatar}
            alt={author.name}
            width={96}
            height={96}
            className="rounded-full object-cover"
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
