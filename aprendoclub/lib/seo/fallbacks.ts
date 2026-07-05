/**
 * Fallbacks de metadata por slug.
 *
 * Preservan verbatim los `<title>`/`description` que cada página tenía como
 * `export const metadata` estático antes de migrarse al catch-all (Phases
 * 15-16). Cuando el campo equivalente en Payload (plugin-seo, `doc.meta`) está
 * vacío, se usa esta entrada. Si tampoco hay fallback, la metadata hereda el
 * default del root layout (`app/(frontend)/layout.tsx`).
 *
 * La home ('') NO lleva entrada: su title/description intencionales SON el
 * default del layout, así que hereda sin override.
 */
export const SEO_FALLBACKS: Record<string, { title: string; description: string }> = {
  "quienes-somos": {
    title: "Quiénes somos | aprendoclub",
    description:
      "Conoce la historia de aprendoclub, la primera academia de SEO e IA para el mundo hispano, y al equipo que forma especialistas con proyectos reales.",
  },
  testimonios: {
    title: "Testimonios | aprendoclub",
    description:
      "Historias reales de estudiantes de aprendoclub que empezaron desde cero y hoy posicionan sitios, consiguen clientes o trabajan remoto con el SEO.",
  },
  programas: {
    title: "Programas | aprendoclub",
    description:
      "Todos los programas de aprendoclub para especializarte en SEO e IA: diplomado, reto y talleres, con práctica real y acompañamiento.",
  },
  diplomado: {
    title: "Diplomado de cero a SEO | aprendoclub",
    description:
      "Conviértete en especialista SEO en 16 semanas, sin experiencia previa. Práctica real, coaching en vivo y certificación.",
  },
  reto: {
    title: "Reto 7 días | aprendoclub",
    description:
      "7 días para construir tu plan realista y ganar tus primeros +$1,000/mes en dólares, especializándote en las habilidades mejor pagadas del marketing digital y la inteligencia artificial.",
  },
  "programas/taller-seo-con-ia": {
    title: "Taller SEO con IA | aprendoclub",
    description:
      "Aprende a hacer que una marca o negocio aparezca en las búsquedas de Google, Gemini y ChatGPT.",
  },
}
