import type { GlobalConfig } from 'payload'

import { LLMS_TXT_SEED, LLMS_FULL_SEED } from '../lib/llms/seed'

/**
 * Contenido de /llms.txt y /llms-full.txt, editable desde /admin.
 * El valor inicial (defaultValue) se generó a partir del contenido real del
 * sitio; a partir de ahí se edita a mano en el panel. Las rutas
 * app/llms.txt/route.ts y app/llms-full.txt/route.ts leen estos campos.
 */
export const Llms: GlobalConfig = {
  slug: 'llms',
  label: 'llms.txt',
  admin: {
    group: 'Sitio',
    description:
      'Archivos para agentes de IA (estándar llms.txt). Editables acá; se publican en /llms.txt y /llms-full.txt.',
  },
  fields: [
    {
      name: 'llmsTxt',
      type: 'textarea',
      required: true,
      label: 'llms.txt (índice conciso)',
      defaultValue: LLMS_TXT_SEED,
      admin: {
        rows: 22,
        description: 'Se publica en /llms.txt — resumen y enlaces clave en Markdown.',
      },
    },
    {
      name: 'llmsFull',
      type: 'textarea',
      required: true,
      label: 'llms-full.txt (contenido completo)',
      defaultValue: LLMS_FULL_SEED,
      admin: {
        rows: 30,
        description:
          'Se publica en /llms-full.txt — índice extendido con todos los artículos y extractos.',
      },
    },
  ],
}

export default Llms
