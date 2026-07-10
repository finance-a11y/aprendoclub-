/**
 * Capa de contenido data-driven del home (Fase 14, Plan 06).
 *
 * SCH-01: extrae VERBATIM el copy hoy hardcodeado en los 9 componentes del
 * home (hero-section, problema-section, beneficios-section, pricing-section,
 * instructor-section, cta-section, testimonios-section, faq-section,
 * sticky-cta-mobile). Cada interface espeja la forma de un futuro bloque del
 * global `home` (globals/Home.ts), de modo que el seed (Plan 08+) y el
 * cutover (Fase 17) lean de una sola fuente.
 *
 * REGLA: copy VERBATIM de los componentes TSX. No se parafrasea ni se
 * reescribe nada.
 *
 * NO CUTOVER: este archivo NO se importa desde ningún componente. Los
 * componentes del home conservan su copy inline hasta la Fase 17.
 */

import { homeProgramas } from "@/lib/programas";

/** Payload-ready: mapea al bloque `Hero` (heroFields en blocks/Hero.ts). */
export interface HomeHero {
  badgeText: string;
  tituloPre: string;
  tituloAccent: string;
  tituloPost: string;
  subtitulo: string;
  ctaPrimario: { label: string; href: string };
  ctaSecundario: { label: string; href: string };
  avatares: string[];
  ratingTexto: string;
  videoBackground: string;
}

/** Hero (hero-section.tsx). */
export const hero: HomeHero = {
  badgeText: "+500 estudiantes ya aprenden SEO con IA",
  tituloPre: "La única academia de",
  tituloAccent: "marketing e IA",
  tituloPost: "que te ayuda a encontrar trabajo",
  subtitulo:
    "Especialízate en SEO con la plataforma educativa que te lleva de cero a consultor. Cursos, comunidad, mentorías, acompañamiento y vacantes, en un solo lugar.",
  ctaPrimario: { label: "Únete a aprendoclub", href: "#precios" },
  ctaSecundario: {
    label: "Agenda una llamada",
    href: "https://calendar.app.google/pRxa4Jd24YZMhVNE7",
  },
  avatares: [
    "/avatar-1.webp",
    "/avatar-2.webp",
    "/avatar-3.webp",
    "/avatar-4.webp",
    "/avatar-5.webp",
  ],
  ratingTexto: "4.9/5 de +500 estudiantes",
  videoBackground: "/hero-video.mp4",
};

/** Payload-ready: mapea al bloque `FeatureGrid` (problema/beneficios comparten shape). */
export interface FeatureGridItem {
  icon: string;
  titulo: string;
  descripcion: string;
}

export interface FeatureGridSection {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  items: FeatureGridItem[];
}

/** Problema (problema-section.tsx). */
export const problema: FeatureGridSection = {
  eyebrow: "EL PROBLEMA",
  titulo: "¿Por qué necesitas aprendoclub?",
  subtitulo:
    "El marketing digital cambia cada semana. Sin una guía clara, pierdes tiempo, dinero y oportunidades.",
  items: [
    {
      icon: "compass",
      titulo: "Sin rumbo profesional",
      descripcion:
        "Aprendes de todo, pero no te especializas en nada. Tu CV dice 'marketing digital' pero no tienes diferenciación real.",
    },
    {
      icon: "timer",
      titulo: "Contenido desactualizado",
      descripcion:
        "Los cursos que encuentras online están desactualizados. Google cambia sus algoritmos y tú sigues con técnicas de hace 2 años.",
    },
    {
      icon: "users",
      titulo: "Sin comunidad real",
      descripcion:
        "Aprendes solo, sin feedback, sin networking, sin alguien que te diga si vas por buen camino o estás perdiendo el tiempo.",
    },
    {
      icon: "brain",
      titulo: "La IA te está dejando atrás",
      descripcion:
        "Todos hablan de IA + SEO pero nadie te enseña cómo integrar herramientas de IA en tu flujo de trabajo real.",
    },
    {
      icon: "trending-up",
      titulo: "Crecimiento estancado",
      descripcion:
        "Sin mentoría ni estructura, tu carrera se estanca. Necesitas un camino claro de junior a consultor.",
    },
    {
      icon: "target",
      titulo: "Sin proyectos reales",
      descripcion:
        "La teoría no basta. Necesitas aplicar SEO en proyectos reales con feedback de expertos para desarrollar habilidades.",
    },
  ],
};

