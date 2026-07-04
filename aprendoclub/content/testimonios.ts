/**
 * Capa de contenido data-driven de la página Testimonios (Fase 3).
 *
 * TEST-01 / TEST-02: el contenido vive separado de la presentación en objetos
 * tipados. Cada interface espeja la forma de un futuro bloque/colección de Payload
 * (v1.1), de modo que la migración sea 1:1. Los componentes de sección consumen
 * estos exports; no redefinen copy inline.
 *
 * REGLA: los quotes son de personas reales y van VERBATIM de 03-CONTENT-SOURCE.md
 * (no reescribir). El copy propio de la página (hero, títulos, CTA) ya está
 * humanizado: español neutro, sin em/en dashes, sin AI tells. La marca ya viene
 * rebrandeada a "aprendoclub" en el source donde el quote la nombra.
 */

/** Testimonio individual. Payload-ready: item de la colección `Testimonio`. */
export interface Testimonio {
  nombre: string;
  /** Solo los 3 con foto (versión rica del home). */
  rol?: string;
  /** País/ubicación de las entradas nombradas; puede ser cadena vacía. */
  ubicacion?: string;
  quote: string;
  /** Solo los 3 con foto real; el resto usa avatar de iniciales. */
  foto?: string;
}

/** Imagen de la galería del Reto. Payload-ready: item de `RetoImagen`. */
export interface RetoImagen {
  src: string;
  alt: string;
}

/** Empresa de la banda de logos. Payload-ready: item de `TrustedCompany`. */
export interface TrustedCompany {
  name: string;
  logo: string;
}

/** Hero de la página. Payload-ready: bloque `Hero` (eyebrow, titulo, subtitulo). */
export interface HeroContent {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
}

/** Sección Reto. Payload-ready: bloque `RetoGaleria` (eyebrow, titulo, texto). */
export interface RetoContent {
  eyebrow: string;
  titulo: string;
  texto: string;
}

/** CTA final. Payload-ready: bloque `Cta` (titulo, texto, botonLabel, botonHref). */
export interface CtaContent {
  titulo: string;
  texto: string;
  botonLabel: string;
  botonHref: string;
}

/** Hero — sección "## Copy propio de la página" de 03-CONTENT-SOURCE.md. */
export const hero: HeroContent = {
  eyebrow: "TESTIMONIOS",
  titulo: "Historias reales de gente que cambió su rumbo con el SEO",
  subtitulo:
    "Estudiantes que empezaron desde cero y hoy posicionan sitios, consiguen clientes o trabajan remoto. Estas son sus palabras.",
};

/** Título del grid de testimonios. */
export const gridTitulo = "Lo que dicen nuestros estudiantes";

/** Texto de la banda de logos "empresas como". */
export const logosBanda = "Profesionales de empresas como";

/** Reto — galería "Historias del Reto". */
export const reto: RetoContent = {
  eyebrow: "RETO 7 DÍAS",
  titulo: "Historias del Reto",
  texto: "Capturas de participantes que pasaron por el Reto de 7 días.",
};

/** CTA final — enlaza a /programas. */
export const cta: CtaContent = {
  titulo: "Tu historia puede ser la próxima",
  texto: "Elige el programa que va con tu momento y empieza hoy.",
  botonLabel: "Ver programas",
  botonHref: "/programas",
};

/**
 * Todos los testimonios: primero los 3 con foto (versión rica del home), luego
 * las entradas nombradas de /comunidad/testimonios con avatar de iniciales.
 * Quotes VERBATIM de 03-CONTENT-SOURCE.md.
 */
