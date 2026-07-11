---
gsd_state_version: 1.0
milestone: v1.6
milestone_name: Rediseño de copy
status: blocked
last_updated: "2026-07-11T08:41:52.025Z"
last_activity: "2026-07-11 — Fase 28 completa (28-02: gap closure de verificación — bullet de pricing y media.alt en Neon)"
progress:
  total_phases: 4
  completed_phases: 3
  total_plans: 7
  completed_plans: 7
  percent: 75
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-11)

**Core value:** Convertir visitas en inscripciones a los programas con un sitio rápido, editable sin código y con copy que refleje la voz real de la marca.
**Current focus:** Fase 29 pendiente (FAQs de membresía) — última fase de v1.6

## Current Position

Phase: Phase 28 (Rebranding del diplomado) — completa (2/2 plans)
Plan: 28-02 (Gap closure: variante "Diplomado CERO A SEO" sin "de" + reconciliación de media.alt en Neon) — última completada
Status: Phase 28 completa y cerrada. Requirement BRAND-01 marcado Complete en REQUIREMENTS.md. 28-01 cubrió las 10 ocurrencias literales de "Diplomado de Cero a SEO" en scripts/seed/. La verificación de fase encontró 2 gaps: (1) una variante sin la palabra "de" ("Diplomado CERO A SEO completo") sobrevivió en el bullet de pricing de diplomado.ts:515, no capturada por el grep literal original; (2) seedMedia() nunca actualizaba el campo alt de documentos de media ya existentes en Neon (solo los creaba si no existían), así que 3 assets del diplomado seguían mostrando el nombre viejo en producción pese a que el fuente ya estaba corregido. 28-02 cerró ambos: renombró el bullet, agregó reconciliación diff-and-update en seedMedia() (rama existing.docs.length > 0), y durante la verificación post-fix descubrió un tercer caso — diplomado-hero.avif (media id 118) quedaba huérfano del pipeline de seed porque el campo hero.imagen ya no está seteado en el fuente; se restauró el path explícito en collectMediaAssets() para que la reconciliación también lo cubriera (confirmado sin impacto de rendering vía query directa a pages_rels: 0 referencias). Verificación final por SQL directa contra Neon (scripts/verify-media-alt.ts, payload.db.pool) confirma 0 registros de media con el nombre viejo en alt y los 3 assets del diplomado con el nombre nuevo. `npx tsc --noEmit` sin errores; `npm run seed` corrió exitosamente contra Neon.
Last activity: 2026-07-11 — Fase 28 completa (28-02: gap closure de verificación — bullet de pricing y media.alt en Neon)

## Accumulated Context

### Pending Todos

- Checkout real del Taller SEO con IA (URL de pago pendiente de Juan)
- Discrepancia menor de separador de miles en /quienes-somos ("2.000" vs "2,000")
- Assets muertos `reto/incluye/*.jpg` + `reto/icons/*.png` (candidatos a borrado)
- Link "Blog" en navbar/footer (edición de site-settings en /admin)
- Google Rich Results Test de JSON-LD post-deploy

### Blockers/Concerns

- **Phase 29 (FAQs de membresía) bloqueada — esperando a Juan.** Al arrancar discuss de Phase 29 pregunté qué cambió del modelo de negocio viejo al de membresía (para saber qué FAQs de `faqs.ts` quedan obsoletas). Juan prefirió revisarlo en llamada/Slack en vez de decidirlo ahora. No avanzar Phase 29 (discuss/plan/execute) hasta que Juan aporte ese contexto. El resto del milestone (Phases 26-28) está completo y verificado en passed (26 passed, 27 passed, 28 passed tras gap closure 28-02). Milestone v1.6 NO está completo — falta Phase 29 y por lo tanto el lifecycle (audit/complete-milestone) no debe correr todavía.
