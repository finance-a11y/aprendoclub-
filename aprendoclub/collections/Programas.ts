import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Programas: CollectionConfig = {
  slug: 'programas',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'slug', 'badge', 'orden'],
  },
  defaultSort: 'orden',
  hooks: {
    afterChange: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath('/programas')
        revalidatePath('/', 'layout')
      },
    ],
    afterDelete: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath('/programas')
        revalidatePath('/', 'layout')
      },
    ],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'badge',
      type: 'text',
      required: true,
    },
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'descripcion',
      type: 'textarea',
      required: true,
    },
    {
      name: 'precio',
      type: 'text',
      required: true,
    },
    {
      name: 'precioNota',
      type: 'text',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'ctaHref',
      type: 'text',
      required: true,
    },
    {
      name: 'orden',
      type: 'number',
    },
    {
      name: 'menuDesc',
      type: 'textarea',
    },
    {
      name: 'menuBadge',
      type: 'text',
    },
    {
      name: 'testimonios',
      type: 'relationship',
      relationTo: 'testimonios',
      hasMany: true,
    },
  ],
}

export default Programas
