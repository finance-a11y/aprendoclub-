---
quick_id: 260923-gdf
phase: quick-260923-gdf
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - aprendoclub/app/(frontend)/(site)/layout.tsx
  - aprendoclub/components/blocks/render/HeroHome.tsx
  - aprendoclub/components/blocks/render/TallerHero.tsx
  - aprendoclub/lib/schema-mappers.ts
  - aprendoclub/lib/seo/fallbacks.ts
  - aprendoclub/lib/llms/seed.ts
  - "aprendoclub/app/(frontend)/(site)/cursos-seo/[ciudad]/page.tsx"
  - aprendoclub/app/(frontend)/links/page.tsx
  - aprendoclub/scripts/seed/seed-data/home.ts
  - aprendoclub/scripts/seed/seed-data/quienes-somos.ts
  - aprendoclub/scripts/seed/seed-data/diplomado.ts
  - aprendoclub/scripts/seed/media.ts
  - aprendoclub/scripts/rebuild-taller-page.ts
  - aprendoclub/scripts/seed-paginas-sueltas.ts
  - aprendoclub/scripts/update-diplomado-copy-live.ts
  - aprendoclub/collections/Programas.ts
  - aprendoclub/migrations/index.ts
  - aprendoclub/payload-types.ts
  - "aprendoclub/app/(frontend)/(site)/[...slug]/page.tsx"
  - aprendoclub/components/blocks/render/ProgramGridRef.tsx
  - aprendoclub/scripts/set-reto-coming-soon.ts
autonomous: true
requirements: [QUICK-01, QUICK-02, QUICK-03, QUICK-04, QUICK-05]

estimate:
  tokens: 75000
  raw_tokens: 75000
  tasks: 3
  confidence: low

must_haves:
  truths:
    - "En viewport mobile, la fila de avatares de estudiantes del hero del home ya no se superpone visualmente con el indicador de scroll animado."
    - "Toda página servida por el layout compartido (home, catch-all [...slug], cursos-seo) muestra su primer bloque de contenido completamente debajo del navbar fijo de 72px, en mobile y desktop, sin doble espaciado en las páginas que ya compensaban el navbar a mano."
    - "El copy de conteo de estudiantes en el sitio (home, quienes-somos, taller, diplomado, páginas sueltas) usa '10,000+ estudiantes' como cifra general y una cifra de '3,000 estudiantes' asociada al Diplomado donde antes había números viejos (2,000 / 2.000 / 750)."
    - "El producto Diplomado se llama exactamente 'Diplomado SEO + AIO' en cualquier referencia hardcodeada del código fuente y en el registro correspondiente de la colección programas de Payload (Neon)."
    - "La colección programas de Payload tiene el campo booleano comingSoon; el registro del Reto 7 días lo tiene en true; su página /programas/reto no ofrece ningún botón de inscripción funcional y muestra una insignia 'Próximamente'; su card en la sección 'Nuestros programas' (home y /programas) también muestra esa insignia con el botón de CTA deshabilitado."
  artifacts:
    - "aprendoclub/app/(frontend)/(site)/layout.tsx"
    - "aprendoclub/components/blocks/render/HeroHome.tsx"
    - "aprendoclub/lib/schema-mappers.ts"
    - "aprendoclub/scripts/update-diplomado-copy-live.ts"
    - "aprendoclub/collections/Programas.ts"
    - "aprendoclub/migrations/*_add_programas_coming_soon.ts"
    - "aprendoclub/scripts/set-reto-coming-soon.ts"
  key_links:
    - "programas.comingSoon (Payload) ↔ components/blocks/render/ProgramGridRef.tsx (insignia + botón deshabilitado en la card)"
    - "programas.comingSoon (Payload, matcheado por ctaHref === /slug) ↔ app/(frontend)/(site)/[...slug]/page.tsx (banner + neutralización de ctas/boton del layout de la página)"
    - "app/(frontend)/(site)/layout.tsx pt-[72px] ↔ components/blocks/render/HeroHome.tsx -mt-[72px] (el home mantiene su hero full-bleed mientras el resto de páginas gana el offset)"
