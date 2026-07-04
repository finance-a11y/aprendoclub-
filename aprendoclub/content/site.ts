/**
 * Capa de contenido data-driven del shell del sitio (nav + footer).
 *
 * NAV-05: el contenido vive separado de la presentación en objetos tipados.
 * Cada interface espeja la forma de un futuro bloque/colección de Payload (v1.1),
 * de modo que la migración sea 1:1. Los componentes (navbar/footer) consumen
 * estos exports; no redefinen datos inline.
 */

/** Tipo de destino de un item de navegación. "route" → página real; "anchor" → ancla del home. */
export type NavItemType = "route" | "anchor";

/**
 * Item de navegación. Payload-ready: mapea 1:1 a un bloque `NavItem`
 * (label, href, type) de una colección/global de navegación.
 */
export interface NavItem {
  label: string;
  href: string;
  type: NavItemType;
}

/**
 * Columna del footer. Payload-ready: mapea a un bloque `FooterColumn`
 * con un array de links (label, href, external opcional).
 */
export interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

/**
 * Enlace social del footer. Payload-ready: mapea a un bloque `SocialLink`.
 * El icono NO vive aquí (es presentación); el componente lo resuelve por `id`.
 */
export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

/** Items del navbar (todos rutas reales en el shell de Fase 1). */
export const siteNav: NavItem[] = [
  { label: "Inicio", href: "/", type: "route" },
  { label: "Quiénes somos", href: "/quienes-somos", type: "route" },
  { label: "Programas", href: "/programas", type: "route" },
  { label: "Testimonios", href: "/testimonios", type: "route" },
];

/** CTA principal del navbar. Apunta al hub de programas, no al #precios del home. */
export const siteCta: NavItem = {
  label: "Únete ahora",
  href: "/programas",
  type: "route",
};

/** Columnas del footer, sin links muertos. */
export const footerColumns: FooterColumn[] = [
  {
    title: "Programas",
    links: [
      { label: "Diplomado", href: "/diplomado" },
      { label: "Taller SEO con IA", href: "/programas/taller-seo-con-ia" }, // resuelve Fase 4
      { label: "Reto 7 días", href: "/reto" }, // resuelve Fase 4
      { label: "Econía / SEOconía", href: "/programas/econia" }, // resuelve Fase 4
    ],
  },
  {
    title: "aprendoclub",
    links: [
      { label: "Quiénes somos", href: "/quienes-somos" },
      { label: "Testimonios", href: "/testimonios" },
    ],
  },
];

/**
 * Enlaces sociales reales (de app/links/page.tsx). Se omiten Instagram y LinkedIn
 * (no existen en /links; no se crean iconos con href muerto).
 */
export const footerSocials: SocialLink[] = [
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@aprendoclub",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://tiktok.com/@aprendo.club",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=13055728892",
  },
];

/** Textos de marca y copyright del footer + blurb del panel mobile del navbar. */
export const footerMeta = {
  blurb:
    "Academia de SEO + IA. Formación, comunidad y acompañamiento para especialistas.",
  copyrightLeft: "aprendoclub. Todos los derechos reservados.",
  copyrightRight: "Hecho con 💚 para la comunidad SEO",
  mobilePanelBlurb: "Membresía profesional SEO + IA",
};
