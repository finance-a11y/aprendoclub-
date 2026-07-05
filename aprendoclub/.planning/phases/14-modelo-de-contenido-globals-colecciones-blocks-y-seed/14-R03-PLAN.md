---
phase: 14-modelo-de-contenido-globals-colecciones-blocks-y-seed
plan: R03
type: execute
wave: 3
depends_on: [14-R02]
files_modified:
  - lib/blocks/icons.ts
  - lib/blocks/media.ts
  - components/blocks/RenderBlocks.tsx
  - components/blocks/render/index.ts
  - components/blocks/render/SectionHeader.tsx
  - components/blocks/render/CtaBanner.tsx
  - components/blocks/render/Stats.tsx
  - components/blocks/render/Prose.tsx
  - components/blocks/render/RelatedLinks.tsx
  - components/blocks/render/FaqRef.tsx
  - components/blocks/render/TestimonialRef.tsx
  - components/blocks/render/TeamGridRef.tsx
  - components/blocks/render/ProgramGridRef.tsx
  - components/blocks/render/LogosRef.tsx
  - app/(frontend)/[...slug]/page.tsx
autonomous: true
requirements: [SCH-01]
user_setup: []

must_haves:
  truths:
    - "Existe una ruta catch-all aditiva que sirve una Page por slug sin colisionar con las 7 rutas estáticas ni con la raíz"
    - "RenderBlocks mapea blockType→componente y renderiza el layout de una Page en orden"
    - "Los bloques de referencia (faq/testimonios/team/programas/logos) renderizan desde sus colecciones con depth suficiente"
    - "El sitio existente sigue compilando y renderizando desde content/*.ts (NO cutover)"
  artifacts:
    - path: "app/(frontend)/[...slug]/page.tsx"
      provides: "Ruta catch-all no-opcional segura"
      contains: "notFound"
    - path: "components/blocks/RenderBlocks.tsx"
      provides: "Dispatcher blockType→componente"
      contains: "blockRenderers"
    - path: "lib/blocks/icons.ts"
      provides: "Adaptador nombre-string→icono lucide"
  key_links:
    - from: "app/(frontend)/[...slug]/page.tsx"
      to: "collection pages"
      via: "payload.find slug + depth 2"
      pattern: "collection: 'pages'"
    - from: "components/blocks/RenderBlocks.tsx"
      to: "components/blocks/render/index.ts"
      via: "import blockRenderers registry"
      pattern: "blockRenderers"
---

<objective>
Construir el motor de render del page-builder: adaptadores compartidos (icono lucide por string, resolución de Media), el dispatcher `RenderBlocks`, un registro extensible `render/index.ts`, los componentes de render de los bloques de REFERENCIA y PRIMITIVOS, y la ruta catch-all SEGURA/aditiva que sirve una Page por slug. Es la plomería que permite que Phases 15-17 solo "apunten la ruta" a cada página.

Purpose: SCH-01 pide render vía catch-all + block renderer, pixel-idéntico, SIN cutover. Los planes R04-R06 añadirán los componentes de render pesados por página, registrándolos en el mismo registry. Este plan garantiza que la ruta existe, es segura (no sombrea ni rompe las 7 rutas estáticas ni la home), y renderiza los bloques transversales.

Output: infraestructura de render + ruta catch-all + 10 componentes de render de referencia/primitivos.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-REWORK-CONTEXT.md
@payload-types.ts

# Componentes actuales que estos render deben ESPEJAR (misma marca/estilos, sin tocarlos):
@components/faq-section.tsx
@components/testimonios-section.tsx
@components/program-card.tsx
@components/ui/button.tsx
@components/ui/eyebrow.tsx
@components/quienes-somos/equipo.tsx
@components/quienes-somos/stats.tsx

<interfaces>
Rutas existentes que NO se deben sombrear (Next precedence: segmento explícito gana sobre catch-all no-opcional):
  /                                      -> app/(frontend)/(site)/page.tsx  (home)
  /quienes-somos /testimonios /programas -> app/(frontend)/(site)/...
  /reto /diplomado                       -> app/(frontend)/(site)/...
  /programas/taller-seo-con-ia           -> app/(frontend)/(site)/programas/taller-seo-con-ia
  /links                                 -> app/(frontend)/links

Payload Local API en RSC:
  import { getPayload } from 'payload'; import config from '@/payload.config'
  const payload = await getPayload({ config })
  await payload.find({ collection:'pages', where:{ slug:{ equals: s } }, depth:2, limit:1 })

Tipos (payload-types.ts, generados en R02): interface Page { slug, title, layout: BlockUnion[] }.
Cada bloque del layout trae `blockType` (el slug del Block) + sus campos.
Media resuelto a depth>=1 es un objeto { url, alt, width, height }.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Adaptadores compartidos + RenderBlocks + registry</name>
  <files>lib/blocks/icons.ts, lib/blocks/media.ts, components/blocks/RenderBlocks.tsx, components/blocks/render/index.ts</files>
  <action>
