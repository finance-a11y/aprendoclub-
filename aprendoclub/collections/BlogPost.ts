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

export const BlogPost: CollectionConfig = {
  slug: 'blogposts',
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
    defaultColumns: ['title', 'category', 'author', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        // La ruta exacta del post (/{categoria}/{slug}) se revalida por path en
        // 18-04; aquí basta con refrescar el índice y las vistas de listado.
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
    { name: 'title', type: 'text', required: true, label: 'Título' },
    slugField,
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta descripción / extracto',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen destacada',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
      label: 'Categoría',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      hasMany: false,
      label: 'Autor',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Fecha de publicación',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Contenido',
    },
  ],
}

export default BlogPost
