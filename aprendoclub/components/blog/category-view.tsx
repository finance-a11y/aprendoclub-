import type { Blogpost, Category } from '@/payload-types'
import { Eyebrow } from '@/components/ui/eyebrow'
import { PostGrid } from '@/components/blog/post-grid'

/** Índice de una categoría: cabecera + grid paginado de sus posts. */
export function CategoryView({
  category,
  posts,
  page,
  totalPages,
}: {
  category: Category
  posts: Blogpost[]
  page: number
  totalPages: number
}) {
  return (
    <div className="w-full bg-[var(--bg-primary)] text-white">
      <header className="container-padding mx-auto flex max-w-3xl flex-col items-center gap-4 pt-28 pb-12 text-center">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="max-w-2xl text-lg text-gray-400">{category.description}</p>
        )}
      </header>
      <div className="container-padding section-spacing mx-auto max-w-6xl">
        <PostGrid
          posts={posts}
          page={page}
          totalPages={totalPages}
          basePath={`/${category.slug}`}
        />
      </div>
    </div>
  )
}

export default CategoryView
