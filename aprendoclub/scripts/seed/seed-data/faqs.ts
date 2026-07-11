/**
 * FAQs en un módulo plano (sin "use client") para que las consuman tanto los
 * componentes cliente (acordeón) como los Server Components (JSON-LD FAQPage).
 * Payload-ready: cada lista mapea a una colección `Faq`.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    question: "¿Qué incluye la membresía de aprendoclub?",
    answer:
      "Acceso a cursos, comunidad, sesiones en vivo, bolsa de trabajo y herramientas según tu plan.",
  },
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer:
      "Sí, puedes subir o bajar de plan cuando quieras sin penalización.",
  },
  {
    question: "¿Necesito experiencia previa en SEO?",
    answer:
      "No, nuestro programa empieza desde cero y te lleva paso a paso hasta nivel consultor.",
  },
  {
    question: "¿Cómo funcionan las sesiones en vivo?",
    answer:
      "Son sesiones semanales por videollamada donde resolvemos dudas, revisamos proyectos y aprendemos juntos.",
  },
  {
    question: "¿Hay garantía de devolución?",
    answer:
      "Sí, tienes 7 días para probar la plataforma. Si no es para ti, te devolvemos el dinero.",
  },
  {
    question: "¿Qué diferencia a aprendoclub de otros cursos online?",
    answer:
      "Combinamos cursos actualizados, comunidad activa, mentorías y proyectos en una sola plataforma.",
  },
];

export const diplomadoFaqs: FaqItem[] = [
  {
    question: "¿Debo tener experiencia previa?",
    answer:
      "No te preocupes, no necesitas experiencia previa. El curso está diseñado para personas que recién están comenzando, así que puedes empezar desde cero.",
  },
  {
    question: "¿Cuánto tiempo debo invertir para convertirme en un experto en SEO?",
    answer:
      "El diplomado se puede completar entre 3 y 6 meses. Con dedicación constante, podrás empezar a ver resultados desde las primeras semanas.",
  },
  {
    question: "¿Cuáles son los tipos de SEO que existen?",
    answer:
      "Existen tres tipos principales: SEO On-Page (optimización del contenido), SEO Off-Page (construcción de autoridad) y SEO Técnico (optimización de la infraestructura web). En el diplomado cubrirás los tres.",
  },
  {
    question: "¿Qué debo estudiar para ser SEO?",
    answer:
      "No necesitas estudios previos específicos. Nuestro diplomado te lleva desde lo más básico hasta estrategias avanzadas, con todo lo necesario para convertirte en especialista SEO.",
  },
];
