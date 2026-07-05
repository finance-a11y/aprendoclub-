import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Testimonios: CollectionConfig = {
  slug: 'testimonios',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'rol', 'featuredOnHome', 'orden'],
  },
  defaultSort: 'orden',
  hooks: {
    afterChange: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath('/testimonios')
        revalidatePath('/')
      },
    ],
    afterDelete: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath('/testimonios')
        revalidatePath('/')
      },
    ],
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'rol',
      type: 'text',
    },
    {
      name: 'ubicacion',
      type: 'text',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'orden',
      type: 'number',
    },
  ],
}

export default Testimonios
