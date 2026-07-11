---
gsd_state_version: 1.0
milestone: v1.6
milestone_name: Rediseño de copy
status: verifying
last_updated: "2026-07-11T08:10:00.000Z"
last_activity: "2026-07-11 — Fase 28 completa (28-01: Diplomado renombrado a 'Diplomado de SEO + AIO')"
progress:
  total_phases: 4
  completed_phases: 3
  total_plans: 6
  completed_plans: 6
  percent: 75
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-11)

**Core value:** Convertir visitas en inscripciones a los programas con un sitio rápido, editable sin código y con copy que refleje la voz real de la marca.
**Current focus:** Fase 29 pendiente (FAQs de membresía) — última fase de v1.6

## Current Position

Phase: Phase 28 (Rebranding del diplomado) — completa (1/1 plan)
Plan: 28-01 (Renombrar diplomado a "Diplomado de SEO + AIO" + fix "Práctica real" + re-seed) — última completada
Status: Phase 28 completa. Requirement BRAND-01 marcado Complete en REQUIREMENTS.md. Las 10 ocurrencias de "Diplomado de Cero a SEO" en scripts/seed/ (diplomado.ts, testimonios.ts, collections.ts, globals.ts, media.ts) reemplazadas por "Diplomado de SEO + AIO"; incluye 5 ocurrencias adicionales detectadas por grep case-insensitive no listadas explícitamente en CONTEXT.md (globals.ts:21, media.ts:73/81, diplomado.ts:145/343). CTA de WhatsApp en home.ts actualizado con el nombre nuevo URL-encoded. Fix colateral "Práctica real" → "Práctica aplicada" aplicado en collections.ts. Menciones de "especialista SEO" (descripción de especialidad, no tagline) quedaron intactas. `npx tsc --noEmit` sin errores; `npm run seed` corrió exitosamente contra Neon.
Last activity: 2026-07-11 — Fase 28 completa (28-01: Diplomado renombrado a "Diplomado de SEO + AIO")

## Accumulated Context

### Pending Todos

- Checkout real del Taller SEO con IA (URL de pago pendiente de Juan)
- Discrepancia menor de separador de miles en /quienes-somos ("2.000" vs "2,000")
- Assets muertos `reto/incluye/*.jpg` + `reto/icons/*.png` (candidatos a borrado)
- Link "Blog" en navbar/footer (edición de site-settings en /admin)
- Google Rich Results Test de JSON-LD post-deploy

### Blockers/Concerns

None yet.
