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

### Active

- [ ] Ver `.planning/REQUIREMENTS.md` (definido en milestone v1.7)

## Current Milestone: v1.7 Feedback visual home + programas

**Goal:** Aplicar el feedback visual/copy recibido de Arianna sobre el home y las páginas de programas (diplomado/taller/reto): tipografía y motion, cards de "problema" con copy e íconos nuevos, imágenes reales en diplomado, links de programas a páginas estables, quitar precio del home a favor del widget de asesoría con copy actualizado, reducir espaciados, y reordenar testimonios antes del widget.

**Target features:**
- Montserrat Bold en headings + pase de motion/transiciones moderno en todo el sitio
- Cards de "problema" (home): copy nuevo (4 cards) + íconos ilustrados tipo imagen en vez de lucide
- Imágenes reales en la página Diplomado (estilo landing anterior)
- Botones de programas alineados (verificar, ya resuelto en v1.5) + links de programas a páginas estables mientras se ajustan las nuevas
- Home sin precio: solo widget de asesoría, con copy/bullets actualizados
- Reducir espaciados grandes entre secciones del home
- Testimonios antes del widget de asesoría (verificar, ya en ese orden en código)

### Out of Scope

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

---
*Last updated: 2026-07-11 after bootstrap para milestone v1.6*
