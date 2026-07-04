/**
 * Capa de contenido data-driven del Taller de SEO con IA (Fase 4, PROG-03).
 *
 * Fuente: aprendoseo.com/curso-seo-con-ia. Los datos de programa (precio, módulos,
 * valores, duración) van fieles. El copy propio (hero/secciones) está humanizado:
 * español neutro, sin em/en dashes, sin AI tells.
 *
 * Las interfaces espejan un futuro bloque/colección de Payload (v1.1) para migrar 1:1.
 */

/** Hero del taller. Payload-ready: bloque `Hero`. */
export interface TallerHero {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  duracion: string;
}

/** Item de "qué incluye". Payload-ready: item de la colección `IncluyeItem`. */
export interface IncluyeItem {
  texto: string;
  valor?: string;
}

/** Opción de pago. Payload-ready: sub-bloque `OpcionPago`. */
export interface OpcionPago {
  texto: string;
}

/** Bloque de precio del taller. Payload-ready: bloque `Pricing`. */
export interface TallerPrecio {
  monto: string;
  opciones: OpcionPago[];
}

/** CTA del taller. Payload-ready: sub-bloque `Cta`. */
export interface TallerCta {
  label: string;
  href: string;
}

/** Hero del taller. */
export const tallerHero: TallerHero = {
  eyebrow: "TALLER SEO CON IA",
  titulo: "El mejor taller de SEO con IA",
  subtitulo:
    "Aprende a hacer que una marca o negocio aparezca en las búsquedas de Google, Gemini y ChatGPT.",
  duracion: "Solo necesitas dedicarle 1 hora al día durante 15 días.",
};

/** Qué incluye el taller (datos fieles, con valor cuando aplica). */
export const tallerIncluye: IncluyeItem[] = [
  {
    texto: "16 módulos con tutoriales paso a paso y prompts listos para usar",
    valor: "valor $200 USD",
  },
  {
    texto: "Certificado de participación al completar",
  },
  {
    texto: "Más de 10 recursos descargables, plantillas y checklists",
    valor: "valor $100 USD",
  },
  {
    texto: "Acceso completo durante 15 días en la plataforma",
  },
];

/** Para quién es el taller. */
export const tallerParaQuien =
  "Marketers, freelancers, emprendedores y principiantes sin experiencia previa en SEO.";

/** Precio y opciones de pago. */
export const tallerPrecio: TallerPrecio = {
  monto: "$49.99",
  opciones: [
    { texto: "$49.99 con tarjeta de crédito" },
    { texto: "3 cuotas sin intereses con Cashea (solo Venezuela)" },
  ],
};

/** CTA principal al checkout del taller. */
export const tallerCta: TallerCta = {
  label: "Quiero el taller",
  // TODO Juan: confirmar URL real de checkout del taller
  href: "https://aprendoseo.com/curso-seo-con-ia",
};
