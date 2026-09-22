import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await getPayload({ config })
  console.log('--- Migrando slugs de programas en Neon DB ---')

  // 1. Colección pages: diplomado -> programas/diplomado
  const diploPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'diplomado' } },
    limit: 1,
  })
  if (diploPage.docs[0]) {
    console.log(`Actualizando página diplomado (ID: ${diploPage.docs[0].id}) -> programas/diplomado`)
    await payload.update({
      collection: 'pages',
      id: diploPage.docs[0].id,
      data: { slug: 'programas/diplomado' },
      context: { disableRevalidate: true },
    })
  } else {
    console.log('Página diplomado: ya actualizada o no encontrada con slug diplomado.')
  }

  // Colección pages: reto -> programas/reto
  const retoPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'reto' } },
    limit: 1,
  })
  if (retoPage.docs[0]) {
    console.log(`Actualizando página reto (ID: ${retoPage.docs[0].id}) -> programas/reto`)
    await payload.update({
      collection: 'pages',
      id: retoPage.docs[0].id,
      data: { slug: 'programas/reto' },
      context: { disableRevalidate: true },
    })
  } else {
    console.log('Página reto: ya actualizada o no encontrada con slug reto.')
  }

  // 2. Colección programas: ctaHref
  const progs = await payload.find({
    collection: 'programas',
    limit: 100,
  })
  for (const prog of progs.docs) {
    if (prog.ctaHref === '/diplomado') {
      console.log(`Actualizando programa ${prog.nombre} (ID: ${prog.id}) ctaHref -> /programas/diplomado`)
      await payload.update({
        collection: 'programas',
        id: prog.id,
        data: { ctaHref: '/programas/diplomado' },
        context: { disableRevalidate: true },
      })
    } else if (prog.ctaHref === '/reto') {
      console.log(`Actualizando programa ${prog.nombre} (ID: ${prog.id}) ctaHref -> /programas/reto`)
      await payload.update({
        collection: 'programas',
        id: prog.id,
        data: { ctaHref: '/programas/reto' },
        context: { disableRevalidate: true },
      })
    }
  }

  // 3. Global site-settings: navbar y footer
  try {
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    if (settings) {
      let changed = false
      const navbar = settings.navbar ? { ...settings.navbar } : undefined
      if (navbar && Array.isArray(navbar.programMenu)) {
        navbar.programMenu = navbar.programMenu.map((item: any) => {
          if (item.href === '/diplomado') {
            changed = true
            return { ...item, href: '/programas/diplomado' }
          }
          if (item.href === '/reto') {
            changed = true
            return { ...item, href: '/programas/reto' }
          }
          return item
        })
      }

      const footer = settings.footer ? { ...settings.footer } : undefined
      if (footer && Array.isArray(footer.footerColumns)) {
        footer.footerColumns = footer.footerColumns.map((col: any) => {
          if (Array.isArray(col.links)) {
            col.links = col.links.map((link: any) => {
              if (link.href === '/diplomado') {
                changed = true
                return { ...link, href: '/programas/diplomado' }
              }
              if (link.href === '/reto') {
                changed = true
                return { ...link, href: '/programas/reto' }
              }
              return link
            })
          }
          return col
        })
      }

      if (changed) {
        console.log('Actualizando global site-settings...')
        await payload.updateGlobal({
          slug: 'site-settings',
          data: {
            ...(navbar ? { navbar } : {}),
            ...(footer ? { footer } : {}),
          },
          context: { disableRevalidate: true },
        })
        console.log('Global site-settings actualizado con éxito.')
      } else {
        console.log('Global site-settings ya contiene los links actualizados.')
      }
    }
  } catch (err: any) {
    console.warn('Advertencia actualizando site-settings:', err?.message || err)
  }

  console.log('--- Migración finalizada con éxito ---')
  await payload.destroy()
  process.exit(0)
}

run().catch((err) => {
  console.error('Error durante la migración:', err)
  process.exit(1)
})
