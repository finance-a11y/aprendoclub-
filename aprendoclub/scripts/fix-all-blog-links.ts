import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await getPayload({ config })

  console.log('--- Iniciando actualización de enlaces internos en BlogPosts ---')

  const { docs: posts } = await payload.find({
    collection: 'blogposts',
    depth: 1,
    limit: 500,
  })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 50,
  })

  // 1. Slug to canonical path /{cat}/{slug}
  const slugToPath = new Map<string, string>()
  for (const post of posts as any[]) {
    const cat = typeof post.category === 'object' ? post.category?.slug : null
    if (cat && post.slug) {
      slugToPath.set(post.slug, `/${cat}/${post.slug}`)
    }
  }

  // 2. Category slugs
  const categorySlugs = new Set(categories.map((c) => c.slug))

  // 3. Load Cloudflare 301 redirects CSV
  const csvPath = path.resolve(process.cwd(), '../.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv')
  const redirectsMap = new Map<string, string>()
  if (fs.existsSync(csvPath)) {
    const lines = fs.readFileSync(csvPath, 'utf8').split('\n')
    for (const line of lines) {
      const parts = line.split(',')
      if (parts.length >= 2) {
        const rawSrc = parts[0].trim().replace(/^https?:\/\/(www\.)?aprendoseo\.com/, '').replace(/\/+$/, '')
        const rawDst = parts[1].trim().replace(/^https?:\/\/(www\.)?aprendoclub\.com/, '').replace(/\/+$/, '')
        if (rawSrc && rawDst) {
          redirectsMap.set(rawSrc, rawDst)
        }
      }
    }
  }

  // 4. Known specific mappings
  const knownMappings = new Map<string, string>([
    ['/diplomado', '/programas/diplomado'],
    ['/diplomado/diplomado', '/programas/diplomado'],
    ['/diplomados/diplomado-de-cero-a-seo', '/programas/diplomado'],
    ['/reto', '/programas/reto'],
    ['/recursos/guia-seo-para-principiantes', '/programas/curso-basico-de-seo'],
    ['/recursos/guia-seo', '/programas/curso-basico-de-seo'],
    ['/certificaciones', '/autor/arianna-lupi'],
    ['/metricas-seo', '/seo-basico/metricas-seo'],
    ['/que-son-palabras-clave-lsi', '/seo-basico/que-son-las-palabras-clave-lsi'],
    ['/seo-herramientas', '/herramientas-seo'],
    ['/seo-herramientas/palabras-claves', '/herramientas-seo/herramientas-palabras-claves'],
    ['/seo-herramientas/ver-posicionamiento', '/herramientas-seo/ver-posicionamiento'],
    ['/aprender-seo/aprender-seo-desde-cero', '/seo-basico/como-aprender-seo-desde-cero'],
    ['/aprender-seo/que-estudiar-para-trabajar-seo', '/empieza-en-seo/que-estudiar-para-trabajar-en-seo'],
    ['/aprender-seo/habilidades-necesarias-para-seo', '/empieza-en-seo/habilidades-para-ser-un-especialista-seo'],
    ['/seo-on-page/estrategias-de-linkbuilding', '/seo-basico/como-construir-backlinks'],
    ['/seo-on-page/como-crear-landing-page', '/seo-onpage/como-crear-una-landing-page-optimizada-para-seo'],
    ['/seo-on-page/landing-page-estructura', '/seo-onpage/como-crear-una-landing-page-optimizada-para-seo'],
    ['/seo-on-page/analisis-competencia', '/seo-onpage/analisis-de-competidores'],
    ['/seo-on-page/copywriting-seo', '/seo-onpage/copywriting-para-seo'],
    ['/seo-on-page/canibalizacion-de-palabras-clave', '/seo-onpage/que-es-la-canibalizacion-de-las-palabras-clave'],
    ['/seo-on-page/enlaces-internos', '/seo-onpage/enlaces-internos-seo'],
    ['/seo-on-page/como-usar-google-keyword-planner-para-optimizar-tu-seo', '/herramientas-seo/herramientas-palabras-claves'],
    ['/seo-basico/tecnicas-de-posicionamiento-web', '/seo-basico/posicionamiento-web-en-google'],
    ['/seo-basico/consejos', '/seo-basico/formas-de-mejorar-el-seo'],
    ['/seo-basico/que-es-seo', '/empieza-en-seo/que-es-el-posicionamiento-web-seo'],
    ['/seo-basico/como-funciona-el-seo', '/empieza-en-seo/posicionamiento-web-en-google'],
    ['/seo-basico/guia-para-principiantes', '/programas/curso-basico-de-seo'],
    ['/seo-basico/seo-vs-sem', '/seo-basico/diferencia-seo-y-sem'],
    ['/seo-basico/motores-de-busqueda', '/seo-basico/motor-de-busqueda'],
    ['/seo-basico/tipos-de-seo', '/seo-basico'],
  ])

  function resolveUrl(rawUrl: string): string | null {
    if (!rawUrl) return null

    // Caso 1: Enlace a aprendoseo.com
    const APRENDOSEO = /(?:https?:)?\/\/((?:[a-z0-9-]+\.)*aprendoseo\.com)(?:\/(.*))?$/i
    const m = rawUrl.match(APRENDOSEO)
    if (m) {
      const host = m[1].toLowerCase()
      let pathPart = (m[2] ?? '').replace(/[?#].*$/, '').replace(/\/+$/, '')

      if (/^diplomado\./.test(host)) return '/programas/diplomado'
      if (!pathPart) return '/'

      const normalizedPath = `/${pathPart}`

      if (knownMappings.has(normalizedPath)) {
        return knownMappings.get(normalizedPath)!
      }

      if (redirectsMap.has(normalizedPath)) {
        return redirectsMap.get(normalizedPath)!
      }

      const last = pathPart.split('/').pop() || ''
      if (slugToPath.has(last)) {
        return slugToPath.get(last)!
      }

      if (pathPart.startsWith('seo-on-page/')) {
        const rest = pathPart.replace(/^seo-on-page\//, '')
        if (slugToPath.has(rest)) return slugToPath.get(rest)!
        const altKey = `/seo-onpage/${rest}`
        if (redirectsMap.has(altKey)) return redirectsMap.get(altKey)!
      }

      if (pathPart.startsWith('aprender-seo/')) {
        const rest = pathPart.replace(/^aprender-seo\//, '')
        if (slugToPath.has(rest)) return slugToPath.get(rest)!
        const altKey = `/empieza-en-seo/${rest}`
        if (redirectsMap.has(altKey)) return redirectsMap.get(altKey)!
      }

      if (pathPart.startsWith('seo-herramientas/')) {
        const rest = pathPart.replace(/^seo-herramientas\//, '')
        if (slugToPath.has(rest)) return slugToPath.get(rest)!
        const altKey = `/herramientas-seo/${rest}`
        if (redirectsMap.has(altKey)) return redirectsMap.get(altKey)!
      }

      if (pathPart.startsWith('autor/')) {
        return `/${pathPart}`
      }

      if (categorySlugs.has(pathPart)) {
        return `/${pathPart}`
      }

      if (pathPart === 'seo-on-page') return '/seo-onpage'
      if (pathPart === 'seo-herramientas') return '/herramientas-seo'
      if (pathPart === 'aprender-seo') return '/empieza-en-seo'

      if (/diplomado/.test(pathPart)) return '/programas/diplomado'
      if (/reto/.test(pathPart)) return '/programas/reto'
      if (/taller|seo-con-ia/.test(pathPart)) return '/programas/taller-seo-con-ia'

      if (pathPart.startsWith('seo-basico')) return '/seo-basico'
      if (pathPart.startsWith('seo-on-page') || pathPart.startsWith('seo-onpage')) return '/seo-onpage'
      if (pathPart.startsWith('seo-tecnico')) return '/seo-tecnico'
      if (pathPart.startsWith('herramientas-seo') || pathPart.startsWith('seo-herramientas')) return '/herramientas-seo'
      if (pathPart.startsWith('empieza-en-seo') || pathPart.startsWith('aprender-seo')) return '/empieza-en-seo'
      if (pathPart.startsWith('seo-cursos')) return '/seo-cursos'

      return '/blog'
    }

    // Caso 2: Enlace relativo desactualizado
    if (rawUrl === '/diplomado') return '/programas/diplomado'
    if (rawUrl === '/reto') return '/programas/reto'
    if (rawUrl.startsWith('/aprender-seo/')) {
      const slug = rawUrl.replace('/aprender-seo/', '').replace(/\/+$/, '')
      if (slugToPath.has(slug)) return slugToPath.get(slug)!
      return `/empieza-en-seo/${slug}`
    }
    if (rawUrl.startsWith('/seo-on-page/')) {
      const slug = rawUrl.replace('/seo-on-page/', '').replace(/\/+$/, '')
      if (slugToPath.has(slug)) return slugToPath.get(slug)!
      return `/seo-onpage/${slug}`
    }
    if (rawUrl.startsWith('/seo-herramientas/')) {
      const slug = rawUrl.replace('/seo-herramientas/', '').replace(/\/+$/, '')
      if (slugToPath.has(slug)) return slugToPath.get(slug)!
      return `/herramientas-seo/${slug}`
    }
    if (rawUrl === '/recursos/guia-seo-para-principiantes') return '/programas/curso-basico-de-seo'
    if (rawUrl === '/certificaciones') return '/autor/arianna-lupi'

    // Caso 3: Enlace absoluto a aprendoclub.com -> normalizar a relativo
    if (rawUrl.startsWith('https://www.aprendoclub.com/') || rawUrl.startsWith('https://aprendoclub.com/')) {
      const clean = rawUrl.replace(/^https?:\/\/(www\.)?aprendoclub\.com/, '')
      return clean.startsWith('/') ? clean : `/${clean}`
    }

    return null
  }

  let totalPostsUpdated = 0
  let totalLinksRewritten = 0

  for (const post of posts as any[]) {
    let postChanged = false
    let linksRewrittenInPost = 0

    function walk(node: any) {
      if (!node) return
      if (node.type === 'link' || node.type === 'autolink') {
        const currentUrl: string = node.fields?.url ?? node.url ?? ''
        const resolved = resolveUrl(currentUrl)
        if (resolved && resolved !== currentUrl) {
          if (node.fields) {
            node.fields.url = resolved
            node.fields.newTab = false
          } else {
            node.url = resolved
          }
          postChanged = true
          linksRewrittenInPost++
        }
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          walk(child)
        }
      }
    }

    if (post.body?.root) {
      walk(post.body.root)
    }

    if (postChanged) {
      await payload.update({
        collection: 'blogposts',
        id: post.id,
        data: { body: post.body },
        context: { disableRevalidate: true },
      })
      totalPostsUpdated++
      totalLinksRewritten += linksRewrittenInPost
      console.log(`[OK] Post "${post.slug}": reescritos ${linksRewrittenInPost} enlaces`)
    }
  }

  console.log(`\n========================================`)
  console.log(`RESUMEN:`)
  console.log(`Posts actualizados: ${totalPostsUpdated} / ${posts.length}`)
  console.log(`Enlaces reescritos: ${totalLinksRewritten}`)
  console.log(`========================================\n`)

  await payload.destroy()
  process.exit(0)
}

run().catch((err) => {
  console.error('Error al actualizar enlaces:', err)
  process.exit(1)
})
