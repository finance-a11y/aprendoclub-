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

### Active

- [ ] Ver `.planning/REQUIREMENTS.md` (definido en milestone v1.6)

### Out of Scope

- Checkout real del Taller SEO con IA — falta URL de pago; queda con fallback a aprendoseo.com hasta que Juan la aporte
- Página Econía/SEOconía (PROG-05) — diferida, sin fuente de contenido
- Import de imágenes/embeds inline del cuerpo del blog — limitación aceptada del migrador HTML→Lexical

## Context

- Repo `finance-a11y/aprendoclub-` (root es el padre; la app vive en subcarpeta `aprendoclub/`). Ramas `main` y `develop` sincronizadas. `.planning/`, `.claude/`, `CLAUDE.md` en `.gitignore`.
- Flujo de deploy: commit en `main` → push `main` → fast-forward `develop`. Sin PRs (decisión de Juan).
- `.planning/` no se usó de forma completa en milestones anteriores (v1.0–v1.5 corrieron vía `/gsd-autonomous` pero PROJECT.md/MILESTONES.md/STATE.md no se persistieron) — este documento se bootstrapea desde memoria auto (2026-07-11) al arrancar v1.6.
- Milestone v1.6 nace de una auditoría de feedback histórico de Slack (Arianna Lupi, 2026-07-06 y 2026-07-08) contra el copy real del sitio: evitar la palabra "real", des-enfatizar "SEO" en favor de "marketing/IA", cambiar cifra de estudiantes, sacar logos de empresas de testimonios, renombrar el diplomado, Diana→Dana en el team grid, revisar FAQs de membresía.

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
