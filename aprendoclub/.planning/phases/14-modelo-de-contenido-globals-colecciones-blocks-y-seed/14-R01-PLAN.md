---
phase: 14-modelo-de-contenido-globals-colecciones-blocks-y-seed
plan: R01
type: execute
wave: 1
depends_on: []
files_modified:
  - blocks/SectionHeaderBlock.ts
  - blocks/RelatedLinks.ts
  - blocks/HeroHome.ts
  - blocks/Instructor.ts
  - blocks/StickyCta.ts
  - blocks/Audience.ts
  - blocks/Curriculum16Semanas.ts
  - blocks/HowItWorks.ts
  - blocks/DiplomadoTeam.ts
  - blocks/DiplomadoBenefits.ts
  - blocks/DiplomadoPricing.ts
  - blocks/BarraUrgencia.ts
  - blocks/RetoHero.ts
  - blocks/RazonNoEscalas.ts
  - blocks/Mentora.ts
  - blocks/Agenda.ts
  - blocks/Comparacion.ts
  - blocks/Incluye.ts
  - blocks/Premios.ts
  - blocks/RetoPricing.ts
  - blocks/Ganadores.ts
  - blocks/Historia.ts
  - blocks/Fundadora.ts
  - blocks/Metodologia.ts
  - blocks/RetoGaleria.ts
  - blocks/TallerHero.ts
  - blocks/TallerIncluye.ts
  - blocks/TallerParaQuien.ts
  - blocks/TallerPricing.ts
  - blocks/index.ts
autonomous: true
requirements: [SCH-01]
user_setup: []

must_haves:
  truths:
    - "Cada sección única del sitio tiene un tipo de bloque tipado disponible para el layout de una Page"
    - "Los 11 bloques genéricos de 14-02 se conservan y se exportan junto a los bespoke desde un solo barrel"
    - "Un array allBlocks[] agrupa TODOS los bloques (genéricos + bespoke) para alimentar Pages.layout sin duplicar"
  artifacts:
    - path: "blocks/index.ts"
      provides: "Barrel que re-exporta los 11 bloques genéricos + 29 bespoke + allBlocks[]"
      contains: "export const allBlocks"
    - path: "blocks/Curriculum16Semanas.ts"
      provides: "Bloque timeline 16 semanas del diplomado"
      contains: "slug: 'curriculum16Semanas'"
    - path: "blocks/BarraUrgencia.ts"
      provides: "Bloque barra de urgencia del reto"
      contains: "slug: 'barraUrgencia'"
  key_links:
    - from: "blocks/index.ts"
      to: "blocks/*.ts"
      via: "re-export de cada Block config"
      pattern: "export \\{ .*Block \\} from"
---

<objective>
Definir un tipo de bloque tipado (Payload `Block`) por cada sección ÚNICA de las 7 páginas actuales que NO esté ya cubierta por los 11 bloques genéricos de 14-02, y exponer TODOS los bloques (genéricos + bespoke) desde el barrel `blocks/index.ts` mediante un array `allBlocks[]` que el Plan R02 usará como `Pages.layout.blocks`.

Purpose: SCH-01 (revisado) exige "un tipo de bloque por sección única" con fidelidad pixel-perfect. Los globals de página (a eliminar en R02) ya decompusieron cada página en grupos de campos por sección; este plan convierte cada grupo bespoke en un `Block` reutilizable dentro del page-builder. NO toca payload.config.ts, NO borra globals, NO hace render (eso es R02/R03+).

Output: 29 archivos de bloque nuevos + barrel actualizado con `allBlocks`.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-REWORK-CONTEXT.md

# Los bloques bespoke ESPEJAN los grupos de campos ya definidos en estos globals
# (que R02 eliminará). Leer el grupo correspondiente y copiar su `fields` al Block.
@globals/Home.ts
@globals/Diplomado.ts
@globals/Reto.ts
@globals/QuienesSomos.ts
@globals/TestimoniosPage.ts
@globals/ProgramasHub.ts
@globals/Taller.ts

