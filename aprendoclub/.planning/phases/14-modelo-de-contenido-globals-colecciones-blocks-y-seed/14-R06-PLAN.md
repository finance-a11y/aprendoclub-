---
phase: 14-modelo-de-contenido-globals-colecciones-blocks-y-seed
plan: R06
type: execute
wave: 6
depends_on: [14-R05]
files_modified:
  - components/blocks/render/BarraUrgencia.tsx
  - components/blocks/render/RetoHero.tsx
  - components/blocks/render/RazonNoEscalas.tsx
  - components/blocks/render/Mentora.tsx
  - components/blocks/render/Agenda.tsx
  - components/blocks/render/Comparacion.tsx
  - components/blocks/render/Incluye.tsx
  - components/blocks/render/Premios.tsx
  - components/blocks/render/RetoPricing.tsx
  - components/blocks/render/Ganadores.tsx
  - components/blocks/render/index.ts
autonomous: true
requirements: [SCH-01]
user_setup: []

must_haves:
  truths:
    - "Cada sección bespoke del reto tiene un componente de render que espeja su componente actual pixel-a-pixel"
    - "Con este plan, TODOS los 40 blockTypes tienen render registrado en blockRenderers"
    - "El build sigue verde"
  artifacts:
    - path: "components/blocks/render/BarraUrgencia.tsx"
      provides: "Barra de urgencia superior del reto"
    - path: "components/blocks/render/Mentora.tsx"
      provides: "Sección mentora del reto"
  key_links:
    - from: "components/blocks/render/index.ts"
      to: "render del reto"
      via: "entradas nuevas en blockRenderers"
      pattern: "barraUrgencia"
---

<objective>
Añadir los componentes de render de los 10 bloques bespoke del RETO (barra de urgencia, hero, razón no escalas, mentora, agenda, comparación, incluye, premios, pricing, ganadores), espejando components/reto/*. El FAQ y ctaFinal del reto reusan render ya existentes (FaqRef R03, CtaBanner R03). Al terminar, TODOS los blockTypes del page-builder tienen render.

Purpose: completar el render del reto para su cutover en Phase 16. NO cutover aquí.

Output: 10 componentes de render + registry extendido; build verde con cobertura total de blockTypes.
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

# Componentes actuales a ESPEJAR (NO tocarlos; duplicar JSX). reto-top/mid/bottom agrupan varias secciones cada uno:
@components/reto/reto-top.tsx
@components/reto/reto-mid.tsx
@components/reto/reto-bottom.tsx
@content/reto.ts

<interfaces>
Registry (R03): components/blocks/render/index.ts exporta `blockRenderers`. AÑADIR entradas.
Helpers: resolveMedia/resolveMediaList (lib/blocks/media), <Button>/<Eyebrow>.
reto-top.tsx contiene: barra urgencia + hero + razonNoEscalas + mentora.
reto-mid/bottom contienen: agenda, comparacion, incluye, premios, pricing, ganadores, faq, ctaFinal (leer para mapear cada sección a su bloque).
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: BarraUrgencia + RetoHero + RazonNoEscalas + Mentora</name>
  <files>components/blocks/render/BarraUrgencia.tsx, components/blocks/render/RetoHero.tsx, components/blocks/render/RazonNoEscalas.tsx, components/blocks/render/Mentora.tsx, components/blocks/render/index.ts</files>
  <action>
Espejar components/reto/reto-top.tsx, descomponiendo sus 4 secciones en 4 render independientes (reordenables como bloques):
- BarraUrgencia.tsx ('barraUrgencia'): la barra superior de texto (block.texto). Mismo markup de la barra.
- RetoHero.tsx ('retoHero'): "use client" (framer-motion). eyebrow/titulo/destacado/texto/bullets[]/precioTexto/ctas[]/imagen (resolveMedia). Split-layout 2 columnas como el original.
- RazonNoEscalas.tsx ('razonNoEscalas'): titulo/parrafo/frases[] (grid de 3 tarjetas).
- Mentora.tsx ('mentora'): nombre/rol/stats[]{valor,etiqueta}/historia/quote/cierre/foto (resolveMedia). Layout 2 columnas con .measure-prose.
Registrar los 4.
  </action>
  <verify>
    <automated>test $(ls components/blocks/render/BarraUrgencia.tsx components/blocks/render/RetoHero.tsx components/blocks/render/RazonNoEscalas.tsx components/blocks/render/Mentora.tsx 2>/dev/null | wc -l) -eq 4 && grep -q "barraUrgencia" components/blocks/render/index.ts && echo OK</automated>
  </verify>
  <done>4 render existen y registrados, espejando reto-top.tsx.</done>
</task>

<task type="auto">
  <name>Task 2: Agenda + Comparacion + Incluye + Premios + RetoPricing + Ganadores + build verde</name>
  <files>components/blocks/render/Agenda.tsx, components/blocks/render/Comparacion.tsx, components/blocks/render/Incluye.tsx, components/blocks/render/Premios.tsx, components/blocks/render/RetoPricing.tsx, components/blocks/render/Ganadores.tsx, components/blocks/render/index.ts</files>
  <action>
Espejar components/reto/reto-mid.tsx y reto-bottom.tsx (leer para mapear el markup de cada sección):
- Agenda.tsx ('agenda'): items[]{dia,titulo,descripcion,imagen (resolveMedia)} (7 días).
- Comparacion.tsx ('comparacion'): items[]{deSiempre,elReto} (tabla comparativa).
- Incluye.tsx ('incluye'): items[]{text} (lista de incluye).
- Premios.tsx ('premios'): mayor{titulo,imagen}, becas{titulo,imagen}, comoSeGana. resolveMedia en imágenes.
- RetoPricing.tsx ('retoPricing'): precio/precioNota/incluyeTexto/ctas[]/nota/whatsapp.
- Ganadores.tsx ('ganadores'): ganadoresIntro + ganadores[]{nombre,edicion,imagen (resolveMedia)}.
Registrar los 6. Cerrar con build verde sin enmascarar el código de salida. Verificar cobertura total: cada slug de `allBlocks` (blocks/index.ts) debe tener una clave en `blockRenderers`.
  </action>
  <verify>
    <automated>test $(ls components/blocks/render/Agenda.tsx components/blocks/render/Comparacion.tsx components/blocks/render/Incluye.tsx components/blocks/render/Premios.tsx components/blocks/render/RetoPricing.tsx components/blocks/render/Ganadores.tsx 2>/dev/null | wc -l) -eq 6 && grep -q "ganadores" components/blocks/render/index.ts; npm run build < /dev/null; echo "EXIT=$?"</automated>
  </verify>
  <done>6 render existen y registrados; todos los blockTypes cubiertos; `npm run build < /dev/null` imprime EXIT=0.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Pages (público) -> render reto | contenido editorial en HTML |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-14R-13 | Tampering (XSS) | render de campos del reto | mitigate | texto como children de React; imágenes vía next/image; sin dangerouslySetInnerHTML |
| T-14R-14 | Information Disclosure | contenido del reto | accept | marketing público |
</threat_model>

<verification>
- `npm run build < /dev/null` imprime EXIT=0.
- Todos los slugs de `allBlocks` tienen entrada en `blockRenderers` (cobertura total, ningún blockType cae al fallback).
- Ningún componente en components/reto/* fue modificado.
</verification>

<success_criteria>
Render completo del reto registrado; cobertura total de blockTypes; build verde; sitio actual intacto.
</success_criteria>

<output>
Crear `.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-R06-SUMMARY.md`. Confirmar que los 40 blockTypes tienen render (listo para el seed de R07).
</output>
