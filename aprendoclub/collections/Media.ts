import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    // Sitio público: las imágenes deben ser legibles sin login (si no,
    // /api/media/file/* devuelve 403 y next/image rompe). Crear/editar/borrar
    // quedan restringidos al admin por el default de Payload.
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'video/mp4'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: undefined,
      },
      {
        name: 'card',
        width: 768,
        height: undefined,
      },
      {
        name: 'hero',
        width: 1600,
        height: undefined,
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}

export default Media
