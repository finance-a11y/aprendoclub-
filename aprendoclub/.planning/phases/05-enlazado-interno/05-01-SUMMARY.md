---
phase: 05-enlazado-interno
plan: 01
subsystem: seo-internal-linking
tags: [seo, internal-links, navigation]
requires: []
provides:
  - RelatedLinks presentational component
  - Contextual cross-links across all site pages
affects:
  - app/(site)/diplomado/page.tsx
  - app/(site)/reto/page.tsx
  - app/(site)/programas/taller-seo-con-ia/page.tsx
  - app/(site)/programas/page.tsx
  - components/quienes-somos/cta.tsx
  - components/testimonios/cta.tsx
tech-stack:
  added: []
  patterns:
    - Presentational Server Component for reusable internal link strips
    - Inline underline link style (accent reserved for conversion CTAs)
key-files:
  created:
    - components/related-links.tsx
  modified:
    - app/(site)/diplomado/page.tsx
    - app/(site)/reto/page.tsx
    - app/(site)/programas/taller-seo-con-ia/page.tsx
    - app/(site)/programas/page.tsx
    - components/quienes-somos/cta.tsx
    - components/testimonios/cta.tsx
decisions:
  - Accent (#b8f60d) kept reserved for conversion CTAs; contextual links use inline underline style
  - RelatedLinks kept as a Server Component (no hooks) so program Server Component pages can render it directly
metrics:
  duration: ~8m
  completed: 2026-07-04
requirements: [LINK-01]
---

# Phase 5 Plan 01: Enlazado interno Summary

Contextual internal cross-linking woven across every site page via a reusable `RelatedLinks` presentational component plus inline links between /quienes-somos and /testimonios, so no route is a dead end and each page carries 2+ descriptive body links. Covers LINK-01.

## What Was Built

- `components/related-links.tsx`: presentational Server Component (`export function RelatedLinks`) with props `{ title?; links: { href; label }[] }`. Renders a centered section with an eyebrow and a flex-wrap row of inline underlined links (`text-gray-300 underline underline-offset-4 decoration-white/30 hover:text-[#b8f60d]`). No accent background.
- `/diplomado`, `/reto`, `/programas/taller-seo-con-ia`: render `RelatedLinks` after the final CTA, linking back to `/programas` ("Ver todos los programas") and `/testimonios` ("Lee las historias de nuestros estudiantes").
- `/programas` hub: renders `RelatedLinks` (title "Antes de decidir") linking to `/testimonios` and `/quienes-somos`.
- `/quienes-somos` CTA: inline link to `/testimonios` ("Mira las historias de nuestros estudiantes") below the primary CTA.
- `/testimonios` CTA: inline link to `/quienes-somos` ("Conoce al equipo detrás de aprendoclub") below the primary CTA.

## Final Cross-Link Map (contextual body links)

| Page | Links to |
|------|----------|
| `/` (home) | /quienes-somos, /testimonios, /programas |
| `/programas` | /diplomado, /programas/taller-seo-con-ia, /reto, /testimonios, /quienes-somos |
| `/quienes-somos` | /programas, /testimonios |
| `/testimonios` | /programas, /quienes-somos |
| `/diplomado` | /programas, /testimonios |
| `/programas/taller-seo-con-ia` | /programas, /testimonios |
| `/reto` | /programas, /testimonios |

Every page links to at least 2 other site pages; no orphan routes.

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- `npm run build`: passes (Next.js 16.1.6, 12/12 static pages generated).
- `npx tsc --noEmit`: passes.
- Forbidden anchor text check ("clic aquí"/"aquí"/"haz clic"): zero matches.

## Commits

- a32f38e feat(05-01): add RelatedLinks component and cross-links on program pages
- d404b7d feat(05-01): add inline cross-links between quienes-somos and testimonios

## Self-Check: PASSED

- components/related-links.tsx: FOUND
- Commit a32f38e: FOUND
- Commit d404b7d: FOUND
