/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichText } from '@payloadcms/richtext-lexical/react'

import { slugifyHeading } from '@/lib/blog/lexical-utils'

/**
 * Render del body Lexical de un BlogPost con anclas en los encabezados h2/h3
 * (para el TOC). Reusa los converters por defecto y sólo sobrescribe `heading`
 * para inyectar un `id` slugificado. Estilado con `.measure-prose` + `.blog-prose`.
 *
 * Tipado laxo (any) en los converters: la firma genérica de JSXConvertersFunction
 * es intratable acá, pero la API en runtime provee `node` + `nodesToJSX`.
 */

function headingText(node: any): string {
  const collect = (n: any): string => {
    if (typeof n?.text === 'string') return n.text
    if (!Array.isArray(n?.children)) return ''
    return n.children.map(collect).join('')
  }
  return collect(node)
}

export function RichBody({ data }: { data: unknown }) {
  const seen = new Map<string, number>()
  return (
    <div className="measure-prose blog-prose text-gray-300 leading-relaxed">
      <RichText
        data={data as any}
        converters={(({ defaultConverters }: any) => ({
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
        })) as any}
      />
    </div>
  )
}

export default RichBody
