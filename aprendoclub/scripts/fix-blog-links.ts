import { getPayload } from 'payload'

import config from '../payload.config'
import { rewriteBodyLinks } from './seed/rewrite-links'

/**
 * Pasada one-off (idempotente) que reescribe los links a aprendoseo.com en el
 * body de cada BlogPost hacia rutas internas de aprendoclub. `payload run`.
 */
async function run() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blogposts',
    depth: 1,
    limit: 500,
  })

  // Mapa slug de post -> /{categoria}/{slug}.
  const slugToPath = new Map<string, string>()
  for (const post of docs as any[]) {
    const cat = typeof post.category === 'object' ? post.category?.slug : null
    if (cat) slugToPath.set(post.slug, `/${cat}/${post.slug}`)
  }

  let postsChanged = 0
  let linksRewritten = 0
  for (const post of docs as any[]) {
    const n = rewriteBodyLinks(post.body, slugToPath)
    if (n > 0) {
      await payload.update({
        collection: 'blogposts',
        id: post.id,
        data: { body: post.body },
        context: { disableRevalidate: true },
      })
      postsChanged++
      linksRewritten += n
    }
  }

  console.log(`[fix-links] posts actualizados=${postsChanged}, links reescritos=${linksRewritten}`)
  process.exit(0)
}

await run()
