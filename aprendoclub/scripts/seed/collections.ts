import type { Payload } from 'payload'

import { diplomadoFaqs, homeFaqs } from '../../content/faqs'
import { programas } from '../../content/programas'
import { equipo, fundadora } from '../../content/quienes-somos'
import { faq as retoFaqSource } from '../../content/reto'
import { testimonios as testimoniosSource, trustedCompanies } from '../../content/testimonios'

/**
 * Datos históricos del megamenú de navbar (antes en content/site.ts, eliminado
 * en Phase 15 al migrar el shell a Payload). Se conservan aquí solo como
 * fuente para poblar `menuDesc`/`menuBadge` de la colección `programas` en
 * este seed; el shell ya no lee de este archivo (lee de la colección).
 */
const programMenu = [
  {
    label: 'Diplomado de cero a SEO',
    href: '/diplomado',
    desc: '16 semanas para convertirte en especialista SEO.',
    badge: 'Programa estrella',
  },
  {
    label: 'Taller de SEO con IA',
    href: '/programas/taller-seo-con-ia',
    desc: '15 días para posicionar en Google, ChatGPT y Gemini.',
    badge: '$49.99',
  },
  {
    label: 'Reto 7 días',
    href: '/reto',
    desc: '7 días para elegir tu especialidad y cobrar en dólares.',
    badge: '$20',
  },
]

/**
 * IDs/maps devueltos tras poblar las 5 colecciones, para que globals.ts
 * resuelva relationships sin volver a consultar por clave natural.
 */
export interface CollectionMaps {
  /** nombre -> id */
  testimonios: Map<string, number>
  /** ids de los testimonios con featuredOnHome, en orden */
  testimoniosFeatured: number[]
  /** nombre -> id */
  clientes: Map<string, number>
  /** slug -> id */
  programas: Map<string, number>
  /** nombre -> id */
  teamMembers: Map<string, number>
  /** `${page}::${question}` -> id */
  faq: Map<string, number>
}

/** Nombres de los 3 testimonios con foto rica, destacados en el home. */
const FEATURED_ON_HOME = new Set(['Johanna Ramírez', 'Nataly Domínguez', 'Marco Garcia'])

/**
 * Equipo del grid /diplomado (components/diplomado/team.tsx, T-14-10). Dana
 * Aliaga es una persona real DISTINTA de Diana Rodríguez (quienes-somos) — no
 * deduplicar. Sin foto ni bio propia en la fuente (team.tsx no trae bio); se
 * usa el rol real como bio mínima (campo requerido en la colección).
 */
const DIPLOMADO_TEAM_ONLY = [
  {
    nombre: 'Dana Aliaga',
    rol: 'SEO Specialist',
    bio: 'SEO Specialist del equipo de coaches de aprendoclub.',
    iniciales: 'DA',
  },
]

/** Nombres del equipo de quienes-somos que también aparecen en /diplomado (team.tsx). */
const SHARED_WITH_DIPLOMADO = new Set([
  'Arianna Lupi',
  'Ibraim Zayed',
  'Juan Carlos Angulo',
  'Verónica Romero',
])

/**
 * Upsert genérico por clave natural. Usa `any` en las llamadas a la Local API
 * porque `collection` es una unión de slugs (no un literal fijo) y los tipos
 * de overload de Payload (drafts, Where compuesto) no resuelven bien con
 * uniones; el modelo real (payload.config.ts) sigue siendo la fuente de verdad.
 */
async function upsertByField(
  payload: Payload,
  collection: 'testimonios' | 'clientes-trabajados' | 'programas' | 'team-members' | 'faq',
  field: string,
  value: string,
  data: Record<string, unknown>,
  extraWhere?: Record<string, unknown>,
): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = payload as any
  const where = extraWhere
    ? { and: [{ [field]: { equals: value } }, extraWhere] }
    : { [field]: { equals: value } }

  const existing = await p.find({ collection, where, limit: 1 })

  if (existing.docs.length > 0) {
    const id = Number(existing.docs[0].id)
    await p.update({ collection, id, data })
    return id
  }

  const created = await p.create({ collection, data })
  return Number(created.id)
}

