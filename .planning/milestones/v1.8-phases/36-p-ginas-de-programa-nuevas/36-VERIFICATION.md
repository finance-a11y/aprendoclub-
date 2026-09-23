---
phase: 36
status: passed
verified: 2026-09-22
score: 3/3
requirements:
  - id: PROGNEW-01
    status: passed
  - id: PROGNEW-02
    status: passed
  - id: PROGNEW-03
    status: passed
---

# Verification: Phase 36 — Páginas de programa nuevas

## Success Criteria Verification

1. **La página para el Curso SEO RDSS existe y está publicada en aprendoclub (`/programas/curso-seo-rdss`), comunica el contenido relevante del taller de 2 horas de Arianna Lupi con precio $30 USD.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:** Registro en `pages` con slug `programas/curso-seo-rdss` en Neon DB, bloques de Hero, FeatureGrid, FAQAccordion y CTABanner configurados con la propuesta de valor y precio $30 USD.

2. **La página para el Curso Básico de SEO existe y está publicada en aprendoclub (`/programas/curso-basico-de-seo`), comunica los 4 objetivos de aprendizaje y precio $0 / gratis.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:** Registro en `pages` con slug `programas/curso-basico-de-seo` en Neon DB, bloques con los 4 pilares esenciales (Rastreo/Indexación, Keyword Research, SEO On-Page, Google Search Console), testimonios de alumnos y CTABanner con acceso gratuito.

3. **Ambas páginas están registradas en la colección `programas` de Payload para que aparezcan en el catálogo general, y tienen redirects 301 configurados desde sus URLs viejas.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:**
     - Colección `programas` contiene ambos slugs (`curso-seo-rdss`, `curso-basico-de-seo`).
     - `aprendoclub/next.config.ts` redirige `/curso-seo-rdss` y `/curso-basico-de-seo` hacia `/programas/*`.
     - Archivos CSV de Cloudflare en `.planning/deliverables/v1.8/` actualizados con las reglas 301.
     - `aprendoclub/lib/schema-mappers.ts` inyecta structured data JSON-LD `Course` para ambos programas.

## Automated Verification Suite

- **TypeScript Typecheck:** `npx tsc --noEmit` completado con 0 errores.
- **Production Build:** `npm run build` completado exitosamente sin advertencias de generación estática.
- **Database Query:** Verificación en Neon Postgres confirmando la presencia de ambos documentos en `pages` y `programas`.
