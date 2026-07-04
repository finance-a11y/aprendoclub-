---
phase: 02-qui-nes-somos
plan: 01
subsystem: quienes-somos
tags: [content-layer, sections, data-driven]
requires: [content/site.ts, components/instructor-section.tsx, app/globals.css]
provides:
  - content/quienes-somos.ts
  - components/quienes-somos/hero.tsx
  - components/quienes-somos/historia.tsx
  - components/quienes-somos/fundadora.tsx
  - components/quienes-somos/equipo.tsx
affects: []
tech-stack:
  added: []
  patterns: [data-driven-content, framer-motion-useInView, reduced-motion]
key-files:
  created:
    - content/quienes-somos.ts
    - components/quienes-somos/hero.tsx
    - components/quienes-somos/historia.tsx
    - components/quienes-somos/fundadora.tsx
    - components/quienes-somos/equipo.tsx
  modified: []
decisions:
  - "Toda la copia se centraliza en content/quienes-somos.ts (contrato completo de la fase, incluidos metodologia/stats/ctaFinal que consume el Plan 02)"
  - "Fallback de avatar del equipo con onError → círculo de iniciales, sin inventar caras"
metrics:
  duration: ~10min
  completed: 2026-07-03
---

# Phase 2 Plan 01: Capa de contenido y secciones narrativas Summary

Capa de contenido data-driven (`content/quienes-somos.ts`) con toda la copia VERBATIM de 02-CONTENT-SOURCE.md en objetos tipados Payload-ready, más las cuatro secciones narrativas (Hero, Historia con quote de Arianna, Fundadora estilo InstructorSection y grid de Equipo de 5) construidas con el design system del home.

## What Was Built

- **content/quienes-somos.ts**: interfaces `HeroContent`, `HistoriaContent`, `Quote`, `FundadoraContent`, `TeamMember`, `MetodologiaContent`, `Pilar`, `StatItem`, `CtaContent`; exports `hero`, `historia`, `fundadora`, `equipo` (5), `metodologia` (4 pilares EPAM), `stats` (3), `ctaFinal`. Copia carácter por carácter desde la fuente.
- **hero.tsx** (`QuienesSomosHero`): hero centrado sobre bg-primary con padding que despeja el navbar fijo.
- **historia.tsx** (`HistoriaSection`): 3 párrafos + blockquote con borde accent y atribución a Arianna Lupi.
- **fundadora.tsx** (`FundadoraSection`): layout de dos columnas (foto enmarcada + bio) replicando InstructorSection.
- **equipo.tsx** (`EquipoSection`): grid de 5 cards con avatar (foto o iniciales de fallback vía onError).

Todos los componentes consumen el content layer, no tienen copy inline y respetan `useReducedMotion`.

## Deviations from Plan

None - plan executed exactly as written.

## Threat Flags

None found.

## Self-Check: PASSED

- content/quienes-somos.ts: FOUND
- components/quienes-somos/hero.tsx: FOUND
- components/quienes-somos/historia.tsx: FOUND
- components/quienes-somos/fundadora.tsx: FOUND
- components/quienes-somos/equipo.tsx: FOUND
- Commits e6554fc, ee5443f, e136294: FOUND
- npx tsc --noEmit: PASSED
