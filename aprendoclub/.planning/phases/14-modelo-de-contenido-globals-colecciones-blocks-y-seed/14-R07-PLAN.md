---
phase: 14-modelo-de-contenido-globals-colecciones-blocks-y-seed
plan: R07
type: execute
wave: 7
depends_on: [14-R06]
files_modified:
  - scripts/seed/pages.ts
  - scripts/seed/globals.ts
  - scripts/seed.ts
autonomous: false
requirements: [MIG-01, SCH-01]
user_setup: []

must_haves:
  truths:
    - "El seed crea un documento Pages por cada una de las 7 páginas actuales, con su layout de bloques en el orden actual, poblado desde content/*.ts"
    - "El seed es idempotente: upsert por slug (re-correrlo no duplica páginas)"
    - "El seed de site-settings + las 5 colecciones se conserva intacto"
    - "En /admin se puede crear una página nueva, agregar/reordenar/quitar bloques y editar su SEO"
    - "npm run build < /dev/null imprime EXIT=0"
  artifacts:
    - path: "scripts/seed/pages.ts"
      provides: "seedPages() que crea las 7 Pages con layout de bloques"
      contains: "collection: 'pages'"
    - path: "scripts/seed.ts"
      provides: "Orquestador que llama seedPages tras collections/site-settings"
      contains: "seedPages"
  key_links:
    - from: "scripts/seed/pages.ts"
      to: "collection pages"
      via: "upsert por slug"
      pattern: "slug"
    - from: "scripts/seed.ts"
      to: "scripts/seed/pages.ts"
      via: "import + llamada seedPages"
      pattern: "seedPages"
---

