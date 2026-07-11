import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Payload } from 'payload'

import { equipo, fundadora } from './seed-data/quienes-somos'
import * as home from './seed-data/home'
import * as reto from './seed-data/reto'
import * as diplomado from './seed-data/diplomado'
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
    if (!p) return
    if (seen.has(p)) {
      // Path ya registrado por otro caller (asset reusado entre secciones, p.ej.
      // diplomado-mentorias.avif / diplomado-comunidad.avif entre galería y
      // howItWorks). El Media doc es único por path, así que el primer alt en
      // registrarse gana y los siguientes se descartan a propósito: se deja
      // constancia acá para que no parezca código muerto silencioso.
      console.warn(`[seed:media] alt duplicado ignorado para ${p}: "${alt}"`)
      return
    }
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

  // Diplomado: hero + galería con assets reales (IMG-01, Phase 24; fotos reales desde 24-02)
  add(diplomadoHero.imagen, 'Estudiante del Diplomado de SEO + AIO trabajando en su laptop')
  for (const img of diplomadoGaleria.imagenes) add(img.src, img.alt)
  // diplomado-mentorias.avif y diplomado-comunidad.avif se reusan del bloque
  // anterior (diplomadoGaleria.imagenes): el Media doc para esos dos paths ya
  // quedó registrado arriba con el alt de la galería, así que el add() de acá
  // es un no-op intencional para esos dos (ver warning en collectMediaAssets/add).
  // Solo diplomado-modulos2.avif (único de howItWorks) toma el alt calculado aquí.
  for (const f of diplomado.howItWorks.features) {
    if (f.iconMode === 'image' && f.imagen) add(f.imagen, `${f.titulo} - Diplomado de SEO + AIO`)
  }

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
      const doc = existing.docs[0] as { alt?: string | null }

      // Diff-and-update de los campos seedeados: `alt` es hoy el único campo
      // que payload.create escribe en `data` (línea ~127 abajo), así que
      // reconciliar `alt` cubre el bug por completo. Si en el futuro se
      // agrega otro campo al `data` del create, sumarlo también acá.
      if (doc.alt !== asset.alt) {
        await payload.update({
          collection: 'media',
          id,
          data: { alt: asset.alt },
        })
        console.log(`[seed:media] alt actualizado: ${filename} -> ${id} ("${doc.alt}" -> "${asset.alt}")`)
      } else {
        console.log(`[seed:media] ya existe (sin cambios): ${filename} -> ${id}`)
      }

      manifest.set(asset.path, id)
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
