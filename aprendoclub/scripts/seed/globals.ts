import type { Payload } from 'payload'

import { footerColumns, footerMeta, footerSocials, programMenu, siteCta, siteNav } from '../../content/site'

import type { CollectionMaps } from './collections'

/**
 * Helpers de shaping compartidos con scripts/seed/pages.ts (R07). Se
 * re-exportan desde aquí por compatibilidad; pages.ts define su propia copia
 * para no crear un ciclo de imports entre ambos módulos.
 */
export function mediaId(mediaMap: Map<string, number>, publicPath: string | undefined, label: string): number | undefined {
  if (!publicPath) return undefined
  const id = mediaMap.get(publicPath)
  if (id === undefined) console.warn(`[seed:globals] media no encontrada para ${label}: ${publicPath}`)
  return id
}

export function idsFor(map: Map<string, number>, names: string[], label: string): number[] {
  return names
    .map((name) => {
      const id = map.get(name)
      if (id === undefined) console.warn(`[seed:globals] falta id de "${name}" para ${label}`)
      return id
    })
    .filter((id): id is number => id !== undefined)
}

export async function seedGlobals(
  payload: Payload,
  mediaMap: Map<string, number>,
  _maps: CollectionMaps,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pld = payload as any
  // --- site-settings ---
  await pld.updateGlobal({
    slug: 'site-settings',
    data: {
      navbar: {
        siteNav: siteNav.map((n) => ({ label: n.label, href: n.href, type: n.type })),
        siteCta: { label: siteCta.label, href: siteCta.href },
        programMenu: programMenu.map((m) => ({
          label: m.label,
          href: m.href,
          desc: m.desc,
          badge: m.badge,
        })),
      },
      footer: {
        footerColumns: footerColumns.map((c) => ({
          title: c.title,
          links: c.links.map((l) => ({ label: l.label, href: l.href, external: l.external ?? false })),
        })),
        footerSocials: footerSocials.map((s) => ({ socialId: s.id, label: s.label, href: s.href })),
        footerMeta: {
          blurb: footerMeta.blurb,
          copyrightLeft: footerMeta.copyrightLeft,
          copyrightRight: footerMeta.copyrightRight,
          mobilePanelBlurb: footerMeta.mobilePanelBlurb,
        },
      },
      seo: {
        siteUrl: 'https://aprendoclub.com',
        orgName: 'aprendoclub',
        orgAlternateName: 'aprendoseo',
        orgLogo: mediaId(mediaMap, '/logo.svg', 'site-settings.seo.orgLogo'),
        orgDescription:
          'Academia de SEO e IA para el mundo hispano. Formación práctica, comunidad y acompañamiento para especialistas.',
        orgFoundingDate: '2022',
        founderName: 'Arianna Lupi',
        founderJobTitle: 'Consultora SEO y Fundadora',
        sameAs: [
          { url: 'https://www.youtube.com/@aprendoclub' },
          { url: 'https://tiktok.com/@aprendo.club' },
        ],
      },
    },
  })
  console.log('[seed:globals] site-settings OK')
}
