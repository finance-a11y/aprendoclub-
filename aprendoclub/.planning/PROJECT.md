# aprendoclub — Web

## What This Is

Sitio web de aprendoclub, una academia/membresía de SEO + IA. Hoy es un homepage suelto (Next.js 16 App Router, dark theme, Montserrat, accent verde `#b8f60d`, framer-motion) sin estructura de navegación real. Este milestone lo convierte en un sitio navegable con páginas de contenido migradas de aprendoseo.com, listo para arrancar Google Ads.

## Core Value

Que un visitante de Google Ads aterrice y encuentre una web creíble y navegable — quiénes somos, testimonios y programas reales enlazados — que convierta a inscripción. Si todo lo demás falla, la navegación real y el contenido de confianza deben existir.

## Current Milestone: v1.0 Web lista para Google Ads

**Goal:** Convertir el home suelto en un sitio con navegación real — páginas nuevas (rutas Next.js) con contenido migrado de aprendoseo.com, enlazadas internamente y en header/footer, siguiendo el diseño de aprendoclub.

**Target features:**
- Página Quiénes somos (contenido de aprendoseo)
- Página/sección Testimonios (migrando los de aprendoseo + reto), visibles desde el home
- Página Programas unificada (hub) enlazando: Diplomado, Taller SEO con IA, Reto 7 días, Econía/SEOconía
- Header con navegación real a las páginas nuevas
- Footer limpio (sin links muertos)
- Enlazado interno + sitemap actualizado

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Homepage con secciones (hero, problema, beneficios, precios, testimonios, instructor, FAQ, CTA) — pre-GSD
- ✓ Página /diplomado (ruta Next.js) — pre-GSD
- ✓ Página /links (linktree) con tracking GA4 — pre-GSD
- ✓ Design system dark: `#0a0a0f`, accent `#b8f60d`, Montserrat, framer-motion, lucide, navbar glass — pre-GSD
- ✓ Shell compartido `(site)` (navbar con navegación real + footer limpio) + patrón data-driven `content/` — v1.0 (Fase 1)
- ✓ Página `/quienes-somos` (historia, fundadora, equipo, EPAM) + teaser en home — v1.0 (Fase 2)
- ✓ Página `/testimonios` (24 testimonios + galería del Reto) + link desde home — v1.0 (Fase 3)
- ✓ Hub `/programas` + Taller SEO con IA + Reto 7 días + sección programas en home — v1.0 (Fase 4)
- ✓ Diplomado integrado al shell y rediseñado al look aprendoclub (PROG-08) — v1.0 (Fase 4)
- ✓ Enlazado interno cruzado entre todas las páginas — v1.0 (Fase 5)

### Active

<!-- Current scope. Building toward these. Detailed en el próximo milestone -->

(v1.0 completado — siguiente milestone: v1.1 Payload CMS)

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- CMS / contenido editable — diferido a v1.1 (Payload CMS). v1.0 es estático (React hardcodeado) para salir rápido.
- Blog — llega con Payload en v1.1 (migración del blog de aprendoseo con categorías/authors).
- Econía/SEOconía — diferida: sin fuente de contenido; se retoma cuando Juan lo aporte.
- Páginas de SEO redes sociales — se agregan después.
- HTML plano en `public/` — rompe el design system; todo se construye como rutas Next.js.

## Context

- Brownfield: el repo (`aprendoclub-app`, Next.js 16, React 19, Tailwind v4) ya tiene home + /diplomado + /links en `app/`, y exports estáticos legacy en `public/` (reto, diplomadoseo, acelerador-freelance-seo, especialista, evento, curso-seo-para-principiantes).
- Contenido a migrar vive en aprendoseo.com (scrapeo en vivo) y en `public/reto/testimonios`.
- Footer actual apunta a cosas inexistentes (Precios, Blog, Guías, Herramientas, Testimonios roto).
- Navbar actual es solo anchors del home (`#problema`, `#beneficios`, `#precios`, `#faq`) — falta navegación entre páginas.
- El repo se migra luego a otro destino (Cammila/Juan Carlos); por ahora dejar optimizado acá.

## Constraints

- **Tech stack**: Next.js 16 App Router, React 19, Tailwind v4, framer-motion, lucide. Sin dependencias nuevas salvo justificación.
- **Diseño**: Pixel-perfect coherente con el home — dark `#0a0a0f`, accent `#b8f60d`, Montserrat. Verificar render.
- **Payload-ready (v1.1)**: separar contenido de presentación — cada sección como componente data-driven tipo-bloque, con el contenido en objetos/consts, para que la migración a bloques/colecciones Payload sea limpia. NO instalar Payload en v1.0.
- **Estático**: sin CMS ni backend en v1.0.
- **Idioma**: español neutro.

## Key Decisions

<!-- Decisions that constrain future work. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Rutas Next.js, no HTML en public/ | Coherencia de diseño, reutilizar componentes | — Pending |
| Estático ahora, Payload CMS en v1.1 | Salir rápido para Google Ads; CMS después en otra rama | — Pending |
| Construir Payload-ready (contenido separado) | Migración limpia a bloques/colecciones Payload | — Pending |
| Scrapear aprendoseo.com como fuente | Contenido real ya existe ahí | — Pending |
| Diplomado se integra al shell y diseño aprendoclub (revierte "chrome propio") | Juan pidió unificar el diseño; hoy `/diplomado` usa tokens shadcn distintos | — Pending (Fase 4) |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-07-03 after v1.0 milestone start*
