---
phase: 26-copy-general-home
plan: 01
subsystem: content/seed-data
tags: [copy, home, seo-deemphasis, humanizer]
dependency-graph:
  requires: []
  provides:
    - "home.ts hero copy sin 'real'/'reales', SEO de-enfatizado, cifra +10.000"
  affects:
    - "aprendoclub/scripts/seed/pages.ts buildHome() (consume hero.badgeText/subtitulo/ratingTexto sin cambios de código)"
tech-stack:
  added: []
  patterns:
    - "Reescritura de copy caso por caso (no find-replace ciego), pasada por criterios humanizer"
key-files:
  created: []
  modified:
    - aprendoclub/scripts/seed/seed-data/home.ts
decisions:
  - "Se reescribió también 'especialización real' (línea ~89, problema-section) aunque el Task 1 del plan solo listaba explícitamente las líneas ~122 y ~286: el regex de verificación del propio plan (reales?\\b) tiene un bug que no matchea 'real' singular, pero el criterio de CONTEXT.md ('una carrera real'/'especialización real' -> reformular sin adjetivo) cubre este caso explícitamente y el acceptance criteria real ('ya no contiene la palabra real/reales') lo exige."
  - "subtitulo del hero: se cambió la preposición antes de 'plataforma' de 'con' a 'en' para evitar la repetición 'marketing con IA con la plataforma' que resultaba del wording literal sugerido en CONTEXT.md. Se mantiene el texto 'marketing con IA' tal como decidió Juan."
metrics:
  duration: "~15 min"
  completed: 2026-07-11
---

# Phase 26 Plan 01: Copy general + Home — Home hero y de-énfasis de SEO Summary

Reescritura del copy de `home.ts`: se eliminó "real"/"reales" del copy visible, se de-enfatizó "SEO" en el badge y subtítulo del hero a favor de "marketing con IA", y se actualizó la cifra de estudiantes de "+500" a "+10.000" en badge y ratingTexto, con separador de miles de punto.

## What Was Built

### Task 1 — Eliminar "real"/"reales" del copy visible
- `problema` (línea ~89): "una especialización real" -> "una especialización clara"
- `beneficios` (línea ~122): "con casos reales" -> "con casos de estudiantes actuales"
- `asesoriaWidget.bullets` (línea ~286): "Proyectos reales para armar tu portafolio" -> "Proyectos para armar tu portafolio"

Commit: `74224e1` — `fix(26-01): eliminar "real"/"reales" del copy visible del home`

### Task 2 — De-enfatizar SEO y actualizar cifra en el hero
- `hero.badgeText`: "+500 estudiantes ya aprenden SEO con IA" -> "+10.000 estudiantes ya se unieron"
- `hero.subtitulo`: "Especialízate en SEO con la plataforma educativa..." -> "Especialízate en marketing con IA en la plataforma educativa..." (alineado con `tituloAccent` = "marketing e IA")
- `hero.ratingTexto`: "4.9/5 de +500 estudiantes" -> "4.9/5 de +10.000 estudiantes"

Commit: `8f9b912` — `feat(26-01): de-enfatizar SEO y actualizar cifra a +10.000 en el hero`

## Verification

```
grep -niE "\breal(es)?\b" scripts/seed/seed-data/home.ts   -> 0 coincidencias en copy
grep -c "+500 estudiantes" scripts/seed/seed-data/home.ts  -> 0
grep -c "aprenden SEO" scripts/seed/seed-data/home.ts      -> 0
grep -c "10.000" scripts/seed/seed-data/home.ts            -> 2 (badge + ratingTexto)
grep -n "academia de SEO|acompañamiento real" home.ts      -> 0 coincidencias
```

Todos los criterios del plan (incluida la verificación automatizada de cada task) pasan. El archivo mantiene su forma tipada (interfaces `HomeHero`, `FeatureGridSection`, `AsesoriaWidgetSection` sin cambios estructurales).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Se corrigió también "especialización real" (línea ~89), fuera del alcance explícito del Task 1**
- **Found during:** Task 1
- **Issue:** El Task 1 del plan solo lista las líneas ~122 y ~286 como las "dos líneas" a reescribir, pero CONTEXT.md documenta 3 ocurrencias de "real"/"reales" en `home.ts` (líneas 89, 122, 286). El script de verificación del propio plan (`grep -niE "reales?\b"`) tiene un bug de regex: `reales?` matchea literalmente "reale" u "reales", nunca "real" singular solo, por lo que la línea 89 ("especialización real.") no aparecía en su propio grep de verificación pese a violar el acceptance criteria real ("ya no contiene la palabra 'real'/'reales'").
- **Fix:** Se reescribió "pero no tienes una especialización real" -> "pero no tienes una especialización clara", siguiendo el criterio de CONTEXT.md para frases abstractas ("una carrera real"/"especialización real" -> reformular sin el adjetivo).
- **Files modified:** `aprendoclub/scripts/seed/seed-data/home.ts`
- **Commit:** `74224e1`

**2. [Rule 1 - Bug] Ajuste de preposición en subtitulo para evitar repetición "con...con"**
- **Found during:** Task 2
- **Issue:** El wording literal sugerido en CONTEXT.md/PLAN ("Especialízate en marketing con IA con la plataforma...") produce una repetición gramatical incómoda de "con".
- **Fix:** Se cambió la preposición antes de "plataforma" de "con" a "en": "Especialízate en marketing con IA en la plataforma educativa...". Se preservó el texto "marketing con IA" tal como está confirmado en las decisions de CONTEXT.md.
- **Files modified:** `aprendoclub/scripts/seed/seed-data/home.ts`
- **Commit:** `8f9b912`

No hubo auth gates ni checkpoints en este plan (autonomous: true, sin tasks de tipo checkpoint).

## Known Stubs

Ninguno. Todos los campos editados son strings finales, sin placeholders ni datos pendientes.

## Threat Flags

Ninguno. Cambios limitados a strings de copy en un archivo de seed data existente; no se introduce superficie de red, auth ni schema nuevos.

## Self-Check

- FOUND: aprendoclub/scripts/seed/seed-data/home.ts (existe, editado)
- FOUND commit 74224e1
- FOUND commit 8f9b912

## Self-Check: PASSED
