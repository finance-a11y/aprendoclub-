import { getPayload } from 'payload'
import { JSDOM } from 'jsdom'
import {
  convertHTMLToLexical,
  editorConfigFactory,
} from '@payloadcms/richtext-lexical'

import config from '../payload.config'
import { rewriteBodyLinks } from './seed/rewrite-links'

/**
 * Migración del blog de aprendoseo.com (Webflow) → colecciones Payload
 * (categories, authors, blogposts). BLG-01/02.
 *
 * Fuente: HTML renderizado (no hay export API). Por cada post se parsea el
 * JSON-LD `BlogPosting` (headline, description, image, author, articleSection),
 * la fecha visible ("Actualizado el"), y el body `.blogtext.w-richtext`
 * (HTML→Lexical vía convertHTMLToLexical). Imágenes hero + avatares se
 * descargan del CDN de Webflow y se re-suben a Media (Vercel Blob).
 *
 * Idempotente: upsert por slug en las 3 colecciones. `payload run` este script.
 * LIMIT=N (env) para procesar solo los primeros N posts (spike).
 *
 * Limitación conocida: imágenes/embeds inline del cuerpo (Kajabi, iframes) se
 * omiten en la conversión Lexical; el CTA del post se agrega en el render
 * (18-03). El hero image sí se preserva.
 */

const SITE = 'https://www.aprendoseo.com'
const CATS = ['seo-basico', 'seo-onpage', 'seo-tecnico', 'herramientas-seo', 'empieza-en-seo']
const LIMIT = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : Infinity

const CATEGORY_META: Record<string, { name: string; description: string }> = {
  'seo-basico': {
    name: 'SEO Básico',
    description:
      'Los fundamentos del SEO explicados sin tecnicismos. Empieza por acá si quieres entender cómo funciona Google y dar tus primeros pasos para posicionar un sitio.',
  },
  'seo-onpage': {
    name: 'SEO On-Page',
    description:
      'Todo lo que ocurre dentro de tus páginas: contenido, encabezados, enlazado interno y las señales que le dicen a Google de qué trata cada URL.',
  },
  'seo-tecnico': {
    name: 'SEO Técnico',
    description:
      'La cocina del sitio: rastreo, indexación, velocidad y estructura. Lo que hace que los buscadores puedan leer y entender tu web sin tropiezos.',
  },
  'herramientas-seo': {
    name: 'Herramientas SEO',
    description:
      'Reseñas y guías prácticas de las herramientas que usamos a diario para investigar palabras clave, auditar sitios y medir resultados.',
  },
  'empieza-en-seo': {
    name: 'Empieza en SEO',
    description:
      'Guías para arrancar tu carrera en SEO: cómo aprender, qué habilidades priorizar y cómo conseguir tus primeros clientes o tu primer empleo.',
  },
}

type PostMeta = {
  url: string
  slug: string
  categorySlug: string
  title: string
  metaDescription: string
  imageUrl?: string
  authorSlug: string
  authorName: string
  authorRole: string
  publishedAt?: string
  bodyHtml: string
}

function absolutize(u: string | undefined | null): string | undefined {
  if (!u) return undefined
  if (u.startsWith('http')) return u
  return u.startsWith('/') ? SITE + u : undefined
}

function parseDate(text?: string | null): string | undefined {
  if (!text) return undefined
  const d = new Date(text.trim())
  return isNaN(d.getTime()) ? undefined : d.toISOString()
}

/** Descarga una imagen y la sube a Media (idempotente por filename). */
async function uploadImage(
  payload: any,
  url: string | undefined,
  alt: string,
): Promise<number | undefined> {
  if (!url) return undefined
  try {
    const clean = decodeURIComponent(new URL(url).pathname.split('/').pop() || 'img')
    // Webflow: `{hash}_{título}.avif` — el hash único va al INICIO, así que
    // recortamos por el final (slice 0,120) para no perder unicidad.
    const sanitized = clean.replace(/[^\w.\-]/g, '_')
    const ext = (sanitized.match(/\.[a-z0-9]+$/i) || [''])[0]
    const filename = sanitized.length > 120 ? sanitized.slice(0, 116) + ext : sanitized
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
    })
    if (existing.docs.length > 0) return Number(existing.docs[0].id)

    const res = await fetch(url)
    if (!res.ok) {
      console.warn(`[img] ${res.status} ${url}`)
      return undefined
    }
    const buf = Buffer.from(await res.arrayBuffer())
    const mimetype = res.headers.get('content-type') || 'image/avif'
    const created = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data: buf, mimetype, name: filename, size: buf.length },
    })
    return Number(created.id)
  } catch (e) {
    console.warn(`[img] error ${url}:`, (e as Error).message)
    return undefined
  }
}

