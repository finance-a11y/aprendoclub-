---
phase: 14-modelo-de-contenido-globals-colecciones-blocks-y-seed
plan: R02
type: execute
wave: 2
depends_on: [14-R01]
files_modified:
  - collections/Pages.ts
  - payload.config.ts
  - globals/Home.ts
  - globals/QuienesSomos.ts
  - globals/TestimoniosPage.ts
  - globals/ProgramasHub.ts
  - globals/Taller.ts
  - globals/Reto.ts
  - globals/Diplomado.ts
  - payload-types.ts
  - migrations/
autonomous: true
requirements: [SCH-01]
user_setup: []

must_haves:
  truths:
    - "Existe una colección Pages con title, slug único y layout (blocks) reordenable/extensible con los 40 bloques disponibles"
    - "Pages tiene tab SEO por página (plugin-seo apunta a 'pages')"
    - "Los 7 globals de página fueron eliminados de la config y del filesystem; SiteSettings se conserva"
    - "La migración dropea las tablas de los 7 globals y crea las tablas de Pages; payload migrate corre no-interactivo"
  artifacts:
    - path: "collections/Pages.ts"
      provides: "Colección page-builder"
      contains: "slug: 'pages'"
    - path: "payload.config.ts"
      provides: "Pages registrada, 7 page-globals removidos, seoPlugin→pages"
      contains: "Pages"
    - path: "payload-types.ts"
      provides: "Tipo Page + interfaces de bloques regenerados"
      contains: "Page"
  key_links:
    - from: "payload.config.ts"
      to: "collections/Pages.ts"
      via: "import + entrada en collections[]"
      pattern: "collections: \\[.*Pages"
    - from: "collections/Pages.ts"
      to: "blocks/index.ts allBlocks"
      via: "layout.blocks = allBlocks"
      pattern: "blocks: allBlocks"
---

<objective>
Crear la colección `Pages` (page-builder), registrarla en payload.config.ts, ELIMINAR los 7 globals de página (config + archivos), reapuntar plugin-seo a `pages`, y correr la migración + regeneración de tipos/importmap. Es la cirugía estructural del pivote.