export const testimonios: Testimonio[] = [
  {
    nombre: "Johanna Ramírez",
    rol: "Creadora de nichos",
    foto: "/testimonio-1.webp",
    quote:
      "Aprendí posicionamiento web y búsqueda de palabras clave desde cero. Ahora estoy creando mi propia página de nichos, y una amiga ya me pidió ayuda con su negocio.",
  },
  {
    nombre: "Nataly Domínguez",
    rol: "Analista SEO, Perú",
    foto: "/testimonio-2.webp",
    quote:
      "Tenía un negocio con web pero sin estrategia ni tráfico de Google. Apliqué lo aprendido y ya veo resultados. Ahora ayudo a otras webs también. Este diplomado no tiene nada que envidiar a los de universidades de prestigio.",
  },
  {
    nombre: "Marco Garcia",
    rol: "SEO Freelancer, USA",
    foto: "/testimonio-3.webp",
    quote:
      "Valió la pena de principio a fin. Aprendí una habilidad que me abrirá muchas puertas y me permitirá trabajar remoto y ser dueño de mi tiempo.",
  },
  {
    nombre: "Wilson Moros",
    foto: "/testimonios/wilson-moros.avif",
    ubicacion: "Venezuela",
    quote:
      "En tres meses, las impresiones subieron de 8,000 a 11,000. Hemos ganado visibilidad, lo que ya es un gran paso.",
  },
  {
    nombre: "Fransheska Sánchez",
    foto: "/testimonios/fransheska-sanchez.avif",
    ubicacion: "Perú",
    quote:
      "Este logro no habría sido posible sin el Diplomado de Cero a SEO de Ari, que me dio las herramientas.",
  },
  {
    nombre: "Igor Cegarra",
    ubicacion: "",
    quote: "Finalmente siento que todo el esfuerzo está rindiendo frutos.",
  },
  {
    nombre: "María Tejera",
    foto: "/testimonios/maria-tejera.avif",
    ubicacion: "Venezuela",
    quote:
      "La clave de su éxito fue no rendirse. Cada vez que tenía dudas, volvía a las clases.",
  },
  {
    nombre: "Rebeca Rodil",
    foto: "/testimonios/rebeca-rodil.avif",
    ubicacion: "",
    quote:
      "Lo que más me gusta de esto es que siempre hay algo nuevo por aprender o mejorar.",
  },
  {
    nombre: "Luisana Rojas",
    foto: "/testimonios/luisana-rojas.avif",
    ubicacion: "",
    quote:
      "Te permite rodearte de un círculo de personas con las mismas metas y que te apoyarán durante todo el camino.",
  },
  {
    nombre: "Daniela Viloria",
    foto: "/testimonios/daniela-viloria.avif",
    ubicacion: "",
    quote:
      "Mi vida dio un cambio en todos los aspectos, tanto física como mentalmente.",
  },
  {
    nombre: "Mirle García",
    foto: "/testimonios/mirle-garcia.avif",
    ubicacion: "",
    quote:
      "He visto aumento de tráfico en las páginas de los distintos clientes que manejo.",
  },
  {
    nombre: "María Dorado",
    foto: "/testimonios/maria-dorado.avif",
    ubicacion: "",
    quote: "He logrado ver el progreso de mi sitio web.",
  },
  {
    nombre: "Alondra Contreras",
    foto: "/testimonios/alondra-contreras.avif",
    ubicacion: "",
    quote:
      "Le he dado un plus a mis habilidades profesionales para aplicarlas en un nuevo ámbito.",
  },
  {
    nombre: "Thomas Rada",
    foto: "/testimonios/thomas-rada.avif",
    ubicacion: "",
    quote:
      "Logré encontrar un trabajo virtual a tiempo completo que me paga 3X lo que ganaba antes.",
  },
  {
    nombre: "Nehomar Sánchez",
    foto: "/testimonios/nehomar-sanchez.avif",
    ubicacion: "",
    quote:
      "La atención dedicada y personalizada de sus mentores distingue a esta academia.",
  },
  {
    nombre: "Blanca Mejías",
    foto: "/testimonios/blanca-mejias.avif",
    ubicacion: "",
    quote:
      "He aprendido a pensar y ver las situaciones como un especialista SEO.",
  },
  {
    nombre: "Yolimar Medina",
    foto: "/testimonios/yolimar-medina.avif",
    ubicacion: "USA",
    quote:
      "Se han traducido en conocimiento, herramientas y una nueva pasión: el Content SEO.",
  },
  {
    nombre: "Maria Belén Vallejo",
    foto: "/testimonios/maria-belen-vallejo.avif",
    ubicacion: "Ecuador",
    quote:
      "Si estás considerando tomar este curso, yo lo recomiendo 100%.",
  },
  {
    nombre: "Karina Uban",
    foto: "/testimonios/karina-uban.avif",
    ubicacion: "Perú",
    quote:
      "Siento que es un nuevo mundo de oportunidades y de herramientas que puedo implementar.",
  },
  {
    nombre: "Claudia Almado",
    foto: "/testimonios/claudia-almado.avif",
    ubicacion: "Venezuela",
    quote:
      "No solo aprendí cosas técnicas acerca del SEO, sino que también hubo un aprendizaje inspiracional.",
  },
  {
    nombre: "Josef Bolaños",
    foto: "/testimonios/josef-bolanos.avif",
    ubicacion: "Chile",
    quote:
      "aprendoclub para mí se volvió muy especial, ya que quiero y deseo crecer en el mundo SEO.",
  },
  {
    nombre: "Diyeli Camacho",
    foto: "/testimonios/diyeli-camacho.avif",
    ubicacion: "Venezuela",
    quote:
      "A pesar de que no sabía absolutamente nada, puse empeño en aprender.",
  },
  {
    nombre: "Erika Galaviz",
    foto: "/testimonios/erika-galaviz.avif",
    ubicacion: "España",
    quote:
      "aprendoclub ha superado mis expectativas por toda la calidad de contenido.",
  },
  {
    nombre: "Randy Barrera",
    foto: "/testimonios/randy-barrera.avif",
    ubicacion: "Venezuela",
    quote:
      "Hay un mar de posibilidades, ya que hay mucha gente que desconoce lo que implica crear su página web.",
  },
];

/** Galería del Reto: t1..t9. Alt numerado 1-9 para unicidad. */
export const retoImagenes: RetoImagen[] = Array.from({ length: 9 }, (_, i) => ({
  src: `/reto/testimonios/t${i + 1}.png`,
  alt: `Testimonio de participante ${i + 1} del Reto 7 días`,
}));

/** Banda de logos "empresas como" (reusada del home, sin duplicar inline). */
export const trustedCompanies: TrustedCompany[] = [
  { name: "Holafly", logo: "/logo-holafly.svg" },
  { name: "HubSpot", logo: "/logo-hubspot.svg" },
  { name: "Unilever", logo: "/logo-unilever.svg" },
  { name: "DSLX", logo: "/logo-dslx.svg" },
];