function ldGraph(doc: Document): any[] {
  const out: any[] = []
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const j = JSON.parse(s.textContent || '')
      if (Array.isArray(j)) out.push(...j)
      else if (j['@graph']) out.push(...j['@graph'])
      else out.push(j)
    } catch {
      /* ignore */
    }
  }
  return out
}

async function fetchPost(url: string): Promise<PostMeta | null> {
  const res = await fetch(url)
  if (!res.ok) {
    console.warn(`[post] ${res.status} ${url}`)
    return null
  }
  const html = await res.text()
  const dom = new JSDOM(html)
  const doc = dom.window.document

  const bp = ldGraph(doc).find((x) => x['@type'] === 'BlogPosting')
  const pathParts = new URL(url).pathname.split('/').filter(Boolean)
  const categorySlug = pathParts[0]
  const slug = pathParts[1]

  const authorUrl: string =
    bp?.author?.url ||
    doc.querySelector('a[href^="/autor/"]')?.getAttribute('href') ||
    ''
  const authorSlug = authorUrl.split('/autor/')[1]?.replace(/\/$/, '') || ''
  const authorName = (bp?.author?.name || '').trim()
  const authorRole = (bp?.author?.jobTitle || '').trim().replace(/\s+aprendoseo\s*$/i, '')

  const bodyEl =
    doc.querySelector('.blogtext.w-richtext') || doc.querySelector('.w-richtext')
  if (!bodyEl) {
    console.warn(`[post] sin body: ${url}`)
    return null
  }
  // Limpiar embeds Kajabi, scripts, iframes, TOC vacío, estilos e imágenes
  // inline (los <img>/<figure> generarían nodos upload sin relación válida en
  // Lexical → validación fallida; el hero image sí se preserva aparte).
  bodyEl
    .querySelectorAll(
      '.w-embed, .w-script, script, iframe, style, #toc, .toc-container, noscript, img, figure, picture',
    )
    .forEach((n) => n.remove())

  return {
    url,
    slug,
    categorySlug,
    title: (bp?.headline || doc.querySelector('h1')?.textContent || slug).trim(),
    metaDescription: (bp?.description || '').trim(),
    imageUrl: absolutize(bp?.image?.url || bp?.image),
    authorSlug,
    authorName,
    authorRole,
    publishedAt: parseDate(doc.querySelector('.articledatedata')?.textContent),
    bodyHtml: bodyEl.innerHTML,
  }
}

/** Scrapea avatar + bio de la página /autor/{slug} (ya no hay Person JSON-LD). */
async function fetchAuthorExtras(
  slug: string,
): Promise<{ bio: string; imageUrl?: string }> {
  const url = `${SITE}/autor/${slug}`
  const res = await fetch(url)
  if (!res.ok) return { bio: '' }
  const doc = new JSDOM(await res.text()).window.document
  const person = ldGraph(doc).find((x) => x['@type'] === 'Person')

  // Avatar: og:image o el primer <img> con "autor"/"author"/CDN en el src.
  let imageUrl =
    person?.image?.url ||
    person?.image ||
    doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
    undefined
  if (!imageUrl) {
    const img = [...doc.querySelectorAll('img')].find((i) =>
      /website-files\.com/.test(i.getAttribute('src') || ''),
    )
    imageUrl = img?.getAttribute('src') || undefined
  }

  // Bio: JSON-LD description, o el párrafo más largo del contenido de autor.
  let bio = (person?.description || '').trim()
  if (!bio) {
    const ps = [...doc.querySelectorAll('p')]
      .map((p) => p.textContent?.trim() || '')
      .filter((t) => t.length > 60)
    bio = ps.sort((a, b) => b.length - a.length)[0] || ''
  }
  return { bio, imageUrl: absolutize(imageUrl) }
}

