import type { Payload } from 'payload'

import type { CollectionMaps } from './collections'

/**
 * Datos históricos del shell (antes en content/site.ts, eliminado en Phase 15
 * al migrar navbar/footer a Payload — ver 15-01). Se conservan aquí solo como
 * fuente de este seed one-off; el shell en vivo ya lee de site-settings/programas.
 */
const siteNav = [
  { label: 'Inicio', href: '/', type: 'route' as const },
  { label: 'Quiénes somos', href: '/quienes-somos', type: 'route' as const },
  { label: 'Programas', href: '/programas', type: 'route' as const },
  { label: 'Testimonios', href: '/testimonios', type: 'route' as const },
]

const siteCta = { label: 'Únete ahora', href: '/programas' }

const programMenu = [
  {
    label: 'Diplomado de cero a SEO',
    href: '/diplomado',
    desc: '16 semanas para convertirte en especialista SEO.',
    badge: 'Programa estrella',
  },
  {
    label: 'Taller de SEO con IA',
    href: '/programas/taller-seo-con-ia',
    desc: '15 días para posicionar en Google, ChatGPT y Gemini.',
    badge: '$49.99',
  },
  {
    label: 'Reto 7 días',
    href: '/reto',
    desc: '7 días para elegir tu especialidad y cobrar en dólares.',
    badge: '$20',
  },
]

const footerColumns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: 'Programas',
    links: [
      { label: 'Diplomado', href: '/diplomado' },
      { label: 'Taller SEO con IA', href: '/programas/taller-seo-con-ia' },
      { label: 'Reto 7 días', href: '/reto' },
    ],
  },
  {
    title: 'aprendoclub',
    links: [
      { label: 'Quiénes somos', href: '/quienes-somos' },
      { label: 'Testimonios', href: '/testimonios' },
    ],
  },
]

const footerSocials = [
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@aprendoclub' },
  { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@aprendo.club' },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=13055728892' },
]

const footerMeta = {
  blurb: 'Academia de marketing con IA. Formación, comunidad y acompañamiento para especialistas.',
  copyrightLeft: 'aprendoclub. Todos los derechos reservados.',
  copyrightRight: 'Hecho con 💚 para la comunidad SEO',
  mobilePanelBlurb: 'Membresía profesional de marketing con IA',
}

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
          'Academia de marketing con IA para el mundo hispano. Formación práctica, comunidad y acompañamiento para especialistas.',
        orgFoundingDate: '2022',
        founderName: 'Arianna Lupi',
        founderJobTitle: 'Consultora SEO y Fundadora',
        sameAs: [
          { url: 'https://www.youtube.com/@aprendoclub' },
          { url: 'https://tiktok.com/@aprendo.club' },
        ],
      },
    },
    context: { disableRevalidate: true },
  })
  console.log('[seed:globals] site-settings OK')
}
