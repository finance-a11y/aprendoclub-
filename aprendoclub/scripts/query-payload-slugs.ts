import { getPayload } from 'payload'

import config from '../payload.config'

/**
 * Consulta de solo lectura a Payload (Phase 33): vuelca los slugs en vivo de
 * `pages`, `authors`, `categories` y `blogposts` para verificar cada
 * `target_url` del CSV de redirects contra el estado real de la DB, no
 * contra un snapshot de una sesión anterior. Reutilizable en Phases 35-38
 * para las siguientes tandas de redirects.
 *
 * Corre vía `npx payload run scripts/query-payload-slugs.ts` — nunca con
 * `tsx` directo, porque `payload.config.ts` no carga `.env.local` por sí
 * solo y necesita el wrapper `payload run` para que las env vars entren.
 */
async function run() {
  const payload = await getPayload({ config })

  const [pages, authors, categories, blogposts] = await Promise.all([
    payload.find({ collection: 'pages', depth: 0, limit: 200, overrideAccess: true }),
    payload.find({ collection: 'authors', depth: 0, limit: 200, overrideAccess: true }),
    payload.find({ collection: 'categories', depth: 0, limit: 200, overrideAccess: true }),
    payload.find({ collection: 'blogposts', depth: 1, limit: 200, overrideAccess: true }),
  ])

  const result = {
    pages: pages.docs.map((doc) => doc.slug),
    authors: authors.docs.map((doc) => doc.slug),
    categories: categories.docs.map((doc) => doc.slug),
    blogposts: blogposts.docs.map((doc) => ({
      slug: doc.slug,
      category:
        doc.category && typeof doc.category === 'object' ? doc.category.slug : doc.category,
    })),
  }

  console.log(JSON.stringify(result))

  await payload.destroy()
  process.exit(0)
}

await run()
