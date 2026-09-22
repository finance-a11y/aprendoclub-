# Phase 33: Redirects 301 para contenido existente - Context

**Gathered:** 2026-09-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Generar una lista CSV de redirects 301 (aprendoseo.com → aprendoclub.com), formato Cloudflare Bulk Redirects, para todo el contenido del sheet de mapeo de Juan cuyo destino ya existe hoy en aprendoclub (o existirá en Phase 34, para las URLs finales de `/programas/reto` y `/programas/diplomado`). No se aplica nada dentro del repo de aprendoclub — el redirect corre en Cloudflare, sobre el dominio aprendoseo.com.

</domain>

<decisions>
## Implementation Decisions

### Fuente de datos

- El sheet de origen ya fue leído y volcado completo por el orquestador de `/gsd-new-milestone` en esta sesión: `https://docs.google.com/spreadsheets/d/1Iuy2kJE0Og_0ZUuk1gfSLTcmXkP1wBXfNvy0eVAHpzw` (gid 626359358), 124 filas con datos.
- Se cruzó contra la DB de Payload en vivo (colecciones `pages`, `authors`, `categories`, `blogposts`) confirmando: 5 categorías de blog (`seo-basico`, `empieza-en-seo`, `seo-onpage`, `seo-tecnico`, `herramientas-seo`) coinciden 1:1 con los clusters del sheet; 64 blog posts existen con los mismos slugs que las filas de redirect; 3 autores existen (`arianna-lupi`, `diana-rodriguez`, `juan-angulo`); páginas de programa (`diplomado`, `reto`, `programas/taller-seo-con-ia`) existen.
- El plan-phase de esta fase debe releer el sheet en vivo (no asumir que los datos de esta sesión siguen frescos) y volver a verificar contra Payload antes de generar el CSV final — el sheet puede cambiar entre sesiones.

### Filas que entran en el CSV de esta fase

- Las ~78 filas "Aplicar redirección 301" cuyo destino existe hoy en Payload (blog posts, autores, 2 programas, URLs sueltas de `/testimonios/`, `/seo-basico/`, `/seo-onpage/`, `/aprende`→`blog`, etc.).
- Las 2 filas con nota de "merge" (`/certificaciones` → autor Arianna, `/academia-seo` → `/quienes-somos`) como redirect simple, SIN fusionar contenido (decisión explícita de Juan: el merge de copy queda para una fase futura).
- Las filas de `/reto` y `/diplomado` apuntan a `/programas/reto` y `/programas/diplomado` — las URLs FINALES post-reestructura de Phase 34, no a las URLs actuales (`/reto`, `/diplomado`). Phase 34 depende de esta fase justamente por esto: el CSV ya asume el resultado de Phase 34.
- `/prensa` NO entra (fila "eliminar, sin valor" en el sheet).
- `/seo-con-ia/evento` (fila "Página para ads") queda fuera de esta fase — se resuelve en Phase 38 (MISC-02), no hay destino confirmado todavía.
- Las 29 filas "Crear página nueva y redirigir" (ciudades, programas nuevos, autores faltantes, páginas sueltas) NO entran en esta fase — sus redirects se agregan en las fases 35-38 cuando esas páginas existan. Este CSV de Phase 33 es la base; las fases siguientes lo amplían, no lo reemplazan.

### Formato de entrega

- CSV con columnas: `source_url`, `target_url`, `status_code` (301), `preserve_query_string` (true) — formato de import directo de Cloudflare Bulk Redirects (Rules → Redirect Rules → Bulk Redirects, "Import list").
- Archivo entregado en un path visible del repo (ej. `.planning/deliverables/` o similar), no en `scripts/` — no es código ejecutable, es un artefacto de entrega para Juan.
- `source_url` con dominio completo (`https://www.aprendoseo.com/...`), `target_url` con dominio completo (`https://www.aprendoclub.com/...`) — Cloudflare Bulk Redirects trabaja con URLs absolutas.

### Claude's Discretion

- Nombre exacto del archivo y carpeta de entrega.
- Orden de las filas en el CSV (agrupar por cluster/categoría, como está en el sheet original, es razonable).
- Si alguna fila del sheet está desactualizada respecto al código actual (ej. un slug que cambió), corregirla o descartarla con una nota — usar criterio, documentar la corrección en el SUMMARY de la fase.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- Colecciones de Payload ya confirmadas en esta sesión: `pages` (slugs: `programas/taller-seo-con-ia`, `reto`, `diplomado`, `programas`, `testimonios`, `quienes-somos`, `home`), `authors` (`juan-angulo`, `diana-rodriguez`, `arianna-lupi`), `categories` (`empieza-en-seo`, `herramientas-seo`, `seo-onpage`, `seo-tecnico`, `seo-basico`), `blogposts` (64 posts, slug + categoría cada uno).
- Ruta del blog: `/{categoria}/{slug}` (flat, confirmado contra los 64 posts).
- Ruta de autor: `/autor/{slug}`.

### Established Patterns
- El catch-all `(site)/[...slug]` resuelve las páginas de Payload por slug (incluye slugs con `/` para rutas anidadas, ej. `programas/taller-seo-con-ia`).
- `next.config.ts` ya tiene un `redirects()` con un caso (`/home` → `/`) — patrón a seguir SI se necesitara algún redirect interno en esta fase (no debería, ese es el trabajo de Phase 34).

### Integration Points
- Ninguno dentro del código de aprendoclub para esta fase — el output es un artefacto externo (CSV) para Cloudflare, no un cambio de código.

</code_context>

<specifics>
## Specific Ideas

- Juan pidió explícitamente: "ahorita vamos a darle prioridad a las páginas que existen en aprendoclub y hacer la lista de redirecciones para importar en cloudflare" — esta fase es exactamente eso, nada más.
- El plan-phase debe re-leer el sheet en vivo (vía WebFetch al export CSV de Google Sheets) para no trabajar con datos potencialmente stale de esta sesión.

</specifics>

<deferred>
## Deferred Ideas

- Merge de contenido de `/certificaciones` y `/academia-seo` — explícitamente diferido por Juan, no entra en ninguna fase de v1.8 todavía (queda en Out of Scope de REQUIREMENTS.md).
- Aplicación real del CSV en el dashboard de Cloudflare — acción manual de Juan, fuera del alcance de esta fase (esta fase solo entrega el archivo).

</deferred>
