/**
 * Capa de contenido data-driven del hub de programas (Fase 4).
 *
 * PROG-01 / PROG-06: el contenido vive separado de la presentación en objetos
 * tipados. Cada interface espeja la forma de un futuro bloque/colección de Payload
 * (v1.1), de modo que la migración sea 1:1. El hub /programas y la sección del home
 * consumen estos exports; no redefinen copy inline.
 *
 * REGLA: toda la copia proviene VERBATIM de 04-CONTENT-SOURCE.md (ya humanizada:
 * español neutro, sin em/en dashes, sin AI tells). No parafrasear ni reescribir.
 */

/**
 * Programa de la oferta educativa. Payload-ready: item de la colección `Program`
 * (badge, nombre, descripcion, precio, precioNota, cta). El CTA apunta a la página
 * dedicada de cada programa.
 */
export interface Program {
  id: string;
  badge: string;
  nombre: string;
  descripcion: string;
  precio: string;
  precioNota?: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Hero del hub. Payload-ready: bloque `Hero` (eyebrow, titulo, subtitulo). */
export interface HubHero {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
}

/** CTA final del hub. Payload-ready: bloque `CtaBanner`. */
export interface HubCtaFinal {
  titulo: string;
  texto: string;
  botonLabel: string;
  botonHref: string;
}

/** Cabecera de la sección de programas del home. Payload-ready: bloque `SectionHeader`. */
export interface HomeProgramas {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  botonLabel: string;
  botonHref: string;
}

/** Los 3 programas de v1.0 (Econía/SEOconía queda diferido, sin contenido). */
export const programas: Program[] = [
  {
    id: "diplomado",
    badge: "Programa estrella",
    nombre: "Diplomado de cero a SEO",
    descripcion:
      "16 semanas para convertirte en especialista SEO, sin experiencia previa. Práctica real, coaching en vivo y certificación.",
    precio: "Desde $700 USD",
    precioNota: "4 cuotas",
    ctaLabel: "Ver diplomado",
    ctaHref: "/diplomado",
  },
  {
    id: "taller-seo-con-ia",
    badge: "Rápido e intensivo",
    nombre: "Taller de SEO con IA",
    descripcion:
      "15 días para aprender a posicionar en Google, ChatGPT y Gemini. 16 módulos con prompts listos para usar.",
    precio: "$49.99",
    ctaLabel: "Ver taller",
    ctaHref: "/programas/taller-seo-con-ia",
  },
  {
    id: "reto",
    badge: "Empieza el 13 de julio",
    nombre: "Reto 7 días",
    descripcion:
      "7 días para elegir tu especialidad y salir con un plan para cobrar en dólares. Concursa por una MacBook.",
    precio: "$20",
    ctaLabel: "Ver reto",
    ctaHref: "/reto",
  },
];

/** Hero del hub /programas. */
export const hubHero: HubHero = {
  eyebrow: "PROGRAMAS",
  titulo: "Elige el camino que va con tu momento",
  subtitulo:
    "Desde un reto de 7 días hasta el diplomado completo. Todos con proyectos reales y acompañamiento de cerca.",
};

/** CTA final del hub: asesoría por WhatsApp. */
export const hubCtaFinal: HubCtaFinal = {
  titulo: "¿No sabes por dónde empezar?",
  texto: "Escríbenos y te ayudamos a elegir el programa ideal para ti.",
  botonLabel: "Habla con nosotros",
  botonHref: "https://api.whatsapp.com/send?phone=13055728892",
};

/** Cabecera de la sección de programas del home (PROG-06). */
export const homeProgramas: HomeProgramas = {
  eyebrow: "NUESTROS PROGRAMAS",
  titulo: "Formación para cada etapa de tu carrera",
  subtitulo: "Elige cómo quieres aprender SEO e IA.",
  botonLabel: "Ver todos los programas",
  botonHref: "/programas",
};
