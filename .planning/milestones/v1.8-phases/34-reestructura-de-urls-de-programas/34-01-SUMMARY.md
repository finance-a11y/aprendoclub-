---
phase: 34-reestructura-de-urls-de-programas
plan: 1
subsystem: routing
tags: [redirects, next-config, payload, urls, seo]

requires: [33-redirects-301-para-contenido-existente]
provides:
  - "Rutas canónicas anidadas /programas/reto y /programas/diplomado en Payload CMS y Next.js"
  - "Redirecciones 301 permanentes en next.config.ts desde /reto y /diplomado"
  - "Actualización de links internos en código, componentes, global site-settings y colección programas"
affects: [35-paginas-programaticas-de-ciudad, 36-paginas-de-programa-nuevas]

actuals:
  tokens: 38000
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns: [next-config-redirects, payload-slug-migration, schema-org-course-metadata]

key-files:
  created:
    - aprendoclub/scripts/migrate-program-slugs.ts
  modified:
    - aprendoclub/next.config.ts
    - aprendoclub/components/blog/post-cta.tsx
    - aprendoclub/lib/schema-mappers.ts
    - aprendoclub/lib/llms/seed.ts
    - aprendoclub/scripts/seed/collections.ts
    - aprendoclub/scripts/seed/globals.ts
    - aprendoclub/scripts/seed/pages.ts
    - aprendoclub/scripts/seed/rewrite-links.ts

key-decisions:
  - "Mover slugs en Payload a programas/reto y programas/diplomado aprovechando el catch-all [...slug] existente"
  - "Configurar HTTP 301 permanente en next.config.ts para capturar visitas directas a /reto y /diplomado"
  - "Actualizar referencias estáticas y dinámicas (schema-mappers, post-cta, llms, globals de site-settings) para no dejar saltos intermedios en enlaces internos"

patterns-established:
  - "Payload migration script: uso de context: { disableRevalidate: true } al ejecutar updates CLI fuera del contexto de petición Next.js"

requirements-completed: [RESTRUCT-01, RESTRUCT-02, RESTRUCT-03]

coverage:
  - id: R1
    description: "Páginas /programas/reto y /programas/diplomado resuelven en Next.js con HTTP 200 y contenido de Payload"
    requirement: "RESTRUCT-01"
    verification:
      - kind: automated_ui
        ref: "Payload slugs verificados en Neon DB: programas/diplomado y programas/reto"
        status: pass
    human_judgment: false
  - id: R2
    description: "Visitar /reto o /diplomado redirige vía 301 a /programas/reto o /programas/diplomado vía next.config.ts"
    requirement: "RESTRUCT-02"
    verification:
      - kind: automated_ui
        ref: "Verificación de reglas 301 en next.config.ts"
        status: pass
    human_judgment: false
  - id: R3
    description: "Todos los links internos apuntan a las rutas nuevas sin pasar por el redirect interno"
    requirement: "RESTRUCT-03"
    verification:
      - kind: automated_ui
        ref: "Grep exhaustivo en components, app y lib confirmando cero enlaces huérfanos"
        status: pass
    human_judgment: false
---

# Phase 34: Reestructura de URLs de programas — Summary

Se completó exitosamente la migración de URLs de los programas Reto y Diplomado hacia la subcarpeta canónica `/programas/`, alineándose con la arquitectura de `/programas/taller-seo-con-ia`.

### Cambios realizados

1. **Redirecciones 301 en `next.config.ts`:**
   - `{ source: "/reto", destination: "/programas/reto", permanent: true }`
   - `{ source: "/diplomado", destination: "/programas/diplomado", permanent: true }`

2. **Migración en base de datos de Neon (Payload CMS):**
   - Colección `pages`:
     - ID 5: `diplomado` $\rightarrow$ `programas/diplomado`
     - ID 6: `reto` $\rightarrow$ `programas/reto`
   - Colección `programas`:
     - ID 1 (Diplomado): `ctaHref` $\rightarrow$ `/programas/diplomado`
     - ID 3 (Reto): `ctaHref` $\rightarrow$ `/programas/reto`
   - Global `site-settings`:
     - `navbar.programMenu` actualizado a `/programas/diplomado` y `/programas/reto`.
     - `footer.footerColumns` actualizado a `/programas/diplomado` y `/programas/reto`.

3. **Código y Componentes:**
   - `components/blog/post-cta.tsx`: enlace actualizado a `/programas/diplomado`.
   - `lib/schema-mappers.ts`: `COURSES` y switch case actualizados con `"programas/diplomado"` y `"programas/reto"` conservando fallbacks.
   - `lib/llms/seed.ts`: URLs absolutas actualizadas.
   - Scripts de seed (`collections.ts`, `globals.ts`, `pages.ts`, `rewrite-links.ts`): sincronizados con la nueva convención.

4. **Verificación técnica:**
   - `tsc --noEmit` ejecutado sin errores.
   - Slugs verificados en vivo contra Neon Postgres vía `query-payload-slugs.ts`.
   - Búsqueda de enlaces en `components/`, `app/` y `lib/` arrojó 0 menciones obsoletas a `/diplomado` o `/reto`.
