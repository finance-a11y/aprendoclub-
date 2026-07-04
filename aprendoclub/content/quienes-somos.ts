/**
 * Capa de contenido data-driven de la página Quiénes somos (Fase 2).
 *
 * ABOUT-01 / ABOUT-02: el contenido vive separado de la presentación en objetos
 * tipados. Cada interface espeja la forma de un futuro bloque/colección de Payload
 * (v1.1), de modo que la migración sea 1:1. Los componentes de sección consumen
 * estos exports; no redefinen copy inline.
 *
 * REGLA: toda la copia proviene VERBATIM de 02-CONTENT-SOURCE.md (ya humanizada:
 * español neutro, sin em/en dashes, sin AI tells). No parafrasear ni reescribir.
 */

/** Hero de la página. Payload-ready: bloque `Hero` (eyebrow, titulo, subtitulo). */
export interface HeroContent {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
}

/** Cita destacada. Payload-ready: sub-bloque `Quote` (texto, autor). */
export interface Quote {
  texto: string;
  autor: string;
}

/** Sección Historia/Origen. Payload-ready: bloque `Historia`. */
export interface HistoriaContent {
  eyebrow: string;
  titulo: string;
  parrafos: string[];
  quote: Quote;
}

/** Sección Fundadora. Payload-ready: bloque `Fundadora`. */
export interface FundadoraContent {
  eyebrow: string;
  nombre: string;
  rol: string;
  bio: string[];
  foto: string;
}

/** Miembro del equipo. Payload-ready: item de la colección `TeamMember`. */
export interface TeamMember {
  nombre: string;
  rol: string;
  bio: string;
  foto?: string;
  iniciales: string;
}

/** Pilar del método EPAM. Payload-ready: sub-bloque `Pilar`. */
export interface Pilar {
  nombre: string;
  descripcion: string;
}

/** Sección Metodología (EPAM). Payload-ready: bloque `Metodologia`. */
export interface MetodologiaContent {
  eyebrow: string;
  titulo: string;
  pilares: Pilar[];
}

/** Stat individual. Payload-ready: item del bloque `Stats`. */
export interface StatItem {
  value: string;
  label: string;
}

/** CTA final. Payload-ready: bloque `Cta` (titulo, texto, botonLabel, botonHref). */
export interface CtaContent {
  titulo: string;
  texto: string;
  botonLabel: string;
  botonHref: string;
}

/** Hero — sección "## Hero" de 02-CONTENT-SOURCE.md. */
export const hero: HeroContent = {
  eyebrow: "QUIÉNES SOMOS",
  titulo: "La primera academia de SEO pensada para el mundo hispano",
  subtitulo:
    "Formamos especialistas en SEO e IA que no se quedan en la teoría. Aprenden haciendo, con proyectos reales y acompañamiento de cerca.",
};

/** Historia — sección "## Historia / Origen". */
export const historia: HistoriaContent = {
  eyebrow: "NUESTRA HISTORIA",
  titulo: "Cómo nació aprendoclub",
  parrafos: [
    "En 2022, Arianna Lupi dirigía una agencia de SEO y se topó con un problema simple: no conseguía talento hispanohablante que supiera hacer el trabajo. Al mismo tiempo, la gente que la seguía le preguntaba una y otra vez cómo había logrado trabajar en SEO 100% remoto.",
    "De esas dos preguntas nació aprendoclub: una academia para cerrar la brecha entre las empresas que necesitan especialistas y las personas que quieren aprender una habilidad bien pagada.",
    "Hoy más de 2.000 personas se han formado con nosotros. Y no se quedan en la teoría: posicionan sitios, trabajan con clientes o llevan adelante sus propios proyectos digitales.",
  ],
  quote: {
    texto:
      "Nuestro norte no es que entiendas SEO. Es que lo apliques, lo vendas y construyas una carrera real con él.",
    autor: "Arianna Lupi",
  },
};

