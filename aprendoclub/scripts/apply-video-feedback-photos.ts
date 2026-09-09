import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import config from '../payload.config'

const OPT_DIR =
  '/private/tmp/claude-501/-Users-juan-Documents-Codigo-Arianna-aprendoclub/528882d3-69b3-49f8-bbaa-24918a4a6114/scratchpad/photos-optimized'

async function upload(payload: any, relPath: string, alt: string) {
  const filePath = path.join(OPT_DIR, relPath)
  const buffer = fs.readFileSync(filePath)
  const filename = path.basename(filePath)
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data: buffer, mimetype: 'image/webp', name: filename, size: buffer.length },
  })
  console.log('[upload]', filename, '->', doc.id)
  return doc.id as number
}

async function run() {
  const payload = await getPayload({ config })
  const ctx = { context: { disableRevalidate: true } }

  // --- Uploads ---
  const ari = await upload(payload, 'Ari y Dana/ari.webp', 'Arianna Lupi, fundadora de aprendoclub')
  const dana = await upload(payload, 'Ari y Dana/dana.webp', 'Dana Aliaga, SEO Specialist en aprendoclub')
  const cursos = await upload(payload, 'PORTADAS aprendoclub/8.webp', 'Cursos prácticos dentro de la plataforma de aprendoclub')
  const comunidad = await upload(payload, 'PORTADAS aprendoclub/9.webp', 'Comunidad activa de aprendoclub')
  const mentorias = await upload(payload, 'PORTADAS aprendoclub/5.webp', 'Llamadas y mentorías en vivo de aprendoclub')
  const bolsa = await upload(payload, 'PORTADAS aprendoclub/10.webp', 'Vacantes y bolsa de trabajo de aprendoclub')
  const coaches = await upload(payload, 'PORTADAS aprendoclub/6-copy.webp', 'Coaches de aprendoclub')
  const invitados = await upload(payload, 'PORTADAS aprendoclub/7.webp', 'Invitados especiales en las sesiones en vivo')
  const curriculum = await upload(payload, 'PORTADAS aprendoclub/4-copy.webp', 'Contenido del diplomado dentro de la plataforma')
  const rdss = await upload(payload, 'PORTADAS aprendoclub/12.webp', 'Resultados de SEO aplicando lo aprendido en aprendoclub')
  const ia15 = await upload(payload, 'PORTADAS aprendoclub/11-copy.webp', 'SEO con IA en 15 días')

  const portadaDiplomado = await upload(
    payload,
    'Portadas programas/portadas-diplomado-de-cero-a-seo---aprendoclub-.webp',
    'Diplomado de SEO + AIO',
  )
  const portadaReto = await upload(payload, 'Portadas programas/reto-2026---portadas-1.webp', 'Reto 7 días')
  const portadaTaller = await upload(
    payload,
    'Portadas programas/screenshot-2026-08-17-at-71918-pm.webp',
    'Taller SEO + IA en 1 día',
  )

  // --- Home: Instructor foto (reemplaza la genérica por la de branding aprendoclub) ---
  {
    const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })
    const page: any = docs[0]
    const layout = page.layout.map((b: any) => {
      if (b.blockType === 'instructor') return { ...b, foto: ari }
      if (b.blockType === 'featureGrid' && b.eyebrow === 'LA SOLUCIÓN') {
        const photoByTitulo: Record<string, number> = {
          'Cursos Prácticos': cursos,
          'Comunidad 24/7': comunidad,
          'Mentorías en Vivo': mentorias,
          'Bolsa de Trabajo': bolsa,
        }
        return {
          ...b,
          items: b.items.map((it: any) =>
            photoByTitulo[it.titulo]
              ? { ...it, iconMode: 'image', image: photoByTitulo[it.titulo] }
              : it,
          ),
        }
      }
      return b
    })
    await payload.update({ collection: 'pages', id: page.id, data: { layout }, ...ctx })
    console.log('[home] instructor + LA SOLUCIÓN actualizados')
  }

  // --- Diplomado: galería "Así se vive el Diplomado" con las fotos nuevas ---
  {
    const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'diplomado' } }, limit: 1, depth: 0 })
    const page: any = docs[0]
    const layout = page.layout.map((b: any) => {
      if (b.blockType !== 'diplomadoGaleria') return b
      return { ...b, imagenes: [cursos, comunidad, mentorias, coaches, invitados, curriculum, rdss, ia15, bolsa] }
    })
    await payload.update({ collection: 'pages', id: page.id, data: { layout }, ...ctx })
    console.log('[diplomado] galería actualizada')
  }

  // --- Programas: portada por programa ---
  {
    const map: Record<string, number> = {
      'Diplomado de SEO + AIO': portadaDiplomado,
      'Taller de SEO con IA': portadaTaller,
      'Reto 7 días': portadaReto,
    }
    for (const [nombre, imagen] of Object.entries(map)) {
      const { docs } = await payload.find({ collection: 'programas', where: { nombre: { equals: nombre } }, limit: 1 })
      if (!docs.length) { console.warn('[programas] no encontrado:', nombre); continue }
      await payload.update({ collection: 'programas', id: docs[0].id, data: { imagen }, ...ctx })
      console.log('[programas] portada ->', nombre)
    }
  }

  console.log('DONE')
}

await run()
