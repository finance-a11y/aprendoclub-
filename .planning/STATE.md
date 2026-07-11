---
gsd_state_version: 1.0
milestone: v1.6
milestone_name: Rediseño de copy
status: Defining requirements
last_updated: "2026-07-11T07:23:26.057Z"
last_activity: 2026-07-11 — Milestone v1.6 started
progress:
  total_phases: 4
  completed_phases: 1
  total_plans: 4
  completed_plans: 4
  percent: 25
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-11)

**Core value:** Convertir visitas en inscripciones a los programas con un sitio rápido, editable sin código y con copy que refleje la voz real de la marca.
**Current focus:** Definiendo requirements de v1.6 (rediseño de copy)

## Current Position

Phase: Phase 26 (Copy general + Home) — completa (4/4 planes)
Plan: 26-04 (Gate global de verificación + seed) — última completada
Status: Phase 26 completa. Requirements COPY-01, COPY-02, HOME-01, HOME-02 marcados Complete en REQUIREMENTS.md. Gate global de "real"/"reales" y de-énfasis SEO verificado sobre todo scripts/seed/, con 2 excepciones documentadas (comentarios JSDoc de specs de imagen; quienes-somos.ts:81 "especialistas en SEO e IA" como mención de dominio/rol, no tagline de marca). `npm run seed` corrió exitosamente contra Postgres/Neon.
Last activity: 2026-07-11 — Fase 26 completa (26-04: gate global de verificación + seed corrido contra Neon)

## Accumulated Context

### Pending Todos

- Checkout real del Taller SEO con IA (URL de pago pendiente de Juan)
- Discrepancia menor de separador de miles en /quienes-somos ("2.000" vs "2,000")
- Assets muertos `reto/incluye/*.jpg` + `reto/icons/*.png` (candidatos a borrado)
- Link "Blog" en navbar/footer (edición de site-settings en /admin)
- Google Rich Results Test de JSON-LD post-deploy

### Blockers/Concerns

None yet.
