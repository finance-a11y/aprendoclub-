/**
 * Capa de contenido data-driven de la página /diplomado (Phase 14, Plan 07).
 *
 * SCH-01: /diplomado es 100% hardcode en components/diplomado/* (research §0, §12).
 * Este archivo extrae ese contenido VERBATIM a un módulo Payload-ready, como
 * fuente limpia para el seed de Phase 16. NO se importa desde ningún componente
 * todavía (sin cutover — eso es Phase 16+). Los 10 componentes conservan su
 * copy inline hasta entonces.
 *
 * REGLA: copy VERBATIM de components/diplomado/*.tsx y de la página
 * app/(frontend)/(site)/diplomado/page.tsx. No parafrasear ni reescribir.
 *
 * NOTA DATOS (T-14-10): el grid de equipo de team.tsx lista "Dana Aliaga";
 * content/quienes-somos.ts lista "Diana Rodríguez" con la misma foto. Son DOS
 * personas reales distintas (CONTEXT §decisions) — dos registros en la
 * colección team-members, NO deduplicar. El grid de equipo vive en esa
 * colección (relationship, filtro mostrarEnDiplomado); solo el intro y la
 * sección de mentora quedan embebidos aquí.
 */

/** Link simple label+href. Payload-ready: linkGroup (fields/link.ts). */
export interface LinkContent {
  label: string;
  href: string;
}

/** Hero — hero.tsx. Payload-ready: bloque `Hero` (heroFields). */
export interface HeroContent {
  badgeText: string;
  tituloPre: string;
  tituloAccent: string;
  tituloPost: string;
  subtitulo: string;
  ctaPrimario: LinkContent;
  ctaSecundario: LinkContent;
  microcopy: string;
  imagen?: string;
}

export const hero: HeroContent = {
  badgeText: "Diplomado de Cero a SEO",
  tituloPre: "Conviértete en especialista SEO, ",
  tituloAccent: "sin experiencia previa",
  tituloPost: " ni tecnicismos",
  subtitulo:
    "Aprende a posicionar sitios web en 6 meses, paso a paso, con una metodología clara y accesible, clases grabadas, prácticas reales y un equipo que te guiará en cada etapa.",
  ctaPrimario: {
    label: "Quiero aprender SEO",
    href: "https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout",
  },
  ctaSecundario: {
    label: "Agendar llamada",
    href: "https://calendar.app.google/pRxa4Jd24YZMhVNE7",
  },
  microcopy: "Aclaremos tus dudas juntos",
};

/** Imagen de galería con alt propio (foto real, no placeholder genérico). */
export interface GaleriaImagen {
  src: string;
  alt: string;
}

/** Galería del Diplomado (IMG-01, Phase 24; assets reales desde 24-02). Payload-ready: bloque `diplomadoGaleria`. */
export interface GaleriaContent {
  eyebrow: string;
  titulo: string;
  texto: string;
  imagenes: GaleriaImagen[];
}

export const galeria: GaleriaContent = {
  eyebrow: "DIPLOMADO SEO",
  titulo: "Así se vive el Diplomado",
  texto:
    "Clases en vivo, proyectos reales y una comunidad que te acompaña todo el camino.",
  imagenes: [
    {
      src: "/diplomado/real/diplomado-certificado.avif",
      alt: "Certificado de finalización del Diplomado de Cero a SEO",
    },
    {
      src: "/diplomado/real/diplomado-comunidad.avif",
      alt: "Comunidad privada de estudiantes del Diplomado",
    },
    {
      src: "/diplomado/real/diplomado-mentorias.avif",
      alt: "Sesión de mentoría en vivo por Zoom",
    },
    {
      src: "/diplomado/real/diplomado-modulos1.avif",
      alt: "Plataforma de cursos con el currículum del Diplomado",
    },
  ],
};

/** Tarjeta de historia. Payload-ready: item del bloque `featureGrid`. */
export interface OriginTarjeta {
  icon: string;
  texto: string;
}

/** Origin — origin.tsx. Payload-ready: bloque `featureGrid` (3 items). */
export interface OriginContent {
  eyebrow: string;
  titulo: string;
  tarjetas: OriginTarjeta[];
}

