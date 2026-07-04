/**
 * Capa de contenido data-driven del Reto 7 días (Fase 4, PROG-04).
 *
 * Fuente: export original del Reto (public/reto/index.txt, RSC payload) + la copy
 * ya limpia de 04-CONTENT-SOURCE.md. Los datos (fechas, cifras, ganadores, precio,
 * agenda) van fieles. El copy propio está humanizado: español neutro, sin em/en
 * dashes, sin AI tells. Las respuestas del FAQ son VERBATIM del export.
 *
 * Las interfaces espejan un futuro bloque/colección de Payload (v1.1) para migrar 1:1.
 * Edición ACTIVA: la próxima empieza el 13 de julio (no inventar otras fechas).
 */

/** Enlace de acción (CTA) del Reto. Payload-ready: sub-bloque `Cta`. */
export interface RetoCta {
  label: string;
  href: string;
}

/** Hero del Reto. Payload-ready: bloque `Hero`. */
export interface RetoHero {
  eyebrow: string;
  titulo: string;
  destacado: string;
  texto: string;
  bullets: string[];
  precioTexto: string;
  ctas: RetoCta[];
  imagen: string;
}

/** Sección "la razón por la cual no escalas". Payload-ready: bloque `Argumento`. */
export interface RazonNoEscalas {
  titulo: string;
  parrafo: string;
  frases: string[];
}

/** Estadística de la mentora. Payload-ready: item `Stat`. */
export interface Stat {
  valor: string;
  etiqueta: string;
}

/** Sección mentora. Payload-ready: bloque `Mentora`. */
export interface Mentora {
  nombre: string;
  rol: string;
  stats: Stat[];
  historia: string;
  quote: string;
  cierre: string;
  foto: string;
}

/** Día de la agenda. Payload-ready: item de la colección `AgendaDia`. */
export interface AgendaDia {
  dia: string;
  titulo: string;
  descripcion: string;
  imagen: string;
}

/** Fila de comparación. Payload-ready: item `ComparacionFila`. */
export interface ComparacionFila {
  deSiempre: string;
  elReto: string;
}

/** Premios del Reto. Payload-ready: bloque `Premios`. */
export interface Premios {
  mayor: { titulo: string; imagen: string };
  becas: { titulo: string; imagen: string };
  comoSeGana: string;
}

/** Bloque de precio del Reto. Payload-ready: bloque `Pricing`. */
export interface RetoPricing {
  precio: string;
  precioNota: string;
  incluyeTexto: string;
  ctas: RetoCta[];
  nota: string;
  whatsapp: string;
}

/** Ganador de una edición. Payload-ready: item de la colección `Ganador`. */
export interface Ganador {
  nombre: string;
  edicion: string;
  imagen: string;
}

/** Pregunta del FAQ. Payload-ready: item `FaqItem`. */
export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

/** Barra de urgencia sticky (edición activa). */
export const urgencia =
  "+3,000 personas ya pasaron por este reto · Cupos limitados · Empieza el 13 de julio";

/** Hero del Reto. */
export const hero: RetoHero = {
  eyebrow: "RETO 7 DÍAS",
  titulo: "Duplica tus ingresos como marketer en 2026",
  destacado: "Y gana una MacBook nueva",
  texto:
    "7 días para construir tu plan realista y ganar tus primeros +$1,000/mes en dólares, especializándote en las habilidades mejor pagadas del marketing digital y la inteligencia artificial.",
  bullets: [
    "7 clases + sesiones en vivo, con plantillas y tareas cada día",
    "Sales con tu plan completo y accionable para monetizar tu carrera",
    "Concursa por una MacBook nueva y por becas de certificación",
  ],
  precioTexto: "Tu entrada hoy: solo $20",
  ctas: [
    { label: "Quiero mi cupo", href: "https://api.whatsapp.com/send?phone=13055728892" },
    { label: "Pago en bolívares", href: "https://aprendoseo.apturio.com/metodos-de-pago-reto" },
  ],
  imagen: "/reto/arianna-hero.png",
};