# Helpers de campo y patrón de Block ya establecido en 14-02
@blocks/index.ts
@blocks/Hero.ts
@blocks/FeatureGrid.ts
@fields/link.ts
@fields/sectionHeader.ts

<interfaces>
Patrón de un Block (de blocks/Hero.ts, verbatim):

  export const heroFields: Field[] = [ ...campos... ]
  export const HeroBlock: Block = {
    slug: 'hero',
    interfaceName: 'HeroBlock',
    labels: { singular: '...', plural: '...' },
    fields: heroFields,
  }

Helpers disponibles (importar desde '../fields/link' y '../fields/sectionHeader'):
  linkFields: Field[]            // { label:text req, href:text req }
  linkGroup(name, label?): Field // group{ label, href }
  sectionHeaderFields: Field[]   // eyebrow(text), titulo(text req), subtitulo(textarea)

Field-sets reutilizables ya exportados desde blocks/index.ts:
  heroFields, pricingFields, ctaBannerFields, featureGridFields, statsFields,
  proseFields, faqRefFields, testimonialRefFields, teamGridRefFields,
  programGridRefFields, logosRefFields

Blocks genéricos ya construidos (conservar, NO redefinir):
  HeroBlock('hero'), PricingBlock('pricing'), CtaBannerBlock('ctaBanner'),
  FeatureGridBlock('featureGrid'), StatsBlock('stats'), ProseBlock('prose'),
  FaqRefBlock('faqRef'), TestimonialRefBlock('testimonialRef'),
  TeamGridRefBlock('teamGridRef'), ProgramGridRefBlock('programGridRef'),
  LogosRefBlock('logosRef')
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Bloques bespoke compartidos + home + quienes-somos + testimonios + taller</name>
  <files>blocks/SectionHeaderBlock.ts, blocks/RelatedLinks.ts, blocks/HeroHome.ts, blocks/Instructor.ts, blocks/StickyCta.ts, blocks/Historia.ts, blocks/Fundadora.ts, blocks/Metodologia.ts, blocks/RetoGaleria.ts, blocks/TallerHero.ts, blocks/TallerIncluye.ts, blocks/TallerParaQuien.ts, blocks/TallerPricing.ts</files>
  <action>
Crear un archivo por bloque siguiendo el patrón de blocks/Hero.ts (export del array `fields` + export del `Block` con slug/interfaceName/labels/fields). Cada bloque espeja verbatim el grupo de campos homónimo en su global fuente (leer el global indicado). NO usar richText salvo donde el global lo usaba.

