import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const CiudadesSeo: CollectionConfig = {
  slug: 'ciudades-seo',
  admin: {
    useAsTitle: 'nombre',
    group: 'Contenido',
    defaultColumns: ['nombre', 'slug', 'pais', 'salarioPromedio'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        if (req?.context?.disableRevalidate) return
        if (doc?.slug) {
          revalidatePath(`/cursos-seo/${doc.slug}`)
        }
      },
    ],
    afterDelete: [
      ({ doc, req }) => {
        if (req?.context?.disableRevalidate) return
        if (doc?.slug) {
          revalidatePath(`/cursos-seo/${doc.slug}`)
        }
      },
    ],
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
      label: 'Nombre de la ciudad',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug (URL)',
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value !== 'string') return value
            return value.trim().toLowerCase().replace(/^\/+/, '').replace(/\/+$/, '')
          },
        ],
      },
    },
    {
      name: 'pais',
      type: 'select',
      required: true,
      label: 'País',
      options: [
        { label: 'España', value: 'España' },
        { label: 'México', value: 'México' },
        { label: 'Venezuela', value: 'Venezuela' },
      ],
    },
    {
      name: 'gentilicio',
      type: 'text',
      label: 'Gentilicio / Frase contextual',
      admin: {
        description: 'Ej: "en Valencia", "en Ciudad de México", "en Caracas"',
      },
    },
    {
      name: 'salarioPromedio',
      type: 'text',
      required: true,
      label: 'Rango Salarial Promedio',
      admin: {
        description: 'Ej: "€28.000 – €38.000 / año" o "$25,000 – $42,000 MXN / mes"',
      },
    },
    {
      name: 'salarioNota',
      type: 'textarea',
      label: 'Nota del Mercado Laboral',
      admin: {
        description: 'Explicación del salario para perfiles junior vs senior y trabajo remoto',
      },
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Preguntas Frecuentes Locales',
      fields: [
        {
          name: 'pregunta',
          type: 'text',
          required: true,
        },
        {
          name: 'respuesta',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      label: 'Metadatos SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
        },
      ],
    },
  ],
}

export default CiudadesSeo
