import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Payload } from 'payload'

import { equipo, fundadora } from './seed-data/quienes-somos'
import * as home from './seed-data/home'
import * as reto from './seed-data/reto'
import { hero as diplomadoHero, galeria as diplomadoGaleria } from './seed-data/diplomado'
import { retoImagenes, testimonios as testimoniosSource, trustedCompanies } from './seed-data/testimonios'

/**
 * Subida idempotente de imágenes/video de public/ a la colección Media (Vercel
 * Blob) + manifest path -> mediaId.
 *
 * La lista de assets se DERIVA de los módulos content/*.ts (foto/imagen/logo/
 * avatares/videoBackground) en vez de recorrer public/ a ciegas: public/
 * contiene artefactos de crawl (_next, *.txt, *.html) que no son Media real.
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PUBLIC_DIR = path.resolve(__dirname, '../../public')

interface MediaAsset {
  path: string
  alt: string
}

function collectMediaAssets(): MediaAsset[] {
  const assets: MediaAsset[] = []
  const seen = new Set<string>()
  const add = (p: string | undefined, alt: string) => {
    if (!p || seen.has(p)) return
    seen.add(p)
    assets.push({ path: p, alt })
  }

  // Logo de la organización (site-settings.seo.orgLogo, lib/schema.ts organization.logo)
  add('/logo.svg', 'Logo de aprendoclub')

  // Banda de logos "empresas como" (colección clientes-trabajados)
  for (const c of trustedCompanies) add(c.logo, `Logo de ${c.name}`)

  // Equipo (colección team-members): quienes-somos + fundadora
  for (const m of equipo) add(m.foto, `${m.nombre}, ${m.rol}`)
  add(fundadora.foto, `${fundadora.nombre}, fundadora de aprendoclub`)

  // Testimonios con foto real (colección testimonios)
  for (const t of testimoniosSource) {
    if (t.foto) add(t.foto, t.rol ? `${t.nombre}, ${t.rol}` : t.nombre)
  }

  // Galería del Reto en /testimonios (global testimonios-page.retoGaleria)
  for (const img of retoImagenes) add(img.src, img.alt)

  // Home: avatares del hero + video de fondo
  home.hero.avatares.forEach((src, i) => add(src, `Avatar de estudiante ${i + 1}`))
  add(home.hero.videoBackground, 'Video de fondo del hero del home')

  // Diplomado: hero + galería (IMG-01, Phase 24)
  add(diplomadoHero.imagen, 'Imagen del Diplomado - próximamente')
  diplomadoGaleria.imagenes.forEach((src, i) => add(src, `Foto del Diplomado - próximamente (${i + 1})`))

  // Reto: hero, mentora, agenda (7 días), premios, ganadores
  add(reto.hero.imagen, 'Arianna Lupi, hero del Reto 7 días')
  add(reto.mentora.foto, 'Arianna Lupi, mentora del Reto 7 días')
  for (const dia of reto.agenda) add(dia.imagen, `${dia.dia}: ${dia.titulo}`)
  add(reto.premios.mayor.imagen, reto.premios.mayor.titulo)
  add(reto.premios.becas.imagen, reto.premios.becas.titulo)
  for (const g of reto.ganadores) add(g.imagen, `${g.nombre}, ${g.edicion}`)

  return assets
}

/**
 * Sube (o reusa si ya existe por filename) cada asset a Media y devuelve un
 * manifest Map<publicPath, mediaId> para que collections/globals resuelvan
 * uploads/relationships.
 */
export async function seedMedia(payload: Payload): Promise<Map<string, number>> {
  const manifest = new Map<string, number>()
  const assets = collectMediaAssets()

  for (const asset of assets) {
    const absPath = path.join(PUBLIC_DIR, asset.path)
    if (!fs.existsSync(absPath)) {
      console.warn(`[seed:media] SKIP (no existe en disco): ${asset.path}`)
      continue
    }

    const filename = path.basename(absPath)
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const id = Number(existing.docs[0].id)
      manifest.set(asset.path, id)
      console.log(`[seed:media] ya existe: ${filename} -> ${id}`)
      continue
    }

    const created = await payload.create({
      collection: 'media',
      data: { alt: asset.alt },
      filePath: absPath,
    })
    manifest.set(asset.path, Number(created.id))
    console.log(`[seed:media] subido: ${filename} -> ${created.id}`)
  }

  console.log(`[seed:media] total en manifest: ${manifest.size}/${assets.length}`)
  return manifest
}