- SectionHeaderBlock.ts → slug 'sectionHeader', interfaceName 'SectionHeaderBlock'. fields = sectionHeaderFields (eyebrow, titulo req, subtitulo). Cubre los heroes de quienes-somos/testimonios-page/programas-hub (globals los definieron con sectionHeaderFields). Hoy NO existe un Block SectionHeader (sectionHeaderFields es solo un helper) — este bloque lo materializa.
- RelatedLinks.ts → slug 'relatedLinks'. fields: title(text) + links(array de linkFields). Espeja ProgramasHub.relatedLinks y Diplomado.relatedLinks.
- HeroHome.ts → slug 'heroHome', interfaceName 'HeroHomeBlock'. fields: [...heroFields, avatares(relationship media hasMany, label 'Avatares de estudiantes'), ratingTexto(text), videoBackground(upload media, label 'Video de fondo')]. Espeja el grupo `hero` de globals/Home.ts.
- Instructor.ts → slug 'instructor'. fields: eyebrow(text req), nombre(text req), rol(text req), bioCorta1(textarea req), bioCorta2(textarea req), stats(group con statsFields), foto(upload media), linkGroup('teaser','Teaser (link a /quienes-somos)'). Espeja Home.instructor.
- StickyCta.ts → slug 'stickyCta'. fields: [linkGroup('boton','Botón')]. Espeja Home.stickyCta.
- Historia.ts → slug 'historia'. fields: eyebrow(text req), titulo(text req), parrafos(array{texto:textarea req} req), quote(group{texto:textarea req, autor:text req}). Espeja QuienesSomos.historia.
- Fundadora.ts → slug 'fundadora'. fields: eyebrow(text req), nombre(text req), rol(text req), bio(array{texto:textarea req} req), foto(upload media req). Espeja QuienesSomos.fundadora.
- Metodologia.ts → slug 'metodologia'. fields: eyebrow(text req), titulo(text req), pilares(array{nombre:text req, descripcion:textarea req} req). Espeja QuienesSomos.metodologia.
- RetoGaleria.ts → slug 'retoGaleria'. fields: eyebrow(text req), titulo(text req), texto(textarea req), imagenes(relationship media hasMany, label 'Galería del Reto'). Fusiona TestimoniosPage.reto (cabecera) + retoGaleria (imágenes) en un bloque de galería.
- TallerHero.ts → slug 'tallerHero'. fields: eyebrow(text req), titulo(text req), subtitulo(textarea req), duracion(text req). Espeja Taller.hero.
- TallerIncluye.ts → slug 'tallerIncluye'. fields: items(array{texto:text req, valor:text} req). Espeja Taller.incluye.
- TallerParaQuien.ts → slug 'tallerParaQuien'. fields: texto(textarea req). Espeja Taller.paraQuien.
- TallerPricing.ts → slug 'tallerPricing'. fields: monto(text req), opciones(array{texto:text req} req), linkGroup('cta','CTA'). Espeja Taller.precio + Taller.cta fusionados.
  </action>
  <verify>
    <automated>test $(ls blocks/SectionHeaderBlock.ts blocks/RelatedLinks.ts blocks/HeroHome.ts blocks/Instructor.ts blocks/StickyCta.ts blocks/Historia.ts blocks/Fundadora.ts blocks/Metodologia.ts blocks/RetoGaleria.ts blocks/TallerHero.ts blocks/TallerIncluye.ts blocks/TallerParaQuien.ts blocks/TallerPricing.ts 2>/dev/null | wc -l) -eq 13 && grep -rl "interfaceName" blocks/HeroHome.ts blocks/SectionHeaderBlock.ts >/dev/null && echo OK</automated>
  </verify>
  <done>Los 13 archivos existen, cada uno exporta un `Block` con slug único y `fields` espejando su global fuente.</done>
</task>

<task type="auto">
  <name>Task 2: Bloques bespoke del diplomado</name>
  <files>blocks/Audience.ts, blocks/Curriculum16Semanas.ts, blocks/HowItWorks.ts, blocks/DiplomadoTeam.ts, blocks/DiplomadoBenefits.ts, blocks/DiplomadoPricing.ts</files>
  <action>
Un archivo por bloque, patrón de blocks/Hero.ts, espejando verbatim el grupo homónimo en globals/Diplomado.ts.

- Audience.ts → slug 'audience'. fields: titulo(text req), subtitulo(text), tituloPerfiles(text), perfiles(array{text:text req}), tituloDudas(text), dudas(array{text:text req}), notaFinal(textarea). Espeja Diplomado.audience.
- Curriculum16Semanas.ts → slug 'curriculum16Semanas', interfaceName 'Curriculum16SemanasBlock', labels singular 'Temario 16 semanas'. fields: eyebrow(text), titulo(text req), semanas(array{numero:number req, titulo:text req, detalle:textarea req} req). Espeja Diplomado.curriculum.
- HowItWorks.ts → slug 'howItWorks'. fields: [...featureGridFields, ctaLabel(text), ctaHref(text)]. Espeja Diplomado.howItWorks.
- DiplomadoTeam.ts → slug 'diplomadoTeam'. fields: teamIntro(group{eyebrow:text, titulo:text req, subtitulo:textarea}), equipo(group con teamGridRefFields), mentorSection(group{titulo:text req, nombre:text req, web:text, bio(array{texto:textarea req} req), quote:text}). Espeja Diplomado.team.
- DiplomadoBenefits.ts → slug 'diplomadoBenefits'. fields: eyebrow(text), titulo(text req), subtitulo(textarea), items(array{texto:textarea req, valor:text}), extras(array{text:text req}). Espeja Diplomado.benefits.
- DiplomadoPricing.ts → slug 'diplomadoPricing'. fields: titulo(text req), subtitulo(textarea), planNombre(text req), badgeText(text), precio(text req), precioTachado(text), precioNota(text), descripcion(textarea), features(array{text:text req}), ctaLabel(text), ctaHref(text), garantiaTexto(textarea). Espeja Diplomado.pricing.

