---
phase: 26-copy-general-home
plan: 02
subsystem: content
tags: [copy, seed-data, payload, diplomado]

# Dependency graph
requires: []
provides:
  - "diplomado.ts sin 'real'/'reales' en copy visible (12 reescrituras)"
  - "claim de posicionamiento de diplomado.ts de-enfatiza SEO a favor de marketing con IA"
affects: [26-04-verificacion-global, 28-rebranding-diplomado]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Reescritura caso por caso (no find-replace ciego): contexto practico corta el adjetivo, abstracto/tangible se reformula con termino especifico"

key-files:
  created: []
  modified:
    - aprendoclub/scripts/seed/seed-data/diplomado.ts

key-decisions:
  - "hero.subtitulo: 'practicas reales' -> 'practicas guiadas' (contexto practico)"
  - "origin.titulo: 'Una necesidad real' -> 'Una necesidad concreta del mercado' (abstracto)"
  - "audience.perfiles: 'visibilidad real en buscadores' -> 'visibilidad en buscadores' (tangible, corta adjetivo redundante)"
  - "audience.notaFinal: 'ingresos reales' -> 'ingresos adicionales' (tangible, especifico)"
  - "methodology 'Practica aplicada': 'proyecto real' -> 'proyecto de cliente'"
  - "curriculum semana 2: 'proyecto SEO real' -> 'proyecto SEO' (SEO se mantiene, es termino tecnico del modulo)"
  - "curriculum semana 15: 'oportunidades reales' -> 'oportunidades laborales'"
  - "howItWorks 'Aprendizaje estructurado': 'proyectos reales' -> 'proyectos' (corta adjetivo)"
  - "howItWorks item folder-open: 'Proyecto real para tu portafolio' -> 'Proyecto para tu portafolio'"
  - "pricing.features: 'Proyectos aplicados reales' -> 'Proyectos aplicados'"
  - "ctaFinal.texto: 'resultados reales' -> 'resultados medibles'"
  - "origin.tarjetas (icon users): 'primera academia especializada en SEO' -> 'primera academia especializada en marketing con IA', replicando el criterio de quienes-somos.ts:79; cifra '750' intacta"

patterns-established:
  - "De-enfasis de SEO se aplica solo a claims de posicionamiento de marca ('academia especializada en SEO'), no a terminos tecnicos de contenido de modulos ('proyecto SEO', 'modulo SEO', 'herramientas SEO')"

requirements-completed: [COPY-01, COPY-02]

# Metrics
duration: ~20min
completed: 2026-07-11
---

# Phase 26 Plan 02: Diplomado copy rewrite Summary

**12 reescrituras de "real"/"reales" en diplomado.ts (hero, galeria, origin, audience, methodology, curriculum, howItWorks, pricing, ctaFinal) mas de-enfasis de la claim "academia especializada en SEO" a "academia especializada en marketing con IA"**

## Performance

- **Duration:** ~20 min
- **Tasks:** 3
- **Files modified:** 1

## Accomplishments
- Las 12 ocurrencias de "real"/"reales" listadas en el plan quedan reescritas siguiendo el criterio caso por caso (practico: corta el adjetivo; abstracto/tangible: reformula con termino especifico)
- La claim de posicionamiento de marca de diplomado.ts ("primera academia especializada en SEO") se de-enfatiza igual que quienes-somos.ts:79, sin tocar la cifra "750"
- Rutas de imagen `/diplomado/real/*.avif` (7 ocurrencias) y comentarios de codigo con "real"/"reales" quedan intactos

## Task Commits

Each task was committed atomically:

1. **Task 1: Reescribir "real"/"reales" en la primera mitad de diplomado.ts** - `aa53469` (feat)
2. **Task 2: Reescribir "real"/"reales" en la segunda mitad de diplomado.ts** - `29b0805` (feat)
3. **Task 3: De-enfasis SEO en la claim de posicionamiento de diplomado.ts** - `6540c2a` (feat)

_Nota: las 3 tareas modifican el mismo archivo; cada commit incluye solo los hunks correspondientes a su tarea (aplicados via patch selectivo sobre el mismo `diplomado.ts`)._

## Files Created/Modified
- `aprendoclub/scripts/seed/seed-data/diplomado.ts` - 12 reescrituras de "real"/"reales" + 1 de-enfasis de claim de posicionamiento SEO

## Decisions Made
- Ver `key-decisions` en el frontmatter para el detalle linea por linea de cada reescritura y su criterio (practico/abstracto/tangible)
- Se mantuvieron los terminos tecnicos "SEO" dentro del contenido de modulos del curriculum (ej. "proyecto SEO", "herramientas SEO") ya que no son claims de posicionamiento de marca, siguiendo el criterio explicito del plan

## Deviations from Plan

None - plan executed exactly as written. Las 12 lineas y la claim de posicionamiento coinciden con las referencias del plan (con desplazamientos menores de numero de linea esperables, ya documentados como "sujetas a cambiar" en el CONTEXT).

## Issues Encountered

Los tres tasks del plan modifican el mismo archivo, lo que impedia usar `git add <archivo>` completo por task sin mezclar cambios de tasks posteriores (los edits se aplicaron secuencialmente sobre el mismo working tree). Se resolvio generando patches por hunk (`git diff` + split por bloques `@@`) y aplicandolos al *index* con `git apply --cached -p1` task por task, permitiendo comitear cada task de forma atomica sin tocar el working tree ya editado.

## User Setup Required

None - no external service configuration required. Los cambios requieren correr el script de seed (o editar via /admin) para reflejarse en la DB; eso se hace en 26-04 (gate de verificacion global + re-seed).

## Next Phase Readiness
- diplomado.ts queda listo para el gate de verificacion global de 26-04 y para el re-seed a la DB
- Phase 28 (rebranding del diplomado) volvera a tocar este mismo archivo para BRAND-01 (nombre "Diplomado de SEO + AIO"); sin conflicto de merge con los cambios de este plan (lineas distintas)
- Sin blockers

---
*Phase: 26-copy-general-home*
*Completed: 2026-07-11*
