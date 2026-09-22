import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Glosario: CollectionConfig = {
  slug: 'glosario',
  admin: {
    useAsTitle: 'termino',
    group: 'Contenido',
    defaultColumns: ['termino', 'letra', 'categoria', 'destacado', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        try {
          revalidatePath('/glosario')
        } catch {
          // No-op en entornos CLI
        }
      },
    ],
    afterDelete: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        try {
          revalidatePath('/glosario')
        } catch {
          // No-op en entornos CLI
        }
      },
    ],
  },
  fields: [
    {
      name: 'termino',
      type: 'text',
      required: true,
      label: 'Término o Concepto',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug (Ancla URL)',
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value.trim()) {
              return value
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            if (data?.termino && typeof data.termino === 'string') {
              return data.termino
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'definicion',
      type: 'textarea',
      required: true,
      label: 'Definición',
    },
    {
      name: 'letra',
      type: 'text',
      required: true,
      index: true,
      label: 'Letra Inicial (A-Z)',
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value.trim()) {
              return value.trim().toUpperCase()[0]
            }
            if (data?.termino && typeof data.termino === 'string') {
              const clean = data.termino
                .trim()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toUpperCase()
              return clean[0] || 'A'
            }
            return value
          },
        ],
      },
    },
    {
      name: 'categoria',
      type: 'select',
      required: true,
      defaultValue: 'basico',
      label: 'Categoría',
      options: [
        { label: 'Conceptos Básicos', value: 'basico' },
        { label: 'SEO Técnico', value: 'tecnico' },
        { label: 'SEO On-Page', value: 'onpage' },
        { label: 'SEO Off-Page / Link Building', value: 'offpage' },
        { label: 'Herramientas SEO', value: 'herramientas' },
        { label: 'IA y Motores de Búsqueda', value: 'ia-algoritmos' },
        { label: 'Métricas y Analítica', value: 'metricas' },
      ],
    },
    {
      name: 'ejemplo',
      type: 'textarea',
      label: 'Ejemplo o Aplicación Práctica (opcional)',
    },
    {
      name: 'destacado',
      type: 'checkbox',
      defaultValue: false,
      label: 'Término Destacado / Esencial',
    },
  ],
}

export default Glosario