/** La razón por la cual no escalas. */
export const razonNoEscalas: RazonNoEscalas = {
  titulo: "El problema no es que no trabajes. Es que no estás especializado.",
  parrafo:
    "Quizás haces un poco de todo: contenido, diseño, redes, lo que caiga. O quizás apenas empiezas y te abruma no saber por dónde entrar.",
  frases: [
    "El que hace de todo es el más fácil de reemplazar.",
    "El que hace de todo es el peor pagado.",
    "El que nunca elige una cosa, nunca se vuelve experto en nada.",
  ],
};

/** Mentora: Arianna Lupi. */
export const mentora: Mentora = {
  nombre: "Hola, soy Arianna Lupi",
  rol: "Tu mentora",
  stats: [
    { valor: "+7 años", etiqueta: "especializada en SEO" },
    { valor: "+$300,000", etiqueta: "generados en 5 años" },
    { valor: "+20 clientes", etiqueta: "en dólares" },
    { valor: "+150K", etiqueta: "comunidad en TikTok" },
  ],
  historia:
    "Y hace unos años estaba peor que tú. En 2016 tenía hasta tres trabajos a la vez. Community manager, diseño, redacción, contenido... lo intenté todo. Pasaba 12 horas fuera de casa y solo me alcanzaba para llegar al mes.",
  quote: "Deja de hacer todo. Si quieres posicionarte, enfócate en una sola cosa.",
  cierre:
    "Hoy dirijo aprendoclub, la plataforma #1 en LATAM para aprender esta especialidad en español: +10,000 estudiantes formados y una comunidad de +150K en TikTok, +75K en Instagram y 5K en YouTube.",
  foto: "/reto/arianna-mentora.jpg",
};

/** Agenda de los 7 días (fiel al export). */
export const agenda: AgendaDia[] = [
  {
    dia: "Día 1",
    titulo: "Encuentra tu especialidad",
    descripcion:
      "Sales sabiendo en cuál de las habilidades mejor pagadas enfocarte, según tu perfil y el mercado.",
    imagen: "/reto/dias/1.jpg",
  },
  {
    dia: "Día 2",
    titulo: "Adapta tu experiencia y tu nicho",
    descripcion: "Todo lo que ya viviste se vuelve tu ventaja. Sin empezar de cero.",
    imagen: "/reto/dias/2.jpg",
  },
  {
    dia: "Día 3",
    titulo: "Aprende nuevas habilidades",
    descripcion:
      "Cómo dominar lo que necesitas para especializarte en las habilidades mejor pagadas.",
    imagen: "/reto/dias/3.jpg",
  },
  {
    dia: "Día 4",
    titulo: "SEO con IA",
    descripcion:
      "La habilidad mejor pagada del marketing digital. Atrae tráfico sin pagar anuncios y aparece en Google, redes y en la IA: ChatGPT y Gemini.",
    imagen: "/reto/dias/4.jpg",
  },
  {
    dia: "Día 5",
    titulo: "Marketing con IA",
    descripcion:
      "Usa la IA para generar estrategias, hooks, guiones, calendarios y análisis de competencia 3x más rápido.",
    imagen: "/reto/dias/5.jpg",
  },
  {
    dia: "Día 6",
    titulo: "Empaqueta tu servicio + Plan SMART",
    descripcion:
      "Conviertes tu especialidad en una oferta concreta y construyes el plan SMART para monetizarla.",
    imagen: "/reto/dias/6.jpg",
  },
  {
    dia: "Día 7",
    titulo: "Cierre, plan final y ganadores",
    descripcion: "Tu camino claro hacia tus primeros $1,000/mes y la premiación.",
    imagen: "/reto/dias/7.jpg",
  },
];

/** Comparación "Lo de siempre" vs "El Reto 7 Días". */
export const comparacion: ComparacionFila[] = [
  { deSiempre: "Cursos largos que abandonas", elReto: "7 días en vivo con acompañamiento" },
  { deSiempre: "Teoría que no aplicas", elReto: "Sales con un plan concreto" },
  { deSiempre: 'Aprendes "de todo" otra vez', elReto: "Eliges UNA especialidad" },
  { deSiempre: "Lo haces solo", elReto: "Comunidad + coaches" },
  { deSiempre: "Terminas y nada cambia", elReto: "Concursas por MacBook y beca" },
];

