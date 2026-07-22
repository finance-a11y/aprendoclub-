---
phase: 27-equipo-y-testimonios
plan: 01
subsystem: content
tags: [payload-cms, seed-data, team-members, testimonios]

# Dependency graph
requires:
  - phase: 26-copy-general-home
    provides: Barrido de copy "real"/SEO ya aplicado sobre los mismos archivos seed-data (evita conflictos de edición concurrente)
provides:
  - Dana Aliaga reemplaza a Diana Rodríguez en el team grid de /quienes-somos, consolidada como un único registro compartido con /diplomado
  - Sección de logos de empresas confiadas eliminada de /testimonios (bloque logosRef quitado de buildTestimonios)
  - Cleanup idempotente en el seed que elimina el doc huérfano "Diana Rodríguez" de team-members
affects: [28-rebranding-diplomado, 29-faqs-membresia]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Reconciliación de registros duplicados en seed: unificar por nombre vía SHARED_WITH_DIPLOMADO en vez de mantener dos arrays que upsertean el mismo doc"
    - "Cleanup idempotente pre-loop: payload.delete() con where explícito por clave natural antes del upsert principal, para self-correcting re-seeds"

key-files:
  created: []
  modified:
    - aprendoclub/scripts/seed/seed-data/quienes-somos.ts
    - aprendoclub/scripts/seed/pages.ts
    - aprendoclub/scripts/seed/collections.ts
    - aprendoclub/scripts/seed/seed-data/testimonios.ts

key-decisions:
  - "Dana Aliaga sin foto: se omite la clave `foto` del objeto (no string vacío, no reusar diana.avif) para activar el fallback de iniciales 'DA' ya soportado por TeamGridRef.tsx"
  - "trustedCompanies y la interface TrustedCompany se CONSERVAN en testimonios.ts pese al brief original: los siguen consumiendo collections.ts (colección ClientesTrabajados) y media.ts (manifest de media); borrarlos rompería la compilación"
  - "DIPLOMADO_TEAM_ONLY se vació (no se eliminó el const) para mantener el tipo explícito documentado sin dejar código muerto contradictorio"

patterns-established: []

requirements-completed: [TEAM-01, TESTIM-01]

# Metrics
duration: ~15min
completed: 2026-07-11
---

# Phase 27 Plan 01: Equipo y testimonios Summary

**Dana Aliaga reemplaza a Diana Rodríguez en el team grid (avatar de iniciales, un solo registro compartido con /diplomado) y se elimina el bloque de logos de empresas confiadas de /testimonios, con re-seed exitoso a Neon.**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-07-11T07:35:00Z (aprox.)
- **Completed:** 2026-07-11T07:50:00Z (aprox.)
- **Tasks:** 3/3 completadas
- **Files modified:** 4

## Accomplishments
- Diana Rodríguez reemplazada por Dana Aliaga en el grid de /quienes-somos (mismo slot, avatar de iniciales "DA", sin foto rota)
- Dana Aliaga consolidada como UN solo registro de team-members mostrado tanto en /quienes-somos como en /diplomado (antes eran dos upserts separados que se pisaban)
- Cleanup idempotente agregado al seed: borra el doc huérfano "Diana Rodríguez" de la colección team-members en cada corrida
- Bloque `logosRef` eliminado de `buildTestimonios()`; la página /testimonios ya no renderiza la banda de logos
- `trustedCompanies` y la colección Payload `ClientesTrabajados` quedan intactas (solo se quitó el consumo de esa data en la página de testimonios)
- `npx tsc --noEmit` sin errores; `npm run seed` corrió exitosamente contra Neon (team-members: 5, testimonios: 5 bloques)

## Task Commits

Each task was committed atomically:

1. **Task 1: TEAM-01 — Diana Rodríguez → Dana Aliaga** - `3f31469` (feat)
2. **Task 2: TESTIM-01 — Quitar sección de logos de /testimonios** - `765ea47` (feat)
3. **Task 3: Re-seed a Neon + gate de verificación** - sin cambios de código (solo ejecución: `npx tsc --noEmit` limpio, `npm run seed` exitoso, gate de grep en verde)

**Plan metadata:** (este commit, ver más abajo)

## Files Created/Modified
- `aprendoclub/scripts/seed/seed-data/quienes-somos.ts` - Entrada de equipo: "Diana Rodríguez" → "Dana Aliaga", iniciales DR → DA, clave `foto` eliminada
- `aprendoclub/scripts/seed/pages.ts` - `QUIENES_SOMOS_TEAM_ORDER` apunta a Dana Aliaga; bloque `logosRef` eliminado de `buildTestimonios()`; imports huérfanos (`logosBanda`, `trustedCompanies`) removidos
- `aprendoclub/scripts/seed/collections.ts` - `SHARED_WITH_DIPLOMADO` incluye 'Dana Aliaga'; `DIPLOMADO_TEAM_ONLY` vaciado; cleanup idempotente `payload.delete()` de "Diana Rodríguez"; comentario y console.log obsoletos actualizados
- `aprendoclub/scripts/seed/seed-data/testimonios.ts` - export `logosBanda` eliminado; `trustedCompanies` e interface `TrustedCompany` conservados intactos

## Decisions Made
- Dana Aliaga sin foto: se omite la clave `foto` (fallback de iniciales del componente TeamGridRef.tsx), sin reusar `diana.avif` ni apuntar a archivo inexistente
- `trustedCompanies` NO se borra pese al brief original del phase (contradicción resuelta a favor de los discovered_facts del plan: sigue siendo consumido por `collections.ts` y `media.ts` para la colección `ClientesTrabajados`)
- `DIPLOMADO_TEAM_ONLY` se deja como array vacío tipado en vez de eliminar el const, para no dejar referencias rotas al loop que lo consume

## Deviations from Plan

None - plan ejecutado exactamente como estaba escrito. El plan ya incorporaba discovered_facts que resolvían de antemano la contradicción sobre `trustedCompanies` (se conserva, no se borra).

## Issues Encountered
None.

## User Setup Required

None - no external service configuration required. El re-seed ya se ejecutó contra Neon con las credenciales existentes en `.env.local` (mismo precedente de Phase 26).

## Next Phase Readiness
- Phase 27 completa: TEAM-01 y TESTIM-01 cerrados, cambios propagados a Neon.
- Ready para Phase 28 (rebranding del diplomado) — mismo lote de archivos seed-data, sin conflictos pendientes de esta fase.
- Pendiente futuro (no bloqueante): foto real de Dana Aliaga cuando Juan la aporte (hoy usa avatar de iniciales).

---
*Phase: 27-equipo-y-testimonios*
*Completed: 2026-07-11*

## Self-Check: PASSED

All 4 modified files verified present on disk; commits `3f31469` and `765ea47` verified present in `git log --all`.