<objective>
Revisar el seed para que cree UN documento `Pages` por cada página actual (home, quienes-somos, testimonios, programas, diplomado, reto, taller-seo-con-ia), con su `layout` de bloques en el orden actual, poblado desde content/*.ts, idempotente por slug. Conservar intacto el seed de site-settings + las 5 colecciones. Correr el pipeline completo, cerrar con build verde, y verificar la capacidad del page-builder en /admin.

Purpose: MIG-01 revisado — la fuente de seed pasa de 7 page-globals (eliminados en R02) a documentos Pages de bloques. Reusa la misma lógica de shaping de datos que ya existe en scripts/seed/globals.ts, envolviendo cada sección en un bloque con su blockType. NO cutover: el sitio sigue leyendo content/*.ts; estas Pages solo viven en Payload.

Output: scripts/seed/pages.ts + globals.ts recortado + orquestador actualizado + pipeline corrido + verificación en admin.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-REWORK-CONTEXT.md
@scripts/seed.ts
@scripts/seed/globals.ts
@scripts/seed/collections.ts
@payload-types.ts

<interfaces>
scripts/seed/globals.ts YA contiene la lógica de shaping de datos por sección (hero, problema, curriculum, etc.) leyendo content/*.ts y resolviendo media/relationships vía mediaMap y CollectionMaps. R07 REUSA esas mismas expresiones, envolviéndolas en objetos de bloque { blockType, ...campos }.

CollectionMaps (scripts/seed/collections.ts): { testimonios, testimoniosFeatured, clientes, programas, teamMembers, faq }.
Helpers ya definidos en globals.ts: mediaId(mediaMap, path, label), idsFor(map, names, label).

Orquestador actual (scripts/seed.ts): getPayload -> seedMedia -> seedCollections -> seedGlobals. Idempotente.

Mapa sección(global) -> blockType (según inventario de R01):
  Home: hero->heroHome, problema->featureGrid, beneficios->featureGrid, programas->programGridRef,
        pricing->pricing, instructor->instructor, testimonios->testimonialRef, logos->logosRef,
        faq->faqRef, ctaFinal->ctaBanner, stickyCta->stickyCta
  Diplomado: hero->hero, origin->featureGrid, audience->audience, methodology->featureGrid,
        curriculum->curriculum16Semanas, howItWorks->howItWorks, team->diplomadoTeam,
        benefits->diplomadoBenefits, pricing->diplomadoPricing, faq->faqRef, ctaFinal->ctaBanner,
        relatedLinks->relatedLinks   (courseMeta NO va como bloque: es JSON-LD, Phase 17)
  Reto: urgencia->barraUrgencia, hero->retoHero, razonNoEscalas->razonNoEscalas, mentora->mentora,
        agenda->agenda, comparacion->comparacion, incluye->incluye, premios->premios,
        pricing->retoPricing, ganadores->ganadores, faq->faqRef, ctaFinal->ctaBanner
  Quienes-somos: hero->sectionHeader, historia->historia, fundadora->fundadora, equipo->teamGridRef,
        metodologia->metodologia, stats->stats, ctaFinal->ctaBanner
  Testimonios: hero->sectionHeader, (gridTitulo+grid)->testimonialRef, logos->logosRef,
        (reto cabecera + retoGaleria)->retoGaleria, cta->ctaBanner
  Programas-hub: hero->sectionHeader, programas->programGridRef, ctaFinal->ctaBanner, relatedLinks->relatedLinks
  Taller: hero->tallerHero, incluye->tallerIncluye, paraQuien->tallerParaQuien, (precio+cta)->tallerPricing

Slugs de Pages: 'home', 'quienes-somos', 'testimonios', 'programas', 'diplomado', 'reto',
  'programas/taller-seo-con-ia'.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: scripts/seed/pages.ts — 7 Pages con layout de bloques</name>
  <files>scripts/seed/pages.ts</files>
  <action>
Crear `export async function seedPages(payload, mediaMap, maps: CollectionMaps): Promise<void>`.

Para cada una de las 7 páginas, construir un array `layout` de bloques en el ORDEN actual de la página (usar el orden del componente de página real; para home, el orden de app/(frontend)/(site)/page.tsx: hero, problema, beneficios, programas, pricing, testimonios, instructor, faq, cta, sticky). Cada bloque es `{ blockType: '<slug>', ...camposDeLaSeccion }` reusando EXACTAMENTE las expresiones de shaping ya presentes en scripts/seed/globals.ts (mismos valores de content/*.ts, mismos mediaId()/idsFor()).

- Cada campo `boton`/`cta`/link mantiene el shape { label, href } igual que hoy.
- Los bloques de referencia (programGridRef, testimonialRef, teamGridRef, faqRef, logosRef) llevan `items: [ids]` desde los maps, igual que los globals.
- ctaBanner del reto: mapear { titulo, botonLabel, botonHref } a { titulo, boton:{ label:botonLabel, href:botonHref } }.
- retoGaleria (testimonios): fusionar la cabecera (testimoniosReto.eyebrow/titulo/texto) + retoGaleria (ids de imágenes) en un solo bloque { blockType:'retoGaleria', eyebrow, titulo, texto, imagenes:[ids] }.
- courseMeta del diplomado: NO incluir (Phase 17).

Upsert idempotente por slug: `find({ collection:'pages', where:{ slug:{ equals } }, limit:1 })`; si existe -> `update({ collection:'pages', id, data:{ title, slug, layout } })`; si no -> `create`. Usar el mismo patrón `any` que upsertByField para evitar fricción de tipos de unión. `title` legible por página (ej. 'Home', 'Quiénes somos', 'Reto 7 días', etc.). Loguear un resumen (`[seed:pages] <slug>: <n> bloques`).

Reutilizar mediaId/idsFor: exportarlos desde globals.ts o duplicar los helpers pequeños en pages.ts (preferir importar para no divergir).
  </action>
  <verify>
    <automated>grep -q "collection: 'pages'" scripts/seed/pages.ts && grep -q "seedPages" scripts/seed/pages.ts && grep -q "blockType" scripts/seed/pages.ts && echo OK</automated>
  </verify>
  <done>seedPages construye las 7 Pages con layout de bloques en orden, upsert por slug, reusando el shaping de content/*.ts.</done>
</task>

<task type="auto">
  <name>Task 2: Recortar globals.ts a site-settings + cablear orquestador</name>
  <files>scripts/seed/globals.ts, scripts/seed.ts</files>
  <action>
- scripts/seed/globals.ts: ELIMINAR las 7 llamadas `updateGlobal` de globals de página (programas-hub, taller-seo-con-ia, quienes-somos, testimonios-page, reto, home, diplomado) — esos globals ya no existen (R02) y correrlas ahora falla. CONSERVAR únicamente el bloque `updateGlobal({ slug: 'site-settings', ... })`. Limpiar los imports de content que queden sin uso (mantener los que use site-settings). Exportar mediaId/idsFor si pages.ts los importa.
- scripts/seed.ts: importar `seedPages` y llamarlo tras seedGlobals: getPayload -> seedMedia -> seedCollections -> seedGlobals(site-settings) -> seedPages(payload, mediaMap, collectionMaps). Actualizar los logs de pasos (1/4..4/4). Mantener top-level await, try/catch y payload.destroy() existentes.
  </action>
  <verify>
    <automated>grep -c "updateGlobal" scripts/seed/globals.ts | grep -qx 1 && grep -q "seedPages" scripts/seed.ts && ! grep -q "slug: 'home'" scripts/seed/globals.ts && echo OK</automated>
  </verify>
  <done>globals.ts solo seedea site-settings; seed.ts orquesta seedPages; no quedan referencias a los globals de página eliminados.</done>
</task>

<task type="auto">
  <name>Task 3: Pipeline + seed + build verde</name>
  <files>payload-types.ts</files>
  <action>
Correr el pipeline no-interactivo (push:false; NO reactivar push; NO reiniciar el next dev de Juan; NO imprimir valores de env):
1. `npx payload migrate` (aplica cualquier migración pendiente; idempotente).
2. `npx payload generate:types` y `npx payload generate:importmap`.
3. `npm run seed` — debe poblar Media + 5 colecciones + site-settings + 7 Pages sin errores. Verificar en el log `[seed:pages]` con 7 slugs y conteo de bloques por página.
4. Re-correr `npm run seed` una segunda vez y confirmar que NO duplica Pages (idempotencia por slug): el conteo de documentos en `pages` sigue en 7.
5. Cerrar con `npm run build < /dev/null; echo "EXIT=$?"` — EXIT=0, sin enmascarar el código de salida con pipes.
  </action>
  <verify>
    <automated>npm run seed 2>&1 | grep -q "seed:pages"; npm run build < /dev/null; echo "EXIT=$?"</automated>
  </verify>
  <done>Seed crea 7 Pages (idempotente en la 2a corrida); build imprime EXIT=0.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 4: Verificar capacidad del page-builder en /admin</name>
  <action>
Verificación humana de la capacidad del page-builder tras el seed. Construido: colección Pages sembrada con las 7 páginas actuales como documentos de bloques reordenables, con tab SEO por página; los 7 page-globals eliminados; site-settings permanece; el sitio público sigue renderizando desde content/*.ts (NO cutover); ruta catch-all que sirve Pages con slug no reservado. Ejecutar los pasos de how-to-verify y reportar.
  </action>
  <what-built>
Colección Pages (page-builder) sembrada con las 7 páginas actuales como documentos de bloques reordenables, con tab SEO por página. Los 7 page-globals fueron eliminados; site-settings permanece. El sitio público sigue renderizando desde content/*.ts (NO cutover); existe además una ruta catch-all que sirve Pages con slug no reservado.
  </what-built>
  <how-to-verify>
1. Abrir /admin. En el grupo "Contenido" confirmar la colección "Pages" con 7 documentos (Home, Quiénes somos, Testimonios, Programas, Diplomado, Reto 7 días, Taller SEO con IA).
2. Abrir el documento "Diplomado": confirmar que el campo Contenido muestra bloques (Hero, Feature Grid, Temario 16 semanas, etc.) que se pueden reordenar (arrastrar), quitar y agregar (botón Add Block muestra los 40 tipos).
3. Confirmar que existe un tab SEO con meta title/description/image editables.
4. Crear una página nueva: title "Prueba", slug "prueba", agregar 2-3 bloques cualquiera, guardar. Visitar http://localhost:3000/prueba y confirmar que renderiza esos bloques (la ruta catch-all la sirve por no ser slug reservado).
5. Confirmar que las 7 rutas estáticas siguen intactas visualmente: /, /quienes-somos, /testimonios, /programas, /programas/taller-seo-con-ia, /reto, /diplomado (sin cambios respecto a hoy).
6. Los globals de página (Home/Diplomado/etc.) YA NO aparecen en /admin; solo queda "Site Settings".
  </how-to-verify>
  <resume-signal>Escribir "approved" o describir qué falla (bloque no reordenable, SEO ausente, página nueva no renderiza, regresión visual en una ruta estática).</resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| seed script -> Neon Postgres | escritura masiva por Local API sin auth de admin (proceso local confiable) |
| /admin editor -> Pages | contenido editorial (admin autenticado) |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-14R-15 | Tampering | re-corrida del seed | mitigate | upsert por slug (idempotente); Task 3 verifica que no duplica en la 2a corrida |
| T-14R-16 | Repudiation | seed sin trazas | mitigate | logs `[seed:pages] <slug>: <n> bloques` por página |
| T-14R-17 | Information Disclosure | env DATABASE_URI/secrets | mitigate | no imprimir valores de env en logs |
| T-14R-SC | Tampering | instalaciones npm | accept | R07 no instala paquetes nuevos |
</threat_model>

<verification>
- `npm run seed` crea 7 Pages; 2a corrida no duplica (idempotente).
- `npm run build < /dev/null` imprime EXIT=0.
- Checkpoint humano confirma: crear página + reordenar/agregar/quitar bloques + editar SEO en /admin, y ninguna regresión en las rutas estáticas.
</verification>

<success_criteria>
Seed revisado poblando 7 Pages de bloques (idempotente) + site-settings/colecciones intactos; build verde; capacidad de page-builder verificada en /admin; sitio actual sin regresión.
</success_criteria>

<output>
Crear `.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-R07-SUMMARY.md`. Documentar el conteo de bloques por Page y confirmar idempotencia + build EXIT=0.
</output>
