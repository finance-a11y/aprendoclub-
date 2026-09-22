import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await getPayload({ config })
  console.log('--- Iniciando Seed de Autores Faltantes (Ibraim Zayed y Verónica Romero) ---')

  const autores = [
    {
      slug: 'ibraim-zayed',
      name: 'Ibraim Zayed',
      role: 'SEO Coach y Community Builder',
      bio: 'Coach de SEO y creador de comunidad. Ha trabajado con 6 clientes en Estados Unidos y en dos agencias. Diseña estrategias para posicionar marcas en buscadores y redes.',
      avatar: 9, // Media id de ibraim.avif
    },
    {
      slug: 'veronica-romero',
      name: 'Verónica Romero',
      role: 'SEO Manager',
      bio: 'Content Manager con amplia experiencia en crecimiento orgánico. Ha trabajado con clientes como AMBL, Storybook y Papora con resultados destacados.',
      avatar: 11, // Media id de veronica.avif
    },
  ]

  for (const autor of autores) {
    const existing = await payload.find({
      collection: 'authors',
      where: { slug: { equals: autor.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const id = existing.docs[0].id
      await payload.update({
        collection: 'authors',
        id,
        data: {
          name: autor.name,
          role: autor.role,
          bio: autor.bio,
          avatar: autor.avatar,
        },
        context: { disableRevalidate: true },
      })
      console.log(`[seed:authors] Autor actualizado: ${autor.slug} (ID ${id})`)
    } else {
      const created = await payload.create({
        collection: 'authors',
        data: {
          slug: autor.slug,
          name: autor.name,
          role: autor.role,
          bio: autor.bio,
          avatar: autor.avatar,
        },
        context: { disableRevalidate: true },
      })
      console.log(`[seed:authors] Autor creado: ${autor.slug} (ID ${created.id})`)
    }
  }

  console.log('--- Seed completado exitosamente ---')
  process.exit(0)
}

run().catch((err) => {
  console.error('Error en seed:', err)
  process.exit(1)
})
