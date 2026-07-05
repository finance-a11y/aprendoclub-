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

export const Author: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    group: 'Blog',
    defaultColumns: ['name', 'role', 'slug'],
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
    { name: 'role', type: 'text', label: 'Rol / cargo' },
    { name: 'bio', type: 'textarea', label: 'Bio' },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
  ],
}

export default Author
