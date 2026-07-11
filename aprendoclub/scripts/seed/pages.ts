import type { Payload } from 'payload'

import { hero as diplomadoHero } from './seed-data/diplomado'
import * as diplomado from './seed-data/diplomado'
import { diplomadoFaqs, homeFaqs } from './seed-data/faqs'
import * as home from './seed-data/home'
import { homeProgramas } from '../../lib/programas'
import {
  ctaFinal as quienesSomosCtaFinal,
  fundadora,
  hero as quienesSomosHero,
  historia,
  metodologia,
  stats,
} from './seed-data/quienes-somos'
import * as reto from './seed-data/reto'
import {
  tallerCta,
  tallerHero,
  tallerIncluye,
  tallerParaQuien,
  tallerPrecio,
} from './seed-data/taller-seo-con-ia'
import {
  cta as testimoniosCta,
  gridTitulo,
  hero as testimoniosHero,
  logosBanda,
  reto as testimoniosReto,
  retoImagenes,
  trustedCompanies,
  videosEyebrow,
  videosTitulo,
  videoTestimonios,
} from './seed-data/testimonios'

import type { CollectionMaps } from './collections'
import { idsFor, mediaId } from './globals'

/** Nombres de los 5 miembros del equipo de quienes-somos, en el orden del grid. */
const QUIENES_SOMOS_TEAM_ORDER = [
  'Arianna Lupi',
  'Diana Rodríguez',
  'Ibraim Zayed',
  'Juan Carlos Angulo',
  'Verónica Romero',
]

/** Equipo del grid /diplomado (team.tsx), en su orden real. */
const DIPLOMADO_TEAM_ORDER = [
  'Arianna Lupi',
  'Dana Aliaga',
  'Ibraim Zayed',
  'Juan Carlos Angulo',
  'Verónica Romero',
]

/**
 * Hero y CTA final del hub /programas (históricamente en el extinto
 * content/programas.ts, eliminado en Phase 15 Plan 02 al pasar el hub a
 * servirse desde este Pages doc). Se conservan aquí solo como fuente de
 * seed, verbatim; el hub ya no lee de content/programas.ts.
 */
const hubHero = {
  eyebrow: 'PROGRAMAS',
  titulo: 'Elige el camino que va con tu momento',
  subtitulo:
    'Desde un reto de 7 días hasta el diplomado completo. Todos con proyectos reales y acompañamiento de cerca.',
}

const hubCtaFinal = {
  titulo: '¿No sabes por dónde empezar?',
  texto: 'Escríbenos y te ayudamos a elegir el programa ideal para ti.',
  botonLabel: 'Habla con nosotros',
  botonHref: 'https://api.whatsapp.com/send?phone=13055728892',
}

/** Orden de display del hub /programas (page.tsx: baja -> alta implicación). */
const PROGRAMAS_HUB_ORDER = ['reto', 'taller-seo-con-ia', 'diplomado']

/** Orden de la sección de programas del home (home-programas-section). */
const HOME_PROGRAMAS_ORDER = ['diplomado', 'taller-seo-con-ia', 'reto']

interface PageSeed {
  slug: string
  title: string
  layout: Record<string, unknown>[]
}

function buildHome(mediaMap: Map<string, number>, maps: CollectionMaps): PageSeed {
  return {
    slug: 'home',
    title: 'Home',
    layout: [
      {
        blockType: 'heroHome',
        badgeText: home.hero.badgeText,
        tituloPre: home.hero.tituloPre,
        tituloAccent: home.hero.tituloAccent,
        tituloPost: home.hero.tituloPost,
        subtitulo: home.hero.subtitulo,
        ctaPrimario: { label: home.hero.ctaPrimario.label, href: home.hero.ctaPrimario.href },
        ctaSecundario: { label: home.hero.ctaSecundario.label, href: home.hero.ctaSecundario.href },
        avatares: home.hero.avatares
          .map((src) => mediaId(mediaMap, src, 'home.hero.avatares'))
          .filter((id): id is number => id !== undefined),
        ratingTexto: home.hero.ratingTexto,
        videoBackground: mediaId(mediaMap, home.hero.videoBackground, 'home.hero.videoBackground'),
      },
      {
        blockType: 'featureGrid',
        eyebrow: home.problema.eyebrow,
        titulo: home.problema.titulo,
        subtitulo: home.problema.subtitulo,
        items: home.problema.items.map((i) => ({
          icon: i.icon,
          titulo: i.titulo,
          descripcion: i.descripcion,
          iconMode: i.iconMode ?? 'icon',
          iconColor: i.iconColor ?? 'auto',
        })),
      },
      {
        blockType: 'featureGrid',
        eyebrow: home.beneficios.eyebrow,
        titulo: home.beneficios.titulo,
        subtitulo: home.beneficios.subtitulo,
        items: home.beneficios.items.map((i) => ({ icon: i.icon, titulo: i.titulo, descripcion: i.descripcion })),
      },
      {
        blockType: 'programGridRef',
        eyebrow: homeProgramas.eyebrow,
        titulo: homeProgramas.titulo,
        subtitulo: homeProgramas.subtitulo,
        boton: { label: homeProgramas.botonLabel, href: homeProgramas.botonHref },
        items: idsFor(maps.programas, HOME_PROGRAMAS_ORDER, 'home.programas'),
      },
      {
        blockType: 'pricing',
        eyebrow: home.pricing.eyebrow,
        titulo: home.pricing.titulo,
        subtitulo: home.pricing.subtitulo,
        planes: [
          {
            nombre: home.pricing.planCuotas.nombre,
            precio: home.pricing.planCuotas.precio,
            precioNota: home.pricing.planCuotas.nota,
            features: home.pricing.features.map((text) => ({ text })),
            cta: { label: home.pricing.planCuotas.ctaLabel, href: home.pricing.planCuotas.ctaHref },
          },
          {
            nombre: home.pricing.planUnico.nombre,
            badge: home.pricing.planUnico.badge,
            precio: home.pricing.planUnico.precio,
            precioNota: home.pricing.planUnico.nota,
            features: home.pricing.features.map((text) => ({ text })),
            cta: { label: home.pricing.planUnico.ctaLabel, href: home.pricing.planUnico.ctaHref },
          },
        ],
        ctaAsesoria: {
          titulo: home.pricing.ctaAsesoria.tituloAccent,
          texto: home.pricing.ctaAsesoria.texto,
          cta: { label: home.pricing.ctaAsesoria.botonLabel, href: home.pricing.ctaAsesoria.botonHref },
        },
      },
      {
        blockType: 'testimonialRef',
        eyebrow: home.testimoniosHome.eyebrow,
        titulo: home.testimoniosHome.titulo,
        items: maps.testimoniosFeatured,
      },
      {
        blockType: 'instructor',
        eyebrow: home.instructor.eyebrow,
        nombre: home.instructor.nombre,
        rol: home.instructor.rol,
        bioCorta1: home.instructor.bioCorta1,
        bioCorta2: home.instructor.bioCorta2,
        stats: { items: home.instructor.stats.map((s) => ({ value: s.value, label: s.label })) },
        foto: mediaId(mediaMap, home.instructor.foto, 'home.instructor.foto'),
        teaser: { label: home.instructor.teaserLabel, href: home.instructor.teaserHref },
      },
      {
        blockType: 'faqRef',
        eyebrow: home.faqHome.eyebrow,
        titulo: home.faqHome.titulo,
        items: homeFaqs
          .map((f) => maps.faq.get(`home::${f.question}`))
          .filter((id): id is number => id !== undefined),
      },
      {
        blockType: 'ctaBanner',
        titulo: home.ctaFinal.titulo,
        boton: { label: home.ctaFinal.botonLabel, href: home.ctaFinal.botonHref },
      },
      {
        blockType: 'stickyCta',
        boton: { label: home.stickyCta.botonLabel, href: home.stickyCta.botonHref },
      },
    ],
  }
}

function buildDiplomado(maps: CollectionMaps): PageSeed {
  return {
    slug: 'diplomado',
    title: 'Diplomado',
    layout: [
      {
        blockType: 'hero',
        badgeText: diplomadoHero.badgeText,
        tituloPre: diplomadoHero.tituloPre,
        tituloAccent: diplomadoHero.tituloAccent,
        tituloPost: diplomadoHero.tituloPost,
        subtitulo: diplomadoHero.subtitulo,
        ctaPrimario: { label: diplomadoHero.ctaPrimario.label, href: diplomadoHero.ctaPrimario.href },
        ctaSecundario: { label: diplomadoHero.ctaSecundario.label, href: diplomadoHero.ctaSecundario.href },
        microcopy: diplomadoHero.microcopy,
      },
      {
        blockType: 'featureGrid',
        eyebrow: diplomado.origin.eyebrow,
        titulo: diplomado.origin.titulo,
        items: diplomado.origin.tarjetas.map((t) => ({ icon: t.icon, titulo: t.texto, descripcion: undefined })),
      },
      {
        blockType: 'audience',
        titulo: diplomado.audience.titulo,
        subtitulo: diplomado.audience.subtitulo,
        tituloPerfiles: diplomado.audience.tituloPerfiles,
        perfiles: diplomado.audience.perfiles.map((text) => ({ text })),
        tituloDudas: diplomado.audience.tituloDudas,
        dudas: diplomado.audience.dudas.map((text) => ({ text })),
        notaFinal: diplomado.audience.notaFinal,
      },
      {
        blockType: 'featureGrid',
        eyebrow: diplomado.methodology.eyebrow,
        titulo: diplomado.methodology.titulo,
        subtitulo: diplomado.methodology.subtitulo,
        items: diplomado.methodology.pilares.map((p) => ({
          icon: p.icon,
          titulo: p.titulo,
          descripcion: p.descripcion,
        })),
      },
      {
        blockType: 'curriculum16Semanas',
        eyebrow: diplomado.curriculum.eyebrow,
        titulo: diplomado.curriculum.titulo,
        semanas: diplomado.curriculum.semanas.map((s) => ({
          numero: s.numero,
          titulo: s.titulo,
          detalle: s.detalle,
        })),
      },
      {
        blockType: 'howItWorks',
        eyebrow: diplomado.howItWorks.eyebrow,
        titulo: diplomado.howItWorks.titulo,
        items: diplomado.howItWorks.features.map((f) => ({
          icon: f.icon,
          titulo: f.titulo,
          descripcion: f.descripcion,
        })),
        ctaLabel: diplomado.howItWorks.ctaLabel,
        ctaHref: diplomado.howItWorks.ctaHref,
      },
      {
        blockType: 'diplomadoTeam',
        teamIntro: {
          eyebrow: diplomado.team.teamIntro.eyebrow,
          titulo: diplomado.team.teamIntro.titulo,
          subtitulo: diplomado.team.teamIntro.subtitulo,
        },
        equipo: {
          items: idsFor(maps.teamMembers, DIPLOMADO_TEAM_ORDER, 'diplomado.team.equipo'),
        },
        mentorSection: {
          titulo: diplomado.team.mentorSection.titulo,
          nombre: diplomado.team.mentorSection.nombre,
          web: diplomado.team.mentorSection.web,
          bio: diplomado.team.mentorSection.bio.map((texto) => ({ texto })),
          quote: diplomado.team.mentorSection.quote,
        },
      },
      {
        blockType: 'diplomadoBenefits',
        eyebrow: diplomado.benefits.eyebrow,
        titulo: diplomado.benefits.titulo,
        subtitulo: diplomado.benefits.subtitulo,
        items: diplomado.benefits.items.map((i) => ({ texto: i.texto, valor: i.valor })),
        extras: diplomado.benefits.extras.map((text) => ({ text })),
      },
      {
        blockType: 'diplomadoPricing',
        titulo: diplomado.pricing.titulo,
        subtitulo: diplomado.pricing.subtitulo,
        planNombre: diplomado.pricing.planNombre,
        badgeText: diplomado.pricing.badgeText,
        precio: diplomado.pricing.precio,
        precioTachado: diplomado.pricing.precioTachado,
        precioNota: diplomado.pricing.precioNota,
        descripcion: diplomado.pricing.descripcion,
        features: diplomado.pricing.features.map((text) => ({ text })),
        ctaLabel: diplomado.pricing.ctaLabel,
        ctaHref: diplomado.pricing.ctaHref,
        garantiaTexto: diplomado.pricing.garantiaTexto,
      },
      {
        blockType: 'faqRef',
        items: diplomadoFaqs
          .map((f) => maps.faq.get(`diplomado::${f.question}`))
          .filter((id): id is number => id !== undefined),
      },
      {
        blockType: 'ctaBanner',
        titulo: diplomado.ctaFinal.titulo,
        texto: diplomado.ctaFinal.texto,
        bullets: diplomado.ctaFinal.bullets.map((text) => ({ text })),
        boton: { label: diplomado.ctaFinal.botonLabel, href: diplomado.ctaFinal.botonHref },
      },
      {
        blockType: 'relatedLinks',
        links: diplomado.relatedLinks.map((l) => ({ label: l.label, href: l.href })),
      },
    ],
  }
}

function buildReto(mediaMap: Map<string, number>, maps: CollectionMaps): PageSeed {
  return {
    slug: 'reto',
    title: 'Reto 7 días',
    layout: [
      { blockType: 'barraUrgencia', texto: reto.urgencia },
      {
        blockType: 'retoHero',
        eyebrow: reto.hero.eyebrow,
        titulo: reto.hero.titulo,
        destacado: reto.hero.destacado,
        texto: reto.hero.texto,
        bullets: reto.hero.bullets.map((text) => ({ text })),
        precioTexto: reto.hero.precioTexto,
        ctas: reto.hero.ctas.map((c) => ({ label: c.label, href: c.href })),
        imagen: mediaId(mediaMap, reto.hero.imagen, 'reto.hero.imagen'),
      },
      {
        blockType: 'razonNoEscalas',
        titulo: reto.razonNoEscalas.titulo,
        parrafo: reto.razonNoEscalas.parrafo,
        frases: reto.razonNoEscalas.frases.map((text) => ({ text })),
      },
      {
        blockType: 'mentora',
        nombre: reto.mentora.nombre,
        rol: reto.mentora.rol,
        stats: reto.mentora.stats.map((s) => ({ valor: s.valor, etiqueta: s.etiqueta })),
        historia: reto.mentora.historia,
        quote: reto.mentora.quote,
        cierre: reto.mentora.cierre,
        foto: mediaId(mediaMap, reto.mentora.foto, 'reto.mentora.foto'),
      },
      {
        blockType: 'agenda',
        items: reto.agenda.map((d) => ({
          dia: d.dia,
          titulo: d.titulo,
          descripcion: d.descripcion,
          imagen: mediaId(mediaMap, d.imagen, `reto.agenda.${d.dia}`),
        })),
      },
      {
        blockType: 'comparacion',
        items: reto.comparacion.map((c) => ({ deSiempre: c.deSiempre, elReto: c.elReto })),
      },
      {
        blockType: 'incluye',
        items: reto.incluye.map((text) => ({ text })),
      },
      {
        blockType: 'premios',
        mayor: {
          titulo: reto.premios.mayor.titulo,
          imagen: mediaId(mediaMap, reto.premios.mayor.imagen, 'reto.premios.mayor.imagen'),
        },
        becas: {
          titulo: reto.premios.becas.titulo,
          imagen: mediaId(mediaMap, reto.premios.becas.imagen, 'reto.premios.becas.imagen'),
        },
        comoSeGana: reto.premios.comoSeGana,
      },
      {
        blockType: 'ganadores',
        ganadoresIntro: reto.ganadoresIntro,
        ganadores: reto.ganadores.map((g) => ({
          nombre: g.nombre,
          edicion: g.edicion,
          imagen: mediaId(mediaMap, g.imagen, `reto.ganadores.${g.nombre}`),
        })),
      },
      {
        blockType: 'retoPricing',
        precio: reto.pricing.precio,
        precioNota: reto.pricing.precioNota,
        incluyeTexto: reto.pricing.incluyeTexto,
        ctas: reto.pricing.ctas.map((c) => ({ label: c.label, href: c.href })),
        nota: reto.pricing.nota,
        whatsapp: reto.pricing.whatsapp,
      },
      {
        blockType: 'faqRef',
        items: reto.faq
          .map((f) => maps.faq.get(`reto::${f.pregunta}`))
          .filter((id): id is number => id !== undefined),
      },
      {
        blockType: 'ctaBanner',
        titulo: reto.ctaFinal.titulo,
        boton: { label: reto.ctaFinal.botonLabel, href: reto.ctaFinal.botonHref },
      },
    ],
  }
}

function buildQuienesSomos(mediaMap: Map<string, number>, maps: CollectionMaps): PageSeed {
  return {
    slug: 'quienes-somos',
    title: 'Quiénes somos',
    layout: [
      {
        blockType: 'sectionHeader',
        eyebrow: quienesSomosHero.eyebrow,
        titulo: quienesSomosHero.titulo,
        subtitulo: quienesSomosHero.subtitulo,
      },
      {
        blockType: 'historia',
        eyebrow: historia.eyebrow,
        titulo: historia.titulo,
        parrafos: historia.parrafos.map((texto) => ({ texto })),
        quote: { texto: historia.quote.texto, autor: historia.quote.autor },
      },
      {
        blockType: 'fundadora',
        eyebrow: fundadora.eyebrow,
        nombre: fundadora.nombre,
        rol: fundadora.rol,
        bio: fundadora.bio.map((texto) => ({ texto })),
        foto: mediaId(mediaMap, fundadora.foto, 'quienes-somos.fundadora.foto'),
      },
      {
        blockType: 'teamGridRef',
        items: idsFor(maps.teamMembers, QUIENES_SOMOS_TEAM_ORDER, 'quienes-somos.equipo'),
      },
      {
        blockType: 'metodologia',
        eyebrow: metodologia.eyebrow,
        titulo: metodologia.titulo,
        pilares: metodologia.pilares.map((p) => ({ nombre: p.nombre, descripcion: p.descripcion })),
      },
      {
        blockType: 'stats',
        items: stats.map((s) => ({ value: s.value, label: s.label })),
      },
      {
        blockType: 'ctaBanner',
        titulo: quienesSomosCtaFinal.titulo,
        texto: quienesSomosCtaFinal.texto,
        boton: { label: quienesSomosCtaFinal.botonLabel, href: quienesSomosCtaFinal.botonHref },
      },
    ],
  }
}

function buildTestimonios(mediaMap: Map<string, number>, maps: CollectionMaps): PageSeed {
  return {
    slug: 'testimonios',
    title: 'Testimonios',
    layout: [
      {
        blockType: 'sectionHeader',
        eyebrow: testimoniosHero.eyebrow,
        titulo: testimoniosHero.titulo,
        subtitulo: testimoniosHero.subtitulo,
      },
      {
        blockType: 'youtubeTestimonials',
        eyebrow: videosEyebrow,
        titulo: videosTitulo,
        videos: videoTestimonios.map((v) => ({ nombre: v.nombre, youtube: v.youtube })),
      },
      {
        blockType: 'testimonialRef',
        titulo: gridTitulo,
        items: Array.from(maps.testimonios.values()),
      },
      {
        blockType: 'logosRef',
        texto: logosBanda,
        items: idsFor(
          maps.clientes,
          trustedCompanies.map((c) => c.name),
          'testimonios.logos',
        ),
      },
      {
        blockType: 'retoGaleria',
        eyebrow: testimoniosReto.eyebrow,
        titulo: testimoniosReto.titulo,
        texto: testimoniosReto.texto,
        imagenes: retoImagenes
          .map((img) => mediaId(mediaMap, img.src, 'testimonios.retoGaleria'))
          .filter((id): id is number => id !== undefined),
      },
      {
        blockType: 'ctaBanner',
        titulo: testimoniosCta.titulo,
        texto: testimoniosCta.texto,
        boton: { label: testimoniosCta.botonLabel, href: testimoniosCta.botonHref },
      },
    ],
  }
}

