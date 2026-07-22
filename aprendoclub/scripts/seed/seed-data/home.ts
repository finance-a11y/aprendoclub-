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
  badgeText: "+10.000 estudiantes ya se unieron",
  tituloPre: "La única academia de",
  tituloAccent: "marketing e IA",
  tituloPost: "que te ayuda a encontrar trabajo",
  subtitulo:
    "Especialízate en marketing con IA en la plataforma educativa que te lleva de cero a consultor. Cursos, comunidad, mentorías, acompañamiento y vacantes, en un solo lugar.",
  ctaPrimario: { label: "Únete a aprendoclub", href: "#asesoria" },
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
  ratingTexto: "4.9/5 de +10.000 estudiantes",
  videoBackground: "/hero-video.mp4",
};

/** Payload-ready: mapea al bloque `FeatureGrid` (problema/beneficios comparten shape). */
export interface FeatureGridItem {
  icon: string;
  titulo: string;
  descripcion: string;
  /** Modo del ícono (default 'icon'). 'image' no se usa activamente en esta fase. */
  iconMode?: "icon" | "image";
  /** Color resuelto del ícono (default 'auto' -> var(--accent)). */
  iconColor?: "auto" | "accent" | "white" | "primary";
  /** Ruta de media para el modo 'image' (no usado en esta fase). */
  image?: string;
}

export interface FeatureGridSection {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  items: FeatureGridItem[];
}

/**
 * Problema (problema-section.tsx). Copy v1.7 (Fase 30): reemplazo verbatim
 * del feedback de Juan (doc ClickUp, 2026-07-22). Íconos pasan de lucide a
 * ilustraciones 3D (iconMode: "image") — ver 30-CONTEXT.md para la selección
 * (3dicons.co no tiene ícono literal de IA/robot; Rocket es la mejor
 * alternativa semántica disponible para la card 4).
 */
export const problema: FeatureGridSection = {
  eyebrow: "EL PROBLEMA",
  titulo: "¿Por qué necesitas aprendoclub?",
  subtitulo:
    "El marketing digital cambia cada semana. Sin una guía clara, pierdes tiempo, dinero y oportunidades.",
  items: [
    {
      icon: "compass",
      iconMode: "image",
      image: "/icons/problema/especializacion.webp",
      titulo: "Sabes de todo y no te especializas",
      descripcion:
        "Tu CV dice 'marketing digital' pero no tienes diferenciación real. El mercado busca al que tiene un perfil claro y una habilidad con demanda.",
    },
    {
      icon: "history",
      iconMode: "image",
      image: "/icons/problema/desactualizado.webp",
      titulo: "Aprendes de contenido desactualizado, solo y sin saber si vas por buen camino.",
      descripcion:
        "Google cambió el algoritmo. La IA reemplazó la mitad de las carreras genéricas. Y tú sigues con técnicas de un curso grabado hace dos años, sin correcciones, sin nadie que te diga si lo estás aplicando bien o perdiendo el tiempo.",
    },
    {
      icon: "hourglass",
      iconMode: "image",
      image: "/icons/problema/mismo-precio.webp",
      titulo: "Llevas meses preparándote y sigues cobrando lo mismo.",
      descripcion:
        "Cursos, tutoriales, certificados. Pero sin proyectos reales, sin clientes, sin mentoría y sin un camino claro de junior a consultor, el esfuerzo no se convierte en dinero. Eso ya no es falta de conocimiento — es falta de estructura.",
    },
    {
      icon: "bot",
      iconMode: "image",
      image: "/icons/problema/ia-te-deja-atras.webp",
      titulo: "La IA te está dejando atrás.",
      descripcion:
        "Todos hablan de IA + SEO pero nadie te enseña cómo integrar herramientas de IA en tu flujo de trabajo para potenciar tu tiempo y habilidades.",
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
        "Diplomado completo de SEO + cursos cortos actualizados cada mes con casos de estudiantes actuales.",
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
  botonHref: "#asesoria",
};

/** Payload-ready: mapea a un group simple (botonLabel + botonHref). */
export interface StickyCtaSection {
  botonLabel: string;
  botonHref: string;
}

/** Sticky CTA mobile (sticky-cta-mobile.tsx). */
export const stickyCta: StickyCtaSection = {
  botonLabel: "Únete a aprendoclub",
  botonHref: "#asesoria",
};

/** Payload-ready: mapea al bloque `AsesoriaWidget` (blocks/AsesoriaWidget.ts). */
export interface AsesoriaWidgetSection {
  eyebrow: string;
  titulo: string;
  subtitulo?: string;
  bullets: string[];
  botonLabel: string;
  botonHref: string;
}

/**
 * Widget de asesoría gratuita (Fase 22; copy refrescado en Fase 30/v1.7,
 * ADV-05, verbatim del doc de Juan). Reemplaza `pricing` en el layout del
 * home (ADV-01); CTA a WhatsApp configurable (ADV-03). El texto "¿No sabes
 * por dónde empezar?" de Juan aparecía después de los bullets en su
 * referencia, pero el componente solo tiene un slot de `subtitulo` antes de
 * los bullets (sin campo nuevo para no migrar el schema) — se ubica ahí, el
 * mensaje funciona igual de bien como lead-in que como cierre.
 */
export const asesoriaWidget: AsesoriaWidgetSection = {
  eyebrow: "aprendoclub | Academia de SEO + IA",
  titulo: "Especialízate en lo que el mercado está pagando hoy.",
  subtitulo:
    "¿No sabes por dónde empezar? Agenda una asesoría gratuita de 20 minutos y te decimos exactamente qué programa es para ti.",
  bullets: [
    "Diplomado certificado con opción de aval universitario (UCAB)",
    "Clases en vivo con coaches especializados en SEO + IA cada semana",
    "Masterclasses y cursos especializados por área",
    "Invitados especiales cada mes",
    "Proyectos reales con feedback de expertos",
    "Coaches personalizados para ti",
    "Comunidad activa de especialistas en LATAM",
    "Herramientas, plantillas y recursos actualizados cada semana",
    "Certificación que puedes poner en tu LinkedIn hoy",
  ],
  botonLabel: "Quiero mi asesoría gratuita",
  botonHref:
    "https://api.whatsapp.com/send?phone=13055728892&text=Hola!%20%F0%9F%98%8A%20Vengo%20de%20tu%20web%20y%20me%20interesa%20ingresar%20al%20Diplomado%20de%20SEO%20%2B%20AIO%20para%20convertirme%20en%20especialista.%20%C2%BFMe%20podr%C3%ADas%20dar%20m%C3%A1s%20detalles%20sobre%20el%20programa%20y%20las%20opciones%20de%20pago%20disponibles%3F",
};