/** Beneficios (beneficios-section.tsx). */
export const beneficios: FeatureGridSection = {
  eyebrow: "LA SOLUCIÓN",
  titulo: "Todo lo que necesitas para dominar el SEO",
  subtitulo: "Herramientas, conocimiento y comunidad en un solo lugar.",
  items: [
    {
      icon: "book-open",
      titulo: "Cursos Prácticos",
      descripcion:
        "Diplomado completo de SEO + cursos cortos actualizados cada mes con casos reales.",
    },
    {
      icon: "message-circle",
      titulo: "Comunidad 24/7",
      descripcion:
        "Conecta con otros profesionales de SEO. Comparte, pregunta y crece en comunidad.",
    },
    {
      icon: "video",
      titulo: "Mentorías en Vivo",
      descripcion:
        "Sesiones grupales y 1:1 con expertos que te dan feedback directo sobre tu trabajo.",
    },
    {
      icon: "briefcase",
      titulo: "Bolsa de Trabajo",
      descripcion:
        "Accede a vacantes exclusivas de empresas que buscan especialistas en SEO.",
    },
  ],
};

/**
 * Programas (sección del home). Reusa `homeProgramas` de lib/programas.ts
 * (movido ahí en Phase 15 Plan 02 al borrar content/programas.ts) sin
 * duplicar valores. Las cards de programas vienen de la colección
 * `programas` (Phase 15 Plan 02: home page.tsx la fetchea directo).
 */
export { homeProgramas };

