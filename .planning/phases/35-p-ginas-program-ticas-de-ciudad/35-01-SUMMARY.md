---
phase: 35-p-ginas-program-ticas-de-ciudad
plan: 1
subsystem: content
tags: [programmatic-seo, payload-cms, nextjs-ssg, cities, redirects, schema-org]

requires: [33-redirects-301-para-contenido-existente, 34-reestructura-de-urls-de-programas]
provides:
  - "Colección CiudadesSeo en Payload CMS y tabla en Neon Postgres con migración Drizzle"
  - "10 páginas programáticas de ciudad en /cursos-seo/[ciudad] pre-renderizadas como SSG"
  - "Salarios de mercado calibrados por país y preguntas frecuentes adaptadas por ciudad"
  - "10 reglas 301 añadidas al CSV de Cloudflare y regla wildcard /cursos-seo/curso-seo-:ciudad en next.config.ts"
affects: [36-paginas-de-programa-nuevas, 37-paginas-de-autor-faltantes]

actuals:
  tokens: 42000
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns: [payload-collection, drizzle-migration, nextjs-ssg-dynamic-route, course-schema-jsonld]

key-files:
  created:
    - aprendoclub/collections/CiudadesSeo.ts
    - aprendoclub/app/(frontend)/(site)/cursos-seo/[ciudad]/page.tsx
    - aprendoclub/scripts/seed-ciudades.ts
    - aprendoclub/migrations/20260922_162757_add_ciudades_seo.ts
  modified:
    - aprendoclub/payload.config.ts
    - aprendoclub/next.config.ts
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare.csv
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare-noheader.csv
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare-both-domains.csv

key-decisions:
  - "Usar patrón de URL limpio /cursos-seo/[ciudad] en vez del redundante /cursos-seo/curso-seo-[ciudad]"
  - "Colección dedicada en Payload con soporte de revalidación on-demand e ISR/SSG"
  - "Promocionar el Diplomado de SEO + AIO como oferta formativa insignia en todas las ciudades"
  - "Salarios diferenciados por economía: España en EUR/año, México en MXN/mes y Venezuela en USD/mes para perfiles remotos"

patterns-established:
  - "SSG programático en Next.js App Router combinando generateStaticParams de Payload con generateMetadata y JSON-LD"

requirements-completed: [CITY-01, CITY-02, CITY-03, CITY-04]

coverage:
  - id: C1
    description: "Modelo implementado en Payload evitando duplicación innecesaria de plantillas"
    requirement: "CITY-01"
    verification:
      - kind: automated_ui
        ref: "Colección CiudadesSeo creada y registrada en payload.config.ts con tabla en Neon"
        status: pass
    human_judgment: false
  - id: C2
    description: "10 páginas de ciudad publicadas y resolviendo en aprendoclub con HTTP 200"
    requirement: "CITY-02"
    verification:
      - kind: automated_ui
        ref: "Compilación de producción Next.js (Turbopack) con 10 rutas SSG generadas"
        status: pass
    human_judgment: false
  - id: C3
    description: "Salario, ciudad y FAQs contextualizados por mercado local"
    requirement: "CITY-03"
    verification:
      - kind: automated_ui
        ref: "Datos de seed validados en Neon DB para las 10 ciudades"
        status: pass
    human_judgment: false
  - id: C4
    description: "Redirects 301 agregados a Cloudflare CSV y fallback en next.config.ts"
    requirement: "CITY-04"
    verification:
      - kind: automated_ui
        ref: "10 filas agregadas a redirects CSV y regla /cursos-seo/curso-seo-:ciudad en next.config.ts"
        status: pass
    human_judgment: false
---

# Phase 35: Páginas programáticas de ciudad — Summary

Se implementó el sistema completo de páginas programáticas de ciudad en aprendoclub, resolviendo la migración de las 10 URLs de cursos locales de aprendoseo.com hacia páginas optimizadas, rápidas y enriquecidas con datos de mercado reales.

### Entregables implementados

1. **Modelo de Datos en Payload CMS:**
   - Colección `CiudadesSeo` (`ciudades-seo`) con campos para `nombre`, `slug`, `pais`, `gentilicio`, `salarioPromedio`, `salarioNota`, `faqs` estructuradas y grupo de metadatos `meta`.
   - Migración de base de datos Drizzle generada y ejecutada en Neon Postgres (`20260922_162757_add_ciudades_seo.ts`).

2. **Base de datos poblada (Neon Postgres):**
   - 10 ciudades creadas mediante `aprendoclub/scripts/seed-ciudades.ts`:
     - España: Alicante, Bilbao, Málaga, Toledo, Valencia (salarios en EUR/año).
     - México: Ciudad de México, Guadalajara, Puebla (salarios en MXN/mes).
     - Venezuela: Caracas, Maracaibo (salarios en USD/mes para talento remoto).

3. **Frontend y Renderizado Next.js SSG:**
   - Ruta dinámica `app/(frontend)/(site)/cursos-seo/[ciudad]/page.tsx`.
   - `generateStaticParams` pre-renderiza las 10 ciudades durante el build.
   - Metadatos dinámicos OpenGraph y canonical único por ciudad.
   - Schema.org JSON-LD tipo `Course` y `FAQPage` integrado.
   - Plantilla atractiva con breadcrumbs, hero localizado, highlights del programa, salarios de mercado, temario del Diplomado, FAQs con acordeón nativo y CTAs hacia `/programas/diplomado`.

4. **Estrategia de Redirecciones 301:**
   - Fallback interno en `aprendoclub/next.config.ts`:
     `{ source: "/cursos-seo/curso-seo-:ciudad", destination: "/cursos-seo/:ciudad", permanent: true }`
   - Incorporación de las 10 filas de redirección 301 en `.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv` y sus versiones derivadas.
