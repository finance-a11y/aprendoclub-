/**
 * Utilidades sobre el body Lexical de un BlogPost: slug de encabezados (para
 * anclas del TOC), extracción del índice (TOC) y cálculo de reading-time.
 * Todo se computa en el render — no se migra como dato (research payload-03).
 */

type LexNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexNode[]
}

type LexicalBody = { root?: { children?: LexNode[] } } | null | undefined

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

function collectText(node: LexNode): string {
  if (typeof node.text === 'string') return node.text
  if (!node.children) return ''
  return node.children.map(collectText).join('')
}

export type TocItem = { id: string; text: string; level: 2 | 3 }

/** Encabezados h2/h3 del body → items de TOC con id único. */
export function extractToc(body: LexicalBody): TocItem[] {
  const children = body?.root?.children ?? []
  const items: TocItem[] = []
  const seen = new Map<string, number>()

  for (const node of children) {
    if (node.type !== 'heading') continue
    if (node.tag !== 'h2' && node.tag !== 'h3') continue
    const text = collectText(node).trim()
    if (!text) continue
    let id = slugifyHeading(text)
    const n = seen.get(id) ?? 0
    seen.set(id, n + 1)
    if (n > 0) id = `${id}-${n}`
    items.push({ id, text, level: node.tag === 'h2' ? 2 : 3 })
  }
  return items
}

/** Reading-time en minutos (word count / 200 wpm, mínimo 1). */
export function readingTimeMinutes(body: LexicalBody): number {
  const children = body?.root?.children ?? []
  let words = 0
  const walk = (node: LexNode) => {
    if (typeof node.text === 'string') {
      words += node.text.trim().split(/\s+/).filter(Boolean).length
    }
    node.children?.forEach(walk)
  }
  children.forEach(walk)
  return Math.max(1, Math.round(words / 200))
}
