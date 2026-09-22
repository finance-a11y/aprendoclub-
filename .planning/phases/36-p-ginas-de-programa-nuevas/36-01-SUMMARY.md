---
phase: 36-p-ginas-de-programa-nuevas
plan: 1
subsystem: content
tags: [programs, payload-cms, nextjs, schema-org, redirects]

requires: [34-reestructura-de-urls-de-programas]
provides:
  - "Página /programas/curso-seo-rdss creada y publicada en Payload CMS con Hero, FeatureGrid, FAQAccordion y CTABanner ($30 USD)"
  - "Página /programas/curso-basico-de-seo creada y publicada en Payload CMS con los 4 objetivos de aprendizaje, testimonios y CTABanner ($0 USD)"
  - "Ambos programas registrados en la colección programas de Payload CMS para el catálogo"
  - "schema-mappers.ts actualizado con metadatos estructurados Course JSON-LD para ambos programas"
  - "Redirecciones 301 en next.config.ts y CSVs de Cloudflare para /curso-seo-rdss y /curso-basico-de-seo"
affects: [37-paginas-de-autor-faltantes, 38-paginas-sueltas-faltantes]

actuals:
  tokens: 38000
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns: [payload-blocks, nextjs-catch-all, schema-org-course, redirects-301]

key-files:
  created:
    - aprendoclub/scripts/seed-programas-nuevos.ts
  modified:
    - aprendoclub/lib/schema-mappers.ts
    - aprendoclub/next.config.ts
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare.csv
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare-noheader.csv
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare-both-domains.csv

key-decisions:
  - "Alojar ambos programas bajo el prefijo canónico /programas/* alineado con la arquitectura de información de Phase 34"
  - "Registrar Curso SEO RDSS a $30 USD (taller práctico de 2h de Arianna Lupi) y Curso Básico de SEO a $0 USD (gratuito)"
  - "Vincular Schema.org Course puro y FAQPage a través del registry unificado en schema-mappers.ts"

patterns-established:
  - "Estructura modular de bloques de Payload (Hero, FeatureGrid, TestimonialRef, FAQAccordion, CTABanner) para páginas de programa en el catch-all [...slug]"

requirements-completed: [PROGNEW-01, PROGNEW-02, PROGNEW-03]

coverage:
  - id: C1
    description: "Página para Curso SEO RDSS publicada en /programas/curso-seo-rdss con precio $30 USD"
    requirement: "PROGNEW-01"
    verification:
      - kind: automated_ui
        ref: "Documento en colección pages y programas en Neon DB verificado vía query directo y build Next.js"
        status: pass
    human_judgment: false
  - id: C2
    description: "Página para Curso Básico de SEO publicada en /programas/curso-basico-de-seo con 4 objetivos y acceso gratis"
    requirement: "PROGNEW-02"
    verification:
      - kind: automated_ui
        ref: "Documento en colección pages con bloques completos y entrada en colección programas"
        status: pass
    human_judgment: false
  - id: C3
    description: "Ambos programas registrados en colección programas de Payload y con redirects 301"
    requirement: "PROGNEW-03"
    verification:
      - kind: automated_ui
        ref: "Redirecciones verificadas en next.config.ts y CSVs de Cloudflare; schema-mappers Course registrados"
        status: pass
    human_judgment: false
---

# Summary: Phase 36 — Páginas de programa nuevas

## Work Done

1. **Seed en Neon Postgres (Task 1):**
   - Implementado y ejecutado `aprendoclub/scripts/seed-programas-nuevos.ts`.
   - Creados en la colección `pages`:
     - `slug: "programas/curso-seo-rdss"`: Hero, FeatureGrid (4 temas clave del taller de 2h de Arianna Lupi), FAQAccordion (preguntas frecuentes), CTABanner ($30 USD).
     - `slug: "programas/curso-basico-de-seo"`: Hero, FeatureGrid (los 4 objetivos de aprendizaje: rastreo/indexación, keyword research, SEO On-Page, Search Console), TestimonialRef (testimonios reales), FAQAccordion, CTABanner (acceso gratuito $0).
   - Creados en la colección `programas`:
     - `slug: "curso-seo-rdss"`: Nombre "Curso SEO RDSS", Badge "Taller 2h", Precio "$30 USD", Enlace `/programas/curso-seo-rdss`.
     - `slug: "curso-basico-de-seo"`: Nombre "Curso Básico de SEO", Badge "Curso Gratuito", Precio "Gratis", Enlace `/programas/curso-basico-de-seo`.

2. **Schema.org y Redirecciones 301 (Task 2):**
   - Actualizado `aprendoclub/lib/schema-mappers.ts`: incorporadas las definiciones `COURSES` y agregados los slugs al switch de `getGraphsForSlug`.
   - Actualizado `aprendoclub/next.config.ts`: añadidas redirecciones permanentes para `/curso-seo-rdss` y `/curso-basico-de-seo` hacia sus rutas `/programas/*`.
   - Actualizados los CSVs en `.planning/deliverables/v1.8/` para importación de Cloudflare Bulk Redirects.

3. **Verificación de Calidad (Task 3):**
   - TypeScript `npx tsc --noEmit` completado con 0 errores.
   - `npm run build` de producción completado con éxito.
   - Comprobación de persistencia y estructura de datos en Neon Postgres.
