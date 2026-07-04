---
phase: 03-testimonios
plan: 01
subsystem: testimonios
tags: [content-layer, sections, page-assembly, seo, home-link, social-proof]
requires:
  - components/testimonios-section.tsx
  - content/quienes-somos.ts
provides:
  - content/testimonios.ts
  - components/testimonios/testimonial-avatar.tsx
  - components/testimonios/hero.tsx
  - components/testimonios/grid.tsx
  - components/testimonios/reto-galeria.tsx
  - components/testimonios/cta.tsx
  - app/(site)/testimonios/page.tsx
affects:
  - components/testimonios-section.tsx
tech-stack:
  added: []
  patterns: [data-driven-content, avatar-initials-fallback, server-component-composes-client, next-link, reduced-motion-guard]
key-files:
  created:
    - content/testimonios.ts
    - components/testimonios/testimonial-avatar.tsx
    - components/testimonios/hero.tsx
    - components/testimonios/grid.tsx
    - components/testimonios/reto-galeria.tsx
    - components/testimonios/cta.tsx
  modified:
    - app/(site)/testimonios/page.tsx
    - components/testimonios-section.tsx
decisions:
  - "content/testimonios.ts centraliza copy + 24 testimonios + galería del Reto + logos; Payload-ready espejando content/quienes-somos.ts"
  - "Los 3 testimonios con foto usan la versión rica del home; las 21 entradas nombradas usan avatar de iniciales (getIniciales de las 2 primeras palabras), sin fabricar caras"
  - "El botón del home es secundario/outline para no competir con el accent verde reservado a CTAs primarios (UI-SPEC)"
  - "Stagger del grid limitado con Math.min para 24 cards, evitando delays acumulados largos"
  - "El checkpoint human-verify (verificación visual en navegador) se defiere al pase final de Juan"
metrics:
  duration: ~12min
  completed: 2026-07-03
---

# Phase 3 Plan 01: Página /testimonios y enlace del home Summary

Se construye la página `/testimonios` (TEST-01) con una capa de contenido data-driven (`content/testimonios.ts`) que reúne los 24 testimonios verbatim del source (3 con foto real + 21 con avatar de iniciales), la galería "Historias del Reto" (t1..t9), la banda de logos y el CTA a /programas. Se enlaza la sección de testimonios del home a la página completa mediante un botón "Ver todos los testimonios" (TEST-02) conservando sus 3 cards. Build de producción verde.

## What Was Built

- **content/testimonios.ts**: capa tipada Payload-ready. Interfaces `Testimonio`, `RetoImagen`, `TrustedCompany`, `HeroContent`, `RetoContent`, `CtaContent`. Exports `testimonios` (24 entradas verbatim), `retoImagenes` (t1..t9 con alt numerado), `trustedCompanies`, y el copy de página (`hero`, `gridTitulo`, `logosBanda`, `reto`, `cta`).
- **testimonial-avatar.tsx** (`TestimonialAvatar`): espeja `TeamAvatar`; `useState` + `onError` cae a iniciales sobre `bg-[var(--bg-tertiary)]`. Helper `getIniciales` (2 primeras palabras → mayúsculas).
- **hero.tsx** (`TestimoniosHero`): eyebrow accent + h1 + subtítulo, `pt-28` para el navbar fijo, fondo `bg-primary`.
- **grid.tsx** (`TestimoniosGrid`): reusa la card exacta del home (rounded-xl, `bg-[#0d1117]`, 5 estrellas amarillas, quote en `&ldquo;…&rdquo;`) con `TestimonialAvatar` y subtítulo `rol ?? ubicacion` (omitido si vacío). Grid `1/2/3` columnas + banda de logos. Fondo `bg-secondary`.
- **reto-galeria.tsx** (`RetoGaleria`): eyebrow + título + texto; grid `2/3` columnas de t1..t9 con `object-cover`, `aspect-[4/3]`, lazy loading. Fondo `bg-primary`.
- **cta.tsx** (`TestimoniosCta`): espeja el CTA de Fase 2; `Link` accent con glow a /programas. Fondo `bg-secondary`.
- **page.tsx**: Server Component con metadata SEO que compone Hero → Grid → RetoGaleria → Cta bajo el shell (site).
- **testimonios-section.tsx** (home): botón outline "Ver todos los testimonios" → /testimonios tras el grid, importando `Link`. Los 3 testimonios del home intactos.

## Deviations from Plan

None. El plan se ejecutó tal como está escrito.

## Verbatim Copy Check

- Copy propio de página (hero, títulos, banda, reto, CTA): reproducido carácter por carácter desde 03-CONTENT-SOURCE.md.
- 24 quotes verbatim; spot-check automatizado OK (`8,000 a 11,000`, `Diplomado de Cero a SEO de Ari`, `me paga 3X`, `aprendoclub ha superado mis expectativas`, `un mar de posibilidades`).
- Marca ya rebrandeada a "aprendoclub" tomada del source sin re-aplicar (Josef Bolaños, Erika Galaviz).
- Sin em/en dashes en ningún archivo nuevo.
- Exactamente 3 entradas con `foto`; las 21 nombradas sin foto (avatar de iniciales), sin caras fabricadas.

## Checkpoint (human-verify)

Por instrucción de Juan, la verificación visual en navegador NO bloqueó. Verificaciones automáticas ejecutadas:
- `npx tsc --noEmit`: sin errores.
- `npm run build`: verde, /testimonios prerenderizada como estática.
- Conteos: 24 quotes, 3 fotos; home conserva 3 testimonios (no 24).

Verificación visual final (avatares de iniciales, alternancia de fondos, galería del Reto, clicks en CTAs, reduced-motion) **diferida al pase visual de Juan**.

## Threat Flags

None found. Página de contenido estático server-rendered, sin input de usuario, sin data-fetching, sin dependencias nuevas.

## Self-Check: PASSED

- content/testimonios.ts: FOUND
- components/testimonios/testimonial-avatar.tsx: FOUND
- components/testimonios/hero.tsx: FOUND
- components/testimonios/grid.tsx: FOUND
- components/testimonios/reto-galeria.tsx: FOUND
- components/testimonios/cta.tsx: FOUND
- app/(site)/testimonios/page.tsx: FOUND (placeholder removed)
- components/testimonios-section.tsx: "Ver todos los testimonios" FOUND
- Commits b0b4a0a, 4cb8656, 5a25fbf: FOUND
- npm run build: PASSED
