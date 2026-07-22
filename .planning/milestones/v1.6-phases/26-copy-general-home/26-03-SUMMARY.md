---
phase: 26-copy-general-home
plan: 03
subsystem: copy
tags: [payload-cms, seed-data, content, copywriting]

# Dependency graph
requires: []
provides:
  - "quienes-somos.ts titulo/subtitulo/quote/pilar sin 'academia de SEO' ni 'reales'"
  - "faqs.ts, testimonios.ts, reto.ts sin ocurrencias de 'reales' en copy visible"
  - "globals.ts (footerMeta.blurb, orgDescription, footerMeta.mobilePanelBlurb) de-enfatizan SEO a favor de marketing con IA"
affects: [27-equipo-testimonios, 29-faqs-membresia]

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created: []
  modified:
    - aprendoclub/scripts/seed/seed-data/quienes-somos.ts
    - aprendoclub/scripts/seed/seed-data/faqs.ts
    - aprendoclub/scripts/seed/seed-data/testimonios.ts
    - aprendoclub/scripts/seed/seed-data/reto.ts
    - aprendoclub/scripts/seed/globals.ts

key-decisions:
  - "copyrightRight ('Hecho con 💚 para la comunidad SEO') se conserva sin cambios: es mencion de comunidad/dominio, no tagline de posicionamiento de marca, segun el criterio de discriminacion del plan"
  - "Linea 95 de quienes-somos.ts ('una carrera real') se reescribio aunque el Task 1 <action> solo listaba explicitamente las lineas 79/81/166 -- el <verify> automatizado del propio task exige 0 ocurrencias de 'real'/'reales' en todo el archivo, y CONTEXT.md ya listaba la linea 95 entre las 21 ocurrencias a reescribir"

patterns-established: []

requirements-completed: [COPY-01, COPY-02]

# Metrics
duration: 15min
completed: 2026-07-11
---

# Phase 26 Plan 03: Copy disperso + globals Summary

**Barrido de "real"/"reales" en quienes-somos, faqs, testimonios y reto, y de-enfasis de "SEO" en el titulo de quienes-somos y en los taglines de marca de globals.ts (meta description, blurb, mobilePanelBlurb)**

## Performance

- **Duration:** ~15 min
- **Tasks:** 4 completadas
- **Files modified:** 5

## Accomplishments
- Titulo de quienes-somos de-enfatiza "SEO" a favor de "marketing con IA"; subtitulo, quote de Historia y pilar "Practica aplicada" ya no usan "real"/"reales"
- faqs.ts, testimonios.ts y reto.ts sin "real"/"reales" en copy visible al usuario (comentarios JSDoc tecnicos de testimonios.ts intactos)
- Meta description global (blurb y orgDescription/JSON-LD) de-enfatiza SEO a favor de "marketing con IA"
- mobilePanelBlurb del footer de-enfatiza SEO; copyrightRight se conserva por ser mencion de comunidad, no tagline de posicionamiento

## Task Commits

1. **Task 1: quienes-somos.ts — titulo SEO + "reales"** - `3c0c786` (feat)
2. **Task 2: faqs.ts, testimonios.ts, reto.ts — barrido de "reales"** - `1aa30f7` (feat)
3. **Task 3: globals.ts — meta description de-enfatiza SEO** - `c4d450e` (feat)
4. **Task 4: globals.ts — mobilePanelBlurb + copyrightRight** - `bb48761` (feat)

## Files Created/Modified
- `aprendoclub/scripts/seed/seed-data/quienes-somos.ts` - titulo hero, subtitulo hero, quote de Historia, pilar "Practica aplicada"
- `aprendoclub/scripts/seed/seed-data/faqs.ts` - respuesta de la FAQ de diferenciacion (linea 41)
- `aprendoclub/scripts/seed/seed-data/testimonios.ts` - titulo hero de /testimonios
- `aprendoclub/scripts/seed/seed-data/reto.ts` - intro de ganadores
- `aprendoclub/scripts/seed/globals.ts` - footerMeta.blurb, orgDescription (JSON-LD), footerMeta.mobilePanelBlurb

