---
phase: 01-fundaciones-y-navegacion
plan: 02
subsystem: shell-components
tags: [navbar, footer, data-driven, a11y, motion]
requires: [01-01]
provides:
  - "Navbar data-driven con ruta activa, aria-current y reduced-motion"
  - "Footer limpio consumiendo content/site.ts"
affects: [app/(site)/layout.tsx]
tech-stack:
  added: []
  patterns: ["componentes consumen content/site.ts", "useReducedMotion para a11y de motion"]
key-files:
  created: []
  modified: [components/navbar.tsx, components/footer.tsx]
decisions:
  - "isItemActive soporta match dual: routes por pathname, anchors por scroll (solo en /)"
  - "Observer de secciones guardado tras if (pathname !== '/') return"
  - "Panel mobile normalizado a bg-[var(--bg-primary)]"
metrics:
  duration: ~5min
  completed: 2026-07-03
---

# Phase 1 Plan 02: Navbar + Footer data-driven Summary

Refactoriza navbar y footer para consumir `content/site.ts`, con navegación real entre páginas, ruta activa vía `usePathname`, soporte de `prefers-reduced-motion` y footer sin links muertos, conservando el look glass + framer-motion.

## What Was Built

- **components/navbar.tsx**: client component que mapea `siteNav`/`siteCta`; items `route` con `next/link`, `anchor` con `<a>`; ruta activa por `usePathname` con reglas de match (`/` exacto, `startsWith("/programas")`, igualdad para el resto); `aria-current="page"` en activo; `layoutId` renombrado a `activeNav`; observer de secciones guardado a `pathname === "/"`; `useReducedMotion` desactiva slide/stagger/layout; panel mobile con `bg-[var(--bg-primary)]` y blurb desde `footerMeta.mobilePanelBlurb`; CTA → `/programas`.
- **components/footer.tsx**: server component que mapea `footerColumns`/`footerSocials`/`footerMeta`; columnas Programas + aprendoclub; socials reales (YouTube lucide, TikTok/WhatsApp SVG inline) con `target="_blank" rel="noopener noreferrer"`; sin `href="#"`; sin columna Legal; blurb nuevo.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Consumo del estado activeSection y variable isHome sin uso**
- **Found during:** Task 1
- **Issue:** Al pasar el nav a rutas, el estado `activeSection` del observer y una variable `isHome` quedaban sin consumir, lo que rompería el build por unused vars.
- **Fix:** Generalicé `isRouteActive` a `isItemActive(item, pathname, activeSection)` que resuelve items `anchor` por scroll (honrando el comportamiento dual del contrato) y eliminé `isHome`.
- **Files modified:** components/navbar.tsx
- **Commit:** 5ddfc0f

## Commits

- 5ddfc0f: feat(01-02): make navbar data-driven with route detection
- 7bc2b12: feat(01-02): clean up footer and make it data-driven

## Self-Check: PASSED

- components/navbar.tsx: usePathname/useReducedMotion/@content/site/aria-current present; tsc clean
- components/footer.tsx: server component, no href="#", rel=noopener present; tsc clean
- Commits 5ddfc0f, 7bc2b12: FOUND