/** Payload-ready: mapea al bloque `Pricing` (pricingFields en blocks/Pricing.ts). */
export interface PricingPlan {
  /** Etiqueta pequeña sobre el nombre del plan (e.g. "Acceso completo"). */
  labelSuperior: string;
  nombre: string;
  precio: string;
  /** Texto bajo el precio (e.g. "4 cuotas mensuales"). */
  nota: string;
  /** Badge tipo trofeo, solo el plan destacado (e.g. "Más elegido"). */
  badge?: string;
  /** Badge secundario, solo el plan destacado (e.g. "Ahorrás más en un solo pago"). */
  badgeSecundario?: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface PricingCtaAsesoria {
  eyebrow: string;
  tituloPre: string;
  tituloAccent: string;
  texto: string;
  botonLabel: string;
  botonHref: string;
  microcopy: string;
}

export interface PricingSection {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  features: string[];
  planCuotas: PricingPlan;
  planUnico: PricingPlan;
  ctaAsesoria: PricingCtaAsesoria;
}

/** Pricing (pricing-section.tsx). */
export const pricing: PricingSection = {
  eyebrow: "PRECIOS",
  titulo: "Elige tu camino de especialización",
  subtitulo: "Todos los planes incluyen acceso completo al contenido",
  features: [
    "Comunidad activa 24/7",
    "Cursos cortos y prácticos (SEO con IA, SEO para rrss, creación de webs)",
    "Bolsa de trabajo curada",
    "Actualizaciones SEO + IA",
    "Diplomado completo Cero a SEO",
    "3 sesiones semanales en vivo",
    "Proyectos con casos reales",
    "Ruta profesional guiada",
    "Plantillas, frameworks y SOPs",
    "Comunidad privada de profesionales",
  ],
  planCuotas: {
    labelSuperior: "Acceso completo",
    nombre: "Empieza hoy en cuotas",
    precio: "$210",
    nota: "4 cuotas mensuales",
    ctaLabel: "Comenzar en cuotas",
    ctaHref: "https://diplomado.aprendoseo.com/offers/hHa9LbUL/checkout",
  },
  planUnico: {
    labelSuperior: "Todo incluido",
    nombre: "Pago único sin cuotas",
    precio: "$780",
    nota: "Pago único · Sin cuotas · Sin sorpresas",
    badge: "Más elegido",
    badgeSecundario: "Ahorrás más en un solo pago",
    ctaLabel: "Obtener acceso completo",
    ctaHref: "https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout",
  },
  ctaAsesoria: {
    eyebrow: "Hablemos",
    tituloPre: "¿Necesitas facilidades de pago personalizadas?",
    tituloAccent: "Hay una forma para ti.",
    texto:
      "No dejes que el dinero decida tu futuro. Si tienes la disposición, nosotros encontramos la forma. Agenda una asesoría gratuita con nuestra directora de admisiones y encontramos juntos la opción ideal para ti.",
    botonLabel: "Agendar asesoría gratuita",
    botonHref: "https://wa.link/85a89y",
    microcopy: "Respuesta en menos de 24hs · 100% gratuito",
  },
};

/** Payload-ready: mapea a un group (bioCorta1/2 + bloque `Stats`). */
export interface InstructorStat {
  value: string;
  label: string;
}

export interface InstructorSection {
  eyebrow: string;
  nombre: string;
  rol: string;
  bioCorta1: string;
  bioCorta2: string;
  stats: InstructorStat[];
  foto: string;
  teaserLabel: string;
  teaserHref: string;
}

/**
 * Instructor (instructor-section.tsx). Copy PROPIO del home: aunque
 * comparte tema con la fundadora de quienes-somos, este bio corto y estos
 * stats son distintos y viven solo aquí.
 */
export const instructor: InstructorSection = {
  eyebrow: "TU INSTRUCTOR",
  nombre: "Arianna Lupi",
  rol: "Consultora SEO y Fundadora aprendoclub",
  bioCorta1:
    "Con un Magíster en Data Analytics y más de una década de experiencia, Arianna ha generado más de $2M en ventas para 30+ empresas mediante posicionamiento en buscadores y plataformas de IA.",
  bioCorta2:
    "En 2022 fundó aprendoclub (antes aprendoseo), donde ha capacitado a más de 2,000 estudiantes con una metodología 100% práctica y comprobada.",
  stats: [
    { value: "$2M+", label: "en ventas generadas" },
    { value: "30+", label: "empresas ayudadas" },
    { value: "2,000+", label: "estudiantes formados" },
  ],
  foto: "/arianna-lupi.webp",
  teaserLabel: "Conoce más sobre nosotros",
  teaserHref: "/quienes-somos",
};

/**
 * Testimonios (sección del home). Payload-ready: mapea al bloque
 * `TestimonialRef` (relationship → colección `testimonios`, filtro
 * `featuredOnHome` en el fetch de Fase 17) + `LogosRef` (relationship →
 * colección `clientes-trabajados`). Los 3 testimonios con foto de
 * testimonios-section.tsx NO se duplican aquí: se marcan `featuredOnHome`
 * en la colección `testimonios` (seed, Plan 08). Solo el header y los
 * textos fijos de la sección viven en este archivo.
 */
export interface TestimoniosHomeSection {
  eyebrow: string;
  titulo: string;
  verTodosLabel: string;
  verTodosHref: string;
  logosBanda: string;
}

export const testimoniosHome: TestimoniosHomeSection = {
  eyebrow: "TESTIMONIOS",
  titulo: "Lo que dicen nuestros estudiantes",
  verTodosLabel: "Ver todos los testimonios",
  verTodosHref: "/testimonios",
  logosBanda: "Profesionales de empresas como",
};

/**
 * FAQ (sección del home). Payload-ready: mapea al bloque `FaqRef`
 * (relationship → colección `faq`, filtro page=home en el fetch de Fase
 * 17). Las preguntas viven en content/faqs.ts (`homeFaqs`), NO se duplican
 * aquí.
 */
export interface FaqHomeSection {
  eyebrow: string;
  titulo: string;
}

export const faqHome: FaqHomeSection = {
  eyebrow: "FAQ",
  titulo: "Resolvemos tus dudas",
};

/** Payload-ready: mapea al bloque `CtaBanner`. */
export interface CtaFinalSection {
  titulo: string;
  botonLabel: string;
  botonHref: string;
}

/** CTA final (cta-section.tsx). */
export const ctaFinal: CtaFinalSection = {
  titulo: "Deja de aprender solo. Únete a la comunidad.",
  botonLabel: "Comenzar ahora",
  botonHref: "#precios",
};

/** Payload-ready: mapea a un group simple (botonLabel + botonHref). */
export interface StickyCtaSection {
  botonLabel: string;
  botonHref: string;
}

/** Sticky CTA mobile (sticky-cta-mobile.tsx). */
export const stickyCta: StickyCtaSection = {
  botonLabel: "Únete a aprendoclub",
  botonHref: "#precios",
};
