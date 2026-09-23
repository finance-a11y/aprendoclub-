---
gsd_state_version: "1.0"
milestone: v1.8
status: Awaiting next milestone
stopped_at: "Quick task 260923-gdf complete: mobile fix, navbar padding, Diplomado rename, comingSoon gating — all applied incl. Neon migration and live-content fix. On branch quick/260923-gdf-fix-overlap-fotos-scroll, not yet merged to main."
last_updated: "2026-09-23T18:07:44.535Z"
last_activity: 2026-09-23
last_activity_desc: Milestone v1.8 completed and archived
state_head: fb6bb1204d252a5a4faab243f17328fe54086d63
progress:
  total_phases: 10
  completed_phases: 9
  total_plans: 6
  completed_plans: 6
  percent: 90
milestone_name: Migración aprendoseo.com → aprendoclub.com
current_phase: null
current_phase_name: null
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-09-23)

**Core value:** Convertir visitas en inscripciones a los programas con un sitio rápido, editable sin código y con copy que refleje la voz real de la marca.
**Current focus:** v1.8 shipped. Feedback de diseño post-milestone en curso vía quick task (260923-gdf). Próximo milestone por definir con `/gsd-new-milestone`.

## Current Position

Phase: Milestone v1.8 complete
Plan: —
Status: Awaiting next milestone
Last activity: 2026-09-23 — Milestone v1.8 completed and archived

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

- **v1.6 Fase 29 (FAQs de membresía) sigue bloqueada** — esperando que Juan aporte contexto sobre el modelo de negocio viejo→membresía. Sin numeración propia todavía; ver Deferred Items.
- **Verificación humana diferida de v1.6/v1.7 (Fases 26, 29, 31)** — acknowledged al cierre de v1.8 (no bloquea milestones futuros). Resume con `/gsd-verify-work {fase}` cuando Juan tenga tiempo.
- Neon Postgres estuvo estable durante todo v1.8 (Phases 33-38) — la inestabilidad reportada en v1.7 no reapareció. Sin acción pendiente.
- Quick task 260923-gdf está completo (commits 2b741e1, cd681f2, fb6bb12, 7c3c044 en la rama `quick/260923-gdf-fix-overlap-fotos-scroll`) pero **sin mergear a main** — Juan decide cuándo mergear/pushear.

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Fase v1.6 | FAQs de membresía (antigua Phase 29) | Bloqueada, sin numeración asignada aún | Cierre parcial de v1.6, 2026-07-11 |
| Fase v1.7 | Galería del Diplomado rediseñada (Phase 32) | Omitida — retomar si Juan lo pide, requiere Neon + fotos reales | Cierre de v1.7, 2026-07-22 |
| v1.8 Out of Scope | Merge `/certificaciones` → autor Arianna, `/academia-seo` → `/quienes-somos` | Solo redirect simple por ahora | Definición de requirements v1.8, 2026-09-22 |
| v1.8 Out of Scope | Página Econía/SEOconía | Diferida, sin fuente de contenido | Definición de requirements v1.8, 2026-09-22 |
| Verification Gap (v1.6, archivada) | Phase 26 (Copy general home) — VERIFICATION.md human_needed sin resolver | Acknowledged al cierre de v1.8 — no bloquea, requiere validación humana pendiente | Cierre de v1.8, 2026-09-23 |
| Verification Gap (v1.7, archivada) | Phase 29 (Imágenes rotas de Diplomado) — VERIFICATION.md human_needed sin resolver | Acknowledged al cierre de v1.8 — resume con /gsd-verify-work 29 | Cierre de v1.8, 2026-09-23 |
| Verification Gap (v1.7, archivada) | Phase 31 (Tipografía/motion/spacing) — VERIFICATION.md human_needed sin resolver | Acknowledged al cierre de v1.8 — resume con /gsd-verify-work 31 | Cierre de v1.8, 2026-09-23 |
| Quick Task | 260923-gdf-fix-overlap-de-fotos-estudiantes-con-scr — en progreso al momento del cierre (planner corriendo en background) | Acknowledged al cierre de v1.8 — se completa por su cuenta, no pertenece al scope de v1.8 | Cierre de v1.8, 2026-09-23 |

## Deferred Verification

| Phase | State | Resume |
|-------|-------|--------|
| 29 | verification_deferred_human | /gsd-verify-work 29 |
| 30 | verification_deferred_human (+ seed pendiente) | npm run seed, luego /gsd-verify-work 30 |
| 31 | verification_deferred_human | /gsd-verify-work 31 |

## Session Continuity

Last session: 2026-09-23T18:07:44.527Z
Stopped at: Quick task 260923-gdf complete, awaiting merge to main (see SUMMARY)
Resume file: .planning/quick/260923-gdf-fix-overlap-de-fotos-estudiantes-con-scr/260923-gdf-SUMMARY.md

## Operator Next Steps

- Start the next milestone with /gsd-new-milestone
