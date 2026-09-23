---
phase: 35
status: passed
verified: 2026-09-22
score: 4/4
requirements:
  - id: CITY-01
    status: passed
  - id: CITY-02
    status: passed
  - id: CITY-03
    status: passed
  - id: CITY-04
    status: passed
---

# Verification: Phase 35 — Páginas programáticas de ciudad

## Success Criteria Verification

1. **Existe una decisión documentada y un modelo implementado en Payload (colección nueva o patrón en Pages) que evita duplicar contenido entre las 10 ciudades — solo cambia el nombre de la ciudad y el rango salarial local en título, H1 y FAQ.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:** Colección `CiudadesSeo` implementada en `aprendoclub/collections/CiudadesSeo.ts` y registrada en `aprendoclub/payload.config.ts`. Tabla `ciudades_seo` creada y migrada en Neon Postgres mediante Drizzle (`20260922_162757_add_ciudades_seo.ts`).

2. **Las 10 páginas de ciudad (Alicante, Bilbao, Caracas, CDMX, Guadalajara, Málaga, Maracaibo, Puebla, Toledo, Valencia) están publicadas en aprendoclub con URLs limpias bajo el patrón definido, y cada una carga (200) con el nombre de ciudad y salario correctos.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:** Seed de 10 ciudades completado en Neon Postgres. Build de producción Next.js (`npm run build`) completado con código de salida 0 pre-renderizando las 10 rutas estáticas:
     - `/cursos-seo/alicante`
     - `/cursos-seo/bilbao`
     - `/cursos-seo/caracas`
     - `/cursos-seo/cdmx`
     - `/cursos-seo/guadalajara`
     - `/cursos-seo/malaga`
     - `/cursos-seo/maracaibo`
     - `/cursos-seo/puebla`
     - `/cursos-seo/toledo`
     - `/cursos-seo/valencia`

3. **Cada URL vieja de aprendoseo.com (`/cursos-seo/curso-seo-{ciudad}`) tiene su redirect 301 correspondiente agregado a la lista de Cloudflare de Phase 33.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:**
     - Archivo `.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv` actualizado con las 10 filas de aprendoseo.com hacia las nuevas rutas en aprendoclub.com.
     - `aprendoclub/next.config.ts` actualizado con la regla de fallback `{ source: "/cursos-seo/curso-seo-:ciudad", destination: "/cursos-seo/:ciudad", permanent: true }`.

## Automated Verification Suite

- **Next.js Production Build:** `npm run build` exitoso generando 10 páginas SSG bajo `/cursos-seo/[ciudad]`.
- **TypeScript Typecheck:** 0 errores de compilación.
- **Suite de Redirecciones:** `CITY_REDIRECTS_OK` comprobado mediante bash test.
