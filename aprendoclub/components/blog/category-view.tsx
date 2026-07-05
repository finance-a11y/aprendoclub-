import type { Blogpost, Category } from '@/payload-types'
import { Eyebrow } from '@/components/ui/eyebrow'
import { JsonLd } from '@/components/json-ld'
import { blogListGraph, breadcrumbGraph } from '@/lib/schema'
import { Breadcrumbs, type Crumb } from '@/components/blog/breadcrumbs'
import { PostGrid } from '@/components/blog/post-grid'
import { postHref } from '@/lib/blog/format'

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
  const graph = blogListGraph({
    name: `${category.name} | Blog aprendoclub`,
    path: `/${category.slug}`,
    description: category.description ?? undefined,
    items: posts.map((p) => ({ name: p.title, path: postHref(p) })),
  })

  const crumbs: Crumb[] = [
    { name: 'Inicio', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: category.name },
  ]

  return (
    <div className="w-full bg-[var(--bg-primary)] text-white">
      <JsonLd data={[graph, breadcrumbGraph(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <header className="container-padding mx-auto flex max-w-3xl flex-col items-center gap-4 pt-6 pb-12 text-center">
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