/** Fundadora — sección "## Fundadora". */
export const fundadora: FundadoraContent = {
  eyebrow: "NUESTRA FUNDADORA",
  nombre: "Arianna Lupi",
  rol: "Consultora SEO y Fundadora de aprendoclub",
  bio: [
    "Soy Arianna Lupi. Llevo más de una década subiendo el posicionamiento de webs en Europa, Latinoamérica y Estados Unidos, con un magíster en Data Analytics a cuestas.",
    "He generado más de 2 millones de dólares para clientes como Unilever y HubSpot, y fui la primera mujer en moderar una conferencia de Google en español. En 2022 fundé aprendoclub, donde hoy lidero un equipo de especialistas con una metodología 100% práctica.",
  ],
  foto: "/arianna-lupi.webp",
};

/** Equipo — sección "## Equipo (grid de 5)". */
export const equipo: TeamMember[] = [
  {
    nombre: "Arianna Lupi",
    rol: "Consultora SEO · Instructora · Fundadora",
    bio: "Más de 8 años posicionando webs en Europa, LATAM y Estados Unidos. Magíster en Data Analytics. Lidera al equipo.",
    foto: "/avatar-1.webp",
    iniciales: "AL",
  },
  {
    nombre: "Diana Rodríguez",
    rol: "SEO Specialist",
    bio: "Especialista en SEO, enfocada en ejecución y resultados.",
    foto: "/avatar-2.webp",
    iniciales: "DR",
  },
  {
    nombre: "Ibraim Zayed",
    rol: "SEO Coach y Community Builder",
    bio: "Coach de SEO y creador de comunidad. Ha trabajado con 6 clientes en Estados Unidos y en dos agencias. Diseña estrategias para posicionar marcas en buscadores y redes.",
    foto: "/avatar-3.webp",
    iniciales: "IZ",
  },
  {
    nombre: "Juan Carlos Angulo",
    rol: "Senior Tech SEO Analyst",
    bio: "Analista senior de SEO técnico. Ha gestionado más de 18 clientes internacionales como MCC, Alchemy, Storybook App y Holafly. Se enfoca en la infraestructura técnica que hace rendir el SEO.",
    foto: "/avatar-4.webp",
    iniciales: "JA",
  },
  {
    nombre: "Verónica Romero",
    rol: "SEO Manager",
    bio: "Content Manager con amplia experiencia en crecimiento orgánico. Ha trabajado con clientes como AMBL, Storybook y Papora con resultados destacados.",
    foto: "/avatar-5.webp",
    iniciales: "VR",
  },
];

/** Metodología — sección "## Metodología / valores (EPAM)". */
export const metodologia: MetodologiaContent = {
  eyebrow: "CÓMO ENSEÑAMOS",
  titulo: "El método EPAM",
  pilares: [
    {
      nombre: "Especialización",
      descripcion:
        "Eliges una habilidad concreta y la dominas, en vez de saber un poco de todo.",
    },
    {
      nombre: "Práctica aplicada",
      descripcion:
        "Trabajas sobre sitios reales desde la primera semana, no con ejercicios inventados.",
    },
    {
      nombre: "Autoridad digital",
      descripcion:
        "Construyes un portafolio y una marca personal que te abren puertas.",
    },
    {
      nombre: "Monetización",
      descripcion:
        "Aprendes a cobrar por lo que sabes: clientes, empleo o proyectos propios.",
    },
  ],
};

/** Stats — sección "## Stats (reusar del home)". */
export const stats: StatItem[] = [
  { value: "2.000+", label: "estudiantes formados" },
  { value: "30+", label: "empresas ayudadas" },
  { value: "$2M+", label: "en ventas generadas" },
];

/** CTA final — sección "## CTA final". */
export const ctaFinal: CtaContent = {
  titulo: "¿Listo para especializarte?",
  texto: "Mira los programas y encuentra el que va con tu momento.",
  botonLabel: "Ver programas",
  botonHref: "/programas",
};