Nota: el grupo Diplomado.courseMeta (price/courseWorkload/startDate) NO se convierte en bloque — es data de JSON-LD Course cuyo cableado es Phase 17 (deferred idea). Se recupera al cablear SEO, no es una sección visual.
  </action>
  <verify>
    <automated>test $(ls blocks/Audience.ts blocks/Curriculum16Semanas.ts blocks/HowItWorks.ts blocks/DiplomadoTeam.ts blocks/DiplomadoBenefits.ts blocks/DiplomadoPricing.ts 2>/dev/null | wc -l) -eq 6 && grep -q "curriculum16Semanas" blocks/Curriculum16Semanas.ts && echo OK</automated>
  </verify>
  <done>Los 6 archivos del diplomado existen con slugs únicos y fields espejando globals/Diplomado.ts.</done>
</task>

<task type="auto">
  <name>Task 3: Bloques bespoke del reto + barrel con allBlocks[]</name>
  <files>blocks/BarraUrgencia.ts, blocks/RetoHero.ts, blocks/RazonNoEscalas.ts, blocks/Mentora.ts, blocks/Agenda.ts, blocks/Comparacion.ts, blocks/Incluye.ts, blocks/Premios.ts, blocks/RetoPricing.ts, blocks/Ganadores.ts, blocks/index.ts</files>
  <action>
Crear los 10 bloques del reto (espejando globals/Reto.ts) y ACTUALIZAR el barrel blocks/index.ts.

Bloques reto:
- BarraUrgencia.ts → slug 'barraUrgencia', interfaceName 'BarraUrgenciaBlock', labels singular 'Barra de urgencia'. fields: texto(text req). Espeja Reto.urgencia (que era un text de nivel superior; aquí se envuelve como bloque).
- RetoHero.ts → slug 'retoHero'. fields: eyebrow(text req), titulo(text req), destacado(text req), texto(textarea req), bullets(array{text:text req}), precioTexto(text req), ctas(array de linkFields), imagen(upload media). Espeja Reto.hero.
- RazonNoEscalas.ts → slug 'razonNoEscalas'. fields: titulo(text req), parrafo(textarea req), frases(array{text:text req}). Espeja Reto.razonNoEscalas.
- Mentora.ts → slug 'mentora'. fields: nombre(text req), rol(text req), stats(array{valor:text req, etiqueta:text req}), historia(textarea req), quote(text req), cierre(textarea req), foto(upload media). Espeja Reto.mentora.
- Agenda.ts → slug 'agenda'. fields: items(array{dia:text req, titulo:text req, descripcion:textarea req, imagen:upload media}). Espeja Reto.agenda (array de nivel superior → envuelto en `items`).
- Comparacion.ts → slug 'comparacion'. fields: items(array{deSiempre:text req, elReto:text req}). Espeja Reto.comparacion.
- Incluye.ts → slug 'incluye'. fields: items(array{text:text req}). Espeja Reto.incluye.
- Premios.ts → slug 'premios'. fields: mayor(group{titulo:text req, imagen:upload media}), becas(group{titulo:text req, imagen:upload media}), comoSeGana(textarea req). Espeja Reto.premios.
- RetoPricing.ts → slug 'retoPricing'. fields: precio(text req), precioNota(text req), incluyeTexto(text req), ctas(array de linkFields), nota(text req), whatsapp(text req). Espeja Reto.pricing.
- Ganadores.ts → slug 'ganadores'. fields: ganadoresIntro(textarea req), ganadores(array{nombre:text req, edicion:text req, imagen:upload media}). Espeja Reto.ganadoresIntro + Reto.ganadores fusionados.

