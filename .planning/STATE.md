---
gsd_state_version: "1.0"
milestone: v1.8
milestone_name: Migración aprendoseo.com → aprendoclub.com
current_phase: 36
current_phase_name: Páginas de programa nuevas
status: planning
stopped_at: Phase 35 complete, ready to plan Phase 36
last_updated: "2026-09-22T16:33:04.338Z"
last_activity: 2026-09-22
last_activity_desc: Phase 35 complete, transitioned to Phase 36
state_head: 600d75463988e5d390f2fcf227a53660f5b1c483
progress:
  total_phases: 10
  completed_phases: 6
  total_plans: 3
  completed_plans: 3
  percent: 46
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-09-22)

**Core value:** Convertir visitas en inscripciones a los programas con un sitio rápido, editable sin código y con copy que refleje la voz real de la marca.
**Current focus:** v1.8 — migrar aprendoseo.com a aprendoclub.com (Phases 33-38: redirects, reestructura de URLs, ciudades, programas nuevos, autores, páginas sueltas).

## Current Position

Phase: 36 of 38 (Páginas de programa nuevas)
Plan: Not started
Status: Ready to plan
Last activity: 2026-09-22 — Phase 35 complete, transitioned to Phase 36

Progress: [█████░░░░░] 46%

## Performance Metrics

**Velocity:**

- Total plans completed (v1.8): 0
- Average duration: — min
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 33 | 1 | - | - |
| 34 | 1 | - | - |
| 35 | 1 | - | - |

**Recent Trend:**

- Last 5 plans: — (histórico completo en `.planning/milestones/` y en commits previos de v1.5/v1.6/v1.7)
- Trend: —

## Accumulated Context

### Decisions

Decisions se registran en PROJECT.md Key Decisions table. Recientes relevantes para v1.8:

- Redirects 301 de aprendoseo.com → aprendoclub.com se aplican en Cloudflare (dashboard de aprendoseo.com), no en `next.config.ts` de aprendoclub — dominios distintos.
- REDIR (Phase 33) va primero por ser la entrega de mayor prioridad para Juan; RESTRUCT (Phase 34) va segundo porque la lista de redirects ya referencia las URLs finales `/programas/reto` y `/programas/diplomado` que RESTRUCT pone en producción.
- Los redirects de las páginas nuevas (CITY-04, PROGNEW-03, AUTHOR-02, MISC-01/02) se agregan como parte de la fase que crea cada página (Phases 35-38), no en una fase de redirects tardía separada — se reutiliza el mismo archivo/formato del CSV de Phase 33.
- `/reto` y `/diplomado` se mueven a `/programas/reto` y `/programas/diplomado` (consistencia con `/programas/taller-seo-con-ia`), aunque las URLs viejas ya estén live.
- Merge de contenido de `/certificaciones` → autor Arianna y `/academia-seo` → `/quienes-somos`: solo redirect simple en v1.8, el merge de copy queda diferido a una fase futura.

### Pending Todos

- Checkout real del Taller SEO con IA (URL de pago pendiente de Juan) — mitigado parcialmente por PROG-LINK-01 (CTA temporal a /evento).
- Discrepancia menor de separador de miles en /quienes-somos ("2.000" vs "2,000").
- Assets muertos `reto/incluye/*.jpg` + `reto/icons/*.png` (candidatos a borrado).
- Link "Blog" en navbar/footer (edición de site-settings en /admin).
- Google Rich Results Test de JSON-LD post-deploy.
- MISC-02: confirmar destino exacto de `/seo-con-ia/evento` con Juan antes de cerrar Phase 38 (candidato: `/programas/taller-seo-con-ia`).

### Blockers/Concerns

- **v1.6 Fase 29 (FAQs de membresía) sigue bloqueada** — esperando que Juan aporte contexto sobre el modelo de negocio viejo→membresía. No confundir con las fases 33-38 de v1.8.
- **Verificación visual diferida de v1.7 (Phases 29-31)** — pendiente de reset de cuota de Vercel Image Optimization y de confirmar que el seed de Payload corrió correctamente tras la caída de Neon. No bloquea el arranque de v1.8, pero conviene resolverlo antes de dar v1.7 por cerrado del todo.
- **Neon Postgres**: si la inestabilidad reportada en v1.7 (`ECONNRESET`) persiste, bloqueará el trabajo de Payload de Phases 34-38 (slugs, colecciones nuevas, seeds). Verificar conexión antes de planificar Phase 34.

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Fase v1.6 | FAQs de membresía (antigua Phase 29) | Bloqueada, sin numeración asignada aún | Cierre parcial de v1.6, 2026-07-11 |
| Fase v1.7 | Galería del Diplomado rediseñada (Phase 32) | Omitida — retomar si Juan lo pide, requiere Neon + fotos reales | Cierre de v1.7, 2026-07-22 |
| v1.8 Out of Scope | Merge `/certificaciones` → autor Arianna, `/academia-seo` → `/quienes-somos` | Solo redirect simple por ahora | Definición de requirements v1.8, 2026-09-22 |
| v1.8 Out of Scope | Página Econía/SEOconía | Diferida, sin fuente de contenido | Definición de requirements v1.8, 2026-09-22 |

## Deferred Verification

| Phase | State | Resume |
|-------|-------|--------|
| 29 | verification_deferred_human | /gsd-verify-work 29 |
| 30 | verification_deferred_human (+ seed pendiente) | npm run seed, luego /gsd-verify-work 30 |
| 31 | verification_deferred_human | /gsd-verify-work 31 |

## Session Continuity

Last session: 2026-09-22T15:30:00.000Z
Stopped at: Phase 35 complete, ready to plan Phase 36
Resume file: None