export const origin: OriginContent = {
  eyebrow: "Nuestra historia",
  titulo:
    "Una necesidad real. Una solución creada desde la experiencia.",
  tarjetas: [
    {
      icon: "briefcase",
      texto:
        "En 2022, nuestra fundadora Arianna Lupi, entonces gerente de una agencia SEO, no encontraba talento hispanohablante capacitado.",
    },
    {
      icon: "lightbulb",
      texto:
        "Su comunidad digital preguntaba cómo ella había logrado trabajar en SEO 100% remoto. Arianna conectó los puntos: había empresas que necesitaban especialistas y personas que querían aprender.",
    },
    {
      icon: "users",
      texto:
        "Así nació aprendoclub, la primera academia especializada en SEO para el mercado hispano. Hoy, más de 750 personas se han formado con nosotros.",
    },
  ],
};

/** Audience — audience.tsx. Payload-ready: group con dos arrays de texto. */
export interface AudienceContent {
  titulo: string;
  subtitulo: string;
  tituloPerfiles: string;
  perfiles: string[];
  tituloDudas: string;
  dudas: string[];
  notaFinal: string;
}

export const audience: AudienceContent = {
  titulo: "¿El diplomado de cero a SEO será para mí?",
  subtitulo: "Descúbrelo ya mismo",
  tituloPerfiles: "Está pensado para ti si...",
  perfiles: [
    "No tienes experiencia previa y quieres aprender SEO desde cero.",
    "Eres profesional de marketing, comunicación o contenidos y quieres especializarte.",
    "Tienes un negocio o marca personal que necesita visibilidad real en buscadores.",
    "Quieres trabajar remoto u ofrecer servicios SEO como freelancer.",
    "Buscas una habilidad práctica, rentable y con demanda global.",
  ],
  tituloDudas: "¿También te has preguntado esto?",
  dudas: [
    "Quiero aprender SEO, pero no sé por dónde empezar.",
    "Ya he comprado otros cursos... ¿Y si este no me sirve?",
    "No sé programar y la parte técnica tampoco la domino.",
    "¿Esto servirá si quiero trabajar remoto o mejorar mi negocio online?",
    "No creo que me contraten estando en Latinoamérica y sin saber inglés.",
  ],
  notaFinal:
    "Nuestros estudiantes también comenzaron con estas dudas. Hoy, muchos aplican SEO en sus propios proyectos y en los de sus clientes, generando ingresos reales y posicionando negocios en buscadores.",
};

/** Pilar EPAM. Payload-ready: item del bloque `featureGrid`. */
export interface MethodologyPilar {
  icon: string;
  titulo: string;
  descripcion: string;
}

/**
 * Methodology — methodology.tsx. Payload-ready: bloque `featureGrid` (4 items).
 * Copy PROPIA del diplomado: distinta del método EPAM de content/quienes-somos.ts
 * (research §18), NO reusar/deduplicar.
 */
export interface MethodologyContent {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  pilares: MethodologyPilar[];
}

export const methodology: MethodologyContent = {
  eyebrow: "Metodología EPAM",
  titulo: "Aprende SEO con nuestra metodología: EPAM",
  subtitulo:
    "El diplomado está diseñado para cualquier persona que quiera aprender SEO y aprovechar esta poderosa habilidad para transformar su carrera o negocio.",
  pilares: [
    {
      icon: "graduation-cap",
      titulo: "Especialización",
      descripcion: "Aprendes lo básico hasta lo avanzado, con foco 100% en SEO.",
    },
    {
      icon: "wrench",
      titulo: "Práctica aplicada",
      descripcion: "Aplicas desde la semana 1 en un proyecto real.",
    },
    {
      icon: "award",
      titulo: "Autoridad digital",
      descripcion: "Construyes tu presencia profesional con tu portafolio.",
    },
    {
      icon: "dollar-sign",
      titulo: "Monetización",
      descripcion: "Atraes oportunidades, trabajes como freelance o en una empresa.",
    },
  ],
};

/** Semana del temario. Payload-ready: item de `curriculum.semanas`. */
export interface CurriculumSemana {
  numero: number;
  titulo: string;
  detalle: string;
}

/** Curriculum — curriculum.tsx. Payload-ready: group (eyebrow, titulo, semanas[16]). */
export interface CurriculumContent {
  eyebrow: string;
  titulo: string;
  semanas: CurriculumSemana[];
}

