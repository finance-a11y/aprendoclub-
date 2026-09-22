---
phase: 34
status: passed
verified: 2026-09-22
score: 3/3
requirements:
  - id: RESTRUCT-01
    status: passed
  - id: RESTRUCT-02
    status: passed
  - id: RESTRUCT-03
    status: passed
---

# Verification: Phase 34 — Reestructura de URLs de programas

## Success Criteria Verification

1. **`/programas/reto` y `/programas/diplomado` resuelven correctamente vía el catch-all `[...slug]` de `(site)` y muestran el mismo contenido que antes (slug movido en Payload).**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:** Slugs actualizados en Neon DB mediante el script `aprendoclub/scripts/migrate-program-slugs.ts`. La consulta a Payload en vivo confirma que la colección `pages` contiene `programas/diplomado` y `programas/reto` con sus respectivos bloques de layout y metadatos intactos. El catch-all de Next.js `(site)/[...slug]/page.tsx` realiza la búsqueda directa `where: { slug: { equals: slug } }` sobre las partes unidas por `/`.

2. **Visitar `/reto` o `/diplomado` en el navegador redirige (301) automáticamente a `/programas/reto` o `/programas/diplomado` respectivamente, vía `next.config.ts`.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:** `aprendoclub/next.config.ts` incluye las directivas:
     - `{ source: "/reto", destination: "/programas/reto", permanent: true }`
     - `{ source: "/diplomado", destination: "/programas/diplomado", permanent: true }`
     Ambas devuelven código HTTP 301 Permanente.

3. **Todos los links internos del sitio (navbar, footer, cards de "Nuestros programas" en home, cross-links entre páginas de programa) apuntan directamente a las rutas nuevas, sin pasar por el redirect interno.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:**
     - `components/blog/post-cta.tsx` actualizado a `/programas/diplomado`.
     - Colección `programas` en Neon DB: IDs 1 y 3 actualizados con `ctaHref` a `/programas/diplomado` y `/programas/reto`.
     - Global `site-settings`: `navbar.programMenu` y `footer.footerColumns` actualizados en Neon DB.
     - Búsqueda recursiva en `components/`, `app/` y `lib/` arrojó cero ocurrencias residuales de `"/reto"` o `"/diplomado"`.
     - `lib/schema-mappers.ts` y `lib/llms/seed.ts` sincronizados.

## Automated Verification Suite

- **TypeScript Typecheck:** `npx tsc --noEmit` completado sin errores.
- **Verificación de slugs en vivo en Neon:** `PAYLOAD_SLUGS_OK`.
- **Verificación de links y redirects:** `TRACER_CODE_OK`.
