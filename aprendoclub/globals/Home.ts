import type { GlobalConfig } from 'payload'

import {
  ctaBannerFields,
  featureGridFields,
  faqRefFields,
  heroFields,
  linkGroup,
  logosRefFields,
  pricingFields,
  programGridRefFields,
  statsFields,
  testimonialRefFields,
} from '../blocks'

/**
 * Global de la home (/).
 * Fuente: content/home.ts. Cada sección hardcodeada hoy en los 9 componentes
 * del home (hero, problema, beneficios, programas, pricing, instructor,
 * testimonios, faq, cta final, sticky cta) queda modelada aquí, reusando los
 * blocks compartidos del Plan 02 (research §3).
 *
 * programas/testimonios/logos/faq son relationships a sus colecciones
 * (Programas, Testimonios, ClientesTrabajados, Faq); el filtro (featuredOnHome,
 * page=home) se aplica en el fetch de Fase 17.
 *
 * NO cutover — los componentes del home siguen leyendo su copy inline hasta
 * Fase 17.
 */
export const Home: GlobalConfig = {
  slug: 'home',
  admin: {
    group: 'Páginas',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        ...heroFields,
        // Campos propios del hero del home (no compartidos con heroFields):
        // avatares de estudiantes, texto de rating y video de fondo.
        {
          name: 'avatares',
          type: 'relationship',
          relationTo: 'media',
          hasMany: true,
          label: 'Avatares de estudiantes',
        },
        {
          name: 'ratingTexto',
          type: 'text',
        },
        {
          name: 'videoBackground',
          type: 'upload',
          relationTo: 'media',
          label: 'Video de fondo',
        },
      ],
    },
    {
      name: 'problema',
      type: 'group',
      label: 'Problema',
      fields: featureGridFields,
    },
    {
      name: 'beneficios',
      type: 'group',
      label: 'Beneficios',
      fields: featureGridFields,
    },
    {
      name: 'programas',
      type: 'group',
      label: 'Programas (referencia)',
      fields: programGridRefFields,
    },
    {
      name: 'pricing',
      type: 'group',
      fields: pricingFields,
    },
    {
      name: 'instructor',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
        },
        {
          name: 'nombre',
          type: 'text',
          required: true,
        },
        {
          name: 'rol',
          type: 'text',
          required: true,
        },
        {
          name: 'bioCorta1',
          type: 'textarea',
          required: true,
        },
        {
          name: 'bioCorta2',
          type: 'textarea',
          required: true,
        },
        {
          name: 'stats',
          type: 'group',
          fields: statsFields,
        },
        {
          name: 'foto',
          type: 'upload',
          relationTo: 'media',
        },
        linkGroup('teaser', 'Teaser (link a /quienes-somos)'),
      ],
    },
    {
      name: 'testimonios',
      type: 'group',
      label: 'Testimonios (referencia)',
      fields: testimonialRefFields,
    },
    {
      name: 'logos',
      type: 'group',
      label: 'Logos clientes (referencia)',
      fields: logosRefFields,
    },
    {
      name: 'faq',
      type: 'group',
      label: 'FAQ (referencia)',
      fields: faqRefFields,
    },
    {
      name: 'ctaFinal',
      type: 'group',
      label: 'CTA Final',
      fields: ctaBannerFields,
    },
    {
      name: 'stickyCta',
      type: 'group',
      label: 'CTA Sticky (mobile)',
      fields: [linkGroup('boton', 'Botón')],
    },
  ],
}

export default Home
