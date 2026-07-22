---
phase: 31
status: human_needed
verified: 2026-07-22
---

# Verification: Phase 31 — Tipografía, motion y spacing (segunda pasada)

## Success Criteria

1. **Los headings principales de home, diplomado, taller y reto usan Montserrat Bold de forma consistente, sin romper el contrato tipográfico de pesos ya existente.**
   Estado: ✅ Cumplido en código (29 H2 + 3 H1 pasados a `font-bold`; body/h3/blog sin tocar). Confirmación visual pendiente (ver nota de bloqueo).
2. **Las secciones clave del home y de las páginas de programas muestran transiciones/efectos de motion perceptiblemente más notorios que en v1.5, respetando `prefers-reduced-motion`.**
   Estado: ✅ Cumplido en código (hover reforzado en `Card`/`FeatureGrid`; `prefers-reduced-motion` ya cubierto globalmente en `globals.css`, no se tocó esa media query). Confirmación visual pendiente.
3. **El espacio vertical entre secciones grandes (ej. currículum → cómo funciona) se percibe reducido.**
   Estado: ✅ Cumplido en código (`section-spacing` recortado ~30-35%). Confirmación visual pendiente.

## Bloqueo de verificación visual

Ni el sitio en producción (sin `npm run seed`/deploy) ni `npm run dev` local reflejan estos cambios verificables en pantalla ahora mismo: ambos dependen de conectar a Payload/Neon para renderizar las páginas, y Neon devuelve `ECONNRESET` consistentemente (mismo bloqueo que Fase 30 — confirmado independientemente acá: el dev server local falla exactamente igual, descartando que sea un problema del sandbox de este agente).

Riesgo de que el cambio no funcione visualmente: bajo — son cambios CSS/Tailwind puros (pesos de fuente, un utility de padding, clases de hover), sin lógica nueva ni dependencia de datos.

## Resume

Cuando Neon vuelva a responder, correr `/gsd-verify-work 31` (o simplemente abrir el sitio) para confirmar visualmente los 3 criterios.