Purpose: SCH-01 (revisado) — reemplazar los 7 page-globals fijos por una colección de páginas de bloques con SEO por página. `site-settings` permanece como Global. NO cutover: las 7 rutas estáticas siguen leyendo content/*.ts; esta colección solo existe en el admin + DB hasta que R03+ la rendericen y Phases 15-17 hagan el switch.

Output: collections/Pages.ts, payload.config.ts editado, globals de página borrados, migración nueva, payload-types.ts regenerado.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-REWORK-CONTEXT.md
@payload.config.ts
@globals/SiteSettings.ts
@collections/Programas.ts

<interfaces>
De blocks/index.ts (creado en R01):
  export const allBlocks: Block[]   // los 40 bloques (11 genéricos + 29 bespoke), slugs únicos

Config actual relevante (payload.config.ts):
  collections: [Users, Media, Testimonios, ClientesTrabajados, Programas, TeamMembers, Faq]
  globals: [SiteSettings, ProgramasHub, Taller, QuienesSomos, TestimoniosPage, Reto, Home, Diplomado]
  seoPlugin({ collections: [], uploadsCollection: 'media' })
  redirectsPlugin({ collections: ['programas'] })
  db: postgresAdapter({ ..., push: false })   // migrate no-interactivo, NO reactivar push

Scripts (package.json): build = "payload generate:importmap && payload migrate && next build"
  payload run/CLI disponible; DATABASE_URI en env (NO imprimir su valor).
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Colección Pages (title + slug único + layout blocks + SEO)</name>
  <files>collections/Pages.ts</files>
  <action>
Crear collections/Pages.ts exportando `export const Pages: CollectionConfig` (patrón de collections/Programas.ts).

- slug: 'pages'
- admin: { useAsTitle: 'title', group: 'Contenido', defaultColumns: ['title','slug','updatedAt'] }
- access: { read: () => true }  // lectura pública para el render catch-all (R03)
- fields:
  1. title (text, required). label 'Título'.
  2. slug (text, required, unique, index: true). admin.description: "Ruta de la página sin barra inicial. La home usa 'home' (la raíz se cablea en el cutover, Phase 17). Ej: 'nueva-landing', 'promos/verano'." Añadir un hook beforeValidate que normalice: trim + lowercase + quitar barra inicial/final. NO forzar unicidad a mano (unique:true lo hace en DB).
  3. layout (blocks, required). label 'Contenido (bloques)'. Importar `allBlocks` desde '../blocks' y asignar `blocks: allBlocks`. minRows: 0. admin.description: "Agrega, reordena y quita bloques para construir la página."

NO añadir campos SEO manualmente: plugin-seo los inyecta como tab (Task 2 lo apunta a 'pages' con tabbedUI). Exportar también `export default Pages`.
  </action>
  <verify>
    <automated>grep -q "slug: 'pages'" collections/Pages.ts && grep -q "blocks: allBlocks" collections/Pages.ts && grep -q "unique: true" collections/Pages.ts && echo OK</automated>
  </verify>
  <done>collections/Pages.ts define la colección con slug único normalizado y layout=allBlocks reordenable.</done>
</task>

<task type="auto">
  <name>Task 2: Registrar Pages, eliminar 7 page-globals, reapuntar plugins</name>
  <files>payload.config.ts, globals/Home.ts, globals/QuienesSomos.ts, globals/TestimoniosPage.ts, globals/ProgramasHub.ts, globals/Taller.ts, globals/Reto.ts, globals/Diplomado.ts</files>
  <action>
En payload.config.ts:
- Añadir import: `import { Pages } from './collections/Pages'`.
- QUITAR los 7 imports de globals de página: Diplomado, Home, ProgramasHub, QuienesSomos, Reto, Taller, TestimoniosPage. CONSERVAR el import de SiteSettings.
- collections: añadir Pages → `[Users, Media, Testimonios, ClientesTrabajados, Programas, TeamMembers, Faq, Pages]`.
- globals: reducir a `[SiteSettings]` (solo el shell).
- seoPlugin: cambiar a `seoPlugin({ collections: ['pages'], uploadsCollection: 'media', tabbedUI: true })` — esto añade el tab SEO por página (meta title/description/image) requerido por SCH-01.
- redirectsPlugin: ampliar a `redirectsPlugin({ collections: ['programas', 'pages'] })` para que las páginas nuevas puedan tener redirects (per specifics del CONTEXT).
- NO tocar el bloque db (push: false permanece). NO reactivar push. NO imprimir env.

BORRAR del filesystem los 7 archivos de globals de página (dejan de estar referenciados): globals/Home.ts, globals/QuienesSomos.ts, globals/TestimoniosPage.ts, globals/ProgramasHub.ts, globals/Taller.ts, globals/Reto.ts, globals/Diplomado.ts. CONSERVAR globals/SiteSettings.ts. (Los bloques bespoke de R01 ya capturaron sus field-shapes; el seed de R07 repuebla el contenido como documentos Pages.)

Verificar que ningún otro archivo importe los globals borrados (grep). Los componentes del sitio NO los importan (leen content/*.ts) — confirmar.
  </action>
  <verify>
    <automated>test ! -f globals/Home.ts && test ! -f globals/Diplomado.ts && test -f globals/SiteSettings.ts && grep -q "collections: \['pages'\]" payload.config.ts && grep -q "Pages" payload.config.ts && ! grep -q "from './globals/Home'" payload.config.ts && echo OK</automated>
  </verify>
  <done>Pages registrada en collections; globals=[SiteSettings]; los 7 archivos de globals de página borrados; seoPlugin→['pages'] con tabbedUI; redirects incluye 'pages'.</done>
</task>

<task type="auto">
  <name>Task 3: Migración + regeneración de tipos e importmap</name>
  <files>migrations/, payload-types.ts</files>
  <action>
Con la config ya editada, generar y aplicar la migración de schema (crear tablas de `pages`/bloques, dropear las tablas de los 7 globals de página). Comandos (push:false ⇒ no-interactivos):

1. `npx payload migrate:create rework_pages_pagebuilder` — genera el par .ts/.json en migrations/. Revisar que el SQL incluya CREATE de las tablas `pages*` y DROP de las tablas `home`, `quienes_somos`, `testimonios_page`, `programas_hub`, `taller_seo_con_ia`, `reto`, `diplomado` (nombres exactos según cómo Payload nombró los globals; verificar en el .json generado).
2. `npx payload migrate` — aplica contra Neon. Debe correr sin prompt y salir 0.
3. `npx payload generate:types` — regenera payload-types.ts con la interface `Page` + interfaces de los 40 bloques (HeroBlock, Curriculum16SemanasBlock, BarraUrgenciaBlock, etc.).
4. `npx payload generate:importmap` — actualiza el importMap del admin.

Si migrate:create no detecta cambios o falla, revisar que los imports de globals fueron efectivamente removidos de la config. NO editar el SQL a mano salvo para confirmar; NO reactivar push. NO reiniciar el `next dev` de Juan.
  </action>
  <verify>
    <automated>grep -q "Page" payload-types.ts && ls migrations/*rework_pages*.ts >/dev/null 2>&1 && echo OK</automated>
  </verify>
  <done>Migración creada y aplicada (migrate sale 0); payload-types.ts contiene la interface Page y las interfaces de bloques; importmap regenerado.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| config → Neon Postgres | migración altera schema; datos de globals de página se pierden al dropear (recuperables por seed R07) |
| Pages.access.read → público | el render catch-all (R03) leerá páginas sin auth |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-14R-03 | Denial of Service | payload migrate en build | mitigate | push:false ⇒ migrate no-interactivo; no cuelga el build de Vercel |
| T-14R-04 | Tampering | drop de tablas de globals | accept | contenido reconstruible desde content/*.ts vía seed R07; no hay data de usuario |
| T-14R-05 | Information Disclosure | Pages.access.read público | mitigate | solo se exponen páginas publicadas de marketing; sin campos sensibles |
</threat_model>

<verification>
- `npx payload migrate` sale 0 (no interactivo).
- payload-types.ts tiene `interface Page` y las interfaces de los bloques bespoke.
- globals/ solo contiene SiteSettings.ts.
- `grep -rn "from './globals/\(Home\|Diplomado\|Reto\|Taller\|QuienesSomos\|TestimoniosPage\|ProgramasHub\)'" .` no devuelve nada.
</verification>

<success_criteria>
Colección Pages operativa en el admin con blocks reordenables + tab SEO; 7 page-globals eliminados; migración aplicada; tipos regenerados. El sitio sigue compilando/renderizando desde content/*.ts (NO cutover).
</success_criteria>

<output>
Crear `.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-R02-SUMMARY.md`. Documentar el nombre exacto de la migración y las tablas dropeadas/creadas.
</output>
