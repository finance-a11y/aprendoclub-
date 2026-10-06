/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichText } from '@payloadcms/richtext-lexical/react'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { slugifyHeading } from '@/lib/blog/lexical-utils'

/**
 * Normaliza enlaces para asegurar que enlaces internos o que apunten a
 * aprendoseo.com / aprendoclub.com se sirvan con rutas relativas para SPA de Next.js.
 */
function cleanLinkHref(rawUrl: string): { href: string; isInternal: boolean } {
  let url = (rawUrl || '').trim()

  // Si apunta a aprendoseo.com, remover el dominio para dejar la ruta limpia
  if (/^https?:\/\/(?:[a-z0-9-]+\.)*aprendoseo\.com/i.test(url)) {
    try {
      const u = new URL(url)
      url = u.pathname + u.search + u.hash
    } catch {
      // ignore
    }
  }

  // Si apunta a aprendoclub.com, convertirlo a relativo para navegación SPA de Next.js
  if (/^https?:\/\/(?:[a-z0-9-]+\.)*aprendoclub\.com/i.test(url)) {
    try {
      const u = new URL(url)
      url = u.pathname + u.search + u.hash
    } catch {
      // ignore
    }
  }

  const isInternal = url.startsWith('/') || url.startsWith('#')
  return { href: url, isInternal }
}

function headingText(node: any): string {
  const collect = (n: any): string => {
    if (typeof n?.text === 'string') return n.text
    if (!Array.isArray(n?.children)) return ''
    return n.children.map(collect).join('')
  }
  return collect(node)
}

/**
 * Índice (entre bloques top-level) donde insertar un elemento a ~1/3 del
 * contenido, sin dejar un encabezado huérfano justo antes del corte.
 */
function thirdSplitIndex(children: any[]): number {
  const n = children.length
  let i = Math.max(1, Math.round(n / 3))
  while (i < n && children[i - 1]?.type === 'heading') i++
  return Math.min(i, n)
}

export function RichBody({
  data,
  midContent,
}: {
  data: unknown
  /** Se renderiza a ~1/3 del contenido (ej. video incrustado). */
  midContent?: ReactNode
}) {
  const seen = new Map<string, number>()
  const root = (data as any)?.root
  const blocks: any[] = Array.isArray(root?.children) ? root.children : []
  const split = midContent && blocks.length > 0 ? thirdSplitIndex(blocks) : null
  const parts: any[] =
    split === null
      ? [data]
      : [
          { ...(data as any), root: { ...root, children: blocks.slice(0, split) } },
          { ...(data as any), root: { ...root, children: blocks.slice(split) } },
        ]
  const converters = (({ defaultConverters }: any) => ({
          ...defaultConverters,
          heading: ({ node, nodesToJSX }: any) => {
            const children = nodesToJSX({ nodes: node.children ?? [] })
            const Tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
            if (Tag !== 'h2' && Tag !== 'h3') {
              return <Tag>{children}</Tag>
            }
            let id = slugifyHeading(headingText(node))
            const n = seen.get(id) ?? 0
            seen.set(id, n + 1)
            if (n > 0) id = `${id}-${n}`
            return (
              <Tag id={id} className="scroll-mt-28">
                {children}
              </Tag>
            )
          },
          link: ({ node, nodesToJSX }: any) => {
            const children = nodesToJSX({ nodes: node.children ?? [] })
            const rawUrl = node.fields?.url ?? node.url ?? ''
            const { href, isInternal } = cleanLinkHref(rawUrl)
            if (!href) return <>{children}</>

            if (isInternal) {
              return (
                <Link
                  href={href}
                  className="text-[var(--accent)] underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
                >
                  {children}
                </Link>
              )
            }

            return (
              <a
                href={href}
                target={node.fields?.newTab ? '_blank' : undefined}
                rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
                className="text-[var(--accent)] underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
              >
                {children}
              </a>
            )
          },
          autolink: ({ node, nodesToJSX }: any) => {
            const children = nodesToJSX({ nodes: node.children ?? [] })
            const rawUrl = node.fields?.url ?? node.url ?? ''
            const { href, isInternal } = cleanLinkHref(rawUrl)
            if (!href) return <>{children}</>

            if (isInternal) {
              return (
                <Link
                  href={href}
                  className="text-[var(--accent)] underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
                >
                  {children}
                </Link>
              )
            }

            return (
              <a
                href={href}
                target={node.fields?.newTab ? '_blank' : undefined}
                rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
                className="text-[var(--accent)] underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
              >
                {children}
              </a>
            )
          },
          upload: ({ node }: any) => {
            const doc = typeof node?.value === 'object' ? node.value : null
            const url = doc?.url || (typeof node?.value === 'string' ? node.value : '')
            const alt = node?.fields?.alt || doc?.alt || ''
            if (!url) return null
            return (
              <figure className="my-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                <img
                  src={url}
                  alt={alt}
                  className="w-full h-auto object-cover rounded-xl"
                  loading="lazy"
                />
                {alt ? (
                  <figcaption className="p-2.5 text-center text-xs text-gray-400">
                    {alt}
                  </figcaption>
                ) : null}
              </figure>
            )
          },
        })) as any
  return (
    <div className="measure-prose blog-prose text-gray-300 leading-relaxed">
      {parts.map((part, i) => (
        <div key={i} className="contents">
          {i === 1 && <div className="my-10">{midContent}</div>}
          {(i === 0 || part.root.children.length > 0) && (
            <RichText data={part} converters={converters} />
          )}
        </div>
      ))}
    </div>
  )
}

export default RichBody
