---
phase: 33
status: passed
verified: 2026-09-22
score: 4/4
requirements:
  - id: REDIR-01
    status: passed
  - id: REDIR-02
    status: passed
  - id: REDIR-03
    status: passed
  - id: REDIR-04
    status: passed
---

# Verification: Phase 33 — Redirects 301 para contenido existente

## Success Criteria Verification

1. **Existe un archivo CSV (formato Cloudflare Bulk Redirects: source URL, target URL, status code 301, preserve query string) con ~78 filas cubriendo los 64 blog posts, los 3 autores existentes, los 2 programas existentes y las URLs sueltas del sheet cuyo destino ya existe hoy en aprendoclub.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:** Archivo `.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv` generado con 81 filas de redirección (82 líneas totales con encabezado `source_url,target_url,status_code,preserve_query_string`). Todas con `status_code` 301 y `preserve_query_string` true. Cero duplicados en `source_url`.

2. **Las filas de `/reto` y `/diplomado` apuntan a `/programas/reto` y `/programas/diplomado` (URLs finales, post-reestructura de Phase 34), y las 2 filas de merge (`/certificaciones`, `/academia-seo`) apuntan a la página de autor de Arianna y a `/quienes-somos` respectivamente, como redirect simple sin fusión de contenido.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:**
     - `https://www.aprendoseo.com/reto` → `https://www.aprendoclub.com/programas/reto`
     - `https://www.aprendoseo.com/diplomado` → `https://www.aprendoclub.com/programas/diplomado`
     - `https://www.aprendoseo.com/certificaciones` → `https://www.aprendoclub.com/autor/arianna-lupi`
     - `https://www.aprendoseo.com/academia-seo` → `https://www.aprendoclub.com/quienes-somos`
     - Validado automáticamente que no existen URLs huérfanas sin prefijo `/programas/`.

3. **Cada URL destino de la lista fue verificada contra la DB de Payload en vivo (no contra el sheet a ciegas); cualquier fila desactualizada respecto al código actual quedó corregida o descartada, con nota de qué cambió.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:** Conexión en vivo a Neon Postgres mediante `npx payload run scripts/query-payload-slugs.ts`. Los 64 blogposts y 3 autores coincidieron al 100% con los slugs reales en base de datos. Se documentaron los ajustes de Reto y Diplomado.

4. **El archivo está en un formato y ubicación que Juan puede importar directamente en el dashboard de Cloudflare del dominio aprendoseo.com, sin edición manual adicional.**
   - **Resultado:** ✅ **PASSED**
   - **Evidencia:** CSV entregado en `.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv`, formateado para Cloudflare Bulk Redirects. Se generó `.planning/deliverables/v1.8/README-cloudflare-import.md` con la guía detallada de importación en español neutro y la advertencia sobre Phase 34.

## Automated Verification Suite

Todas las pruebas automatizadas pasaron con código de salida 0:
- Test suite del CSV (12 aserciones): `CSV_VALID`
- Test suite del README (5 aserciones): `README_VALID`
- Script de consulta Payload: `TRACER_OK`