/** Qué incluye el Reto. */
export const incluye: string[] = [
  "Sesiones en vivo + grabadas",
  "Recursos y plantillas descargables",
  "Tu Plan SMART personalizado",
  "Comunidad + coaches",
  "Certificado de participación avalado por aprendoclub",
];

/** Premios del Reto. */
export const premios: Premios = {
  mayor: { titulo: "Premio mayor: una MacBook nueva", imagen: "/reto/premios/macbook.jpg" },
  becas: { titulo: "Becas para certificarte", imagen: "/reto/premios/beca.jpg" },
  comoSeGana:
    "No es sorteo al azar. Premiamos el compromiso: las mejores tareas y los planes mejor construidos durante el reto.",
};

/** Bloque de precio del Reto. */
export const pricing: RetoPricing = {
  precio: "$20",
  precioNota: "Pago único",
  incluyeTexto: "Acceso completo + concurso por MacBook y becas",
  ctas: [
    { label: "Quiero participar - Pago en $", href: "https://api.whatsapp.com/send?phone=13055728892" },
    {
      label: "Quiero participar - Pago en bolívares",
      href: "https://aprendoseo.apturio.com/metodos-de-pago-reto",
    },
  ],
  nota: "Acceso inmediato · Cupos limitados",
  whatsapp: "https://api.whatsapp.com/send?phone=13055728892",
};

/** Ganadores de ediciones anteriores. */
export const ganadoresIntro =
  "En cada edición, alguien se va a casa con una MacBook. Personas reales, como tú, que entraron por $20 y se tomaron el reto en serio.";

export const ganadores: Ganador[] = [
  { nombre: "Bregner Herrera", edicion: "Edición Enero 2026", imagen: "/reto/ganadores/g1.jpg" },
  { nombre: "Germán Andrade", edicion: "Edición 2024", imagen: "/reto/ganadores/g2.jpg" },
  { nombre: "Maiberth", edicion: "Edición 2024", imagen: "/reto/ganadores/g3.jpg" },
  { nombre: "Stephany Vivas", edicion: "Edición 2025", imagen: "/reto/ganadores/g4.jpg" },
];

/** FAQ. Respuestas VERBATIM del export (index.txt); el em-dash de la primera se
 *  reemplazó por coma para respetar la regla de sin em/en dashes. */
export const faq: FaqItem[] = [
  {
    pregunta: "¿Necesito experiencia en marketing?",
    respuesta:
      "No. Si ya trabajas en marketing, perfecto. Si apenas empiezas o quieres cambiar de carrera, también, el reto está pensado para llevarte desde donde estés.",
  },
  {
    pregunta: "¿Cuánto tiempo necesito al día?",
    respuesta:
      "Alrededor de una hora entre la clase y su tarea. Todo queda grabado si no puedes en vivo.",
  },
  {
    pregunta: "¿De verdad voy a ganar $1,000/mes en 7 días?",
    respuesta:
      "No. En 7 días construyes el plan realista y la especialización para llegar ahí. El reto te da el mapa; el resultado depende de tu ejecución. Pero sales sabiendo exactamente qué hacer.",
  },
  {
    pregunta: "¿Cómo concurso por la MacBook y las becas?",
    respuesta:
      "Completando el reto: asistes, haces las tareas y entregas tu plan final. Premiamos a quienes mejor lo hagan. Te explicamos todo el Día 1.",
  },
  {
    pregunta: "¿Y si no puedo asistir en vivo?",
    respuesta:
      "Todo queda grabado y tienes acceso de por vida. Avanzas a tu ritmo dentro del reto.",
  },
  {
    pregunta: "¿Por qué solo $20?",
    respuesta:
      "Porque quiero que entres sin excusas. El reto se paga solo con la primera decisión que tomes adentro.",
  },
];

/** CTA final del Reto. */
export const ctaFinal = {
  titulo: "Tu próximo año empieza con esta decisión",
  botonLabel: "Quiero participar - $20",
  botonHref: "https://api.whatsapp.com/send?phone=13055728892",
};
