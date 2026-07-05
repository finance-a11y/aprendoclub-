import Link from 'next/link'

export type Crumb = { name: string; path?: string }

/**
 * Migas de pan visuales del blog. El último item es la página actual (sin
 * enlace). Incluye el espacio superior para librar el navbar fijo, por lo que
 * la cabecera que le sigue no necesita `pt` grande.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Migas de pan"
      className="container-padding mx-auto max-w-6xl pt-28 pb-2"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-400">
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-x-2">
              {it.path && !last ? (
                <Link href={it.path} className="transition-colors hover:text-white">
                  {it.name}
                </Link>
              ) : (
                <span
                  className={last ? 'text-gray-300' : undefined}
                  aria-current={last ? 'page' : undefined}
                >
                  {it.name}
                </span>
              )}
              {!last && (
                <span aria-hidden className="text-gray-600">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