Nota: el FAQ del reto y su ctaFinal NO son bloques nuevos: FAQ reusa el genérico FaqRefBlock; el ctaFinal del reto ({titulo, botonLabel, botonHref}) reusa el genérico CtaBannerBlock (texto/bullets opcionales, boton.label/href). Documentarlo en el SUMMARY.

Barrel blocks/index.ts: mantener TODAS las líneas existentes (helpers + 11 bloques genéricos) y AÑADIR:
1. Un `export { XBlock } from './X'` por cada uno de los 29 bloques bespoke (los 13 de Task 1, 6 de Task 2, 10 de este task).
2. Al final, un array agregado que el Plan R02 usará como Pages.layout.blocks:
     import type { Block } from 'payload'
     export const allBlocks: Block[] = [ HeroBlock, HeroHomeBlock, FeatureGridBlock, PricingBlock, DiplomadoPricingBlock, RetoPricingBlock, TallerPricingBlock, CtaBannerBlock, StatsBlock, ProseBlock, SectionHeaderBlock, RelatedLinks Block, Instructor Block, StickyCtaBlock, Historia Block, FundadoraBlock, MetodologiaBlock, RetoGaleriaBlock, TallerHeroBlock, TallerIncluyeBlock, TallerParaQuienBlock, AudienceBlock, Curriculum16SemanasBlock, HowItWorksBlock, DiplomadoTeamBlock, DiplomadoBenefitsBlock, BarraUrgenciaBlock, RetoHeroBlock, RazonNoEscalasBlock, MentoraBlock, AgendaBlock, ComparacionBlock, IncluyeBlock, PremiosBlock, GanadoresBlock, FaqRefBlock, TestimonialRefBlock, TeamGridRefBlock, ProgramGridRefBlock, LogosRefBlock ]
   (usar los nombres de export reales; el array debe contener los 11 genéricos + 29 bespoke = 40 Block configs, sin duplicar slugs. Importar cada Block dentro de index.ts para poder listarlo en el array).

Verificar que NO haya slugs duplicados entre los 40 bloques (cada slug único), porque Payload rechaza slugs de bloque repetidos dentro del mismo campo `blocks`.
  </action>
  <verify>
    <automated>node -e "const b=require('./blocks/index.ts')" 2>/dev/null; test $(ls blocks/*.ts | wc -l) -ge 40 && grep -q "export const allBlocks" blocks/index.ts && echo OK</automated>
  </verify>
  <done>Los 10 bloques del reto existen; blocks/index.ts re-exporta los 40 bloques y expone `allBlocks: Block[]` con 40 entradas de slug único.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| admin editor → Payload block fields | contenido editorial confiable (admin autenticado); sin entrada de usuario final aquí |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-14R-01 | Tampering | slug de bloque duplicado | mitigate | Task 3 verifica unicidad de los 40 slugs; Payload falla el build si hay colisión |
| T-14R-02 | Information Disclosure | campos de bloque | accept | solo contenido de marketing público, sin PII |
</threat_model>

<verification>
- `blocks/index.ts` exporta 40 Block configs y `allBlocks` con 40 entradas.
- No hay slugs de bloque duplicados.
- Ningún archivo de globals fue tocado (R02 los elimina).
</verification>

<success_criteria>
29 bloques bespoke nuevos + 11 genéricos conservados, todos exportados desde el barrel con `allBlocks[]` listo para `Pages.layout.blocks`. Sin cambios en payload.config.ts ni en globals/.
</success_criteria>

<output>
Crear `.planning/phases/14-modelo-de-contenido-globals-colecciones-blocks-y-seed/14-R01-SUMMARY.md` al terminar. Documentar el inventario final de 40 bloques (slug → sección fuente) y las decisiones de reuso (reto ctaFinal→ctaBanner, courseMeta diferido a Phase 17).
</output>
