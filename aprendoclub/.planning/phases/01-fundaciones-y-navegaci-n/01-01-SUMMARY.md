---
phase: 01-fundaciones-y-navegacion
plan: 01
subsystem: content-layer
tags: [nav, footer, sitemap, payload-ready]
requires: []
provides:
  - "content/site.ts (siteNav, siteCta, footerColumns, footerSocials, footerMeta + interfaces)"
  - "app/sitemap.ts extendido con rutas del sitio"
affects: [components/navbar.tsx, components/footer.tsx]
tech-stack:
  added: []
  patterns: ["capa content/ tipada Payload-ready separada de la presentación"]
key-files:
  created: [content/site.ts]
  modified: [app/sitemap.ts]
decisions:
  - "CTA Únete ahora apunta a /programas (hub), no a #precios"
  - "Instagram y LinkedIn omitidos (no existen en /links)"
  - "Sub-rutas Fase 4 (taller/econia/reto) NO se publican en sitemap para evitar URLs rotas"
metrics:
  duration: ~3min
  completed: 2026-07-03
---

# Phase 1 Plan 01: Capa de contenido data-driven Summary

Introduce la capa `content/site.ts` con interfaces Payload-ready (NavItem, FooterColumn, SocialLink) y los datos de nav/footer, más un sitemap extendido con las rutas resolubles del sitio.

## What Was Built

- **content/site.ts**: interfaces tipadas (`NavItemType`, `NavItem`, `FooterColumn`, `SocialLink`) documentadas como espejo 1:1 de futuros bloques Payload; exports `siteNav`, `siteCta`, `footerColumns`, `footerSocials`, `footerMeta`. Sin JSX, sin URLs `#` muertas.
- **app/sitemap.ts**: añade `/quienes-somos`, `/programas`, `/testimonios`, `/diplomado` (monthly, priority 0.8), conserva home (1) y /links (0.5). Sub-rutas de Fase 4 diferidas con TODO.

## Deviations from Plan

None - plan executed exactly as written.

## Commits

- 69d0b77: feat(01-01): add data-driven site content layer
- 9a01151: feat(01-01): extend sitemap with new site routes

## Self-Check: PASSED

- content/site.ts: FOUND
- app/sitemap.ts: modified, grep count 4 (>= 4)
- Commits 69d0b77, 9a01151: FOUND