export const curriculum: CurriculumContent = {
  eyebrow: "16 semanas",
  titulo:
    "Pasa de no saber nada a optimizar tu primer sitio web en 16 semanas",
  semanas: [
    {
      numero: 1,
      titulo: "Introducción al SEO - Empezando desde cero",
      detalle: "Aprende a llevar a cabo un proyecto SEO de inicio a fin.",
    },
    {
      numero: 2,
      titulo: "Proyecto SEO - Inicia tu camino",
      detalle: "Configura tu primer proyecto SEO real paso a paso.",
    },
    {
      numero: 3,
      titulo: "Herramientas SEO - Potencia tu trabajo",
      detalle: "Domina las herramientas esenciales del ecosistema SEO.",
    },
    {
      numero: 4,
      titulo: "Palabras clave - La base de tu estrategia",
      detalle: "Aprende a investigar y seleccionar las mejores keywords.",
    },
    {
      numero: 5,
      titulo: "Mapa de palabras clave - Enfócate en lo que ya tiene",
      detalle: "Organiza y prioriza tus palabras clave estratégicamente.",
    },
    {
      numero: 6,
      titulo: "Análisis de la competencia - Encuentra oportunidades de negocio",
      detalle: "Descubre qué hacen tus competidores y cómo superarlos.",
    },
    {
      numero: 7,
      titulo: "Estrategias SEO - Acelera tu crecimiento",
      detalle: "Implementa estrategias probadas para escalar resultados.",
    },
    {
      numero: 8,
      titulo: "Producción de contenido - Empieza a crear contenido que posicione",
      detalle: "Crea contenido optimizado que Google ame.",
    },
    {
      numero: 9,
      titulo: "Arquitectura web - Organiza una web que Google ame",
      detalle: "Estructura tu sitio para máximo rendimiento SEO.",
    },
    {
      numero: 10,
      titulo: "Optimización de contenido existente - Impulsa lo que ya tienes",
      detalle: "Mejora el contenido que ya tienes para obtener más tráfico.",
    },
    {
      numero: 11,
      titulo: "Redacción SEO - Escribe para posicionar",
      detalle: "Domina el arte de escribir copy que posiciona.",
    },
    {
      numero: 12,
      titulo: "Medición de resultados - Evalúa el éxito de tus estrategias",
      detalle: "Aprende a medir y reportar resultados SEO.",
    },
    {
      numero: 13,
      titulo: "Tipos de SEO - Divide y conquista tu posicionamiento",
      detalle: "Entiende SEO on-page, off-page y técnico a profundidad.",
    },
    {
      numero: 14,
      titulo: "SEO para Nichos - Domina mercados específicos",
      detalle: "Especializa tus estrategias para nichos específicos.",
    },
    {
      numero: 15,
      titulo: "Freelance y Empleo SEO - Da el siguiente paso",
      detalle: "Prepara tu perfil profesional para oportunidades reales.",
    },
    {
      numero: 16,
      titulo: "Proyecto Final y Certificación - Conviértete en Especialista SEO",
      detalle: "Completa tu proyecto final y obtén tu certificación.",
    },
  ],
};

/**
 * Feature de "cómo funciona". Payload-ready: item del bloque `featureGrid`.
 * iconMode/imagen (IMG-01, Phase 24, assets reales desde 24-02): si iconMode
 * es 'image', el item renderiza `imagen` en vez de `icon` (mismo patrón que
 * FeatureGrid.tsx). Sin iconMode explícito, se asume 'icon' (comportamiento
 * previo, sin cambios).
 */
export interface HowItWorksFeature {
  icon: string;
  titulo: string;
  descripcion: string;
  iconMode?: "icon" | "image";
  imagen?: string;
}

/** HowItWorks — how-it-works.tsx. Payload-ready: bloque `featureGrid` (5 items) + CTA. */
export interface HowItWorksContent {
  eyebrow: string;
  titulo: string;
  features: HowItWorksFeature[];
  ctaLabel: string;
  ctaHref: string;
}

