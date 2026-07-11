import type { Block, Field } from 'payload'

import { linkFields } from '../fields/link'

/**
 * Espeja Diplomado.relatedLinks (array) y ProgramasHub.relatedLinks (group con
 * title + links). Se usa el shape más completo (title + links[]) para cubrir
 * ambos casos: en diplomado, title queda vacío/sin usar.
 */
export const relatedLinksFields: Field[] = [
  {
    name: 'title',
    type: 'text',
  },
  {
    name: 'links',
    type: 'array',
    fields: linkFields,
  },
]

export const RelatedLinksBlock: Block = {
  slug: 'relatedLinks',
  interfaceName: 'RelatedLinksBlock',
  labels: {
    singular: 'Links relacionados',
    plural: 'Links relacionados',
  },
  imageURL: '/block-previews/section-header.svg',
  imageAltText: 'Encabezado de sección con eyebrow y título',
  fields: relatedLinksFields,
}