## Decisions Made
- **copyrightRight conservado:** "Hecho con 💚 para la comunidad SEO" no se toco. Segun el criterio de discriminacion del plan, "comunidad SEO" es mencion de dominio/comunidad, no tagline de posicionamiento de marca (a diferencia de blurb y mobilePanelBlurb, que si posicionan explicitamente la marca como "Academia/Membresia ... SEO"). Se conserva el emoji 💚.
- **Linea 95 de quienes-somos.ts incluida en el barrido:** el Task 1 solo listaba explicitamente las lineas 79/81/166 en su bloque `<action>`, pero el `<verify>` automatizado del mismo task exige 0 ocurrencias de "real"/"reales" en todo el archivo (sin excepciones), y CONTEXT.md ya habia identificado la linea 95 ("una carrera real" en la quote de Arianna) entre las 21 ocurrencias a reescribir. Se reformulo a "una carrera solida" para pasar la verificacion automatizada sin apartarse del criterio de reescritura del plan (abstracto/aspiracional -> reformular sin el adjetivo).
- Wording de cada reescritura de "real"/"reales" siguio el criterio del plan (practico -> cortar el adjetivo; abstracto -> reformular; tangible -> reemplazo especifico), pasado por una revision mental con la skill humanizer (sin muletillas de IA, sin guiones largos, frases variadas).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Linea 95 de quienes-somos.ts ("carrera real") no estaba en el `<action>` explicito del Task 1 pero rompia su propio `<verify>`**
- **Found during:** Task 1
- **Issue:** El `<action>` del Task 1 solo detalla las lineas 79/81/166, pero el `<verify>` automatizado exige 0 ocurrencias de "real"/"reales" en TODO el archivo. La linea 95 ("construyas una carrera real con él") ya estaba identificada en CONTEXT.md como una de las 21 ocurrencias a reescribir.
- **Fix:** Se reescribio "una carrera real" -> "una carrera solida", siguiendo el criterio de CONTEXT.md para frases abstractas/aspiracionales.
- **Files modified:** aprendoclub/scripts/seed/seed-data/quienes-somos.ts
- **Verification:** `grep -niE "reales?\b" quienes-somos.ts` (excluyendo comentarios) devuelve 0.
- **Committed in:** `3c0c786` (Task 1 commit)

**2. [Verificacion, no fix de codigo] El `grep -vE ':\s*(//|\*)'` del plan no excluye comentarios JSDoc `/** ... */`**
- **Found during:** Task 2
- **Issue:** El script de `<verify>` del Task 2 usa `grep -vE ':\s*(//|\*)'` para excluir comentarios, pero ese patron no matchea lineas que empiezan con `/**` (JSDoc), solo `//` o `*` sueltos. Las lineas 24 y 280 de testimonios.ts ("Dimensiones intrinsecas reales del asset", "Alturas reales (px) de cada asset") son comentarios tecnicos que el propio plan indica dejar intactos, pero el grep automatizado las cuenta como falsos positivos.
- **Fix:** No se modifico ningun codigo; se verifico manualmente con `grep -v '/\*\*'` que las unicas coincidencias remanentes de "reales" en los tres archivos son esos dos comentarios JSDoc, tal como exige el plan explicitamente en su `<acceptance_criteria>`.
- **Files modified:** ninguno (verificacion manual adicional, sin cambio de codigo)
- **Verification:** `grep -niE "reales?\b" faqs.ts testimonios.ts reto.ts | grep -v '/\*\*'` devuelve vacio.
- **Committed in:** N/A (no aplica cambio de codigo)

---

**Total deviations:** 2 (1 auto-fix de contenido bajo Rule 1, 1 nota de verificacion manual sin cambio de codigo)
**Impact on plan:** Ambas desviaciones son necesarias para cumplir el `<acceptance_criteria>` explicito del plan ("0 ocurrencias de real/reales en copy, comentarios intactos"). Sin scope creep: no se toco ninguna linea fuera de las asignadas a esta fase (team grid, cifra 2.000, resto de faqs.ts y testimonios.ts quedan para Phase 27/29).

## Issues Encountered
None mas alla de lo documentado en Deviations.

## User Setup Required
None - no external service configuration required. Los cambios son de seed-data; para reflejarse en la DB en vivo se requiere correr el script de seed o editar via /admin (fuera de alcance de este plan, cubierto por 26-04-PLAN.md).

## Next Phase Readiness
- quienes-somos.ts queda con titulo/subtitulo/quote/pilar de-enfatizando SEO y sin "reales"; Phase 27 puede tocar el resto del archivo (team grid, cifra de estudiantes) sin conflicto, siempre que no revierta estas lineas.
- testimonios.ts titulo hero listo; Phase 27 puede seguir con el resto del archivo (logos de empresas confiadas) sin conflicto.
- faqs.ts linea 41 lista; Phase 29 puede reescribir el resto del archivo para el modelo de membresia sin conflicto.
- globals.ts completo para COPY-02 (meta description + taglines de footerMeta); no queda pendiente ninguna mencion de "Academia de SEO" ni "profesional SEO" en el archivo.
- Sin blockers.

---
*Phase: 26-copy-general-home*
*Completed: 2026-07-11*