export async function seedCollections(
  payload: Payload,
  mediaMap: Map<string, number>,
): Promise<CollectionMaps> {
  const testimonios = new Map<string, number>()
  const testimoniosFeatured: number[] = []
  const clientes = new Map<string, number>()
  const programasMap = new Map<string, number>()
  const teamMembers = new Map<string, number>()
  const faqMap = new Map<string, number>()

  // --- Testimonios (upsert por nombre) ---
  for (const [index, t] of testimoniosSource.entries()) {
    const featured = FEATURED_ON_HOME.has(t.nombre)
    const id = await upsertByField(payload, 'testimonios', 'nombre', t.nombre, {
      nombre: t.nombre,
      rol: t.rol,
      ubicacion: t.ubicacion ? t.ubicacion : undefined,
      quote: t.quote,
      foto: t.foto ? (mediaMap.get(t.foto) ?? undefined) : undefined,
      featuredOnHome: featured,
      orden: index,
    })
    testimonios.set(t.nombre, id)
    if (featured) testimoniosFeatured.push(id)
  }
  console.log(`[seed:collections] testimonios: ${testimonios.size} (${testimoniosFeatured.length} featuredOnHome)`)

  // --- ClientesTrabajados (upsert por nombre) ---
  for (const [index, c] of trustedCompanies.entries()) {
    const logoId = mediaMap.get(c.logo)
    if (!logoId) {
      console.warn(`[seed:collections] SKIP clientes-trabajados "${c.name}": logo no está en el manifest de media`)
      continue
    }
    const id = await upsertByField(payload, 'clientes-trabajados', 'nombre', c.name, {
      nombre: c.name,
      logo: logoId,
      orden: index,
    })
    clientes.set(c.name, id)
  }
  console.log(`[seed:collections] clientes-trabajados: ${clientes.size}`)

  // --- Programas (upsert por slug) ---
  for (const [index, p] of programas.entries()) {
    const menuEntry = programMenu.find((m) => m.href === p.ctaHref)
    const id = await upsertByField(payload, 'programas', 'slug', p.id, {
      slug: p.id,
      badge: p.badge,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      precioNota: p.precioNota,
      ctaLabel: p.ctaLabel,
      ctaHref: p.ctaHref,
      orden: index,
      menuDesc: menuEntry?.desc,
      menuBadge: menuEntry?.badge,
    })
    programasMap.set(p.id, id)
  }
  console.log(`[seed:collections] programas: ${programasMap.size}`)

  // --- TeamMembers (upsert por nombre) ---
  for (const [index, m] of equipo.entries()) {
    const id = await upsertByField(payload, 'team-members', 'nombre', m.nombre, {
      nombre: m.nombre,
      rol: m.rol,
      bio: m.bio,
      foto: m.foto ? (mediaMap.get(m.foto) ?? undefined) : undefined,
      iniciales: m.iniciales,
      web: m.web,
      mostrarEnQuienesSomos: true,
      mostrarEnDiplomado: SHARED_WITH_DIPLOMADO.has(m.nombre),
      orden: index,
    })
    teamMembers.set(m.nombre, id)
  }
  for (const [i, m] of DIPLOMADO_TEAM_ONLY.entries()) {
    const id = await upsertByField(payload, 'team-members', 'nombre', m.nombre, {
      nombre: m.nombre,
      rol: m.rol,
      bio: m.bio,
      iniciales: m.iniciales,
      mostrarEnQuienesSomos: false,
      mostrarEnDiplomado: true,
      orden: equipo.length + i,
    })
    teamMembers.set(m.nombre, id)
  }
  console.log(`[seed:collections] team-members: ${teamMembers.size} (incl. Diana Rodríguez y Dana Aliaga como registros distintos)`)

  // --- Faq (upsert por question+page) ---
  let ordenFaq = 0
  for (const f of homeFaqs) {
    const id = await upsertByField(
      payload,
      'faq',
      'question',
      f.question,
      { question: f.question, answer: f.answer, page: 'home', orden: ordenFaq },
      { page: { equals: 'home' } },
    )
    faqMap.set(`home::${f.question}`, id)
    ordenFaq += 1
  }
  ordenFaq = 0
  for (const f of diplomadoFaqs) {
    const id = await upsertByField(
      payload,
      'faq',
      'question',
      f.question,
      { question: f.question, answer: f.answer, page: 'diplomado', orden: ordenFaq },
      { page: { equals: 'diplomado' } },
    )
    faqMap.set(`diplomado::${f.question}`, id)
    ordenFaq += 1
  }
  ordenFaq = 0
  for (const f of retoFaqSource) {
    const id = await upsertByField(
      payload,
      'faq',
      'question',
      f.pregunta,
      { question: f.pregunta, answer: f.respuesta, page: 'reto', orden: ordenFaq },
      { page: { equals: 'reto' } },
    )
    faqMap.set(`reto::${f.pregunta}`, id)
    ordenFaq += 1
  }
  console.log(`[seed:collections] faq: ${faqMap.size} (home/diplomado/reto; taller sin FAQs, gap real)`)

  return {
    testimonios,
    testimoniosFeatured,
    clientes,
    programas: programasMap,
    teamMembers,
    faq: faqMap,
  }
}
