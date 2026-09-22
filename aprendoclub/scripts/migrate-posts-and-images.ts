import { getPayload } from 'payload'
import { JSDOM } from 'jsdom'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import config from '../payload.config'

const WEBFLOW_ORIGIN = 'https://aprendo-seo.webflow.io'

interface PostToMigrate {
  url: string
  slug: string
  categorySlug: string
  fallbackTitle: string
}

const NEW_POSTS_TO_MIGRATE: PostToMigrate[] = [
  {
    url: `${WEBFLOW_ORIGIN}/seo-cursos/mejores-certificaciones-meta-ads`,
    slug: 'mejores-certificaciones-meta-ads',
    categorySlug: 'seo-cursos',
    fallbackTitle: 'Las Mejores Certificaciones Meta Ads en 2026: Ranking Honesto de las 5 Opciones que Importan',
  },
  {
    url: `${WEBFLOW_ORIGIN}/seo-cursos/mejores-cursos-seo`,
    slug: 'mejores-cursos-seo',
    categorySlug: 'seo-cursos',
    fallbackTitle: '10 mejores cursos SEO en 2025 para profesionales y principiantes',
  },
  {
    url: `${WEBFLOW_ORIGIN}/aprender-seo/cuanto-gana-un-seo`,
    slug: 'cuanto-gana-un-seo',
    categorySlug: 'empieza-en-seo',
    fallbackTitle: '¿Cuánto gana un SEO en 2026? Guía de salarios',
  },
  {
    url: `${WEBFLOW_ORIGIN}/aprender-seo/funcion-especialista-seo`,
    slug: 'funcion-especialista-seo',
    categorySlug: 'empieza-en-seo',
    fallbackTitle: '¿Cuál es la función de un especialista SEO?',
  },
  {
    url: `${WEBFLOW_ORIGIN}/aprender-seo/trabajar-como-seo`,
    slug: 'trabajar-como-seo',
    categorySlug: 'empieza-en-seo',
    fallbackTitle: 'Trabajar como SEO: Conoce cómo convertirte en un especialista SEO',
  },
]

async function uploadImage(payload: any, url: string, alt: string): Promise<number | undefined> {
  if (!url) return undefined
  try {
    const clean = decodeURIComponent(new URL(url).pathname.split('/').pop() || 'img')
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
      console.warn(`[img] fetch failed ${res.status} ${url}`)
      return undefined
    }
    const buf = Buffer.from(await res.arrayBuffer())
    const mimetype = res.headers.get('content-type') || 'image/avif'
    const created = await payload.create({
      collection: 'media',
      data: { alt: alt || 'Imagen de contenido' },
      file: { data: buf, mimetype, name: filename, size: buf.length },
    })
    return Number(created.id)
  } catch (e: any) {
    console.warn(`[img] error ${url}:`, e.message)
    return undefined
  }
}

function resolveUploadNodes(node: any, uploads: { node: any; src: string; alt: string }[]) {
  if (!node) return
  if (node.type === 'upload' && node.pending?.src) {
    uploads.push({
      node,
      src: node.pending.src,
      alt: node.fields?.alt || '',
    })
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      resolveUploadNodes(child, uploads)
    }
  }
}