async function run() {
  const payload = await getPayload({ config })
  const editorConfig = await editorConfigFactory.default({ config: payload.config })

  // 1. Enumerar posts del sitemap.
  const sm = await (await fetch(`${SITE}/sitemap.xml`)).text()
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  let blogUrls = urls.filter((u) => {
    const p = new URL(u).pathname.split('/').filter(Boolean)
    return p.length === 2 && CATS.includes(p[0])
  })
  if (LIMIT !== Infinity) blogUrls = blogUrls.slice(0, LIMIT)
  console.log(`[blog] ${blogUrls.length} posts a migrar`)

  // 2. Parsear todos los posts.
  const posts: PostMeta[] = []
  for (const url of blogUrls) {
    const p = await fetchPost(url)
    if (p) posts.push(p)
  }

  // 3. Categorías (upsert por slug).
  const catId = new Map<string, number>()
  const usedCats = new Set(posts.map((p) => p.categorySlug))
  for (const slug of usedCats) {
    const meta = CATEGORY_META[slug] || { name: slug, description: '' }
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.docs.length) {
      const doc = await payload.update({
        collection: 'categories',
        id: existing.docs[0].id,
        data: meta,
        context: { disableRevalidate: true },
      })
      catId.set(slug, Number(doc.id))
    } else {
      const doc = await payload.create({
        collection: 'categories',
        data: { slug, ...meta },
        context: { disableRevalidate: true },
      })
      catId.set(slug, Number(doc.id))
    }
  }
  console.log(`[blog] categorías: ${catId.size}`)

  // 4. Autores (upsert por slug). Nombre/rol vienen del JSON-LD de los posts;
  // avatar/bio se scrapean de la página /autor/{slug}.
  const authorId = new Map<string, number>()
  const authorMeta = new Map<string, { name: string; role: string }>()
  for (const p of posts) {
    if (p.authorSlug && !authorMeta.has(p.authorSlug)) {
      authorMeta.set(p.authorSlug, { name: p.authorName || p.authorSlug, role: p.authorRole })
    }
  }
  for (const [slug, meta] of authorMeta) {
    const extras = await fetchAuthorExtras(slug)
    const avatarId = await uploadImage(payload, extras.imageUrl, `Foto de ${meta.name}`)
    const data: any = { name: meta.name, role: meta.role, bio: extras.bio }
    if (avatarId) data.avatar = avatarId
    const existing = await payload.find({
      collection: 'authors',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.docs.length) {
      const doc = await payload.update({
        collection: 'authors',
        id: existing.docs[0].id,
        data,
        context: { disableRevalidate: true },
      })
      authorId.set(slug, Number(doc.id))
    } else {
      const doc = await payload.create({
        collection: 'authors',
        data: { slug, ...data },
        context: { disableRevalidate: true },
      })
      authorId.set(slug, Number(doc.id))
    }
  }
  console.log(`[blog] autores: ${authorId.size}`)

  // 5. Posts (upsert por slug).
  let ok = 0
  let fail = 0
  for (const p of posts) {
    try {
      const category = catId.get(p.categorySlug)
      const author = authorId.get(p.authorSlug)
      if (!category || !author) {
        console.warn(`[post] rel faltante ${p.slug} (cat=${category} author=${author})`)
        fail++
        continue
      }
      const heroImage = await uploadImage(payload, p.imageUrl, p.title)
      const body = convertHTMLToLexical({ editorConfig, html: p.bodyHtml, JSDOM })

      const data: any = {
        title: p.title,
        excerpt: p.metaDescription,
        category,
        author,
        publishedAt: p.publishedAt,
        body,
        // seoPlugin meta group: title + description editables desde la pestaña SEO.
        meta: { title: p.title, description: p.metaDescription },
      }
      if (heroImage) {
        data.heroImage = heroImage
        data.meta.image = heroImage
      }

      const existing = await payload.find({
        collection: 'blogposts',
        where: { slug: { equals: p.slug } },
        limit: 1,
      })
      if (existing.docs.length) {
        await payload.update({
          collection: 'blogposts',
          id: existing.docs[0].id,
          data,
          context: { disableRevalidate: true },
        })
      } else {
        await payload.create({
          collection: 'blogposts',
          data: { slug: p.slug, ...data },
          context: { disableRevalidate: true },
        })
      }
      ok++
      console.log(`[post] ✓ ${p.categorySlug}/${p.slug}`)
    } catch (e) {
      fail++
      console.warn(`[post] ✗ ${p.slug}:`, (e as Error).message)
    }
  }

  // 6. Reescribir links internos aprendoseo.com → rutas de aprendoclub.
  const all = await payload.find({ collection: 'blogposts', depth: 1, limit: 1000 })
  const slugToPath = new Map<string, number | string>()
  for (const post of all.docs as any[]) {
    const c = typeof post.category === 'object' ? post.category?.slug : null
    if (c) slugToPath.set(post.slug, `/${c}/${post.slug}`)
  }
  let relinked = 0
  for (const post of all.docs as any[]) {
    const n = rewriteBodyLinks(post.body, slugToPath as Map<string, string>)
    if (n > 0) {
      await payload.update({
        collection: 'blogposts',
        id: post.id,
        data: { body: post.body },
        context: { disableRevalidate: true },
      })
      relinked += n
    }
  }

  console.log(`\n[blog] LISTO — posts ok=${ok} fail=${fail}, categorías=${catId.size}, autores=${authorId.size}, links reescritos=${relinked}`)
  process.exit(0)
}

await run()
