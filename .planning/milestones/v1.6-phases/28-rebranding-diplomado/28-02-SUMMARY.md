---
phase: 28-rebranding-diplomado
plan: 02
subsystem: content-seed
tags: [payload-cms, seed, postgres, neon, media, gap-closure]

# Dependency graph
requires:
  - phase: 28-rebranding-diplomado (28-01)
    provides: Renombrado inicial de "Diplomado de Cero a SEO" a "Diplomado de SEO + AIO" en scripts/seed/
provides:
  - "Diplomado.ts sin ninguna variante del nombre viejo (con o sin la palabra 'de'), incluido el bullet de pricing"
  - "seedMedia() con reconciliación general (diff-and-update) de campos en documentos de media preexistentes"
  - "Script verify-media-alt.ts para auditar media.alt en Neon vía SQL directa (payload.db.pool)"
  - "Descubrimiento y cierre de un doc de media huérfano (diplomado-hero.avif) que quedaba fuera del pipeline de seed"
affects: [futuras fases que editen alt text de media ya subida a Neon]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "seedMedia(): diff-and-update de campos seedeados en la rama de documento existente (no solo create-if-missing)"
    - "Verificación de DB en vivo vía payload.db.pool.query directa (no logs del seed) para gap closures"

key-files:
  created:
    - aprendoclub/scripts/verify-media-alt.ts
  modified:
    - aprendoclub/scripts/seed/seed-data/diplomado.ts
    - aprendoclub/scripts/seed/media.ts

key-decisions:
  - "Se agregó explícitamente el path '/diplomado/real/diplomado-hero.avif' a collectMediaAssets() porque el campo hero.imagen ya no está seteado en diplomado.ts (el hero renderizado no usa imagen) y el add() existente era un no-op; el Media doc (id 118) seguía huérfano en Neon con el alt viejo sin que ningún mecanismo lo tocara"
  - "Se confirmó por query directa a pages_rels que media id 118 no está referenciado en ningún bloque vivo (0 filas en toda la tabla) — el fix es higiene de datos en Neon, sin impacto de rendering"
  - "El fix de seedMedia() es general (diff-and-update de todos los campos que payload.create escribe), no un parche puntual, con comentario explícito para que campos futuros se sumen a la misma reconciliación"

requirements-completed: [BRAND-01]

duration: 25min
completed: 2026-07-11
---

# Phase 28 Plan 02: Gap closure — nombre del diplomado y reconciliación de media.alt en Neon Summary

**Cerró 2 gaps de verificación de Phase 28: una variante sin "de" del nombre viejo en el bullet de pricing, y un bug estructural en seedMedia() que nunca propagaba cambios de alt a documentos de media ya existentes en Neon (incluyendo un tercer doc huérfano descubierto durante la ejecución, no listado en el plan original).**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-07-11T08:15:00Z (aprox.)
- **Completed:** 2026-07-11T08:41:00Z
- **Tasks:** 3/3 completadas
- **Files modified:** 3 (2 modificados + 1 creado)

## Accomplishments
- `diplomado.ts:515` ya no contiene "Diplomado CERO A SEO completo" — dice "Diplomado de SEO + AIO completo"
- `seedMedia()` reconcilia el campo `alt` de documentos de media preexistentes vía `payload.update` cuando difiere del fuente, cerrando el bug estructural que afectaba a cualquier fase futura que editara alt de media ya subida
- Script `verify-media-alt.ts` creado para auditar `media.alt` en Neon vía SQL directa, evitando depender de logs del seed (precedente de Phase 27/28: el log podía decir "ya existe" mientras el dato quedaba stale)
- `npm run seed` corrió exitosamente contra Neon y propagó ambos fixes; el log mostró "alt actualizado" para los 3 assets del diplomado en la primera corrida post-fix
- Query SQL directa confirma 0 registros de `media` con el nombre viejo en `alt` en toda la tabla, y los 3 assets del diplomado (`diplomado-hero.avif`, `diplomado-certificado.avif`, `diplomado-modulos2.avif`) muestran el nombre nuevo

## Task Commits

Cada tarea se comiteó atómicamente:

1. **Task 1: Renombrar la variante sin "de" en el bullet de pricing** - `d1b3b5d` (fix)
2. **Task 2: Arreglar seedMedia() para reconciliar campos en documentos existentes** - `3d33e80` (fix)
3. **Task 3: Re-seed a Neon + verificación por SQL directa + grep gate final** - `9968310` (feat, incluye el fix del doc huérfano diplomado-hero.avif)