---

<objective>
Cerrar 5 pendientes puntuales de aprendoclub reportados por Juan: (1) el overlap mobile entre los avatares de estudiantes y el indicador de scroll del hero del home, (2) la falta sistemática de padding-top contra el navbar fijo en varias páginas, (3) el copy de cifras de estudiantes desactualizado, (4) el nombre del Diplomado inconsistente en código y en Payload, y (5) un campo comingSoon reutilizable en la colección programas, aplicado ya al Reto de 7 días con bloqueo de inscripción e insignia visible.

Purpose: eliminar bugs visuales de mobile que afectan la primera impresión del home, corregir cifras y naming desactualizados que dañan la credibilidad de la marca, y dar a Juan una palanca reutilizable en /admin para pausar cualquier programa sin tocar código.
Output: fixes de CSS/layout en el home y el layout compartido; copy corregido en código fuente y en el contenido vivo de Payload (Neon); campo comingSoon migrado, tipado y aplicado al Reto con gating de UI.
</objective>

<execution_context>
@~/.claude/gsd-core/workflows/execute-plan.md
@~/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/STATE.md
@aprendoclub/app/(frontend)/(site)/layout.tsx
@aprendoclub/components/blocks/render/HeroHome.tsx
@aprendoclub/lib/schema-mappers.ts
@aprendoclub/collections/Programas.ts
@aprendoclub/app/(frontend)/(site)/[...slug]/page.tsx
@aprendoclub/components/blocks/render/ProgramGridRef.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix overlap mobile del hero del home (QUICK-01) y padding-top sistemático contra el navbar fijo (QUICK-02)</name>
  <files>aprendoclub/app/(frontend)/(site)/layout.tsx, aprendoclub/components/blocks/render/HeroHome.tsx, aprendoclub/components/blocks/render/TallerHero.tsx</files>
  <action>
    QUICK-01 — Overlap de avatares con el indicador de scroll en `components/blocks/render/HeroHome.tsx`: la sección raíz usa `min-h-dvh` + `flex flex-col items-center justify-center`, y el "Scroll Indicator" final (motion.div con el texto "Scroll" + ChevronDown, animación de rebote en Y) está posicionado `absolute bottom-8 left-1/2` respecto a esa misma sección. Cuando el contenido del hero (badge + h1 + subtítulo + 2 CTAs + fila de avatares "Avatares de estudiantes" + rating) es más alto que el viewport en pantallas mobile angostas, el `justify-center` desborda simétricamente hacia arriba y abajo y el indicador absoluto termina superpuesto sobre la fila de avatares/rating en vez de quedar libre debajo. Corregir ocultando el Scroll Indicator en mobile agregando la clase `hidden` (visible recién desde el breakpoint `sm:` en adelante, ej. `hidden sm:flex` en el motion.div del Scroll Indicator) — el resto de la sección (avatares, badge, CTAs) no se toca. No reescribas la lógica de framer-motion existente, solo la visibilidad responsiva.

    QUICK-02 — Padding-top contra el navbar fijo, de forma sistemática: el navbar (`components/navbar.tsx`) es `fixed top-0 h-[72px] z-50`, transparente hasta hacer scroll. Hoy NINGUNA página reserva esos 72px: en `app/(frontend)/(site)/layout.tsx` el `<main>` solo tiene `scroll-mt-[72px]` (que solo afecta el offset de anclas, no el layout real), así que toda página cuyo primer bloque no sea full-bleed (ej. el bloque genérico `hero` usado en diplomado/ciudades, que solo trae `section-spacing` = 2.75rem/44px en mobile y 4rem/64px en desktop de padding-top) queda parcialmente tapada por el navbar. Ya existe un parche ad hoc e inconsistente: `components/blocks/render/TallerHero.tsx` tiene un `pt-28` agregado a mano que ningún otro hero comparte. Arreglar en el punto compartido, no por página:
    1. En `app/(frontend)/(site)/layout.tsx`, al `<main id="main" className="flex min-h-dvh w-full flex-col scroll-mt-[72px]">` agregar `pt-[72px]` a la lista de clases (mantener `scroll-mt-[72px]`), de forma que TODA página bajo este layout compartido (home, catch-all `[...slug]`, `cursos-seo/[ciudad]`, blog, glosario) arranque su contenido 72px por debajo del tope, debajo del navbar.
    2. Ese `pt-[72px]` rompería el hero full-bleed del home (video de fondo edge-to-edge de `HeroHome.tsx`, pensado para sangrar hasta arriba, detrás del navbar transparente). Compensarlo agregando `-mt-[72px]` a la clase del `<section>` raíz de `components/blocks/render/HeroHome.tsx` (la que hoy es `relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden`), de forma que el home recupere exactamente el mismo look edge-to-edge que tiene hoy.
    3. Quitar el parche ad hoc `pt-28` de la clase del `<section>` en `components/blocks/render/TallerHero.tsx` (queda como `container-padding section-spacing max-w-6xl mx-auto flex flex-col items-center gap-4 text-center`, sin `pt-28`) — con el nuevo `pt-[72px]` del `<main>` compartido más el `section-spacing` propio del bloque, el taller ya tiene clearance de sobra (116px mobile / 136px desktop) y dejar el `pt-28` sumaría espacio en blanco duplicado.
  </action>
  <verify>
    <automated>bash -c '
