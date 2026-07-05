/**
 * Reescribe los links internos del body Lexical de los BlogPosts: cualquier URL
 * a aprendoseo.com se convierte en una ruta interna de aprendoclub.
 *
 * Reglas (en orden):
 *  1. El último segmento matchea un slug de post migrado → /{categoria}/{slug}
 *     (corrige mismatches de categoría entre aprendoseo y aprendoclub).
 *  2. /autor/{slug} → ruta relativa igual.
 *  3. Contiene 'diplomado' → /diplomado.
 *  4. Contiene 'seo-con-ia' | 'curso-seo-con-ia' | 'taller' → /programas/taller-seo-con-ia.
 *  5. Resto (contenido sin equivalente en aprendoclub) → /blog (fallback seguro).
 *
 * Devuelve el número de links reescritos. Idempotente: re-correrlo no cambia
 * nada (las URLs ya son internas y no matchean /aprendoseo\.com/).
 */

// Cualquier host *.aprendoseo.com (incluye subdominios como diplomado.) con
// path opcional.
const APRENDOSEO = /(?:https?:)?\/\/((?:[a-z0-9-]+\.)*aprendoseo\.com)(?:\/(.*))?$/i

export function rewriteBodyLinks(
  body: unknown,
  slugToPath: Map<string, string>,
): number {
  let count = 0

  const resolve = (url: string): string | null => {
    const m = url.match(APRENDOSEO)
    if (!m) return null
    const host = m[1].toLowerCase()
    const path = (m[2] ?? '').replace(/[?#].*$/, '').replace(/\/+$/, '')
    const last = path.split('/').pop() || ''

    // Subdominio diplomado. (app Kajabi) → página del diplomado.
    if (/^diplomado\./.test(host)) return '/diplomado'
    // Dominio pelado sin ruta → home.
    if (!path) return '/'

    if (slugToPath.has(last)) return slugToPath.get(last)!
    if (path.startsWith('autor/')) return `/${path}`
    if (/diplomado/.test(path)) return '/diplomado'
    if (/seo-con-ia|curso-seo-con-ia|taller/.test(path)) {
      return '/programas/taller-seo-con-ia'
    }
    return '/blog'
  }

  const walk = (node: any) => {
    if (node && (node.type === 'link' || node.type === 'autolink')) {
      const url: string = node.fields?.url ?? node.url ?? ''
      const next = resolve(url)
      if (next) {
        if (node.fields) {
          node.fields.url = next
          node.fields.newTab = false
        } else {
          node.url = next
        }
        count++
      }
    }
    node?.children?.forEach(walk)
  }

  ;(body as any)?.root?.children?.forEach(walk)
  return count
}
