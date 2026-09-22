---
phase: 37-paginas-de-autor-faltantes
plan: 1
subsystem: content
tags: [authors, blog, payload-cms, redirects, cloudflare]

requires: [33-redirects-301-para-contenido-existente]
provides:
  - "Autores Ibraim Zayed y Verónica Romero creados en la colección authors de Payload CMS con nombre, bio, rol y avatar de media"
  - "Rutas /autor/ibraim-zayed y /autor/veronica-romero sirviendo AuthorView y metadata/JSON-LD"
  - "Redirecciones 301 configuradas en todos los CSVs de Cloudflare Bulk Redirects"
affects: [38-paginas-sueltas-faltantes]

actuals:
  tokens: 28000
  tasks: 3
  commits: 1

tech-stack:
  added: []
  patterns: [payload-author, catch-all-author-view, cloudflare-bulk-redirects]

key-files:
  created:
    - aprendoclub/scripts/seed-autores-faltantes.ts
  modified:
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare.csv
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare-noheader.csv
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare-both-domains.csv

key-decisions:
  - "Vincular a los autores con sus avatares existentes en la colección media (Ibraim: ID 9, Verónica: ID 11)"
  - "Reusar las bios oficiales ya presentes en la colección team-members y el inventario de contenido"
  - "Conservar el renderizado limpio de AuthorView de Next.js que soporta autores con 0 posts de forma accesible y semántica"

patterns-established:
  - "Seed idempotente para autores de blog mediante Local API con context: { disableRevalidate: true }"

requirements-completed: [AUTHOR-01, AUTHOR-02]

coverage:
  - id: C1
    description: "Páginas de autor para Ibraim Zayed y Verónica Romero creadas en Payload CMS"
    requirement: "AUTHOR-01"
    verification:
      - kind: automated_ui
        ref: "Documentos persistidos en tabla authors de Neon DB y validados vía findAuthorBySlug"
        status: pass
    human_judgment: false
  - id: C2
    description: "Redirecciones 301 agregadas a la lista de Cloudflare para ambos autores"
    requirement: "AUTHOR-02"
    verification:
      - kind: automated_ui
        ref: "Verificadas líneas en redirects-phase33-cloudflare.csv y sus variantes"
        status: pass
    human_judgment: false
---

# Summary: Phase 37 — Páginas de autor faltantes

## Work Done

1. **Seed en Neon Postgres (Task 1):**
   - Creado y ejecutado `aprendoclub/scripts/seed-autores-faltantes.ts`.
   - Registrados en la colección `authors`:
     - **Ibraim Zayed** (`slug: "ibraim-zayed"`):
       - Rol: "SEO Coach y Community Builder"
       - Bio: "Coach de SEO y creador de comunidad. Ha trabajado con 6 clientes en Estados Unidos y en dos agencias. Diseña estrategias para posicionar marcas en buscadores y redes."
       - Avatar: Media ID 9 (`ibraim.avif`)
     - **Verónica Romero** (`slug: "veronica-romero"`):
       - Rol: "SEO Manager"
       - Bio: "Content Manager con amplia experiencia en crecimiento orgánico. Ha trabajado con clientes como AMBL, Storybook y Papora con resultados destacados."
       - Avatar: Media ID 11 (`veronica.avif`)

2. **Redirecciones 301 de Cloudflare (Task 2):**
   - Agregadas las URLs de autor de `aprendoseo.com` a los 3 archivos CSV en `.planning/deliverables/v1.8/`:
     - `https://www.aprendoseo.com/autor/ibraim-zayed` $\rightarrow$ `https://www.aprendoclub.com/autor/ibraim-zayed`
     - `https://www.aprendoseo.com/autor/veronica-romero` $\rightarrow$ `https://www.aprendoclub.com/autor/veronica-romero`

3. **Verificación Automatizada (Task 3):**
   - TypeScript `npx tsc --noEmit` completado con 0 errores.
   - Ejecutada prueba con `findAuthorBySlug` resolviendo exitosamente ambos autores con sus media URLs y atributos.