cd aprendoclub
grep -q "hidden sm:flex" components/blocks/render/HeroHome.tsx || { echo "FAIL_SCROLL_INDICATOR_HIDDEN"; exit 1; }
grep -q "pt-\[72px\]" "app/(frontend)/(site)/layout.tsx" || { echo "FAIL_MAIN_PT72"; exit 1; }
grep -q "\-mt-\[72px\]" components/blocks/render/HeroHome.tsx || { echo "FAIL_HEROHOME_NEGATIVE_MARGIN"; exit 1; }
grep -q "pt-28" components/blocks/render/TallerHero.tsx && { echo "FAIL_TALLERHERO_STALE_PT28"; exit 1; }
npx tsc --noEmit || { echo "FAIL_TSC"; exit 1; }
echo TASK1_OK
'</automated>
  </verify>
  <done>El scroll indicator del home queda oculto en mobile (visible desde sm: en adelante) y ya no se superpone con los avatares; el `<main>` compartido reserva 72px contra el navbar fijo en toda página; el home conserva su hero full-bleed vía el margen negativo compensatorio; el parche ad hoc de Taller queda retirado sin generar espacio en blanco extra; `npx tsc --noEmit` compila limpio.</done>
</task>

<task type="auto">
  <name>Task 2: Copy de cifras de estudiantes (QUICK-03) y rename del Diplomado a "Diplomado SEO + AIO" (QUICK-04), en código y en contenido vivo de Payload</name>
  <files>aprendoclub/lib/schema-mappers.ts, aprendoclub/lib/seo/fallbacks.ts, aprendoclub/lib/llms/seed.ts, aprendoclub/app/(frontend)/(site)/cursos-seo/[ciudad]/page.tsx, aprendoclub/app/(frontend)/links/page.tsx, aprendoclub/scripts/seed/seed-data/home.ts, aprendoclub/scripts/seed/seed-data/quienes-somos.ts, aprendoclub/scripts/seed/seed-data/diplomado.ts, aprendoclub/scripts/seed/media.ts, aprendoclub/scripts/rebuild-taller-page.ts, aprendoclub/scripts/seed-paginas-sueltas.ts, aprendoclub/scripts/update-diplomado-copy-live.ts</files>
  <action>
    Investigación ya hecha (grep sobre el código fuente, excluyendo `aprendoclub/migrations/**` que son snapshots históricos y NO deben tocarse): el nombre del Diplomado aparece en 2 variantes desactualizadas — "Diplomado de cero a SEO" (más vieja, en `lib/schema-mappers.ts` líneas 38 y 46, `lib/seo/fallbacks.ts` línea 30, `lib/llms/seed.ts` líneas 14 y 51, `scripts/rebuild-taller-page.ts` línea 96) y "Diplomado de SEO + AIO" (más reciente pero con "de" de más, en `scripts/seed/seed-data/diplomado.ts` líneas 45/145, `scripts/seed/media.ts` líneas 78/87, `app/(frontend)/(site)/cursos-seo/[ciudad]/page.tsx` línea 398, y confirmado como valor YA VIVO en el campo `nombre` del registro Diplomado de la colección `programas` en Neon vía `scripts/apply-video-feedback-photos.ts` línea 92). El nombre final decidido es exactamente "Diplomado SEO + AIO" (sin "de" antes de SEO).

    Paso A (edición directa de código fuente, sin script): en cada uno de estos 7 archivos, reemplazar literalmente toda ocurrencia de "Diplomado de cero a SEO", "Diplomado de Cero a SEO" y "Diplomado de SEO + AIO" por "Diplomado SEO + AIO" — `lib/schema-mappers.ts` (2 ocurrencias en el registro `COURSES`), `lib/seo/fallbacks.ts` (1, el title fallback), `lib/llms/seed.ts` (2, en `LLMS_TXT_SEED`/`LLMS_FULL_SEED`), `app/(frontend)/(site)/cursos-seo/[ciudad]/page.tsx` (1, copy de CTA hacia el Diplomado), `scripts/seed/seed-data/diplomado.ts` (2: `hero.badgeText` y `audience.titulo`), `scripts/seed/media.ts` (2, alt text de media), `scripts/rebuild-taller-page.ts` (1, bio de Arianna).

    Paso B (cifras de estudiantes, edición directa de código fuente): reemplazar en cada archivo la cifra vieja por la oficial, preservando el resto de la frase — en `scripts/seed/seed-data/home.ts`: `badgeText: "+10.000 estudiantes ya se unieron"` → separador de coma `"+10,000 estudiantes ya se unieron"`; `ratingTexto: "4.9/5 de +10.000 estudiantes"` → `"4.9/5 de +10,000 estudiantes"`; `bioCorta2` "más de 2,000 estudiantes" → "más de 10,000 estudiantes"; el stat `{ value: "2,000+", label: "estudiantes formados" }` → `{ value: "10,000+", label: "estudiantes formados" }`. En `scripts/seed/seed-data/quienes-somos.ts`: "Hoy más de 2.000 personas se han formado con nosotros." → "Hoy más de 10,000 personas se han formado con nosotros."; el stat `{ value: "2,000+", label: "estudiantes formados" }` → `{ value: "10,000+", label: "estudiantes formados" }`. En `scripts/rebuild-taller-page.ts`: "formó a más de 2,000 estudiantes en LATAM" → "formó a más de 10,000 estudiantes en LATAM". En `scripts/seed-paginas-sueltas.ts` línea 278: `titulo: 'Aprende con una metodología probada por más de 2,000 profesionales'` → `'Aprende con una metodología probada por más de 10,000 estudiantes'`. En `scripts/seed/seed-data/diplomado.ts` (`origin.tarjetas[2].texto`, la tarjeta de la sección "Nuestra historia" propia del Diplomado): "Hoy, más de 750 personas se han formado con nosotros." → "Hoy, más de 3,000 estudiantes se han formado con nosotros en el Diplomado." (esta es la cifra específica del Diplomado; NO tocar los precios "$2,000"/"$3,000"/"$2.000"/"$3.000" de las tablas comparativas de `scripts/rebuild-diplomado-page.ts` y `scripts/seed/seed-data/diplomado.ts` — son montos en dólares de la comparativa de precios, no conteos de estudiantes).

    Paso C (contenido YA PUBLICADO en Neon — los seeds del Paso A/B son solo la fuente futura, no reescriben lo que ya está en la base): crear `scripts/update-diplomado-copy-live.ts` siguiendo el patrón de `scripts/apply-video-feedback-photos.ts` (`getPayload({config})`, `context: { disableRevalidate: true }` en cada `payload.update`). El script debe: 1) definir la misma lista de pares texto-viejo → texto-nuevo de los Pasos A y B; 2) recorrer TODOS los docs de la colección `pages` (`payload.find({collection:'pages', depth:0, limit:200})`), para cada doc hacer `JSON.stringify(doc.layout)` + `JSON.stringify(doc.meta)`, aplicar cada reemplazo literal (`.replaceAll`) sobre ambos strings, y si alguno cambió, `JSON.parse` de vuelta y `payload.update({collection:'pages', id: doc.id, data: { layout: nuevoLayout, meta: nuevoMeta }, context: { disableRevalidate: true }})`, logueando el slug de cada doc modificado; 3) hacer lo mismo sobre TODOS los docs de `programas` (reemplazo sobre el doc completo salvo `id`/`createdAt`/`updatedAt`); 4) hacer lo mismo sobre el global `llms` (`payload.findGlobal({slug:'llms'})`, reemplazo sobre `llmsTxt`/`llmsFull`, `payload.updateGlobal` si cambiaron). Ejecutarlo contra Neon con el mismo wrapper usado en Phases 35-36: `node --env-file=aprendoclub/.env.local` invocando `npx tsx scripts/update-diplomado-copy-live.ts` vía `spawnSync`, con cwd `aprendoclub`. El script debe ser idempotente (correrlo dos veces no debe cambiar nada la segunda vez) para que sirva como capa de verificación además de fix.
  </action>
  <verify>
    <automated>bash -c '
