---
phase: 38-paginas-sueltas-faltantes
plan: 1
subsystem: content
tags: [legal, contact, glossary, redirects, cloudflare, nextjs]

requires: [33-redirects-301-para-contenido-existente, 34-reestructura-de-urls-de-programas, 36-p-ginas-de-programa-nuevas]
provides:
  - "6 páginas nuevas en colección pages de Payload CMS: contacto, glosario, politica-privacidad, politica-reembolso, aviso-legal y terminos-condiciones"
  - "Redirección 301 de /recursos/guia-seo-para-principiantes/ a /programas/curso-basico-de-seo"
  - "Redirección 301 de /seo-con-ia/evento a /programas/taller-seo-con-ia"
  - "Descarte confirmado de /prensa sin redirección en Cloudflare"
  - "Todos los CSVs de Cloudflare actualizados con las reglas 301 de migración definitiva"
affects: []

actuals:
  tokens: 42000
  tasks: 3
  commits: 1

tech-stack:
  added: []
  patterns: [payload-blocks-page, nextjs-redirects, cloudflare-bulk-redirects]

key-files:
  created:
    - aprendoclub/scripts/seed-paginas-sueltas.ts
  modified:
    - aprendoclub/next.config.ts
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare.csv
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare-noheader.csv
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare-both-domains.csv

key-decisions:
  - "Estructurar las páginas legales, contacto y glosario con bloques nativos (Hero / SectionHeader, FeatureGrid y CtaBanner) para consistencia visual"
  - "Dirigir el tráfico de /recursos/guia-seo-para-principiantes hacia /programas/curso-basico-de-seo (el curso introductorio gratuito)"
  - "Asignar /seo-con-ia/evento directamente hacia /programas/taller-seo-con-ia"
  - "Excluir permanentemente /prensa de los redirects según el criterio de obsolescencia del sheet"

patterns-established:
  - "Páginas institucionales y legales modulares servidas limpiamente por el catch-all [...slug]"

requirements-completed: [MISC-01, MISC-02, MISC-03]

coverage:
  - id: C1
    description: "Crear o localizar en aprendoclub las 6 páginas institucionales y legales con redirect 301"
    requirement: "MISC-01"
    verification:
      - kind: automated_ui
        ref: "Documentos persistidos en la tabla pages de Neon DB y reglas 301 añadidas a Cloudflare y next.config.ts"
        status: pass
    human_judgment: false
  - id: C2
    description: "Confirmar y redirigir /seo-con-ia/evento a /programas/taller-seo-con-ia"
    requirement: "MISC-02"
    verification:
      - kind: automated_ui
        ref: "Regla 301 en CSVs de Cloudflare y en next.config.ts"
        status: pass
    human_judgment: false
  - id: C3
    description: "Descartar /prensa de aprendoseo.com sin redirect"
    requirement: "MISC-03"
    verification:
      - kind: automated_ui
        ref: "Ausencia de /prensa verificada en los CSVs de Cloudflare"
        status: pass
    human_judgment: false
---

# Summary: Phase 38 — Páginas sueltas faltantes

## Work Done

1. **Páginas en Payload CMS (Neon DB) (Task 1):**
   - Creado y ejecutado `aprendoclub/scripts/seed-paginas-sueltas.ts`.
   - Creadas las 6 páginas en la colección `pages`:
     - `/contacto`: Hero con propuesta de valor, FeatureGrid con 3 canales de atención (WhatsApp, Email hola@aprendoclub.com, Asesoría 1 a 1), CTABanner hacia programas.
     - `/glosario`: Hero, FeatureGrid con 6 términos esenciales (Search Intent, EEAT, AIO, Crawl Budget, Backlinks, Canonical), CTABanner hacia el Diplomado.
     - `/politica-privacidad`: SectionHeader, FeatureGrid con 6 cláusulas de transparencia y derechos ARCO, CTABanner hacia contacto.
     - `/politica-reembolso`: SectionHeader, FeatureGrid con 4 puntos de garantía de satisfacción y plazos, CTABanner hacia testimonios.
     - `/aviso-legal`: SectionHeader, FeatureGrid con 4 secciones de propiedad intelectual y titularidad, CTABanner hacia quiénes somos.
     - `/terminos-condiciones`: SectionHeader, FeatureGrid con 4 cláusulas de licencias y normas del campus, CTABanner hacia programas.

2. **Configuración de Redirecciones 301 y Exclusiones (Task 2):**
   - Actualizado `aprendoclub/next.config.ts`:
     - `{ source: "/recursos/guia-seo-para-principiantes", destination: "/programas/curso-basico-de-seo", permanent: true }`
     - `{ source: "/seo-con-ia/evento", destination: "/programas/taller-seo-con-ia", permanent: true }`
   - Agregadas las 8 reglas 301 a todos los archivos CSV de Cloudflare en `.planning/deliverables/v1.8/`:
     - `/contacto` $\rightarrow$ `/contacto`
     - `/glosario` $\rightarrow$ `/glosario`
     - `/politica-privacidad` $\rightarrow$ `/politica-privacidad`
     - `/politica-reembolso` $\rightarrow$ `/politica-reembolso`
     - `/aviso-legal` $\rightarrow$ `/aviso-legal`
     - `/terminos-condiciones` $\rightarrow$ `/terminos-condiciones`
     - `/recursos/guia-seo-para-principiantes/` $\rightarrow$ `/programas/curso-basico-de-seo`
     - `/seo-con-ia/evento` $\rightarrow$ `/programas/taller-seo-con-ia`
   - Verificada la ausencia total de `/prensa` en las listas de redirección.

3. **Verificación de Calidad y Compilación (Task 3):**
   - TypeScript `npx tsc --noEmit` completado con 0 errores.
   - `npm run build` ejecutado exitosamente generando el bundle de producción y prerenderizado sin advertencias.
