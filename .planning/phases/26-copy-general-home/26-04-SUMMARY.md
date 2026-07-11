---
phase: 26-copy-general-home
plan: 04
subsystem: seed-data/db
tags: [copy, gate, seed, verification]
dependency-graph:
  requires:
    - "26-01, 26-02, 26-03 (reescritura de copy en home.ts/diplomado.ts/quienes-somos.ts/faqs.ts/testimonios.ts/reto.ts/globals.ts)"
  provides:
    - "Gate de verificación global (real/reales + de-énfasis SEO por patrón genérico) pasado sin residuos sin documentar"
    - "DB Postgres/Neon actualizada con el copy definitivo de Phase 26 vía npm run seed"
  affects:
    - "Sitio en vivo (todas las páginas servidas desde Payload leen ahora el copy nuevo tras el seed)"
tech-stack:
  added: []
  patterns:
    - "Gate de verificación por regex genérico (no lista cerrada de strings) sobre todo scripts/seed/, con criterio de exclusión documentado para menciones de rol/dominio"
key-files:
  created: []
  modified: []
decisions:
  - "quienes-somos.ts:81 ('Formamos especialistas en SEO e IA que no se quedan en la teoría...') se documenta como excepción del gate de posicionamiento SEO: es una descripción de rol/dominio de especialización de los egresados, no un tagline de marca (a diferencia de 'Academia de SEO e IA', que sí fue reescrito en Phase 26-03). Confirmado leyendo la línea en contexto junto al título de la misma sección (línea 79), que ya dice 'La primera academia de marketing con IA...'."
  - "Los 3 matches de 'reales' encontrados por el grep del gate (testimonios.ts:24, testimonios.ts:280, diplomado.ts:64) son comentarios JSDoc ('/** ... */') documentando dimensiones/alturas intrínsecas de assets — no son copy visible al usuario. El script de verificación del plan solo excluye líneas que empiezan con '//' o '*' tras los dos puntos, y no reconoce '/**' como comentario, por lo que estos 3 matches aparecen en el grep crudo pero caen bajo la exclusión explícita de CONTEXT.md ('Comentarios de código que dicen real/reales... NO tocar')."
metrics:
  duration: "~10 min"
  completed: 2026-07-11
---

# Phase 26 Plan 04: Copy general + Home — Gate global + Seed Summary

Verificación global de que el barrido de "real"/"reales" y el de-énfasis de "SEO" quedaron completos en todos los archivos de `scripts/seed/seed-data/*.ts` + `scripts/seed/globals.ts`, con dos excepciones documentadas (comentarios de código y una mención de dominio/rol legítima), seguida de `npm run seed` exitoso que propagó el copy nuevo a Postgres/Neon.

## What Was Built

### Task 1 — Gate de verificación global (real + posicionamiento SEO genérico)

Se corrió el gate en tres partes sobre `scripts/seed/seed-data/` + `scripts/seed/globals.ts`:

1. **"real"/"reales" en copy visible:** el grep crudo devolvió 3 líneas, las tres comentarios JSDoc (`/** ... */`) documentando specs técnicas de imágenes (dimensiones/alturas intrínsecas para `next/image`), no copy de usuario:
   - `testimonios.ts:24` — `/** Dimensiones intrínsecas reales del asset (para next/image, evita CLS). */`
   - `testimonios.ts:280` — `/** Alturas reales (px) de cada asset t1..t9... */`
   - `diplomado.ts:64` — `/** Galería del Diplomado (IMG-01, Phase 24; assets reales desde 24-02). */`
   Excluidos por criterio explícito de CONTEXT.md ("Comentarios de código que dicen 'real'/'reales'... NO tocar — no son copy visible al usuario"). **0 residuos reales de copy visible.**

