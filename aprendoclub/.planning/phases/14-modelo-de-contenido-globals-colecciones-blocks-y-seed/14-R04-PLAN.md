---
phase: 14-modelo-de-contenido-globals-colecciones-blocks-y-seed
plan: R04
type: execute
wave: 4
depends_on: [14-R03]
files_modified:
  - components/blocks/render/Hero.tsx
  - components/blocks/render/FeatureGrid.tsx
  - components/blocks/render/Pricing.tsx
  - components/blocks/render/HeroHome.tsx
  - components/blocks/render/Instructor.tsx
  - components/blocks/render/StickyCta.tsx
  - components/blocks/render/Historia.tsx
  - components/blocks/render/Fundadora.tsx
  - components/blocks/render/Metodologia.tsx
  - components/blocks/render/RetoGaleria.tsx
  - components/blocks/render/TallerHero.tsx
  - components/blocks/render/TallerIncluye.tsx
  - components/blocks/render/TallerParaQuien.tsx
  - components/blocks/render/TallerPricing.tsx
  - components/blocks/render/index.ts
autonomous: true
requirements: [SCH-01]
user_setup: []

must_haves:
  truths:
    - "Cada bloque de home, quienes-somos, testimonios y taller tiene un componente de render que espeja su sección actual"
    - "Los bloques genéricos Hero, FeatureGrid y Pricing tienen render registrado (consumidos por home y diplomado)"
    - "Todos los nuevos render están registrados en blockRenderers y el build sigue verde"
  artifacts:
    - path: "components/blocks/render/HeroHome.tsx"
      provides: "Render del hero de home (video, avatares, rating)"
    - path: "components/blocks/render/RetoGaleria.tsx"
      provides: "Render de la galería del reto en /testimonios"
  key_links:
    - from: "components/blocks/render/index.ts"
      to: "componentes de render de este plan"
      via: "entradas nuevas en blockRenderers"
      pattern: "heroHome"
---

<objective>
Añadir los componentes de render de los bloques de HOME, QUIENES-SOMOS, TESTIMONIOS y TALLER, más los render de los bloques genéricos Hero/FeatureGrid/Pricing (consumidos también por diplomado). Cada uno espeja pixel-a-pixel su componente actual y se registra en `blockRenderers`.

Purpose: completar el render de 4 páginas del page-builder para que su cutover (Phase 15/16/17) sea solo "apuntar la ruta". NO cutover aquí.

Output: 14 componentes de render + registry extendido; build verde.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-REWORK-CONTEXT.md
@payload-types.ts
@components/blocks/RenderBlocks.tsx
@components/blocks/render/index.ts
@lib/blocks/icons.ts
@lib/blocks/media.ts

# Componentes actuales a ESPEJAR (misma marca/estilos; NO tocarlos ni importarlos: duplicar JSX):
@components/hero-section.tsx
@components/problema-section.tsx
@components/beneficios-section.tsx
@components/pricing-section.tsx
@components/instructor-section.tsx
@components/sticky-cta-mobile.tsx
@components/quienes-somos/historia.tsx
@components/quienes-somos/fundadora.tsx
@components/quienes-somos/metodologia.tsx
@components/testimonios/reto-galeria.tsx
@components/diplomado/hero.tsx

<interfaces>
Registry (creado en R03): components/blocks/render/index.ts exporta `blockRenderers: Record<string, ComponentType<{block:any}>>`. AÑADIR entradas, no reescribir las existentes.
Helpers: lucideIcon(name) (lib/blocks/icons), resolveMedia/resolveMediaList (lib/blocks/media).
Cada componente recibe `{ block }` con la interface del bloque en payload-types.ts.
Fuente del contenido del taller (para conocer el shape/orden): content/taller-seo-con-ia.ts.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Render genéricos (Hero, FeatureGrid, Pricing) + home</name>
  <files>components/blocks/render/Hero.tsx, components/blocks/render/FeatureGrid.tsx, components/blocks/render/Pricing.tsx, components/blocks/render/HeroHome.tsx, components/blocks/render/Instructor.tsx, components/blocks/render/StickyCta.tsx, components/blocks/render/index.ts</files>
  <action>
Un render por bloque, espejando el componente indicado. Registrar cada uno en blockRenderers.

