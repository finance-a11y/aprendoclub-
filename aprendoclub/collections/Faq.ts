import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Faq: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'page', 'orden'],
  },
  defaultSort: 'orden',
  hooks: {
    afterChange: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath('/diplomado')
        revalidatePath('/')
      },
    ],
    afterDelete: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath('/diplomado')
        revalidatePath('/')
      },
    ],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'page',
      type: 'select',
      required: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Diplomado', value: 'diplomado' },
        { label: 'Reto', value: 'reto' },
        { label: 'Taller SEO con IA', value: 'taller-seo-con-ia' },
      ],
    },
    {
      name: 'orden',
      type: 'number',
    },
  ],
}

export default Faq
