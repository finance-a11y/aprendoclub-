import Link from 'next/link'
import type { RelatedLinksBlock as RelatedLinksBlockType } from '@/payload-types'

/**
 * Render de 'relatedLinks': title + array de links.
 * Espeja components/related-links.tsx.
 */
export function RelatedLinks({ block }: { block: RelatedLinksBlockType }) {
  const links = block.links ?? []
  if (links.length === 0) return null

  return (
    <section className="container-padding section-spacing max-w-6xl mx-auto w-full">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          {block.title ?? 'Sigue explorando'}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link, i) => (
            <Link
              key={link.id ?? i}
              href={link.href}
              className="text-gray-300 underline underline-offset-4 decoration-white/30 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedLinks
