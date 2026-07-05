import type { Payload } from 'payload'

import { hero as diplomadoHero } from '../../content/diplomado'
import * as diplomado from '../../content/diplomado'
import { diplomadoFaqs, homeFaqs } from '../../content/faqs'
import * as home from '../../content/home'
import { homeProgramas } from '../../content/programas'
import { hubCtaFinal, hubHero } from '../../content/programas'
import {
  ctaFinal as quienesSomosCtaFinal,
  fundadora,
  hero as quienesSomosHero,
  historia,
  metodologia,
  stats,
} from '../../content/quienes-somos'
import * as reto from '../../content/reto'
import { footerColumns, footerMeta, footerSocials, programMenu, siteCta, siteNav } from '../../content/site'
import {
  tallerCta,
  tallerHero,
  tallerIncluye,
  tallerParaQuien,
  tallerPrecio,
} from '../../content/taller-seo-con-ia'
import {
  cta as testimoniosCta,
  gridTitulo,
  hero as testimoniosHero,
  logosBanda,
  reto as testimoniosReto,
  retoImagenes,
  trustedCompanies,
} from '../../content/testimonios'

import type { CollectionMaps } from './collections'

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

function mediaId(mediaMap: Map<string, number>, publicPath: string | undefined, label: string): number | undefined {
  if (!publicPath) return undefined
  const id = mediaMap.get(publicPath)
  if (id === undefined) console.warn(`[seed:globals] media no encontrada para ${label}: ${publicPath}`)
  return id
}

function idsFor(map: Map<string, number>, names: string[], label: string): number[] {
  return names
    .map((name) => {
      const id = map.get(name)
      if (id === undefined) console.warn(`[seed:globals] falta id de "${name}" para ${label}`)
      return id
    })
    .filter((id): id is number => id !== undefined)
}