2. **Posicionamiento SEO (patrón genérico, no lista cerrada):** el grep devolvió 1 match:
   - `quienes-somos.ts:81` — `"Formamos especialistas en SEO e IA que no se quedan en la teoría. Aprenden haciendo, con proyectos y acompañamiento de cerca."`
   Se leyó en contexto (líneas 76-82): es el `subtitulo` del hero, inmediatamente después del `titulo` (línea 79) que ya dice "La primera academia de marketing con IA pensada para el mundo hispano" (reescrito en Phase 26-03/anterior). "Especialistas en SEO e IA" describe el dominio de especialización que forman los egresados — equivalente semántico a "Consultora SEO"/"Analista SEO" (menciones de rol/dominio explícitamente excluidas del gate por CONTEXT.md), no un tagline de posicionamiento de marca. Se documenta como **excepción, no se reescribe**.

3. **Cifra de home:** `grep -c "10.000" home.ts` = 2 (badge + ratingTexto); `grep -Fc "+500 estudiantes" home.ts` = 0. **Pasa.**

Gate cerrado: 0 residuos de copy sin resolver; las 4 apariciones de "real"/"reales"/"SEO" encontradas por los greps crudos están todas documentadas como excepciones legítimas (comentarios de código o mención de rol/dominio).

No hubo cambios de archivo en este task (solo lectura/verificación).

### Task 2 — Seed contra Postgres/Neon

- Confirmado `package.json`: `"seed": "payload run scripts/seed.ts"`.
- `.env.local` presente en `aprendoclub/` con `DATABASE_URI`, `BLOB_READ_WRITE_TOKEN`, `PAYLOAD_SECRET` configurados (no se inspeccionaron valores, solo se confirmó su existencia).
- Se corrió `npm run seed` desde `aprendoclub/`. Salida completa en log:
  - `[seed:media] total en manifest: 69/69`
  - `[seed:collections] testimonios: 24 (3 featuredOnHome)`, `clientes-trabajados: 4`, `programas: 3`, `team-members: 6`, `faq: 16`
  - `[seed:globals] site-settings OK`
  - `[seed:pages] home: 10 bloques`, `quienes-somos: 7 bloques`, `testimonios: 6 bloques`, `programas: 4 bloques`, `diplomado: 13 bloques`, `reto: 12 bloques`, `programas/taller-seo-con-ia: 4 bloques`
  - `[seed] Completado sin errores.`
- Verificación post-seed adicional: `grep -n "Academia de" scripts/seed/globals.ts` confirma las meta descriptions ya dicen "Academia de marketing con IA..." (líneas 65 y 133), consistente con el de-énfasis SEO de Phase 26.
- Seed idempotente (upsert), no duplicó datos existentes.

No hubo cambios de archivo (ejecución de script contra la DB, sin tocar código fuente).

## Verification

```
Gate "real"/"reales": 3 matches crudos, los 3 comentarios JSDoc -> 0 residuos de copy visible
Gate posicionamiento SEO: 1 match crudo (quienes-somos.ts:81) -> excepción de dominio/rol documentada, 0 residuos sin resolver
home.ts "10.000": 2 ocurrencias (>= 2 requerido)
home.ts "+500 estudiantes": 0 ocurrencias
npm run seed: código 0, pasos Media/Colecciones/Globals/Pages completados sin error
```

## Deviations from Plan

Ninguna deviation de código — el plan es de verificación y ejecución de seed, sin tareas de escritura. Las dos excepciones documentadas arriba (comentarios JSDoc, mención de dominio/rol en quienes-somos.ts:81) están explícitamente contempladas por el propio `<criterio_gate_seo>` del plan como resultado esperado del gate ("cada match es residuo a corregir... o mención de dominio/rol legítima que se documenta como excepción"), no como bugs a corregir.

### Auto-fixed Issues

Ninguno.

## Known Stubs

Ninguno.

## Threat Flags

Ninguno. Este plan no modifica código ni schema; solo verifica copy existente y corre un seed idempotente ya usado en fases anteriores.

## Self-Check

- FOUND: `.env.local` en `aprendoclub/` con `DATABASE_URI` presente
- FOUND: log de seed en `/tmp/seed26.log` con línea final "Completado sin errores"
- FOUND: `scripts/seed/globals.ts` líneas 65/133 con "Academia de marketing con IA"
- FOUND: `scripts/seed/seed-data/quienes-somos.ts:79` con "La primera academia de marketing con IA pensada para el mundo hispano"

## Self-Check: PASSED
