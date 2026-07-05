import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

const slugField = {
  name: 'slug',
  type: 'text' as const,
  required: true,
  unique: true,
  index: true,
  label: 'Slug',
  hooks: {
    beforeValidate: [
      ({ value }: { value?: unknown }) => {
        if (typeof value !== 'string') return value
        return value.trim().toLowerCase().replace(/^\/+/, '').replace(/\/+$/, '')
      },
    ],
  },
}

export const Category: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Blog',
    defaultColumns: ['name', 'slug'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath('/blog')
      },
    ],
    afterDelete: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath('/blog')
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nombre' },
    slugField,
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      admin: {
        description:
          'Copy propio de aprendoclub para el índice de la categoría (aprendoseo no tenía descripción real por categoría).',
      },
    },
  ],
}

export default Category
