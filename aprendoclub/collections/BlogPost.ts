import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

import { blogpostRedirectHook, captureRedirectFlag, createRedirectField } from '../lib/redirects'
import { validateYoutubeUrl } from '../lib/blog/youtube'
import { videoThumbnailHook } from '../lib/blog/video-thumbnail'

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
    beforeChange: [captureRedirectFlag, videoThumbnailHook],
    afterChange: [
      blogpostRedirectHook,
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
    createRedirectField('blogpost'),
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extracto',
      admin: {
        description:
          'Teaser para las tarjetas de listado. La meta description SEO vive en la pestaña SEO.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen destacada',
      admin: {
        description:
          'Opcional si el artículo tiene video de YouTube: se usa la miniatura del video. Sube una imagen aquí para sobrescribirla.',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video de YouTube',
      validate: validateYoutubeUrl,
      admin: {
        description:
          'Opcional. URL de un video normal de YouTube. Se incrusta justo después del primer párrafo.',
      },
    },
    {
      name: 'videoThumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Miniatura del video (automática)',
      admin: {
        readOnly: true,
        description:
          'Se genera sola al guardar el video y sirve de imagen destacada si no subes una propia.',
      },
    },
    {
      name: 'shortUrl',
      type: 'text',
      label: 'Short de YouTube',
      validate: validateYoutubeUrl,
      admin: {
        description:
          'Opcional. URL de un Short de YouTube. Aparece en la columna lateral, junto al índice del artículo.',
      },
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
