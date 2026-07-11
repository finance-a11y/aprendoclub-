---
gsd_state_version: 1.0
milestone: v1.6
milestone_name: Rediseño de copy
status: verifying
last_updated: "2026-07-11T07:50:00.000Z"
last_activity: "2026-07-11 — Fase 27 completa (27-01: Dana Aliaga reemplaza a Diana; logos de empresas quitados de /testimonios)"
progress:
  total_phases: 4
  completed_phases: 2
  total_plans: 5
  completed_plans: 5
  percent: 50
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-11)

**Core value:** Convertir visitas en inscripciones a los programas con un sitio rápido, editable sin código y con copy que refleje la voz real de la marca.
**Current focus:** Definiendo requirements de v1.6 (rediseño de copy)

## Current Position

Phase: Phase 27 (Equipo y testimonios) — completa (1/1 plan)
Plan: 27-01 (Diana→Dana + quitar logos de /testimonios + re-seed) — última completada
Status: Phase 27 completa. Requirements TEAM-01, TESTIM-01 marcados Complete en REQUIREMENTS.md. Dana Aliaga reemplaza a Diana Rodríguez en el team grid (avatar de iniciales "DA", registro único compartido con /diplomado, cleanup idempotente del doc huérfano de Diana en el seed). Bloque `logosRef` eliminado de `buildTestimonios()` en /testimonios; `trustedCompanies` y la colección Payload `ClientesTrabajados` quedan intactas. `npx tsc --noEmit` sin errores; `npm run seed` corrió exitosamente contra Neon.
Last activity: 2026-07-11 — Fase 27 completa (27-01: Dana Aliaga reemplaza a Diana; logos de empresas quitados de /testimonios)

## Accumulated Context

### Pending Todos

- Checkout real del Taller SEO con IA (URL de pago pendiente de Juan)
- Discrepancia menor de separador de miles en /quienes-somos ("2.000" vs "2,000")
- Assets muertos `reto/incluye/*.jpg` + `reto/icons/*.png` (candidatos a borrado)
- Link "Blog" en navbar/footer (edición de site-settings en /admin)
- Google Rich Results Test de JSON-LD post-deploy

### Blockers/Concerns

None yet.