export const howItWorks: HowItWorksContent = {
  eyebrow: "Cómo funciona",
  titulo: "¿Cómo funciona el diplomado de cero a SEO?",
  features: [
    {
      icon: "clock",
      titulo: "Duración flexible",
      descripcion:
        "El diplomado se adapta a tu ritmo. Puedes completarlo entre 3 y 6 meses, pero tendrás acceso completo al contenido durante 6 meses.",
    },
    {
      icon: "book-open",
      titulo: "Aprendizaje estructurado y aplicable",
      descripcion:
        "Cada módulo te lleva desde lo más básico hasta estrategias avanzadas, con lecciones que puedes aplicar en proyectos reales desde el inicio.",
      iconMode: "image",
      imagen: "/diplomado/real/diplomado-modulos2.avif",
    },
    {
      icon: "video",
      titulo: "Llamadas en vivo semanales",
      descripcion:
        "Tendrás 3 sesiones grupales a la semana con nuestros coaches SEO. Resolverás dudas, recibirás feedback y avanzarás con claridad.",
      iconMode: "image",
      imagen: "/diplomado/real/diplomado-mentorias.avif",
    },
    {
      icon: "folder-open",
      titulo: "Proyecto real para tu portafolio",
      descripcion:
        "Culmina el diplomado aplicando todo lo aprendido en un proyecto SEO completo. Este será tu mejor carta de presentación.",
    },
    {
      icon: "users",
      titulo: "Comunidad activa que te acompaña",
      descripcion:
        "Forma parte de un grupo donde podrás compartir tus avances, recibir apoyo y conectarte con otros que también están en el camino SEO.",
      iconMode: "image",
      imagen: "/diplomado/real/diplomado-comunidad.avif",
    },
  ],
  ctaLabel: "Quiero inscribirme ahora",
  ctaHref: "https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout",
};

/** Intro de la sección de equipo. */
export interface TeamIntro {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
}

/** Sección de mentora. Payload-ready: group (bio como array de párrafos/Prose). */
export interface MentorSection {
  titulo: string;
  nombre: string;
  web: string;
  bio: string[];
  quote: string;
}

/**
 * Team — team.tsx. Payload-ready: teamGridRefFields (relationship a
 * team-members, filtro mostrarEnDiplomado) + teamIntro group + mentorSection
 * group. El grid de 5 miembros (Arianna Lupi, Dana Aliaga, Ibraim Zayed,
 * Juan Carlos Angulo, Verónica Romero) vive en la colección team-members,
 * NO se embebe aquí.
 */
export interface TeamContent {
  teamIntro: TeamIntro;
  mentorSection: MentorSection;
}

export const team: TeamContent = {
  teamIntro: {
    eyebrow: "Equipo",
    titulo: "Aquí te hablamos de SEO a SEO",
    subtitulo:
      "Desde Arianna Lupi, consultora SEO y fundadora de aprendoclub, hasta el equipo de coaches que también dieron sus primeros pasos aquí.",
  },
  mentorSection: {
    titulo: "Yo seré tu mentora",
    nombre: "Arianna Lupi",
    web: "https://ariannalupi.com",
    bio: [
      "Soy Arianna Lupi, venezolana, egresada Magna Cum Laude en Negocios Internacionales y Magister en Big Data Analytics.",
      "Me especializo en posicionamiento orgánico de páginas web y soy la fundadora de la academia aprendoclub donde, junto a otros coaches, he formado a más de 1,000 alumnos hispanohablantes.",
      "Fui reconocida por ser la primera mujer en moderar una conferencia de Google en español.",
      "En los últimos 7 años he ayudado a marcas como Unilever, HubSpot, Money.com y Alchemy a destacar en Google, generando más de $2 millones USD en ingresos para mis clientes.",
    ],
    quote:
      '"Y mi misión es seguir formando a personas de habla hispana como tú, para que construyan una carrera profesional sólida en el mundo del SEO y la Inteligencia Artificial."',
  },
};

/** Beneficio con valor asignado. Payload-ready: item de `benefits.items`. */
export interface BenefitItem {
  texto: string;
  valor: string;
}

/** Benefits — benefits.tsx. Payload-ready: group (items + extras). */
export interface BenefitsContent {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  items: BenefitItem[];
  extras: string[];
}