- lib/blocks/icons.ts: helper `lucideIcon(name?: string)` que devuelve el componente de icono de lucide-react correspondiente al nombre. Poblar un mapa explícito con los iconos usados hoy (leer los imports de lucide-react en components/*-section.tsx y components/diplomado/*: Compass, Timer, Users, Brain, TrendingUp, Target, etc.). Fallback a un icono neutro si el nombre no existe. Exportar un `Record<string, LucideIcon>`. NO importar todo lucide dinámicamente (peso de bundle).
- lib/blocks/media.ts: `resolveMedia(m)` que dado el valor de un campo upload/relationship de Media (objeto poblado a depth>=1, o null/number) devuelve `{ url, alt, width, height } | null`; y `resolveMediaList(arr)` para hasMany. Defensivo ante id numérico (depth 0) devolviendo null.
- components/blocks/render/index.ts: barrel-registry. `export const blockRenderers: Record<string, React.ComponentType<{ block: any }>> = { ... }`. En este plan registra solo los 10 de Task 2. R04-R06 AÑADIRÁN sus entradas a este objeto.
- components/blocks/RenderBlocks.tsx: componente server `RenderBlocks({ blocks }: { blocks: any[] })` que mapea cada bloque: `const C = blockRenderers[block.blockType]`; si existe, `<C key={block.id} block={block} />`; si no, en dev renderiza un aviso `data-unknown-block` y en prod null (fallback tolerante para que R04-R06 añadan tipos incrementalmente sin romper el build). Importar `blockRenderers` desde './render'.
  </action>
  <verify>
    <automated>grep -q "blockRenderers" components/blocks/RenderBlocks.tsx && grep -q "export const blockRenderers" components/blocks/render/index.ts && grep -q "lucideIcon" lib/blocks/icons.ts && grep -q "resolveMedia" lib/blocks/media.ts && echo OK</automated>
  </verify>
  <done>Adaptadores + dispatcher + registry existen; RenderBlocks despacha por blockType con fallback tolerante.</done>
</task>

<task type="auto">
  <name>Task 2: Render de bloques de referencia y primitivos</name>
  <files>components/blocks/render/SectionHeader.tsx, components/blocks/render/CtaBanner.tsx, components/blocks/render/Stats.tsx, components/blocks/render/Prose.tsx, components/blocks/render/RelatedLinks.tsx, components/blocks/render/FaqRef.tsx, components/blocks/render/TestimonialRef.tsx, components/blocks/render/TeamGridRef.tsx, components/blocks/render/ProgramGridRef.tsx, components/blocks/render/LogosRef.tsx, components/blocks/render/index.ts</files>
  <action>
Un componente de render por bloque, ESPEJANDO el markup/Tailwind del componente actual equivalente (misma marca; NO importar ni modificar los componentes existentes — duplicar el JSX). Cada uno recibe `{ block }` tipado con la interface de payload-types. Registrar los 10 en `blockRenderers`.

- SectionHeader.tsx ('sectionHeader'): eyebrow+titulo+subtitulo centrado con <Eyebrow>. Espeja la cabecera de los heroes de quienes-somos/testimonios/programas.
- CtaBanner.tsx ('ctaBanner'): titulo + texto + bullets[] + boton (link) con <Button>. Espeja components/cta-section.tsx. Tolerar el shape del ctaFinal del reto (botonLabel/botonHref) mapeándolo a boton.label/href.
- Stats.tsx ('stats'): grid de items{value,label}. Espeja components/quienes-somos/stats.tsx.
- Prose.tsx ('prose'): renderiza `contenido` (richText Lexical) con el serializer React de @payloadcms/richtext-lexical (RichText), envuelto en `.measure-prose`. NUNCA dangerouslySetInnerHTML.
- RelatedLinks.tsx ('relatedLinks'): title + array de links. Espeja components/related-links.tsx.
- FaqRef.tsx ('faqRef'): eyebrow+titulo + acordeón sobre `items` (docs faq poblados a depth 2). Espeja components/faq-section.tsx. "use client" si usa estado open/close como el original.
- TestimonialRef.tsx ('testimonialRef'): eyebrow+titulo + grid de `items` (docs testimonios) con fallback a iniciales. Espeja components/testimonios/grid.tsx / testimonios-section. Foto vía resolveMedia.
- TeamGridRef.tsx ('teamGridRef'): eyebrow+titulo+subtitulo + grid de `items` (docs team-members). Espeja components/quienes-somos/equipo.tsx.
- ProgramGridRef.tsx ('programGridRef'): sectionHeader + boton + grid de `items` (docs programas). Espeja components/programas-section.tsx usando components/program-card.tsx como referencia.
- LogosRef.tsx ('logosRef'): texto + banda de logos `items` (docs clientes-trabajados). Espeja la banda de logos de components/testimonios-section.tsx.

Iconos vía lucideIcon(); imágenes vía resolveMedia()/resolveMediaList() + next/image con width/height.
  </action>
  <verify>
    <automated>test $(ls components/blocks/render/*.tsx | wc -l) -ge 10 && grep -q "faqRef" components/blocks/render/index.ts && grep -q "testimonialRef" components/blocks/render/index.ts && echo OK</automated>
  </verify>
  <done>Los 10 render de referencia/primitivos existen, registrados en blockRenderers, espejando su componente actual.</done>
</task>

<task type="auto">
  <name>Task 3: Ruta catch-all segura y aditiva + build verde</name>
  <files>app/(frontend)/[...slug]/page.tsx</files>
  <action>
Crear la ruta catch-all NO-OPCIONAL `app/(frontend)/[...slug]/page.tsx` (usar `[...slug]`, NO `[[...slug]]`: la variante opcional matchea `/` y colisiona con la home estática (site)/page.tsx → error de build por página duplicada; la no-opcional NO matchea `/`).

Comportamiento (RSC async):
1. `const slug = (await params).slug.join('/')`.
2. Guard de rutas reservadas (defensa en profundidad, además de la precedencia de Next): si slug pertenece a { 'quienes-somos','testimonios','programas','reto','diplomado','links','programas/taller-seo-con-ia','home' } -> `notFound()`. Estas ya las sirven rutas estáticas o son la home; el catch-all NO debe servirlas mientras exista content/*.ts, garantizando que el sitio actual no se rompe. El cutover (Phase 15-17) retira las estáticas y ajusta este guard.
3. `getPayload({ config })`; `find({ collection:'pages', where:{ slug:{ equals: slug } }, depth:2, limit:1 })`.
4. Si `docs.length === 0` -> `notFound()`.
5. Si existe -> `<RenderBlocks blocks={doc.layout ?? []} />`.

NO implementar generateMetadata desde Pages.seo aún (Phase 17); dejar `// TODO Phase 17`. NO añadir generateStaticParams. Marcar la ruta dinámica (`export const dynamic = 'force-dynamic'`) para no cachear páginas nuevas del admin.

Cerrar con build verde sin pipe que enmascare el código de salida.
  </action>
  <verify>
    <automated>test -f "app/(frontend)/[...slug]/page.tsx" && grep -q "collection: 'pages'" "app/(frontend)/[...slug]/page.tsx" && grep -q "notFound" "app/(frontend)/[...slug]/page.tsx"; npm run build < /dev/null; echo "EXIT=$?"</automated>
  </verify>
  <done>La ruta catch-all existe, es no-opcional, tiene guard de reservadas + notFound; `npm run build < /dev/null` imprime EXIT=0 y las 7 rutas estáticas + /links siguen presentes.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| cliente -> ruta catch-all (params.slug) | entrada no confiable (segmentos de URL) que alimenta la query de Pages |
| Pages (público) -> RenderBlocks | contenido editorial renderizado en HTML |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-14R-06 | Tampering/Injection | params.slug -> payload.find | mitigate | query parametrizada (where equals), sin SQL crudo; guard de slugs reservados; notFound en no-match |
| T-14R-07 | Spoofing (route shadowing) | catch-all vs rutas estáticas | mitigate | catch-all no-opcional (no matchea `/`) + guard de reservadas; precedencia de Next da prioridad a segmentos explícitos |
| T-14R-08 | Tampering (XSS) | render de campos de bloque | mitigate | texto renderizado como children de React (auto-escape); richText vía serializer Lexical, nunca dangerouslySetInnerHTML |
| T-14R-SC | Tampering | instalaciones npm | accept | este plan no instala paquetes nuevos (lucide-react y @payloadcms/richtext-lexical ya en package.json) |
</threat_model>

<verification>
- `npm run build < /dev/null` imprime EXIT=0.
- La salida de build lista las rutas estáticas existentes (home, quienes-somos, testimonios, programas, reto, diplomado, taller, links) + la nueva `/[...slug]`.
- RenderBlocks tolera blockType desconocido sin romper el build (los tipos de R04-R06 aún no están registrados).
</verification>

<success_criteria>
Motor de render + ruta catch-all segura operativos; bloques de referencia/primitivos renderizan desde sus colecciones; sitio actual intacto (NO cutover); build verde.
</success_criteria>

<output>
Crear `.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-R03-SUMMARY.md`. Documentar el patrón del registry `blockRenderers` (cómo R04-R06 añaden entradas) y la estrategia de la ruta segura.
</output>
