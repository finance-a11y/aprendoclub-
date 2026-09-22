---
phase: 31
plan: 1
completed: 2026-07-22
---

# Summary 31-01

Segunda pasada de tipografía/motion/spacing, 100% código (sin dependencia de Neon, a diferencia de Fase 30). Montserrat Bold aplicado de forma consistente a los H2 de sección (29 archivos) y a los H1 de Diplomado/Taller/Reto. `section-spacing` recortado en `globals.css` (afecta 45 componentes de un solo cambio). Hover de cards reforzado (`Card` primitivo + `FeatureGrid`) con más lift, scale sutil y sombra. Typecheck y lint limpios. Verificación visual diferida por el mismo bloqueo de Neon de la Fase 30 — el dev server local también falla con `ECONNRESET`, confirma que no es un problema del sandbox sino de Neon.