export const benefits: BenefitsContent = {
  eyebrow: "Beneficios",
  titulo: "¿Qué recibes al inscribirte?",
  subtitulo:
    "Estás a solo un clic de distancia de convertirte en un especialista SEO.",
  items: [
    {
      texto:
        "Acceso a la plataforma Kajabi con todas las clases grabadas. Cada módulo se desbloquea a medida que avanzas y podrás consultar el contenido durante 6 meses.",
      valor: "$3.000",
    },
    {
      texto:
        "Llamadas en vivo por zoom (sesiones grupales), 3 veces por semana, para resolver tus dudas.",
      valor: "$2.000",
    },
    {
      texto:
        "Soporte de los coaches y acompañamiento 1:1 durante todo el proceso.",
      valor: "$4.500",
    },
    {
      texto: "Recursos prácticos y exclusivos que te facilitarán el aprendizaje.",
      valor: "$3.000",
    },
  ],
  extras: [
    "Comunidad privada donde compartes tus avances y aprendes junto a otros estudiantes.",
    "Grupo de LinkedIn de Especialistas SEO.",
    "Proyecto final para portafolio.",
    "Plantillas, brief y cuestionarios para ejercicios prácticos.",
    "Certificación como Especialista SEO.",
  ],
};

/** Pricing — pricing.tsx. Payload-ready: group específico (plan único + garantía). */
export interface PricingContent {
  titulo: string;
  subtitulo: string;
  planNombre: string;
  badgeText: string;
  precio: string;
  precioTachado: string;
  precioNota: string;
  descripcion: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  garantiaTexto: string;
}

export const pricing: PricingContent = {
  titulo: "Tu inversión tiene opciones. Tu crecimiento un camino claro.",
  subtitulo:
    "Elige la forma de pago que más te convenga y empieza tu formación.",
  planNombre: "Especialista",
  badgeText: "Más popular",
  precio: "$90",
  precioTachado: "$150",
  precioNota: "/mes",
  descripcion:
    "Para quienes quieren dominar SEO con el diplomado completo, sesiones semanales y ruta profesional.",
  features: [
    "Todo lo de Aprendiz",
    "Diplomado CERO A SEO completo",
    "3 sesiones semanales",
    "Proyectos aplicados reales",
    "Ruta profesional guiada",
    "Plantillas, frameworks, SOPs",
    "Comunidad privada profesional",
  ],
  ctaLabel: "Elegir Especialista",
  ctaHref: "https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout",
  garantiaTexto:
    "Si por alguna razón no es lo que esperabas, tienes 7 días desde tu compra para pedir la devolución total de tu dinero. Sin explicaciones.",
};

/**
 * FAQ — las 4 preguntas de esta sección viven en content/faqs.ts
 * (export `diplomadoFaqs`) y migran a la colección `faq` con `page: 'diplomado'`
 * (Plan 01). NO se duplican aquí: el global diplomado solo expone el
 * relationship (bloque `faqRef`).
 */

/** CTA final — cta.tsx. Payload-ready: bloque `ctaBanner`. */
export interface CtaFinalContent {
  titulo: string;
  texto: string;
  bullets: string[];
  botonLabel: string;
  botonHref: string;
}

export const ctaFinal: CtaFinalContent = {
  titulo: "No es magia, es SEO. Y tú lo puedes aprender.",
  texto:
    "Este diplomado es una ruta completa para transformar tu perfil profesional y aprender esta habilidad de alta demanda, desde cero, con resultados reales y acompañamiento de la comunidad de aprendoclub.",
  bullets: [
    "Descubre cómo posicionar sitios web con estrategias que sí funcionan.",
    "Conviértete en especialista SEO, sin experiencia previa ni tecnicismos.",
    "Cientos de estudiantes ya comenzaron este camino. Tú también puedes.",
  ],
  botonLabel: "Quiero aprender SEO",
  botonHref: "https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout",
};

/** Related links — app/(frontend)/(site)/diplomado/page.tsx (2 links hardcoded). */
export const relatedLinks: LinkContent[] = [
  { href: "/programas", label: "Ver todos los programas" },
  { href: "/testimonios", label: "Lee las historias de nuestros estudiantes" },
];

/**
 * courseMeta — datos que hoy alimentan `lib/schema.ts` `course()` desde la
 * página (app/(frontend)/(site)/diplomado/page.tsx). Se usarán para el mismo
 * fin en Phase 17 (JSON-LD wiring), sin tocar lib/schema.ts en esta fase.
 * startDate vacío: el diplomado es rolling/on-demand, sin fecha fija hoy.
 */
export interface CourseMeta {
  price: string;
  courseWorkload: string;
  startDate: string;
}

export const courseMeta: CourseMeta = {
  price: "700",
  courseWorkload: "P16W",
  startDate: "",
};