cd aprendoclub
grep -riq "diplomado de cero a seo\|diplomado de seo + aio" lib/ app/ components/ scripts/*.ts scripts/seed/*.ts scripts/seed/seed-data/*.ts 2>/dev/null && { echo "FAIL_STALE_NAME_IN_SOURCE"; exit 1; }
grep -q "Diplomado SEO + AIO" lib/schema-mappers.ts || { echo "FAIL_SCHEMA_MAPPERS_RENAME"; exit 1; }
grep -q "10,000 estudiantes\|10,000+" scripts/seed/seed-data/home.ts || { echo "FAIL_HOME_STAT"; exit 1; }
grep -q "3,000 estudiantes" scripts/seed/seed-data/diplomado.ts || { echo "FAIL_DIPLOMADO_STAT"; exit 1; }
test -f scripts/update-diplomado-copy-live.ts || { echo "FAIL_LIVE_SCRIPT_MISSING"; exit 1; }
npx tsc --noEmit || { echo "FAIL_TSC"; exit 1; }
echo TASK2_SOURCE_OK
'</automated>
    <automated>bash -c '
cd aprendoclub
node --env-file=.env.local -e "
const { spawnSync } = require(\"child_process\");
const res = spawnSync(\"npx\", [\"tsx\", \"scripts/update-diplomado-copy-live.ts\"], { encoding: \"utf8\", env: process.env, maxBuffer: 1024*1024*20 });
console.log(res.stdout || \"\");
console.error(res.stderr || \"\");
if (res.status !== 0) process.exit(1);
"
'</automated>
  </verify>
  <done>Ninguna referencia hardcodeada a "Diplomado de cero a SEO" / "Diplomado de SEO + AIO" sobrevive fuera de `migrations/` (histórico, intocable); `lib/schema-mappers.ts` usa "Diplomado SEO + AIO"; las cifras de estudiantes en los seeds fuente están en "10,000+"/"3,000 estudiantes del Diplomado"; `scripts/update-diplomado-copy-live.ts` corrió contra Neon y aplicó los mismos reemplazos sobre el contenido ya publicado (pages, programas, global llms) de forma idempotente; `npx tsc --noEmit` compila limpio.</done>
</task>

<task type="tracer">
  <name>Task 3: Campo comingSoon en Payload (schema + migración) y Reto de 7 días marcado como "Próximamente" con inscripción bloqueada (QUICK-05)</name>
  <files>aprendoclub/collections/Programas.ts, aprendoclub/migrations/index.ts, aprendoclub/payload-types.ts, aprendoclub/app/(frontend)/(site)/[...slug]/page.tsx, aprendoclub/components/blocks/render/ProgramGridRef.tsx, aprendoclub/scripts/set-reto-coming-soon.ts</files>
  <action>
    Schema: en `collections/Programas.ts`, agregar al array `fields` un campo `{ name: 'comingSoon', type: 'checkbox', label: 'Próximamente (bloquea inscripción)', defaultValue: false, admin: { description: 'Si está activo: oculta el botón de inscripción en la página del programa y en su card, y muestra una insignia "Próximamente" en ambos lugares.' } }` (mismo patrón que `Testimonios.ts` campo `featuredOnHome`). Agregar también `'comingSoon'` a `admin.defaultColumns` para verlo en el listado de /admin.

    Migración: generar la migración con el CLI de Payload (NO escribir el SQL a mano) — `node --env-file=aprendoclub/.env.local` invocando vía `spawnSync` `npx payload migrate:create add_programas_coming_soon` con cwd `aprendoclub`. Esto crea `migrations/{timestamp}_add_programas_coming_soon.ts` + `.json` y actualiza `migrations/index.ts` automáticamente. Verificar que el `.ts` generado contenga `ADD COLUMN "coming_soon"` (nombre de columna esperado en snake_case) antes de aplicarla. Aplicarla contra Neon con `npx payload migrate` (mismo wrapper `node --env-file`). Luego regenerar tipos con `npx payload generate:types` para que `payload-types.ts` incluya `comingSoon` en el tipo `Programa`.

    Backend (lookup + gating genérico, reutilizable para cualquier programa futuro): en `app/(frontend)/(site)/[...slug]/page.tsx`, dentro de `CatchAllPage`, justo después de resolver `doc` (el doc de `pages`) y antes de `getGraphsForSlug`, agregar una consulta `payload.find({ collection: 'programas', where: { ctaHref: { equals: \`/${slug}\` } }, limit: 1, depth: 0 })` y derivar `isComingSoon = Boolean(match.docs[0]?.comingSoon)` (si no hay match, `false`). Cuando `isComingSoon` sea `true`, transformar `doc.layout` antes de pasarlo a `RenderBlocks`: mapear cada bloque y, por duck-typing sobre su forma (no por `blockType` específico, para que funcione con cualquier programa futuro que reutilice estos mismos campos) — si el bloque trae un array `ctas` de objetos `{href,label}` (como `retoHero` y `retoPricing`), reemplazarlo por un array vacío; si el bloque trae un objeto `boton` con `{href,label}` (como `ctaBanner`), reemplazarlo por `{ label: '', href: '#' }`. Tipar el helper de transformación contra `Page['layout'][number]` devolviendo el mismo tipo, con un cast interno a `any` para la lectura duck-typed de `ctas`/`boton` y un cast final a `Page['layout']` al pasarlo a `RenderBlocks` (mismo patrón laxo que ya usan los scripts de contenido del proyecto, ej. `apply-video-feedback-photos.ts`). Además, cuando `isComingSoon` sea `true`, renderizar un banner fijo antes de `<RenderBlocks>` (franja de ancho completo con texto "Próximamente — inscripciones aún no disponibles", estilo consistente con `--accent`) — esta es la insignia visible en la página propia del programa. Este banner no depende de qué bloques tenga la página, así que sirve para cualquier programa futuro que se marque comingSoon, no solo para el Reto.

    Frontend (card): en `components/blocks/render/ProgramGridRef.tsx`, dentro del `.map((program) => ...)`, cuando `program.comingSoon` sea `true`: 1) agregar `relative` a la clase del `Card` y superponer una insignia absoluta (ej. `absolute top-3 right-3 rounded-full border border-white/20 bg-black/70 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white`) con el texto "Próximamente"; 2) en vez de renderizar `<Button href={program.ctaHref}>{program.ctaLabel}</Button>`, renderizar un `<button type="button" disabled aria-disabled="true">` con el mismo texto `program.ctaLabel` (o "Próximamente" si se prefiere), sin `href` (no debe ser un link navegable), aplicando clases visuales equivalentes al variant `ghost`/`secondary` del `Button` pero con `opacity-60 cursor-not-allowed` para el estado disabled — seguir las reglas de accesibilidad de A11Y.md: el estado deshabilitado debe comunicarse tanto visualmente (contraste suficiente, no solo color) como a tecnologías asistivas (atributo `disabled` nativo + `aria-disabled="true"`), y no debe quedar ningún elemento con semántica de enlace que no navegue a ningún lado.

    Datos: crear `scripts/set-reto-coming-soon.ts` (mismo patrón `getPayload({config})` + `context:{disableRevalidate:true}`) que haga `payload.find({collection:'programas', where:{slug:{equals:'reto'}}, limit:1})` y `payload.update({collection:'programas', id: docs[0].id, data:{comingSoon:true}, context:{disableRevalidate:true}})`, logueando el resultado. Ejecutarlo contra Neon con el wrapper `node --env-file=aprendoclub/.env.local` + `npx tsx`.
  </action>
  <verify>
    <automated>bash -c '
cd aprendoclub
grep -q "name: .comingSoon." collections/Programas.ts || { echo "FAIL_FIELD_MISSING"; exit 1; }
ls migrations/*add_programas_coming_soon*.ts >/dev/null 2>&1 || { echo "FAIL_MIGRATION_MISSING"; exit 1; }
grep -q "add_programas_coming_soon" migrations/index.ts || { echo "FAIL_MIGRATION_NOT_REGISTERED"; exit 1; }
grep -q "comingSoon" payload-types.ts || { echo "FAIL_TYPES_NOT_REGENERATED"; exit 1; }
grep -q "isComingSoon" "app/(frontend)/(site)/[...slug]/page.tsx" || { echo "FAIL_CATCHALL_GATING_MISSING"; exit 1; }
grep -q "program.comingSoon" components/blocks/render/ProgramGridRef.tsx || { echo "FAIL_CARD_BADGE_MISSING"; exit 1; }
test -f scripts/set-reto-coming-soon.ts || { echo "FAIL_SET_SCRIPT_MISSING"; exit 1; }
npx tsc --noEmit || { echo "FAIL_TSC"; exit 1; }
echo TASK3_SOURCE_OK
'</automated>
    <automated>bash -c '
cd aprendoclub
node --env-file=.env.local -e "
const { spawnSync } = require(\"child_process\");
const res = spawnSync(\"npx\", [\"tsx\", \"scripts/set-reto-coming-soon.ts\"], { encoding: \"utf8\", env: process.env });
console.log(res.stdout || \"\");
console.error(res.stderr || \"\");
if (res.status !== 0) process.exit(1);
"
'</automated>
  </verify>
  <done>La colección programas tiene el campo comingSoon (checkbox) migrado en Neon y reflejado en payload-types.ts; el catch-all [...slug] detecta comingSoon vía el programa cuyo ctaHref coincide con el slug, vacía los arrays ctas/objetos boton del layout de esa página y muestra un banner "Próximamente"; ProgramGridRef muestra la insignia "Próximamente" y reemplaza el CTA por un botón nativo disabled cuando program.comingSoon es true; el registro Reto 7 días de programas tiene comingSoon=true en Neon; npx tsc --noEmit compila limpio.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|--------------|
| Payload admin → Neon Postgres | Un editor autenticado en /admin escribe `comingSoon` y copy de programas; confiado (mismo boundary ya existente para el resto de campos de contenido). |
| Scripts de contenido (`scripts/*.ts`) → Neon Postgres | Scripts one-off ejecutados manualmente por un desarrollador con `.env.local` local; no expuestos a input de usuario final, mismo patrón ya usado en Phases 34-36. |
| Visitante público → catch-all `[...slug]` | Input no confiable: el segmento de ruta (`slug`) llega directo de la URL antes de resolver contra Payload; ya se sanitiza indirectamente vía `payload.find({where:{slug:{equals: slug}}})` (query parametrizada por el ORM de Payload, sin concatenación de SQL). |

## STRIDE Threat Register

| Threat ID | Category | Component | Severity | Disposition | Mitigation Plan |
|-----------|----------|-----------|----------|-------------|------------------|
| T-260923-01 | Tampering | `app/(frontend)/(site)/[...slug]/page.tsx` — lookup de `programas` por `ctaHref` | low | accept | El lookup usa el query builder de Payload (parametrizado), no concatenación de strings; el `slug` del catch-all ya se usaba sin sanitizar adicional en el mismo archivo para resolver `pages`, sin incidentes reportados — mismo nivel de riesgo preexistente, no se introduce superficie nueva. |
| T-260923-02 | Denial of Service | `[...slug]/page.tsx` — query adicional a `programas` en cada request de página | low | accept | Es una única consulta indexada por `ctaHref` (campo `text`, no indexado explícitamente pero tabla `programas` es de bajo volumen, <20 filas); coherente con el resto de queries ya hechas en el mismo handler (pages, blog). No se agrega caché nueva ni se cambia la estrategia de ISR existente. |
| T-260923-03 | Tampering | `scripts/update-diplomado-copy-live.ts` — reemplazo de texto vía JSON.stringify/replaceAll sobre `doc.layout` completo | medium | mitigate | El script solo corre localmente contra `.env.local` (nunca en request path de producción, no es código servido); acotar el `.replaceAll` a los pares de string exactos listados en la Task 2 (no a un regex amplio) para evitar reemplazos accidentales en contenido no relacionado; loguear cada doc modificado para revisión manual antes/después de correrlo. |
| T-260923-SC | Tampering | Ninguna instalación de paquete npm/pip/cargo en este plan | n/a | n/a | No aplica — no se agregan dependencias nuevas; se usa exclusivamente el CLI de `payload` ya instalado (`payload migrate:create`, `payload generate:types`). |
</threat_model>

<verification>
- `npx tsc --noEmit` limpio tras cada task (Tasks 1, 2 y 3).
- Task 1: grep confirma `hidden sm:flex` en el scroll indicator del home, `pt-[72px]` en el `<main>` compartido, `-mt-[72px]` en HeroHome, y ausencia del parche `pt-28` en TallerHero.
- Task 2: grep confirma cero ocurrencias de los nombres viejos del Diplomado fuera de `migrations/`, presencia de "Diplomado SEO + AIO" en schema-mappers.ts, y de las cifras "10,000"/"3,000 estudiantes" en los seeds; el script `update-diplomado-copy-live.ts` corre contra Neon sin error.
- Task 3: grep confirma el campo `comingSoon` en el collection config, la migración generada y registrada, `payload-types.ts` regenerado, la lógica de gating en el catch-all y la insignia en ProgramGridRef; el script `set-reto-coming-soon.ts` corre contra Neon sin error.
- Verificación manual pendiente para Juan (no automatizable desde este plan): revisar visualmente en mobile real (no solo devtools) que el hero del home ya no muestra overlap, que /programas/reto no ofrece ningún botón de pago funcional, y que la card del Reto en el home muestra la insignia "Próximamente".
</verification>

<success_criteria>
- El hero del home no muestra overlap entre avatares y el indicador de scroll en viewports mobile reales.
- Ninguna página bajo el layout compartido queda con su primer bloque de contenido tapado por el navbar fijo, ni con doble espaciado por parches ad hoc previos.
- El copy de "10,000+ estudiantes" y "3,000 estudiantes" (Diplomado) aparece en el código fuente y en el contenido ya publicado en Neon, sin cifras viejas remanentes.
- "Diplomado SEO + AIO" es el único nombre del producto en código fuente (fuera de migrations/) y en el registro vivo de Payload.
- El campo comingSoon existe en Payload, el Reto de 7 días lo tiene activo, su página bloquea la inscripción y su card muestra la insignia "Próximamente" con el CTA deshabilitado.
</success_criteria>

<output>
Create `.planning/quick/260923-gdf-fix-overlap-de-fotos-estudiantes-con-scr/260923-gdf-SUMMARY.md` when done
</output>