## Files Created/Modified
- `aprendoclub/scripts/seed/seed-data/diplomado.ts` - bullet de pricing corregido a "Diplomado de SEO + AIO completo"
- `aprendoclub/scripts/seed/media.ts` - `seedMedia()` reconcilia alt en documentos existentes vía diff-and-update; se agregó el path explícito de `diplomado-hero.avif` a `collectMediaAssets()`
- `aprendoclub/scripts/verify-media-alt.ts` - script nuevo de verificación de `media.alt` en Neon vía `payload.db.pool.query`

## Decisions Made
- El fix de `seedMedia()` se implementó como reconciliación general (diff-and-update de los campos que `payload.create` escribe), no como parche puntual — dejando comentario explícito para que campos futuros del `data` del create se sumen a la misma comparación.
- Se restauró el path de `diplomado-hero.avif` en `collectMediaAssets()` en vez de escribir un `payload.update` puntual fuera del pipeline de seed, manteniendo el patrón "la lista de assets se deriva de los módulos content/*.ts" del archivo.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Tercer doc de media huérfano (diplomado-hero.avif) no cubierto por el fix de Task 2**
- **Found during:** Task 3 (re-seed + verificación SQL)
- **Issue:** Tras el re-seed post Task 1/2, `verify-media-alt.ts` (Query 1, el gate) devolvió 1 fila con el nombre viejo: `diplomado-hero.avif` (media id 118), pese a que el fix de `seedMedia()` de Task 2 ya estaba aplicado. Investigación: el campo `hero.imagen` en `diplomado.ts` no está seteado (el bloque hero renderizado no usa imagen), por lo que la llamada `add(diplomadoHero.imagen, ...)` en `collectMediaAssets()` era un no-op — el asset nunca entraba al loop de `seedMedia()`, así que el `payload.find`/`payload.update` de Task 2 nunca se ejecutaba para ese filename. El archivo sigue presente en `public/diplomado/real/diplomado-hero.avif`, pero el Media doc en Neon quedó huérfano desde una fase anterior con el alt viejo. Se confirmó por query directa a `pages_rels` (`WHERE media_id = 118`) que este doc tiene 0 referencias en cualquier bloque vivo de cualquier página — no es contenido renderizado, es dato huérfano.
- **Fix:** Se agregó un `add('/diplomado/real/diplomado-hero.avif', 'Estudiante del Diplomado de SEO + AIO trabajando en su laptop')` explícito en `collectMediaAssets()`, con comentario documentando por qué (campo `hero.imagen` vacío pero el doc/archivo siguen existiendo). Esto hace que el asset entre al loop de `seedMedia()` y la reconciliación de Task 2 lo cubra igual que a los otros dos.
- **Files modified:** `aprendoclub/scripts/seed/media.ts`
- **Verification:** Re-corrido `npm run seed` → log mostró `alt actualizado: diplomado-hero.avif -> 118`. Re-corrido `verify-media-alt.ts` → Query 1 (gate) devuelve 0 filas; Query 2 muestra los 3 assets con el nombre nuevo. `npx tsc --noEmit` sin errores.
- **Committed in:** `9968310` (parte del commit de Task 3)

---

**Total deviations:** 1 auto-fijada (Rule 1 - bug de origen de datos, no del código de reconciliación en sí)
**Impact on plan:** Necesaria para cumplir el must-have explícito del plan ("los 3 registros de media del diplomado en Neon... ya no contienen el nombre viejo en alt"). Sin este fix adicional, Task 3 no habría podido pasar su propio gate (`verify-media-alt.ts` exit code 0). Sin scope creep: el fix vive en el mismo archivo y mecanismo que Task 2 ya tocaba, y no cambia el comportamiento para ningún otro asset.

## Issues Encountered
Ninguno más allá de la deviation documentada arriba. El script auxiliar de inspección (`scripts/inspect-diplomado-hero.ts`) usado para diagnosticar el gap se creó y se borró antes de comitear — no forma parte del entregable del plan.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 28 (Rebranding del diplomado) cierra completamente: 2/2 plans, BRAND-01 cumple "en todas las páginas y datos donde aparece", incluida la base de datos en vivo (Neon), confirmado por SQL directa.
- Ningún blocker para Phase 29.

---
*Phase: 28-rebranding-diplomado*
*Completed: 2026-07-11*

## Self-Check: PASSED

- FOUND: aprendoclub/scripts/seed/seed-data/diplomado.ts
- FOUND: aprendoclub/scripts/seed/media.ts
- FOUND: aprendoclub/scripts/verify-media-alt.ts
- FOUND: .planning/phases/28-rebranding-diplomado/28-02-SUMMARY.md
- FOUND: commit d1b3b5d (Task 1)
- FOUND: commit 3d33e80 (Task 2)
- FOUND: commit 9968310 (Task 3)