async function run() {
  const payload = await getPayload({ config })
  const editorConfig = await (editorConfigFactory as any).default({ config: payload.config })

  console.log('=== 1. Creando/asegurando Categoría "seo-cursos" ===')
  const existingCat = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'seo-cursos' } },
    limit: 1,
  })

  let seoCursosCatId: number
  if (existingCat.docs.length > 0) {
    seoCursosCatId = Number(existingCat.docs[0].id)
    console.log('Categoría seo-cursos ya existe con ID:', seoCursosCatId)
  } else {
    const created = await payload.create({
      collection: 'categories',
      data: {
        name: 'Cursos SEO',
        slug: 'seo-cursos',
        description:
          'Comparativas, guías y análisis detallados de los mejores cursos y certificaciones de SEO y marketing digital.',
      },
      context: { disableRevalidate: true },
    })
    seoCursosCatId = Number(created.id)
    console.log('Categoría seo-cursos CREADA con ID:', seoCursosCatId)
  }

  // Obtener categorías y autores necesarios
  const categoriesRes = await payload.find({ collection: 'categories', limit: 50 })
  const catMap = new Map<string, number>()
  categoriesRes.docs.forEach((c) => catMap.set(c.slug, Number(c.id)))

  const authorsRes = await payload.find({ collection: 'authors', limit: 50 })
  const authorMap = new Map<string, number>()
  authorsRes.docs.forEach((a) => authorMap.set(a.slug, Number(a.id)))

  const ariannaId = authorMap.get('arianna-lupi')
  if (!ariannaId) {
    console.error('No se encontró al autor arianna-lupi!')
    process.exit(1)
  }

  console.log('\n=== 2. Migrando los 5 posts nuevos ===')
  for (const item of NEW_POSTS_TO_MIGRATE) {
    const existing = await payload.find({
      collection: 'blogposts',
      where: { slug: { equals: item.slug } },
      limit: 1,
    })

    const targetCatId = catMap.get(item.categorySlug)
    if (!targetCatId) {
      console.error(`Categoría ${item.categorySlug} no encontrada para ${item.slug}`)
      continue
    }

    // Scrapear post desde Webflow
    console.log(`Scrapeando ${item.url}...`)
    const res = await fetch(item.url)
    if (!res.ok) {
      console.error(`Error al scrapear ${item.url}: status ${res.status}`)
      continue
    }
    const html = await res.text()
    const dom = new JSDOM(html)
    const doc = dom.window.document

    const title = (doc.querySelector('h1')?.textContent || item.fallbackTitle).trim()
    const metaDescription = (
      doc.querySelector('meta[name="description"]')?.getAttribute('content') || ''
    ).trim()
    const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || ''
    const dateText = doc.querySelector('.articledatedata')?.textContent?.trim()
    const publishedAt = dateText ? new Date(dateText).toISOString() : new Date().toISOString()

    const heroImageId = await uploadImage(payload, ogImage, title)

    const bodyEl = doc.querySelector('.blogtext.w-richtext') || doc.querySelector('.w-richtext')
    let lexicalBody: any = null
    if (bodyEl) {
      bodyEl
        .querySelectorAll('.w-embed, .w-script, script, iframe, style, #toc, .toc-container, noscript')
        .forEach((n) => n.remove())
      lexicalBody = convertHTMLToLexical({ editorConfig, html: bodyEl.innerHTML, JSDOM })

      const uploads: { node: any; src: string; alt: string }[] = []
      resolveUploadNodes(lexicalBody.root, uploads)
      for (const up of uploads) {
        const mediaId = await uploadImage(payload, up.src, up.alt)
        if (mediaId) {
          delete up.node.pending
          up.node.relationTo = 'media'
          up.node.value = mediaId
          up.node.fields = { alt: up.alt }
        }
      }
    }

    const postData: any = {
      title,
      slug: item.slug,
      excerpt: metaDescription,
      category: targetCatId,
      author: ariannaId,
      publishedAt,
      body: lexicalBody,
      meta: {
        title,
        description: metaDescription,
        image: heroImageId,
      },
    }
    if (heroImageId) {
      postData.heroImage = heroImageId
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'blogposts',
        id: existing.docs[0].id,
        data: postData,
        context: { disableRevalidate: true },
      })
      console.log(`[OK] Post "${item.slug}" actualizado`)
    } else {
      await payload.create({
        collection: 'blogposts',
        data: postData,
        context: { disableRevalidate: true },
      })
      console.log(`[OK] Post "${item.slug}" creado exitosamente`)
    }
  }

  console.log('\n=== 3. Migrando imágenes inline para TODOS los posts existentes ===')
  const allPosts = await payload.find({
    collection: 'blogposts',
    limit: 200,
    depth: 1,
  })

  console.log(`Total de posts en Payload: ${allPosts.docs.length}`)
  let updatedWithImages = 0

  for (const post of allPosts.docs) {
    const cat = post.category as any
    const catSlug = typeof cat === 'object' && cat ? cat.slug : ''
    // Webflow mapped URL
    const webflowCatSlug = catSlug === 'empieza-en-seo' ? 'empieza-en-seo' : catSlug
    let webflowUrl = `${WEBFLOW_ORIGIN}/${webflowCatSlug}/${post.slug}`

    // Probar fetch
    let res = await fetch(webflowUrl)
    if (!res.ok && catSlug === 'empieza-en-seo') {
      // Probar con 'aprender-seo'
      webflowUrl = `${WEBFLOW_ORIGIN}/aprender-seo/${post.slug}`
      res = await fetch(webflowUrl)
    }

    if (!res.ok) {
      console.log(`[SKIP] No se pudo obtener post de Webflow: ${post.slug} (${res.status})`)
      continue
    }

    const html = await res.text()
    const dom = new JSDOM(html)
    const doc = dom.window.document
    const bodyEl = doc.querySelector('.blogtext.w-richtext') || doc.querySelector('.w-richtext')
    if (!bodyEl) continue

    const inlineImgs = bodyEl.querySelectorAll('img')
    if (inlineImgs.length === 0) continue

    console.log(`\nPost "${post.slug}" tiene ${inlineImgs.length} imágenes inline. Migrando...`)
    bodyEl
      .querySelectorAll('.w-embed, .w-script, script, iframe, style, #toc, .toc-container, noscript')
      .forEach((n) => n.remove())

    const lexical = convertHTMLToLexical({ editorConfig, html: bodyEl.innerHTML, JSDOM }) as any
    const uploads: { node: any; src: string; alt: string }[] = []
    resolveUploadNodes(lexical.root, uploads)

    let imagesResolved = 0
    for (const up of uploads) {
      const mediaId = await uploadImage(payload, up.src, up.alt)
      if (mediaId) {
        delete up.node.pending
        up.node.relationTo = 'media'
        up.node.value = mediaId
        up.node.fields = { alt: up.alt }
        imagesResolved++
      }
    }

    await payload.update({
      collection: 'blogposts',
      id: post.id,
      data: { body: lexical },
      context: { disableRevalidate: true },
    })
    console.log(`[OK] Post "${post.slug}" actualizado con ${imagesResolved} imágenes inline`)
    updatedWithImages++
  }

  console.log(`\n=== Migración finalizada con éxito! Posts con imágenes inline actualizados: ${updatedWithImages} ===`)
  process.exit(0)
}

await run()
