import type { Block, Field } from 'payload'

/**
 * Galería de fotos reales del Diplomado (IMG-01, Phase 24). Espejo 1:1 de
 * `blocks/RetoGaleria.ts` (misma forma de fields: eyebrow/titulo/texto +
 * imagenes relationship hasMany a media); solo cambian slug/labels/copy.
 */
export const diplomadoGaleriaFields: Field[] = [
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
    label: 'Galería del Diplomado',
    admin: {
      description:
        'Galería de fotos reales del Diplomado (clases, proyectos, comunidad). 3 a 6 imágenes recomendadas, cada una 800–1200px de ancho, cualquier proporción (funciona como mosaico), JPG/WEBP, máx. 200KB c/u. Reemplaza los placeholders subiendo los archivos reales aquí.',
    },
  },
]

export const DiplomadoGaleriaBlock: Block = {
  slug: 'diplomadoGaleria',
  interfaceName: 'DiplomadoGaleriaBlock',
  labels: {
    singular: 'Galería del Diplomado',
    plural: 'Galería del Diplomado',
  },
  imageURL: '/block-previews/gallery-grid.svg',
  imageAltText: 'Mosaico de imágenes de tamaños desiguales',
  fields: diplomadoGaleriaFields,
}