export async function seedGlobals(
  payload: Payload,
  mediaMap: Map<string, number>,
  maps: CollectionMaps,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pld = payload as any
  // --- site-settings ---
  await pld.updateGlobal({
    slug: 'site-settings',
    data: {
      navbar: {
        siteNav: siteNav.map((n) => ({ label: n.label, href: n.href, type: n.type })),
        siteCta: { label: siteCta.label, href: siteCta.href },
        programMenu: programMenu.map((m) => ({
          label: m.label,
          href: m.href,
          desc: m.desc,
          badge: m.badge,
        })),
      },
      footer: {
        footerColumns: footerColumns.map((c) => ({
          title: c.title,
          links: c.links.map((l) => ({ label: l.label, href: l.href, external: l.external ?? false })),
        })),
        footerSocials: footerSocials.map((s) => ({ socialId: s.id, label: s.label, href: s.href })),
        footerMeta: {
          blurb: footerMeta.blurb,
          copyrightLeft: footerMeta.copyrightLeft,
          copyrightRight: footerMeta.copyrightRight,
          mobilePanelBlurb: footerMeta.mobilePanelBlurb,
        },
      },
      seo: {
        siteUrl: 'https://aprendoclub.com',
        orgName: 'aprendoclub',
        orgAlternateName: 'aprendoseo',
        orgLogo: mediaId(mediaMap, '/logo.svg', 'site-settings.seo.orgLogo'),
        orgDescription:
          'Academia de SEO e IA para el mundo hispano. Formación práctica, comunidad y acompañamiento para especialistas.',
        orgFoundingDate: '2022',
        founderName: 'Arianna Lupi',
        founderJobTitle: 'Consultora SEO y Fundadora',
        sameAs: [
          { url: 'https://www.youtube.com/@aprendoclub' },
          { url: 'https://tiktok.com/@aprendo.club' },
        ],
      },
    },
  })
  console.log('[seed:globals] site-settings OK')

  // --- programas-hub ---
  await pld.updateGlobal({
    slug: 'programas-hub',
    data: {
      hero: { eyebrow: hubHero.eyebrow, titulo: hubHero.titulo, subtitulo: hubHero.subtitulo },
      ctaFinal: {
        titulo: hubCtaFinal.titulo,
        texto: hubCtaFinal.texto,
        boton: { label: hubCtaFinal.botonLabel, href: hubCtaFinal.botonHref },
      },
      programas: idsFor(maps.programas, ['diplomado', 'taller-seo-con-ia', 'reto'], 'programas-hub.programas'),
    },
  })
  console.log('[seed:globals] programas-hub OK')

  // --- taller-seo-con-ia ---
  await pld.updateGlobal({
    slug: 'taller-seo-con-ia',
    data: {
      hero: {
        eyebrow: tallerHero.eyebrow,
        titulo: tallerHero.titulo,
        subtitulo: tallerHero.subtitulo,
        duracion: tallerHero.duracion,
      },
      incluye: tallerIncluye.map((i) => ({ texto: i.texto, valor: i.valor })),
      paraQuien: tallerParaQuien,
      precio: {
        monto: tallerPrecio.monto,
        opciones: tallerPrecio.opciones.map((o) => ({ texto: o.texto })),
      },
      cta: { label: tallerCta.label, href: tallerCta.href },
    },
  })
  console.log('[seed:globals] taller-seo-con-ia OK')

  // --- quienes-somos ---
  await pld.updateGlobal({
    slug: 'quienes-somos',
    data: {
      hero: {
        eyebrow: quienesSomosHero.eyebrow,
        titulo: quienesSomosHero.titulo,
        subtitulo: quienesSomosHero.subtitulo,
      },
      historia: {
        eyebrow: historia.eyebrow,
        titulo: historia.titulo,
        parrafos: historia.parrafos.map((texto) => ({ texto })),
        quote: { texto: historia.quote.texto, autor: historia.quote.autor },
      },
      fundadora: {
        eyebrow: fundadora.eyebrow,
        nombre: fundadora.nombre,
        rol: fundadora.rol,
        bio: fundadora.bio.map((texto) => ({ texto })),
        foto: mediaId(mediaMap, fundadora.foto, 'quienes-somos.fundadora.foto'),
      },
      equipo: {
        items: idsFor(maps.teamMembers, QUIENES_SOMOS_TEAM_ORDER, 'quienes-somos.equipo'),
      },
      metodologia: {
        eyebrow: metodologia.eyebrow,
        titulo: metodologia.titulo,
        pilares: metodologia.pilares.map((p) => ({ nombre: p.nombre, descripcion: p.descripcion })),
      },
      stats: {
        items: stats.map((s) => ({ value: s.value, label: s.label })),
      },
      ctaFinal: {
        titulo: quienesSomosCtaFinal.titulo,
        texto: quienesSomosCtaFinal.texto,
        boton: { label: quienesSomosCtaFinal.botonLabel, href: quienesSomosCtaFinal.botonHref },
      },
    },
  })
  console.log('[seed:globals] quienes-somos OK')

  // --- testimonios-page ---
  await pld.updateGlobal({
    slug: 'testimonios-page',
    data: {
      hero: {
        eyebrow: testimoniosHero.eyebrow,
        titulo: testimoniosHero.titulo,
        subtitulo: testimoniosHero.subtitulo,
      },
      gridTitulo,
      logos: {
        texto: logosBanda,
        items: idsFor(
          maps.clientes,
          trustedCompanies.map((c) => c.name),
          'testimonios-page.logos',
        ),
      },
      reto: {
        eyebrow: testimoniosReto.eyebrow,
        titulo: testimoniosReto.titulo,
        texto: testimoniosReto.texto,
      },
      retoGaleria: retoImagenes
        .map((img) => mediaId(mediaMap, img.src, 'testimonios-page.retoGaleria'))
        .filter((id): id is number => id !== undefined),
      cta: {
        titulo: testimoniosCta.titulo,
        texto: testimoniosCta.texto,
        boton: { label: testimoniosCta.botonLabel, href: testimoniosCta.botonHref },
      },
    },
  })
  console.log('[seed:globals] testimonios-page OK')

  // --- reto ---
  await pld.updateGlobal({
    slug: 'reto',
    data: {
      urgencia: reto.urgencia,
      hero: {
        eyebrow: reto.hero.eyebrow,
        titulo: reto.hero.titulo,
        destacado: reto.hero.destacado,
        texto: reto.hero.texto,
        bullets: reto.hero.bullets.map((text) => ({ text })),
        precioTexto: reto.hero.precioTexto,
        ctas: reto.hero.ctas.map((c) => ({ label: c.label, href: c.href })),
        imagen: mediaId(mediaMap, reto.hero.imagen, 'reto.hero.imagen'),
      },
      razonNoEscalas: {
        titulo: reto.razonNoEscalas.titulo,
        parrafo: reto.razonNoEscalas.parrafo,
        frases: reto.razonNoEscalas.frases.map((text) => ({ text })),
      },
      mentora: {
        nombre: reto.mentora.nombre,
        rol: reto.mentora.rol,
        stats: reto.mentora.stats.map((s) => ({ valor: s.valor, etiqueta: s.etiqueta })),
        historia: reto.mentora.historia,
        quote: reto.mentora.quote,
        cierre: reto.mentora.cierre,
        foto: mediaId(mediaMap, reto.mentora.foto, 'reto.mentora.foto'),
      },
      agenda: reto.agenda.map((d) => ({
        dia: d.dia,
        titulo: d.titulo,
        descripcion: d.descripcion,
        imagen: mediaId(mediaMap, d.imagen, `reto.agenda.${d.dia}`),
      })),
      comparacion: reto.comparacion.map((c) => ({ deSiempre: c.deSiempre, elReto: c.elReto })),
      incluye: reto.incluye.map((text) => ({ text })),
      premios: {
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
      pricing: {
        precio: reto.pricing.precio,
        precioNota: reto.pricing.precioNota,
        incluyeTexto: reto.pricing.incluyeTexto,
        ctas: reto.pricing.ctas.map((c) => ({ label: c.label, href: c.href })),
        nota: reto.pricing.nota,
        whatsapp: reto.pricing.whatsapp,
      },
      ganadoresIntro: reto.ganadoresIntro,
      ganadores: reto.ganadores.map((g) => ({
        nombre: g.nombre,
        edicion: g.edicion,
        imagen: mediaId(mediaMap, g.imagen, `reto.ganadores.${g.nombre}`),
      })),
      faq: reto.faq
        .map((f) => maps.faq.get(`reto::${f.pregunta}`))
        .filter((id): id is number => id !== undefined),
      ctaFinal: {
        titulo: reto.ctaFinal.titulo,
        botonLabel: reto.ctaFinal.botonLabel,
        botonHref: reto.ctaFinal.botonHref,
      },
    },
  })
  console.log('[seed:globals] reto OK')

  // --- home ---
  await pld.updateGlobal({
    slug: 'home',
    data: {
      hero: {
        badgeText: home.hero.badgeText,
        tituloPre: home.hero.tituloPre,
        tituloAccent: home.hero.tituloAccent,
        subtitulo: home.hero.subtitulo,
        ctaPrimario: { label: home.hero.ctaPrimario.label, href: home.hero.ctaPrimario.href },
        ctaSecundario: { label: home.hero.ctaSecundario.label, href: home.hero.ctaSecundario.href },
        avatares: home.hero.avatares
          .map((src) => mediaId(mediaMap, src, 'home.hero.avatares'))
          .filter((id): id is number => id !== undefined),
        ratingTexto: home.hero.ratingTexto,
        videoBackground: mediaId(mediaMap, home.hero.videoBackground, 'home.hero.videoBackground'),
      },
      problema: {
        eyebrow: home.problema.eyebrow,
        titulo: home.problema.titulo,
        subtitulo: home.problema.subtitulo,
        items: home.problema.items.map((i) => ({ icon: i.icon, titulo: i.titulo, descripcion: i.descripcion })),
      },
      beneficios: {
        eyebrow: home.beneficios.eyebrow,
        titulo: home.beneficios.titulo,
        subtitulo: home.beneficios.subtitulo,
        items: home.beneficios.items.map((i) => ({ icon: i.icon, titulo: i.titulo, descripcion: i.descripcion })),
      },
      programas: {
        eyebrow: homeProgramas.eyebrow,
        titulo: homeProgramas.titulo,
        subtitulo: homeProgramas.subtitulo,
        boton: { label: homeProgramas.botonLabel, href: homeProgramas.botonHref },
        items: idsFor(maps.programas, ['diplomado', 'taller-seo-con-ia', 'reto'], 'home.programas'),
      },
      pricing: {
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
          cta: {
            label: home.pricing.ctaAsesoria.botonLabel,
            href: home.pricing.ctaAsesoria.botonHref,
          },
        },
      },
      instructor: {
        eyebrow: home.instructor.eyebrow,
        nombre: home.instructor.nombre,
        rol: home.instructor.rol,
        bioCorta1: home.instructor.bioCorta1,
        bioCorta2: home.instructor.bioCorta2,
        stats: { items: home.instructor.stats.map((s) => ({ value: s.value, label: s.label })) },
        foto: mediaId(mediaMap, home.instructor.foto, 'home.instructor.foto'),
        teaser: { label: home.instructor.teaserLabel, href: home.instructor.teaserHref },
      },
      testimonios: {
        eyebrow: home.testimoniosHome.eyebrow,
        titulo: home.testimoniosHome.titulo,
        items: maps.testimoniosFeatured,
      },
      logos: {
        texto: home.testimoniosHome.logosBanda,
        items: idsFor(
          maps.clientes,
          trustedCompanies.map((c) => c.name),
          'home.logos',
        ),
      },
      faq: {
        eyebrow: home.faqHome.eyebrow,
        titulo: home.faqHome.titulo,
        items: homeFaqs
          .map((f) => maps.faq.get(`home::${f.question}`))
          .filter((id): id is number => id !== undefined),
      },
      ctaFinal: {
        titulo: home.ctaFinal.titulo,
        boton: { label: home.ctaFinal.botonLabel, href: home.ctaFinal.botonHref },
      },
      stickyCta: {
        boton: { label: home.stickyCta.botonLabel, href: home.stickyCta.botonHref },
      },
    },
  })
  console.log('[seed:globals] home OK')

  // --- diplomado ---
  await pld.updateGlobal({
    slug: 'diplomado',
    data: {
      hero: {
        badgeText: diplomadoHero.badgeText,
        tituloPre: diplomadoHero.tituloPre,
        tituloAccent: diplomadoHero.tituloAccent,
        tituloPost: diplomadoHero.tituloPost,
        subtitulo: diplomadoHero.subtitulo,
        ctaPrimario: { label: diplomadoHero.ctaPrimario.label, href: diplomadoHero.ctaPrimario.href },
        ctaSecundario: { label: diplomadoHero.ctaSecundario.label, href: diplomadoHero.ctaSecundario.href },
        microcopy: diplomadoHero.microcopy,
      },
      origin: {
        eyebrow: diplomado.origin.eyebrow,
        titulo: diplomado.origin.titulo,
        items: diplomado.origin.tarjetas.map((t) => ({ icon: t.icon, titulo: t.texto, descripcion: undefined })),
      },
      audience: {
        titulo: diplomado.audience.titulo,
        subtitulo: diplomado.audience.subtitulo,
        tituloPerfiles: diplomado.audience.tituloPerfiles,
        perfiles: diplomado.audience.perfiles.map((text) => ({ text })),
        tituloDudas: diplomado.audience.tituloDudas,
        dudas: diplomado.audience.dudas.map((text) => ({ text })),
        notaFinal: diplomado.audience.notaFinal,
      },
      methodology: {
        eyebrow: diplomado.methodology.eyebrow,
        titulo: diplomado.methodology.titulo,
        subtitulo: diplomado.methodology.subtitulo,
        items: diplomado.methodology.pilares.map((p) => ({
          icon: p.icon,
          titulo: p.titulo,
          descripcion: p.descripcion,
        })),
      },
      curriculum: {
        eyebrow: diplomado.curriculum.eyebrow,
        titulo: diplomado.curriculum.titulo,
        semanas: diplomado.curriculum.semanas.map((s) => ({
          numero: s.numero,
          titulo: s.titulo,
          detalle: s.detalle,
        })),
      },
      howItWorks: {
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
      team: {
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
      benefits: {
        eyebrow: diplomado.benefits.eyebrow,
        titulo: diplomado.benefits.titulo,
        subtitulo: diplomado.benefits.subtitulo,
        items: diplomado.benefits.items.map((i) => ({ texto: i.texto, valor: i.valor })),
        extras: diplomado.benefits.extras.map((text) => ({ text })),
      },
      pricing: {
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
      faq: {
        items: diplomadoFaqs
          .map((f) => maps.faq.get(`diplomado::${f.question}`))
          .filter((id): id is number => id !== undefined),
      },
      ctaFinal: {
        titulo: diplomado.ctaFinal.titulo,
        texto: diplomado.ctaFinal.texto,
        bullets: diplomado.ctaFinal.bullets.map((text) => ({ text })),
        boton: { label: diplomado.ctaFinal.botonLabel, href: diplomado.ctaFinal.botonHref },
      },
      relatedLinks: diplomado.relatedLinks.map((l) => ({ label: l.label, href: l.href })),
      courseMeta: {
        price: diplomado.courseMeta.price,
        courseWorkload: diplomado.courseMeta.courseWorkload,
        startDate: diplomado.courseMeta.startDate,
      },
    },
  })
  console.log('[seed:globals] diplomado OK')
}
