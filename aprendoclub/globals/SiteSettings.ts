import type { GlobalConfig } from 'payload'

import { linkGroup } from '../fields/link'

/**
 * Shell global: navbar + footer + SEO org fields.
 * Fuente: content/site.ts. NO cutover — navbar/footer components siguen leyendo
 * content/site.ts; este global solo hace el contenido editable en /admin.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Sitio',
  },
  fields: [
    {
      name: 'navbar',
      type: 'group',
      fields: [
        {
          name: 'siteNav',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Ruta', value: 'route' },
                { label: 'Ancla', value: 'anchor' },
              ],
            },
          ],
        },
        linkGroup('siteCta', 'CTA principal'),
        {
          name: 'programMenu',
          type: 'array',
          required: true,
          label: 'Menú de programas (megamenú)',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
            {
              name: 'desc',
              type: 'textarea',
              required: true,
            },
            {
              name: 'badge',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'footerColumns',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'external',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          name: 'footerSocials',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'id',
              type: 'select',
              required: true,
              options: [
                { label: 'YouTube', value: 'youtube' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'WhatsApp', value: 'whatsapp' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'LinkedIn', value: 'linkedin' },
              ],
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'footerMeta',
          type: 'group',
          fields: [
            {
              name: 'blurb',
              type: 'textarea',
              required: true,
            },
            {
              name: 'copyrightLeft',
              type: 'text',
              required: true,
            },
            {
              name: 'copyrightRight',
              type: 'text',
              required: true,
            },
            {
              name: 'mobilePanelBlurb',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO organización (JSON-LD, Phase 17)',
      fields: [
        {
          name: 'siteUrl',
          type: 'text',
          required: true,
        },
        {
          name: 'orgName',
          type: 'text',
          required: true,
        },
        {
          name: 'orgAlternateName',
          type: 'text',
        },
        {
          name: 'orgLogo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'orgDescription',
          type: 'textarea',
          required: true,
        },
        {
          name: 'orgFoundingDate',
          type: 'text',
          required: true,
        },
        {
          name: 'founderName',
          type: 'text',
          required: true,
        },
        {
          name: 'founderJobTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'sameAs',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export default SiteSettings
