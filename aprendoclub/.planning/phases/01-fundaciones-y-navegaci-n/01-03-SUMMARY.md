---
phase: 01-fundaciones-y-navegacion
plan: 03
subsystem: routing-shell
tags: [route-group, layout, placeholders, build]
requires: [01-02]
provides:
  - "app/(site)/layout.tsx shell compartido (skip-link + Navbar + main#main + Footer)"
  - "Home movido bajo el shell sin doble chrome"
  - "Placeholders /quienes-somos, /programas, /testimonios"
affects: []
tech-stack:
  added: []
  patterns: ["Next.js route group (site) para shell compartido"]
key-files:
  created:
    - "app/(site)/layout.tsx"
    - "app/(site)/quienes-somos/page.tsx"
    - "app/(site)/programas/page.tsx"
    - "app/(site)/testimonios/page.tsx"
  modified: []
  moved: ["app/page.tsx -> app/(site)/page.tsx"]
decisions:
  - "/diplomado y public/reto quedan fuera del route group (chrome propio)"
  - "StickyCTAMobile permanece en el home, no en el layout"
metrics:
  duration: ~5min
  completed: 2026-07-03
---

# Phase 1 Plan 03: Shell compartido (site) Summary

Crea el route group `(site)` con su `layout.tsx` (skip-link + Navbar + `<main id="main">` + Footer), mueve el home bajo el shell sin chrome inline y añade los placeholders de navegación. Build de producción verde.

## What Was Built

- **app/(site)/layout.tsx**: server component con skip-link (`href="#main"`), `<Navbar />`, `<main id="main" className="flex min-h-screen w-full flex-col">{children}</main>`, `<Footer />`. No duplica html/body ni metadata global (NAV-01).
- **app/(site)/page.tsx**: home movido con `git mv`; elimina Navbar/Footer/skip-link/main inline; conserva las secciones (con sus `id`) y `StickyCTAMobile`.
- **app/page.tsx**: eliminado (sin conflicto de ruta `/`).
- **Placeholders** quienes-somos, programas, testimonios: server components con metadata propia y copy neutro "Contenido próximamente", `pt-28` para respirar bajo el navbar fijo.

## Correctness Checks

- Home NO monta Navbar/Footer inline (viven en el layout): verificado por grep `! <Navbar` en page.tsx.
- `/diplomado` y `public/reto` intactos, fuera de `(site)`: no se tocaron.
- `npm run build` pasa; rutas presentes: `/`, `/diplomado`, `/links`, `/programas`, `/quienes-somos`, `/testimonios`, `/sitemap.xml`.

## Deviations from Plan

None - plan executed exactly as written.

## Commits

- 31b4743: feat(01-03): add (site) route group shell and move home under it
- 0ff5dcf: feat(01-03): add placeholder pages under (site) shell

## Self-Check: PASSED

- app/(site)/layout.tsx: FOUND (id="main")
- app/(site)/page.tsx: FOUND (no inline Navbar)
- app/page.tsx: removed
- 3 placeholder pages: FOUND
- npm run build: PASSED, all routes present
- Commits 31b4743, 0ff5dcf: FOUND
