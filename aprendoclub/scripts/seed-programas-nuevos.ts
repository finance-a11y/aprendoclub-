import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await getPayload({ config })
  console.log('--- Iniciando Seed de Nuevos Programas (RDSS y Básico) en Neon DB ---')

  // Obtener IDs de testimonios destacados para vincular
  const testimoniosRes = await payload.find({
    collection: 'testimonios',
    where: { featuredOnHome: { equals: true } },
    limit: 3,
  })
  const testimonialIds = testimoniosRes.docs.map((t) => t.id)

  // 1. Colección Pages: Curso SEO RDSS
  const rdssSlug = 'programas/curso-seo-rdss'
  const rdssPageData = {
    title: 'Curso SEO RDSS — Taller de 2 Horas',
    slug: rdssSlug,
    layout: [
      {
        blockType: 'hero' as const,
        badgeText: 'Taller Intensivo 2h',
        eyebrow: 'Metodología Práctica con Arianna Lupi',
        tituloPre: 'Curso SEO RDSS:',
        tituloAccent: 'Auditoría y Optimización Exprés',
        tituloPost: 'en 2 Horas',
        subtitulo:
          'Aprende a auditar sitios web, encontrar quick wins de tráfico orgánico y priorizar cambios técnicos con alto retorno de inversión. Sin rodeos teóricos, directo al grano.',
        ctaPrimario: {
          label: 'Inscribirme al taller ($30 USD)',
          href: '#inscribirme',
        },
        ctaSecundario: {
          label: 'Ver temario',
          href: '#temario',
        },
      },
      {
        blockType: 'featureGrid' as const,
        eyebrow: 'Contenido del Taller',
        titulo: 'Todo lo que aprenderás en 120 minutos de formación intensiva',
        subtitulo:
          'Diseñado para profesionales y dueños de negocio que necesitan resultados rápidos sin perder semanas en teoría abstracta.',
        items: [
          {
            icon: 'search',
            titulo: '1. Diagnóstico y Auditoría Rápida',
            descripcion:
              'Cómo identificar los cuellos de botella de indexación y rastreo en menos de 30 minutos con herramientas accesibles.',
            iconMode: 'icon' as const,
            iconColor: 'accent' as const,
          },
          {
            icon: 'zap',
            titulo: '2. Detección de Quick Wins',
            descripcion:
              'Estrategias para encontrar palabras clave en posiciones 4 a 15 y empujarlas al top 3 con ajustes de copy y metadatos.',
            iconMode: 'icon' as const,
            iconColor: 'accent' as const,
          },
          {
            icon: 'target',
            titulo: '3. Canibalizaciones y Arquitectura',
            descripcion:
              'Cómo limpiar URLs duplicadas o canibalizadas para concentrar la autoridad orgánica en tus páginas más rentables.',
            iconMode: 'icon' as const,
            iconColor: 'primary' as const,
          },
          {
            icon: 'briefcase',
            titulo: '4. Propuestas para Clientes',
            descripcion:
              'Estructura de reporte ejecutivo para presentar hallazgos a clientes o stakeholders y cobrar por auditorías accionables.',
            iconMode: 'icon' as const,
            iconColor: 'primary' as const,
          },
        ],
      },
      {
        blockType: 'ctaBanner' as const,
        titulo: 'Accede al Taller SEO RDSS por solo $30 USD',
        texto:
          'Incluye acceso a la grabación completa en alta definición, plantillas de auditoría en Google Sheets y recursos complementarios.',
        boton: {
          label: 'Comprar Taller ($30 USD)',
          href: 'https://www.aprendoclub.com/programas/curso-seo-rdss#inscribirme',
        },
      },
    ],
  }

  const existingRdss = await payload.find({
    collection: 'pages',
    where: { slug: { equals: rdssSlug } },
    limit: 1,
  })

  if (existingRdss.docs[0]) {
    console.log(`Actualizando página: ${rdssSlug}`)
    await payload.update({
      collection: 'pages',
      id: existingRdss.docs[0].id,
      data: rdssPageData,
      context: { disableRevalidate: true },
    })
  } else {
    console.log(`Creando página: ${rdssSlug}`)
    await payload.create({
      collection: 'pages',
      data: rdssPageData,
      context: { disableRevalidate: true },
    })
  }

  // 2. Colección Pages: Curso Básico de SEO
  const basicoSlug = 'programas/curso-basico-de-seo'
  const basicoPageData = {
    title: 'Curso Básico de SEO — Aprende desde Cero',
    slug: basicoSlug,
    layout: [
      {
        blockType: 'hero' as const,
        badgeText: 'Curso Gratuito',
        eyebrow: 'Iniciación al Posicionamiento Web',
        tituloPre: 'Curso Básico de SEO:',
        tituloAccent: 'Domina los Fundamentos',
        tituloPost: 'desde Cero',
        subtitulo:
          'Entiende cómo funciona Google, cómo investigar las palabras que buscan tus clientes y cómo optimizar tu web sin tecnicismos ni conocimientos previos de código.',
        ctaPrimario: {
          label: 'Comenzar Gratis',
          href: '#registro',
        },
        ctaSecundario: {
          label: 'Ver temario',
          href: '#temario',
        },
      },
      {
        blockType: 'featureGrid' as const,
        eyebrow: 'Objetivos de Aprendizaje',
        titulo: 'Los 4 pilares esenciales para iniciar en SEO con bases sólidas',
        subtitulo:
          'Al finalizar este curso tendrás un entendimiento claro de cómo lograr que cualquier página comience a posicionar en Google.',
        items: [
          {
            icon: 'compass',
            titulo: '1. Rastreo e Indexación',
            descripcion:
              'Cómo los robots de Google descubren, leen y guardan las páginas en su índice, y qué señales indican que tu sitio está listo para competir.',
            iconMode: 'icon' as const,
            iconColor: 'accent' as const,
          },
          {
            icon: 'search',
            titulo: '2. Keyword Research',
            descripcion:
              'Aprende a buscar qué términos usa tu audiencia real y cómo clasificar las palabras según su intención (informativa, transaccional o de navegación).',
            iconMode: 'icon' as const,
            iconColor: 'accent' as const,
          },
          {
            icon: 'fileText',
            titulo: '3. Optimización On-Page',
            descripcion:
              'Aplica títulos magnéticos, etiquetas H1-H3, enlaces internos coherentes y meta descripciones que maximicen la tasa de clics (CTR).',
            iconMode: 'icon' as const,
            iconColor: 'primary' as const,
          },
          {
            icon: 'barChart2',
            titulo: '4. Google Search Console',
            descripcion:
              'Instala y analiza la herramienta oficial de Google: interpreta clics, impresiones, posición media y detecta oportunidades de mejora.',
            iconMode: 'icon' as const,
            iconColor: 'primary' as const,
          },
        ],
      },
      ...(testimonialIds.length > 0
        ? [
            {
              blockType: 'testimonialRef' as const,
              eyebrow: 'Casos Reales',
              titulo: 'Lo que dicen quienes empezaron desde cero en aprendoclub',
              items: testimonialIds,
            },
          ]
        : []),
      {
        blockType: 'ctaBanner' as const,
        titulo: 'Empieza hoy mismo tu formación en SEO sin costo',
        texto:
          'Acceso inmediato a los 4 módulos introductorios con explicaciones directas y ejemplos prácticos.',
        boton: {
          label: 'Registrarme Gratis',
          href: 'https://www.aprendoclub.com/programas/curso-basico-de-seo#registro',
        },
      },
    ],
  }

  const existingBasico = await payload.find({
    collection: 'pages',
    where: { slug: { equals: basicoSlug } },
    limit: 1,
  })

  if (existingBasico.docs[0]) {
    console.log(`Actualizando página: ${basicoSlug}`)
    await payload.update({
      collection: 'pages',
      id: existingBasico.docs[0].id,
      data: basicoPageData,
      context: { disableRevalidate: true },
    })
  } else {
    console.log(`Creando página: ${basicoSlug}`)
    await payload.create({
      collection: 'pages',
      data: basicoPageData,
      context: { disableRevalidate: true },
    })
  }

  // 3. Colección Programas: Catálogo general
  const programasNuevos = [
    {
      slug: 'curso-seo-rdss',
      nombre: 'Curso SEO RDSS',
      badge: 'Taller 2h',
      precio: '$30 USD',
      precioNota: 'Pago único',
      ctaLabel: 'Ver taller',
      ctaHref: '/programas/curso-seo-rdss',
      orden: 4,
      descripcion:
        'Taller práctico intensivo de 2 horas dictado por Arianna Lupi para aprender a auditar y optimizar sitios web rápidamente.',
    },
    {
      slug: 'curso-basico-de-seo',
      nombre: 'Curso Básico de SEO',
      badge: 'Curso Gratuito',
      precio: 'Gratis',
      precioNota: 'Acceso libre',
      ctaLabel: 'Ver curso',
      ctaHref: '/programas/curso-basico-de-seo',
      orden: 5,
      descripcion:
        'Los 4 pilares fundamentales del posicionamiento en buscadores explicados paso a paso para principiantes sin tecnicismos.',
    },
  ]

  for (const p of programasNuevos) {
    const existingProg = await payload.find({
      collection: 'programas',
      where: { slug: { equals: p.slug } },
      limit: 1,
    })

    if (existingProg.docs[0]) {
      console.log(`Actualizando programa en catálogo: ${p.nombre}`)
      await payload.update({
        collection: 'programas',
        id: existingProg.docs[0].id,
        data: p,
        context: { disableRevalidate: true },
      })
    } else {
      console.log(`Creando programa en catálogo: ${p.nombre}`)
      await payload.create({
        collection: 'programas',
        data: p,
        context: { disableRevalidate: true },
      })
    }
  }

  console.log('--- Seed de Programas Nuevos completado con éxito ---')
  await payload.destroy()
  process.exit(0)
}

run().catch((err) => {
  console.error('Error en seed de nuevos programas:', err)
  process.exit(1)
})
