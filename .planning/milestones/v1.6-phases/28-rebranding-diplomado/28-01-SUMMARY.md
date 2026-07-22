---
phase: 28-rebranding-diplomado
plan: 01
subsystem: content
tags: [payload-cms, seed, copy, rebranding]

# Dependency graph
requires:
  - phase: 26-copy-general-home
    provides: barrido general de "real"/"SEO" ya aplicado sobre los mismos archivos seed-data/*.ts
provides:
  - Diplomado renombrado a "Diplomado de SEO + AIO" en 10 ocurrencias de contenido (badge, alt de certificado, testimonio, nav/programMenu, hub de programas, títulos de FAQ, alt de media)
  - CTA de WhatsApp del home actualizado con el nombre nuevo (URL-encoded)
  - Fix colateral "Práctica real" → "Práctica aplicada" en collections.ts
affects: [29-faqs-membresia]

# Tech tracking
tech-stack:
  added: []
  patterns: [edición de scripts/seed/*.ts seguida de npm run seed idempotente contra Neon]

key-files:
  created: []
  modified:
    - aprendoclub/scripts/seed/seed-data/diplomado.ts
    - aprendoclub/scripts/seed/seed-data/testimonios.ts
    - aprendoclub/scripts/seed/seed-data/home.ts
    - aprendoclub/scripts/seed/collections.ts
    - aprendoclub/scripts/seed/globals.ts
    - aprendoclub/scripts/seed/media.ts

key-decisions:
  - "Nombre nuevo confirmado por Juan: 'Diplomado de SEO + AIO', reemplazo literal sin variantes"
  - "Se incluyeron 5 ocurrencias adicionales no listadas explícitamente en CONTEXT.md (globals.ts:21, media.ts:73/81, diplomado.ts:145/343) porque contenían el nombre completo del programa y caían bajo el objetivo de fase"
  - "Se preservaron intactas las menciones de 'especialista SEO' en programMenu[].desc y programas[].descripcion (describen la especialidad, no el tagline de marca)"

patterns-established: []

requirements-completed: [BRAND-01]

# Metrics
duration: 12min
completed: 2026-07-11
---

# Phase 28 Plan 01: Rebranding del diplomado Summary

**Diplomado renombrado de "Diplomado de Cero a SEO" a "Diplomado de SEO + AIO" en 10 ocurrencias de seed-data (badge, alt, testimonio, nav, hub, FAQs, media, CTA WhatsApp), propagado a Neon vía npm run seed.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-07-11T07:55:00Z
- **Completed:** 2026-07-11T08:07:00Z
- **Tasks:** 2 completados
- **Files modified:** 6

## Accomplishments
- Las 10 ocurrencias de "Diplomado de Cero a SEO" (incluyendo 5 no listadas explícitamente en CONTEXT.md pero detectadas por el grep gate del plan) reemplazadas por "Diplomado de SEO + AIO" en diplomado.ts, testimonios.ts, collections.ts, globals.ts y media.ts
- CTA de WhatsApp en home.ts actualizado con el nombre nuevo URL-encoded (`Diplomado%20de%20SEO%20%2B%20AIO`)
- Fix colateral "Práctica real" → "Práctica aplicada" aplicado en collections.ts
- `npm run seed` corrió exitosamente contra Neon, propagando programas/testimonios/media/globals actualizados
- `npx tsc --noEmit` sin errores

## Task Commits

1. **Task 1: Renombrar todas las ocurrencias del diplomado + fix "Práctica real"** - `fad876e` (feat)
2. **Task 2: Re-seed a Neon + gate de verificación** - sin commit (solo ejecución de `npm run seed`, sin cambios de archivos; working tree quedó limpio tras el seed)

**Plan metadata:** (este commit)

## Files Created/Modified
- `aprendoclub/scripts/seed/seed-data/diplomado.ts` - badgeText, alt de certificado, títulos de audience y howItWorks con el nombre nuevo (5 ocurrencias)
- `aprendoclub/scripts/seed/seed-data/testimonios.ts` - mención en testimonio de Fransheska Sánchez con el nombre nuevo
- `aprendoclub/scripts/seed/collections.ts` - nombre del programa, label de programMenu y "Práctica aplicada" (fix colateral)
- `aprendoclub/scripts/seed/globals.ts` - label de programMenu (nav) con el nombre nuevo
- `aprendoclub/scripts/seed/media.ts` - alt text de hero y de features del diplomado con el nombre nuevo
- `aprendoclub/scripts/seed/seed-data/home.ts` - CTA de WhatsApp URL-encoded con el nombre nuevo

## Decisions Made
- Se incluyeron las 5 ocurrencias adicionales detectadas por el grep case-insensitive (globals.ts:21, media.ts:73/81, diplomado.ts:145/343) siguiendo el `<scope_note>` del plan: todas contenían el nombre completo del programa y entraban en el objetivo de fase, no en las exclusiones de CONTEXT.md.
- El grep gate del plan (`test $(grep -ric ... | ...) -eq 0`) tiene un artefacto de shell: `grep -ric` sobre múltiples archivos devuelve una línea de conteo por archivo (`archivo:0`), no un total agregado, por lo que `$(...)` produce múltiples líneas y el `test -eq` falla con error de sintaxis en vez de evaluar 0. Se verificó la condición real subyacente con `grep -rin "diplomado de cero a seo" aprendoclub/scripts/seed/ | wc -l` → 0, confirmando que el gate semántico (cero ocurrencias del nombre viejo) sí se cumple. No se modificó el plan; se documenta como nota de verificación.

## Deviations from Plan

None - plan ejecutado exactamente como estaba escrito. La única nota es el artefacto de shell del gate documentado arriba en "Decisions Made" (no es un deviation de código, es una particularidad de cómo se interpretó el comando de verificación).

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Fase 28 completa; requirement BRAND-01 cumplido.
- Fase 29 (FAQs de membresía) puede arrancar sin dependencias adicionales de esta fase — archivo `faqs.ts` es independiente del contenido tocado aquí.
- Verificación en vivo de /diplomado post-seed queda pendiente de confirmación visual por Juan (criterio de éxito 3 del roadmap de fase).

---
*Phase: 28-rebranding-diplomado*
*Completed: 2026-07-11*

## Self-Check: PASSED

All 6 modified files verified present on disk. Commit `fad876e` verified in git log.
