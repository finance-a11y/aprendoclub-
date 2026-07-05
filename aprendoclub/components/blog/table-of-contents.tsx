import type { TocItem } from '@/lib/blog/lexical-utils'

/** Índice del artículo (anclas a los h2/h3). Server component. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null

  return (
    <nav aria-label="Contenido del artículo" className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
        En este artículo
      </p>
      <ul className="flex flex-col gap-2 border-l border-white/10 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-8' : 'pl-4'}>
            <a
              href={`#${item.id}`}
              className="text-gray-400 transition-colors hover:text-white"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents
