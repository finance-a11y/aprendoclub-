import type { Block, Field } from 'payload'

/**
 * Bloque de testimonios en video de YouTube (Phase 19, VID-01..04).
 * Cada item es un testimonio en video editable desde /admin (nombre + URL/ID
 * de YouTube). El render usa un facade click-to-play (thumbnail + botón play),
 * no monta el <iframe> hasta el click, así no descarga JS de YouTube en la
 * carga inicial. Reordenable/extensible por el editor sin tocar código.
 */
export const youtubeTestimonialsFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
  },
  {
    name: 'titulo',
    type: 'text',
  },
  {
    name: 'videos',
    type: 'array',
    labels: {
      singular: 'Testimonio en video',
      plural: 'Testimonios en video',
    },
    fields: [
      {
        name: 'nombre',
        type: 'text',
        required: true,
      },
      {
        name: 'youtube',
        type: 'text',
        required: true,
        label: 'URL o ID de YouTube',
        admin: {
          description:
            'Pega la URL completa (youtube.com/watch?v=..., youtu.be/..., /shorts/...) o solo el ID del video.',
        },
      },
    ],
  },
]

export const YoutubeTestimonialsBlock: Block = {
  slug: 'youtubeTestimonials',
  interfaceName: 'YoutubeTestimonialsBlock',
  labels: {
    singular: 'Testimonios en video (YouTube)',
    plural: 'Testimonios en video (YouTube)',
  },
  fields: youtubeTestimonialsFields,
}
