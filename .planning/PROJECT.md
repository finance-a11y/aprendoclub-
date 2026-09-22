# aprendoclub

## What This Is

Sitio web de aprendoclub (Next.js 16 App Router, React 19, Tailwind v4, Payload CMS 3 + Postgres/Neon + Vercel Blob), academia de SEO/marketing con IA. Incluye páginas de programas (diplomado, taller, reto), testimonios, blog migrado de aprendoseo.com, y todo el contenido editable vía Payload admin.

## Core Value

Convertir visitas en inscripciones a los programas (diplomado, taller, reto) con un sitio rápido, editable sin código y con copy que refleje la voz real de la marca (no genérico ni "sonando a IA").

## Requirements

### Validated

- ✓ Shell `(site)` con navbar/footer compartidos, patrón data-driven — v1.0
- ✓ Páginas quienes-somos, testimonios, programas, diplomado, taller, reto — v1.0
- ✓ Design system unificado (tokens, primitivos ui/, contraste ≥4.5:1, motion contract) — v1.1/v1.2
- ✓ Payload CMS: colección Pages (page-builder ~29 bloques) + 5 colecciones de datos + site-settings — v1.3
- ✓ Blog migrado de aprendoseo.com (64 posts, 5 categorías, 3 autores) vía Payload — v1.3
- ✓ Refresh de home + widget de asesoría por WhatsApp — v1.5 (deployado a main)
- ✓ Copy sin "real", des-enfatizado de "SEO", cifra de estudiantes, Dana en team grid, sin logos de empresas en testimonios, diplomado renombrado a "SEO + AIO" — v1.6 (Phases 26-28, Fase 29 FAQs queda pendiente)
- ✓ Feedback visual home + programas: tipografía/motion, cards de problema, imágenes reales en diplomado, widget de asesoría sin precio, espaciados — v1.7 (Phases 29-31, Phase 32 omitida)

### Active

- [ ] Ver `.planning/REQUIREMENTS.md` (definido en milestone v1.8)

## Current Milestone: v1.8 Migración aprendoseo.com → aprendoclub.com

**Goal:** Migrar la totalidad de URLs de aprendoseo.com a aprendoclub.com sin pérdida de SEO, según el mapeo del sheet de Juan: primero la lista de redirects 301 para todo lo que ya existe en aprendoclub (para importar en Cloudflare), y después la creación de las páginas que faltan.

**Target features:**
- Lista de redirects 301 lista para importar en Cloudflare (Bulk Redirects), cubriendo los ~80 URLs de aprendoseo.com cuyo destino ya existe en aprendoclub (64 blog posts en 5 categorías, 3 autores, 2 programas)
- Reestructura de URLs: `/reto` → `/programas/reto`, `/diplomado` → `/programas/diplomado` (consistencia con `/programas/taller-seo-con-ia`), con redirect interno desde las rutas viejas
- Páginas programáticas de ciudad (10: Alicante, Bilbao, Caracas, CDMX, Guadalajara, Málaga, Maracaibo, Puebla, Toledo, Valencia) migradas a Payload, mejoradas sobre el patrón genérico de aprendoseo
- 2 páginas de programa nuevas (Curso SEO RDSS, Curso Básico de SEO) creadas en Payload a partir del contenido vivo en aprendoseo.com
- 2 páginas de autor faltantes (Ibraim Zayed, Verónica Romero)
- Páginas sueltas faltantes (contacto, glosario, políticas legales, recursos) creadas o redirigidas
- `/prensa` descartada (sin valor, sin redirect)

### Out of Scope

- Merge de contenido de `/certificaciones` → página de autor de Arianna y de `/academia-seo` → `/quienes-somos` — solo redirect simple por ahora; el merge de copy queda para una fase futura (decisión de Juan)
- Checkout real del Taller SEO con IA — falta URL de pago; queda con fallback a aprendoseo.com hasta que Juan la aporte
- Página Econía/SEOconía (PROG-05) — diferida, sin fuente de contenido
- Import de imágenes/embeds inline del cuerpo del blog — limitación aceptada del migrador HTML→Lexical

## Context

- Repo `finance-a11y/aprendoclub-` (root es el padre; la app vive en subcarpeta `aprendoclub/`). Ramas `main` y `develop` sincronizadas. `.planning/`, `.claude/`, `CLAUDE.md` en `.gitignore`.
- Flujo de deploy: commit en `main` → push `main` → fast-forward `develop`. Sin PRs (decisión de Juan).
- `.planning/` no se usó de forma completa en milestones anteriores (v1.0–v1.5 corrieron vía `/gsd-autonomous` pero PROJECT.md/MILESTONES.md/STATE.md no se persistieron) — este documento se bootstrapea desde memoria auto (2026-07-11) al arrancar v1.6.
- Milestone v1.6 nace de una auditoría de feedback histórico de Slack (Arianna Lupi, 2026-07-06 y 2026-07-08) contra el copy real del sitio: evitar la palabra "real", des-enfatizar "SEO" en favor de "marketing/IA", cambiar cifra de estudiantes, sacar logos de empresas de testimonios, renombrar el diplomado, Diana→Dana en el team grid, revisar FAQs de membresía.
- v1.6 quedó incompleto: Fases 26-28 completas (archivadas en `.planning/milestones/v1.6-phases/`), Fase 29 (FAQs de membresía) bloqueada esperando input de Juan sobre el modelo de negocio viejo→membresía. Juan pidió arrancar v1.7 igual y retomar la Fase 29 más adelante como fase nueva cuando la desbloquee.
- Milestone v1.7 nace de un doc de feedback de Arianna Lupi en ClickUp (7 puntos sobre home + programas, 2026-07-22), con capturas de referencia (íconos ilustrados tipo weplash.com, cards de la landing anterior del diplomado, widget de asesoría estilo weplash). Varios puntos ya estaban resueltos en el código (hero copy, orden testimonios/widget, alineación de botones) — se verifican en vez de re-implementarse.

## Constraints

- **Tech stack**: Next.js 16 App Router + React 19 + Tailwind v4 + Payload 3 + Postgres/Neon + Vercel Blob — ya en producción, no se cambia
- **Voz de marca**: el copy de reemplazo del milestone v1.6 no se inventa libremente — el pedido original es "evitar sonar a IA", así que el wording exacto de reemplazo debe salir de Juan (discuss-phase), no generado por Claude
- **Deploy**: sin checkout automatizado de PRs; commit directo a main autorizado por Juan

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Payload CMS con page-builder de bloques en vez de contenido hardcodeado en `content/*.ts` | Todo editable sin código para el equipo | ✓ Good — v1.3 completado, contenido migrado |
| Milestone v1.6 tratado como milestone GSD completo (discuss→requirements→roadmap→plan→execute→review) | Los cambios de copy tocan posicionamiento de marca y voz, no son mecánicos | — Pending |
| Checkpoints visuales agrupados al final del lote de fases, no fase por fase | Preferencia explícita de Juan durante v1.5 | ✓ Good |
| Redirects 301 de aprendoseo.com → aprendoclub.com se aplican en Cloudflare, no en next.config.ts | Son dominios distintos; Cloudflare gestiona el DNS/CDN de aprendoseo.com | — Pending |
| `/reto` y `/diplomado` se mueven a `/programas/reto` y `/programas/diplomado` | Consistencia de rutas con `/programas/taller-seo-con-ia`, aunque las URLs viejas ya estén live | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-09-22 after arranque de milestone v1.8*
