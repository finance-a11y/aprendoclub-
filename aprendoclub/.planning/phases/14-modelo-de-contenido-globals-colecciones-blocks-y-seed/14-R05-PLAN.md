---
phase: 14-modelo-de-contenido-globals-colecciones-blocks-y-seed
plan: R05
type: execute
wave: 5
depends_on: [14-R04]
files_modified:
  - components/blocks/render/Audience.tsx
  - components/blocks/render/Curriculum16Semanas.tsx
  - components/blocks/render/HowItWorks.tsx
  - components/blocks/render/DiplomadoTeam.tsx
  - components/blocks/render/DiplomadoBenefits.tsx
  - components/blocks/render/DiplomadoPricing.tsx
  - components/blocks/render/index.ts
autonomous: true
requirements: [SCH-01]
user_setup: []

must_haves:
  truths:
    - "Cada sección bespoke del diplomado tiene un componente de render que espeja su componente actual pixel-a-pixel"
    - "El timeline de 16 semanas se renderiza desde el bloque curriculum16Semanas"
    - "Todos los render del diplomado quedan registrados en blockRenderers y el build sigue verde"
  artifacts:
    - path: "components/blocks/render/Curriculum16Semanas.tsx"
      provides: "Timeline acordeón de 16 semanas"
      contains: "block"
  key_links:
    - from: "components/blocks/render/index.ts"
      to: "render del diplomado"
      via: "entradas nuevas en blockRenderers"
      pattern: "curriculum16Semanas"
---

<objective>
Añadir los componentes de render de los bloques bespoke del DIPLOMADO (audience, curriculum 16 semanas, how-it-works, team, benefits, pricing), cada uno espejando su componente actual. Los bloques del diplomado que reusan genéricos (hero→Hero, origin/methodology→FeatureGrid, faq→FaqRef, ctaFinal→CtaBanner) ya tienen render (R03/R04).

Purpose: completar el render del diplomado para su cutover en Phase 16. NO cutover aquí.

Output: 6 componentes de render + registry extendido; build verde.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-REWORK-CONTEXT.md
@payload-types.ts
@components/blocks/render/index.ts
@lib/blocks/icons.ts
@lib/blocks/media.ts

# Componentes actuales a ESPEJAR (NO tocarlos; duplicar JSX):
@components/diplomado/audience.tsx
@components/diplomado/curriculum.tsx
@components/diplomado/how-it-works.tsx
@components/diplomado/team.tsx
@components/diplomado/benefits.tsx
@components/diplomado/pricing.tsx

<interfaces>
Registry (R03): components/blocks/render/index.ts exporta `blockRenderers`. AÑADIR entradas.
Helpers: lucideIcon (lib/blocks/icons), resolveMedia/resolveMediaList (lib/blocks/media).
DiplomadoTeam: el sub-grupo `equipo` es teamGridRefFields (relationship team-members, docs poblados a depth 2 por la ruta). Reusar el patrón del render TeamGridRef (R03) para el grid, más teamIntro y mentorSection propios.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Audience + Curriculum16Semanas + HowItWorks</name>
  <files>components/blocks/render/Audience.tsx, components/blocks/render/Curriculum16Semanas.tsx, components/blocks/render/HowItWorks.tsx, components/blocks/render/index.ts</files>
  <action>
- Audience.tsx ('audience'): titulo/subtitulo + tituloPerfiles + perfiles[] + tituloDudas + dudas[] + notaFinal. Espeja components/diplomado/audience.tsx.
- Curriculum16Semanas.tsx ('curriculum16Semanas'): "use client" (acordeón useState como el original). eyebrow/titulo + timeline de semanas[]{numero,titulo,detalle} con nodos + línea conectora + panel expandible. Espeja components/diplomado/curriculum.tsx pixel-a-pixel (mismo markup de <ol>/nodos/ChevronDown).
- HowItWorks.tsx ('howItWorks'): sectionHeader + items{icon,titulo,descripcion} (lucideIcon) + ctaLabel/ctaHref. Espeja components/diplomado/how-it-works.tsx.
Registrar los 3.
  </action>
  <verify>
    <automated>test $(ls components/blocks/render/Audience.tsx components/blocks/render/Curriculum16Semanas.tsx components/blocks/render/HowItWorks.tsx 2>/dev/null | wc -l) -eq 3 && grep -q "curriculum16Semanas" components/blocks/render/index.ts && echo OK</automated>
  </verify>
  <done>3 render existen y registrados; el timeline de 16 semanas espeja curriculum.tsx.</done>
</task>

<task type="auto">
  <name>Task 2: DiplomadoTeam + DiplomadoBenefits + DiplomadoPricing + build verde</name>
  <files>components/blocks/render/DiplomadoTeam.tsx, components/blocks/render/DiplomadoBenefits.tsx, components/blocks/render/DiplomadoPricing.tsx, components/blocks/render/index.ts</files>
  <action>
- DiplomadoTeam.tsx ('diplomadoTeam'): teamIntro{eyebrow,titulo,subtitulo} + grid de equipo.items (docs team-members, resolveMedia foto) + mentorSection{titulo,nombre,web,bio[],quote}. Espeja components/diplomado/team.tsx.
- DiplomadoBenefits.tsx ('diplomadoBenefits'): eyebrow/titulo/subtitulo + items[]{texto,valor} + extras[]. Espeja components/diplomado/benefits.tsx.
- DiplomadoPricing.tsx ('diplomadoPricing'): titulo/subtitulo + planNombre/badgeText/precio/precioTachado/precioNota/descripcion/features[]/ctaLabel/ctaHref/garantiaTexto. Espeja components/diplomado/pricing.tsx.
Registrar los 3. Cerrar con build verde sin enmascarar el código de salida.
  </action>
  <verify>
    <automated>test $(ls components/blocks/render/Diplomado*.tsx 2>/dev/null | wc -l) -eq 3 && grep -q "diplomadoPricing" components/blocks/render/index.ts; npm run build < /dev/null; echo "EXIT=$?"</automated>
  </verify>
  <done>3 render existen y registrados; `npm run build < /dev/null` imprime EXIT=0.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Pages (público) -> render diplomado | contenido editorial en HTML |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-14R-11 | Tampering (XSS) | render de campos del diplomado | mitigate | texto como children de React; imágenes vía next/image; sin dangerouslySetInnerHTML |
| T-14R-12 | Information Disclosure | contenido del diplomado | accept | marketing público |
</threat_model>

<verification>
- `npm run build < /dev/null` imprime EXIT=0.
- blockRenderers contiene audience, curriculum16Semanas, howItWorks, diplomadoTeam, diplomadoBenefits, diplomadoPricing.
- Ningún componente en components/diplomado/* fue modificado.
</verification>

<success_criteria>
Render completo del diplomado registrado; build verde; sitio actual intacto.
</success_criteria>

<output>
Crear `.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-R05-SUMMARY.md`. Indicar que solo faltan los render del reto (R06).
</output>