- Hero.tsx ('hero'): render del Hero genérico (badge, eyebrow, tituloPre/Accent/Post, subtitulo, texto, bullets, imagen, ctaPrimario/ctaSecundario, microcopy). Espeja components/diplomado/hero.tsx (variante split-title con CTAs). Consumido por el hero del diplomado.
- FeatureGrid.tsx ('featureGrid'): sectionHeader (eyebrow/titulo/subtitulo) + grid de items{icon,titulo,descripcion} con lucideIcon(item.icon). Espeja components/problema-section.tsx (grid de tarjetas con icono). Consumido por problema y beneficios (home) y origin/methodology (diplomado). Nota: si beneficios-section.tsx difiere visualmente de problema-section.tsx, el ajuste fino de variante se hace en el cutover (Phase 17); por ahora un render de tarjetas fiel a problema-section.
- Pricing.tsx ('pricing'): sectionHeader + planes[] (nombre/badge/precio/precioTachado/precioNota/cuotasTexto/features[]/cta) + ctaAsesoria. Espeja components/pricing-section.tsx (2 planes + card asesoría/WhatsApp).
- HeroHome.tsx ('heroHome'): "use client" (framer-motion como el original). Hero de home con video de fondo (resolveMedia videoBackground), stack de avatares (resolveMediaList avatares), ratingTexto, badge, título, subtítulo, CTAs. Espeja components/hero-section.tsx.
- Instructor.tsx ('instructor'): eyebrow/nombre/rol/bioCorta1/bioCorta2 + stats + foto (resolveMedia) + teaser link. Espeja components/instructor-section.tsx.
- StickyCta.tsx ('stickyCta'): botón sticky mobile. Espeja components/sticky-cta-mobile.tsx ("use client").
  </action>
  <verify>
    <automated>test $(ls components/blocks/render/Hero.tsx components/blocks/render/FeatureGrid.tsx components/blocks/render/Pricing.tsx components/blocks/render/HeroHome.tsx components/blocks/render/Instructor.tsx components/blocks/render/StickyCta.tsx 2>/dev/null | wc -l) -eq 6 && grep -q "heroHome" components/blocks/render/index.ts && grep -q "featureGrid" components/blocks/render/index.ts && echo OK</automated>
  </verify>
  <done>6 render (3 genéricos + 3 home) existen y registrados en blockRenderers.</done>
</task>

<task type="auto">
  <name>Task 2: Render quienes-somos + testimonios</name>
  <files>components/blocks/render/Historia.tsx, components/blocks/render/Fundadora.tsx, components/blocks/render/Metodologia.tsx, components/blocks/render/RetoGaleria.tsx, components/blocks/render/index.ts</files>
  <action>
- Historia.tsx ('historia'): eyebrow/titulo + parrafos[] + quote{texto,autor}. Espeja components/quienes-somos/historia.tsx.
- Fundadora.tsx ('fundadora'): eyebrow/nombre/rol + bio[] + foto (resolveMedia). Espeja components/quienes-somos/fundadora.tsx.
- Metodologia.tsx ('metodologia'): eyebrow/titulo + pilares[]{nombre,descripcion}. Espeja components/quienes-somos/metodologia.tsx.
- RetoGaleria.tsx ('retoGaleria'): eyebrow/titulo/texto + galería de imagenes (resolveMediaList). Espeja components/testimonios/reto-galeria.tsx.
Registrar los 4 en blockRenderers.
  </action>
  <verify>
    <automated>test $(ls components/blocks/render/Historia.tsx components/blocks/render/Fundadora.tsx components/blocks/render/Metodologia.tsx components/blocks/render/RetoGaleria.tsx 2>/dev/null | wc -l) -eq 4 && grep -q "retoGaleria" components/blocks/render/index.ts && echo OK</automated>
  </verify>
  <done>4 render de quienes-somos/testimonios existen y registrados.</done>
</task>

<task type="auto">
  <name>Task 3: Render taller + build verde</name>
  <files>components/blocks/render/TallerHero.tsx, components/blocks/render/TallerIncluye.tsx, components/blocks/render/TallerParaQuien.tsx, components/blocks/render/TallerPricing.tsx, components/blocks/render/index.ts</files>
  <action>
Espejar la página /programas/taller-seo-con-ia (leer content/taller-seo-con-ia.ts para el shape/orden y el componente de página actual para el markup).
- TallerHero.tsx ('tallerHero'): eyebrow/titulo/subtitulo/duracion.
- TallerIncluye.tsx ('tallerIncluye'): items[]{texto,valor}.
- TallerParaQuien.tsx ('tallerParaQuien'): texto.
- TallerPricing.tsx ('tallerPricing'): monto + opciones[] + cta.
Registrar los 4 en blockRenderers. Cerrar con build verde sin enmascarar el código de salida.
  </action>
  <verify>
    <automated>test $(ls components/blocks/render/Taller*.tsx 2>/dev/null | wc -l) -eq 4 && grep -q "tallerHero" components/blocks/render/index.ts; npm run build < /dev/null; echo "EXIT=$?"</automated>
  </verify>
  <done>4 render del taller existen y registrados; `npm run build < /dev/null` imprime EXIT=0.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Pages (público) -> render de bloques | contenido editorial renderizado en HTML |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-14R-09 | Tampering (XSS) | render de campos de texto/imagen | mitigate | texto como children de React (auto-escape); imágenes vía next/image con url resuelta; sin dangerouslySetInnerHTML |
| T-14R-10 | Information Disclosure | contenido de páginas | accept | marketing público |
</threat_model>

<verification>
- `npm run build < /dev/null` imprime EXIT=0.
- blockRenderers contiene las nuevas claves (heroHome, featureGrid, pricing, hero, instructor, stickyCta, historia, fundadora, metodologia, retoGaleria, tallerHero, tallerIncluye, tallerParaQuien, tallerPricing).
- Ningún componente existente en components/* fue modificado.
</verification>

<success_criteria>
Render completo de home, quienes-somos, testimonios y taller (+ genéricos Hero/FeatureGrid/Pricing) registrado; build verde; sitio actual intacto.
</success_criteria>

<output>
Crear `.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-R04-SUMMARY.md`. Documentar qué blockTypes quedan pendientes de render (diplomado en R05, reto en R06).
</output>
