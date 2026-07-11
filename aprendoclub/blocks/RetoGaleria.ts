import type { Block, Field } from 'payload'

/**
 * Fusiona TestimoniosPage.reto (cabecera: eyebrow/titulo/texto) +
 * TestimoniosPage.retoGaleria (relationship media hasMany) en un solo bloque
 * de galería.
 */
export const retoGaleriaFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
    required: true,
  },
  {
    name: 'titulo',
    type: 'text',
    required: true,
  },
  {
    name: 'texto',
    type: 'textarea',
    required: true,
  },
  {
    name: 'imagenes',
    type: 'relationship',
    relationTo: 'media',
    hasMany: true,
    label: 'Galería del Reto',
  },
]

export const RetoGaleriaBlock: Block = {
  slug: 'retoGaleria',
  interfaceName: 'RetoGaleriaBlock',
  labels: {
    singular: 'Galería del Reto',
    plural: 'Galería del Reto',
  },
  imageURL: '/block-previews/gallery-grid.svg',
  imageAltText: 'Mosaico de imágenes de tamaños desiguales',
  fields: retoGaleriaFields,
}