function buildProgramasHub(maps: CollectionMaps): PageSeed {
  return {
    slug: 'programas',
    title: 'Programas',
    layout: [
      {
        blockType: 'sectionHeader',
        eyebrow: hubHero.eyebrow,
        titulo: hubHero.titulo,
        subtitulo: hubHero.subtitulo,
      },
      {
        blockType: 'programGridRef',
        titulo: 'Nuestros programas',
        boton: { label: 'Ver todos los programas', href: '/programas' },
        items: idsFor(maps.programas, PROGRAMAS_HUB_ORDER, 'programas-hub.programas'),
      },
      {
        blockType: 'ctaBanner',
        titulo: hubCtaFinal.titulo,
        texto: hubCtaFinal.texto,
        boton: { label: hubCtaFinal.botonLabel, href: hubCtaFinal.botonHref },
      },
      {
        blockType: 'relatedLinks',
        title: 'Antes de decidir',
        links: [
          { label: 'Lee las historias de nuestros estudiantes', href: '/testimonios' },
          { label: 'Conoce al equipo detrás de aprendoclub', href: '/quienes-somos' },
        ],
      },
    ],
  }
}

function buildTaller(): PageSeed {
  return {
    slug: 'programas/taller-seo-con-ia',
    title: 'Taller SEO con IA',
    layout: [
      {
        blockType: 'tallerHero',
        eyebrow: tallerHero.eyebrow,
        titulo: tallerHero.titulo,
        subtitulo: tallerHero.subtitulo,
        duracion: tallerHero.duracion,
      },
      {
        blockType: 'tallerIncluye',
        items: tallerIncluye.map((i) => ({ texto: i.texto, valor: i.valor })),
      },
      {
        blockType: 'tallerParaQuien',
        texto: tallerParaQuien,
      },
      {
        blockType: 'tallerPricing',
        monto: tallerPrecio.monto,
        opciones: tallerPrecio.opciones.map((o) => ({ texto: o.texto })),
        cta: { label: tallerCta.label, href: tallerCta.href },
      },
    ],
  }
}

/**
 * Crea/actualiza (upsert por slug) las 7 Pages con su `layout` de bloques, en
 * el orden actual de cada página real (app/(frontend)/(site)/**\/page.tsx).
 * Reusa exactamente el shaping de datos que scripts/seed/globals.ts usaba para
 * los 7 globals de página (ya eliminados, R02), envuelto en objetos de bloque.
 *
 * NO cutover: el sitio sigue leyendo content/*.ts. Estas Pages solo viven en
 * Payload, listas para Phase 15-17.
 */
export async function seedPages(payload: Payload, mediaMap: Map<string, number>, maps: CollectionMaps): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pld = payload as any

  const pages: PageSeed[] = [
    buildHome(mediaMap, maps),
    buildQuienesSomos(mediaMap, maps),
    buildTestimonios(mediaMap, maps),
    buildProgramasHub(maps),
    buildDiplomado(maps),
    buildReto(mediaMap, maps),
    buildTaller(),
  ]

  for (const page of pages) {
    const existing = await pld.find({ collection: 'pages', where: { slug: { equals: page.slug } }, limit: 1 })

    if (existing.docs.length > 0) {
      const id = Number(existing.docs[0].id)
      await pld.update({ collection: 'pages', id, data: { title: page.title, slug: page.slug, layout: page.layout }, context: { disableRevalidate: true } })
    } else {
      await pld.create({ collection: 'pages', data: { title: page.title, slug: page.slug, layout: page.layout }, context: { disableRevalidate: true } })
    }

    console.log(`[seed:pages] ${page.slug}: ${page.layout.length} bloques`)
  }
}
